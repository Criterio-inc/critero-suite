// ============================================================
// Profile loader – merges base phases + profile enrichments
// ============================================================

import type { DomainProfile } from "@/types/entities";
import type { GateRule, PhaseConfig, ProfileConfig, WorkflowConfig } from "@/types/workflow";
import { BASE_PHASES } from "./phases";
import { generiskLou } from "./profiles/generisk-lou";
import { avfallNyanskaffning } from "./profiles/avfall-nyanskaffning";
import { socialtjanstByte } from "./profiles/socialtjanst-byte";

const PROFILES: Record<string, ProfileConfig> = {
  generisk_lou: generiskLou,
  avfall_nyanskaffning: avfallNyanskaffning,
  socialtjanst_byte: socialtjanstByte,
};

export function getProfile(profileId: DomainProfile): ProfileConfig {
  return PROFILES[profileId] ?? PROFILES.generisk_lou;
}

export function getAllProfiles(): ProfileConfig[] {
  return Object.values(PROFILES);
}

/**
 * Build the full phase chain for a given profile.
 * Merges base phases with any extra phases from the profile.
 */
export function getPhases(profileId: DomainProfile): PhaseConfig[] {
  const profile = getProfile(profileId);
  const phases = [...BASE_PHASES];

  if (profile.extraPhases && profile.insertBefore) {
    for (const extra of profile.extraPhases) {
      const insertBeforeId = profile.insertBefore[extra.id];
      if (insertBeforeId) {
        const idx = phases.findIndex((p) => p.id === insertBeforeId);
        if (idx >= 0) {
          phases.splice(idx, 0, extra);
        } else {
          phases.push(extra);
        }
      } else {
        phases.push(extra);
      }
    }
  }

  return phases;
}

/**
 * Get clusters for a specific entity type, based on the profile.
 */
export function getClusters(profileId: DomainProfile, entityType: string): string[] {
  const profile = getProfile(profileId);
  return profile.clusters[entityType] ?? [];
}

/**
 * Get all gate rules for a specific phase, merging base + profile gates.
 */
export function getGatesForPhase(profileId: DomainProfile, phaseId: string): GateRule[] {
  const phases = getPhases(profileId);
  const phase = phases.find((p) => p.id === phaseId);
  const baseGates = phase?.gates ?? [];

  const profile = getProfile(profileId);
  const extraGates = profile.extraGates?.[phaseId] ?? [];

  return [...baseGates, ...extraGates];
}

/**
 * Build complete workflow config for a profile.
 */
export function getWorkflowConfig(profileId: DomainProfile): WorkflowConfig {
  const phases = getPhases(profileId);
  const profile = getProfile(profileId);

  const gatesByPhase: Record<string, GateRule[]> = {};
  for (const phase of phases) {
    gatesByPhase[phase.id] = getGatesForPhase(profileId, phase.id);
  }

  return {
    phases,
    clusters: profile.clusters,
    gatesByPhase,
  };
}
