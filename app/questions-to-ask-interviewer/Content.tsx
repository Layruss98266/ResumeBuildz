'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const ROLE_QS = [
  'What does a typical first 90 days look like for this role?',
  'What are the 2 or 3 outcomes you would want to see by the end of month 6?',
  'Which part of the job description is most likely to shift in the first year?',
  'What has the last person in this role struggled with, and what did they do well?',
  'How is success measured for this role, and how often is that reviewed?',
  'Which cross-functional partners will this role work with most?',
  'Is the scope of the role fixed or is there room to grow it based on who you hire?',
];

const TEAM_QS = [
  'How is the team structured today and what is the hiring plan over the next 12 months?',
  'What does the team do well that you would not want to lose?',
  'Where does the team have the biggest skill gap right now?',
  'How do team members typically give feedback to each other?',
  'What is the meeting load like on a normal week?',
  'Can you tell me about a recent win the team celebrated?',
  'What is the seniority mix on the team and who would I work with most?',
];

const GROWTH_QS = [
  'What career paths have people in this role followed after 2 or 3 years?',
  'Is there a formal promotion cycle, and what does the bar look like?',
  'What learning or conference budget is available?',
  'How do you coach people who are ready for the next level?',
  'Are there opportunities to lead projects that stretch beyond the job description?',
  'How does the company support internal moves between teams?',
];

const COMPANY_QS = [
  'What is the single biggest opportunity the company is chasing this year?',
  'Where do you see the company in 3 years, and what has to go right to get there?',
  'How has the company strategy changed in the last 12 months?',
  'Who are the 2 or 3 competitors you watch most closely and why?',
  'What part of the business grew the fastest last quarter?',
  'How does leadership communicate decisions company-wide?',
];

const CULTURE_QS = [
  'How would you describe the way decisions get made here?',
  'What does a great week at the company look like for someone in this role?',
  'How does the team handle disagreement, especially across functions?',
  'What is one thing you would change about the culture if you could?',
  'How are remote, hybrid, and in-office folks kept on a level playing field?',
  'What rituals or traditions does the team enjoy?',
  'How does the company mark milestones, good or bad?',
];

const RED_FLAG_QS = [
  'Why did the last person in this role leave?',
  'How long has this role been open and how many candidates have you spoken with?',
  'What is employee tenure looking like on this team?',
  'Has the team had any recent reorganisations, and what drove them?',
  'How often does the company do layoffs or restructures?',
  'What does your attrition look like on this team over the last year?',
  'How has the leadership of this team changed in the last 18 months?',
];

const AVOID = [
  { q: 'What does your company do?', why: 'Signals zero prep. A 20-minute read of the website would answer this. Replace with a pointed question about their newest product line.' },
  { q: 'How much does this role pay?', why: 'Not at first-round. Salary lives with the recruiter or HR, not the hiring manager. Ask once you have an offer conversation or explicit compensation window.' },
  { q: 'Can I work from home every day?', why: 'Sounds transactional if asked before fit is established. Frame it as "How does the team balance in-office and remote collaboration?" instead.' },
  { q: 'When will I get promoted?', why: 'Implies you are leaving before you arrive. Reframe as "What career paths have people in this role followed after 2 or 3 years?"' },
  { q: 'Do you have any concerns about my candidacy?', why: 'Popular online, actually weak. It forces the interviewer into an awkward seat and rarely surfaces honest objections. Ask instead about what a strong first 90 days would look like.' },
];

const TOC = [
  { id: 'intro', label: 'Why this question matters more than you think' },
  { id: 'role', label: '7 questions about the role' },
  { id: 'team', label: '7 questions about the team' },
  { id: 'growth', label: '6 questions about growth' },
  { id: 'company', label: '6 questions about the company' },
  { id: 'culture', label: '7 questions about culture' },
  { id: 'redflags', label: '7 red-flag questions (ask carefully)' },
  { id: 'avoid', label: '5 questions to avoid' },
  { id: 'out-of-time', label: 'When the interviewer says we are out of time' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: '3-part present-past-future formula.', read: 13 },
  { title: 'Why Should We Hire You', slug: 'why-should-we-hire-you', excerpt: '3-pillar formula with 8 worked examples.', read: 12 },
  { title: 'STAR Method: 8 Full Examples', slug: 'star-method-examples', excerpt: 'Behavioural framework with industry stories.', read: 15 },
  { title: 'Technical Interview Prep', slug: 'technical-interview-prep', excerpt: 'DS&A, systems, behavioural cycles combined.', read: 14 },
];

export default function QuestionsToAskInterviewerPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="Questions to ask the interviewer"
      title="40 Questions to Ask the Interviewer (and 5 to Avoid)"
      subtitle="The closing question most candidates fumble. 40 field-tested questions across role, team, growth, company, culture, and red flags, plus what to do when the interviewer says you are out of time."
      dateModified="2026-06-02"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            &quot;Do you have any questions for us?&quot; is not a courtesy. It is a second interview disguised as a formality. What you ask signals seniority, prep, and how you will operate on the team. A weak &quot;no, I think you covered everything&quot; ends the loop on a soft note. A sharp question ends it on the note the interviewer writes in their scorecard.
          </p>
        </div>
        <p>
          Every hiring manager I have worked with remembers the last 5 minutes of the interview more vividly than the middle 40. Your closing questions are what they discuss in the debrief. The candidates who get offers almost always ask something that made the interviewer pause and think. That is the bar. Not a list of questions copied from a blog, but 2 or 3 sharp questions chosen for this company, this role, this interviewer. This guide gives you the raw material to build that shortlist.
        </p>
        <p className="mt-3">
          Pick 6 to 8 questions across categories before the interview. Ask 2 or 3 depending on time. Match the question to the interviewer: engineering leads get team and technical questions, HR gets process questions, the hiring manager gets role and growth questions, the skip-level gets company and strategy questions. Do not ask the same question of everyone.
        </p>
      </section>

      <section id="role" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7 questions about the role</h2>
        <p className="mb-3 text-gray-700">Best for the hiring manager. These signal you are thinking about outcomes, not tasks.</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {ROLE_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
      </section>

      <section id="team" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7 questions about the team</h2>
        <p className="mb-3 text-gray-700">Best for peers and the direct manager. Tells you who you will spend 8 hours a day with.</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {TEAM_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
      </section>

      <section id="growth" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6 questions about growth</h2>
        <p className="mb-3 text-gray-700">Best for the hiring manager and HR. Frame them as curiosity, not demand.</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {GROWTH_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
      </section>

      <section id="company" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">6 questions about the company</h2>
        <p className="mb-3 text-gray-700">Best for skip-level and executive interviewers. These are where you can signal strategic range.</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {COMPANY_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
      </section>

      <section id="culture" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7 questions about culture</h2>
        <p className="mb-3 text-gray-700">Best for peers, future team members, and HR. Avoid these with the CEO unless they specifically ask for it.</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {CULTURE_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
      </section>

      <section id="redflags" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">7 red-flag questions (ask carefully)</h2>
        <p className="mb-3 text-gray-700">
          These surface real data but can feel pointed. Ask 1, not 7. Pair them with a neutral tone and a follow-up that lets the interviewer breathe. If the answer is vague or defensive, that is itself the signal.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {RED_FLAG_QS.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>
        <p className="mt-3 text-gray-700">
          The most valuable of these is the first: why did the last person leave. A confident answer sounds like &quot;she was promoted into the staff role she wanted&quot; or &quot;he moved to a founder role.&quot; A concerning answer sounds like &quot;we had some fit issues&quot; with no further detail. Trust what you hear.
        </p>
      </section>

      <section id="avoid" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 questions to avoid</h2>
        <ul className="space-y-3">
          {AVOID.map((a, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{a.q}</p>
              <p className="text-sm text-gray-700">{a.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="out-of-time" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When the interviewer says we are out of time</h2>
        <p className="mb-3">
          It happens. A 45-minute slot runs 50 minutes, the calendar invite is hard-stopped, and the interviewer says &quot;I know we are at time, any quick questions?&quot; The worst response is &quot;no, you covered it.&quot; The second-worst is a 4-minute multi-part question. Here is a 3-step recovery that respects their time and keeps you in the running.
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li><strong>Acknowledge the time.</strong> &quot;Totally, I will keep it short.&quot; One sentence. Do not apologise for asking.</li>
          <li><strong>Ask one question, not three.</strong> The best quick question: &quot;What does the strongest version of the first 90 days look like in this role?&quot; It gives the interviewer an easy narrative and leaves you with concrete success criteria.</li>
          <li><strong>Ask process, then close.</strong> &quot;And just so I know, what are the next steps on your side?&quot; This gets you a timeline and an implicit commitment. Close with &quot;Thanks for the time, really enjoyed this conversation.&quot;</li>
        </ol>
        <p className="mt-3 text-gray-700">
          If they still have 2 minutes after that, they will often offer to stay a moment longer. If not, you have closed gracefully and with a signal of seniority.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2015/05/the-right-way-to-ask-questions-in-the-classroom" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on asking better questions</a></li>
          <li><a href="https://www.themuse.com/advice/51-interview-questions-you-should-be-asking" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse: questions you should be asking</a></li>
          <li><a href="https://www.linkedin.com/business/talent/blog/talent-acquisition/questions-candidates-should-ask" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn Talent Blog on candidate questions</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many questions should I ask?', a: '2 or 3 per interviewer in a 45-minute loop. 1 if time is tight. More than 4 starts to feel like you are running the interview.' },
            { q: 'Is it okay to ask the same question to different interviewers?', a: 'Yes, for questions like "what does success look like in this role." Hearing 3 different answers is data. But mix in fresh questions per interviewer so it does not sound rehearsed.' },
            { q: 'Can I write my questions down?', a: 'Yes. Bring a short list in a notebook or on paper. It signals preparation, not weakness. Do not read them word for word.' },
            { q: 'What if all my questions were already answered?', a: 'Pivot. "You touched on X earlier, I would love to go one level deeper: [specific follow-up]." Shows you listened and thought in real-time.' },
            { q: 'Should I ask about salary in the final round?', a: 'Only if the recruiter has not shared a band and the hiring manager brings it up first. Otherwise route compensation questions through HR or the recruiter.' },
            { q: 'Is it bad to ask about work-life balance?', a: 'No, but frame it well. "How do people on your team protect focus time?" is better than "do you work weekends?"' },
            { q: 'What question tends to leave the best impression?', a: 'Questions that show you are already thinking like someone on the team. "What is the trade-off the team is currently debating?" is one of the strongest closers in any round.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Your resume gets you in the room. Your questions close the loop.</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Build a resume that matches the role and walk into the final round with sharper questions than any other candidate.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
