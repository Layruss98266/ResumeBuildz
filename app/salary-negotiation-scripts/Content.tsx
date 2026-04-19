'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const RESEARCH = [
  { tool: 'Levels.fyi', use: 'Best source for FAANG and top tech. Filter by company, level, location, years of experience. Base + stock + bonus broken down.' },
  { tool: 'Glassdoor', use: 'Broadest coverage, noisier data. Good for non-tech and mid-market companies. Treat the band as a rough 25th to 75th percentile estimate.' },
  { tool: 'AmbitionBox (India)', use: 'Strongest India dataset. Service companies (TCS, Infosys, Wipro) and product startups. Check designation-specific pages, not company averages.' },
  { tool: 'Blind (tech)', use: 'Verified employee posts. Search the company name plus level. Good for checking if an offer is low for the market.' },
  { tool: 'Payscale / LinkedIn Salary', use: 'Use as a third data point. Do not rely on a single source. Triangulate three, take the median.' },
];

const SCENARIOS = [
  {
    id: 'initial',
    title: '1. Initial offer (the anchor)',
    setup: 'Recruiter emails the first number. Your move here sets the ceiling for every future round. Do not accept on the call. Buy 24 to 48 hours.',
    indiaScript: 'Thank you for the offer and for moving quickly. The package is close to what I was expecting, and I want to give it the consideration it deserves. Could you share the full breakdown in writing (base, variable, joining bonus, ESOPs, vesting) so I can review it with my family over the next 2 days? I will get back to you by Thursday EOD.',
    usScript: 'Really appreciate the offer and the speed. This is a big decision for me, so I want to review it carefully. Can you send the details in writing, including base, target bonus, equity (share count and vesting), and sign-on? I will have my response to you by end of week.',
    counter: 'Recruiter may say we need an answer by tomorrow. Response: I understand timelines, and I want to respect yours. 48 hours is the minimum I can give this the review it deserves. If that is a hard blocker I want to flag it now.',
  },
  {
    id: 'lowball',
    title: '2. Counter a lowball offer',
    setup: 'Offer comes in 20 to 30 percent below your research. Do not express disappointment. Anchor high with data, not emotion.',
    indiaScript: 'Thanks for sharing the offer. Based on my research on AmbitionBox and conversations with 3 engineers at your level-band, the market for a SDE-3 with 6 yrs of Java + AWS + payments domain is sitting around 52 to 58 LPA fixed. Your offer at 42 LPA is meaningfully below that band. Given my fit with the payments team specifically, I was hoping to land at 54 LPA fixed with the ESOP structure you proposed. Can we get there?',
    usScript: 'Thank you for the offer. Based on Levels.fyi and Blind data for L5 backend engineers in Bay Area with my domain (6 yrs, distributed systems, payments), total comp is typically 380 to 440k. Your offer at 295k TC is about 22 percent below band. Given the fit with the payments team, I am looking for a base of 225k and equity of 600k over 4 yrs. Is that something you can put together?',
    counter: 'Recruiter: We have a firm band and cannot exceed it. Response: I understand bands. Two things: (1) which specific lever can move (base, equity, sign-on)? (2) is there a level adjustment that would open the band? I would rather solve this together than walk away over a gap this close.',
  },
  {
    id: 'relocation',
    title: '3. Relocation negotiation',
    setup: 'Offer requires you to move. Relocation comes in 3 flavours: lump-sum (flat amount), reimbursement (you spend, they pay back), or managed move (they pay vendors direct). Ask for lump-sum plus temp housing.',
    indiaScript: 'I am excited about the role and the Bangalore move. Relocation cost for my family (2 adults, 1 kid, household shipped from Pune) works out to approximately 4.5 lakh plus temporary accommodation for 6 weeks while we find a permanent place. Can we structure relocation as a 4 lakh lump-sum plus 6 weeks serviced apartment, both net of tax?',
    usScript: 'Excited about the role and the Austin move. Relocation for a family of 4 from Seattle runs 18 to 22k with household goods, travel, and 30 days temp housing. Can we do a 25k gross-up lump-sum (covering tax) plus 30 days corporate housing through your relocation vendor? That puts me in a position to start on the target date.',
    counter: 'Recruiter: Our standard relocation is 10k. Response: I understand the policy. My real out-of-pocket is 22k. Two options: (1) raise the lump-sum as an exception since the move is further than your average, or (2) keep 10k but add 15k to my sign-on to cover the gap. Either works.',
  },
  {
    id: 'signon',
    title: '4. Sign-on bonus negotiation',
    setup: 'Sign-on is the easiest lever. It does not touch bands, does not affect future comp reviews, and is a one-time cost. Always ask if base cannot move.',
    indiaScript: 'I hear you on the base band. The variable is great. I am currently vesting 8 lakh of RSUs at my current employer that I will forfeit by joining. To make the switch neutral, can we add a 10 lakh joining bonus (2-year clawback is fine with me)? That bridges the gap and keeps my base in your band.',
    usScript: 'Understood on the base cap. I have 85k of unvested equity at my current company that vests over the next 14 months. To bridge that, I am asking for a 90k sign-on with a standard 2-year clawback. That keeps your base in band and makes me financially whole on the switch.',
    counter: 'Recruiter: Standard sign-on is 20k. Response: Understood. Can we split it: 20k at start, 20k at month 12? Two smaller bonuses often get approved where one large one does not. It also protects the company if I leave early.',
  },
  {
    id: 'equity',
    title: '5. Equity / RSU negotiation',
    setup: 'Equity is where senior offers are won or lost. Know the difference: RSUs (public, liquid), options (private, strike price), ESOPs (India private, often illiquid). Ask for the refresh cycle.',
    indiaScript: 'Thanks for sharing the ESOP grant of 40 lakh over 4 yrs with 1 yr cliff. Two things: (1) can we push the grant to 60 lakh given the senior scope, and (2) what is your annual refresh policy? Without refresh, my equity front-loads and I face a cliff at year 4. A 25 percent annual refresh would keep me aligned for the long term.',
    usScript: 'On equity, 600k over 4 yrs with 1 yr cliff is the starting point. I am looking for 900k given the staff scope and the competing offer I mentioned. Also, what is the refresh? Most peer companies refresh at 30 to 40 percent of initial grant annually starting year 2. Without that I face the golden-handcuffs cliff.',
    counter: 'Recruiter: We do not share refresh policy in writing pre-hire. Response: I understand, and I want to be reasonable. Can we get a verbal from the hiring manager that refresh is a real practice for strong performers? Or alternatively, bump the initial grant by 20 percent to hedge?',
  },
  {
    id: 'multiple',
    title: '6. Multiple offers (the power move)',
    setup: 'You have a competing offer. Handle it with precision. Never lie about numbers. Never reveal the exact competing offer until you have to. Use it to raise the floor.',
    indiaScript: 'I want to be transparent. I have another offer in hand at a fintech scale-up, and it is competitive on comp. Your role is genuinely my first choice because of the scope and the team. To close it this week, I need your offer to come up to 58 LPA fixed plus the current ESOP. If you can get there, I will sign by Friday and decline the other offer on the call.',
    usScript: 'Quick update: I have a competing offer from another Series C company that came in higher on base and equity. Your company is my top choice because of the product and the team I would work with. If you can match at 235k base and 750k equity over 4 yrs, I will sign with you this week and withdraw from the other process today.',
    counter: 'Recruiter: Can you send the competing offer letter? Response: I prefer not to share the document, but I can tell you the TC number and the company tier. If you need verification, I can have my recruiter there confirm numbers verbally. The ask is still the same.',
  },
];

const EMAIL = [
  'Subject: Following up on the offer',
  '',
  'Hi [recruiter name],',
  '',
  'Thank you again for the offer and for the detailed walkthrough yesterday. I am excited about the role and the team.',
  '',
  'Before I sign, I wanted to surface one item. Based on my research (Levels.fyi, AmbitionBox, peer conversations) and the competing offer I mentioned, total comp for a [level] engineer with my experience is landing in the [X to Y] range. Your current offer of [Z] sits below that band.',
  '',
  'Can we close the gap as follows?',
  '- Base: [target base]',
  '- Sign-on: [target sign-on]',
  '- Equity: [target equity over 4 yrs]',
  '',
  'If we can land here, I am ready to sign this week and decline the other process. Happy to hop on a call if it is easier.',
  '',
  'Thanks,',
  '[Your name]',
];

const TOC = [
  { id: 'intro', label: 'Why engineers leave money on the table' },
  { id: 'research', label: 'Research tools that actually work' },
  { id: 'scenarios', label: '6 scenarios with verbatim scripts' },
  { id: 'email', label: 'Email template you can copy' },
  { id: 'mistakes', label: '6 common negotiation mistakes' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: '100 Interview Questions & Answers', slug: 'interview-questions-and-answers', excerpt: 'Behavioural, technical, tricky, closing.', read: 16 },
  { title: 'Why Should We Hire You (8 Examples)', slug: 'why-should-we-hire-you', excerpt: '3-pillar Problem, Proof, Compounding formula.', read: 12 },
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: 'Present-past-future formula with scripts.', read: 13 },
  { title: 'STAR Method: 8 Full Examples', slug: 'star-method-examples', excerpt: 'Behavioural framework with industry stories.', read: 15 },
  { title: 'Cover Letter Guide & Templates', slug: 'cover-letter', excerpt: '4-part structure with 6 templates.', read: 8 },
];

export default function SalaryNegotiationScriptsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Salary & Negotiation"
      breadcrumbCurrent="Salary negotiation scripts"
      title="Salary Negotiation Scripts for Software Engineers (India + US)"
      subtitle="Verbatim scripts for 6 real negotiation scenarios across India and US markets. Plus the research stack that lets you anchor with data, not vibes."
      dateModified="2026-06-09"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Engineers leave an estimated 15 to 30 percent of first-year comp on the table because nobody taught them the scripts. Recruiters negotiate 40 times a month. You negotiate once every 2 to 4 years. The gap is not talent; it is reps. These scripts close the gap.
          </p>
        </div>
        <p>
          Negotiation is a reps game played at extreme asymmetry. The person across the table has done this 500 times this year. You have done it twice this decade. The only way to close the gap in one sitting is to arrive with data you trust, a script you have rehearsed, and a clear walk-away number. Everything that follows is built around those three anchors.
        </p>
        <p className="mt-3">
          Most engineers make 2 mistakes on the first call. They accept too fast (signals low market awareness) or they counter with a number pulled from air (no data, easy to dismiss). The scripts below fix both. They buy you time, put data on the table, and move the conversation from feelings to numbers.
        </p>
      </section>

      <section id="research" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Research tools that actually work</h2>
        <p className="mb-4 text-gray-700">You need 3 data points to triangulate a range. Never walk in with one source. Numbers below are sources, not the full answer.</p>
        <div className="space-y-3">
          {RESEARCH.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.tool}</p>
              <p className="text-sm text-gray-700">{r.use}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Target: 30 to 60 mins on research before the first recruiter call. Note the 25th, 50th, 75th percentile for your exact level + location + years of experience. Your ask should sit at the 75th; your walk-away at the 25th.
        </p>
      </section>

      <section id="scenarios" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 scenarios with verbatim scripts (India + US)</h2>
        {SCENARIOS.map((s) => (
          <div key={s.id} className="mb-10 border border-gray-200 rounded-xl p-5">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-700 mb-4"><strong>Setup:</strong> {s.setup}</p>
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 mb-3">
              <p className="text-xs uppercase tracking-wide font-semibold text-amber-900 mb-1">India script</p>
              <p className="text-sm text-gray-800 italic">{s.indiaScript}</p>
            </div>
            <div className="bg-sky-50 border-l-4 border-sky-500 rounded-r-lg p-4 mb-3">
              <p className="text-xs uppercase tracking-wide font-semibold text-sky-900 mb-1">US script</p>
              <p className="text-sm text-gray-800 italic">{s.usScript}</p>
            </div>
            <div className="bg-gray-50 border-l-4 border-gray-400 rounded-r-lg p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-gray-700 mb-1">Recruiter counter-move and your response</p>
              <p className="text-sm text-gray-800">{s.counter}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="email" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Email template you can copy</h2>
        <p className="mb-3 text-gray-700">Use when the conversation has stalled, the recruiter is remote, or you want the numbers in writing. Send on a Tuesday or Wednesday morning for fastest response.</p>
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">{EMAIL.join('\n')}</pre>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 common negotiation mistakes</h2>
        <ul className="space-y-3">
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Revealing your current comp first</p><p className="text-sm text-gray-700">Anchors the offer to your old number, not to market. If asked, respond: I am looking for a package in line with market for this level, which is X to Y based on my research.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Accepting on the call</p><p className="text-sm text-gray-700">Always ask for 24 to 48 hours. Every offer has room. Accepting fast signals low market awareness.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Apologising during the counter</p><p className="text-sm text-gray-700">No I know this is awkward openers. State the ask with data. Recruiters respect clean negotiation.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Bluffing a competing offer</p><p className="text-sm text-gray-700">Easy to catch, hard to recover from. If you do not have one, negotiate on fit and data alone.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Negotiating only base</p><p className="text-sm text-gray-700">Bases have tight bands. Sign-on, equity, extra PTO, and remote flexibility are softer levers.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Not getting it in writing</p><p className="text-sm text-gray-700">Verbal commitments on refresh grants, relocation, and remote days vanish between recruiter and HR. Ask for the revised offer letter before you sign anything.</p></li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.levels.fyi/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Levels.fyi: total comp data by company and level</a></li>
          <li><a href="https://www.ambitionbox.com/salaries" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">AmbitionBox salary database (India)</a></li>
          <li><a href="https://www.kalzumeus.com/2012/01/23/salary-negotiation/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Patrick McKenzie: Salary Negotiation for Engineers</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How much can I realistically negotiate?', a: '8 to 20 percent on a typical offer. 25 to 40 percent if you have a competing offer and the first offer was lowballed. Under 5 percent is rare unless the offer was already at top-of-band.' },
            { q: 'Should I negotiate a fresher offer?', a: 'Yes, but with realistic expectations. Freshers have less leverage; focus on sign-on, joining date flexibility, and level rather than a large base bump. 5 to 10 percent is typical.' },
            { q: 'How do I negotiate when I only have one offer?', a: 'Use data, not leverage. Triangulate the 75th percentile from three sources and anchor there. You can also negotiate on fit, scope, and non-cash levers.' },
            { q: 'Is FAANG negotiation different?', a: 'Yes. FAANG has team-match and level committees. Equity and sign-on are the big levers. Bands are wide but strictly enforced; level adjustment can unlock 30 percent more.' },
            { q: 'How do I counter a lowball without sounding aggressive?', a: 'Lead with excitement about the role. Then present the data. End with a clear ask. No accusations, no emotion, just numbers and a question.' },
            { q: 'When is the best time to bring up the competing offer?', a: 'Once you have received both and decided this one is your top choice. Too early and you look like you are shopping; too late and they cannot approve a change.' },
            { q: 'Should I negotiate equity or sign-on first?', a: 'Sign-on is easier to move because it is a one-time cost. Start there if base is capped. Equity takes longer (sometimes requires VP approval) but scales bigger over 4 years.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Land the offer first, then negotiate it up</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Build a resume that gets you to the offer stage in the first place. ResumeBuildz ships with ATS-clean templates and pre-written bullets for every level.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
