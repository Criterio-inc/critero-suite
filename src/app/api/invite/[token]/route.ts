import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getClerkUserId } from "@/lib/auth-guard";
import { ensureTables } from "@/lib/ensure-tables";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Sync Clerk user → local DB (ensures User row exists for FK)        */
/* ------------------------------------------------------------------ */

async function syncClerkUserToDB(userId: string): Promise<string> {
  const { currentUser } = await import("@clerk/nextjs/server");
  const user = await currentUser();
  if (!user) throw new Error("Clerk session saknas");

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    "";

  await ensureTables();
  await prisma.user.upsert({
    where: { id: userId },
    update: {
      email: primaryEmail,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      imageUrl: user.imageUrl ?? "",
    },
    create: {
      id: userId,
      email: primaryEmail,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      imageUrl: user.imageUrl ?? "",
    },
  });

  return primaryEmail.toLowerCase();
}

/* ------------------------------------------------------------------ */
/*  GET /api/invite/[token] — validate invitation token                */
/* ------------------------------------------------------------------ */

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      org: { select: { id: true, name: true, slug: true, plan: true } },
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Inbjudan hittades inte", code: "NOT_FOUND" },
      { status: 404 },
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { error: "Denna inbjudan har redan använts", code: "ALREADY_USED" },
      { status: 410 },
    );
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Denna inbjudan har gått ut", code: "EXPIRED" },
      { status: 410 },
    );
  }

  return NextResponse.json({
    invitation: {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      expiresAt: invitation.expiresAt.toISOString(),
      org: invitation.org,
    },
  });
}

/* ------------------------------------------------------------------ */
/*  POST /api/invite/[token] — accept invitation                       */
/* ------------------------------------------------------------------ */

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // 1. Require logged-in user
  const userId = await getClerkUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "Du måste vara inloggad för att acceptera en inbjudan", code: "NOT_AUTHENTICATED" },
      { status: 401 },
    );
  }

  // 2. Sync Clerk user → local DB (ensures User row exists before FK insert)
  let userEmail: string;
  try {
    userEmail = await syncClerkUserToDB(userId);
  } catch (err) {
    console.error("syncClerkUserToDB failed during invite accept:", err);
    return NextResponse.json(
      { error: "Kunde inte verifiera din användare. Försök igen.", code: "SYNC_FAILED" },
      { status: 500 },
    );
  }

  // 3. Load & validate invitation
  const invitation = await prisma.invitation.findUnique({
    where: { token },
    include: {
      org: { select: { id: true, name: true, slug: true, maxUsers: true } },
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "Inbjudan hittades inte", code: "NOT_FOUND" },
      { status: 404 },
    );
  }

  if (invitation.usedAt) {
    return NextResponse.json(
      { error: "Denna inbjudan har redan använts", code: "ALREADY_USED" },
      { status: 410 },
    );
  }

  if (invitation.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Denna inbjudan har gått ut", code: "EXPIRED" },
      { status: 410 },
    );
  }

  // 4. Verify e-mail matches invitation
  if (userEmail !== invitation.email.toLowerCase()) {
    return NextResponse.json(
      {
        error: `Inbjudan skickades till ${invitation.email} men du är inloggad med ${userEmail}. Logga in med rätt e-postadress.`,
        code: "EMAIL_MISMATCH",
      },
      { status: 403 },
    );
  }

  // 5. Check max users limit
  const memberCount = await prisma.orgMembership.count({
    where: { orgId: invitation.orgId },
  });
  if (invitation.org.maxUsers > 0 && memberCount >= invitation.org.maxUsers) {
    return NextResponse.json(
      { error: "Organisationen har nått maxgränsen för användare", code: "ORG_FULL" },
      { status: 403 },
    );
  }

  // 6. Check if user already is a member
  const existing = await prisma.orgMembership.findUnique({
    where: { orgId_userId: { orgId: invitation.orgId, userId } },
  });

  if (existing) {
    // Already a member — mark invitation as used and return success
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { usedAt: new Date() },
    });
    return NextResponse.json({
      ok: true,
      message: "Du är redan medlem i denna organisation",
      orgSlug: invitation.org.slug,
    });
  }

  // 7. Create membership + mark invitation used in a transaction
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

  return NextResponse.json({
    ok: true,
    message: `Välkommen till ${invitation.org.name}!`,
    orgSlug: invitation.org.slug,
    role: invitation.role,
  }, { status: 201 });
}
