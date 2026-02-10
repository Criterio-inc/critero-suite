import { prisma } from "./db";
import type { GateResult, GateRule } from "@/types/workflow";

/**
 * Evaluate a single gate rule against the database for a given case.
 */
async function evaluateRule(rule: string, caseId: string): Promise<{ passed: boolean; actual?: number | string }> {
  // Parse rule string format: "entity.condition"
  // Examples: "needs.count>=5", "case.goals>=1", "criteria.sumWeight=100"

  // case.goals>=1
  if (rule === "case.goals>=1") {
    const c = await prisma.case.findUnique({ where: { id: caseId }, select: { goals: true } });
    const goals = c ? JSON.parse(c.goals) : [];
    const count = goals.length;
    return { passed: count >= 1, actual: count };
  }

  // stakeholders.count>=N
  const stakeholderMatch = rule.match(/^stakeholders\.count>=(\d+)$/);
  if (stakeholderMatch) {
    const threshold = parseInt(stakeholderMatch[1]);
    const count = await prisma.stakeholder.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // risks.count>=N
  const riskCountMatch = rule.match(/^risks\.count>=(\d+)$/);
  if (riskCountMatch) {
    const threshold = parseInt(riskCountMatch[1]);
    const count = await prisma.risk.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // needs.count>=N
  const needCountMatch = rule.match(/^needs\.count>=(\d+)$/);
  if (needCountMatch) {
    const threshold = parseInt(needCountMatch[1]);
    const count = await prisma.need.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // needs.allHaveSources
  if (rule === "needs.allHaveSources") {
    const needs = await prisma.need.findMany({ where: { caseId }, select: { sources: true } });
    const allHave = needs.every((n) => {
      const sources = JSON.parse(n.sources);
      return Array.isArray(sources) && sources.length > 0;
    });
    return { passed: needs.length === 0 || allHave, actual: needs.filter(n => {
      const s = JSON.parse(n.sources); return Array.isArray(s) && s.length > 0;
    }).length };
  }

  // needs.distinctClusters>=N
  const clusterMatch = rule.match(/^needs\.distinctClusters>=(\d+)$/);
  if (clusterMatch) {
    const threshold = parseInt(clusterMatch[1]);
    const needs = await prisma.need.findMany({ where: { caseId }, select: { cluster: true } });
    const distinct = new Set(needs.map((n) => n.cluster).filter(Boolean));
    return { passed: distinct.size >= threshold, actual: distinct.size };
  }

  // requirements.count>=N
  const reqCountMatch = rule.match(/^requirements\.count>=(\d+)$/);
  if (reqCountMatch) {
    const threshold = parseInt(reqCountMatch[1]);
    const count = await prisma.requirement.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // requirements.allLinkedToNeeds
  if (rule === "requirements.allLinkedToNeeds") {
    const reqs = await prisma.requirement.findMany({ where: { caseId }, select: { linkedNeeds: true } });
    const allLinked = reqs.every((r) => {
      const linked = JSON.parse(r.linkedNeeds);
      return Array.isArray(linked) && linked.length > 0;
    });
    return { passed: reqs.length === 0 || allLinked };
  }

  // requirements.SKA.allHaveBidEvidence
  if (rule === "requirements.SKA.allHaveBidEvidence") {
    const skaReqs = await prisma.requirement.findMany({
      where: { caseId, level: "SKA" },
      select: { verification: true },
    });
    const allHave = skaReqs.every((r) => {
      const v = JSON.parse(r.verification);
      return v && v.bidEvidence;
    });
    return { passed: skaReqs.length === 0 || allHave };
  }

  // criteria.count>=N
  const critCountMatch = rule.match(/^criteria\.count>=(\d+)$/);
  if (critCountMatch) {
    const threshold = parseInt(critCountMatch[1]);
    const count = await prisma.criterion.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // criteria.sumWeight=100
  if (rule === "criteria.sumWeight=100") {
    const criteria = await prisma.criterion.findMany({ where: { caseId }, select: { weight: true } });
    const sum = criteria.reduce((acc, c) => acc + c.weight, 0);
    return { passed: Math.abs(sum - 100) < 0.01, actual: sum };
  }

  // bids.count>=N
  const bidCountMatch = rule.match(/^bids\.count>=(\d+)$/);
  if (bidCountMatch) {
    const threshold = parseInt(bidCountMatch[1]);
    const count = await prisma.bid.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // decisions.has(type)
  const decisionMatch = rule.match(/^decisions\.has\((\w+)\)$/);
  if (decisionMatch) {
    const decisionType = decisionMatch[1];
    const count = await prisma.decision.count({ where: { caseId, decisionType } });
    return { passed: count > 0, actual: count };
  }

  // risks.hasCategory(category)
  const riskCatMatch = rule.match(/^risks\.hasCategory\((\w+)\)$/);
  if (riskCatMatch) {
    const category = riskCatMatch[1];
    const count = await prisma.risk.count({ where: { caseId, category } });
    return { passed: count > 0, actual: count };
  }

  // risks.dataExitLinkedToRequirement
  if (rule === "risks.dataExitLinkedToRequirement") {
    const dataExitRisks = await prisma.risk.findMany({
      where: { caseId, category: "data_exit" },
      select: { relatedRequirements: true },
    });
    const allLinked = dataExitRisks.every((r) => {
      const reqs = JSON.parse(r.relatedRequirements);
      return Array.isArray(reqs) && reqs.length > 0;
    });
    return { passed: dataExitRisks.length === 0 || allLinked };
  }

  // evidence.count>=N
  const evidenceCountMatch = rule.match(/^evidence\.count>=(\d+)$/);
  if (evidenceCountMatch) {
    const threshold = parseInt(evidenceCountMatch[1]);
    const count = await prisma.evidence.count({ where: { caseId } });
    return { passed: count >= threshold, actual: count };
  }

  // Unknown rule - pass by default
  return { passed: true };
}

/**
 * Evaluate all gates for a given phase and case.
 */
export async function evaluateGates(
  gates: GateRule[],
  caseId: string
): Promise<GateResult[]> {
  const results: GateResult[] = [];

  for (const gate of gates) {
    const { passed, actual } = await evaluateRule(gate.rule, caseId);
    results.push({
      ruleId: gate.id,
      label: gate.label,
      passed,
      severity: gate.severity,
      actual,
    });
  }

  return results;
}
