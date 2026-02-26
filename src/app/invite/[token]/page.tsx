"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

const ROLE_LABELS: Record<string, string> = {
  admin: "Administratör",
  member: "Medlem",
  viewer: "Läsbehörighet",
};

interface InviteData {
  id: string;
  email: string;
  role: string;
  expiresAt: string;
  org: { id: string; name: string; slug: string; plan: string };
}

export default function InviteAcceptPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [invite, setInvite] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [success, setSuccess] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const autoAcceptAttempted = useRef(false);

  // 1. Fetch invite details
  useEffect(() => {
    fetch(`/api/invite/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.invitation) {
          setInvite(data.invitation);
        } else {
          setError(data.error ?? "Ogiltig inbjudan");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Kunde inte validera inbjudan");
        setLoading(false);
      });
  }, [token]);

  // 2. Auto-accept: try immediately when invite data is loaded.
  //    If user is logged in → accept succeeds → done.
  //    If not logged in → 401 → show "Logga in" UI.
  useEffect(() => {
    if (!invite || autoAcceptAttempted.current) return;
    autoAcceptAttempted.current = true;
    tryAccept();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invite]);

  const tryAccept = async () => {
    setAccepting(true);
    setError("");
    setErrorCode("");
    try {
      const res = await fetch(`/api/invite/${token}`, { method: "POST" });
      const data = await res.json();

      if (res.ok && data.ok) {
        setSuccess(data.message ?? "Klart!");
        setTimeout(() => router.push("/"), 1500);
      } else if (res.status === 401 || data.code === "NOT_AUTHENTICATED") {
        // Not logged in — show sign-in UI (no error message, this is expected)
        setNeedsLogin(true);
      } else if (data.code === "EMAIL_MISMATCH") {
        setErrorCode("EMAIL_MISMATCH");
        setError(data.error ?? "E-postadressen matchar inte inbjudan");
      } else {
        setError(data.error ?? "Kunde inte acceptera inbjudan");
      }
    } catch {
      setError("Nätverksfel — försök igen");
    }
    setAccepting(false);
  };

  if (loading || (accepting && !needsLogin && !error && !success)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-10 w-10 items-center justify-center">
            <Icon name="loader" size={24} className="text-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground">
            {accepting ? "Accepterar inbjudan..." : "Validerar inbjudan..."}
          </p>
        </div>
      </div>
    );
  }

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

        {/* Success state */}
        {success && (
          <div className="rounded-2xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900">
              <Icon name="check" size={24} className="text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{success}</h2>
            <p className="text-sm text-muted-foreground">Du omdirigeras...</p>
          </div>
        )}

        {/* Error state (no invite data — invalid/expired token) */}
        {error && !invite && (
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900">
              <Icon name="x" size={24} className="text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Ogiltig inbjudan</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Logga in
            </Link>
          </div>
        )}

        {/* Valid invite — show appropriate UI based on state */}
        {invite && !success && (
          <div className="rounded-2xl border border-border/60 bg-card p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Icon name="mail-open" size={24} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Du har blivit inbjuden!</h2>
              <p className="text-sm text-muted-foreground">
                Du har bjudits in till <strong className="text-foreground">{invite.org.name}</strong> som{" "}
                <strong className="text-foreground">{ROLE_LABELS[invite.role] ?? invite.role}</strong>.
              </p>
            </div>

            <div className="rounded-xl bg-muted/30 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="building-2" size={14} className="text-muted-foreground/50" />
                <span className="text-muted-foreground">Organisation:</span>
                <span className="text-foreground font-medium">{invite.org.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="shield" size={14} className="text-muted-foreground/50" />
                <span className="text-muted-foreground">Roll:</span>
                <span className="text-foreground font-medium">{ROLE_LABELS[invite.role] ?? invite.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="mail" size={14} className="text-muted-foreground/50" />
                <span className="text-muted-foreground">Inbjudan till:</span>
                <span className="text-foreground font-medium">{invite.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="clock" size={14} className="text-muted-foreground/50" />
                <span className="text-muted-foreground">Giltig t.o.m.:</span>
                <span className="text-foreground font-medium">
                  {new Date(invite.expiresAt).toLocaleDateString("sv-SE")}
                </span>
              </div>
            </div>

            {/* Email mismatch — logged in with wrong account */}
            {errorCode === "EMAIL_MISMATCH" && (
              <div className="space-y-3">
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                    {error}
                  </p>
                </div>
                <Link
                  href={`/sign-in?redirect_url=${encodeURIComponent(`/invite/${token}`)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Icon name="log-in" size={16} />
                  Logga in med rätt konto
                </Link>
              </div>
            )}

            {/* Other errors */}
            {error && errorCode !== "EMAIL_MISMATCH" && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}

            {/* Not logged in — show sign-in button directly (no confusing error first) */}
            {needsLogin && !error && (
              <div className="space-y-3">
                <Link
                  href={`/sign-in?redirect_url=${encodeURIComponent(`/invite/${token}`)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Icon name="log-in" size={16} />
                  Logga in och gå med
                </Link>
                <p className="text-[11px] text-muted-foreground text-center">
                  Du loggas in och kopplas automatiskt till {invite.org.name}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-[10px] text-muted-foreground">
          &copy; Critero Consulting AB
        </p>
      </div>
    </div>
  );
}
