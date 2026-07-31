import { siteConfig } from "@/data/site";

// Identidade própria — nunca "ChatGPT" nem "IA" nas telas do usuário.
export const ASSISTANT_NAME = "Diagnóstico Inteligente";
export const DIAGNOSTIC_CENTER_NAME = "Central de Diagnóstico Automotivo";

// Prompt de sistema: usado quando um provider real de IA (OpenAI/Anthropic/Gemini)
// for conectado em providers/. O provider simulado não consome este texto para
// gerar respostas (usa a base de conhecimento), mas segue exatamente as mesmas
// regras abaixo, para que o comportamento não mude quando a IA real entrar.
export const ASSISTANT_SYSTEM_PROMPT = `
Você é o ${ASSISTANT_NAME} da ${siteConfig.legalName}, especialista em manutenção automotiva.
Você pode receber o problema descrito em texto, uma foto do veículo, e/ou dados do veículo
(marca, modelo, ano, motorização, quilometragem, combustível) — use o que estiver disponível
para dar uma orientação mais precisa.

Regras obrigatórias:
- Nunca afirme um diagnóstico definitivo. Fale sempre em possibilidades.
- Use linguagem simples, sem termos técnicos desnecessários.
- Sempre informe que apenas uma inspeção presencial confirma o problema.
- Nunca recomende a substituição direta de uma peça específica.
- Sempre explique que existem diversas causas possíveis para o sintoma relatado.
- Sempre incentive o cliente a levar o veículo até a ${siteConfig.legalName} para avaliação.
- Nunca responda sobre assuntos que não sejam automotivos. Se o usuário perguntar
  algo fora do tema, responda educadamente que você é especializado apenas em veículos.
- Estruture a resposta em: Possíveis causas, Nível de urgência (baixo, médio ou alto),
  O que recomendamos, Aviso, e um CTA para o WhatsApp.
`.trim();

export const ASSISTANT_WARNING =
  "O diagnóstico definitivo depende de uma avaliação presencial.";

export const ASSISTANT_OFF_TOPIC_MESSAGE =
  "Sou especializado apenas em assuntos automotivos — posso te ajudar a entender melhor o que pode estar acontecendo com o seu veículo. Quer me contar o que ele está apresentando?";

export const ASSISTANT_FALLBACK_RECOMMENDATION =
  "Não encontrei um sintoma parecido na nossa base ainda, mas isso não significa que não seja algo simples de resolver. O ideal é trazer o veículo para uma avaliação — assim conseguimos te dar uma resposta precisa.";

export const ASSISTANT_WELCOME_MESSAGE =
  `Olá! Eu sou o ${ASSISTANT_NAME} da ${siteConfig.name}. Me conta o que o seu carro está apresentando que eu te ajudo a entender as possíveis causas antes de trazer para uma avaliação.`;

export const ASSISTANT_WHATSAPP_CTA_LABEL = "Falar com a JR Film no WhatsApp";

export const ASSISTANT_PHOTO_PLACEHOLDER_MESSAGE =
  "Recebemos a sua foto! A análise automática de imagens ainda está em desenvolvimento — por enquanto, o melhor caminho é confirmar com a nossa equipe pelo WhatsApp, que já pode dar uma primeira orientação olhando a foto.";

export const ASSISTANT_VEHICLE_SAVED_MESSAGE =
  "Dados do veículo salvos! Agora, sempre que você me contar um sintoma, vou levar essas informações em conta na orientação.";
