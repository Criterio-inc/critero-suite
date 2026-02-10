"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select } from "@/components/ui/select";
import type { FieldMeta } from "@/config/entity-meta";

interface FilterBarProps {
  filters: FieldMeta[];
  clusterOptions?: string[];
}

export function FilterBar({ filters, clusterOptions }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((field) => {
        let options = field.options ?? [];

        if (field.key === "cluster" && clusterOptions) {
          options = clusterOptions.map((c) => ({ value: c, label: c }));
        }

        return (
          <div key={field.key} className="min-w-[140px]">
            <Select
              id={`filter-${field.key}`}
              options={[{ value: "", label: `Alla ${field.label.toLowerCase()}` }, ...options]}
              value={searchParams.get(field.key) ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        );
      })}
    </div>
  );
}
