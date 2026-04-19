'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const EXAMPLES = [
  { role: 'Fresher, Software Engineering', weak: 'Because I am hardworking, a fast learner, and I really want this job.', strong: 'You need a backend hire who can be productive in week 1 on your Spring Boot stack. I have 2 yrs of Spring Boot work on a college team plus 3 shipped projects with test coverage above 80 percent. I have also debugged similar performance bottlenecks to the one you mentioned on the careers page, so ramp time will be short.' },
  { role: 'Mid-career PM', weak: 'I have strong product skills and I work well with engineering.', strong: 'You are rebuilding the onboarding flow and your retention metric is down 12 percent YoY. I rebuilt Swiggy Dineout onboarding last year and took day-7 retention from 23 to 41 percent through 3 A/B-tested iterations. I can bring that playbook straight over.' },
  { role: 'Senior IC to Manager transition', weak: 'I have both strong IC and management skills.', strong: 'You are hiring a player-coach manager for a 6-person team that needs both ramp on the new payments stack and mentorship. I was Staff IC at Razorpay for 3 yrs on the same stack, and spent the last 18 months informally mentoring 4 senior engineers through promotion. I can do both roles on day 1 without needing to pick.' },
  { role: 'Career changer', weak: 'I am passionate about this field and willing to learn.', strong: 'You need an MLE who understands finance domain, which most ML candidates do not. I spent 5 years on the M&A desk at Morgan Stanley and 14 months shipping production ML at 3 fintech startups. The intersection is rare and exactly what your fraud detection team needs.' },
  { role: 'Returning after break', weak: 'I took time off but I am ready to come back now.', strong: 'You need a PM who can own a late-stage product with complex stakeholders. Before my 22-month caregiving break I scaled reorder rate at Swiggy Instamart. During the break I shipped 2 side projects (one at 3k DAU) and mentored 4 founders. I have the scale experience and fresh execution reps.' },
  { role: 'Laid-off candidate', weak: 'I was laid off but it was not performance related.', strong: 'You need a Senior Designer who has shipped social-graph UX at scale. I led Spaces post-launch at Twitter and grew DAU 3.2x. Since the layoff I have been shipping my own SaaS (1,200 signups). I bring the large-scale playbook and the scrappy side-project velocity.' },
  { role: 'Over-50 re-entry', weak: 'I have decades of experience and bring maturity.', strong: 'You need an Ops Director who has scaled a Q-commerce supply chain. I ran BigBasket ops through a 40x GMV phase and I bring the exact muscle memory of that scale, plus modern tooling (Looker, Notion). My last 3 years running an NGO taught me to do more with less, which matches your early stage.' },
  { role: 'Executive / C-suite', weak: 'I am a proven leader with a track record of driving results.', strong: 'You need a COO who has scaled across 4 markets. I scaled Neobank-X from 180 to 1,100 people in India, UAE, Singapore, Indonesia while growing ARR 23x and holding runway above 18 months. I can compress your next 3-year operating plan into 18 months.' },
];

const PILLARS = [
  { name: 'Problem', detail: 'Name the biggest problem this role is hired to solve. Pull it from the JD or your research (earnings calls, blog, Linkedin of the team). Specific problem = signals you did your homework.' },
  { name: 'Proof', detail: 'Your closest past win that solved the same or adjacent problem. 1 sentence with a number. Not a list of credentials, one laser-focused proof point.' },
  { name: 'Compounding', detail: 'The non-obvious value you will keep generating in months 6, 12, 24. A skill intersection, a network, a depth of domain the next hire will not have.' },
];

const MISTAKES = [
  { m: 'Generic adjectives (hardworking, passionate, dedicated)', fix: 'Every other candidate uses the same words. Replace with a shipped outcome.' },
  { m: 'Repeating the resume top to bottom', fix: 'The interviewer already read it. Pick 2 highlights, not 12 line-items.' },
  { m: 'Overclaiming fit', fix: 'Do not say I am perfect for this role. Show the fit with specifics and let the interviewer conclude.' },
  { m: 'Forgetting to name the problem', fix: 'Without naming the problem, your answer sounds like a self-pitch rather than a role-pitch.' },
  { m: 'Going long', fix: '60 to 90 seconds. Over 2 minutes the interviewer has stopped tracking.' },
  { m: 'Skipping the Compounding beat', fix: 'This is what separates strong candidates from competent ones. It is why they should hire you over the next person.' },
];

const TOC = [
  { id: 'intro', label: 'What the question actually asks' },
  { id: 'pillars', label: 'The 3-pillar formula (Problem, Proof, Compounding)' },
  { id: 'timing', label: 'How long your answer should be' },
  { id: 'examples', label: '8 examples by role / stage' },
  { id: 'mistakes', label: '6 mistakes that kill the answer' },
  { id: 'rehearse', label: 'How to rehearse' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: '3-part present-past-future formula.', read: 13 },
  { title: 'STAR Method: 8 Full Examples', slug: 'star-method-examples', excerpt: 'Behavioural framework with industry-specific stories.', read: 15 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: '4-part structure + 6 industry templates.', read: 8 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by career stage + industry.', read: 14 },
];

export default function WhyShouldWeHireYouPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Interviews & Cover Letters"
      breadcrumbCurrent="Why should we hire you"
      title={'How to Answer "Why Should We Hire You" (8 Examples)'}
      subtitle="The 3-pillar formula (Problem, Proof, Compounding), 8 worked examples from fresher to executive, the 6 answer-killing mistakes, and how to rehearse without sounding robotic."
      dateModified="2026-05-12"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">What this question actually asks</p>
          <p className="text-gray-700">
            Why should we hire you is the question every interview ends on. Underneath the casual phrasing, the interviewer is asking: what unique value do you bring to this specific problem, proven by at least one past win, that the next candidate in the pipeline cannot match. A strong answer is 60 to 90 seconds and hits three pillars: the Problem, your Proof, and your Compounding value.
          </p>
        </div>
        <p>
          Candidates treat this question as an invitation to self-flatter. That is exactly why most answers fail. A great answer is a 90-second pitch for the role, not for yourself. You name the specific problem the role solves, you show one concrete piece of proof that you have solved it before, and you close with a forward-looking sentence about the value you will keep generating over time.
        </p>
      </section>

      <section id="pillars" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 3-pillar formula: Problem, Proof, Compounding</h2>
        <div className="space-y-4">
          {PILLARS.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2"><span className="text-indigo-600 mr-2">{i + 1}.</span>{p.name}</p>
              <p className="text-sm text-gray-700">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="timing" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How long should your answer be?</h2>
        <p>60 to 90 seconds. Under 40 seconds reads as low-effort. Over 2 minutes the interviewer has stopped tracking. Use three sentences, one per pillar, with enough breath between them that each one lands. Practise it out loud. Time it.</p>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 examples by role / stage</h2>
        <p className="mb-5">Each shows a weak default version first, then the strong rewrite using the 3-pillar formula. Note how the strong versions always name a specific problem.</p>
        <div className="space-y-5">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">{ex.role}</p>
              <div className="space-y-2">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r text-sm text-gray-800"><p className="text-xs font-semibold text-red-700 mb-1">Weak</p><p>{ex.weak}</p></div>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r text-sm text-gray-800"><p className="text-xs font-semibold text-emerald-700 mb-1">Strong</p><p>{ex.strong}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 mistakes that kill the answer</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">{m.m}</p><p className="text-sm text-gray-700">{m.fix}</p></li>
          ))}
        </ul>
      </section>

      <section id="rehearse" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to rehearse</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Research the problem first.</strong> Read the JD, last 2 earnings or funding announcements, and 3 LinkedIn profiles of the team. Name the single biggest problem the role exists to solve.</li>
          <li><strong>Pick 1 proof point.</strong> The past win that most directly addresses that problem. One sentence with one number.</li>
          <li><strong>Write the Compounding sentence.</strong> What keeps generating value in month 6, 12, 24. A skill intersection or domain depth.</li>
          <li><strong>Rehearse 5 times aloud.</strong> Not 50. Over-rehearsed answers sound scripted.</li>
          <li><strong>Record yourself once.</strong> Play it back. If you are using adjectives more than numbers, rewrite.</li>
        </ol>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2021/09/how-to-answer-why-should-we-hire-you" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on answering Why should we hire you</a></li>
          <li><a href="https://www.amazon.jobs/en/principles" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Amazon Leadership Principles</a> for the Ownership and Deliver Results behaviours this question probes.</li>
          <li><a href="https://www.themuse.com/advice/why-should-we-hire-you" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse interview guide</a> with additional worked examples.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is this the same as Why do you want this role?', a: 'Related but different. Why do you want this role focuses on your motivation; Why should we hire you focuses on your value. Both can draw on the same research but the answers should be distinct.' },
            { q: 'What if I cannot name a specific problem the role solves?', a: 'Do more research. If you cannot name one, you have not done enough prep. Earnings calls, blog, LinkedIn profiles of the team, and the JD together give you the problem.' },
            { q: 'Should I mention competitors?', a: 'Sparingly. One reference to a competitor win can be powerful; constant comparisons read as off-topic.' },
            { q: 'How do I handle this as a fresher with no real work history?', a: 'Substitute Proof with your strongest project or internship plus a number. Freshers can win this question by naming the problem more sharply than experienced candidates who lean on generic credentials.' },
            { q: 'What if the interviewer interrupts me mid-answer?', a: 'Finish the current sentence, then pause. Do not rush through all three pillars under pressure. If you only got one pillar out, the interviewer is usually happy.' },
            { q: 'Can I memorise this word-for-word?', a: 'No. Memorise the 3-pillar structure and your proof sentence. Fresh phrasing on the day keeps the answer human.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that backs your pitch</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Your answer is easier to deliver when your resume already surfaces the numbers. Build a free, ATS-ready resume in 10 minutes.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
