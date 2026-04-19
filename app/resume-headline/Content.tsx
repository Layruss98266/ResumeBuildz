/* eslint-disable react/no-unescaped-entities */
'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const EXAMPLES = [
  { role: 'Software Engineer (fresher)', headline: 'Computer Science Graduate | Full-Stack (React, Node) | Built 3 shipped projects with 1k+ users' },
  { role: 'Software Engineer (mid)', headline: 'Senior Software Engineer | Distributed Systems (Go, Kafka) | Scaled checkout to 12k rps at Razorpay' },
  { role: 'Data Analyst', headline: 'Data Analyst | SQL, Python, Tableau | Cut reporting cycle time 60% for ops team of 40' },
  { role: 'Data Scientist', headline: 'Data Scientist | NLP and Recommendation | Shipped models serving 2M DAU at Flipkart' },
  { role: 'Product Manager', headline: 'Product Manager | B2B SaaS, Fintech | Drove 3x activation on payments onboarding' },
  { role: 'UX Designer', headline: 'Senior UX Designer | Enterprise SaaS | Redesign cut support tickets 35% across 4 products' },
  { role: 'DevOps Engineer', headline: 'DevOps Engineer | AWS, Kubernetes, Terraform | Cut deploy time from 40 min to 6 min at scale' },
  { role: 'QA Engineer', headline: 'QA Automation Engineer | Playwright, Cypress | Brought regression cycle from 3 days to 4 hours' },
  { role: 'Backend Engineer', headline: 'Backend Engineer | Java, Spring, PostgreSQL | Built billing service handling $40M ARR' },
  { role: 'Frontend Engineer', headline: 'Frontend Engineer | React, TypeScript, Next.js | Shipped design system used by 60+ engineers' },
  { role: 'Marketing Manager', headline: 'Growth Marketing Manager | SEO and Paid | Grew organic pipeline 4x in 18 months at Series B SaaS' },
  { role: 'Sales (SDR)', headline: 'Sales Development Rep | SaaS, Outbound | 140% of quota 3 quarters running; $1.8M pipeline sourced' },
  { role: 'HR Business Partner', headline: 'HRBP | Tech, 400-person org | Led re-org without a single regretted attrition across Q2 to Q4' },
  { role: 'Financial Analyst', headline: 'Senior Financial Analyst | FP&A, SaaS metrics | Owns $120M P&L forecast; 2% quarterly variance' },
  { role: 'Career switcher (teacher to UX)', headline: 'UX Researcher transitioning from EdTech Teaching | Mixed-methods background | 2 shipped case studies' },
];

const FORMULA_PARTS = [
  { part: 'Role', detail: 'Your actual or target job title. Be specific: "Senior Backend Engineer" beats "Engineer." Avoid internal titles that do not map to the market ("Member of Technical Staff III" means nothing outside your company).' },
  { part: 'Specialty', detail: 'The core stack or domain. 2 to 4 items max. "Distributed Systems (Go, Kafka)" is a specialty. "Full-stack developer" is a category, not a specialty.' },
  { part: 'Domain or industry', detail: 'Where you work. Fintech, healthcare, B2B SaaS, e-commerce. Skip if you are a fresher or cross-industry; use "Specialty" twice instead.' },
  { part: 'Metric or signal', detail: 'One concrete proof. Preferably a number. "Scaled to 12k rps" or "grew pipeline 4x." If you genuinely have no number, use a named outcome: "Led IPO readiness program."' },
];

const MISTAKES = [
  { m: 'Buzzword soup', w: '"Results-driven, dynamic, passionate professional with strong communication skills." Says nothing. Delete.' },
  { m: 'Multiple titles separated by slashes', w: '"Developer / Designer / Writer / Entrepreneur." Looks unfocused to ATS and recruiters. Pick the target role.' },
  { m: 'Objective statements', w: '"Seeking a challenging role to grow and contribute." This is 1995. Use a headline, not an objective.' },
  { m: 'Humble-bragging length', w: 'A headline should be one line at 10 to 12 pt font. If it wraps to two lines, cut it.' },
  { m: 'Vague domains', w: '"Technology professional." Every reader can read; they need specifics. Same for "Finance expert."' },
  { m: 'Claims without proof', w: '"Award-winning engineer." Which award? Drop it or name it ("ACM ICPC regional finalist").' },
];

const TOC = [
  { id: 'intro', label: 'Why headline beats objective' },
  { id: 'vs-summary', label: 'Headline vs summary (when each)' },
  { id: 'formula', label: 'The 4-part formula' },
  { id: 'examples', label: '15 headline examples by role' },
  { id: 'linkedin', label: 'Resume headline vs LinkedIn headline' },
  { id: 'mistakes', label: '6 mistakes to avoid' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '20 summaries by role and career stage.', read: 10 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '150 strong verbs grouped by outcome type.', read: 8 },
  { title: 'How to Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Turning work into numbers recruiters trust.', read: 9 },
  { title: 'Fresher Resume Guide', slug: 'fresher-resume', excerpt: 'A resume that works without work experience.', read: 11 },
];

export default function ResumeHeadlinePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Resume headline"
      title="How to Write a Resume Headline That Gets Clicks (2026)"
      subtitle="A good headline sits under your name and does 80 percent of the filtering work before a recruiter reads a single bullet. This guide covers the 4-part formula, 15 worked examples, and the 6 mistakes that kill a headline."
      dateModified="2026-06-25"
      readingTime={9}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            A resume headline is the one-line description directly under your name. Recruiters read it in under a second. It decides whether they keep reading or move to the next candidate in the stack. Most headlines are wasted: a job title, a cliche, or an objective statement. Written well, it is the single highest-leverage sentence on the page.
          </p>
        </div>
        <p>
          Think of the headline as a trailer. It has to communicate role, proof, and direction fast enough that a recruiter who has 150 resumes in a queue decides you are worth the next 6 seconds. The objective statement ("Seeking a role to grow and contribute") used to do this job. It has not been relevant since about 2005. The modern replacement is a headline built from 4 predictable parts.
        </p>
      </section>

      <section id="vs-summary" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Headline vs summary (when each)</h2>
        <p className="mb-3">Both sit near the top of a resume. They do different work.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Headline (always):</strong> one line directly under your name. A compressed positioning statement. Read in a second, skimmed even when the recruiter does not read anything else.</li>
          <li><strong>Summary (most of the time):</strong> 2 to 4 lines below the headline, before Experience. Expands the headline with specifics. Freshers with thin experience may skip; everyone with 2+ years of experience should have one.</li>
        </ul>
        <p className="mt-3">The headline is mandatory. The summary is recommended. You can lose the summary; you cannot afford to lose the headline.</p>
      </section>

      <section id="formula" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 4-part formula: Role + Specialty + Domain + Metric</h2>
        <div className="space-y-3">
          {FORMULA_PARTS.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.part}</p>
              <p className="text-sm text-gray-700">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700">Put them together with pipe separators for scannability. Example: <em>Senior Backend Engineer | Distributed Systems (Go, Kafka) | Fintech | Scaled checkout to 12k rps.</em> 4 parts, 80 characters, reads in a second, survives ATS parsing.</p>
        <p className="mt-3 text-sm text-gray-700">For freshers or cross-industry candidates, drop Domain and double up on Specialty or swap in a signal (degree, notable internship, relevant side project).</p>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">15 headline examples by role</h2>
        <div className="space-y-3">
          {EXAMPLES.map((e, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{e.role}</p>
              <p className="text-sm text-gray-800">{e.headline}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="linkedin" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume headline vs LinkedIn headline</h2>
        <p className="mb-3">Different platforms, different rules. Do not copy-paste.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Character budget.</strong> Resume headline: roughly 80 to 110 characters so it fits on one line. LinkedIn headline: 220 characters, mobile truncates around 140.</li>
          <li><strong>Keyword density.</strong> LinkedIn headline is a search field; recruiters filter on it. Stuff more keywords. Resume headline has to read naturally because humans scan it first.</li>
          <li><strong>Voice.</strong> LinkedIn can lean personality (&quot;Ex-Googler building tools for devs&quot;). Resume stays factual.</li>
          <li><strong>Metric placement.</strong> Resume headline: metric up front since the reader scans quickly. LinkedIn: metric optional since you have an About section right below.</li>
        </ul>
        <p className="mt-3 text-sm text-gray-700">A sensible rule: write the resume headline first, then adapt it to LinkedIn with more keywords and a touch more voice.</p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 mistakes to avoid</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.w}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2014/12/how-to-write-a-resume-that-stands-out" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on resumes that stand out</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/resume-headline" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide on resume headlines</a></li>
          <li><a href="https://www.themuse.com/advice/the-first-10-words-of-your-resume-are-the-most-important" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on the first 10 words of a resume</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Do I need a headline if I have a summary?', a: 'Yes. They do different jobs. The headline is the one-second scan; the summary is the 10-second read. Keep both.' },
            { q: 'Should freshers use a headline?', a: 'Yes, strongly. With less experience to speak for you, the headline has to do more work. Lead with degree + stack + one shipped project.' },
            { q: 'Can I use multiple headlines for different job applications?', a: 'You should. Maintain 2 or 3 headline variants for your 2 or 3 target role clusters. Swap per application.' },
            { q: 'Should I include years of experience in the headline?', a: 'Optional. "8 YOE" can anchor level quickly, but takes space. If your title already signals level (Senior, Staff, Principal), you can skip YOE.' },
            { q: 'How long should a resume headline be?', a: 'One line at body font size, roughly 80 to 110 characters. If it wraps, cut until it does not.' },
            { q: 'Can I use emojis or symbols?', a: 'Skip emojis. Pipe separators ( | ) and a single center dot are fine; anything flashier parses badly in ATS and looks unserious in most industries.' },
            { q: 'Where does the headline sit on the page?', a: 'Directly below your name, above contact info or beside it. Font 11 to 13 pt, usually italic or regular weight (not bold).' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Headline that works, out of the box</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz prompts you through the 4-part formula and flags weak patterns (buzzword soup, missing metric) as you type.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
