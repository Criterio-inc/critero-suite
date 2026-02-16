import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Critero Suite — Säljmaterial",
  description:
    "Upptäck Critero Suite: samlad plattform för upphandling, analysverktyg och mognadsmätning.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MODULES = [
  {
    title: "Upphandling",
    description:
      "Komplett stöd för offentlig upphandling enligt LOU. Ärendehantering med faskedja, gate-evaluering, kravbibliotek, spårbarhet, export och domänprofiler.",
    features: [
      "Ärendehantering med LOU-faskedja (A\u2013D)",
      "Gate-checklist och soft validation",
      "Kravbibliotek med import till ärende",
      "Spårbarhet (TraceLinks) mellan entiteter",
      "Export till JSON, CSV och XLSX",
      "Domänprofiler (generisk LOU, avfall, socialtjänst)",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Verktyg",
    description:
      "11 analysverktyg som hjälper dig fatta bättre beslut \u2014 fr\u00e5n nyttokalkyler och riskmatriser till f\u00f6r\u00e4ndringsledning.",
    features: [
      "Nyttokalkyl och nytto-insatsanalys",
      "Riskmatris med sannolikhet \u00d7 konsekvens",
      "Utv\u00e4rderingsmodell f\u00f6r anbud",
      "Tidslinjeplanerare och processfl\u00f6de",
      "Intressentanalys och kraftf\u00e4ltsanalys",
      "ADKAR f\u00f6r\u00e4ndringsmodell och orsaksanalys",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Digital Mognadsmätning",
    description:
      "M\u00e4t organisationens digitala mognad med 22 fr\u00e5gor inom 4 dimensioner. F\u00e5 AI-st\u00f6dda insikter och j\u00e4mf\u00f6r \u00f6ver tid.",
    features: [
      "22 fr\u00e5gor inom 4 dimensioner",
      "Anonym enk\u00e4tl\u00e4nk f\u00f6r respondenter",
      "AI-genererade insikter och rekommendationer",
      "Projektbaserad hantering med tidsj\u00e4mf\u00f6relse",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "AI-Mognadsmätning",
    description:
      "Bed\u00f6m organisationens AI-mognad med 32 fr\u00e5gor inom 8 dimensioner. Inkluderar EU AI Act-aspekter.",
    features: [
      "32 fr\u00e5gor inom 8 dimensioner",
      "EU AI Act-relaterade fr\u00e5gor",
      "AI-genererad handlingsplan",
      "Benchmarking mot bransch",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M12 2a4 4 0 00-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <path d="M12 18v4M8 22h8" />
        <path d="M12 10v8" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    color: "from-violet-500 to-purple-600",
  },
];

const TARGET_GROUPS = [
  {
    title: "Upphandlare i offentlig sektor",
    description:
      "Kommuner, regioner och myndigheter som genomf\u00f6r upphandlingar enligt LOU och beh\u00f6ver strukturerat st\u00f6d.",
  },
  {
    title: "Verksamhetschefer & beslutsfattare",
    description:
      "Ledare som vill fatta datadrivna beslut med hj\u00e4lp av analysverktyg och riskbed\u00f6mningar.",
  },
  {
    title: "Digitaliseringsansvariga",
    description:
      "De som driver digital transformation och beh\u00f6ver m\u00e4ta och f\u00f6lja organisationens mognad.",
  },
  {
    title: "AI-strateger & innovationsledare",
    description:
      "Ansvariga f\u00f6r AI-implementering som beh\u00f6ver kartl\u00e4gga AI-mognad och EU AI Act-efterlevnad.",
  },
  {
    title: "Konsulter & r\u00e5dgivare",
    description:
      "Managementkonsulter som beh\u00f6ver professionella verktyg f\u00f6r uppdrag inom upphandling och organisationsutveckling.",
  },
];

const PRICING_TIERS = [
  {
    name: "Trial",
    price: "Gratis",
    period: "14 dagar",
    description: "Testa alla funktioner utan kostnad.",
    features: [
      "Alla moduler tillg\u00e4ngliga",
      "1 anv\u00e4ndare",
      "Upp till 3 \u00e4renden",
      "E-postsupport",
    ],
    cta: "Starta trial",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "2 900 kr",
    period: "/m\u00e5nad",
    description: "F\u00f6r mindre team som vill komma ig\u00e5ng.",
    features: [
      "Upphandling + Verktyg",
      "Upp till 5 anv\u00e4ndare",
      "Obegr\u00e4nsat antal \u00e4renden",
      "E-postsupport",
    ],
    cta: "Kom ig\u00e5ng",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "6 900 kr",
    period: "/m\u00e5nad",
    description: "Alla moduler f\u00f6r medelstora organisationer.",
    features: [
      "Alla 4 moduler",
      "Upp till 25 anv\u00e4ndare",
      "AI-st\u00f6dda insikter",
      "Prioriterad support",
      "Anpassade domänprofiler",
    ],
    cta: "V\u00e4lj Professional",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Offert",
    period: "",
    description: "Skr\u00e4ddarsytt f\u00f6r stora organisationer.",
    features: [
      "Alla moduler + anpassningar",
      "Obegr\u00e4nsat antal anv\u00e4ndare",
      "SSO / SAML-integration",
      "Dedikerad kontaktperson",
      "SLA och on-boarding",
      "On-premise alternativ",
    ],
    cta: "Kontakta oss",
    highlighted: false,
  },
];

const VALUE_PROPS = [
  {
    title: "Samlad plattform",
    description:
      "Slipp splittrade Excel-filer och separata system. Allt p\u00e5 ett st\u00e4lle \u2014 upphandling, analys och mognadsmätning.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Byggt f\u00f6r LOU",
    description:
      "Hela upphandlingsst\u00f6det \u00e4r designat utifr\u00e5n Lagen om offentlig upphandling med inbyggda gates och validering.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "AI-st\u00f6dda insikter",
    description:
      "F\u00e5 automatiska rekommendationer och handlingsplaner baserade p\u00e5 data fr\u00e5n mognadsmätningar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Sp\u00e5rbarhet & kvalitet",
    description:
      "Generiska sp\u00e5rl\u00e4nkar kopplar behov, krav, risker och beslut f\u00f6r full \u00f6verblick och revision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: "Svenskt & GDPR",
    description:
      "Helt p\u00e5 svenska, hostat inom EU. All data stannar under din kontroll.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Snabb implementation",
    description:
      "Kom ig\u00e5ng direkt \u2014 ingen installation kr\u00e4vs. Molnbaserat med automatisk uppdatering.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function SalesPage() {
  return (
    <div className="min-h-screen">
      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-card via-card to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative px-8 py-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/criteo-logo.svg"
              alt="Critero Suite"
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Critero Suite
              </h1>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                av Critero Consulting AB
              </p>
            </div>
          </div>
          <p className="text-xl text-foreground/80 max-w-2xl leading-relaxed mb-8">
            Samlad plattform f&ouml;r <strong>upphandling</strong>,{" "}
            <strong>analysverktyg</strong> och{" "}
            <strong>mognadsmätning</strong> — allt organisationen
            beh&ouml;ver f&ouml;r b&auml;ttre beslut, p&aring; ett
            st&auml;lle.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              Testa gratis
            </Link>
            <a
              href="mailto:kontakt@criteroconsulting.se"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              Kontakta oss
            </a>
          </div>
        </div>
      </section>

      <div className="px-8 py-12 max-w-5xl space-y-16">
        {/* ============================================================ */}
        {/*  Varf&ouml;r Critero Suite?                                   */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="Varf&ouml;r"
            title="Varf&ouml;r Critero Suite?"
            subtitle="Sex sk&auml;l att v&auml;lja en samlad plattform framf&ouml;r splittrade verktyg."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_PROPS.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  {v.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Vem &auml;r det till f&ouml;r?                               */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="M&aring;lgrupp"
            title="Vem &auml;r det till f&ouml;r?"
            subtitle="Critero Suite &auml;r byggt f&ouml;r professionella som arbetar med offentlig sektor och organisationsutveckling."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TARGET_GROUPS.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {g.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Vad ing&aring;r?                                             */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="Moduler"
            title="Vad ing&aring;r?"
            subtitle="Fyra kraftfulla moduler som t&auml;cker hela kedjan — fr&aring;n upphandling till AI-strategi."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {MODULES.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white`}
                  >
                    {m.icon}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {m.description}
                </p>
                <ul className="space-y-1.5">
                  {m.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary"
                      >
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Priser                                                       */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="Priser"
            title="Vad kostar det?"
            subtitle="Flexibla planer f&ouml;r alla storlekar. Starta gratis och skala upp n&auml;r ni v&auml;xer."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 shadow-sm flex flex-col ${
                  t.highlighted
                    ? "border-primary/50 bg-primary/5 shadow-md ring-1 ring-primary/20"
                    : "border-border/60 bg-card"
                }`}
              >
                {t.highlighted && (
                  <span className="inline-block self-start rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold text-primary-foreground mb-3 uppercase tracking-wide">
                    Popul&auml;rast
                  </span>
                )}
                <h3 className="text-lg font-bold text-foreground">
                  {t.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-bold text-foreground">
                    {t.price}
                  </span>
                  {t.period && (
                    <span className="text-xs text-muted-foreground">
                      {t.period}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-5">
                  {t.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {t.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary"
                      >
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={
                    t.name === "Enterprise"
                      ? "mailto:kontakt@criteroconsulting.se?subject=Critero Suite Enterprise"
                      : "/"
                  }
                  className={`block text-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    t.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-4 text-center">
            Alla priser exkl. moms. &Aring;rlig betalning ger 20&nbsp;% rabatt.
          </p>
        </section>

        {/* ============================================================ */}
        {/*  Tillg&aring;ng                                               */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="Tillg&aring;ng"
            title="Hur f&aring;r man tillg&aring;ng?"
            subtitle="Tre steg f&ouml;r att komma ig&aring;ng med Critero Suite."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Skapa konto",
                description:
                  "Registrera dig kostnadsfritt och f\u00e5 14 dagars trial med alla funktioner.",
              },
              {
                step: "2",
                title: "Konfigurera organisation",
                description:
                  "L\u00e4gg till ditt team, v\u00e4lj vilka moduler ni vill anv\u00e4nda och anpassa inst\u00e4llningar.",
              },
              {
                step: "3",
                title: "B\u00f6rja arbeta",
                description:
                  "Skapa ert f\u00f6rsta \u00e4rende, k\u00f6r en mognadsmätning eller utforska verktygen.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
              >
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow">
                  {s.step}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 mt-1">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  N&auml;r kan det anv&auml;ndas?                              */}
        {/* ============================================================ */}
        <section>
          <SectionHeader
            label="Tillg&auml;nglighet"
            title="N&auml;r kan det anv&auml;ndas?"
            subtitle="Critero Suite &auml;r tillg&auml;ngligt dygnet runt som molntj&auml;nst."
          />
          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Tillg\u00e4nglighet",
                  value: "24/7",
                  desc: "Molnbaserad SaaS-tj\u00e4nst",
                },
                {
                  label: "Uppstartstid",
                  value: "Direkt",
                  desc: "Ingen installation kr\u00e4vs",
                },
                {
                  label: "Uppdateringar",
                  value: "Automatiska",
                  desc: "Alltid senaste versionen",
                },
                {
                  label: "Support",
                  value: "Vardagar",
                  desc: "E-post & telefon kl. 8\u201317",
                },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-2xl font-bold text-primary mb-1">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CTA                                                          */}
        {/* ============================================================ */}
        <section className="rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 p-10 text-center space-y-5">
          <h2 className="text-2xl font-bold text-foreground">
            Redo att komma ig&aring;ng?
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Starta en gratis trial idag eller kontakta oss f&ouml;r en
            demo sk&auml;ddarsydd f&ouml;r er organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              Starta trial
            </Link>
            <a
              href="mailto:kontakt@criteroconsulting.se?subject=Demo av Critero Suite"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              Boka demo
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground/60 pb-8 space-y-1">
          <p>&copy; Critero Consulting AB. Alla r&auml;ttigheter f&ouml;rbeh&aring;llna.</p>
          <p>
            <a
              href="mailto:kontakt@criteroconsulting.se"
              className="hover:text-foreground transition-colors"
            >
              kontakt@criteroconsulting.se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared section header                                              */
/* ------------------------------------------------------------------ */

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 mb-1">
        {label}
      </p>
      <h2 className="text-xl font-bold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
