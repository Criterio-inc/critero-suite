"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <Card className="border-indigo-200 bg-indigo-50/30 dark:border-indigo-800 dark:bg-indigo-950/20">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">
            Sparkboard — digitala workshopövningar
          </h3>
        </div>

        <p className="text-xs text-indigo-700 dark:text-indigo-400">
          Dessa övningar kan genomföras digitalt med Sparkboard. Deltagarna brainstormar
          individuellt med klisterlappar, sedan diskuteras svaren gemensamt.
        </p>

        <div className="space-y-3">
          {boards.map((board, idx) => (
            <div
              key={idx}
              className="rounded-md border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-indigo-950/40 p-3"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-indigo-900 dark:text-indigo-200">
                    {board.boardTitle}
                  </span>
                  <Badge variant="outline" className="text-[10px] text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-600">
                    {board.timeLimit} min
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                  onClick={() => handleCopy(board, idx)}
                >
                  {copiedIdx === idx ? "✓ Kopierat!" : "Kopiera frågor"}
                </Button>
              </div>
              <ol className="space-y-1">
                {board.questions.map((q, qi) => (
                  <li key={qi} className="flex items-start gap-2 text-sm text-indigo-800 dark:text-indigo-300">
                    <span className="text-xs font-mono text-indigo-400 mt-0.5 min-w-[1.2rem]">
                      {qi + 1}.
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-indigo-200 dark:border-indigo-700">
          <p className="text-[11px] text-indigo-500 dark:text-indigo-500">
            Sparkboard — kollaborativt workshopverktyg för brainstorming med klisterlappar
          </p>
          <a
            href="https://sparkboard.criterio.se"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 underline"
          >
            Öppna Sparkboard →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
