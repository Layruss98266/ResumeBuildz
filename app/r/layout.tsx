import type { Metadata } from 'next';

// Shared resume pages are user-specific and should never be indexed.
// The actual resume data lives in the URL fragment, so this metadata
// is just a title placeholder for tab/browser history.
export const metadata: Metadata = {
  title: 'Shared Resume - ResumeBuildz',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
