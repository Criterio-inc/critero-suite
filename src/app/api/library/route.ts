import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");
  const profile = searchParams.get("profile");

  const where: Record<string, unknown> = {};
  if (type) where.type = type;
  if (profile) where.profile = profile;

  const items = await prisma.libraryItem.findMany({
    where,
    orderBy: { title: "asc" },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const item = await prisma.libraryItem.create({
    data: {
      type: body.type,
      profile: body.profile ?? "",
      cluster: body.cluster ?? "",
      title: body.title,
      description: body.description ?? "",
      content: typeof body.content === "string" ? body.content : JSON.stringify(body.content ?? {}),
      tags: typeof body.tags === "string" ? body.tags : JSON.stringify(body.tags ?? []),
    },
  });

  return NextResponse.json(item, { status: 201 });
}
