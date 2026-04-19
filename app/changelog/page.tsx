import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Changelog — What Shipped in ResumeBuildz';
const description = 'Release notes for every ResumeBuildz version. New features, fixes, SEO improvements, and performance wins, organised by release date.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/changelog') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/changelog'),
  },
};

export default function Page() {
  return <Content />;
}
