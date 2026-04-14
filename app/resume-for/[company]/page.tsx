import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompanyBySlug, COMPANIES } from '@/lib/resumeCompanyData';
import CompanyResumeView from './CompanyResumeView';

// Generate one static page per company at build time.
export function generateStaticParams() {
  return COMPANIES.map((c) => ({ company: c.slug }));
}

interface PageProps {
  params: Promise<{ company: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company } = await params;
  const data = getCompanyBySlug(company);
  if (!data) {
    return {
      title: 'Company guide not found - ResumeForge',
      description: 'The requested company resume guide could not be found.',
    };
  }
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://resume-forge-orcin.vercel.app/resume-for/${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: 'article',
    },
  };
}

export default async function CompanyResumePage({ params }: PageProps) {
  const { company } = await params;
  const data = getCompanyBySlug(company);

  if (!data) {
    notFound();
  }

  // Find related companies in the same tier for cross-linking
  const related = COMPANIES.filter((c) => c.tier === data.tier && c.slug !== data.slug).slice(0, 4);

  return <CompanyResumeView data={data} related={related} />;
}
