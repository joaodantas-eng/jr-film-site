import Image from "next/image";
import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { SectionContainer } from "@/components/ui/SectionContainer";

// Primeira dobra: texto à esquerda, foto real da oficina à direita (pinça de
// freio vermelha no equipamento de alinhamento), emoldurada por réguas de
// medição — referência à precisão do trabalho. Animação de entrada só aqui,
// em CSS, uma única vez (respeita prefers-reduced-motion via globals.css).
export function HeroSection() {
  const weekday = contactInfo.hours[0];
  const saturday = contactInfo.hours[1];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-track-location="hero"
      className="relative overflow-hidden pb-14 pt-24 md:pb-20 lg:pt-32"
    >
      <SectionContainer className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div>
          <h1 id="hero-title">
            <span className="eyebrow animate-hero-text">
              {siteConfig.name}, oficina mecânica e acessórios em {siteConfig.city}/{siteConfig.state}
            </span>
            <span className="type-display mt-6 block text-display-xl text-foreground animate-hero-text [animation-delay:80ms]">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-foreground/75 animate-hero-text [animation-delay:160ms]">
            Mecânica, alinhamento, pneus, insulfilm e acessórios no mesmo lugar — com o diagnóstico explicado e o
            orçamento aprovado por você antes de qualquer serviço.
          </p>
          <div className="mt-9 flex flex-col gap-3 animate-hero-text [animation-delay:240ms] sm:flex-row">
            <WhatsAppButton size="lg" label="Pedir orçamento no WhatsApp" />
            <Button href="/servicos" variant="secondary" size="lg">
              Ver serviços
            </Button>
          </div>

          <dl className="mt-12 grid gap-x-8 gap-y-5 border-t border-border pt-7 text-sm animate-hero-text [animation-delay:320ms] sm:grid-cols-3">
            <div>
              <dt className="text-muted">Atendimento</dt>
              <dd className="tabular mt-1 font-medium text-foreground">
                {weekday?.day}, {weekday?.time}
                {saturday && (
                  <>
                    <br />
                    {saturday.day}, {saturday.time}
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Endereço</dt>
              <dd className="mt-1 font-medium text-foreground">
                <a
                  href={contactInfo.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {contactInfo.address.street}, {contactInfo.address.neighborhood}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Telefone</dt>
              <dd className="tabular mt-1 font-medium text-foreground">
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {contactInfo.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="relative pb-5 pl-5 lg:pb-6 lg:pl-6">
          {/* Réguas de medição: borda esquerda e inferior da foto. */}
          <span aria-hidden="true" className="ruler-y absolute bottom-5 left-0 top-0 w-4 lg:bottom-6" />
          <span aria-hidden="true" className="ruler-x absolute bottom-0 left-5 right-0 h-4 lg:left-6" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface animate-hero-photo sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/images/gallery/img_1310.jpg"
              alt="Equipamento de alinhamento fixado na roda de um carro preto com pinça de freio vermelha, na oficina da JR Film"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-[50%_62%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
            />
          </div>
          <figcaption className="absolute bottom-10 left-10 rounded-lg bg-black/70 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm lg:bottom-12 lg:left-12">
            Alinhamento na oficina da JR Film
          </figcaption>
          <span aria-hidden="true" className="absolute -right-px top-8 h-16 w-1 bg-accent lg:top-12" />
        </figure>
      </SectionContainer>
    </section>
  );
}
