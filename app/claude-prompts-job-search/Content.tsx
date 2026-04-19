'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const RESUME_PROMPTS = [
  { n: 1, label: 'Rewrite a weak bullet', prompt: 'Here is a bullet from my resume: "Responsible for handling customer queries." Rewrite it using the Action + Context + Result pattern. Keep it under 22 words. If a number is missing, ask me one targeted question before rewriting; do not invent metrics.' },
  { n: 2, label: 'Polish a summary', prompt: 'Below is my 3-line resume summary. Keep the facts exactly as stated, but tighten the prose, remove filler, and ensure each sentence adds a new claim (role, proof, direction). Output the final version only, then a one-line list of what you changed.' },
  { n: 3, label: 'Tailor to a JD', prompt: 'I will paste a job description and then my current resume. Return a table with 3 columns: JD requirement, closest match on my resume, suggested edit. Do not fabricate experience; if a requirement has no match, say "gap" in column 2.' },
  { n: 4, label: 'Skill coverage audit', prompt: 'Read my resume (pasted below). List skills the resume claims explicitly, skills it implies but does not state, and skills absent. Flag any skill that appears in the summary but is not evidenced in any bullet.' },
  { n: 5, label: 'ATS keyword gap', prompt: 'Compare the JD and my resume. Return 3 lists: (a) exact keywords in both, (b) JD keywords missing from my resume that I could honestly add, (c) JD keywords I should not add because they are outside my real experience.' },
];

const COVER_PROMPTS = [
  { n: 6, label: 'Cover letter draft with voice', prompt: 'Write a 250-word cover letter for the role pasted below. Voice: warm, direct, specific. No openings like "I am writing to." Open with a sentence that shows I understand a specific problem the team has. Include one concrete proof from my resume. Close with a 1-sentence ask.' },
  { n: 7, label: 'Cover letter from resume', prompt: 'Here is my resume and the JD. Draft a cover letter that does not repeat the resume. Pick the single strongest proof that maps to the top JD requirement and expand that story. Everything else is context.' },
  { n: 8, label: 'Shorten without losing signal', prompt: 'Cut my cover letter to 180 words. Preserve the opening hook, the one proof, and the ask. Remove every hedging phrase ("I believe," "I think," "I feel"). Show before and after word count.' },
  { n: 9, label: 'Tone match to company', prompt: 'The company culture page reads [paste]. The JD reads [paste]. Rewrite the tone of my draft cover letter to match that voice without changing the facts. Output the rewrite only.' },
  { n: 10, label: 'Why this company, honestly', prompt: 'I am interested in this company because [reason]. Rewrite that into a 2-sentence paragraph for my cover letter that sounds genuine, not rehearsed. Avoid the words "passionate," "excited," and "thrilled."' },
];

const INTERVIEW_PROMPTS = [
  { n: 11, label: 'Mock interview (behavioural)', prompt: 'Act as a senior engineering manager interviewing me for [role]. Ask one behavioural question at a time, wait for my answer, then grade it using STAR on a 1 to 5 scale with a single reason. Start with "Tell me about a time you disagreed with a teammate."' },
  { n: 12, label: 'STAR story drafting', prompt: 'I have a story: [paste]. Structure it in STAR (Situation, Task, Action, Result). Keep each section to 2 sentences maximum. Flag if the Result has no number, and ask me for one.' },
  { n: 13, label: 'Pressure-test my answer', prompt: 'Here is my answer to "Tell me about yourself": [paste]. Attack it. What would a skeptical interviewer probe? List the 5 most likely follow-up questions and the weakest sentence in my answer.' },
  { n: 14, label: 'Technical concept check', prompt: 'I have an interview for [role]. Quiz me on [topic: eg, database indexing]. Ask me 5 questions, one at a time, increasing in difficulty. Grade each answer. After all 5, rank my weakest area and suggest one resource.' },
  { n: 15, label: 'Reverse interview questions', prompt: 'I am interviewing at [company] for [role]. Draft 6 questions I should ask the panel. 2 for the hiring manager, 2 for a peer engineer, 2 for the skip-level. Avoid generic questions; each should signal I have done my research.' },
];

const NEGOTIATION_PROMPTS = [
  { n: 16, label: 'Counter-offer script', prompt: 'I received [offer: 18 LPA base]. My target is 22 LPA. Draft an email counter that anchors on market data, names one comparable offer if I have one, and leaves space for them to respond. Tone: warm, confident, unapologetic.' },
  { n: 17, label: 'Handle "What are your expectations?"', prompt: 'Recruiter asked for my expected salary. My research says the band is 20 to 28 LPA. Draft 3 response options: (a) deflect to band, (b) name my number with justification, (c) ask for their budget. Explain when to use each.' },
  { n: 18, label: 'Non-cash asks', prompt: 'The comp is capped but they want me. List 10 non-cash items I could negotiate (eg, sign-on bonus, stock refresh, remote days, title). Rank by typical flexibility. Draft how to ask for the top 3.' },
  { n: 19, label: 'Multi-offer leverage', prompt: 'I have 2 offers: [A: 20 LPA, dream role] and [B: 26 LPA, decent role]. Help me draft an email to A that uses B as honest leverage without sounding transactional. The goal is to close the gap, not to play them.' },
  { n: 20, label: 'Decline without burning bridges', prompt: 'I am declining this offer because I took another role. Draft a short, warm decline email that keeps the door open for future roles. No false reasons; be direct but gracious. Under 100 words.' },
];

const LINKEDIN_PROMPTS = [
  { n: 21, label: 'Rewrite my headline', prompt: 'My current LinkedIn headline is [paste]. My target roles are [list]. Rewrite it in 3 variants: (a) keyword-heavy, (b) value-proposition, (c) personality-led. Explain which best fits recruiter search vs founder DMs.' },
  { n: 22, label: 'About section from resume', prompt: 'Using only the facts in the resume I just pasted, write a LinkedIn About section in first person. 3 paragraphs: what I do, the shape of my experience, what I am looking for. Use "I" without ever starting a sentence with it more than twice.' },
  { n: 23, label: 'Experience bullet refresh', prompt: 'Here is my current LinkedIn Experience entry for [role]. Rewrite each bullet to be slightly more narrative than a resume bullet. Keep the numbers, but one or two bullets can read as short stories. Under 400 characters each.' },
  { n: 24, label: 'Post to announce a job search', prompt: 'I am opening up to new roles. Draft a LinkedIn post: 1 hook line, a short context paragraph, 3 bullets of what I am looking for, and a call to action. No hashtags spam; max 3. Tone: direct, not desperate.' },
  { n: 25, label: 'Engagement without cringe', prompt: 'I want to comment thoughtfully on posts from recruiters in [industry]. Give me 5 comment templates that add a real perspective rather than "Great post!" Each should be 2 to 3 sentences and invite reply.' },
];

const OUTREACH_PROMPTS = [
  { n: 26, label: 'Cold email to hiring manager', prompt: 'I found a role at [company]. Draft a 120-word cold email to the hiring manager. Subject line that is specific, not clickbait. Open with a line that shows I researched their work. One proof from my resume. A low-friction ask.' },
  { n: 27, label: 'Referral ask, warm', prompt: 'I know [person] loosely from [context]. I want to ask for a referral to [role at company]. Draft a short message (under 90 words) that respects their time, makes the ask clear, and gives them an easy out.' },
  { n: 28, label: 'Follow-up after no reply', prompt: 'I emailed [contact] 7 days ago about [role]. No reply. Draft a single 60-word follow-up that adds one new piece of value (a relevant project I shipped, a question, or a small piece of research). No guilt trips.' },
  { n: 29, label: 'Recruiter InMail reply', prompt: 'A recruiter sent me this InMail: [paste]. I am open but want to qualify before investing time. Draft a 5-line reply that thanks them, asks 3 clarifying questions (comp band, location, stage), and signals real interest without over-committing.' },
  { n: 30, label: 'Networking coffee request', prompt: 'I want a 20-minute coffee with [person] at [company]. I am not asking for a job. Draft a message that makes clear I want to learn about their path. Offer 3 time slots. Under 100 words.' },
];

const TOC = [
  { id: 'intro', label: 'Why Claude for job search' },
  { id: 'context', label: 'How to pass context to Claude' },
  { id: 'resume', label: 'Resume prompts (1 to 5)' },
  { id: 'cover', label: 'Cover letter prompts (6 to 10)' },
  { id: 'interview', label: 'Interview prep prompts (11 to 15)' },
  { id: 'negotiation', label: 'Negotiation prompts (16 to 20)' },
  { id: 'linkedin', label: 'LinkedIn prompts (21 to 25)' },
  { id: 'outreach', label: 'Outreach prompts (26 to 30)' },
  { id: 'claude-vs-chatgpt', label: 'Claude vs ChatGPT for job hunting' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Interview Questions and Answers', slug: 'interview-questions-and-answers', excerpt: '40 common interview questions with strong answers.', read: 14 },
  { title: 'Tell Me About Yourself', slug: 'tell-me-about-yourself', excerpt: 'The 60-second answer that opens every interview.', read: 9 },
  { title: 'AI Resume Builders Tested', slug: 'ai-resume-builders-tested', excerpt: 'Honest review of AI resume tools in 2026.', read: 11 },
  { title: 'Cover Letter Guide', slug: 'cover-letter', excerpt: 'Structure, openings, and closings that land.', read: 10 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: 'Job-specific edits in under 20 minutes.', read: 9 },
];

function PromptBlock({ items }: { items: { n: number; label: string; prompt: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((p) => (
        <div key={p.n} className="border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-gray-900 mb-1">{p.n}. {p.label}</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">{p.prompt}</p>
        </div>
      ))}
    </div>
  );
}

export default function ClaudePromptsJobSearchPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="Claude prompts for job search"
      title="30 Claude Prompts for Job Search (2026)"
      subtitle="Claude is strong at nuance work: voice, restraint, pushback. These 30 prompts cover resume polish, cover letter drafting, mock interviews, negotiation, LinkedIn, and outreach. Copy, paste, adapt."
      dateModified="2026-06-23"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Most job-search AI output reads like bad catalog copy: inflated verbs, invented metrics, empty adjectives. Claude, out of the box, resists that a bit more than most models. It pushes back when a prompt asks it to lie, it holds voice better on longer drafts, and it is willing to ask clarifying questions. That makes it a good tool for the parts of job search where nuance matters most: summaries, cover letters, mock interviews, and salary conversations.
          </p>
        </div>
        <p>
          This guide is a collection of 30 prompts you can paste into Claude and adapt in under a minute. They are grouped into 6 categories: resume, cover letter, interview prep, negotiation, LinkedIn, and outreach. Each prompt is structured so Claude has a clear role, clear inputs, and a clear output format. That structure is what separates a useful reply from generic slop.
        </p>
        <p className="mt-3">
          You do not need a paid account to get value from most of these. The free tier of Claude.ai handles all 30 prompts in this guide. If you are using Claude inside a builder (Cursor, Zed, Claude Code), the same prompts work, though you may need to paste your resume or JD once at the top of the conversation.
        </p>
      </section>

      <section id="context" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to pass context to Claude</h2>
        <p className="mb-3">
          The single biggest mistake people make with AI for job search is dumping a resume and a JD and saying "help me." The output reflects the input. Claude does better with structure. A few rules of thumb:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Paste the full JD, not a summary.</strong> A summary loses the exact phrasing recruiters and ATS care about.</li>
          <li><strong>Paste your resume as plain text, not a PDF link.</strong> Claude cannot browse your Dropbox; paste the content.</li>
          <li><strong>State the role and seniority up front.</strong> "I am applying for a Senior Backend Engineer role at a Series B fintech" sharpens every reply.</li>
          <li><strong>Name the output format.</strong> "Return a 3-column table" or "Return 180 words only" constrains Claude into something you can actually use.</li>
          <li><strong>Ask it to flag gaps.</strong> Say "Do not invent metrics; if a number is missing, ask me before filling in." This keeps output honest.</li>
        </ul>
        <p className="mt-3">
          A sensible opener for any Claude job-search conversation: "I am [role, YOE]. Target role: [paste JD]. My current resume: [paste]. I will ask specific questions. Do not add fabricated numbers; if a claim needs a number I have not given, ask me."
        </p>
      </section>

      <section id="resume" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Resume prompts (1 to 5)</h2>
        <p className="mb-4 text-sm text-gray-700">Use these after you have a draft resume. Claude is better at refining than at writing from zero.</p>
        <PromptBlock items={RESUME_PROMPTS} />
      </section>

      <section id="cover" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Cover letter prompts (6 to 10)</h2>
        <p className="mb-4 text-sm text-gray-700">This is where Claude earns its keep. Voice and restraint matter more than keywords, and Claude tends to produce less generic prose than competing models when prompted well.</p>
        <PromptBlock items={COVER_PROMPTS} />
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Interview prep prompts (11 to 15)</h2>
        <p className="mb-4 text-sm text-gray-700">Claude will hold a back-and-forth mock interview without breaking character. Use voice dictation on your phone if you want to rehearse speaking the answers.</p>
        <PromptBlock items={INTERVIEW_PROMPTS} />
      </section>

      <section id="negotiation" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Negotiation prompts (16 to 20)</h2>
        <p className="mb-4 text-sm text-gray-700">Salary conversations are where people freeze. Draft the email in Claude first; you will send something 2 notches more confident than what you would have typed cold.</p>
        <PromptBlock items={NEGOTIATION_PROMPTS} />
      </section>

      <section id="linkedin" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">LinkedIn prompts (21 to 25)</h2>
        <PromptBlock items={LINKEDIN_PROMPTS} />
      </section>

      <section id="outreach" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Outreach prompts (26 to 30)</h2>
        <p className="mb-4 text-sm text-gray-700">Cold email is a numbers game, but the opening line decides whether you are in the game at all. Keep every message specific.</p>
        <PromptBlock items={OUTREACH_PROMPTS} />
      </section>

      <section id="claude-vs-chatgpt" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Claude vs ChatGPT for job hunting</h2>
        <p className="mb-3">
          Both work. The differences are at the margins, and those margins matter for nuanced writing.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Voice consistency.</strong> Claude tends to hold a tone (warm, direct, formal) across a long draft. ChatGPT drifts toward its default cheerful register unless you re-anchor.</li>
          <li><strong>Honest gaps.</strong> Claude is more willing to say "I do not have enough information; what is the number?" rather than invent one. You still have to prompt for it.</li>
          <li><strong>Pushback.</strong> When you ask Claude to review a flawed plan, it will disagree more readily. Useful for negotiation strategy, not useful if you want cheerleading.</li>
          <li><strong>Speed and tools.</strong> ChatGPT wins on integrations (images, code execution) out of the box. Claude catches up via projects and artifacts.</li>
        </ul>
        <p className="mt-3">For resume and cover letter work specifically, most people who try both prefer Claude output. For research-heavy tasks (company teardowns, market comps), ChatGPT with web browsing is still the faster default.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.anthropic.com/news/prompting-long-context" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Anthropic on prompting long context</a></li>
          <li><a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Anthropic prompt engineering guide</a></li>
          <li><a href="https://hbr.org/2023/09/ai-prompt-engineering-isnt-the-future" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on AI prompting in knowledge work</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Do I need a paid Claude account for these prompts?', a: 'No. The free tier handles all 30. You may hit a daily limit on heavy mock-interview sessions; split them across days or upgrade.' },
            { q: 'Can Claude see my PDF resume?', a: 'On Claude.ai Pro you can upload PDFs; on free you may need to paste the text. Either way, paste plain text works best for editing prompts.' },
            { q: 'Is it safe to share my resume with Claude?', a: 'Treat anything you paste as logged by the provider. Redact salary, personal ID numbers, and private contact info if you are unsure.' },
            { q: 'How do I stop Claude from inventing metrics?', a: 'Add the sentence "Do not fabricate numbers. If a claim needs data I have not provided, ask me one question." to every prompt.' },
            { q: 'Does Claude write in first or third person for resumes?', a: 'Neither, by convention. Resume bullets are in implied first-person with verbs up front ("Led," "Built"). Claude follows this when the prompt shows an example.' },
            { q: 'How do I make Claude sound less like AI?', a: 'Ask for short sentences, concrete nouns, no hedges ("I believe," "I think"), and no adjective stacks. Give it a 3-sentence sample of your real writing as a voice anchor.' },
            { q: 'Can I use Claude for technical interviews?', a: 'Yes, for concept quizzing and explanation. For live coding, prefer a dedicated platform; Claude is not the target environment you will be evaluated in.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Skip the prompt engineering</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz applies the same quality bar these prompts aim for: no invented numbers, no fluff, clean ATS-ready output. Built-in.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
