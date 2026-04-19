import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';
import Content from './Content';

const title = 'FAQ — ResumeBuildz Common Questions';
const description = '26 answered questions: pricing, privacy, ATS templates, AI features, keyboard shortcuts, mobile PWA, data portability, and more.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/faq') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/faq'),
  },
};

// FAQPage schema already lives inside Content.tsx; preserved there because it
// auto-generates from the full 26-item array.
export default function Page() {
  return <Content />;
}
