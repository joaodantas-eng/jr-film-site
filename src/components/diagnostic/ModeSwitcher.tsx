import { DiagnosticMode } from "@/services/ai/chat/session";
import { cn } from "@/lib/utils";
import { MessageSquareText, Camera, ClipboardList } from "lucide-react";

interface ModeSwitcherProps {
  mode: DiagnosticMode;
  onChange: (mode: DiagnosticMode) => void;
  vehicleInfoSet: boolean;
}

const options: { mode: DiagnosticMode; label: string; icon: typeof MessageSquareText }[] = [
  { mode: "text", label: "Descrever", icon: MessageSquareText },
  { mode: "photo", label: "Enviar foto", icon: Camera },
  { mode: "vehicle", label: "Dados do veículo", icon: ClipboardList },
];

// Permite trocar de modo sem voltar para a tela de seleção — é o que torna
// isto uma "central" e não três telas isoladas.
export function ModeSwitcher({ mode, onChange, vehicleInfoSet }: ModeSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((option) => {
        const isActive = mode === option.mode;
        return (
          <button
            key={option.mode}
            onClick={() => onChange(option.mode)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
              isActive
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:border-foreground/30 hover:text-foreground",
            )}
          >
            <option.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {option.label}
            {option.mode === "vehicle" && vehicleInfoSet && (
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label="Dados salvos" />
            )}
          </button>
        );
      })}
    </div>
  );
}
