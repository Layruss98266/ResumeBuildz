'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const ROUNDS = [
  { name: 'Round 1. Online Written Test', time: '160 min', what: 'Aptitude (45q, 60 min), Written Communication (1 essay, 20 min), Online Programming (2 problems, 60 min), Logical Ability (20 min).', cutoff: '~60 percent overall with sectional clearance; no negative marking.' },
  { name: 'Round 2. Technical Interview', time: '30 to 45 min', what: 'DSA (1 medium problem), OS / DBMS / CN basics, 1 project walk-through, basic OOP and SQL queries.', cutoff: 'Clean reasoning; interviewer values communication clarity over optimal code.' },
  { name: 'Round 3. HR Interview', time: '15 to 25 min', what: 'Behavioural, location preference (Wipro posts to 8+ cities), bond acceptance, relocation willingness, salary expectations.', cutoff: 'Positive tone, no disqualifiers (refusal to relocate, bond refusal).' },
];

const SYLLABUS = [
  { area: 'Quantitative Aptitude', topics: 'Percentages, ratios, profit/loss, time-speed-distance, permutations, probability, mensuration, data interpretation.' },
  { area: 'Logical Reasoning', topics: 'Analogies, classification, series, coding-decoding, blood relations, seating arrangements, syllogisms, puzzles.' },
  { area: 'Verbal / English', topics: 'Reading comprehension, error spotting, sentence correction, para jumbles, synonyms / antonyms, vocabulary.' },
  { area: 'Written Communication (essay)', topics: 'One opinion essay in 20 min, ~250 words on a contemporary tech / society topic. Scored on structure + grammar + clarity.' },
  { area: 'Programming / Coding', topics: 'Arrays, strings, sorting, searching, recursion, basic DP, basic graphs. 2 problems in 60 min. Languages allowed: C, C++, Java, Python.' },
  { area: 'Technical Interview topics', topics: 'OOP (4 pillars with examples), DBMS (joins, normalisation, ACID), OS (process vs thread, paging, deadlocks), CN (OSI, TCP vs UDP), SQL queries.' },
];

const RESUME_ADDS = [
  'List Wipro Elite NTH score / percentile under Achievements if you have cleared the first round.',
  'Certifications section: include any relevant Wipro, NPTEL, or Coursera certs that map to target role keywords.',
  'Project section: 2 to 3 projects, each with 3 bullets, GitHub link, and the stack Wipro cares about (Java + Spring Boot, Python, SQL, basic cloud).',
  'Internship section: required if you have one. Lists role, org, 2 measurable outcomes.',
  'Languages section: English plus one regional language is enough.',
];

const OFFER_TYPES = [
  { role: 'Elite Hire (Standard)', pack: 'Rs 3.5 LPA', track: 'Cleared NTH with 60+ percent', location: 'Bengaluru / Chennai / Hyderabad / Pune / Kolkata' },
  { role: 'Turbo Hire', pack: 'Rs 6.5 LPA', track: 'NTH + strong coding round score (top 10 percent)', location: 'Bengaluru / Chennai primary' },
];

const TOC = [
  { id: 'intro', label: 'What is Wipro Elite NTH?' },
  { id: 'rounds', label: '3-round process walkthrough' },
  { id: 'syllabus', label: 'Full syllabus (every section)' },
  { id: 'offers', label: 'Offer types + packages' },
  { id: 'resume', label: 'Resume placement for NTH applicants' },
  { id: 'prep', label: '45-day prep plan' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'TCS NQT 2026: Resume & Process Playbook', slug: 'tcs-nqt-resume-guide', excerpt: '5-round process + TCS iON-safe resume format.', read: 14 },
  { title: 'Infosys InfyTQ Certification: Full Guide', slug: 'infosys-infytq-guide', excerpt: '5-phase process + Advanced track + HackWithInfy.', read: 15 },
  { title: 'Campus Placement Resume 2026', slug: 'campus-placement-resume', excerpt: '10-point checklist + 5-round walkthrough.', read: 10 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: '7-section template for Indian + global ATS.', read: 11 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
];

export default function WiproEliteNTHPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="Wipro Elite NTH 2026 guide"
      title="Wipro Elite NTH 2026: Syllabus, Process & Resume Tips"
      subtitle="Complete Wipro National Talent Hunt 2026 guide: 3-round process, full syllabus for every section, offer types and packages (Elite Hire vs Turbo Hire), resume placement, and the 45-day prep plan."
      dateModified="2026-05-10"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">What is Wipro Elite NTH?</p>
          <p className="text-gray-700">
            Wipro Elite National Talent Hunt (NTH) is Wipro annual fresher hiring program targeting pre-final and final-year engineering students. It runs in parallel with TCS NQT and Infosys InfyTQ as one of the three biggest Indian IT services entry points. NTH typically gets 4 to 5 lakh applicants each cycle with around 20 to 25 thousand offers made across Elite Hire (Rs 3.5 LPA) and Turbo Hire (Rs 6.5 LPA) tracks.
          </p>
        </div>
        <p>
          NTH is a 3-round funnel: online written test, technical interview, HR interview. Compared to TCS NQT, NTH has a heavier emphasis on written communication (the essay round is a genuine filter) and a lighter coding round. Compared to InfyTQ, NTH is one-shot rather than certification-based; you apply, test, and either clear or retake next cycle.
        </p>
      </section>

      <section id="rounds" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">3-round process walkthrough</h2>
        <div className="space-y-4">
          {ROUNDS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-semibold text-gray-900">{r.name}</p>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded px-2 py-1">{r.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1"><strong>What:</strong> {r.what}</p>
              <p className="text-sm text-gray-700"><strong>Clear bar:</strong> {r.cutoff}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="syllabus" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Full syllabus for every section</h2>
        <div className="space-y-4">
          {SYLLABUS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.area}</p>
              <p className="text-sm text-gray-700">{s.topics}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="offers" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Offer types + packages</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900">Role</th>
                <th className="text-left p-3 font-semibold text-gray-900">Package (approx)</th>
                <th className="text-left p-3 font-semibold text-gray-900">Track</th>
                <th className="text-left p-3 font-semibold text-gray-900">Location</th>
              </tr>
            </thead>
            <tbody>
              {OFFER_TYPES.map((r, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-medium text-gray-900">{r.role}</td>
                  <td className="p-3 text-gray-700">{r.pack}</td>
                  <td className="p-3 text-gray-700">{r.track}</td>
                  <td className="p-3 text-gray-700">{r.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-700">Numbers are typical ranges for 2025 to 2026 cycles. Wipro also runs a project engineer track with an 18-month bond and a training stipend structure; check current cycle notices for specifics.</p>
      </section>

      <section id="resume" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume placement for NTH applicants</h2>
        <ul className="space-y-3">
          {RESUME_ADDS.map((r, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4 text-sm text-gray-700">{r}</li>
          ))}
        </ul>
      </section>

      <section id="prep" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">45-day prep plan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Days 1-15: Foundation</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>1 hour aptitude daily (IndiaBIX, R.S. Aggarwal).</li>
              <li>1 hour programming daily (20 easy problems on HackerRank).</li>
              <li>Read 2 opinion articles (The Hindu, The Ken) daily for essay structure.</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Days 16-30: Patterns</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Switch to medium aptitude + logical puzzles.</li>
              <li>20 medium problems on HackerRank / HackerEarth.</li>
              <li>Write 1 essay every 2 days, 250 words in 20 min, time strict.</li>
              <li>Revise OOP + DBMS + OS fundamentals.</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Days 31-45: Mocks</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>3 full-length NTH mock tests per week (any reputed platform).</li>
              <li>Mock technical interviews with peer or TPO (2 per week).</li>
              <li>Review previous year NTH questions (leaked banks + prep portals).</li>
              <li>Prepare 1 Tell-me-about-yourself + 6 STAR stories.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://careers.wipro.com" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Wipro Careers portal</a> for the current NTH registration window and eligibility.</li>
          <li><a href="https://www.hackerrank.com" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HackerRank</a> for daily coding practice and public NTH-style problem sets.</li>
          <li><a href="https://www.indiabix.com" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">IndiaBIX aptitude bank</a> for category-wise aptitude drills with explanations.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the eligibility for Wipro Elite NTH?', a: 'B.E. / B.Tech / M.E. / M.Tech / 5-yr Integrated M.Tech in any branch; 60 percent throughout 10th, 12th, and UG; no active backlogs; year of graduation within the current recruitment cycle.' },
            { q: 'What is the difference between Elite Hire and Turbo Hire?', a: 'Elite Hire is the standard Rs 3.5 LPA role. Turbo Hire is an accelerated track at Rs 6.5 LPA for candidates who score in the top 10 percent of the coding round. Both come out of the same NTH funnel.' },
            { q: 'Is there a bond at Wipro?', a: 'Yes, typically a 15-month service agreement with a financial penalty for early exit. Check current cycle terms on the offer letter.' },
            { q: 'Can I reapply if I fail NTH this year?', a: 'Yes, if you are still within the eligible graduation year window. There is no cap on attempts within eligibility.' },
            { q: 'Does Wipro accept other scores like NQT?', a: 'Not as a substitute for NTH. Wipro runs its own test and scoring. Some lateral hiring tracks reference NTH indirectly but fresher intake requires the NTH test.' },
            { q: 'How strict is the essay section?', a: 'Stricter than candidates expect. A coherent 250-word essay with clean grammar and a clear structure lifts you above roughly 40 percent of the field. Weak essays are a common silent disqualifier.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">
                {item.q}
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a Wipro NTH-ready resume free</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          ResumeBuildz renders clean single-column resumes that clear Wipro screening on first try and has a dedicated section for NTH scores + certifications.
        </p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">
          Start building free
        </button>
      </section>
    </BlogPostLayout>
  );
}
