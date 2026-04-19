'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const DIFFERENCES = [
  { attr: 'Focus', objective: 'What you want from the role (your goals).', summary: 'What you bring to the role (your value).' },
  { attr: 'Best for', objective: 'Freshers, career changers, returnships, relocations.', summary: 'Anyone with 2+ years of relevant experience.' },
  { attr: 'Length', objective: '1 to 2 sentences, 25 to 40 words.', summary: '3 to 4 sentences, 40 to 90 words.' },
  { attr: 'Tone', objective: 'Forward-looking, aspirational, specific about role fit.', summary: 'Evidence-first, numbers-led, role-specific value.' },
  { attr: 'Opens with', objective: 'Your target role and the value you will bring on day 1.', summary: 'Your current title, years of experience, and domain.' },
  { attr: 'Risk', objective: 'Sounds generic if it only lists what you want.', summary: 'Sounds generic if it only lists adjectives.' },
];

const OBJECTIVES = [
  { role: 'Fresher, Computer Science', weak: 'Seeking a challenging role in a reputed organisation to utilise my skills and grow professionally.', strong: 'Final-year CSE graduate targeting a backend SDE-1 role on a Java or Go stack. Shipped 3 full-stack projects (one at 2.4k MAU) and cleared TCS NQT with 92 percentile. Ready to ramp on production services from week 1.' },
  { role: 'Career changer, marketing to UX', weak: 'Motivated marketing professional seeking to transition into UX design.', strong: 'Marketing manager with 5 years of brand work (led 3 Swiggy campaigns, 40 percent CTR lift) moving into UX research. Completed Google UX cert plus 4 shipped case studies. Target: UX Researcher role on a consumer app, using marketing fluency to translate insight into product decisions.' },
  { role: 'Returnship after 22-month break', weak: 'Experienced PM returning to work after a career break, open to opportunities.', strong: 'Senior PM returning after a 22-month caregiving break, targeting a late-stage consumer role. Previously scaled Swiggy Instamart reorder rate 38 percent; during the break, shipped 2 side products (one at 3k DAU). Ready for a 90-day ramp to full ownership.' },
  { role: 'Relocation, Bangalore to Hyderabad', weak: 'Relocating to Hyderabad and seeking opportunities in my field.', strong: 'Senior Android engineer relocating to Hyderabad in July 2026. 6 years at Razorpay on the payments SDK (weekly active SDK on 140M devices). Targeting a Staff Android role on a product with 10M+ DAU. Fully in-office from week 1.' },
];

const SUMMARIES = [
  { role: 'Software Engineer, 4 years', weak: 'Hardworking software engineer with a passion for clean code and solving hard problems.', strong: 'Backend engineer with 4 years on Go and Postgres at Razorpay, shipping 11 payment-graph services (p99 under 80ms, 99.98 percent uptime). Led the migration of 3 core services off a legacy PHP monolith, reducing infra spend 34 percent. Looking for a Staff-track role on a high-throughput fintech product.' },
  { role: 'Product Manager, 7 years', weak: 'Seasoned PM who loves building products and working with cross-functional teams.', strong: 'Consumer PM with 7 years across Swiggy and PhonePe. Owned reorder as a metric, taking it from 23 to 41 percent in 14 months through 9 shipped experiments. Hired and mentored 3 APMs. Seeking a 0 to 1 role on a mobile-first product in the 1 to 10M DAU band.' },
  { role: 'Data Scientist, 3 years', weak: 'Data scientist skilled in Python, ML, and statistics, seeking impactful roles.', strong: 'ML engineer with 3 years in fraud detection at PayU. Productionised 4 XGBoost models (FPR dropped 61 percent on UPI reversals) and one LLM evaluator for merchant KYC. Comfortable from notebook to Kubernetes. Targeting an applied ML role on a risk or growth team.' },
  { role: 'Designer, 5 years', weak: 'Creative designer with a strong portfolio and attention to detail.', strong: 'Product designer with 5 years across B2B SaaS (Freshworks) and consumer fintech (Cred). Shipped the Freshdesk mobile redesign (DAU plus 19 percent) and 3 Cred onboarding flows. Strong on systems (maintained a 120-component Figma library). Targeting a Senior Product Designer role on a payments or wealth product.' },
];

const TOC = [
  { id: 'intro', label: 'Objective vs summary: the core difference' },
  { id: 'differences', label: 'Side-by-side comparison' },
  { id: 'when-objective', label: 'When to use an objective' },
  { id: 'when-summary', label: 'When to use a summary' },
  { id: 'objectives', label: '4 objective examples (weak vs strong)' },
  { id: 'summaries', label: '4 summary examples (weak vs strong)' },
  { id: 'mistakes', label: '6 mistakes both kinds of candidates make' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by career stage and industry.', read: 14 },
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: 'The 7-section format that beats Indian and global ATS.', read: 11 },
  { title: 'Resume Format Guide 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'How to Tailor a Resume', slug: 'tailor-resume', excerpt: 'The 4-pass method that swaps 10 to 15 words per JD.', read: 9 },
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
];

export default function ResumeObjectiveVsSummaryPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Resume objective vs summary"
      title="Resume Objective vs Summary: When to Use Each (2026)"
      subtitle="Objectives and summaries look similar but do opposite jobs. One sells your goals, the other sells your value. Pick the wrong one and the top 6 inches of your resume goes to waste. Here is the 2026 rulebook with 8 worked examples."
      dateModified="2026-07-21"
      readingTime={9}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The short version</p>
          <p className="text-gray-700">
            Use a summary if you have 2 or more years of relevant experience. Use an objective only if you are a fresher, a career changer, a returnship candidate, or someone relocating. Never use both. Never leave the top of your resume empty, because that is the real estate the recruiter reads first.
          </p>
        </div>
        <p>
          The top 6 inches of your resume gets 70 percent of the first-read attention. What goes there decides whether the recruiter keeps scrolling or moves to the next file. Candidates waste this block in two predictable ways. They write a generic objective full of words like motivated, passionate, seeking, and challenging, or they write a generic summary full of hardworking, detail-oriented, team player. Both mistakes come from the same root problem: the candidate is writing about themselves instead of about the role.
        </p>
        <p className="mt-3">
          The fix is to pick the right format for your stage and write it with numbers. An objective is forward-looking and belongs on a resume where the past does not yet carry the pitch. A summary is backward-looking and belongs on a resume where past wins are the pitch. Once you pick, the rules for writing each one are very different.
        </p>
      </section>

      <section id="differences" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Side-by-side: objective vs summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold">Attribute</th>
                <th className="text-left p-3 font-semibold">Objective</th>
                <th className="text-left p-3 font-semibold">Summary</th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENCES.map((d, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 font-semibold text-gray-900">{d.attr}</td>
                  <td className="p-3 text-gray-700">{d.objective}</td>
                  <td className="p-3 text-gray-700">{d.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="when-objective" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to use an objective</h2>
        <p className="mb-3">Use an objective when your past does not yet do the pitching for you. Five clear situations qualify.</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Fresher with no full-time experience.</strong> A summary reads awkward because there is nothing to summarise. An objective states target role, strongest signal (project, intern, rank), and readiness.</li>
          <li><strong>Career change across functions or industries.</strong> Your last 5 years do not match the target role. An objective reframes your transferable strength and names the new destination.</li>
          <li><strong>Returnship after a career break longer than 12 months.</strong> Lead with your return intent, a specific role, and the ramp you are offering.</li>
          <li><strong>Relocation-driven search.</strong> Recruiters screen out non-local candidates fast. Put the relocation date and target city in the first line.</li>
          <li><strong>Reskilled into a new technical domain.</strong> A self-taught backend engineer pivoting from ops. Objective states the new target stack and recent shipped proof.</li>
        </ol>
        <p className="mt-3">If none of those apply, pick a summary. There is no bonus for using an objective later in your career; the opposite, it signals you do not have enough to summarise.</p>
      </section>

      <section id="when-summary" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to use a summary</h2>
        <p className="mb-3">Use a summary once you have 2 or more years of relevant experience. The more senior you are, the more the summary does the work, because recruiters scan and decide in under 10 seconds whether the scope and scale match the role.</p>
        <p className="mb-3">A strong summary follows a 4-part formula. Sentence 1: title, years, and domain. Sentence 2: your strongest outcome with a number. Sentence 3: a second proof point that shows breadth or a complementary skill. Sentence 4 (optional): the target role band you are aiming for.</p>
        <p>Avoid soft adjectives (hardworking, dedicated). Use numbers. If you cannot produce at least one number in 4 sentences, you are writing about traits instead of outcomes, and the recruiter will skip to the next file.</p>
      </section>

      <section id="objectives" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 objective examples (weak vs strong)</h2>
        <div className="space-y-5">
          {OBJECTIVES.map((ex, i) => (
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

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 summary examples (weak vs strong)</h2>
        <div className="space-y-5">
          {SUMMARIES.map((ex, i) => (
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
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 mistakes both kinds of candidates make</h2>
        <ul className="space-y-3">
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Using both an objective and a summary</p><p className="text-sm text-gray-700">Pick one. Two intro blocks read as noise and push your Experience section off the first screen.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Writing in the third person</p><p className="text-sm text-gray-700">Backend engineer with 4 years reads fine. A proven leader who strives to deliver results reads like a LinkedIn About me from 2015.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Listing traits instead of outcomes</p><p className="text-sm text-gray-700">Dedicated, motivated, team-oriented adds nothing. Replace every adjective with a number or a shipped result.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Forgetting to name the target role</p><p className="text-sm text-gray-700">Without a target role, both formats feel aimless. The reader should know what job you want in the first 10 words.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Making the summary 120 words</p><p className="text-sm text-gray-700">Over 90 words, it stops being a summary and starts reading like poorly structured Experience copy.</p></li>
          <li className="border border-gray-200 rounded-lg p-4"><p className="font-semibold text-gray-900 mb-1">Not tailoring per application</p><p className="text-sm text-gray-700">The title sentence and the target role band should flex with the JD. One canonical draft, 2 to 3 surgical swaps per role.</p></li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2014/12/how-to-write-a-resume-that-stands-out" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on writing a resume that stands out</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/resume-objective-vs-summary" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide: objective vs summary</a></li>
          <li><a href="https://www.themuse.com/advice/how-to-write-a-resume-summary-statement" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on writing a resume summary</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I skip both and just list experience?', a: 'Not ideal. The top block is the first thing a recruiter reads. Leaving it blank wastes a scanned-attention slot. Even a 2-sentence summary lifts callback rate.' },
            { q: 'Is a career objective outdated in 2026?', a: 'Only when misused. Generic objectives are outdated. A specific, forward-looking objective is still the right move for freshers, career changers, and returnships.' },
            { q: 'Should freshers always use an objective?', a: 'Usually. Unless a fresher has 2+ shipped internships with strong numbers, a summary reads thin. An objective frames the fresher as a candidate with direction.' },
            { q: 'How many words should the summary be?', a: '40 to 90 words. Three or four sentences. Under three reads underdone; over five reads like compressed Experience copy.' },
            { q: 'Can I keep a summary even as a fresher with great internships?', a: 'Yes. If you have 2+ internships with shipped outcomes and numbers, a 3-sentence summary works. You are treating internships as proof points.' },
            { q: 'Does the ATS care which one I use?', a: 'No. ATS parses text regardless of whether the section is labelled Objective or Summary. The choice is purely for the human reader.' },
            { q: 'Should I change the objective or summary per job?', a: 'Yes, but lightly. Keep one canonical paragraph and swap the target role band or the first proof point to match the JD.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Write your summary in under 2 minutes</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz picks objective vs summary based on your stage and drafts the 4-sentence version automatically. Tweak, not write from scratch.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
