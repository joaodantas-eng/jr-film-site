import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(150%) skewX(-20deg)" },
        },
      },
      animation: {
        shine: "shine 1.1s ease-in-out",
      },
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        "surface-elevated": "#1C1C1C",
        foreground: "#F5F5F4",
        muted: "#8A8A8A",
        border: "#242424",
        accent: {
          DEFAULT: "#DC2626",
          hover: "#EF4444",
          dark: "#7F1D1D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
