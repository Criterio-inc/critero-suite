"use client";

import { Button } from "@/components/ui/button";

export function ExportButtons({ caseId }: { caseId: string }) {
  function download(format: string) {
    window.open(`/api/cases/${caseId}/export?format=${format}`, "_blank");
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={() => download("xlsx")}>
        XLSX
      </Button>
      <Button variant="outline" size="sm" onClick={() => download("json")}>
        JSON
      </Button>
      <Button variant="outline" size="sm" onClick={() => download("csv&entity=requirement")}>
        Krav CSV
      </Button>
    </div>
  );
}
