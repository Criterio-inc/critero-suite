import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const entityId = searchParams.get("entityId");

  const where: Record<string, unknown> = { caseId };

  // If entityId specified, get links FROM or TO this entity
  if (entityId) {
    const links = await prisma.traceLink.findMany({
      where: {
        caseId,
        OR: [{ fromId: entityId }, { toId: entityId }],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  }

  const links = await prisma.traceLink.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(links);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const body = await req.json();

  const link = await prisma.traceLink.create({
    data: {
      caseId,
      fromType: body.fromType,
      fromId: body.fromId,
      toType: body.toType,
      toId: body.toId,
      relation: body.relation,
      note: body.note ?? "",
    },
  });

  return NextResponse.json(link, { status: 201 });
}
