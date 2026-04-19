import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';
import Content from './Content';

const title = 'Privacy Policy — ResumeBuildz';
const description = 'How ResumeBuildz handles your data. localStorage-first storage, no third-party tracking, open-source code, GDPR-compliant account deletion.';

export const metadata: Metadata = {
  title: `${title} | ResumeBuildz`,
  description,
  alternates: { canonical: absoluteUrl('/privacy') },
  openGraph: {
    title: `${title} | ResumeBuildz`,
    description,
    type: 'website',
    url: absoluteUrl('/privacy'),
  },
};

export default function Page() {
  return <Content />;
}
