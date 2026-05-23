import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Set a New Password | ResumeBuildz',
  description: 'Choose a new password for your ResumeBuildz account.',
  alternates: { canonical: absoluteUrl('/reset-password') },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
