import type { KBDomain, KBResonemang } from "./types";

/* ================================================================== */
/*  5 Knowledge Domains                                                */
/* ================================================================== */

export const domains: KBDomain[] = [
  {
    slug: "styrning-beslutsformaga",
    title: "Styrning & beslutsförmåga",
    description: "Hur fattar vi beslut om IT-system i komplexa organisationer? Vad händer när mandat, kunskap och ansvar inte sitter på samma ställe?",
    icon: "target",
    content: "Styrning i offentlig sektor handlar sällan om att det saknas regler – utan om att det finns för många, eller att de pekar åt olika håll. Beslutsförmåga kräver inte bara mandat, utan också mod att avgränsa och prioritera. I upphandlingssammanhang innebär detta att någon måste våga säga vad systemet inte ska göra – och varför det valet är medvetet.",
    order: 1,
  },
  {
    slug: "medveten-ofullstandighet",
    title: "Medveten ofullständighet",
    description: "Varför det ibland är klokare att inte specificera allt. Om konsten att lämna utrymme för det vi ännu inte vet.",
    icon: "unlock",
    content: "Den vanligaste fällan i IT-upphandling är övertron på att allt kan specificeras i förväg. Medveten ofullständighet handlar om att erkänna att vissa saker bara kan avgöras under resans gång – och att bygga upphandlingen så att det är möjligt att lära sig och anpassa sig utan att bryta mot reglerna.",
    order: 2,
  },
  {
    slug: "kvalitet-bortom-funktion",
    title: "Kvalitet bortom funktion",
    description: "Vad gör ett IT-system bra – utöver att det uppfyller kraven? Om användarupplevelse, underhållbarhet och långsiktig hållbarhet.",
    icon: "sparkles",
    content: "Kvalitet i IT-system handlar inte bara om att funktioner fungerar, utan om hur de fungerar. Användarupplevelse, underhållbarhet, tillgänglighet och långsiktig hållbarhet är kvaliteter som sällan fångas i traditionella kravspecifikationer – men som avgör om systemet faktiskt skapar värde över tid.",
    order: 3,
  },
  {
    slug: "risk-ansvar-konsekvens",
    title: "Risk, ansvar & konsekvens",
    description: "Vem bär risken? Vad händer om det går fel? Om att fördela ansvar på ett sätt som faktiskt fungerar.",
    icon: "scale",
    content: "I upphandling av IT-system fördelas risker ofta genom juridiska formuleringar. Men den verkliga riskhanteringen sker i hur krav ställs, hur avtal utformas och hur relationen mellan beställare och leverantör ser ut. Att medvetet hantera risk innebär att förstå vad som faktiskt står på spel – och för vem.",
    order: 4,
  },
  {
    slug: "marknad-dialog-forstaelse",
    title: "Marknad, dialog & förståelse",
    description: "Hur skapar vi goda förutsättningar för dialog med marknaden utan att tumma på principerna?",
    icon: "handshake",
    content: "Upphandling av IT-system kräver att beställaren förstår marknaden – och att marknaden förstår beställarens behov. Dialog är inte bara tillåtet utan ofta nödvändigt. Men det kräver kunskap om var gränserna går och mod att ställa öppna frågor utan att ge fördelar.",
    order: 5,
  },
];

/* ================================================================== */
/*  5 Reasoning Articles (Resonemang)                                  */
/* ================================================================== */

export const resonemang: KBResonemang[] = [
  {
    slug: "beslutsfattande-under-osakerhet",
    title: "Beslutsfattande under osäkerhet",
    domainSlug: "styrning-beslutsformaga",
    summary: "Hur fattar vi kloka beslut när vi inte har all information? Om konsten att vara trygg i otrygghet.",
    content: {
      inramning: "De flesta IT-upphandlingar kräver att beslut fattas långt innan alla konsekvenser är kända. Det skapar en paradox: den som ska besluta vill ha underlag, men det bästa underlaget skapas genom att börja – inte genom att vänta.",
      karnfragan: "Vad står på spel? Inte om vi har rätt svar, utan om vi har ställt rätt frågor. Att fatta beslut under osäkerhet handlar om att skilja på det som behöver låsas nu och det som kan vänta.",
      spanningsfalt: "Å ena sidan finns behovet av kontroll och förutsägbarhet – organisationen vill veta vad den köper. Å andra sidan finns insikten att detaljerade specifikationer ibland skapar en falsk trygghet som hindrar anpassning och lärande.",
      vanliga_felslut: "Att mer information alltid leder till bättre beslut. Att det är möjligt att eliminera all osäkerhet genom bättre kravställning. Att den som fattar beslutet behöver förstå varje detalj.",
      moget_forhallningssatt: "Ett moget förhållningssätt innebär att erkänna att osäkerhet inte är ett tecken på dålig planering utan en naturlig del av komplexa projekt. Det handlar om att bygga strukturer som gör det möjligt att fatta beslut stegvis, med utrymme för korrigering.",
      konsekvenser: "Organisationer som inte accepterar osäkerhet tenderar att överspecificera, vilket leder till rigida system som snabbt blir föråldrade. De som istället bygger in flexibilitet kan anpassa sig och skapa mer värde över tid – men det kräver tillit och transparens.",
      formuleringsstod: [
        "Vi har valt att inte specificera detta i detalj nu, eftersom vi bedömer att vi kommer att ha bättre underlag efter en inledande fas. Vi accepterar den osäkerhet detta innebär.",
        "Detta är en risk vi accepterar. Vi har identifierat den och har en plan för hur vi hanterar den om den realiseras.",
        "Vi väljer att lämna utrymme för dialog med leverantören kring denna fråga, snarare än att låsa oss vid en lösning vi inte har tillräckligt underlag för.",
      ],
      medveten_avgransning: "Detta resonemang ger inga råd om specifika beslutsmodeller eller metoder. Det handlar om förhållningssätt, inte verktyg.",
    },
    relatedSlugs: ["kravspecifikationens-granser", "dialogens-mojligheter"],
  },
  {
    slug: "kravspecifikationens-granser",
    title: "Kravspecifikationens gränser",
    domainSlug: "medveten-ofullstandighet",
    summary: "När kravspecifikationen blir ett hinder istället för ett stöd. Om konsten att veta vad man inte vet.",
    content: {
      inramning: "Kravspecifikationen är upphandlingens centrala dokument – men också dess vanligaste fälla. Ju mer vi försöker specificera, desto mer riskerar vi att låsa oss vid en bild av verkligheten som inte stämmer.",
      karnfragan: "Var går gränsen mellan nödvändig precision och skadlig detaljstyrning? Hur vet vi vilka krav som behöver vara exakta och vilka som bör vara öppna?",
      spanningsfalt: "Juridisk säkerhet kräver tydliga krav – men innovation och anpassning kräver utrymme. Beställaren vill veta vad den får, men leverantören behöver frihet att hitta den bästa lösningen.",
      vanliga_felslut: "Att fler krav ger bättre resultat. Att detaljerade krav minskar risken. Att leverantören alltid tolkar krav på samma sätt som beställaren menade.",
      moget_forhallningssatt: "Att skilja på krav som beskriver vad systemet ska åstadkomma (resultat) och krav som beskriver hur det ska göras (metod). Resultatbaserade krav ger ofta bättre förutsättningar för innovation.",
      konsekvenser: "Överspecificering leder till att leverantörer optimerar för att uppfylla krav snarare än att lösa verkliga problem. Underspecificering leder till tolkningskonflikter. Balansen kräver erfarenhet och mod.",
      formuleringsstod: [
        "Vi har valt att formulera detta som ett funktionellt krav snarare än en teknisk specifikation, för att ge utrymme för lösningar vi ännu inte kan förutse.",
        "Detta behöver vi inte låsa nu – och här är varför: vi bedömer att en iterativ ansats ger bättre resultat än en detaljerad specifikation i detta skede.",
      ],
      medveten_avgransning: "Vi tar inte ställning till specifika kravformuleringar eller juridiska aspekter av kravspecifikationer.",
    },
    relatedSlugs: ["beslutsfattande-under-osakerhet", "dialogens-mojligheter"],
  },
  {
    slug: "anvandarperspektivets-vikt",
    title: "Användarperspektivets vikt",
    domainSlug: "kvalitet-bortom-funktion",
    summary: "Varför systemets användare sällan hörs i upphandlingen – och vad det kostar.",
    content: {
      inramning: "IT-system upphandlas av organisationer men används av människor. Ändå är det sällan slutanvändarna som formulerar kraven. Resultatet blir system som uppfyller specifikationen men som ingen vill använda.",
      karnfragan: "Hur säkerställer vi att upphandlingen leder till system som faktiskt skapar värde för de som ska använda dem – utan att göra processen ohanterlig?",
      spanningsfalt: "Å ena sidan finns effektivitetskravet – upphandlingen måste vara hanterbar och rättsligt korrekt. Å andra sidan finns insikten att ett system som inte används som tänkt aldrig levererar det värde som motiverade investeringen.",
      vanliga_felslut: "Att användarbehov alltid kan fångas genom enkäter eller workshops. Att tekniska experter förstår användarbehoven. Att det räcker att specificera användarvänlighet som ett krav.",
      moget_forhallningssatt: "Att bygga in användarmedverkan som en strukturell del av upphandlingsprocessen, inte som en engångsinsats. Det innebär att skapa utrymme för att testa och utvärdera under projektets gång.",
      konsekvenser: "System som utvecklas utan genuin användarmedverkan tenderar att kräva omfattande anpassningar efter leverans, vilket driver kostnader och förseningar. De riskerar också att skapa frustration och motstånd hos de som ska använda dem.",
      formuleringsstod: [
        "Vi har identifierat behov av att involvera slutanvändare löpande under utvecklingen. Vårt upphandlingsförfarande ska möjliggöra detta.",
        "Vi väljer att prioritera användarupplevelse som ett utvärderingskriterium, med medvetenhet om att det kräver kvalitativa bedömningar.",
      ],
      medveten_avgransning: "Vi ger inga specifika metoder för användarundersökningar eller designprocesser.",
    },
    relatedSlugs: ["kravspecifikationens-granser"],
  },
  {
    slug: "riskfordelning-i-praktiken",
    title: "Riskfördelning i praktiken",
    domainSlug: "risk-ansvar-konsekvens",
    summary: "Varför riskfördelning i avtal sällan speglar verkligheten – och vad man kan göra åt det.",
    content: {
      inramning: "I de flesta IT-upphandlingar fördelas risker genom avtalsklausuler. Men den verkliga riskfördelningen avgörs av hur projektet genomförs, inte av vad som står i avtalet. Risker som läggs på den part som har minst möjlighet att hantera dem tenderar att realiseras.",
      karnfragan: "Hur fördelar vi risker på ett sätt som speglar parternas faktiska förmåga att hantera dem – och som skapar incitament för samarbete snarare än konflikt?",
      spanningsfalt: "Beställaren vill minimera sin risk genom att överföra den till leverantören. Leverantören prisar in den överförda risken, vilket höjer kostnaden. Resultatet blir ett nollsummespel som ingen vinner.",
      vanliga_felslut: "Att den som har mest att förlora ska bära risken. Att risk kan elimineras genom att flytta den till en annan part. Att vitesklausuler löser problemet.",
      moget_forhallningssatt: "Att se riskfördelning som en gemensam process där båda parter identifierar risker, bedömer vem som bäst kan hantera dem och skapar incitament för proaktiv riskhantering.",
      konsekvenser: "Obalanserad riskfördelning leder till att leverantörer agerar defensivt, undviker innovation och fokuserar på formell compliance snarare än på att lösa verkliga problem.",
      formuleringsstod: [
        "Vi har valt en riskfördelningsmodell som bygger på principen att den part som bäst kan påverka risken också bör bära den.",
        "Detta är en risk vi accepterar. Vi har bedömt att kostnaden för att eliminera den överstiger den förväntade konsekvensen.",
      ],
      medveten_avgransning: "Vi ger inga juridiska råd om avtalsskrivning eller specifika riskklausuler.",
    },
    relatedSlugs: ["beslutsfattande-under-osakerhet"],
  },
  {
    slug: "dialogens-mojligheter",
    title: "Dialogens möjligheter",
    domainSlug: "marknad-dialog-forstaelse",
    summary: "Hur marknadsdialoger kan stärka upphandlingen – om de görs med öppenhet och tydlighet.",
    content: {
      inramning: "Många upphandlare undviker marknadsdialoger av rädsla för att bryta mot LOU. Men lagen uppmuntrar faktiskt dialog – det avgörande är hur den genomförs. Transparens och likabehandling är nycklarna.",
      karnfragan: "Hur skapar vi en dialog som ger oss bättre underlag utan att ge enskilda leverantörer otillbörliga fördelar?",
      spanningsfalt: "Å ena sidan finns behovet av information från marknaden för att ställa relevanta krav. Å andra sidan finns risken att dialog uppfattas som partisk eller att information läcker. Balansen kräver både struktur och mod.",
      vanliga_felslut: "Att all kontakt med leverantörer före upphandling är problematisk. Att marknadsdialog automatiskt leder till jäv. Att det är säkrare att inte prata med marknaden alls.",
      moget_forhallningssatt: "Att se marknadsdialoger som ett verktyg för bättre upphandlingar och genomföra dem med tydliga ramar, dokumentation och öppenhet. Alla intresserade leverantörer ska bjudas in på lika villkor.",
      konsekvenser: "Upphandlingar utan marknadsdialog riskerar att ställa irrelevanta krav, missa innovativa lösningar och skapa onödiga hinder för leverantörer. Dialog minskar ofta både risk och kostnad.",
      formuleringsstod: [
        "Vi har genomfört en marknadsdialog som en del av förberedelserna. Resultaten har publicerats öppet och legat till grund för hur vi formulerat våra krav.",
        "Vi väljer att formulera denna del som en öppen fråga i upphandlingen, baserat på insikter från vår marknadsdialog.",
      ],
      medveten_avgransning: "Vi ger inga juridiska tolkningar av LOU eller specifika råd om upphandlingsförfaranden.",
    },
    relatedSlugs: ["kravspecifikationens-granser", "riskfordelning-i-praktiken"],
  },
];

/* ================================================================== */
/*  Helper functions                                                   */
/* ================================================================== */

export function getDomainBySlug(slug: string): KBDomain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function getResonemangBySlug(slug: string): KBResonemang | undefined {
  return resonemang.find((r) => r.slug === slug);
}

export function getResonemangByDomain(domainSlug: string): KBResonemang[] {
  return resonemang.filter((r) => r.domainSlug === domainSlug);
}

/** Build the knowledge base text for the AI system prompt */
export function buildKnowledgeBaseText(): string {
  let kb = "\n\n---\n# KUNSKAPSBANKENS INNEHÅLL\n\n";

  kb += "## Domäner\n\n";
  for (const d of domains) {
    kb += `### ${d.title}\n${d.description}\n${d.content}\n\n`;
  }

  kb += "## Resonemang\n\n";
  for (const r of resonemang) {
    kb += `### ${r.title}\n**Sammanfattning:** ${r.summary}\n`;
    kb += `**Inramning:** ${r.content.inramning}\n`;
    kb += `**Kärnfrågan:** ${r.content.karnfragan}\n`;
    kb += `**Spänningsfält:** ${r.content.spanningsfalt}\n`;
    kb += `**Vanliga felslut:** ${r.content.vanliga_felslut}\n`;
    kb += `**Moget förhållningssätt:** ${r.content.moget_forhallningssatt}\n`;
    kb += `**Konsekvenser:** ${r.content.konsekvenser}\n`;
    kb += `**Formuleringsstöd:**\n`;
    for (const f of r.content.formuleringsstod) {
      kb += `- "${f}"\n`;
    }
    kb += `**Medveten avgränsning:** ${r.content.medveten_avgransning}\n\n`;
  }

  return kb;
}
