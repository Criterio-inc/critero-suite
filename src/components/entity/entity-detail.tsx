"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, PriorityBadge, LevelBadge } from "@/components/ui/badge";
import type { EntityMeta, FieldMeta } from "@/config/entity-meta";
import { formatDateTime } from "@/lib/utils";

interface EntityDetailProps {
  meta: EntityMeta;
  item: Record<string, unknown>;
  editUrl: string;
  deleteUrl: string;
  backUrl: string;
}

function DetailValue({ field, value }: { field: FieldMeta; value: unknown }) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground">—</span>;
  }

  if (field.key === "status") return <StatusBadge status={String(value)} />;
  if (field.key === "priority") return <PriorityBadge priority={String(value)} />;
  if (field.key === "level") return <LevelBadge level={String(value)} />;
  if (field.key === "qualified") return <span>{value ? "Ja" : "Nej"}</span>;

  if (field.type === "select") {
    const opt = field.options?.find((o) => o.value === value);
    return <span>{opt?.label ?? String(value)}</span>;
  }

  if (field.type === "json") {
    let parsed = value;
    if (typeof value === "string") {
      try {
        parsed = JSON.parse(value);
      } catch {
        return <span className="font-mono text-xs">{String(value)}</span>;
      }
    }
    if (Array.isArray(parsed) && parsed.length === 0) {
      return <span className="text-muted-foreground">—</span>;
    }
    if (typeof parsed === "object" && parsed !== null && Object.keys(parsed as object).length === 0) {
      return <span className="text-muted-foreground">—</span>;
    }
    return (
      <pre className="rounded bg-muted p-2 text-xs font-mono overflow-auto max-h-40">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  }

  if (field.type === "textarea") {
    return <p className="whitespace-pre-wrap text-sm">{String(value)}</p>;
  }

  return <span>{String(value)}</span>;
}

export function EntityDetail({ meta, item, editUrl, deleteUrl, backUrl }: EntityDetailProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Ta bort ${meta.singularLabel.toLowerCase()} ${item.id}?`)) return;
    setDeleting(true);

    const res = await fetch(deleteUrl, { method: "DELETE" });
    if (res.ok) {
      router.push(backUrl);
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => router.push(editUrl)}>
          Redigera
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Tar bort..." : "Ta bort"}
        </Button>
      </div>

      <Card>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">ID</dt>
              <dd className="font-mono text-sm">{String(item.id)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Version</dt>
              <dd className="text-sm">{String(item.version ?? 1)}</dd>
            </div>
            {meta.fields.map((field) => (
              <div key={field.key}>
                <dt className="text-xs font-medium text-muted-foreground">{field.label}</dt>
                <dd className="mt-0.5">
                  <DetailValue field={field} value={item[field.key]} />
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Skapad</dt>
              <dd className="text-sm text-muted-foreground">{formatDateTime(item.createdAt as string)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Uppdaterad</dt>
              <dd className="text-sm text-muted-foreground">{formatDateTime(item.updatedAt as string)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
