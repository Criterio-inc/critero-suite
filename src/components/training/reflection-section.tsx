"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

interface ReflectionSectionProps {
  question: string;
  completed: boolean;
  onComplete: () => void;
}

export function ReflectionSection({
  question,
  completed,
  onComplete,
}: ReflectionSectionProps) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 space-y-4">
      <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">
        <Icon name="lightbulb" size={16} />
        Reflektionsfråga
      </h4>

      <p className="text-sm text-foreground italic leading-relaxed">
        {question}
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Skriv dina tankar här… (sparas inte — bara för din egen reflektion)"
        rows={3}
        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
      />

      <div className="flex items-center justify-end">
        <button
          onClick={onComplete}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            completed
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <Icon name={completed ? "check-circle" : "message-square"} size={14} />
          {completed ? "Reflekterat!" : "Markera som reflekterad"}
        </button>
      </div>
    </div>
  );
}
