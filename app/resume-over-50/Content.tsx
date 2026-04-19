'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const TACTICS = [
  {
    name: 'Trim early-career roles hard',
    detail: 'The first 10 to 15 years of your career no longer need full bullets. Collapse anything before 2010 into a one-line "Earlier Experience" section with company names, titles, and dates. If a recruiter wants detail they will ask. Leading with 25 years of chronology is the fastest age signal you can send.',
  },
  {
    name: 'Drop graduation year from Education',
    detail: 'Keep the degree and university. Remove the year. An MBA from IIM-A still counts; a 1988 graduation date tells the recruiter you are 58 before they read a single bullet. Same rule applies to early certifications. Keep them if still relevant, drop the year.',
  },
  {
    name: 'Focus on the last 10 to 15 years',
    detail: 'The Experience section should have detailed bullets for the last 2 or 3 roles (10 to 15 years total). Older roles get shorter, and anything before that becomes a single summary line. This is not hiding your experience. It is calibrating the signal to what the role actually cares about.',
  },
  {
    name: 'List modern tools prominently',
    detail: 'Nothing kills an over-50 resume faster than a Skills section that reads like 2005. Add the tools you actually use in 2026: Slack, Notion, Figma, Looker, ChatGPT, Claude, dbt, Snowflake, Tableau, GitHub Copilot. If you use them on the current job, list them. Recruiters scan for modern-tool fluency as a proxy for "stayed current."',
  },
  {
    name: 'Avoid dated language',
    detail: 'Swap "seasoned professional," "proven track record," and "results-oriented" for specific outcomes. Replace "utilised" with "used." Drop "References available upon request." Avoid any phrase you would have written on a 1995 resume. Dated vocabulary age-dates you as much as graduation years.',
  },
  {
    name: 'Use references strategically',
    detail: 'Do not write "references available on request" at the bottom of the resume. Everyone knows. But do curate 4 to 6 references who are current, senior, and recent. Two of them should ideally be from the last 5 years and from someone younger or peer-aged. References only from your 90s-era boss signal a network frozen in time.',
  },
  {
    name: 'Modernise the LinkedIn photo and profile',
    detail: 'Recruiters Google you. A professional photo taken in the last 2 years, a headline that reflects 2026 positioning, and an About section written in the first person beat a resume of any age. Update your LinkedIn before you update the resume. The two need to tell the same story.',
  },
];

const DATA = [
  { stat: '3x', detail: 'callback drop from age-neutral to age-indicating resumes in US field experiments (NBER working paper, 2017 through 2022 follow-ups).' },
  { stat: '64 percent', detail: 'of workers over 50 in a 2024 AARP survey reported experiencing or witnessing age discrimination in the hiring process.' },
  { stat: '19 weeks', detail: 'median job-search duration for workers over 55, versus 10 to 12 weeks for workers under 35 (US BLS, 2024).' },
  { stat: '2 out of 3', detail: 'hiring managers in a 2023 ResumeBuilder survey admitted to inferring age from resume signals such as graduation year or early-career dates.' },
];

const SUMMARIES = [
  {
    role: 'Senior Engineering Leader (Tech)',
    weak: 'Seasoned engineering executive with 28+ years of proven experience leading teams and delivering results across multiple industries.',
    strong: 'Engineering leader who has scaled platforms from 10 to 150 engineers across fintech and SaaS. Recent focus: cloud-native migration and AI-augmented developer tooling. Shipped 4 zero-to-scale products in the last 6 years. Looking for a VP or SVP role where platform reliability and developer velocity both matter.',
  },
  {
    role: 'Marketing Director (CPG)',
    weak: 'Marketing veteran with extensive background in brand management, product launches, and team leadership over 3 decades.',
    strong: 'Marketing director with a 12-year track record scaling challenger brands past 100 crore annual revenue. Shifted the last 2 roles into digital-first acquisition (paid social, performance creative, retention loops). Built and retained teams of 8 to 25 across agencies and client-side. Interested in CMO or head-of-growth roles at Series B to D CPG brands.',
  },
  {
    role: 'Ops Director (Manufacturing)',
    weak: 'Experienced operations professional with extensive manufacturing background and a history of driving efficiency improvements.',
    strong: 'Ops director who ran a 4-plant network through a 22 percent margin expansion over 5 years using Lean, SAP S/4HANA rollout, and a supplier consolidation programme. Currently leading sustainability and digital-twin pilots. Targeting plant GM or VP Ops in mid-cap industrials.',
  },
  {
    role: 'Finance (Controller / VP Finance)',
    weak: 'Highly qualified finance professional with decades of experience in accounting, reporting, and financial strategy.',
    strong: 'Controller scaling late-stage startups through IFRS and SOX readiness. Led IPO prep at a fintech in 2023 and a healthtech in 2025. Strong on NetSuite, dbt, and modern close tooling. Open to VP Finance roles at Series C to pre-IPO with an 18-month IPO path.',
  },
];

const TOC = [
  { id: 'intro', label: 'Age bias is real; here is the data' },
  { id: 'tactics', label: '7 tactics that neutralise age signals' },
  { id: 'summaries', label: '4 worked summaries (weak vs strong)' },
  { id: 'interview', label: 'Carrying the strategy into the interview' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume After Parental Leave', slug: 'resume-after-parental-leave', excerpt: 'How to frame career gaps without apologising.', read: 10 },
  { title: 'Resume for Promotion', slug: 'resume-for-promotion', excerpt: 'Internal moves and senior-role framing.', read: 9 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by career stage and industry.', read: 14 },
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
];

export default function ResumeOver50Page() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Transitions"
      breadcrumbCurrent="Resume for over 50"
      title="Resume for Over 50: How to Beat Age Bias (2026)"
      subtitle="Age bias in hiring is real and measurable. This guide gives you 7 tactics that neutralise age signals on a resume, plus 4 worked summaries that reframe experience as current relevance."
      dateModified="2026-06-07"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Age discrimination in hiring is illegal in most jurisdictions and widespread in practice. A 2024 AARP survey found that 64 percent of workers over 50 have experienced or witnessed it. The goal of this guide is not to hide your experience. It is to present it so the first screener evaluates your capability, not your graduation year.
          </p>
        </div>
        <p>
          If you have been applying and not hearing back, the most common cause is not your skills. It is that the resume leaks age signals in the first 20 seconds of a recruiter scan, and the callback rate plummets before your experience gets a fair read. The research below quantifies the effect, and the rest of this guide gives you a concrete playbook to fix it.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          {DATA.map((d, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-2xl font-bold text-indigo-700 mb-1">{d.stat}</p>
              <p className="text-sm text-gray-700">{d.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          A quick note on framing. You are not lying by leaving a year off your degree. Graduation year is not a required field on any resume in any country. The same applies to the first 15 years of your chronology. You are summarising the earlier period the way a senior candidate always has: briefly.
        </p>
      </section>

      <section id="tactics" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 tactics that neutralise age signals</h2>
        <ol className="space-y-4">
          {TACTICS.map((t, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-1">{i + 1}. {t.name}</p>
              <p className="text-sm text-gray-700">{t.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-gray-700">
          Applied together, these 7 tactics compress a 28-year career into a resume that reads like a senior professional with 12 to 15 years of directly relevant recent experience. The work you did before 2010 still matters in conversations; the resume just does not lead with it.
        </p>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 worked summaries (weak vs strong)</h2>
        <div className="space-y-5">
          {SUMMARIES.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-3">{s.role}</p>
              <p className="text-sm text-red-700 mb-1"><strong>Weak:</strong></p>
              <p className="text-sm text-gray-700 mb-3 italic">&quot;{s.weak}&quot;</p>
              <p className="text-sm text-emerald-700 mb-1"><strong>Strong:</strong></p>
              <p className="text-sm text-gray-700">&quot;{s.strong}&quot;</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-700">
          The weak versions all lean on &quot;seasoned,&quot; &quot;veteran,&quot; &quot;decades,&quot; and &quot;extensive.&quot; These are age code-words. The strong versions name specific recent outcomes, modern tools, and a current forward-looking target role. Both are honest; only one is calibrated for 2026.
        </p>
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrying the strategy into the interview</h2>
        <p className="mb-3">
          A well-framed resume gets you to the phone screen. What you do in the first 10 minutes of that screen decides whether the resume story holds. 3 moves matter.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Lead with a recent win.</strong> Your &quot;tell me about yourself&quot; should start in the last 2 to 3 years, not in the 90s. Arc forward only if asked.</li>
          <li><strong>Talk about learning loops.</strong> Casually mention a course, conference, certification, or book you read in the last 12 months. Signals curiosity, not entrenchment.</li>
          <li><strong>Ask about the team age mix naturally.</strong> Not as a concern. As context for mentorship and collaboration: &quot;What is the seniority mix on the team, and how do you balance senior hires with earlier-career folks?&quot;</li>
        </ul>
        <p className="mt-3 text-gray-700">
          And a hard-won point from candidates who have been through this: do not apologise for your experience. Experienced candidates who open with &quot;I know I have been around a while&quot; cue the interviewer to think about age. Opening with outcomes cues them to think about fit.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.aarp.org/work/age-discrimination/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">AARP on age discrimination in the workplace</a></li>
          <li><a href="https://www.nber.org/papers/w21669" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">NBER field experiment on age and callback rates</a></li>
          <li><a href="https://www.bls.gov/news.release/empsit.t18.htm" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">US BLS unemployment duration by age group</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I put my graduation year on a resume over 50?', a: 'No. Keep the degree and university. The year adds nothing and instantly telegraphs age. Same for dates on early certifications.' },
            { q: 'How far back should my resume go?', a: '10 to 15 years in detail. Anything earlier collapses into a one-line "Earlier Experience" block with titles, companies, and optional date ranges. No bullets.' },
            { q: 'Will recruiters notice the years are missing?', a: 'Some will. Most will not on the first pass, which is the point. If asked directly you share honestly; you have just avoided the automatic reject before the conversation even starts.' },
            { q: 'Should I change the resume format to functional to hide timelines?', a: 'No. Functional resumes get downweighted by ATS and flagged by recruiters as hiding something. Stay chronological, just compress the earlier part.' },
            { q: 'What about my LinkedIn, should I do the same there?', a: 'Yes. Keep your LinkedIn and resume aligned. Remove graduation years from LinkedIn Education, compress early roles, and use a recent professional photo.' },
            { q: 'Does this apply if I am 45 to 50?', a: 'Most of it does. The compression gets more aggressive above 55. Below 45 the graduation year is usually fine to keep.' },
            { q: 'Is this dishonest?', a: 'No. You are editing for relevance, which every resume does at every career stage. No field here is fabricated. The information you leave off is information no law requires you to include.' },
            { q: 'What if the JD explicitly asks for "10+ years of experience"?', a: 'Great, your 12 to 15 years of detailed recent experience qualifies. Lead with that. The earlier chapters are context, not the lead.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that leads with relevance, not chronology</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz templates compress your early career automatically and put your most recent 10 to 15 years front and centre.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
