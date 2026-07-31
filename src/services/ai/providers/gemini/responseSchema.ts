// Schema JSON que força o Gemini a responder sempre na mesma estrutura —
// evita parsing frágil de texto livre e mantém o AssistantAnswerCard (UI)
// funcionando sem qualquer lógica de interpretação de markdown.
export const ASSISTANT_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    possibleCauses: {
      type: "array",
      items: { type: "string" },
      description: "Lista de possíveis causas do sintoma. Vazia se offTopic for true.",
    },
    urgency: {
      type: "string",
      enum: ["baixo", "medio", "alto"],
      description: "Nível de urgência típico deste sintoma.",
    },
    recommendation: {
      type: "string",
      description: "Orientação curta e prática — equivalente a 'O que recomendamos'.",
    },
    important: {
      type: "string",
      description: "Reforço de que o diagnóstico definitivo depende de avaliação presencial.",
    },
    closingNote: {
      type: "string",
      description: "Frase curta convidando o cliente a levar o veículo até a oficina.",
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
  required: ["possibleCauses", "urgency", "recommendation", "important", "closingNote", "offTopic"],
};
