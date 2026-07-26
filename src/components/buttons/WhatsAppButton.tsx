import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  label?: string;
  className?: string;
}

// Todo CTA de WhatsApp do site passa por aqui — o link é sempre montado pela camada
// services/whatsapp.ts, nunca escrito manualmente em um componente.
export function WhatsAppButton({
  message = defaultWhatsAppMessage,
  variant = "primary",
  size = "md",
  label = "Falar no WhatsApp",
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </Button>
  );
}
