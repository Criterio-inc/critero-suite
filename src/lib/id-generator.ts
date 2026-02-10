import { prisma } from "./db";

const ENTITY_PREFIXES: Record<string, string> = {
  case: "CASE",
  stakeholder: "STAK",
  workshop: "WS",
  evidence: "EVID",
  need: "NEED",
  risk: "RISK",
  requirement: "REQ",
  criterion: "CRIT",
  bid: "BID",
  decision: "DEC",
  document: "DOC",
};

export async function generateId(entityType: string): Promise<string> {
  const prefix = ENTITY_PREFIXES[entityType];
  if (!prefix) throw new Error(`Unknown entity type: ${entityType}`);

  const result = await prisma.idCounter.upsert({
    where: { prefix },
    update: { counter: { increment: 1 } },
    create: { prefix, counter: 1 },
  });

  return `${prefix}-${String(result.counter).padStart(6, "0")}`;
}

export function getPrefix(entityType: string): string {
  return ENTITY_PREFIXES[entityType] || entityType.toUpperCase();
}

export function getEntityTypeFromId(id: string): string | null {
  const prefix = id.split("-")[0];
  const entry = Object.entries(ENTITY_PREFIXES).find(([, p]) => p === prefix);
  return entry ? entry[0] : null;
}
