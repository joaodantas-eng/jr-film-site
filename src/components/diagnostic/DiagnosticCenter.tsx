"use client";

import { ChatWindow } from "@/components/assistant/ChatWindow";

// Orquestrador da Central de Diagnóstico Automotivo. Hoje é uma única
// interface de conversa (texto + foto, como um app de mensagens) — mantido
// como componente próprio para a página /diagnostico não depender
// diretamente de components/assistant/, e para dar espaço a evoluções
// futuras da Central sem mexer na rota.
export function DiagnosticCenter() {
  return <ChatWindow />;
}
