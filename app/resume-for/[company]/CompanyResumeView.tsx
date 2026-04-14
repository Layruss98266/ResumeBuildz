'use client';

import Link from 'next/link';
import { ArrowRight, ChevronLeft, CheckCircle2, Tag, Briefcase, MapPin, Sparkles, FileText, Lightbulb } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';
import type { CompanyEntry } from '@/lib/resumeCompanyData';

interface Props {
  data: CompanyEntry;
  related: CompanyEntry[];
}

export default function CompanyResumeView({ data, related }: Props) {
  const { openGateway } = useLoginGateway();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resume-for"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition"
          >
            <ChevronLeft className="h-4 w-4" /> All company guides
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/15 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Briefcase className="h-3 w-3" /> {data.industry}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3" /> {data.hq}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full">
              {data.tier}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            {data.name} Resume Guide
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl animate-fade-in-up delay-100">
            {data.description}
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="flex-1 bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Hiring Focus */}
          <section>
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 rounded-xl bg-blue-50 items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">What {data.name} actually screens for</h2>
                <p className="text-gray-700 leading-relaxed">{data.hiringFocus}</p>
              </div>
            </div>
          </section>

          {/* Keywords */}
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">15 ATS keywords for {data.name}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Use these inside your bullet points and skills section, not stuffed in a hidden block. Aim for natural integration in 6-10 of these terms across your resume.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-block bg-white border border-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-lg font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>

          {/* Resume Tips */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{data.resumeTips.length} insider tips for {data.name}</h2>
            </div>
            <ol className="space-y-5">
              {data.resumeTips.map((tip, i) => (
                <li key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-200 transition">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Recommended Template */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold mb-1">Recommended template</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{data.recommendedTemplate}</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Of our 20 templates, {data.recommendedTemplate.charAt(0).toUpperCase() + data.recommendedTemplate.slice(1)} matches {data.name}&apos;s screening philosophy best — clean parsing, conservative typography, and section ordering that mirrors how their recruiters skim.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openGateway('/builder')}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Use this template <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href="/templates"
                    className="inline-flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition border border-gray-200"
                  >
                    Browse all 20
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Checklist */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">Before you hit submit at {data.name}</h2>
            <ul className="space-y-3">
              {[
                'Run your resume through our free ATS checker.',
                `Confirm at least 6-10 of the ${data.name} keywords above appear naturally in your bullets.`,
                'Quantify every bullet (%, $, users, time saved). No vague responsibilities.',
                'Save as PDF (not DOCX) unless the job posting explicitly asks for Word.',
                'One page if you have less than 10 years experience. Two pages max.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Internal Links */}
          <section className="border-t border-gray-100 pt-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/resume-for/${c.slug}`}
                  className="flex items-center justify-between bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg px-4 py-3 transition group"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.industry}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
              <Link href="/ats-guide" className="text-blue-600 hover:underline">→ Complete ATS Guide</Link>
              <Link href="/resume-tips" className="text-blue-600 hover:underline">→ Resume tips that work</Link>
              <Link href="/templates" className="text-blue-600 hover:underline">→ All 20 templates</Link>
            </div>
          </section>
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Build your {data.name}-ready resume in minutes</h2>
          <p className="text-blue-100 mb-6">
            Free to start. ATS-tested. Tailor the bullets, run the score, and apply with confidence.
          </p>
          <button
            onClick={() => openGateway('/builder')}
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
          >
            Start My Resume <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
