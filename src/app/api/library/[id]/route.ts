import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireWriteAccess, ApiError } from "@/lib/auth-guard";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await params;
    const item = await prisma.libraryItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);

    const { id } = await params;
    const body = await req.json();

    const data: Record<string, unknown> = { ...body };
    if (data.content !== undefined && typeof data.content !== "string") {
      data.content = JSON.stringify(data.content);
    }
    if (data.tags !== undefined && typeof data.tags !== "string") {
      data.tags = JSON.stringify(data.tags);
    }

    const updated = await prisma.libraryItem.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);

    const { id } = await params;
    await prisma.libraryItem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
