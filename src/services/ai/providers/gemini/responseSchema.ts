// Schema JSON que força o Gemini a responder sempre na mesma estrutura —
// evita parsing frágil de texto livre. "message" carrega a resposta
// conversacional completa; os demais campos são metadados leves usados pela
// UI (badge de urgência, lista curta de causas quando fizer sentido).
export const ASSISTANT_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description:
        "Resposta conversacional completa, em prosa natural, como um consultor da JR Film explicaria ao cliente. Pode ser uma orientação ou uma pergunta de esclarecimento.",
    },
    possibleCauses: {
      type: "array",
      items: { type: "string" },
      description:
        "Lista curta de possíveis causas, apenas quando uma lista realmente ajudar a compreensão. Vazia em perguntas de esclarecimento ou quando o texto corrido já é suficiente.",
    },
    urgency: {
      type: "string",
      enum: ["baixo", "medio", "alto"],
      description: "Só preencher quando a mensagem já for uma orientação sobre causas, nunca em uma pergunta de esclarecimento.",
    },
    offTopic: {
      type: "boolean",
      description: "true somente se a pergunta não for sobre o universo automotivo.",
    },
    relatedServiceSlug: {
      type: "string",
      description:
        "Slug do serviço mais relacionado, se houver um claramente aplicável (ex: 'freios', 'suspensao', 'ar-condicionado'). Omitir se não houver.",
    },
  },
  required: ["message", "possibleCauses", "offTopic"],
};
