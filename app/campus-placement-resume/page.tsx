'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, CheckCircle2, Sparkles, Award, AlertCircle } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';

const CHECKLIST = [
  '10th, 12th, and graduation percentages or CGPA prominently listed (top of education section).',
  'No active backlogs unless the job description allows them. Mention "Cleared all backlogs" if applicable.',
  '2-3 strong projects with GitHub links, tech stack, and quantified outcomes.',
  '1-2 internships if you have any. List even unpaid or short ones.',
  'Skills section grouped by category: Languages, Frameworks, Databases, Tools.',
  'Coding contest profiles (LeetCode, Codeforces, CodeChef, HackerRank) with current rating.',
  'Position of responsibility: club lead, sports captain, event organiser, NSS, NCC.',
  'Achievements: hackathon wins, scholarships, competition ranks, published papers.',
  'A clean ATS-friendly format with no graphics, no columns, no skill bars.',
  'PDF format, named correctly: Firstname_Lastname_Resume.pdf',
];

const COMPANIES = [
  { name: 'TCS NQT', focus: 'Aptitude score, academic consistency, English communication, no backlogs' },
  { name: 'Infosys', focus: 'InfyTQ certification, full-stack skills, problem solving, English communication' },
  { name: 'Wipro Elite NTH', focus: 'NTH score, academic consistency, programming fundamentals' },
  { name: 'Accenture', focus: 'Communication, learning agility, basic coding, college tier' },
  { name: 'Cognizant', focus: 'Aptitude score, academic record, technical fundamentals' },
  { name: 'Capgemini', focus: 'Aptitude, English, programming fundamentals, learning mindset' },
];

export default function CampusPlacementResumePage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Campus Placement Resume 2026 - Format, Tips & Checklist | ResumeForge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'How to write a campus placement resume in 2026. 10-point checklist, what TCS, Infosys, Wipro, Accenture screen for, and free ATS-friendly templates.'
      );
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'How to write a campus placement resume in 2026. 10-point checklist, what TCS, Infosys, Wipro screen for, free templates.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Campus Placement Resume 2026 - Format, Tips & Checklist | ResumeForge');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <GraduationCap className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" /> Campus Placements
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Campus Placement Resume 2026
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            India runs the world&apos;s largest campus placement system, with over 1.5 million graduates placed each year. Here is the exact resume format and 10-point checklist that gets students into TCS, Infosys, Wipro, Accenture, and beyond.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              Most college Training and Placement (T&P) cells require a standard one-page resume. The mistake students make is treating the resume like a casual document. The companies that visit campus screen 20,000+ resumes in 48 hours — every formatting issue, missing percentage, or unverified claim costs you the interview slot.
            </p>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-center gap-2 mb-5">
              <Award className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">The 10-point campus placement checklist</h2>
            </div>
            <ul className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What top campus recruiters actually screen for</h2>
            <div className="space-y-3">
              {COMPANIES.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{c.name}</h3>
                  <p className="text-sm text-gray-700">{c.focus}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-amber-50 rounded-xl p-6 border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">A note on inflated claims</h3>
                <p className="text-sm text-amber-900 leading-relaxed">
                  Indian campus recruiters increasingly verify GitHub commits, LeetCode profiles, and project authorship. If you list a project, you should be able to walk through it line by line in the technical interview. Inflating CGPA, falsifying internships, or copying GitHub projects has led to immediate rejection and even college blacklisting from companies like TCS and Infosys.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center py-8">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Get placement-ready in 25 minutes</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Free to start. 20 templates. ATS-clean and accepted by every major Indian campus recruiter.
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
              <Link href="/naukri-resume-tips" className="text-blue-600 hover:underline">→ Naukri.com resume tips</Link>
              <Link href="/resume-for/tcs" className="text-blue-600 hover:underline">→ TCS resume guide</Link>
              <Link href="/resume-for/infosys" className="text-blue-600 hover:underline">→ Infosys resume guide</Link>
              <Link href="/resume-for/wipro" className="text-blue-600 hover:underline">→ Wipro resume guide</Link>
              <Link href="/ats-guide" className="text-blue-600 hover:underline">→ Complete ATS guide</Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
