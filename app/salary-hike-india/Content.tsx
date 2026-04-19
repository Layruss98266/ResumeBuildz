'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const MARKET = [
  { band: 'IT services (TCS, Infosys, Wipro, HCL)', average: '7 to 9 percent', topPerformer: '12 to 14 percent', switchPremium: '30 to 40 percent' },
  { band: 'Product / SaaS (domestic)', average: '10 to 12 percent', topPerformer: '18 to 22 percent', switchPremium: '40 to 60 percent' },
  { band: 'Product / SaaS (FAANG, unicorns)', average: '12 to 15 percent', topPerformer: '22 to 30 percent', switchPremium: '50 to 80 percent' },
  { band: 'Consulting (Big 4, strategy)', average: '9 to 12 percent', topPerformer: '18 to 25 percent', switchPremium: '35 to 50 percent' },
  { band: 'Banking / BFSI', average: '8 to 10 percent', topPerformer: '15 to 20 percent', switchPremium: '30 to 45 percent' },
  { band: 'Early-stage startups (Series A to C)', average: '10 to 14 percent plus equity refresh', topPerformer: '20 to 30 percent plus equity refresh', switchPremium: '40 to 70 percent' },
  { band: 'Manufacturing / core engineering', average: '6 to 8 percent', topPerformer: '10 to 14 percent', switchPremium: '25 to 40 percent' },
];

const CALC = [
  { step: 'Anchor your current market rate', detail: 'Pull 3 data points: AmbitionBox median for your title, Levels.fyi for product companies, and 2 informal references from peers at target companies. Build a range, not a point.' },
  { step: 'Compute your company delta', detail: 'If your current CTC is 30 percent below market median, a fair internal correction is roughly half the gap (15 percent) on top of the inflation + performance band.' },
  { step: 'Apply performance multiplier', detail: 'Average rating = 1.0x band. Top 10 percent rating = 1.4 to 1.8x band. Skip the multiplier if your last cycle rating was Meets Expectations.' },
  { step: 'Add scope-change premium', detail: 'If your role grew (new team, new ownership, title upgrade) add 3 to 6 percent on top of the performance band. Document the scope change with before / after bullets.' },
  { step: 'Set 3 numbers, not 1', detail: 'Aspirational (your open), Target (where you would accept without counter), Walk-away (below this you start interviewing). Never go into the room with only one number.' },
];

const SCRIPTS = [
  { title: 'Asking for the appraisal conversation', script: 'Hi [manager], I would like to book 45 minutes in the next two weeks to walk through my past year contributions and align on compensation for the new cycle. Could you share a slot that works for you? I will send a written summary 48 hours ahead so we spend the meeting on decisions, not recap.' },
  { title: 'Opening the hike ask in the meeting', script: 'Thanks for the time. I want to share three things in 10 minutes: the scope I picked up this year, the impact I shipped, and where my compensation sits vs the market for that scope. Then I have a specific ask and I am open to your feedback on it.' },
  { title: 'Making the number ask', script: 'Based on the scope growth (led 2 launches, mentored 3 juniors) and current market data (AmbitionBox median for my title at peer companies is X), I am asking for a 22 percent hike to Y. I understand budget constraints; if 22 percent is not feasible this cycle, I would like to understand what is and what path gets me to Y over the next 2 quarters.' },
  { title: 'Handling the budget wall', script: 'I hear you on the cap. Can we separate the cash hike from the total package? A combination of 14 percent cash, a retention RSU refresh, and a title change would get me close to the number and give me a clear reason to stay. Can you explore that with HR?' },
  { title: 'Responding to the lowball', script: 'Thank you for the offer. I was expecting closer to [your target]. Given my rating, the scope growth, and the market delta I shared, can you walk me through how the 8 percent number was arrived at? I want to understand the gap so we can figure out whether it can be closed this cycle or we need a different plan.' },
  { title: 'Using an outside offer as leverage', script: 'I want to be transparent: I have received an offer at [Company] for [X]. I am not interviewing because I want to leave; I started the process 3 months ago when my previous hike was below expectations. I would prefer to stay. Can we discuss what a retention counter looks like this week?' },
];

const MISTAKES = [
  { m: 'Asking without data', fix: 'Bring 3 market data points in writing (AmbitionBox, Levels.fyi, Glassdoor). A number without a source gets dismissed.' },
  { m: 'Anchoring to current CTC', fix: 'Anchor to market median for your scope, not to your current base times 1.1. That is how companies underpay loyal employees.' },
  { m: 'Waiting till after the appraisal email', fix: 'Appraisal numbers are locked 4 to 6 weeks before the email lands. Have the conversation before the lock date, not after.' },
  { m: 'Emotional framing (I deserve, I need)', fix: 'Business framing. Scope grew, impact shipped, market moved. Keep personal finance out of the room.' },
  { m: 'Accepting the first counter', fix: 'Always respond with a thoughtful pause and a follow up question. First counters are almost never the ceiling.' },
  { m: 'Forgetting non-cash levers', fix: 'RSUs, one-time bonus, title change, promotion path, learning budget, WFH flexibility. All negotiable alongside cash.' },
  { m: 'Going in without a walk-away number', fix: 'Decide your walk-away before the meeting. If you do not know when you would start interviewing, you will accept anything.' },
];

const TOC = [
  { id: 'intro', label: 'Why most hike asks fail' },
  { id: 'market', label: 'Market data: average hikes in India 2026' },
  { id: 'calc', label: 'How to compute your ask (5-step formula)' },
  { id: 'timing', label: 'When to ask (and when not to)' },
  { id: 'scripts', label: '6 word-for-word scripts' },
  { id: 'mistakes', label: '7 mistakes that kill the ask' },
  { id: 'outside', label: 'Using an outside offer (carefully)' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: '3-part present-past-future formula.', read: 13 },
  { title: '100 Common Interview Questions', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing categories.', read: 16 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Turn duties into measurable outcomes.', read: 10 },
  { title: 'STAR Method: 8 Full Examples', slug: 'star-method-examples', excerpt: 'Behavioural framework with worked stories.', read: 15 },
  { title: 'Tailor Your Resume to Each JD', slug: 'tailor-resume', excerpt: '15-minute tailoring system for every application.', read: 9 },
];

export default function SalaryHikeIndiaPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Salary & Negotiation"
      breadcrumbCurrent="Salary hike India"
      title="How to Ask for a Salary Hike in India (2026): Data + Scripts"
      subtitle="Market data for 7 industry bands, a 5-step formula to compute your number, 6 word-for-word scripts for the appraisal conversation, and the 7 mistakes that turn a strong case into a weak ask."
      dateModified="2026-08-11"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why most hike asks fail</p>
          <p className="text-gray-700">
            The top two reasons hike asks get rejected in India are: the number had no source, and the conversation happened 4 weeks too late. Appraisal budgets freeze in January for April cycles and in July for October cycles. By the time you get the offer email, the number is a rubber stamp. The right ask is a 30 minute conversation, backed by 3 market data points, started 6 weeks before the freeze.
          </p>
        </div>
        <p>
          Most Indians treat the appraisal hike as a lottery. The number shows up in an email in April and you either celebrate, shrug, or start interviewing. That passivity is exactly what your HR finance partner relies on. The average hike in India across IT services in 2026 sits at 7 to 9 percent. Top performers who make the ask, with data, at the right time, routinely land 12 to 14 percent in the same company, same role, same cycle. The delta is not talent. It is preparation.
        </p>
        <p className="mt-3">
          This guide gives you the market data by industry band, a 5-step formula to land on a specific number, and the exact scripts to use in the conversation. Print the scripts. Rehearse them. Walk in with the ask written on a page.
        </p>
      </section>

      <section id="market" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Market data: average hikes in India 2026</h2>
        <p className="mb-4 text-sm text-gray-700">Numbers compiled from AON India Salary Trends Survey 2026, Michael Page India Salary Benchmark 2026, and public Q1 appraisal disclosures from the top 12 employers. Ranges reflect reported bands; your mileage varies by function and city.</p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="p-3">Industry band</th>
                <th className="p-3">Average hike</th>
                <th className="p-3">Top performer</th>
                <th className="p-3">Switch premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {MARKET.map((m, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium text-gray-900">{m.band}</td>
                  <td className="p-3 text-gray-700">{m.average}</td>
                  <td className="p-3 text-gray-700">{m.topPerformer}</td>
                  <td className="p-3 text-gray-700">{m.switchPremium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">Read the switch premium column carefully. If your internal hike offer is more than 15 points below the switch premium for your band, you have a defensible case for a counter, or an obvious case to start interviewing.</p>
      </section>

      <section id="calc" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">How to compute your ask (5-step formula)</h2>
        <ol className="space-y-3">
          {CALC.map((c, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-1"><span className="text-indigo-600 mr-2">Step {i + 1}.</span>{c.step}</p>
              <p className="text-sm text-gray-700">{c.detail}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 bg-gray-50 rounded-lg p-5 text-sm text-gray-700">
          <p className="font-semibold text-gray-900 mb-2">Worked example</p>
          <p>Current CTC 18 LPA. Scope grew by one tier this year (inherited a second team). Rating: Exceeds Expectations. Market median for your title at peer product companies: 26 LPA. Gap: 30 percent. Performance multiplier: 1.5x on a 12 percent band = 18 percent. Scope premium: 4 percent. Total ask: 22 percent, landing at 22 LPA. Target: 22 LPA. Aspirational: 24 LPA. Walk-away: 20.5 LPA. This is the number you walk in with.</p>
        </div>
      </section>

      <section id="timing" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to ask (and when not to)</h2>
        <p className="mb-3"><strong>Ask 4 to 8 weeks before the appraisal freeze.</strong> For April cycles, that is mid January to mid February. For October cycles, it is mid July to mid August. Anything later and your manager is writing justifications after the number is locked.</p>
        <p className="mb-3"><strong>Do not ask immediately after a miss.</strong> If your team failed OKRs last quarter or there was a recent layoff round, wait 6 to 10 weeks for the air to clear. Pushing through pressure reads as tone-deaf.</p>
        <p><strong>Do ask after a visible win.</strong> Shipped a launch, rescued a bad project, wrapped a promotion panel. The conversation lands 3x better within 3 weeks of a win than in a neutral stretch.</p>
      </section>

      <section id="scripts" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 word-for-word scripts</h2>
        <p className="mb-5 text-sm text-gray-700">Print these. Rehearse each one out loud twice. They are written for the Indian workplace register: direct but not aggressive, data-backed but not legalistic.</p>
        <div className="space-y-4">
          {SCRIPTS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Script {i + 1}</p>
              <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
              <p className="text-sm text-gray-700 italic">{s.script}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 mistakes that kill the ask</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="outside" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Using an outside offer (carefully)</h2>
        <p className="mb-3">An outside offer is the single most effective lever in a hike conversation, and also the single most likely to backfire if used wrong. Three rules.</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Never bluff.</strong> If the offer does not exist on paper with a start date, do not mention it. Managers at senior levels often have a backchannel into the company you claim to have an offer from.</li>
          <li><strong>Share the frame, not the company.</strong> I have an offer for X at a peer company in the same space. You do not owe them the name unless they counter and you are negotiating final numbers.</li>
          <li><strong>Be ready to leave.</strong> If the counter comes in below the outside offer, you must be willing to take the outside offer. Bluffing and then staying teaches your company that you negotiate with empty threats.</li>
        </ol>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.aon.com/india-salary-increase-survey/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">AON India Salary Increase Survey</a> for the headline hike numbers by industry.</li>
          <li><a href="https://www.michaelpage.co.in/salary-guide" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Michael Page India Salary Benchmark</a> with function-level breakdowns.</li>
          <li><a href="https://www.levels.fyi/t/software-engineer/locations/india" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Levels.fyi India data</a> for product company benchmarks (software).</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How much hike should I ask for?', a: 'Anchor to market median minus current CTC, applied over 2 cycles if the gap is large. For most strong performers, 15 to 22 percent is defensible. 30 percent only if there is a title or scope change or the market gap is above 40 percent.' },
            { q: 'Is 30 percent hike possible without switching?', a: 'Rare but possible. It usually requires a promotion (tier jump) plus a scope premium plus a top rating in the same cycle. Without the title change, 30 percent internal is unusual.' },
            { q: 'What is the average hike in India in 2026?', a: 'Across services and product, weighted average sits near 9.5 percent. Top performers cluster at 14 to 18 percent. Industry-specific ranges are in the table above.' },
            { q: 'When should I bring up the hike number?', a: 'Not in the first 10 minutes. Spend the opening on scope and impact; introduce the number only after the business case is made. Too-early numbers anchor the conversation on price, not value.' },
            { q: 'Can I ask for a hike outside appraisal cycle?', a: 'Only with a trigger: new scope, promotion, retention counter, or a clear market miss. Off-cycle asks without a trigger get parked.' },
            { q: 'Should I put the ask in writing?', a: 'Yes. Send a 1-page summary 48 hours before the meeting: scope growth, impact numbers, market references, and the specific ask. Makes the conversation cleaner and gives your manager something to forward to HR.' },
            { q: 'What if my manager says budget is capped?', a: 'Separate cash from total package. RSUs, a one-time bonus, a title change, or a promotion path timeline can make up 30 to 50 percent of the gap without touching the cash budget.' },
            { q: 'Should I interview even if I want to stay?', a: 'Yes, every 18 months. An interview process gives you real market data and a real alternative, both of which make the internal conversation sharper.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Pair your hike ask with a backup plan</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">The strongest asks come from people who have options. Build an ATS-ready resume in 10 minutes so you always have an outside offer as leverage.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
