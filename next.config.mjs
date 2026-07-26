/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Preparado para futuramente servir imagens de um CDN/CMS externo
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
