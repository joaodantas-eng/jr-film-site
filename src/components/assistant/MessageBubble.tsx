import { AssistantMessage } from "@/services/ai/types";
import { AssistantAnswerCard } from "./AssistantAnswerCard";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: AssistantMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-sm text-white">
          {message.content}
        </div>
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
