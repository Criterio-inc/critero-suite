import { prisma } from "./db";
import type { EntityType } from "@/types/entities";

// Map entity type to Prisma model accessor
const MODEL_MAP: Record<EntityType, string> = {
  case: "case",
  stakeholder: "stakeholder",
  workshop: "workshop",
  evidence: "evidence",
  need: "need",
  risk: "risk",
  requirement: "requirement",
  criterion: "criterion",
  bid: "bid",
  decision: "decision",
  document: "document",
};

// URL segment → entity type mapping
export const SEGMENT_TO_ENTITY: Record<string, EntityType> = {
  stakeholders: "stakeholder",
  workshops: "workshop",
  evidence: "evidence",
  needs: "need",
  risks: "risk",
  requirements: "requirement",
  criteria: "criterion",
  bids: "bid",
  decisions: "decision",
  documents: "document",
};

// Entity type → URL segment
export const ENTITY_TO_SEGMENT: Record<EntityType, string> = {
  case: "cases",
  stakeholder: "stakeholders",
  workshop: "workshops",
  evidence: "evidence",
  need: "needs",
  risk: "risks",
  requirement: "requirements",
  criterion: "criteria",
  bid: "bids",
  decision: "decisions",
  document: "documents",
};

export function getModel(entityType: EntityType) {
  const key = MODEL_MAP[entityType];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[key];
}

export async function findEntities(
  entityType: EntityType,
  caseId: string,
  filters?: Record<string, string>
) {
  const model = getModel(entityType);
  const where: Record<string, unknown> = { caseId };

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (value) where[key] = value;
    }
  }

  return model.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function findEntity(entityType: EntityType, id: string) {
  const model = getModel(entityType);
  return model.findUnique({ where: { id } });
}
