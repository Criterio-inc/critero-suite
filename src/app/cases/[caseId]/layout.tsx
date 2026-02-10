import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { CaseSidebar } from "@/components/layout/case-sidebar";

export default async function CaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const c = await prisma.case.findUnique({ where: { id: caseId } });
  if (!c) notFound();

  return (
    <div className="flex h-full">
      <CaseSidebar caseId={caseId} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
