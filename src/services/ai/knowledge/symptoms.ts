import { UrgencyLevel } from "../types";

export type SymptomCategory =
  | "motor"
  | "suspensao"
  | "freios"
  | "ar-condicionado"
  | "direcao"
  | "transmissao"
  | "eletrica"
  | "pneus"
  | "bateria"
  | "arrefecimento";

export interface Symptom {
  id: string;
  slug: string;
  title: string;
  category: SymptomCategory;
  urgency: UrgencyLevel;
  // Palavras-chave usadas pelo provider simulado para casar a mensagem do usuário
  // com este sintoma. Sem acentuação — a normalização acontece em findMatchingSymptom.
  keywords: string[];
  possibleCauses: string[];
  description: string;
  recommendation: string;
  relatedServiceSlug?: string;
}

export const categoryLabels: Record<SymptomCategory, string> = {
  motor: "Motor",
  suspensao: "Suspensão",
  freios: "Freios",
  "ar-condicionado": "Ar-condicionado",
  direcao: "Direção",
  transmissao: "Transmissão",
  eletrica: "Elétrica",
  pneus: "Pneus",
  bateria: "Bateria",
  arrefecimento: "Arrefecimento",
};

// Base de conhecimento organizada por categoria. Estrutura pensada para crescer
// para centenas de itens sem exigir mudança em nenhum componente — é só
// adicionar objetos aqui.
export const symptoms: Symptom[] = [
  // ===== MOTOR =====
  {
    id: "sym-motor-1",
    slug: "motor-falhando",
    title: "Motor falhando",
    category: "motor",
    urgency: "alto",
    keywords: ["motor falhando", "engasgando", "falha no motor", "carro morrendo", "motor morrendo", "falhando"],
    description:
      "Falhas no motor podem ter origem em diversos sistemas — combustível, ignição ou eletrônica —, por isso é importante um diagnóstico específico.",
    possibleCauses: [
      "Velas ou cabos de ignição desgastados",
      "Sistema de alimentação de combustível com sujeira",
      "Sensores do motor fora da faixa ideal",
      "Filtro de combustível ou de ar obstruído",
    ],
    recommendation: "Evite rodar em velocidade alta ou forçar o motor até a avaliação, para não agravar o problema.",
  },
  {
    id: "sym-motor-2",
    slug: "consumo-elevado",
    title: "Consumo de combustível elevado",
    category: "motor",
    urgency: "baixo",
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
    id: "sym-motor-3",
    slug: "motor-barulho-estranho",
    title: "Motor com barulho estranho",
    category: "motor",
    urgency: "medio",
    keywords: ["barulho no motor", "motor batendo", "ruido no motor", "motor fazendo barulho"],
    description:
      "Ruídos incomuns no motor podem vir de correias, tensionadores ou de componentes internos — o tipo de som ajuda bastante a identificar a origem.",
    possibleCauses: [
      "Correia ou tensionador desgastado",
      "Nível de óleo baixo",
      "Coxim do motor com folga",
      "Componente interno com desgaste",
    ],
    recommendation: "Se possível, grave um vídeo curto do barulho — isso ajuda muito na hora da avaliação.",
  },
  {
    id: "sym-motor-4",
    slug: "fumaca-no-escapamento",
    title: "Fumaça no escapamento",
    category: "motor",
    urgency: "alto",
    keywords: ["fumaca no escapamento", "fumaca saindo do carro", "fumaca branca", "fumaca preta", "fumaca azul"],
    description:
      "A cor da fumaça ajuda a indicar a origem: branca costuma estar ligada a água/arrefecimento, preta a combustível, e azulada a queima de óleo.",
    possibleCauses: [
      "Queima de óleo no motor",
      "Vazamento no sistema de arrefecimento atingindo o motor",
      "Mistura de combustível rica",
      "Componente interno do motor desgastado",
    ],
    recommendation: "Evite rodar com fumaça constante saindo do escapamento — vale trazer o quanto antes.",
  },

  // ===== SUSPENSÃO =====
  {
    id: "sym-susp-1",
    slug: "suspensao-fazendo-barulho",
    title: "Suspensão fazendo barulho",
    category: "suspensao",
    urgency: "medio",
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
    id: "sym-susp-2",
    slug: "carro-balancando-muito",
    title: "Carro balançando muito em curvas",
    category: "suspensao",
    urgency: "medio",
    keywords: ["balancando em curva", "carro balancando muito", "carro inclinando muito", "carro molejando"],
    description:
      "Quando o carro 'balança' ou 'molejas' demais depois de passar por uma imperfeição, geralmente o amortecedor não está controlando o movimento como deveria.",
    possibleCauses: [
      "Amortecedores no fim da vida útil",
      "Molas com assentamento irregular",
      "Barra estabilizadora com folga",
    ],
    recommendation: "Fique atento se o efeito piora em curvas — essa informação ajuda na avaliação.",
    relatedServiceSlug: "suspensao",
  },

  // ===== FREIOS =====
  {
    id: "sym-freios-1",
    slug: "freio-fazendo-barulho",
    title: "Freio fazendo barulho",
    category: "freios",
    urgency: "alto",
    keywords: ["freio", "barulho ao frear", "grito", "rangido", "chiado no freio"],
    description:
      "Ruídos ao frear costumam ser um dos primeiros sinais de que o sistema de freios precisa de atenção — e é um item que não vale a pena esperar.",
    possibleCauses: [
      "Pastilhas de freio próximas do limite de desgaste",
      "Disco de freio desgastado ou empenado",
      "Acúmulo de sujeira ou pequenos detritos entre pastilha e disco",
      "Componente de segurança da pastilha avisando desgaste (em alguns modelos)",
    ],
    recommendation: "Por ser um item de segurança, o ideal é não adiar a avaliação — principalmente se o ruído for constante.",
    relatedServiceSlug: "freios",
  },
  {
    id: "sym-freios-2",
    slug: "pedal-de-freio-fundo",
    title: "Pedal de freio indo até o fundo",
    category: "freios",
    urgency: "alto",
    keywords: ["pedal de freio fundo", "pedal mole", "freio nao segura", "pedal de freio afundando"],
    description:
      "Um pedal de freio que vai muito fundo ou fica mole é sinal de alerta no sistema hidráulico de freios e não deve ser ignorado.",
    possibleCauses: [
      "Ar no sistema hidráulico de freios",
      "Vazamento de fluido de freio",
      "Cilindro mestre com desgaste",
    ],
    recommendation: "Evite dirigir o veículo até uma avaliação — este é um sintoma que envolve segurança direta.",
    relatedServiceSlug: "freios",
  },

  // ===== AR-CONDICIONADO =====
  {
    id: "sym-ar-1",
    slug: "ar-condicionado-nao-gela",
    title: "Ar-condicionado não gela",
    category: "ar-condicionado",
    urgency: "baixo",
    keywords: ["ar condicionado", "ar gelando", "nao gela", "ar quente", "ar fraco"],
    description:
      "Quando o ar-condicionado perde rendimento, geralmente está relacionado ao nível de gás refrigerante ou a algum componente do sistema de climatização.",
    possibleCauses: [
      "Nível de gás refrigerante baixo (possível pequeno vazamento)",
      "Compressor com funcionamento irregular",
      "Filtro de cabine sujo, reduzindo a circulação de ar",
      "Problema elétrico no acionamento do sistema",
    ],
    recommendation: "Vale evitar rodar muito tempo forçando o sistema no máximo até a avaliação, para não sobrecarregar o compressor.",
    relatedServiceSlug: "ar-condicionado",
  },
  {
    id: "sym-ar-2",
    slug: "ar-condicionado-cheiro-ruim",
    title: "Ar-condicionado com cheiro ruim",
    category: "ar-condicionado",
    urgency: "baixo",
    keywords: ["cheiro de mofo", "ar condicionado fedendo", "cheiro ruim no ar", "cheiro no ar condicionado"],
    description:
      "O cheiro de mofo ao ligar o ar-condicionado normalmente vem do acúmulo de fungos e bactérias no evaporador, algo bem comum com o tempo de uso.",
    possibleCauses: [
      "Evaporador com acúmulo de fungos e bactérias",
      "Filtro de cabine saturado",
      "Dreno de condensação parcialmente entupido",
    ],
    recommendation: "Uma higienização do sistema costuma resolver — é rápido e faz bastante diferença.",
    relatedServiceSlug: "ar-condicionado",
  },

  // ===== DIREÇÃO =====
  {
    id: "sym-direcao-1",
    slug: "carro-puxando",
    title: "Carro puxando para um lado",
    category: "direcao",
    urgency: "medio",
    keywords: ["carro puxando", "puxando para um lado", "puxando pro lado"],
    description:
      "Quando o carro 'puxa' para um dos lados, geralmente é um sinal ligado ao alinhamento, à suspensão ou aos pneus.",
    possibleCauses: [
      "Alinhamento de direção fora da especificação",
      "Pressão ou desgaste irregular entre os pneus",
      "Componente da suspensão com folga",
      "Freio de uma roda travando parcialmente",
    ],
    recommendation: "Evite dirigir em velocidade alta até a avaliação, principalmente se o efeito for perceptível ao soltar o volante.",
    relatedServiceSlug: "alinhamento",
  },
  {
    id: "sym-direcao-2",
    slug: "direcao-pesada",
    title: "Direção pesada",
    category: "direcao",
    urgency: "baixo",
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
    id: "sym-direcao-3",
    slug: "volante-vibrando",
    title: "Volante vibrando",
    category: "direcao",
    urgency: "medio",
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
  {
    id: "sym-direcao-4",
    slug: "barulho-ao-virar-o-volante",
    title: "Barulho ao virar o volante",
    category: "direcao",
    urgency: "medio",
    keywords: ["barulho ao virar o volante", "barulho na direcao", "estalo ao virar"],
    description:
      "Ruídos ao virar o volante, principalmente em baixa velocidade ou manobras, costumam vir de terminais de direção ou da caixa de direção.",
    possibleCauses: [
      "Terminal de direção desgastado",
      "Bomba da direção hidráulica com ar ou baixo nível de fluido",
      "Coifa da caixa de direção danificada",
    ],
    recommendation: "Observe se o barulho acontece mais em manobras de estacionamento — isso ajuda a localizar a origem.",
  },

  // ===== TRANSMISSÃO =====
  {
    id: "sym-transmissao-1",
    slug: "dificuldade-para-trocar-marcha",
    title: "Dificuldade para trocar de marcha",
    category: "transmissao",
    urgency: "medio",
    keywords: ["dificuldade para trocar marcha", "cambio duro", "marcha engasgando", "cambio travando"],
    description:
      "A dificuldade para engatar marchas pode estar ligada à embreagem (em câmbio manual) ou a componentes internos do câmbio.",
    possibleCauses: [
      "Embreagem desregulada ou desgastada",
      "Nível de óleo do câmbio inadequado",
      "Cabo ou atuador de câmbio com desgaste",
    ],
    recommendation: "Evite forçar a troca de marcha até a avaliação, para não acelerar o desgaste.",
  },
  {
    id: "sym-transmissao-2",
    slug: "solavancos-cambio-automatico",
    title: "Solavancos no câmbio automático",
    category: "transmissao",
    urgency: "alto",
    keywords: ["solavanco no cambio", "cambio automatico trancos", "cambio dando solavanco", "troca de marcha com trancos"],
    description:
      "Solavancos nas trocas de marcha de um câmbio automático merecem atenção — o sistema é mais sensível e o custo de negligenciar costuma ser maior.",
    possibleCauses: [
      "Nível ou qualidade do fluido de câmbio inadequado",
      "Solenoide de câmbio com falha",
      "Necessidade de atualização de software da central do câmbio",
    ],
    recommendation: "Evite rodar muito tempo nessa condição — câmbios automáticos costumam ter reparos mais caros quando o problema avança.",
  },

  // ===== ELÉTRICA =====
  {
    id: "sym-eletrica-1",
    slug: "luz-da-injecao-acendeu",
    title: "Luz da injeção acendeu",
    category: "eletrica",
    urgency: "medio",
    keywords: ["luz da injecao", "luz injecao acendeu", "luz do motor", "luz no painel"],
    description:
      "A luz da injeção acende quando algum sensor do motor identifica uma leitura fora do padrão — pode ser algo simples ou algo que merece atenção maior.",
    possibleCauses: [
      "Tampa do tanque de combustível mal fechada",
      "Sensor do motor com leitura fora da faixa",
      "Vela ou bobina de ignição com falha",
      "Sistema de emissões com alguma pendência",
    ],
    recommendation: "Se a luz estiver piscando (não fixa), o ideal é evitar acelerar o veículo e buscar avaliação o quanto antes.",
  },
  {
    id: "sym-eletrica-2",
    slug: "vidro-eletrico-nao-funciona",
    title: "Vidro elétrico não funciona",
    category: "eletrica",
    urgency: "baixo",
    keywords: ["vidro eletrico nao funciona", "vidro nao sobe", "vidro nao desce", "vidro travado"],
    description:
      "Vidros elétricos que param de responder costumam ter origem no motor do vidro, no chicote elétrico ou no próprio botão do comando.",
    possibleCauses: [
      "Motor do vidro elétrico desgastado",
      "Fusível ou relé específico queimado",
      "Chicote elétrico da porta com mau contato",
    ],
    recommendation: "Evite forçar o vidro manualmente — isso pode danificar ainda mais o mecanismo.",
  },
  {
    id: "sym-eletrica-3",
    slug: "farol-fraco-ou-piscando",
    title: "Farol fraco ou piscando",
    category: "eletrica",
    urgency: "medio",
    keywords: ["farol fraco", "farol piscando", "farol falhando", "luz do farol variando"],
    description:
      "Farol fraco ou piscando pode indicar desde uma lâmpada no fim da vida útil até uma variação na rede elétrica do veículo.",
    possibleCauses: [
      "Lâmpada ou módulo do farol no fim da vida útil",
      "Mau contato na fiação do farol",
      "Alternador com regulagem de voltagem irregular",
    ],
    recommendation: "Se o brilho variar junto com o giro do motor, é um sinal importante para mencionar na avaliação.",
  },

  // ===== PNEUS =====
  {
    id: "sym-pneus-1",
    slug: "pneu-desgaste-irregular",
    title: "Pneu com desgaste irregular",
    category: "pneus",
    urgency: "medio",
    keywords: ["desgaste irregular no pneu", "pneu gastando torto", "pneu gastando de um lado"],
    description:
      "Quando o pneu desgasta de forma desigual, geralmente há um problema de alinhamento, balanceamento ou pressão por trás disso.",
    possibleCauses: [
      "Alinhamento fora da especificação",
      "Pressão incorreta com frequência",
      "Componente da suspensão com folga",
    ],
    recommendation: "Vale revisar a pressão dos pneus regularmente enquanto isso não é resolvido.",
    relatedServiceSlug: "alinhamento",
  },
  {
    id: "sym-pneus-2",
    slug: "pneu-perdendo-pressao",
    title: "Pneu perdendo pressão com frequência",
    category: "pneus",
    urgency: "medio",
    keywords: ["pneu murchando", "pneu perdendo pressao", "pneu furando sozinho", "pneu vazio toda hora"],
    description:
      "Um pneu que perde pressão com frequência pode ter um furo pequeno, problema na válvula, ou no talão de encaixe com o aro.",
    possibleCauses: [
      "Furo pequeno causado por algum objeto",
      "Válvula do pneu desgastada",
      "Vazamento no talão entre pneu e roda",
    ],
    recommendation: "Evite rodar com o pneu murcho — isso danifica a lateral e pode inutilizá-lo.",
    relatedServiceSlug: "venda-de-pneus",
  },

  // ===== BATERIA =====
  {
    id: "sym-bateria-1",
    slug: "bateria-descarregando",
    title: "Bateria descarregando",
    category: "bateria",
    urgency: "medio",
    keywords: ["bateria descarregando", "bateria fraca", "bateria morta"],
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
    id: "sym-bateria-2",
    slug: "carro-nao-liga",
    title: "Carro não liga",
    category: "bateria",
    urgency: "alto",
    keywords: ["carro nao liga", "carro nao pega", "carro nao da partida"],
    description:
      "Quando o carro não dá partida, o motor de arranque, a bateria e o sistema elétrico são os primeiros pontos a investigar.",
    possibleCauses: [
      "Bateria descarregada ou no fim da vida útil",
      "Motor de arranque com falha",
      "Terminais da bateria soltos ou oxidados",
      "Falha na chave ou no sistema de imobilizador",
    ],
    recommendation: "Se for possível, verifique se há alguma luz no painel ao girar a chave — essa informação ajuda bastante.",
  },

  // ===== ARREFECIMENTO =====
  {
    id: "sym-arref-1",
    slug: "motor-esquentando",
    title: "Motor esquentando",
    category: "arrefecimento",
    urgency: "alto",
    keywords: ["motor esquentando", "carro esquenta", "superaquecendo", "temperatura alta", "esquentando"],
    description:
      "O superaquecimento do motor é um dos sintomas mais sérios e pode ter várias origens no sistema de arrefecimento.",
    possibleCauses: [
      "Nível de líquido de arrefecimento baixo",
      "Vazamento no sistema de arrefecimento",
      "Válvula termostática com defeito",
      "Radiador ou ventoinha com funcionamento irregular",
    ],
    recommendation: "Se o ponteiro de temperatura subir muito, o ideal é parar o veículo com segurança e não continuar rodando — isso pode evitar um dano bem maior ao motor.",
  },
  {
    id: "sym-arref-2",
    slug: "vazamento-de-agua",
    title: "Vazamento de água embaixo do carro",
    category: "arrefecimento",
    urgency: "medio",
    keywords: ["vazamento de agua", "poça de agua embaixo do carro", "vazando liquido do carro"],
    description:
      "Uma poça de líquido embaixo do carro pode ser só condensação do ar-condicionado (normal) ou um vazamento no sistema de arrefecimento (não normal).",
    possibleCauses: [
      "Condensação do ar-condicionado (normal, geralmente água limpa)",
      "Vazamento na mangueira do radiador",
      "Vazamento na bomba d'água",
    ],
    recommendation: "Repare na cor do líquido: se for esverdeado, rosado ou alaranjado, não é condensação — vale trazer para avaliação.",
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
