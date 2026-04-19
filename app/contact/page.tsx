import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl, SITE_URL } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Contact ResumeBuildz — Bugs, Ideas, Partnerships';
const description = 'Report a bug, suggest a feature, or reach the ResumeBuildz team. We read every message and reply to anything that is not a pitch.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/contact'),
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ResumeBuildz',
  url: absoluteUrl('/contact'),
  description,
  mainEntity: {
    '@type': 'Organization',
    name: 'ResumeBuildz',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer support',
      availableLanguage: ['English'],
    },
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(contactSchema) }} />
      <Content />
    </>
  );
}
