'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const TRANSLATE = [
  { military: 'Subordinates / troops', civilian: 'Team members / direct reports' },
  { military: 'Commanded / led', civilian: 'Managed / directed / supervised' },
  { military: 'Mission', civilian: 'Project / objective / initiative' },
  { military: 'Reconnaissance', civilian: 'Research / market analysis / discovery' },
  { military: 'Operations order (OPORD)', civilian: 'Project plan / execution plan' },
  { military: 'After-action review', civilian: 'Post-mortem / retrospective' },
  { military: 'Combat support', civilian: 'Operations support / logistics' },
  { military: 'Company commander', civilian: 'Department manager / operations manager' },
  { military: 'Platoon leader', civilian: 'Team lead / first-line manager' },
  { military: 'NCO / non-commissioned officer', civilian: 'Shift supervisor / technical lead' },
  { military: 'Chain of command', civilian: 'Reporting structure / escalation path' },
  { military: 'SOP (standard operating procedure)', civilian: 'Process documentation / runbook' },
];

const SKILLS = [
  { skill: 'Leadership under pressure', translation: 'Direct experience leading 10 to 100+ people in high-stakes, time-constrained environments. Translates to: crisis management, incident command, on-call leadership, large team management.' },
  { skill: 'Logistics and supply chain', translation: 'Managing the movement of people, equipment, and resources across geographies on tight timelines. Translates to: supply chain, warehouse ops, procurement, fleet management.' },
  { skill: 'Training and development', translation: 'Designing and delivering training programs for new recruits and advanced courses for senior personnel. Translates to: L&D, instructional design, technical training, onboarding.' },
  { skill: 'Security clearance', translation: 'Active or lapsed clearance is a strong signal for defence contractors, finance compliance, government tech, critical infrastructure. Mention the level (Secret, Top Secret) and status.' },
  { skill: 'Technical specialisation (signals, cyber, avionics)', translation: 'Direct pipeline to: network engineering, cybersecurity (GRC + blue team), embedded systems, aerospace, telecom. Certifications often transfer directly.' },
  { skill: 'Budget and resource management', translation: 'Officers routinely manage multi-crore / multi-million budgets. Translates to: P&L ownership, departmental budgeting, resource planning.' },
  { skill: 'Discipline and followthrough', translation: 'Not a resume keyword, but a real differentiator at interview. Pair it with a concrete story of meeting a hard deadline despite constraints.' },
];

const CERTS = [
  { cert: 'AWS Solutions Architect Associate', why: 'Fastest path to a cloud / DevOps role. Covers 60 percent of the vocabulary you will need in the first 12 months. 3 to 6 weeks of prep.' },
  { cert: 'PMP (Project Management Professional)', why: 'Formal credential that civilian hiring managers recognise. Maps well to officer-level experience. Requires 36 months of project leadership + 35 PDU hours.' },
  { cert: 'Six Sigma Green Belt / Black Belt', why: 'Process improvement credential. Strong fit for operations, manufacturing, and supply chain roles. Green Belt in 2 to 4 months; Black Belt in 6 to 9.' },
  { cert: 'Security+ (CompTIA)', why: 'Entry-level cybersecurity credential. Required for many DoD and defence-contractor roles in the US. Broadly respected in India IT-sec as well.' },
  { cert: 'CISSP', why: 'Senior cybersecurity credential. Requires 5 yrs experience. Opens doors to senior-analyst, architect, and compliance roles at top pay bands.' },
  { cert: 'CFA Level 1 (India / US finance pivot)', why: 'For veterans pivoting to finance. Level 1 alone is a strong market signal; the 3-level journey takes 2 to 3 yrs.' },
];

const SUMMARIES = [
  {
    archetype: '1. Commissioned officer (leadership pivot)',
    before: 'Major, Indian Army Signals Corps. Served 14 years across 4 postings including counter-insurgency ops and peacekeeping. Led companies of 120 personnel in operational deployments.',
    after: 'Operations leader with 14 yrs of team management and P&L responsibility in high-constraint environments. Led cross-functional teams of 120, managed annual budgets of INR 18 crore, and delivered mission-critical communications projects on strict timelines. Pivoting into technology operations; recent AWS Solutions Architect Associate + PMP certified. Target: Ops Director or Program Manager at a Series B+ scale-up.',
  },
  {
    archetype: '2. Non-commissioned officer (operations pivot)',
    before: 'Senior NCO, US Army, 12 years. Platoon Sergeant managing 40 soldiers. Deployed to Iraq and Afghanistan. Awarded Bronze Star.',
    after: 'Operations manager with 12 yrs leading teams of 40 in time-critical execution. Deep expertise in logistics, readiness, and cross-functional coordination under constrained budgets. Recognised for operational excellence (Bronze Star equivalent to top 5 percent operator rating). PMP certified; pursuing Six Sigma Black Belt. Target: Warehouse Operations Manager or Program Lead in supply chain.',
  },
  {
    archetype: '3. Technical specialist (cyber / signals pivot)',
    before: 'Signals Officer, Indian Navy, 9 years. Maintained ship-board comms systems. Trained junior sailors on EW and SIGINT platforms.',
    after: 'Cybersecurity engineer with 9 yrs of hands-on experience in secure communications, signal intelligence, and team training. Architected comms infrastructure across 4 platform classes; maintained uptime at 99.8 percent across deployments. CompTIA Security+ certified, CISSP candidate. Target: Blue team or GRC analyst role at a financial services or defence-tech company.',
  },
];

const NETWORKING = [
  { org: 'DGR (Directorate General Resettlement, India)', detail: 'Government body that runs transition courses and connects veterans with corporate employers. Free certificate and placement support programs.' },
  { org: 'Hire Our Heroes / Hiring Our Heroes (US Chamber of Commerce)', detail: 'Fellowship programs, job fairs, and corporate partnerships specifically for transitioning service members.' },
  { org: 'Veteran ERGs (Employee Resource Groups)', detail: 'Most F500 companies (Amazon, JPMorgan, Accenture, TCS) have veteran ERGs. Search LinkedIn for the company name plus Veterans ERG. Ask for a coffee chat.' },
  { org: 'USAA SkillBridge / Corporate Fellowship Programs', detail: 'Paid 12-week internships during your final months of service. Many convert to full-time offers.' },
  { org: 'Bharat Shakti / NSR veterans network (India)', detail: 'Alumni networks and LinkedIn groups that focus on officer-to-corporate transitions. Active referral pipelines into IT services and defence-tech.' },
];

const TOC = [
  { id: 'intro', label: 'Why the translation problem is hard' },
  { id: 'translate', label: 'Military to civilian language map' },
  { id: 'skills', label: 'Transferable skills matrix' },
  { id: 'certs', label: 'Certifications veterans should earn' },
  { id: 'summaries', label: '3 worked summaries (officer, NCO, technical)' },
  { id: 'networking', label: 'Veteran hiring programs and networks' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary: 25 Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by career stage.', read: 14 },
  { title: 'Resume Action Verbs List', slug: 'resume-action-verbs', excerpt: '150+ verbs grouped by skill category.', read: 7 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Tailor Your Resume', slug: 'tailor-resume', excerpt: 'Match the JD without rewriting from scratch.', read: 9 },
  { title: 'Quantify Achievements', slug: 'quantify-resume-achievements', excerpt: 'Add numbers to any bullet, even without metrics.', read: 9 },
];

export default function MilitaryCivilianResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Transitions"
      breadcrumbCurrent="Military to civilian resume"
      title="Military to Civilian Resume: India + US Guide (2026)"
      subtitle="How to translate MOS / rank / deployments into civilian language, a transferable skills matrix, the 6 certifications that move the needle, and 3 worked summaries for officer, NCO, and technical archetypes."
      dateModified="2026-06-14"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Corporate recruiters rarely decode military jargon. A Major who led 120 troops reads as unclear mid-manager when the bullet says Commanded Bravo Company through Operation Sudarshan. The fix is translation, not compression. You earned the experience; make it legible to a civilian ATS and a civilian reader in 7 seconds.
          </p>
        </div>
        <p>
          Veterans hold a rare bundle: leadership at young ages, responsibility over people and equipment, followthrough under real consequences. The market wants this bundle. What the market cannot read is rank structures, MOS codes, campaign names, and acronyms. This guide rewrites your experience in the vocabulary civilian hiring managers use every day. No stolen valour, no puffery, just translation.
        </p>
      </section>

      <section id="translate" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Military to civilian language map</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Military term</th>
                <th className="text-left p-3 font-semibold text-gray-900 border-b border-gray-200">Civilian translation</th>
              </tr>
            </thead>
            <tbody>
              {TRANSLATE.map((t, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="p-3 text-gray-800">{t.military}</td>
                  <td className="p-3 text-gray-700">{t.civilian}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-700">
          Rule: keep 1 or 2 military terms in the summary as a signal of who you are, then translate the rest of the bullets. A resume with zero military reference can feel like hiding the experience; a resume that is 100 percent military jargon does not parse for the reader.
        </p>
      </section>

      <section id="skills" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Transferable skills matrix</h2>
        <div className="space-y-3">
          {SKILLS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.skill}</p>
              <p className="text-sm text-gray-700">{s.translation}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="certs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Certifications veterans should earn</h2>
        <p className="mb-4 text-gray-700">A single civilian credential on a military resume often does more to open doors than 2 extra bullets. These 6 move the needle most for transitioning veterans.</p>
        <div className="space-y-3">
          {CERTS.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{c.cert}</p>
              <p className="text-sm text-gray-700">{c.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">3 worked summaries (officer, NCO, technical)</h2>
        {SUMMARIES.map((s, i) => (
          <div key={i} className="mb-8 border border-gray-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{s.archetype}</h3>
            <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-3">
              <p className="text-xs uppercase tracking-wide font-semibold text-red-900 mb-1">Before (military voice)</p>
              <p className="text-sm text-gray-800">{s.before}</p>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-emerald-900 mb-1">After (civilian voice)</p>
              <p className="text-sm text-gray-800">{s.after}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="networking" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Veteran hiring programs and networks</h2>
        <p className="mb-4 text-gray-700">The civilian job market has dedicated pipelines for veterans. Using them cuts the cold-application funnel time in half.</p>
        <div className="space-y-3">
          {NETWORKING.map((n, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{n.org}</p>
              <p className="text-sm text-gray-700">{n.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.hiringourheroes.org/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Hiring Our Heroes: US Chamber of Commerce Foundation</a></li>
          <li><a href="https://dgrindia.gov.in/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Directorate General Resettlement (India)</a></li>
          <li><a href="https://www.va.gov/careers-employment/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">US Department of Veterans Affairs: Careers and Employment</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I include rank on my civilian resume?', a: 'Yes, in the experience section alongside the civilian translation. Example: Major (equivalent to Senior Operations Manager), Indian Army Signals Corps. Keeps the signal, removes the ambiguity.' },
            { q: 'How far back should my military experience go?', a: 'Full history if under 15 years of service. Over 15 years, keep detail on the last 10 and summarise earlier in 1 or 2 lines.' },
            { q: 'What if my MOS is combat arms with no civilian equivalent?', a: 'Translate the underlying skills: leadership, planning, logistics, training. The domain may not transfer but the role responsibilities almost always do.' },
            { q: 'Should I list medals and commendations?', a: 'List 2 or 3 most prestigious (Bronze Star, Shaurya Chakra, Commander in Chief commendation). Translate with a 1-line explanation: Awarded top 5 percent operator rating for X.' },
            { q: 'Is a security clearance really that valuable?', a: 'In the US, active Secret or Top Secret is a 10 to 20 percent premium for defence and finance roles. In India, clearance is less market-tradable but signals discipline and vetting.' },
            { q: 'How do I handle a long gap since leaving service?', a: 'Fill the gap with certifications, contract work, or volunteering. A 2-year post-service gap with no activity reads as concerning; a gap filled with AWS cert + freelance ops work reads as transition in progress.' },
            { q: 'Should I hide my military background if applying to startups?', a: 'No. Most startups value the leadership and followthrough signal. Translate the vocabulary but keep the identity.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Translate your service into a civilian-ready resume</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz ships veteran-friendly summary templates and bullet prompts that convert rank, MOS, and command into civilian vocabulary. ATS-clean by default.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
