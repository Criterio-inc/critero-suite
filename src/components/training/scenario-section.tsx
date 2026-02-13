"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { Scenario, AcademyRole } from "@/config/courses/types";
import { getRoleDefinition } from "@/config/courses/roles";

interface ScenarioSectionProps {
  scenario: Scenario;
  completed: boolean;
  onComplete: () => void;
}

function RoleBadge({ role }: { role: AcademyRole }) {
  const def = getRoleDefinition(role);
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${def.bgClass} ${def.colorClass}`}
    >
      <Icon name={def.icon} size={10} />
      {def.label}
    </span>
  );
}

export function ScenarioSection({
  scenario,
  completed,
  onComplete,
}: ScenarioSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<
    Record<number, string>
  >({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const step = scenario.steps[currentStep];
  const totalSteps = scenario.steps.length;

  function selectChoice(choiceId: string) {
    if (showFeedback) return;
    setSelectedChoices((prev) => ({ ...prev, [currentStep]: choiceId }));
    setShowFeedback(true);
  }

  function nextStep() {
    setShowFeedback(false);
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsDone(true);
    }
  }

  // Sammanfattning
  if (isDone || (completed && Object.keys(selectedChoices).length === 0)) {
    const optimalCount = scenario.steps.reduce((count, s, idx) => {
      const selected = selectedChoices[idx];
      const choice = s.choices.find((c) => c.id === selected);
      return count + (choice?.isOptimal ? 1 : 0);
    }, 0);

    return (
      <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="map" size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">
            Scenariosimulering
          </h4>
          {scenario.roleRelevance?.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>

        {completed && Object.keys(selectedChoices).length === 0 ? (
          <div className="flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
            <Icon
              name="check-circle"
              size={20}
              className="text-green-600 dark:text-green-400"
            />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Redan genomfört!
              </p>
              <p className="text-xs text-green-700 dark:text-green-400">
                Du har redan klarat detta scenario.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
            <Icon name="award" size={24} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Scenario avslutat!
              </p>
              <p className="text-xs text-muted-foreground">
                Du valde det optimala alternativet i {optimalCount} av{" "}
                {totalSteps} steg.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!completed && (
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Icon name="check" size={14} />
              Markera som klar
            </button>
          )}
          <button
            onClick={() => {
              setCurrentStep(0);
              setSelectedChoices({});
              setShowFeedback(false);
              setIsDone(false);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Icon name="rotate-ccw" size={12} />
            Spela igen
          </button>
        </div>
      </div>
    );
  }

  // Aktiv scenariovy
  const selectedId = selectedChoices[currentStep];
  const selectedChoice = step.choices.find((c) => c.id === selectedId);

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="map" size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">
            Scenariosimulering
          </h4>
          {scenario.roleRelevance?.map((role) => (
            <RoleBadge key={role} role={role} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Steg {currentStep + 1} av {totalSteps}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
          }}
        />
      </div>

      {/* Context (only on first step) */}
      {currentStep === 0 && (
        <div className="rounded-lg bg-muted/30 border border-border/40 p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {scenario.title}:
            </span>{" "}
            {scenario.context}
          </p>
        </div>
      )}

      {/* Situation */}
      <div className="rounded-lg bg-muted/20 p-3">
        <p className="text-sm text-foreground leading-relaxed">
          {step.situation}
        </p>
      </div>

      {/* Question */}
      <p className="text-sm font-medium text-foreground">{step.question}</p>

      {/* Choices */}
      <div className="space-y-2">
        {step.choices.map((choice) => {
          const isSelected = selectedId === choice.id;

          let choiceClass =
            "border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/30";

          if (showFeedback) {
            if (isSelected && choice.isOptimal) {
              choiceClass =
                "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20";
            } else if (isSelected && !choice.isOptimal) {
              choiceClass =
                "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20";
            } else if (choice.isOptimal) {
              choiceClass =
                "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10";
            } else {
              choiceClass = "border border-border/40 bg-muted/10 opacity-50";
            }
          } else if (isSelected) {
            choiceClass = "border-primary bg-primary/5";
          }

          return (
            <button
              key={choice.id}
              onClick={() => selectChoice(choice.id)}
              disabled={showFeedback}
              className={`w-full p-3 rounded-lg text-left transition-colors ${choiceClass}`}
            >
              <span className="text-sm text-foreground">{choice.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selectedChoice && (
        <div
          className={`rounded-lg p-3 text-sm ${
            selectedChoice.isOptimal
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
          }`}
        >
          <p className="font-medium mb-1">
            {selectedChoice.isOptimal ? "Bra val!" : "Godtagbart, men inte optimalt."}
          </p>
          <p className="text-xs opacity-90">{selectedChoice.feedback}</p>
        </div>
      )}

      {/* Next step */}
      {showFeedback && (
        <div className="flex justify-end">
          <button
            onClick={nextStep}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {currentStep < totalSteps - 1 ? (
              <>
                Nästa steg
                <Icon name="arrow-right" size={14} />
              </>
            ) : (
              <>
                Avsluta scenario
                <Icon name="flag" size={14} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
