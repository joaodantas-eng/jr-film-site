"use client";

import { useState, FormEvent } from "react";
import { VehicleInfo } from "@/services/ai/types";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface VehicleFormProps {
  initialValue: VehicleInfo | null;
  onSave: (info: VehicleInfo) => void;
}

const emptyForm: VehicleInfo = { brand: "", model: "", year: "", engine: "", mileage: "", fuel: "" };

const fields: { key: keyof VehicleInfo; label: string; placeholder: string }[] = [
  { key: "brand", label: "Marca", placeholder: "Ex: Fiat" },
  { key: "model", label: "Modelo", placeholder: "Ex: Uno" },
  { key: "year", label: "Ano", placeholder: "Ex: 2018" },
  { key: "engine", label: "Motorização", placeholder: "Ex: 1.0" },
  { key: "mileage", label: "Quilometragem", placeholder: "Ex: 85.000 km" },
  { key: "fuel", label: "Combustível", placeholder: "Ex: Flex" },
];

export function VehicleForm({ initialValue, onSave }: VehicleFormProps) {
  const [form, setForm] = useState<VehicleInfo>(initialValue ?? emptyForm);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(form);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-border bg-surface/60 p-6 md:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
              {field.label}
            </label>
            <input
              type="text"
              value={form[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, [field.key]: e.target.value }));
                setSaved(false);
              }}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" size="md">
          Salvar dados do veículo
        </Button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-sm text-accent"
          >
            <CheckCircle2 className="h-4 w-4" />
            Salvo
          </motion.span>
        )}
      </div>
    </form>
  );
}
