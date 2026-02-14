import { prisma } from "./db";
import ExcelJS from "exceljs";

/**
 * Export all case data as JSON for backup/restore.
 */
export async function exportCaseJson(caseId: string) {
  const c = await prisma.case.findUnique({ where: { id: caseId } });
  if (!c) throw new Error("Case not found");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [stakeholders, workshops, evidence, needs, risks, requirements, criteria, bids, bidResponses, scores, decisions, documents, traceLinks] = await Promise.all([
    prisma.stakeholder.findMany({ where: { caseId } }),
    prisma.workshop.findMany({ where: { caseId } }),
    prisma.evidence.findMany({ where: { caseId } }),
    prisma.need.findMany({ where: { caseId } }),
    prisma.risk.findMany({ where: { caseId } }),
    prisma.requirement.findMany({ where: { caseId } }),
    prisma.criterion.findMany({ where: { caseId } }),
    prisma.bid.findMany({ where: { caseId } }),
    prisma.bidResponse.findMany({ where: { caseId } }),
    prisma.score.findMany({ where: { caseId } }),
    prisma.decision.findMany({ where: { caseId } }),
    prisma.document.findMany({ where: { caseId } }),
    prisma.traceLink.findMany({ where: { caseId } }),
  ]) as [any[], any[], any[], any[], any[], any[], any[], any[], any[], any[], any[], any[], any[]];

  return {
    exportedAt: new Date().toISOString(),
    case: c,
    stakeholders,
    workshops,
    evidence,
    needs,
    risks,
    requirements,
    criteria,
    bids,
    bidResponses,
    scores,
    decisions,
    documents,
    traceLinks,
  };
}

/**
 * Export entity data as CSV string.
 */
export function toCsv(items: Record<string, unknown>[], columns: string[]): string {
  const header = columns.join(";");
  const rows = items.map((item) =>
    columns.map((col) => {
      const val = item[col];
      if (val === null || val === undefined) return "";
      const str = String(val).replace(/"/g, '""');
      return str.includes(";") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
    }).join(";")
  );
  return [header, ...rows].join("\n");
}

/**
 * Export full case data as XLSX workbook (one sheet per entity type).
 */
export async function exportCaseXlsx(caseId: string): Promise<Buffer> {
  const data = await exportCaseJson(caseId);
  const wb = new ExcelJS.Workbook();
  wb.creator = "LOU-stöd";
  wb.created = new Date();

  const sheets: { name: string; items: Record<string, unknown>[] }[] = [
    { name: "Behov", items: data.needs },
    { name: "Krav", items: data.requirements },
    { name: "Risker", items: data.risks },
    { name: "Kriterier", items: data.criteria },
    { name: "Intressenter", items: data.stakeholders },
    { name: "Workshops", items: data.workshops },
    { name: "Evidens", items: data.evidence },
    { name: "Anbud", items: data.bids },
    { name: "Beslut", items: data.decisions },
    { name: "Dokument", items: data.documents },
    { name: "TraceLinks", items: data.traceLinks },
  ];

  for (const { name, items } of sheets) {
    if (items.length === 0) continue;
    const ws = wb.addWorksheet(name);
    const columns = Object.keys(items[0]);
    ws.columns = columns.map((key) => ({
      header: key,
      key,
      width: Math.max(key.length + 2, 15),
    }));
    ws.getRow(1).font = { bold: true };
    ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8EDF5" } };

    for (const item of items) {
      const row: Record<string, unknown> = {};
      for (const col of columns) {
        const val = item[col];
        row[col] = val === null || val === undefined ? "" : String(val);
      }
      ws.addRow(row);
    }
  }

  const buffer = await wb.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
