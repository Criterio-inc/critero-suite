"use client";

import { useState, useEffect, use, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { COURSES } from "@/config/courses/index";
import type { AcademyProgress, ModuleProgress } from "@/config/courses/types";
import {
  loadAcademyProgress,
  saveAcademyProgress,
  updateModuleProgress,
  getModuleProgress,
  getCourseCompletionPct,
  getCompletedModuleCount,
} from "@/lib/academy-progress";

import { ModuleNav } from "@/components/training/module-nav";
import { TheorySection } from "@/components/training/theory-section";
import { ScenarioSection } from "@/components/training/scenario-section";
import { RoleDeepDiveSection } from "@/components/training/role-deep-dive-section";
import { ReflectionSection } from "@/components/training/reflection-section";
import { QuizSection } from "@/components/training/quiz-section";

/* ------------------------------------------------------------------ */
/*  Level badge colour                                                 */
/* ------------------------------------------------------------------ */

function getLevelColor(level: string) {
  switch (level) {
    case "Grundläggande":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
    case "Medel":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    case "Avancerad":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = COURSES[courseId];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [progress, setProgress] = useState<AcademyProgress>({ courses: {} });

  useEffect(() => {
    if (!course) return;
    setProgress(loadAcademyProgress());
  }, [course]);

  const updateAndSave = useCallback(
    (moduleId: string, update: Partial<ModuleProgress>) => {
      setProgress((prev) => {
        const next = updateModuleProgress(prev, courseId, moduleId, update);
        saveAcademyProgress(next);
        return next;
      });
    },
    [courseId],
  );

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="help-circle"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold">Kursen hittades inte</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kontrollera att länken är korrekt.
          </p>
          <Link
            href="/training"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Icon name="arrow-left" size={14} />
            Tillbaka till utbildning
          </Link>
        </div>
      </div>
    );
  }

  const moduleIds = course.modules.map((m) => m.id);
  const completedCount = getCompletedModuleCount(
    progress,
    courseId,
    moduleIds,
  );
  const totalModules = course.modules.length;
  const progressPct = getCourseCompletionPct(progress, courseId, moduleIds);

  const currentModule = course.modules[activeModuleIndex];
  const currentModuleId = currentModule.id;
  const mp = getModuleProgress(progress, courseId, currentModuleId);

  // Build moduleProgress map for ModuleNav
  const moduleProgressMap: Record<string, ModuleProgress> = {};
  for (const mod of course.modules) {
    moduleProgressMap[mod.id] = getModuleProgress(progress, courseId, mod.id);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/60 bg-card/60">
        <div className="px-8 py-8">
          <nav className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Link
              href="/cases"
              className="hover:text-primary transition-colors duration-150"
            >
              Upphandlingar
            </Link>
            <span className="mx-0.5 text-border">/</span>
            <Link
              href="/training"
              className="hover:text-primary transition-colors duration-150"
            >
              Utbildning
            </Link>
            <span className="mx-0.5 text-border">/</span>
            <span className="text-foreground font-medium">{course.title}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Icon name={course.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {course.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {course.description}
              </p>
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                <span
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getLevelColor(course.level)}`}
                >
                  {course.level}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="book-open" size={12} />
                  {totalModules} moduler
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="clock" size={12} />
                  ca {course.estimatedMinutes} min
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon
                    name="check-circle"
                    size={12}
                    className={
                      completedCount === totalModules ? "text-green-600" : ""
                    }
                  />
                  {completedCount}/{totalModules} klara
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Framsteg</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area: sidebar + module content */}
      <div className="flex gap-6 px-8 py-6">
        {/* Sidebar — module navigation */}
        <div className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-6">
            <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-3">
              Moduler
            </h3>
            <ModuleNav
              modules={course.modules}
              activeModuleIndex={activeModuleIndex}
              moduleProgress={moduleProgressMap}
              onSelectModule={setActiveModuleIndex}
            />
          </div>
        </div>

        {/* Module content */}
        <div className="flex-1 max-w-3xl space-y-6">
          {/* Mobile module selector */}
          <div className="lg:hidden">
            <select
              value={activeModuleIndex}
              onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
              className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-sm text-foreground"
            >
              {course.modules.map((mod, idx) => (
                <option key={mod.id} value={idx}>
                  {idx + 1}. {mod.title}
                </option>
              ))}
            </select>
          </div>

          {/* Module title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>Modul {activeModuleIndex + 1} av {totalModules}</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {currentModule.title}
            </h2>
          </div>

          {/* 1. Theory */}
          <TheorySection
            content={currentModule.theory.content}
            keyPoints={currentModule.theory.keyPoints}
            completed={mp.theoryCompleted}
            onComplete={() =>
              updateAndSave(currentModuleId, {
                theoryCompleted: !mp.theoryCompleted,
              })
            }
          />

          {/* 2. Scenario (optional) */}
          {currentModule.scenario && (
            <ScenarioSection
              scenario={currentModule.scenario}
              completed={mp.scenarioCompleted}
              onComplete={() =>
                updateAndSave(currentModuleId, {
                  scenarioCompleted: true,
                })
              }
            />
          )}

          {/* 3. Role Deep Dives (optional) */}
          {currentModule.roleDeepDives &&
            currentModule.roleDeepDives.length > 0 && (
              <RoleDeepDiveSection
                roleDeepDives={currentModule.roleDeepDives}
              />
            )}

          {/* 4. Reflection */}
          <ReflectionSection
            question={currentModule.reflection.question}
            completed={mp.reflectionCompleted}
            onComplete={() =>
              updateAndSave(currentModuleId, {
                reflectionCompleted: !mp.reflectionCompleted,
              })
            }
          />

          {/* 5. Quiz (optional) */}
          {currentModule.quiz && (
            <QuizSection
              quiz={currentModule.quiz}
              completed={mp.quizCompleted}
              previousScore={mp.quizScore}
              onComplete={(score) =>
                updateAndSave(currentModuleId, {
                  quizCompleted: true,
                  quizScore: score,
                })
              }
            />
          )}

          {/* Navigation between modules */}
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <button
              onClick={() =>
                setActiveModuleIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={activeModuleIndex === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="arrow-left" size={14} />
              Föregående
            </button>

            {activeModuleIndex < totalModules - 1 ? (
              <button
                onClick={() =>
                  setActiveModuleIndex((prev) =>
                    Math.min(totalModules - 1, prev + 1),
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Nästa modul
                <Icon name="arrow-right" size={14} />
              </button>
            ) : (
              <Link
                href="/training"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Tillbaka till kurser
                <Icon name="arrow-right" size={14} />
              </Link>
            )}
          </div>

          {/* Bottom progress summary */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon
                  name={
                    completedCount === totalModules
                      ? "trophy"
                      : "book-open-check"
                  }
                  size={20}
                  className={
                    completedCount === totalModules
                      ? "text-amber-500"
                      : "text-primary"
                  }
                />
                <span className="text-sm font-semibold text-foreground">
                  {completedCount === totalModules
                    ? "Grattis! Du har slutfört alla moduler."
                    : `${completedCount} av ${totalModules} moduler klara`}
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">
                {progressPct}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link
                href="/training"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="arrow-left" size={14} />
                Alla kurser
              </Link>
              {completedCount === totalModules && (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Alla moduler avklarade
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
