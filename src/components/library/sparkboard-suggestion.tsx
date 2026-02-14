"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface SparkboardBoard {
  boardTitle: string;
  questions: string[];
  timeLimit: number;
}

export function SparkboardSuggestion({ boards }: { boards: SparkboardBoard[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!boards || boards.length === 0) return null;

  const handleCopy = async (board: SparkboardBoard, idx: number) => {
    const text = `${board.boardTitle}\n\n${board.questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <Icon name="target" size={18} className="text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          Sparkboard — digitala workshopövningar
        </h3>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Dessa övningar kan genomföras digitalt med Sparkboard. Deltagarna brainstormar
        individuellt med klisterlappar, sedan diskuteras svaren gemensamt.
      </p>

      <div className="space-y-3">
        {boards.map((board, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border/60 bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {board.boardTitle}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {board.timeLimit} min
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-primary hover:text-primary/80"
                onClick={() => handleCopy(board, idx)}
              >
                {copiedIdx === idx ? (
                  <span className="inline-flex items-center gap-1">
                    <Icon name="check" size={12} className="text-green-500" /> Kopierat!
                  </span>
                ) : (
                  "Kopiera frågor"
                )}
              </Button>
            </div>
            <ol className="space-y-1.5">
              {board.questions.map((q, qi) => (
                <li key={qi} className="flex items-start gap-2 text-sm">
                  <span className="text-xs font-mono text-muted-foreground mt-0.5 min-w-[1.2rem]">
                    {qi + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-primary/10">
        <p className="text-[11px] text-muted-foreground">
          Sparkboard — kollaborativt workshopverktyg
        </p>
        <a
          href="https://sparkboard.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Öppna Sparkboard →
        </a>
      </div>
    </div>
  );
}
