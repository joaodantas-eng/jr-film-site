export interface Symptom {
  id: string;
  slug: string;
  title: string;
  // Palavras-chave usadas pelo provider simulado para casar a mensagem do usuário
  // com este sintoma. Sem acentuação — a normalização acontece em findMatchingSymptom.
  keywords: string[];
  possibleCauses: string[];
  description: string;
  recommendation: string;
  relatedServiceSlug?: string;
}

// Base inicial de sintomas. Estrutura pensada para crescer para centenas de itens
// sem exigir mudança em nenhum componente — é só adicionar objetos aqui.
export const symptoms: Symptom[] = [
  {
    id: "sym-1",
    slug: "ar-condicionado-nao-gela",
    title: "Ar-condicionado não gela",
    keywords: ["ar condicionado", "ar gelando", "nao gela", "ar quente", "ar fraco"],
    description:
      "Quando o ar-condicionado perde rendimento, geralmente está relacionado ao nível de gás refrigerante ou a algum componente do sistema de climatização.",
    possibleCauses: [
      "Nível de gás refrigerante baixo (possível pequeno vazamento)",
      "Compressor com funcionamento irregular",
      "Filtro de cabine sujo, reduzindo a circulação de ar",
      "Problema elétrico no acionamento do sistema",
    ],
    recommendation:
      "Vale evitar rodar muito tempo forçando o sistema no máximo até a avaliação, para não sobrecarregar o compressor.",
    relatedServiceSlug: "ar-condicionado",
  },
  {
    id: "sym-2",
    slug: "freio-fazendo-barulho",
    title: "Freio fazendo barulho",
    keywords: ["freio", "barulho ao frear", "grito", "rangido", "chiado no freio"],
    description:
      "Ruídos ao frear costumam ser um dos primeiros sinais de que o sistema de freios precisa de atenção — e é um item que não vale a pena esperar.",
    possibleCauses: [
      "Pastilhas de freio próximas do limite de desgaste",
      "Disco de freio desgastado ou empenado",
      "Acúmulo de sujeira ou pequenos detritos entre pastilha e disco",
      "Componente de segurança da pastilha avisando desgaste (em alguns modelos)",
    ],
    recommendation:
      "Por ser um item de segurança, o ideal é não adiar a avaliação — principalmente se o ruído for constante.",
    relatedServiceSlug: "freios",
  },
  {
    id: "sym-3",
    slug: "motor-falhando",
    title: "Motor falhando",
    keywords: ["motor falhando", "engasgando", "falha no motor", "carro morrendo", "motor morrendo", "falhando"],
    description:
      "Falhas no motor podem ter origem em diversos sistemas — combustível, ignição ou eletrônica —, por isso é importante um diagnóstico específico.",
    possibleCauses: [
      "Velas ou cabos de ignição desgastados",
      "Sistema de alimentação de combustível com sujeira",
      "Sensores do motor fora da faixa ideal",
      "Filtro de combustível ou de ar obstruído",
    ],
    recommendation:
      "Evite rodar em velocidade alta ou forçar o motor até a avaliação, para não agravar o problema.",
  },
  {
    id: "sym-4",
    slug: "carro-puxando",
    title: "Carro puxando para um lado",
    keywords: ["carro puxando", "puxando para um lado", "puxando pro lado"],
    description:
      "Quando o carro 'puxa' para um dos lados, geralmente é um sinal ligado ao alinhamento, à suspensão ou aos pneus.",
    possibleCauses: [
      "Alinhamento de direção fora da especificação",
      "Pressão ou desgaste irregular entre os pneus",
      "Componente da suspensão com folga",
      "Freio de uma roda travando parcialmente",
    ],
    recommendation:
      "Evite dirigir em velocidade alta até a avaliação, principalmente se o efeito for perceptível ao soltar o volante.",
    relatedServiceSlug: "alinhamento",
  },
  {
    id: "sym-5",
    slug: "direcao-pesada",
    title: "Direção pesada",
    keywords: ["direcao pesada", "volante pesado", "dificil de virar", "direcao dura"],
    description:
      "A direção pesada normalmente está ligada ao sistema de direção assistida (hidráulica ou elétrica) ou à pressão dos pneus.",
    possibleCauses: [
      "Nível de fluido de direção hidráulica baixo",
      "Correia da direção hidráulica desgastada",
      "Pressão dos pneus abaixo do recomendado",
      "Falha no sistema de direção elétrica",
    ],
    recommendation: "Confira a pressão dos pneus enquanto isso — é rápido e às vezes já ajuda bastante.",
  },
  {
    id: "sym-6",
    slug: "suspensao-fazendo-barulho",
    title: "Suspensão fazendo barulho",
    keywords: ["suspensao barulho", "barulho na suspensao", "batendo na suspensao", "balancando"],
    description:
      "Ruídos na suspensão geralmente aparecem ao passar por buracos ou lombadas, e indicam desgaste em algum componente do sistema.",
    possibleCauses: [
      "Amortecedor com folga ou vazamento",
      "Bucha ou terminal de suspensão desgastado",
      "Mola trincada ou com assentamento irregular",
      "Coxim solto",
    ],
    recommendation: "Evite passar em velocidade alta por buracos e lombadas até a avaliação.",
    relatedServiceSlug: "suspensao",
  },
  {
    id: "sym-7",
    slug: "motor-esquentando",
    title: "Motor esquentando",
    keywords: ["motor esquentando", "carro esquenta", "superaquecendo", "temperatura alta", "esquentando"],
    description:
      "O superaquecimento do motor é um dos sintomas mais sérios e pode ter várias origens no sistema de arrefecimento.",
    possibleCauses: [
      "Nível de líquido de arrefecimento baixo",
      "Vazamento no sistema de arrefecimento",
      "Válvula termostática com defeito",
      "Radiador ou ventoinha com funcionamento irregular",
    ],
    recommendation:
      "Se o ponteiro de temperatura subir muito, o ideal é parar o veículo com segurança e não continuar rodando — isso pode evitar um dano bem maior ao motor.",
  },
  {
    id: "sym-8",
    slug: "consumo-elevado",
    title: "Consumo de combustível elevado",
    keywords: ["consumo alto", "consumindo muito", "gastando muita gasolina", "consumo elevado"],
    description:
      "O aumento no consumo de combustível costuma estar ligado a itens de manutenção básica que passaram do prazo, ou a sensores do motor.",
    possibleCauses: [
      "Filtro de ar sujo",
      "Velas de ignição desgastadas",
      "Pressão dos pneus abaixo do ideal",
      "Sensor de oxigênio ou de fluxo de ar fora da faixa",
    ],
    recommendation: "Confira a pressão dos pneus — pneus murchos aumentam o consumo de forma perceptível.",
  },
  {
    id: "sym-9",
    slug: "bateria-descarregando",
    title: "Bateria descarregando",
    keywords: ["bateria descarregando", "bateria fraca", "carro nao liga", "bateria morta"],
    description:
      "Uma bateria que descarrega com frequência pode indicar desgaste natural dela ou um consumo elétrico que não deveria estar ativo com o carro desligado.",
    possibleCauses: [
      "Bateria no fim da vida útil",
      "Alternador não recarregando corretamente",
      "Consumo elétrico residual (algum equipamento ficando ligado)",
      "Terminais da bateria com mau contato ou oxidação",
    ],
    recommendation: "Se possível, evite deixar o veículo parado por muitos dias seguidos até a avaliação.",
  },
  {
    id: "sym-10",
    slug: "luz-da-injecao-acendeu",
    title: "Luz da injeção acendeu",
    keywords: ["luz da injecao", "luz injecao acendeu", "luz do motor", "luz no painel"],
    description:
      "A luz da injeção acende quando algum sensor do motor identifica uma leitura fora do padrão — pode ser algo simples ou algo que merece atenção maior.",
    possibleCauses: [
      "Tampa do tanque de combustível mal fechada",
      "Sensor do motor com leitura fora da faixa",
      "Vela ou bobina de ignição com falha",
      "Sistema de emissões com alguma pendência",
    ],
    recommendation:
      "Se a luz estiver piscando (não fixa), o ideal é evitar acelerar o veículo e buscar avaliação o quanto antes.",
  },
  {
    id: "sym-11",
    slug: "volante-vibrando",
    title: "Volante vibrando",
    keywords: ["volante vibra", "volante vibrando", "vibracao no volante", "trepidando"],
    description:
      "A vibração no volante costuma estar relacionada ao balanceamento das rodas ou a algum componente da suspensão/freios.",
    possibleCauses: [
      "Rodas desbalanceadas",
      "Pneu com deformação ou desgaste irregular",
      "Disco de freio empenado",
      "Componente da suspensão com folga",
    ],
    recommendation: "Preste atenção se a vibração aumenta com a velocidade — essa informação ajuda bastante na avaliação.",
    relatedServiceSlug: "balanceamento",
  },
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos
}

// Casamento simples por palavra-chave. Troca de complexidade quando um provider
// de IA real entrar (a interface AIProvider continua a mesma).
export function findMatchingSymptom(userMessage: string): Symptom | null {
  const normalizedMessage = normalize(userMessage);

  for (const symptom of symptoms) {
    const hasMatch = symptom.keywords.some((keyword) => normalizedMessage.includes(normalize(keyword)));
    if (hasMatch) return symptom;
  }

  return null;
}

// Termos genéricos que indicam que a pergunta é sobre o universo automotivo,
// mesmo sem casar com um sintoma específico da base.
const AUTOMOTIVE_TERMS = [
  "carro",
  "veiculo",
  "motor",
  "freio",
  "pneu",
  "oleo",
  "bateria",
  "suspensao",
  "ar condicionado",
  "direcao",
  "cambio",
  "embreagem",
  "radiador",
  "painel",
  "revisao",
  "oficina",
];

export function isAutomotiveTopic(userMessage: string): boolean {
  const normalizedMessage = normalize(userMessage);
  return AUTOMOTIVE_TERMS.some((term) => normalizedMessage.includes(term));
}
