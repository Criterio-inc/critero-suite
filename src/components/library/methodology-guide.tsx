"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type GuideType = "workshop" | "risk" | "requirement" | "criterion";

const GUIDES: Record<GuideType, { title: string; icon: string; steps: { label: string; description: string }[]; tips: string[] }> = {
  workshop: {
    title: "Så arbetar du med workshops",
    icon: "presentation",
    steps: [
      { label: "Förbered", description: "Välj mall från biblioteket, bjud in relevanta deltagare, skicka förberedelseunderlag 3-5 dagar innan." },
      { label: "Genomför", description: "Följ agendans struktur. Använd Sparkboard för digital brainstorming. Dokumentera löpande." },
      { label: "Efterarbete", description: "Sammanställ resultat inom 48h. Skapa behov, krav eller risker direkt i systemet baserat på workshopens output." },
    ],
    tips: [
      "Boka 3h minimum — kortare workshops ger ytliga resultat",
      "Ha alltid en facilitator som INTE är sakägare",
      "Dokumentera i realtid — vänta inte till efteråt",
      "Använd Sparkboard för tysta brainstorming-moment så alla hörs",
    ],
  },
  risk: {
    title: "Så arbetar du med risker",
    icon: "shield-alert",
    steps: [
      { label: "Identifiera", description: "Använd riskmallar från biblioteket som utgångspunkt. Komplettera med projektspecifika risker i en riskworkshop." },
      { label: "Bedöm", description: "Bedöm sannolikhet (1-5) och konsekvens (1-5) för varje risk. Riskvärde = sannolikhet × konsekvens." },
      { label: "Åtgärda", description: "Välj strategi: Undvik (eliminera orsaken), Minska (reducera sannolikhet/konsekvens), Överför (försäkring/avtal) eller Acceptera." },
      { label: "Följ upp", description: "Granska riskregistret vid varje styrgruppsmöte. Uppdatera bedömning och status. Eskalera vid behov." },
    ],
    tips: [
      "Fokusera på de 5-10 viktigaste riskerna — inte alla tänkbara",
      "Koppla risker till krav för spårbarhet",
      "Riskägaren ska vara den som faktiskt kan påverka risken",
      "Uppdatera riskregistret löpande — inte bara vid workshops",
    ],
  },
  requirement: {
    title: "Så arbetar du med krav",
    icon: "ruler",
    steps: [
      { label: "Behov → Krav", description: "Utgå alltid från dokumenterade behov. Varje krav ska kunna spåras till minst ett behov." },
      { label: "Formulera kravtext", description: "SKA-krav: absoluta, verifierbara, binära (uppfyllt/ej). BÖR-krav: utvärderas och poängsätts." },
      { label: "Verifiera", description: "Ange hur varje SKA-krav ska verifieras (demo, intyg, referens, test). Krav utan verifieringsmetod är svåra att utvärdera." },
      { label: "Proportionalitet", description: "Granska om varje SKA-krav är proportionerligt. Kan det utesluta lämpliga leverantörer i onödan? Överväg BÖR istället." },
    ],
    tips: [
      "SKA-krav som ingen leverantör uppfyller = misslyckad upphandling",
      "Marknadsdialog (RFI) hjälper kalibrera kravnivån",
      "Max 40-60 krav totalt — fler gör utvärdering ohantlerlig",
      "Skriv krav som beskriver VAD, inte HUR",
    ],
  },
  criterion: {
    title: "Så arbetar du med utvärderingskriterier",
    icon: "scale",
    steps: [
      { label: "Definiera", description: "Skapa kriterier som utvärderar BÖR-krav och kvalitativa aspekter. SKA-krav utvärderas binärt — de ska inte vara kriterier." },
      { label: "Vikta", description: "Fördela 100% mellan kriterierna. Pris brukar vara 30-50%. Vikter ska spegla vad som verkligen är viktigt för verksamheten." },
      { label: "Poängankare", description: "Skriv tydliga beskrivningar för varje poängnivå (0-5). Ankare säkerställer att bedömare tolkar skalan lika." },
      { label: "Testa", description: "Testa utvärderingsmodellen med fiktiva anbud. Ger modellen rimliga resultat? Diskriminerar den mellan bra och dåliga anbud?" },
    ],
    tips: [
      "3-5 kriterier är optimalt — fler ger inte bättre resultat",
      "Vikterna måste summera till exakt 100%",
      "Poängankare är det viktigaste för rättssäker utvärdering",
      "Koppla varje kriterium till minst ett BÖR-krav",
    ],
  },
};

export function MethodologyGuide({ type }: { type: GuideType }) {
  const [open, setOpen] = useState(false);
  const guide = GUIDES[type];

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-accent/30 transition-colors duration-150"
      >
        <div className="flex items-center gap-2.5">
          <Icon name={guide.icon} size={16} />
          <span className="text-sm font-medium text-foreground">{guide.title}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {open ? "▲ Dölj" : "▼ Visa metodstöd"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border/40">
          {/* Steps */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            {guide.steps.map((step, i) => (
              <div key={i} className="flex-1 flex items-start gap-2.5">
                <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-primary/10 text-primary">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="rounded-xl bg-secondary/50 p-3">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Praktiska tips
            </p>
            <ul className="space-y-1">
              {guide.tips.map((tip, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">
                    <Icon name="lightbulb" size={12} className="text-yellow-500" />
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
