"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface Criterion {
  id: string;
  title: string;
  weight: number;
  scale: string;
  scoringGuidance: string;
  anchors: string;
}

interface BidScoresFormProps {
  caseId: string;
  bidId: string;
  criteria: Criterion[];
  existingScores: Record<string, unknown>[];
}

function parseAnchors(anchorsStr: string): Record<string, string> {
  try {
    const parsed = JSON.parse(anchorsStr);
    if (Array.isArray(parsed)) {
      // array of {key, value} or simple strings
      const obj: Record<string, string> = {};
      for (const item of parsed) {
        if (typeof item === "object" && item.key) {
          obj[item.key] = item.value ?? "";
        }
      }
      return obj;
    }
    if (typeof parsed === "object" && parsed !== null) return parsed;
  } catch {
    // ignore
  }
  return {};
}

export function BidScoresForm({ caseId, bidId, criteria, existingScores }: BidScoresFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Build initial state
  const scoreMap = new Map<string, { rawScore: number; justification: string; scorer: string }>();
  for (const s of existingScores) {
    scoreMap.set(String(s.criterionId), {
      rawScore: Number(s.rawScore) || 0,
      justification: String(s.justification || ""),
      scorer: String(s.scorer || ""),
    });
  }

  const [scores, setScores] = useState(scoreMap);

  function getScore(critId: string) {
    return scores.get(critId) ?? { rawScore: 0, justification: "", scorer: "" };
  }

  function updateScore(critId: string, field: string, value: string | number) {
    setScores((prev) => {
      const next = new Map(prev);
      const current = next.get(critId) ?? { rawScore: 0, justification: "", scorer: "" };
      next.set(critId, { ...current, [field]: value });
      return next;
    });
  }

  // Total weight
  const totalWeight = useMemo(() => criteria.reduce((sum, c) => sum + c.weight, 0), [criteria]);

  // Weighted total score
  const weightedTotal = useMemo(() => {
    let total = 0;
    for (const crit of criteria) {
      const s = getScore(crit.id);
      const maxScale = crit.scale === "0-10" ? 10 : 5;
      total += (s.rawScore / maxScale) * crit.weight;
    }
    return Math.round(total * 100) / 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria, scores]);

  async function handleSave() {
    setLoading(true);
    setSaved(false);

    const payload = criteria.map((crit) => {
      const s = getScore(crit.id);
      return {
        criterionId: crit.id,
        rawScore: s.rawScore,
        justification: s.justification,
        scorer: s.scorer,
      };
    });

    const res = await fetch(`/api/cases/${caseId}/bids/${bidId}/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{criteria.length} kriterier</span>
        <span>•</span>
        <span>Total vikt: {totalWeight}%</span>
        <span>•</span>
        <span className="text-foreground font-medium">
          Viktat poäng: {weightedTotal}
        </span>
      </div>

      {/* Criteria */}
      {criteria.map((crit) => {
        const s = getScore(crit.id);
        const maxScale = crit.scale === "0-10" ? 10 : 5;
        const anchors = parseAnchors(crit.anchors);

        return (
          <Card key={crit.id}>
            <CardContent>
              <div className="space-y-3">
                {/* Criterion header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{crit.id}</span>
                      <span className="font-medium text-sm">{crit.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Vikt: {crit.weight}% · Skala: {crit.scale}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {s.rawScore}/{maxScale}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Viktat: {Math.round((s.rawScore / maxScale) * crit.weight * 100) / 100}
                    </div>
                  </div>
                </div>

                {/* Scoring guidance */}
                {crit.scoringGuidance && (
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2 flex items-start gap-1.5">
                    <Lightbulb size={14} className="shrink-0 mt-0.5" /> {crit.scoringGuidance}
                  </div>
                )}

                {/* Anchors */}
                {Object.keys(anchors).length > 0 && (
                  <div className="text-xs space-y-1">
                    <span className="font-medium text-muted-foreground">Poängankare:</span>
                    {Object.entries(anchors).map(([key, desc]) => (
                      <div key={key} className="flex gap-2 text-muted-foreground">
                        <span className="font-mono shrink-0">{key}p:</span>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Score slider + input */}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-12">Poäng:</span>
                  <input
                    type="range"
                    min={0}
                    max={maxScale}
                    step={1}
                    value={s.rawScore}
                    onChange={(e) => updateScore(crit.id, "rawScore", Number(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <input
                    type="number"
                    min={0}
                    max={maxScale}
                    value={s.rawScore}
                    onChange={(e) => updateScore(crit.id, "rawScore", Math.min(maxScale, Math.max(0, Number(e.target.value))))}
                    className="w-16 rounded-md border border-border bg-background px-2 py-1 text-sm text-center font-mono"
                  />
                </div>

                {/* Justification */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Motivering (obligatorisk)
                  </label>
                  <textarea
                    value={s.justification}
                    onChange={(e) => updateScore(crit.id, "justification", e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Varför detta poäng? Referera till anbudets svar..."
                  />
                </div>

                {/* Scorer */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">
                    Bedömare
                  </label>
                  <input
                    type="text"
                    value={s.scorer}
                    onChange={(e) => updateScore(crit.id, "scorer", e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Namn på bedömare..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Save button */}
      <div className="flex items-center gap-3 sticky bottom-4 bg-background/95 backdrop-blur py-3 px-4 -mx-4 border-t border-border">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Sparar..." : "Spara poängsättning"}
        </Button>
        {saved && <span className="text-sm text-green-600">Sparat!</span>}
        <span className="ml-auto text-sm font-medium">
          Viktat totalpoäng: <span className="text-primary">{weightedTotal}</span>
        </span>
      </div>
    </div>
  );
}
