import type { Config } from "tailwindcss";

// Tokens visuais da JR Film. Preto como base, vermelho só em pontos de
// conversão e indicadores, branco/neutros para texto e superfícies.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "message-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-photo": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
        "hero-text": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dot-pulse": {
          "0%, 80%, 100%": { opacity: "0.25", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "message-in": "message-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-photo": "hero-photo 0.9s cubic-bezier(0.65, 0, 0.35, 1) 0.15s both",
        "hero-text": "hero-text 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "dot-pulse": "dot-pulse 1.2s ease-in-out infinite",
      },
      colors: {
        // Camadas de preto/grafite para criar profundidade.
        background: "#000000",
        surface: "#0F1011",
        "surface-elevated": "#17191B",
        border: "#26292C",
        "border-strong": "#3A3E42",
        foreground: "#F3F3F1",
        // Contraste ≥ 4.5:1 sobre background, surface e surface-elevated.
        muted: "#A2A6AA",
        // Seção clara (contraste editorial com as áreas escuras).
        paper: {
          DEFAULT: "#EDEEEF",
          raised: "#FFFFFF",
          line: "#D3D6D9",
          ink: "#0B0C0D",
          muted: "#4E5358",
        },
        accent: {
          // Vermelho da marca, próximo do vermelho da logo (texto branco: 4.9:1).
          DEFAULT: "#E10600",
          hover: "#B80500",
          dark: "#5C0300",
          // Vermelho para TEXTO pequeno sobre fundo escuro (≥ 4.5:1).
          fg: "#FF5A50",
          // Vermelho para texto sobre a seção clara (≥ 4.5:1).
          ink: "#B80500",
        },
      },
      fontFamily: {
        // Uma única família (Archivo, variável): larga e pesada nos títulos,
        // largura normal no texto corrido.
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala tipográfica (razão ~1.25) com entrelinha definida por tamanho.
        "display-xl": ["clamp(2.5rem, 5.4vw, 4.6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.85rem, 3.1vw, 2.75rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 2.6vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        // Raios pequenos e consistentes: botões 6px, cards 10px, painéis 14px.
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.625rem",
        "3xl": "0.875rem",
      },
      maxWidth: {
        container: "1240px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset",
        lift: "0 24px 48px -24px rgba(0,0,0,0.8)",
        paper: "0 1px 2px rgba(11,12,13,0.06), 0 12px 32px -16px rgba(11,12,13,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
