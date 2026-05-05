import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Reset Password | ResumeBuildz',
  description: 'Reset your ResumeBuildz password.',
  alternates: { canonical: absoluteUrl('/forgot-password') },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
