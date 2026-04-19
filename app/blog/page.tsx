import type { Metadata } from 'next';
import { jsonLd } from '@/lib/articleSchema';
import { absoluteUrl } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Resume & ATS Blog — Practical Guides for 2026';
const description = 'Long-form guides on resumes, ATS, job search, and AI tools. 29+ posts covering writing, keywords, interviews, India hiring, and career transitions.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/blog'),
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'ResumeBuildz Blog',
  url: absoluteUrl('/blog'),
  description,
  publisher: { '@type': 'Organization', name: 'ResumeBuildz', url: absoluteUrl('/') },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(blogSchema) }} />
      <Content />
    </>
  );
}
