"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const RELATION_OPTIONS = [
  { value: "addresses", label: "Adresserar" },
  { value: "derives_from", label: "Härledd från" },
  { value: "evaluated_by", label: "Utvärderas av" },
  { value: "mitigated_by", label: "Mitigeras av" },
  { value: "validated_by", label: "Valideras av" },
  { value: "depends_on", label: "Beror på" },
  { value: "explains", label: "Förklaras av" },
];

const TARGET_TYPE_OPTIONS = [
  { value: "need", label: "Behov" },
  { value: "risk", label: "Risk" },
  { value: "requirement", label: "Krav" },
  { value: "criterion", label: "Kriterium" },
  { value: "workshop", label: "Workshop" },
  { value: "decision", label: "Beslut" },
  { value: "evidence", label: "Evidens" },
  { value: "bid", label: "Anbud" },
];

interface AddTraceLinkDialogProps {
  caseId: string;
  fromId: string;
  fromType: string;
  onClose: () => void;
  onCreated: () => void;
}

export function AddTraceLinkDialog({
  caseId,
  fromId,
  fromType,
  onClose,
  onCreated,
}: AddTraceLinkDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      fromType,
      fromId,
      toType: form.get("toType"),
      toId: form.get("toId"),
      relation: form.get("relation"),
      note: form.get("note") ?? "",
    };

    const res = await fetch(`/api/cases/${caseId}/trace-links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      onCreated();
    } else {
      setLoading(false);
    }
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogHeader>
        <DialogTitle>Lägg till spårbarhetslänk</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-3">
          <div className="text-sm text-muted-foreground">
            Från: <span className="font-mono">{fromId}</span>
          </div>
          <Select
            id="relation"
            name="relation"
            label="Relation"
            options={RELATION_OPTIONS}
            required
            defaultValue="addresses"
          />
          <Select
            id="toType"
            name="toType"
            label="Måltyp"
            options={TARGET_TYPE_OPTIONS}
            required
            defaultValue="requirement"
          />
          <Input
            id="toId"
            name="toId"
            label="Mål-ID"
            required
            placeholder="T.ex. REQ-000001"
          />
          <Input
            id="note"
            name="note"
            label="Anteckning (valfritt)"
            placeholder="Kort förklaring..."
          />
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Skapar..." : "Skapa länk"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
