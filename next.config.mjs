/** @type {import('next').NextConfig} */

// Cabeçalhos de segurança aplicados a todas as respostas. HTTPS/HSTS já é
// tratado pela Vercel. Uma Content-Security-Policy completa não foi ativada
// porque o site usa scripts inline do Next.js e serviços do Google; se for
// adotada no futuro, teste em uma prévia antes de ir para produção.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    // Preparado para futuramente servir imagens de um CDN/CMS externo
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // URLs antigas/alternativas → atuais (301 permanente). A seção de
    // depoimentos passou a se chamar "avaliações" na Home (âncora, sem redirect).
    return [
      { source: "/servico/:slug", destination: "/servicos/:slug", permanent: true },
      { source: "/promocao", destination: "/promocoes", permanent: true },
      { source: "/privacy", destination: "/privacidade", permanent: true },
      { source: "/politica-de-privacidade", destination: "/privacidade", permanent: true },
    ];
  },
};

export default nextConfig;
