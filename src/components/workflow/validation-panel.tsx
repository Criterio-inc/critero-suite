"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { ValidationWarning } from "@/lib/validation";

export function ValidationPanel({ caseId }: { caseId: string }) {
  const [warnings, setWarnings] = useState<ValidationWarning[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/cases/${caseId}/validate`)
      .then((r) => r.json())
      .then((data) => {
        setWarnings(data);
        setLoading(false);
      });
  }, [caseId]);

  if (loading) return <p className="text-sm text-muted-foreground p-4">Validerar...</p>;
  if (warnings.length === 0) return null;

  const byEntity = warnings.reduce<Record<string, ValidationWarning[]>>((acc, w) => {
    const key = w.entityType;
    if (!acc[key]) acc[key] = [];
    acc[key].push(w);
    return acc;
  }, {});

  return (
    <Card>
      <CardContent>
        <CardTitle className="mb-3 flex items-center gap-2">
          <span className="text-yellow-600">&#9888;</span>
          Valideringsvarningar ({warnings.length})
        </CardTitle>
        <div className="space-y-3">
          {Object.entries(byEntity).map(([type, items]) => (
            <div key={type}>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                {type}
              </h4>
              <div className="space-y-1">
                {items.map((w, i) => (
                  <div key={`${w.entityId}-${w.field}-${i}`} className="flex items-start gap-2 text-sm">
                    <span className={w.severity === "warning" ? "text-yellow-600" : "text-blue-500"}>
                      {w.severity === "warning" ? "&#9888;" : "&#8505;"}
                    </span>
                    <div>
                      <span className="font-medium">{w.entityTitle}</span>
                      <span className="text-muted-foreground"> — {w.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
