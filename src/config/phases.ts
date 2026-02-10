import type { PhaseConfig } from "@/types/workflow";

// ============================================================
// Generic LOU phase chain (base for all profiles)
// A → B → C → D
// ============================================================

export const BASE_PHASES: PhaseConfig[] = [
  {
    id: "A_start_styrning",
    label: "A. Start & styrning",
    description: "Definiera uppdrag, organisation och grundläggande ramar för upphandlingen.",
    subPhases: [
      {
        id: "A1_uppdragsramar",
        label: "A1. Uppdragsramar",
        description: "Mandat, mål, avgränsning, tidplan",
      },
      {
        id: "A2_organisation",
        label: "A2. Organisation & RACI",
        description: "Styrgrupp, projektgrupp, beslutsformer",
      },
      {
        id: "A3_dokumentationslogg",
        label: "A3. Dokumentationslogg",
        description: "Versionering och dokumentstyrning",
      },
      {
        id: "A4_riskregister",
        label: "A4. Riskregister v0",
        description: "Initial riskidentifiering",
      },
    ],
    gates: [
      {
        id: "A_goals",
        label: "Minst 1 mål definierat",
        rule: "case.goals>=1",
        severity: "blocker",
      },
      {
        id: "A_stakeholders",
        label: "Minst 3 intressenter identifierade",
        rule: "stakeholders.count>=3",
        severity: "blocker",
      },
      {
        id: "A_risks",
        label: "Minst 3 risker identifierade",
        rule: "risks.count>=3",
        severity: "warning",
      },
    ],
  },
  {
    id: "B_forbered",
    label: "B. Förbered upphandlingen",
    description: "Analysera behov, marknad och utforma krav och utvärderingsmodell.",
    subPhases: [
      {
        id: "B1_behovsanalys",
        label: "B1. Behovsanalys",
        description: "Kartlägg → analysera → beskriv behov",
      },
      {
        id: "B2_marknadsanalys",
        label: "B2. Marknadsanalys & marknadsdialog",
        description: "Omvärlds- och leverantörsanalys",
      },
      {
        id: "B3_upphandlingsstrategi",
        label: "B3. Upphandlingsstrategi",
        description: "Förfarandeval och strategi",
      },
      {
        id: "B4_kravdesign",
        label: "B4. Kravdesign",
        description: "SKA/BÖR + verifierbarhet + spårbarhet",
      },
      {
        id: "B5_utvarderingsdesign",
        label: "B5. Utvärderingsdesign",
        description: "Kriterier, viktning, poängsättning",
      },
    ],
    gates: [
      {
        id: "B_needs",
        label: "Minst 5 behov dokumenterade",
        rule: "needs.count>=5",
        severity: "blocker",
      },
      {
        id: "B_needs_sources",
        label: "Alla behov har källor",
        rule: "needs.allHaveSources",
        severity: "warning",
      },
      {
        id: "B_requirements",
        label: "Minst 5 krav definierade",
        rule: "requirements.count>=5",
        severity: "blocker",
      },
      {
        id: "B_req_linked",
        label: "Alla krav länkade till behov",
        rule: "requirements.allLinkedToNeeds",
        severity: "warning",
      },
      {
        id: "B_req_ska_evidence",
        label: "SKA-krav har verifieringsplan",
        rule: "requirements.SKA.allHaveBidEvidence",
        severity: "warning",
      },
      {
        id: "B_criteria",
        label: "Minst 2 utvärderingskriterier",
        rule: "criteria.count>=2",
        severity: "blocker",
      },
      {
        id: "B_criteria_weight",
        label: "Kriteriernas vikt summerar till 100",
        rule: "criteria.sumWeight=100",
        severity: "blocker",
      },
    ],
  },
  {
    id: "C_genomfor",
    label: "C. Genomför upphandlingen",
    description: "Publicera, hantera anbud och utvärdera.",
    subPhases: [
      {
        id: "C1_upphandlingsdokument",
        label: "C1. Upphandlingsdokument",
        description: "Sammanställ och publicera förfrågningsunderlag",
      },
      {
        id: "C2_fragor_svar",
        label: "C2. Frågor & svar",
        description: "Q&A-hantering under anbudstid",
      },
      {
        id: "C3_anbudsprovning",
        label: "C3. Anbudsprövning",
        description: "Formalia, SKA-krav, kvalificering",
      },
      {
        id: "C4_utvardering",
        label: "C4. Utvärdering",
        description: "Kalibrering, bedömning, protokoll",
      },
      {
        id: "C5_tilldelning",
        label: "C5. Tilldelning + avtalsspärr",
        description: "Tilldelningsbeslut och avtalsspärr (10/15 dagar)",
      },
    ],
    gates: [
      {
        id: "C_bids",
        label: "Minst 1 anbud mottaget",
        rule: "bids.count>=1",
        severity: "blocker",
      },
      {
        id: "C_decision_tilldelning",
        label: "Tilldelningsbeslut fattat",
        rule: "decisions.has(tilldelning)",
        severity: "blocker",
      },
    ],
  },
  {
    id: "D_kontrakt_forvaltning",
    label: "D. Kontrakt → implementation → förvaltning",
    description: "Kontraktsteckning, mobilisering och uppföljning.",
    subPhases: [
      {
        id: "D1_kontraktsgenomgang",
        label: "D1. Kontraktsgenomgång",
        description: "Gå igenom och teckna avtal",
      },
      {
        id: "D2_mobilisering",
        label: "D2. Mobilisering & implementation",
        description: "Planera och genomföra implementation",
      },
      {
        id: "D3_forvaltning",
        label: "D3. Förvaltningsupplägg",
        description: "Organisera löpande förvaltning",
      },
      {
        id: "D4_uppfoljning",
        label: "D4. Avtalsuppföljning & nyttorealisering",
        description: "Följ upp avtal och realisera nyttor",
      },
    ],
    gates: [
      {
        id: "D_decision_kontrakt",
        label: "Kontraktsbeslut fattat",
        rule: "decisions.has(kontrakt)",
        severity: "blocker",
      },
    ],
  },
];
