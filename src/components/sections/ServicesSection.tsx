import { services } from "@/data/services";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";

export function ServicesSection() {
  return (
    <section id="servicos" className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle
          eyebrow="O que fazemos"
          title="Serviços especializados, do diagnóstico à entrega."
          description="Cada serviço é executado por técnicos qualificados, com peças homologadas e checklist de qualidade antes da devolução do veículo."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionContainer>
    </section>
  );
}
