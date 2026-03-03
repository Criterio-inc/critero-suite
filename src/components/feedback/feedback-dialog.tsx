"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/components/ui/toast-provider";

const FEEDBACK_TYPES = [
  {
    key: "bugg",
    label: "Bugg",
    icon: "bug",
    placeholder: "Beskriv buggen — vad hände och vad förväntade du dig?",
    textareaLabel: "Beskriv buggen",
  },
  {
    key: "forbattring",
    label: "Förbättring",
    icon: "lightbulb",
    placeholder: "Vad skulle göra verktyget bättre för dig?",
    textareaLabel: "Beskriv förbättringen",
  },
  {
    key: "fraga",
    label: "Fråga",
    icon: "help-circle",
    placeholder: "Vad undrar du över?",
    textareaLabel: "Ställ din fråga",
  },
] as const;

export function FeedbackDialog() {
  const pathname = usePathname();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>("forbattring");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Hide on auth pages and public survey pages
  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/sales") ||
    pathname.match(/^\/(mognadmatning|ai-mognadmatning)\/survey\//)
  ) {
    return null;
  }

  const selectedType = FEEDBACK_TYPES.find((t) => t.key === type) ?? FEEDBACK_TYPES[1];

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, page: pathname }),
      });
      if (res.ok) {
        toast.success("Tack för din feedback!");
        setMessage("");
        setType("forbattring");
        setOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Kunde inte skicka feedback");
      }
    } catch {
      toast.error("Nätverksfel — försök igen");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 cursor-pointer"
        title="Ge feedback"
        aria-label="Öppna feedback-formulär"
      >
        <Icon name="message-square-plus" size={20} />
      </button>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="message-square-plus" size={18} className="text-primary" />
            </div>
            <div>
              <DialogTitle>Beta-feedback</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Hjälp oss förbättra Critero Suite! Rapportera buggar, föreslå förbättringar eller ställ frågor.
              </p>
            </div>
          </div>
        </DialogHeader>

        <DialogContent>
          <div className="space-y-4">
            {/* Type selector */}
            <div className="grid grid-cols-3 gap-2">
              {FEEDBACK_TYPES.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setType(t.key)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all cursor-pointer",
                    type === t.key
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent",
                  )}
                >
                  <Icon name={t.icon} size={18} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Message input */}
            <Textarea
              id="feedback-message"
              label={selectedType.textareaLabel}
              placeholder={selectedType.placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            {/* Current page indicator */}
            <p className="text-[11px] text-muted-foreground/60">
              Sida: {pathname}
            </p>
          </div>
        </DialogContent>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={submitting}>
            Avbryt
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!message.trim() || submitting}
          >
            {submitting ? "Skickar..." : "Skicka feedback"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
