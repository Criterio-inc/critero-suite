"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

// Plan color/label maps
const PLAN_LABELS: Record<string, string> = { trial: "Trial", starter: "Starter", professional: "Professional", enterprise: "Enterprise" };
const PLAN_COLORS: Record<string, string> = {
  trial: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  starter: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  professional: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
  enterprise: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};
const ROLE_LABELS: Record<string, string> = { admin: "Administratör", member: "Medlem", viewer: "Läsbehörighet" };

const PLAN_INFO = [
  { key: "trial", label: "Trial", price: "Gratis", maxUsers: 3, features: ["Upphandling (bas)", "1 arende", "Reflektionsstöd (läs)"], missing: ["Verktyg", "Mognadmatning", "AI-Mognadmatning", "Utbildning"] },
  { key: "starter", label: "Starter", price: "990 kr/man", maxUsers: 10, features: ["Upphandling (full)", "Verktyg (alla)", "Reflektionsstöd", "Export", "5 arenden"], missing: ["Mognadmatning", "AI-Mognadmatning", "Utbildning"] },
  { key: "professional", label: "Professional", price: "1 990 kr/man", maxUsers: 50, features: ["Allt i Starter", "Mognadmatning", "AI-Mognadmatning", "Utbildning", "Obegransat arenden"], missing: ["White-label", "Dedicerad support"] },
  { key: "enterprise", label: "Enterprise", price: "Offert", maxUsers: 999, features: ["Allt i Professional", "Obegransat anvandare", "White-label (kommande)", "Prioriterad support", "SLA"], missing: [] },
];

interface OrgMember {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: string;
  joinedAt: string;
}

interface OrgInvitation {
  id: string;
  email: string;
  role: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

interface OrgData {
  id: string;
  name: string;
  slug: string;
  plan: string;
  maxUsers: number;
  memberCount: number;
  caseCount: number;
  members: OrgMember[];
  invitations: OrgInvitation[];
}

export default function OrgPage() {
  const [org, setOrg] = useState<OrgData | null>(null);
  const [userRole, setUserRole] = useState("");
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);
  const [noOrg, setNoOrg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [inviting, setInviting] = useState(false);
  const [copiedToken, setCopiedToken] = useState("");

  // Setup form state
  const [setupName, setSetupName] = useState("");
  const [setupSlug, setSetupSlug] = useState("");
  const [setupPlan, setSetupPlan] = useState("enterprise");
  const [creating, setCreating] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [showPlanInfo, setShowPlanInfo] = useState(false);

  const isAdmin = userRole === "admin";

  const fetchOrg = () => {
    fetch("/api/org")
      .then((r) => r.json())
      .then((data) => {
        if (data.noOrg) {
          setNoOrg(true);
          setIsPlatformAdmin(data.isPlatformAdmin ?? false);
        } else if (data.organization) {
          setNoOrg(false);
          setOrg(data.organization);
          setUserRole(data.userRole ?? "");
          setIsPlatformAdmin(data.isPlatformAdmin ?? false);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchOrg(); }, []);

  const createOrg = async () => {
    if (!setupName.trim()) return;
    setCreating(true);
    setSetupError("");
    const slug = setupSlug.trim() || setupName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const res = await fetch("/api/org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: setupName.trim(), slug, plan: setupPlan }),
    });
    if (res.ok) {
      setNoOrg(false);
      fetchOrg();
    } else {
      const data = await res.json().catch(() => ({}));
      setSetupError(data.error ?? "Kunde inte skapa organisation");
    }
    setCreating(false);
  };

  const [inviteError, setInviteError] = useState("");
  const [lastInviteLink, setLastInviteLink] = useState("");

  const invite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setInviteError("");
    setLastInviteLink("");
    const res = await fetch("/api/org/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setInviteEmail("");
      if (data.inviteLink) {
        const fullLink = data.inviteLink.startsWith("http")
          ? data.inviteLink
          : `${window.location.origin}${data.inviteLink}`;
        setLastInviteLink(fullLink);
      }
      fetchOrg();
    } else {
      setInviteError(data.error ?? "Kunde inte skapa inbjudan");
    }
    setInviting(false);
  };

  const revokeInvite = async (invitationId: string) => {
    await fetch("/api/org/invitations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitationId }),
    });
    fetchOrg();
  };

  const removeMember = async (userId: string) => {
    await fetch("/api/org/members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    fetchOrg();
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><p className="text-sm text-muted-foreground">Laddar...</p></div>;

  /* ---- No org: show setup for admin, or info for regular users ---- */
  if (!org || noOrg) {
    return (
      <div className="min-h-screen">
        <div className="border-b border-border/60 bg-card/60">
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
              <span>/</span>
              <span className="text-foreground">Organisation</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Organisation</h1>
          </div>
        </div>
        <div className="px-8 py-8 max-w-xl">
          {/* Plan info popup */}
          {showPlanInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowPlanInfo(false)}>
              <div className="bg-card border border-border/60 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Plannivaer</h3>
                    <p className="text-xs text-muted-foreground">Jamforelse av funktioner och prisbild per plan</p>
                  </div>
                  <button onClick={() => setShowPlanInfo(false)} className="p-2 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer">
                    <Icon name="x" size={18} className="text-muted-foreground" />
                  </button>
                </div>
                <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {PLAN_INFO.map((p) => (
                    <div key={p.key} className={`rounded-xl border-2 ${p.key === setupPlan ? "border-primary" : "border-border/40"} bg-card p-4 space-y-3`}>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PLAN_COLORS[p.key] ?? PLAN_COLORS.trial}`}>
                          {p.label}
                        </span>
                        <p className="text-xl font-bold text-foreground mt-1">{p.price}</p>
                        <p className="text-[10px] text-muted-foreground">Max {p.maxUsers === 999 ? "obegransat" : p.maxUsers} anvandare</p>
                      </div>
                      <div className="space-y-1.5">
                        {p.features.map((f) => (
                          <div key={f} className="flex items-start gap-1.5 text-xs">
                            <Icon name="check" size={12} className="text-green-500 mt-0.5 shrink-0" />
                            <span className="text-foreground">{f}</span>
                          </div>
                        ))}
                        {p.missing.map((f) => (
                          <div key={f} className="flex items-start gap-1.5 text-xs">
                            <Icon name="x" size={12} className="text-muted-foreground/30 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground/50 line-through">{f}</span>
                          </div>
                        ))}
                      </div>
                      {p.key !== setupPlan && (
                        <button
                          onClick={() => { setSetupPlan(p.key); setShowPlanInfo(false); }}
                          className="w-full rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer"
                        >
                          Valj
                        </button>
                      )}
                      {p.key === setupPlan && (
                        <div className="w-full rounded-lg bg-primary/10 px-3 py-1.5 text-xs text-primary font-medium text-center">
                          Vald
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-border/40 text-center">
                  <p className="text-[10px] text-muted-foreground/50">
                    Priserna ar forslag. Kontakta kontakt@criteroconsulting.se for offert.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isPlatformAdmin ? (
            <section className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
                  <Icon name="building-2" size={24} className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Skapa din organisation</h2>
                <p className="text-sm text-muted-foreground">
                  Du är plattformsadmin men tillhör ingen organisation ännu. Skapa en för att komma igång.
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Organisationsnamn</label>
                  <input
                    type="text"
                    value={setupName}
                    onChange={(e) => setSetupName(e.target.value)}
                    placeholder="T.ex. Critero Consulting AB"
                    className="mt-1 w-full rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Slug (URL-vänligt namn)</label>
                  <input
                    type="text"
                    value={setupSlug}
                    onChange={(e) => setSetupSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder={setupName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "critero-consulting"}
                    className="mt-1 w-full rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Plan
                    <button
                      type="button"
                      onClick={() => setShowPlanInfo(true)}
                      className="ml-1.5 inline-flex items-center gap-0.5 text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      title="Visa plandetaljer"
                    >
                      <Icon name="help-circle" size={12} />
                    </button>
                  </label>
                  <select
                    value={setupPlan}
                    onChange={(e) => setSetupPlan(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border/60 bg-card px-4 py-2.5 text-sm"
                  >
                    <option value="enterprise">Enterprise (offert, obegransat)</option>
                    <option value="professional">Professional (1 990 kr/man)</option>
                    <option value="starter">Starter (990 kr/man)</option>
                    <option value="trial">Trial (gratis, max 3 anv.)</option>
                  </select>
                </div>
                {setupError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{setupError}</p>
                )}
                <button
                  onClick={createOrg}
                  disabled={creating || !setupName.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                >
                  <Icon name="plus" size={16} />
                  {creating ? "Skapar..." : "Skapa organisation"}
                </button>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-border/60 bg-card p-8 text-center space-y-3">
              <Icon name="building-2" size={24} className="text-muted-foreground/40 mx-auto" />
              <h2 className="text-lg font-semibold text-foreground">Ingen organisation</h2>
              <p className="text-sm text-muted-foreground">
                Du tillhör ingen organisation ännu. Kontakta din administratör för att få en inbjudan.
              </p>
            </section>
          )}
          <div className="pt-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
              <Icon name="arrow-left" size={14} />
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/60 bg-card/60">
        <div className="px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Hem</Link>
            <span>/</span>
            <span className="text-foreground">Organisation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Icon name="building-2" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">{org.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLAN_COLORS[org.plan] ?? PLAN_COLORS.trial}`}>
                  {PLAN_LABELS[org.plan] ?? org.plan}
                </span>
                <span className="text-xs text-muted-foreground">{org.slug}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-4xl space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Medlemmar", value: `${org.memberCount} av ${org.maxUsers === -1 ? "\u221E" : org.maxUsers}`, icon: "users" },
            { label: "Upphandlingar", value: String(org.caseCount), icon: "clipboard-list" },
            { label: "Väntande inbjudningar", value: String(org.invitations.length), icon: "mail" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={stat.icon} size={14} className="text-muted-foreground/50" />
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">{stat.label}</p>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Members */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Medlemmar</h2>
          <div className="space-y-2">
            {org.members.map((m) => (
              <div key={m.userId} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm">
                {m.imageUrl ? (
                  <img src={m.imageUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {(m.firstName || m.email)[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {[m.firstName, m.lastName].filter(Boolean).join(" ") || m.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">{ROLE_LABELS[m.role] ?? m.role}</span>
                {isAdmin && m.userId !== org.members.find((x) => x.role === "admin")?.userId && (
                  <button onClick={() => removeMember(m.userId)} className="text-xs text-red-500 hover:text-red-700 cursor-pointer">
                    <Icon name="x" size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Invitations (admin only) */}
        {isAdmin && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Bjud in</h2>
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="E-postadress"
                className="flex-1 rounded-xl border border-border/60 bg-card px-4 py-2 text-sm"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="rounded-xl border border-border/60 bg-card px-3 py-2 text-sm"
              >
                <option value="member">Medlem</option>
                <option value="viewer">Läsbehörighet</option>
                <option value="admin">Administratör</option>
              </select>
              <button
                onClick={invite}
                disabled={inviting || !inviteEmail.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
              >
                <Icon name="send" size={14} />
                {inviting ? "Skickar..." : "Bjud in"}
              </button>
            </div>

            {inviteError && (
              <p className="text-sm text-red-600 dark:text-red-400">{inviteError}</p>
            )}

            {lastInviteLink && (
              <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950 p-4 space-y-2">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Inbjudan skapad! Skicka denna länk till användaren:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-white dark:bg-black/20 rounded-lg px-3 py-2 truncate border border-green-200 dark:border-green-800">
                    {lastInviteLink}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(lastInviteLink);
                      setCopiedToken("last");
                      setTimeout(() => setCopiedToken(""), 2000);
                    }}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 cursor-pointer"
                  >
                    <Icon name={copiedToken === "last" ? "check" : "copy"} size={12} />
                    {copiedToken === "last" ? "Kopierad!" : "Kopiera"}
                  </button>
                </div>
                <p className="text-[10px] text-green-700 dark:text-green-400">
                  Alternativt: Om du skapar användaren i Clerk med samma e-post, kopplas hen automatiskt till organisationen vid inloggning.
                </p>
              </div>
            )}

            {org.invitations.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">Väntande inbjudningar</p>
                {org.invitations.map((inv) => (
                  <div key={inv.id} className="rounded-xl border border-border/40 bg-card/50 px-4 py-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon name="mail" size={14} className="text-muted-foreground/50" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{inv.email}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {ROLE_LABELS[inv.role] ?? inv.role} · Utgår {new Date(inv.expiresAt).toLocaleDateString("sv-SE")}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/invite/${inv.token}`;
                          navigator.clipboard.writeText(link);
                          setCopiedToken(inv.token);
                          setTimeout(() => setCopiedToken(""), 2000);
                        }}
                        className="text-xs text-primary hover:text-primary/80 cursor-pointer inline-flex items-center gap-1"
                        title="Kopiera inbjudningslänk"
                      >
                        <Icon name={copiedToken === inv.token ? "check" : "copy"} size={12} />
                        {copiedToken === inv.token ? "Kopierad!" : "Kopiera länk"}
                      </button>
                      <button onClick={() => revokeInvite(inv.id)} className="text-xs text-red-500 hover:text-red-700 cursor-pointer">
                        Avbryt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Back link */}
        <div className="pt-2 pb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5">
            <Icon name="arrow-left" size={14} />
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}
