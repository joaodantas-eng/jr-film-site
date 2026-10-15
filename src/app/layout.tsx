import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { robotsMetadata, seoDefaults } from "@/config/seo";
import { buildBusinessJsonLd, buildWebsiteJsonLd } from "@/config/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";

// next/font hospeda a fonte junto do site (sem requisição ao Google no
// navegador do visitante) e evita mudança de layout no carregamento.
// Archivo variável com o eixo de largura (wdth): títulos largos, texto normal.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: seoDefaults.defaultDescription,
  applicationName: siteConfig.name,
  robots: robotsMetadata,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [{ url: seoDefaults.ogImage, width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [seoDefaults.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.background,
  colorScheme: "dark",
  // viewport-fit=cover permite usar as áreas seguras (env(safe-area-inset-*)) no iPhone.
  viewportFit: "cover",
  // No Android, o teclado redimensiona a página em vez de cobrir o campo do chat.
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body className="font-body">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <JsonLd data={buildBusinessJsonLd()} />
        <JsonLd data={buildWebsiteJsonLd()} />
        <MotionProvider>{children}</MotionProvider>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
