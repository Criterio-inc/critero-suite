import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireOrgAdmin, ApiError } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAuth();
    requireOrgAdmin(ctx);
    if (!ctx.orgId) return NextResponse.json({ error: "Ingen organisation" }, { status: 400 });

    const { email, role } = await req.json();
    if (!email) return NextResponse.json({ error: "E-post krävs" }, { status: 400 });

    const invitation = await prisma.invitation.create({
      data: {
        orgId: ctx.orgId,
        email: email.toLowerCase().trim(),
        role: role ?? "member",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return NextResponse.json({ invitation }, { status: 201 });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const ctx = await requireAuth();
    requireOrgAdmin(ctx);

    const { invitationId } = await req.json();
    await prisma.invitation.delete({ where: { id: invitationId } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
