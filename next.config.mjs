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

const ppDirectives = [
  'accelerometer',
  'ambient-light-sensor',
  'attribution-reporting',
  'autoplay',
  'battery',
  'bluetooth',
  'browsing-topics',
  'camera',
  'compute-pressure',
  'display-capture',
  'domain-agent',
  'document-domain',
  'encrypted-media',
  'execution-while-not-rendered',
  'execution-while-out-of-viewport',
  'fullscreen',
  'gamepad',
  'geolocation',
  'gyroscope',
  'hid',
  'identity-credentials-get',
  'idle-detection',
  'local-fonts',
  'magnetometer',
  'microphone',
  'midi',
  'otp-credentials',
  'payment',
  'picture-in-picture',
  'publickey-credentials-create',
  'publickey-credentials-get',
  'screen-wake-lock',
  'serial',
  'speaker-selection',
  'storage-access',
  'usb',
  'web-share',
  'window-management',
  'xr-spatial-tracking',
];

const ppHeader = ppDirectives.map((d) => `${d}=()`).join();

const extraHeaders = [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: cspHeader,
      },
      {
        key: 'Permissions-Policy',
        value: ppHeader,
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1;mode=block',
      },
    ],
  },
];

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
  headers: () => extraHeaders,
};

export default nextConfig;
