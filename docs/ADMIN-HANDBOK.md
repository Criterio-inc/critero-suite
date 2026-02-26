# Admin-handbok — Critero Suite

## Innehåll

1. [Roller och behörigheter](#1-roller-och-behörigheter)
2. [Dev-läge (utan Clerk)](#2-dev-läge-utan-clerk)
3. [Plattformsadmin – /admin](#3-plattformsadmin--admin)
4. [Organisationsadmin – /org](#4-organisationsadmin--org)
5. [Feature-systemet](#5-feature-systemet)
6. [Planerna (trial → enterprise)](#6-planerna)
7. [Vanliga arbetsflöden steg-för-steg](#7-vanliga-arbetsflöden-steg-för-steg)
8. [API-referens för admin](#8-api-referens-för-admin)
9. [Audit trail](#9-audit-trail)
10. [Miljövariabler](#10-miljövariabler)
11. [Felsökning](#11-felsökning)

---

## 1. Roller och behörigheter

Systemet har två nivåer av behörighet:

### Plattformsnivå

| Roll | Beskrivning |
|------|-------------|
| **Plattformsadmin** | Critero-personal. Kan skapa/redigera/radera organisationer, hantera features, synka användare, ta bort medlemmar. Identifieras via `PLATFORM_ADMIN_EMAILS` i miljövariabler. |

### Organisationsnivå

| Roll | Läsa | Skriva | Hantera medlemmar | Bjuda in | Hantera features |
|------|------|--------|-------------------|----------|------------------|
| **admin** | Ja | Ja | Ja | Ja | Nej (bara plattformsadmin) |
| **member** | Ja | Ja | Nej | Nej | Nej |
| **viewer** | Ja | Nej | Nej | Nej | Nej |

Regler:

- En användare kan tillhöra **flera organisationer** (den första används som aktiv).
- Org-admins kan bjuda in nya medlemmar och ta bort befintliga.
- Plattformsadmins har alltid full åtkomst oavsett roll i organisationen.
- Plattformsadmin läggs **inte** automatiskt till som medlem i organisationer de skapar.

---

## 2. Dev-läge (utan Clerk)

Om Clerk inte är konfigurerat (inga `CLERK_*`-miljövariabler) körs systemet i **dev-läge**:

- En `Utvecklingsorganisation` (id: `dev-org`) skapas automatiskt.
- Alla användare blir plattformsadmins med enterprise-plan.
- Alla features är aktiverade.
- Perfekt för lokal utveckling — ingen extern auth behövs.

---

## 3. Plattformsadmin – /admin

Nås via `/admin`. Kräver att användarens email finns i `PLATFORM_ADMIN_EMAILS`.

### 3.1 Organisationshantering

- **Lista** alla organisationer med: namn, slug, plan, antal medlemmar, antal case, antal feature-overrides.
- **Skapa** ny organisation: namn, slug (auto-genererat, valideras som `[a-z0-9-]`), plan. Plattformsadmin läggs **inte** till som medlem automatiskt.
- **Redigera** organisation: ändra namn och plan via redigeringsformuläret.
- **Radera** organisation: permanent borttagning med bekräftelsedialog. Alla relaterade data (medlemmar, features, case, inbjudningar) raderas kaskadvis.
- **Expandera** organisationskort för att se:
  - Feature-toggles (master-appar + enskilda features)
  - Medlemslista med roller och borttagningsknappar

### 3.2 Medlemshantering (i org-kortet)

- Varje medlem visas med namn, email och roll.
- **Ta bort medlem** via X-knappen — tvåstegsbekräftelse:
  1. *Ta bort från organisationen* — medlemmen förlorar åtkomst men Clerk-kontot behålls.
  2. *Ta bort från organisationen OCH radera från Clerk* — medlemmen förlorar åtkomst och hela Clerk-kontot + lokal DB-post raderas.
- Bekräftelsedialog visas med tydlig information om konsekvenserna.

### 3.3 Användarhantering

- **Synka från Clerk** — hämtar alla användare via Clerk Backend API och upsertar i databasen.
- **Lista** alla användare med: namn, email, admin-status, organisationstillhörigheter.

### 3.4 Administrationstips

Adminpanelen visar kontextuella tips om:
- Ny kund — steg för steg (skapa org → bjud in → koppla Clerk)
- Inbjudningsflöde (tre vägar att acceptera)
- Roller i organisationen (admin, member, viewer)
- Feature-toggles (master-appar + kaskadlogik)
- Export & rapporter
- Sessionshantering

### 3.5 Snabblänkar

Direktlänkar till: Clerk Dashboard, Vercel Dashboard, Turso Dashboard, GitHub-repo.

---

## 4. Organisationsadmin – /org

Nås via `/org`. Alla organisationsmedlemmar kan se sidan, men bara admins (org-admin eller plattformsadmin) kan utföra ändringar.

### Vad visas

| Sektion | Alla ser | Bara admin |
|---------|----------|------------|
| Org-info (namn, plan, slug) | Ja | – |
| Medlemslista | Ja | + Ta bort-knapp |
| Inbjudningar | Ja (antal) | + Bjud in-formulär, lista, återkalla |
| Statistik | Ja | – |

### Inbjudningsflöde

1. Admin fyller i email + väljer roll (admin/member/viewer).
2. En inbjudan skapas med 7 dagars utgångsdatum och unik token.
3. Systemet visar en **kopibar inbjudningslänk** (`/invite/[token]`).
4. Användaren accepterar på ett av tre sätt (se nedan).
5. Inbjudan markeras som använd och användaren läggs till i organisationen.

### Tre vägar att acceptera en inbjudan

| Väg | Hur det fungerar | Kräver manuell åtgärd? |
|-----|------------------|------------------------|
| **A. Clerk-konto skapas med samma e-post** | Clerk-webhooken matchar automatiskt e-post mot väntande inbjudningar och skapar membership | Nej — helt automatiskt |
| **B. Användaren loggar in** | `requireAuth()` kontrollerar vid inloggning om det finns en väntande inbjudan för användarens e-post och accepterar automatiskt | Nej — helt automatiskt |
| **C. Inbjudningslänk** | Användaren öppnar `/invite/[token]`, ser inbjudningsdetaljer och klickar "Acceptera" | Ja — användaren klickar en knapp |

> **Best practice:** Använd väg A eller B. Skapa inbjudan först, sedan Clerk-konto med samma e-post → allt sker automatiskt.

---

## 5. Feature-systemet

### Hur features löses upp

```
Organisationens plan (bas-features)
        ↓
Org-level overrides (OrgFeature-tabellen)
        ↓
Kaskadlogik (avstängd master-app → alla sub-features av)
        ↓
Effektiva features
```

Feature-toggles löses via `resolveOrgFeatures()` som mergear planens defaults med organisationens overrides. Endast genuina avvikelser från planen sparas som overrides (smart diff).

### Tillgängliga features (24 st)

| Master-app | Sub-features |
|------------|-------------|
| `upphandling` | `cases`, `library`, `training`, `help` |
| `verktyg` | `benefit-calculator`, `risk-matrix`, `evaluation-model`, `timeline-planner`, `stakeholder-map`, `kunskapsbank`, `root-cause`, `benefit-effort`, `process-flow`, `adkar`, `force-field` |
| `mognadmatning` | `survey`, `results` |
| `ai-mognadmatning` | `survey`, `results` |

### Kaskadlogik

Om en master-app (t.ex. `upphandling`) stängs av → alla dess sub-features stängs också av automatiskt, oavsett individuella inställningar.

### Sidebar-beteende

- **Aktiverade features**: Visas normalt med klickbara länkar.
- **Avaktiverade features**: Visas med nedsatt opacitet (grå/transparent) och är inte klickbara. Användaren ser vad som finns men kan inte navigera dit.

---

## 6. Planerna

### Översikt

| | **Trial** | **Starter** | **Professional** | **Enterprise** |
|---|-----------|-------------|------------------|----------------|
| **Användare** | 3 | 10 | 25 | Obegränsat |
| **Upphandling** | – | – | Case, bibliotek, utbildning, hjälpcenter | Allt |
| **Verktyg** | – | 4 st (bas) | Alla 11 | Alla 11 |
| **Mognadsmätning** | Max 3 sessioner | Obegränsat | Obegränsat | Obegränsat |
| **AI-Mognadsmätning** | – | Ja | Ja | Ja |
| **Domänprofiler** | – | – | – | Ja |
| **API-åtkomst** | – | – | – | Ja |
| **SSO** | – | – | – | Ja |
| **Varaktighet** | 30 dagar | Tillsvidare | Tillsvidare | Tillsvidare |

### Verktyg per plan

**Starter** inkluderar 4 strategiska analysverktyg som kompletterar mognadsmätningsarbete:

| Verktyg | Starter | Professional+ |
|---------|:-------:|:-------------:|
| Riskmatris | Ja | Ja |
| Intressentanalys | Ja | Ja |
| Nyttokalkyl | Ja | Ja |
| Reflektionsstöd (Kunskapsbank) | Ja | Ja |
| Utvärderingsmodell | – | Ja |
| Tidslinjeplanerare | – | Ja |
| Orsaksanalys | – | Ja |
| Nytto-insats | – | Ja |
| Processflöde | – | Ja |
| ADKAR Förändring | – | Ja |
| Kraftfältsanalys | – | Ja |

### Uppgraderingslogik

```
Trial → Starter:    + AI-Mognadsmätning, + 4 basverktyg, fler användare
Starter → Professional:  + Upphandling, + 7 verktyg, + utbildning, obegränsade case
Professional → Enterprise:  + obegränsade användare, domänprofiler, API, SSO
```

### Varför just dessa 4 Starter-verktyg?

De fyra verktygen i Starter kompletterar mognadsmätningsarbetet:

1. **Riskmatris** — Bedöm och prioritera risker identifierade i mognadsmätningen
2. **Intressentanalys** — Kartlägg stakeholders för förbättringsinitiativ
3. **Nyttokalkyl** — Beräkna ROI på föreslagna åtgärder
4. **Reflektionsstöd** — AI-stödd kunskapsbank för lärande och reflektion

De övriga 7 verktygen är mer upphandlings- och processspecifika och ingår från Professional.

---

## 7. Vanliga arbetsflöden steg-för-steg

### 7.1 Onboarding av ny kund (komplett flöde)

1. **Skapa organisationen**
   - Gå till `/admin` → Klicka **"+ Ny organisation"**
   - Fyll i namn (t.ex. "Kundens AB"), välj plan (t.ex. Starter)
   - Klicka **Skapa**
   - OBS: Du läggs **inte** till som medlem automatiskt

2. **Konfigurera features**
   - Expandera organisationskortet i `/admin`
   - Aktivera/avaktivera features efter kundens plan och avtal
   - Avaktiverade features visas gråtonade i kundens sidebar

3. **Skapa inbjudan för kundansvarig**
   - I organisationskortet, notera org-id/namn
   - Gå till `/org` (eller be kundansvarig göra detta efter steg 4)
   - Alternativt: Skapa inbjudan direkt via API

4. **Skapa kundkonto i Clerk**
   - Gå till Clerk Dashboard → Users → Create user
   - Ange kundens e-post
   - Sätt tillfälligt lösenord
   - **Automatik:** Om en inbjudan med samma e-post finns → kunden kopplas direkt till organisationen vid inloggning

5. **Meddela kunden**
   - Skicka: inloggningslänk + e-post + tillfälligt lösenord
   - Kunden loggar in → ser sin organisations dashboard direkt

6. **Kunden tar över**
   - Kunden (org-admin) bjuder in teammedlemmar via `/org`
   - Kopierbara inbjudningslänkar skickas vidare
   - Teammedlemmar loggar in → auto-matchas mot inbjudan

### 7.2 Skapa ny organisation (enbart)

1. Gå till `/admin`
2. Klicka **"+ Ny organisation"**
3. Fyll i namn och välj plan
4. Slug genereras automatiskt (kan redigeras)
5. Klicka **Skapa**
6. Expandera kortet → aktivera/avaktivera features vid behov

### 7.3 Redigera en organisation

1. Gå till `/admin`
2. Expandera organisationens kort
3. Klicka **"Redigera organisation"**
4. Ändra namn och/eller plan
5. Klicka **Spara**
6. Features justeras automatiskt vid planbyte

### 7.4 Radera en organisation

1. Gå till `/admin`
2. Expandera organisationens kort
3. Klicka **"Radera organisation"**
4. Bekräfta i dialogen — **OBS: Permanent borttagning!**
5. Alla relaterade data raderas (medlemmar, case, features, inbjudningar)

### 7.5 Bjuda in en användare

1. Gå till `/org`
2. Under **Inbjudningar**, fyll i email
3. Välj roll: admin, member eller viewer
4. Klicka **Bjud in**
5. **Kopiera inbjudningslänken** som visas
6. Inbjudan gäller i 7 dagar
7. Om användaren redan har ett Clerk-konto med samma e-post matchas hen automatiskt vid nästa inloggning

### 7.6 Ta bort en medlem (via /org)

1. Gå till `/org`
2. Hitta medlemmen i listan
3. Klicka **X** (visas bara om du är admin)
4. Medlemmen förlorar åtkomst till organisationens case

### 7.7 Ta bort en medlem (via /admin — plattformsadmin)

1. Gå till `/admin`
2. Expandera organisationens kort
3. Klicka **X** bredvid medlemmen
4. Välj alternativ:
   - **Ta bort från organisationen** — medlemmen förlorar åtkomst men kontot behålls
   - **Ta bort + radera från Clerk** — kontot raderas helt (från Clerk och lokal DB)
5. Bekräfta i dialogen

### 7.8 Synka användare från Clerk

1. Gå till `/admin`
2. Klicka **"Synka från Clerk"**
3. Alla Clerk-användare upsertas i databasen
4. Admin-status sätts baserat på email-matchning mot `PLATFORM_ADMIN_EMAILS`

### 7.9 Stänga av en feature för en organisation

1. Gå till `/admin`
2. Expandera organisationens kort
3. Toggla av önskad feature
4. Ändringen sparas direkt och löses via `resolveOrgFeatures()`
5. Sidebar uppdateras — avaktiverade features visas gråtonade

### 7.10 Skapa ny upphandling

1. Gå till `/cases` → Klicka **"Ny upphandling"**
2. Steg 1 — Grunduppgifter: namn, organisation, typ (nyanskaffning/byte/utökning), uppskattat värde, ansvarig
3. Steg 2 — Mål & avgränsning: mål, scope in/out
4. Steg 3 — Organisation: styrgrupp, projektgrupp, beslutsforum
5. Steg 4 — Tidplan: startdatum, planerad tilldelning, planerad avtalsstart
6. Klicka **"Skapa upphandling"**
7. Upphandlingen skapas med Generisk LOU-profil som standard

---

## 8. API-referens för admin

### Plattformsadmin-endpoints (kräver plattformsadmin)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/admin/organizations` | Lista alla organisationer |
| `POST` | `/api/admin/organizations` | Skapa organisation |
| `GET` | `/api/admin/organizations/[orgId]` | Hämta org med medlemmar & resolved features |
| `PATCH` | `/api/admin/organizations/[orgId]` | Uppdatera org (namn, plan, features) |
| `DELETE` | `/api/admin/organizations/[orgId]` | Ta bort organisation (kaskad) |
| `POST` | `/api/admin/organizations/[orgId]` | Ta bort medlem (body: `{ userId, remove: true, deleteFromClerk?: true }`) |
| `GET` | `/api/admin/users` | Lista alla användare |
| `POST` | `/api/admin/sync-users` | Synka användare från Clerk |

### Organisationsadmin-endpoints (kräver org-admin)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/org` | Hämta org-info, medlemmar, inbjudningar |
| `POST` | `/api/org/invitations` | Skapa inbjudan (email + roll) → returnerar `inviteLink` |
| `DELETE` | `/api/org/invitations` | Återkalla inbjudan |
| `DELETE` | `/api/org/members` | Ta bort medlem |

### Inbjudnings-endpoints (publika)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/invite/[token]` | Validera inbjudningstoken (visar org-namn, roll, utgångsdatum) |
| `POST` | `/api/invite/[token]` | Acceptera inbjudan (kräver inloggad användare) |

### Feature-endpoints

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/features` | Hämta resolved features för aktuell org |

### Dashboard

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/dashboard` | Org-info, case-statistik, aktivitetslogg |

---

## 9. Audit trail

Varje mutation loggas automatiskt i `AuditLog`-tabellen:

| Fält | Beskrivning |
|------|-------------|
| `action` | `create`, `update`, `delete`, `export`, `import` |
| `entityType` | T.ex. `case`, `invitation`, `member`, `features` |
| `entityId` | ID:t på det som ändrades |
| `userId` | Vem som utförde ändringen |
| `changes` | JSON-diff med före/efter (vid uppdateringar) |
| `createdAt` | Tidsstämpel |

Loggen visas i dashboardens **"Senaste aktivitet"**-sektion.

---

## 10. Miljövariabler

```bash
# Clerk-autentisering (valfritt i dev-läge)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Plattformsadmin (kommaseparerade emails)
PLATFORM_ADMIN_EMAILS=admin@criteroconsulting.se

# Databas (Turso i prod, SQLite i dev)
DATABASE_URL=libsql://...
TURSO_DATABASE_URL=libsql://...turso.io
TURSO_AUTH_TOKEN=...

# App-URL
NEXT_PUBLIC_APP_URL=https://app.criteroconsulting.se

# AI (Anthropic)
ANTHROPIC_API_KEY=sk-ant-...
```

**Utan Clerk-variabler** → dev-läge aktiveras automatiskt.

---

## 11. Felsökning

| Problem | Orsak | Lösning |
|---------|-------|---------|
| Kan inte nå `/admin` | Inte plattformsadmin | Kontrollera att email finns i `PLATFORM_ADMIN_EMAILS` |
| "Synka från Clerk" misslyckas | `CLERK_SECRET_KEY` saknas | Lägg till i `.env` |
| Inbjudan har gått ut | 7-dagars TTL | Återkalla och skicka ny |
| Användare kopplas inte till org | E-post i Clerk matchar inte inbjudan | Kontrollera att exakt samma e-post används |
| Inbjudningslänk fungerar inte | Token ogiltigt/utgånget | Skapa ny inbjudan via `/org` |
| Kund kan inte bjuda in | Inte org-admin | Kontrollera att kunden har rollen `admin` i organisationen |
| Features "återställs" | Cache i klienten | Ladda om sidan — features löses via `resolveOrgFeatures()` |
| Avaktiverade features syns inte | Förväntat beteende | De visas gråtonade/transparenta i sidebaren |
| Viewer kan inte redigera | Korrekt beteende | Byt roll till member eller admin |
| "403 Forbidden" på org-endpoints | Inte medlem i organisationen | Kontrollera OrgMembership |
| Webhook-fel från Clerk | `CLERK_WEBHOOK_SECRET` felaktig | Verifiera att hemligheten matchar Clerk Dashboard |
| Plattformsadmin blev medlem i ny org | Ska inte hända | Kontrollera att auto-add är borttaget i POST-handler |
| Medlem borttagen men kan fortfarande logga in | Clerk-konto finns kvar | Välj "Ta bort + radera från Clerk" vid borttagning |
