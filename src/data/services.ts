import { Service } from "@/types";

// Fonte de dados dos serviços — hoje estática, futuramente substituível por
// services/services.ts fazendo fetch em um banco, sem alterar nenhum componente.
export const services: Service[] = [
  {
    id: "svc-1",
    slug: "troca-de-oleo",
    title: "Troca de Óleo",
    description:
      "Substituição de óleo e filtros com produtos homologados, respeitando as especificações do fabricante do seu veículo.",
    icon: "Droplet",
  },
  {
    id: "svc-2",
    slug: "suspensao",
    title: "Suspensão",
    description:
      "Diagnóstico e reparo completo de amortecedores, molas e componentes, devolvendo estabilidade e conforto de condução.",
    icon: "Settings2",
  },
  {
    id: "svc-3",
    slug: "freios",
    title: "Freios",
    description:
      "Revisão de pastilhas, discos e fluido com testes de segurança antes da entrega do veículo.",
    icon: "Disc3",
  },
  {
    id: "svc-4",
    slug: "alinhamento",
    title: "Alinhamento",
    description:
      "Ajuste de geometria com equipamento a laser para rodagem correta e economia de pneus.",
    icon: "GaugeCircle",
  },
  {
    id: "svc-5",
    slug: "balanceamento",
    title: "Balanceamento",
    description:
      "Equilíbrio das rodas para eliminar vibração e prolongar a vida útil de pneus e suspensão.",
    icon: "Scale",
  },
  {
    id: "svc-6",
    slug: "ar-condicionado",
    title: "Ar-Condicionado",
    description:
      "Higienização, recarga de gás e reparo do sistema de climatização com verificação de vazamentos.",
    icon: "Wind",
  },
  {
    id: "svc-7",
    slug: "insulfilm",
    title: "Insulfilm",
    description:
      "Aplicação de película automotiva com controle de temperatura interna e proteção contra radiação UV.",
    icon: "SunDim",
  },
  {
    id: "svc-8",
    slug: "venda-de-pneus",
    title: "Venda de Pneus",
    description:
      "Pneus de marcas confiáveis para todos os perfis de veículo, com orientação técnica na hora da escolha.",
    icon: "Layers",
  },
  {
    id: "svc-9",
    slug: "acessorios",
    title: "Acessórios Automotivos",
    description:
      "Instalação de acessórios originais e homologados, com acabamento que preserva as características do veículo.",
    icon: "Sparkles",
  },
];
