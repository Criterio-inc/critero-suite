import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { EntityList } from "@/components/entity/entity-list";
import { FilterBar } from "@/components/filters/filter-bar";
import { getEntityMeta } from "@/config/entity-meta";
import { findEntities } from "@/lib/entity-helpers";

export default async function EvidencePage({
  params,
  searchParams,
}: {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { caseId } = await params;
  const filters = await searchParams;

  const c = await prisma.case.findUnique({
    where: { id: caseId },
    select: { name: true },
  });
  if (!c) notFound();

  const meta = getEntityMeta("evidence");
  const basePath = `/cases/${caseId}/evidence`;
  const clusterOptions: string[] = [];

  const filterObj: Record<string, string> = {};
  for (const key of meta.filterFields) {
    if (filters[key]) filterObj[key] = filters[key];
  }

  const items = await findEntities("evidence", caseId, filterObj);
  const filterFields = meta.fields.filter((f) => meta.filterFields.includes(f.key));

  return (
    <div>
      <Header
        title={meta.pluralLabel}
        breadcrumbs={[
          { label: "Upphandlingar", href: "/cases" },
          { label: c.name, href: `/cases/${caseId}` },
          { label: meta.pluralLabel },
        ]}
        actions={
          <Link href={`${basePath}/new`}>
            <Button>Ny evidens</Button>
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
