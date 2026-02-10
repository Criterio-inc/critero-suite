"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { EntityMeta, FieldMeta } from "@/config/entity-meta";
import { parseJsonArray, parseJsonObject } from "@/lib/utils";

interface EntityFormProps {
  meta: EntityMeta;
  apiUrl: string;
  returnUrl: string;
  initialData?: Record<string, unknown>;
  isEdit?: boolean;
  clusterOptions?: string[];
}

function FieldRenderer({
  field,
  defaultValue,
  clusterOptions,
}: {
  field: FieldMeta;
  defaultValue: unknown;
  clusterOptions?: string[];
}) {
  const id = field.key;

  // Handle cluster field with dynamic options from profile
  if (field.key === "cluster" && clusterOptions && clusterOptions.length > 0) {
    const options = clusterOptions.map((c) => ({ value: c, label: c }));
    return (
      <Select
        id={id}
        name={id}
        label={field.label}
        options={options}
        defaultValue={String(defaultValue ?? "")}
        placeholder="Välj kluster..."
      />
    );
  }

  switch (field.type) {
    case "text":
      return (
        <Input
          id={id}
          name={id}
          label={field.label}
          required={field.required}
          defaultValue={String(defaultValue ?? "")}
          placeholder={field.placeholder}
        />
      );
    case "number":
      return (
        <Input
          id={id}
          name={id}
          label={field.label}
          type="number"
          required={field.required}
          defaultValue={defaultValue != null ? String(defaultValue) : ""}
          placeholder={field.placeholder}
        />
      );
    case "textarea":
      return (
        <Textarea
          id={id}
          name={id}
          label={field.label}
          required={field.required}
          defaultValue={String(defaultValue ?? "")}
          placeholder={field.placeholder}
        />
      );
    case "select":
      return (
        <Select
          id={id}
          name={id}
          label={field.label}
          options={field.options ?? []}
          defaultValue={String(defaultValue ?? "")}
          placeholder={field.placeholder}
        />
      );
    case "boolean":
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            type="checkbox"
            id={id}
            name={id}
            defaultChecked={Boolean(defaultValue)}
            className="h-4 w-4 rounded border-border"
          />
        </div>
      );
    case "date":
      return (
        <Input
          id={id}
          name={id}
          label={field.label}
          type="date"
          defaultValue={String(defaultValue ?? "")}
        />
      );
    case "json":
      return (
        <Textarea
          id={id}
          name={id}
          label={field.label}
          defaultValue={
            typeof defaultValue === "string"
              ? defaultValue
              : JSON.stringify(defaultValue ?? [], null, 2)
          }
          placeholder="JSON-format"
          className="font-mono text-xs"
        />
      );
    case "file":
      return (
        <div className="space-y-1">
          <label className="block text-sm font-medium">{field.label}</label>
          <input type="file" id={id} name={id} className="text-sm" />
          {defaultValue ? <p className="text-xs text-muted-foreground">{String(defaultValue)}</p> : null}
        </div>
      );
    default:
      return (
        <Input
          id={id}
          name={id}
          label={field.label}
          defaultValue={String(defaultValue ?? "")}
        />
      );
  }
}

export function EntityForm({
  meta,
  apiUrl,
  returnUrl,
  initialData,
  isEdit,
  clusterOptions,
}: EntityFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Filter out non-editable fields
  const editableFields = meta.fields.filter(
    (f) => f.key !== "score" // auto-calculated
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};

    for (const field of editableFields) {
      const value = form.get(field.key);

      if (field.type === "boolean") {
        body[field.key] = form.has(field.key);
      } else if (field.type === "number") {
        body[field.key] = value ? Number(value) : 0;
      } else if (field.type === "json") {
        try {
          body[field.key] = value ? JSON.parse(String(value)) : [];
        } catch {
          body[field.key] = String(value ?? "");
        }
      } else if (field.type === "file") {
        // File upload handled separately
        continue;
      } else {
        body[field.key] = String(value ?? "");
      }
    }

    const res = await fetch(apiUrl, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push(returnUrl);
      router.refresh();
    } else {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {editableFields.map((field) => {
            let defaultValue = initialData?.[field.key];
            // Parse JSON strings from DB
            if (field.type === "json" && typeof defaultValue === "string") {
              try {
                defaultValue = JSON.parse(defaultValue);
              } catch {
                // leave as string
              }
            }
            return (
              <FieldRenderer
                key={field.key}
                field={field}
                defaultValue={defaultValue}
                clusterOptions={field.key === "cluster" ? clusterOptions : undefined}
              />
            );
          })}
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Sparar..." : isEdit ? "Spara" : `Skapa ${meta.singularLabel.toLowerCase()}`}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Avbryt
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
