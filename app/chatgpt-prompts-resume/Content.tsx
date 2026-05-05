'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const SUMMARY_PROMPTS = [
  { p: 'Write a 3-sentence resume summary for a [ROLE] with [X] years of experience. Focus on [TOP 2 SKILLS] and quantify at least one result. Tone: direct, no buzzwords.', w: 'Forces a quantified result and kills adjective bloat.' },
  { p: 'Rewrite this resume summary in plain language. Remove words like leverage, synergy, passionate, results-driven. Here is the summary: [PASTE].', w: 'Cleans AI-speak and cliches out of a summary you already wrote.' },
  { p: 'Write 3 alternative resume summaries for the same role: [ROLE]. Each should lead with a different angle (impact, skills, mission). Keep each under 60 words.', w: 'Gives variants to test against different job postings.' },
  { p: 'I am a [CURRENT ROLE] pivoting to [TARGET ROLE]. Write a resume summary that bridges the two, surfaces transferable skills, and signals the pivot intentionally.', w: 'Career-change specific. Output handles the pivot narrative cleanly.' },
  { p: 'Critique this resume summary for clarity, specificity, and recruiter appeal. Point out vague phrases. Here is the summary: [PASTE].', w: 'Turn ChatGPT into an editor before you rewrite.' },
  { p: 'Write a resume summary for a [ROLE] targeting [COMPANY TYPE: startup / enterprise / agency]. Match the tone and keywords that target companies use.', w: 'Tunes voice to audience. Startups want scrappy; enterprises want scale.' },
  { p: 'Convert this LinkedIn About section into a resume summary. Keep only the facts. Cut the personality text. Here is the section: [PASTE].', w: 'Recycles writing you already did on LinkedIn.' },
  { p: 'Write a resume summary that mentions: [SKILL 1], [SKILL 2], [OUTCOME]. 45 to 55 words. First person implied, never written.', w: 'Word-count constraint produces tighter output.' },
];

const BULLET_PROMPTS = [
  { p: 'Rewrite this resume bullet using the XYZ format (Accomplished X as measured by Y by doing Z). Original: [PASTE].', w: 'Forces quantification and mechanism in one pass.' },
  { p: 'Here are 5 of my resume bullets. Rewrite each to start with a strong action verb (no Responsible for, no Managed where a better verb exists). Bullets: [PASTE].', w: 'Action-verb pass in one shot.' },
  { p: 'Take this bullet and generate 3 variants at different quantification levels: one with a percentage, one with a dollar amount, one with a time saved metric. Original: [PASTE].', w: 'Helps when you have the result but not sure which framing lands best.' },
  { p: 'Audit this list of 8 resume bullets. Flag the weakest 3 (vague, unquantified, or passive). Explain why each is weak. Bullets: [PASTE].', w: 'Identifies bullets that need rewriting before you waste effort.' },
  { p: 'Rewrite this bullet to emphasize [LEADERSHIP / TECHNICAL DEPTH / BUSINESS IMPACT]. Keep the underlying facts identical. Original: [PASTE].', w: 'Re-angles one bullet for different target roles.' },
  { p: 'Compress this 25-word resume bullet to 15 words without losing the quantified result. Original: [PASTE].', w: 'Tightens bullets that are running over one line in the PDF.' },
  { p: 'This bullet describes a team achievement. Rewrite it so my specific contribution is clear. Original: [PASTE]. My role was: [YOUR PART].', w: 'Extracts personal credit from team-win bullets without overclaiming.' },
  { p: 'Generate 3 resume bullets for a [ROLE] who [DID WHAT]. Each bullet should highlight a different skill and include a plausible metric (mark invented numbers with PLACEHOLDER so I can verify).', w: 'Draft scaffolding. The PLACEHOLDER tag keeps you honest about made-up figures.' },
  { p: 'Rewrite this bullet in the STAR framework (Situation, Task, Action, Result) as a single sentence. Original: [PASTE].', w: 'Forces structure for behavioural-interview-friendly bullets.' },
];

const SKILL_PROMPTS = [
  { p: 'I am a [ROLE]. List 15 technical skills and 8 soft skills that are relevant for this role in 2026. Order by recruiter priority.', w: 'Baseline skill list to cross-reference against your own.' },
  { p: 'Group this list of skills into 4 categories (Languages, Frameworks, Tools, Methodologies). Remove duplicates. Skills: [PASTE].', w: 'Turns a messy list into a scannable Skills section.' },
  { p: 'Here is a job description: [PASTE]. Extract every technical skill and soft skill mentioned. Mark which skills appear more than once as PRIORITY.', w: 'Pulls keywords out of a JD without you re-reading it 3 times.' },
  { p: 'I have these skills: [LIST]. Which 5 are the most outdated for a [ROLE] in 2026? Recommend modern equivalents.', w: 'Flags skills that are hurting more than helping.' },
  { p: 'Write a Skills section for a [ROLE] resume. 4 categories. Each category has 4 to 6 items. No buzzwords like ninja, rockstar, or guru.', w: 'Ready-to-paste Skills block.' },
];

const CL_PROMPTS = [
  { p: 'Write a 250-word cover letter for this job: [PASTE JD]. My resume: [PASTE]. Tone: confident, no cliches, no Dear Hiring Manager (use role-specific opener).', w: 'Full cover letter draft. Review and personalize the opener.' },
  { p: 'Write the opening paragraph of a cover letter that does NOT start with I am writing to apply for. Make it specific to [COMPANY] and [ROLE].', w: 'Kills the most boring possible opener.' },
  { p: 'Shorten this cover letter to 200 words. Keep the strongest 2 achievements. Cut everything about passion. Original: [PASTE].', w: 'Most cover letters need to be half as long.' },
  { p: 'Match the tone of this job description in a cover letter. JD: [PASTE]. My 3 top achievements: [LIST].', w: 'Mirrors the employer voice (formal vs casual).' },
  { p: 'Write a cover letter that explains a gap (6 months between roles) without apologizing. My context: [EXPLAIN GAP BRIEFLY].', w: 'Gap framing without the usual defensive tone.' },
  { p: 'Write a cold email (not a cover letter) to a hiring manager at [COMPANY] about [ROLE]. 120 words. 1 specific hook about their recent work.', w: 'For referral paths, not application portals.' },
];

const TAILOR_PROMPTS = [
  { p: 'Here is my resume: [PASTE]. Here is a job description: [PASTE]. List the top 5 changes I should make to the resume to match this JD. No vague advice.', w: 'Concrete diff, not general advice.' },
  { p: 'Rewrite my resume summary to mirror the language in this job description. JD: [PASTE]. My summary: [PASTE].', w: 'Aligns vocabulary for ATS keyword matching.' },
  { p: 'Which 3 bullets in my Experience section are most relevant for this JD? Rank by fit and explain. Bullets: [PASTE]. JD: [PASTE].', w: 'Helps you reorder bullets by relevance, not chronology.' },
  { p: 'I am applying to [COMPANY SIZE: seed-stage / 200 person / Fortune 500]. Rewrite my bullets to match the scale expectations of that company.', w: 'Context-aware rewording. Startup scale reads differently from enterprise scale.' },
  { p: 'Generate a tailored Skills section for this JD using only skills from my master skill list. JD: [PASTE]. Master list: [PASTE]. Do not invent new skills.', w: 'Anti-hallucination guardrail on skill lists.' },
];

const JD_PROMPTS = [
  { p: 'Score this resume against this JD on a 1 to 10 scale for: keyword match, experience level, skill depth, quantification, and formatting. Give a weighted total and one fix for each low score. Resume: [PASTE]. JD: [PASTE].', w: 'Structured critique with actionable fixes.' },
  { p: 'Find 10 keywords from this JD that are missing from my resume. Suggest where each could be naturally inserted. JD: [PASTE]. Resume: [PASTE].', w: 'Keyword gap analysis without keyword stuffing.' },
  { p: 'Simulate an ATS scoring this resume against this JD. What percent match? What would cause a rejection? Resume: [PASTE]. JD: [PASTE].', w: 'Rough ATS sanity check (not a replacement for real ATS tools).' },
  { p: 'What are the 3 most likely interview questions a recruiter would ask based on this resume + JD pair? Resume: [PASTE]. JD: [PASTE].', w: 'Preps you for the phone screen as you finalize the resume.' },
  { p: 'Rewrite my resume headline to contain these 3 JD keywords naturally: [KW1, KW2, KW3]. Original headline: [PASTE].', w: 'Keyword injection with a surgical scope (headline only).' },
  { p: 'Extract the seniority signals from this JD (years of experience, scope of ownership, team size). Then tell me if my resume signals match or fall short. JD: [PASTE]. Resume: [PASTE].', w: 'Calibrates fit beyond keyword matching.' },
  { p: 'List the soft skills implied (not written) in this JD. For each, suggest a resume bullet that demonstrates it. JD: [PASTE].', w: 'Reads between the lines of a JD.' },
];

const TIPS = [
  { t: 'Feed context before asking for output', d: 'Paste your role, years of experience, target industry, and 2 recent achievements at the start of every conversation. Thin context produces generic output.' },
  { t: 'Ask for 3 variants, not 1', d: 'One bullet is a data point. Three variants is a sample. The best one is almost never the first draft.' },
  { t: 'Check for hallucinated metrics', d: 'ChatGPT will invent numbers (increased revenue 34 percent) that sound plausible. Mark placeholders explicitly in your prompt and verify every metric against your actual data.' },
  { t: 'Use follow-up refinement, not one-shot prompts', d: 'First prompt: draft. Second: critique your own draft. Third: rewrite based on critique. Three-turn conversations beat single prompts.' },
  { t: 'Never paste confidential work info', d: 'Treat every prompt as if it might train the next model. Sanitize client names, internal metrics, and anything under NDA before pasting.' },
];

const TOC = [
  { id: 'intro', label: 'Why prompts matter' },
  { id: 'summary', label: 'Summary prompts (8)' },
  { id: 'bullets', label: 'Bullet rewrite prompts (9)' },
  { id: 'skills', label: 'Skills prompts (5)' },
  { id: 'cover-letter', label: 'Cover letter prompts (6)' },
  { id: 'tailor', label: 'Tailoring prompts (5)' },
  { id: 'jd', label: 'JD matching prompts (7)' },
  { id: 'tips', label: '5 tips for better outputs' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'AI Resume Builders Tested (2026)', slug: 'ai-resume-builders-tested', excerpt: 'Which AI tools actually help vs which produce slop.', read: 13 },
  { title: 'How to Tailor a Resume to a Job Description', slug: 'tailor-resume', excerpt: 'Keyword alignment without keyword stuffing.', read: 10 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Put numbers on bullets even when you think you cannot.', read: 9 },
  { title: 'Resume Action Verbs (200+)', slug: 'resume-action-verbs', excerpt: 'Stronger verbs by function and seniority.', read: 7 },
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '40+ summaries by role and experience level.', read: 9 },
];

export default function ChatGPTPromptsResumePage() {
  const { openGateway } = useLoginGateway();

  const renderPrompts = (arr: { p: string; w: string }[]) => (
    <div className="space-y-4">
      {arr.map((x, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded mb-2 font-mono text-gray-800">{x.p}</pre>
          <p className="text-sm text-gray-600"><strong>Why it works:</strong> {x.w}</p>
        </div>
      ))}
    </div>
  );

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="ChatGPT prompts for resume"
      title="50 ChatGPT Prompts for Resume Writing (2026)"
      subtitle="Copy-paste prompts grouped by task: summary, bullet rewrites, skills, cover letter, tailoring, and JD matching. Each prompt has a 1-line note on why it works."
      dateModified="2026-06-16"
      readingTime={14}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why prompts matter</p>
          <p className="text-gray-700">
            ChatGPT is a junior writer with no context. Your prompt is the brief. A vague brief produces generic resume bullets that every other candidate also has. A precise brief produces bullets that sound like you, hit the JD keywords, and quantify real outcomes. These 50 prompts give you the precision without the guesswork.
          </p>
        </div>
        <p>
          Most people use ChatGPT for resumes in the laziest possible way: paste resume, ask to improve it, accept whatever comes back. The output is almost always worse than the original: buzzword-loaded, emotionally flat, occasionally inventing metrics that never existed. The problem is not the model. It is the prompt.
        </p>
        <p className="mt-3">
          A good prompt does three things. It gives the model enough context (role, experience, industry). It constrains the output (word count, tone, format). It asks for variants, not a single answer. Every prompt below is built on those three pillars. Swap in your own details where you see [BRACKETS] and run it.
        </p>
      </section>

      <section id="summary" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Resume summary prompts (8)</h2>
        <p className="mb-5 text-gray-700">The summary is the first 40 words a recruiter reads. It sets the frame for everything below. These prompts draft, critique, and tune summaries for different angles.</p>
        {renderPrompts(SUMMARY_PROMPTS)}
      </section>

      <section id="bullets" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Bullet rewrite prompts (9)</h2>
        <p className="mb-5 text-gray-700">Bullets are where resumes live or die. Every prompt here targets a specific weakness: weak verbs, missing metrics, team-vs-individual credit, bullet compression.</p>
        {renderPrompts(BULLET_PROMPTS)}
      </section>

      <section id="skills" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Skills section prompts (5)</h2>
        <p className="mb-5 text-gray-700">Skills are easy to bloat. These prompts build tight, categorized skill blocks that match the JD without becoming a keyword dump.</p>
        {renderPrompts(SKILL_PROMPTS)}
      </section>

      <section id="cover-letter" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Cover letter prompts (6)</h2>
        <p className="mb-5 text-gray-700">Most AI-generated cover letters read like mail merges. These prompts force specificity, kill the standard opener, and keep word count disciplined.</p>
        {renderPrompts(CL_PROMPTS)}
      </section>

      <section id="tailor" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Resume tailoring prompts (5)</h2>
        <p className="mb-5 text-gray-700">Tailoring is about producing a variant of your resume that ranks higher for a specific JD without rewriting everything. These prompts surface the minimum edits that move the needle.</p>
        {renderPrompts(TAILOR_PROMPTS)}
      </section>

      <section id="jd" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">JD matching prompts (7)</h2>
        <p className="mb-5 text-gray-700">These prompts treat the JD as a scoring rubric. They find keyword gaps, seniority mismatches, and implied soft skills that your resume should echo.</p>
        {renderPrompts(JD_PROMPTS)}
      </section>

      <section id="tips" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 tips for better outputs</h2>
        <div className="space-y-3">
          {TIPS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{t.t}</p>
              <p className="text-sm text-gray-700">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://platform.openai.com/docs/guides/prompt-engineering" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">OpenAI prompt engineering guide</a></li>
          <li><a href="https://hbr.org/2023/06/ai-prompt-engineering-isnt-the-future" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on prompt quality</a></li>
          <li><a href="https://www.nngroup.com/articles/ai-resume-writing/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Nielsen Norman Group on AI and resume writing</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Will recruiters know my resume was written with ChatGPT?', a: 'If you paste output verbatim, yes. The tells are generic verbs (leveraged, utilized), rule-of-three lists everywhere, and zero specificity. Edit heavily. Use ChatGPT as a first-draft co-writer, not a publisher.' },
            { q: 'Is it OK to use ChatGPT for a resume if it invents metrics?', a: 'No. Any invented number is resume fraud, even if it sounds plausible. Use the PLACEHOLDER tag in your prompt so invented values are flagged, and replace each one with a real number before submitting.' },
            { q: 'Which model works best for resumes, GPT-4 or GPT-5 or Claude?', a: 'Any frontier model from 2025 or later works. GPT-5 and Claude 4 give tighter outputs with less buzzword bloat. The prompt matters more than the model.' },
            { q: 'Should I paste my entire resume into ChatGPT?', a: 'Redact employer names and personal identifiers first. Treat the chat as if it could be logged. OpenAI has enterprise privacy controls but consumer tier does not guarantee the same.' },
            { q: 'How long should each ChatGPT session be when writing a resume?', a: '3 to 5 turns of refinement beats 1 long prompt. Draft, critique, rewrite, tighten, done. After that, returns diminish.' },
            { q: 'Can I use ChatGPT to write the entire resume from scratch?', a: 'You can, but the output will feel hollow. ChatGPT does not know your real projects, teams, or outcomes. It fills the gap with generic prose. Always feed real context first.' },
            { q: 'Does using ChatGPT hurt ATS scoring?', a: 'No. ATS does not detect AI authorship. It scores keywords, format, and section structure. ChatGPT-written resumes pass ATS the same as human-written ones, assuming good formatting.' },
            { q: 'What is the single best prompt on this list?', a: 'The JD scoring prompt in the JD Matching section. It surfaces the exact gaps between your resume and a target job in one pass. Start there before rewriting anything.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Skip the prompting. Let the builder do it.</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz has AI rewriting and JD matching built in. Paste the job, upload your draft, get a tailored resume in minutes. No prompt engineering needed.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
