import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { getPhases } from "@/config/workflow";
import type { DomainProfile } from "@/types/entities";
import { GateChecklist } from "@/components/workflow/gate-checklist";
import { ValidationPanel } from "@/components/workflow/validation-panel";
import { ExportButtons } from "@/components/workflow/export-buttons";
import { ImportRestore } from "@/components/workflow/import-restore";
import { ImportToCaseDialog } from "@/components/library/import-to-case-dialog";
import { GlobalSearch } from "@/components/search/global-search";

export default async function CaseDashboard({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const c = await prisma.case.findUnique({ where: { id: caseId } });
  if (!c) notFound();

  const phases = getPhases(c.domainProfile as DomainProfile);

  // Count entities
  const [
    stakeholderCount,
    workshopCount,
    evidenceCount,
    needCount,
    riskCount,
    requirementCount,
    criterionCount,
    bidCount,
    decisionCount,
    documentCount,
  ] = await Promise.all([
    prisma.stakeholder.count({ where: { caseId } }),
    prisma.workshop.count({ where: { caseId } }),
    prisma.evidence.count({ where: { caseId } }),
    prisma.need.count({ where: { caseId } }),
    prisma.risk.count({ where: { caseId } }),
    prisma.requirement.count({ where: { caseId } }),
    prisma.criterion.count({ where: { caseId } }),
    prisma.bid.count({ where: { caseId } }),
    prisma.decision.count({ where: { caseId } }),
    prisma.document.count({ where: { caseId } }),
  ]);

  const counts = [
    { label: "Intressenter", count: stakeholderCount, icon: "👥" },
    { label: "Workshops", count: workshopCount, icon: "🏛️" },
    { label: "Evidens", count: evidenceCount, icon: "📎" },
    { label: "Behov", count: needCount, icon: "💡" },
    { label: "Risker", count: riskCount, icon: "⚠️" },
    { label: "Krav", count: requirementCount, icon: "📐" },
    { label: "Kriterier", count: criterionCount, icon: "⚖️" },
    { label: "Anbud", count: bidCount, icon: "📨" },
    { label: "Beslut", count: decisionCount, icon: "🔨" },
    { label: "Dokument", count: documentCount, icon: "📄" },
  ];

  const profileLabels: Record<string, string> = {
    generisk_lou: "Generisk LOU",
    avfall_nyanskaffning: "Avfall – nyanskaffning",
    socialtjanst_byte: "Socialtjänst – byte",
  };

  const totalEntities = counts.reduce((s, item) => s + item.count, 0);
  const currentPhaseIndex = phases.findIndex((p) => p.id === c.currentPhase);
  const progressPercent = phases.length > 0 ? Math.round(((currentPhaseIndex + 1) / phases.length) * 100) : 0;

  return (
    <div>
      <Header
        title={c.name}
        description={`${profileLabels[c.domainProfile] ?? c.domainProfile} · ${c.orgName || "Ingen organisation"}`}
        breadcrumbs={[
          { label: "Upphandlingar", href: "/cases" },
          { label: c.name },
        ]}
        actions={<GlobalSearch caseId={caseId} />}
      />
      <div className="p-6 space-y-6">
        {/* Status overview */}
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={c.status} />
          <span className="text-sm text-muted-foreground">
            Aktuell fas: {phases.find((p) => p.id === c.currentPhase)?.label ?? c.currentPhase}
          </span>
          {c.owner && <span className="text-sm text-muted-foreground">Ansvarig: {c.owner}</span>}
          <span className="text-sm text-muted-foreground">{totalEntities} objekt totalt</span>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3">
          <ExportButtons caseId={caseId} />
          <div className="h-5 w-px bg-border" />
          <ImportRestore caseId={caseId} />
          <div className="h-5 w-px bg-border" />
          <ImportToCaseDialog caseId={caseId} />
        </div>

        {/* Entity count cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {counts.map((item) => (
            <Card key={item.label} className="p-4">
              <CardContent className="flex items-center gap-3 p-0">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Phase overview with progress */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Faser</CardTitle>
              <span className="text-sm text-muted-foreground">{progressPercent}% genomförd</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted mb-4">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="space-y-2">
              {phases.map((phase, index) => {
                const isCurrent = phase.id === c.currentPhase;
                const isPast = index < currentPhaseIndex;
                return (
                  <div
                    key={phase.id}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                      isCurrent
                        ? "bg-primary/10 font-medium text-primary"
                        : isPast
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      isPast
                        ? "bg-green-100 text-green-700"
                        : isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}>
                      {isPast ? "✓" : index + 1}
                    </span>
                    <span className="flex-1">{phase.label}</span>
                    {phase.subPhases && (
                      <span className="text-xs text-muted-foreground">
                        {phase.subPhases.length} delfaser
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs bg-primary/20 rounded px-2 py-0.5">
                        Aktuell
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Gates + Validation */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold mb-3">Gate-kontroll</h2>
            <GateChecklist caseId={caseId} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Validering</h2>
            <ValidationPanel caseId={caseId} />
          </div>
        </div>
      </div>
    </div>
  );
}
