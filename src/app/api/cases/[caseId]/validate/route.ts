import { NextResponse } from "next/server";
import { validateCase } from "@/lib/validation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;
  const warnings = await validateCase(caseId);
  return NextResponse.json(warnings);
}
