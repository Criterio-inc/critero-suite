import type { EnhancedCourse } from "./types";

export const forandringsledningAdkar: EnhancedCourse = {
  id: "forandringsledning-adkar",
  title: "Förändringsledning ADKAR",
  icon: "repeat",
  description:
    "Prosci ADKAR-modellen steg för steg — Awareness, Desire, Knowledge, Ability, Reinforcement — med praktiska verktyg.",
  level: "Grundläggande",
  estimatedMinutes: 50,
  tags: ["ADKAR", "Förändring", "Prosci"],
  modules: [
    {
      id: "forandringsledning-adkar-1",
      title: "Varför förändringsledning?",
      theory: {
        content: [
          "Studier visar att projekt med effektiv förändringsledning har betydligt högre sannolikhet att nå sina mål. Ändå är förändringsledning det som oftast glöms bort när nya system upphandlas och implementeras.",
          "Motstånd mot förändring är naturligt. Människor motsätter sig inte förändring i sig — de motsätter sig att bli förändrade. När ett nytt system införs påverkas arbetsrutiner, roller och kompetensbehov.",
          "Förändringsledning handlar om att förbereda, utrusta och stödja enskilda individer att framgångsrikt genomföra förändringen. Det är en avgörande framgångsfaktor som bör planeras och budgeteras från start.",
        ],
        keyPoints: [
          "Projekt med förändringsledning lyckas betydligt oftare",
          "Motstånd mot förändring är naturligt och måste hanteras proaktivt",
          "Förändringsledning är en kritisk framgångsfaktor, inte en mjuk fråga",
          "Bör planeras och budgeteras från projektstart",
        ],
      },
      reflection: {
        question:
          "Tänk på en förändring du upplevt — vad hade du behövt för att ta emot den bättre?",
      },
    },
    {
      id: "forandringsledning-adkar-2",
      title: "ADKAR-modellen — översikt",
      theory: {
        content: [
          "ADKAR är en modell utvecklad av Prosci som beskriver de fem byggstenar varje individ måste passera för att en förändring ska lyckas: Awareness, Desire, Knowledge, Ability och Reinforcement.",
          "Modellens styrka är att den fokuserar på individens resa. En organisation förändras nämligen inte — det är individerna som förändras, en i taget. Genom att förstå var varje person befinner sig kan du rikta rätt insats vid rätt tidpunkt.",
          "ADKAR är sekvensiell: du måste bygga varje steg i ordning. Det går inte att ge kunskap (K) om mottagaren inte förstår varför förändringen behövs (A) och har vilja att delta (D). Att identifiera var blockeringen sitter är nyckeln.",
        ],
        keyPoints: [
          "ADKAR: Awareness, Desire, Knowledge, Ability, Reinforcement",
          "Fokuserar på individens resa, inte organisationens",
          "Sekvensiell: varje steg måste byggas i ordning",
          "Identifiera var blockeringen sitter för rätt insats",
        ],
      },
      reflection: {
        question:
          "Om du tänker på en pågående förändring — var i ADKAR-trappan sitter de flesta medarbetarna?",
      },
    },
    {
      id: "forandringsledning-adkar-3",
      title: "Awareness — skapa medvetenhet",
      theory: {
        content: [
          "Awareness handlar om att individen förstår VARFÖR förändringen behövs. Utan medvetenhet om behovet kommer medarbetare att ifrågasätta projektet och aktivt motarbeta implementeringen.",
          "Effektiv kommunikation besvarar tre nyckelfrågor: Vad är det för förändring? Varför gör vi den nu? Vad är risken med att INTE förändra? Var ärlig och transparent.",
          "Den viktigaste budbäraren är den närmaste chefen, inte projektledaren eller VD. Forskning visar att medarbetare litar mest på sin närmaste chef när det gäller hur förändringen påverkar just dem.",
        ],
        keyPoints: [
          "Awareness = förståelse för VARFÖR förändringen behövs",
          "Besvara: vad, varför nu, och vad händer om vi inte gör det?",
          "Närmaste chefen är den viktigaste budbäraren",
          "Var ärlig — överdrivna löften underminerar förtroendet",
        ],
      },
      reflection: {
        question:
          "Hur brukar förändringar kommuniceras i din organisation — vet medarbetarna VARFÖR, eller bara VAD?",
      },
    },
    {
      id: "forandringsledning-adkar-4",
      title: "Desire — bygga vilja",
      theory: {
        content: [
          "Desire är steget där individen går från att förstå behovet till att vilja delta. Det är det svåraste steget eftersom vilja inte kan tvingas fram — den måste byggas genom förtroende och delaktighet.",
          "För att bygga Desire behöver du förstå vad som motiverar olika grupper. För användare kan det vara enklare arbetsvardag. För chefer kan det vara bättre uppföljning. Anpassa budskapet.",
          "Delaktighet är den starkaste drivkraften. Människor som får påverka förändringen är mer benägna att stödja den. Involvera medarbetare i behovsanalysen och ge dem inflytande över implementeringsplanen.",
        ],
        keyPoints: [
          "Desire = personlig vilja att delta i förändringen",
          "Vilja kan inte tvingas — den byggs genom delaktighet och förtroende",
          "Anpassa budskapet efter vad som motiverar varje grupp",
          "Involvering är den starkaste drivkraften",
        ],
      },
      reflection: {
        question:
          "När kände du senast starkt motstånd mot en förändring — vad hade kunnat öka din vilja att delta?",
      },
    },
    {
      id: "forandringsledning-adkar-5",
      title: "Knowledge — förmedla kunskap",
      theory: {
        content: [
          "Knowledge handlar om att ge individen de kunskaper som behövs för att genomföra förändringen. Det inkluderar både kunskapen om HUR man gör och kunskapen om när och var man får hjälp.",
          "Utbildning är det vanligaste verktyget, men timing är avgörande. Utbildning som ges för tidigt glöms bort, utbildning som ges för sent skapar stress. Planera utbildningen så nära användning som möjligt.",
          "Erbjud flera format: klassrumsutbildning, e-lärande, lärande-genom-att-göra. Komplettera med stödmaterial: korta guider, FAQ och en tydlig supportkanal.",
        ],
        keyPoints: [
          "Knowledge = kunskap om HUR förändringen genomförs i praktiken",
          "Timing: utbildning så nära användning som möjligt",
          "Erbjud flera utbildningsformat för olika lärstilar",
          "Stödmaterial är lika viktigt som själva utbildningen",
        ],
      },
      reflection: {
        question:
          "Tänk på senaste systembytet — fick du tillräckligt med utbildning och stöd, och kom det vid rätt tidpunkt?",
      },
    },
    {
      id: "forandringsledning-adkar-6",
      title: "Ability — utveckla förmåga",
      theory: {
        content: [
          "Ability är skillnaden mellan att veta hur man gör något och att faktiskt kunna göra det. Att ha gått en utbildning innebär inte att man behärskar det nya arbetssättet — det kräver övning och stöd.",
          "För att bygga Ability behövs övningstillfällen i säker miljö, coaching från superanvändare, och acceptans för att det tar tid. Produktiviteten sjunker alltid tillfälligt vid ett systembyte — planera för det.",
          "Superanvändare är nyckelpersoner för Ability. De får extra utbildning och fungerar som lokalt stöd. Att ha en superanvändare i varje team sänker tröskeln för att fråga om hjälp och snabbar på övergången.",
        ],
        keyPoints: [
          "Ability = att kunna göra det i praktiken, inte bara förstå teorin",
          "Kräver: övning, coaching, testmiljö och tid",
          "Produktivitetsdipp är normal — planera och kommunicera",
          "Superanvändare i varje team accelererar övergången",
        ],
      },
      reflection: {
        question:
          "Hur lång tid tog det för dig att känna dig bekväm med det senaste nya systemet du började använda?",
      },
    },
    {
      id: "forandringsledning-adkar-7",
      title: "Reinforcement — förankra förändringen",
      theory: {
        content: [
          "Reinforcement är det sista och ofta mest försummade steget. Det handlar om att säkerställa att förändringen håller över tid och att människor inte faller tillbaka till gamla arbetssätt.",
          "Verktyg för Reinforcement: fira framgångar, mät och visa resultat (före/efter-jämförelser), ge återkoppling, och hantera avvikelser snabbt och konstruktivt.",
          "Reinforcement bör pågå i minst sex månader efter go-live. Ledningen måste visa att det nya arbetssättet gäller, att stöd finns och att man lyssnar på problemen. Här går förändringen från projekt till ny vardag.",
        ],
        keyPoints: [
          "Reinforcement = säkerställa att förändringen håller över tid",
          "Fira framgångar, visa resultat, ge återkoppling",
          "Minst sex månader aktiv förankring efter go-live",
          "Ledningens engagemang är avgörande för långsiktig framgång",
        ],
      },
      reflection: {
        question:
          "Hur brukar förändringar förankras i din organisation efter go-live — finns det en plan eller tappar man fokus?",
      },
    },
  ],
};
