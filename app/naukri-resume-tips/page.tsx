'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, CheckCircle2, Sparkles, Tag, Eye } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';

const TIPS = [
  {
    title: '1. Use a Naukri-friendly resume headline',
    body: 'Naukri displays your headline above your resume in every recruiter search. Use 100-120 characters with your role, years of experience, and 2-3 top skills. Example: "Senior Java Backend Engineer | 6 years | Spring Boot, Microservices, AWS, Kafka, Bangalore."',
  },
  {
    title: '2. Fill the "Key Skills" section completely',
    body: 'Naukri allows up to 50 key skills. Recruiters search by exact skill match. List every framework, language, tool, and platform you have used. Be honest — you will be asked about each in screening calls.',
  },
  {
    title: '3. Optimise the "Profile Summary"',
    body: 'Write a 4-6 line summary that names your role, total experience, primary tech/domain, biggest 1-2 wins, and what you want next. This is the first thing a recruiter reads after the headline.',
  },
  {
    title: '4. Update preferred location and notice period accurately',
    body: 'These are the two filters every recruiter uses. Bangalore + immediate joiner profiles get 3x more views than the same profile with "Negotiable" notice. Update the day your situation changes.',
  },
  {
    title: '5. Mark "Active" status weekly',
    body: 'Naukri ranks "Active in last 7 days" profiles much higher in recruiter searches. Even a quick login bumps you. Profiles that have not logged in for 30+ days drop off most search results entirely.',
  },
  {
    title: '6. Add salary expectations honestly',
    body: 'Recruiters filter by CTC range. Quoting too high removes you from junior shortlists; too low removes you from senior ones. List a 15-20% range above current CTC for laterals.',
  },
  {
    title: '7. Upload a clean, ATS-friendly PDF',
    body: 'Naukri\'s parser converts your uploaded resume into structured fields. Avoid columns, tables, headers/footers, graphics. Use a simple single-column template — Naukri parses these almost perfectly.',
  },
  {
    title: '8. Add 5+ project entries with tech stack',
    body: 'Naukri\'s "Projects" section is searchable. Each entry should have project name, tech used, your role, and one outcome. This dramatically increases visibility for niche skill searches.',
  },
];

export default function NaukriResumeTipsPage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Naukri.com Resume Tips 2026 - Get 3x More Recruiter Views | ResumeForge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        '8 Naukri.com resume tips that get you 3x more recruiter views. Headline tricks, key skills optimisation, ATS-friendly formats. Updated for 2026.'
      );
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        '8 Naukri.com resume tips that get 3x more recruiter views. Headline tricks, key skills, ATS-friendly formats.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Naukri.com Resume Tips 2026 - Get 3x More Recruiter Views | ResumeForge');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <Search className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" /> Naukri.com Optimisation
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            8 Naukri.com Resume Tips That 3x Recruiter Views
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Naukri.com is India&apos;s largest job portal with over 90 million registered candidates and 350,000+ recruiters. Here is how to make your profile and resume stand out in the recruiter search algorithm.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              Naukri does not work like LinkedIn. Recruiters do not browse profiles — they search using narrow filters: skill, location, notice period, current CTC, expected CTC, total experience, and last active date. Every tip below moves the dial on one of those filters.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">The 8 Tips</h2>
            <div className="space-y-5">
              {TIPS.map((tip, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">How recruiters actually search Naukri</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              A typical Naukri recruiter search looks like this: <span className="font-mono bg-white px-2 py-0.5 rounded text-xs">Skill: &quot;Java&quot; AND &quot;Spring Boot&quot;, Location: Bangalore, Notice period: &lt;30 days, Total experience: 4-7 years, Active in last 7 days, CTC: 12-25 LPA</span>. Profiles that satisfy every filter rank highest. Profiles missing any field drop off entirely. The trick is to match all filters honestly.
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Naukri vs LinkedIn vs Indeed for India</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><span className="font-semibold text-gray-900">Naukri:</span> highest volume of Indian recruiters and IT services hiring (TCS, Infosys, Wipro, Cognizant, Capgemini). Filter-heavy search. Most active for laterals.</li>
              <li><span className="font-semibold text-gray-900">LinkedIn:</span> better for product companies, startups, fintech, global roles. Recruiter Lite uses different signals — engagement and content matter.</li>
              <li><span className="font-semibold text-gray-900">Indeed:</span> aggregator with strong search by job title and city. Easier resume parsing. Useful for non-IT roles.</li>
            </ul>
          </section>

          <section className="text-center py-8">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build a Naukri-friendly resume in minutes</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Free to start. 20 templates that parse cleanly through Naukri&apos;s resume scanner.
            </p>
            <button
              onClick={() => openGateway('/builder')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition"
            >
              Start My Resume <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Related guides</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link href="/fresher-resume" className="text-blue-600 hover:underline">→ Fresher resume format</Link>
              <Link href="/campus-placement-resume" className="text-blue-600 hover:underline">→ Campus placement resume</Link>
              <Link href="/resume-for/tcs" className="text-blue-600 hover:underline">→ TCS resume guide</Link>
              <Link href="/resume-for/infosys" className="text-blue-600 hover:underline">→ Infosys resume guide</Link>
              <Link href="/ats-guide" className="text-blue-600 hover:underline">→ Complete ATS guide</Link>
              <Link href="/templates" className="text-blue-600 hover:underline">→ All 20 templates</Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
