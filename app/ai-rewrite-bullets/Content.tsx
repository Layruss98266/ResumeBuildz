'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const WHY_FAIL = [
  { problem: 'No metric', fix: 'Add a number. Percent, dollar, time saved, user count, ticket volume. If a bullet has zero numbers, it is background noise on the page.' },
  { problem: 'Passive voice', fix: 'Lead with a verb. "Was responsible for migrating" becomes "Migrated". You own the work; the sentence should too.' },
  { problem: 'Duplicate verbs', fix: 'No more than two bullets under any role starting with the same verb. Rotate verbs (Led, Shipped, Architected, Partnered, Cut) so the eye moves down the page.' },
  { problem: 'Vague scope', fix: 'Readers need a unit. "Improved performance" is meaningless. "Cut p95 latency from 800ms to 220ms across 12 services" is a story in one line.' },
  { problem: 'Responsibility, not result', fix: 'JD text belongs in the JD. A bullet is what you did and what changed because of it. Kill every sentence that could appear on the job post.' },
  { problem: 'Buzzword density', fix: 'Synergy, stakeholder, leverage, utilize. One per resume, maximum. Each buzzword is a word recruiters have learned to skip.' },
];

const PROMPT = `You are a senior resume editor. Rewrite the bullet below using this rule set:

1. Open with a strong past-tense verb (Led, Shipped, Cut, Grew, Architected, Owned, Migrated, Automated, Negotiated, Launched).
2. Include one quantified outcome. If I did not give you a number, ask me for one; do not invent numbers.
3. Maximum 22 words. One line on a standard resume.
4. Name the stakeholder or system: which team, which customer segment, which product, which tool.
5. Kill buzzwords (synergy, leverage, stakeholder, utilize, spearhead).
6. No em-dashes. No double hyphens.
7. Show the before / after pair so I can compare.

Bullet:
"""
<paste your bullet here>
"""

If any required detail is missing (number, scope, tool, team size), return a one-line question list instead of a rewrite.`;

const PAIRS = [
  { role: 'Software Engineer', before: 'Was responsible for working on the checkout service and fixing bugs.', after: 'Owned checkout service for 2 years; shipped 18 releases and cut cart-abandonment bugs by 46 percent.' },
  { role: 'Software Engineer', before: 'Helped migrate the backend to microservices.', after: 'Led migration of monolith to 9 microservices; reduced deploy time from 42 min to 4 min.' },
  { role: 'Software Engineer', before: 'Worked on improving performance of APIs.', after: 'Cut p95 latency on 12 product APIs from 780ms to 210ms via query plan and cache tuning.' },
  { role: 'Software Engineer', before: 'Collaborated with team members on code reviews.', after: 'Reviewed 600 plus PRs across 3 repos; authored review checklist adopted by the 14-person backend guild.' },
  { role: 'Product Manager', before: 'Managed the mobile app roadmap and worked with engineering.', after: 'Led mobile roadmap across 3 squads (22 engineers); shipped 7 features that grew DAU from 240k to 410k.' },
  { role: 'Product Manager', before: 'Ran discovery interviews with users.', after: 'Ran 38 user interviews across 4 segments; findings killed 2 planned features and reshaped Q3 roadmap.' },
  { role: 'Product Manager', before: 'Was the PM on the pricing project.', after: 'Drove pricing overhaul across 5 SKUs; uplift on blended ARPU was 22 percent at 90-day measurement.' },
  { role: 'Marketing', before: 'Managed social media channels.', after: 'Owned 4 organic channels (LinkedIn, X, YouTube, Reddit); grew combined followers from 18k to 81k in 14 months.' },
  { role: 'Marketing', before: 'Ran email marketing campaigns.', after: 'Shipped 62 lifecycle emails across 3 segments; open rate climbed from 14 to 28 percent and attributed revenue to 1.2M.' },
  { role: 'Marketing', before: 'Worked on SEO for the blog.', after: 'Grew organic traffic from 22k to 190k monthly sessions across 140 published posts; 11 posts ranked top-3.' },
  { role: 'Sales', before: 'Sold the product to enterprise clients.', after: 'Closed 14 enterprise accounts (ACV 80k to 260k); attained 128 percent of 2.4M quota in FY25.' },
  { role: 'Sales', before: 'Built relationships with key accounts.', after: 'Managed 9-account book worth 6.1M ARR; expanded 5 accounts (plus 38 percent NRR) and saved 1 at-risk renewal.' },
  { role: 'Sales', before: 'Trained new reps on the sales process.', after: 'Onboarded 11 AEs across 3 cohorts; trainees hit quota at month 5 versus team average of month 8.' },
  { role: 'Design', before: 'Designed screens for the mobile app.', after: 'Designed 40 plus screens for iOS onboarding; completion rate went from 51 to 74 percent after A/B test.' },
  { role: 'Design', before: 'Ran usability tests.', after: 'Ran moderated usability tests with 24 participants across 3 personas; output reshaped checkout flow and cut drop-off by 29 percent.' },
  { role: 'Design', before: 'Built a design system.', after: 'Built Figma design system (86 components, 140 tokens) adopted by 4 product teams; cut design-to-dev handoff by 35 percent.' },
  { role: 'Ops', before: 'Was responsible for vendor management.', after: 'Renegotiated 8 vendor contracts worth 3.2M; locked 14 percent blended savings with zero service downgrade.' },
  { role: 'Ops', before: 'Handled the logistics of office moves.', after: 'Led office relocation for 210 staff across 2 floors; closed under budget by 9 percent and zero downtime days.' },
  { role: 'Ops', before: 'Helped with hiring and onboarding.', after: 'Ran hiring ops for 48 roles across 3 quarters; cut average time-to-offer from 41 to 23 days.' },
  { role: 'Ops', before: 'Maintained documentation for the team.', after: 'Rebuilt internal wiki (220 pages) with new taxonomy; support-ticket deflection on internal queries rose 31 percent.' },
];

const HALLUCINATIONS = [
  { signal: 'Numbers you did not provide', check: 'If the AI adds a percent, dollar figure, or user count you never mentioned, delete it. Replace with a number you can defend in the interview.' },
  { signal: 'Tools you never used', check: 'Check every product name (AWS, Kubernetes, Snowflake, Salesforce). AI pattern-matches your role to a common stack; swap to the tool you actually touched.' },
  { signal: 'Scope inflation', check: 'Watch for "led a team of 12" when you led 3. Watch for "across the enterprise" when it was one squad. Scope is the number one thing reference checks surface.' },
  { signal: 'Buzzwords re-introduced', check: 'Some prompts filter buzzwords; others let them back in. Re-scan for synergy, spearhead, leverage, stakeholder, utilize on the final pass.' },
  { signal: 'Generic outcomes', check: 'If the outcome is "improved efficiency" or "boosted productivity", the AI gave up. Ask it to re-run with a specific metric axis (time, money, quality, volume).' },
  { signal: 'Tense drift', check: 'Past roles use past tense. Current role can use present tense on 1 to 2 ongoing bullets; the rest stay past tense. AI often mixes.' },
];

const TOC = [
  { id: 'intro', label: 'Why bullet rewriting matters' },
  { id: 'why-fail', label: '6 reasons most bullets fail' },
  { id: 'prompt', label: 'The rewrite prompt (copy / paste)' },
  { id: 'pairs', label: '20 before / after pairs' },
  { id: 'hallucinations', label: 'How to spot AI hallucinations' },
  { id: 'workflow', label: 'The 5-minute bullet audit' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Action Verbs (180)', slug: 'resume-action-verbs', excerpt: 'Strong openers organized by result type.', read: 8 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'How to put numbers on work you think cannot be measured.', read: 9 },
  { title: 'AI Resume Builders Tested', slug: 'ai-resume-builders-tested', excerpt: 'We ran 8 AI builders through the same 3 profiles.', read: 14 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '24 summaries by role and level.', read: 10 },
];

export default function AiRewriteBulletsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="How to rewrite resume bullets with AI"
      title="How to Rewrite Resume Bullets with AI (Before / After Library)"
      subtitle="The exact rewrite prompt, 20 before / after pairs across 6 roles, and the 6 hallucination patterns to catch before you hit submit."
      dateModified="2026-06-30"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            A recruiter reads roughly 7 bullets on your resume before deciding to scroll or skip. Weak bullets waste those 7 shots. A strong AI-assisted rewrite flow turns 40 mediocre bullets into 40 interview-worthy ones in about 25 minutes, provided you catch the 6 hallucination patterns we cover below.
          </p>
        </div>
        <p>
          Most resumes die on bullet quality, not on formatting or keywords. The sentence is vague, the verb is weak, and the outcome is missing. AI is genuinely good at fixing sentence-level problems; it is not good at inventing numbers you never gave it. This guide gives you the one prompt that works across roles, 20 paired examples so you can calibrate your own output, and a checklist for the inevitable moment the model hallucinates a metric.
        </p>
      </section>

      <section id="why-fail" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 reasons most bullets fail</h2>
        <div className="space-y-3">
          {WHY_FAIL.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{w.problem}</p>
              <p className="text-sm text-gray-700">{w.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="prompt" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The rewrite prompt (copy / paste)</h2>
        <p className="mb-4">Drop this into Claude, ChatGPT, or Gemini. It works equally well on all three. The key instructions are the &quot;ask for missing data&quot; clause (prevents hallucination) and the before / after pairing (makes review fast).</p>
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">{PROMPT}</pre>
        <p className="mt-4 text-sm text-gray-700">
          A few teams paste their entire bullet list in one go. Do not do that. Rewrite one at a time. The model stays focused, numbers are less likely to get swapped between bullets, and you can reject bad rewrites without losing state.
        </p>
      </section>

      <section id="pairs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">20 before / after pairs across 6 roles</h2>
        <p className="mb-5 text-sm text-gray-700">These are the outputs we got from the prompt above with supplied metrics. Note how the afters name a system, a team size, or a measurement window. Never just a number in a vacuum.</p>
        <div className="space-y-4">
          {PAIRS.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-2">{p.role} &middot; Pair {i + 1}</p>
              <p className="text-sm text-gray-500 mb-1"><span className="font-semibold text-gray-900">Before:</span> {p.before}</p>
              <p className="text-sm text-gray-800"><span className="font-semibold text-gray-900">After:</span> {p.after}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="hallucinations" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">How to spot AI hallucinations</h2>
        <p className="mb-4 text-sm text-gray-700">Every AI rewrite needs a 30-second sanity pass. These are the 6 most common invented claims.</p>
        <ul className="space-y-3">
          {HALLUCINATIONS.map((h, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{h.signal}</p>
              <p className="text-sm text-gray-700">{h.check}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="workflow" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 5-minute bullet audit</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>Copy every bullet from your resume into a single text file. Number them.</li>
          <li>Run each bullet through the prompt above. Keep the question-list responses open; you will need to go hunt the missing metrics.</li>
          <li>Paste the rewrite next to the original in a side-by-side doc. Only keep the rewrite if it wins on verb strength and specificity.</li>
          <li>Run the 6-signal hallucination check on every rewrite you accept. Delete or correct inventions.</li>
          <li>Re-read the full resume out loud. If two bullets in a row start with the same verb, rotate one.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-700">
          This is the full audit. 40 bullets, 25 minutes, one cup of coffee. You will be surprised how much stronger the page reads when every sentence earns its spot.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2014/12/how-to-write-a-resume-that-stands-out" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on resume bullet craft</a></li>
          <li><a href="https://www.themuse.com/advice/how-to-write-resume-bullet-points" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on strong resume bullets</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/resume-bullet-points" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide on bullet structure</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Which AI model gives the best rewrites?', a: 'Claude, ChatGPT-5, and Gemini 2 are all close. Claude tends to ask for missing numbers instead of inventing; that alone saves you the hallucination pass on half the bullets.' },
            { q: 'Should I let AI add metrics it guessed?', a: 'No. If the model writes "improved efficiency by 30 percent" without you providing the 30, delete it. Hiring managers ask for the source of a number in 1 in 4 interviews.' },
            { q: 'How long should each bullet be?', a: '18 to 22 words. Longer and it wraps to a second line on most resumes, which weakens scannability.' },
            { q: 'Can I mix AI rewrites with originals?', a: 'Yes. Pick the stronger version bullet by bullet. A forced full rewrite often loses a few authentic touches the original had.' },
            { q: 'What if I have no numbers to give the AI?', a: 'Spend 10 minutes digging. Old Slack, Jira, Salesforce, Google Analytics, manager emails. You have more measurable wins than you remember.' },
            { q: 'Do I need to disclose AI assistance?', a: 'Not on the resume. You wrote the content and own the numbers; AI only polished the sentence. Do not submit AI-written content you cannot defend live in interview.' },
            { q: 'Is this the same as using an AI resume builder?', a: 'No. AI resume builders generate a full document. This is a targeted rewrite of bullets you already have. The targeted workflow produces tighter output.' },
            { q: 'How often should I rerun the audit?', a: 'Once per job application. Tailoring bullets to the JD language for that specific role lifts response rate more than any other single move.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Rewrite every bullet with one click</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz ships with the rewrite prompt built in and guardrails that refuse to invent metrics you did not supply. No hallucinations.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
