"use client";

import { useEffect, useRef } from "react";
import { useAssistantChat } from "@/hooks/useAssistantChat";
import { VehicleInfo } from "@/services/ai/types";
import { MessageBubble } from "./MessageBubble";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Trash2, AlertTriangle } from "lucide-react";

interface ChatWindowProps {
  vehicleInfo?: VehicleInfo | null;
}

export function ChatWindow({ vehicleInfo }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage, startNewConversation, clearConversation } =
    useAssistantChat(vehicleInfo);
  const scrollRef = useRef<HTMLDivElement>(null);
  const showSuggestions = messages.length <= 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-[70vh] min-h-[520px] flex-col overflow-hidden rounded-3xl border border-border bg-surface/60"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        {vehicleInfo?.brand ? (
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            Usando dados de: {[vehicleInfo.brand, vehicleInfo.model, vehicleInfo.year].filter(Boolean).join(" ")}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={startNewConversation}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Nova conversa
          </button>
          <button
            onClick={clearConversation}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpar
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 md:p-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LoadingIndicator />
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-2.5 text-xs text-accent"
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Tivemos um problema para responder. Pode tentar de novo, ou falar direto no WhatsApp.
          </motion.div>
        )}

        {showSuggestions && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="mb-3 mt-2 text-xs font-mono uppercase tracking-widest text-muted">Sugestões rápidas</p>
            <QuickSuggestions onSelect={sendMessage} disabled={isLoading} />
          </motion.div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </motion.div>
  );
}
