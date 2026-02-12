"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/**
 * Maps entity types to the library item types that can help populate them.
 */
const ENTITY_LIBRARY_MAP: Record<string, { libraryType: string; typeLabel: string; description: string }[]> = {
  need: [
    { libraryType: "workshop_template", typeLabel: "Workshopmallar", description: "Genomför en behovsworkshop med färdig agenda och deltagarlista" },
  ],
  requirement: [
    { libraryType: "requirement_block", typeLabel: "Kravblock", description: "Importera färdiga, branschanpassade kravpaket med SKA/BÖR-krav" },
  ],
  risk: [
    { libraryType: "risk_template", typeLabel: "Riskmallar", description: "Utgå från beprövade riskmallar med sannolikhet, konsekvens och åtgärdsförslag" },
  ],
  criterion: [
    { libraryType: "criteria_block", typeLabel: "Kriterieblock", description: "Importera utvärderingskriterier med vikter, skalor och poängankare" },
  ],
  workshop: [
    { libraryType: "workshop_template", typeLabel: "Workshopmallar", description: "Använd färdiga workshopmallar med agenda, deltagare och förväntade resultat" },
  ],
};

interface LibrarySuggestionsProps {
  entityType: string;
  itemCount: number;
  caseId: string;
}

interface LibraryPreview {
  type: string;
  count: number;
  titles: string[];
}

export function LibrarySuggestions({ entityType, itemCount, caseId }: LibrarySuggestionsProps) {
  const mappings = ENTITY_LIBRARY_MAP[entityType];
  const [previews, setPreviews] = useState<LibraryPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Only show when there are few items (≤3) and relevant library types exist
  const shouldShow = mappings && mappings.length > 0 && itemCount <= 3 && !dismissed;

  useEffect(() => {
    if (!shouldShow || !mappings) {
      setLoading(false);
      return;
    }

    // Fetch library item counts per type
    Promise.all(
      mappings.map(async (m) => {
        const res = await fetch(`/api/library?type=${m.libraryType}`);
        if (!res.ok) return { type: m.libraryType, count: 0, titles: [] };
        const data: { title: string }[] = await res.json();
        return {
          type: m.libraryType,
          count: data.length,
          titles: data.slice(0, 3).map((item) => item.title),
        };
      })
    ).then((results) => {
      setPreviews(results.filter((r) => r.count > 0));
      setLoading(false);
    });
  }, [shouldShow, mappings]);

  if (!shouldShow || loading || previews.length === 0) return null;

  return (
    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon name="library" size={18} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">Föreslagna mallar från biblioteket</div>
            <div className="text-xs text-muted-foreground">
              Spara tid genom att importera färdiga mallar istället för att börja från noll
            </div>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground/50 hover:text-muted-foreground text-sm px-2 transition-colors"
          title="Dölj förslag"
        >
          <Icon name="x" size={14} />
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {mappings.map((mapping) => {
          const preview = previews.find((p) => p.type === mapping.libraryType);
          if (!preview) return null;
          return (
            <div key={mapping.libraryType} className="bg-card border border-border/60 rounded-xl p-3.5 shadow-sm">
              <div className="text-xs font-semibold text-foreground mb-1">{mapping.typeLabel} ({preview.count} st)</div>
              <p className="text-xs text-muted-foreground mb-2">{mapping.description}</p>
              {preview.titles.length > 0 && (
                <ul className="text-xs text-muted-foreground mb-2 space-y-0.5">
                  {preview.titles.map((t) => (
                    <li key={t} className="flex items-center gap-1.5 truncate">
                      <span className="text-primary/60">•</span>
                      <span className="truncate">{t}</span>
                    </li>
                  ))}
                  {preview.count > 3 && (
                    <li className="text-primary text-[11px]">...och {preview.count - 3} till</li>
                  )}
                </ul>
              )}
              <Link
                href={`/library/${mapping.libraryType}?caseId=${caseId}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-medium transition-colors"
              >
                Visa i biblioteket →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
