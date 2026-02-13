import { NextResponse } from "next/server";
import { getFeatures, saveFeatures, ALL_FEATURE_KEYS, type FeatureKey } from "@/config/features";
import { getUserFeatures, userExists } from "@/lib/user-features";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Clerk auth helper (dynamic import to avoid errors without Clerk)    */
/* ------------------------------------------------------------------ */

async function getClerkUserId(): Promise<string | null> {
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
/*  GET /api/features — return features for the current user           */
/* ------------------------------------------------------------------ */

export async function GET() {
  try {
    const userId = await getClerkUserId();

    // If Clerk is active and we have a userId, try per-user features from DB
    if (userId) {
      const exists = await userExists(userId);
      if (exists) {
        const features = await getUserFeatures(userId);
        return NextResponse.json({ features });
      }
      // User not synced to DB yet — fall through to global defaults (fail-open)
    }

    // Fallback: global feature-config.json (dev mode or user not in DB yet)
    const features = getFeatures();
    return NextResponse.json({ features });
  } catch (e) {
    console.error("GET /api/features error:", e);
    // Fail-open: return all features enabled
    const features = {} as Record<FeatureKey, boolean>;
    for (const key of ALL_FEATURE_KEYS) {
      features[key] = true;
    }
    return NextResponse.json({ features });
  }
}

/* ------------------------------------------------------------------ */
/*  PATCH /api/features — update global defaults (admin, backward compat) */
/* ------------------------------------------------------------------ */

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const updates: Record<string, boolean> = body.features;

    if (!updates || typeof updates !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Merge with existing — only update known keys
    const current = getFeatures();
    for (const key of ALL_FEATURE_KEYS) {
      if (key in updates && typeof updates[key] === "boolean") {
        current[key as FeatureKey] = updates[key];
      }
    }

    saveFeatures(current);
    return NextResponse.json({ features: current });
  } catch (e) {
    console.error("PATCH /api/features error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
