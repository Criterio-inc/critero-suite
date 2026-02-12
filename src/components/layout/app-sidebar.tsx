"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_ITEMS = [
  { href: "/cases", label: "Upphandlingar", icon: "clipboard-list" },
  { href: "/library", label: "Bibliotek", icon: "library" },
  { href: "/help", label: "Hjälpcenter", icon: "help-circle" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border/60 bg-card">
      <div className="flex h-14 items-center border-b border-border/60 px-5">
        <Link href="/cases" className="flex items-center gap-2.5 font-semibold text-foreground">
          <Icon name="scale" size={20} className="text-primary" />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">Criterio</span>
            <span className="text-[9px] text-muted-foreground font-normal tracking-wide">Upphandling LOU</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {NAV_ITEMS.map((item) => {
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
      </nav>
      <div className="border-t border-border/40 px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground/60 tracking-wide">&copy; Criterio Consulting AB</p>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 text-[9px] text-muted-foreground/50">
          <Link href="/terms" className="hover:text-foreground transition-colors">Villkor &amp; data</Link>
          <span>&middot;</span>
          <a href="mailto:kontakt@criteroconsulting.se" className="hover:text-foreground transition-colors">Kontakt</a>
        </div>
      </div>
    </aside>
  );
}
