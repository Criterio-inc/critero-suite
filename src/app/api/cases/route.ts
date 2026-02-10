import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateId } from "@/lib/id-generator";

export async function GET() {
  const cases = await prisma.case.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(cases);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = await generateId("case");

  const created = await prisma.case.create({
    data: {
      id,
      name: body.name,
      domainProfile: body.domainProfile ?? "generisk_lou",
      orgName: body.orgName ?? "",
      procurementType: body.procurementType ?? "nyanskaffning",
      estimatedValueSek: body.estimatedValueSek ?? 0,
      timeline: JSON.stringify(body.timeline ?? {}),
      goals: JSON.stringify(body.goals ?? []),
      scopeIn: JSON.stringify(body.scopeIn ?? []),
      scopeOut: JSON.stringify(body.scopeOut ?? []),
      dependencies: JSON.stringify(body.dependencies ?? []),
      governance: JSON.stringify(body.governance ?? {}),
      status: "draft",
      currentPhase: "A_start_styrning",
      owner: body.owner ?? "",
    },
  });

  return NextResponse.json(created, { status: 201 });
}
