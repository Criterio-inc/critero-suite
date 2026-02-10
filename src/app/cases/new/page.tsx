"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      domainProfile: form.get("domainProfile"),
      orgName: form.get("orgName"),
      procurementType: form.get("procurementType"),
      estimatedValueSek: Number(form.get("estimatedValueSek")) || 0,
      owner: form.get("owner"),
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
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                name="name"
                label="Namn på upphandling"
                required
                placeholder="T.ex. Nytt avfallssystem 2026"
              />
              <Select
                id="domainProfile"
                name="domainProfile"
                label="Domänprofil"
                options={PROFILE_OPTIONS}
                defaultValue="generisk_lou"
              />
              <Input
                id="orgName"
                name="orgName"
                label="Organisation"
                placeholder="T.ex. Sundsvalls kommun"
              />
              <Select
                id="procurementType"
                name="procurementType"
                label="Typ av upphandling"
                options={PROCUREMENT_TYPE_OPTIONS}
                defaultValue="nyanskaffning"
              />
              <Input
                id="estimatedValueSek"
                name="estimatedValueSek"
                label="Uppskattat värde (SEK)"
                type="number"
                placeholder="0"
              />
              <Input
                id="owner"
                name="owner"
                label="Ansvarig"
                placeholder="Namn eller roll"
              />
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Skapar..." : "Skapa upphandling"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Avbryt
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
