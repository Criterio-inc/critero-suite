import { prisma } from "@/lib/db";
import { ALL_FEATURE_KEYS, type FeatureKey, isEffectivelyEnabled } from "@/config/features";
import { getPlan, type PlanId } from "@/config/plans";

/* ------------------------------------------------------------------ */
/*  Resolve effective features for an organization                     */
/* ------------------------------------------------------------------ */

export interface ResolvedFeatures {
  /** The effective feature set (plan + org overrides) */
  features: Record<FeatureKey, boolean>;
  /** The plan that provides the base features */
  plan: PlanId;
  /** Org-level overrides (if any) */
  overrides: Record<string, boolean>;
}

/**
 * Resolve effective features for an organization.
 *
 * Resolution order:
 *   1. Plan features (base — what the plan includes)
 *   2. OrgFeature overrides (admin can enable/disable per org)
 *   3. Cascade logic (parent app disabled → sub-features disabled)
 */
export async function resolveOrgFeatures(orgId: string): Promise<ResolvedFeatures> {
  // Get org with its plan and feature overrides
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: {
      plan: true,
      features: { select: { featureKey: true, enabled: true } },
    },
  });

  if (!org) {
    // Fallback: all features enabled (dev/migration compat)
    const features = {} as Record<FeatureKey, boolean>;
    for (const key of ALL_FEATURE_KEYS) features[key] = true;
    return { features, plan: "enterprise", overrides: {} };
  }

  const plan = getPlan(org.plan);
  const planFeatureSet = new Set(plan.features);
  const overrides: Record<string, boolean> = {};

  // Build override map
  for (const row of org.features) {
    overrides[row.featureKey] = row.enabled;
  }

  // Merge: plan base + org overrides
  const raw = {} as Record<FeatureKey, boolean>;
  for (const key of ALL_FEATURE_KEYS) {
    if (key in overrides) {
      // Org override takes precedence
      raw[key] = overrides[key];
    } else {
      // Plan default
      raw[key] = planFeatureSet.has(key);
    }
  }

  // Apply cascade logic
  const features = {} as Record<FeatureKey, boolean>;
  for (const key of ALL_FEATURE_KEYS) {
    features[key] = isEffectivelyEnabled(raw, key);
  }

  return { features, plan: org.plan as PlanId, overrides };
}

/* ------------------------------------------------------------------ */
/*  Set org-level feature overrides                                    */
/*  Smart: if the value matches the plan default, DELETE the override  */
/*  so only genuine overrides are stored (keeps override count clean)  */
/* ------------------------------------------------------------------ */

export async function setOrgFeatures(
  orgId: string,
  updates: Record<string, boolean>,
): Promise<ResolvedFeatures> {
  // Look up the org's plan to know the defaults
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { plan: true },
  });
  const plan = getPlan(org?.plan ?? "trial");
  const planFeatureSet = new Set(plan.features);

  const upsertOps = [];
  const deleteKeys: string[] = [];

  for (const key of ALL_FEATURE_KEYS) {
    if (key in updates && typeof updates[key] === "boolean") {
      const planDefault = planFeatureSet.has(key);

      if (updates[key] === planDefault) {
        // Value matches plan default — remove override (revert to plan)
        deleteKeys.push(key);
      } else {
        // Value differs from plan — store as override
        upsertOps.push(
          prisma.orgFeature.upsert({
            where: { orgId_featureKey: { orgId, featureKey: key } },
            update: { enabled: updates[key] },
            create: { orgId, featureKey: key, enabled: updates[key] },
          }),
        );
      }
    }
  }

  const ops = [...upsertOps];
  if (deleteKeys.length > 0) {
    ops.push(
      prisma.orgFeature.deleteMany({
        where: { orgId, featureKey: { in: deleteKeys } },
      }) as never, // deleteMany returns BatchPayload; safe in transaction
    );
  }

  if (ops.length > 0) {
    await prisma.$transaction(ops);
  }
  return resolveOrgFeatures(orgId);
}

/* ------------------------------------------------------------------ */
/*  Clear ALL org-level overrides (revert entirely to plan defaults)   */
/* ------------------------------------------------------------------ */

export async function clearOrgOverrides(orgId: string): Promise<ResolvedFeatures> {
  await prisma.orgFeature.deleteMany({ where: { orgId } });
  return resolveOrgFeatures(orgId);
}
