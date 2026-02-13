import type { EnhancedCourse } from "./types";

export const formagabedomning: EnhancedCourse = {
  id: "formagabedomning",
  title: "Förmågebedömning",
  icon: "gauge",
  description:
    "Utvärdera förmågor inom människa, teknik och process — mognadsmodeller, gap-analys, handlingsplaner.",
  level: "Medel",
  estimatedMinutes: 30,
  tags: ["Förmåga", "Människa", "Teknik", "Process"],
  modules: [
    {
      id: "formagabedomning-1",
      title: "Vad är förmågebedömning?",
      theory: {
        content: [
          "Förmågebedömning är en systematisk metod för att utvärdera en organisations kapacitet att utföra sina uppgifter. Istället för att bara fråga “Vad behöver vi?” ställer man frågan “Vad kan vi idag, och vad behöver vi kunna imorgon?”",
          "Bedömningen görs inom tre dimensioner: Människa (kompetens, roller, organisation), Teknik (system, infrastruktur, verktyg) och Process (arbetssätt, flöden, rutiner).",
          "Förmågebedömning är särskilt värdefullt inför upphandlingar eftersom det hjälper till att identifiera vilka gap som faktiskt behöver slutas. Kanske är problemet inte att IT-systemet är dåligt, utan att användarna saknar utbildning.",
        ],
        keyPoints: [
          "Förmågebedömning utvärderar nuvarande kapacitet mot önskad kapacitet",
          "Tre dimensioner: Människa, Teknik och Process",
          "Hjälper att identifiera var det verkliga gapet ligger",
          "Särskilt värdefullt som underlag inför upphandlingar",
        ],
      },
      reflection: {
        question:
          "Om du tänker på din organisations största utmaning just nu — ligger grundorsaken i människa, teknik eller process?",
      },
    },
    {
      id: "formagabedomning-2",
      title: "Dimensionen Människa — kompetens, roller, organisation",
      theory: {
        content: [
          "Människodimensionen handlar om de mänskliga resurserna: har vi rätt kompetens, rätt roller och rätt organisationsstruktur? Det räcker inte med bra teknik om ingen kan använda den effektivt.",
          "Bedöm kompetens på flera nivåer: individuell kompetens, teamkompetens och organisationskompetens. Använd en mognadsskala från 1 (grundläggande medvetenhet) till 5 (expert som kan leda andra).",
          "Roller och ansvar måste vara tydligt definierade. Vanliga problem är oklar ansvarsfördelning, dubbelarbete och nyckelpersonsberoende. En RACI-matris är ett bra verktyg för att kartlägga vem som gör vad.",
        ],
        keyPoints: [
          "Bedöm kompetens på individ-, team- och organisationsnivå",
          "Använd en mognadsskala 1–5 för konsekvent bedömning",
          "Kartlägg roller, ansvar och nyckelpersonsberoenden",
          "RACI-matrisen tydliggör vem som gör vad",
        ],
      },
      reflection: {
        question:
          "Finns det nyckelpersonsberoenden i din verksamhet som utgör en risk — vad händer om den personen slutar?",
      },
    },
    {
      id: "formagabedomning-3",
      title: "Dimensionen Teknik — system, infrastruktur, integration",
      theory: {
        content: [
          "Teknikdimensionen utvärderar de system, verktyg och den infrastruktur som organisationen använder. Det handlar inte bara om enskilda system utan om hela IT-landskapet: hur systemen hänger ihop och var flaskhalsarna finns.",
          "Bedöm varje system utifrån funktionalitet, teknisk skuld, integrationsgrad och underhållbarhet. Använd även här en mognadsskala 1–5.",
          "En vanlig fallgrop är att fokusera enbart på det system som ska upphandlas, utan att beakta integrationerna. Integrationskostnaden kan vara större än själva systemkostnaden. Kartlägg alla dataflöden innan du kravställer.",
        ],
        keyPoints: [
          "Utvärdera hela IT-landskapet, inte bara enskilda system",
          "Bedöm: funktionalitet, teknisk skuld, integration, underhållbarhet",
          "Integrationskostnader är ofta större än väntat",
          "Kartlägg dataflöden mellan system innan kravställning",
        ],
      },
      reflection: {
        question:
          "Hur väl känner du till integrationerna mellan era system — finns det en aktuell systemkarta?",
      },
    },
    {
      id: "formagabedomning-4",
      title: "Dimensionen Process — arbetssätt, flöden, effektivitet",
      theory: {
        content: [
          "Processdimensionen handlar om hur arbetet faktiskt utförs: vilka steg ingår, vem gör vad, var uppstår flaskhalsar och var finns onödiga manuella moment?",
          "Kartlägg de viktigaste processerna genom processkartläggning. Rita upp varje steg, vilka system som används, vilka roller som är involverade och hur lång tid varje steg tar. Identifiera onödiga steg och väntetider.",
          "Bedöm processmognad på en skala från 1 (ad hoc) till 5 (optimerad och mätbar). De flesta organisationer ligger på nivå 2–3, vilket innebär att processerna finns men inte mäts systematiskt.",
        ],
        keyPoints: [
          "Processerna är bron mellan människa och teknik",
          "Använd processkartläggning för att visualisera arbetsflöden",
          "Identifiera flaskhalsar, manuella steg och onödiga överlämningar",
          "Processmognad 1–5: från ad hoc till optimerad",
        ],
      },
      reflection: {
        question:
          "Välj en nyckelprocess i din verksamhet — var i processen är det mest friktion och vad beror det på?",
      },
    },
    {
      id: "formagabedomning-5",
      title: "Gap-analys och handlingsplan",
      theory: {
        content: [
          "Gap-analys jämför nuvarande förmåga (nuläge) med önskad förmåga (börläge) och identifierar gapen. För varje dimension bedöms nuläget och börläget på mognadsskalan, och skillnaden utgör gapet.",
          "Prioritera gapen baserat på påverkan på verksamheten och genomförbarhet. Inte alla gap behöver slutas omedelbart — fokusera på de med störst påverkan.",
          "Handlingsplanen beskriver konkreta åtgärder: vad ska göras, vem ansvarar, när ska det vara klart och vad kostar det? Vissa gap slutas genom upphandling av ny teknik, andra genom kompetensutveckling. Ofta krävs en kombination.",
        ],
        keyPoints: [
          "Gap = skillnaden mellan nuläge och börläge på mognadsskalan",
          "Prioritera gap efter verksamhetspåverkan och genomförbarhet",
          "Handlingsplanen: vad, vem, när, kostnad",
          "Lösningen kan vara teknik, kompetens, process — eller en kombination",
        ],
      },
      reflection: {
        question:
          "Hur ser ditt största gap ut just nu — och vad skulle vara det första steget för att sluta det?",
      },
    },
  ],
};
