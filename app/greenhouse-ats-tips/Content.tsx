'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const GH_VS_WD = [
  { dim: 'Primary buyer', gh: 'Startups and growth-stage (10 to 2,000 employees)', wd: 'Enterprise (2,000+ employees, Fortune 500)' },
  { dim: 'Hiring philosophy', gh: 'Scorecard-driven, interviewer-led, structured feedback loops', wd: 'HR-driven, req and approval-flow heavy, compliance first' },
  { dim: 'Resume parsing', gh: 'Light parse, recruiter reads the file directly', wd: 'Heavy parse into profile fields, recruiter reads the parsed profile' },
  { dim: 'Rejection style', gh: 'Usually a human sends a personal note after the debrief', wd: 'Automated rejection after auto-reject rules trigger' },
  { dim: 'What your resume optimises for', gh: 'A human skim (45 to 60 seconds) plus a scorecard-trigger keyword or two', wd: 'Profile-field match plus a strong keyword density at the top of the file' },
  { dim: 'Cover letter', gh: 'Often optional but read when included', wd: 'Usually a separate text field, rarely read' },
];

const TIPS = [
  {
    tip: '1. Think of Greenhouse as a scorecard system, not a resume filter',
    detail: 'Greenhouse is built around interview scorecards. Every interviewer rates you on 4 to 8 attributes (technical depth, collaboration, ownership, and so on). Your resume exists to trigger the scorecard, not to pass a parse test. What that means practically: put 2 or 3 specific accomplishments that map to the scorecard attributes (leadership, scope, measurable outcome) in your first third of the resume.',
  },
  {
    tip: '2. Keywords still matter, but for recruiter search, not auto-match',
    detail: 'Greenhouse Recruit lets recruiters search candidates by keyword. If a recruiter has 400 candidates in the pipeline and searches &quot;kubernetes&quot;, your resume needs the word Kubernetes in full (not k8s alone) somewhere visible. Mirror the JD vocabulary. Do not stuff. Aim for 60 to 70 percent of the hard-skill keywords from the JD.',
  },
  {
    tip: '3. Greenhouse auto-reject rules are narrow but real',
    detail: 'Recruiters can configure auto-reject based on a handful of questions: work authorisation, years of experience minimum, location match. These are the only true auto-rejects in Greenhouse. If the job asks for 5 years and you claim 2, the system drops you before a human sees the file. Answer the screening questions truthfully; do not try to game them.',
  },
  {
    tip: '4. Apply through the referral link if you have one',
    detail: 'Greenhouse tracks referral source on the candidate record. Candidates who enter through a referral link are sorted into a separate bucket that recruiters check first. One email to an employee asking for the referral link raises your odds by a factor of 3 to 5 based on public Greenhouse case-study data.',
  },
  {
    tip: '5. Tagging is invisible to you but shapes your path',
    detail: 'Greenhouse recruiters tag candidates (Promising, Hold, Silver Medalist, Reject with reason). Silver Medalist tags surface when a similar role opens later. You cannot control tagging directly, but a clean, quantified resume plus a tailored cover letter nudges you toward Promising rather than Hold.',
  },
  {
    tip: '6. Format for human skim, not keyword density',
    detail: 'The Greenhouse candidate view shows the resume file inline. Recruiters see the same PDF you sent. Formatting that dies on Workday (columns, tables, colour) often survives here. Keep the single-column convention because clean scannability still helps, but do not over-engineer for a parser that barely exists in this flow.',
  },
  {
    tip: '7. Sync with the interview process; most Greenhouse companies have 4 to 6 stages',
    detail: 'A typical Greenhouse pipeline: recruiter screen, hiring manager call, 2 to 3 skill interviews, final debrief. Scorecards fill at each stage. Your resume should give each interviewer a hook to ask about: one scalability story, one conflict story, one shipped-something-hard story. If they cannot find a hook, the scorecard scores on generic prompts, and generic answers score 3 out of 5, which kills your candidacy.',
  },
  {
    tip: '8. Use Greenhouse-native fields when the application offers them',
    detail: 'Greenhouse forms sometimes include LinkedIn, GitHub, portfolio URL as first-class fields. Fill every one. A portfolio link is scorecard ammunition, and it is one of the few non-resume signals that Greenhouse surfaces on the candidate card.',
  },
];

const COMPANIES = [
  'Airbnb', 'Stripe', 'Coinbase', 'Figma', 'Notion', 'Ramp', 'Linear', 'Vercel', 'Canva', 'Doordash',
  'Instacart', 'Pinterest', 'Reddit', 'Roblox', 'Databricks', 'Dropbox', 'Squarespace', 'Robinhood',
];

const TOC = [
  { id: 'intro', label: 'What Greenhouse is and why it matters' },
  { id: 'vs-workday', label: 'Greenhouse vs Workday' },
  { id: 'tips', label: '8 tactical tips' },
  { id: 'companies', label: 'Companies using Greenhouse' },
  { id: 'sync', label: 'Sync with the interview process' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Workday Resume Tips', slug: 'workday-resume-tips', excerpt: 'How Workday parses your resume, 8 tips, and the Profile Sync gotcha.', read: 10 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '10 tactics that clear any ATS, 7 killers to avoid.', read: 11 },
  { title: 'ATS Guide', slug: 'ats-guide', excerpt: 'Everything about applicant tracking systems in 2026.', read: 10 },
  { title: 'Tailor Your Resume', slug: 'tailor-resume', excerpt: 'JD-to-resume mapping in 15 minutes.', read: 9 },
  { title: 'Naukri Resume Tips', slug: 'naukri-resume-tips', excerpt: 'Search-first optimisation for India job boards.', read: 8 },
];

export default function GreenhouseAtsTipsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="ATS & Keywords"
      breadcrumbCurrent="Greenhouse ATS tips"
      title="Greenhouse ATS: How to Stand Out in Startup Hiring (2026)"
      subtitle="Greenhouse runs recruiting at Airbnb, Stripe, Figma, Notion, and most YC-backed Series B and later startups. It works differently from Workday. 8 tactical tips for standing out, how the scorecard flow shapes your chances, and the interview pipeline to sync with."
      dateModified="2026-05-21"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">TL;DR</p>
          <p className="text-gray-700">
            Greenhouse is the dominant ATS for startups between 20 and 2,000 employees. Unlike Workday, Greenhouse is recruiter-led not HR-led, and its auto-reject surface is narrow. What matters is scorecard fit, referral source, and a resume that gives interviewers a hook. This guide covers the 8 tactics that move the needle in Greenhouse pipelines.
          </p>
        </div>
        <p>
          Greenhouse Software was founded in 2012 and has become the de facto ATS for tech startups after Series A. It powers hiring at Airbnb, Stripe, Figma, Notion, Ramp, Linear, and roughly 7,000 other companies globally. If you have ever applied to a YC-backed startup, you have almost certainly submitted through a Greenhouse-hosted form (usually visible by the /boards/ URL pattern).
        </p>
        <p className="mt-3">
          The mental model most candidates bring to Greenhouse is wrong. They treat it like Workday, optimise for parse-safe keywords, and wonder why the process feels opaque. Greenhouse is not a parse-and-score machine; it is a recruiter workflow tool wrapped around structured interviewing. The rules for standing out are different.
        </p>
      </section>

      <section id="vs-workday" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Greenhouse vs Workday, side by side</h2>
        <p className="mb-4 text-gray-700">The fastest way to calibrate your approach is to see how Greenhouse differs from the ATS most enterprise candidates know.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-3 text-left font-semibold text-gray-900">Dimension</th>
                <th className="border border-gray-200 p-3 text-left font-semibold text-gray-900">Greenhouse</th>
                <th className="border border-gray-200 p-3 text-left font-semibold text-gray-900">Workday</th>
              </tr>
            </thead>
            <tbody>
              {GH_VS_WD.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium text-gray-900">{row.dim}</td>
                  <td className="border border-gray-200 p-3 text-gray-700">{row.gh}</td>
                  <td className="border border-gray-200 p-3 text-gray-700">{row.wd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          The practical takeaway: on Workday you are writing for a parser that will soon decide your fate. On Greenhouse you are writing for a recruiter who will skim for 45 seconds, then forward you on or not. Optimise the skim.
        </p>
      </section>

      <section id="tips" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 tactical tips</h2>
        <div className="space-y-3">
          {TIPS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{t.tip}</p>
              <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t.detail }} />
            </div>
          ))}
        </div>
      </section>

      <section id="companies" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies using Greenhouse</h2>
        <p className="mb-4 text-gray-700">A partial list of well-known companies whose careers pages run on Greenhouse. If the job URL contains /boards/ or the page source references greenhouse.io, you are in a Greenhouse flow.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {COMPANIES.map((c, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 text-center">{c}</div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Public Greenhouse job boards are available at boards.greenhouse.io/companyname. A quick way to find open roles is to try that URL directly; many companies do not list every opening on their main careers page.
        </p>
      </section>

      <section id="sync" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sync with the interview process</h2>
        <p className="mb-3 text-gray-700">A standard Greenhouse interview pipeline looks like this:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Stage 1, recruiter screen (30 min):</strong> Verifies your resume against the job, covers comp range, timeline, visa, and a softball motivation question. Scorecard: baseline fit.</li>
          <li><strong>Stage 2, hiring manager call (45 min):</strong> Deep on one or two accomplishments from your resume. This is where the hook from your resume pays off. Bring 2 specific stories ready.</li>
          <li><strong>Stage 3, skill loop (2 to 3 rounds, 60 min each):</strong> Technical or role-specific. Each interviewer fills a scorecard. Assume every session is independent; do not rely on an earlier one to carry context.</li>
          <li><strong>Stage 4, values or bar raiser (45 min):</strong> Behavioural and cultural fit. This is scorecard-heavy. STAR-method answers score best.</li>
          <li><strong>Stage 5, debrief:</strong> All interviewers compare scorecards in a 30 to 60 minute meeting. The decision is collective and written. You are not in the room.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          The debrief is the core of Greenhouse. If you have 4 strong scorecards and one weak, you can still get the offer if the strong ones pushed back in the debrief. If you have 3 mixed scorecards, you lose. Optimise to be specific and memorable in every single interview, not to be pleasant in all of them.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.greenhouse.com/resources" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Greenhouse resources library (structured hiring framework)</a></li>
          <li><a href="https://support.greenhouse.io/hc/en-us" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Greenhouse support docs (scorecards, auto-reject rules)</a></li>
          <li><a href="https://www.lennysnewsletter.com/p/how-startups-hire" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Lenny Rachitsky on how startups hire</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I know if a company uses Greenhouse?', a: 'Check the apply URL. If it contains /boards/ or redirects to boards.greenhouse.io, it is Greenhouse. Right-click the page source and search for greenhouse.io to confirm.' },
            { q: 'Does Greenhouse auto-reject based on keywords?', a: 'No, not in the way Workday does. Auto-reject in Greenhouse is based on knockout questions the recruiter configures (years of experience, work authorisation, location). Resume keyword matching happens in recruiter search, not in auto-reject.' },
            { q: 'Should I still use keywords from the JD?', a: 'Yes, but for recruiter search and human scan, not for a parsing engine. 60 to 70 percent match on hard skills and tools is the target.' },
            { q: 'What format should my resume be for Greenhouse?', a: 'PDF, single column, clean sans-serif font. Greenhouse shows the file inline, so legibility to humans matters more than parser-safety.' },
            { q: 'Can I edit my application after submitting?', a: 'Usually no. Most Greenhouse forms do not expose a self-service edit. If you need to update, email the recruiter directly and ask them to replace the file on the candidate record.' },
            { q: 'How long does Greenhouse keep my data?', a: 'Per the GDPR section of Greenhouse docs, companies set their own retention, usually 1 to 3 years. Silver Medalist status lasts through that window and is how recruiters surface you for future roles.' },
            { q: 'Is there a Greenhouse applicant portal?', a: 'No unified candidate portal. Each company runs its own Greenhouse-hosted board. Applications are tied to the company, not to your email across Greenhouse.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that lands on the Promising pile</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz uses clean single-column templates and quantified bullet prompts built for Greenhouse-style human skim plus scorecard fit. No tables, no columns, no surprises.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
