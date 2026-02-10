export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("sv-SE");
}

export function formatDateTime(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("sv-SE");
}

export function parseJsonArray(json: string | null): string[] {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export function parseJsonObject<T = Record<string, unknown>>(json: string | null): T {
  if (!json) return {} as T;
  try {
    return JSON.parse(json);
  } catch {
    return {} as T;
  }
}

export function toJsonString(value: unknown): string {
  return JSON.stringify(value);
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const STATUS_LABELS: Record<string, string> = {
  draft: "Utkast",
  in_review: "Under granskning",
  approved: "Godkänd",
  locked: "Låst",
  archived: "Arkiverad",
};

export const PRIORITY_LABELS: Record<string, string> = {
  P1: "P1 - Kritisk",
  P2: "P2 - Viktig",
  P3: "P3 - Önskvärd",
};

export const LEVEL_LABELS: Record<string, string> = {
  SKA: "SKA (obligatoriskt)",
  BOR: "BÖR (önskvärt)",
};
