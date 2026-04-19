'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const PHASES = [
  {
    phase: 'Phase 1 (Weeks 1 to 2): Fundamentals',
    goal: 'Lock in the data structures and the core complexity intuition. No shortcuts here.',
    problems: '30 to 40 problems',
    focus: 'Arrays, strings, hashmaps, linked lists, stacks, queues, recursion, binary search. One topic per day with 3 to 4 easy or medium problems each.',
  },
  {
    phase: 'Phase 2 (Weeks 3 to 4): Patterns',
    goal: 'Recognise problem patterns in under 60 seconds. This is the phase where LeetCode starts feeling less random.',
    problems: '50 to 60 problems',
    focus: 'Two pointers, sliding window, fast and slow pointers, BFS and DFS on trees and graphs, backtracking, dynamic programming (1D and 2D), heap, trie. Solve 4 problems per pattern.',
  },
  {
    phase: 'Phase 3 (Weeks 5 to 8): Mock rounds + systems design',
    goal: 'Translate solo problem solving into interview performance under pressure with a human listening.',
    problems: '80 to 100 problems + 12 mocks',
    focus: 'Medium and hard LeetCode daily, 2 mock interviews per week on pramp or interviewing.io, start systems design every weekend using the Grokking book or System Design Primer.',
  },
  {
    phase: 'Phase 4 (Weeks 9 to 12): Company specific',
    goal: 'Load the last 6 months of tagged questions for your target company. Close the gap to offer.',
    problems: '60 to 80 problems + behavioural prep',
    focus: 'Company tagged LeetCode (premium), behavioural STAR prep, salary negotiation scripts, final 3 mocks with actual engineers from target companies.',
  },
];

const WEEK_GRID = [
  { week: 'Week 1', lc: '18 problems', topic: 'Arrays + hashmaps + strings', mocks: '0' },
  { week: 'Week 2', lc: '18 problems', topic: 'Linked lists + stacks + recursion + binary search', mocks: '0' },
  { week: 'Week 3', lc: '25 problems', topic: 'Two pointers, sliding window, BFS / DFS', mocks: '1 (pramp)' },
  { week: 'Week 4', lc: '25 problems', topic: 'Backtracking + DP 1D + heap + trie', mocks: '1' },
  { week: 'Week 5', lc: '20 problems', topic: 'DP 2D + graph advanced; 1 systems design problem', mocks: '2' },
  { week: 'Week 6', lc: '20 problems', topic: 'Hard problems in weak patterns; 1 systems design', mocks: '2' },
  { week: 'Week 7', lc: '22 problems', topic: 'Mixed pattern drilling; 2 systems design', mocks: '2' },
  { week: 'Week 8', lc: '22 problems', topic: 'Random pick simulation; 2 systems design', mocks: '2' },
  { week: 'Week 9', lc: '20 problems', topic: 'Company tagged top 50', mocks: '2' },
  { week: 'Week 10', lc: '20 problems', topic: 'Company tagged 51 to 100 + behavioural', mocks: '2' },
  { week: 'Week 11', lc: '18 problems', topic: 'Review weak areas + full behavioural run', mocks: '2' },
  { week: 'Week 12', lc: '10 problems', topic: 'Rest, review, sleep. No new patterns.', mocks: '1' },
];

const SYSDESIGN = [
  { step: 'Step 1 (2 min): Clarify requirements', detail: 'Functional (read vs write heavy, core flows), non-functional (scale, latency, consistency, availability), constraints (budget, team size).' },
  { step: 'Step 2 (3 min): Capacity estimation', detail: 'QPS, storage per day, bandwidth. Write it on the board. Back of the envelope math is not optional.' },
  { step: 'Step 3 (5 min): API design', detail: '4 to 6 REST or gRPC endpoints with request or response shape. Avoid over-specifying; just the critical fields.' },
  { step: 'Step 4 (10 min): High level design', detail: 'Client, load balancer, service layer, cache, database, async workers, CDN. Draw boxes and arrows.' },
  { step: 'Step 5 (15 min): Deep dive', detail: 'Pick 2 bottlenecks (DB sharding, cache eviction, consistency tradeoffs). Go deep on one. Most candidates skip this and lose the round.' },
  { step: 'Step 6 (5 min): Tradeoffs + wrap', detail: 'Call out what you would revisit with more time. Interviewers love candidates who name their own gaps.' },
];

const RESOURCES = [
  { name: 'LeetCode (premium strongly worth it in phase 4)', use: 'Company tagged questions + editorial solutions + hard filters.' },
  { name: 'NeetCode 150 and NeetCode 250', use: 'Best free curated list. Follow the order; do not skip around.' },
  { name: 'Educative: Grokking the Coding Interview', use: 'Learn the 14 patterns here. Worth the subscription for phase 2.' },
  { name: 'System Design Primer (Donne Martin, GitHub)', use: 'Free. Read end to end once, then use as reference.' },
  { name: 'Grokking the System Design Interview', use: 'Pair with the Primer. Case studies on Twitter, Uber, TinyURL, Netflix.' },
  { name: 'interviewing.io and pramp', use: 'Free mocks with real engineers. interviewing.io has anonymous FAANG interviewers.' },
  { name: 'Cracking the Coding Interview (McDowell)', use: 'Still the gold reference. Read chapters 1 to 11.' },
  { name: 'Designing Data-Intensive Applications (Kleppmann)', use: 'Only if you target senior or staff roles. Heavy but definitive.' },
];

const TOC = [
  { id: 'intro', label: 'Why a 90 day plan and not 6 months' },
  { id: 'phases', label: 'The 4 phases at a glance' },
  { id: 'weekly', label: 'Week by week grid (12 weeks)' },
  { id: 'sysdesign', label: 'Systems design: the 6 step framework' },
  { id: 'mocks', label: 'Mock interview schedule that actually works' },
  { id: 'resources', label: 'The resource stack (ranked)' },
  { id: 'mistakes', label: 'Top 5 mistakes that waste months' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Interview Questions and Answers', slug: 'interview-questions-and-answers', excerpt: '30 common rounds with model answers.', read: 14 },
  { title: 'STAR Method Examples', slug: 'star-method-examples', excerpt: 'Turn experience into tight behavioural answers.', read: 10 },
  { title: 'Tell Me About Yourself', slug: 'tell-me-about-yourself', excerpt: 'The 90 second opener that sets the tone.', read: 9 },
  { title: 'Why Should We Hire You', slug: 'why-should-we-hire-you', excerpt: 'The closing question with the highest signal.', read: 11 },
  { title: 'Resume Skills List', slug: 'resume-skills-list', excerpt: 'Hard, soft, tools and how to order them.', read: 11 },
];

export default function TechnicalInterviewPrepPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Technical Interview Prep"
      breadcrumbCurrent="Technical interview prep"
      title="Technical Interview Prep: The 90-Day Plan (2026)"
      subtitle="A realistic 12 week plan to get from shaky on arrays to offer-ready at FAANG. Exact problem counts per week, mock schedule, systems design framework, and the resource stack that beats random LeetCode grinding."
      dateModified="2026-05-26"
      readingTime={15}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why 90 days</p>
          <p className="text-gray-700">
            Three months is long enough to rebuild pattern recognition from scratch, short enough that you do not burn out before the interview loop starts. Most candidates who prep for 6 months end up doing the last 8 weeks of real work anyway. The rest is warm up. This plan compresses the warm up.
          </p>
        </div>
        <p>
          You do not need 500 LeetCode problems. You need the right 200, in the right order, with two mock rounds a week once you hit phase 3. Every engineer who has cleared a FAANG loop in the last few years will tell you the same thing: it is not the volume, it is the pattern coverage plus the pressure reps. This guide gives you both on a clock.
        </p>
        <p className="mt-3">
          Assumption: you can commit 2 to 3 hours on weekdays and 5 to 6 hours on weekends. If you can only do 1 hour a day, double the plan to 24 weeks. Do not compress below 90 days unless you have interviewed in the last 6 months already.
        </p>
      </section>

      <section id="phases" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 4 phases at a glance</h2>
        <div className="space-y-3">
          {PHASES.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.phase}</p>
              <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Goal:</span> {p.goal}</p>
              <p className="text-sm text-gray-700 mb-1"><span className="font-semibold">Volume:</span> {p.problems}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Focus:</span> {p.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="weekly" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Week by week grid (12 weeks)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900">Week</th>
                <th className="text-left p-3 font-semibold text-gray-900">LeetCode volume</th>
                <th className="text-left p-3 font-semibold text-gray-900">Topic focus</th>
                <th className="text-left p-3 font-semibold text-gray-900">Mocks</th>
              </tr>
            </thead>
            <tbody>
              {WEEK_GRID.map((w, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-semibold text-gray-900">{w.week}</td>
                  <td className="p-3 text-gray-700">{w.lc}</td>
                  <td className="p-3 text-gray-700">{w.topic}</td>
                  <td className="p-3 text-gray-700">{w.mocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-3">Totals: about 238 LeetCode problems and 17 mocks across 12 weeks. If that feels low, you are miscounting the effort per problem. Spending 45 minutes on a medium plus 30 minutes reviewing the editorial is 1 problem done right, not 2.</p>
      </section>

      <section id="sysdesign" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Systems design: the 6 step framework</h2>
        <p className="mb-4">Most candidates fail systems design because they jump straight to boxes and arrows. The 6 steps below are the structure every senior interviewer is scoring you on, whether they say so or not. 45 minute round, time budgets in brackets.</p>
        <div className="space-y-3">
          {SYSDESIGN.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.step}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mocks" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mock interview schedule that actually works</h2>
        <p className="mb-3">The number one gap between candidates who clear FAANG and those who do not is mock volume. Aim for 17 mocks across the 12 weeks. Split roughly: 10 coding, 5 systems design, 2 behavioural. Most people do zero behavioural mocks and then freeze when asked about conflict at work.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Weeks 3 to 4:</strong> 1 mock per week on pramp (free, peer to peer). Just get used to talking while coding.</li>
          <li><strong>Weeks 5 to 8:</strong> 2 mocks per week. Mix pramp with interviewing.io (anonymous FAANG engineers).</li>
          <li><strong>Weeks 9 to 11:</strong> 2 mocks per week, shift to paid platforms (interviewing.io premium, igotanoffer) for target company interviewers.</li>
          <li><strong>Week 12:</strong> 1 final mock. Rest the rest of the week. Do not introduce new material 7 days before a loop.</li>
        </ul>
      </section>

      <section id="resources" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The resource stack (ranked)</h2>
        <div className="space-y-3">
          {RESOURCES.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.name}</p>
              <p className="text-sm text-gray-700">{r.use}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 5 mistakes that waste months</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Grinding random LeetCode daily.</strong> Without a pattern map, 300 problems teaches you less than 100 problems grouped by technique.</li>
          <li><strong>Skipping mocks because you are not ready.</strong> You will never feel ready. Start mocks in week 3. Bad early mocks teach more than late perfect ones.</li>
          <li><strong>Watching solution videos before attempting.</strong> Sit with the problem for 25 minutes minimum. Passive watching does not build problem solving.</li>
          <li><strong>Ignoring systems design until week 10.</strong> You need 8 weeks of weekly cases. Cramming it in 2 weeks is how senior candidates fail the round they should ace.</li>
          <li><strong>Zero behavioural prep.</strong> Behavioural is 30 percent of a FAANG loop. Prep 10 STAR stories, rehearse them out loud, record yourself. This is not optional.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://github.com/donnemartin/system-design-primer" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Donne Martin: The System Design Primer (GitHub)</a></li>
          <li><a href="https://leetcode.com/study-plan/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LeetCode official study plans</a></li>
          <li><a href="https://www.techinterviewhandbook.org/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Tech Interview Handbook by Yangshun Tay</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many LeetCode problems should I solve before a FAANG interview?', a: 'Between 200 and 300 well understood problems, heavy on mediums. Quality over count. 150 problems you can re-solve cleanly beat 500 problems you barely remember.' },
            { q: 'Is LeetCode premium worth the money?', a: 'Yes, but only from week 9 onwards. Company tagged questions and sort by frequency make the final 4 weeks dramatically more targeted. Before that, free LeetCode plus NeetCode is enough.' },
            { q: 'How many hours per day is realistic?', a: '2 to 3 on weekdays, 5 to 6 on weekends. Any more and you burn out by week 8. Rest days are part of the plan, not a failure.' },
            { q: 'Do I need to know a specific language?', a: 'Pick one and stick with it. Python is fastest to write, C++ is preferred for competitive edge, Java is common at enterprise and Amazon. Switching languages mid-prep costs 2 to 3 weeks.' },
            { q: 'How much systems design do I need as a new grad?', a: 'Usually zero. New grad loops focus on coding and behavioural. Systems design kicks in for 3+ years experience or L4+ roles. Check the specific loop for your target role.' },
            { q: 'What if I fail a mock badly?', a: 'Good. That was the point. Review the recording, identify whether it was a knowledge gap or a communication issue, and schedule the next mock within 3 days. Do not wait.' },
            { q: 'Should I apply while still prepping?', a: 'Start applying around week 8. Interview loops take 3 to 5 weeks to schedule, so by the time you are in the final round you will be in phase 4 anyway. Do not wait for perfect readiness.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Get the resume ready before the first onsite</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">A 90 day plan is wasted if your resume stalls at the recruiter screen. Build an ATS clean, FAANG ready resume in 20 minutes on ResumeBuildz.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
