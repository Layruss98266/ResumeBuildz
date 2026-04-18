'use client';

// Company guide page. Migrated from a standalone dark-hero layout onto
// the shared BlogPostLayout so every page under /blog/ carries identical
// chrome (left TOC, author strip, Was-this-helpful row, prev/next,
// Related articles grid). All structured data (hiring focus, keywords,
// tips, interview, pitfalls, cover letter, salary, etc.) survives as
// children blocks; the tier / industry / HQ pills move to a compact
// meta row above the intro section.

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Tag, Briefcase, MapPin, Sparkles, FileText, Lightbulb, Users, AlertTriangle, Quote, Wrench, HelpCircle, Mail, MessageSquare, DollarSign, Share2 } from 'lucide-react';
import BlogPostLayout, { type TocItem, type RelatedItem } from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';
import type { CompanyEntry } from '@/lib/resumeCompanyData';
import { getCompanyExtended } from '@/lib/resumeCompanyDataExtended';
import { getCompanyDeep } from '@/lib/resumeCompanyDataDeep';

interface Props {
  data: CompanyEntry;
  related: CompanyEntry[];
}

export default function CompanyResumeView({ data, related }: Props) {
  const { openGateway } = useLoginGateway();
  const extended = getCompanyExtended(data.slug);
  const deep = getCompanyDeep(data.slug);

  // Dynamic TOC: only include sections that actually render for this company.
  const toc: TocItem[] = [
    { id: 'intro', label: 'What they screen for' },
    { id: 'keywords', label: 'ATS keywords' },
    { id: 'tips', label: 'Insider tips' },
    ...(extended ? [
      { id: 'interview', label: 'Interview process' },
      { id: 'pitfalls', label: 'Common pitfalls' },
      { id: 'sample', label: 'Sample bullet' },
      { id: 'tailor', label: 'How to tailor' },
    ] : []),
    ...(deep ? [
      { id: 'cover-letter', label: 'Cover letter template' },
      { id: 'questions', label: 'Interview questions' },
      { id: 'red-flags', label: 'Red flags' },
      { id: 'salary', label: 'Salary benchmarks' },
      { id: 'referral', label: 'Referral strategy' },
    ] : []),
    { id: 'template', label: 'Recommended template' },
    { id: 'checklist', label: 'Pre-submit checklist' },
    ...(extended ? [{ id: 'faq', label: 'FAQ' }] : []),
  ];

  const readingTime = Math.max(8, Math.round(deep ? 14 : 10));

  // Convert neighbour companies into the RelatedItem shape BlogPostLayout
  // expects. Excerpt is clipped to keep the card grid tidy.
  const relatedItems: RelatedItem[] = related.map((c) => ({
    title: `${c.name} Resume Guide`,
    slug: `blog/company-guides/${c.slug}`,
    excerpt: (c.description || c.industry).slice(0, 120),
    read: 10,
  }));

  return (
    <BlogPostLayout
      category="Company Guide"
      breadcrumbCurrent={data.name}
      title={`${data.name} Resume Guide`}
      subtitle={data.description}
      dateModified="2026-04-15"
      readingTime={readingTime}
      toc={toc}
      related={relatedItems}
    >
      {/* Meta row — tier / industry / HQ pills. Replaces the old dark hero
          strip; sits right above the intro so the reader still sees the
          at-a-glance framing. */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
          <Briefcase className="h-3 w-3" /> {data.industry}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
          <MapPin className="h-3 w-3" /> {data.hq}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
          {data.tier}
        </span>
      </div>

      {/* Intro / hiring focus */}
      <section id="intro" className="scroll-mt-6">
        <div className="flex items-start gap-3">
          <div className="hidden sm:flex h-10 w-10 rounded-xl bg-indigo-50 items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What {data.name} actually screens for</h2>
            <p className="text-gray-700 leading-relaxed">{data.hiringFocus}</p>
          </div>
        </div>
      </section>

      {/* Keywords */}
      <section id="keywords" className="mt-10 scroll-mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">15 ATS keywords for {data.name}</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
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
      <section id="tips" className="mt-10 scroll-mt-6">
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900">{data.resumeTips.length} insider tips for {data.name}</h2>
        </div>
        <ol className="space-y-4">
          {data.resumeTips.map((tip, i) => (
            <li key={i} className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-200 transition">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{tip}</p>
            </li>
          ))}
        </ol>
      </section>

      {extended && (
        <>
          {/* Interview Process */}
          <section id="interview" className="mt-10 scroll-mt-6 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">What the {data.name} interview looks like</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{extended.interviewProcess}</p>
          </section>

          {/* Common Pitfalls */}
          <section id="pitfalls" className="mt-10 scroll-mt-6 bg-red-50 rounded-xl border border-red-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">{extended.commonPitfalls.length} common pitfalls that tank {data.name} resumes</h2>
            </div>
            <ul className="space-y-3">
              {extended.commonPitfalls.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700 text-sm">
                  <span className="flex-shrink-0 text-red-500 font-bold mt-0.5">.</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sample bullet */}
          <section id="sample" className="mt-10 scroll-mt-6 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-5 w-5 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">A sample {data.name}-ready bullet</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Notice the structure: action verb, specific scope, quantified outcome, and clear business value. This is the format {data.name} recruiters look for.
            </p>
            <div className="bg-white rounded-lg p-5 border-l-4 border-indigo-500 shadow-sm">
              <p className="text-gray-800 leading-relaxed font-medium">{extended.sampleBullet}</p>
            </div>
          </section>

          {/* How to tailor */}
          <section id="tailor" className="mt-10 scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to tailor your existing resume for {data.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You probably already have a resume that works for general applications. Here is exactly what to change before applying to {data.name}:
            </p>
            <ol className="space-y-3">
              {extended.howToTailor.map((step, i) => (
                <li key={i} className="flex gap-4 bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {deep && (
        <>
          {/* Cover Letter Template */}
          <section id="cover-letter" className="mt-10 scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cover letter template for {data.name}</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              A 3-paragraph structure tuned for {data.name}&apos;s recruiting style. Copy it, fill in the bracketed placeholders, and edit for voice before sending.
            </p>
            <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
              <div className="bg-gray-900 text-gray-300 px-5 py-2.5 text-xs font-mono flex items-center justify-between">
                <span>Cover Letter . {data.name}</span>
                <span className="text-gray-500">Plain text, 3 paragraphs</span>
              </div>
              <div className="p-5 space-y-3 bg-white">
                {deep.coverLetterTemplate.map((para, i) => (
                  <p key={i} className="text-sm text-gray-800 leading-relaxed">
                    <span className="text-xs font-mono text-gray-400 mr-2">P{i + 1}</span>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Interview Questions */}
          <section id="questions" className="mt-10 scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">{deep.interviewQuestions.length} common {data.name} interview questions</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              These questions show up in {data.name}&apos;s loops more than most. Hints are starting points, not full answers . practice saying each one out loud in 90 seconds.
            </p>
            <ol className="space-y-3">
              {deep.interviewQuestions.map((qa, i) => (
                <li key={i} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2 flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    {qa.q}
                  </p>
                  <p className="text-xs text-gray-600 ml-8">
                    <span className="font-semibold text-indigo-600">Hint:</span> {qa.hint}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Red Flags */}
          <section id="red-flags" className="mt-10 scroll-mt-6 bg-red-50 rounded-xl border border-red-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">{deep.redFlags.length} red flags that auto-reject you at {data.name}</h2>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              These are the fast-rejection triggers {data.name} recruiters have openly discussed. Fix these before you submit.
            </p>
            <ul className="space-y-2">
              {deep.redFlags.map((flag, i) => (
                <li key={i} className="flex gap-3 bg-white rounded-lg p-4 border border-red-100">
                  <span className="flex-shrink-0 text-red-500 font-bold mt-0.5">!</span>
                  <span className="text-sm text-gray-800 leading-relaxed">{flag}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Salary Benchmark */}
          <section id="salary" className="mt-10 scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">{data.name} salary benchmarks</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Estimated total compensation (base + bonus + equity, annualized) by role and seniority. Numbers are public market estimates from Levels.fyi, Glassdoor, AmbitionBox, and Indeed . use them as rough ranges, not exact offers.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 text-xs uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 text-xs uppercase tracking-wide">Junior</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 text-xs uppercase tracking-wide">Mid</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-900 text-xs uppercase tracking-wide">Senior</th>
                  </tr>
                </thead>
                <tbody>
                  {deep.salaryBenchmark.map((row, i) => (
                    <tr key={i} className={i < deep.salaryBenchmark.length - 1 ? 'border-b border-gray-100' : ''}>
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.role}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{row.junior}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{row.mid}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Referral Strategy */}
          <section id="referral" className="mt-10 scroll-mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="h-5 w-5 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">How to get a {data.name} referral</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{deep.referralStrategy}</p>
          </section>
        </>
      )}

      {/* Recommended Template */}
      <section id="template" className="mt-10 scroll-mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold mb-1">Recommended template</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{data.recommendedTemplate}</h3>
            <p className="text-sm text-gray-700 mb-4">
              Of our 20 templates, {data.recommendedTemplate.charAt(0).toUpperCase() + data.recommendedTemplate.slice(1)} matches {data.name}&apos;s screening philosophy best . clean parsing, conservative typography, and section ordering that mirrors how their recruiters skim.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openGateway('/builder')}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
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
      <section id="checklist" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Before you hit submit at {data.name}</h2>
        <ul className="space-y-2">
          {[
            'Run your resume through our free ATS checker.',
            `Confirm at least 6-10 of the ${data.name} keywords above appear naturally in your bullets.`,
            'Quantify every bullet (%, $, users, time saved). No vague responsibilities.',
            'Save as PDF (not DOCX) unless the job posting explicitly asks for Word.',
            'One page if you have less than 10 years experience. Two pages max.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {extended && (
        <section id="faq" className="mt-10 scroll-mt-6">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">{data.name} resume FAQ</h2>
          </div>
          <div className="space-y-3">
            {extended.faqs.map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-lg border border-gray-200 p-4 open:shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 text-sm">
                  <span>{faq.q}</span>
                  <span className="text-indigo-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA — matches the dark CTA pattern in BLOG_POST_TEMPLATE.md */}
      <section className="mt-12 text-center bg-gray-900 text-white rounded-2xl py-10 px-6">
        <Sparkles className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-white mb-3">Build your {data.name}-ready resume in minutes</h2>
        <p className="text-white/70 mb-6 max-w-xl mx-auto text-sm">Free to start. ATS-tested. Tailor the bullets, run the score, and apply with confidence.</p>
        <button
          onClick={() => openGateway('/builder')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition shadow-sm"
        >
          Start my resume <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </BlogPostLayout>
  );
}
