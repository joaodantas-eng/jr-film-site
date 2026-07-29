"use client";

import { useEffect, useRef } from "react";
import { useAssistantChat } from "@/hooks/useAssistantChat";
import { MessageBubble } from "./MessageBubble";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { AnimatePresence, motion } from "framer-motion";

export function ChatWindow() {
  const { messages, isLoading, sendMessage } = useAssistantChat();
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
