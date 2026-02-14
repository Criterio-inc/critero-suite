"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { ModuleQuiz } from "@/config/courses/types";

interface QuizSectionProps {
  quiz: ModuleQuiz;
  completed: boolean;
  previousScore: number;
  onComplete: (score: number) => void;
}

export function QuizSection({
  quiz,
  completed,
  previousScore,
  onComplete,
}: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const q = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;

  function selectAnswer(optionId: string) {
    if (showFeedback) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }));
    setShowFeedback(true);
  }

  function nextQuestion() {
    setShowFeedback(false);
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Räkna resultat
      setShowResults(true);
    }
  }

  function getScore(): number {
    return quiz.questions.reduce((score, question, idx) => {
      const selected = selectedAnswers[idx];
      const correct = question.options.find((o) => o.isCorrect);
      return score + (selected === correct?.id ? 1 : 0);
    }, 0);
  }

  function handleFinish() {
    const score = getScore();
    onComplete(score);
  }

  function resetQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setShowResults(false);
  }

  // Om redan klar, visa sammanfattning
  if (completed && !showResults && Object.keys(selectedAnswers).length === 0) {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Icon name="clipboard-check" size={16} className="text-primary" />
          Kunskapstest
        </h4>
        <div className="flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
          <Icon
            name="check-circle"
            size={20}
            className="text-green-600 dark:text-green-400"
          />
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Redan avklarat!
            </p>
            <p className="text-xs text-green-700 dark:text-green-400">
              Du fick {previousScore} av {totalQuestions} rätt.
              {previousScore >= quiz.passingScore
                ? " Godkänt!"
                : " Försök gärna igen."}
            </p>
          </div>
        </div>
        <button
          onClick={resetQuiz}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <Icon name="rotate-ccw" size={12} />
          Gör om testet
        </button>
      </div>
    );
  }

  // Resultatvy
  if (showResults) {
    const score = getScore();
    const passed = score >= quiz.passingScore;

    return (
      <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Icon name="clipboard-check" size={16} className="text-primary" />
          Resultat
        </h4>

        <div
          className={`flex items-center gap-3 rounded-lg p-4 ${
            passed
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
          }`}
        >
          <Icon
            name={passed ? "trophy" : "target"}
            size={24}
            className={
              passed
                ? "text-green-600 dark:text-green-400"
                : "text-amber-600 dark:text-amber-400"
            }
          />
          <div>
            <p
              className={`text-lg font-bold ${
                passed
                  ? "text-green-800 dark:text-green-300"
                  : "text-amber-800 dark:text-amber-300"
              }`}
            >
              {score} av {totalQuestions} rätt
            </p>
            <p
              className={`text-xs ${
                passed
                  ? "text-green-700 dark:text-green-400"
                  : "text-amber-700 dark:text-amber-400"
              }`}
            >
              {passed
                ? "Bra jobbat! Du har klarat testet."
                : `Du behöver minst ${quiz.passingScore} rätt för att klara testet.`}
            </p>
          </div>
        </div>

        {/* Genomgång per fråga */}
        <div className="space-y-3">
          {quiz.questions.map((question, idx) => {
            const selected = selectedAnswers[idx];
            const correct = question.options.find((o) => o.isCorrect);
            const isCorrect = selected === correct?.id;

            return (
              <div
                key={question.id}
                className="rounded-lg border border-border/40 p-3"
              >
                <div className="flex items-start gap-2">
                  <Icon
                    name={isCorrect ? "check-circle" : "x-circle"}
                    size={16}
                    className={`shrink-0 mt-0.5 ${
                      isCorrect
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  />
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {question.question}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Rätt svar: {correct?.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Icon name="check" size={14} />
            Spara resultat
          </button>
          {!passed && (
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Icon name="rotate-ccw" size={14} />
              Försök igen
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz-fråga
  const selectedId = selectedAnswers[currentQuestion];
  const correctOption = q.options.find((o) => o.isCorrect);

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Icon name="clipboard-check" size={16} className="text-primary" />
          Kunskapstest
        </h4>
        <span className="text-xs text-muted-foreground">
          Fråga {currentQuestion + 1} av {totalQuestions}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>

      <p className="text-sm font-medium text-foreground">{q.question}</p>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrect = option.isCorrect;

          let optionClass =
            "border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/30";

          if (showFeedback) {
            if (isCorrect) {
              optionClass =
                "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20";
            } else if (isSelected && !isCorrect) {
              optionClass =
                "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20";
            } else {
              optionClass = "border border-border/40 bg-muted/10 opacity-60";
            }
          } else if (isSelected) {
            optionClass = "border-primary bg-primary/5";
          }

          return (
            <button
              key={option.id}
              onClick={() => selectAnswer(option.id)}
              disabled={showFeedback}
              className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${optionClass}`}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold shrink-0 mt-0.5 ${
                  showFeedback && isCorrect
                    ? "border-green-500 bg-green-500 text-white"
                    : showFeedback && isSelected && !isCorrect
                      ? "border-red-500 bg-red-500 text-white"
                      : isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40 text-muted-foreground"
                }`}
              >
                {showFeedback && isCorrect ? (
                  <Icon name="check" size={10} />
                ) : showFeedback && isSelected && !isCorrect ? (
                  <Icon name="x" size={10} />
                ) : (
                  option.id.toUpperCase()
                )}
              </div>
              <span className="text-sm text-foreground">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`rounded-lg p-3 text-sm ${
            selectedId === correctOption?.id
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              : "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
          }`}
        >
          <p className="font-medium mb-1">
            {selectedId === correctOption?.id ? "Rätt!" : "Inte riktigt."}
          </p>
          <p className="text-xs opacity-90">{q.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {showFeedback && (
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {currentQuestion < totalQuestions - 1 ? (
              <>
                Nästa fråga
                <Icon name="arrow-right" size={14} />
              </>
            ) : (
              <>
                Se resultat
                <Icon name="bar-chart-2" size={14} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
