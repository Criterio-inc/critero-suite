# Produktionsanalys — Critero Suite

**Datum:** 2026-02-26
**Status:** Inför produktionslansering
**Domän:** criteroconsulting.se

---

## 1. Subdomänförslag för Clerk-produktion

Clerk kräver en riktig domän (inte `*.vercel.app`) för produktionsinstanser. Här är mina rekommendationer, rankade:

### Rekommendation: `app.criteroconsulting.se`

| # | Subdomän | Kommentar |
|---|----------|-----------|
| **1** | **`app.criteroconsulting.se`** | **Starkaste valet.** Tydligt, proffsigt, branschstandard. Kunden förstår direkt att det är "appen". Fungerar utmärkt i all kommunikation. |
| 2 | `suite.criteroconsulting.se` | Matchar produktnamnet "Critero Suite". Bra om du vill ha direkt koppling till varumärket. |
| 3 | `plattform.criteroconsulting.se` | Svenskt och beskrivande, men långt. |
| 4 | `portal.criteroconsulting.se` | Klassiskt val för kundportaler. |
| 5 | `my.criteroconsulting.se` | Kort, personligt ("min critero"). Populärt bland SaaS. |

**Mitt val: `app.criteroconsulting.se`** — kort, professionellt, och vad de flesta SaaS-bolag använder.

### DNS-konfiguration som behövs

```
# CNAME-post för Vercel
app.criteroconsulting.se  CNAME  cname.vercel-dns.com.

# Alternativt om du pekar hela domänen:
criteroconsulting.se      A      76.76.21.21
```

### Clerk-produktionskonfiguration

1. **Skapa Clerk Production Instance** på dashboard.clerk.com
2. **Lägg till domän** `app.criteroconsulting.se` i Clerk → Domains
3. **Verifiera DNS** — Clerk ger dig en TXT-post att lägga till
4. **Byt nycklar** från `pk_test_*` → `pk_live_*` i Vercel environment variables
5. **Webhook-URL** uppdateras till `https://app.criteroconsulting.se/api/webhooks/clerk`

---

## 2. Säkerhetsanalys

### 2.1 Autentisering & auktorisering — BRA

| Aspekt | Status | Detalj |
|--------|--------|--------|
| Clerk-middleware | ✅ | Skyddar alla icke-publika routes |
| `requireAuth()` | ✅ | Centraliserad i `auth-guard.ts` |
| Rollbaserad åtkomst | ✅ | admin / member / viewer med `requireWriteAccess()` |
| Org-isolering | ✅ | Cases filtreras per `orgId` |
| Platform-admin | ✅ | Env-driven med fallback |
| Webhook-signaturverifiering | ✅ | Svix-baserad (stark) |
| Audit-loggning | ✅ | Alla write-operationer loggas |
| Zod-validering | ✅ | Input valideras på alla POST/PATCH-routes |

### 2.2 Kritiska säkerhetsproblem att åtgärda

#### KRITISK: Ingen rate limiting

Applikationen har **noll rate limiting** på samtliga 45+ API-routes. Detta gör den sårbar för:
- Brute force mot token-baserade endpoints (`/api/assessments/sessions/by-token/[token]`)
- DDoS/resursuttömning
- Automatiserad datainsamling

**Åtgärd:** Implementera rate limiting via Vercels Edge Middleware eller `@upstash/ratelimit`:

```typescript
// middleware.ts — lägg till rate limiting
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "1 m"), // 30 req/min
});
```

**Prioritet: HÖG** — Bör vara på plats innan lansering.

#### KRITISK: Inga security headers

`next.config.ts` saknar helt security headers. Lägg till:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

**Prioritet: HÖG** — Enkelt att implementera, stor säkerhetsförbättring.

#### MEDIUM: Host Header Injection i invite-URL

`/api/org/invitations/route.ts` bygger invite-URL:er från request headers (`x-forwarded-host`, `host`). En angripare kan spoofa dessa headers för att skicka phishing-links.

**Åtgärd:** Använd alltid `process.env.NEXT_PUBLIC_APP_URL` istället för request headers.

#### MEDIUM: ShareToken utan utgångsdatum

`AssessmentSession.shareToken` har **ingen TTL**. En läckt token ger permanent åtkomst.

**Åtgärd:** Lägg till `expiresAt` på AssessmentSession och validera vid access.

#### MEDIUM: Hardkodad admin-email på 3+ ställen

`par.levander@criteroconsulting.se` är hårdkodad i:
- `auth-guard.ts:34`
- `user-features.ts:101`
- `webhooks/clerk/route.ts:12`
- `admin/sync-users/route.ts:8`

**Åtgärd:** Dessa har redan `process.env.PLATFORM_ADMIN_EMAILS` fallback men den hårdkodade emailen bör tas bort till förmån för enbart env-variabeln i produktion. Sätt env-variabeln explicit i Vercel.

### 2.3 Vad som redan är bra

- **Ingen SQL injection-risk** — Prisma ORM används genomgående, inga raw queries
- **XSS-skydd** — React escapar output automatiskt
- **CORS** — Default same-origin (restriktivt, korrekt)
- **Secrets i env** — Inga hårdkodade API-nycklar i koden
- **Webhook-validering** — Svix-signaturer verifieras

---

## 3. Databas & Prisma

### Status

| Aspekt | Status | Kommentar |
|--------|--------|-----------|
| Prisma 7 + LibSQL | ✅ | Korrekt adapter-setup |
| Turso (prod) | ✅ | `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` |
| SQLite (dev) | ✅ | Fallback till `file:./dev.db` |
| Migrationer | ✅ | 6 migrationer, välstrukturerade |
| Indexering | ✅ | Bra index på alla FK och vanliga sökfält |
| Seed-script | ✅ | Exkluderat från TS-build |

### Potentiella problem

1. **JSON-fält i SQLite** — Många modeller lagrar arrayer/objekt som JSON-strängar. Det fungerar men:
   - Inga index på JSON-innehåll
   - `JSON.parse()` kan krascha på korrupt data — saknar try-catch på flera ställen
   - Övervägande: OK för nuvarande skala, men bör monitoreras

2. **Case.orgId nullable** — Legacy-kompatibilitet, men i produktion bör alla nya cases ha `orgId`. Överväg att göra fältet required i framtida migration.

3. **Turso regional placering** — Se till att Turso-databasen är placerad i `eu-west` (Frankfurt/Amsterdam) för bästa latens från svenska användare.

---

## 4. Build & Deployment

### Nuvarande setup

- **Host:** Vercel (baserat på `metadataBase: "https://critero.vercel.app"`)
- **Framework:** Next.js 16.1.6 med Turbopack
- **Ingen Dockerfile** — rent Vercel-deploy
- **Ingen `vercel.json`** — defaultinställningar

### Rekommenderade Vercel-inställningar

```json
// vercel.json (skapa)
{
  "regions": ["arn1"],
  "framework": "nextjs"
}
```

- **`arn1`** = Stockholm-regionen — viktigt för svenska kunder och GDPR

### Miljövariabler för produktion (Vercel Dashboard)

| Variabel | Värde | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` | Production |
| `CLERK_SECRET_KEY` | `sk_live_...` | Production (server) |
| `CLERK_WEBHOOK_SECRET` | `whsec_...` | Production (server) |
| `TURSO_DATABASE_URL` | `libsql://...turso.io` | Production (server) |
| `TURSO_AUTH_TOKEN` | `...` | Production (server) |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Production (server) |
| `NEXT_PUBLIC_APP_URL` | `https://app.criteroconsulting.se` | Production |
| `PLATFORM_ADMIN_EMAILS` | `par.levander@criteroconsulting.se` | Production (server) |

### Build-kommando

```bash
prisma generate && prisma db push && next build
```

Vercel kör `postinstall: "prisma generate"` automatiskt. Säkerställ att `prisma db push` körs vid deploy om du inte använder migrationer i Turso.

---

## 5. Prestanda & Skalbarhet

### Bra

- **Prisma singleton** med global cache — undviker connection leaks
- **Next.js App Router** — automatisk code splitting
- **Turbopack** i dev — snabb DX

### Att förbättra

1. **Ingen caching-strategi** — API-routes cachar inget. Överväg:
   - `Cache-Control` headers på GET-routes som inte ändras ofta
   - `revalidate` på Server Components
   - ISR för publika sidor (sales, terms)

2. **Inga pagination-gränser** — `GET /api/cases` returnerar potentiellt alla cases. Lägg till `take: 50` som default.

3. **Inga loading states definierade** — Kontrollera att `loading.tsx`-filer finns i kritiska app-routes.

---

## 6. GDPR & Juridik

| Aspekt | Status | Kommentar |
|--------|--------|-----------|
| Data i EU | ⚠️ | Turso + Vercel måste båda köras i EU-region |
| Clerk data | ⚠️ | Clerk lagrar data i US by default — kontrollera att EU-region är valt |
| Terms-sida | ✅ | `/terms` finns |
| Cookie-consent | ❌ | Saknas — Clerk sätter cookies, kräver consent |
| Dataraderingsrutin | ❌ | Ingen "radera mitt konto"-funktion |
| DPA med underleverantörer | ❌ | Behöver DPA med Clerk, Turso, Vercel, Anthropic |

### Viktigt för produktion:

1. **Clerk EU** — I Clerk Dashboard: Settings → Data residency → EU. Detta är **kritiskt** för GDPR.
2. **Turso EU** — Skapa databasen med `turso db create --location arn` (Stockholm)
3. **Vercel EU** — Sätt region till `arn1` i vercel.json
4. **Cookie-banner** — Implementera innan lansering (krav för cookies som Clerk sätter)
5. **DPA-avtal** — Underteckna Data Processing Agreements med alla underleverantörer

---

## 7. Sammanfattning: Åtgärdslista inför produktion

### Måste göras (blockerande)

| # | Åtgärd | Insats | Prioritet |
|---|--------|--------|-----------|
| 1 | **DNS: Peka `app.criteroconsulting.se` → Vercel** | 10 min | KRITISK |
| 2 | **Clerk: Skapa production instance + lägg till domän** | 30 min | KRITISK |
| 3 | **Clerk: Aktivera EU data residency** | 5 min | KRITISK |
| 4 | **Vercel: Sätt alla prod-miljövariabler** | 15 min | KRITISK |
| 5 | **Vercel: Sätt region till `arn1` (Stockholm)** | 5 min | KRITISK |
| 6 | **Security headers i `next.config.ts`** | 15 min | KRITISK |
| 7 | **Uppdatera `NEXT_PUBLIC_APP_URL` till prod-domänen** | 5 min | KRITISK |
| 8 | **Turso: Verifiera EU-region** | 5 min | KRITISK |

### Bör göras (före eller strax efter lansering)

| # | Åtgärd | Insats | Prioritet |
|---|--------|--------|-----------|
| 9 | Rate limiting (Upstash/Vercel WAF) | 2-4h | HÖG |
| 10 | Cookie-consent banner | 2-3h | HÖG |
| 11 | Fix Host Header Injection i invite-URL | 30 min | HÖG |
| 12 | Centralisera admin-emails till enbart env-var | 30 min | MEDIUM |
| 13 | ShareToken expiry på assessment sessions | 1h | MEDIUM |
| 14 | API pagination limits | 1h | MEDIUM |
| 15 | Error handling: Konsekvent, inga läckta detaljer | 2h | MEDIUM |
| 16 | DPA-avtal med Clerk, Turso, Vercel, Anthropic | Admin | HÖG |

### Bra att ha (efter lansering)

| # | Åtgärd | Insats |
|---|--------|--------|
| 17 | Caching-strategi (Cache-Control, ISR) | 2-3h |
| 18 | "Radera mitt konto"-funktion (GDPR Art. 17) | 3-4h |
| 19 | Monitoring & alerting (Vercel Analytics / Sentry) | 1-2h |
| 20 | Backup-strategi för Turso | 1h |
| 21 | CSP (Content Security Policy) — mer granulär | 2h |

---

## 8. Steg-för-steg: Gå live

```
1. DNS-registrar: Lägg till CNAME app → cname.vercel-dns.com
2. Vercel: Lägg till custom domain app.criteroconsulting.se
3. Vercel: Sätt region arn1, miljövariabler (se tabell ovan)
4. Clerk: Skapa Production-instans, verifiera domän, EU-data
5. Clerk: Kopiera pk_live_ och sk_live_ till Vercel env
6. Clerk: Skapa webhook → https://app.criteroconsulting.se/api/webhooks/clerk
7. Turso: Verifiera att DB är i eu-west / arn
8. Testa: Logga in, skapa case, kör assessment
9. Security headers: Deploy next.config.ts-uppdatering
10. Cookie-banner: Implementera och deploya
```

---

## 9. Helhetsbedömning

**Applikationen är i gott skick för en MVP-lansering.** Autentisering, auktorisering och datamodell är solida. De kritiska åtgärderna handlar om infrastruktur-konfiguration (DNS, Clerk, region) och operationell säkerhet (headers, rate limiting) — inte fundamentala kodproblem.

Den största risken är att glömma EU-regionkonfigurationen för Clerk/Turso/Vercel, vilket skapar GDPR-problem.

Med åtgärderna 1-8 på plats kan ni lansera. Punkterna 9-16 bör komma inom första veckan.
