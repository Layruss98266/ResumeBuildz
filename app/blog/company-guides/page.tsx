import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import { COMPANIES } from '@/lib/resumeCompanyData';
import Content from './Content';

const title = '22 Company-Specific Resume Guides (Google, Amazon, TCS + more)';
const description = 'Resume guides for 22 top employers. ATS keywords, insider tips, interview questions, salary benchmarks, and cover letter templates per company.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/blog/company-guides') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/blog/company-guides'),
  },
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '22 Company-Specific Resume Guides',
  description,
  url: absoluteUrl('/blog/company-guides'),
  hasPart: {
    '@type': 'ItemList',
    numberOfItems: COMPANIES.length,
    itemListElement: COMPANIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.name} Resume Guide`,
      url: absoluteUrl(`/blog/company-guides/${c.slug}`),
    })),
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
