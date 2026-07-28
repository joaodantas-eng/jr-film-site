import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
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

// Gera as páginas de todos os serviços em build-time — nenhuma manutenção manual
// de rota: um serviço novo em data/services.ts já ganha página automaticamente.
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
    keywords: [service.title, `${service.title} em ${siteConfig.city}`, "oficina mecânica", siteConfig.city],
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.metaDescription ?? service.description,
    provider: {
      "@type": "AutoRepair",
      name: siteConfig.legalName,
      areaServed: siteConfig.city,
    },
  };

  const faqJsonLd = service.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <Navbar />
      <main className="pt-32">
        <SectionContainer>
          <Breadcrumb items={[{ label: "Serviços", href: "/#servicos" }, { label: service.title }]} />

          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-elevated text-accent">
                <Icon name={service.icon} className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {service.longDescription ?? service.description}
              </p>
            </div>
            <WhatsAppButton size="lg" label="Agendar este serviço" className="shrink-0" />
          </div>
        </SectionContainer>

        {(service.benefits?.length || service.symptoms?.length) && (
          <SectionContainer className="mt-16 grid gap-8 md:grid-cols-2">
            {service.benefits?.length ? (
              <Reveal className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="font-display text-xl font-semibold text-foreground">Benefícios</h2>
                <ul className="mt-5 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {service.symptoms?.length ? (
              <Reveal delay={0.1} className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="font-display text-xl font-semibold text-foreground">Sinais de que você precisa deste serviço</h2>
                <ul className="mt-5 space-y-3">
                  {service.symptoms.map((symptom) => (
                    <li key={symptom} className="flex items-start gap-3 text-sm text-foreground/85">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </SectionContainer>
        )}

        {service.whenToDo && (
          <SectionContainer className="mt-16">
            <Reveal className="rounded-2xl border border-border bg-surface-elevated/40 p-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Quando fazer este serviço</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{service.whenToDo}</p>
            </Reveal>
          </SectionContainer>
        )}

        {service.process?.length ? (
          <section className="mt-20 py-4">
            <SectionContainer>
              <SectionTitle eyebrow="Como fazemos" title="Processo de execução" />
              <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {service.process.map((step, index) => (
                  <StaggerItem key={step.title} className="rounded-2xl border border-border bg-surface p-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </SectionContainer>
          </section>
        ) : null}

        {service.faq?.length ? (
          <section className="mt-20 py-4">
            <SectionContainer className="mx-auto max-w-3xl">
              <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" align="center" className="mx-auto" />
              <div className="mt-10">
                <Accordion items={service.faq} />
              </div>
            </SectionContainer>
          </section>
        ) : null}

        <section className="mt-20 py-4">
          <SectionContainer>
            <SectionTitle eyebrow="Veja também" title="Outros serviços" />
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <StaggerItem key={related.id}>
                  <ServiceCard service={related} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </SectionContainer>
        </section>

        <section className="my-20">
          <SectionContainer>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-surface px-8 py-14 text-center">
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                Pronto para agendar {service.title.toLowerCase()}?
              </h2>
              <WhatsAppButton size="lg" label="Falar no WhatsApp" />
            </div>
          </SectionContainer>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
