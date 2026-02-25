import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createDefaultFeatures, checkAdminAccess } from "@/lib/user-features";
import { ensureTables } from "@/lib/ensure-tables";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "par.levander@criteroconsulting.se";

/* ------------------------------------------------------------------ */
/*  Clerk auth helper                                                   */
/* ------------------------------------------------------------------ */

async function getClerkUserId(): Promise<string | null> {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    return userId;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  POST /api/admin/sync-users — pull all users from Clerk into DB      */
/*  Uses the official Clerk SDK (clerkClient) instead of raw fetch      */
/* ------------------------------------------------------------------ */

export async function POST() {
  try {
    const callerId = await getClerkUserId();
    if (!callerId || !(await checkAdminAccess(callerId))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await ensureTables();

    // Use the official Clerk SDK — handles auth, API versioning, pagination
    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();

    // Fetch ALL users from Clerk via SDK (paginated)
    interface ClerkSDKUser {
      id: string;
      emailAddresses: Array<{ id: string; emailAddress: string }>;
      primaryEmailAddressId: string | null;
      firstName: string | null;
      lastName: string | null;
      imageUrl: string;
    }

    const allClerkUsers: ClerkSDKUser[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const { data: users, totalCount } = await client.users.getUserList({
        limit,
        offset,
        orderBy: "-created_at",
      });

      console.log(
        `[sync-users] Clerk SDK offset=${offset}: ` +
          `totalCount=${totalCount}, batch=${users.length}` +
          (users.length > 0
            ? ` (${users.map((u) => u.emailAddresses?.[0]?.emailAddress ?? u.id).join(", ")})`
            : ""),
      );

      if (users.length === 0) break;
      allClerkUsers.push(...users);
      if (allClerkUsers.length >= totalCount || users.length < limit) break;
      offset += limit;
    }

    // Upsert each user into our DB
    let created = 0;
    let updated = 0;
    let invitationsAccepted = 0;

    for (const cu of allClerkUsers) {
      const primaryEmail =
        cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)
          ?.emailAddress ??
        cu.emailAddresses[0]?.emailAddress ??
        "";

      const isAdmin = primaryEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      const existing = await prisma.user.findUnique({ where: { id: cu.id } });

      await prisma.user.upsert({
        where: { id: cu.id },
        update: {
          email: primaryEmail,
          firstName: cu.firstName ?? "",
          lastName: cu.lastName ?? "",
          imageUrl: cu.imageUrl ?? "",
          isAdmin,
        },
        create: {
          id: cu.id,
          email: primaryEmail,
          firstName: cu.firstName ?? "",
          lastName: cu.lastName ?? "",
          imageUrl: cu.imageUrl ?? "",
          isAdmin,
        },
      });

      if (!existing) {
        await createDefaultFeatures(cu.id);
        created++;
      } else {
        updated++;
      }

      // Auto-accept pending invitations matching this email
      if (primaryEmail) {
        try {
          const pendingInvitations = await prisma.invitation.findMany({
            where: {
              email: primaryEmail.toLowerCase(),
              usedAt: null,
              expiresAt: { gt: new Date() },
            },
          });
          for (const inv of pendingInvitations) {
            const memberExists = await prisma.orgMembership.findUnique({
              where: { orgId_userId: { orgId: inv.orgId, userId: cu.id } },
            });
            if (!memberExists) {
              await prisma.orgMembership.create({
                data: { orgId: inv.orgId, userId: cu.id, role: inv.role },
              });
              invitationsAccepted++;
            }
            await prisma.invitation.update({
              where: { id: inv.id },
              data: { usedAt: new Date() },
            });
          }
        } catch (err) {
          console.error(`Auto-accept invitations failed for ${primaryEmail}:`, err);
        }
      }
    }

    const emails = allClerkUsers.map((cu) =>
      cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)
        ?.emailAddress ?? cu.emailAddresses[0]?.emailAddress ?? cu.id,
    );

    const parts = [
      `Synkade ${allClerkUsers.length} användare (${created} nya, ${updated} uppdaterade)`,
    ];
    if (invitationsAccepted > 0) {
      parts.push(`${invitationsAccepted} inbjudan(ar) automatiskt accepterade`);
    }
    parts.push(`Hämtade: ${emails.join(", ")}`);

    return NextResponse.json({
      message: parts.join(". "),
      total: allClerkUsers.length,
      created,
      updated,
      invitationsAccepted,
      emails,
    });
  } catch (e) {
    console.error("POST /api/admin/sync-users error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
