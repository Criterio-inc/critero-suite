"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AddTraceLinkDialog } from "./add-trace-link-dialog";

interface TraceLink {
  id: string;
  fromType: string;
  fromId: string;
  toType: string;
  toId: string;
  relation: string;
  note: string;
}

const RELATION_LABELS: Record<string, string> = {
  addresses: "Adresserar",
  derives_from: "Härledd från",
  evaluated_by: "Utvärderas av",
  mitigated_by: "Mitigeras av",
  validated_by: "Valideras av",
  depends_on: "Beror på",
  explains: "Förklaras av",
};

const TYPE_LABELS: Record<string, string> = {
  need: "Behov",
  risk: "Risk",
  requirement: "Krav",
  criterion: "Kriterium",
  workshop: "Workshop",
  decision: "Beslut",
  evidence: "Evidens",
  bid: "Anbud",
};

interface TraceLinksPanelProps {
  caseId: string;
  entityId: string;
  entityType: string;
}

export function TraceLinksPanel({ caseId, entityId, entityType }: TraceLinksPanelProps) {
  const [links, setLinks] = useState<TraceLink[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchLinks() {
    const res = await fetch(`/api/cases/${caseId}/trace-links?entityId=${entityId}`);
    if (res.ok) {
      setLinks(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchLinks();
  }, [caseId, entityId]);

  async function handleDelete(linkId: string) {
    if (!confirm("Ta bort spårbarhetslänk?")) return;
    await fetch(`/api/cases/${caseId}/trace-links/${linkId}`, { method: "DELETE" });
    fetchLinks();
  }

  const outgoing = links.filter((l) => l.fromId === entityId);
  const incoming = links.filter((l) => l.toId === entityId);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-base">Spårbarhet</CardTitle>
          <Button size="sm" variant="outline" onClick={() => setShowDialog(true)}>
            Lägg till länk
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Laddar...</p>
        ) : links.length === 0 ? (
          <p className="text-sm text-muted-foreground">Inga spårbarhetslänkar.</p>
        ) : (
          <div className="space-y-3">
            {outgoing.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Utgående</h4>
                {outgoing.map((link) => (
                  <div key={link.id} className="flex items-center gap-2 text-sm py-1">
                    <span className="text-muted-foreground">{RELATION_LABELS[link.relation] ?? link.relation}</span>
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{link.toId}</span>
                    <span className="text-xs text-muted-foreground">({TYPE_LABELS[link.toType] ?? link.toType})</span>
                    {link.note && <span className="text-xs text-muted-foreground">— {link.note}</span>}
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="ml-auto text-xs text-destructive hover:underline"
                    >
                      Ta bort
                    </button>
                  </div>
                ))}
              </div>
            )}
            {incoming.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">Inkommande</h4>
                {incoming.map((link) => (
                  <div key={link.id} className="flex items-center gap-2 text-sm py-1">
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{link.fromId}</span>
                    <span className="text-xs text-muted-foreground">({TYPE_LABELS[link.fromType] ?? link.fromType})</span>
                    <span className="text-muted-foreground">{RELATION_LABELS[link.relation] ?? link.relation}</span>
                    {link.note && <span className="text-xs text-muted-foreground">— {link.note}</span>}
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="ml-auto text-xs text-destructive hover:underline"
                    >
                      Ta bort
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showDialog && (
          <AddTraceLinkDialog
            caseId={caseId}
            fromId={entityId}
            fromType={entityType}
            onClose={() => setShowDialog(false)}
            onCreated={() => {
              setShowDialog(false);
              fetchLinks();
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
