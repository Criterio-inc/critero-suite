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
/*  Extract users array from Clerk API response                         */
/*  Clerk v4 SDK returns bare array; some versions wrap in {data:[]}    */
/* ------------------------------------------------------------------ */

interface ClerkUser {
  id: string;
  email_addresses: Array<{ id: string; email_address: string }>;
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
}

function extractUsersArray(json: unknown): ClerkUser[] {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.users)) return obj.users;
  }
  return [];
}

/* ------------------------------------------------------------------ */
/*  POST /api/admin/sync-users — pull all users from Clerk into DB      */
/* ------------------------------------------------------------------ */

export async function POST() {
  try {
    const callerId = await getClerkUserId();
    if (!callerId || !(await checkAdminAccess(callerId))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await ensureTables();

    const secretKey = process.env.CLERK_SECRET_KEY;
    if (!secretKey || secretKey === "sk_test_REPLACE_ME") {
      return NextResponse.json(
        { error: "CLERK_SECRET_KEY inte konfigurerad" },
        { status: 500 },
      );
    }

    // Fetch all users from Clerk Backend API (paginated)
    const allClerkUsers: ClerkUser[] = [];

    let offset = 0;
    const limit = 100;

    while (true) {
      const res = await fetch(
        `https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}&order_by=-created_at`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Clerk API error:", res.status, text);
        return NextResponse.json(
          { error: `Clerk API svarade med ${res.status}` },
          { status: 502 },
        );
      }

      const json: unknown = await res.json();
      const users = extractUsersArray(json);

      console.log(
        `[sync-users] Clerk offset=${offset}: fick ${users.length} användare` +
          (users.length > 0
            ? ` (${users.map((u) => u.email_addresses?.[0]?.email_address ?? u.id).join(", ")})`
            : ""),
      );

      if (users.length === 0) break;
      allClerkUsers.push(...users);
      if (users.length < limit) break;
      offset += limit;
    }

    // Upsert each user into our DB
    let created = 0;
    let updated = 0;
    let invitationsAccepted = 0;

    for (const cu of allClerkUsers) {
      const primaryEmail =
        cu.email_addresses.find((e) => e.id === cu.primary_email_address_id)
          ?.email_address ??
        cu.email_addresses[0]?.email_address ??
        "";

      const isAdmin = primaryEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      const existing = await prisma.user.findUnique({ where: { id: cu.id } });

      await prisma.user.upsert({
        where: { id: cu.id },
        update: {
          email: primaryEmail,
          firstName: cu.first_name ?? "",
          lastName: cu.last_name ?? "",
          imageUrl: cu.image_url ?? "",
          isAdmin,
        },
        create: {
          id: cu.id,
          email: primaryEmail,
          firstName: cu.first_name ?? "",
          lastName: cu.last_name ?? "",
          imageUrl: cu.image_url ?? "",
          isAdmin,
        },
      });

      // Create default features for new users
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
            const exists = await prisma.orgMembership.findUnique({
              where: { orgId_userId: { orgId: inv.orgId, userId: cu.id } },
            });
            if (!exists) {
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

    const parts = [
      `Synkade ${allClerkUsers.length} användare (${created} nya, ${updated} uppdaterade)`,
    ];
    if (invitationsAccepted > 0) {
      parts.push(`${invitationsAccepted} inbjudan(ar) automatiskt accepterade`);
    }

    return NextResponse.json({
      message: parts.join(". "),
      total: allClerkUsers.length,
      created,
      updated,
      invitationsAccepted,
    });
  } catch (e) {
    console.error("POST /api/admin/sync-users error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
