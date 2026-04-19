'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const RAZORPAY = [
  { stage: 'Online assessment', detail: 'HackerEarth or internal platform. 90 minutes, 2 DSA problems (medium to hard) plus 8 to 10 MCQs on OS, DBMS, networks. Scoring is algorithmic correctness plus time complexity. Target both passing test cases and an optimal Big-O.' },
  { stage: 'Technical round 1 (DSA)', detail: '60 minutes live coding on CoderPad. One medium LeetCode-style problem (arrays, hashmaps, sliding window) plus follow-ups on complexity. Talk through brute force first, then optimise. Razorpay weights clarity of thought over one-shot solutions.' },
  { stage: 'Technical round 2 (systems)', detail: '60 minutes. For SDE-2 and above: a payment-gateway-flavoured system design (idempotency, retry, exactly-once semantics). For SDE-1: deeper DSA plus OOP design (parking lot, rate limiter).' },
  { stage: 'Managerial round', detail: '45 minutes. Project deep dive on your most complex past work. Expect questions on trade-offs, what would you do differently, and conflict handling. They probe for ownership signals.' },
  { stage: 'HR and culture fit', detail: '30 minutes. Standard behavioural: why Razorpay, failure story, long-term goals. Razorpay has a strong internal culture around "customer obsession" and "hustle"; reference those values in concrete examples.' },
];

const PHONEPE = [
  { stage: 'Online assessment', detail: 'AMCAT or internal platform. 2 coding problems plus aptitude section. PhonePe includes a pseudo-code debugging round at fresher level that many candidates miss by focusing only on DSA prep.' },
  { stage: 'Tech round 1', detail: '60 to 75 minutes. Heavy on data structures: trees, graphs, DP. PhonePe is known for asking at least one graph problem per candidate at SDE-2 and above. Review BFS, DFS, Dijkstra, topological sort.' },
  { stage: 'Tech round 2 (LLD)', detail: '60 minutes of low-level design. Classic prompts: design a wallet, design a splitwise, design a payment reminder service. They want class diagrams, interfaces, and how you handle concurrency.' },
  { stage: 'Tech round 3 (HLD)', detail: 'SDE-2 and above only. Design a UPI transaction flow or a notification system at 100 million users per day. Focus on sharding, queue choice, and failure modes. PhonePe interviewers often ask about regulatory and compliance constraints.' },
  { stage: 'Hiring manager', detail: 'Behavioural plus culture. PhonePe emphasises "frugality" and "bias for action". Examples of shipping with constraints land well here.' },
];

const SWIGGY = [
  { stage: 'Online assessment', detail: 'HackerRank. 2 problems, 90 minutes. Medium difficulty. Swiggy weights correctness over edge cases at this stage; pass all visible test cases first.' },
  { stage: 'DSA round 1', detail: '60 minutes live. One hard problem or two medium. Swiggy engineers are known for liking interactive problems: API design puzzles, stream processing, cache eviction. Prep beyond vanilla LeetCode.' },
  { stage: 'DSA round 2', detail: '60 minutes. Deeper algorithmic. Past prompts: find the kth largest element in a stream, implement LFU cache, design a rate limiter for the order API.' },
  { stage: 'System design', detail: 'SDE-2 and above. Classic Swiggy prompt: design a food delivery dispatch system. Expect deep questions on geospatial indexing (geohash, quadtree), ETA prediction, and surge pricing.' },
  { stage: 'Bar raiser and HR', detail: 'Bar raiser is a senior from a different team. Mix of behavioural and one technical deep dive. HR round covers notice period, compensation, and location preference.' },
];

const COMPARE = [
  { co: 'Razorpay', strength: 'Payments domain depth, API design, idempotency', pay: 'SDE-1: 18 to 28 LPA; SDE-2: 30 to 50 LPA; SDE-3: 50 to 80 LPA', difficulty: '6.5/10 (LeetCode medium floor)' },
  { co: 'PhonePe', strength: 'LLD and HLD both heavy, system design weighted', pay: 'SDE-1: 20 to 32 LPA; SDE-2: 35 to 58 LPA; SDE-3: 60 to 95 LPA', difficulty: '7.5/10 (graphs and design are make-or-break)' },
  { co: 'Swiggy', strength: 'Real-world dispatch and streaming problems, less vanilla', pay: 'SDE-1: 18 to 30 LPA; SDE-2: 32 to 52 LPA; SDE-3: 55 to 85 LPA', difficulty: '7/10 (DSA plus domain creativity)' },
  { co: 'Flipkart', strength: 'Classic big-tech prep, scale-first system design', pay: 'SDE-1: 22 to 34 LPA; SDE-2: 36 to 60 LPA; SDE-3: 65 to 100 LPA', difficulty: '7.5/10 (closest to FAANG bar in India)' },
  { co: 'Zomato', strength: 'Product sense plus engineering, ML-adjacent problems', pay: 'SDE-1: 18 to 28 LPA; SDE-2: 30 to 50 LPA; SDE-3: 52 to 80 LPA', difficulty: '6.5/10 (behavioural rounds carry weight)' },
];

const RESUME = [
  { tip: 'Lead with payments or fintech keywords if you have them', detail: 'UPI, NPCI, PCI-DSS, KYC, AML, idempotency, webhooks, reconciliation. Razorpay and PhonePe recruiters filter on these. If you built a payment integration at a previous role, surface it in the top 3 bullets.' },
  { tip: 'Show production-scale numbers, not toy metrics', detail: '"Handled 12K RPS at peak" beats "built a scalable system". Indian unicorns assess engineering maturity through the scale you have already operated at. Add transactions-per-second, users, data volume wherever possible.' },
  { tip: 'Name-drop the stack these companies actually use', detail: 'Java/Spring (Razorpay, PhonePe, Flipkart), Go and Node (Swiggy, Zomato), Kafka, PostgreSQL, Redis, Cassandra. If you have production experience with their stack, call it out in the skills section and at least one bullet.' },
  { tip: 'Open-source contributions count double', detail: 'A single merged PR to Spring, Kafka, or a fintech library is worth more than 5 side projects. Link the PR directly in a "Selected contributions" section under Projects.' },
  { tip: 'Keep the resume to 1 page for under 4 years, 2 pages after', detail: 'Indian recruiters skim faster than US counterparts. Make the first 3 bullets of your most recent role carry the impact. Everything after the first page gets 10 seconds at most.' },
];

const TOC = [
  { id: 'intro', label: 'Why these 3 matter in 2026' },
  { id: 'razorpay', label: 'Razorpay: 5-round process' },
  { id: 'phonepe', label: 'PhonePe: 5-round process' },
  { id: 'swiggy', label: 'Swiggy: 5-round process' },
  { id: 'compare', label: 'Comparison table (pay, difficulty, focus)' },
  { id: 'resume', label: '5 resume tactics that land interviews' },
  { id: 'prep', label: '4-week prep plan' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'TCS NQT Resume Guide', slug: 'tcs-nqt-resume-guide', excerpt: 'Clear the TCS filter at every stage.', read: 11 },
  { title: 'Infosys InfyTQ Guide', slug: 'infosys-infytq-guide', excerpt: 'From certification to offer letter.', read: 10 },
  { title: 'Wipro Elite NTH Guide', slug: 'wipro-elite-nth-guide', excerpt: 'Cracking the Wipro Elite NTH hiring funnel.', read: 10 },
  { title: 'Interview Questions and Answers', slug: 'interview-questions-and-answers', excerpt: '30 common questions with model answers.', read: 14 },
  { title: 'STAR Method Examples', slug: 'star-method-examples', excerpt: 'Structure behavioural answers the right way.', read: 9 },
];

export default function IndianUnicornInterviewPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="Razorpay PhonePe Swiggy interview prep"
      title="Razorpay, PhonePe, Swiggy Interview Prep (2026)"
      subtitle="Round-by-round breakdown of the interview loops at India's 3 most active hiring unicorns. Stack expectations, pay bands, and the resume tactics that surface your application past the keyword filter."
      dateModified="2026-08-06"
      readingTime={14}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why these 3</p>
          <p className="text-gray-700">
            In 2026, Razorpay, PhonePe, and Swiggy collectively open more SDE roles in India than any FAANG satellite office. They pay at or above FAANG-India median for SDE-2 and above, and their interview loops are shorter (5 rounds vs 7 to 8). Getting through them depends on domain-specific prep, not generic DSA grind.
          </p>
        </div>
        <p className="mb-3">
          The big story of the last 3 years in Indian tech hiring is how much ground the domestic unicorns have closed on FAANG. Razorpay and PhonePe now pay L6-equivalent bands for SDE-3 roles. Swiggy and Flipkart staff engineers earn within 10 percent of their Google Bengaluru peers. The difference is that the interview loops test domain fit alongside algorithmic chops.
        </p>
        <p>
          If you prep for these loops the same way you prep for FAANG (LeetCode top 150, Grokking System Design), you will pass the DSA rounds and fail the system design rounds. The domain-specific prompts (payment idempotency, dispatch geospatial indexing, wallet LLD) are where most candidates wash out. This guide covers what each round actually tests and how to prep round-by-round.
        </p>
      </section>

      <section id="razorpay" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Razorpay: 5-round loop</h2>
        <div className="space-y-3">
          {RAZORPAY.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.stage}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700"><strong>Prep priority:</strong> payment-domain system design, idempotency keys, webhook retry logic. Read the Razorpay engineering blog for at least 5 past posts before round 2.</p>
      </section>

      <section id="phonepe" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">PhonePe: 5-round loop</h2>
        <div className="space-y-3">
          {PHONEPE.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.stage}</p>
              <p className="text-sm text-gray-700">{p.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700"><strong>Prep priority:</strong> graph algorithms (BFS, DFS, Dijkstra, topological sort), LLD patterns (factory, strategy, observer), HLD for UPI-scale workloads. Watch Arpit Bhayani on transaction isolation levels.</p>
      </section>

      <section id="swiggy" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Swiggy: 5-round loop</h2>
        <div className="space-y-3">
          {SWIGGY.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.stage}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700"><strong>Prep priority:</strong> geospatial indexing (geohash, quadtree, R-tree), stream processing basics, cache eviction policies. Read the Swiggy Bytes blog on their dispatch system evolution.</p>
      </section>

      <section id="compare" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Comparison: pay, difficulty, focus</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-2 text-left">Company</th>
                <th className="border border-gray-200 p-2 text-left">Core strength tested</th>
                <th className="border border-gray-200 p-2 text-left">Pay bands</th>
                <th className="border border-gray-200 p-2 text-left">Loop difficulty</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((c, i) => (
                <tr key={i}>
                  <td className="border border-gray-200 p-2 font-semibold">{c.co}</td>
                  <td className="border border-gray-200 p-2">{c.strength}</td>
                  <td className="border border-gray-200 p-2">{c.pay}</td>
                  <td className="border border-gray-200 p-2">{c.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-gray-500">Pay bands from Levels.fyi and AmbitionBox aggregated data, Q1 2026. Base plus stock, Bengaluru cost-of-living adjusted.</p>
      </section>

      <section id="resume" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 resume tactics that land interviews</h2>
        <div className="space-y-3">
          {RESUME.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.tip}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="prep" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">4-week prep plan</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Week 1 (DSA foundations):</strong> LeetCode top 75 focused list. Arrays, strings, hashmaps, 2-pointer, sliding window. 3 to 5 problems per day. Target: 80 percent solved without hints.</li>
          <li><strong>Week 2 (graphs and trees):</strong> BFS, DFS, union-find, topological sort, segment trees, tries. Graph-heavy companies (PhonePe, Flipkart) test this weekly. 4 problems per day plus 1 hard on weekends.</li>
          <li><strong>Week 3 (LLD):</strong> Pick 5 classic prompts (parking lot, ride-sharing, splitwise, wallet, rate limiter). Write class diagrams on paper. Practise verbalising trade-offs. 1 prompt per day, 45 minutes each.</li>
          <li><strong>Week 4 (HLD plus mocks):</strong> Study 3 domain prompts (UPI flow, dispatch, food-delivery tracking). Do 2 mock interviews per week on Pramp or interviewing.io. Focus on narrating trade-offs out loud, not silence-and-code.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://engineering.razorpay.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Razorpay Engineering blog</a></li>
          <li><a href="https://www.phonepe.com/engineering-blog/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">PhonePe Engineering blog</a></li>
          <li><a href="https://bytes.swiggy.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Swiggy Bytes engineering blog</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the total interview loop duration?', a: 'Razorpay: 2 to 3 weeks from OA to offer. PhonePe: 3 to 4 weeks. Swiggy: 2 to 3 weeks. Bar-raiser scheduling is the usual cause of delay. Push recruiters to batch rounds within 10 days when possible.' },
            { q: 'How many LeetCode problems should I solve?', a: 'Quality over quantity. 150 to 200 problems solved cleanly beats 500 solved with hints. Focus on the tagged lists for your target companies on LeetCode premium or Striver\'s A2Z DSA sheet.' },
            { q: 'Do these companies hire freshers directly?', a: 'Yes. All three run campus placements plus an off-campus program. Razorpay RACE, PhonePe campus hiring, and Swiggy Step-Up are the three off-campus tracks for freshers. Expect 1 extra round (aptitude) for freshers.' },
            { q: 'Is a referral necessary?', a: 'Not necessary but helpful. A referral moves your resume past the initial keyword filter and sometimes skips the OA. If you can find one on LinkedIn, ask. If not, apply directly; applications do get read.' },
            { q: 'What is the notice-period expectation?', a: 'All three negotiate on notice period. 60 to 90 days is standard; they often cover buyout for strong candidates. Be upfront in the HR round about your current notice and any commitments.' },
            { q: 'Which company is easiest to crack?', a: 'Razorpay and Zomato are rated easier on aggregate bar, PhonePe and Flipkart harder. Easier does not mean easy: all three run at LeetCode-medium-plus floor and expect clean code during live rounds.' },
            { q: 'Do they ask about projects or only DSA?', a: 'Projects matter in the managerial round (round 4) and the bar raiser (Swiggy). Expect 20 to 30 minutes of deep-dive on the most complex project on your resume. Memorise architecture diagrams and decision trade-offs.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that lands the OA invite</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz surfaces the domain keywords Razorpay, PhonePe, and Swiggy recruiters filter on. Fintech-ready in 12 minutes.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
