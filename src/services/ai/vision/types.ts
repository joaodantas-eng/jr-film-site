// Contratos da camada de visão computacional (análise de fotos). Hoje só o
// provider simulado existe — mas o formato de resposta já é o mesmo
// AssistantAnswer usado pelo chat de texto, então a UI (PhotoUploader)
// não precisa saber se a análise veio de texto ou de imagem.
import { AssistantAnswer } from "../types";

export interface VisionProvider {
  name: string;
  analyzePhoto: (photoDescription: PhotoInput) => Promise<AssistantAnswer>;
}

// Metadados da foto enviada — hoje usados só para exibição; futuramente
// carregam a referência real do arquivo enviado para a API multimodal.
export interface PhotoInput {
  fileName: string;
  fileType: string;
  fileSizeKb: number;
}
