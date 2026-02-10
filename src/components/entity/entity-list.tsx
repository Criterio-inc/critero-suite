"use client";

import Link from "next/link";
import { StatusBadge, PriorityBadge, LevelBadge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import type { EntityMeta, FieldMeta } from "@/config/entity-meta";

interface EntityListProps {
  meta: EntityMeta;
  items: Record<string, unknown>[];
  caseId: string;
  basePath: string;
}

function renderCell(field: FieldMeta, value: unknown) {
  if (value === null || value === undefined || value === "") return "—";

  if (field.key === "status") return <StatusBadge status={String(value)} />;
  if (field.key === "priority") return <PriorityBadge priority={String(value)} />;
  if (field.key === "level") return <LevelBadge level={String(value)} />;
  if (field.key === "qualified") return value ? "Ja" : "Nej";
  if (field.key === "score") return <span className="font-mono">{String(value)}</span>;

  if (field.type === "select") {
    const opt = field.options?.find((o) => o.value === value);
    return opt?.label ?? String(value);
  }

  return String(value);
}

export function EntityList({ meta, items, caseId, basePath }: EntityListProps) {
  const visibleFields = meta.fields.filter((f) => meta.listFields.includes(f.key));

  if (items.length === 0) {
    return (
      <EmptyState
        icon={meta.icon}
        title={`Inga ${meta.pluralLabel.toLowerCase()}`}
        description={`Skapa ${meta.singularLabel.toLowerCase()} för att komma igång.`}
        action={
          <Link href={`${basePath}/new`}>
            <Button>Ny {meta.singularLabel.toLowerCase()}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">ID</TableHead>
          {visibleFields.map((f) => (
            <TableHead key={f.key}>{f.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={String(item.id)}>
            <TableCell className="font-mono text-xs">{String(item.id)}</TableCell>
            {visibleFields.map((f, i) => (
              <TableCell key={f.key}>
                {i === 0 ? (
                  <Link
                    href={`${basePath}/${item.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {renderCell(f, item[f.key])}
                  </Link>
                ) : (
                  renderCell(f, item[f.key])
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
