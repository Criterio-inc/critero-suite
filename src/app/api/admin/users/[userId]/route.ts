import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requirePlatformAdmin, ApiError, logAudit } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  DELETE /api/admin/users/[userId] — remove a user from the DB       */
/*  Does NOT delete the Clerk user — only the local DB record.         */
/* ------------------------------------------------------------------ */

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const ctx = await requireAuth();
    requirePlatformAdmin(ctx);
    const { userId } = await params;

    // Prevent self-deletion
    if (userId === ctx.userId) {
      return NextResponse.json(
        { error: "Du kan inte ta bort dig själv" },
        { status: 400 },
      );
    }

    // Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: "Användaren hittades inte" },
        { status: 404 },
      );
    }

    await logAudit(ctx, "delete", "user", userId, { email: user.email });

    // Cascade: memberships, features, etc. are deleted via Prisma onDelete: Cascade
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    console.error("DELETE /api/admin/users/[userId] error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Okänt fel" },
      { status: 500 },
    );
  }
}
