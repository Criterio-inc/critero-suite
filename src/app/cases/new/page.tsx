"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TagListEditor } from "@/components/ui/tag-list-editor";
import { Tooltip } from "@/components/ui/tooltip";
import { Icon } from "@/components/ui/icon";

const PROFILE_OPTIONS = [
  { value: "generisk_lou", label: "Generisk LOU" },
  { value: "avfall_nyanskaffning", label: "Avfall – nyanskaffning" },
  { value: "socialtjanst_byte", label: "Socialtjänst – byte" },
];

const PROCUREMENT_TYPE_OPTIONS = [
  { value: "nyanskaffning", label: "Nyanskaffning" },
  { value: "byte", label: "Byte" },
  { value: "utokning", label: "Utökning" },
];

const PROFILE_DESCRIPTIONS: Record<string, string> = {
  generisk_lou: "Ren LOU-upphandling utan branschspecifika tillägg. Passar för alla typer av offentliga upphandlingar.",
  avfall_nyanskaffning: "Specialiserad för avfallshantering med kluster för ruttplanering, ÅVC, kundregister m.m. Extra gates för branschspecifika risker.",
  socialtjanst_byte: "Anpassad för socialtjänstens behov med IBIC, genomförandeplan och sekretesshantering. Extra fokus på övergångsperiod.",
};

interface ProfilePreview {
  phases: { id: string; label: string; gateCount: number }[];
  clusters: string[];
  extras: string[];
}

const PROFILE_PREVIEWS: Record<string, ProfilePreview> = {
  generisk_lou: {
    phases: [
      { id: "A", label: "A. Start & styrning", gateCount: 6 },
      { id: "B", label: "B. Förbered upphandlingen", gateCount: 11 },
      { id: "C", label: "C. Genomför upphandlingen", gateCount: 7 },
      { id: "D", label: "D. Kontrakt → förvaltning", gateCount: 3 },
    ],
    clusters: [],
    extras: ["Generisk LOU-ryggrad utan profilspecifika tillägg"],
  },
  avfall_nyanskaffning: {
    phases: [
      { id: "A", label: "A. Start & styrning", gateCount: 6 },
      { id: "B", label: "B. Förbered upphandlingen", gateCount: 12 },
      { id: "C", label: "C. Genomför upphandlingen", gateCount: 7 },
      { id: "D", label: "D. Kontrakt → förvaltning", gateCount: 3 },
    ],
    clusters: ["Kund & abonnemang", "Taxa & fakturering", "Logistik/insamling", "ÅVC", "Digitala tjänster", "Integrationer", "Data & rapportering", "Data & exit"],
    extras: ["+1 extra gate: Behov i minst 4 kluster", "6 branschspecifika kravblock", "6 workshopmallar"],
  },
  socialtjanst_byte: {
    phases: [
      { id: "A", label: "A. Start & styrning", gateCount: 6 },
      { id: "B0", label: "B0. Exit & migrering – förstudie", gateCount: 2 },
      { id: "B", label: "B. Förbered upphandlingen", gateCount: 13 },
      { id: "C", label: "C. Genomför upphandlingen", gateCount: 7 },
      { id: "D", label: "D. Kontrakt → förvaltning", gateCount: 3 },
    ],
    clusters: ["Ärende/process", "Dokumentation & spårbarhet", "Behörighet & loggning", "Planering/insatser/utförande", "Integrationer", "Migrering/exit", "Rapportering", "Data & exit"],
    extras: ["Extra fas: B0 Exit & migrering – förstudie", "+2 extra gates i fas B", "Obligatorisk riskkategori: data_exit", "6 branschspecifika kravblock"],
  },
};

const STEPS = [
  { id: 1, label: "Grunduppgifter" },
  { id: 2, label: "Mål & avgränsning" },
  { id: 3, label: "Organisation" },
  { id: 4, label: "Tidplan" },
];

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Basic info
  const [name, setName] = useState("");
  const [domainProfile, setDomainProfile] = useState("generisk_lou");
  const [orgName, setOrgName] = useState("");
  const [procurementType, setProcurementType] = useState("nyanskaffning");
  const [estimatedValueSek, setEstimatedValueSek] = useState("");
  const [owner, setOwner] = useState("");

  // Step 2: Goals & scope
  const [goals, setGoals] = useState<string[]>([]);
  const [scopeIn, setScopeIn] = useState<string[]>([]);
  const [scopeOut, setScopeOut] = useState<string[]>([]);

  // Step 3: Organization
  const [steeringGroup, setSteeringGroup] = useState<string[]>([]);
  const [projectGroup, setProjectGroup] = useState<string[]>([]);
  const [decisionForums, setDecisionForums] = useState<string[]>([]);

  // Step 4: Timeline
  const [startDate, setStartDate] = useState("");
  const [targetAwardDate, setTargetAwardDate] = useState("");
  const [targetContractDate, setTargetContractDate] = useState("");

  function canProceed(): boolean {
    if (step === 1) return name.trim().length > 0;
    return true;
  }

  async function handleSubmit() {
    setLoading(true);

    const body = {
      name,
      domainProfile,
      orgName,
      procurementType,
      estimatedValueSek: Number(estimatedValueSek) || 0,
      owner,
      goals,
      scopeIn,
      scopeOut,
      governance: {
        steeringGroup,
        projectGroup,
        decisionForums,
      },
      timeline: {
        startDate: startDate || undefined,
        targetAwardDate: targetAwardDate || undefined,
        targetContractDate: targetContractDate || undefined,
      },
    };

    const res = await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const created = await res.json();
      router.push(`/cases/${created.id}`);
    } else {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header
        title="Ny upphandling"
        breadcrumbs={[
          { label: "Upphandlingar", href: "/cases" },
          { label: "Ny" },
        ]}
      />
      <div className="max-w-2xl p-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                s.id === step
                  ? "bg-primary text-primary-foreground font-medium"
                  : s.id < step
                  ? "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">
                {s.id < step ? <Icon name="check" size={12} /> : s.id}
              </span>
              {s.label}
            </button>
          ))}
        </div>

        <Card>
          <CardContent>
            {/* Step 1: Basic info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Grunduppgifter</h2>
                <p className="text-sm text-muted-foreground">Ange grundläggande information om upphandlingen.</p>

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Ge upphandlingen ett kort, beskrivande namn. Bör innehålla vad som upphandlas och gärna årtal, t.ex. 'Nytt HR-system 2026' eller 'Avfallshantering – nyanskaffning'." side="left" />
                  </div>
                  <Input
                    id="name"
                    label="Namn på upphandling"
                    required
                    placeholder="T.ex. Nytt avfallssystem 2026"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content={PROFILE_DESCRIPTIONS[domainProfile] ?? ""} side="left" />
                  </div>
                  <Select
                    id="domainProfile"
                    label="Domänprofil"
                    options={PROFILE_OPTIONS}
                    value={domainProfile}
                    onChange={(e) => setDomainProfile(e.target.value)}
                  />
                </div>
                {domainProfile && (
                  <p className="text-xs text-muted-foreground -mt-2 px-1">{PROFILE_DESCRIPTIONS[domainProfile]}</p>
                )}

                {/* Profile preview */}
                {domainProfile && PROFILE_PREVIEWS[domainProfile] && (
                  <div className="border border-border rounded-lg p-3 bg-muted/30 space-y-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Profilförhandsvisning</div>

                    {/* Phases */}
                    <div>
                      <div className="text-xs font-medium mb-1.5">Faser ({PROFILE_PREVIEWS[domainProfile].phases.length} st)</div>
                      <div className="flex flex-wrap gap-1.5">
                        {PROFILE_PREVIEWS[domainProfile].phases.map((phase) => (
                          <div key={phase.id} className="flex items-center gap-1 bg-background border border-border rounded px-2 py-1 text-xs">
                            <span className="font-medium">{phase.label}</span>
                            <span className="text-muted-foreground">({phase.gateCount} gates)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clusters */}
                    {PROFILE_PREVIEWS[domainProfile].clusters.length > 0 && (
                      <div>
                        <div className="text-xs font-medium mb-1.5">Behovskluster ({PROFILE_PREVIEWS[domainProfile].clusters.length} st)</div>
                        <div className="flex flex-wrap gap-1">
                          {PROFILE_PREVIEWS[domainProfile].clusters.map((c) => (
                            <span key={c} className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[11px]">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Profile extras */}
                    <div>
                      <div className="text-xs font-medium mb-1">Profilspecifikt</div>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {PROFILE_PREVIEWS[domainProfile].extras.map((e, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="text-primary">•</span> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Den upphandlande myndighetens namn. Används för dokumentgenerering och spårbarhet." side="left" />
                  </div>
                  <Input
                    id="orgName"
                    label="Organisation"
                    placeholder="T.ex. Sundsvalls kommun"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Nyanskaffning = inget befintligt system finns. Byte = ersätter befintligt system (kräver migreringsplanering). Utökning = komplettering av befintligt avtal." side="left" />
                  </div>
                  <Select
                    id="procurementType"
                    label="Typ av upphandling"
                    options={PROCUREMENT_TYPE_OPTIONS}
                    value={procurementType}
                    onChange={(e) => setProcurementType(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Upphandlingens totala beräknade kontraktsvärde inklusive optioner och förlängningar. Avgör vilka tröskelvärden och förfaranden enligt LOU som gäller." side="left" />
                  </div>
                  <Input
                    id="estimatedValueSek"
                    label="Uppskattat värde (SEK)"
                    type="number"
                    placeholder="0"
                    value={estimatedValueSek}
                    onChange={(e) => setEstimatedValueSek(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Upphandlingsansvarig som driver processen. Ofta en upphandlare eller projektledare. Kan ändras senare under Inställningar." side="left" />
                  </div>
                  <Input
                    id="owner"
                    label="Ansvarig"
                    placeholder="Namn eller roll"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Goals & Scope */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Mål & avgränsning</h2>
                <p className="text-sm text-muted-foreground">Definiera upphandlingens mål och vad som ingår respektive inte ingår.</p>

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Beskriv de övergripande målen med upphandlingen. Vad ska det nya systemet/tjänsten uppnå? Tänk effektmål snarare än lösning, t.ex. 'Effektivisera ärendehantering med 30%'." side="left" />
                  </div>
                  <TagListEditor
                    label="Mål"
                    value={goals}
                    onChange={setGoals}
                    placeholder="Skriv mål och tryck Enter..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Vad omfattas av upphandlingen? Beskriv moduler, funktioner, integrationer, utbildning, support m.m. som ska ingå. Tydlig avgränsning minskar risken för scope creep." side="left" />
                  </div>
                  <TagListEditor
                    label="Ingår (scope in)"
                    value={scopeIn}
                    onChange={setScopeIn}
                    placeholder="Vad ingår i upphandlingen..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Vad ingår uttryckligen INTE? Viktigt att klargöra tidigt för att undvika missförstånd med leverantörer, t.ex. 'Hårdvaruinköp', 'Datamigration från äldre system'." side="left" />
                  </div>
                  <TagListEditor
                    label="Ingår inte (scope out)"
                    value={scopeOut}
                    onChange={setScopeOut}
                    placeholder="Vad ingår INTE..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Organization */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Organisation</h2>
                <p className="text-sm text-muted-foreground">Definiera styrgrupp, projektgrupp och beslutsforum. Kan kompletteras senare.</p>

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Beslutsfattare med mandat att godkänna upphandlingens riktning. Ofta förvaltningschef, IT-chef eller ekonomichef. Ange namn och roll." side="left" />
                  </div>
                  <TagListEditor
                    label="Styrgrupp"
                    value={steeringGroup}
                    onChange={setSteeringGroup}
                    placeholder="Namn och roll..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="De som aktivt arbetar med upphandlingen: upphandlare, IT-specialist, verksamhetsrepresentanter, jurist m.fl. Dessa driver kravarbete och utvärdering." side="left" />
                  </div>
                  <TagListEditor
                    label="Projektgrupp"
                    value={projectGroup}
                    onChange={setProjectGroup}
                    placeholder="Namn och roll..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Formella organ som fattar beslut i upphandlingsprocessen, t.ex. nämnd, kommunstyrelse eller upphandlingsenhet. Viktigt för att veta vem som fattar tilldelningsbeslut." side="left" />
                  </div>
                  <TagListEditor
                    label="Beslutsforum"
                    value={decisionForums}
                    onChange={setDecisionForums}
                    placeholder="T.ex. Kommunstyrelsen, Upphandlingsenheten..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Timeline */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Tidplan</h2>
                <p className="text-sm text-muted-foreground">Ange planerade milstolpar. Kan justeras löpande.</p>

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="När upphandlingsarbetet påbörjas (behovsanalys, intressentmöten). Inte samma som annonseringsdag." side="left" />
                  </div>
                  <Input
                    id="startDate"
                    label="Startdatum"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Planerat datum för tilldelningsbeslut. Räkna bakåt från önskat avtalsdatum: tilldelning → avtalsspärr (10 dgr) → avtal. En IT-upphandling tar ofta 6–12 månader." side="left" />
                  </div>
                  <Input
                    id="targetAwardDate"
                    label="Planerad tilldelning"
                    type="date"
                    value={targetAwardDate}
                    onChange={(e) => setTargetAwardDate(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Tooltip content="Datum då avtalet planeras börja gälla. Beakta avtalsspärr (10 dagar efter tilldelning) och eventuell implementerings-/övergångsperiod." side="left" />
                  </div>
                  <Input
                    id="targetContractDate"
                    label="Planerad avtalsstart"
                    type="date"
                    value={targetContractDate}
                    onChange={(e) => setTargetContractDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <div>
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Tillbaka
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Avbryt
                </Button>
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                  >
                    Nästa
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !name.trim()}
                  >
                    {loading ? "Skapar..." : "Skapa upphandling"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
