import type { AcademyRole } from "./types";

export interface RoleDefinition {
  id: AcademyRole;
  label: string;
  description: string;
  icon: string;
  colorClass: string;
  bgClass: string;
}

export const ROLES: RoleDefinition[] = [
  {
    id: "BESTALLARE",
    label: "Beställare",
    description:
      "Du representerar verksamheten och äger behovet. Fokus på effektmål, nyttorealisering och legitimitet.",
    icon: "target",
    colorClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "UPPHANDLARE",
    label: "Upphandlare",
    description:
      "Du driver upphandlingsprocessen. Fokus på dokumentation, procedurella krav och juridisk korrekthet.",
    icon: "scale",
    colorClass: "text-orange-700 dark:text-orange-400",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "SYSTEMAGARE",
    label: "Systemägare",
    description:
      "Du äger systemet genom livscykeln. Fokus på förvaltning, teknikval, leverantörslåsning och exit-strategi.",
    icon: "server-cog",
    colorClass: "text-emerald-700 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
  },
];

export function getRoleDefinition(role: AcademyRole): RoleDefinition {
  return ROLES.find((r) => r.id === role)!;
}
