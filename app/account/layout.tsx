import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Account Settings | ResumeBuildz',
  description: 'Manage your ResumeBuildz account settings, profile, and billing.',
  alternates: { canonical: absoluteUrl('/account') },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
