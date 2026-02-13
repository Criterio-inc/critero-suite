"use client";

import { Icon } from "@/components/ui/icon";

interface TheorySectionProps {
  content: string[];
  keyPoints: string[];
  completed: boolean;
  onComplete: () => void;
}

export function TheorySection({
  content,
  keyPoints,
  completed,
  onComplete,
}: TheorySectionProps) {
  return (
    <div className="space-y-5">
      {/* Paragraphs */}
      <div className="space-y-3">
        {content.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key points */}
      <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
        <h4 className="text-xs font-semibold text-foreground mb-2.5 flex items-center gap-1.5">
          <Icon name="check-circle" size={14} className="text-primary" />
          Nyckelinsikter
        </h4>
        <ul className="space-y-1.5">
          {keyPoints.map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Icon
                name="check"
                size={14}
                className="text-green-600 dark:text-green-400 shrink-0 mt-0.5"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mark as read */}
      <div className="flex items-center justify-end">
        <button
          onClick={onComplete}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            completed
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-900/60"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <Icon name={completed ? "check-circle" : "book-open"} size={14} />
          {completed ? "Teori läst" : "Markera som läst"}
        </button>
      </div>
    </div>
  );
}
