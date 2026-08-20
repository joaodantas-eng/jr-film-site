import { siteConfig } from "@/data/site";
import { SectionContainer } from "@/components/ui/SectionContainer";

// Bloco de texto rico em palavras-chave locais para SEO — link interno pros
// serviços, sem keyword stuffing artificial (frases legíveis, não lista solta).
export function SeoKeywordsSection() {
  return (
    <section className="border-t border-border py-14">
      <SectionContainer>
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted">
          A JR Film é uma <strong className="text-foreground/70">oficina mecânica em {siteConfig.city}</strong>{" "}
          especializada em <a href="/servicos/troca-de-oleo" className="underline underline-offset-2 hover:text-accent">troca de óleo</a>,{" "}
          <a href="/servicos/freios" className="underline underline-offset-2 hover:text-accent">revisão de freios</a>,{" "}
          <a href="/servicos/suspensao" className="underline underline-offset-2 hover:text-accent">suspensão</a>,{" "}
          <a href="/servicos/alinhamento" className="underline underline-offset-2 hover:text-accent">alinhamento e balanceamento</a>,{" "}
          <a href="/servicos/ar-condicionado" className="underline underline-offset-2 hover:text-accent">ar-condicionado automotivo</a>{" "}
          e <a href="/servicos/insulfilm" className="underline underline-offset-2 hover:text-accent">insulfilm</a>. Atendemos
          clientes de {siteConfig.city}/{siteConfig.state} e região com diagnóstico técnico e peças de procedência garantida.
        </p>
      </SectionContainer>
    </section>
  );
}
