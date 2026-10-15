import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SectionContainer } from "@/components/ui/SectionContainer";

// Bloco de texto rico em palavras-chave locais para SEO — link interno pros
// serviços, sem keyword stuffing artificial (frases legíveis, não lista solta).
export function SeoKeywordsSection() {
  return (
    <section className="border-t border-border py-14">
      <SectionContainer>
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted">
          A JR Film é uma <strong className="text-foreground/70">oficina mecânica em {siteConfig.city}</strong>{" "}
          especializada em{" "}
          <Link href="/servicos/troca-de-oleo" className="underline underline-offset-2 hover:text-accent-fg">
            troca de óleo
          </Link>
          ,{" "}
          <Link href="/servicos/freios" className="underline underline-offset-2 hover:text-accent-fg">
            revisão de freios
          </Link>
          ,{" "}
          <Link href="/servicos/suspensao" className="underline underline-offset-2 hover:text-accent-fg">
            suspensão
          </Link>
          ,{" "}
          <Link href="/servicos/alinhamento" className="underline underline-offset-2 hover:text-accent-fg">
            alinhamento e balanceamento
          </Link>
          ,{" "}
          <Link href="/servicos/ar-condicionado" className="underline underline-offset-2 hover:text-accent-fg">
            ar-condicionado automotivo
          </Link>{" "}
          e{" "}
          <Link href="/servicos/insulfilm" className="underline underline-offset-2 hover:text-accent-fg">
            insulfilm
          </Link>
          . Atendemos clientes de {siteConfig.city}/{siteConfig.state} e região com diagnóstico técnico e peças de
          procedência garantida.
        </p>
      </SectionContainer>
    </section>
  );
}
