/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isso desativa o uso de múltiplos processos no build
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  // Desativa verificação de tipos e lint no build (economiza muita RAM)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
