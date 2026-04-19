'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const CATCHES = [
  { item: 'Typos and spelling', detail: 'Catches 90 percent of common misspellings (managment, recieve, seperated). This alone is worth the free tier. One typo on a resume is enough to end the review at some firms.' },
  { item: 'Tense consistency', detail: 'Flags when past roles slip into present tense (Manage a team of 8 on a job from 2021). Resume tense is one of the top 3 reasons recruiters lose trust in a candidate on the first scan.' },
  { item: 'Subject-verb agreement', detail: 'Led team that were responsible is an easy miss when you have edited the same line 20 times. Grammarly flags it reliably.' },
  { item: 'Duplicate words', detail: 'Managed managed the rollout. Happens more than you think after copy-paste iterations. Free tier catches these.' },
  { item: 'Basic punctuation', detail: 'Missing periods on bullets, stray commas inside numbered lists, rogue semicolons. All caught on free.' },
  { item: 'Hyphenation in compound modifiers', detail: 'Data driven vs data-driven, full stack vs full-stack. Inconsistent hyphenation makes a resume look rushed. Premium is better here but free gets most of them.' },
];

const MISSES = [
  { item: 'Weak verbs', detail: 'Responsible for, worked on, helped with. Grammatically perfect, career-killing. Grammarly does not know that Led, Shipped, Architected would parse 3x better for a recruiter.' },
  { item: 'Hallucinated numbers', detail: 'If you wrote Grew revenue 300 percent when you meant 30 percent, Grammarly will happily approve it. Proof-against-the-original is a human job.' },
  { item: 'Tone for resumes', detail: 'Grammarly suggests smoothing prose that should stay terse. Resume bullets are not essays; its default suggestions soften punchy writing.' },
  { item: 'ATS-killing formatting', detail: 'Grammarly does not see your layout. It cannot tell you that your 2-column PDF will scramble in Workday parsers.' },
  { item: 'Keyword alignment to JD', detail: 'Matching your bullets to the job description language is the single highest-leverage resume edit. Grammarly has zero awareness of the JD you are applying to.' },
  { item: 'Bullet structure', detail: 'Action verb + what + quantified result. Grammarly will not restructure Handled customer complaints into Resolved 140+ customer escalations per quarter with 94 percent CSAT.' },
];

const HURT = [
  { case: 'Over-smoothing industry jargon', fix: 'Grammarly flags terms like EBITDA, SLI, p99, CAC, NRR as unclear. For finance, SRE, growth, SaaS resumes these terms are exactly what recruiters search for. Dismiss and keep.' },
  { case: 'Suggesting passive rewrites for active verbs', fix: 'Shipped 14 features is sometimes suggested as 14 features were shipped. This is the opposite of resume best practice. Always keep active.' },
  { case: 'Demanding articles on bullet starters', fix: 'Grammarly sometimes insists on The or A in front of bullets. Resumes drop articles at bullet start on purpose. Ignore.' },
  { case: 'Flagging industry acronyms as typos', fix: 'K8s, TLS, CI/CD, NPS, ARR. Not typos. Add each to your personal dictionary once and Grammarly stops complaining.' },
  { case: 'Rewording quantified phrasing into soft language', fix: 'Grew from 0 to 12k users in 90 days to Significantly grew user base. Never accept. Numbers beat adverbs on a resume, always.' },
];

const VS = [
  { tool: 'Grammarly Free', best: 'Typos, tense, subject-verb agreement, duplicate words, basic punctuation. Install it, run every resume through it, free forever.' },
  { tool: 'Grammarly Premium', best: 'Tone adjustments, word-choice suggestions, clarity scoring. Useful for cover letters; marginal for bullet-heavy resumes. Not worth the subscription for resumes alone.' },
  { tool: 'ChatGPT / Claude', best: 'Restructuring weak bullets, adding action verbs, tailoring to a JD. Completely different job than Grammarly. Use both, not one.' },
  { tool: 'Hemingway Editor', best: 'Adverb and passive-voice overuse, sentence-length audits. Free web tool, better than Grammarly for resume concision.' },
  { tool: 'Manual read-aloud', best: 'Catches tone, rhythm, ugly repetition. Takes 4 minutes. Nothing replaces this step no matter how many tools you run.' },
];

const TOC = [
  { id: 'intro', label: 'Does Grammarly actually help a resume' },
  { id: 'catches', label: 'What Grammarly catches (and does well)' },
  { id: 'misses', label: 'What Grammarly misses (the big stuff)' },
  { id: 'tiers', label: 'Free vs Premium for resumes' },
  { id: 'hurt', label: '5 situations where Grammarly hurts' },
  { id: 'alternatives', label: 'Alternatives and when to use each' },
  { id: 'workflow', label: 'Recommended proofing workflow' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'AI Resume Builders Tested', slug: 'ai-resume-builders-tested', excerpt: '9 tools ranked on parse rate and output quality.', read: 12 },
  { title: 'Best Free Resume Builder', slug: 'best-free-resume-builder', excerpt: 'Free tools that actually stay free, no watermark trap.', read: 10 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '120 verbs grouped by function with examples.', read: 9 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'How to add numbers when you did not track them.', read: 10 },
];

export default function GrammarlyResumeReviewPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="Grammarly for resumes"
      title="Grammarly for Resumes: Does It Actually Help? (2026)"
      subtitle="What Grammarly catches on a resume, what it misses, where it hurts, and how it stacks against ChatGPT, Claude, and Hemingway. A straight answer to whether Premium is worth it for resume editing."
      dateModified="2026-07-07"
      readingTime={10}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Short answer</p>
          <p className="text-gray-700">
            Grammarly Free is a must-use final pass for any resume. It catches typos, tense drift, and agreement errors that a tired human eye will miss. Grammarly Premium is not worth the subscription for resumes alone. For the bigger work (weak verbs, hallucinated numbers, ATS formatting, JD alignment) you need an LLM, Hemingway, or a human reviewer. Grammarly fills one lane well; it does not cover the whole road.
          </p>
        </div>
        <p>
          The question this post answers is narrow on purpose. Grammarly is a spelling and grammar checker. It was not built for resumes specifically. Asking whether Grammarly fixes a resume is like asking whether a spellchecker writes an essay. The answer is no, but it will catch the dozen embarrassing slips that would otherwise end the review. The mistake is assuming that a green Grammarly score means the resume is good. It does not. A perfectly grammatical resume full of Responsible for bullets and no numbers is still a weak resume.
        </p>
        <p className="mt-3">
          This guide splits what Grammarly does well from what it misses, covers the 5 situations where its suggestions actively hurt a resume, and lays out a 4-step proofing workflow that stacks Grammarly with other tools so each one does the job it is good at.
        </p>
      </section>

      <section id="catches" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">What Grammarly catches (and does well)</h2>
        <p className="mb-4">This is the honest case for running Grammarly over your resume. On the items below, it is reliable, fast, and free.</p>
        <div className="space-y-3">
          {CATCHES.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{c.item}</p>
              <p className="text-sm text-gray-700">{c.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">If this were the whole proofing job, Grammarly would be enough. It is not. The next section covers what it does not see.</p>
      </section>

      <section id="misses" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">What Grammarly misses (the big stuff)</h2>
        <p className="mb-4">Grammarly checks grammar. It does not check whether your resume will get interviews. These 6 categories are where it is blind.</p>
        <div className="space-y-3">
          {MISSES.map((m, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-red-50">
              <p className="font-semibold text-red-900 mb-1">{m.item}</p>
              <p className="text-sm text-gray-700">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tiers" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Free vs Premium for resumes</h2>
        <p className="mb-3">
          Grammarly Premium costs around 12 USD per month on annual billing. The question is whether the premium features pull their weight on a resume specifically.
        </p>
        <p className="mb-3">
          Premium adds clarity scoring, tone detection, word-choice alternatives, and full-sentence rewrites. On a bullet-point resume most of this is irrelevant. Clarity scoring on a 12-word bullet tells you nothing useful. Tone detection on a resume is a non-problem; the tone should be neutral-professional and you already know that. Word-choice alternatives occasionally help, but a free LLM will do a better rewrite in one prompt.
        </p>
        <p className="mb-3">
          Where Premium does earn its keep is on cover letters and LinkedIn About sections, which are prose-heavy and benefit from a clarity pass. If you also use Grammarly for email, essays, or client writing, Premium makes sense across that portfolio. Buying Premium only for resume editing does not.
        </p>
        <p className="font-semibold text-gray-900 mb-2 mt-5">Verdict</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          <li>Grammarly Free: yes, always, for every resume.</li>
          <li>Grammarly Premium for resumes only: skip. Put the 12 USD into an LLM subscription or a human reviewer.</li>
          <li>Grammarly Premium for broader writing: reasonable, and you get resume checks as a bonus.</li>
        </ul>
      </section>

      <section id="hurt" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 situations where Grammarly hurts</h2>
        <p className="mb-4">Accepting every Grammarly suggestion is a bad idea. These 5 patterns come up on almost every resume and you should override each one.</p>
        <ul className="space-y-3">
          {HURT.map((h, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{h.case}</p>
              <p className="text-sm text-gray-700">{h.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="alternatives" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Alternatives and when to use each</h2>
        <p className="mb-4">Grammarly is one tool in a stack, not a replacement for the stack. Each tool below does a different part of the job.</p>
        <div className="space-y-3">
          {VS.map((v, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{v.tool}</p>
              <p className="text-sm text-gray-700">{v.best}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended proofing workflow</h2>
        <p className="mb-3">Layer the tools so each one handles what it is good at. 20 minutes end to end.</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>LLM pass (7 min).</strong> Paste your resume into Claude or ChatGPT with the JD. Ask for 3 rewrites of the weakest 5 bullets. Keep the ones that add specificity, reject the ones that invent facts.</li>
          <li><strong>Hemingway pass (3 min).</strong> Paste into hemingwayapp.com. Target grade 8 or below. Cut adverbs, simplify any hard-to-read bullets.</li>
          <li><strong>Grammarly pass (5 min).</strong> Free tier is enough. Accept typos, tense, and agreement fixes. Reject any suggestion that softens action verbs or adds articles to bullet starters.</li>
          <li><strong>Read-aloud pass (5 min).</strong> Read every bullet out loud. Awkward rhythm, repeated openers, weak closers all jump out. Nothing replaces this step.</li>
        </ol>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.grammarly.com/plans" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Grammarly official pricing and plan comparison</a></li>
          <li><a href="https://hemingwayapp.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Hemingway Editor (free web version)</a></li>
          <li><a href="https://www.forbes.com/advisor/business/software/grammarly-review/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Forbes Advisor review of Grammarly</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Does Grammarly help for a resume?', a: 'Yes for typos, tense, agreement, punctuation. No for weak verbs, missing numbers, ATS formatting, JD alignment. Run it, but do not treat a clean Grammarly score as a finished resume.' },
            { q: 'Is Grammarly Premium worth it for resumes?', a: 'For resumes only, no. The Premium features (clarity, tone, rewrites) are prose-heavy and add little to bullet writing. If you also write cover letters, essays, or client emails, Premium earns its keep across that broader use.' },
            { q: 'Grammarly vs ChatGPT for resume: which is better?', a: 'Different jobs. Grammarly catches mechanical errors. ChatGPT (or Claude) restructures weak bullets and tailors content to a JD. Use both. Neither replaces the other.' },
            { q: 'Can Grammarly catch AI-sounding writing?', a: 'Partially. It flags some vague phrasing and filler. It will not catch the telltale rhythm or vocabulary of an LLM-drafted bullet. A human read-through does that better.' },
            { q: 'Is there a free alternative to Grammarly?', a: 'LanguageTool (free tier), Microsoft Editor inside Word, and the built-in Google Docs grammar check are all reasonable. None quite match Grammarly Free for UX, but all are serviceable.' },
            { q: 'Should I let Grammarly rewrite my bullets?', a: 'No. Grammarly rewrites smooth bullets into softer prose. Resume bullets should stay punchy, active, and quantified. Use Grammarly for fixes, not for rewrites.' },
            { q: 'Does Grammarly see my resume formatting?', a: 'No. It sees plain text. Margins, fonts, column layout, PDF parsing: all invisible to Grammarly. Use a separate ATS check for that.' },
            { q: 'How often should I run Grammarly on the resume?', a: 'Every time you edit for a new application. 60 seconds. The cost of one overlooked typo is higher than the cost of one more Grammarly pass.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Skip the proofing stack. Start with bullets that are already clean.</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz suggests action verbs, flags weak phrasing, and keeps tense consistent while you type. Fewer passes, fewer rewrites.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
