import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireOrgAdmin, ApiError, logAudit } from "@/lib/auth-guard";
import { validateBody, removeMemberSchema } from "@/lib/api-validation";
import { z } from "zod";

const updateMemberRoleSchema = z.object({
  userId: z.string().min(1, "userId krävs"),
  role: z.enum(["admin", "member", "viewer"]),
});

export async function PATCH(req: NextRequest) {
  try {
    const ctx = await requireAuth();
    requireOrgAdmin(ctx);

    const rawBody = await req.json();
    const validated = validateBody(updateMemberRoleSchema, rawBody);
    if (!validated.success) return validated.response;
    const { userId, role } = validated.data;

    // Prevent changing own role
    if (userId === ctx.userId) {
      return NextResponse.json({ error: "Du kan inte ändra din egen roll" }, { status: 400 });
    }

    // Prevent demoting the last admin
    if (role !== "admin") {
      const adminCount = await prisma.orgMembership.count({
        where: { orgId: ctx.orgId, role: "admin" },
      });
      const target = await prisma.orgMembership.findFirst({
        where: { orgId: ctx.orgId, userId },
      });
      if (target?.role === "admin" && adminCount <= 1) {
        return NextResponse.json(
          { error: "Kan inte degradera den sista administratören" },
          { status: 400 },
        );
      }
    }

    await prisma.orgMembership.updateMany({
      where: { orgId: ctx.orgId, userId },
      data: { role },
    });

    await logAudit(ctx, "update", "member", userId, { role });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const ctx = await requireAuth();
    requireOrgAdmin(ctx);

    const rawBody = await req.json();
    const validated = validateBody(removeMemberSchema, rawBody);
    if (!validated.success) return validated.response;
    const data = validated.data;

    if (data.userId === ctx.userId) return NextResponse.json({ error: "Du kan inte ta bort dig själv" }, { status: 400 });

    await prisma.orgMembership.deleteMany({
      where: { orgId: ctx.orgId, userId: data.userId },
    });

    await logAudit(ctx, "delete", "member", data.userId);

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
