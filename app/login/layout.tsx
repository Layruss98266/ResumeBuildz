import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Log In | ResumeBuildz',
  description: 'Log in to ResumeBuildz to access saved resumes, synced settings, and Pro features.',
  alternates: { canonical: absoluteUrl('/login') },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
