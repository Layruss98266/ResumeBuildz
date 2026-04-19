/* eslint-disable react/no-unescaped-entities */
'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const REASONS = [
  { label: 'Contract or project role ended', framing: 'State it plainly in the title: "Frontend Developer (Contract, 8 months)". Recruiters read contract as planned end, not a flight risk.' },
  { label: 'Company layoff, restructure, shutdown', framing: 'Add a one-line note under the role: "Role eliminated in company-wide restructure, April 2025". Neutral, factual, closes the loop.' },
  { label: 'Relocation', framing: 'One line: "Left role to relocate from Pune to Bengaluru". Readers accept geography without follow-up.' },
  { label: 'Promoted or moved internally', framing: 'Do not list as two jobs. Nest the roles under one company header with dates that span both.' },
  { label: 'Toxic manager or mismatch', framing: 'Never write this on paper. In interview, say "the role shifted away from what I was hired for". No personal grievance.' },
  { label: 'Chasing better pay or growth', framing: 'Reframe as growth: "moved for a staff-level IC track that was not available at the previous company".' },
];

const TACTICS = [
  { tactic: 'Group related stints under a banner', detail: 'If you had three 8-month contract gigs in a row, create a single block titled "Independent Contractor, 2023 to 2025" and list the three clients as sub-bullets. Visually reads as one continuous engagement.' },
  { tactic: 'Show years only, not months', detail: 'Instead of "Feb 2024 to Oct 2024" use "2024". A 9-month stint flanked by two 3-year roles stops looking like a red flag.' },
  { tactic: 'Lead the summary with tenure elsewhere', detail: 'If your last role was 7 months but the one before was 4 years, open the summary with "Engineer with 4+ years at one company, now exploring staff-level roles". Anchors your reputation before the short stint shows up.' },
  { tactic: 'Quantify impact per role', detail: 'A short stint with a hard number ("shipped payments rewrite, cut latency 38 percent in 6 months") reads as focused execution, not flailing.' },
  { tactic: 'Hide nothing, explain proactively', detail: 'Recruiters will ask either way. Pre-answering in a one-line note under the role saves the awkward phone-screen moment.' },
  { tactic: 'Drop stints under 3 months (case by case)', detail: 'A 2-month role you left voluntarily can be omitted without dishonesty, but keep it if leaving creates a visible gap. Gaps read worse than short stints.' },
];

const PATTERNS = [
  { pattern: 'Three jobs in 3 years, all similar titles', read: 'Looks like restlessness. Fix with a banner block or a summary line that frames the arc: "pursuing progressively senior roles across three fast-growth startups".' },
  { pattern: '8-month role between two long tenures', read: 'Usually not a problem if unexplained. Add a one-line reason and move on. Most recruiters tolerate one outlier.' },
  { pattern: 'Contract stack (4+ short gigs)', read: 'Group under one heading. Highlight that the work was contract by design. The story is "independent consultant", not "cannot hold a job".' },
  { pattern: 'Layoffs from multiple companies', read: 'Add a neutral one-liner ("role eliminated") to each affected role. Two layoffs is unlucky, not disqualifying. Three or more: address in cover letter, not resume.' },
  { pattern: 'Voluntary quits every 10 to 14 months', read: 'Hardest to reframe. Focus on growth arc: did each jump come with a title bump, scope jump, or pay jump? If yes, lean into it. If no, consider staying put for the next 2 years before the next move.' },
];

const TOC = [
  { id: 'intro', label: 'Why recruiters flag job hopping' },
  { id: 'threshold', label: 'How many jobs is too many?' },
  { id: 'reasons', label: '6 reasons and how to frame each' },
  { id: 'tactics', label: '6 tactics that quiet the red flag' },
  { id: 'patterns', label: 'Common hopping patterns and the recruiter read' },
  { id: 'interview', label: 'The interview question (verbatim script)' },
  { id: 'cover', label: 'Using the cover letter to pre-empt' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Interview Questions and Answers', slug: 'interview-questions-and-answers', excerpt: 'Top 30 questions with model answers.', read: 14 },
  { title: 'Tell Me About Yourself', slug: 'tell-me-about-yourself', excerpt: 'The 90-second opener that anchors any interview.', read: 9 },
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '12 summary templates by experience level.', read: 9 },
  { title: 'Tailor Your Resume to the Job', slug: 'tailor-resume', excerpt: 'Match each bullet to the job description.', read: 10 },
  { title: 'Cover Letter Guide', slug: 'cover-letter', excerpt: 'When a cover letter actually helps.', read: 9 },
];

export default function JobHoppingResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Job hopping resume"
      title="How to Explain Job Hopping on a Resume (2026)"
      subtitle="A 3-year window with four employers used to be a disqualifier. In 2026 it is routine, but only if you frame it. Here are the exact line edits, summary hooks, and interview scripts that keep short tenures from killing the callback."
      dateModified="2026-08-04"
      readingTime={10}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The real concern</p>
          <p className="text-gray-700">
            Recruiters do not fear job hopping itself. They fear onboarding cost. A hire who quits in 9 months costs the company the recruiting fee, 3 months of ramp-up salary, and the project slippage from replacing them mid-sprint. Every short stint on your resume raises the question: will this one be next? Your job is to answer that question before it gets asked.
          </p>
        </div>
        <p className="mb-3">
          Job hopping is no longer the career sin it was a decade ago. The average tenure at one company is now 2.7 years in tech, 3.1 years across all industries, and under 2 years for workers in their first 5 years of career. What changed: layoffs hit every year, startups fold, and pay parity is only reachable by switching. Recruiters know this. What they still flag is the pattern that does not fit any of those explanations.
        </p>
        <p>
          This guide covers three things. First, the threshold: how many short stints actually triggers the red flag. Second, the framing: exactly how to write up each kind of departure so a skim reader registers "planned" rather than "unstable". Third, the conversation: what to say in the interview when the question lands, and how to pre-empt it in a cover letter when the pattern is unavoidable.
        </p>
      </section>

      <section id="threshold" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How many jobs is too many?</h2>
        <p className="mb-3">
          The working threshold most recruiters use: two stints under 18 months in a row is a pattern. One is an outlier, which is absorbed without comment. Two raises the question. Three is a conversation you will have in every phone screen for the next year.
        </p>
        <p className="mb-3">
          Context matters. A senior engineer with 12 years of experience and one 9-month stint buried in the middle of a long tenure is fine. A 3-year-experienced engineer with three 11-month stints back to back is the same proportion but reads very differently. Early career is held to a stricter standard because there is less context to cushion the short stints.
        </p>
        <p>
          Industry matters too. Consulting, contract, and agency work have baseline tenures of 12 to 18 months. Product companies expect 2 to 4 years. Big tech expects 3 to 5. A resume that reads as hoppy for a product company reads as normal for consulting. Apply for roles where your pattern is the baseline, not the outlier.
        </p>
      </section>

      <section id="reasons" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 reasons and how to frame each on the resume</h2>
        <div className="space-y-3">
          {REASONS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.label}</p>
              <p className="text-sm text-gray-700">{r.framing}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tactics" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 tactics that quiet the red flag</h2>
        <div className="space-y-3">
          {TACTICS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{t.tactic}</p>
              <p className="text-sm text-gray-700">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="patterns" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Common hopping patterns and the recruiter read</h2>
        <ul className="space-y-3">
          {PATTERNS.map((p, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.pattern}</p>
              <p className="text-sm text-gray-700">{p.read}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The interview question (verbatim script)</h2>
        <p className="mb-3">
          The question always comes in one of three forms: &quot;I see you have had a few short stints, can you walk me through those?&quot;, &quot;What are you looking for this time that was missing before?&quot;, or &quot;How do we know you will stay?&quot;. All three are the same question.
        </p>
        <p className="mb-3">
          The answer is a 3-part structure. First, acknowledge the pattern without apology. Second, give one concrete reason per role, ideally structural rather than personal. Third, anchor forward: what specifically about this role makes it different.
        </p>
        <p className="mb-3 italic text-gray-700">
          Example: &quot;You are right, the last 3 years show three roles. The first ended in a reorg that eliminated my team. The second was a 9-month contract I knew was fixed-term when I joined. The current one is a full-time role I took 14 months ago and am leaving because the platform pivoted away from the customer-facing work I was hired to do. What I am looking for now, and what attracted me to this role, is a 3-plus year product build where the roadmap and the team scope are stable. That is the pattern I want to break.&quot;
        </p>
        <p>
          Three things that answer does well: it names the pattern before the recruiter presses, it gives structural reasons (reorg, fixed-term, pivot) rather than personal ones (bad boss, bored), and it closes with a specific future commitment tied to what this role actually offers. That is enough for most recruiters to move on.
        </p>
      </section>

      <section id="cover" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Using the cover letter to pre-empt</h2>
        <p className="mb-3">
          If your resume shows four short stints in a row, a recruiter may not read to the bottom. A one-paragraph cover letter that names the pattern up front buys you the benefit of the doubt. Keep it to 3 sentences, keep the tone matter-of-fact, and do not apologise.
        </p>
        <p>
          Template: &quot;My resume shows three roles over the last 4 years. Two ended in layoffs (Company A in 2023, Company C in 2025) and one was a 12-month contract I knew was fixed-term. I am applying to your team because the 5-plus year product horizon and the stable funding signal a match for the long tenure I want next.&quot; Three sentences, full accounting, forward-looking close.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.bls.gov/news.release/tenure.nr0.htm" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">US Bureau of Labor Statistics: employee tenure summary</a></li>
          <li><a href="https://hbr.org/2022/03/what-job-hoppers-want" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on what job hoppers want</a></li>
          <li><a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/job-hopping-is-not-a-bad-thing" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn Talent Blog on reframing job hopping</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many short jobs is too many on a resume?', a: 'Two stints under 18 months back to back reads as a pattern. One is absorbed as an outlier. Three or more needs a cover letter paragraph and a rehearsed interview script.' },
            { q: 'Should I hide a short stint by leaving it off?', a: 'Only if the role was under 3 months, did not produce a reference, and dropping it does not create a visible gap. A gap reads worse than a short stint. When in doubt, keep it and frame it.' },
            { q: 'Is it okay to use years only instead of months?', a: 'Yes, and it is a standard tactic. "2024" reads smoother than "Feb 2024 to Oct 2024". Be ready to provide exact dates if asked in interview or on the background check form.' },
            { q: 'Do contract roles count as job hopping?', a: 'Not if they are labelled. Add "(Contract, 8 months)" or "(Fixed-term)" in the title. Recruiters separate contract stints from full-time stints when assessing stability.' },
            { q: 'How do I explain a layoff without sounding defensive?', a: 'One line under the role: "Role eliminated in company-wide restructure, April 2025". No emotion, no justification. Facts close the loop faster than explanations.' },
            { q: 'Will ATS flag short tenures automatically?', a: 'No. ATS parses keywords and years of experience, not tenure patterns. The red flag is a human read. Your resume needs to survive the skim, not the algorithm, on this dimension.' },
            { q: 'What if all my jobs have been under 2 years?', a: 'Lead the summary with arc, not tenure: "6 years across 4 fast-growth startups, each move tied to a scope or title jump". Anchor on progression, not length. Then commit to staying in the next role for at least 3 years.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Frame every role the right way, automatically</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz prompts you for contract vs full-time, tenure context, and departure reason on every role. The output reads as planned, not hoppy.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
