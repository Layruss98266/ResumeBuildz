import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl, SITE_URL } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Pricing: Free Forever, Pro When You Are Serious';
const description = 'Free forever plan + Pro for unlimited AI rewrites + PDF exports. Lifetime + Coach tiers available. Transparent pricing, no auto-renew tricks.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/pricing') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/pricing'),
  },
};

const offerCatalog = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ResumeBuildz',
  description: 'ATS-friendly resume builder with live ATS scoring and AI rewrites.',
  url: absoluteUrl('/pricing'),
  brand: { '@type': 'Brand', name: 'ResumeBuildz' },
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', url: absoluteUrl('/pricing'), availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Pro (monthly)', price: '9', priceCurrency: 'USD', url: absoluteUrl('/pricing'), availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Lifetime', price: '49', priceCurrency: 'USD', url: absoluteUrl('/pricing'), availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Coach', price: '29', priceCurrency: 'USD', url: absoluteUrl('/pricing'), availability: 'https://schema.org/InStock' },
  ],
  publisher: { '@type': 'Organization', name: 'ResumeBuildz', url: SITE_URL },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(offerCatalog) }} />
      <Content />
    </>
  );
}
