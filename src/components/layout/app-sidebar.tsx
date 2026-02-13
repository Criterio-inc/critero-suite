"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Lazy-load UserButton so @clerk/nextjs isn't bundled when Clerk is disabled
const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => {
    function Btn() {
      return (
        <mod.UserButton
          afterSignOutUrl="/sign-in"
          appearance={{ elements: { avatarBox: "h-7 w-7" } }}
        />
      );
    }
    return Btn;
  }),
  { ssr: false }
);

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkEnabled =
  !!clerkKey &&
  /^pk_(test|live)_[A-Za-z0-9]{20,}/.test(clerkKey);

const ADMIN_EMAIL = "par.levander@criteroconsulting.se";

// Lazy-load admin check so useUser only runs inside ClerkProvider
const AdminNavLink = dynamic(
  () => import("@clerk/nextjs").then((mod) => {
    function AdminLink({ pathname }: { pathname: string }) {
      const { user } = mod.useUser();
      const isAdmin = user?.emailAddresses?.some(
        (e) => e.emailAddress === ADMIN_EMAIL
      );
      if (!isAdmin) return null;
      return (
        <>
          <div className="my-2 border-t border-border/30" />
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
              pathname.startsWith("/admin")
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon name="crown" size={16} />
            <span>Admin</span>
          </Link>
        </>
      );
    }
    return AdminLink;
  }),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Navigation config — each item optionally maps to a feature key     */
/* ------------------------------------------------------------------ */

interface NavItem {
  href: string;
  label: string;
  icon: string;
  /** If set, the item is hidden when this feature is disabled */
  featureKey?: string;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { href: "/cases", label: "Upphandlingar", icon: "clipboard-list" },
      { href: "/library", label: "Bibliotek", icon: "library" },
    ],
  },
  {
    label: "Verktyg",
    items: [
      { href: "/tools/benefit-calculator", label: "Nyttokalkyl", icon: "calculator", featureKey: "tools.benefit-calculator" },
      { href: "/tools/risk-matrix", label: "Riskmatris", icon: "shield-alert", featureKey: "tools.risk-matrix" },
      { href: "/tools/evaluation-model", label: "Utvärderingsmodell", icon: "scale", featureKey: "tools.evaluation-model" },
      { href: "/tools/timeline-planner", label: "Tidslinjeplanerare", icon: "clock", featureKey: "tools.timeline-planner" },
      { href: "/tools/stakeholder-map", label: "Intressentanalys", icon: "users", featureKey: "tools.stakeholder-map" },
      { href: "/tools/kunskapsbank", label: "Kunskapsbank", icon: "book-open", featureKey: "tools.kunskapsbank" },
    ],
  },
  {
    label: "Utbildning",
    items: [
      { href: "/training", label: "Kurser", icon: "graduation-cap", featureKey: "training" },
    ],
  },
  {
    items: [
      { href: "/help", label: "Hjälpcenter", icon: "help-circle" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Hook: fetch feature flags                                          */
/* ------------------------------------------------------------------ */

function useFeatures(): Record<string, boolean> | null {
  const [features, setFeatures] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    fetch("/api/features")
      .then((r) => r.json())
      .then((data) => setFeatures(data.features ?? {}))
      .catch(() => setFeatures(null));
  }, []);

  return features;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AppSidebar() {
  const pathname = usePathname();
  const features = useFeatures();

  // Hide sidebar on auth pages
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  /** Filter items based on feature flags. If features haven't loaded yet, show all. */
  function filterItems(items: NavItem[]): NavItem[] {
    if (!features) return items; // loading — show all
    return items.filter((item) => {
      if (!item.featureKey) return true; // always-on item
      return features[item.featureKey] !== false;
    });
  }

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border/60 bg-card">
      <div className="flex h-14 items-center border-b border-border/60 px-5">
        <Link href="/cases" className="flex items-center gap-2.5 font-semibold text-foreground">
          <Icon name="scale" size={20} className="text-primary" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">Critero</span>
            <span className="text-[9px] text-muted-foreground font-normal tracking-wide">Upphandling LOU</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_SECTIONS.map((section, idx) => {
          const visibleItems = filterItems(section.items);
          // Hide entire section if no items are visible
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              {idx > 0 && <div className="my-2 border-t border-border/30" />}
              {section.label && (
                <p className="px-3 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Admin link — only visible to admin */}
        {isClerkEnabled && <AdminNavLink pathname={pathname} />}
      </nav>

      {/* User section */}
      <div className="border-t border-border/40 px-4 py-3 space-y-3">
        <div className="flex items-center gap-2.5">
          {isClerkEnabled && <ClerkUserButton />}
          <ThemeToggle />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground/60 tracking-wide">&copy; Critero Consulting AB</p>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground/50">
            <Link href="/terms" className="hover:text-foreground transition-colors">Villkor &amp; data</Link>
            <span>&middot;</span>
            <a href="mailto:kontakt@criteroconsulting.se" className="hover:text-foreground transition-colors">Kontakt</a>
          </div>
        </div>
      </div>
    </aside>
  );
}
