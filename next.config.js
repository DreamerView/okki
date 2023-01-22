/*jshint esversion: 8 */
/** @type {import('next').NextConfig} */

const key_pass = "4piP7FKREnYA+S0CcxJe360Aph9zQN5AWr1xuxjSP+o=";

const production = process.env.NODE_ENV === 'production';

const authHeader = "ff0989d59ef16505f30f2da7dd36dc61be936a9a81df67bf4c035cf95c5fd21e46b40ce6ba7d88c86ae4f82539096b925e9f9dac7738db83b4e8bcee70cc5d94";

const src = 'https://cdnjs.cloudflare.com';
const backend = production?"https://app.okki.kz":"http://localhost:3001";
const images = production?"app.okki.kz":"localhost";
const host = production?"https://okki.vercel.app":"http://localhost:3000";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  runtimeCaching: [
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'okki-network',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
    // { 
    //   urlPattern: /\/api\/.*$/i, 
    //   handler: 'NetworkFirst', 
    //   method: 'GET', 
    //   options: { 
    //     cacheName: 'apis', 
    //     expiration: { 
    //       maxEntries: 16, 
    //       maxAgeSeconds: 24 * 60 * 60 // 24 hours 
    //     }, 
    //     networkTimeoutSeconds: 10 // fall back to cache if api does not response within 10 seconds 
    //   } 
    // }, 
    // { 
    //   urlPattern: /\/api\/.*$/i, 
    //   handler: 'NetworkFirst', 
    //   method: 'POST', 
    //   options: { 
    //     cacheName: 'apis', 
    //     expiration: { 
    //       maxEntries: 16, 
    //       maxAgeSeconds: 24 * 60 * 60 // 24 hours 
    //     }, 
    //     networkTimeoutSeconds: 10 // fall back to cache if api does not response within 10 seconds 
    //   } 
    // }, 
  ],
  skipWaiting: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
});

const ContentSecurityPolicy = `
    script-src 'report-sample' 'self' 'nonce-${key_pass}'; 
    script-src-elem 'self' 'nonce-${key_pass}'; 
    script-src-attr 'self';
    style-src 'self' 'report-sample'; 
    style-src-elem  'self'  'unsafe-inline'; 
    style-src-attr 'self' 'unsafe-inline'; 
    connect-src 'self' https://cdnjs.cloudflare.com https://app.okki.kz wss://app.okki.kz http://localhost:3001;
    base-uri 'none';
    form-action 'self';
    object-src 'none'; 
    child-src 'none';
    frame-src 'self';
    img-src 'self' data: blob:;
    manifest-src 'self';
    prefetch-src 'self';
    worker-src 'self';
    font-src 'self';  
    default-src 'self';
    media-src 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;
`;

const secure = production?[
      {
        key: 'Link',
        value: `<${backend}>; rel=preconnect`
    },
    {
      key: 'Link',
      value: `<${backend}>; rel=prerender`
  },
  {
    key: 'Link',
    value: `<${backend}>; rel=dns-prefetch`
  },
  {
    key: 'WWW-Authenticate',
    value: `${authHeader}`
  },
  {
    key: 'Origin',
    value: `${host}`
  },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
  },
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
    },
    {
        key: 'Permissions-Policy',
        value: 'microphone=(), geolocation=()'
    },
    {
        key: 'X-Permitted-Cross-Domain-Policies',
        value: 'none'
    },
    {
        key: 'Cross-Origin-Opener-Policy',
        value: "same-origin"
    },
    {
        key: 'Cross-Origin-Resource-Policy',
        value: "same-site"
    },
    {
        key: 'Cross-Origin-Embedder-Policy',
        value: "require-corp"
    },
    {
        key:"Content-Security-Policy",
        value:ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
    }
    ]:[{
      key: 'Link',
      value: `<${backend}>; rel=preconnect`
    },{
      key: 'Link',
      value: `<${backend}>; rel=prerender`
    },
    {
      key: 'Link',
      value: `<${backend}>; rel=dns-prefetch`
    },
    {
      key: 'WWW-Authenticate',
      value: `${authHeader}`
    },
    {
      key: 'Origin',
      value: `${host}`
    },
    {
      key: 'Permissions-Policy',
      value: 'microphone=(), geolocation=()'
    },
    {
        key: 'Cache-Control',
        value: 'no-cache, no-store, max-age=0, must-revalidate'
    }
];
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withPWA({
  swcMinify: true,
  images: {
    domains: [images,'lh3.googleusercontent.com','sun9-79.userapi.com'],
    formats: ['image/avif', 'image/webp']
  },
  poweredByHeader: false,
  env: {
    authorName:"Okki.kz",
    siteName: 'okki.kz',
    hostName: 'https://okki.kz',
    private: key_pass,
    backend:backend,
    aesKey:"fd9b84f326e766ea7676c239f48e31b14ea01e9b0124290834637d520818d815",
    authHeader: authHeader,
    host:host,
    production:production
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'kk'],
    defaultLocale: 'en'
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: secure
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:all*(svg|jpg|png|webp|ico)',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=604800, must-revalidate',
  //         }
  //       ],
  //     },
  //   ]
  // },
});