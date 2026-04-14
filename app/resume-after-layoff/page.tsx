'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle, Heart, Target, Sparkles } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';

const DOS = [
  'Treat the layoff as a business event, not a personal failure. The resume is not the place to explain it; the cover letter is.',
  'Use the company\'s public layoff announcement date as the end date. "Mar 2024 — Sep 2025 (laid off as part of company-wide reorg)" is fine, optional, and removes ambiguity.',
  'Lead with your most recent measurable wins. Hiring managers respond to evidence, not narrative.',
  'Keep titles, dates, and tenures honest. Background checks now flag inflated dates within seconds.',
  'Update your LinkedIn the same day you update your resume. Recruiters cross-check both.',
  'List any severance-period upskilling: courses, certifications, freelance gigs, open source contributions.',
];

const DONTS = [
  'Don\'t use the word "fired," "let go," or "released." Use "position eliminated," "company restructure," or simply leave it out.',
  'Don\'t include negative language about the former employer. Even subtle bitterness leaks through and recruiters notice.',
  'Don\'t leave a gap explanation in the bullet points. Bullets are for accomplishments. Move context to your summary or cover letter.',
  'Don\'t apologise. The resume is a sales document; the apology in your tone will lose interviews.',
  'Don\'t hide the gap with creative date formatting. Modern ATS parses dates strictly and "Present" with no end date triggers manual review.',
];

const STEPS = [
  {
    title: 'Step 1: Take 48 hours, then start',
    body: 'Layoffs trigger a real grief response. Most people who try to job hunt within 24 hours produce weak resumes. Take two days, talk to one trusted person, then come back to the document with a clear head.',
  },
  {
    title: 'Step 2: Build a "wins log" first',
    body: 'Before touching the resume, open a blank document and brain-dump every project, metric, recognition, and outcome from the last 18 months. You will use 30% of it but the act of writing it down rebuilds confidence and surfaces buried wins.',
  },
  {
    title: 'Step 3: Pick a forward-looking summary',
    body: 'Your professional summary should describe what you do and what you want next, not what just happened. Example: "Senior product manager with 8 years scaling B2B SaaS from seed to Series C. Now seeking a 0-to-1 product role at an early-stage startup."',
  },
  {
    title: 'Step 4: Quantify the last 12 months hard',
    body: 'Recruiters read recent experience first. The last 12 months should be your strongest, most quantified bullets. Earlier years can compress.',
  },
  {
    title: 'Step 5: Run the resume through an ATS check',
    body: 'Layoffs from large companies trigger automated re-applications. Every resume goes through an ATS. Use our free ATS checker before you apply anywhere.',
  },
];

export default function ResumeAfterLayoffPage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Resume After Layoff 2026 - 5-Step Guide & Templates | ResumeForge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'How to write a resume after a layoff. 5-step recovery framework, what to say (and what not to say), real bullet examples, and ATS-friendly templates. Updated for 2026.'
      );
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'How to write a resume after a layoff. 5-step recovery framework, what to say, what not to say, real bullet examples, ATS-friendly templates.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Resume After Layoff 2026 - 5-Step Guide & Templates | ResumeForge');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <Heart className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" /> Career Recovery
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Resume After a Layoff: A 5-Step Guide for 2026
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            More than 250,000 tech workers were laid off in 2024 and another 100,000+ in early 2025. Here is exactly how to write a resume that gets interviews after a layoff, with no apologetic tone and no awkward gaps.
          </p>
        </div>
      </section>

      {/* Intro */}
      <main className="flex-1 bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              A layoff is not a performance issue. According to the US Bureau of Labor Statistics, roughly 20 million workers experience involuntary separation each year, and the majority find new roles within 4 months. The candidates who land fastest share three traits: a quantified, forward-looking resume; a calm, factual cover letter; and an updated LinkedIn that matches both.
            </p>
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">The 5-Step Recovery Framework</h2>
            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Do/Don't */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-green-800 mb-4">
                <CheckCircle2 className="h-5 w-5" /> Do
              </h3>
              <ul className="space-y-3">
                {DOS.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="flex items-center gap-2 text-lg font-bold text-red-800 mb-4">
                <AlertCircle className="h-5 w-5" /> Don&apos;t
              </h3>
              <ul className="space-y-3">
                {DONTS.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-red-600 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Example bullets */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Example bullets that work after a layoff</h2>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Notice how each one leads with action and ends with a number. None of them mention the layoff itself.
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="bg-white rounded-lg p-3 border border-gray-100">
                <span className="font-semibold text-gray-900">Software Engineer:</span> Reduced API latency by 62% (from 480ms p95 to 180ms p95) by introducing read replicas and an in-memory cache layer, saving the team an estimated $14k/month in infra costs.
              </li>
              <li className="bg-white rounded-lg p-3 border border-gray-100">
                <span className="font-semibold text-gray-900">Product Manager:</span> Shipped 9 features over 12 months that lifted weekly active users from 41k to 87k (+112%) and grew paid conversion 1.4% to 3.1%.
              </li>
              <li className="bg-white rounded-lg p-3 border border-gray-100">
                <span className="font-semibold text-gray-900">Marketing Manager:</span> Built and ran a 6-channel demand generation engine that delivered 4,200 SQLs and $1.8M in pipeline at a blended CAC of $430.
              </li>
            </ul>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build your post-layoff resume in 30 minutes</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Free to start. 20 ATS-tested templates. Built-in score checker so you know it&apos;s clean before you submit.
            </p>
            <button
              onClick={() => openGateway('/builder')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition"
            >
              Start My Resume <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          {/* Internal links */}
          <section className="border-t border-gray-100 pt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Related guides</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link href="/resume-after-career-gap" className="text-blue-600 hover:underline">→ Resume after a career gap</Link>
              <Link href="/resume-for-career-change" className="text-blue-600 hover:underline">→ Resume for career change</Link>
              <Link href="/ats-guide" className="text-blue-600 hover:underline">→ Complete ATS guide</Link>
              <Link href="/resume-tips" className="text-blue-600 hover:underline">→ Resume tips that work</Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
