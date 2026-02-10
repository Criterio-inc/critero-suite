# LOU-stöd – Upphandlingsstöd enligt LOU

Personligt verktyg för offentlig upphandling enligt Lagen om offentlig upphandling (LOU).

## Arkitektur

**Generisk LOU-ryggrad** (A→B→C→D) + **domänprofiler** som plugins.

- Profiler: `generisk_lou`, `avfall_nyanskaffning`, `socialtjanst_byte`
- Profiler berikar med kluster, extra faser, kravblock, riskmallar, skärpta gates

## Tech stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Prisma 7** + **SQLite** via `@prisma/adapter-libsql`
- **Tailwind CSS v4** (importeras via `@import "tailwindcss"` i globals.css)
- **exceljs** för XLSX-export
- Ingen auth (single-user MVP)

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
  schema.prisma      # 16 modeller
  seed.ts            # Bibliotek + 2 exempelcase
src/
  app/               # Next.js App Router pages + API routes
  components/
    ui/              # Primitiver (button, card, input, etc.)
    layout/          # app-sidebar, case-sidebar, header
    entity/          # Generiskt ramverk (list, form, detail)
    workflow/        # gate-checklist, validation-panel, export-buttons
    search/          # global-search
    library/         # import-to-case-dialog
    trace/           # trace-links-panel, add-trace-link-dialog
    filters/         # filter-bar
  lib/
    db.ts            # Prisma-klient (adapter-libsql)
    id-generator.ts  # Display-ID (NEED-000001)
    gates.ts         # Gate-evaluering (~15 regler)
    validation.ts    # Soft validation (affärsregler)
    export.ts        # JSON/CSV/XLSX-export
    search.ts        # Global sök
    entity-helpers.ts
  config/
    phases.ts        # LOU-faskedja
    profiles/        # 3 domänprofiler
    entity-meta.ts   # Fältdefinitioner per entitet
    workflow.ts      # Profil-laddare (mergar bas + profil)
  types/             # TypeScript-typer
```

## Datamodell

16 Prisma-modeller: Case, Stakeholder, Workshop, Evidence, Need, Risk, Requirement, Criterion, Bid, BidResponse, Score, Decision, Document, TraceLink, IdCounter, LibraryItem.

- **Display-ID som PK** (t.ex. `NEED-000001`)
- **JSON-fält i SQLite**: Arrays/objekt som JSON-strängar med `@default("[]")`
- **TraceLink**: Generisk relation (fromType/fromId → toType/toId)

## Prisma 7-specifikt

- `prisma.config.ts` för konfiguration (inte schema.prisma)
- Kräver adapter: `@prisma/adapter-libsql` med `{ url: process.env.DATABASE_URL }`
- Seed-scriptet måste också använda adaptern (inte bara `new PrismaClient()`)
- `prisma/seed.ts` exkluderas från TypeScript-bygget via tsconfig.json

## API-mönster

- `GET/POST /api/cases` - Lista/skapa case
- `GET/PATCH/DELETE /api/cases/[caseId]` - Case CRUD
- `GET/POST /api/cases/[caseId]/[entityType]` - Generisk entitets-CRUD
- `GET /api/cases/[caseId]/export?format=json|xlsx|csv&entity=<type>`
- `POST /api/cases/[caseId]/import` - JSON-restore
- `GET /api/cases/[caseId]/gates` - Gate-evaluering
- `GET /api/cases/[caseId]/validate` - Soft validation
- `GET /api/cases/[caseId]/search?q=<query>` - Global sök

## Konventioner

- Svenskt UI-språk
- Next.js 16 async params: `params: Promise<{...}>` med `await params`
- Entitetssidor följer mönstret: `page.tsx` (lista), `new/page.tsx`, `[id]/page.tsx`, `[id]/edit/page.tsx`
- Formulärfält drivs av `EntityMeta` i `config/entity-meta.ts`
- CSS-variabler för tema definieras i `globals.css`
