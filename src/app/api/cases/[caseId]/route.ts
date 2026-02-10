import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const c = await prisma.case.findUnique({ where: { id: caseId } });
  if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(c);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const body = await req.json();

  // Serialize JSON fields if present
  const data: Record<string, unknown> = { ...body };
  for (const key of ["timeline", "goals", "scopeIn", "scopeOut", "dependencies", "governance"]) {
    if (data[key] !== undefined && typeof data[key] !== "string") {
      data[key] = JSON.stringify(data[key]);
    }
  }

  const updated = await prisma.case.update({
    where: { id: caseId },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  await prisma.case.delete({ where: { id: caseId } });
  return NextResponse.json({ ok: true });
}
