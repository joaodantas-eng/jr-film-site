"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Camera, ClipboardList } from "lucide-react";
import { useDiagnosticSession } from "@/hooks/useDiagnosticSession";
import { EntryModeCard } from "./EntryModeCard";
import { ModeSwitcher } from "./ModeSwitcher";
import { PhotoUploader } from "./PhotoUploader";
import { VehicleForm } from "./VehicleForm";
import { ChatWindow } from "@/components/assistant/ChatWindow";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";

// Orquestrador da Central de Diagnóstico Automotivo. Tela inicial com os 3
// modos de entrada; depois de escolhido um, o ModeSwitcher permite trocar
// livremente entre eles — os dados do veículo ficam disponíveis nos três.
export function DiagnosticCenter() {
  const { mode, vehicleInfo, selectMode, saveVehicleInfo } = useDiagnosticSession();

  if (mode === "select") {
    return (
      <StaggerGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StaggerItem>
          <EntryModeCard
            icon={MessageSquareText}
            title="Descrever o problema"
            message="Explique com suas palavras o que está acontecendo."
            buttonLabel="Começar"
            onSelect={() => selectMode("text")}
          />
        </StaggerItem>
        <StaggerItem>
          <EntryModeCard
            icon={Camera}
            title="Enviar uma foto"
            message="Envie uma foto do painel, do pneu, de um vazamento ou de qualquer outra parte do veículo."
            buttonLabel="Enviar foto"
            onSelect={() => selectMode("photo")}
          />
        </StaggerItem>
        <StaggerItem>
          <EntryModeCard
            icon={ClipboardList}
            title="Informar dados do veículo"
            message="Informe marca, modelo, ano e motorização para receber orientações mais precisas."
            buttonLabel="Preencher dados"
            onSelect={() => selectMode("vehicle")}
          />
        </StaggerItem>
      </StaggerGroup>
    );
  }

  return (
    <div className="space-y-6">
      <ModeSwitcher mode={mode} onChange={selectMode} vehicleInfoSet={Boolean(vehicleInfo?.brand)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {mode === "text" && <ChatWindow vehicleInfo={vehicleInfo} />}
          {mode === "photo" && <PhotoUploader />}
          {mode === "vehicle" && <VehicleForm initialValue={vehicleInfo} onSave={saveVehicleInfo} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
