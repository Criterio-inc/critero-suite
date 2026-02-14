// ============================================================
// Entity metadata – drives generic components (lists, forms, filters)
// ============================================================

import type { EntityType } from "@/types/entities";

export interface FieldMeta {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "multiselect"
    | "json"
    | "boolean"
    | "date"
    | "file"
    | "tag-list"
    | "entity-picker"
    | "key-value-repeater"
    | "verification"
    | "ordered-list";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  /** Show in list table */
  listVisible?: boolean;
  /** Show in detail view */
  detailVisible?: boolean;
  /** Column width hint for list */
  width?: string;
  /** Contextual help text (LOU guidance) shown as tooltip */
  helpText?: string;
  /** Config for entity-picker: which entity type to fetch */
  entityPickerConfig?: {
    entityType: string;
    label: string;
  };
  /** Column definitions for key-value-repeater in array mode */
  repeaterColumns?: { key: string; label: string; placeholder?: string }[];
}

export interface EntityMeta {
  type: EntityType;
  plural: string;
  singularLabel: string;
  pluralLabel: string;
  prefix: string;
  icon: string; // lucide icon name (e.g. "lightbulb", "ruler")
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
  helpText: "Styr arbetsflödet. Godkänd = granskad och redo. Låst = kan inte ändras utan ny version.",
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
  helpText: "P1 = verksamhetskritiskt, måste tillgodoses. P2 = viktigt men hanteras med BÖR-krav. P3 = nice-to-have.",
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
  helpText: "SKA = obligatoriskt, anbud som inte uppfyller diskvalificeras. BÖR = utvärderas men eliminerar inte. Tips: om ett krav ändras från SKA till BÖR, lägg till en utvärderingsfråga där anbudsgivaren redogör för sin uppfyllnad.",
};

const ownerField: FieldMeta = {
  key: "owner",
  label: "Ansvarig",
  type: "text",
  placeholder: "Namn eller roll",
  helpText: "Vem ansvarar för detta objekt? Ange namn eller roll (t.ex. 'Projektledare').",
};

const tagsField: FieldMeta = {
  key: "tags",
  label: "Taggar",
  type: "tag-list",
  helpText: "Fritext-taggar för filtrering och kategorisering. Bra för att markera teman eller ursprung.",
};

const clusterField: FieldMeta = {
  key: "cluster",
  label: "Kluster",
  type: "select",
  options: [], // populated dynamically from profile
  listVisible: true,
  helpText: "Grupperar objekt tematiskt. Kluster styrs av vald domänprofil och underlättar spårbarhet.",
};

// --- Entity meta registry ---

export const ENTITY_META: Record<EntityType, EntityMeta> = {
  case: {
    type: "case",
    plural: "cases",
    singularLabel: "Upphandling",
    pluralLabel: "Upphandlingar",
    prefix: "CASE",
    icon: "clipboard-list",
    listFields: ["name", "domainProfile", "status", "currentPhase", "owner"],
    filterFields: ["status", "domainProfile"],
    fields: [
      { key: "name", label: "Namn", type: "text", required: true, listVisible: true, helpText: "Beskrivande namn för upphandlingen, t.ex. 'Nytt verksamhetssystem för avfallshantering'." },
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
        helpText: "Profilen styr vilka kluster, kravmallar, riskmallar och gates som aktiveras. Välj den som bäst matchar er domän.",
      },
      { key: "orgName", label: "Organisation", type: "text", helpText: "Upphandlande myndighet/organisation." },
      {
        key: "procurementType",
        label: "Typ av upphandling",
        type: "select",
        options: [
          { value: "nyanskaffning", label: "Nyanskaffning" },
          { value: "byte", label: "Byte" },
          { value: "utokning", label: "Utökning" },
        ],
        helpText: "Nyanskaffning = inget befintligt avtal. Byte = ersätter befintlig leverantör. Utökning = utvidgar befintligt avtal.",
      },
      { key: "estimatedValueSek", label: "Uppskattat värde (SEK)", type: "number", helpText: "Totalt kontraktsvärde inkl. optioner. Styr vilka tröskelvärden och förfaranderegler som gäller enl. LOU." },
      { key: "goals", label: "Mål", type: "tag-list", helpText: "Övergripande upphandlingsmål. Minst 1 mål krävs för att passera gate A." },
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
    icon: "users",
    listFields: ["title", "role", "unit", "influence", "interest", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Namn", type: "text", required: true, listVisible: true, helpText: "Namn på intressenten (person, roll eller organisation)." },
      { key: "role", label: "Roll", type: "text", listVisible: true, helpText: "T.ex. beställare, slutanvändare, IT-chef, facklig representant." },
      { key: "unit", label: "Enhet", type: "text", listVisible: true, helpText: "Organisatorisk enhet eller avdelning." },
      { key: "influence", label: "Inflytande (1-5)", type: "number", listVisible: true, helpText: "Hur mycket makt har intressenten över upphandlingens utfall? 5 = beslutsfattare." },
      { key: "interest", label: "Intresse (1-5)", type: "number", listVisible: true, helpText: "Hur engagerad är intressenten? 5 = aktivt involverad. Hög inflytande + lågt intresse = risk." },
      { key: "engagementStrategy", label: "Engagemangsstrategi", type: "textarea", helpText: "Hur ska intressenten hanteras? T.ex. 'Informera löpande' eller 'Involvera i kravworkshops'." },
      { key: "contact", label: "Kontakt", type: "text", helpText: "E-post eller telefon." },
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
    icon: "presentation",
    listFields: ["title", "date", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Beskrivande namn, t.ex. 'Behovsworkshop verksamhetsprocess'." },
      { key: "date", label: "Datum", type: "date", listVisible: true, helpText: "Planerat eller genomfört datum." },
      { key: "participants", label: "Deltagare", type: "tag-list", placeholder: "Lägg till deltagare...", helpText: "Lista alla deltagare. Inkludera roller (beställare, slutanvändare, IT, leverantör etc.)." },
      { key: "agenda", label: "Agenda", type: "ordered-list", placeholder: "Lägg till agendapunkt...", helpText: "Numrerade agendapunkter. Håll fokus — max 5-7 punkter per workshop." },
      { key: "notes", label: "Anteckningar", type: "textarea", helpText: "Sammanfattning av diskussionen och viktiga slutsatser." },
      { key: "outputs", label: "Resultat", type: "tag-list", placeholder: "Lägg till resultat...", helpText: "Konkreta leverabler, t.ex. 'Prioriterad behovslista', 'Riskregister uppdaterat'." },
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
    icon: "paperclip",
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
    icon: "lightbulb",
    listFields: ["title", "cluster", "priority", "status"],
    filterFields: ["status", "priority", "cluster"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Kort och specifikt, t.ex. 'Snabbare handläggning av ärenden'." },
      { ...clusterField },
      { key: "statement", label: "Behovsbeskrivning", type: "textarea", helpText: "Beskriv behovet ur verksamhetens perspektiv. Undvik lösningsförslag — fokusera på *vad* som behövs, inte *hur*." },
      { key: "asOutcome", label: "Som önskat resultat", type: "textarea", helpText: "Formulera behovet som ett mätbart resultat. 'Vi vill att...' Underlättar verifiering och uppföljning." },
      { ...priorityField },
      { key: "consequenceIfNotMet", label: "Konsekvens om ej uppfyllt", type: "textarea", helpText: "Vad händer om behovet inte tillgodoses? Stödjer proportionalitetsbedömning och SKA/BÖR-nivå." },
      {
        key: "sources",
        label: "Källor",
        type: "tag-list",
        placeholder: "Lägg till källa...",
        helpText: "Varifrån kommer behovet? T.ex. 'Workshop 2024-01-15', 'Intervju driftchef', 'Lagkrav SoL 3§'.",
      },
      {
        key: "metrics",
        label: "Mätetal",
        type: "key-value-repeater",
        repeaterColumns: [
          { key: "indicator", label: "Indikator", placeholder: "T.ex. svarstid" },
          { key: "baseline", label: "Nuläge", placeholder: "T.ex. 48h" },
          { key: "target", label: "Mål", placeholder: "T.ex. 4h" },
        ],
        helpText: "Mätbara indikatorer som visar om behovet är uppfyllt. Krävs för nyttorealisering i fas D.",
      },
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
    icon: "shield-alert",
    listFields: ["title", "category", "score", "status"],
    filterFields: ["status", "category"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Kort beskrivning av risken, t.ex. 'Leverantörsberoende av nyckelperson'." },
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
        helpText: "Huvudkategori. Domänprofilen kan kräva att vissa kategorier täcks.",
      },
      { key: "description", label: "Beskrivning", type: "textarea", helpText: "Beskriv orsak, händelse och konsekvens. 'Om X inträffar kan det leda till Y.'" },
      { key: "likelihood", label: "Sannolikhet (1-5)", type: "number", helpText: "1 = osannolikt, 3 = möjligt, 5 = nästan säkert." },
      { key: "impact", label: "Konsekvens (1-5)", type: "number", helpText: "1 = försumbar, 3 = allvarlig, 5 = katastrofal. Avser påverkan på tid, kostnad eller kvalitet." },
      { key: "score", label: "Risktal", type: "number", listVisible: true, helpText: "Sannolikhet × Konsekvens. ≥12 = hög risk (bör ha åtgärd). ≥16 = kritisk (bör kopplas till krav)." },
      { key: "mitigation", label: "Åtgärd", type: "textarea", helpText: "Hur hanteras risken? Acceptera, eliminera, minska eller överför. Koppla gärna till krav." },
      { key: "riskOwner", label: "Riskägare", type: "text", helpText: "Vem ansvarar för att övervaka och hantera risken?" },
      {
        key: "relatedNeeds",
        label: "Kopplade behov",
        type: "entity-picker",
        entityPickerConfig: { entityType: "needs", label: "behov" },
        helpText: "Vilka behov påverkas om risken inträffar? Stödjer spårbarhet och proportionalitetsbedömning.",
      },
      {
        key: "relatedRequirements",
        label: "Kopplade krav",
        type: "entity-picker",
        entityPickerConfig: { entityType: "requirements", label: "krav" },
        helpText: "Krav som adresserar risken. Höga risker (≥12) bör ha minst ett kopplat SKA-krav.",
      },
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
    icon: "ruler",
    listFields: ["title", "reqType", "cluster", "level", "status"],
    filterFields: ["status", "reqType", "level", "cluster"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Kort och entydigt, t.ex. 'API-integration mot ekonomisystem'." },
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
        helpText: "Funktionellt = vad systemet gör. Icke-funktionellt = kvalitetskrav (prestanda, säkerhet, tillgänglighet). Leverantörskrav = krav på företaget (LIS, bemanning). Kontraktsvillkor = avtalsspecifika (SLA, viten, exit).",
      },
      { ...clusterField },
      { ...levelField },
      { key: "text", label: "Kravtext", type: "textarea", required: true, helpText: "Skriv verifierbart. Undvik vaga ord som 'bra', 'lämplig'. SKA-krav måste vara binärt testbara. Tips: komplettera BÖR-krav med en utvärderingsfråga i TendSign/anbudsformulär, t.ex. 'Redogör för ert stöd för...'." },
      { key: "rationale", label: "Motivering", type: "textarea", helpText: "Varför finns kravet? Koppla till behov, risk eller lagkrav. En stark motivering stärker proportionaliteten vid överprövning. Beskriv konsekvensen om kravet inte uppfylls." },
      {
        key: "linkedNeeds",
        label: "Kopplade behov",
        type: "entity-picker",
        entityPickerConfig: { entityType: "needs", label: "behov" },
        helpText: "Vilka behov adresserar kravet? Alla krav bör ha minst en koppling — annars risk för 'hängande' krav.",
      },
      {
        key: "linkedRisks",
        label: "Kopplade risker",
        type: "entity-picker",
        entityPickerConfig: { entityType: "risks", label: "risker" },
        helpText: "Koppla till risker som motiverar kravet. Särskilt viktigt för SKA-krav.",
      },
      {
        key: "verification",
        label: "Verifieringsplan",
        type: "verification",
        helpText: "Hur verifieras kravet? Anbud: t.ex. demo, intyg, referens. Implementation: testprotokoll, acceptanstest. Drift: SLA-uppföljning, revision. Tips: ställ utvärderingsfrågor i anbudsformuläret kopplat till verifieringen.",
      },
      {
        key: "conflictPriority",
        label: "Konfliktprioritet",
        type: "select",
        options: [
          { value: "P1", label: "P1 - Kritisk" },
          { value: "P2", label: "P2 - Viktig" },
          { value: "P3", label: "P3 - Önskvärd" },
        ],
        helpText: "Används vid målkonflikter mellan krav. P1 = får inte kompromissas.",
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
    icon: "scale",
    listFields: ["title", "weight", "scale", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Namn på kriteriet, t.ex. 'Funktionalitet', 'Pris', 'Implementeringskvalitet'." },
      { key: "weight", label: "Vikt (%)", type: "number", listVisible: true, helpText: "Kriteriets vikt i procent. Alla kriteriers vikt ska summera till 100. Reflekterar prioriteringen." },
      {
        key: "scale",
        label: "Skala",
        type: "select",
        options: [
          { value: "0-5", label: "0–5" },
          { value: "0-10", label: "0–10" },
        ],
        listVisible: true,
        helpText: "Poängskala för bedömning. 0-5 är vanligast. Skalan ska vara konsekvent över alla kriterier.",
      },
      {
        key: "anchors",
        label: "Poängankare",
        type: "key-value-repeater",
        helpText: "Beskriv vad varje poäng innebär. T.ex. 0 = 'Uppfyller inte', 3 = 'Godtagbart', 5 = 'Utmärkt'. Minskar bedömarsubjektivitet.",
      },
      { key: "evidenceRequired", label: "Kräver evidens", type: "textarea", helpText: "Vilken dokumentation ska leverantören bifoga som stöd? T.ex. referenscase, certifikat, projektplan." },
      { key: "scoringGuidance", label: "Bedömningsvägledning", type: "textarea", helpText: "Detaljerade instruktioner för bedömarna. Hur ska poängen motiveras? Vilka aspekter väger tyngst?" },
      {
        key: "linkedRequirements",
        label: "Kopplade krav",
        type: "entity-picker",
        entityPickerConfig: { entityType: "requirements", label: "krav" },
        helpText: "Vilka BÖR-krav utvärderas under detta kriterium? SKA-krav utvärderas binärt, inte via kriterier.",
      },
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
    icon: "inbox",
    listFields: ["title", "supplierName", "qualified", "status"],
    filterFields: ["status"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "Identifierande titel, t.ex. 'Anbud från Leverantör AB'." },
      { key: "supplierName", label: "Leverantör", type: "text", required: true, listVisible: true, helpText: "Anbudsgivarens juridiska namn." },
      { key: "receivedAt", label: "Mottaget", type: "date", helpText: "Datum anbud mottogs. Anbud inkomna efter anbudstidens utgång ska avvisas." },
      { key: "qualified", label: "Kvalificerad", type: "boolean", listVisible: true, helpText: "Uppfyller leverantören alla SKA-krav och kvalificeringskrav? Ej kvalificerade anbud utvärderas inte." },
      { key: "qualificationNotes", label: "Kvalificeringsnoteringar", type: "textarea", helpText: "Dokumentera kvalificeringsbeslut och eventuella avvikelser. Viktigt vid överprövning." },
      { key: "externalRef", label: "Extern referens", type: "text", helpText: "Referens i ert upphandlingssystem, t.ex. TendSign diarienummer eller Mercell referensnr. Möjliggör spårbarhet mellan systemen." },
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
    icon: "gavel",
    listFields: ["title", "decisionType", "chosen", "status"],
    filterFields: ["status", "decisionType"],
    fields: [
      { key: "title", label: "Titel", type: "text", required: true, listVisible: true, helpText: "T.ex. 'Val av förfarande: öppet förfarande'." },
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
        helpText: "Förfarandeval och tilldelning är obligatoriska gates. Alla beslut ska dokumenteras med motivering.",
      },
      {
        key: "alternatives",
        label: "Alternativ",
        type: "ordered-list",
        placeholder: "Lägg till alternativ...",
        helpText: "Lista alla övervägda alternativ — inte bara det valda. Stärker transparens vid överprövning.",
      },
      { key: "chosen", label: "Valt alternativ", type: "text", listVisible: true, helpText: "Det alternativ som valdes." },
      { key: "rationale", label: "Motivering", type: "textarea", helpText: "Varför valdes detta alternativ? Referera till LOU-principer, behov, risk eller andra beslutsstöd." },
      { key: "impactsCompetition", label: "Påverkan på konkurrens", type: "textarea", helpText: "Hur påverkar beslutet konkurrensen? LOU kräver att upphandlingar inte begränsar konkurrens i onödan." },
      { key: "attachments", label: "Bilagor", type: "tag-list", placeholder: "Lägg till bilaga...", helpText: "Referera till stöddokument, t.ex. 'Marknadsanalys v2', 'Styrgruppsbeslut 2024-02-01'." },
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
    icon: "file-text",
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
      { key: "generatedFrom", label: "Genererad från", type: "tag-list" },
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
