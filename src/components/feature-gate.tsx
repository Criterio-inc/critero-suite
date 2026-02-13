"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

interface FeatureGateProps {
  featureKey: string;
  children: ReactNode;
  /** Optional fallback — defaults to a "not available" message */
  fallback?: ReactNode;
}

/**
 * Client-side gate that checks whether a feature is enabled.
 * Renders children if the feature is active, otherwise shows a fallback.
 */
export function FeatureGate({ featureKey, children, fallback }: FeatureGateProps) {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/features")
      .then((r) => r.json())
      .then((data) => {
        const features: Record<string, boolean> = data.features ?? {};
        setEnabled(features[featureKey] ?? true);
      })
      .catch(() => {
        // If we can't read features, allow access (fail-open)
        setEnabled(true);
      });
  }, [featureKey]);

  // Loading state — show nothing briefly
  if (enabled === null) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Laddar...</p>
      </div>
    );
  }

  if (!enabled) {
    return (
      fallback ?? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-6">
            <Icon name="lock" size={28} className="text-muted-foreground/50" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Funktionen är inte aktiverad
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Den här funktionen ingår inte i din nuvarande plan. Kontakta din administratör
            för att aktivera den.
          </p>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Icon name="arrow-left" size={14} />
            Tillbaka till upphandlingar
          </Link>
        </div>
      )
    );
  }

  return <>{children}</>;
}
