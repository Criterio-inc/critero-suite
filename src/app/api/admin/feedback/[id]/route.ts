import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requirePlatformAdmin, ApiError } from "@/lib/auth-guard";

// PATCH /api/admin/feedback/[id] — update feedback status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await requireAuth();
    requirePlatformAdmin(ctx);

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!["ny", "granskad", "klar"].includes(status)) {
      return NextResponse.json(
        { error: "Ogiltig status" },
        { status: 400 },
      );
    }

    const feedback = await prisma.feedback.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ feedback });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    console.error("Admin feedback PATCH error:", e);
    return NextResponse.json(
      { error: "Kunde inte uppdatera feedback" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/feedback/[id] — delete feedback
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await requireAuth();
    requirePlatformAdmin(ctx);

    const { id } = await params;

    await prisma.feedback.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    console.error("Admin feedback DELETE error:", e);
    return NextResponse.json(
      { error: "Kunde inte ta bort feedback" },
      { status: 500 },
    );
  }
}
