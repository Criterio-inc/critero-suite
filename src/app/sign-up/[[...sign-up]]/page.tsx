"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

interface InviteInfo {
  email: string;
  role: string;
  org: { name: string };
}

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite_token");

  const [invite, setInvite] = useState<InviteInfo | null>(null);
  const [loading, setLoading] = useState(!!inviteToken);
  const [tokenError, setTokenError] = useState("");

  // Validate invite token on mount
  useEffect(() => {
    if (!inviteToken) return;
    fetch(`/api/invite/${inviteToken}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.invitation) {
          setInvite(data.invitation);
        } else {
          setTokenError(data.error ?? "Ogiltig inbjudan");
        }
        setLoading(false);
      })
      .catch(() => {
        setTokenError("Kunde inte validera inbjudan");
        setLoading(false);
      });
  }, [inviteToken]);

  // Loading state while validating token
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center">
            <Icon name="loader" size={24} className="text-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground">Validerar inbjudan...</p>
        </div>
      </div>
    );
  }

  // Valid invite token → show Clerk sign-up
  if (inviteToken && invite) {
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
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-6">
            {/* Invite context */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="mail-open" size={16} className="text-primary" />
                <p className="text-sm font-medium text-foreground">
                  Inbjudan till {invite.org.name}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Skapa ett konto med <strong className="text-foreground">{invite.email}</strong> för att gå med.
              </p>
            </div>

            {/* Clerk sign-up widget */}
            <div className="flex justify-center">
              <SignUp
                routing="path"
                path="/sign-up"
                forceRedirectUrl={`/invite/${inviteToken}`}
                initialValues={{ emailAddress: invite.email }}
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-sm border border-border rounded-2xl",
                    headerTitle: "text-lg font-semibold",
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

            {/* Already have account */}
            <p className="text-center text-sm text-muted-foreground">
              Har du redan ett konto?{" "}
              <Link
                href={`/sign-in?redirect_url=${encodeURIComponent(`/invite/${inviteToken}`)}`}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Logga in
              </Link>
            </p>

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

  // Invalid/expired token
  if (inviteToken && tokenError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2.5">
              <Icon name="scale" size={28} className="text-primary" />
              <div className="text-left">
                <h1 className="text-xl font-bold tracking-tight text-foreground">Critero</h1>
                <p className="text-[10px] text-muted-foreground tracking-wide">Upphandling LOU</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900">
              <Icon name="x" size={24} className="text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Ogiltig inbjudan</h2>
            <p className="text-sm text-muted-foreground">{tokenError}</p>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Logga in
            </Link>
          </div>

          <p className="text-center text-[10px] text-muted-foreground">
            &copy; Critero Consulting AB
          </p>
        </div>
      </div>
    );
  }

  // No token at all → closed service (existing behavior)
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2.5">
            <Icon name="scale" size={28} className="text-primary" />
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-foreground">Critero</h1>
              <p className="text-[10px] text-muted-foreground tracking-wide">Upphandling LOU</p>
            </div>
          </div>
        </div>

        {/* Invite-only notice */}
        <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Icon name="shield-alert" size={24} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Stängd tjänst</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Critero Upphandling LOU är inte öppen för allmän registrering.
            Åtkomst beviljas enbart genom personlig inbjudan.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Har du fått en inbjudan? Klicka på länken i ditt e-postmeddelande
            för att aktivera ditt konto.
          </p>
          <div className="pt-2 space-y-3">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors w-full"
            >
              Har redan konto? Logga in
            </Link>
            <a
              href="mailto:kontakt@criteroconsulting.se"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors w-full"
            >
              Kontakta oss för åtkomst
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-muted-foreground">
          &copy; Critero Consulting AB
        </p>
      </div>
    </div>
  );
}
