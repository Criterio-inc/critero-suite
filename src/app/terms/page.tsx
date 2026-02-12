import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/60 bg-card/60">
        <div className="px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/cases" className="hover:text-foreground transition-colors">Upphandlingar</Link>
            <span>/</span>
            <span className="text-foreground">Villkor & information</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Villkor & information</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Användarvillkor, GDPR, datahantering och kontaktuppgifter
          </p>
        </div>
      </div>

      <div className="px-8 py-8 max-w-3xl space-y-8">
        {/* Åtkomst och användarvillkor */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="file-text" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Åtkomst och användarvillkor</h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              Critero Upphandling LOU (&quot;Tjänsten&quot;) tillhandahålls av Critero Consulting AB
              som ett verktyg för stöd vid offentlig upphandling enligt Lagen om offentlig
              upphandling (LOU).
            </p>
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Icon name="shield-alert" size={14} className="text-primary" />
                Stängd tjänst — enbart inbjudan
              </p>
              <p className="text-xs">
                Tjänsten är inte öppen för allmän registrering. Åtkomst beviljas
                uteslutande genom personlig inbjudan från Critero Consulting AB.
                Ingen kan skapa ett konto utan att först ha fått en inbjudan.
              </p>
            </div>
            <p>
              Genom att använda Tjänsten accepterar du dessa villkor. Critero
              Consulting AB kan när som helst återkalla åtkomst utan motivering.
            </p>
            <p>
              Tjänsten erbjuds i befintligt skick utan garantier avseende
              tillgänglighet, korrekthet eller fullständighet. Användaren ansvarar
              själv för att verifiera att upphandlingsunderlag uppfyller gällande
              lagkrav.
            </p>
            <p>
              Critero Consulting AB förbehåller sig rätten att uppdatera, förändra
              eller avveckla tjänsten utan föregående meddelande. Obehörig åtkomst,
              automatiserad datainsamling, reverse engineering eller användning i
              strid med svensk lag är inte tillåten.
            </p>
          </div>
        </section>

        {/* GDPR och personuppgifter */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="shield-alert" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">GDPR och personuppgifter</h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <h3 className="text-sm font-semibold text-foreground">Personuppgiftsansvarig</h3>
            <p>
              Critero Consulting AB är personuppgiftsansvarig för de personuppgifter
              som behandlas i Tjänsten, i enlighet med EU:s dataskyddsförordning
              (GDPR, 2016/679).
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Vilka uppgifter samlas in?</h3>
            <p>
              Vid inloggning behandlas de uppgifter du anger via autentiseringstjänsten:
              <strong className="text-foreground"> e-postadress</strong> och
              <strong className="text-foreground"> namn</strong>. Inga ytterligare
              personuppgifter samlas in automatiskt.
            </p>
            <p>
              Upphandlingsdata som du matar in i Tjänsten (behov, krav, risker,
              etc.) kan i undantagsfall innehålla personuppgifter om du själv väljer
              att ange sådana. Du ansvarar för att inte registrera känsliga
              personuppgifter (art. 9 GDPR) i Tjänsten.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Rättslig grund</h3>
            <p>
              Behandlingen grundas på <em>berättigat intresse</em> (art. 6.1 f GDPR)
              — att tillhandahålla och administrera Tjänsten åt inbjudna användare.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Dina rättigheter</h3>
            <p>
              Enligt GDPR har du rätt att:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Begära <strong className="text-foreground">tillgång</strong> till dina personuppgifter</li>
              <li>Begära <strong className="text-foreground">rättelse</strong> av felaktiga uppgifter</li>
              <li>Begära <strong className="text-foreground">radering</strong> av dina uppgifter</li>
              <li>Begära <strong className="text-foreground">begränsning</strong> av behandlingen</li>
              <li>Invända mot behandling baserad på berättigat intresse</li>
              <li>Lämna <strong className="text-foreground">klagomål</strong> till Integritetsskyddsmyndigheten (IMY)</li>
            </ul>
            <p>
              Kontakta oss via e-post nedan för att utöva dina rättigheter. Vi
              besvarar förfrågningar inom 30 dagar.
            </p>
          </div>
        </section>

        {/* Datahantering och tredjeparter */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="monitor" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Datahantering och tredjeparter</h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <h3 className="text-sm font-semibold text-foreground">Lagring och säkerhet</h3>
            <p>
              Upphandlingsdata lagras i en molndatabas med kryptering i vila och
              under transport. All kommunikation sker via HTTPS (TLS 1.2+).
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Underbiträden</h3>
            <p>
              Följande tredjepartstjänster används för att driva Tjänsten:
            </p>
            <div className="grid gap-2">
              <div className="rounded-xl border border-border/60 p-3">
                <p className="text-xs font-semibold text-foreground">Clerk</p>
                <p className="text-xs">Autentisering och användarhantering. Lagrar e-post och namn. USA-baserat, EU-dataöverföring enligt standardavtalsklausuler (SCC).</p>
              </div>
              <div className="rounded-xl border border-border/60 p-3">
                <p className="text-xs font-semibold text-foreground">Vercel</p>
                <p className="text-xs">Hosting och infrastruktur. Bearbetar serverförfrågningar. USA-baserat, SCC-avtal.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-3">
                <p className="text-xs font-semibold text-foreground">Turso (LibSQL)</p>
                <p className="text-xs">Databaslagring av upphandlingsdata. Krypterad lagring.</p>
              </div>
            </div>
            <p>
              Inga personuppgifter eller upphandlingsdata säljs, delas eller
              överförs till andra parter utöver ovan nämnda underbiträden.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Cookies</h3>
            <p>
              Tjänsten använder enbart tekniskt nödvändiga cookies
              (sessionscookie för inloggning). Inga spårningscookies, analytics
              eller marknadsföringscookies från tredje part används.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-1">Dataexport och radering</h3>
            <p>
              Du kan när som helst exportera all upphandlingsdata via
              JSON-export i applikationen. Vid begäran om radering tar vi bort
              all din data från samtliga system inom 30 dagar.
            </p>
          </div>
        </section>

        {/* Ansvarsbegränsning */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="alert-triangle" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Ansvarsbegränsning</h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              Tjänsten är ett stödverktyg och ersätter inte juridisk rådgivning.
              Critero Consulting AB ansvarar inte för beslut som fattas baserat på
              information eller underlag framtagna i Tjänsten.
            </p>
            <p>
              Användaren ansvarar för att upphandlingsunderlag granskas av behörig
              person innan publicering och att all användning sker i enlighet med
              LOU och övrig tillämplig lagstiftning.
            </p>
            <p>
              Critero Consulting AB ansvarar inte för eventuella förluster,
              direkta eller indirekta, som uppstår till följd av användning av
              Tjänsten, inklusive men inte begränsat till datavförlust, driftstopp
              eller felaktiga upphandlingsunderlag.
            </p>
          </div>
        </section>

        {/* Kontaktuppgifter */}
        <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Icon name="users" size={16} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
          </div>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 p-4 space-y-1">
                <p className="text-xs font-semibold text-foreground">Critero Consulting AB</p>
                <p className="text-xs">Organisationsnummer: [att fylla i]</p>
                <p className="text-xs">Personuppgiftsansvarig</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4 space-y-1">
                <p className="text-xs font-semibold text-foreground">E-post</p>
                <a
                  href="mailto:kontakt@criteroconsulting.se"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  kontakt@criteroconsulting.se
                </a>
                <p className="text-xs mt-1">GDPR-förfrågningar, support och allmänna frågor</p>
              </div>
            </div>
            <p>
              Vi besvarar alla förfrågningar inom 30 dagar. Vid
              dataskyddsrelaterade ärenden har du även rätt att vända dig till{" "}
              <a
                href="https://www.imy.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Integritetsskyddsmyndigheten (IMY)
              </a>
              .
            </p>
          </div>
        </section>

        {/* Senast uppdaterad */}
        <p className="text-[10px] text-muted-foreground/50 text-center">
          Senast uppdaterad: februari 2025
        </p>

        {/* Tillbaka */}
        <div className="pt-2 pb-8">
          <Link
            href="/cases"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <Icon name="arrow-left" size={14} />
            Tillbaka till upphandlingar
          </Link>
        </div>
      </div>
    </div>
  );
}
