// ============================================================
// Entity type definitions matching Prisma schema
// ============================================================

// --- Enums as string unions ---

export type EntityStatus = "draft" | "in_review" | "approved" | "locked" | "archived";

export type Priority = "P1" | "P2" | "P3";

export type Level = "SKA" | "BOR";

export type ProcurementType = "nyanskaffning" | "byte" | "utokning";

export type DomainProfile = "generisk_lou" | "avfall_nyanskaffning" | "socialtjanst_byte";

export type EvidenceType =
  | "interview"
  | "workshop_output"
  | "statistics"
  | "contract"
  | "market_note"
  | "demo_note"
  | "policy"
  | "other";

export type RequirementType = "funktion" | "nfr" | "leverantor" | "kontraktsvillkor";

export type RiskCategory =
  | "verksamhet"
  | "teknik"
  | "juridik"
  | "leverans"
  | "sakerhet"
  | "ekonomi"
  | "forandring"
  | "data_exit";

export type DecisionType =
  | "forfarande"
  | "kravprincip"
  | "utvarderingsmodell"
  | "tilldelning"
  | "avbrytande"
  | "kontrakt";

export type DocumentType =
  | "behovsrapport"
  | "marknadsanalys"
  | "kravbilaga"
  | "utvarderingsprotokoll"
  | "qna_logg"
  | "versionslogg"
  | "implementation_plan"
  | "forvaltningsplan"
  | "defensibility_pack"
  | "other";

export type MeetsLevel = "yes" | "partial" | "no";

export type TraceLinkRelation =
  | "addresses"
  | "derives_from"
  | "evaluated_by"
  | "mitigated_by"
  | "validated_by"
  | "depends_on"
  | "explains";

export type TraceLinkEntityType =
  | "need"
  | "risk"
  | "requirement"
  | "criterion"
  | "workshop"
  | "decision"
  | "evidence"
  | "bid";

// --- Base meta fields shared by most entities ---

export interface BaseMeta {
  id: string;
  caseId: string;
  title: string;
  status: EntityStatus;
  version: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// --- Entity interfaces ---

export interface Case {
  id: string;
  name: string;
  domainProfile: DomainProfile;
  orgName: string;
  procurementType: ProcurementType;
  estimatedValueSek: number;
  timeline: {
    startDate?: string;
    targetAwardDate?: string;
    targetContractDate?: string;
  };
  goals: string[];
  scopeIn: string[];
  scopeOut: string[];
  dependencies: string[];
  governance: {
    steeringGroup?: string[];
    projectGroup?: string[];
    decisionForums?: string[];
  };
  status: EntityStatus;
  currentPhase: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stakeholder extends BaseMeta {
  role: string;
  unit: string;
  influence: number;
  interest: number;
  engagementStrategy: string;
  contact: string;
}

export interface Workshop extends BaseMeta {
  date: string;
  participants: string[];
  agenda: string[];
  outputs: EvidenceRef[];
  notes: string;
}

export interface Evidence extends BaseMeta {
  type: EvidenceType;
  source: string;
  uri: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  summary: string;
}

export interface Need extends BaseMeta {
  cluster: string;
  statement: string;
  asOutcome: string;
  priority: Priority;
  consequenceIfNotMet: string;
  sources: EvidenceRef[];
  metrics: NeedMetric[];
}

export interface NeedMetric {
  indicator: string;
  baseline: string;
  target: string;
}

export interface EvidenceRef {
  id?: string;
  type?: string;
  label?: string;
}

export interface Risk extends BaseMeta {
  category: RiskCategory;
  description: string;
  likelihood: number;
  impact: number;
  score: number;
  mitigation: string;
  riskOwner: string;
  relatedNeeds: string[];
  relatedRequirements: string[];
}

export interface Requirement extends BaseMeta {
  reqType: RequirementType;
  cluster: string;
  level: Level;
  text: string;
  rationale: string;
  linkedNeeds: string[];
  linkedRisks: string[];
  verification: VerificationPlan;
  conflictPriority: Priority;
}

export interface VerificationPlan {
  bidEvidence?: string;
  implementationProof?: string;
  opsFollowUp?: string;
}

export interface Criterion extends BaseMeta {
  weight: number;
  scale: "0-5" | "0-10";
  anchors: string[];
  evidenceRequired: string;
  scoringGuidance: string;
  linkedRequirements: string[];
}

export interface Bid extends BaseMeta {
  supplierName: string;
  receivedAt: string;
  qualified: boolean;
  qualificationNotes: string;
}

export interface BidResponse {
  id: string;
  caseId: string;
  bidId: string;
  requirementId: string;
  meets: MeetsLevel;
  supplierStatement: string;
  evidenceRefs: EvidenceRef[];
  reviewNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Score {
  id: string;
  caseId: string;
  bidId: string;
  criterionId: string;
  rawScore: number;
  normalizedScore: number;
  justification: string;
  scorer: string;
  scoredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Decision extends BaseMeta {
  decisionType: DecisionType;
  alternatives: string[];
  chosen: string;
  rationale: string;
  impactsCompetition: string;
  attachments: EvidenceRef[];
}

export interface Document extends BaseMeta {
  docType: DocumentType;
  format: string;
  generatedFrom: string[];
  uri: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  checksum: string;
  description: string;
}

export interface TraceLink {
  id: string;
  caseId: string;
  fromType: TraceLinkEntityType;
  fromId: string;
  toType: TraceLinkEntityType;
  toId: string;
  relation: TraceLinkRelation;
  note: string;
  createdAt: string;
}

// --- Entity type string union ---

export type EntityType =
  | "case"
  | "stakeholder"
  | "workshop"
  | "evidence"
  | "need"
  | "risk"
  | "requirement"
  | "criterion"
  | "bid"
  | "decision"
  | "document";
