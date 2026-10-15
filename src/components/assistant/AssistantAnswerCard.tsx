import { AssistantAnswer } from "@/services/ai/types";
import { ASSISTANT_WHATSAPP_CTA_LABEL, ASSISTANT_WARNING } from "@/services/ai/prompts";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

interface AssistantAnswerCardProps {
  answer: AssistantAnswer;
}

// Nível de urgência: texto + ícone (não depende só da cor).
const urgencyConfig = {
  baixo: { label: "Urgência baixa", className: "bg-foreground/10 text-foreground/85", icon: Info },
  medio: { label: "Urgência média", className: "bg-amber-400/15 text-amber-200", icon: AlertCircle },
  alto: { label: "Urgência alta", className: "bg-accent text-white", icon: AlertTriangle },
};

// Resposta em prosa, como um consultor conversando — sem títulos/seções fixas.
// A lista de causas só aparece quando o modelo de fato preencheu uma (perguntas
// de esclarecimento, por exemplo, não trazem lista). O aviso de avaliação
// presencial é fixo da interface, não depende do texto gerado incluir isso.
export function AssistantAnswerCard({ answer }: AssistantAnswerCardProps) {
  const hasCauses = answer.possibleCauses.length > 0;
  const whatsappMessage = hasCauses
    ? `Olá! Usei a Central de Diagnóstico do site e gostaria de agendar uma avaliação presencial.`
    : undefined;

  const urgency = answer.urgency ? urgencyConfig[answer.urgency] : null;

  return (
    <div className="rounded-2xl rounded-tl-md bg-surface-elevated p-4 md:p-5">
      {urgency && (
        <span
          className={cn(
            "mb-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold",
            urgency.className,
          )}
        >
          <urgency.icon className="h-3.5 w-3.5" aria-hidden="true" />
          {urgency.label}
        </span>
      )}

      <p className="whitespace-pre-line text-[0.975rem] leading-relaxed text-foreground/90">{answer.message}</p>

      {hasCauses && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4">
          <p className="text-sm font-bold text-foreground">Possíveis causas</p>
          <ul className="mt-2.5 space-y-2">
            {answer.possibleCauses.map((cause) => (
              <li key={cause} className="flex items-start gap-2.5 text-[0.9375rem] text-foreground/85">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!answer.offTopic && <p className="mt-3 text-sm leading-relaxed text-muted">{ASSISTANT_WARNING}</p>}

      {!answer.offTopic && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <WhatsAppButton size="md" label={ASSISTANT_WHATSAPP_CTA_LABEL} message={whatsappMessage} />
          {answer.relatedServiceSlug && (
            <Button href={`/servicos/${answer.relatedServiceSlug}`} variant="secondary" size="md">
              Consultar o serviço relacionado
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
