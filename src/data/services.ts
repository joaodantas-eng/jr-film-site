import { Service } from "@/types";

// Fonte de dados dos serviços — hoje estática, futuramente substituível por
// services/services.ts fazendo fetch em um banco, sem alterar nenhum componente.
// Os campos estendidos (benefits, symptoms, process, faq...) alimentam a página
// individual em app/servicos/[slug], gerada dinamicamente a partir deste array.
export const services: Service[] = [
  {
    id: "svc-1",
    slug: "troca-de-oleo",
    title: "Troca de Óleo",
    description:
      "Substituição de óleo e filtros com produtos homologados, respeitando as especificações do fabricante do seu veículo.",
    metaDescription:
      "Troca de óleo em Nova Serrana com produtos homologados e checklist de qualidade. Agende pelo WhatsApp na JR Film.",
    icon: "Droplet",
    longDescription:
      "O óleo do motor é responsável por lubrificar, resfriar e proteger as peças internas contra desgaste. Na JR Film, a troca é feita com óleo e filtros dentro da especificação do fabricante, respeitando a viscosidade e o intervalo recomendados para o seu modelo — evitando tanto a troca antecipada desnecessária quanto o desgaste por atraso.",
    benefits: [
      "Motor lubrificado corretamente, reduzindo desgaste prematuro",
      "Menor consumo de combustível",
      "Prevenção de superaquecimento",
      "Peças originais ou homologadas, com nota fiscal",
    ],
    symptoms: [
      "Luz de óleo acesa no painel",
      "Ruído metálico vindo do motor",
      "Óleo escuro e com cheiro de queimado na vareta",
      "Fumaça saindo do escapamento",
    ],
    whenToDo:
      "Normalmente a cada 10.000 km ou uma vez por ano, o que ocorrer primeiro — mas o intervalo exato depende do óleo usado e do manual do seu veículo. Se tiver dúvida, chame no WhatsApp e a gente confirma.",
    process: [
      { title: "Diagnóstico rápido", description: "Verificação do nível, cor e viscosidade do óleo atual." },
      { title: "Drenagem", description: "Remoção do óleo usado e do filtro antigo." },
      { title: "Reabastecimento", description: "Novo óleo e filtro na especificação correta do fabricante." },
      { title: "Checagem final", description: "Teste de vazamento e conferência do nível antes da entrega." },
    ],
    faq: [
      {
        id: "faq-oleo-1",
        question: "Qual óleo é o ideal para o meu carro?",
        answer:
          "Depende do motor e do manual do fabricante. Na avaliação, verificamos a especificação correta antes de aplicar.",
      },
      {
        id: "faq-oleo-2",
        question: "Posso trocar só o óleo sem trocar o filtro?",
        answer:
          "Não recomendamos — o filtro sujo contamina o óleo novo rapidamente e reduz o benefício da troca.",
      },
    ],
  },
  {
    id: "svc-2",
    slug: "suspensao",
    title: "Suspensão",
    description:
      "Diagnóstico e reparo completo de amortecedores, molas e componentes, devolvendo estabilidade e conforto de condução.",
    metaDescription:
      "Manutenção de suspensão em Nova Serrana: amortecedores, molas e componentes com diagnóstico técnico. Agende na JR Film.",
    icon: "Settings2",
    longDescription:
      "A suspensão é responsável pela estabilidade, conforto e segurança do veículo — inclusive na frenagem. Fazemos diagnóstico completo de amortecedores, molas, buchas e terminais, identificando exatamente qual componente está comprometido antes de qualquer troca.",
    benefits: [
      "Mais estabilidade em curvas e frenagens",
      "Redução do desgaste irregular dos pneus",
      "Menos ruído e trepidação na direção",
      "Diagnóstico peça por peça antes de orçar",
    ],
    symptoms: [
      "Barulhos ao passar por buracos ou lombadas",
      "Carro 'balançando' demais após passar por imperfeições",
      "Desgaste irregular dos pneus",
      "Veículo puxando para um dos lados",
    ],
    whenToDo:
      "Ao notar qualquer ruído incomum na suspensão, ou a cada revisão preventiva — amortecedores costumam durar entre 40.000 e 60.000 km, variando com o uso.",
    process: [
      { title: "Inspeção no elevador", description: "Checagem visual de amortecedores, molas, buchas e terminais." },
      { title: "Teste de bancada", description: "Identificação de folgas e vazamentos nos amortecedores." },
      { title: "Orçamento detalhado", description: "Você aprova exatamente o que será trocado, sem surpresas." },
      { title: "Reparo e teste de rodagem", description: "Substituição das peças e teste final antes da entrega." },
    ],
    faq: [
      {
        id: "faq-susp-1",
        question: "Dá pra trocar só um amortecedor?",
        answer:
          "Tecnicamente sim, mas recomendamos trocar em pares (eixo dianteiro ou traseiro) para manter o equilíbrio do veículo.",
      },
    ],
  },
  {
    id: "svc-3",
    slug: "freios",
    title: "Freios",
    description:
      "Revisão de pastilhas, discos e fluido com testes de segurança antes da entrega do veículo.",
    metaDescription:
      "Revisão de freios em Nova Serrana: pastilhas, discos e fluido com teste de segurança. Agende na JR Film.",
    icon: "Disc3",
    longDescription:
      "O sistema de freios é o item de segurança mais crítico do veículo. Revisamos pastilhas, discos, fluido e o funcionamento geral do sistema, sempre com teste prático antes da entrega — segurança não é algo que a gente estima, é algo que a gente testa.",
    benefits: [
      "Frenagem mais curta e segura",
      "Identificação precoce de discos empenados",
      "Fluido de freio dentro da validade e especificação",
      "Teste de rodagem antes da entrega",
    ],
    symptoms: [
      "Ruído de 'grito' ou atrito ao frear",
      "Pedal de freio mole ou muito duro",
      "Veículo puxando para um lado ao frear",
      "Vibração no volante durante a frenagem",
    ],
    whenToDo:
      "Ao primeiro sinal de ruído ou perda de eficiência — pastilhas costumam durar entre 20.000 e 40.000 km, dependendo do uso do veículo.",
    process: [
      { title: "Inspeção do sistema", description: "Medição da espessura de pastilhas e discos." },
      { title: "Verificação do fluido", description: "Checagem de nível, validade e ponto de ebulição." },
      { title: "Substituição das peças", description: "Troca de pastilhas, discos ou fluido conforme o diagnóstico." },
      { title: "Teste de frenagem", description: "Teste prático de segurança antes de liberar o veículo." },
    ],
    faq: [
      {
        id: "faq-freios-1",
        question: "Com que frequência devo trocar o fluido de freio?",
        answer: "Em geral a cada 1 a 2 anos, já que o fluido absorve umidade com o tempo e perde eficiência.",
      },
    ],
  },
  {
    id: "svc-4",
    slug: "alinhamento",
    title: "Alinhamento",
    description:
      "Ajuste de geometria com equipamento a laser para rodagem correta e economia de pneus.",
    metaDescription:
      "Alinhamento de direção em Nova Serrana com equipamento a laser. Economize pneus e dirija com mais estabilidade. JR Film.",
    icon: "GaugeCircle",
    longDescription:
      "O alinhamento ajusta os ângulos das rodas para que o veículo ande em linha reta sem esforço no volante, com desgaste uniforme dos pneus. Usamos equipamento a laser para garantir precisão dentro da especificação do fabricante.",
    benefits: [
      "Direção mais leve e estável",
      "Pneus durando mais tempo",
      "Menor consumo de combustível",
      "Precisão a laser, dentro da especificação de fábrica",
    ],
    symptoms: [
      "Carro puxando para um dos lados",
      "Volante torto em linha reta",
      "Desgaste irregular na banda do pneu",
      "Vibração no volante em determinadas velocidades",
    ],
    whenToDo:
      "A cada 10.000 km, após trocar pneus, ou sempre que bater em um buraco ou meio-fio com mais força.",
    process: [
      { title: "Medição a laser", description: "Leitura dos ângulos atuais de convergência, câmber e cáster." },
      { title: "Comparação com a especificação", description: "Verificação contra os valores de fábrica do veículo." },
      { title: "Ajuste de geometria", description: "Correção dos ângulos até dentro da tolerância correta." },
      { title: "Teste de rodagem", description: "Conferência final de estabilidade em linha reta." },
    ],
  },
  {
    id: "svc-5",
    slug: "balanceamento",
    title: "Balanceamento",
    description:
      "Equilíbrio das rodas para eliminar vibração e prolongar a vida útil de pneus e suspensão.",
    metaDescription:
      "Balanceamento de rodas em Nova Serrana para eliminar vibração no volante e proteger a suspensão. Agende na JR Film.",
    icon: "Scale",
    longDescription:
      "Rodas desbalanceadas causam vibração, desgaste irregular do pneu e sobrecarga em componentes da suspensão. O balanceamento distribui pequenos contrapesos na roda para eliminar esse desequilíbrio.",
    benefits: [
      "Fim da vibração no volante ou no banco",
      "Pneus com desgaste mais uniforme",
      "Menos sobrecarga em rolamentos e suspensão",
      "Rodagem mais silenciosa",
    ],
    symptoms: [
      "Vibração no volante a partir de determinada velocidade",
      "Vibração sentida no banco ou assoalho",
      "Desgaste irregular em forma de 'ondas' no pneu",
    ],
    whenToDo: "Sempre que trocar pneus, e a cada 10.000 km como parte da manutenção preventiva.",
    process: [
      { title: "Montagem na balanceadora", description: "Roda é colocada no equipamento de precisão." },
      { title: "Leitura do desequilíbrio", description: "Identificação dos pontos exatos de desbalanceamento." },
      { title: "Aplicação dos contrapesos", description: "Ajuste fino até o equilíbrio correto." },
    ],
  },
  {
    id: "svc-6",
    slug: "ar-condicionado",
    title: "Ar-Condicionado",
    description:
      "Higienização, recarga de gás e reparo do sistema de climatização com verificação de vazamentos.",
    metaDescription:
      "Manutenção de ar-condicionado automotivo em Nova Serrana: higienização, recarga de gás e reparo. Agende na JR Film.",
    icon: "Wind",
    longDescription:
      "O sistema de ar-condicionado automotivo precisa de manutenção preventiva para manter o gás no nível correto e o ar livre de fungos e bactérias. Fazemos diagnóstico completo, incluindo teste de vazamento antes de qualquer recarga.",
    benefits: [
      "Ar mais gelado e mais rápido para climatizar",
      "Ar livre de mofo e odores",
      "Identificação de vazamentos antes da recarga",
      "Compressor protegido contra falta de gás",
    ],
    symptoms: [
      "Ar saindo fraco ou não gelado",
      "Cheiro de mofo ao ligar o ar",
      "Ruído ao acionar o compressor",
      "Embaçamento excessivo do vidro",
    ],
    whenToDo: "Higienização a cada 12 meses; recarga de gás quando o rendimento cair — geralmente a cada 1 a 2 anos.",
    process: [
      { title: "Diagnóstico do sistema", description: "Verificação de pressão, vazamentos e funcionamento do compressor." },
      { title: "Higienização", description: "Limpeza do sistema para eliminar fungos e bactérias." },
      { title: "Recarga de gás", description: "Reposição do gás refrigerante na quantidade correta." },
      { title: "Teste de performance", description: "Conferência da temperatura de saída do ar." },
    ],
  },
  {
    id: "svc-7",
    slug: "insulfilm",
    title: "Insulfilm",
    description:
      "Aplicação de película automotiva com controle de temperatura interna e proteção contra radiação UV.",
    metaDescription:
      "Aplicação de insulfilm em Nova Serrana com controle de temperatura e proteção UV. Veja os graus disponíveis na JR Film.",
    icon: "SunDim",
    longDescription:
      "O insulfilm reduz a entrada de calor e a radiação UV dentro do veículo, além de dar mais privacidade. Trabalhamos com películas de diferentes graus de transparência, sempre dentro do que é permitido pela legislação de trânsito.",
    benefits: [
      "Redução de calor dentro do veículo",
      "Proteção contra radiação UV para os ocupantes",
      "Mais privacidade",
      "Aplicação sem bolhas, com acabamento profissional",
    ],
    symptoms: [],
    whenToDo: "A qualquer momento — muitos clientes aplicam logo após a compra do veículo, junto com os acessórios.",
    process: [
      { title: "Escolha do grau", description: "Definição da porcentagem de transparência dentro da lei." },
      { title: "Limpeza dos vidros", description: "Preparação da superfície para a aplicação." },
      { title: "Aplicação da película", description: "Corte e aplicação profissional, sem bolhas." },
      { title: "Secagem e conferência", description: "Período de cura e checagem final do acabamento." },
    ],
  },
  {
    id: "svc-8",
    slug: "venda-de-pneus",
    title: "Venda de Pneus",
    description:
      "Pneus de marcas confiáveis para todos os perfis de veículo, com orientação técnica na hora da escolha.",
    metaDescription:
      "Venda de pneus em Nova Serrana com orientação técnica sobre a melhor medida e marca para o seu veículo. JR Film.",
    icon: "Layers",
    longDescription:
      "Trabalhamos com pneus de marcas confiáveis para carros de passeio, picapes e utilitários. A escolha leva em conta o perfil de uso do veículo — cidade, estrada ou uso misto — para indicar o pneu com o melhor custo-benefício real.",
    benefits: [
      "Orientação técnica sem empurrar o pneu mais caro",
      "Instalação com balanceamento incluso",
      "Marcas confiáveis, com garantia de fábrica",
      "Avaliação do desgaste dos pneus atuais",
    ],
    symptoms: [
      "Sulcos gastos abaixo do limite legal (1,6mm)",
      "Bolhas ou rachaduras na lateral do pneu",
      "Desgaste irregular",
      "Pneu vazando com frequência",
    ],
    whenToDo:
      "Quando os sulcos estiverem próximos do indicador de desgaste (TWI) do pneu, ou a cada 40.000-50.000 km em uso normal.",
    process: [
      { title: "Avaliação dos pneus atuais", description: "Medição de desgaste e identificação de danos." },
      { title: "Indicação técnica", description: "Sugestão de medida e modelo conforme o uso do veículo." },
      { title: "Troca e balanceamento", description: "Instalação com balanceamento incluso no serviço." },
    ],
  },
  {
    id: "svc-9",
    slug: "acessorios",
    title: "Acessórios Automotivos",
    description:
      "Instalação de acessórios originais e homologados, com acabamento que preserva as características do veículo.",
    metaDescription:
      "Instalação de acessórios automotivos em Nova Serrana com acabamento profissional. Veja as opções na JR Film.",
    icon: "Sparkles",
    longDescription:
      "Instalamos acessórios originais e homologados — de itens de proteção a multimídia — sempre com acabamento que preserva as características originais do veículo e sem comprometer a garantia de fábrica.",
    benefits: [
      "Instalação sem danos à fiação original",
      "Acessórios homologados",
      "Acabamento que preserva o padrão de fábrica",
    ],
    symptoms: [],
    whenToDo: "Assim que definir quais acessórios deseja instalar — normalmente feito junto com outros serviços.",
    process: [
      { title: "Consulta de compatibilidade", description: "Verificação se o acessório é compatível com o modelo." },
      { title: "Instalação", description: "Montagem cuidadosa, preservando a fiação e o acabamento original." },
      { title: "Teste de funcionamento", description: "Checagem final antes da entrega." },
    ],
  },
];
