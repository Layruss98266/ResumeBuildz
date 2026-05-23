import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Internal preview tools + auth-only flows — no public SEO value.
      // Auth pages (/login, /forgot-password) deliberately excluded from
      // indexing so they don't outrank product/marketing pages on brand queries.
      // Blog filter query URLs canonicalize back to /blog, so block crawling
      // of the parameterized duplicates directly in robots.
      disallow: ['/loader-preview', '/hero-preview', '/r', '/r/*', '/login', '/forgot-password', '/reset-password', '/account', '/auth', '/auth/*', '/blog?cat='],
    },
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
