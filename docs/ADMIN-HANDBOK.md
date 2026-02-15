# Admin-handbok – Critero Suite

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
| **Plattformsadmin** | Critero-personal. Kan skapa/ta bort organisationer, hantera alla features, synka användare från Clerk. Identifieras via `isAdmin`-flaggan i databasen. |

### Organisationsnivå

| Roll | Läsa | Skriva | Hantera medlemmar | Hantera features |
|------|------|--------|-------------------|------------------|
| **admin** | Ja | Ja | Ja | Ja |
| **member** | Ja | Ja | Nej | Nej |
| **viewer** | Ja | Nej | Nej | Nej |

Regler:

- En användare kan tillhöra **flera organisationer** (den första används som aktiv).
- Org-admins kan **inte ta bort sig själva** eller andra admins.
- Plattformsadmins har alltid full åtkomst oavsett roll i organisationen.

---

## 2. Dev-läge (utan Clerk)

Om Clerk inte är konfigurerat (inga `CLERK_*`-miljövariabler) körs systemet i **dev-läge**:

- En `Utvecklingsorganisation` (id: `dev-org`) skapas automatiskt.
- Alla användare blir plattformsadmins med enterprise-plan.
- Alla features är aktiverade.
- Perfekt för lokal utveckling – ingen extern auth behövs.

---

## 3. Plattformsadmin – /admin

Nås via `/admin`. Kräver `isAdmin = true` i databasen.

### 3.1 Organisationshantering

- **Lista** alla organisationer med: namn, slug, plan, antal medlemmar, antal case, antal feature-overrides.
- **Skapa** ny organisation: namn, slug (auto-genererat, valideras som `[a-z0-9-]`), plan.
- **Expandera** organisationskort för att se:
  - Feature-toggles (master-appar + enskilda features)
  - Medlemslista med roller

### 3.2 Användarhantering

- **Synka från Clerk** – hämtar alla användare via Clerk Backend API och upsertar i databasen.
- **Lista** alla användare med: namn, email, admin-status, organisationstillhörigheter.

### 3.3 Snabblänkar

Direktlänkar till: Clerk Dashboard, Vercel Dashboard, Turso Dashboard, GitHub-repo.

---

## 4. Organisationsadmin – /org

Nås via `/org`. Alla organisationsmedlemmar kan se sidan, men bara admins kan utföra ändringar.

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
3. Användaren accepterar via inbjudningslänk.
4. Inbjudan markeras som använd och användaren läggs till i organisationen.

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

### Tillgängliga features (18 st)

| Master-app | Sub-features |
|------------|-------------|
| `upphandling` | `cases`, `library`, `training`, `help` |
| `verktyg` | `nyttokalkyl`, `riskmatris`, `utvardering`, `checklista`, `tidsplan`, `mallbank` |
| `mognadmatning` | `digital`, `sessions` |
| `ai-mognadmatning` | `ai`, `ai-sessions` |

### Kaskadlogik

Om en master-app (t.ex. `upphandling`) stängs av → alla dess sub-features (`upphandling.cases`, `upphandling.library`, etc.) stängs också av automatiskt, oavsett individuella inställningar.

---

## 6. Planerna

| | **trial** | **starter** | **professional** | **enterprise** |
|---|-----------|-------------|------------------|----------------|
| Användare | 1 | 5 | 20 | Obegränsat |
| Case | 0 | 0 | Obegränsat | Obegränsat |
| Assessments | 3 | Obegränsat | Obegränsat | Obegränsat |
| Features | mognadmätning | + AI-mognadmätning | Alla 18 | Alla 18 |
| Profiler | Nej | Nej | Nej | Ja |
| API-åtkomst | Nej | Nej | Nej | Ja |
| SSO | Nej | Nej | Nej | Ja |
| Prövotid | 30 dagar | – | – | – |

---

## 7. Vanliga arbetsflöden steg-för-steg

### 7.1 Skapa ny organisation

1. Gå till `/admin`
2. Klicka **"+ Ny organisation"**
3. Fyll i namn och välj plan
4. Slug genereras automatiskt (kan redigeras)
5. Klicka **Skapa**
6. Expandera kortet → aktivera/avaktivera features vid behov

### 7.2 Bjuda in en användare

1. Gå till `/org`
2. Under **Inbjudningar**, fyll i email
3. Välj roll: admin, member eller viewer
4. Klicka **Bjud in**
5. Inbjudan gäller i 7 dagar

### 7.3 Ta bort en medlem

1. Gå till `/org`
2. Hitta medlemmen i listan
3. Klicka **X** (visas bara om du är admin)
4. Medlemmen förlorar åtkomst till organisationens case

### 7.4 Synka användare från Clerk

1. Gå till `/admin`
2. Klicka **"Synka från Clerk"**
3. Alla Clerk-användare upsertas i databasen
4. Nya användare får default-features (alla aktiverade)
5. Admin-status sätts baserat på email-matchning

### 7.5 Ändra en organisations plan

1. Gå till `/admin`
2. Expandera organisationens kort
3. Ändra plan via PATCH-anropet (eller via framtida UI)
4. Features justeras automatiskt efter den nya planen

### 7.6 Stänga av en feature för en organisation

1. Gå till `/admin`
2. Expandera organisationens kort
3. Toggla av önskad feature
4. Ändringen sparas direkt (optimistisk uppdatering)
5. Sidebar och dashboard uppdateras nästa sidladdning

---

## 8. API-referens för admin

### Plattformsadmin-endpoints (kräver `isAdmin`)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/admin/organizations` | Lista alla organisationer |
| `POST` | `/api/admin/organizations` | Skapa organisation |
| `GET` | `/api/admin/organizations/[orgId]` | Hämta org med medlemmar & features |
| `PATCH` | `/api/admin/organizations/[orgId]` | Uppdatera org (namn, plan, features) |
| `DELETE` | `/api/admin/organizations/[orgId]` | Ta bort organisation (kaskad) |
| `GET` | `/api/admin/users` | Lista alla användare |
| `POST` | `/api/admin/sync-users` | Synka användare från Clerk |
| `GET` | `/api/admin/users/[userId]/features` | Hämta per-user features |
| `PATCH` | `/api/admin/users/[userId]/features` | Uppdatera per-user features |

### Organisationsadmin-endpoints (kräver org-admin)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/org` | Hämta org-info, medlemmar, inbjudningar |
| `POST` | `/api/org/invitations` | Skapa inbjudan (email + roll) |
| `DELETE` | `/api/org/invitations` | Återkalla inbjudan |
| `DELETE` | `/api/org/members` | Ta bort medlem |

### Feature-endpoints (alla autentiserade)

| Metod | Endpoint | Beskrivning |
|-------|----------|-------------|
| `GET` | `/api/features` | Hämta effektiva features för aktuell org |
| `PATCH` | `/api/features` | Uppdatera org-level feature-overrides |

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

Loggen visas i dashboardens **"Senaste aktivitet"**-sektion (de 10 senaste posterna).

---

## 10. Miljövariabler

```bash
# Clerk-autentisering (valfritt i dev-läge)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Plattformsadmin (email som matchar → isAdmin=true)
ADMIN_EMAIL=par.levander@criteroconsulting.se

# Databas
DATABASE_URL=libsql://...

# App-URL
NEXT_PUBLIC_APP_URL=https://...
```

**Utan Clerk-variabler** → dev-läge aktiveras automatiskt.

---

## 11. Felsökning

| Problem | Orsak | Lösning |
|---------|-------|---------|
| Kan inte nå `/admin` | Inte plattformsadmin | Kontrollera `isAdmin` i User-tabellen |
| "Synka från Clerk" misslyckas | `CLERK_SECRET_KEY` saknas | Lägg till i `.env` |
| Inbjudan har gått ut | 7-dagars TTL | Återkalla och skicka ny |
| Features uppdateras inte i sidebar | Cache | Ladda om sidan (sidebar hämtar `/api/features`) |
| Viewer kan inte redigera | Korrekt beteende | Byt roll till member eller admin |
| "403 Forbidden" på org-endpoints | Inte medlem i organisationen | Kontrollera OrgMembership |
| Webhook-fel från Clerk | `CLERK_WEBHOOK_SECRET` felaktig | Verifiera att hemligheten matchar Clerk Dashboard |
