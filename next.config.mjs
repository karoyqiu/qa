const DEV = process.env.NODE_ENV !== 'production';

const cspHeader = `
  default-src 'self';
  base-uri 'self';
  script-src 'self' ${DEV ? `'unsafe-inline' 'unsafe-eval'` : ''};
  object-src 'none';
  frame-ancestors 'none';
  ${DEV ? '' : 'upgrade-insecure-requests;'}
`
  .replace(/\s{2,}/g, ' ')
  .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  output: 'standalone',
  poweredByHeader: false,
  compiler: {
    reactRemoveProperties: !DEV,
    removeConsole: !DEV && {
      exclude: ['error'],
    },
  },
  experimental: {
    optimizePackageImports: ['radash'],
  },
  headers: () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader,
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
};

export default nextConfig;
