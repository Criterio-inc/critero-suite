import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { notFound } from "next/navigation";

const TYPE_INFO: Record<string, { label: string; singular: string; icon: string }> = {
  requirement_block: { label: "Kravbibliotek", singular: "kravblock", icon: "📐" },
  risk_template: { label: "Riskbibliotek", singular: "riskmall", icon: "⚠️" },
  workshop_template: { label: "Workshopmallar", singular: "workshopmall", icon: "🏛️" },
};

export default async function LibraryTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const info = TYPE_INFO[type];
  if (!info) notFound();

  const items = await prisma.libraryItem.findMany({
    where: { type },
    orderBy: { title: "asc" },
  });

  return (
    <div>
      <Header
        title={info.label}
        breadcrumbs={[
          { label: "Bibliotek", href: "/library" },
          { label: info.label },
        ]}
      />
      <div className="p-6">
        {items.length === 0 ? (
          <EmptyState
            icon={info.icon}
            title={`Inga ${info.label.toLowerCase()}`}
            description="Kör seed för att fylla biblioteket med fördefinierat innehåll."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const tags = (() => {
                try { return JSON.parse(item.tags); } catch { return []; }
              })();

              return (
                <Card key={item.id} className="hover:border-primary/30 transition-colors">
                  <CardContent>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.profile && (
                        <Badge className="text-xs">{item.profile}</Badge>
                      )}
                      {item.cluster && (
                        <Badge variant="outline" className="text-xs">{item.cluster}</Badge>
                      )}
                      {tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
