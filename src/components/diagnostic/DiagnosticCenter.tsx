import { ChatWindow } from "@/components/assistant/ChatWindow";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";

// Orquestrador da Central de Diagnóstico Automotivo. Recebe do servidor se o
// assistente está ativo (ASSISTANT_ENABLED) e se aceita fotos — quando
// desligado, mostra o contato direto em vez do chat.
export function DiagnosticCenter({ enabled, imagesEnabled }: { enabled: boolean; imagesEnabled: boolean }) {
  if (!enabled) {
    return (
      <div
        className="rounded-3xl border border-border bg-surface p-8 text-center md:p-12"
        data-track-location="assistente"
      >
        <p className="type-display text-xl text-foreground">O assistente está temporariamente indisponível.</p>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Conte o que o seu carro está apresentando diretamente para a equipe da JR Film.
        </p>
        <WhatsAppButton size="lg" label="Pedir orientação pelo WhatsApp" className="mt-6" />
      </div>
    );
  }
  return <ChatWindow imagesEnabled={imagesEnabled} />;
}
