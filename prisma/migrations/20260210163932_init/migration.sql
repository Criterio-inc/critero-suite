-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domainProfile" TEXT NOT NULL DEFAULT 'generisk_lou',
    "orgName" TEXT NOT NULL DEFAULT '',
    "procurementType" TEXT NOT NULL DEFAULT 'nyanskaffning',
    "estimatedValueSek" REAL NOT NULL DEFAULT 0,
    "timeline" TEXT NOT NULL DEFAULT '{}',
    "goals" TEXT NOT NULL DEFAULT '[]',
    "scopeIn" TEXT NOT NULL DEFAULT '[]',
    "scopeOut" TEXT NOT NULL DEFAULT '[]',
    "dependencies" TEXT NOT NULL DEFAULT '[]',
    "governance" TEXT NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "currentPhase" TEXT NOT NULL DEFAULT 'A_start_styrning',
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "role" TEXT NOT NULL DEFAULT '',
    "unit" TEXT NOT NULL DEFAULT '',
    "influence" INTEGER NOT NULL DEFAULT 3,
    "interest" INTEGER NOT NULL DEFAULT 3,
    "engagementStrategy" TEXT NOT NULL DEFAULT '',
    "contact" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Stakeholder_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "date" TEXT NOT NULL DEFAULT '',
    "participants" TEXT NOT NULL DEFAULT '[]',
    "agenda" TEXT NOT NULL DEFAULT '[]',
    "outputs" TEXT NOT NULL DEFAULT '[]',
    "notes" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Workshop_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "type" TEXT NOT NULL DEFAULT 'other',
    "source" TEXT NOT NULL DEFAULT '',
    "uri" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT NOT NULL DEFAULT '',
    "fileSize" INTEGER NOT NULL DEFAULT 0,
    "mimeType" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Evidence_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Need" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "cluster" TEXT NOT NULL DEFAULT '',
    "statement" TEXT NOT NULL DEFAULT '',
    "asOutcome" TEXT NOT NULL DEFAULT '',
    "priority" TEXT NOT NULL DEFAULT 'P2',
    "consequenceIfNotMet" TEXT NOT NULL DEFAULT '',
    "sources" TEXT NOT NULL DEFAULT '[]',
    "metrics" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Need_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Risk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "category" TEXT NOT NULL DEFAULT 'verksamhet',
    "description" TEXT NOT NULL DEFAULT '',
    "likelihood" INTEGER NOT NULL DEFAULT 3,
    "impact" INTEGER NOT NULL DEFAULT 3,
    "score" INTEGER NOT NULL DEFAULT 9,
    "mitigation" TEXT NOT NULL DEFAULT '',
    "riskOwner" TEXT NOT NULL DEFAULT '',
    "relatedNeeds" TEXT NOT NULL DEFAULT '[]',
    "relatedRequirements" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Risk_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "reqType" TEXT NOT NULL DEFAULT 'funktion',
    "cluster" TEXT NOT NULL DEFAULT '',
    "level" TEXT NOT NULL DEFAULT 'BOR',
    "text" TEXT NOT NULL DEFAULT '',
    "rationale" TEXT NOT NULL DEFAULT '',
    "linkedNeeds" TEXT NOT NULL DEFAULT '[]',
    "linkedRisks" TEXT NOT NULL DEFAULT '[]',
    "verification" TEXT NOT NULL DEFAULT '{}',
    "conflictPriority" TEXT NOT NULL DEFAULT 'P2',
    CONSTRAINT "Requirement_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Criterion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "weight" REAL NOT NULL DEFAULT 0,
    "scale" TEXT NOT NULL DEFAULT '0-5',
    "anchors" TEXT NOT NULL DEFAULT '[]',
    "evidenceRequired" TEXT NOT NULL DEFAULT '',
    "scoringGuidance" TEXT NOT NULL DEFAULT '',
    "linkedRequirements" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Criterion_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "supplierName" TEXT NOT NULL DEFAULT '',
    "receivedAt" TEXT NOT NULL DEFAULT '',
    "qualified" BOOLEAN NOT NULL DEFAULT false,
    "qualificationNotes" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Bid_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BidResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "meets" TEXT NOT NULL DEFAULT 'no',
    "supplierStatement" TEXT NOT NULL DEFAULT '',
    "evidenceRefs" TEXT NOT NULL DEFAULT '[]',
    "reviewNotes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BidResponse_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BidResponse_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "bidId" TEXT NOT NULL,
    "criterionId" TEXT NOT NULL,
    "rawScore" REAL NOT NULL DEFAULT 0,
    "normalizedScore" REAL NOT NULL DEFAULT 0,
    "justification" TEXT NOT NULL DEFAULT '',
    "scorer" TEXT NOT NULL DEFAULT '',
    "scoredAt" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Score_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Score_bidId_fkey" FOREIGN KEY ("bidId") REFERENCES "Bid" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "decisionType" TEXT NOT NULL DEFAULT 'kravprincip',
    "alternatives" TEXT NOT NULL DEFAULT '[]',
    "chosen" TEXT NOT NULL DEFAULT '',
    "rationale" TEXT NOT NULL DEFAULT '',
    "impactsCompetition" TEXT NOT NULL DEFAULT '',
    "attachments" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Decision_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "docType" TEXT NOT NULL DEFAULT 'other',
    "format" TEXT NOT NULL DEFAULT 'pdf',
    "generatedFrom" TEXT NOT NULL DEFAULT '[]',
    "uri" TEXT NOT NULL DEFAULT '',
    "filePath" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT NOT NULL DEFAULT '',
    "fileSize" INTEGER NOT NULL DEFAULT 0,
    "checksum" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TraceLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caseId" TEXT NOT NULL,
    "fromType" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toType" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TraceLink_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IdCounter" (
    "prefix" TEXT NOT NULL PRIMARY KEY,
    "counter" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "LibraryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "profile" TEXT NOT NULL DEFAULT '',
    "cluster" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '{}',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "caseId" TEXT,
    CONSTRAINT "LibraryItem_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Stakeholder_caseId_idx" ON "Stakeholder"("caseId");

-- CreateIndex
CREATE INDEX "Workshop_caseId_idx" ON "Workshop"("caseId");

-- CreateIndex
CREATE INDEX "Evidence_caseId_idx" ON "Evidence"("caseId");

-- CreateIndex
CREATE INDEX "Need_caseId_idx" ON "Need"("caseId");

-- CreateIndex
CREATE INDEX "Need_priority_idx" ON "Need"("priority");

-- CreateIndex
CREATE INDEX "Need_cluster_idx" ON "Need"("cluster");

-- CreateIndex
CREATE INDEX "Need_status_idx" ON "Need"("status");

-- CreateIndex
CREATE INDEX "Risk_caseId_idx" ON "Risk"("caseId");

-- CreateIndex
CREATE INDEX "Risk_category_idx" ON "Risk"("category");

-- CreateIndex
CREATE INDEX "Requirement_caseId_idx" ON "Requirement"("caseId");

-- CreateIndex
CREATE INDEX "Requirement_reqType_idx" ON "Requirement"("reqType");

-- CreateIndex
CREATE INDEX "Requirement_level_idx" ON "Requirement"("level");

-- CreateIndex
CREATE INDEX "Requirement_cluster_idx" ON "Requirement"("cluster");

-- CreateIndex
CREATE INDEX "Requirement_status_idx" ON "Requirement"("status");

-- CreateIndex
CREATE INDEX "Criterion_caseId_idx" ON "Criterion"("caseId");

-- CreateIndex
CREATE INDEX "Bid_caseId_idx" ON "Bid"("caseId");

-- CreateIndex
CREATE INDEX "BidResponse_caseId_idx" ON "BidResponse"("caseId");

-- CreateIndex
CREATE INDEX "BidResponse_bidId_idx" ON "BidResponse"("bidId");

-- CreateIndex
CREATE UNIQUE INDEX "BidResponse_bidId_requirementId_key" ON "BidResponse"("bidId", "requirementId");

-- CreateIndex
CREATE INDEX "Score_caseId_idx" ON "Score"("caseId");

-- CreateIndex
CREATE INDEX "Score_bidId_idx" ON "Score"("bidId");

-- CreateIndex
CREATE UNIQUE INDEX "Score_bidId_criterionId_key" ON "Score"("bidId", "criterionId");

-- CreateIndex
CREATE INDEX "Decision_caseId_idx" ON "Decision"("caseId");

-- CreateIndex
CREATE INDEX "Decision_decisionType_idx" ON "Decision"("decisionType");

-- CreateIndex
CREATE INDEX "Document_caseId_idx" ON "Document"("caseId");

-- CreateIndex
CREATE INDEX "Document_docType_idx" ON "Document"("docType");

-- CreateIndex
CREATE INDEX "TraceLink_caseId_idx" ON "TraceLink"("caseId");

-- CreateIndex
CREATE INDEX "TraceLink_fromType_fromId_idx" ON "TraceLink"("fromType", "fromId");

-- CreateIndex
CREATE INDEX "TraceLink_toType_toId_idx" ON "TraceLink"("toType", "toId");

-- CreateIndex
CREATE UNIQUE INDEX "TraceLink_fromId_toId_relation_key" ON "TraceLink"("fromId", "toId", "relation");

-- CreateIndex
CREATE INDEX "LibraryItem_type_idx" ON "LibraryItem"("type");

-- CreateIndex
CREATE INDEX "LibraryItem_profile_idx" ON "LibraryItem"("profile");

-- CreateIndex
CREATE INDEX "LibraryItem_cluster_idx" ON "LibraryItem"("cluster");
