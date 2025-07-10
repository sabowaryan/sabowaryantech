/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    // Optimisations pour React 19
    reactCompiler: false,
  },
};

module.exports = nextConfig;
