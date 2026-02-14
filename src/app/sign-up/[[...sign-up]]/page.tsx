import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function SignUpPage() {
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
