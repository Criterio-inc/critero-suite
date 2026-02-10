"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { PhaseStatus } from "@/types/workflow";

interface GateChecklistProps {
  caseId: string;
}

export function GateChecklist({ caseId }: GateChecklistProps) {
  const [phases, setPhases] = useState<PhaseStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cases/${caseId}/gates`)
      .then((r) => r.json())
      .then((data) => {
        setPhases(data);
        setLoading(false);
      });
  }, [caseId]);

  if (loading) return <p className="text-sm text-muted-foreground p-4">Utvärderar gates...</p>;

  return (
    <div className="space-y-4">
      {phases.map((phase) => (
        <Card key={phase.phaseId}>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-base">{phase.label}</CardTitle>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    phase.allBlockersPassed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {phase.completionPercent}%
                </span>
              </div>
            </div>
            {phase.gateResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">Inga gates för denna fas.</p>
            ) : (
              <div className="space-y-1.5">
                {phase.gateResults.map((gate) => (
                  <div key={gate.ruleId} className="flex items-center gap-2 text-sm">
                    <span className={gate.passed ? "text-green-600" : gate.severity === "blocker" ? "text-red-600" : "text-yellow-600"}>
                      {gate.passed ? "✓" : gate.severity === "blocker" ? "✗" : "⚠"}
                    </span>
                    <span className={gate.passed ? "text-muted-foreground" : ""}>{gate.label}</span>
                    {gate.actual !== undefined && !gate.passed && (
                      <span className="text-xs text-muted-foreground ml-auto">({String(gate.actual)})</span>
                    )}
                    {gate.severity === "warning" && !gate.passed && (
                      <span className="text-xs text-yellow-600 ml-1">(varning)</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
