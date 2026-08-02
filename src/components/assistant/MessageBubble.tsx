import { AssistantMessage } from "@/services/ai/types";
import { AssistantAnswerCard } from "./AssistantAnswerCard";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-2">
        {message.image && (
          // eslint-disable-next-line @next/next/no-img-element -- fonte é base64 em memória, não um arquivo estático
          <img
            src={`data:${message.image.mimeType};base64,${message.image.base64Data}`}
            alt="Foto enviada pelo cliente"
            className="max-h-48 max-w-[70%] rounded-2xl rounded-br-sm border border-border object-cover"
          />
        )}
        {message.content && (
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-sm text-white">
            {message.content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex justify-start")}>
      {message.answer ? (
        <AssistantAnswerCard answer={message.answer} />
      ) : (
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground/90">
          {message.content}
        </div>
      )}
    </div>
  );
}
