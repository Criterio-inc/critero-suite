"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

export default function SignInPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Fallback: if Clerk widget doesn't render after a timeout, show help text
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar — matches landing page */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-base font-bold text-white">
              C
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Critero{" "}
              <span className="font-light text-muted-foreground">Suite</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="arrow-left" size={14} />
            Tillbaka
          </Link>
        </div>
      </header>

      {/* Sign-in content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Logga in
            </h1>
            <p className="text-sm text-muted-foreground">
              Logga in för att komma åt plattformen
            </p>
          </div>

          {/* Clerk SignIn component with dark mode support */}
          <div className="flex justify-center">
            <SignIn
              routing="path"
              path="/sign-in"
              forceRedirectUrl="/"
              appearance={{
                variables: isDark
                  ? {
                      colorPrimary: "#818cf8",
                      colorBackground: "#1a1a2e",
                      colorText: "#e2e8f0",
                      colorTextSecondary: "#94a3b8",
                      colorInputBackground: "#0f172a",
                      colorInputText: "#e2e8f0",
                      colorNeutral: "#e2e8f0",
                      borderRadius: "0.75rem",
                    }
                  : {
                      colorPrimary: "#6366f1",
                      borderRadius: "0.75rem",
                    },
                elements: {
                  rootBox: "w-full",
                  card: "shadow-sm border border-border rounded-2xl bg-card",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "rounded-xl border-border hover:bg-accent/50",
                  formButtonPrimary:
                    "rounded-xl font-medium shadow-sm",
                  formFieldInput:
                    "rounded-xl border-border",
                  footerActionLink: "text-primary hover:text-primary/80",
                  footer: "hidden",
                },
              }}
            />
          </div>

          {/* Fallback if Clerk doesn't load */}
          {showFallback && (
            <div className="rounded-xl border border-border/60 bg-card/50 p-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Inloggningsformuläret laddas inte?
              </p>
              <p className="text-xs text-muted-foreground/70">
                Kontrollera att JavaScript är aktiverat och att inga
                annonsblockerare blockerar tredjepartstjänster. Kontakta{" "}
                <span className="text-foreground">
                  kontakt@criteroconsulting.se
                </span>{" "}
                om problemet kvarstår.
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Critero Consulting AB
          </p>
        </div>
      </div>
    </div>
  );
}
