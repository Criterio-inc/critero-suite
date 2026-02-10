import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ============================================================
  // Library content
  // ============================================================

  // Kravblock: Data & exit (baserat på Digg)
  await prisma.libraryItem.create({
    data: {
      type: "requirement_block",
      profile: "",
      cluster: "Data & exit",
      title: "Kravblock: Data & exit",
      description: "Grundläggande krav för dataportabilitet och exit baserat på Diggs rekommendationer",
      content: JSON.stringify({
        requirements: [
          { title: "Export av data i öppna format", reqType: "funktion", level: "SKA", text: "Leverantören ska erbjuda export av all data i minst ett öppet, dokumenterat format (t.ex. CSV, JSON, XML).", rationale: "Säkerställer dataportabilitet och förhindrar inlåsning.", cluster: "Data & exit", verification: { bidEvidence: "Demo/beskrivning av exportfunktion", implementationProof: "Testexport", opsFollowUp: "Årlig verifiering" } },
          { title: "API för datauttag", reqType: "funktion", level: "BOR", text: "Systemet bör erbjuda API (REST/GraphQL) för programmatisk åtkomst till all data.", rationale: "Möjliggör integration och automatiserad dataåtkomst.", cluster: "Data & exit" },
          { title: "Dokumentation av datamodell", reqType: "funktion", level: "SKA", text: "Leverantören ska tillhandahålla komplett dokumentation av datamodell och dataformat.", rationale: "Nödvändigt för migrering och integration.", cluster: "Data & exit", verification: { bidEvidence: "Bifoga eller referera till dokumentation", implementationProof: "Granskning av dokumentation" } },
          { title: "Exit-process och tidplan", reqType: "kontraktsvillkor", level: "SKA", text: "Avtal ska innehålla tydlig exit-process med definierad tidplan (minst 6 månader).", rationale: "Säkerställer ordnad avveckling.", cluster: "Data & exit" },
          { title: "Dataägarskap", reqType: "kontraktsvillkor", level: "SKA", text: "All data som skapas i systemet ägs av kunden. Leverantören har ingen rätt att behålla eller använda data efter avtalsperiod.", rationale: "Juridisk klarhet kring dataägarskap.", cluster: "Data & exit" },
          { title: "Arkivering vid avtalsupphörande", reqType: "funktion", level: "BOR", text: "Systemet bör stödja arkivering av historiska data i lämpligt format vid avtalsupphörande.", rationale: "Lagkrav på arkivering.", cluster: "Data & exit" },
        ],
      }),
      tags: JSON.stringify(["digg", "dataportabilitet", "exit", "generisk"]),
    },
  });

  // Kravblock: Avfall - Kundregister
  await prisma.libraryItem.create({
    data: {
      type: "requirement_block",
      profile: "avfall_nyanskaffning",
      cluster: "Kund & abonnemang",
      title: "Kravblock: Kundregister & abonnemang",
      description: "Krav för kundregister, abonnemangshantering och avtal inom avfallshantering",
      content: JSON.stringify({
        requirements: [
          { title: "Kundregister med historik", reqType: "funktion", level: "SKA", text: "Systemet ska hantera kundregister med fullständig historik för adresser, abonnemang och ägarbyte.", cluster: "Kund & abonnemang" },
          { title: "Abonnemangshantering", reqType: "funktion", level: "SKA", text: "Systemet ska stödja skapa, ändra och avsluta abonnemang med spårbarhet.", cluster: "Kund & abonnemang" },
          { title: "Masshantering av abonnemang", reqType: "funktion", level: "BOR", text: "Systemet bör stödja massändringar av abonnemang vid t.ex. taxa- eller zonändringar.", cluster: "Kund & abonnemang" },
        ],
      }),
      tags: JSON.stringify(["avfall", "kund", "abonnemang"]),
    },
  });

  // Kravblock: Socialtjänst - Behörighet
  await prisma.libraryItem.create({
    data: {
      type: "requirement_block",
      profile: "socialtjanst_byte",
      cluster: "Behörighet & loggning",
      title: "Kravblock: Behörighetsmodell",
      description: "Krav för behörighet, delegering och spärrar inom socialtjänst",
      content: JSON.stringify({
        requirements: [
          { title: "Rollbaserad behörighetsmodell", reqType: "funktion", level: "SKA", text: "Systemet ska implementera rollbaserad behörighetsmodell med stöd för delegering och tidsbegränsade behörigheter.", cluster: "Behörighet & loggning" },
          { title: "Spärrhantering", reqType: "funktion", level: "SKA", text: "Systemet ska stödja spärrar av känsliga personuppgifter med åtkomstkontroll och loggning.", cluster: "Behörighet & loggning" },
          { title: "Behörighetshistorik", reqType: "funktion", level: "SKA", text: "Alla behörighetsändringar ska loggas med tidpunkt, utförare och motivering.", cluster: "Behörighet & loggning" },
        ],
      }),
      tags: JSON.stringify(["socialtjänst", "behörighet", "säkerhet"]),
    },
  });

  // Risk templates
  const riskTemplates = [
    { title: "Riskmall: Inlåsning/svag dataexport", category: "data_exit", description: "Risk att leverantören inte erbjuder fullgod dataexport, vilket försvårar byte.", likelihood: 4, impact: 4, mitigation: "Ställ SKA-krav på dataexport i öppna format, testa vid leveransgodkännande." },
    { title: "Riskmall: Migreringsfel/datatapp", category: "teknik", description: "Risk för förlust eller korruption av data vid migrering från befintligt system.", likelihood: 3, impact: 5, mitigation: "Krav på migreringsplan, testmigrering i sandlåda, rollback-plan." },
    { title: "Riskmall: Otillräcklig loggning", category: "sakerhet", description: "Risk att loggning inte möter rättssäkerhetskrav (särskilt socialtjänst).", likelihood: 3, impact: 4, mitigation: "SKA-krav på loggning med granskningsfunktion, demo vid utvärdering." },
    { title: "Riskmall: Leverantörsberoende", category: "leverans", description: "Risk för beroende av en enskild leverantör eller nyckelpersoner.", likelihood: 3, impact: 3, mitigation: "Krav på dokumentation, escrow-avtal, SLA med garanterad kontinuitet." },
    { title: "Riskmall: Integrationsmisslyckande", category: "teknik", description: "Risk att integrationer med befintliga system inte fungerar som förväntat.", likelihood: 3, impact: 4, mitigation: "PoC-krav på kritiska integrationer, tydligt specificerade API-krav." },
    { title: "Riskmall: Säkerhetsbrister", category: "sakerhet", description: "Risk för säkerhetsluckor i systemet eller dess infrastruktur.", likelihood: 2, impact: 5, mitigation: "Krav på säkerhetscertifiering, penetrationstest, incidenthanteringsplan." },
  ];

  for (const tmpl of riskTemplates) {
    await prisma.libraryItem.create({
      data: {
        type: "risk_template",
        profile: "",
        cluster: tmpl.category,
        title: tmpl.title,
        description: tmpl.description,
        content: JSON.stringify({ risk: tmpl }),
        tags: JSON.stringify(["riskmall", tmpl.category]),
      },
    });
  }

  // Workshop templates
  const workshopTemplates = [
    { title: "Workshopmall: Behovsworkshop (generisk)", description: "Generisk behovsworkshop för kartläggning och prioritering av behov.", suggestedParticipants: ["Verksamhetsansvarig", "Slutanvändare", "IT-ansvarig", "Ekonomiansvarig"], agenda: ["Introduktion och syfte", "Kartläggning av nuläge", "Identifiera behov och smärtpunkter", "Prioritering (P1/P2/P3)", "Sammanfattning och nästa steg"], expectedOutputs: ["Behovslista", "Prioriteringsmatris"], duration: "3h" },
    { title: "Workshopmall: Exit & migrering", description: "Workshop för att planera datamigrering och exit från befintligt system.", suggestedParticipants: ["IT-ansvarig", "Systemförvaltare", "DBA/dataansvarig", "Verksamhetsansvarig"], agenda: ["Systeminventering: vad har vi?", "Dataanalys: volymer, kvalitet, format", "Integrationskartläggning", "Migreringsstrategier", "Risk- och rollback-planering"], expectedOutputs: ["Systeminventeringsdokument", "Migreringsstrategi", "Risklista"], duration: "4h" },
    { title: "Workshopmall: Kundresa & självservice (avfall)", description: "Workshop för att kartlägga kundresan och självservicebehov inom avfallshantering.", suggestedParticipants: ["Kundtjänstansvarig", "IT-ansvarig", "Kommunikatör", "Slutanvändare/medborgare"], agenda: ["Kartlägg kundens resa (från anmälan till faktura)", "Identifiera självservicebehov", "Digitala kanaler och tillgänglighet", "Prioritering"], expectedOutputs: ["Kundresekarta", "Självservicekrav"], duration: "3h" },
    { title: "Workshopmall: Rättssäkra flöden (socialtjänst)", description: "Workshop för att säkerställa rättssäkra handläggningsflöden.", suggestedParticipants: ["Enhetschef", "Handläggare", "Jurist", "IT-ansvarig", "Dataskyddsombud"], agenda: ["Kartlägg handläggningsflödet", "Identifiera rättssäkerhetskrav", "Behörighet och delegering", "Dokumentationskrav", "Spärrar och känsliga uppgifter"], expectedOutputs: ["Flödesdiagram", "Rättssäkerhetskrav", "Behörighetsmatris"], duration: "4h" },
  ];

  for (const tmpl of workshopTemplates) {
    await prisma.libraryItem.create({
      data: {
        type: "workshop_template",
        profile: tmpl.title.includes("avfall") ? "avfall_nyanskaffning" : tmpl.title.includes("socialtjänst") ? "socialtjanst_byte" : "",
        title: tmpl.title,
        description: tmpl.description,
        content: JSON.stringify({ workshop: tmpl }),
        tags: JSON.stringify(["workshopmall"]),
      },
    });
  }

  console.log("Library content seeded.");

  // ============================================================
  // Sample Case 1: Avfall nyanskaffning
  // ============================================================

  // Reset ID counters
  await prisma.idCounter.deleteMany();

  const case1Id = "CASE-000001";
  await prisma.idCounter.create({ data: { prefix: "CASE", counter: 1 } });

  await prisma.case.create({
    data: {
      id: case1Id,
      name: "Nytt avfallssystem 2026",
      domainProfile: "avfall_nyanskaffning",
      orgName: "Sundsvalls kommun",
      procurementType: "nyanskaffning",
      estimatedValueSek: 5000000,
      goals: JSON.stringify(["Modernisera avfallshantering", "Förbättra kundinformation", "Effektivisera logistik"]),
      scopeIn: JSON.stringify(["Kundregister", "Taxehantering", "Ruttplanering", "Kundportal"]),
      scopeOut: JSON.stringify(["Fordonsinköp", "Fysisk infrastruktur"]),
      status: "draft",
      currentPhase: "B_forbered",
      owner: "Anna Johansson",
    },
  });

  // Stakeholders
  await prisma.idCounter.upsert({ where: { prefix: "STAK" }, create: { prefix: "STAK", counter: 3 }, update: { counter: 3 } });
  await prisma.stakeholder.createMany({
    data: [
      { id: "STAK-000001", caseId: case1Id, title: "Anna Johansson", role: "Projektledare", unit: "Avdelning Avfall", influence: 5, interest: 5, engagementStrategy: "Löpande avstämning" },
      { id: "STAK-000002", caseId: case1Id, title: "Erik Svensson", role: "IT-chef", unit: "IT-avdelningen", influence: 4, interest: 4, engagementStrategy: "Tekniska beslut" },
      { id: "STAK-000003", caseId: case1Id, title: "Maria Lindström", role: "Kundtjänstchef", unit: "Kundtjänst", influence: 3, interest: 5, engagementStrategy: "Behovsworkshops" },
    ],
  });

  // Needs
  await prisma.idCounter.upsert({ where: { prefix: "NEED" }, create: { prefix: "NEED", counter: 5 }, update: { counter: 5 } });
  await prisma.need.createMany({
    data: [
      { id: "NEED-000001", caseId: case1Id, title: "Modernt kundregister", cluster: "Kund & abonnemang", statement: "Vi behöver ett modernt kundregister med fullständig historik.", priority: "P1", sources: JSON.stringify([{ label: "Workshop 1" }]) },
      { id: "NEED-000002", caseId: case1Id, title: "Flexibel taxehantering", cluster: "Taxa & fakturering", statement: "Taxeberäkningar måste kunna anpassas utan IT-insats.", priority: "P1", sources: JSON.stringify([{ label: "Intervju kundtjänst" }]) },
      { id: "NEED-000003", caseId: case1Id, title: "Digital kundportal", cluster: "Digitala tjänster", statement: "Medborgare ska kunna hantera sitt abonnemang digitalt.", priority: "P2", sources: JSON.stringify([{ label: "Behovsworkshop" }]) },
      { id: "NEED-000004", caseId: case1Id, title: "Ruttoptimering", cluster: "Logistik/insamling", statement: "Rutter ska kunna optimeras baserat på fyllnadsgrad och geografi.", priority: "P2", sources: JSON.stringify([{ label: "Intervju logistik" }]) },
      { id: "NEED-000005", caseId: case1Id, title: "Dataexport och portabilitet", cluster: "Data & exit", statement: "All data ska kunna exporteras i öppna format.", priority: "P1", consequenceIfNotMet: "Inlåsning hos leverantör", sources: JSON.stringify([{ label: "Digg rekommendation" }]) },
    ],
  });

  // Requirements
  await prisma.idCounter.upsert({ where: { prefix: "REQ" }, create: { prefix: "REQ", counter: 5 }, update: { counter: 5 } });
  await prisma.requirement.createMany({
    data: [
      { id: "REQ-000001", caseId: case1Id, title: "Kundregister med historik", reqType: "funktion", cluster: "Kund & abonnemang", level: "SKA", text: "Systemet ska hantera kundregister med fullständig ändringshistorik.", linkedNeeds: JSON.stringify(["NEED-000001"]), verification: JSON.stringify({ bidEvidence: "Demo av kundregister" }) },
      { id: "REQ-000002", caseId: case1Id, title: "Konfigurerbar taxeberäkning", reqType: "funktion", cluster: "Taxa & fakturering", level: "SKA", text: "Taxeberäkning ska vara konfigurerbar utan programmeringsinsats.", linkedNeeds: JSON.stringify(["NEED-000002"]), verification: JSON.stringify({ bidEvidence: "Demo av taxekonfig" }) },
      { id: "REQ-000003", caseId: case1Id, title: "Responsiv kundportal", reqType: "funktion", cluster: "Digitala tjänster", level: "BOR", text: "Kundportal bör vara responsiv och tillgänglig (WCAG 2.1 AA).", linkedNeeds: JSON.stringify(["NEED-000003"]) },
      { id: "REQ-000004", caseId: case1Id, title: "Ruttoptimering med GIS", reqType: "funktion", cluster: "Logistik/insamling", level: "BOR", text: "Systemet bör stödja ruttoptimering med GIS-integration.", linkedNeeds: JSON.stringify(["NEED-000004"]) },
      { id: "REQ-000005", caseId: case1Id, title: "Export i öppna format", reqType: "funktion", cluster: "Data & exit", level: "SKA", text: "All data ska kunna exporteras i CSV/JSON.", linkedNeeds: JSON.stringify(["NEED-000005"]), linkedRisks: JSON.stringify(["RISK-000001"]), verification: JSON.stringify({ bidEvidence: "Demo av exportfunktion", opsFollowUp: "Årlig test" }) },
    ],
  });

  // Risks
  await prisma.idCounter.upsert({ where: { prefix: "RISK" }, create: { prefix: "RISK", counter: 3 }, update: { counter: 3 } });
  await prisma.risk.createMany({
    data: [
      { id: "RISK-000001", caseId: case1Id, title: "Inlåsning hos leverantör", category: "data_exit", description: "Risk att dataexport inte fungerar fullgott.", likelihood: 3, impact: 4, score: 12, mitigation: "SKA-krav på export, test vid leverans.", relatedRequirements: JSON.stringify(["REQ-000005"]) },
      { id: "RISK-000002", caseId: case1Id, title: "Integrationer misslyckas", category: "teknik", description: "Risk att GIS-integration och fakturaintegration inte fungerar.", likelihood: 3, impact: 3, score: 9, mitigation: "PoC-krav, tydliga API-specifikationer." },
      { id: "RISK-000003", caseId: case1Id, title: "Leverantörsberoende", category: "leverans", description: "Beroende av enskild leverantör.", likelihood: 2, impact: 3, score: 6, mitigation: "Krav på dokumentation och escrow." },
    ],
  });

  // Criteria
  await prisma.idCounter.upsert({ where: { prefix: "CRIT" }, create: { prefix: "CRIT", counter: 3 }, update: { counter: 3 } });
  await prisma.criterion.createMany({
    data: [
      { id: "CRIT-000001", caseId: case1Id, title: "Funktionalitet", weight: 50, scale: "0-5", scoringGuidance: "Bedöm hur väl SKA- och BÖR-krav uppfylls.", linkedRequirements: JSON.stringify(["REQ-000001", "REQ-000002", "REQ-000003"]) },
      { id: "CRIT-000002", caseId: case1Id, title: "Pris", weight: 30, scale: "0-5", scoringGuidance: "Lägst pris ger 5, relativ poäng." },
      { id: "CRIT-000003", caseId: case1Id, title: "Leverantörskvalitet", weight: 20, scale: "0-5", scoringGuidance: "Referenser, erfarenhet, organisation." },
    ],
  });

  // Trace links
  await prisma.traceLink.createMany({
    data: [
      { caseId: case1Id, fromType: "need", fromId: "NEED-000001", toType: "requirement", toId: "REQ-000001", relation: "addresses" },
      { caseId: case1Id, fromType: "need", fromId: "NEED-000002", toType: "requirement", toId: "REQ-000002", relation: "addresses" },
      { caseId: case1Id, fromType: "need", fromId: "NEED-000005", toType: "requirement", toId: "REQ-000005", relation: "addresses" },
      { caseId: case1Id, fromType: "risk", fromId: "RISK-000001", toType: "requirement", toId: "REQ-000005", relation: "mitigated_by" },
      { caseId: case1Id, fromType: "requirement", fromId: "REQ-000001", toType: "criterion", toId: "CRIT-000001", relation: "evaluated_by" },
    ],
  });

  // ============================================================
  // Sample Case 2: Socialtjänst byte
  // ============================================================

  const case2Id = "CASE-000002";
  await prisma.idCounter.upsert({ where: { prefix: "CASE" }, create: { prefix: "CASE", counter: 2 }, update: { counter: 2 } });

  await prisma.case.create({
    data: {
      id: case2Id,
      name: "Byte av socialtjänstsystem",
      domainProfile: "socialtjanst_byte",
      orgName: "Helsingborgs stad",
      procurementType: "byte",
      estimatedValueSek: 12000000,
      goals: JSON.stringify(["Byta till modernt system", "Förbättra rättssäkerhet", "Säkerställa datamigrering"]),
      status: "draft",
      currentPhase: "B0_exit_migrering_forstudie",
      owner: "Karl Bergman",
    },
  });

  await prisma.idCounter.upsert({ where: { prefix: "STAK" }, update: { counter: 7 }, create: { prefix: "STAK", counter: 7 } });
  await prisma.stakeholder.createMany({
    data: [
      { id: "STAK-000004", caseId: case2Id, title: "Karl Bergman", role: "Projektledare", unit: "Socialförvaltningen", influence: 5, interest: 5 },
      { id: "STAK-000005", caseId: case2Id, title: "Lena Ek", role: "Enhetschef IFO", unit: "Individ & Familj", influence: 4, interest: 5 },
      { id: "STAK-000006", caseId: case2Id, title: "Thomas Granlund", role: "IT-arkitekt", unit: "IT-avdelningen", influence: 4, interest: 4 },
      { id: "STAK-000007", caseId: case2Id, title: "Sara Nilsson", role: "Dataskyddsombud", unit: "Juridik", influence: 3, interest: 4 },
    ],
  });

  await prisma.idCounter.upsert({ where: { prefix: "NEED" }, update: { counter: 10 }, create: { prefix: "NEED", counter: 10 } });
  await prisma.need.createMany({
    data: [
      { id: "NEED-000006", caseId: case2Id, title: "Rättssäkra handläggningsflöden", cluster: "Ärende/process", statement: "Systemet måste stödja rättssäkra flöden med spårbarhet.", priority: "P1", sources: JSON.stringify([{ label: "Workshop rättssäkerhet" }]) },
      { id: "NEED-000007", caseId: case2Id, title: "Stark behörighetsmodell", cluster: "Behörighet & loggning", statement: "Roll- och delegeringsbaserad behörighet krävs.", priority: "P1", sources: JSON.stringify([{ label: "Kravworkshop" }]) },
      { id: "NEED-000008", caseId: case2Id, title: "Komplett loggning", cluster: "Behörighet & loggning", statement: "All åtkomst och ändring ska loggas för granskning.", priority: "P1", sources: JSON.stringify([{ label: "DPO-krav" }]) },
      { id: "NEED-000009", caseId: case2Id, title: "Säker datamigrering", cluster: "Migrering/exit", statement: "Befintlig data ska migreras utan förlust.", priority: "P1", consequenceIfNotMet: "Rättsosäkerhet, förlorad dokumentation", sources: JSON.stringify([{ label: "IT-analys" }]) },
      { id: "NEED-000010", caseId: case2Id, title: "Dataexport vid avslut", cluster: "Data & exit", statement: "All data ska kunna exporteras vid framtida avslut.", priority: "P1", sources: JSON.stringify([{ label: "Digg" }]) },
    ],
  });

  await prisma.idCounter.upsert({ where: { prefix: "RISK" }, update: { counter: 6 }, create: { prefix: "RISK", counter: 6 } });
  await prisma.risk.createMany({
    data: [
      { id: "RISK-000004", caseId: case2Id, title: "Migreringsfel med datatapp", category: "teknik", description: "Data kan gå förlorad eller korrumperas vid migrering.", likelihood: 3, impact: 5, score: 15, mitigation: "Testmigrering, rollback-plan, data-validering." },
      { id: "RISK-000005", caseId: case2Id, title: "Otillräcklig loggning", category: "sakerhet", description: "Nytt system loggar inte tillräckligt för granskning.", likelihood: 3, impact: 4, score: 12, mitigation: "SKA-krav på loggning, demo vid utvärdering." },
      { id: "RISK-000006", caseId: case2Id, title: "Data/exit-risk", category: "data_exit", description: "Risk att nytt system också saknar fullgod dataexport.", likelihood: 3, impact: 4, score: 12, mitigation: "SKA-krav på export, exit-klausul i avtal.", relatedRequirements: JSON.stringify(["REQ-000010"]) },
    ],
  });

  await prisma.idCounter.upsert({ where: { prefix: "REQ" }, update: { counter: 10 }, create: { prefix: "REQ", counter: 10 } });
  await prisma.requirement.createMany({
    data: [
      { id: "REQ-000006", caseId: case2Id, title: "Rättssäkra handläggningsflöden", reqType: "funktion", cluster: "Ärende/process", level: "SKA", text: "Systemet ska stödja konfigurerbara handläggningsflöden med spårbarhet.", linkedNeeds: JSON.stringify(["NEED-000006"]), verification: JSON.stringify({ bidEvidence: "Demo av flöden" }) },
      { id: "REQ-000007", caseId: case2Id, title: "Rollbaserad behörighet", reqType: "funktion", cluster: "Behörighet & loggning", level: "SKA", text: "Rollbaserad behörighetsmodell med delegering och spärrar.", linkedNeeds: JSON.stringify(["NEED-000007"]), verification: JSON.stringify({ bidEvidence: "Demo" }) },
      { id: "REQ-000008", caseId: case2Id, title: "Komplett händelselogg", reqType: "funktion", cluster: "Behörighet & loggning", level: "SKA", text: "All åtkomst och ändring ska loggas med tidpunkt, användare och motivering.", linkedNeeds: JSON.stringify(["NEED-000008"]), verification: JSON.stringify({ bidEvidence: "Demo", opsFollowUp: "Granskning" }) },
      { id: "REQ-000009", caseId: case2Id, title: "Migreringsverktyg", reqType: "funktion", cluster: "Migrering/exit", level: "SKA", text: "Leverantören ska tillhandahålla migreringsverktyg med validering och rollback.", linkedNeeds: JSON.stringify(["NEED-000009"]), verification: JSON.stringify({ bidEvidence: "Migreringsplan", implementationProof: "Testmigrering" }) },
      { id: "REQ-000010", caseId: case2Id, title: "Export av all data", reqType: "funktion", cluster: "Data & exit", level: "SKA", text: "All data ska kunna exporteras i öppna format.", linkedNeeds: JSON.stringify(["NEED-000010"]), verification: JSON.stringify({ bidEvidence: "Demo", opsFollowUp: "Årlig test" }) },
    ],
  });

  // Trace links for case 2
  await prisma.traceLink.createMany({
    data: [
      { caseId: case2Id, fromType: "need", fromId: "NEED-000006", toType: "requirement", toId: "REQ-000006", relation: "addresses" },
      { caseId: case2Id, fromType: "need", fromId: "NEED-000007", toType: "requirement", toId: "REQ-000007", relation: "addresses" },
      { caseId: case2Id, fromType: "need", fromId: "NEED-000008", toType: "requirement", toId: "REQ-000008", relation: "addresses" },
      { caseId: case2Id, fromType: "need", fromId: "NEED-000009", toType: "requirement", toId: "REQ-000009", relation: "addresses" },
      { caseId: case2Id, fromType: "risk", fromId: "RISK-000006", toType: "requirement", toId: "REQ-000010", relation: "mitigated_by" },
    ],
  });

  console.log("Seed complete! Created 2 cases with entities, trace links, and library content.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
