import { NextRequest, NextResponse } from "next/server";
import { searchEntities } from "@/lib/search";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const query = req.nextUrl.searchParams.get("q") ?? "";

  const results = await searchEntities(caseId, query);
  return NextResponse.json(results);
}
