import fs from "fs";
import path from "path";

/* ------------------------------------------------------------------ */
/*  Feature keys                                                       */
/* ------------------------------------------------------------------ */

export type FeatureKey =
  | "tools.benefit-calculator"
  | "tools.risk-matrix"
  | "tools.evaluation-model"
  | "tools.timeline-planner"
  | "tools.stakeholder-map"
  | "tools.kunskapsbank"
  | "training";

/** Features that are always active and cannot be toggled off */
export const ALWAYS_ON = ["cases", "library"] as const;

/** Human-readable labels for each toggleable feature */
export const FEATURE_LABELS: Record<FeatureKey, string> = {
  "tools.benefit-calculator": "Nyttokalkyl",
  "tools.risk-matrix": "Riskmatris",
  "tools.evaluation-model": "Utvärderingsmodell",
  "tools.timeline-planner": "Tidslinjeplanerare",
  "tools.stakeholder-map": "Intressentanalys",
  "tools.kunskapsbank": "Kunskapsbank",
  training: "Utbildning",
};

/** Icon names matching the sidebar icon for each feature */
export const FEATURE_ICONS: Record<FeatureKey, string> = {
  "tools.benefit-calculator": "calculator",
  "tools.risk-matrix": "shield-alert",
  "tools.evaluation-model": "scale",
  "tools.timeline-planner": "clock",
  "tools.stakeholder-map": "users",
  "tools.kunskapsbank": "book-open",
  training: "graduation-cap",
};

/** Ordered list of all feature keys for consistent UI rendering */
export const ALL_FEATURE_KEYS: FeatureKey[] = [
  "tools.benefit-calculator",
  "tools.risk-matrix",
  "tools.evaluation-model",
  "tools.timeline-planner",
  "tools.stakeholder-map",
  "tools.kunskapsbank",
  "training",
];

/* ------------------------------------------------------------------ */
/*  Server-side helpers (read/write feature-config.json)               */
/* ------------------------------------------------------------------ */

interface FeatureConfig {
  features: Record<string, boolean>;
}

const CONFIG_PATH = path.join(process.cwd(), "feature-config.json");

/** Read feature flags from disk. Returns all keys as true if file missing. */
export function getFeatures(): Record<FeatureKey, boolean> {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    const config: FeatureConfig = JSON.parse(raw);
    // Ensure every known key has a value (default true for new keys)
    const result = {} as Record<FeatureKey, boolean>;
    for (const key of ALL_FEATURE_KEYS) {
      result[key] = config.features[key] ?? true;
    }
    return result;
  } catch {
    // If file doesn't exist or is invalid, all features are enabled
    const result = {} as Record<FeatureKey, boolean>;
    for (const key of ALL_FEATURE_KEYS) {
      result[key] = true;
    }
    return result;
  }
}

/** Check if a specific feature is enabled */
export function isFeatureEnabled(key: FeatureKey): boolean {
  return getFeatures()[key];
}

/** Write updated feature flags to disk */
export function saveFeatures(features: Record<string, boolean>): void {
  const config: FeatureConfig = { features: {} };
  for (const key of ALL_FEATURE_KEYS) {
    config.features[key] = features[key] ?? true;
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

/** Map a route path to its feature key (if any). Returns undefined for always-on routes. */
export function routeToFeatureKey(pathname: string): FeatureKey | undefined {
  if (pathname.startsWith("/tools/benefit-calculator")) return "tools.benefit-calculator";
  if (pathname.startsWith("/tools/risk-matrix")) return "tools.risk-matrix";
  if (pathname.startsWith("/tools/evaluation-model")) return "tools.evaluation-model";
  if (pathname.startsWith("/tools/timeline-planner")) return "tools.timeline-planner";
  if (pathname.startsWith("/tools/stakeholder-map")) return "tools.stakeholder-map";
  if (pathname.startsWith("/tools/kunskapsbank")) return "tools.kunskapsbank";
  if (pathname.startsWith("/training")) return "training";
  return undefined;
}
