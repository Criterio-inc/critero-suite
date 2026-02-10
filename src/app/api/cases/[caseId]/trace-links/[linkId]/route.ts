import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string; linkId: string }> }
) {
  const { linkId } = await params;
  await prisma.traceLink.delete({ where: { id: linkId } });
  return NextResponse.json({ ok: true });
}
