// ============================================================
// Entity metadata – drives generic components (lists, forms, filters)
// ============================================================

import type { EntityType } from "@/types/entities";

export interface FieldMeta {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "multiselect" | "json" | "boolean" | "date" | "file";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  /** Show in list table */
  listVisible?: boolean;
  /** Show in detail view */
  detailVisible?: boolean;
  /** Column width hint for list */
  width?: string;
}

export interface EntityMeta {
  type: EntityType;
  plural: string;
  singularLabel: string;
  pluralLabel: string;
  prefix: string;
  icon: string; // emoji for simple display
  listFields: string[];
  filterFields: string[];
  fields: FieldMeta[];
}

// --- Field definitions per entity type ---

const statusField: FieldMeta = {
  key: "status",
  label: "Status",
  type: "select",
  options: [
    { value: "draft", label: "Utkast" },
    { value: "in_review", label: "Under granskning" },
    { value: "approved", label: "Godkänd" },
    { value: "locked", label: "Låst" },
    { value: "archived", label: "Arkiverad" },
  ],
  listVisible: true,
};

const priorityField: FieldMeta = {
  key: "priority",
  label: "Prioritet",
  type: "select",
  options: [
    { value: "P1", label: "P1 - Kritisk" },
    { value: "P2", label: "P2 - Viktig" },
    { value: "P3", label: "P3 - Önskvärd" },
  ],
  listVisible: true,
};

const levelField: FieldMeta = {
  key: "level",
  label: "Nivå",
  type: "select",
  options: [
    { value: "SKA", label: "SKA (obligatoriskt)" },
    { value: "BOR", label: "BÖR (önskvärt)" },
  ],
  listVisible: true,
};

const ownerField: FieldMeta = {
  key: "owner",
  label: "Ansvarig",
  type: "text",
  placeholder: "Namn eller roll",
};

const tagsField: FieldMeta = {
  key: "tags",
  label: "Taggar",
  type: "json",
};

const clusterField: FieldMeta = {
  key: "cluster",
  label: "Kluster",
  type: "select",
  options: [], // populated dynamically from profile
  listVisible: true,
};

// --- Entity meta registry ---

export const ENTITY_META: Record<EntityType, EntityMeta> = {
  case: {
    type: "case",
    plural: "cases",
    singularLabel: "Upphandling",
    pluralLabel: "Upphandlingar",
    prefix: "CASE",
    icon: "📋",
    listFields: ["name", "domainProfile", "status", "currentPhase", "owner"],
    filterFields: ["status", "domainProfile"],
    fields: [
      { key: "name", label: "Namn", type: "text", required: true, listVisible: true },
      {
        key: "domainProfile",
        label: "Domänprofil",
        type: "select",
        options: [
          { value: "generisk_lou", label: "Generisk LOU" },
          { value: "avfall_nyanskaffning", label: "Avfall – nyanskaffning" },
          { value: "socialtjanst_byte", label: "Socialtjänst – byte" },
        ],
        required: true,
        listVisible: true,
      },
      { key: "orgName", label: "Organisation", type: "text" },
      {
        key: "procurementType",
        label: "Typ av upphandling",
        type: "select",
        options: [
          { value: "nyanskaffning", label: "Nyanskaffning" },
          { value: "byte", label: "Byte" },
          { value: "utokning", label: "Utökning" },
        ],
      },
      { key: "estimatedValueSek", label: "Uppskattat värde (SEK)", type: "number" },
      ownerField,
      statusField,
    ],
  },

  stakeholder: {
    type: "stakeholder",
    plural: "stakeholders",
    singularLabel: "Intressent",
    pluralLabel: "Intressenter",
    prefix: "STAK",
    icon: "👥",
    listFields: ["title", "role", "unit", "influence", "interest", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Namn", type: "text", required: true, listVisible: true },
      { key: "role", label: "Roll", type: "text", listVisible: true },
      { key: "unit", label: "Enhet", type: "text", listVisible: true },
      { key: "influence", label: "Inflytande (1-5)", type: "number", listVisible: true },
      { key: "interest", label: "Intresse (1-5)", type: "number", listVisible: true },
      { key: "engagementStrategy", label: "Engagemangsstrategi", type: "textarea" },
      { key: "contact", label: "Kontakt", type: "text" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  workshop: {
    type: "workshop",
    plural: "workshops",
    singularLabel: "Workshop",
    pluralLabel: "Workshops",
    prefix: "WS",
    icon: "🏛️",
    listFields: ["title", "date", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      { key: "date", label: "Datum", type: "date", listVisible: true },
      { key: "participants", label: "Deltagare", type: "json" },
      { key: "agenda", label: "Agenda", type: "json" },
      { key: "notes", label: "Anteckningar", type: "textarea" },
      { key: "outputs", label: "Resultat", type: "json" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  evidence: {
    type: "evidence",
    plural: "evidence",
    singularLabel: "Evidens",
    pluralLabel: "Evidens",
    prefix: "EVID",
    icon: "📎",
    listFields: ["title", "type", "source", "status"],
    filterFields: ["status", "type"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      {
        key: "type",
        label: "Typ",
        type: "select",
        options: [
          { value: "interview", label: "Intervju" },
          { value: "workshop_output", label: "Workshopresultat" },
          { value: "statistics", label: "Statistik" },
          { value: "contract", label: "Avtal" },
          { value: "market_note", label: "Marknadsnotering" },
          { value: "demo_note", label: "Demoanteckning" },
          { value: "policy", label: "Policy" },
          { value: "other", label: "Övrigt" },
        ],
        listVisible: true,
      },
      { key: "source", label: "Källa", type: "text", listVisible: true },
      { key: "uri", label: "URI/Länk", type: "text" },
      { key: "summary", label: "Sammanfattning", type: "textarea" },
      { key: "fileName", label: "Fil", type: "file" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  need: {
    type: "need",
    plural: "needs",
    singularLabel: "Behov",
    pluralLabel: "Behov",
    prefix: "NEED",
    icon: "💡",
    listFields: ["title", "cluster", "priority", "status"],
    filterFields: ["status", "priority", "cluster"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      { ...clusterField },
      { key: "statement", label: "Behovsbeskrivning", type: "textarea" },
      { key: "asOutcome", label: "Som önskat resultat", type: "textarea" },
      { ...priorityField },
      { key: "consequenceIfNotMet", label: "Konsekvens om ej uppfyllt", type: "textarea" },
      { key: "sources", label: "Källor", type: "json" },
      { key: "metrics", label: "Mätetal", type: "json" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  risk: {
    type: "risk",
    plural: "risks",
    singularLabel: "Risk",
    pluralLabel: "Risker",
    prefix: "RISK",
    icon: "⚠️",
    listFields: ["title", "category", "score", "status"],
    filterFields: ["status", "category"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      {
        key: "category",
        label: "Kategori",
        type: "select",
        options: [
          { value: "verksamhet", label: "Verksamhet" },
          { value: "teknik", label: "Teknik" },
          { value: "juridik", label: "Juridik" },
          { value: "leverans", label: "Leverans" },
          { value: "sakerhet", label: "Säkerhet" },
          { value: "ekonomi", label: "Ekonomi" },
          { value: "forandring", label: "Förändring" },
          { value: "data_exit", label: "Data & exit" },
        ],
        listVisible: true,
      },
      { key: "description", label: "Beskrivning", type: "textarea" },
      { key: "likelihood", label: "Sannolikhet (1-5)", type: "number" },
      { key: "impact", label: "Konsekvens (1-5)", type: "number" },
      { key: "score", label: "Risktal", type: "number", listVisible: true },
      { key: "mitigation", label: "Åtgärd", type: "textarea" },
      { key: "riskOwner", label: "Riskägare", type: "text" },
      { key: "relatedNeeds", label: "Kopplade behov", type: "json" },
      { key: "relatedRequirements", label: "Kopplade krav", type: "json" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  requirement: {
    type: "requirement",
    plural: "requirements",
    singularLabel: "Krav",
    pluralLabel: "Krav",
    prefix: "REQ",
    icon: "📐",
    listFields: ["title", "reqType", "cluster", "level", "status"],
    filterFields: ["status", "reqType", "level", "cluster"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      {
        key: "reqType",
        label: "Kravtyp",
        type: "select",
        options: [
          { value: "funktion", label: "Funktionellt" },
          { value: "nfr", label: "Icke-funktionellt" },
          { value: "leverantor", label: "Leverantörskrav" },
          { value: "kontraktsvillkor", label: "Kontraktsvillkor" },
        ],
        listVisible: true,
      },
      { ...clusterField },
      { ...levelField },
      { key: "text", label: "Kravtext", type: "textarea", required: true },
      { key: "rationale", label: "Motivering", type: "textarea" },
      { key: "linkedNeeds", label: "Kopplade behov", type: "json" },
      { key: "linkedRisks", label: "Kopplade risker", type: "json" },
      { key: "verification", label: "Verifieringsplan", type: "json" },
      {
        key: "conflictPriority",
        label: "Konfliktprioritet",
        type: "select",
        options: [
          { value: "P1", label: "P1 - Kritisk" },
          { value: "P2", label: "P2 - Viktig" },
          { value: "P3", label: "P3 - Önskvärd" },
        ],
      },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  criterion: {
    type: "criterion",
    plural: "criteria",
    singularLabel: "Kriterium",
    pluralLabel: "Kriterier",
    prefix: "CRIT",
    icon: "⚖️",
    listFields: ["title", "weight", "scale", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      { key: "weight", label: "Vikt (%)", type: "number", listVisible: true },
      {
        key: "scale",
        label: "Skala",
        type: "select",
        options: [
          { value: "0-5", label: "0–5" },
          { value: "0-10", label: "0–10" },
        ],
        listVisible: true,
      },
      { key: "anchors", label: "Poängankare", type: "json" },
      { key: "evidenceRequired", label: "Kräver evidens", type: "textarea" },
      { key: "scoringGuidance", label: "Bedömningsvägledning", type: "textarea" },
      { key: "linkedRequirements", label: "Kopplade krav", type: "json" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  bid: {
    type: "bid",
    plural: "bids",
    singularLabel: "Anbud",
    pluralLabel: "Anbud",
    prefix: "BID",
    icon: "📨",
    listFields: ["title", "supplierName", "qualified", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      { key: "supplierName", label: "Leverantör", type: "text", required: true, listVisible: true },
      { key: "receivedAt", label: "Mottaget", type: "date" },
      { key: "qualified", label: "Kvalificerad", type: "boolean", listVisible: true },
      { key: "qualificationNotes", label: "Kvalificeringsnoteringar", type: "textarea" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  decision: {
    type: "decision",
    plural: "decisions",
    singularLabel: "Beslut",
    pluralLabel: "Beslut",
    prefix: "DEC",
    icon: "🔨",
    listFields: ["title", "decisionType", "chosen", "status"],
    filterFields: ["status", "decisionType"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      {
        key: "decisionType",
        label: "Beslutstyp",
        type: "select",
        options: [
          { value: "forfarande", label: "Förfarandeval" },
          { value: "kravprincip", label: "Kravprincip" },
          { value: "utvarderingsmodell", label: "Utvärderingsmodell" },
          { value: "tilldelning", label: "Tilldelning" },
          { value: "avbrytande", label: "Avbrytande" },
          { value: "kontrakt", label: "Kontrakt" },
        ],
        listVisible: true,
      },
      { key: "alternatives", label: "Alternativ", type: "json" },
      { key: "chosen", label: "Valt alternativ", type: "text", listVisible: true },
      { key: "rationale", label: "Motivering", type: "textarea" },
      { key: "impactsCompetition", label: "Påverkan på konkurrens", type: "textarea" },
      { key: "attachments", label: "Bilagor", type: "json" },
      ownerField,
      statusField,
      tagsField,
    ],
  },

  document: {
    type: "document",
    plural: "documents",
    singularLabel: "Dokument",
    pluralLabel: "Dokument",
    prefix: "DOC",
    icon: "📄",
    listFields: ["title", "docType", "format", "status"],
    filterFields: ["status", "docType"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true },
      {
        key: "docType",
        label: "Dokumenttyp",
        type: "select",
        options: [
          { value: "behovsrapport", label: "Behovsrapport" },
          { value: "marknadsanalys", label: "Marknadsanalys" },
          { value: "kravbilaga", label: "Kravbilaga" },
          { value: "utvarderingsprotokoll", label: "Utvärderingsprotokoll" },
          { value: "qna_logg", label: "Q&A-logg" },
          { value: "versionslogg", label: "Versionslogg" },
          { value: "implementation_plan", label: "Implementeringsplan" },
          { value: "forvaltningsplan", label: "Förvaltningsplan" },
          { value: "defensibility_pack", label: "Defensibility pack" },
          { value: "other", label: "Övrigt" },
        ],
        listVisible: true,
      },
      {
        key: "format",
        label: "Format",
        type: "select",
        options: [
          { value: "pdf", label: "PDF" },
          { value: "docx", label: "DOCX" },
          { value: "xlsx", label: "XLSX" },
          { value: "csv", label: "CSV" },
          { value: "json", label: "JSON" },
        ],
        listVisible: true,
      },
      { key: "description", label: "Beskrivning", type: "textarea" },
      { key: "generatedFrom", label: "Genererad från", type: "json" },
      { key: "fileName", label: "Fil", type: "file" },
      ownerField,
      statusField,
      tagsField,
    ],
  },
};

export function getEntityMeta(type: EntityType): EntityMeta {
  return ENTITY_META[type];
}
