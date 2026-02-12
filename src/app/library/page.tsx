import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const [reqBlocks, riskTemplates, workshopTemplates] = await Promise.all([
    prisma.libraryItem.count({ where: { type: "requirement_block" } }),
    prisma.libraryItem.count({ where: { type: "risk_template" } }),
    prisma.libraryItem.count({ where: { type: "workshop_template" } }),
  ]);

  const categories = [
    {
      type: "requirement_block",
      label: "Kravbibliotek",
      description: "Återanvändbara kravblock med fördefinierade krav",
      count: reqBlocks,
      icon: "ruler",
    },
    {
      type: "risk_template",
      label: "Riskbibliotek",
      description: "Riskmallar för vanliga riskområden",
      count: riskTemplates,
      icon: "shield-alert",
    },
    {
      type: "workshop_template",
      label: "Workshopmallar",
      description: "Färdiga agendor och upplägg för workshops",
      count: workshopTemplates,
      icon: "presentation",
    },
  ];

  return (
    <div>
      <Header title="Bibliotek" description="Återanvändbara mallar och kravblock" />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.type} href={`/library/${cat.type}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={cat.icon} size={24} className="text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">{cat.label}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </div>
                  </div>
                  <p className="text-2xl font-bold mt-3">{cat.count}</p>
                  <p className="text-xs text-muted-foreground">mallar</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
