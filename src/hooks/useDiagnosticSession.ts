"use client";

import { useState, useCallback } from "react";
import { VehicleInfo } from "@/services/ai/types";
import { DiagnosticMode } from "@/services/ai/chat/session";

// Estado "de sessão" da Central de Diagnóstico: qual modo está ativo e os
// dados do veículo, compartilhados entre os três modos (texto, foto, dados).
// O histórico de mensagens do modo texto fica em useAssistantChat, que recebe
// vehicleInfo daqui — mantendo cada hook com uma responsabilidade só.
export function useDiagnosticSession() {
  const [mode, setMode] = useState<DiagnosticMode>("select");
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);

  const selectMode = useCallback((next: DiagnosticMode) => setMode(next), []);

  const saveVehicleInfo = useCallback((info: VehicleInfo) => {
    setVehicleInfo(info);
  }, []);

  return { mode, vehicleInfo, selectMode, saveVehicleInfo };
}
