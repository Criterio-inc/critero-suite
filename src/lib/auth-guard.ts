import { prisma } from "@/lib/db";
import { ensureTables } from "@/lib/ensure-tables";
import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AuthContext {
  userId: string;
  orgId: string;
  orgSlug: string;
  orgPlan: string;
  role: "admin" | "member" | "viewer";
  isPlatformAdmin: boolean;
}

export class ApiError {
  constructor(
    public status: number,
    public message: string,
  ) {}

  toResponse() {
    return NextResponse.json({ error: this.message }, { status: this.status });
  }
}

/* ------------------------------------------------------------------ */
/*  Platform admin emails (env-driven with default fallback)           */
/* ------------------------------------------------------------------ */

const PLATFORM_ADMIN_EMAILS = (
  process.env.PLATFORM_ADMIN_EMAILS ?? "par.levander@criteroconsulting.se"
).split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);

/* ------------------------------------------------------------------ */
/*  Clerk auth helper (centralized — replaces all duplicates)          */
/* ------------------------------------------------------------------ */

export async function getClerkUserId(): Promise<string | null> {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    return userId;
  } catch {
    // Clerk not configured or not available
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Auto-sync Clerk user to DB (eliminates webhook dependency)         */
/* ------------------------------------------------------------------ */

async function autoSyncClerkUser(userId: string): Promise<boolean> {
  try {
    const { currentUser } = await import("@clerk/nextjs/server");
    const user = await currentUser();
    if (!user) return false;

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
        ?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      "";

    const isAdmin =
      !!primaryEmail &&
      PLATFORM_ADMIN_EMAILS.includes(primaryEmail.toLowerCase());

    await ensureTables();
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: primaryEmail,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        imageUrl: user.imageUrl ?? "",
        isAdmin,
      },
      create: {
        id: userId,
        email: primaryEmail,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        imageUrl: user.imageUrl ?? "",
        isAdmin,
      },
    });

    return isAdmin;
  } catch (err) {
    console.error("autoSyncClerkUser failed:", err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Auto-accept pending invitations by email match                     */
/* ------------------------------------------------------------------ */

type MembershipWithOrg = {
  orgId: string;
  userId: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  org: { id: string; slug: string; plan: string };
};

async function autoAcceptInvitation(
  userId: string,
): Promise<MembershipWithOrg | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
    if (!user?.email) return undefined;

    // Find pending invitation for this email
    const invitation = await prisma.invitation.findFirst({
      where: {
        email: user.email.toLowerCase(),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "asc" },
    });
    if (!invitation) return undefined;

    // Accept: create membership + mark used
    await prisma.$transaction([
      prisma.orgMembership.create({
        data: {
          orgId: invitation.orgId,
          userId,
          role: invitation.role,
        },
      }),
      prisma.invitation.update({
        where: { id: invitation.id },
        data: { usedAt: new Date() },
      }),
    ]);

    // Fetch the newly created membership with org
    const membership = await prisma.orgMembership.findFirst({
      where: { userId, orgId: invitation.orgId },
      include: {
        org: { select: { id: true, slug: true, plan: true } },
      },
    });
    return membership ?? undefined;
  } catch (err) {
    console.error("autoAcceptInvitation failed:", err);
    return undefined;
  }
}

/* ------------------------------------------------------------------ */
/*  Dev-mode default org (auto-created when Clerk is off)              */
/* ------------------------------------------------------------------ */

const DEV_ORG_ID = "dev-org";
const DEV_USER_ID = "dev-user";

async function ensureDevOrg(): Promise<AuthContext> {
  // Upsert a default dev organization
  await prisma.organization.upsert({
    where: { id: DEV_ORG_ID },
    update: {},
    create: {
      id: DEV_ORG_ID,
      name: "Utvecklingsorganisation",
      slug: "dev",
      plan: "enterprise",
      maxUsers: 999,
    },
  });

  return {
    userId: DEV_USER_ID,
    orgId: DEV_ORG_ID,
    orgSlug: "dev",
    orgPlan: "enterprise",
    role: "admin",
    isPlatformAdmin: true,
  };
}

/* ------------------------------------------------------------------ */
/*  requireAuth — authenticate & resolve org membership                */
/* ------------------------------------------------------------------ */

export async function requireAuth(): Promise<AuthContext> {
  const userId = await getClerkUserId();

  // Dev mode: no Clerk → auto-dev-org
  if (!userId) {
    return ensureDevOrg();
  }

  // Check platform admin status — first from DB, then auto-sync from Clerk
  let isPlatformAdmin = false;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });
    if (user) {
      isPlatformAdmin = user.isAdmin;
    } else {
      // User not in DB yet (webhook hasn't fired) — auto-sync from Clerk session
      isPlatformAdmin = await autoSyncClerkUser(userId);
    }
  } catch {
    // Tables may not exist — try auto-sync which calls ensureTables
    isPlatformAdmin = await autoSyncClerkUser(userId);
  }

  // Find active membership (pick first org — future: support org switching)
  let membership = await prisma.orgMembership.findFirst({
    where: { userId },
    include: {
      org: { select: { id: true, slug: true, plan: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  // Auto-match: if no membership, check for pending invitation by email
  if (!membership) {
    membership = (await autoAcceptInvitation(userId)) ?? null;
  }

  if (!membership) {
    // Platform admins can operate without an org (for admin routes)
    if (isPlatformAdmin) {
      return {
        userId,
        orgId: "",
        orgSlug: "",
        orgPlan: "",
        role: "admin",
        isPlatformAdmin: true,
      };
    }
    throw new ApiError(403, "Du tillhör ingen organisation. Kontakta din administratör.");
  }

  return {
    userId,
    orgId: membership.org.id,
    orgSlug: membership.org.slug,
    orgPlan: membership.org.plan,
    role: membership.role as AuthContext["role"],
    isPlatformAdmin,
  };
}

/* ------------------------------------------------------------------ */
/*  requireCaseAccess — verify case belongs to user's org              */
/* ------------------------------------------------------------------ */

export async function requireCaseAccess(
  caseId: string,
  ctx: AuthContext,
): Promise<void> {
  // Platform admins can access any case
  if (ctx.isPlatformAdmin) return;

  const kase = await prisma.case.findUnique({
    where: { id: caseId },
    select: { orgId: true },
  });

  if (!kase) {
    throw new ApiError(404, "Upphandling hittades inte");
  }

  // Cases without orgId (legacy) are accessible to anyone (migration compat)
  if (!kase.orgId) return;

  if (kase.orgId !== ctx.orgId) {
    throw new ApiError(404, "Upphandling hittades inte");
  }
}

/* ------------------------------------------------------------------ */
/*  requireOrgAdmin — must be org admin or platform admin              */
/* ------------------------------------------------------------------ */

export function requireOrgAdmin(ctx: AuthContext): void {
  if (ctx.isPlatformAdmin) return;
  if (ctx.role !== "admin") {
    throw new ApiError(403, "Administratörsbehörighet krävs");
  }
}

/* ------------------------------------------------------------------ */
/*  requirePlatformAdmin — must be Critero staff                       */
/* ------------------------------------------------------------------ */

export function requirePlatformAdmin(ctx: AuthContext): void {
  if (!ctx.isPlatformAdmin) {
    throw new ApiError(403, "Plattformsadministratör krävs");
  }
}

/* ------------------------------------------------------------------ */
/*  requireWriteAccess — viewers can't write                           */
/* ------------------------------------------------------------------ */

export function requireWriteAccess(ctx: AuthContext): void {
  if (ctx.role === "viewer" && !ctx.isPlatformAdmin) {
    throw new ApiError(403, "Skrivbehörighet krävs");
  }
}

/* ------------------------------------------------------------------ */
/*  Wrapper: handles ApiError → NextResponse                           */
/* ------------------------------------------------------------------ */

export async function withAuth<T>(
  handler: (ctx: AuthContext) => Promise<T>,
): Promise<T | NextResponse> {
  try {
    const ctx = await requireAuth();
    return await handler(ctx);
  } catch (e) {
    if (e instanceof ApiError) {
      return e.toResponse();
    }
    throw e;
  }
}

/* ------------------------------------------------------------------ */
/*  Audit logging helper                                               */
/* ------------------------------------------------------------------ */

export async function logAudit(
  ctx: AuthContext,
  action: string,
  entityType: string,
  entityId: string = "",
  changes: Record<string, unknown> = {},
): Promise<void> {
  if (!ctx.orgId) return; // Skip audit for platform-level ops without org

  try {
    await prisma.auditLog.create({
      data: {
        orgId: ctx.orgId,
        userId: ctx.userId,
        action,
        entityType,
        entityId,
        changes: JSON.stringify(changes),
      },
    });
  } catch {
    // Don't fail the request if audit logging fails
    console.error("Audit log failed:", { action, entityType, entityId });
  }
}
