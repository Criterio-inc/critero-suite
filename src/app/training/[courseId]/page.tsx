"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Module {
  title: string;
  content: string[];
  keyPoints: string[];
  reflectionQuestion: string;
}

interface CourseData {
  title: string;
  icon: string;
  description: string;
  level: string;
  estimatedMinutes: number;
  modules: Module[];
}

/* ------------------------------------------------------------------ */
/*  Course 1 — Upphandling & LOU (8 modules)                          */
/* ------------------------------------------------------------------ */

const upphandlingLou: CourseData = {
  title: "Upphandling & LOU",
  icon: "scale",
  description:
    "Grunderna i Lagen om offentlig upphandling \u2014 tr\u00f6skelv\u00e4rden, f\u00f6rfaranden, annonsering, utv\u00e4rdering och tilldelning.",
  level: "Grundl\u00e4ggande",
  estimatedMinutes: 45,
  modules: [
    {
      title: "Vad \u00e4r offentlig upphandling?",
      content: [
        "Offentlig upphandling \u00e4r den process genom vilken offentliga organisationer \u2014 kommuner, regioner, statliga myndigheter och offentligt styrda bolag \u2014 k\u00f6per varor, tj\u00e4nster och byggentreprenader. Syftet \u00e4r att s\u00e4kerst\u00e4lla att skattemedel anv\u00e4nds effektivt och att alla leverant\u00f6rer f\u00e5r en r\u00e4ttvis m\u00f6jlighet att konkurrera om offentliga kontrakt.",
        "I Sverige regleras offentlig upphandling fr\u00e4mst genom Lagen om offentlig upphandling (LOU, SFS 2016:1145), som bygger p\u00e5 EU:s upphandlingsdirektiv. LOU g\u00e4ller f\u00f6r alla ink\u00f6p som g\u00f6rs av upphandlande myndigheter och enheter, oavsett om det r\u00f6r sig om pennor, IT-system eller miljardinvesteringar i infrastruktur.",
        "Upphandlingsreglerna finns till f\u00f6r att skydda b\u00e5de det offentliga intresset och leverant\u00f6rernas r\u00e4ttigheter. Genom att f\u00f6lja en strukturerad process med tydliga regler minskar risken f\u00f6r korruption, v\u00e4nskapskorruption och sl\u00f6seri med offentliga medel. Samtidigt ger det leverant\u00f6rer f\u00f6rutsebarhet och m\u00f6jlighet att planera sina anbud.",
      ],
      keyPoints: [
        "Offentlig upphandling styrs av LOU (SFS 2016:1145) som bygger p\u00e5 EU-direktiv",
        "Alla offentliga organisationer m\u00e5ste f\u00f6lja upphandlingsreglerna",
        "Syftet \u00e4r effektivt anv\u00e4ndande av skattemedel och r\u00e4ttvis konkurrens",
        "Reglerna skyddar b\u00e5de det allm\u00e4nna och leverant\u00f6rerna",
      ],
      reflectionQuestion:
        "T\u00e4nk p\u00e5 ett ink\u00f6p din organisation gjort nyligen \u2014 vilka konsekvenser hade det f\u00e5tt om upphandlingen inte f\u00f6ljt LOU?",
    },
    {
      title: "LOU:s grundprinciper",
      content: [
        "LOU vilar p\u00e5 fem grundl\u00e4ggande principer som genomsyrar hela upphandlingsprocessen. Dessa principer \u00e4r inte bara teoretiska \u2014 de p\u00e5verkar konkret hur krav formuleras, hur anbud utv\u00e4rderas och hur beslut motiveras.",
        "Principen om likabehandling inneb\u00e4r att alla leverant\u00f6rer ska behandlas lika och f\u00e5 samma information vid samma tidpunkt. Transparensprincipen kr\u00e4ver att upphandlingen genomf\u00f6rs \u00f6ppet med tydliga f\u00f6ruts\u00e4ttningar. Proportionalitetsprincipen s\u00e4ger att krav och villkor m\u00e5ste st\u00e5 i rimlig proportion till det som upphandlas.",
        "Principen om icke-diskriminering f\u00f6rbjuder att leverant\u00f6rer missgynnas p\u00e5 grund av nationalitet eller geografisk hemvist. Principen om \u00f6msesidigt erk\u00e4nnande inneb\u00e4r att intyg och certifikat fr\u00e5n andra EU/EES-l\u00e4nder ska godtas p\u00e5 samma villkor som svenska.",
        "I praktiken inneb\u00e4r principerna att du m\u00e5ste vara noggrann med hur du formulerar krav. Ett krav som bara en specifik leverant\u00f6r kan uppfylla kan strida mot likabehandlingsprincipen. Ett krav p\u00e5 svensk certifiering utan att acceptera motsvarande utl\u00e4ndska certifikat bryter mot \u00f6msesidigt erk\u00e4nnande.",
      ],
      keyPoints: [
        "Likabehandling: alla leverant\u00f6rer f\u00e5r samma f\u00f6ruts\u00e4ttningar och information",
        "Transparens: \u00f6ppen process med tydliga regler",
        "Proportionalitet: kraven m\u00e5ste vara rimliga i f\u00f6rh\u00e5llande till upphandlingens v\u00e4rde",
        "Icke-diskriminering: ingen f\u00e5r missgynnas p\u00e5 grund av nationalitet",
        "\u00d6msesidigt erk\u00e4nnande: utl\u00e4ndska intyg godtas likv\u00e4rdigt",
      ],
      reflectionQuestion:
        "Kan du identifiera ett krav i en tidigare upphandling som eventuellt kunde ifr\u00e5gas\u00e4ttas ur ett proportionalitetsperspektiv?",
    },
    {
      title: "Tr\u00f6skelv\u00e4rden och f\u00f6rfaranden",
      content: [
        "Tr\u00f6skelv\u00e4rdena avg\u00f6r vilka regler som g\u00e4ller f\u00f6r en upphandling. \u00d6ver tr\u00f6skelv\u00e4rdet g\u00e4ller de direktivstyrda reglerna med krav p\u00e5 annonsering i EU:s databas TED. Under tr\u00f6skelv\u00e4rdet g\u00e4ller de nationella reglerna som \u00e4r n\u00e5got enklare.",
        "Vid direktivstyrd upphandling kan du v\u00e4lja mellan flera f\u00f6rfaranden. \u00d6ppet f\u00f6rfarande inneb\u00e4r att alla intresserade leverant\u00f6rer f\u00e5r l\u00e4mna anbud \u2014 det \u00e4r det vanligaste. Selektivt f\u00f6rfarande har tv\u00e5 steg: f\u00f6rst kvalificering, sedan inbjudan till utvalda leverant\u00f6rer att l\u00e4mna anbud.",
        "F\u00f6rhandlat f\u00f6rfarande och konkurrensp\u00e4glad dialog anv\u00e4nds vid komplexa upphandlingar d\u00e4r det \u00e4r sv\u00e5rt att definiera l\u00f6sningen p\u00e5 f\u00f6rhand. Dessa f\u00f6rfaranden kr\u00e4ver s\u00e4rskilda f\u00f6ruts\u00e4ttningar och m\u00e5ste motiveras. Under tr\u00f6skelv\u00e4rdet anv\u00e4nds f\u00f6renklad upphandling eller direktupphandling (under cirka 700\u00a0000 SEK).",
      ],
      keyPoints: [
        "Tr\u00f6skelv\u00e4rdet avg\u00f6r om EU-regler eller nationella regler g\u00e4ller",
        "\u00d6ppet f\u00f6rfarande \u00e4r det vanligaste \u2014 alla f\u00e5r l\u00e4mna anbud",
        "Selektivt f\u00f6rfarande: kvalificering f\u00f6rst, sedan anbud",
        "F\u00f6rhandlat f\u00f6rfarande kr\u00e4ver s\u00e4rskilda sk\u00e4l och motivering",
        "Direktupphandling kan anv\u00e4ndas under cirka 700\u00a0000 SEK",
      ],
      reflectionQuestion:
        "Om din organisation planerar ett IT-ink\u00f6p p\u00e5 4 MSEK \u2014 vilket f\u00f6rfarande skulle vara l\u00e4mpligast och varf\u00f6r?",
    },
    {
      title: "Upphandlingsprocessen steg f\u00f6r steg",
      content: [
        "Upphandlingsprocessen kan delas in i fyra huvudfaser. F\u00f6rsta fasen handlar om f\u00f6rberedelse: behovsanalys, marknadsunders\u00f6kning, val av f\u00f6rfarande och framtagning av upphandlingsdokument. H\u00e4r l\u00e4ggs grunden f\u00f6r hela upphandlingen.",
        "I genomf\u00f6randefasen annonseras upphandlingen, leverant\u00f6rer st\u00e4ller fr\u00e5gor, anbud l\u00e4mnas in och utv\u00e4rderas. Utv\u00e4rderingen f\u00f6ljer den modell som angavs i upphandlingsdokumenten \u2014 det g\u00e5r inte att \u00e4ndra utv\u00e4rderingskriterierna i efterhand.",
        "Efter utv\u00e4rderingen fattas ett tilldelningsbeslut som meddelas alla anbudsgivare. D\u00e4refter f\u00f6ljer en avtalsp\u00e4rr p\u00e5 10\u201315 dagar d\u00e4r f\u00f6rlorande parter kan beg\u00e4ra \u00f6verpr\u00f6vning. F\u00f6rst efter sp\u00e4rrtidens utg\u00e5ng kan avtal tecknas.",
      ],
      keyPoints: [
        "F\u00f6rberedelse: behovsanalys, marknad, upphandlingsdokument",
        "Genomf\u00f6rande: annonsering, fr\u00e5gor, anbudsinl\u00e4mning, utv\u00e4rdering",
        "Tilldelning: beslut, avtalsp\u00e4rr, eventuell \u00f6verpr\u00f6vning",
        "Avtal: kontraktsskrivning, implementering, uppf\u00f6ljning",
      ],
      reflectionQuestion:
        "I vilken fas av upphandlingsprocessen tror du att de flesta misstag g\u00f6rs, och vad kan konsekvenserna bli?",
    },
    {
      title: "Teknisk specifikation och kravst\u00e4llning",
      content: [
        "Kravst\u00e4llningen \u00e4r ofta den mest kritiska delen av upphandlingen. Kraven m\u00e5ste vara tydliga, m\u00e4tbara och proportionerliga. I LOU skiljer man mellan obligatoriska krav (SKA-krav) som m\u00e5ste uppfyllas, och merv\u00e4rdeskrav (B\u00d6R-krav) som utv\u00e4rderas med po\u00e4ng.",
        "En teknisk specifikation kan formuleras p\u00e5 olika s\u00e4tt: som funktionskrav (vad systemet ska g\u00f6ra), prestandakrav (hur bra det ska g\u00f6ra det) eller som h\u00e4nvisning till standarder. Funktionskrav \u00e4r ofta att f\u00f6redra eftersom de ger leverant\u00f6rerna frihet att f\u00f6resl\u00e5 innovativa l\u00f6sningar.",
        "Varje krav b\u00f6r vara sp\u00e5rbart till ett dokumenterat behov. Om ett krav inte kan motiveras med ett verkligt verksamhetsbehov riskerar det att bed\u00f6mas som oproportionerligt vid en eventuell \u00f6verpr\u00f6vning.",
      ],
      keyPoints: [
        "SKA-krav \u00e4r obligatoriska \u2014 uppfylls de inte f\u00f6rkastas anbudet",
        "B\u00d6R-krav \u00e4r merv\u00e4rdeskrav som po\u00e4ngs\u00e4tts",
        "Funktionskrav ger mer utrymme f\u00f6r innovation \u00e4n detaljerade tekniska krav",
        "Alla krav ska vara sp\u00e5rbara till dokumenterade behov",
      ],
      reflectionQuestion:
        "Hur s\u00e4kerst\u00e4ller du att dina krav \u00e4r tillr\u00e4ckligt tydliga f\u00f6r att en leverant\u00f6r ska kunna f\u00f6rst\u00e5 exakt vad som f\u00f6rv\u00e4ntas?",
    },
    {
      title: "Utv\u00e4rdering och tilldelning",
      content: [
        "Utv\u00e4rderingsmodellen best\u00e4ms innan upphandlingen annonseras och f\u00e5r inte \u00e4ndras efterhand. De vanligaste tilldelningsgrunderna \u00e4r b\u00e4sta f\u00f6rh\u00e5llandet mellan pris och kvalitet, l\u00e4gsta kostnad, eller l\u00e4gsta pris.",
        "Varje utv\u00e4rderingskriterium beh\u00f6ver en tydlig vikt och en po\u00e4ngskala med definierade po\u00e4ngankare. Po\u00e4ngankare beskriver vad varje po\u00e4ngniv\u00e5 inneb\u00e4r, vilket s\u00e4kerst\u00e4ller att olika bed\u00f6mare ger samma po\u00e4ng f\u00f6r samma kvalitetsniv\u00e5.",
        "Vid utv\u00e4rderingen kontrolleras f\u00f6rst att alla SKA-krav \u00e4r uppfyllda. Anbud som inte klarar SKA-kraven diskvalificeras. D\u00e4refter po\u00e4ngs\u00e4tts B\u00d6R-kraven och priset v\u00e4gs in enligt den angivna modellen.",
      ],
      keyPoints: [
        "Utv\u00e4rderingsmodellen l\u00e5ses innan annonsering",
        "Po\u00e4ngankare \u00e4r avg\u00f6rande f\u00f6r r\u00e4ttvis bed\u00f6mning",
        "SKA-krav kontrolleras f\u00f6rst \u2014 ej uppfyllda inneb\u00e4r diskvalificering",
        "Tilldelningsbeslutet m\u00e5ste motiveras tydligt",
      ],
      reflectionQuestion:
        "Vad kan h\u00e4nda om po\u00e4ngankare saknas och tv\u00e5 olika bed\u00f6mare utv\u00e4rderar samma anbud?",
    },
    {
      title: "Avtalsp\u00e4rr och \u00f6verpr\u00f6vning",
      content: [
        "N\u00e4r tilldelningsbeslutet \u00e4r fattat och kommunicerat intr\u00e4der en avtalsp\u00e4rr. Sp\u00e4rrtiden \u00e4r minst 10 dagar vid f\u00f6renklad upphandling och minst 15 dagar vid \u00f6ppen eller selektiv upphandling. Under sp\u00e4rrtiden f\u00e5r avtal inte tecknas.",
        "En leverant\u00f6r som anser att upphandlingen genomf\u00f6rts i strid med LOU kan ans\u00f6ka om \u00f6verpr\u00f6vning hos f\u00f6rvaltningsr\u00e4tten. Vanliga grunder \u00e4r otydliga eller oproportionerliga krav, bristande motivering, eller att utv\u00e4rderingen inte f\u00f6ljt de angivna kriterierna.",
        "\u00d6verpr\u00f6vning leder till f\u00f6rseningar och kostnader f\u00f6r b\u00e5da parter. Det b\u00e4sta s\u00e4ttet att undvika \u00f6verpr\u00f6vning \u00e4r att vara noggrann i f\u00f6rberedelsearbetet: tydliga krav, v\u00e4l motiverade beslut och full transparens.",
      ],
      keyPoints: [
        "Avtalsp\u00e4rr: 10 dagar (f\u00f6renklad) eller 15 dagar (\u00f6ppen/selektiv)",
        "\u00d6verpr\u00f6vning sker i f\u00f6rvaltningsr\u00e4tten",
        "Vanliga orsaker: otydliga krav, bristande motivering, felaktig utv\u00e4rdering",
        "F\u00f6rebyggande: tydlighet, sp\u00e5rbarhet och dokumentation",
      ],
      reflectionQuestion:
        "Vilka \u00e5tg\u00e4rder kan du vidta redan i behovsfasen f\u00f6r att minska risken f\u00f6r \u00f6verpr\u00f6vning?",
    },
    {
      title: "Uppf\u00f6ljning och avtalshantering",
      content: [
        "Uppf\u00f6ljning av avtal \u00e4r lika viktigt som sj\u00e4lva upphandlingen, men f\u00e5r ofta f\u00f6r lite uppm\u00e4rksamhet. Syftet \u00e4r att s\u00e4kerst\u00e4lla att leverant\u00f6ren levererar enligt avtalet och att identifiera avvikelser tidigt.",
        "En bra uppf\u00f6ljningsplan inneh\u00e5ller definierade nyckeltal (KPI:er), regelbundna uppf\u00f6ljningsm\u00f6ten, eskaleringsrutiner vid avvikelser och en tydlig ansvarsf\u00f6rdelning.",
        "Vid avtalsperiodens slut beh\u00f6ver man planera f\u00f6r antingen f\u00f6rl\u00e4ngning, ny upphandling eller avveckling. Avvecklingsplanen b\u00f6r inneh\u00e5lla datamigrering, kunskaps\u00f6verf\u00f6ring och en tidsplan f\u00f6r \u00f6verg\u00e5ngen.",
      ],
      keyPoints: [
        "Avtalsuppf\u00f6ljning kr\u00e4ver definierade KPI:er och regelbundna m\u00f6ten",
        "Verksamheten m\u00e5ste vara aktiv i att bed\u00f6ma leveransens kvalitet",
        "Planera f\u00f6r avtalets slut i god tid",
        "Datamigrering och kunskaps\u00f6verf\u00f6ring \u00e4r kritiska vid systembyte",
      ],
      reflectionQuestion:
        "Hur ser uppf\u00f6ljningen ut i din organisation idag \u2014 finns det en strukturerad process eller sker det ad hoc?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Course 2 — Kravhantering (6 modules)                               */
/* ------------------------------------------------------------------ */

const kravhantering: CourseData = {
  title: "Kravhantering",
  icon: "ruler",
  description:
    "Fr\u00e5n behov till kravspecifikation \u2014 behovsanalys, funktionella vs icke-funktionella krav, kravsp\u00e5rbarhet och verifiering.",
  level: "Medel",
  estimatedMinutes: 35,
  modules: [
    {
      title: "Introduktion till kravhantering",
      content: [
        "Kravhantering \u00e4r disciplinen att systematiskt identifiera, dokumentera, validera och f\u00f6rvalta krav genom hela ett projekts livscykel. I en upphandlingskontext \u00e4r kravhantering avg\u00f6rande eftersom kraven utg\u00f6r den juridiska grunden f\u00f6r vad leverant\u00f6ren f\u00f6rv\u00e4ntas leverera.",
        "D\u00e5lig kravhantering \u00e4r en av de vanligaste orsakerna till misslyckade IT-projekt och \u00f6verpr\u00f6vade upphandlingar. Otydliga, mots\u00e4gelsefulla eller oproportionerliga krav leder till felaktiga anbud och i slutet en leverans som inte m\u00f6ter verksamhetens behov.",
        "En strukturerad kravprocess s\u00e4kerst\u00e4ller att alla intressenters behov f\u00e5ngas upp, att kraven \u00e4r testbara och sp\u00e5rbara, och att f\u00f6r\u00e4ndringar hanteras kontrollerat. Det handlar inte om att skriva s\u00e5 m\u00e5nga krav som m\u00f6jligt, utan om att skriva r\u00e4tt krav.",
      ],
      keyPoints: [
        "Kravhantering \u00e4r en systematisk process fr\u00e5n identifiering till f\u00f6rvaltning",
        "D\u00e5liga krav \u00e4r en huvudorsak till misslyckade projekt och \u00f6verpr\u00f6vningar",
        "Kraven utg\u00f6r den juridiska grunden i en upphandling",
        "Kvalitet \u00e4r viktigare \u00e4n kvantitet \u2014 r\u00e4tt krav, inte flest krav",
      ],
      reflectionQuestion:
        "Har du upplevt ett projekt d\u00e4r otydliga krav ledde till problem \u2014 vad h\u00e4nde och vad kunde gjorts annorlunda?",
    },
    {
      title: "Behovsanalys och intressenthantering",
      content: [
        "Behovsanalysen \u00e4r grunden f\u00f6r all kravst\u00e4llning. Innan du kan formulera krav m\u00e5ste du f\u00f6rst\u00e5 vilka behov verksamheten har. Ett behov beskriver VAD organisationen beh\u00f6ver uppn\u00e5, medan ett krav beskriver HUR det ska uppn\u00e5s.",
        "Intressenthantering inneb\u00e4r att identifiera alla som ber\u00f6rs av upphandlingen: slutanv\u00e4ndare, chefer, IT-avdelningen, ekonomiavdelningen och andra ber\u00f6rda parter. Varje intressentgrupp har unika perspektiv och behov.",
        "Workshops \u00e4r det mest effektiva s\u00e4ttet att samla in behov. Genom att blanda olika intressentgrupper i strukturerade sessioner f\u00e5r man en bredare bild. Dokumentera behoven med tydlig prioritering (P1/P2/P3) och koppla varje behov till en intressent.",
      ],
      keyPoints: [
        "Behov beskriver VAD, krav beskriver HUR \u2014 h\u00e5ll is\u00e4r!",
        "Identifiera alla intressentgrupper tidigt i processen",
        "Anv\u00e4nd workshops f\u00f6r att f\u00e5nga behov fr\u00e5n flera perspektiv",
        "Prioritera behov (P1/P2/P3) och koppla dem till intressenter",
        "Gl\u00f6m inte slutanv\u00e4ndarna \u2014 de vet b\u00e4st hur vardagen fungerar",
      ],
      reflectionQuestion:
        "Vilka intressentgrupper brukar gl\u00f6mmas bort i behovsanalysen, och vilka konsekvenser kan det f\u00e5?",
    },
    {
      title: "Kravtyper \u2014 funktionella, icke-funktionella, begr\u00e4nsningar",
      content: [
        "Funktionella krav beskriver vad systemet ska kunna g\u00f6ra \u2014 vilken funktionalitet som kr\u00e4vs. Exempel: systemet ska kunna registrera nya \u00e4renden, generera rapporter eller hantera beh\u00f6righeter.",
        "Icke-funktionella krav (kvalitetskrav) beskriver hur bra systemet ska vara. Dit h\u00f6r prestanda, s\u00e4kerhet, tillg\u00e4nglighet, anv\u00e4ndbarhet och underh\u00e5llbarhet. Dessa krav gl\u00f6ms ofta bort men \u00e4r avg\u00f6rande f\u00f6r leveransens framg\u00e5ng.",
        "Begr\u00e4nsningar (constraints) begr\u00e4nsar l\u00f6sningsutrymmet: tekniska plattformar, integrationer med befintliga system, juridiska krav (GDPR) eller organisatoriska f\u00f6ruts\u00e4ttningar. Begr\u00e4nsningar m\u00e5ste vara tydligt motiverade f\u00f6r att inte bryta mot proportionalitetsprincipen.",
      ],
      keyPoints: [
        "Funktionella krav = vad systemet ska g\u00f6ra",
        "Icke-funktionella krav = hur bra det ska vara (prestanda, s\u00e4kerhet, UX)",
        "Begr\u00e4nsningar = ramvillkor som begr\u00e4nsar l\u00f6sningsutrymmet",
        "Icke-funktionella krav gl\u00f6ms ofta men \u00e4r kritiska f\u00f6r framg\u00e5ng",
      ],
      reflectionQuestion:
        "Vilka icke-funktionella krav \u00e4r viktigast f\u00f6r ert nuvarande system och hur m\u00e4ts de idag?",
    },
    {
      title: "Kravspecifikation och dokumentation",
      content: [
        "En bra kravspecifikation \u00e4r tydlig, testbar och sp\u00e5rbar. Varje krav b\u00f6r ha ett unikt ID, en beskrivning, kravniv\u00e5 (SKA/B\u00d6R), prioritet, k\u00e4lla och en verifieringsmetod.",
        "Formulera krav som tydliga, atomiska p\u00e5st\u00e5enden. Undvik vaga formuleringar som \u201csystemet ska vara snabbt\u201d. Anv\u00e4nd ist\u00e4llet m\u00e4tbara formuleringar: \u201cSvarstiden f\u00f6r s\u00f6kning ska vara under 2 sekunder vid 100 samtidiga anv\u00e4ndare.\u201d",
        "Strukturera kraven i logiska grupper eller kluster som speglar verksamhetens funktionsomr\u00e5den. Det g\u00f6r det l\u00e4ttare f\u00f6r b\u00e5de leverant\u00f6rer och utv\u00e4rderare att orientera sig.",
      ],
      keyPoints: [
        "Varje krav beh\u00f6ver: ID, beskrivning, niv\u00e5, k\u00e4lla, verifieringsmetod",
        "Formulera krav som m\u00e4tbara, atomiska p\u00e5st\u00e5enden",
        "Undvik vaga ord som \u201cbra\u201d, \u201csnabbt\u201d, \u201cl\u00e4tt\u201d utan m\u00e4tetal",
        "Gruppera krav i logiska kluster/funktionsomr\u00e5den",
      ],
      reflectionQuestion:
        "V\u00e4lj ett krav fr\u00e5n en tidigare upphandling \u2014 \u00e4r det tillr\u00e4ckligt tydligt f\u00f6r att en leverant\u00f6r ska kunna svara ja eller nej?",
    },
    {
      title: "Kravsp\u00e5rbarhet och \u00e4ndringshantering",
      content: [
        "Kravsp\u00e5rbarhet inneb\u00e4r att varje krav kan sp\u00e5ras bak\u00e5t till sitt ursprungsbehov och fram\u00e5t till hur det utv\u00e4rderas. Sp\u00e5rbarhetskedjan Behov \u2192 Krav \u2192 Kriterium \u2192 Po\u00e4ng s\u00e4kerst\u00e4ller att inget krav saknar f\u00f6rankring.",
        "Sp\u00e5rbarhet \u00e4r ocks\u00e5 ett skydd mot \u00f6verpr\u00f6vning. Om en leverant\u00f6r ifr\u00e5gas\u00e4tter ett krav kan du visa exakt vilket behov det grundar sig p\u00e5, vilken intressent som uttryckt behovet och vilken evidens som st\u00f6djer det.",
        "\u00c4ndringshantering \u00e4r processen f\u00f6r att hantera f\u00f6r\u00e4ndringar i krav p\u00e5 ett kontrollerat s\u00e4tt. Krav\u00e4ndringar efter annonsering \u00e4r problematiska \u2014 det kan kr\u00e4va ny annonsering. D\u00e4rf\u00f6r \u00e4r grundligt kravarbete f\u00f6re annonsering avg\u00f6rande.",
      ],
      keyPoints: [
        "Sp\u00e5rbarhet: Behov \u2192 Krav \u2192 Kriterium \u2192 Po\u00e4ng",
        "Sp\u00e5rbarhet skyddar mot \u00f6verpr\u00f6vning genom motiverbar proportionalitet",
        "Krav\u00e4ndringar efter annonsering \u00e4r riskfyllda",
        "Grundligt kravarbete f\u00f6re annonsering \u00e4r avg\u00f6rande",
      ],
      reflectionQuestion:
        "Kan du sp\u00e5ra alla krav i din senaste upphandling tillbaka till dokumenterade behov?",
    },
    {
      title: "Verifiering och validering av krav",
      content: [
        "Verifiering handlar om att kontrollera att kraven \u00e4r r\u00e4tt formulerade: \u00e4r de tydliga, testbara, konsekventa och genomf\u00f6rbara? Validering handlar om att kontrollera att det \u00e4r r\u00e4tt krav: l\u00f6ser de verksamhetens faktiska problem?",
        "F\u00f6r varje krav b\u00f6r det finnas en verifieringsplan som beskriver tre niv\u00e5er: hur kravet verifieras i anbudet, vid implementation och i drift.",
        "Kravgranskning b\u00f6r g\u00f6ras av flera personer med olika perspektiv: verksamhetsf\u00f6retr\u00e4dare, upphandlare, IT och ekonom. Anv\u00e4nd checklistor f\u00f6r att s\u00e4kerst\u00e4lla att inget missas.",
      ],
      keyPoints: [
        "Verifiering = r\u00e4tt formulerade krav, validering = r\u00e4tt krav",
        "Tre niv\u00e5er: anbudsverifiering, implementationstest, driftsuppf\u00f6ljning",
        "Kravgranskning fr\u00e5n flera perspektiv: verksamhet, juridik, teknik, ekonomi",
        "Checklistor och peer reviews h\u00f6jer kvaliteten",
      ],
      reflectionQuestion:
        "Hur verifierar ni idag att leverant\u00f6ren faktiskt uppfyller de krav som st\u00e4lldes i upphandlingen?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Course 3 — F\u00f6rm\u00e5gebed\u00f6mning (5 modules)                              */
/* ------------------------------------------------------------------ */

const formagabedomning: CourseData = {
  title: "F\u00f6rm\u00e5gebed\u00f6mning",
  icon: "gauge",
  description:
    "Utv\u00e4rdera f\u00f6rm\u00e5gor inom m\u00e4nniska, teknik och process \u2014 mognadsmodeller, gap-analys, handlingsplaner.",
  level: "Medel",
  estimatedMinutes: 30,
  modules: [
    {
      title: "Vad \u00e4r f\u00f6rm\u00e5gebed\u00f6mning?",
      content: [
        "F\u00f6rm\u00e5gebed\u00f6mning \u00e4r en systematisk metod f\u00f6r att utv\u00e4rdera en organisations kapacitet att utf\u00f6ra sina uppgifter. Ist\u00e4llet f\u00f6r att bara fr\u00e5ga \u201cVad beh\u00f6ver vi?\u201d st\u00e4ller man fr\u00e5gan \u201cVad kan vi idag, och vad beh\u00f6ver vi kunna imorgon?\u201d",
        "Bed\u00f6mningen g\u00f6rs inom tre dimensioner: M\u00e4nniska (kompetens, roller, organisation), Teknik (system, infrastruktur, verktyg) och Process (arbetss\u00e4tt, fl\u00f6den, rutiner).",
        "F\u00f6rm\u00e5gebed\u00f6mning \u00e4r s\u00e4rskilt v\u00e4rdefullt inf\u00f6r upphandlingar eftersom det hj\u00e4lper till att identifiera vilka gap som faktiskt beh\u00f6ver slutas. Kanske \u00e4r problemet inte att IT-systemet \u00e4r d\u00e5ligt, utan att anv\u00e4ndarna saknar utbildning.",
      ],
      keyPoints: [
        "F\u00f6rm\u00e5gebed\u00f6mning utv\u00e4rderar nuvarande kapacitet mot \u00f6nskad kapacitet",
        "Tre dimensioner: M\u00e4nniska, Teknik och Process",
        "Hj\u00e4lper att identifiera var det verkliga gapet ligger",
        "S\u00e4rskilt v\u00e4rdefullt som underlag inf\u00f6r upphandlingar",
      ],
      reflectionQuestion:
        "Om du t\u00e4nker p\u00e5 din organisations st\u00f6rsta utmaning just nu \u2014 ligger grundorsaken i m\u00e4nniska, teknik eller process?",
    },
    {
      title: "Dimensionen M\u00e4nniska \u2014 kompetens, roller, organisation",
      content: [
        "M\u00e4nniskodimensionen handlar om de m\u00e4nskliga resurserna: har vi r\u00e4tt kompetens, r\u00e4tt roller och r\u00e4tt organisationsstruktur? Det r\u00e4cker inte med bra teknik om ingen kan anv\u00e4nda den effektivt.",
        "Bed\u00f6m kompetens p\u00e5 flera niv\u00e5er: individuell kompetens, teamkompetens och organisationskompetens. Anv\u00e4nd en mognadsskala fr\u00e5n 1 (grundl\u00e4ggande medvetenhet) till 5 (expert som kan leda andra).",
        "Roller och ansvar m\u00e5ste vara tydligt definierade. Vanliga problem \u00e4r oklar ansvarsf\u00f6rdelning, dubbelarbete och nyckelpersonsberoende. En RACI-matris \u00e4r ett bra verktyg f\u00f6r att kartl\u00e4gga vem som g\u00f6r vad.",
      ],
      keyPoints: [
        "Bed\u00f6m kompetens p\u00e5 individ-, team- och organisationsniv\u00e5",
        "Anv\u00e4nd en mognadsskala 1\u20135 f\u00f6r konsekvent bed\u00f6mning",
        "Kartl\u00e4gg roller, ansvar och nyckelpersonsberoenden",
        "RACI-matrisen tydligg\u00f6r vem som g\u00f6r vad",
      ],
      reflectionQuestion:
        "Finns det nyckelpersonsberoenden i din verksamhet som utg\u00f6r en risk \u2014 vad h\u00e4nder om den personen slutar?",
    },
    {
      title: "Dimensionen Teknik \u2014 system, infrastruktur, integration",
      content: [
        "Teknikdimensionen utv\u00e4rderar de system, verktyg och den infrastruktur som organisationen anv\u00e4nder. Det handlar inte bara om enskilda system utan om hela IT-landskapet: hur systemen h\u00e4nger ihop och var flaskhalsarna finns.",
        "Bed\u00f6m varje system utifr\u00e5n funktionalitet, teknisk skuld, integrationsgrad och underh\u00e5llbarhet. Anv\u00e4nd \u00e4ven h\u00e4r en mognadsskala 1\u20135.",
        "En vanlig fallgrop \u00e4r att fokusera enbart p\u00e5 det system som ska upphandlas, utan att beakta integrationerna. Integrationskostnaden kan vara st\u00f6rre \u00e4n sj\u00e4lva systemkostnaden. Kartl\u00e4gg alla dataf\u00f6den innan du kravst\u00e4ller.",
      ],
      keyPoints: [
        "Utv\u00e4rdera hela IT-landskapet, inte bara enskilda system",
        "Bed\u00f6m: funktionalitet, teknisk skuld, integration, underh\u00e5llbarhet",
        "Integrationskostnader \u00e4r ofta st\u00f6rre \u00e4n v\u00e4ntat",
        "Kartl\u00e4gg dataf\u00f6den mellan system innan kravst\u00e4llning",
      ],
      reflectionQuestion:
        "Hur v\u00e4l k\u00e4nner du till integrationerna mellan era system \u2014 finns det en aktuell systemkarta?",
    },
    {
      title: "Dimensionen Process \u2014 arbetss\u00e4tt, fl\u00f6den, effektivitet",
      content: [
        "Processdimensionen handlar om hur arbetet faktiskt utf\u00f6rs: vilka steg ing\u00e5r, vem g\u00f6r vad, var uppst\u00e5r flaskhalsar och var finns on\u00f6diga manuella moment?",
        "Kartl\u00e4gg de viktigaste processerna genom processkartl\u00e4ggning. Rita upp varje steg, vilka system som anv\u00e4nds, vilka roller som \u00e4r involverade och hur l\u00e5ng tid varje steg tar. Identifiera on\u00f6diga steg och v\u00e4ntetider.",
        "Bed\u00f6m processmognad p\u00e5 en skala fr\u00e5n 1 (ad hoc) till 5 (optimerad och m\u00e4tbar). De flesta organisationer ligger p\u00e5 niv\u00e5 2\u20133, vilket inneb\u00e4r att processerna finns men inte m\u00e4ts systematiskt.",
      ],
      keyPoints: [
        "Processerna \u00e4r bron mellan m\u00e4nniska och teknik",
        "Anv\u00e4nd processkartl\u00e4ggning f\u00f6r att visualisera arbetsfl\u00f6den",
        "Identifiera flaskhalsar, manuella steg och on\u00f6diga \u00f6verl\u00e4mningar",
        "Processmognad 1\u20135: fr\u00e5n ad hoc till optimerad",
      ],
      reflectionQuestion:
        "V\u00e4lj en nyckelprocess i din verksamhet \u2014 var i processen \u00e4r det mest friktion och vad beror det p\u00e5?",
    },
    {
      title: "Gap-analys och handlingsplan",
      content: [
        "Gap-analys j\u00e4mf\u00f6r nuvarande f\u00f6rm\u00e5ga (nul\u00e4ge) med \u00f6nskad f\u00f6rm\u00e5ga (b\u00f6rl\u00e4ge) och identifierar gapen. F\u00f6r varje dimension bed\u00f6ms nul\u00e4get och b\u00f6rl\u00e4get p\u00e5 mognadsskalan, och skillnaden utg\u00f6r gapet.",
        "Prioritera gapen baserat p\u00e5 p\u00e5verkan p\u00e5 verksamheten och genomf\u00f6rbarhet. Inte alla gap beh\u00f6ver slutas omedelbart \u2014 fokusera p\u00e5 de med st\u00f6rst p\u00e5verkan.",
        "Handlingsplanen beskriver konkreta \u00e5tg\u00e4rder: vad ska g\u00f6ras, vem ansvarar, n\u00e4r ska det vara klart och vad kostar det? Vissa gap slutas genom upphandling av ny teknik, andra genom kompetensutveckling. Ofta kr\u00e4vs en kombination.",
      ],
      keyPoints: [
        "Gap = skillnaden mellan nul\u00e4ge och b\u00f6rl\u00e4ge p\u00e5 mognadsskalan",
        "Prioritera gap efter verksamhetsp\u00e5verkan och genomf\u00f6rbarhet",
        "Handlingsplanen: vad, vem, n\u00e4r, kostnad",
        "L\u00f6sningen kan vara teknik, kompetens, process \u2014 eller en kombination",
      ],
      reflectionQuestion:
        "Hur ser ditt st\u00f6rsta gap ut just nu \u2014 och vad skulle vara det f\u00f6rsta steget f\u00f6r att sluta det?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Course 4 — Systemf\u00f6rvaltning (6 modules)                          */
/* ------------------------------------------------------------------ */

const systemforvaltning: CourseData = {
  title: "Systemf\u00f6rvaltning",
  icon: "server-cog",
  description:
    "Strukturerad IT-f\u00f6rvaltning \u2014 f\u00f6rvaltningsobjekt, roller, budgetering, livscykelhantering och pm3-inspirerat arbetss\u00e4tt.",
  level: "Medel",
  estimatedMinutes: 40,
  modules: [
    {
      title: "Grunderna i systemf\u00f6rvaltning",
      content: [
        "Systemf\u00f6rvaltning handlar om att s\u00e4kerst\u00e4lla att IT-system fungerar, utvecklas och ger v\u00e4rde under hela sin livscykel. Det \u00e4r inte bara en teknisk fr\u00e5ga \u2014 f\u00f6rvaltning kr\u00e4ver samarbete mellan verksamhet och IT.",
        "En vanlig missuppfattning \u00e4r att f\u00f6rvaltning bara handlar om driftst\u00f6d och felavhj\u00e4lpning. I verkligheten omfattar f\u00f6rvaltning ocks\u00e5 vidareutveckling, anpassning till f\u00f6r\u00e4ndrade behov och s\u00e4kerhetsarbete.",
        "Pm3-modellen \u00e4r den mest anv\u00e4nda f\u00f6rvaltningsmodellen i Sverige. Den bygger p\u00e5 tre pelare: f\u00f6rvaltningsobjekt (vad f\u00f6rvaltas), f\u00f6rvaltningsorganisation (vem f\u00f6rvaltar) och f\u00f6rvaltningsprocesser (hur sker f\u00f6rvaltningen).",
      ],
      keyPoints: [
        "F\u00f6rvaltning \u00e4r mer \u00e4n drift \u2014 det inkluderar vidareutveckling och planering",
        "Kr\u00e4ver samarbete mellan verksamhet och IT",
        "Pm3 \u00e4r den mest anv\u00e4nda modellen i Sverige",
        "Tre pelare: f\u00f6rvaltningsobjekt, organisation, processer",
      ],
      reflectionQuestion:
        "Hur ser f\u00f6rvaltningen av era viktigaste system ut idag \u2014 \u00e4r den strukturerad eller ad hoc?",
    },
    {
      title: "F\u00f6rvaltningsorganisation och roller",
      content: [
        "En fungerande f\u00f6rvaltningsorganisation kr\u00e4ver tydliga roller med definierat ansvar. Verksamheten \u00e4ger behoven och prioriteringarna, IT \u00e4ger den tekniska l\u00f6sningen och leveransen.",
        "De centrala rollerna \u00e4r objekts\u00e4gare (verksamhetschef som \u00e4ger f\u00f6rvaltningsobjektet och budget), f\u00f6rvaltningsledare (samordnar arbetet), objektspecialist (verksamhetsexpert) och teknisk f\u00f6rvaltare (IT-tekniker).",
        "En vanlig utmaning \u00e4r att objekts\u00e4garrollen inte \u00e4r tydligt tillsatt. D\u00e5 hamnar alla beslut hos IT, som inte har mandat att prioritera verksamhetsbehov. Resultatet blir ett system som tekniskt fungerar men inte m\u00f6ter verksamheten.",
      ],
      keyPoints: [
        "B\u00e5de verksamhet och IT m\u00e5ste vara representerade",
        "Objekts\u00e4gare (verksamhet) \u00e4ger budget och prioritering",
        "F\u00f6rvaltningsledare samordnar det dagliga arbetet",
        "Otydlig rollf\u00f6rdelning leder till bristande prioritering",
      ],
      reflectionQuestion:
        "Vem \u00e4r objekts\u00e4gare f\u00f6r ert viktigaste system \u2014 och tar den personen aktivt ansvar f\u00f6r prioritering?",
    },
    {
      title: "F\u00f6rvaltningsobjekt och tj\u00e4nstekatalog",
      content: [
        "Ett f\u00f6rvaltningsobjekt \u00e4r en avgr\u00e4nsad enhet som f\u00f6rvaltas som en helhet. Avgr\u00e4nsningen \u00e4r viktig \u2014 f\u00f6r stora objekt blir of\u00f6rvaltbara, f\u00f6r sm\u00e5 ger f\u00f6r mycket administration.",
        "En tj\u00e4nstekatalog beskriver vilka tj\u00e4nster f\u00f6rvaltningen levererar till verksamheten. Varje tj\u00e4nst har definierade serviceniv\u00e5er (SLA) som anger vad verksamheten kan f\u00f6rv\u00e4nta sig.",
        "Tj\u00e4nstekatalogen skapar tydlighet kring vad som ing\u00e5r, vad som kostar extra och vilka svarstider som g\u00e4ller. Utan tj\u00e4nstekatalog blir f\u00f6rv\u00e4ntningarna diffusa.",
      ],
      keyPoints: [
        "F\u00f6rvaltningsobjektet m\u00e5ste avgr\u00e4nsas lagom",
        "Tj\u00e4nstekatalogen definierar vad f\u00f6rvaltningen levererar",
        "SLA anger serviceniv\u00e5er och f\u00f6rv\u00e4ntningar",
        "Tydlig tj\u00e4nstekatalog minskar missf\u00f6rst\u00e5nd och konflikter",
      ],
      reflectionQuestion:
        "Vet anv\u00e4ndarna i din organisation vad de kan f\u00f6rv\u00e4nta sig av IT-f\u00f6rvaltningen?",
    },
    {
      title: "Budget och ekonomistyrning",
      content: [
        "F\u00f6rvaltningsbudgeten best\u00e5r av tre huvuddelar: driftskostnader (licenser, hosting, support), underh\u00e5ll (buggfixar, s\u00e4kerhetsuppdateringar) och vidareutveckling (ny funktionalitet). F\u00f6rdelningen varierar med systemets mognad.",
        "Ett nyimplementerat system har l\u00e5g driftskostnad men h\u00f6g vidareutvecklingskostnad. Ett \u00e5ldrande system har h\u00f6g underh\u00e5llskostnad. Att f\u00f6rst\u00e5 denna livscykelkurva \u00e4r avg\u00f6rande f\u00f6r budgetplanering.",
        "Anv\u00e4nd en TCO-modell (Total Cost of Ownership) f\u00f6r att f\u00e5 en korrekt bild av systemets totala kostnad \u00f6ver tid. TCO inkluderar \u00e4ven interna personalkostnader, utbildning och framtida avveckling. M\u00e5nga organisationer underskattar TCO kraftigt.",
      ],
      keyPoints: [
        "Tre budgetposter: drift, underh\u00e5ll, vidareutveckling",
        "Kostnadsf\u00f6rdelningen f\u00f6r\u00e4ndras med systemets \u00e5lder",
        "TCO ger sann totalkostnad inklusive dolda kostnader",
        "Underh\u00e5llsskuld v\u00e4xer om underh\u00e5llet underfinansieras",
      ],
      reflectionQuestion:
        "K\u00e4nner du till den verkliga TCO f\u00f6r ert viktigaste system, inklusive interna personalkostnader?",
    },
    {
      title: "Livscykelhantering och avveckling",
      content: [
        "Varje system har en livscykel: inf\u00f6rande, aktiv f\u00f6rvaltning, mognadsfas och avveckling. Att planera f\u00f6r systemets hela livscykel redan vid upphandlingen ger b\u00e4ttre beslut.",
        "Avveckling \u00e4r ofta den mest f\u00f6rsummade fasen. N\u00e4r ett system ska ers\u00e4ttas beh\u00f6ver man planera f\u00f6r datamigrering, parallellk\u00f6rning, kunskaps\u00f6verf\u00f6ring och juridiska krav.",
        "F\u00f6r att undvika inl\u00e5sning b\u00f6r exit-villkor skrivas in redan i upphandlingen: krav p\u00e5 \u00f6ppna format, r\u00e4tt till data vid avtalets slut, st\u00f6d f\u00f6r dataexport och en rimlig \u00f6verg\u00e5ngsperiod.",
      ],
      keyPoints: [
        "Planera f\u00f6r hela livscykeln redan vid upphandling",
        "Avveckling kr\u00e4ver: datamigrering, parallellk\u00f6rning, kunskaps\u00f6verf\u00f6ring",
        "Exit-villkor i avtalet skyddar mot inl\u00e5sning",
        "Krav p\u00e5 \u00f6ppna format och r\u00e4tt till data \u00e4r avg\u00f6rande",
      ],
      reflectionQuestion:
        "Har era nuvarande avtal tydliga exit-villkor \u2014 vad h\u00e4nder om ni vill byta leverant\u00f6r?",
    },
    {
      title: "St\u00e4ndiga f\u00f6rb\u00e4ttringar och m\u00e4tning",
      content: [
        "F\u00f6rvaltning \u00e4r inte statisk \u2014 den m\u00e5ste kontinuerligt f\u00f6rb\u00e4ttras. Anv\u00e4nd nyckeltal (KPI:er) f\u00f6r att m\u00e4ta f\u00f6rvaltningens prestation: \u00e4rendehanteringstid, anv\u00e4ndarnas n\u00f6jdhet, systemets tillg\u00e4nglighet och kostnad per anv\u00e4ndare.",
        "Inf\u00f6r regelbundna f\u00f6rvaltningsrevisioner d\u00e4r man utv\u00e4rderar: Levererar vi det vi lovat? \u00c4r anv\u00e4ndarna n\u00f6jda? \u00c4r kostnaderna rimliga? Dessa revisioner b\u00f6r g\u00f6ras minst \u00e5rligen.",
        "Anv\u00e4ndarnas feedback \u00e4r den viktigaste indikatorn p\u00e5 f\u00f6rvaltningens kvalitet. Inf\u00f6r systematisk insamling av anv\u00e4ndarfeedback och agera p\u00e5 den.",
      ],
      keyPoints: [
        "M\u00e4t med KPI:er: \u00e4rendetid, n\u00f6jdhet, tillg\u00e4nglighet, kostnad",
        "\u00c5rliga f\u00f6rvaltningsrevisioner utv\u00e4rderar leverans och modell",
        "Anv\u00e4ndarfeedback \u00e4r den viktigaste kvalitetsindikatorn",
        "F\u00f6rvaltningen m\u00e5ste utvecklas i takt med verksamheten",
      ],
      reflectionQuestion:
        "Hur m\u00e4ter ni idag om f\u00f6rvaltningen fungerar bra \u2014 finns det definierade nyckeltal?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Course 5 — F\u00f6r\u00e4ndringsledning ADKAR (7 modules)                   */
/* ------------------------------------------------------------------ */

const forandringsledningAdkar: CourseData = {
  title: "F\u00f6r\u00e4ndringsledning ADKAR",
  icon: "repeat",
  description:
    "Prosci ADKAR-modellen steg f\u00f6r steg \u2014 Awareness, Desire, Knowledge, Ability, Reinforcement \u2014 med praktiska verktyg.",
  level: "Grundl\u00e4ggande",
  estimatedMinutes: 50,
  modules: [
    {
      title: "Varf\u00f6r f\u00f6r\u00e4ndringsledning?",
      content: [
        "Studier visar att projekt med effektiv f\u00f6r\u00e4ndringsledning har betydligt h\u00f6gre sannolikhet att n\u00e5 sina m\u00e5l. \u00c4nd\u00e5 \u00e4r f\u00f6r\u00e4ndringsledning det som oftast gl\u00f6ms bort n\u00e4r nya system upphandlas och implementeras.",
        "Motst\u00e5nd mot f\u00f6r\u00e4ndring \u00e4r naturligt. M\u00e4nniskor mots\u00e4tter sig inte f\u00f6r\u00e4ndring i sig \u2014 de mots\u00e4tter sig att bli f\u00f6r\u00e4ndrade. N\u00e4r ett nytt system inf\u00f6rs p\u00e5verkas arbetsrutiner, roller och kompetensbehov.",
        "F\u00f6r\u00e4ndringsledning handlar om att f\u00f6rbereda, utrusta och st\u00f6dja enskilda individer att framg\u00e5ngsrikt genomf\u00f6ra f\u00f6r\u00e4ndringen. Det \u00e4r en avg\u00f6rande framg\u00e5ngsfaktor som b\u00f6r planeras och budgeteras fr\u00e5n start.",
      ],
      keyPoints: [
        "Projekt med f\u00f6r\u00e4ndringsledning lyckas betydligt oftare",
        "Motst\u00e5nd mot f\u00f6r\u00e4ndring \u00e4r naturligt och m\u00e5ste hanteras proaktivt",
        "F\u00f6r\u00e4ndringsledning \u00e4r en kritisk framg\u00e5ngsfaktor, inte en mjuk fr\u00e5ga",
        "B\u00f6r planeras och budgeteras fr\u00e5n projektstart",
      ],
      reflectionQuestion:
        "T\u00e4nk p\u00e5 en f\u00f6r\u00e4ndring du upplevt \u2014 vad hade du beh\u00f6vt f\u00f6r att ta emot den b\u00e4ttre?",
    },
    {
      title: "ADKAR-modellen \u2014 \u00f6versikt",
      content: [
        "ADKAR \u00e4r en modell utvecklad av Prosci som beskriver de fem byggstenar varje individ m\u00e5ste passera f\u00f6r att en f\u00f6r\u00e4ndring ska lyckas: Awareness, Desire, Knowledge, Ability och Reinforcement.",
        "Modellens styrka \u00e4r att den fokuserar p\u00e5 individens resa. En organisation f\u00f6r\u00e4ndras n\u00e4mligen inte \u2014 det \u00e4r individerna som f\u00f6r\u00e4ndras, en i taget. Genom att f\u00f6rst\u00e5 var varje person befinner sig kan du rikta r\u00e4tt insats vid r\u00e4tt tidpunkt.",
        "ADKAR \u00e4r sekvensiell: du m\u00e5ste bygga varje steg i ordning. Det g\u00e5r inte att ge kunskap (K) om mottagaren inte f\u00f6rst\u00e5r varf\u00f6r f\u00f6r\u00e4ndringen beh\u00f6vs (A) och har vilja att delta (D). Att identifiera var blockeringen sitter \u00e4r nyckeln.",
      ],
      keyPoints: [
        "ADKAR: Awareness, Desire, Knowledge, Ability, Reinforcement",
        "Fokuserar p\u00e5 individens resa, inte organisationens",
        "Sekvensiell: varje steg m\u00e5ste byggas i ordning",
        "Identifiera var blockeringen sitter f\u00f6r r\u00e4tt insats",
      ],
      reflectionQuestion:
        "Om du t\u00e4nker p\u00e5 en p\u00e5g\u00e5ende f\u00f6r\u00e4ndring \u2014 var i ADKAR-trappan sitter de flesta medarbetarna?",
    },
    {
      title: "Awareness \u2014 skapa medvetenhet",
      content: [
        "Awareness handlar om att individen f\u00f6rst\u00e5r VARF\u00d6R f\u00f6r\u00e4ndringen beh\u00f6vs. Utan medvetenhet om behovet kommer medarbetare att ifr\u00e5gas\u00e4tta projektet och aktivt motarbeta implementeringen.",
        "Effektiv kommunikation besvarar tre nyckelfr\u00e5gor: Vad \u00e4r det f\u00f6r f\u00f6r\u00e4ndring? Varf\u00f6r g\u00f6r vi den nu? Vad \u00e4r risken med att INTE f\u00f6r\u00e4ndra? Var \u00e4rlig och transparent.",
        "Den viktigaste budb\u00e4raren \u00e4r den n\u00e4rmaste chefen, inte projektledaren eller VD. Forskning visar att medarbetare litar mest p\u00e5 sin n\u00e4rmaste chef n\u00e4r det g\u00e4ller hur f\u00f6r\u00e4ndringen p\u00e5verkar just dem.",
      ],
      keyPoints: [
        "Awareness = f\u00f6rst\u00e5else f\u00f6r VARF\u00d6R f\u00f6r\u00e4ndringen beh\u00f6vs",
        "Besvara: vad, varf\u00f6r nu, och vad h\u00e4nder om vi inte g\u00f6r det?",
        "N\u00e4rmaste chefen \u00e4r den viktigaste budb\u00e4raren",
        "Var \u00e4rlig \u2014 \u00f6verdrivna l\u00f6ften underminerar f\u00f6rtroendet",
      ],
      reflectionQuestion:
        "Hur brukar f\u00f6r\u00e4ndringar kommuniceras i din organisation \u2014 vet medarbetarna VARF\u00d6R, eller bara VAD?",
    },
    {
      title: "Desire \u2014 bygga vilja",
      content: [
        "Desire \u00e4r steget d\u00e4r individen g\u00e5r fr\u00e5n att f\u00f6rst\u00e5 behovet till att vilja delta. Det \u00e4r det sv\u00e5raste steget eftersom vilja inte kan tvingas fram \u2014 den m\u00e5ste byggas genom f\u00f6rtroende och delaktighet.",
        "F\u00f6r att bygga Desire beh\u00f6ver du f\u00f6rst\u00e5 vad som motiverar olika grupper. F\u00f6r anv\u00e4ndare kan det vara enklare arbetsvardag. F\u00f6r chefer kan det vara b\u00e4ttre uppf\u00f6ljning. Anpassa budskapet.",
        "Delaktighet \u00e4r den starkaste drivkraften. M\u00e4nniskor som f\u00e5r p\u00e5verka f\u00f6r\u00e4ndringen \u00e4r mer ben\u00e4gna att st\u00f6dja den. Involvera medarbetare i behovsanalysen och ge dem inflytande \u00f6ver implementeringsplanen.",
      ],
      keyPoints: [
        "Desire = personlig vilja att delta i f\u00f6r\u00e4ndringen",
        "Vilja kan inte tvingas \u2014 den byggs genom delaktighet och f\u00f6rtroende",
        "Anpassa budskapet efter vad som motiverar varje grupp",
        "Involvering \u00e4r den starkaste drivkraften",
      ],
      reflectionQuestion:
        "N\u00e4r k\u00e4nde du senast starkt motst\u00e5nd mot en f\u00f6r\u00e4ndring \u2014 vad hade kunnat \u00f6ka din vilja att delta?",
    },
    {
      title: "Knowledge \u2014 f\u00f6rmedla kunskap",
      content: [
        "Knowledge handlar om att ge individen de kunskaper som beh\u00f6vs f\u00f6r att genomf\u00f6ra f\u00f6r\u00e4ndringen. Det inkluderar b\u00e5de kunskapen om HUR man g\u00f6r och kunskapen om n\u00e4r och var man f\u00e5r hj\u00e4lp.",
        "Utbildning \u00e4r det vanligaste verktyget, men timing \u00e4r avg\u00f6rande. Utbildning som ges f\u00f6r tidigt gl\u00f6ms bort, utbildning som ges f\u00f6r sent skapar stress. Planera utbildningen s\u00e5 n\u00e4ra anv\u00e4ndning som m\u00f6jligt.",
        "Erbjud flera format: klassrumsutbildning, e-l\u00e4rande, l\u00e4rande-genom-att-g\u00f6ra. Komplettera med st\u00f6dmaterial: korta guider, FAQ och en tydlig supportkanal.",
      ],
      keyPoints: [
        "Knowledge = kunskap om HUR f\u00f6r\u00e4ndringen genomf\u00f6rs i praktiken",
        "Timing: utbildning s\u00e5 n\u00e4ra anv\u00e4ndning som m\u00f6jligt",
        "Erbjud flera utbildningsformat f\u00f6r olika l\u00e4rstilar",
        "St\u00f6dmaterial \u00e4r lika viktigt som sj\u00e4lva utbildningen",
      ],
      reflectionQuestion:
        "T\u00e4nk p\u00e5 senaste systembytet \u2014 fick du tillr\u00e4ckligt med utbildning och st\u00f6d, och kom det vid r\u00e4tt tidpunkt?",
    },
    {
      title: "Ability \u2014 utveckla f\u00f6rm\u00e5ga",
      content: [
        "Ability \u00e4r skillnaden mellan att veta hur man g\u00f6r n\u00e5got och att faktiskt kunna g\u00f6ra det. Att ha g\u00e5tt en utbildning inneb\u00e4r inte att man beh\u00e4rskar det nya arbetss\u00e4ttet \u2014 det kr\u00e4ver \u00f6vning och st\u00f6d.",
        "F\u00f6r att bygga Ability beh\u00f6vs \u00f6vningstillf\u00e4llen i s\u00e4ker milj\u00f6, coaching fr\u00e5n superanv\u00e4ndare, och acceptans f\u00f6r att det tar tid. Produktiviteten sjunker alltid tillf\u00e4lligt vid ett systembyte \u2014 planera f\u00f6r det.",
        "Superanv\u00e4ndare \u00e4r nyckelpersoner f\u00f6r Ability. De f\u00e5r extra utbildning och fungerar som lokalt st\u00f6d. Att ha en superanv\u00e4ndare i varje team s\u00e4nker tr\u00f6skeln f\u00f6r att fr\u00e5ga om hj\u00e4lp och snabbar p\u00e5 \u00f6verg\u00e5ngen.",
      ],
      keyPoints: [
        "Ability = att kunna g\u00f6ra det i praktiken, inte bara f\u00f6rst\u00e5 teorin",
        "Kr\u00e4ver: \u00f6vning, coaching, testmilj\u00f6 och tid",
        "Produktivitetsdipp \u00e4r normal \u2014 planera och kommunicera",
        "Superanv\u00e4ndare i varje team accelererar \u00f6verg\u00e5ngen",
      ],
      reflectionQuestion:
        "Hur l\u00e5ng tid tog det f\u00f6r dig att k\u00e4nna dig bekv\u00e4m med det senaste nya systemet du b\u00f6rjade anv\u00e4nda?",
    },
    {
      title: "Reinforcement \u2014 f\u00f6rankra f\u00f6r\u00e4ndringen",
      content: [
        "Reinforcement \u00e4r det sista och ofta mest f\u00f6rsummade steget. Det handlar om att s\u00e4kerst\u00e4lla att f\u00f6r\u00e4ndringen h\u00e5ller \u00f6ver tid och att m\u00e4nniskor inte faller tillbaka till gamla arbetss\u00e4tt.",
        "Verktyg f\u00f6r Reinforcement: fira framg\u00e5ngar, m\u00e4t och visa resultat (f\u00f6re/efter-j\u00e4mf\u00f6relser), ge \u00e5terkoppling, och hantera avvikelser snabbt och konstruktivt.",
        "Reinforcement b\u00f6r p\u00e5g\u00e5 i minst sex m\u00e5nader efter go-live. Ledningen m\u00e5ste visa att det nya arbetss\u00e4ttet g\u00e4ller, att st\u00f6d finns och att man lyssnar p\u00e5 problemen. H\u00e4r g\u00e5r f\u00f6r\u00e4ndringen fr\u00e5n projekt till ny vardag.",
      ],
      keyPoints: [
        "Reinforcement = s\u00e4kerst\u00e4lla att f\u00f6r\u00e4ndringen h\u00e5ller \u00f6ver tid",
        "Fira framg\u00e5ngar, visa resultat, ge \u00e5terkoppling",
        "Minst sex m\u00e5nader aktiv f\u00f6rankring efter go-live",
        "Ledningens engagemang \u00e4r avg\u00f6rande f\u00f6r l\u00e5ngsiktig framg\u00e5ng",
      ],
      reflectionQuestion:
        "Hur brukar f\u00f6r\u00e4ndringar f\u00f6rankras i din organisation efter go-live \u2014 finns det en plan eller tappar man fokus?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Course map                                                         */
/* ------------------------------------------------------------------ */

const COURSES: Record<string, CourseData> = {
  "upphandling-lou": upphandlingLou,
  kravhantering: kravhantering,
  formagabedomning: formagabedomning,
  systemforvaltning: systemforvaltning,
  "forandringsledning-adkar": forandringsledningAdkar,
};

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "critero-training-progress";

function loadProgress(courseId: string, moduleCount: number): boolean[] {
  if (typeof window === "undefined") return new Array(moduleCount).fill(false);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Array(moduleCount).fill(false);
    const data = JSON.parse(raw);
    const arr = data[courseId];
    if (Array.isArray(arr) && arr.length === moduleCount) return arr;
    return new Array(moduleCount).fill(false);
  } catch {
    return new Array(moduleCount).fill(false);
  }
}

function saveProgress(courseId: string, completed: boolean[]) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[courseId] = completed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/*  Level badge colour                                                 */
/* ------------------------------------------------------------------ */

function getLevelColor(level: string) {
  switch (level) {
    case "Grundl\u00e4ggande":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
    case "Medel":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    case "Avancerad":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = COURSES[courseId];

  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [completed, setCompleted] = useState<boolean[]>([]);

  useEffect(() => {
    if (!course) return;
    setCompleted(loadProgress(courseId, course.modules.length));
  }, [courseId, course]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="help-circle"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold">Kursen hittades inte</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kontrollera att l\u00e4nken \u00e4r korrekt.
          </p>
          <Link
            href="/training"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Icon name="arrow-left" size={14} />
            Tillbaka till utbildning
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = completed.filter(Boolean).length;
  const totalModules = course.modules.length;
  const progressPct =
    totalModules > 0
      ? Math.round((completedCount / totalModules) * 100)
      : 0;

  function toggleComplete(index: number) {
    setCompleted((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      saveProgress(courseId, next);
      return next;
    });
  }

  function toggleExpand(index: number) {
    setExpandedModule((prev) => (prev === index ? null : index));
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/60 bg-card/60">
        <div className="px-8 py-8">
          <nav className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Link
              href="/cases"
              className="hover:text-primary transition-colors duration-150"
            >
              Upphandlingar
            </Link>
            <span className="mx-0.5 text-border">/</span>
            <Link
              href="/training"
              className="hover:text-primary transition-colors duration-150"
            >
              Utbildning
            </Link>
            <span className="mx-0.5 text-border">/</span>
            <span className="text-foreground font-medium">{course.title}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Icon name={course.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {course.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {course.description}
              </p>
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <span
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getLevelColor(course.level)}`}
                >
                  {course.level}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="book-open" size={12} />
                  {totalModules} moduler
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="clock" size={12} />
                  ca {course.estimatedMinutes} min
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon
                    name="check-circle"
                    size={12}
                    className={
                      completedCount === totalModules ? "text-green-600" : ""
                    }
                  />
                  {completedCount}/{totalModules} klara
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Framsteg</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="px-8 py-6 max-w-4xl">
        <div className="space-y-3">
          {course.modules.map((mod, idx) => {
            const isExpanded = expandedModule === idx;
            const isDone = completed[idx] || false;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"
              >
                {/* Module header */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold shrink-0 ${
                      isDone
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isDone ? <Icon name="check" size={14} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">
                      {mod.title}
                    </span>
                  </div>
                  <Icon
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border/40">
                    {/* Content paragraphs */}
                    <div className="mt-4 space-y-3">
                      {mod.content.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Key points */}
                    <div className="mt-5">
                      <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                        <Icon
                          name="check-circle"
                          size={14}
                          className="text-primary"
                        />
                        Nyckelinsikter
                      </h4>
                      <ul className="space-y-1.5">
                        {mod.keyPoints.map((point, kIdx) => (
                          <li
                            key={kIdx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Icon
                              name="check"
                              size={14}
                              className="text-green-600 dark:text-green-400 shrink-0 mt-0.5"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reflection question */}
                    <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4">
                      <h4 className="text-xs font-semibold text-primary mb-1.5 flex items-center gap-1.5">
                        <Icon name="lightbulb" size={14} />
                        Reflektionsfr\u00e5ga
                      </h4>
                      <p className="text-sm text-foreground italic">
                        {mod.reflectionQuestion}
                      </p>
                    </div>

                    {/* Complete button */}
                    <div className="mt-4 flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(idx);
                        }}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDone
                            ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        <Icon
                          name={isDone ? "check-circle" : "circle-dot"}
                          size={14}
                        />
                        {isDone ? "Klar!" : "Markera som klar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom progress summary */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon
                name={
                  completedCount === totalModules ? "trophy" : "book-open-check"
                }
                size={20}
                className={
                  completedCount === totalModules
                    ? "text-amber-500"
                    : "text-primary"
                }
              />
              <span className="text-sm font-semibold text-foreground">
                {completedCount === totalModules
                  ? "Grattis! Du har slutf\u00f6rt alla moduler."
                  : `${completedCount} av ${totalModules} moduler klara`}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary">
              {progressPct}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Link
              href="/training"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="arrow-left" size={14} />
              Alla kurser
            </Link>
            {completedCount === totalModules && (
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                Alla moduler avklarade
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
