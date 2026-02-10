import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { EntityList } from "./entity-list";
import { FilterBar } from "@/components/filters/filter-bar";
import { getEntityMeta } from "@/config/entity-meta";
import { getClusters } from "@/config/workflow";
import type { EntityType, DomainProfile } from "@/types/entities";

interface EntityPageProps {
  caseId: string;
  entityType: EntityType;
  urlSegment: string;
  searchParams?: Record<string, string>;
}

export async function EntityPage({ caseId, entityType, urlSegment, searchParams }: EntityPageProps) {
  const meta = getEntityMeta(entityType);
  const basePath = `/cases/${caseId}/${urlSegment}`;

  // Get case for profile info
  const c = await prisma.case.findUnique({
    where: { id: caseId },
    select: { name: true, domainProfile: true },
  });

  const clusterOptions = c ? getClusters(c.domainProfile as DomainProfile, entityType) : [];

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = (prisma as any)[entityType === "criterion" ? "criterion" : meta.plural === "evidence" ? "evidence" : entityType];
  const where: Record<string, unknown> = { caseId };

  if (searchParams) {
    for (const key of meta.filterFields) {
      if (searchParams[key]) where[key] = searchParams[key];
    }
  }

  const items = await model.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const filterFields = meta.fields.filter((f) => meta.filterFields.includes(f.key));

  return (
    <div>
      <Header
        title={meta.pluralLabel}
        breadcrumbs={[
          { label: "Upphandlingar", href: "/cases" },
          { label: c?.name ?? caseId, href: `/cases/${caseId}` },
          { label: meta.pluralLabel },
        ]}
        actions={
          <Link href={`${basePath}/new`}>
            <Button>Ny {meta.singularLabel.toLowerCase()}</Button>
          </Link>
        }
      />
      <div className="p-6 space-y-4">
        {filterFields.length > 0 && (
          <FilterBar filters={filterFields} clusterOptions={clusterOptions} />
        )}
        <EntityList meta={meta} items={items} caseId={caseId} basePath={basePath} />
      </div>
    </div>
  );
}
