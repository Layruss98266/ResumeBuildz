import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import Content from './Content';

const title = '20 ATS Resume Templates — Every One Passes 12 ATS Checks';
const description = '20 resume templates tested against Workday, Greenhouse, Lever, iCIMS. Chronological + hybrid formats. Free to start, no sign-up needed.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/templates') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/templates'),
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Resume Templates',
  description,
  url: absoluteUrl('/templates'),
  hasPart: {
    '@type': 'ItemList',
    numberOfItems: 20,
    name: 'ResumeBuildz Templates',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema) }} />
      <Content />
    </>
  );
}
