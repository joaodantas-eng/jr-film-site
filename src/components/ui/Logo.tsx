import Image from "next/image";
import { siteConfig } from "@/data/site";

interface LogoProps {
  variant?: "dark-bg" | "light-bg";
  className?: string;
  height?: number;
}

// Logo oficial da JR Film. O site inteiro usa fundo escuro, então "dark-bg" é o padrão
// (texto branco + vermelho). A variante "light-bg" (texto preto + vermelho) fica pronta
// para uso futuro em contextos claros — impressos, e-mail, favicon, painel administrativo.
export function Logo({ variant = "dark-bg", className, height = 28 }: LogoProps) {
  const src = variant === "dark-bg" ? "/logos/jrfilm-logo-dark-bg.png" : "/logos/jrfilm-logo-light-bg.png";
  // proporção real do arquivo (2766x514)
  const width = Math.round((height * 2766) / 514);

  return (
    <Image
      src={src}
      alt={siteConfig.legalName}
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
