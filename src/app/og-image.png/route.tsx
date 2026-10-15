import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";

// Imagem de compartilhamento (Open Graph / WhatsApp / Facebook / X),
// 1200 × 630, gerada no build com a logo oficial e as cores da marca.
// Publicada em /og-image.png.
export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const logo = await readFile(path.join(process.cwd(), "public", "logos", "jrfilm-logo-dark-bg.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const serviceLine = services
    .slice(0, 6)
    .map((s) => s.title)
    .join("  ·  ");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: siteConfig.colors.background,
        padding: "72px 80px",
        color: siteConfig.colors.foreground,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse só aceita <img> */}
        <img src={logoSrc} width={538} height={100} alt="" />
        <div style={{ marginTop: 28, width: 120, height: 6, background: siteConfig.colors.accent }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
          Oficina mecânica e acessórios
        </div>
        <div style={{ marginTop: 12, fontSize: 40, color: "#C8C8C8" }}>
          {`${siteConfig.city} / ${siteConfig.state}`}
        </div>
        <div style={{ marginTop: 36, fontSize: 26, color: "#9A9A9A" }}>{serviceLine}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
