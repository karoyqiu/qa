/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  output: 'standalone',
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['radash'],
  },
};

export default nextConfig;
