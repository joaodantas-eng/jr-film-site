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

// Mensagem exibida ao usuário em falhas de comunicação — nunca texto técnico,
// stack trace ou código de erro. O detalhe técnico real fica só no log do servidor.
export const ASSISTANT_ERROR_MESSAGE =
  "Não foi possível responder agora. Tente enviar a mensagem de novo em alguns instantes. Se o problema continuar, fale com a JR Film pelo WhatsApp.";

// Mensagem específica para falha ao analisar uma imagem — nunca inventamos
// uma análise falsa quando isso acontece.
export const ASSISTANT_IMAGE_ERROR_MESSAGE =
  "No momento não foi possível analisar esta imagem. Você pode tentar novamente em alguns instantes ou descrever o problema em texto.";

// Mensagens amigáveis por código de erro devolvido pela API (ver limits.ts).
export const ASSISTANT_ERROR_MESSAGES: Record<string, string> = {
  rate_limited:
    "Você enviou muitas mensagens em pouco tempo. Aguarde alguns minutos e tente de novo — ou fale com a equipe pelo WhatsApp.",
  busy: "Ainda estou respondendo a sua mensagem anterior. Aguarde a resposta antes de enviar outra.",
  disabled:
    "O assistente está temporariamente indisponível. Para orientação sobre o seu veículo, fale com a JR Film pelo WhatsApp.",
  images_disabled: "O envio de fotos está temporariamente desativado. Descreva o problema em texto, por favor.",
  invalid_request: "Não consegui ler a sua mensagem. Escreva novamente e envie.",
  invalid_image: "Esse arquivo não parece ser uma foto válida. Envie uma imagem JPG, PNG, WEBP ou HEIC.",
  image_too_large: "A foto é grande demais para envio. Tente uma foto menor ou tire um print da tela.",
  forbidden: ASSISTANT_ERROR_MESSAGE,
  captcha_required:
    "Precisamos confirmar que você não é um robô. Conclua a verificação acima do campo de mensagem e envie de novo.",
  captcha_unavailable:
    "Não foi possível concluir a verificação de segurança agora. Tente novamente em alguns instantes.",
  timeout: "A resposta demorou mais que o esperado. Tente enviar de novo em instantes.",
  unavailable: ASSISTANT_ERROR_MESSAGE,
  network: "Sem conexão com o servidor. Verifique sua internet e tente de novo.",
};
