import { NextResponse } from "next/server";
import { getUserFeatures, setUserFeatures, isUserAdmin } from "@/lib/user-features";

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
/*  GET /api/admin/users/[userId]/features                              */
/* ------------------------------------------------------------------ */

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const callerId = await getClerkUserId();
    if (!callerId || !(await isUserAdmin(callerId))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await params;
    const features = await getUserFeatures(userId);
    return NextResponse.json({ features });
  } catch (e) {
    console.error("GET user features error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/*  PATCH /api/admin/users/[userId]/features                            */
/* ------------------------------------------------------------------ */

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const callerId = await getClerkUserId();
    if (!callerId || !(await isUserAdmin(callerId))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await params;
    const body = await req.json();
    const updates: Record<string, boolean> = body.features;

    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const features = await setUserFeatures(userId, updates);
    return NextResponse.json({ features });
  } catch (e) {
    console.error("PATCH user features error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
