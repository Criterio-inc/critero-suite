"use client";

import { useState, useCallback, useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface KBMessage {
  role: "user" | "assistant";
  content: string;
}

export interface KBConversation {
  id: string;
  title: string;
  messages: KBMessage[];
  createdAt: number;
  updatedAt: number;
}

/* ------------------------------------------------------------------ */
/*  Storage                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "critero-kb-conversations";

function loadConversations(): KBConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConversations(convs: KBConversation[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useKBConversations() {
  const [conversations, setConversations] = useState<KBConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadConversations();
    setConversations(loaded);
    if (loaded.length > 0) {
      setActiveId(loaded[0].id);
    }
  }, []);

  // Persist whenever conversations change
  useEffect(() => {
    if (conversations.length > 0) {
      saveConversations(conversations);
    }
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  const createConversation = useCallback((): string => {
    const conv: KBConversation = {
      id: generateId(),
      title: "Nytt samtal",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    return conv.id;
  }, []);

  const updateMessages = useCallback(
    (convId: string, messages: KBMessage[]) => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== convId) return c;
          // Derive title from first user message
          let title = c.title;
          if (title === "Nytt samtal" && messages.length > 0) {
            const firstUser = messages.find((m) => m.role === "user");
            if (firstUser) {
              title = firstUser.content.slice(0, 50) + (firstUser.content.length > 50 ? "..." : "");
            }
          }
          return { ...c, messages, title, updatedAt: Date.now() };
        })
      );
    },
    []
  );

  const deleteConversation = useCallback(
    (convId: string) => {
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== convId);
        if (convId === activeId) {
          setActiveId(filtered.length > 0 ? filtered[0].id : null);
        }
        if (filtered.length === 0) {
          localStorage.removeItem(STORAGE_KEY);
        }
        return filtered;
      });
    },
    [activeId]
  );

  const clearAll = useCallback(() => {
    setConversations([]);
    setActiveId(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    conversations,
    activeId,
    activeConversation,
    setActiveId,
    createConversation,
    updateMessages,
    deleteConversation,
    clearAll,
  };
}
