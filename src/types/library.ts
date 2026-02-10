// ============================================================
// Library types
// ============================================================

export type LibraryItemType = "requirement_block" | "risk_template" | "workshop_template";

export interface LibraryItemContent {
  /** For requirement_block: array of requirement templates */
  requirements?: RequirementTemplate[];
  /** For risk_template: risk template data */
  risk?: RiskTemplate;
  /** For workshop_template: workshop template data */
  workshop?: WorkshopTemplate;
}

export interface RequirementTemplate {
  title: string;
  reqType: string;
  level: string;
  text: string;
  rationale: string;
  cluster: string;
  verification?: {
    bidEvidence?: string;
    implementationProof?: string;
    opsFollowUp?: string;
  };
}

export interface RiskTemplate {
  title: string;
  category: string;
  description: string;
  likelihood: number;
  impact: number;
  mitigation: string;
}

export interface WorkshopTemplate {
  title: string;
  description: string;
  suggestedParticipants: string[];
  agenda: string[];
  expectedOutputs: string[];
  duration: string;
}
