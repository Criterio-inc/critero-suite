import { prisma } from "./db";

export interface ValidationWarning {
  entityType: string;
  entityId: string;
  entityTitle: string;
  field: string;
  message: string;
  severity: "warning" | "info";
}

/**
 * Run soft validation rules on all entities in a case.
 * Returns warnings (not errors) - these are business rule suggestions.
 */
export async function validateCase(caseId: string): Promise<ValidationWarning[]> {
  const warnings: ValidationWarning[] = [];

  const [needs, requirements, risks, criteria, scores] = await Promise.all([
    prisma.need.findMany({ where: { caseId } }),
    prisma.requirement.findMany({ where: { caseId } }),
    prisma.risk.findMany({ where: { caseId } }),
    prisma.criterion.findMany({ where: { caseId } }),
    prisma.score.findMany({ where: { caseId } }),
  ]);

  // Need: must have >= 1 source
  for (const n of needs) {
    const sources = parseJsonArr(n.sources);
    if (sources.length === 0) {
      warnings.push({
        entityType: "need", entityId: n.id, entityTitle: n.title,
        field: "sources", message: "Behov saknar källa (source)", severity: "warning",
      });
    }
    if (!n.consequenceIfNotMet) {
      warnings.push({
        entityType: "need", entityId: n.id, entityTitle: n.title,
        field: "consequenceIfNotMet", message: "Konsekvens om ej uppfyllt saknas", severity: "warning",
      });
    }
  }

  // Requirement: must link >= 1 Need
  for (const r of requirements) {
    const linked = parseJsonArr(r.linkedNeeds);
    if (linked.length === 0) {
      warnings.push({
        entityType: "requirement", entityId: r.id, entityTitle: r.title,
        field: "linkedNeeds", message: "Krav saknar koppling till behov", severity: "warning",
      });
    }
    // SKA-krav: must have bidEvidence + opsFollowUp
    if (r.level === "SKA") {
      const verif = parseJsonObj(r.verification);
      if (!verif.bidEvidence) {
        warnings.push({
          entityType: "requirement", entityId: r.id, entityTitle: r.title,
          field: "verification", message: "SKA-krav saknar bidEvidence i verifieringsplan", severity: "warning",
        });
      }
      if (!verif.opsFollowUp) {
        warnings.push({
          entityType: "requirement", entityId: r.id, entityTitle: r.title,
          field: "verification", message: "SKA-krav saknar opsFollowUp i verifieringsplan", severity: "warning",
        });
      }
    }
  }

  // Risk with category data_exit: must link >= 1 Requirement
  for (const r of risks) {
    if (r.category === "data_exit") {
      const linkedReqs = parseJsonArr(r.relatedRequirements);
      if (linkedReqs.length === 0) {
        warnings.push({
          entityType: "risk", entityId: r.id, entityTitle: r.title,
          field: "relatedRequirements", message: "Data & exit-risk saknar koppling till krav", severity: "warning",
        });
      }
    }
  }

  // Criteria: total weight should = 100
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  if (criteria.length > 0 && totalWeight !== 100) {
    warnings.push({
      entityType: "criterion", entityId: "ALL", entityTitle: "Alla kriterier",
      field: "weight", message: `Total vikt = ${totalWeight}%, ska vara 100%`, severity: "warning",
    });
  }

  // Criterion: should link >= 1 Requirement OR have evidenceRequired
  for (const c of criteria) {
    const linked = parseJsonArr(c.linkedRequirements);
    if (linked.length === 0 && !c.evidenceRequired) {
      warnings.push({
        entityType: "criterion", entityId: c.id, entityTitle: c.title,
        field: "linkedRequirements", message: "Kriterium saknar koppling till krav och evidenskrav", severity: "info",
      });
    }
  }

  // Score: must have justification + scorer
  for (const s of scores) {
    if (!s.justification) {
      warnings.push({
        entityType: "score", entityId: s.id, entityTitle: `Score ${s.id}`,
        field: "justification", message: "Poäng saknar motivering", severity: "warning",
      });
    }
    if (!s.scorer) {
      warnings.push({
        entityType: "score", entityId: s.id, entityTitle: `Score ${s.id}`,
        field: "scorer", message: "Poäng saknar bedömare", severity: "warning",
      });
    }
  }

  return warnings;
}

function parseJsonArr(val: string): unknown[] {
  try { return JSON.parse(val); } catch { return []; }
}

function parseJsonObj(val: string): Record<string, unknown> {
  try { return JSON.parse(val); } catch { return {}; }
}
