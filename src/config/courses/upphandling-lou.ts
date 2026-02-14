import type { EnhancedCourse } from "./types";

export const upphandlingLou: EnhancedCourse = {
  id: "upphandling-lou",
  title: "Upphandling & LOU",
  icon: "scale",
  description:
    "Grunderna i Lagen om offentlig upphandling — tröskelvärden, förfaranden, annonsering, utvärdering och tilldelning.",
  level: "Grundläggande",
  estimatedMinutes: 45,
  tags: ["LOU", "Offentlig upphandling", "Juridik"],
  modules: [
    /* ================================================================== */
    /*  Modul 1 — Vad är offentlig upphandling?                           */
    /* ================================================================== */
    {
      id: "upphandling-lou-1",
      title: "Vad är offentlig upphandling?",
      theory: {
        content: [
          "Offentlig upphandling är den process genom vilken offentliga organisationer — kommuner, regioner, statliga myndigheter och offentligt styrda bolag — köper varor, tjänster och byggentreprenader. Syftet är att säkerställa att skattemedel används effektivt och att alla leverantörer får en rättvis möjlighet att konkurrera om offentliga kontrakt.",
          "I Sverige regleras offentlig upphandling främst genom Lagen om offentlig upphandling (LOU, SFS 2016:1145), som bygger på EU:s upphandlingsdirektiv. LOU gäller för alla inköp som görs av upphandlande myndigheter och enheter, oavsett om det rör sig om pennor, IT-system eller miljardinvesteringar i infrastruktur.",
          "Upphandlingsreglerna finns till för att skydda både det offentliga intresset och leverantörernas rättigheter. Genom att följa en strukturerad process med tydliga regler minskar risken för korruption, vänskapskorruption och slöseri med offentliga medel. Samtidigt ger det leverantörer förutsebarhet och möjlighet att planera sina anbud.",
        ],
        keyPoints: [
          "Offentlig upphandling styrs av LOU (SFS 2016:1145) som bygger på EU-direktiv",
          "Alla offentliga organisationer måste följa upphandlingsreglerna",
          "Syftet är effektivt användande av skattemedel och rättvis konkurrens",
          "Reglerna skyddar både det allmänna och leverantörerna",
        ],
      },
      scenario: {
        id: "scenario-1-1",
        title: "Ny medarbetare upptäcker ett inköp",
        context:
          "Du är ny som verksamhetsutvecklare på en kommun. Din chef berättar att avdelningen behöver ett nytt ärendehanteringssystem och föreslår att ni kontaktar en leverantör som en kollega rekommenderat, för att snabbt komma igång.",
        steps: [
          {
            situation:
              "Chefen säger: 'Ring leverantören så löser vi det den här veckan. Vi har ju pengar i budgeten.'",
            question: "Hur reagerar du?",
            choices: [
              {
                id: "1a",
                text: "Jag ringer leverantören direkt — chefen har ju godkänt inköpet.",
                isOptimal: false,
                feedback:
                  "Att kontakta en enskild leverantör och teckna avtal utan upphandling strider mot LOU. Offentliga inköp måste följa upphandlingsreglerna oavsett om det finns budget.",
              },
              {
                id: "1b",
                text: "Jag påpekar att vi troligen behöver upphandla systemet enligt LOU och föreslår att vi kontaktar upphandlingsenheten.",
                isOptimal: true,
                feedback:
                  "Helt rätt. Alla inköp av varor, tjänster och byggentreprenader i offentlig sektor ska följa LOU. Genom att involvera upphandlingsenheten tidigt säkerställer ni att processen blir korrekt.",
              },
              {
                id: "1c",
                text: "Jag köper systemet via kommunens inköpskort för att undvika byråkrati.",
                isOptimal: false,
                feedback:
                  "Att kringgå upphandlingsreglerna genom att använda inköpskort är en otillåten direktupphandling. Det spelar ingen roll hur betalningen sker — LOU gäller ändå.",
              },
            ],
          },
          {
            situation:
              "Du har kontaktat upphandlingsenheten. De frågar vad det rör sig om för belopp. Chefen uppskattar att systemet kostar omkring 800 000 SEK.",
            question: "Varför är beloppet viktigt att ta reda på tidigt?",
            choices: [
              {
                id: "2a",
                text: "Det avgör vilken typ av upphandlingsförfarande som ska användas och vilka regler som gäller.",
                isOptimal: true,
                feedback:
                  "Korrekt. Beloppet avgör om upphandlingen hamnar under eller över tröskelvärdena, vilket i sin tur styr vilka procedurregler som gäller.",
              },
              {
                id: "2b",
                text: "Det spelar ingen roll — alla inköp upphandlas på exakt samma sätt.",
                isOptimal: false,
                feedback:
                  "Beloppet spelar stor roll. LOU har olika regler beroende på kontraktsvärdet, bland annat gällande annonsering, tidsfrister och förfarandetyp.",
              },
              {
                id: "2c",
                text: "Det är bara relevant för budgetens skull, inte för själva upphandlingen.",
                isOptimal: false,
                feedback:
                  "Beloppet är centralt för upphandlingen. Det styr vilka regler som gäller, hur lång tid processen tar och vilka krav som ställs på annonsering.",
              },
            ],
          },
        ],
        roleRelevance: ["BESTALLARE", "UPPHANDLARE", "SYSTEMAGARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare är du den som identifierar behovet och initierar upphandlingsprocessen. Du behöver förstå att LOU inte är ett hinder utan ett ramverk som säkerställer att du får bästa möjliga lösning till rätt pris.",
          keyActions: [
            "Identifiera och dokumentera verksamhetens behov tidigt",
            "Kontakta upphandlingsenheten redan i behovsfasen",
            "Förstå att alla inköp över direktupphandlingsgränsen kräver formell upphandling",
            "Säkerställa att budget finns avsatt och att tidplanen är realistisk",
          ],
          pitfalls: [
            "Att kontakta en specifik leverantör innan upphandling påbörjats",
            "Att underskatta tiden som upphandlingsprocessen kräver",
            "Att tro att 'småinköp' alltid är undantagna från LOU",
            "Att dela upp inköp i mindre delar för att komma under tröskelvärden",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare ansvarar du för att processen följer LOU. Du behöver kunna förklara regelverket för verksamheten och vägleda dem genom de olika stegen. Du är garant för att upphandlingen är juridiskt korrekt.",
          keyActions: [
            "Informera verksamheten om vilka regler som gäller för det aktuella inköpet",
            "Bedöma kontraktsvärde och fastställa rätt förfarande",
            "Stödja beställaren i att formulera tydliga behov och krav",
            "Dokumentera alla beslut och motiveringar genom processen",
          ],
          pitfalls: [
            "Att inte involveras tillräckligt tidigt i processen",
            "Att godkänna otillåtna direktupphandlingar under tidspress",
            "Att inte kontrollera om ramavtal redan finns för behovet",
            "Att missa att beräkna det totala kontraktsvärdet inklusive optioner",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare behöver du förstå att nya system och förändringar i befintliga system ofta kräver upphandling. Du ansvarar för den tekniska kravbilden och måste samverka med både beställare och upphandlare.",
          keyActions: [
            "Bidra med teknisk kunskap vid behovsanalys och marknadsundersökning",
            "Säkerställa att tekniska krav inte oavsiktligt stänger ute leverantörer",
            "Bedöma hur nytt system påverkar befintlig IT-arkitektur",
            "Planera för drift, förvaltning och eventuell avveckling redan från start",
          ],
          pitfalls: [
            "Att specificera krav som bara en specifik produkt uppfyller",
            "Att förbise integrationsbehov med befintliga system",
            "Att inte beakta total ägandekostnad (TCO) över hela avtalsperioden",
            "Att anta att en befintlig leverantör automatiskt kan fortsätta leverera utan ny upphandling",
          ],
        },
      ],
      reflection: {
        question:
          "Tänk på ett inköp din organisation gjort nyligen — vilka konsekvenser hade det fått om upphandlingen inte följt LOU?",
      },
      quiz: {
        questions: [
          {
            id: "q1-1",
            question: "Vilken lag reglerar främst offentlig upphandling i Sverige?",
            options: [
              { id: "a", text: "Kommunallagen", isCorrect: false },
              { id: "b", text: "LOU (SFS 2016:1145)", isCorrect: true },
              { id: "c", text: "Förvaltningslagen", isCorrect: false },
              { id: "d", text: "Konkurrenslagen", isCorrect: false },
            ],
            explanation:
              "Lagen om offentlig upphandling (LOU, SFS 2016:1145) är den huvudsakliga lagen som reglerar offentlig upphandling i Sverige. Den bygger på EU:s upphandlingsdirektiv.",
          },
          {
            id: "q1-2",
            question: "Vilka organisationer omfattas av LOU?",
            options: [
              { id: "a", text: "Bara statliga myndigheter", isCorrect: false },
              { id: "b", text: "Bara kommuner och regioner", isCorrect: false },
              {
                id: "c",
                text: "Alla offentliga organisationer — kommuner, regioner, statliga myndigheter och offentligt styrda bolag",
                isCorrect: true,
              },
              { id: "d", text: "Bara organisationer med fler än 50 anställda", isCorrect: false },
            ],
            explanation:
              "LOU gäller för alla upphandlande myndigheter och enheter, inklusive kommuner, regioner, statliga myndigheter och offentligt styrda bolag.",
          },
          {
            id: "q1-3",
            question: "Vad är det primära syftet med upphandlingsreglerna?",
            options: [
              { id: "a", text: "Att skapa byråkrati för offentlig sektor", isCorrect: false },
              { id: "b", text: "Att gynna svenska leverantörer framför utländska", isCorrect: false },
              {
                id: "c",
                text: "Att säkerställa effektiv användning av skattemedel och rättvis konkurrens",
                isCorrect: true,
              },
              { id: "d", text: "Att minimera antalet leverantörer på marknaden", isCorrect: false },
            ],
            explanation:
              "Det primära syftet med upphandlingsreglerna är att skattemedel används effektivt och att alla leverantörer får en rättvis möjlighet att konkurrera om offentliga kontrakt.",
          },
          {
            id: "q1-4",
            question:
              "En chef vill ringa en leverantör direkt för att köpa ett system för 500 000 SEK. Vad gäller?",
            options: [
              { id: "a", text: "Det är tillåtet om chefen har budgetansvar", isCorrect: false },
              { id: "b", text: "Det är tillåtet om leverantören är känd sedan tidigare", isCorrect: false },
              {
                id: "c",
                text: "Det kan vara en otillåten direktupphandling — upphandlingsreglerna måste kontrolleras",
                isCorrect: true,
              },
              { id: "d", text: "Det är alltid tillåtet under 1 MSEK", isCorrect: false },
            ],
            explanation:
              "Oavsett vem som beslutar eller hur betalningen sker måste offentliga inköp följa LOU. Vid 500 000 SEK krävs normalt minst en förenklad upphandling.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 2 — LOU:s grundprinciper                                    */
    /* ================================================================== */
    {
      id: "upphandling-lou-2",
      title: "LOU:s grundprinciper",
      theory: {
        content: [
          "LOU vilar på fem grundläggande principer som genomsyrar hela upphandlingsprocessen. Dessa principer är inte bara teoretiska — de påverkar konkret hur krav formuleras, hur anbud utvärderas och hur beslut motiveras.",
          "Principen om likabehandling innebär att alla leverantörer ska behandlas lika och få samma information vid samma tidpunkt. Transparensprincipen kräver att upphandlingen genomförs öppet med tydliga förutsättningar. Proportionalitetsprincipen säger att krav och villkor måste stå i rimlig proportion till det som upphandlas.",
          "Principen om icke-diskriminering förbjuder att leverantörer missgynnas på grund av nationalitet eller geografisk hemvist. Principen om ömsesidigt erkännande innebär att intyg och certifikat från andra EU/EES-länder ska godtas på samma villkor som svenska.",
          "I praktiken innebär principerna att du måste vara noggrann med hur du formulerar krav. Ett krav som bara en specifik leverantör kan uppfylla kan strida mot likabehandlingsprincipen. Ett krav på svensk certifiering utan att acceptera motsvarande utländska certifikat bryter mot ömsesidigt erkännande.",
        ],
        keyPoints: [
          "Likabehandling: alla leverantörer får samma förutsättningar och information",
          "Transparens: öppen process med tydliga regler",
          "Proportionalitet: kraven måste vara rimliga i förhållande till upphandlingens värde",
          "Icke-diskriminering: ingen får missgynnas på grund av nationalitet",
          "Ömsesidigt erkännande: utländska intyg godtas likvärdigt",
        ],
      },
      scenario: {
        id: "scenario-2-1",
        title: "Kravformulering under tidspress",
        context:
          "Du arbetar med en upphandling av ett dokumenthanteringssystem. Under framtagningen av kravspecifikationen föreslår en kollega i verksamheten att ni ska kräva att leverantören har sitt huvudkontor inom 50 km från kommunen, för att säkerställa snabb support.",
        steps: [
          {
            situation:
              "Kollegan argumenterar: 'Vi behöver snabb support, och det får vi bara om leverantören sitter nära oss. Lägg in kravet att huvudkontoret ska ligga inom 50 km.'",
            question: "Hur bedömer du detta krav?",
            choices: [
              {
                id: "1a",
                text: "Kravet är rimligt — närhet garanterar bättre service.",
                isOptimal: false,
                feedback:
                  "Ett krav på geografisk närhet strider mot principen om icke-diskriminering. Det utesluter leverantörer baserat på var de är lokaliserade, inte på deras förmåga att leverera.",
              },
              {
                id: "1b",
                text: "Kravet bryter mot icke-diskrimineringsprincipen. Istället bör vi ställa krav på svarstider och servicenivåer (SLA).",
                isOptimal: true,
                feedback:
                  "Exakt rätt. Genom att formulera funktionella krav på svarstider och tillgänglighet fokuserar du på det verkliga behovet utan att diskriminera leverantörer baserat på geografisk placering.",
              },
              {
                id: "1c",
                text: "Vi kan skriva kravet men formulera det som ett 'önskemål' istället.",
                isOptimal: false,
                feedback:
                  "Även som mervärdeskriterium (BÖR-krav) kan ett krav på geografisk närhet ifrågasättas ur ett icke-diskrimineringsperspektiv. Det verkliga behovet är snabb support, inte geografisk närhet.",
              },
            ],
          },
          {
            situation:
              "En annan kollega vill lägga till kravet: 'Leverantören ska vara certifierad enligt ISO 27001. Utländska certifieringar godtas inte.' Motiveringen är att det är enklare att verifiera svenska certifikat.",
            question: "Vad är problemet med detta krav?",
            choices: [
              {
                id: "2a",
                text: "Det finns inget problem — vi har rätt att kräva svenska certifikat.",
                isOptimal: false,
                feedback:
                  "Att inte godta likvärdiga utländska certifikat strider mot principen om ömsesidigt erkännande. EU-länders certifieringar måste godtas på samma villkor.",
              },
              {
                id: "2b",
                text: "Kravet på ISO 27001 är bra, men vi måste godta motsvarande certifieringar från andra EU/EES-länder.",
                isOptimal: true,
                feedback:
                  "Korrekt. Principen om ömsesidigt erkännande innebär att certifikat och intyg från andra EU/EES-länder ska godtas om de motsvarar det svenska kravet.",
              },
              {
                id: "2c",
                text: "Vi bör stryka kravet helt för att undvika juridiska problem.",
                isOptimal: false,
                feedback:
                  "Att kräva ISO 27001 kan vara helt proportionerligt för ett dokumenthanteringssystem. Det är formuleringen som behöver justeras, inte kravet i sig.",
              },
            ],
          },
          {
            situation:
              "Under upphandlingens gång ställer en leverantör en fråga om ett av kraven. Du svarar via mejl direkt till den leverantören.",
            question: "Vad har du gjort för fel?",
            choices: [
              {
                id: "3a",
                text: "Inget — jag svarade snabbt och effektivt.",
                isOptimal: false,
                feedback:
                  "Att besvara en fråga enbart till en leverantör bryter mot likabehandlingsprincipen. Alla leverantörer ska få samma information vid samma tidpunkt.",
              },
              {
                id: "3b",
                text: "Svaret borde ha publicerats som en fråga-och-svar till alla anbudsgivare genom upphandlingssystemet.",
                isOptimal: true,
                feedback:
                  "Helt rätt. Likabehandlingsprincipen kräver att alla leverantörer får tillgång till samma information. Frågor och svar ska alltid publiceras till samtliga potentiella anbudsgivare.",
              },
              {
                id: "3c",
                text: "Jag borde ha vägrat svara på frågan helt.",
                isOptimal: false,
                feedback:
                  "Att vägra besvara relevanta frågor är inte bra — det kan leda till sämre anbud. Det korrekta är att besvara frågan men publicera svaret till alla intresserade leverantörer.",
              },
            ],
          },
        ],
        roleRelevance: ["BESTALLARE", "UPPHANDLARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare formulerar du ofta de ursprungliga kraven utifrån verksamhetens behov. Det är avgörande att du förstår principerna så att dina krav inte oavsiktligt bryter mot dem. Principerna begränsar inte vad du kan kräva, utan hur du formulerar kraven.",
          keyActions: [
            "Formulera krav utifrån funktion och prestation, inte specifika produkter eller leverantörer",
            "Granska kravlistan ur ett proportionalitetsperspektiv — är varje krav rimligt?",
            "Säkerställa att krav inte oavsiktligt utesluter leverantörer baserat på geografisk hemvist",
            "Samverka med upphandlaren för att kvalitetssäkra kravens juridiska hållbarhet",
          ],
          pitfalls: [
            "Att formulera krav som beskriver en specifik produkt man redan bestämt sig för",
            "Att ställa oproportionerligt höga krav för att 'vara på den säkra sidan'",
            "Att ha informell kontakt med en leverantör under pågående upphandling",
            "Att glömma att transparens även gäller information som delas vid möten och referensbesök",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare är du principernas väktare. Du behöver kunna identifiera potentiella principbrott i kravspecifikationer och övriga upphandlingsdokument, och du måste säkerställa att all kommunikation med leverantörer sker korrekt.",
          keyActions: [
            "Granska alla krav mot de fem principerna innan publicering",
            "Säkerställa att frågor och svar publiceras till alla anbudsgivare samtidigt",
            "Dokumentera och motivera alla beslut med referens till principerna",
            "Utbilda verksamheten i principernas praktiska konsekvenser",
          ],
          pitfalls: [
            "Att under tidspress godkänna kravformuleringar som inte granskats ur principsynpunkt",
            "Att ge en leverantör information som inte delas med övriga",
            "Att inte tydligt kommunicera utvärderingskriterierna i förväg",
            "Att godta argument som 'vi har alltid gjort så' utan att kontrollera mot principerna",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare har du djup teknisk kunskap, men du måste vara vaksam så att din expertis inte leder till krav som gynnar en specifik teknisk lösning. Principerna kräver att krav formuleras teknikneutralt.",
          keyActions: [
            "Översätta tekniska behov till funktionella krav som inte är produktspecifika",
            "Acceptera att likvärdiga lösningar kan uppnå samma resultat med annan teknik",
            "Bidra med kunskap om marknadens bredd för att bedöma om krav är proportionerliga",
            "Säkerställa att standardkrav (t.ex. ISO) accepterar likvärdiga alternativ",
          ],
          pitfalls: [
            "Att specificera tekniska krav som bara den befintliga leverantörens produkt uppfyller",
            "Att använda produktspecifika termer eller funktionsnamn i kravspecifikationen",
            "Att ställa krav på specifika tekniska plattformar utan att öppna för likvärdiga alternativ",
            "Att bedöma anbud utifrån hur lika de är det befintliga systemet istället för hur väl de uppfyller kraven",
          ],
        },
      ],
      reflection: {
        question:
          "Kan du identifiera ett krav i en tidigare upphandling som eventuellt kunde ifrågasättas ur ett proportionalitetsperspektiv?",
      },
      quiz: {
        questions: [
          {
            id: "q2-1",
            question: "Vilka är de fem grundprinciperna i LOU?",
            options: [
              {
                id: "a",
                text: "Likabehandling, transparens, proportionalitet, icke-diskriminering, ömsesidigt erkännande",
                isCorrect: true,
              },
              {
                id: "b",
                text: "Likabehandling, effektivitet, sparsamhet, öppenhet, konkurrens",
                isCorrect: false,
              },
              {
                id: "c",
                text: "Transparens, legalitet, objektivitet, proportionalitet, service",
                isCorrect: false,
              },
              {
                id: "d",
                text: "Objektivitet, saklighet, likabehandling, effektivitet, rättssäkerhet",
                isCorrect: false,
              },
            ],
            explanation:
              "LOU:s fem grundprinciper är likabehandling, transparens, proportionalitet, icke-diskriminering och ömsesidigt erkännande. Dessa härstammar från EU-rätten.",
          },
          {
            id: "q2-2",
            question:
              "En upphandlare svarar på en leverantörs fråga via mejl utan att publicera svaret till övriga. Vilken princip bryts?",
            options: [
              { id: "a", text: "Proportionalitetsprincipen", isCorrect: false },
              { id: "b", text: "Likabehandlingsprincipen", isCorrect: true },
              { id: "c", text: "Principen om ömsesidigt erkännande", isCorrect: false },
              { id: "d", text: "Icke-diskrimineringsprincipen", isCorrect: false },
            ],
            explanation:
              "Likabehandlingsprincipen kräver att alla leverantörer får samma information vid samma tidpunkt. Att besvara en fråga enbart till en leverantör ger den en otillbörlig fördel.",
          },
          {
            id: "q2-3",
            question:
              "Vad innebär proportionalitetsprincipen i praktiken?",
            options: [
              {
                id: "a",
                text: "Att alla leverantörer ska behandlas lika",
                isCorrect: false,
              },
              {
                id: "b",
                text: "Att krav och villkor måste stå i rimlig proportion till det som upphandlas",
                isCorrect: true,
              },
              {
                id: "c",
                text: "Att utländska intyg ska godtas",
                isCorrect: false,
              },
              {
                id: "d",
                text: "Att upphandlingen ska annonseras offentligt",
                isCorrect: false,
              },
            ],
            explanation:
              "Proportionalitetsprincipen innebär att krav och villkor inte får gå utöver vad som är nödvändigt för det aktuella inköpet. Kraven ska vara rimliga i förhållande till upphandlingens art och värde.",
          },
          {
            id: "q2-4",
            question:
              "En kommun kräver att leverantören ska ha 'svensk ISO 27001-certifiering' och avvisar en finsk leverantörs finska certifiering. Vilken princip bryts?",
            options: [
              { id: "a", text: "Transparensprincipen", isCorrect: false },
              { id: "b", text: "Proportionalitetsprincipen", isCorrect: false },
              { id: "c", text: "Principen om ömsesidigt erkännande", isCorrect: true },
              { id: "d", text: "Likabehandlingsprincipen", isCorrect: false },
            ],
            explanation:
              "Principen om ömsesidigt erkännande innebär att intyg och certifikat från andra EU/EES-länder ska godtas på samma villkor som svenska. En finsk ISO 27001-certifiering är likvärdig.",
          },
          {
            id: "q2-5",
            question:
              "Ett krav formuleras så att bara en specifik leverantörs produkt kan uppfylla det. Vilken/vilka principer riskerar att brytas?",
            options: [
              { id: "a", text: "Bara proportionalitetsprincipen", isCorrect: false },
              { id: "b", text: "Bara transparensprincipen", isCorrect: false },
              {
                id: "c",
                text: "Likabehandling och eventuellt icke-diskriminering",
                isCorrect: true,
              },
              { id: "d", text: "Ingen — det är tillåtet om kravet är sakligt motiverat", isCorrect: false },
            ],
            explanation:
              "Om ett krav i praktiken bara kan uppfyllas av en specifik leverantör bryter det mot likabehandlingsprincipen och potentiellt mot icke-diskrimineringsprincipen, eftersom det stänger ute andra leverantörer.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 3 — Tröskelvärden och förfaranden                           */
    /* ================================================================== */
    {
      id: "upphandling-lou-3",
      title: "Tröskelvärden och förfaranden",
      theory: {
        content: [
          "Tröskelvärdena avgör vilka regler som gäller för en upphandling. Över tröskelvärdet gäller de direktivstyrda reglerna med krav på annonsering i EU:s databas TED. Under tröskelvärdet gäller de nationella reglerna som är något enklare.",
          "Vid direktivstyrd upphandling kan du välja mellan flera förfaranden. Öppet förfarande innebär att alla intresserade leverantörer får lämna anbud — det är det vanligaste. Selektivt förfarande har två steg: först kvalificering, sedan inbjudan till utvalda leverantörer att lämna anbud.",
          "Förhandlat förfarande och konkurrenspräglad dialog används vid komplexa upphandlingar där det är svårt att definiera lösningen på förhand. Dessa förfaranden kräver särskilda förutsättningar och måste motiveras. Under tröskelvärdet används förenklad upphandling eller direktupphandling (under cirka 700 000 SEK).",
        ],
        keyPoints: [
          "Tröskelvärdet avgör om EU-regler eller nationella regler gäller",
          "Öppet förfarande är det vanligaste — alla får lämna anbud",
          "Selektivt förfarande: kvalificering först, sedan anbud",
          "Förhandlat förfarande kräver särskilda skäl och motivering",
          "Direktupphandling kan användas under cirka 700 000 SEK",
        ],
      },
      scenario: {
        id: "scenario-3-1",
        title: "Rätt förfarande för rätt inköp",
        context:
          "Din kommun planerar att upphandla ett nytt ekonomisystem. Projektgruppen har uppskattat att systemet kostar cirka 3 MSEK inklusive licenser, implementering och tre års support. Du behöver hjälpa till att bestämma vilket förfarande som ska användas.",
        steps: [
          {
            situation:
              "Projekledaren frågar: 'Kan vi inte bara göra en direktupphandling? Vi har bråttom och vet vilken leverantör vi vill ha.'",
            question: "Vad svarar du?",
            choices: [
              {
                id: "1a",
                text: "Ja, vi kan direktupphandla om vi motiverar att det är brådskande.",
                isOptimal: false,
                feedback:
                  "Direktupphandling kan bara användas under cirka 700 000 SEK (eller vid synnerliga skäl). Vid 3 MSEK krävs formellt upphandlingsförfarande. Tidspress är normalt inte ett giltigt skäl för direktupphandling.",
              },
              {
                id: "1b",
                text: "Nej, vid 3 MSEK krävs minst en förenklad upphandling, troligen ett öppet förfarande beroende på tröskelvärdet.",
                isOptimal: true,
                feedback:
                  "Korrekt. 3 MSEK överstiger gränsen för direktupphandling. Beroende på aktuella tröskelvärden kan det krävas antingen förenklad upphandling eller direktivstyrd upphandling med annonsering i TED.",
              },
              {
                id: "1c",
                text: "Vi kan dela upp inköpet i mindre delar så att varje del hamnar under direktupphandlingsgränsen.",
                isOptimal: false,
                feedback:
                  "Att dela upp en upphandling i syfte att kringgå tröskelvärdena är uttryckligen förbjudet i LOU. Det totala kontraktsvärdet avgör förfarandet.",
              },
            ],
          },
          {
            situation:
              "Ni har konstaterat att upphandlingen hamnar över tröskelvärdet och att ett direktivstyrt förfarande krävs. Projekledaren undrar vilken typ av förfarande som passar bäst.",
            question:
              "Ekonomisystemet har väldefinierade krav och det finns flera etablerade leverantörer på marknaden. Vilket förfarande rekommenderar du?",
            choices: [
              {
                id: "2a",
                text: "Konkurrenspräglad dialog — det ger oss möjlighet att diskutera lösningen med leverantörerna.",
                isOptimal: false,
                feedback:
                  "Konkurrenspräglad dialog är avsedd för komplexa upphandlingar där lösningen inte kan definieras i förväg. Med väldefinierade krav och en etablerad marknad är detta inte rätt förfarande.",
              },
              {
                id: "2b",
                text: "Öppet förfarande — kraven är tydliga och det finns flera leverantörer som kan lämna anbud.",
                isOptimal: true,
                feedback:
                  "Helt rätt. Öppet förfarande är det vanligaste och mest lämpliga när kraven är väldefinierade och det finns en fungerande marknad. Alla intresserade leverantörer får lämna anbud.",
              },
              {
                id: "2c",
                text: "Förhandlat förfarande — det ger oss flexibilitet att förhandla om priset.",
                isOptimal: false,
                feedback:
                  "Förhandlat förfarande kräver särskilda förutsättningar och kan inte väljas bara för att man vill förhandla om pris. Med tydliga krav och etablerad marknad finns inte grund för detta förfarande.",
              },
            ],
          },
        ],
        roleRelevance: ["UPPHANDLARE", "BESTALLARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare behöver du förstå att kontraktsvärdet, inte budgetposten, avgör vilka regler som gäller. Du måste tidigt uppskatta det totala värdet inklusive alla optioner och förlängningar för att ge upphandlaren rätt förutsättningar.",
          keyActions: [
            "Uppskatta totalkostnaden (TCO) tidigt — inklusive drift, support och optioner",
            "Samverka med upphandlaren för att fastställa rätt förfarande",
            "Planera realistisk tidplan baserat på valt förfarande",
            "Förstå att tröskelvärdet påverkar tidsramar och krav på annonsering",
          ],
          pitfalls: [
            "Att underskatta kontraktsvärdet för att undvika strängare regler",
            "Att inte inkludera optionsår och tilläggsbeställningar i värdeberäkningen",
            "Att kräva orealistiskt snabb process för ett förfarande som har lagstadgade tidsfrister",
            "Att dela upp inköp mellan avdelningar för att hamna under tröskelvärden",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare ansvarar du för att välja rätt förfarande baserat på kontraktsvärde, komplexitet och marknadssituation. Du måste kunna motivera valet och säkerställa att alla formella krav uppfylls.",
          keyActions: [
            "Beräkna kontraktsvärdet korrekt inklusive alla optioner och förlängningar",
            "Välja förfarande baserat på värde, komplexitet och marknadssituation",
            "Dokumentera och motivera val av förfarande",
            "Säkerställa att tidsfrister och annonseringskrav följs",
          ],
          pitfalls: [
            "Att använda förenklad upphandling när kontraktsvärdet egentligen överstiger tröskelvärdet",
            "Att godkänna otillåten uppdelning av kontrakt",
            "Att missa att uppdatera sig om aktuella tröskelvärden (de ändras vartannat år)",
            "Att inte motivera valet av förfarande skriftligt",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare påverkar din kostnadsuppskattning direkt vilket förfarande som används. Du behöver ge en realistisk bild av totalkostnaden inklusive licenser, implementering, drift, vidareutveckling och eventuell avveckling.",
          keyActions: [
            "Ge en realistisk totaluppskattning av systemkostnaden över hela avtalsperioden",
            "Inkludera kostnader för integration, migration och utbildning",
            "Bidra till att bedöma om förhandlat förfarande eller dialog behövs baserat på lösningens komplexitet",
            "Informera om marknadens storlek och mognad för att stödja val av förfarande",
          ],
          pitfalls: [
            "Att ge en för låg kostnadsuppskattning som leder till fel förfarande",
            "Att glömma dolda kostnader som datamigrering, anpassningar och utbildning",
            "Att inte beakta licensmodellens påverkan på totalkostnaden",
            "Att överdriva komplexiteten för att motivera ett förhandlat förfarande med en förutbestämd leverantör",
          ],
        },
      ],
      reflection: {
        question:
          "Om din organisation planerar ett IT-inköp på 4 MSEK — vilket förfarande skulle vara lämpligast och varför?",
      },
      quiz: {
        questions: [
          {
            id: "q3-1",
            question: "Vad avgör om en upphandling ska följa EU:s direktivstyrda regler?",
            options: [
              { id: "a", text: "Antalet anbudsgivare", isCorrect: false },
              { id: "b", text: "Om kontraktsvärdet överstiger tröskelvärdet", isCorrect: true },
              { id: "c", text: "Om upphandlingen gäller IT-system", isCorrect: false },
              { id: "d", text: "Om upphandlingen genomförs av en statlig myndighet", isCorrect: false },
            ],
            explanation:
              "Tröskelvärdet avgör om de direktivstyrda reglerna med bland annat annonsering i TED gäller, eller om enklare nationella regler kan tillämpas.",
          },
          {
            id: "q3-2",
            question: "Vilket är det vanligaste upphandlingsförfarandet?",
            options: [
              { id: "a", text: "Förhandlat förfarande", isCorrect: false },
              { id: "b", text: "Konkurrenspräglad dialog", isCorrect: false },
              { id: "c", text: "Öppet förfarande", isCorrect: true },
              { id: "d", text: "Direktupphandling", isCorrect: false },
            ],
            explanation:
              "Öppet förfarande är det vanligaste och innebär att alla intresserade leverantörer får lämna anbud. Det passar bäst när kraven är tydliga och marknaden är etablerad.",
          },
          {
            id: "q3-3",
            question:
              "En kommun vill dela upp ett IT-inköp på 2 MSEK i fyra delar om 500 000 SEK vardera för att kunna direktupphandla. Är det tillåtet?",
            options: [
              { id: "a", text: "Ja, om varje del avser olika funktioner", isCorrect: false },
              { id: "b", text: "Ja, om delarna läggs ut vid olika tidpunkter", isCorrect: false },
              {
                id: "c",
                text: "Nej, det är otillåten uppdelning — totala kontraktsvärdet avgör",
                isCorrect: true,
              },
              { id: "d", text: "Ja, om olika avdelningar står som beställare", isCorrect: false },
            ],
            explanation:
              "Att dela upp en upphandling i syfte att kringgå tröskelvärdena är uttryckligen förbjudet i LOU. Det totala värdet av det planerade inköpet avgör vilket förfarande som ska användas.",
          },
          {
            id: "q3-4",
            question: "Under vilken ungefärlig beloppsgräns kan direktupphandling normalt användas?",
            options: [
              { id: "a", text: "100 000 SEK", isCorrect: false },
              { id: "b", text: "300 000 SEK", isCorrect: false },
              { id: "c", text: "700 000 SEK", isCorrect: true },
              { id: "d", text: "1 500 000 SEK", isCorrect: false },
            ],
            explanation:
              "Direktupphandling kan normalt användas under cirka 700 000 SEK. Beloppet kan justeras och det är viktigt att kontrollera aktuella gränsvärden.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 4 — Upphandlingsprocessen steg för steg                     */
    /* ================================================================== */
    {
      id: "upphandling-lou-4",
      title: "Upphandlingsprocessen steg för steg",
      theory: {
        content: [
          "Upphandlingsprocessen kan delas in i fyra huvudfaser. Första fasen handlar om förberedelse: behovsanalys, marknadsundersökning, val av förfarande och framtagning av upphandlingsdokument. Här läggs grunden för hela upphandlingen.",
          "I genomförandefasen annonseras upphandlingen, leverantörer ställer frågor, anbud lämnas in och utvärderas. Utvärderingen följer den modell som angavs i upphandlingsdokumenten — det går inte att ändra utvärderingskriterierna i efterhand.",
          "Efter utvärderingen fattas ett tilldelningsbeslut som meddelas alla anbudsgivare. Därefter följer en avtalsspärr på 10–15 dagar där förlorande parter kan begära överprövning. Först efter spärtidens utgång kan avtal tecknas.",
        ],
        keyPoints: [
          "Förberedelse: behovsanalys, marknad, upphandlingsdokument",
          "Genomförande: annonsering, frågor, anbudsinlämning, utvärdering",
          "Tilldelning: beslut, avtalsspärr, eventuell överprövning",
          "Avtal: kontraktsskrivning, implementering, uppföljning",
        ],
      },
      scenario: {
        id: "scenario-4-1",
        title: "Behovsanalys som grund för upphandlingen",
        context:
          "En region ska upphandla ett nytt journalsystem för primärvården. Du ingår i den tvärfunktionella projektgruppen som ska leda upphandlingen från start till mål. Ni befinner er i förberedelsefasen.",
        steps: [
          {
            situation:
              "Verksamhetschefen vill hoppa över behovsanalysen och gå direkt till att skriva kravspecifikationen: 'Vi vet ju vad vi behöver — ett system som fungerar som det gamla fast bättre.'",
            question: "Hur hanterar du situationen?",
            choices: [
              {
                id: "1a",
                text: "Jag håller med — vi sparar tid genom att skriva kraven direkt baserat på det befintliga systemet.",
                isOptimal: false,
                feedback:
                  "Att skriva krav baserat på det befintliga systemet riskerar att man reproducerar gamla brister och missar nya möjligheter. En strukturerad behovsanalys säkerställer att verkliga behov styr kraven.",
              },
              {
                id: "1b",
                text: "Jag argumenterar för att behovsanalysen är grunden för hela upphandlingen och att den sparar tid och pengar i längden.",
                isOptimal: true,
                feedback:
                  "Rätt approach. Behovsanalysen är den viktigaste fasen — den säkerställer att kraven speglar verkliga behov, förhindrar att krav blir produktspecifika, och minskar risken för överprövning.",
              },
              {
                id: "1c",
                text: "Jag föreslår att vi gör en snabb marknadsundersökning istället för behovsanalys.",
                isOptimal: false,
                feedback:
                  "Marknadsundersökning är viktigt men ersätter inte behovsanalys. Behovsanalysen ska komma före marknadsundersökningen — först behöver vi veta vad vi behöver, sedan kan vi undersöka vad marknaden erbjuder.",
              },
            ],
          },
          {
            situation:
              "Under anbudstiden kontaktar en leverantör er och erbjuder en gratis demo av sitt system. 'Ni kan testa det under anbudstiden så att ni ser hur bra det fungerar.'",
            question: "Hur hanterar du erbjudandet?",
            choices: [
              {
                id: "2a",
                text: "Vi tackar ja — det hjälper oss att utvärdera bättre.",
                isOptimal: false,
                feedback:
                  "Att ta emot en demo från en enskild leverantör under pågående anbudstid bryter mot likabehandlingsprincipen. Det ger leverantören en otillbörlig fördel och kan påverka utvärderingen.",
              },
              {
                id: "2b",
                text: "Vi tackar nej och hänvisar till att vi inte kan ha enskilda kontakter med leverantörer under pågående upphandling.",
                isOptimal: true,
                feedback:
                  "Korrekt. Under pågående upphandling ska all kommunikation ske via upphandlingssystemet och vara tillgänglig för alla. Enskilda demonstrationer kan äventyra likabehandlingen.",
              },
              {
                id: "2c",
                text: "Vi erbjuder alla leverantörer samma möjlighet till demo under anbudstiden.",
                isOptimal: false,
                feedback:
                  "Att erbjuda demo till alla under anbudstiden kan skapa praktiska problem och är inte standard. Demonstrationer bör i så fall vara del av den formella utvärderingen och beskrivas i upphandlingsdokumenten.",
              },
            ],
          },
          {
            situation:
              "Ni har fått in anbud och påbörjat utvärderingen. En av bedömarna i gruppen inser att ett viktigt utvärderingskriterium saknas som borde ha varit med. 'Kan vi inte lägga till det nu?'",
            question: "Vad gäller?",
            choices: [
              {
                id: "3a",
                text: "Ja, vi kan lägga till kriterier så länge vi informerar alla anbudsgivare.",
                isOptimal: false,
                feedback:
                  "Utvärderingskriterierna låses i upphandlingsdokumenten och får inte ändras efter att anbud lämnats in. Att lägga till nya kriterier strider mot transparensprincipen.",
              },
              {
                id: "3b",
                text: "Nej, utvärderingskriterierna är låsta sedan upphandlingen annonserades. Vi måste utvärdera enligt de kriterier som angavs.",
                isOptimal: true,
                feedback:
                  "Helt rätt. Utvärderingsmodellen bestäms före annonsering och får inte ändras. Leverantörerna har formulerat sina anbud baserat på de publicerade kriterierna.",
              },
              {
                id: "3c",
                text: "Vi kan ändra viktningen av befintliga kriterier istället.",
                isOptimal: false,
                feedback:
                  "Att ändra viktningen av kriterier efter anbudsinlämning är lika otillåtet som att lägga till nya. All ändring av utvärderingsmodellen efter annonsering bryter mot transparensprincipen.",
              },
            ],
          },
        ],
        roleRelevance: ["BESTALLARE", "UPPHANDLARE", "SYSTEMAGARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare är du drivande i förberedelsefasen. Behovsanalysen är ditt huvudansvar — det är här du definierar vad verksamheten behöver och varför. En gedigen behovsanalys är den enskilt viktigaste faktorn för en lyckad upphandling.",
          keyActions: [
            "Leda behovsanalysen och säkerställa att alla berörda verksamhetsdelar involveras",
            "Dokumentera effektmål och nyttor som upphandlingen ska realisera",
            "Delta aktivt i framtagning av kravspecifikation och utvärderingsmodell",
            "Medverka i utvärderingen av anbud utifrån verksamhetsperspektiv",
          ],
          pitfalls: [
            "Att delegera behovsanalysen helt till IT-avdelningen eller upphandlingsenheten",
            "Att inte avsätta tillräckligt med tid för förberedelsefasen",
            "Att ändra kraven under pågående upphandling",
            "Att inte delta i utvärderingen trots att man äger behovet",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare ansvarar du för att hela processen följer LOU och att varje fas genomförs korrekt. Du är processens garanti och måste hålla ordning på tidsfrister, formalia och dokumentation.",
          keyActions: [
            "Upprätta en realistisk tidsplan för hela upphandlingsprocessen",
            "Säkerställa att upphandlingsdokumenten är kompletta och juridiskt korrekta",
            "Hantera frågor och svar korrekt under anbudstiden",
            "Leda utvärderingsarbetet och dokumentera alla beslut",
          ],
          pitfalls: [
            "Att sätta för korta anbudstider som begränsar konkurrensen",
            "Att inte dokumentera utvärderingsprocessen tillräckligt",
            "Att tillåta informell kommunikation med leverantörer under upphandlingen",
            "Att inte säkerställa att avtalsspärren respekteras före avtalstecknande",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare bidrar du med teknisk expertis genom hela processen — från behovsanalys till utvärdering. Du behöver översätta tekniska möjligheter till begripliga alternativ för verksamheten och bedöma leverantörernas tekniska lösningar.",
          keyActions: [
            "Bidra med teknisk kompetens i behovsanalys och kravställning",
            "Genomföra eller stödja marknadsundersökningen ur tekniskt perspektiv",
            "Delta i utvärderingen av anbudens tekniska kvalitet",
            "Planera för implementering, integration och driftsättning",
          ],
          pitfalls: [
            "Att styra kravställningen mot en specifik teknisk lösning man redan känner till",
            "Att inte beakta icke-funktionella krav som prestanda, skalbarhet och säkerhet",
            "Att underskatta komplexiteten i systemintegration och datamigration",
            "Att inte involvera driftorganisationen tidigt i processen",
          ],
        },
      ],
      reflection: {
        question:
          "I vilken fas av upphandlingsprocessen tror du att de flesta misstag görs, och vad kan konsekvenserna bli?",
      },
      quiz: {
        questions: [
          {
            id: "q4-1",
            question: "Vilken fas är grunden för hela upphandlingen?",
            options: [
              { id: "a", text: "Genomförandefasen", isCorrect: false },
              { id: "b", text: "Förberedelsefasen med behovsanalys", isCorrect: true },
              { id: "c", text: "Tilldelningsfasen", isCorrect: false },
              { id: "d", text: "Avtalsfasen", isCorrect: false },
            ],
            explanation:
              "Förberedelsefasen med behovsanalys, marknadsundersökning och framtagning av upphandlingsdokument lägger grunden för hela upphandlingen. Brister här leder till problem i alla efterföljande faser.",
          },
          {
            id: "q4-2",
            question:
              "Kan utvärderingskriterierna ändras efter att upphandlingen annonserats?",
            options: [
              { id: "a", text: "Ja, om alla anbudsgivare informeras", isCorrect: false },
              { id: "b", text: "Ja, men bara om det rör sig om mindre justeringar", isCorrect: false },
              {
                id: "c",
                text: "Nej, utvärderingsmodellen låses före annonsering och får inte ändras",
                isCorrect: true,
              },
              { id: "d", text: "Ja, fram till dess att anbuden öppnas", isCorrect: false },
            ],
            explanation:
              "Utvärderingsmodellen bestäms innan upphandlingen annonseras och får inte ändras efteråt. Leverantörerna formulerar sina anbud baserat på de publicerade kriterierna — att ändra dem bryter mot transparensprincipen.",
          },
          {
            id: "q4-3",
            question: "Vad är avtalsspärrens syfte?",
            options: [
              {
                id: "a",
                text: "Att ge den upphandlande myndigheten tid att förbereda avtalet",
                isCorrect: false,
              },
              {
                id: "b",
                text: "Att ge förlorande leverantörer möjlighet att begära överprövning innan avtal tecknas",
                isCorrect: true,
              },
              { id: "c", text: "Att ge vinnande leverantör tid att förbereda sig", isCorrect: false },
              { id: "d", text: "Att uppfylla EU:s krav på minsta anbudstid", isCorrect: false },
            ],
            explanation:
              "Avtalsspärren ger förlorande leverantörer tid att ansöka om överprövning hos förvaltningsrätten innan avtal tecknas. Under spärrtiden får avtal inte ingås.",
          },
          {
            id: "q4-4",
            question:
              "En leverantör erbjuder en gratis demo under pågående anbudstid. Hur bör du hantera det?",
            options: [
              { id: "a", text: "Tacka ja — det hjälper utvärderingen", isCorrect: false },
              { id: "b", text: "Erbjuda alla leverantörer samma möjlighet omedelbart", isCorrect: false },
              {
                id: "c",
                text: "Tacka nej — enskild kontakt med leverantörer under anbudstiden riskerar att bryta mot likabehandlingsprincipen",
                isCorrect: true,
              },
              { id: "d", text: "Tacka ja men inte berätta för de andra leverantörerna", isCorrect: false },
            ],
            explanation:
              "Under pågående upphandling ska all kommunikation ske via upphandlingssystemet och vara tillgänglig för alla. Enskilda demonstrationer ger en leverantör en otillbörlig fördel.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 5 — Teknisk specifikation och kravställning                 */
    /* ================================================================== */
    {
      id: "upphandling-lou-5",
      title: "Teknisk specifikation och kravställning",
      theory: {
        content: [
          "Kravställningen är ofta den mest kritiska delen av upphandlingen. Kraven måste vara tydliga, mätbara och proportionerliga. I LOU skiljer man mellan obligatoriska krav (SKA-krav) som måste uppfyllas, och mervärdesekrav (BÖR-krav) som utvärderas med poäng.",
          "En teknisk specifikation kan formuleras på olika sätt: som funktionskrav (vad systemet ska göra), prestandakrav (hur bra det ska göra det) eller som hänvisning till standarder. Funktionskrav är ofta att föredra eftersom de ger leverantörerna frihet att föreslå innovativa lösningar.",
          "Varje krav bör vara spårbart till ett dokumenterat behov. Om ett krav inte kan motiveras med ett verkligt verksamhetsbehov riskerar det att bedömas som oproportionerligt vid en eventuell överprövning.",
        ],
        keyPoints: [
          "SKA-krav är obligatoriska — uppfylls de inte förkastas anbudet",
          "BÖR-krav är mervärdesekrav som poängsätts",
          "Funktionskrav ger mer utrymme för innovation än detaljerade tekniska krav",
          "Alla krav ska vara spårbara till dokumenterade behov",
        ],
      },
      scenario: {
        id: "scenario-5-1",
        title: "Kravfällan i IT-upphandlingen",
        context:
          "Du deltar i kravställningen för ett nytt ärendehanteringssystem. Verksamheten har sammanställt en lista med 150 krav. Du ska nu granska och kvalitetssäkra kraven innan de skickas till upphandlingsenheten.",
        steps: [
          {
            situation:
              "I kravlistan hittar du följande SKA-krav: 'Systemet ska vara utvecklat i Java med Spring Boot-ramverket och använda PostgreSQL som databas.' Kravet kommer från IT-avdelningen.",
            question: "Hur bedömer du detta krav?",
            choices: [
              {
                id: "1a",
                text: "Kravet är bra — det säkerställer att vi får en modern teknisk plattform.",
                isOptimal: false,
                feedback:
                  "Att specificera programmeringsspråk och ramverk är ett detaljerat tekniskt krav som begränsar konkurrensen. Det stänger ute alla lösningar som använder annan teknik men kan uppfylla samma behov.",
              },
              {
                id: "1b",
                text: "Kravet bör omformuleras till funktionskrav, t.ex. 'Systemet ska stödja öppna standarder och kunna integreras via API:er.'",
                isOptimal: true,
                feedback:
                  "Helt rätt. Genom att formulera funktionskrav istället för tekniska detaljkrav öppnar du upp för fler leverantörer och innovativa lösningar, samtidigt som du säkerställer att det verkliga behovet (integration och öppna standarder) uppfylls.",
              },
              {
                id: "1c",
                text: "Kravet kan vara kvar men bör ändras till BÖR-krav istället.",
                isOptimal: false,
                feedback:
                  "Att ändra till BÖR-krav löser inte grundproblemet — kravet är fortfarande produktspecifikt och kan gynna leverantörer som använder just den tekniken. Det bör omformuleras till att beskriva funktionalitet.",
              },
            ],
          },
          {
            situation:
              "Du hittar ytterligare ett krav: 'Leverantören ska ha minst 500 anställda och en omsättning på minst 100 MSEK.' Systemet som upphandlas har ett uppskattat värde på 2 MSEK.",
            question: "Vad är problemet med detta krav?",
            choices: [
              {
                id: "2a",
                text: "Inget problem — det garanterar att leverantören är stabil.",
                isOptimal: false,
                feedback:
                  "Kravet är oproportionerligt. Att kräva 500 anställda och 100 MSEK omsättning för ett system värt 2 MSEK stänger ute många kompetenta leverantörer utan att det är motiverat av kontraktets storlek.",
              },
              {
                id: "2b",
                text: "Kravet är oproportionerligt — det stänger ute mindre leverantörer utan att det är motiverat av upphandlingens värde och komplexitet.",
                isOptimal: true,
                feedback:
                  "Korrekt. Proportionalitetsprincipen kräver att krav står i rimlig proportion till det som upphandlas. Krav på leverantörens storlek ska relatera till kontraktets värde och komplexitet.",
              },
              {
                id: "2c",
                text: "Vi bör höja kravet ytterligare för att vara helt säkra på leverantörens förmåga.",
                isOptimal: false,
                feedback:
                  "Att höja kravet ytterligare förvärrar proportionalitetsproblemet. Kraven på ekonomisk och teknisk kapacitet ska stå i proportion till kontraktets storlek.",
              },
            ],
          },
          {
            situation:
              "En kollega föreslår att ni ska göra alla 150 krav till SKA-krav: 'Då vet vi att vi får exakt det vi vill ha.' Just nu är fördelningen 100 SKA-krav och 50 BÖR-krav.",
            question: "Varför är det problematiskt att göra alla krav till SKA-krav?",
            choices: [
              {
                id: "3a",
                text: "Det är inte problematiskt — ju fler SKA-krav desto bättre.",
                isOptimal: false,
                feedback:
                  "Fler SKA-krav ökar risken att alla anbud diskvalificeras. SKA-krav bör reserveras för det som verkligen är absolut nödvändigt. Önskvärd funktionalitet bör vara BÖR-krav som ger poäng.",
              },
              {
                id: "3b",
                text: "För många SKA-krav ökar risken att alla anbud förkastas och begränsar leverantörernas möjlighet att erbjuda innovativa lösningar.",
                isOptimal: true,
                feedback:
                  "Rätt. SKA-krav innebär att anbudet förkastas om kravet inte uppfylls. Om alla krav är SKA-krav riskerar man att inga anbud uppfyller alla krav, eller att man missar bättre lösningar som uppfyller behovet på annat sätt.",
              },
              {
                id: "3c",
                text: "Det enda problemet är att det blir mycket arbete att kontrollera alla krav.",
                isOptimal: false,
                feedback:
                  "Arbetsbelastningen är ett problem, men det allvarligaste är att för många SKA-krav riskerar att inga anbud klarar kvalificeringen, och att det begränsar innovation och konkurrens.",
              },
            ],
          },
        ],
        roleRelevance: ["BESTALLARE", "UPPHANDLARE", "SYSTEMAGARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare ansvarar du för att kraven utgår från verkliga verksamhetsbehov. Du måste skilja på vad verksamheten verkligen behöver och vad den önskar sig. Behovsspårbarheten — kopplingen mellan behov och krav — är din viktigaste kvalitetssäkring.",
          keyActions: [
            "Definiera och prioritera verksamhetens behov innan kraven formuleras",
            "Säkerställa att varje krav kan spåras tillbaka till ett dokumenterat behov",
            "Avgöra vilka krav som är absolut nödvändiga (SKA) och vilka som är önskvärda (BÖR)",
            "Granska kravlistan ur ett verksamhetsperspektiv — saknas något? Finns onödiga krav?",
          ],
          pitfalls: [
            "Att låta IT-avdelningen ensam formulera krav utan verksamhetsförankring",
            "Att göra alla krav till SKA-krav 'för säkerhets skull'",
            "Att ta med krav från det befintliga systemet utan att ifrågasätta om de fortfarande är relevanta",
            "Att inte kunna motivera varför ett krav finns med — varje krav ska ha ett syfte",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare kvalitetssäkrar du kravspecifikationen ur ett juridiskt och procedurmässigt perspektiv. Du granskar att kraven är tydliga, mätbara, proportionerliga och inte strider mot LOU:s principer.",
          keyActions: [
            "Granska alla krav mot proportionalitetsprincipen",
            "Kontrollera att krav inte är produktspecifika eller diskriminerande",
            "Säkerställa att SKA-krav verkligen är absoluta och att BÖR-krav har tydliga poängankare",
            "Verifiera att kraven är tillräckligt tydliga för att leverantörer ska kunna besvara dem entydigt",
          ],
          pitfalls: [
            "Att inte granska tekniska krav tillräckligt noga för produktspecifika formuleringar",
            "Att godkänna oproportionerliga krav på leverantörens storlek eller omsättning",
            "Att inte säkerställa att alla SKA-krav verkligen är verifierbara",
            "Att missa att krav hänvisar till specifika standarder utan att öppna för likvärdiga",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare bidrar du med teknisk kunskap vid kravformuleringen. Din utmaning är att översätta tekniska behov till funktionella krav som inte stänger ute leverantörer, samtidigt som de säkerställer att lösningen passar i den befintliga IT-miljön.",
          keyActions: [
            "Formulera tekniska behov som funktionskrav snarare än detaljerade tekniska specifikationer",
            "Specificera integrationskrav baserat på standarder och API:er, inte specifik teknik",
            "Definiera prestandakrav med mätbara tröskelvärden",
            "Bidra med kunskap om icke-funktionella krav som säkerhet, skalbarhet och tillgänglighet",
          ],
          pitfalls: [
            "Att specificera programmeringsspråk, ramverk eller databastyp utan funktionell motivering",
            "Att formulera krav som i praktiken beskriver det befintliga systemets tekniska lösning",
            "Att glömma krav på dataformat, export och migrering",
            "Att inte beakta leverantörsoberoende — krav som skapar låsning till en specifik leverantör",
          ],
        },
      ],
      reflection: {
        question:
          "Hur säkerställer du att dina krav är tillräckligt tydliga för att en leverantör ska kunna förstå exakt vad som förväntas?",
      },
      quiz: {
        questions: [
          {
            id: "q5-1",
            question: "Vad händer om ett anbud inte uppfyller ett SKA-krav?",
            options: [
              { id: "a", text: "Anbudet får lägre poäng", isCorrect: false },
              { id: "b", text: "Anbudet förkastas", isCorrect: true },
              { id: "c", text: "Leverantören får komplettera sitt anbud", isCorrect: false },
              { id: "d", text: "SKA-kravet omvandlas till ett BÖR-krav", isCorrect: false },
            ],
            explanation:
              "SKA-krav är obligatoriska. Om ett anbud inte uppfyller ett SKA-krav förkastas det och går inte vidare till utvärdering av BÖR-krav och pris.",
          },
          {
            id: "q5-2",
            question: "Varför rekommenderas funktionskrav framför detaljerade tekniska specifikationer?",
            options: [
              { id: "a", text: "De är enklare att skriva", isCorrect: false },
              {
                id: "b",
                text: "De ger leverantörerna frihet att föreslå innovativa lösningar utan att begränsa konkurrensen",
                isCorrect: true,
              },
              { id: "c", text: "De är billigare att utvärdera", isCorrect: false },
              { id: "d", text: "De kräver mindre dokumentation", isCorrect: false },
            ],
            explanation:
              "Funktionskrav beskriver vad systemet ska göra, inte hur. Det ger leverantörerna frihet att föreslå den bästa lösningen och öppnar upp konkurrensen.",
          },
          {
            id: "q5-3",
            question:
              "En kravspecifikation kräver att leverantören har minst 1 000 anställda för ett avtal värt 500 000 SEK. Vad gäller?",
            options: [
              { id: "a", text: "Kravet säkerställer leverantörens stabilitet", isCorrect: false },
              {
                id: "b",
                text: "Kravet är troligen oproportionerligt i förhållande till kontraktsvärdet",
                isCorrect: true,
              },
              { id: "c", text: "Kravet är alltid tillåtet som SKA-krav", isCorrect: false },
              { id: "d", text: "Kravet behöver bara vara ett BÖR-krav för att vara tillåtet", isCorrect: false },
            ],
            explanation:
              "Proportionalitetsprincipen kräver att krav på leverantörens kapacitet står i rimlig proportion till kontraktets värde. Att kräva 1 000 anställda för ett avtal på 500 000 SEK är oproportionerligt.",
          },
          {
            id: "q5-4",
            question: "Vad innebär behovsspårbarhet i kravställningen?",
            options: [
              { id: "a", text: "Att alla krav ska vara skrivna av beställaren", isCorrect: false },
              { id: "b", text: "Att kraven ska vara numrerade i ordning", isCorrect: false },
              {
                id: "c",
                text: "Att varje krav kan kopplas till ett dokumenterat verksamhetsbehov",
                isCorrect: true,
              },
              { id: "d", text: "Att kraven ska hänvisa till specifika lagparagrafer", isCorrect: false },
            ],
            explanation:
              "Behovsspårbarhet innebär att varje krav ska kunna spåras tillbaka till ett dokumenterat behov. Krav som inte kan motiveras med ett verkligt behov riskerar att bedömas som oproportionerliga.",
          },
          {
            id: "q5-5",
            question: "Vad är risken med att ha för många SKA-krav?",
            options: [
              { id: "a", text: "Det blir dyrt att utvärdera", isCorrect: false },
              {
                id: "b",
                text: "Alla anbud riskerar att förkastas, och innovativa lösningar utesluts",
                isCorrect: true,
              },
              { id: "c", text: "Leverantörerna lämnar inte anbud", isCorrect: false },
              { id: "d", text: "Det tar för lång tid att skriva kravspecifikationen", isCorrect: false },
            ],
            explanation:
              "Ju fler SKA-krav, desto större risk att alla anbud förkastas vid granskningen. Dessutom begränsar det leverantörernas möjlighet att erbjuda alternativa lösningar som kanske bättre uppfyller det verkliga behovet.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 6 — Utvärdering och tilldelning                             */
    /* ================================================================== */
    {
      id: "upphandling-lou-6",
      title: "Utvärdering och tilldelning",
      theory: {
        content: [
          "Utvärderingsmodellen bestäms innan upphandlingen annonseras och får inte ändras efterhand. De vanligaste tilldelningsgrunderna är bästa förhållandet mellan pris och kvalitet, lägsta kostnad, eller lägsta pris.",
          "Varje utvärderingskriterium behöver en tydlig vikt och en poängskala med definierade poängankare. Poängankare beskriver vad varje poängnivå innebär, vilket säkerställer att olika bedömare ger samma poäng för samma kvalitetsnivå.",
          "Vid utvärderingen kontrolleras först att alla SKA-krav är uppfyllda. Anbud som inte klarar SKA-kraven diskvalificeras. Därefter poängsätts BÖR-kraven och priset vägs in enligt den angivna modellen.",
        ],
        keyPoints: [
          "Utvärderingsmodellen låses innan annonsering",
          "Poängankare är avgörande för rättvis bedömning",
          "SKA-krav kontrolleras först — ej uppfyllda innebär diskvalificering",
          "Tilldelningsbeslutet måste motiveras tydligt",
        ],
      },
      scenario: {
        id: "scenario-6-1",
        title: "Utvärdering av anbud i praktiken",
        context:
          "Du sitter i en utvärderingsgrupp för en upphandling av ett HR-system. Tre anbud har klarat SKA-kraven och ska nu poängsättas på kvalitet. Utvärderingskriterierna har viktningen 60 % kvalitet och 40 % pris.",
        steps: [
          {
            situation:
              "Två bedömare har poängsatt samma anbud. Bedömare A ger 8 av 10 poäng för användarvänlighet. Bedömare B ger 4 av 10 för samma anbud på samma kriterium. Det finns inga poängankare definierade.",
            question: "Vad är grundproblemet här?",
            choices: [
              {
                id: "1a",
                text: "Bedömare B är för sträng — vi bör använda bedömare A:s poäng.",
                isOptimal: false,
                feedback:
                  "Problemet är inte enskilda bedömare utan att det saknas poängankare. Utan definierade kriterier för varje poängnivå blir bedömningen subjektiv och oförutsägbar.",
              },
              {
                id: "1b",
                text: "Avsaknaden av poängankare gör bedömningen godtycklig. Vi borde ha definierat vad varje poängnivå innebär innan utvärderingen.",
                isOptimal: true,
                feedback:
                  "Exakt. Poängankare beskriver vad som krävs för varje poängnivå. Utan dem riskerar bedömningen att bli subjektiv, vilket kan leda till överprövning.",
              },
              {
                id: "3c",
                text: "Vi tar ett medelvärde av de två bedömarnas poäng.",
                isOptimal: false,
                feedback:
                  "Att ta medelvärde döljer problemet men löser det inte. Om bedömarna har helt olika uppfattning om vad som är bra kvalitet tyder det på att poängankare saknas.",
              },
            ],
          },
          {
            situation:
              "Under utvärderingen av ett anbud upptäcker ni att leverantören inte besvarat ett av BÖR-kraven. En kollega föreslår: 'Vi ringer och frågar dem — det var säkert ett missförstånd.'",
            question: "Hur hanterar du situationen?",
            choices: [
              {
                id: "2a",
                text: "Vi ringer leverantören för att få svaret — det vore orättvist att ge noll poäng för ett missförstånd.",
                isOptimal: false,
                feedback:
                  "Att kontakta en enskild leverantör för att komplettera anbudet bryter mot likabehandlingsprincipen. Anbudet bedöms som det är — ett obesvarat BÖR-krav ger noll poäng.",
              },
              {
                id: "2b",
                text: "Leverantören får noll poäng på det kriteriet. Anbudet bedöms som det är inlämnat.",
                isOptimal: true,
                feedback:
                  "Korrekt. Ett anbud ska bedömas som det är inlämnat. Det är leverantörens ansvar att besvara alla krav. Att kontakta en leverantör för komplettering ger den en otillbörlig fördel.",
              },
              {
                id: "2c",
                text: "Vi ger alla leverantörer möjlighet att komplettera sina anbud.",
                isOptimal: false,
                feedback:
                  "Komplettering av anbud är bara tillåtet i begränsade situationer och ska avse förtydliganden, inte nya svar. Att öppna för komplettering för att hjälpa en leverantör riskerar att snedvrida konkurrensen.",
              },
            ],
          },
        ],
        roleRelevance: ["UPPHANDLARE", "BESTALLARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare deltar du i utvärderingen av kvalitetsaspekterna. Du bedömer hur väl leverantörernas lösningar möter verksamhetens behov. Det är avgörande att du kan göra en objektiv bedömning baserad på de fastställda kriterierna, inte på personliga preferenser.",
          keyActions: [
            "Delta aktivt i utformningen av utvärderingsmodell och poängankare innan annonsering",
            "Bedöma anbud strikt utifrån de fastställda kriterierna och poängankarna",
            "Dokumentera motivering för varje poängsättning",
            "Granska att den samlade utvärderingen ger en rimlig helhetsbild",
          ],
          pitfalls: [
            "Att bedöma anbud utifrån vad man vet om leverantören istället för vad som står i anbudet",
            "Att ge högre poäng till lösningar som liknar det befintliga systemet",
            "Att inte följa poängankarna konsekvent genom alla anbud",
            "Att diskutera poängsättning med kollegor innan individuell bedömning är klar",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare ansvarar du för att utvärderingsmodellen är korrekt konstruerad och att utvärderingsprocessen följs. Du leder utvärderingsgruppens arbete och säkerställer att bedömningen är objektiv, dokumenterad och går att försvara vid en eventuell överprövning.",
          keyActions: [
            "Utforma en tydlig utvärderingsmodell med poängankare före annonsering",
            "Leda utvärderingsgruppens arbete och säkerställa individuell bedömning före diskussion",
            "Dokumentera alla bedömningar och motiveringar",
            "Formulera ett tydligt och motiverat tilldelningsbeslut",
          ],
          pitfalls: [
            "Att publicera utvärderingsmodellen utan definierade poängankare",
            "Att låta utvärderingsgruppen diskutera poäng innan individuella bedömningar gjorts",
            "Att inte dokumentera tillräckligt detaljerat varför ett visst anbud fick en viss poäng",
            "Att formulera tilldelningsbeslutet otydligt, vilket ökar risken för överprövning",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare bidrar du med teknisk bedömning av anbuden. Du utvärderar lösningarnas tekniska kvalitet, integrationsförmåga och långsiktiga hållbarhet. Din expertis är ovärderlig men måste kanaliseras genom de fastställda kriterierna.",
          keyActions: [
            "Bedöma anbudens tekniska kvalitet baserat på de fastställda kriterierna",
            "Utvärdera leverantörernas tekniska lösningar för integration och datamigration",
            "Bidra med teknisk analys av anbudens genomförbarhet",
            "Dokumentera tekniska bedömningar med tydlig referens till poängankare",
          ],
          pitfalls: [
            "Att bedöma anbud utifrån tekniska aspekter som inte ingår i utvärderingskriterierna",
            "Att gynna en specifik teknisk lösning baserat på personlig erfarenhet",
            "Att anta att den mest tekniskt avancerade lösningen alltid är den bästa",
            "Att inte beakta användarupplevelse och verksamhetsnytta i den tekniska bedömningen",
          ],
        },
      ],
      reflection: {
        question:
          "Vad kan hända om poängankare saknas och två olika bedömare utvärderar samma anbud?",
      },
      quiz: {
        questions: [
          {
            id: "q6-1",
            question: "När bestäms utvärderingsmodellen i en upphandling?",
            options: [
              { id: "a", text: "Efter att anbuden öppnats", isCorrect: false },
              { id: "b", text: "Under utvärderingen", isCorrect: false },
              { id: "c", text: "Innan upphandlingen annonseras", isCorrect: true },
              { id: "d", text: "I samband med tilldelningsbeslutet", isCorrect: false },
            ],
            explanation:
              "Utvärderingsmodellen med tilldelningsgrund, kriterier, vikter och poängankare bestäms och publiceras innan upphandlingen annonseras. Den får inte ändras efteråt.",
          },
          {
            id: "q6-2",
            question: "Vad är poängankare?",
            options: [
              { id: "a", text: "Minsta och högsta möjliga poäng i utvärderingen", isCorrect: false },
              {
                id: "b",
                text: "Beskrivningar av vad varje poängnivå innebär för att säkerställa enhetlig bedömning",
                isCorrect: true,
              },
              { id: "c", text: "De viktigaste utvärderingskriterierna", isCorrect: false },
              { id: "d", text: "Leverantörens egen poängsättning av sitt anbud", isCorrect: false },
            ],
            explanation:
              "Poängankare beskriver konkret vad som krävs för varje poängnivå. De säkerställer att olika bedömare ger likvärdig poäng och att bedömningen blir rättvis och transparent.",
          },
          {
            id: "q6-3",
            question:
              "En leverantör har inte besvarat ett BÖR-krav i sitt anbud. Vad är korrekt hantering?",
            options: [
              { id: "a", text: "Ring leverantören och be om komplettering", isCorrect: false },
              { id: "b", text: "Anta att leverantören uppfyller kravet", isCorrect: false },
              { id: "c", text: "Ge leverantören noll poäng på det kriteriet", isCorrect: true },
              { id: "d", text: "Diskvalificera anbudet helt", isCorrect: false },
            ],
            explanation:
              "Ett anbud bedöms som det är inlämnat. Ett obesvarat BÖR-krav ger noll poäng men leder inte till diskvalificering (till skillnad från ett SKA-krav). Att kontakta leverantören för komplettering bryter mot likabehandlingsprincipen.",
          },
          {
            id: "q6-4",
            question: "Vilka är de vanligaste tilldelningsgrunderna i LOU?",
            options: [
              { id: "a", text: "Bästa varumärke, snabbast leverans, lägsta risk", isCorrect: false },
              {
                id: "b",
                text: "Bästa förhållandet mellan pris och kvalitet, lägsta kostnad, eller lägsta pris",
                isCorrect: true,
              },
              { id: "c", text: "Högsta kvalitet, bästa referens, mest erfarenhet", isCorrect: false },
              { id: "d", text: "Lägsta pris, kortast leveranstid, störst företag", isCorrect: false },
            ],
            explanation:
              "LOU anger tre tilldelningsgrunder: bästa förhållandet mellan pris och kvalitet (vanligast), lägsta kostnad (livscykelkostnad), eller lägsta pris.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 7 — Avtalsspärr och överprövning                            */
    /* ================================================================== */
    {
      id: "upphandling-lou-7",
      title: "Avtalsspärr och överprövning",
      theory: {
        content: [
          "När tilldelningsbeslutet är fattat och kommunicerat inträder en avtalsspärr. Spärrtiden är minst 10 dagar vid förenklad upphandling och minst 15 dagar vid öppen eller selektiv upphandling. Under spärrtiden får avtal inte tecknas.",
          "En leverantör som anser att upphandlingen genomförts i strid med LOU kan ansöka om överprövning hos förvaltningsrätten. Vanliga grunder är otydliga eller oproportionerliga krav, bristande motivering, eller att utvärderingen inte följt de angivna kriterierna.",
          "Överprövning leder till förseningar och kostnader för båda parter. Det bästa sättet att undvika överprövning är att vara noggrann i förberedelsearbetet: tydliga krav, väl motiverade beslut och full transparens.",
        ],
        keyPoints: [
          "Avtalsspärr: 10 dagar (förenklad) eller 15 dagar (öppen/selektiv)",
          "Överprövning sker i förvaltningsrätten",
          "Vanliga orsaker: otydliga krav, bristande motivering, felaktig utvärdering",
          "Förebyggande: tydlighet, spårbarhet och dokumentation",
        ],
      },
      scenario: {
        id: "scenario-7-1",
        title: "Hantering av tilldelningsbeslut och överprövning",
        context:
          "Ni har genomfört en öppen upphandling av ett skoladministrativt system. Fyra anbud kom in, varav tre klarade SKA-kraven. Utvärderingen är klar och ni har utsett en vinnare. Nu ska tilldelningsbeslutet kommuniceras.",
        steps: [
          {
            situation:
              "Projektledaren vill skynda på processen: 'Kan vi inte skicka ut tilldelningsbeslutet och teckna avtal samma dag? Vi har ju redan bestämt oss.'",
            question: "Vad svarar du?",
            choices: [
              {
                id: "1a",
                text: "Ja, om alla leverantörer informeras samtidigt kan vi teckna avtal direkt.",
                isOptimal: false,
                feedback:
                  "Nej. Vid en öppen upphandling gäller avtalsspärr på minst 15 dagar. Under denna tid får avtal inte tecknas, oavsett hur angeläget det är.",
              },
              {
                id: "1b",
                text: "Nej, det gäller en avtalsspärr på minst 15 dagar vid öppet förfarande. Avtalet kan tecknas först efter spärtidens utgång.",
                isOptimal: true,
                feedback:
                  "Helt rätt. Avtalsspärren på 15 dagar vid öppen upphandling är lagstadgad och ger förlorande leverantörer möjlighet att begära överprövning.",
              },
              {
                id: "1c",
                text: "Vi kan teckna ett preliminärt avtal nu och formalisera det efter spärrtiden.",
                isOptimal: false,
                feedback:
                  "Att teckna något form av avtal under avtalsspärren är inte tillåtet. Syftet med spärren är just att förhindra att avtal ingås innan förlorande leverantörer haft möjlighet att överpröva.",
              },
            ],
          },
          {
            situation:
              "Dag 12 i avtalsspärren meddelar en förlorande leverantör att de avser att begära överprövning. De anser att ett av SKA-kraven var otydligt formulerat och att det tolkades olika av bedömarna.",
            question: "Hur bör ni hantera situationen?",
            choices: [
              {
                id: "2a",
                text: "Vi ignorerar hotet och tecknar avtal direkt när spärrtiden löper ut.",
                isOptimal: false,
                feedback:
                  "Om en ansökan om överprövning har lämnats in till förvaltningsrätten innan avtalsspärren löper ut gäller en förlängd spärr. Det vore riskabelt att teckna avtal utan att veta om ansökan lämnats in.",
              },
              {
                id: "2b",
                text: "Vi kontrollerar om ansökan om överprövning faktiskt lämnats in och avvaktar med avtalstecknande tills situationen klarnat.",
                isOptimal: true,
                feedback:
                  "Korrekt. Om leverantören lämnat in en formell ansökan om överprövning gäller en förlängd avtalsspärr. Det är viktigt att verifiera situationen hos förvaltningsrätten innan avtal tecknas.",
              },
              {
                id: "2c",
                text: "Vi erbjuder leverantören kompensation för att de ska dra tillbaka sin ansökan.",
                isOptimal: false,
                feedback:
                  "Att försöka förmå en leverantör att dra tillbaka en överprövning genom kompensation vore olämpligt och potentiellt olagligt. Överprövningsrätten är en grundläggande rättighet.",
              },
            ],
          },
          {
            situation:
              "Förvaltningsrätten beslutar att upphandlingen ska göras om på grund av det otydliga SKA-kravet. Projektet försenas med minst fyra månader.",
            question: "Vilken lärdom bör organisationen ta med sig?",
            choices: [
              {
                id: "3a",
                text: "Vi ska ha färre SKA-krav i nästa upphandling för att minska risken.",
                isOptimal: false,
                feedback:
                  "Antalet SKA-krav är inte problemet — det är formuleringen. Varje SKA-krav måste vara otvetydigt och tydligt definierat så att det tolkas likadant av alla parter.",
              },
              {
                id: "3b",
                text: "Vi ska investera mer tid i att granska och testa kravformuleringarna före annonsering, gärna genom att låta någon utanför projektet läsa igenom dem.",
                isOptimal: true,
                feedback:
                  "Rätt slutsats. Otydliga krav är en vanlig orsak till överprövning. Genom att investera mer tid i kvalitetssäkring av kravformuleringarna, gärna med extern granskning, minskar risken avsevärt.",
              },
              {
                id: "3c",
                text: "Vi ska undvika öppet förfarande nästa gång för att minska risken för överprövning.",
                isOptimal: false,
                feedback:
                  "Överprövning kan ske oavsett förfarandetyp. Problemet var kravformuleringen, inte förfarandet. Öppet förfarande ger dessutom ofta bättre konkurrens.",
              },
            ],
          },
        ],
        roleRelevance: ["UPPHANDLARE", "BESTALLARE", "SYSTEMAGARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare drabbas du direkt av förseningar vid överprövning. Din viktigaste förebyggande insats görs i förberedelsefasen genom att säkerställa att kraven är tydliga, motiverade och proportionerliga. En väl genomförd behovsanalys minskar risken betydligt.",
          keyActions: [
            "Säkerställa att alla krav är tydligt formulerade och motiverade från start",
            "Planera för eventuella förseningar vid överprövning i projektets tidsplan",
            "Granska tilldelningsbeslutet och säkerställ att motiveringen är begriplig",
            "Ha en beredskapsplan om upphandlingen måste göras om",
          ],
          pitfalls: [
            "Att pressa upphandlaren att skynda förbi avtalsspärren",
            "Att inte avsätta tid för granskning av kravformuleringar",
            "Att sakna plan B om upphandlingen försenas genom överprövning",
            "Att formulera otydliga krav som öppnar för olika tolkningar",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare är du ansvarig för att hantera avtalsspärren korrekt och att tilldelningsbeslutet är tillräckligt motiverat för att stå sig vid en eventuell överprövning. Du behöver också kunna hantera processen vid en faktisk överprövning.",
          keyActions: [
            "Beräkna och kommunicera avtalsspärren korrekt",
            "Formulera tydliga och detaljerade tilldelningsbeslut med motivering",
            "Bevaka om överprövningsansökan lämnas in under avtalsspärren",
            "Samordna organisationens svar vid en eventuell domstolsprocess",
          ],
          pitfalls: [
            "Att beräkna avtalsspärrens längd fel",
            "Att skriva ett otillräckligt motiverat tilldelningsbeslut",
            "Att teckna avtal innan spärrtiden formellt löpt ut",
            "Att inte dokumentera utvärderingsprocessen tillräckligt för att kunna försvara den i domstol",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare påverkas du av förseningar vid överprövning, särskilt om det befintliga systemet har avtalsproblem eller teknisk skuld. Du behöver planera för scenariot att upphandlingen försenas och ha en strategi för övergångsperioden.",
          keyActions: [
            "Bidra till att tekniska krav formuleras otvetydigt för att undvika överprövningsgrund",
            "Planera teknisk övergångsstrategi om upphandlingen försenas",
            "Säkerställa att det befintliga systemet kan förlängas vid behov",
            "Dokumentera tekniska bedömningar i utvärderingen noggrant",
          ],
          pitfalls: [
            "Att inte ha en plan för förlängt användande av befintligt system vid försening",
            "Att formulera tekniska krav som lämnar utrymme för tolkning",
            "Att anta att överprövning aldrig sker och inte planera för det",
            "Att ha låtit avtal med befintlig leverantör löpa ut innan ny upphandling avslutats",
          ],
        },
      ],
      reflection: {
        question:
          "Vilka åtgärder kan du vidta redan i behovsfasen för att minska risken för överprövning?",
      },
      quiz: {
        questions: [
          {
            id: "q7-1",
            question: "Hur lång är avtalsspärren vid öppen upphandling?",
            options: [
              { id: "a", text: "5 dagar", isCorrect: false },
              { id: "b", text: "10 dagar", isCorrect: false },
              { id: "c", text: "Minst 15 dagar", isCorrect: true },
              { id: "d", text: "30 dagar", isCorrect: false },
            ],
            explanation:
              "Vid öppen eller selektiv upphandling är avtalsspärren minst 15 dagar. Vid förenklad upphandling är den minst 10 dagar.",
          },
          {
            id: "q7-2",
            question: "Var ansöker en leverantör om överprövning av en upphandling?",
            options: [
              { id: "a", text: "Hos Konkurrensverket", isCorrect: false },
              { id: "b", text: "Hos den upphandlande myndigheten", isCorrect: false },
              { id: "c", text: "Hos förvaltningsrätten", isCorrect: true },
              { id: "d", text: "Hos Upphandlingsmyndigheten", isCorrect: false },
            ],
            explanation:
              "Överprövning av upphandlingar görs genom ansökan till förvaltningsrätten, inte till den upphandlande myndigheten eller andra tillsynsorgan.",
          },
          {
            id: "q7-3",
            question: "Vilken är den vanligaste orsaken till överprövning?",
            options: [
              { id: "a", text: "Att priset är för högt", isCorrect: false },
              {
                id: "b",
                text: "Otydliga eller oproportionerliga krav och bristande motivering",
                isCorrect: true,
              },
              { id: "c", text: "Att för få anbud kom in", isCorrect: false },
              { id: "d", text: "Att upphandlingen tog för lång tid", isCorrect: false },
            ],
            explanation:
              "De vanligaste grunderna för överprövning är otydliga eller oproportionerliga krav, bristande motivering i tilldelningsbeslutet, och att utvärderingen inte följt de angivna kriterierna.",
          },
          {
            id: "q7-4",
            question: "Vad är det bästa sättet att förebygga överprövning?",
            options: [
              { id: "a", text: "Ha så få krav som möjligt", isCorrect: false },
              { id: "b", text: "Använda bara lägsta pris som tilldelningsgrund", isCorrect: false },
              {
                id: "c",
                text: "Tydliga krav, väl motiverade beslut och full transparens genom hela processen",
                isCorrect: true,
              },
              { id: "d", text: "Undvika öppet förfarande", isCorrect: false },
            ],
            explanation:
              "Det bästa sättet att förebygga överprövning är noggrannhet i förberedelsearbetet: tydliga och proportionerliga krav, fullständig dokumentation och transparenta, motiverade beslut.",
          },
          {
            id: "q7-5",
            question:
              "Vad händer om en leverantör ansöker om överprövning under avtalsspärren?",
            options: [
              { id: "a", text: "Avtalsspärren upphävs automatiskt", isCorrect: false },
              { id: "b", text: "Ingenting — avtal kan tecknas ändå efter spärrtiden", isCorrect: false },
              {
                id: "c",
                text: "En förlängd spärr gäller — avtal kan inte tecknas förrän domstolen beslutat",
                isCorrect: true,
              },
              { id: "d", text: "Upphandlingen avbryts automatiskt", isCorrect: false },
            ],
            explanation:
              "Om en ansökan om överprövning lämnas in under avtalsspärren gäller en förlängd spärr. Avtal får inte tecknas förrän förvaltningsrätten meddelat sitt beslut.",
          },
        ],
        passingScore: 3,
      },
    },

    /* ================================================================== */
    /*  Modul 8 — Uppföljning och avtalshantering                         */
    /* ================================================================== */
    {
      id: "upphandling-lou-8",
      title: "Uppföljning och avtalshantering",
      theory: {
        content: [
          "Uppföljning av avtal är lika viktigt som själva upphandlingen, men får ofta för lite uppmärksamhet. Syftet är att säkerställa att leverantören levererar enligt avtalet och att identifiera avvikelser tidigt.",
          "En bra uppföljningsplan innehåller definierade nyckeltal (KPI:er), regelbundna uppföljningsmöten, eskaleringsrutiner vid avvikelser och en tydlig ansvarsfördelning.",
          "Vid avtalsperiodens slut behöver man planera för antingen förlängning, ny upphandling eller avveckling. Avvecklingsplanen bör innehålla datamigrering, kunskapsöverföring och en tidsplan för övergången.",
        ],
        keyPoints: [
          "Avtalsuppföljning kräver definierade KPI:er och regelbundna möten",
          "Verksamheten måste vara aktiv i att bedöma leveransens kvalitet",
          "Planera för avtalets slut i god tid",
          "Datamigrering och kunskapsöverföring är kritiska vid systembyte",
        ],
      },
      scenario: {
        id: "scenario-8-1",
        title: "Avtalsuppföljning i praktiken",
        context:
          "Er kommun tecknade för ett år sedan avtal med en leverantör av ett ärendehanteringssystem. Ni har nu fått signaler från verksamheten om att systemet inte fungerar som utlovat — svarstiderna är långsammare än specificerat och flera utlovade funktioner saknas.",
        steps: [
          {
            situation:
              "Verksamhetschefen ringer dig och säger: 'Systemet är för långsamt och det saknas funktioner. Vi borde byta leverantör direkt.'",
            question: "Hur hanterar du situationen?",
            choices: [
              {
                id: "1a",
                text: "Jag håller med och påbörjar en ny upphandling omedelbart.",
                isOptimal: false,
                feedback:
                  "Att byta leverantör utan att först utnyttja avtalets uppföljningsmekanismer är inte rätt väg. Dessutom tar en ny upphandling lång tid. Kontrollera först vad avtalet säger om leveransnivåer och eskalering.",
              },
              {
                id: "1b",
                text: "Jag granskar avtalet för att se vilka leveransnivåer (SLA) som är avtalade och vilka åtgärder som kan vidtas vid avvikelser.",
                isOptimal: true,
                feedback:
                  "Korrekt. Första steget är att granska avtalade KPI:er och SLA:er, dokumentera avvikelserna och sedan följa avtalets eskaleringsrutiner. Avtalet bör innehålla mekanismer för att hantera bristande leverans.",
              },
              {
                id: "1c",
                text: "Jag kontaktar leverantören informellt och ber dem 'fixa det'.",
                isOptimal: false,
                feedback:
                  "Informella kontakter dokumenteras inte och ger inget formellt stöd om leverantören inte åtgärdar problemen. Använd avtalets formella mekanismer för avvikelsehantering.",
              },
            ],
          },
          {
            situation:
              "Du har granskat avtalet och konstaterat att leverantören bryter mot avtalade SLA:er för svarstider. Avtalet har en eskaleringsmodell med tre nivåer. Ni har nu dokumenterat avvikelserna och kallat till ett eskaleringsmöte.",
            question: "Vad är viktigast att förbereda inför mötet?",
            choices: [
              {
                id: "2a",
                text: "En lista med alla saker vi är missnöjda med, inklusive sådant som inte regleras i avtalet.",
                isOptimal: false,
                feedback:
                  "Fokusera på avtalade krav och mätbara avvikelser. Att blanda in saker utanför avtalet försvagar er position och gör diskussionen otydlig.",
              },
              {
                id: "2b",
                text: "Dokumentation av de specifika avvikelserna med mätdata som visar att SLA:erna inte uppfylls, samt en tydlig kravlista på åtgärder med tidsfrister.",
                isOptimal: true,
                feedback:
                  "Exakt rätt. Med konkret dokumentation och mätbara avvikelser från avtalade nivåer har ni en stark position. Tydliga åtgärdskrav med tidsfrister gör det möjligt att följa upp att problemen löses.",
              },
              {
                id: "2c",
                text: "Ett hot om att avbryta avtalet om problemen inte löses.",
                isOptimal: false,
                feedback:
                  "Hot bör undvikas som förstahandsåtgärd. Börja med saklig dokumentation och eskalera stegvis enligt avtalets modell. Avtalsuppsägning är en sista utväg som kräver noggrann juridisk analys.",
              },
            ],
          },
          {
            situation:
              "Avtalet löper ut om 18 månader. Verksamheten använder systemet dagligen och har byggt upp en stor mängd ärenden och historik i systemet. Ni behöver börja planera.",
            question: "Vad är det viktigaste att tänka på redan nu?",
            choices: [
              {
                id: "3a",
                text: "Vi väntar tills 6 månader före avtalets slut med att planera — 18 månader är lång tid.",
                isOptimal: false,
                feedback:
                  "18 månader är inte lång tid om man behöver genomföra en ny upphandling (som kan ta 6–12 månader), planera datamigration och genomföra en implementering. Planeringsarbetet bör starta omedelbart.",
              },
              {
                id: "3b",
                text: "Vi börjar omedelbart med att planera för ny upphandling eller förlängning, inklusive strategi för datamigrering och kunskapsöverföring.",
                isOptimal: true,
                feedback:
                  "Rätt. Med 18 månader kvar behöver ni starta planeringen nu. En ny upphandling tar tid, och datamigration och kunskapsöverföring måste planeras noggrant. Utvärdera också om avtalet kan förlängas.",
              },
              {
                id: "3c",
                text: "Vi förhandlar med befintlig leverantör om en förlängning utan ny upphandling.",
                isOptimal: false,
                feedback:
                  "Om avtalet tillåter förlängning kan det vara ett alternativ, men det kräver att förlängningsoptionen finns i det befintliga avtalet. Att förlänga utöver avtalade optioner utan ny upphandling bryter mot LOU.",
              },
            ],
          },
        ],
        roleRelevance: ["BESTALLARE", "SYSTEMAGARE", "UPPHANDLARE"],
      },
      roleDeepDives: [
        {
          role: "BESTALLARE",
          perspective:
            "Som beställare äger du verksamhetsrelationen med leverantören. Du ansvarar för att bedöma om leveransen motsvarar de förväntade effektmålen och att verksamhetens behov tillgodoses under hela avtalstiden.",
          keyActions: [
            "Definiera och följa upp effektmål och nyttorealisering under avtalsperioden",
            "Genomföra regelbundna användarundersökningar för att bedöma leveransens kvalitet",
            "Rapportera avvikelser och delta i eskaleringsprocessen vid bristande leverans",
            "Planera för avtalets slut — behöver behovsanalysen uppdateras för nästa upphandling?",
          ],
          pitfalls: [
            "Att delegera all uppföljning till IT-avdelningen utan verksamhetsperspektiv",
            "Att inte dokumentera avvikelser löpande, vilket försvagar positionen vid eskalering",
            "Att vänta för länge med att planera för ny upphandling eller avtalets slut",
            "Att acceptera en successiv försämring av leveransen utan att agera",
          ],
        },
        {
          role: "UPPHANDLARE",
          perspective:
            "Som upphandlare ansvarar du för att avtalet innehåller rätt uppföljningsmekanismer redan vid kontraktsskrivning. Under avtalsperioden stödjer du verksamheten i formell avvikelsehantering och planerar för eventuell ny upphandling.",
          keyActions: [
            "Säkerställa att avtalet innehåller tydliga SLA:er, KPI:er och eskaleringsrutiner",
            "Stödja verksamheten vid formell avvikelsehantering enligt avtalet",
            "Bevaka avtalstider och förlängningsoptioner",
            "Planera och initiera ny upphandlingsprocess i god tid före avtalets slut",
          ],
          pitfalls: [
            "Att skriva avtal utan mätbara uppföljningskriterier",
            "Att inte bevaka avtalstider och missa förlängningsdeadlines",
            "Att påbörja ny upphandling för sent, vilket tvingar fram förlängningar utanför avtalet",
            "Att godkänna ändringar i avtalet som väsentligt ändrar upphandlingens förutsättningar",
          ],
        },
        {
          role: "SYSTEMAGARE",
          perspective:
            "Som systemägare ansvarar du för den tekniska uppföljningen av systemet under hela dess livscykel. Du övervakar prestanda, säkerhet och drift, och planerar den tekniska strategin för systemets avveckling eller ersättning.",
          keyActions: [
            "Övervaka systemets tekniska prestanda mot avtalade SLA:er",
            "Genomföra regelbundna tekniska granskningar av säkerhet och drift",
            "Planera teknisk avvecklingsstrategi inklusive datamigration och kunskapsöverföring",
            "Dokumentera systemets beroenden och integrationer för att underlätta framtida byte",
          ],
          pitfalls: [
            "Att inte övervaka systemets prestanda kontinuerligt och missa försämringar",
            "Att sakna plan för datamigration vid systembyte",
            "Att inte dokumentera systemets tekniska arkitektur och integrationer",
            "Att bygga in alltför starka beroenden till en specifik leverantörs plattform utan exit-strategi",
          ],
        },
      ],
      reflection: {
        question:
          "Hur ser uppföljningen ut i din organisation idag — finns det en strukturerad process eller sker det ad hoc?",
      },
      quiz: {
        questions: [
          {
            id: "q8-1",
            question: "Vad bör en bra uppföljningsplan innehålla?",
            options: [
              { id: "a", text: "Bara kontaktuppgifter till leverantören", isCorrect: false },
              {
                id: "b",
                text: "Definierade KPI:er, regelbundna möten, eskaleringsrutiner och ansvarsfördelning",
                isCorrect: true,
              },
              { id: "c", text: "Bara ekonomisk uppföljning av fakturor", isCorrect: false },
              { id: "d", text: "En plan för leverantörsbyte", isCorrect: false },
            ],
            explanation:
              "En komplett uppföljningsplan innehåller mätbara nyckeltal (KPI:er), schema för regelbundna uppföljningsmöten, tydliga eskaleringsrutiner vid avvikelser och en klar ansvarsfördelning.",
          },
          {
            id: "q8-2",
            question:
              "Leverantören levererar inte enligt avtalad SLA. Vilket är det bästa första steget?",
            options: [
              { id: "a", text: "Avbryta avtalet omedelbart", isCorrect: false },
              { id: "b", text: "Starta en ny upphandling direkt", isCorrect: false },
              {
                id: "c",
                text: "Dokumentera avvikelserna och följa avtalets eskaleringsmodell",
                isCorrect: true,
              },
              { id: "d", text: "Kontakta leverantörens VD informellt", isCorrect: false },
            ],
            explanation:
              "Vid bristande leverans ska avvikelserna dokumenteras och avtalets formella eskaleringsmodell följas. Detta ger en stark position och en strukturerad väg att lösa problemen.",
          },
          {
            id: "q8-3",
            question:
              "Hur tidigt bör man börja planera för avtalets slut om avtalsperioden har 18 månader kvar?",
            options: [
              { id: "a", text: "6 månader före", isCorrect: false },
              { id: "b", text: "3 månader före", isCorrect: false },
              { id: "c", text: "Omedelbart — 18 månader är knappt med tid", isCorrect: true },
              { id: "d", text: "Det behövs ingen planering — förläng bara avtalet", isCorrect: false },
            ],
            explanation:
              "En ny upphandling kan ta 6–12 månader. Därtill kommer tid för implementering, datamigration och kunskapsöverföring. Med 18 månader kvar bör planeringen starta omedelbart.",
          },
          {
            id: "q8-4",
            question: "Vilka kritiska aktiviteter krävs vid systembyte?",
            options: [
              { id: "a", text: "Bara installation av det nya systemet", isCorrect: false },
              {
                id: "b",
                text: "Datamigrering, kunskapsöverföring och en tidsplan för övergången",
                isCorrect: true,
              },
              { id: "c", text: "Bara utbildning av personalen", isCorrect: false },
              { id: "d", text: "Bara avinstallation av det gamla systemet", isCorrect: false },
            ],
            explanation:
              "Vid systembyte krävs noggrann planering av datamigrering (att flytta data från det gamla till det nya systemet), kunskapsöverföring och en detaljerad tidsplan för hela övergången.",
          },
          {
            id: "q8-5",
            question:
              "Kan ett offentligt avtal förlängas utan ny upphandling?",
            options: [
              { id: "a", text: "Ja, det är alltid tillåtet om båda parter är överens", isCorrect: false },
              {
                id: "b",
                text: "Ja, men bara om förlängningsoptionen finns i det ursprungliga avtalet",
                isCorrect: true,
              },
              { id: "c", text: "Nej, det krävs alltid en ny upphandling", isCorrect: false },
              { id: "d", text: "Ja, om beloppet inte överstiger tröskelvärdet", isCorrect: false },
            ],
            explanation:
              "Ett avtal kan förlängas om förlängningsoptionen fanns med i det ursprungliga avtalet och var inkluderad i upphandlingens beräknade kontraktsvärde. Att förlänga utöver avtalade optioner utan ny upphandling strider mot LOU.",
          },
        ],
        passingScore: 3,
      },
    },
  ],
};
