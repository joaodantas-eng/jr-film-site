"use client";

import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={buildWhatsAppLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_30px_rgba(220,38,38,0.4)] md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
    </motion.a>
  );
}
