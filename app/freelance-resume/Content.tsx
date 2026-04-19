'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const WHY_FAIL = [
  { r: 'Client list without outcomes', w: 'Listing 12 clients is a portfolio, not a resume. Hiring managers need to know what shipped, what moved, and what you owned.' },
  { r: 'Gap-heavy timeline', w: 'Inconsistent project start/end dates read as unemployment, not freelance. Needs explicit framing as continuous self-employment.' },
  { r: 'No ownership signal', w: 'Freelancers often under-credit themselves (&quot;helped with&quot;) because client NDAs make them cautious. Under-credit reads as peripheral involvement.' },
  { r: 'Missing metrics (NDA paralysis)', w: 'Fear of breaching client confidentiality leads to zero numbers anywhere. Result: bullets with no teeth. There are ways to quantify without naming clients.' },
  { r: 'Job title confusion', w: '&quot;Freelance Designer&quot;, &quot;Independent Contractor&quot;, &quot;Self-Employed&quot; all look different to an ATS. Pick one structure and keep it consistent.' },
  { r: 'No business frame', w: 'Freelancing is running a business: sales, delivery, invoicing, retention. Resumes that ignore the business side read like a hobby.' },
];

const POP = [
  { name: 'Portfolio link at the top', d: 'Header line: portfolio URL next to email and phone. First thing a hiring manager checks after your name. No portfolio = no freelance resume.' },
  { name: 'Featured work block (3 to 5 projects)', d: 'Not a client list. A curated 3 to 5 that each read like a case study in 2 lines: client archetype, problem, outcome, tech/tools.' },
  { name: 'Testimonials as proof', d: 'One 15-word quote from a named client (with permission) in a sidebar or footer. &quot;Shipped in half the quoted timeline.&quot; Signed LinkedIn profile link validates.' },
  { name: 'Metrics even when NDA-bound', d: 'You can quantify without naming. &quot;Redesigned checkout for a Series B fintech, reduced cart abandonment by 22 percent&quot; names no one and says everything.' },
];

const WORKED_SUMMARIES = [
  { role: 'Freelance Full-Stack Developer (4 years)', s: 'Full-stack developer with 4 years running an independent consultancy serving seed to Series B startups. Shipped 14 production apps in React and Node, 3 acquired since 2023. Specialize in the zero-to-launch phase: fast architecture calls, rapid iteration, honest estimates. Available for 20 to 30 hour weekly engagements.' },
  { role: 'Freelance Brand Designer', s: 'Brand designer with 6 years self-employed, 40+ identity systems across DTC, SaaS, and hospitality. Work has been featured in Brand New and It&apos;s Nice That. Clients typically engage for 6 to 10 week sprints producing logo, guidelines, and launch assets. Returning to full-time after a successful freelance chapter.' },
  { role: 'Contractor to Full-Time (Transitioning)', s: 'Senior data engineer transitioning from 5 years of contracting back into full-time employment. Built pipelines at 9 companies ranging from 10-person startups to 2,000-person scale-ups. Deep exposure to data stack decisions across industries. Seeking a single-company focus where I can own the full data platform.' },
  { role: 'Full-Time to Freelance (Freshly Independent)', s: 'Product manager with 8 years in enterprise SaaS, now building an independent practice. Formerly led a 40-person product org at a $400M ARR company. First 12 months of consulting engagements focused on product strategy reviews and 0 to 1 launches. Currently booking Q3 2026 retainers.' },
];

const TOC = [
  { id: 'intro', label: 'Why freelance resumes fail' },
  { id: 'fail', label: '6 ways they fail' },
  { id: 'pop', label: 'The Portfolio-as-Proof pattern' },
  { id: 'nda', label: 'Framing client work without breaching NDA' },
  { id: 'rates', label: 'Should you mention rates?' },
  { id: 'to-fte', label: 'Freelance to full-time transition' },
  { id: 'fte-to', label: 'Full-time to freelance transition' },
  { id: 'summaries', label: '4 worked summaries' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '40+ summaries by role and experience level.', read: 9 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Put numbers on work even when data is messy.', read: 9 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '200+ verbs ranked by function and seniority.', read: 7 },
  { title: 'How to Tailor a Resume', slug: 'tailor-resume', excerpt: 'Align your resume to a specific job description.', read: 10 },
  { title: 'Resume Format Guide', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
];

export default function FreelanceResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Freelance & Contract"
      breadcrumbCurrent="Freelance resume"
      title="Freelance Resume: How to Sell Self-Employment (2026)"
      subtitle="How to frame freelance, contract, and self-employed work so it reads like a career, not a gap. Includes the Portfolio-as-Proof pattern and 4 worked summaries."
      dateModified="2026-06-21"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Hiring managers read freelance resumes with a specific skepticism: is this a real career, or a euphemism for unemployment? Your resume has about 10 seconds to answer that. The pattern below handles the answer directly, frames client work honestly, and converts freelance experience into the currency full-time hiring uses: ownership, outcomes, and scope.
          </p>
        </div>
        <p>
          Freelancing sits awkwardly on a traditional resume template. The template wants one employer per block, a neat start and end date, a promotion chain. Freelance work is none of those things. You have 12 clients in 3 years, overlapping engagements, scope that shifts mid-project, and half your work is under NDA. The standard resume format actively misrepresents what you did.
        </p>
        <p className="mt-3">
          The fix is not to force freelance into the template. It is to rebuild the Experience section around the actual unit of freelance work: the engagement. Each engagement gets a micro case study. Clients get grouped by archetype when names cannot be disclosed. Metrics come from outcomes, not titles. The result reads like a career spent solving problems across many contexts, which is exactly what it was.
        </p>
      </section>

      <section id="fail" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 ways freelance resumes fail</h2>
        <div className="space-y-3">
          {WHY_FAIL.map((x, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{x.r}</p>
              <p className="text-sm text-gray-700">{x.w}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pop" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Portfolio-as-Proof pattern</h2>
        <p className="mb-4">
          Standard resumes show work through prose. Freelance resumes show work through portfolio links and curated case studies. The Portfolio-as-Proof pattern has four elements:
        </p>
        <div className="space-y-3">
          {POP.map((x, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{x.name}</p>
              <p className="text-sm text-gray-700">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700">
          The single employer block (Independent Consultant, Jan 2021 to Present) sits at the top of Experience. Under it, 3 to 5 featured engagements each formatted as: client archetype, scope, outcome, stack. This reads as one continuous business with a portfolio of work inside it, not 12 disconnected gigs.
        </p>
      </section>

      <section id="nda" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Framing client work without breaching NDA</h2>
        <p className="mb-3">NDA paralysis is the single biggest cause of weak freelance bullets. The bullets come out as &quot;Worked on various projects&quot; because the freelancer is scared of naming names. The workaround is archetype framing:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Instead of:</strong> &quot;Redesigned checkout for [Client Name].&quot; <br /><strong>Use:</strong> &quot;Redesigned checkout for a Series B fintech (15M users); 22 percent drop in cart abandonment.&quot;</li>
          <li><strong>Instead of:</strong> &quot;Built dashboard for private client.&quot; <br /><strong>Use:</strong> &quot;Built analytics dashboard for a 300-person D2C brand; replaced manual spreadsheet process used by 12 ops staff.&quot;</li>
          <li><strong>Instead of:</strong> &quot;Various logo projects.&quot; <br /><strong>Use:</strong> &quot;11 brand identities shipped for early-stage startups (seed to Series A), 4 of which went on to raise Series B within 18 months.&quot;</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700">Rule of thumb: if you can describe the company with 3 facts (stage, size, industry) you have enough context. You do not need the name. Keep a separate document with real client names that you can disclose in interview with permission.</p>
        <p className="mt-3 text-sm text-gray-700"><strong>Logo list workaround:</strong> If you have client approval for 3 to 5 name drops, include a discrete &quot;Selected clients&quot; line: &quot;Selected clients: Stripe, Linear, Notion (via agency).&quot; Never list all clients. Over-listing signals desperation.</p>
      </section>

      <section id="rates" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Should you mention rates?</h2>
        <p className="mb-3">Usually no. Rates on a resume look transactional and can anchor salary negotiations to a number that may not translate. Exceptions:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Day-rate signalling for enterprise contract roles:</strong> &quot;Current day rate: 1,200 GBP&quot; is fair on a contract-track CV in the UK / EU. Helps gatekeepers filter.</li>
          <li><strong>Revenue as business proof:</strong> &quot;Grew consulting practice to 250K USD ARR in 18 months&quot; frames freelancing as a business. Uses revenue, not rate.</li>
          <li><strong>Never list hourly rates in USD for international work:</strong> too much context lost (cost of living, client geography). Use revenue or project-count proxies instead.</li>
        </ul>
      </section>

      <section id="to-fte" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Freelance to full-time transition</h2>
        <p className="mb-3">Hiring managers reading a freelance-to-FTE resume have three questions: (1) can this person commit, (2) will they get bored, (3) why now?</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Address the &quot;why now&quot; explicitly.</strong> In the summary: &quot;Returning to full-time after 4 years of freelance to focus on one product, one team, and longer-term ownership.&quot; Naming the motivation kills the doubt.</li>
          <li><strong>Lead with longest engagement.</strong> If you had one 14-month engagement and five 2-month ones, the 14-month goes first. It proves commitment.</li>
          <li><strong>Convert freelance language to FTE language.</strong> &quot;Retained across 3 engagements&quot; becomes &quot;Partnered across 3 product cycles.&quot; &quot;Delivered to spec&quot; becomes &quot;Owned end-to-end delivery.&quot;</li>
          <li><strong>Skip the consultant vibe in bullets.</strong> Traditional FTE roles want &quot;shipped,&quot; &quot;led,&quot; &quot;grew.&quot; Avoid &quot;advised,&quot; &quot;recommended,&quot; &quot;presented&quot; unless those are the actual actions.</li>
        </ul>
      </section>

      <section id="fte-to" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Full-time to freelance transition</h2>
        <p className="mb-3">The opposite direction (leaving FTE to go independent) is less common as a resume-writing task but increasingly relevant as more senior people go solo. The resume becomes a sales asset, not a hiring asset.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Lead with credibility, not availability.</strong> The summary should signal &quot;hired&quot; energy, not &quot;hiring me.&quot; &quot;8 years at Stripe leading checkout; now taking 4 concurrent clients on payment strategy.&quot;</li>
          <li><strong>Make the engagement shape explicit.</strong> Prospects need to know how you work: retainer, project, fractional, hourly. State it: &quot;Typical engagement: 3-month retainer, 15 hours/week, 12K USD/month.&quot;</li>
          <li><strong>Anchor with your old title.</strong> Your last FTE role is social proof. &quot;Ex-Head of Product at Ramp&quot; in the headline is the strongest signal you have.</li>
          <li><strong>Outcomes, not years.</strong> One shipped product at Ramp beats 4 years at Ramp as a bullet. Specifics anchor.</li>
        </ul>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 worked summaries</h2>
        <div className="space-y-4">
          {WORKED_SUMMARIES.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{s.role}</p>
              <p className="text-sm text-gray-700 italic">&quot;{s.s}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.freelancersunion.org/resources/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Freelancers Union career resources</a></li>
          <li><a href="https://hbr.org/2018/03/thriving-in-the-gig-economy" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on thriving in the gig economy</a></li>
          <li><a href="https://www.upwork.com/resources/freelance-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Upwork on writing a freelance resume</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I list every client?', a: 'No. Curate to 3 to 5 featured engagements. A long client list looks like a receipt, not a resume. Depth per client beats breadth.' },
            { q: 'How do I handle overlapping engagements?', a: 'Use the single-employer block (Independent Consultant) with engagements nested inside. Dates on engagements can overlap; dates on the parent block are continuous.' },
            { q: 'What job title should I use?', a: 'Pick one: &quot;Freelance [Discipline],&quot; &quot;Independent [Discipline] Consultant,&quot; or &quot;[Discipline] Consultant.&quot; Use it consistently on resume, LinkedIn, and email signature. ATS matching depends on this.' },
            { q: 'Should I include a company name for my freelance work?', a: 'If you have an incorporated business, yes. Use the business name. If not, &quot;Independent&quot; or &quot;Self-Employed&quot; is fine. Consistency matters more than grandeur.' },
            { q: 'How do I quantify outcomes when clients do not share data?', a: 'Use proxy metrics: hours saved, team size affected, number of users, release frequency, retention rates. Ask clients for a single sentence of impact at project close; most are happy to provide.' },
            { q: 'Is a portfolio required for a freelance resume?', a: 'For creative, design, and engineering roles, yes. No portfolio = no credibility. For strategy, consulting, or ops freelance work, case studies or testimonials substitute.' },
            { q: 'How long should a freelance resume be?', a: 'One page if you have under 5 years of freelance. Two pages if over 5 years or if you have substantial FTE history before going independent. Do not stretch.' },
            { q: 'Will a freelance resume pass ATS?', a: 'Yes, if formatted as a single-employer block with nested engagements. The ATS parses one job entry, not 12. Keep the company name (&quot;Independent&quot;), role title, and date range clean.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">A resume built for freelance work</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz supports the engagement-nested format, portfolio headers, and archetype bullets that make freelance resumes read like a career.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
