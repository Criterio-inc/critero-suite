import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isUserAdmin } from "@/lib/user-features";

export const dynamic = "force-dynamic";

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
/*  GET /api/admin/users — list all users with features                 */
/* ------------------------------------------------------------------ */

export async function GET() {
  try {
    const userId = await getClerkUserId();

    // Require admin
    if (!userId || !(await isUserAdmin(userId))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      include: { features: true },
      orderBy: [{ isAdmin: "desc" }, { email: "asc" }],
    });

    // Transform to a cleaner shape
    const result = users.map((u) => ({
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
      isAdmin: u.isAdmin,
      createdAt: u.createdAt.toISOString(),
      features: Object.fromEntries(
        u.features.map((f) => [f.featureKey, f.enabled]),
      ),
    }));

    return NextResponse.json({ users: result });
  } catch (e) {
    console.error("GET /api/admin/users error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
