import type { EnhancedCourse } from "./types";

export const kravhantering: EnhancedCourse = {
  id: "kravhantering",
  title: "Kravhantering",
  icon: "ruler",
  description:
    "Från behov till kravspecifikation — behovsanalys, funktionella vs icke-funktionella krav, kravspårbarhet och verifiering.",
  level: "Medel",
  estimatedMinutes: 35,
  tags: ["Krav", "Specifikation", "Spårbarhet"],
  modules: [
    {
      id: "kravhantering-1",
      title: "Introduktion till kravhantering",
      theory: {
        content: [
          "Kravhantering är disciplinen att systematiskt identifiera, dokumentera, validera och förvalta krav genom hela ett projekts livscykel. I en upphandlingskontext är kravhantering avgörande eftersom kraven utgör den juridiska grunden för vad leverantören förväntas leverera.",
          "Dålig kravhantering är en av de vanligaste orsakerna till misslyckade IT-projekt och överprövade upphandlingar. Otydliga, motsägelsefulla eller oproportionerliga krav leder till felaktiga anbud och i slutet en leverans som inte möter verksamhetens behov.",
          "En strukturerad kravprocess säkerställer att alla intressenters behov fångas upp, att kraven är testbara och spårbara, och att förändringar hanteras kontrollerat. Det handlar inte om att skriva så många krav som möjligt, utan om att skriva rätt krav.",
        ],
        keyPoints: [
          "Kravhantering är en systematisk process från identifiering till förvaltning",
          "Dåliga krav är en huvudorsak till misslyckade projekt och överprövningar",
          "Kraven utgör den juridiska grunden i en upphandling",
          "Kvalitet är viktigare än kvantitet — rätt krav, inte flest krav",
        ],
      },
      reflection: {
        question:
          "Har du upplevt ett projekt där otydliga krav ledde till problem — vad hände och vad kunde gjorts annorlunda?",
      },
    },
    {
      id: "kravhantering-2",
      title: "Behovsanalys och intressenthantering",
      theory: {
        content: [
          "Behovsanalysen är grunden för all kravställning. Innan du kan formulera krav måste du förstå vilka behov verksamheten har. Ett behov beskriver VAD organisationen behöver uppnå, medan ett krav beskriver HUR det ska uppnås.",
          "Intressenthantering innebär att identifiera alla som berörs av upphandlingen: slutanvändare, chefer, IT-avdelningen, ekonomiavdelningen och andra berörda parter. Varje intressentgrupp har unika perspektiv och behov.",
          "Workshops är det mest effektiva sättet att samla in behov. Genom att blanda olika intressentgrupper i strukturerade sessioner får man en bredare bild. Dokumentera behoven med tydlig prioritering (P1/P2/P3) och koppla varje behov till en intressent.",
        ],
        keyPoints: [
          "Behov beskriver VAD, krav beskriver HUR — håll isär!",
          "Identifiera alla intressentgrupper tidigt i processen",
          "Använd workshops för att fånga behov från flera perspektiv",
          "Prioritera behov (P1/P2/P3) och koppla dem till intressenter",
          "Glöm inte slutanvändarna — de vet bäst hur vardagen fungerar",
        ],
      },
      reflection: {
        question:
          "Vilka intressentgrupper brukar glömmas bort i behovsanalysen, och vilka konsekvenser kan det få?",
      },
    },
    {
      id: "kravhantering-3",
      title: "Kravtyper — funktionella, icke-funktionella, begränsningar",
      theory: {
        content: [
          "Funktionella krav beskriver vad systemet ska kunna göra — vilken funktionalitet som krävs. Exempel: systemet ska kunna registrera nya ärenden, generera rapporter eller hantera behörigheter.",
          "Icke-funktionella krav (kvalitetskrav) beskriver hur bra systemet ska vara. Dit hör prestanda, säkerhet, tillgänglighet, användbarhet och underhållbarhet. Dessa krav glöms ofta bort men är avgörande för leveransens framgång.",
          "Begränsningar (constraints) begränsar lösningsutrymmet: tekniska plattformar, integrationer med befintliga system, juridiska krav (GDPR) eller organisatoriska förutsättningar. Begränsningar måste vara tydligt motiverade för att inte bryta mot proportionalitetsprincipen.",
        ],
        keyPoints: [
          "Funktionella krav = vad systemet ska göra",
          "Icke-funktionella krav = hur bra det ska vara (prestanda, säkerhet, UX)",
          "Begränsningar = ramvillkor som begränsar lösningsutrymmet",
          "Icke-funktionella krav glöms ofta men är kritiska för framgång",
        ],
      },
      reflection: {
        question:
          "Vilka icke-funktionella krav är viktigast för ert nuvarande system och hur mäts de idag?",
      },
    },
    {
      id: "kravhantering-4",
      title: "Kravspecifikation och dokumentation",
      theory: {
        content: [
          "En bra kravspecifikation är tydlig, testbar och spårbar. Varje krav bör ha ett unikt ID, en beskrivning, kravnivå (SKA/BÖR), prioritet, källa och en verifieringsmetod.",
          "Formulera krav som tydliga, atomiska påståenden. Undvik vaga formuleringar som “systemet ska vara snabbt”. Använd istället mätbara formuleringar: “Svarstiden för sökning ska vara under 2 sekunder vid 100 samtidiga användare.”",
          "Strukturera kraven i logiska grupper eller kluster som speglar verksamhetens funktionsområden. Det gör det lättare för både leverantörer och utvärderare att orientera sig.",
        ],
        keyPoints: [
          "Varje krav behöver: ID, beskrivning, nivå, källa, verifieringsmetod",
          "Formulera krav som mätbara, atomiska påståenden",
          "Undvik vaga ord som “bra”, “snabbt”, “lätt” utan mätetal",
          "Gruppera krav i logiska kluster/funktionsområden",
        ],
      },
      reflection: {
        question:
          "Välj ett krav från en tidigare upphandling — är det tillräckligt tydligt för att en leverantör ska kunna svara ja eller nej?",
      },
    },
    {
      id: "kravhantering-5",
      title: "Kravspårbarhet och ändringshantering",
      theory: {
        content: [
          "Kravspårbarhet innebär att varje krav kan spåras bakåt till sitt ursprungsbehov och framåt till hur det utvärderas. Spårbarhetskedjan Behov → Krav → Kriterium → Poäng säkerställer att inget krav saknar förankring.",
          "Spårbarhet är också ett skydd mot överprövning. Om en leverantör ifrågasätter ett krav kan du visa exakt vilket behov det grundar sig på, vilken intressent som uttryckt behovet och vilken evidens som stödjer det.",
          "Ändringshantering är processen för att hantera förändringar i krav på ett kontrollerat sätt. Kravändringar efter annonsering är problematiska — det kan kräva ny annonsering. Därför är grundligt kravarbete före annonsering avgörande.",
        ],
        keyPoints: [
          "Spårbarhet: Behov → Krav → Kriterium → Poäng",
          "Spårbarhet skyddar mot överprövning genom motiverbar proportionalitet",
          "Kravändringar efter annonsering är riskfyllda",
          "Grundligt kravarbete före annonsering är avgörande",
        ],
      },
      reflection: {
        question:
          "Kan du spåra alla krav i din senaste upphandling tillbaka till dokumenterade behov?",
      },
    },
    {
      id: "kravhantering-6",
      title: "Verifiering och validering av krav",
      theory: {
        content: [
          "Verifiering handlar om att kontrollera att kraven är rätt formulerade: är de tydliga, testbara, konsekventa och genomförbara? Validering handlar om att kontrollera att det är rätt krav: löser de verksamhetens faktiska problem?",
          "För varje krav bör det finnas en verifieringsplan som beskriver tre nivåer: hur kravet verifieras i anbudet, vid implementation och i drift.",
          "Kravgranskning bör göras av flera personer med olika perspektiv: verksamhetsföreträdare, upphandlare, IT och ekonom. Använd checklistor för att säkerställa att inget missas.",
        ],
        keyPoints: [
          "Verifiering = rätt formulerade krav, validering = rätt krav",
          "Tre nivåer: anbudsverifiering, implementationstest, driftsuppföljning",
          "Kravgranskning från flera perspektiv: verksamhet, juridik, teknik, ekonomi",
          "Checklistor och peer reviews höjer kvaliteten",
        ],
      },
      reflection: {
        question:
          "Hur verifierar ni idag att leverantören faktiskt uppfyller de krav som ställdes i upphandlingen?",
      },
    },
  ],
};
