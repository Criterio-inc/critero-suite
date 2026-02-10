import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { EntityDetail } from "@/components/entity/entity-detail";
import { getEntityMeta } from "@/config/entity-meta";

export default async function RiskDetailPage({
  params,
}: {
  params: Promise<{ caseId: string; id: string }>;
}) {
  const { caseId, id } = await params;

  const c = await prisma.case.findUnique({
    where: { id: caseId },
    select: { name: true },
  });
  if (!c) notFound();

  const item = await prisma.risk.findUnique({ where: { id } });
  if (!item) notFound();

  const meta = getEntityMeta("risk");
  const basePath = `/cases/${caseId}/risks`;

  return (
    <div>
      <Header
        title={item.title}
        breadcrumbs={[
          { label: "Upphandlingar", href: "/cases" },
          { label: c.name, href: `/cases/${caseId}` },
          { label: meta.pluralLabel, href: basePath },
          { label: item.title },
        ]}
      />
      <div className="p-6">
        <EntityDetail
          meta={meta}
          item={item as unknown as Record<string, unknown>}
          editUrl={`${basePath}/${id}/edit`}
          deleteUrl={`/api/cases/${caseId}/risks/${id}`}
          backUrl={basePath}
        />
      </div>
    </div>
  );
}
