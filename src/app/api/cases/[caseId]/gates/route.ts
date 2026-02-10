import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { evaluateGates } from "@/lib/gates";
import { getGatesForPhase, getPhases } from "@/config/workflow";
import type { DomainProfile } from "@/types/entities";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  const { caseId } = await params;

  const c = await prisma.case.findUnique({
    where: { id: caseId },
    select: { domainProfile: true },
  });
  if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const profile = c.domainProfile as DomainProfile;
  const phases = getPhases(profile);

  const phaseResults = [];
  for (const phase of phases) {
    const gates = getGatesForPhase(profile, phase.id);
    const results = await evaluateGates(gates, caseId);
    const allBlockersPassed = results.filter((r) => r.severity === "blocker").every((r) => r.passed);
    const allWarningsPassed = results.filter((r) => r.severity === "warning").every((r) => r.passed);
    const total = results.length;
    const passed = results.filter((r) => r.passed).length;
    const completionPercent = total > 0 ? Math.round((passed / total) * 100) : 100;

    phaseResults.push({
      phaseId: phase.id,
      label: phase.label,
      gateResults: results,
      allBlockersPassed,
      allWarningsPassed,
      completionPercent,
    });
  }

  return NextResponse.json(phaseResults);
}
