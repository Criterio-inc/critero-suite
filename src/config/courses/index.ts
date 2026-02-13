/* ================================================================== */
/*  Upphandlingsakademin — Kursregistry                               */
/* ================================================================== */

import type { EnhancedCourse } from "./types";
import { upphandlingLou } from "./upphandling-lou";
import { kravhantering } from "./kravhantering";
import { formagabedomning } from "./formagabedomning";
import { systemforvaltning } from "./systemforvaltning";
import { forandringsledningAdkar } from "./forandringsledning-adkar";

/** Alla kurser indexerade på courseId */
export const COURSES: Record<string, EnhancedCourse> = {
  "upphandling-lou": upphandlingLou,
  kravhantering,
  formagabedomning,
  systemforvaltning,
  "forandringsledning-adkar": forandringsledningAdkar,
};

/** Kurserna som sorterad lista (för listsidan) */
export const COURSE_LIST: EnhancedCourse[] = [
  upphandlingLou,
  kravhantering,
  formagabedomning,
  systemforvaltning,
  forandringsledningAdkar,
];

/** Totalt antal moduler */
export const TOTAL_MODULES = COURSE_LIST.reduce(
  (sum, c) => sum + c.modules.length,
  0,
);

/** Total uppskattad tid i minuter */
export const TOTAL_MINUTES = COURSE_LIST.reduce(
  (sum, c) => sum + c.estimatedMinutes,
  0,
);

export type { EnhancedCourse, EnhancedModule } from "./types";
export type {
  AcademyRole,
  QuizQuestion,
  QuizOption,
  ModuleQuiz,
  Scenario,
  ScenarioStep,
  ScenarioChoice,
  RoleDeepDive,
  ModuleProgress,
  CourseProgress,
  AcademyProgress,
} from "./types";
export { createEmptyModuleProgress } from "./types";
export { ROLES, getRoleDefinition } from "./roles";
export type { RoleDefinition } from "./roles";
