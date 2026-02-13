/** A knowledge domain — a thematic area of procurement knowledge */
export interface KBDomain {
  slug: string;
  title: string;
  description: string;
  icon: string;
  content: string;
  order: number;
}

/** The 8-section structure of a reasoning article */
export interface ResonemangSection {
  inramning: string;
  karnfragan: string;
  spanningsfalt: string;
  vanliga_felslut: string;
  moget_forhallningssatt: string;
  konsekvenser: string;
  formuleringsstod: string[];
  medveten_avgransning: string;
}

/** A reasoning article — in-depth exploration of a procurement dilemma */
export interface KBResonemang {
  slug: string;
  title: string;
  domainSlug: string;
  summary: string;
  content: ResonemangSection;
  relatedSlugs: string[];
}

/** Labels for each section in the resonemang detail view */
export const SECTION_LABELS: Record<string, { title: string; number: string }> = {
  inramning: { title: "Inramning", number: "1" },
  karnfragan: { title: "Kärnfrågan", number: "2" },
  spanningsfalt: { title: "Spänningsfält", number: "3" },
  vanliga_felslut: { title: "Vanliga felslut", number: "4" },
  moget_forhallningssatt: { title: "Ett mer moget förhållningssätt", number: "5" },
  konsekvenser: { title: "Konsekvenser över tid", number: "6" },
  formuleringsstod: { title: "Formuleringsstöd", number: "7" },
  medveten_avgransning: { title: "Medveten avgränsning", number: "8" },
};

/** Ordered keys for text sections (excludes formuleringsstod and medveten_avgransning, which have special rendering) */
export const TEXT_SECTION_KEYS = [
  "inramning",
  "karnfragan",
  "spanningsfalt",
  "vanliga_felslut",
  "moget_forhallningssatt",
  "konsekvenser",
] as const;
