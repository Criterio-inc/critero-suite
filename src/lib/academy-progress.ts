/* ================================================================== */
/*  Upphandlingsakademin — Progressionsbibliotek                      */
/*  localStorage-baserad framstegsspårning per modul/kurs              */
/* ================================================================== */

import type {
  AcademyProgress,
  CourseProgress,
  ModuleProgress,
} from "@/config/courses/types";
import { createEmptyModuleProgress } from "@/config/courses/types";

/* ---- Constants ---- */

const STORAGE_KEY = "critero-academy-progress";
const OLD_STORAGE_KEY = "critero-training-progress";

/* ---- Load / Save ---- */

export function loadAcademyProgress(): AcademyProgress {
  if (typeof window === "undefined") return { courses: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AcademyProgress;
      if (parsed && typeof parsed.courses === "object") return parsed;
    }
    // Försök migrera gammal progress
    const migrated = migrateOldProgress();
    if (migrated) {
      saveAcademyProgress(migrated);
      return migrated;
    }
    return { courses: {} };
  } catch {
    return { courses: {} };
  }
}

export function saveAcademyProgress(progress: AcademyProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* ignore quota errors */
  }
}

/* ---- Module-level updates ---- */

export function getModuleProgress(
  progress: AcademyProgress,
  courseId: string,
  moduleId: string,
): ModuleProgress {
  return (
    progress.courses[courseId]?.modules[moduleId] ??
    createEmptyModuleProgress()
  );
}

export function updateModuleProgress(
  progress: AcademyProgress,
  courseId: string,
  moduleId: string,
  update: Partial<ModuleProgress>,
): AcademyProgress {
  const courseProgress: CourseProgress = progress.courses[courseId] ?? {
    modules: {},
  };
  const moduleProgress: ModuleProgress =
    courseProgress.modules[moduleId] ?? createEmptyModuleProgress();

  const newModuleProgress: ModuleProgress = { ...moduleProgress, ...update };

  const newCourseProgress: CourseProgress = {
    ...courseProgress,
    modules: {
      ...courseProgress.modules,
      [moduleId]: newModuleProgress,
    },
  };

  return {
    ...progress,
    courses: {
      ...progress.courses,
      [courseId]: newCourseProgress,
    },
  };
}

/* ---- Completion helpers ---- */

/** Räkna hur stor andel av en modul som är klar (0-1) */
export function getModuleCompletionPct(mp: ModuleProgress): number {
  const sections = [
    mp.theoryCompleted,
    mp.scenarioCompleted,
    mp.reflectionCompleted,
    mp.quizCompleted,
  ];
  const completed = sections.filter(Boolean).length;
  // En modul räknas som "klar" om teori + reflektion är klara.
  // Scenario och quiz är valfria — om de inte finns räknas de inte.
  // Vi returnerar dock raw ratio för flexibel användning.
  return completed / sections.length;
}

/** Är en modul helt klar? Teori + reflektion är minimum. */
export function isModuleComplete(mp: ModuleProgress): boolean {
  return mp.theoryCompleted && mp.reflectionCompleted;
}

/** Procentuell komplettering av en kurs (antal klara moduler / totalt) */
export function getCourseCompletionPct(
  progress: AcademyProgress,
  courseId: string,
  moduleIds: string[],
): number {
  if (moduleIds.length === 0) return 0;
  const courseProgress = progress.courses[courseId];
  if (!courseProgress) return 0;

  const completedCount = moduleIds.filter((mid) => {
    const mp = courseProgress.modules[mid];
    return mp ? isModuleComplete(mp) : false;
  }).length;

  return Math.round((completedCount / moduleIds.length) * 100);
}

/** Antal klara moduler i en kurs */
export function getCompletedModuleCount(
  progress: AcademyProgress,
  courseId: string,
  moduleIds: string[],
): number {
  const courseProgress = progress.courses[courseId];
  if (!courseProgress) return 0;
  return moduleIds.filter((mid) => {
    const mp = courseProgress.modules[mid];
    return mp ? isModuleComplete(mp) : false;
  }).length;
}

/** Totalt antal klara moduler över alla kurser */
export function getTotalCompletedModules(
  progress: AcademyProgress,
  courseModuleMap: Record<string, string[]>,
): number {
  return Object.entries(courseModuleMap).reduce((total, [courseId, moduleIds]) => {
    return total + getCompletedModuleCount(progress, courseId, moduleIds);
  }, 0);
}

/** Antal helt avslutade kurser */
export function getCompletedCourseCount(
  progress: AcademyProgress,
  courseModuleMap: Record<string, string[]>,
): number {
  return Object.entries(courseModuleMap).filter(([courseId, moduleIds]) => {
    return getCourseCompletionPct(progress, courseId, moduleIds) === 100;
  }).length;
}

/* ---- Migration from old format ---- */

/**
 * Migrerar gammal localStorage-progress (critero-training-progress)
 * Gammalt format: { [courseId]: boolean[] }
 * Nytt format: AcademyProgress
 *
 * De gamla boolean-arrayerna markerade hela moduler som klara/ej klara.
 * Vi mappar true → theoryCompleted + reflectionCompleted (dvs modulen räknas som klar).
 */
function migrateOldProgress(): AcademyProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return null;

    const oldData = JSON.parse(raw) as Record<string, boolean[]>;
    if (!oldData || typeof oldData !== "object") return null;

    // Mappa kursId → modulId-prefix
    const courseModulePrefix: Record<string, string> = {
      "upphandling-lou": "upphandling-lou",
      kravhantering: "kravhantering",
      formagabedomning: "formagabedomning",
      systemforvaltning: "systemforvaltning",
      "forandringsledning-adkar": "forandringsledning-adkar",
    };

    const newProgress: AcademyProgress = { courses: {} };

    for (const [courseId, completedArr] of Object.entries(oldData)) {
      if (!Array.isArray(completedArr)) continue;
      const prefix = courseModulePrefix[courseId] ?? courseId;

      const modules: Record<string, ModuleProgress> = {};
      completedArr.forEach((done, idx) => {
        const moduleId = `${prefix}-${idx + 1}`;
        modules[moduleId] = {
          theoryCompleted: done,
          scenarioCompleted: false,
          reflectionCompleted: done,
          quizCompleted: false,
          quizScore: 0,
        };
      });

      newProgress.courses[courseId] = { modules };
    }

    return newProgress;
  } catch {
    return null;
  }
}
