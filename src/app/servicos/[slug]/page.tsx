import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import { BUSINESS_ID, buildFaqJsonLd } from "@/config/structuredData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Reveal } from "@/components/animations/Reveal";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Gera as páginas de todos os serviços em build-time — um serviço novo em
// data/services.ts já ganha página automaticamente.
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} em ${siteConfig.city}`,
    description: service.metaDescription ?? service.description,
    path: `/servicos/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const whatsappMessage = `Olá! Vim pelo site e gostaria de agendar o serviço de ${service.title.toLowerCase()}.`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription ?? service.description,
    url: `${siteConfig.url}/servicos/${service.slug}`,
    areaServed: { "@type": "City", name: `${siteConfig.city}, ${siteConfig.state}` },
    provider: { "@type": "AutoRepair", "@id": BUSINESS_ID, name: siteConfig.legalName },
  };

  const faqJsonLd = service.faq?.length ? buildFaqJsonLd(service.faq) : null;

  return (
    <PageShell className="pt-24 md:pt-32">
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div data-track-location={`servico-${service.slug}`}>
        <SectionContainer>
          <Breadcrumb items={[{ label: "Serviços", href: "/servicos" }, { label: service.title }]} />
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-elevated text-accent-fg">
                <Icon name={service.icon} className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h1 className="type-display mt-6 text-display-lg text-foreground">
                {service.title} <span className="text-foreground/60">em {siteConfig.city}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                {service.longDescription ?? service.description}
              </p>
            </div>
            <WhatsAppButton size="lg" label="Agendar este serviço" className="shrink-0" message={whatsappMessage} />
          </div>
        </SectionContainer>

        {(service.benefits?.length || service.symptoms?.length) && (
          <SectionContainer className="mt-14 grid gap-6 md:grid-cols-2">
            {service.benefits?.length ? (
              <Reveal className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground">Benefícios</h2>
                <ul className="mt-5 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[0.95rem] text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-fg" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {service.symptoms?.length ? (
              <Reveal delay={0.1} className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground">Sinais de que você precisa deste serviço</h2>
                <ul className="mt-5 space-y-3">
                  {service.symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-start gap-3 text-[0.95rem] text-foreground/85">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-fg" aria-hidden="true" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </SectionContainer>
        )}

        {service.whenToDo && (
          <SectionContainer className="mt-6">
            <Reveal className="rounded-2xl border border-border bg-surface-elevated/40 p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground">Quando fazer este serviço</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/75 md:text-base">{service.whenToDo}</p>
            </Reveal>
          </SectionContainer>
        )}

        {service.process?.length ? (
          <section className="mt-16">
            <SectionContainer>
              <SectionTitle eyebrow="Como fazemos" title="Processo de execução" />
              <StaggerGroup as="ol" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.process.map((step, index) => (
                  <StaggerItem as="li" key={step.title} className="rounded-2xl border border-border bg-surface p-6">
                    <span className="tabular text-sm font-bold text-accent-fg">Etapa {index + 1}</span>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </SectionContainer>
          </section>
        ) : null}

        {service.faq?.length ? (
          <section className="mt-16">
            <SectionContainer className="max-w-3xl">
              <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" align="center" />
              <div className="mt-10">
                <Accordion items={service.faq} />
              </div>
            </SectionContainer>
          </section>
        ) : null}

        <section className="mt-16">
          <SectionContainer>
            <SectionTitle eyebrow="Veja também" title="Outros serviços" />
            <StaggerGroup as="ul" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <StaggerItem as="li" key={related.id} className="h-full">
                  <ServiceCard service={related} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </SectionContainer>
        </section>

        <section className="my-16">
          <SectionContainer>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface px-6 py-12 text-center md:px-8 md:py-14">
              <h2 className="type-display text-display-md text-foreground">
                Pronto para agendar {service.title.toLowerCase()}?
              </h2>
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                <WhatsAppButton size="lg" label="Falar com a JR Film" message={whatsappMessage} />
                <Button href="/#contato" variant="secondary" size="lg">
                  Ver como chegar à oficina
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>
      </div>
    </PageShell>
  );
}
