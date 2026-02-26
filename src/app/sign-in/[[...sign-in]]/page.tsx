"use client";

import { SignInButton, SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

export default function SignInPage() {
  // Track whether the embedded Clerk widget rendered any visible content
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [checkDone, setCheckDone] = useState(false);

  useEffect(() => {
    // After a short delay, check if the Clerk widget rendered
    const timer = setTimeout(() => {
      const widget = document.querySelector("[data-clerk-sign-in]");
      const hasContent = widget && widget.children.length > 0 && widget.offsetHeight > 50;
      setWidgetLoaded(!!hasContent);
      setCheckDone(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
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
        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Logga in
            </h1>
            <p className="text-sm text-muted-foreground">
              Åtkomst kräver inbjudan
            </p>
          </div>

          {/* Primary: SignInButton with modal (most reliable) */}
          <div className="space-y-4">
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors cursor-pointer">
                <Icon name="arrow-right" size={16} />
                Logga in på Critero Suite
              </button>
            </SignInButton>
          </div>

          {/* Embedded Clerk widget (hidden container — shown only if it actually renders) */}
          <div
            className={`transition-all duration-300 ${
              checkDone && !widgetLoaded ? "hidden" : ""
            }`}
            data-clerk-sign-in
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-3 text-muted-foreground/60">
                  eller
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <SignIn
                routing="path"
                path="/sign-in"
                forceRedirectUrl="/"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-sm border border-border rounded-2xl",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "rounded-xl",
                    formButtonPrimary: "rounded-xl font-medium shadow-sm",
                    formFieldInput: "rounded-xl",
                    footerActionLink: "text-primary hover:text-primary/80",
                    footer: "hidden",
                  },
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Critero Consulting AB &middot;{" "}
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Villkor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
