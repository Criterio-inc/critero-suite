import { prisma } from "./db";
import type { SearchResult } from "@/types/api";

/**
 * Global search across all entity types for a case.
 */
export async function searchEntities(caseId: string, query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  const results: SearchResult[] = [];
  const q = query.toLowerCase();

  // Search needs
  const needs = await prisma.need.findMany({ where: { caseId }, select: { id: true, title: true, statement: true, cluster: true } });
  for (const n of needs) {
    if (n.title.toLowerCase().includes(q) || n.statement.toLowerCase().includes(q)) {
      results.push({ id: n.id, entityType: "need", caseId, title: n.title, matchField: "title", matchSnippet: n.title });
    }
  }

  // Search requirements
  const reqs = await prisma.requirement.findMany({ where: { caseId }, select: { id: true, title: true, text: true, cluster: true } });
  for (const r of reqs) {
    if (r.title.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)) {
      results.push({ id: r.id, entityType: "requirement", caseId, title: r.title, matchField: "title", matchSnippet: r.title });
    }
  }

  // Search risks
  const risks = await prisma.risk.findMany({ where: { caseId }, select: { id: true, title: true, description: true } });
  for (const r of risks) {
    if (r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) {
      results.push({ id: r.id, entityType: "risk", caseId, title: r.title, matchField: "title", matchSnippet: r.title });
    }
  }

  // Search criteria
  const criteria = await prisma.criterion.findMany({ where: { caseId }, select: { id: true, title: true, scoringGuidance: true } });
  for (const c of criteria) {
    if (c.title.toLowerCase().includes(q)) {
      results.push({ id: c.id, entityType: "criterion", caseId, title: c.title, matchField: "title", matchSnippet: c.title });
    }
  }

  // Search stakeholders
  const stakeholders = await prisma.stakeholder.findMany({ where: { caseId }, select: { id: true, title: true, role: true } });
  for (const s of stakeholders) {
    if (s.title.toLowerCase().includes(q) || s.role.toLowerCase().includes(q)) {
      results.push({ id: s.id, entityType: "stakeholder", caseId, title: s.title, matchField: "title", matchSnippet: s.title });
    }
  }

  // Search decisions
  const decisions = await prisma.decision.findMany({ where: { caseId }, select: { id: true, title: true, rationale: true } });
  for (const d of decisions) {
    if (d.title.toLowerCase().includes(q) || d.rationale.toLowerCase().includes(q)) {
      results.push({ id: d.id, entityType: "decision", caseId, title: d.title, matchField: "title", matchSnippet: d.title });
    }
  }

  // Search documents
  const docs = await prisma.document.findMany({ where: { caseId }, select: { id: true, title: true, description: true } });
  for (const d of docs) {
    if (d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) {
      results.push({ id: d.id, entityType: "document", caseId, title: d.title, matchField: "title", matchSnippet: d.title });
    }
  }

  return results.slice(0, 50);
}
