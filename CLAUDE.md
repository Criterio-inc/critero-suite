# Critero Suite — Multi-tenant SaaS för offentlig upphandling

Modulär plattform för offentlig upphandling enligt LOU, mognadsmätning och verktyg.

## Arkitektur

**Multi-tenant SaaS** med Clerk-autentisering, organisationer, rollbaserad behörighet och feature-toggling per plan.

- **4 moduler**: Upphandling (LOU), Verktyg, Mognadsmätning, AI-Mognadsmätning
- **4 planer**: trial → starter → professional → enterprise
- **3 org-roller**: admin, member, viewer
- **Plattformsadmin**: Styrs via `PLATFORM_ADMIN_EMAILS` env-variabel
- **LOU-profiler**: Generisk LOU som standard (avfall/socialtjänst-profiler finns som plugins men visas ej i UI)

## Tech stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Prisma 7** + **SQLite/Turso** via `@prisma/adapter-libsql`
- **Clerk** för autentisering (webhooks, user sync)
- **Tailwind CSS v4** (importeras via `@import "tailwindcss"` i globals.css)
- **Anthropic Claude** för AI-insikter (mognadsmätning, kunskapsbank)
- **exceljs** för XLSX-export

## Kommandon

```bash
npm run dev          # Starta dev-server
npm run build        # Produktionsbygge
npx prisma db seed   # Seeda databasen
npx prisma migrate dev --name <namn>  # Ny migration
```

## Projektstruktur

```
prisma/
  schema.prisma        # 25+ modeller (org, cases, assessments)
  seed.ts              # Seed-data
src/
  app/
    admin/             # Plattformsadmin-panel
    org/               # Organisationsadmin (medlemmar, inbjudningar)
    cases/             # Upphandlingar (CRUD, entiteter, evaluation)
    library/           # Återanvändbart bibliotek
    tools/             # Verktyg (12 st: risk-matrix, kunskapsbank, etc.)
    mognadmatning/     # Digital mognadsmätning
    ai-mognadmatning/  # AI-driven mognadsmätning
    training/          # Utbildning
    help/              # Hjälpcenter
    invite/[token]/    # Inbjudningslänk (publik)
    sales/             # Säljsida (publik)
    api/               # ~47 API-routes
  components/
    ui/                # Primitiver (button, card, input, select, etc.)
    layout/            # app-sidebar, case-sidebar, header
    entity/            # Generiskt ramverk (list, form, detail)
    workflow/          # gate-checklist, validation-panel, export-buttons
    search/            # global-search
    library/           # import-to-case-dialog
    trace/             # trace-links-panel, add-trace-link-dialog
    filters/           # filter-bar
  lib/
    db.ts              # Prisma-klient (adapter-libsql)
    auth-guard.ts      # Centraliserad auth (requireAuth, requireOrgAdmin, etc.)
    org-features.ts    # Feature-resolution (plan + overrides + kaskad)
    id-generator.ts    # Display-ID (NEED-000001)
    gates.ts           # Gate-evaluering (~15 regler)
    validation.ts      # Soft validation (affärsregler)
    export.ts          # JSON/CSV/XLSX-export
    search.ts          # Global sök
    entity-helpers.ts
  config/
    features.ts        # 24 feature-nycklar, 4 master-appar
    plans.ts           # Plan-definitioner (trial → enterprise)
    phases.ts          # LOU-faskedja (A→B→C→D)
    profiles/          # 3 domänprofiler (generisk, avfall, socialtjänst)
    entity-meta.ts     # Fältdefinitioner per entitet
    workflow.ts        # Profil-laddare (mergar bas + profil)
  types/               # TypeScript-typer
```

## Datamodell (nyckelmodeller)

**Organisation & Auth:**
- `Organization` (plan, slug, maxUsers)
- `OrgMembership` (orgId, userId, role: admin|member|viewer)
- `OrgFeature` (orgId, featureKey, enabled — org-level overrides)
- `Invitation` (email, token, role, expiresAt)
- `User` (Clerk-synkad, isAdmin)
- `AuditLog` (action, entityType, entityId, changes)

**Upphandling (LOU):**
- `Case` (orgId, display-ID: CASE-000001)
- `Stakeholder`, `Workshop`, `Evidence`, `Need`, `Risk`, `Requirement`, `Criterion`
- `Bid`, `BidResponse`, `Score`, `Decision`, `Document`
- `TraceLink` (generisk relation fromType/fromId → toType/toId)
- `LibraryItem` (återanvändbara block, profilmedvetna)

**Mognadsmätning:**
- `AssessmentType`, `AssessmentProject` (orgId), `AssessmentSession`, `AssessmentResponse`, `AssessmentResult`
- `MaturitySession`, `MaturityResponse`

**Övrigt:**
- `IdCounter` (sekventiell ID-generering per prefix)

## Auth-system

- **Clerk** hanterar autentisering (sign-in/up, webhooks)
- **`requireAuth()`** i `auth-guard.ts` — centraliserad auth-gate för alla API-routes
  - Synkar Clerk-användare automatiskt
  - Auto-accepterar inbjudningar vid inloggning (email-match)
  - Returnerar `AuthContext` med orgId, role, isPlatformAdmin
- **`requireCaseAccess()`** — verifierar org-tillhörighet för case
- **`requireOrgAdmin()`** — kräver org-admin eller plattformsadmin
- **`requirePlatformAdmin()`** — kräver plattformsadmin
- **`requireWriteAccess()`** — blockerar viewers
- **Dev-läge**: Utan Clerk-nycklar skapas `dev-org` med enterprise-plan

## Feature-system

24 features i 4 master-appar. Resolution: plan-defaults → org-overrides → kaskadlogik.

```
resolveOrgFeatures(orgId):
  1. Hämta planens default-features
  2. Applicera org-level overrides (OrgFeature-tabellen)
  3. Kaskad: avstängd master-app → alla sub-features av
  4. Returnera effektiva features
```

Avaktiverade features visas gråtonade i sidebaren (opacity-30, ej klickbara).

## API-mönster

- `GET/POST /api/cases` — Lista/skapa case (filtrerat per org)
- `GET/PATCH/DELETE /api/cases/[caseId]` — Case CRUD
- `GET/POST /api/cases/[caseId]/[entityType]` — Generisk entitets-CRUD
- `GET /api/cases/[caseId]/export?format=json|xlsx|csv&entity=<type>`
- `GET /api/cases/[caseId]/gates` — Gate-evaluering
- `GET /api/cases/[caseId]/validate` — Soft validation
- `GET/POST /api/admin/organizations` — Org-hantering (plattformsadmin)
- `GET/PATCH/DELETE /api/admin/organizations/[orgId]` — Org CRUD + features
- `POST /api/org/invitations` — Skapa inbjudan (org-admin)
- `GET /api/features` — Resolved features för aktuell org
- `GET /api/dashboard` — Dashboard-metrics

## Konventioner

- Svenskt UI-språk
- Next.js 16 async params: `params: Promise<{...}>` med `await params`
- Entitetssidor: `page.tsx` (lista), `new/page.tsx`, `[id]/page.tsx`, `[id]/edit/page.tsx`
- Formulärfält drivs av `EntityMeta` i `config/entity-meta.ts`
- CSS-variabler för tema i `globals.css`
- All audit-loggning via `logAudit()` i auth-guard.ts
- Feature-toggles: Använd `resolveOrgFeatures()` — aldrig rå OrgFeature-poster

## Miljövariabler

```bash
# Clerk (valfritt i dev-läge)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Plattformsadmin
PLATFORM_ADMIN_EMAILS=admin@criteroconsulting.se

# Databas
DATABASE_URL=libsql://...
TURSO_DATABASE_URL=libsql://...turso.io
TURSO_AUTH_TOKEN=...

# App
NEXT_PUBLIC_APP_URL=https://app.criteroconsulting.se
ANTHROPIC_API_KEY=sk-ant-...
```
