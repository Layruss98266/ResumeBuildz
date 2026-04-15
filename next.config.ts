import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Image optimization is disabled because the bulk of images in this app
    // are user-controlled resume content rendered in the print preview, where
    // Vercel's image optimizer cannot help (it would re-encode and lose pixel
    // accuracy). Template thumbnails on the homepage are also small and
    // already pre-optimized PNGs. Resume templates use plain <img>; the
    // `@next/next/no-img-element` rule is silenced for them in eslint.config.mjs.
    unoptimized: true,
  },
  // Note: Next.js 16 removed the `eslint` config option entirely. ESLint is
  // now run separately via `npm run lint` (or in CI) and via the editor
  // integration. Build-time lint enforcement happens at the CI layer
  // (.github/workflows/ci.yml) rather than here.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
