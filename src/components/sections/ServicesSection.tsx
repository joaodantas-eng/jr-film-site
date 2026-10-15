import Image from "next/image";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { ServiceIndex } from "@/components/services/ServiceIndex";

// Seção clara: quebra o ritmo escuro da página e dá leitura de catálogo aos
// serviços. Coluna esquerda fixa (no desktop) com foto real e atalhos.
export function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-paper py-20 text-paper-ink md:py-28">
      <SectionContainer className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            id="servicos-titulo"
            tone="paper"
            title="O que fazemos pelo seu carro."
            description="Cada serviço tem uma página com os sinais de alerta, quando fazer e como o trabalho é executado na oficina."
          />
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-xl lg:block">
            <Image
              src="/images/gallery/img_3985.jpg"
              alt="Mecânico da JR Film trabalhando no freio e na suspensão dianteira de um carro no elevador"
              fill
              sizes="35vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="/servicos" variant="dark">
              Ver todos os serviços
            </Button>
            <Button href="/diagnostico" variant="light">
              Não sei o que meu carro tem
            </Button>
          </div>
        </div>
        <ServiceIndex tone="paper" />
      </SectionContainer>
    </section>
  );
}
