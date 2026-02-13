import type { EnhancedCourse } from "./types";

export const systemforvaltning: EnhancedCourse = {
  id: "systemforvaltning",
  title: "Systemförvaltning",
  icon: "server-cog",
  description:
    "Strukturerad IT-förvaltning — förvaltningsobjekt, roller, budgetering, livscykelhantering och pm3-inspirerat arbetssätt.",
  level: "Medel",
  estimatedMinutes: 40,
  tags: ["Förvaltning", "IT", "Livscykel"],
  modules: [
    {
      id: "systemforvaltning-1",
      title: "Grunderna i systemförvaltning",
      theory: {
        content: [
          "Systemförvaltning handlar om att säkerställa att IT-system fungerar, utvecklas och ger värde under hela sin livscykel. Det är inte bara en teknisk fråga — förvaltning kräver samarbete mellan verksamhet och IT.",
          "En vanlig missuppfattning är att förvaltning bara handlar om driftstöd och felavhjälpning. I verkligheten omfattar förvaltning också vidareutveckling, anpassning till förändrade behov och säkerhetsarbete.",
          "Pm3-modellen är den mest använda förvaltningsmodellen i Sverige. Den bygger på tre pelare: förvaltningsobjekt (vad förvaltas), förvaltningsorganisation (vem förvaltar) och förvaltningsprocesser (hur sker förvaltningen).",
        ],
        keyPoints: [
          "Förvaltning är mer än drift — det inkluderar vidareutveckling och planering",
          "Kräver samarbete mellan verksamhet och IT",
          "Pm3 är den mest använda modellen i Sverige",
          "Tre pelare: förvaltningsobjekt, organisation, processer",
        ],
      },
      reflection: {
        question:
          "Hur ser förvaltningen av era viktigaste system ut idag — är den strukturerad eller ad hoc?",
      },
    },
    {
      id: "systemforvaltning-2",
      title: "Förvaltningsorganisation och roller",
      theory: {
        content: [
          "En fungerande förvaltningsorganisation kräver tydliga roller med definierat ansvar. Verksamheten äger behoven och prioriteringarna, IT äger den tekniska lösningen och leveransen.",
          "De centrala rollerna är objektsägare (verksamhetschef som äger förvaltningsobjektet och budget), förvaltningsledare (samordnar arbetet), objektspecialist (verksamhetsexpert) och teknisk förvaltare (IT-tekniker).",
          "En vanlig utmaning är att objektsägarrollen inte är tydligt tillsatt. Då hamnar alla beslut hos IT, som inte har mandat att prioritera verksamhetsbehov. Resultatet blir ett system som tekniskt fungerar men inte möter verksamheten.",
        ],
        keyPoints: [
          "Både verksamhet och IT måste vara representerade",
          "Objektsägare (verksamhet) äger budget och prioritering",
          "Förvaltningsledare samordnar det dagliga arbetet",
          "Otydlig rollfördelning leder till bristande prioritering",
        ],
      },
      reflection: {
        question:
          "Vem är objektsägare för ert viktigaste system — och tar den personen aktivt ansvar för prioritering?",
      },
    },
    {
      id: "systemforvaltning-3",
      title: "Förvaltningsobjekt och tjänstekatalog",
      theory: {
        content: [
          "Ett förvaltningsobjekt är en avgränsad enhet som förvaltas som en helhet. Avgränsningen är viktig — för stora objekt blir oförvaltbara, för små ger för mycket administration.",
          "En tjänstekatalog beskriver vilka tjänster förvaltningen levererar till verksamheten. Varje tjänst har definierade servicenivåer (SLA) som anger vad verksamheten kan förvänta sig.",
          "Tjänstekatalogen skapar tydlighet kring vad som ingår, vad som kostar extra och vilka svarstider som gäller. Utan tjänstekatalog blir förväntningarna diffusa.",
        ],
        keyPoints: [
          "Förvaltningsobjektet måste avgränsas lagom",
          "Tjänstekatalogen definierar vad förvaltningen levererar",
          "SLA anger servicenivåer och förväntningar",
          "Tydlig tjänstekatalog minskar missförstånd och konflikter",
        ],
      },
      reflection: {
        question:
          "Vet användarna i din organisation vad de kan förvänta sig av IT-förvaltningen?",
      },
    },
    {
      id: "systemforvaltning-4",
      title: "Budget och ekonomistyrning",
      theory: {
        content: [
          "Förvaltningsbudgeten består av tre huvuddelar: driftskostnader (licenser, hosting, support), underhåll (buggfixar, säkerhetsuppdateringar) och vidareutveckling (ny funktionalitet). Fördelningen varierar med systemets mognad.",
          "Ett nyimplementerat system har låg driftskostnad men hög vidareutvecklingskostnad. Ett åldrande system har hög underhållskostnad. Att förstå denna livscykelkurva är avgörande för budgetplanering.",
          "Använd en TCO-modell (Total Cost of Ownership) för att få en korrekt bild av systemets totala kostnad över tid. TCO inkluderar även interna personalkostnader, utbildning och framtida avveckling. Många organisationer underskattar TCO kraftigt.",
        ],
        keyPoints: [
          "Tre budgetposter: drift, underhåll, vidareutveckling",
          "Kostnadsfördelningen förändras med systemets ålder",
          "TCO ger sann totalkostnad inklusive dolda kostnader",
          "Underhållsskuld växer om underhållet underfinansieras",
        ],
      },
      reflection: {
        question:
          "Känner du till den verkliga TCO för ert viktigaste system, inklusive interna personalkostnader?",
      },
    },
    {
      id: "systemforvaltning-5",
      title: "Livscykelhantering och avveckling",
      theory: {
        content: [
          "Varje system har en livscykel: införande, aktiv förvaltning, mognadsfas och avveckling. Att planera för systemets hela livscykel redan vid upphandlingen ger bättre beslut.",
          "Avveckling är ofta den mest försummade fasen. När ett system ska ersättas behöver man planera för datamigrering, parallellkörning, kunskapsöverföring och juridiska krav.",
          "För att undvika inlåsning bör exit-villkor skrivas in redan i upphandlingen: krav på öppna format, rätt till data vid avtalets slut, stöd för dataexport och en rimlig övergångsperiod.",
        ],
        keyPoints: [
          "Planera för hela livscykeln redan vid upphandling",
          "Avveckling kräver: datamigrering, parallellkörning, kunskapsöverföring",
          "Exit-villkor i avtalet skyddar mot inlåsning",
          "Krav på öppna format och rätt till data är avgörande",
        ],
      },
      reflection: {
        question:
          "Har era nuvarande avtal tydliga exit-villkor — vad händer om ni vill byta leverantör?",
      },
    },
    {
      id: "systemforvaltning-6",
      title: "Ständiga förbättringar och mätning",
      theory: {
        content: [
          "Förvaltning är inte statisk — den måste kontinuerligt förbättras. Använd nyckeltal (KPI:er) för att mäta förvaltningens prestation: ärendehanteringstid, användarnas nöjdhet, systemets tillgänglighet och kostnad per användare.",
          "Inför regelbundna förvaltningsrevisioner där man utvärderar: Levererar vi det vi lovat? Är användarna nöjda? Är kostnaderna rimliga? Dessa revisioner bör göras minst årligen.",
          "Användarnas feedback är den viktigaste indikatorn på förvaltningens kvalitet. Inför systematisk insamling av användarfeedback och agera på den.",
        ],
        keyPoints: [
          "Mät med KPI:er: ärendetid, nöjdhet, tillgänglighet, kostnad",
          "Årliga förvaltningsrevisioner utvärderar leverans och modell",
          "Användarfeedback är den viktigaste kvalitetsindikatorn",
          "Förvaltningen måste utvecklas i takt med verksamheten",
        ],
      },
      reflection: {
        question:
          "Hur mäter ni idag om förvaltningen fungerar bra — finns det definierade nyckeltal?",
      },
    },
  ],
};
