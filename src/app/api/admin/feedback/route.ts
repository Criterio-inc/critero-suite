import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requirePlatformAdmin, ApiError } from "@/lib/auth-guard";

// GET /api/admin/feedback — list all feedback (platform admin only)
export async function GET() {
  try {
    const ctx = await requireAuth();
    requirePlatformAdmin(ctx);

    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ feedbacks });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    console.error("Admin feedback GET error:", e);
    return NextResponse.json(
      { error: "Kunde inte hämta feedback" },
      { status: 500 },
    );
  }
}
