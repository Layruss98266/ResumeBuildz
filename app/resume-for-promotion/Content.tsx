'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const FRAMEWORK = [
  { section: '1. Scope expansion', guidance: 'Quantify how your scope grew in the last 12 to 18 months. Team size (direct and dotted line), budget, revenue under your ownership, number of customers, number of systems touched. Before and after numbers, not adjectives.' },
  { section: '2. Level-above behaviours', guidance: 'List 3 to 5 specific projects where you already operated at the target level. For IC-to-Senior: projects where you set direction instead of executing someone else&apos;s plan. For Senior-to-Staff: cross-team efforts you drove without a manager title.' },
  { section: '3. Impact metrics', guidance: 'Revenue moved, cost saved, latency cut, team velocity lifted, customers retained, incidents reduced. Each number tagged to a timeframe. Lifetime numbers are cheating; use rolling 12 months where possible.' },
  { section: '4. Peer and stakeholder signals', guidance: 'Who supports the promotion and why. Direct quotes from peer reviews, 360 feedback, customer references. HR wants evidence that the level change is already visible to the people who work with you.' },
  { section: '5. Forward thesis', guidance: 'What you will do with the new level in the next 2 quarters. This is the part most promotion packets skip. Without it, you are asking for a title; with it, you are proposing a trade where the company also wins.' },
];

const EXAMPLES = [
  {
    title: 'Example 1: IC-to-Senior Software Engineer (SDE-2 to SDE-3 at a product company)',
    body: `Name: Arjun M.
Current role: SDE-2, Checkout platform (2.5 years)
Target role: SDE-3, same team

Scope expansion (12 months):
- Owned 2 additional services (payments retry queue, fraud score fallback). Services now: 5 (was 3).
- Mentored 2 SDE-1s to first production launch; both now own a service each.
- Represented the team in the quarterly architecture review board (previously my manager&apos;s seat).

Level-above behaviours:
- Drove the migration off the in-house rate limiter to envoy. Wrote the design doc, ran the RFC process across 4 teams, shipped in 9 weeks with zero customer-facing incidents. My manager signed off; he did not drive.
- Caught and proposed the fix for the long-standing double-charge bug that had been open for 14 months. Estimated financial exposure resolved: 42 lakh INR annually.
- Ran the on-call training for 6 new engineers. Avg p0 MTTR on this service dropped from 38 min to 21 min quarter-over-quarter.

Impact (last 4 quarters):
- Checkout success rate: 97.8 percent to 99.1 percent.
- Median checkout latency: 820 ms to 340 ms.
- Infra cost for the 3 services I owned most of the year: 18 percent reduction (11 lakh INR annually).

Peer signals:
- 9 of 11 peer reviewers rated me at SDE-3 on the &quot;direction setting&quot; dimension in the spring calibration.
- Customer team lead: &quot;Arjun is the person we escalate to when a payments partner acts up. He owns it.&quot;

Forward thesis:
- Next 2 quarters: drive the refactor of the subscription billing system. The current manager has already approved scope. I will need SDE-3 authority to commit design decisions without his review on every step.`,
  },
  {
    title: 'Example 2: Senior-to-Staff Engineer',
    body: `Name: Priya V.
Current role: Senior Software Engineer, Data Platform (3 years)
Target role: Staff Engineer, same platform

Scope expansion (18 months):
- Technical lead for 3 teams (data ingestion, warehouse, query layer). 14 engineers in orbit, 6 direct collaborators.
- Budget influence: annual infra spend 2.3 crore INR. Cut 41 percent over 4 quarters via columnar format migration and cold-storage tiering.
- Cross-org: led the data contract working group across platform, ML, and analytics engineering.

Level-above behaviours:
- Authored the north star architecture for real-time joins across domains. Adopted by all 3 teams, now in staged rollout.
- Represented the company at 2 Data Council events and one internal deep-dive with the VP of Engineering.
- Mentored 4 Senior Engineers through their quarterly goals; 2 were promoted in the last cycle.

Impact:
- Fresh data latency for analytics: 6 hours to 9 minutes end to end.
- Query p95 on the warehouse: 14 seconds to 2.1 seconds.
- Incident rate on ingestion: 3.2 per month to 0.4 per month.

Stakeholder signals:
- VP Engineering, 1:1 notes: &quot;Priya already owns the Staff scope. The title is catch-up.&quot;
- Analytics Director: &quot;She is the person I think of when someone asks me what good data engineering looks like here.&quot;

Forward thesis:
- Take over the data-platform technical strategy doc from the current Staff (moving to a new org). Propose and drive the 2-year consolidation plan for the 3 warehouses we still run.`,
  },
  {
    title: 'Example 3: IC-to-Manager (Senior Engineer to Engineering Manager)',
    body: `Name: Rohit S.
Current role: Senior Engineer, Growth team (3 years IC, 8 months dotted-line mentor)
Target role: Engineering Manager, same team

Scope expansion (12 months):
- Grew the mentor circle from 1 to 4 direct-line mentees over the year. Ran weekly 1:1s with each.
- Owned the team hiring loop: designed 2 interview questions now in the standard set, conducted 18 interviews, 3 hires closed.
- Led the team&apos;s annual planning exercise (2025 Q4 planning doc). My manager stepped back.

Level-above behaviours:
- Ran the last 2 retros; identified and drove the switch from Jira to Linear that cut planning meeting time by 40 percent per sprint.
- Handled a peer-conflict situation between 2 engineers with HR partnership. Both remain engaged; neither has left.
- Built the team&apos;s career development template, now used by 2 other growth-adjacent teams.

Impact (team-level):
- Team velocity (shipped roadmap items): 14 to 23 per quarter.
- 1:1 skip-level satisfaction score: 6.8 to 8.4 out of 10.
- Team attrition: 2 in 2024, 0 in 2025 YTD.

Peer signals:
- 5 of 6 team members independently told my manager they would prefer me as their next manager.
- Product counterpart on team: &quot;Rohit is already acting as the EM; the title is the last piece.&quot;

Forward thesis:
- Next 2 quarters: stabilise the team headcount at 8, own hiring for 2 more Senior Engineers, and drive the team through the Q1 OKRs independently.`,
  },
  {
    title: 'Example 4: Lateral transfer (Product to Platform team, same level)',
    body: `Name: Kavya L.
Current role: Senior Engineer, Mobile product team (2 years)
Target role: Senior Engineer, Core Platform team

This is a lateral move, not a promotion. The document is still needed because the receiving team has to justify the internal transfer to HR.

Why this team:
- Over 40 percent of my last 4 quarterly goals touched the platform layer (auth, notifications, analytics SDK). I know the codebase.
- I filed 9 PRs to platform repos in 12 months; 7 merged. The top committer on the platform side was the EM of that team.

Scope I bring:
- Deep product-team empathy that platform teams often lack. Every platform API we shipped in the last year had at least one sharp edge for product engineers. I can be the bridge.
- iOS and Android parity experience. Current platform team skews Android-heavy.

Impact in current role:
- Notification tap-to-open rate: 6.2 percent to 11.8 percent.
- Cold start time on iOS: 1.8 seconds to 0.9 seconds.
- Shipped the analytics-SDK v2 across both platforms, now used by 6 internal teams.

Forward thesis:
- First 90 days: shadow platform on-call, pick up 2 existing projects. Q2: own the cross-platform SDK consolidation effort end to end. No compensation or level change requested.

Signals gathered:
- Platform EM agreed to the transfer in principle.
- Current manager agreed to a 6-week handover.`,
  },
  {
    title: 'Example 5: Cross-functional promotion (Engineering to Product Engineering Lead)',
    body: `Name: Vikram R.
Current role: Staff Software Engineer, Payments (4 years)
Target role: Product Engineering Lead, Payments (new role, hybrid of Staff + junior PM)

Why this role exists and why me:
- Payments product team has been running without a dedicated engineer-PM bridge for 8 months. Roadmap slippage is 23 percent quarter-over-quarter. A dedicated bridge is the fix, and I have been playing it unofficially.
- In the last 4 quarters, I authored 11 PRFAQs alongside the PM team. 8 shipped.

Scope expansion (12 months):
- Co-owned the payments product roadmap with the PM lead. Ran 6 of the last 10 roadmap reviews.
- Interviewed 14 enterprise customers alongside the Sales Engineering team. Converted 4 of those into case studies.
- Led the pricing-model redesign: new model rolled out in March, driving 18 percent increase in ARPU.

Level-above behaviours:
- Built the payments analytics dashboard used weekly by the CRO, CPO, and VP Eng. Before this, the data lived in 4 different dashboards and reports.
- Represented engineering at the monthly exec review. My manager stopped attending in January.

Impact:
- Payment success rate: 98.2 to 99.4 percent.
- Chargeback rate: 0.8 to 0.3 percent.
- Revenue attributable to payments improvements in 2025 YTD: 4.1 crore INR.

Forward thesis:
- Take over roadmap ownership for the payments product in full, reporting to the VP Eng with a dotted line to the CPO. First 2 quarters: deliver the stablecoin-payments experiment plus the unified reconciliation dashboard.`,
  },
];

const HR_SIGNALS = [
  { signal: 'Written record of level-above work', why: 'HR wants a paper trail. Screenshots of 1:1 notes, quarterly goals, peer reviews, and slack threads where you drove decisions across teams. Verbal &quot;I do it already&quot; does not survive calibration.' },
  { signal: 'Peer and stakeholder endorsements', why: '3 to 5 peer-level colleagues, 1 cross-functional stakeholder (PM, design, data), 1 skip-level. Direct quotes, not generic praise. HR filters out anything that could apply to anyone.' },
  { signal: 'Quantified business impact', why: 'Money, time, or risk moved. If you cannot connect your work to a number, you are not ready for the next level. Recruit a finance partner or your PM to help translate.' },
  { signal: 'Gap analysis against the next-level rubric', why: 'Most companies publish a level rubric internally. Print it, highlight evidence for each competency at the target level, flag the 1 or 2 gaps you are actively closing. Honesty wins here; HR trusts candidates who name their gaps.' },
  { signal: 'Manager sponsorship', why: 'A promotion packet without your manager as a sponsor is dead on arrival. If your manager is neutral, fix that first before writing anything else. The packet is the artifact; the sponsorship is the decision.' },
];

const TIMING = [
  { when: '6 months before', what: 'Start tracking. Keep a running doc of level-above work, quantified wins, and stakeholder moments. Memory fails; the doc does not.' },
  { when: '3 months before', what: 'Draft the first version of the promotion case doc. Share with your manager in the next 1:1. Ask for explicit feedback: gaps, weak spots, counter-examples.' },
  { when: '6 weeks before', what: 'Gather peer and stakeholder quotes. Send a short email asking: &quot;I am putting together my promotion case. Would you write 2 sentences on a specific example where we worked together?&quot; Most people say yes.' },
  { when: '2 weeks before', what: 'Final polish. Cut anything that is not load-bearing. Verify every number with the actual dashboard or tool. Send to manager with a requested submission date.' },
  { when: 'Calibration week', what: 'Be reachable. Your manager may need a data point or quote. Do not ask for updates; they will tell you when it is decided.' },
];

const TOC = [
  { id: 'intro', label: 'Why promotion resumes are different' },
  { id: 'framework', label: 'The Promotion Case Doc framework' },
  { id: 'examples', label: '5 worked examples' },
  { id: 'hr', label: 'What HR looks for' },
  { id: 'timing', label: 'Timing the promotion packet' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Turn every bullet into a number with the 5-step formula.', read: 9 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '200+ verbs grouped by role.', read: 8 },
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'How to frame a senior profile in 3 sentences.', read: 8 },
  { title: 'STAR Method Examples', slug: 'star-method-examples', excerpt: '8 worked behavioural interview answers.', read: 10 },
  { title: 'Tailor Your Resume', slug: 'tailor-resume', excerpt: 'Match the target role, not the generic JD.', read: 9 },
];

export default function ResumeForPromotionPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Growth & Mobility"
      breadcrumbCurrent="Resume for promotion"
      title="Resume for a Promotion: Internal Transfer Playbook (2026)"
      subtitle="The resume you use for an external job is not the document that wins a promotion. Internal moves ride on a Promotion Case Doc, not a traditional CV. The full framework, 5 examples across IC, Staff, Manager, lateral, and cross-functional paths, plus what HR actually reads."
      dateModified="2026-05-24"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">What this guide replaces</p>
          <p className="text-gray-700">
            A traditional resume is a marketing document for outsiders. A promotion packet is an evidence document for insiders. The audience already knows who you are and what you do; the job is to prove you have been operating one level above for 12 to 18 months. This guide gives you the Promotion Case Doc framework plus 5 real examples across IC, Staff, Manager, lateral, and cross-functional moves.
          </p>
        </div>
        <p>
          Internal promotions fail for 4 reasons in my tracking across 60 packets over the last 3 years: weak sponsorship (manager not in your corner), no paper trail (claiming you already operate at the next level with no evidence), unclear forward thesis (asking for a title with no proposal for what changes), and bad timing (submitting in a cycle where the org is not promoting). This guide covers the 3 you can control.
        </p>
        <p className="mt-3">
          The document you build is called a Promotion Case Doc in most companies. Amazon calls it a PD doc, Google calls it a packet, and Meta calls it a promo doc. The shape is the same across companies: 2 to 4 pages, 5 sections, heavy on evidence and light on adjectives.
        </p>
      </section>

      <section id="framework" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The Promotion Case Doc framework</h2>
        <p className="mb-4 text-gray-700">5 sections, each with a distinct job. Do not reorder them; the logic builds from scope to behaviour to impact to signals to forward plan.</p>
        <div className="space-y-3">
          {FRAMEWORK.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{f.section}</p>
              <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: f.guidance }} />
            </div>
          ))}
        </div>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 worked examples</h2>
        <p className="mb-4 text-gray-700">Names and numbers are changed; structure and tone are preserved. Each example is a trimmed version of a real packet that resulted in a promotion or internal move.</p>
        <div className="space-y-6">
          {EXAMPLES.map((e, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-3">{e.title}</p>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed" dangerouslySetInnerHTML={{ __html: e.body }} />
            </div>
          ))}
        </div>
      </section>

      <section id="hr" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">What HR looks for</h2>
        <p className="mb-4 text-gray-700">HR is not your manager. In the calibration meeting they need artifacts they can point to when the conversation gets political.</p>
        <ul className="space-y-3">
          {HR_SIGNALS.map((h, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{h.signal}</p>
              <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: h.why }} />
            </li>
          ))}
        </ul>
      </section>

      <section id="timing" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Timing the promotion packet</h2>
        <p className="mb-4 text-gray-700">Promotion cycles run on a fixed cadence at most mid-size and large companies: every 6 months or every 12 months. Submitting late in the cycle is worse than submitting in the next one. Here is the timeline that works.</p>
        <div className="space-y-3">
          {TIMING.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{t.when}</p>
              <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t.what }} />
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          If your company runs annual cycles, double every interval above. The rule is: 6 months of evidence gathering, 2 months of drafting and sponsor alignment, 2 weeks of final polish.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://staffeng.com/guides/promo-packets/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">StaffEng guide to promo packets</a></li>
          <li><a href="https://hbr.org/2020/03/how-to-ask-for-a-promotion" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on asking for a promotion</a></li>
          <li><a href="https://rework.withgoogle.com/guides/managers-coach-for-performance/steps/introduction/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Google re:Work guide to coaching for performance</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Do I need a resume for an internal promotion?', a: 'No, and using a resume instead of a Promotion Case Doc actively hurts you. Internal audiences want evidence of level-above behaviour, not a role-by-role summary they already know.' },
            { q: 'How long should the Promotion Case Doc be?', a: '2 to 4 pages for IC and Senior-level promotions. 4 to 6 pages for Staff, Principal, and EM. Anything longer gets skimmed. Anything shorter looks under-supported.' },
            { q: 'Can I skip the manager and go to HR?', a: 'Almost never a good idea. HR processes come back through your manager for input. Skipping them creates hostility that tanks the packet. Fix manager alignment first.' },
            { q: 'What if my manager is neutral on my promotion?', a: 'Neutral is not sponsorship. Have the direct conversation: &quot;Are you sponsoring my promotion this cycle? If not, what would change that?&quot; A real answer is worth 3 months of guessing.' },
            { q: 'How do I handle peer jealousy or internal politics?', a: 'Evidence fixes politics. A packet with 5 quantified wins, 3 cross-team endorsements, and a clean forward thesis is politically hard to argue against, even for skeptics.' },
            { q: 'Is it ok to ask for a level check instead of a full promotion?', a: 'Yes, at most companies. A level check is a conversation with your manager and skip about whether the current packet is ready. Skip-level will tell you the real gaps, and you save a cycle.' },
            { q: 'What if I get rejected?', a: 'Ask for the calibration-level feedback in writing. Most managers will give it if asked. The gap list becomes your next 6-month plan. Do not resubmit in the next cycle without clear deltas against the gap list.' },
            { q: 'Can I use this framework for an internal transfer, not a promotion?', a: 'Yes, with trimming. Drop the level-above behaviours section; keep scope, impact, stakeholder signals, and forward thesis. Lateral moves are a lower bar than promotions but the same evidence style wins.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build the resume behind your promotion case</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Even an internal move benefits from a clean, quantified resume attached to the packet. ResumeBuildz gives you scope-and-impact prompts so every bullet pulls its weight.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
