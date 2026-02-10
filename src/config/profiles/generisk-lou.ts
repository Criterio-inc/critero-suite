import type { ProfileConfig } from "@/types/workflow";

export const generiskLou: ProfileConfig = {
  id: "generisk_lou",
  label: "Generisk LOU",
  description: "Ren LOU-upphandling utan branschspecifika tillägg. Passar för alla typer av offentliga upphandlingar.",
  clusters: {
    need: [
      "Funktionella behov",
      "Icke-funktionella behov",
      "Juridiska behov",
      "Tekniska behov",
      "Organisatoriska behov",
    ],
    requirement: [
      "Funktionella krav",
      "Icke-funktionella krav",
      "Juridiska krav",
      "Tekniska krav",
      "Leverantörskrav",
      "Kontraktsvillkor",
    ],
    risk: [
      "Verksamhetsrisker",
      "Tekniska risker",
      "Juridiska risker",
      "Leveransrisker",
      "Ekonomiska risker",
    ],
  },
  workshopTemplates: [
    "behovsworkshop_generisk",
    "exit_migrering",
  ],
  requirementBlocks: [
    "kravblock_data_exit",
  ],
};
