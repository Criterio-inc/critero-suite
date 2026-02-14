/**
 * Klientbaserad exportmodul för verktyg (browser-only).
 *
 * Stöder JSON, CSV (semikolonseparerad med BOM), XLSX (via ExcelJS)
 * och PDF (via jsPDF + jspdf-autotable).
 *
 * Ingen användning av Buffer, Prisma eller andra server-API:er.
 */

import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ---------------------------------------------------------------------------
// Typer
// ---------------------------------------------------------------------------

export interface ExportSheet {
  name: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface ExportMetadata {
  toolName: string;
  exportDate: string;
  subtitle?: string;
}

export interface PdfSection {
  title: string;
  type: "table" | "keyvalue";
  headers?: string[];
  rows?: (string | number)[][];
  pairs?: { label: string; value: string }[];
}

// ---------------------------------------------------------------------------
// Intern hjälpfunktion – trigga nedladdning i webbläsaren
// ---------------------------------------------------------------------------

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// 1. JSON-export
// ---------------------------------------------------------------------------

export function exportToJson(filename: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  triggerDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// 2. CSV-export (semikolonseparerad, UTF-8 BOM för Excel-kompatibilitet)
// ---------------------------------------------------------------------------

function escapeCsvValue(value: string | number): string {
  const str = String(value);
  if (str.includes(";") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][]
): void {
  const headerLine = headers.map(escapeCsvValue).join(";");
  const dataLines = rows.map((row) => row.map(escapeCsvValue).join(";"));
  // UTF-8 BOM (\uFEFF) så att Excel öppnar filen korrekt med svenska tecken
  const csv = "\uFEFF" + [headerLine, ...dataLines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  triggerDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// 3. XLSX-export (ExcelJS, klientsidan – ArrayBuffer, inte Buffer)
// ---------------------------------------------------------------------------

export async function exportToXlsx(
  filename: string,
  sheets: ExportSheet[],
  metadata: ExportMetadata
): Promise<void> {
  const wb = new ExcelJS.Workbook();

  // ---- Metadata-blad ----
  const metaSheet = wb.addWorksheet("Metadata");
  metaSheet.columns = [
    { header: "Egenskap", key: "key", width: 20 },
    { header: "Värde", key: "value", width: 40 },
  ];

  const metaHeaderRow = metaSheet.getRow(1);
  metaHeaderRow.font = { bold: true };
  metaHeaderRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE8EDF5" },
    };
  });

  metaSheet.addRow({ key: "Verktyg", value: metadata.toolName });
  metaSheet.addRow({ key: "Exportdatum", value: metadata.exportDate });
  if (metadata.subtitle) {
    metaSheet.addRow({ key: "Underrubrik", value: metadata.subtitle });
  }

  // ---- Datablad ----
  for (const sheet of sheets) {
    const ws = wb.addWorksheet(sheet.name);

    ws.columns = sheet.headers.map((header) => ({
      header,
      key: header,
      width: Math.max(12, header.length + 4),
    }));

    const headerRow = ws.getRow(1);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE8EDF5" },
      };
    });

    for (const row of sheet.rows) {
      ws.addRow(row);
    }
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  triggerDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// 4. PDF-export (jsPDF + jspdf-autotable, A4-format)
// ---------------------------------------------------------------------------

export async function exportToPdf(
  filename: string,
  sections: PdfSection[],
  metadata: ExportMetadata
): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // ---- Sidhuvud ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(metadata.toolName, margin, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(metadata.exportDate, pageWidth - margin, 20, { align: "right" });

  let yPos = 26;

  if (metadata.subtitle) {
    doc.setFontSize(11);
    doc.text(metadata.subtitle, margin, yPos);
    yPos += 6;
  }

  // Horisontell linje under sidhuvudet
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 8;

  // ---- Sektioner ----
  for (const section of sections) {
    if (yPos > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPos = 20;
    }

    // Sektionstitel
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(section.title, margin, yPos);
    yPos += 6;

    if (section.type === "table" && section.headers && section.rows) {
      autoTable(doc, {
        startY: yPos,
        head: [section.headers],
        body: section.rows.map((row) => row.map(String)),
        margin: { left: margin, right: margin },
        styles: {
          font: "helvetica",
          fontSize: 9,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [232, 237, 245],
          textColor: [30, 30, 30],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [248, 248, 252],
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yPos = (doc as any).lastAutoTable.finalY + 10;
    } else if (section.type === "keyvalue" && section.pairs) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      for (const pair of section.pairs) {
        if (yPos > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.text(`${pair.label}:`, margin, yPos);
        doc.setFont("helvetica", "normal");

        const labelWidth = doc.getTextWidth(`${pair.label}: `);
        const valueX = margin + labelWidth;
        const maxValueWidth = pageWidth - valueX - margin;
        const lines = doc.splitTextToSize(pair.value, maxValueWidth);
        doc.text(lines, valueX, yPos);

        yPos += lines.length * 5 + 3;
      }

      yPos += 4;
    }
  }

  // ---- Sidfot med sidnummer ----
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Sida ${i} av ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" }
    );
    doc.setTextColor(0, 0, 0);
  }

  doc.save(filename);
}
