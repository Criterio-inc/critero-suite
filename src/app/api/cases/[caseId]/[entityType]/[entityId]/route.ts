import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth, requireCaseAccess, requireWriteAccess, logAudit, ApiError } from "@/lib/auth-guard";

const ENTITY_MAP: Record<string, string> = {
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

const JSON_FIELDS: Record<string, string[]> = {
  stakeholder: ["tags"],
  workshop: ["tags", "participants", "agenda", "outputs"],
  evidence: ["tags"],
  need: ["tags", "sources", "metrics"],
  risk: ["tags", "relatedNeeds", "relatedRequirements"],
  requirement: ["tags", "linkedNeeds", "linkedRisks", "verification"],
  criterion: ["tags", "anchors", "linkedRequirements"],
  bid: ["tags"],
  decision: ["tags", "alternatives", "attachments"],
  document: ["tags", "generatedFrom"],
};

/** Allowed fields per entity type to prevent mass assignment */
const ALLOWED_FIELDS: Record<string, string[]> = {
  stakeholder: ["title", "status", "owner", "tags", "role", "unit", "influence", "interest", "engagementStrategy", "contact"],
  workshop: ["title", "status", "owner", "tags", "date", "participants", "agenda", "outputs", "notes"],
  evidence: ["title", "status", "owner", "tags", "type", "source", "uri", "filePath", "fileName", "fileSize", "mimeType", "summary"],
  need: ["title", "status", "owner", "tags", "cluster", "statement", "asOutcome", "priority", "consequenceIfNotMet", "sources", "metrics"],
  risk: ["title", "status", "owner", "tags", "category", "description", "likelihood", "impact", "mitigation", "riskOwner", "relatedNeeds", "relatedRequirements"],
  requirement: ["title", "status", "owner", "tags", "reqType", "cluster", "level", "text", "rationale", "linkedNeeds", "linkedRisks", "verification", "conflictPriority"],
  criterion: ["title", "status", "owner", "tags", "weight", "scale", "anchors", "evidenceRequired", "scoringGuidance", "linkedRequirements"],
  bid: ["title", "status", "owner", "tags", "supplierName", "receivedAt", "qualified", "qualificationNotes", "externalRef"],
  decision: ["title", "status", "owner", "tags", "decisionType", "alternatives", "chosen", "rationale", "impactsCompetition", "attachments"],
  document: ["title", "status", "owner", "tags", "docType", "format", "generatedFrom", "uri", "filePath", "fileName", "fileSize", "checksum", "description"],
};

/** Filter body to only include allowed fields */
function filterAllowedFields(modelName: string, body: Record<string, unknown>): Record<string, unknown> {
  const allowed = ALLOWED_FIELDS[modelName];
  if (!allowed) return {};
  const filtered: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) filtered[key] = body[key];
  }
  return filtered;
}

function getModel(modelName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[modelName];
}

function serializeJsonFields(modelName: string, data: Record<string, unknown>) {
  const fields = JSON_FIELDS[modelName] ?? [];
  const result = { ...data };
  for (const field of fields) {
    if (result[field] !== undefined && typeof result[field] !== "string") {
      result[field] = JSON.stringify(result[field]);
    }
  }
  return result;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string; entityType: string; entityId: string }> }
) {
  try {
    const ctx = await requireAuth();
    const { caseId, entityType, entityId } = await params;
    await requireCaseAccess(caseId, ctx);

    const modelName = ENTITY_MAP[entityType];
    if (!modelName) return NextResponse.json({ error: "Unknown entity type" }, { status: 400 });

    const model = getModel(modelName);
    const item = await model.findUnique({ where: { id: entityId } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string; entityType: string; entityId: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);
    const { caseId, entityType, entityId } = await params;
    await requireCaseAccess(caseId, ctx);

    const modelName = ENTITY_MAP[entityType];
    if (!modelName) return NextResponse.json({ error: "Unknown entity type" }, { status: 400 });

    const rawBody = await req.json();
    const model = getModel(modelName);

    // Filter to allowed fields only (prevents mass assignment)
    const body = filterAllowedFields(modelName, rawBody);

    // Auto-calculate risk score
    if (modelName === "risk") {
      if (body.likelihood !== undefined || body.impact !== undefined) {
        const current = await model.findUnique({ where: { id: entityId } });
        const likelihood = (body.likelihood as number) ?? current.likelihood;
        const impact = (body.impact as number) ?? current.impact;
        body.score = likelihood * impact;
      }
    }

    // Increment version
    body.version = { increment: 1 };

    const data = serializeJsonFields(modelName, body);

    const updated = await model.update({
      where: { id: entityId },
      data,
    });
    await logAudit(ctx, "update", entityType, entityId);
    return NextResponse.json(updated);
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ caseId: string; entityType: string; entityId: string }> }
) {
  try {
    const ctx = await requireAuth();
    requireWriteAccess(ctx);
    const { caseId, entityType, entityId } = await params;
    await requireCaseAccess(caseId, ctx);

    const modelName = ENTITY_MAP[entityType];
    if (!modelName) return NextResponse.json({ error: "Unknown entity type" }, { status: 400 });

    const model = getModel(modelName);
    await model.delete({ where: { id: entityId } });
    await logAudit(ctx, "delete", entityType, entityId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ApiError) return e.toResponse();
    throw e;
  }
}
