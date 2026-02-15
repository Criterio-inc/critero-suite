"use client";

import { useEffect, useState } from "react";
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
  const [success, setSuccess] = useState("");

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

  const [needsLogin, setNeedsLogin] = useState(false);

  const accept = async () => {
    setAccepting(true);
    setError("");
    try {
      const res = await fetch(`/api/invite/${token}`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess(data.message ?? "Klart!");
        setTimeout(() => router.push("/"), 1500);
      } else if (res.status === 401 || data.code === "NOT_AUTHENTICATED") {
        setNeedsLogin(true);
      } else {
        setError(data.error ?? "Kunde inte acceptera inbjudan");
      }
    } catch {
      setError("Nätverksfel — försök igen");
    }
    setAccepting(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Validerar inbjudan...</p>
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
            <p className="text-sm text-muted-foreground">Du omdirigeras till organisationssidan...</p>
          </div>
        )}

        {/* Error state (no invite data) */}
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

        {/* Valid invite — show accept UI */}
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

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}

            {needsLogin ? (
              <div className="space-y-3">
                <p className="text-sm text-amber-700 dark:text-amber-300 text-center">
                  Du måste logga in eller skapa ett konto först.
                </p>
                <Link
                  href={`/sign-in?redirect_url=/invite/${token}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Icon name="log-in" size={16} />
                  Logga in för att acceptera
                </Link>
              </div>
            ) : (
              <button
                onClick={accept}
                disabled={accepting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <Icon name="check" size={16} />
                {accepting ? "Accepterar..." : "Acceptera inbjudan"}
              </button>
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
