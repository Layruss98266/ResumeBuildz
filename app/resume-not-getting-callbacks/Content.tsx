'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const FUNNEL = [
  { stage: '100 applications', detail: 'Your raw volume for a typical active search over 4 to 6 weeks.' },
  { stage: '8 responses', detail: 'Recruiter screens, HR outreach, or scheduled first calls. An 8 percent response rate is average; 12 percent is strong; under 4 percent means something is off.' },
  { stage: '3 interviews', detail: 'Past the screen into technical or panel rounds. Drop-off here is usually mismatch of scope or level, not resume quality.' },
  { stage: '1 offer', detail: '33 percent interview-to-offer is a realistic benchmark. Under 20 percent means interview prep needs work; over 50 percent means you are under-applying.' },
];

const REASONS_CONTENT = [
  { n: 1, title: 'Your bullets describe duties, not outcomes', detail: 'Responsible for managing the database reads as you were paid to exist. Replace with: Reduced query latency from 340ms to 90ms by adding 3 composite indexes on hot tables, cutting p95 from 1.2s to 380ms.' },
  { n: 2, title: 'No numbers anywhere', detail: 'A resume with zero percentages, dollar signs, or counts signals vagueness. Target: at least 60 percent of bullets carry a number. Even rough estimates (approximately 30 percent faster) beat nothing.' },
  { n: 3, title: 'Summary reads like a generic LinkedIn headline', detail: 'Passionate software engineer with strong problem-solving skills is noise. Replace with: Backend engineer, 5 yrs Go + Kubernetes, led 3 migrations from monolith to services at 40M MAU fintech scale.' },
  { n: 4, title: 'Missing the keywords for the role', detail: 'If the JD says Kafka, Airflow, dbt and your resume says messaging, orchestration, data modelling, ATS keyword match drops below the 60 percent threshold most filters use.' },
];

const REASONS_FORMAT = [
  { n: 5, title: 'Two-column layout confuses ATS parsers', detail: 'Many ATS read left to right, top to bottom, and scramble 2-column resumes. Headings end up attached to the wrong bullets. Default to single column for any online application.' },
  { n: 6, title: 'Fancy fonts or graphics', detail: 'Icons, progress bars (rating bars for skills), images, and non-standard fonts break parsing. Stick to Arial, Calibri, Times New Roman, Helvetica, or Garamond.' },
  { n: 7, title: 'Resume is 3+ pages', detail: 'Unless you are an executive or academic, over 2 pages is skimmed at page 1 only. Cut anything older than 10 years or unrelated to the current target.' },
  { n: 8, title: 'PDF has images of text', detail: 'Exporting from Canva or Photoshop often produces a PDF where text is rasterised. ATS cannot read it. Test: try to select and copy text from your PDF. If it does not copy cleanly, rebuild in Word or Google Docs.' },
];

const REASONS_FIT = [
  { n: 9, title: 'Applying above your current level', detail: 'Staff or Principal roles rarely hire from SDE-3 unless the jump is obvious. Target your band and one above.' },
  { n: 10, title: 'Wrong location match', detail: 'Remote-unfriendly companies filter on city. If you are in Pune and the role is SF-only (no relocation), the filter kicks you out before a human reads the resume.' },
  { n: 11, title: 'Missing must-have skill listed in JD', detail: 'If the JD says 5 yrs AWS required and you have Azure, most ATS auto-reject. Either gain the missing skill (cert + side project) or stop applying to that JD.' },
];

const REASONS_TARGET = [
  { n: 12, title: 'Same resume for every role', detail: 'A generic resume scores 55 to 65 percent on most ATS. A tailored resume hits 80 to 90 percent. The difference is 2 to 3 minutes of keyword swapping per application.' },
  { n: 13, title: 'Applying only through job boards', detail: 'Board-only applications sit in the 70 percent rejection zone. Recruiter DMs and referrals hit 3 to 5x higher response rates. Split your time: 40 percent boards, 40 percent referrals, 20 percent direct outreach.' },
];

const REASONS_TIMING = [
  { n: 14, title: 'Applying more than 72 hours after post', detail: 'First 50 applicants get 80 percent of the recruiter attention. Apply within 48 hours of the posting going live. Set LinkedIn and Naukri alerts.' },
  { n: 15, title: 'Sending 5 applications per week', detail: 'Volume matters. Active search benchmark is 15 to 25 targeted applications per week for 4 to 6 weeks. Lower volume stretches the funnel and amplifies luck variance.' },
];

const AUDIT = [
  { step: '1. The 6-second test', detail: 'Hand your resume to a non-technical friend. Can they tell your role, level, and 2 biggest wins in 6 seconds? If no, top-third needs rework.' },
  { step: '2. The number audit', detail: 'Count bullets. Count bullets with a number. Divide. Below 60 percent? Add numbers to the bottom 40.' },
  { step: '3. The keyword match', detail: 'Paste the JD and your resume into a free ATS simulator (Jobscan free tier works). Below 70 percent match? Rewrite bullets using the exact JD phrasing.' },
  { step: '4. The parse test', detail: 'Upload to Jobscan or Resumeworded. Check the parsed output. Are headings correct? Are dates extracted? Is email captured? If parse fails, fix layout.' },
  { step: '5. The 2-page check', detail: 'Is it 1 or 2 pages? Is the most impressive content on page 1 top-third? If the most senior role is on page 2, rearrange.' },
];

const TOC = [
  { id: 'intro', label: 'Why this is happening' },
  { id: 'funnel', label: 'The callback funnel math' },
  { id: 'content', label: 'Content reasons (1 to 4)' },
  { id: 'format', label: 'Format reasons (5 to 8)' },
  { id: 'fit', label: 'Fit reasons (9 to 11)' },
  { id: 'targeting', label: 'Targeting reasons (12 to 13)' },
  { id: 'timing', label: 'Timing and volume (14 to 15)' },
  { id: 'audit', label: 'The 5-minute self-audit' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Complete ATS Guide', slug: 'ats-guide', excerpt: 'How ATS works end to end, with fixes.', read: 14 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Tailor Your Resume', slug: 'tailor-resume', excerpt: 'Match the JD without rewriting from scratch.', read: 9 },
  { title: 'Resume Action Verbs List', slug: 'resume-action-verbs', excerpt: '150+ verbs grouped by skill category.', read: 7 },
  { title: 'Quantify Achievements', slug: 'quantify-resume-achievements', excerpt: 'Add numbers to any bullet, even without metrics.', read: 9 },
];

export default function ResumeNotGettingCallbacksPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="ATS & Keywords"
      breadcrumbCurrent="Why resume is not getting callbacks"
      title="Why Your Resume Is Not Getting Callbacks: 15 Reasons (2026)"
      subtitle="The callback funnel math, 15 specific reasons grouped by content, format, fit, targeting, and timing, and a 5-minute audit that fixes most of them."
      dateModified="2026-06-11"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Zero callbacks after 100 applications feels personal. It is not. It is a math problem with 15 common causes, most of which take under 15 minutes each to fix. This guide covers all 15 and ends with a 5-minute self-audit.
          </p>
        </div>
        <p>
          If you are 30 to 60 applications deep with no responses, the fastest path forward is diagnosis, not more volume. Sending 200 more of the same resume multiplies the signal of whatever is broken. Fix the resume first, then scale the volume.
        </p>
      </section>

      <section id="funnel" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The callback funnel math</h2>
        <p className="mb-4 text-gray-700">The typical active-search funnel in 2026:</p>
        <div className="space-y-3">
          {FUNNEL.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{f.stage}</p>
              <p className="text-sm text-gray-700">{f.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700">
          If your response rate is under 4 percent, the problem is almost certainly in the resume or the targeting. If the response rate is healthy but you drop at interviews, the resume is fine and interview prep is the bottleneck. Diagnose before you iterate.
        </p>
      </section>

      <section id="content" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Content reasons (1 to 4)</h2>
        <div className="space-y-3">
          {REASONS_CONTENT.map((r) => (
            <div key={r.n} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.n}. {r.title}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Format reasons (5 to 8)</h2>
        <div className="space-y-3">
          {REASONS_FORMAT.map((r) => (
            <div key={r.n} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.n}. {r.title}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="fit" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Fit reasons (9 to 11)</h2>
        <div className="space-y-3">
          {REASONS_FIT.map((r) => (
            <div key={r.n} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.n}. {r.title}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="targeting" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Targeting reasons (12 to 13)</h2>
        <div className="space-y-3">
          {REASONS_TARGET.map((r) => (
            <div key={r.n} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.n}. {r.title}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="timing" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Timing and volume (14 to 15)</h2>
        <div className="space-y-3">
          {REASONS_TIMING.map((r) => (
            <div key={r.n} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.n}. {r.title}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="audit" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 5-minute self-audit</h2>
        <ol className="space-y-3">
          {AUDIT.map((a, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{a.step}</p>
              <p className="text-sm text-gray-700">{a.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-gray-700">Run all 5 steps in under 10 minutes. If 2 or more fail, fix those first before sending another application. Every batch of 20 applications with a broken resume is 20 lost chances you cannot recover.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.jobscan.co/blog/ats-resume/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Jobscan: ATS resume guide and keyword match</a></li>
          <li><a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/how-recruiters-read-resumes" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn Talent Blog: how recruiters read resumes</a></li>
          <li><a href="https://hbr.org/2014/12/how-to-write-a-resume-that-stands-out" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review: How to Write a Resume That Stands Out</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many applications before I should expect a callback?', a: 'On a strong resume with tight targeting, first callback by application 10 to 15. On a weak or generic resume, you can send 100 with no response. If you are past 30 with nothing, audit the resume before applying to more.' },
            { q: 'Is 100 applications normal for no offer?', a: '100 applications leading to 1 offer is within the typical range. 100 with zero callbacks is not. That is a diagnostic signal, not a volume problem.' },
            { q: 'Should I follow up on applications?', a: 'Yes, but only with a specific recruiter or hiring manager, not the black hole. A personalised LinkedIn message 5 to 7 days after applying can double the response rate.' },
            { q: 'Does applying through the careers page help or hurt?', a: 'Neutral. The path matters less than the resume quality and the timing (apply within 48 hours of posting).' },
            { q: 'How do I know if it is the resume or the market?', a: 'If peers at your level at similar companies are landing callbacks on similar roles, it is the resume. If the whole peer cohort is silent, it is the market.' },
            { q: 'Should I use a new email for each application?', a: 'No. Use one professional email. Use that same email on LinkedIn so recruiters can connect the two profiles.' },
            { q: 'Do cover letters help callbacks?', a: 'For traditional industries (finance, consulting, non-profit) and career transitions, yes. For tech IC roles, rarely. Invest the time in tailoring the resume first.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Fix the 15 reasons in one pass</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz ATS-clean templates, number-driven bullets, and per-JD keyword suggestions solve most of the 15 by default. Rebuild your resume in 20 minutes.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
