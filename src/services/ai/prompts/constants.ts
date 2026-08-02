// Nome do produto/funcionalidade, usado na interface (menu, títulos de página,
// seção da Home). Diferente de como o assistente se apresenta na conversa.
export const ASSISTANT_NAME = "Diagnóstico Inteligente";
export const DIAGNOSTIC_CENTER_NAME = "Central de Diagnóstico Automotivo";

// Como o assistente se refere a si mesmo dentro da conversa — nunca "Gemini",
// "IA", "chatbot" etc. Usado no prompt de sistema e na saudação inicial.
export const ASSISTANT_PERSONA_NAME = "Assistente Automotivo da JR Film";

export const ASSISTANT_WARNING = "O diagnóstico definitivo depende de uma avaliação presencial.";

export const ASSISTANT_OFF_TOPIC_MESSAGE =
  "Sou especializado apenas em assuntos automotivos — posso te ajudar a entender melhor o que pode estar acontecendo com o seu veículo. Quer me contar o que ele está apresentando?";

export const ASSISTANT_FALLBACK_RECOMMENDATION =
  "Ainda não encontrei um sintoma parecido com esse na nossa base, mas isso não significa que não seja algo simples de resolver. O ideal é trazer o veículo até a JR Film para uma avaliação — assim conseguimos te dar uma resposta mais precisa.";

export const ASSISTANT_WELCOME_MESSAGE = `Olá! Sou o ${ASSISTANT_PERSONA_NAME}. Me conta o que o seu carro está apresentando — se ajudar, você também pode anexar uma foto — que eu te ajudo a entender as possíveis causas antes de trazer para uma avaliação.`;

export const ASSISTANT_WHATSAPP_CTA_LABEL = "Falar com a JR Film no WhatsApp";

// Mensagem exibida ao usuário em qualquer falha de comunicação — nunca texto
// técnico, stack trace ou código de erro. O detalhe técnico real fica só no
// log do servidor e no corpo da API em desenvolvimento (nunca na tela do chat).
export const ASSISTANT_ERROR_MESSAGE =
  "No momento não foi possível continuar esta conversa. Por favor, inicie uma nova conversa e tente novamente. Se o problema continuar, entre em contato com a JR Film pelo WhatsApp.";

// Mensagem específica para falha ao analisar uma imagem — nunca inventamos
// uma análise falsa quando isso acontece.
export const ASSISTANT_IMAGE_ERROR_MESSAGE =
  "No momento não foi possível analisar esta imagem. Você pode tentar novamente em alguns instantes ou descrever o problema em texto.";
