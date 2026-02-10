"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/types/api";

const ENTITY_PATHS: Record<string, string> = {
  need: "needs",
  requirement: "requirements",
  risk: "risks",
  criterion: "criteria",
  stakeholder: "stakeholders",
  decision: "decisions",
  document: "documents",
};

const ENTITY_ICONS: Record<string, string> = {
  need: "💡",
  requirement: "📐",
  risk: "⚠️",
  criterion: "⚖️",
  stakeholder: "👥",
  decision: "🔨",
  document: "📄",
};

export function GlobalSearch({ caseId }: { caseId: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/cases/${caseId}/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
          setOpen(true);
        });
    }, 250);
    return () => clearTimeout(timer);
  }, [query, caseId]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function navigate(result: SearchResult) {
    const path = ENTITY_PATHS[result.entityType];
    if (path) {
      router.push(`/cases/${result.caseId}/${path}/${result.id}`);
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Sök i upphandlingen..."
        className="w-64 rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
      {open && (results.length > 0 || loading) && (
        <div className="absolute top-full left-0 z-50 mt-1 w-96 rounded-md border border-border bg-background shadow-lg">
          {loading && (
            <div className="px-3 py-2 text-sm text-muted-foreground">Söker...</div>
          )}
          {results.length > 0 && (
            <ul className="max-h-72 overflow-auto py-1">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => navigate(r)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                  >
                    <span className="text-xs">{ENTITY_ICONS[r.entityType] ?? "📋"}</span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{r.title}</div>
                      <div className="text-xs text-muted-foreground">{r.id}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">Inga resultat</div>
          )}
        </div>
      )}
    </div>
  );
}
