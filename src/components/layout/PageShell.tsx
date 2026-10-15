import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ContactActions } from "@/components/buttons/ContactActions";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  // Na página do assistente os atalhos fixos ficam ocultos: o chat já tem
  // botões de contato e a barra competiria com o campo de mensagem.
  showContactActions?: boolean;
}

// Estrutura comum de todas as páginas: cabeçalho, conteúdo principal com
// âncora para o link "Pular para o conteúdo", rodapé e atalhos de contato.
export function PageShell({ children, className, showContactActions = true }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className={cn("outline-none", className)}>
        {children}
      </main>
      <Footer />
      {showContactActions && <ContactActions />}
    </>
  );
}
