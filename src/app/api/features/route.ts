import { NextResponse } from "next/server";
import { getFeatures, saveFeatures, ALL_FEATURE_KEYS, type FeatureKey } from "@/config/features";

export const dynamic = "force-dynamic";

/** GET /api/features — return current feature flags */
export async function GET() {
  const features = getFeatures();
  return NextResponse.json({ features });
}

/** PATCH /api/features — update feature flags (admin only) */
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
      { status: 500 }
    );
  }
}
