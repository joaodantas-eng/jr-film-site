import { AssistantMessage } from "@/services/ai/types";
import { AssistantAnswerCard } from "./AssistantAnswerCard";
import { AssistantAvatar } from "./AssistantAvatar";

// Visitante: balão claro à direita. Assistente: ícone + texto em superfície
// grafite à esquerda — a diferença não depende só de cor (posição e forma).
export function MessageBubble({ message }: { message: AssistantMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end gap-2 pl-10 sm:pl-16">
        <span className="sr-only">Você:</span>
        {message.image && (
          // eslint-disable-next-line @next/next/no-img-element -- fonte é base64 em memória, não um arquivo estático
          <img
            src={`data:${message.image.mimeType};base64,${message.image.base64Data}`}
            alt="Foto que você enviou ao assistente"
            className="max-h-60 max-w-full rounded-2xl rounded-tr-md border border-border object-cover"
          />
        )}
        {message.imageOmitted && (
          <p className="text-xs text-muted">Foto enviada antes (não fica salva ao recarregar a página).</p>
        )}
        {message.content && (
          <div className="whitespace-pre-line break-words rounded-2xl rounded-tr-md bg-foreground px-4 py-3 text-[0.975rem] leading-relaxed text-background">
            {message.content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 pr-4 sm:pr-12">
      <AssistantAvatar className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <span className="sr-only">Assistente:</span>
        {message.answer ? (
          <AssistantAnswerCard answer={message.answer} />
        ) : (
          <div className="w-fit rounded-2xl rounded-tl-md bg-surface-elevated px-4 py-3 text-[0.975rem] leading-relaxed text-foreground/90">
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
