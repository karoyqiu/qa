const DEV = process.env.NODE_ENV !== 'production';

const cspHeader = `
  default-src 'self';
  base-uri 'self';
  script-src 'self' 'unsafe-inline' ${DEV ? `'unsafe-eval'` : ''};
  img-src 'self' data:;
  object-src 'none';
  form-action 'self';
  frame-ancestors 'none';
  ${DEV ? '' : 'upgrade-insecure-requests;'}
  sandbox allow-forms allow-same-origin allow-scripts allow-top-navigation-by-user-activation;
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
