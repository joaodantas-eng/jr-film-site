import { AssistantMessage, VehicleInfo } from "../types";

export type DiagnosticMode = "select" | "text" | "photo" | "vehicle";

// Estado de uma sessão da Central de Diagnóstico: qual modo está ativo, os
// dados do veículo já informados (compartilhados entre os modos) e o
// histórico de mensagens do modo texto. Hoje vive só em memória do navegador
// (ver hooks/useDiagnosticSession); a estrutura já separa "sessão" de
// "mensagem" para permitir persistência futura (histórico de conversas,
// área do cliente) sem reformular os tipos.
export interface DiagnosticSession {
  mode: DiagnosticMode;
  vehicleInfo: VehicleInfo | null;
  messages: AssistantMessage[];
}

export function createEmptySession(): DiagnosticSession {
  return { mode: "select", vehicleInfo: null, messages: [] };
}
