import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/lib/db";
import { requireAuth, requireCaseAccess, requireWriteAccess, logAudit, ApiError } from "@/lib/auth-guard";

// GET /api/cases/[caseId]/maturity/[sessionId] - Get session with responses
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ caseId: string; sessionId: string }> }
) {
  try {
    const ctx = await requireAuth();
    const params = await props.params;
    const { caseId, sessionId } = params;
    await requireCaseAccess(caseId, ctx);

    const session = await db.maturitySession.findUnique({
      where: { id: sessionId },
      include: {
        responses: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

// PATCH /api/cases/[caseId]/maturity/[sessionId] - Update session
export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ caseId: string; sessionId: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);
    const params = await props.params;
    const { caseId, sessionId } = params;
    await requireCaseAccess(caseId, ctx);

    const rawBody = await req.json();

    // Whitelist allowed fields to prevent mass assignment
    const ALLOWED = ["name", "status", "respondentEmail", "respondentRole", "startedAt", "completedAt"];
    const data: Record<string, unknown> = {};
    for (const key of ALLOWED) {
      if (rawBody[key] !== undefined) data[key] = rawBody[key];
    }
    data.updatedAt = new Date();

    const session = await db.maturitySession.update({
      where: { id: sessionId },
      data,
    });

    return NextResponse.json(session);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

// DELETE /api/cases/[caseId]/maturity/[sessionId] - Delete session
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ caseId: string; sessionId: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);
    const params = await props.params;
    const { caseId, sessionId } = params;
    await requireCaseAccess(caseId, ctx);

    await db.maturitySession.delete({
      where: { id: sessionId },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
