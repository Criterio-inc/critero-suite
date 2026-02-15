import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireOrgAdmin, ApiError } from "@/lib/auth-guard";

export async function DELETE(req: NextRequest) {
  try {
    const ctx = await requireAuth();
    requireOrgAdmin(ctx);

    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "userId krävs" }, { status: 400 });
    if (userId === ctx.userId) return NextResponse.json({ error: "Du kan inte ta bort dig själv" }, { status: 400 });

    await prisma.orgMembership.deleteMany({
      where: { orgId: ctx.orgId, userId },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
