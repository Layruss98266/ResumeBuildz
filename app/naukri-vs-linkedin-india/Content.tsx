'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const COMPARE = [
  { aspect: 'Total active listings (India)', naukri: '~500k active jobs, heaviest in IT services, BFSI, and manufacturing.', linkedin: '~350k jobs tagged India; skew toward product, startups, and global roles.', insta: '~25k to 40k active roles at any time; curated for tech and product.' },
  { aspect: 'Fresher friendliness', naukri: 'Strong. Huge fresher-listing volume from TCS, Infosys, Wipro, Cognizant, Accenture.', linkedin: 'Moderate. Job filter for entry-level exists but most listings assume 2+ years.', insta: 'Weak. Minimum 1 year full-time experience required to use the platform.' },
  { aspect: 'Best for', naukri: 'IT services, BPO, banking operations, manufacturing, early-career applications.', linkedin: 'Product, startups, international roles, senior IC and leadership, networking.', insta: 'Mid-senior tech (2 to 12 years), product, data, design; salary-transparent listings.' },
  { aspect: 'Recruiter search model', naukri: 'Recruiters search a resume database and call. Inbound calls are common.', linkedin: 'InMails from recruiters. Messaging open to candidates who opted in (Open to Work).', insta: 'Reverse-apply model: companies express interest first, candidate accepts or declines.' },
  { aspect: 'Salary transparency', naukri: 'Rare. Mostly Best in Industry or Not disclosed.', linkedin: 'Partial. Salary ranges shown on ~40% of Indian listings in 2026.', insta: 'Full. Every listing shows min and max CTC.' },
  { aspect: 'Application quality signal', naukri: 'Low. High spray-and-pray volume. Average recruiter-to-call rate is ~4%.', linkedin: 'Medium. Easy Apply lowers quality; careful tailoring raises it sharply.', insta: 'High. Companies reach out only after reviewing the full profile.' },
  { aspect: 'Mobile experience', naukri: 'App is polished for India-specific flows (video profile, call-me-now, recharge alerts).', linkedin: 'App is global-standard; fast on feed and messaging.', insta: 'App is clean but desktop web remains the primary experience.' },
  { aspect: 'Paid tiers worth paying for?', naukri: 'Sometimes. Resume Highlighter is cheap but marginal; Profile Blast can flood you with low-quality calls.', linkedin: 'Yes for active job hunt (Premium 1 month) to see applicant insights and send InMails.', insta: 'No. Free tier gets you everything. Paid tier is for recruiters, not candidates.' },
];

const WHO = [
  { profile: 'Fresher (B.Tech / BCA / BBA, 0 yrs)', pick: 'Naukri first (volume), LinkedIn second (network-building, future-proof).', reason: 'Instahyre requires 1+ year of full-time exp, so skip for now.' },
  { profile: 'Early-career IT services (1 to 3 yrs)', pick: 'LinkedIn for lateral moves, Instahyre for product-startup jumps, Naukri for IT services ladder.', reason: 'The sweet spot for a 3-platform approach. Each covers a different market segment.' },
  { profile: 'Mid-career product / tech (3 to 8 yrs)', pick: 'Instahyre primary, LinkedIn secondary. Skip Naukri except for specific company alerts.', reason: 'Instahyre curation and salary transparency save dozens of hours. LinkedIn for network-driven opportunities.' },
  { profile: 'Senior IC / Staff engineer (8+ yrs)', pick: 'LinkedIn primary. Instahyre secondary. Naukri rarely.', reason: 'Senior roles mostly hire through network or executive search. LinkedIn is where those conversations live.' },
  { profile: 'Non-tech professional (sales, ops, HR, finance)', pick: 'Naukri primary, LinkedIn secondary.', reason: 'Instahyre does not cover these functions deeply. Naukri has the volume.' },
  { profile: 'Career changer / returning after break', pick: 'LinkedIn primary, Naukri secondary.', reason: 'LinkedIn posts and network explanations let you tell the story. Naukri is resume-first and leaves less room for nuance.' },
];

const NAUKRI_TIPS = [
  'Keep the Headline crisp: Role + Years + 2 core skills. Avoid quotes, emojis, or buzzwords. Naukri sorts recruiter search by keyword match and recency.',
  'Update profile every 15 to 21 days (login, tweak 1 field, save). Recency boosts recruiter visibility sharply. Set a calendar reminder.',
  'Use the Resume Headline, Key Skills, and IT Skills sections with exact JD phrasing. Recruiters filter on these; free-text Summary is weighted lower.',
  'Upload a .docx primary and a PDF secondary. Naukri preview on the recruiter side renders .docx better than PDF.',
  'Turn off Profile Blast unless actively job hunting. It generates high call volume, mostly low quality.',
];

const LINKEDIN_TIPS = [
  'Headline must include role keywords. Hiring for Backend Engineers | Prev Flipkart | Go, Kafka, AWS outperforms generic taglines by ~3x in search impressions.',
  'Turn on Open to Work (recruiters-only mode, not the public green ring) unless you need to signal openly.',
  'Add 3 to 5 featured posts or projects above your Experience. Linkedin page view depth drops after 30 seconds; visuals hold attention.',
  'Use Easy Apply sparingly. 80 percent of your applications should be via the company career page referral flow. Easy Apply is for volume, not quality.',
  'Set 3 saved searches with weekly alerts (not daily). Quality over noise.',
];

const INSTAHYRE_TIPS = [
  'Fill the entire profile before browsing. Instahyre dedupes you against the recruiter search; a 60 percent filled profile gets half the interest.',
  'Set salary expectations 15 to 20 percent above current CTC. Below current filters you out of better listings.',
  'Respond to company interest within 48 hours. Drop-off is steep after that; stale candidates fall out of the top of recruiter inbox.',
  'Use the Pass feature aggressively. Every pass tunes the match algorithm toward better-fit roles.',
  'Keep the profile summary to 3 to 4 lines. Long summaries get skimmed; short ones get read.',
];

const MISTAKES = [
  { m: 'Same profile across all 3 platforms', fix: 'Tune each. Naukri rewards keyword density, LinkedIn rewards narrative and social proof, Instahyre rewards completeness and specificity.' },
  { m: 'Spray 80 applications a day on Naukri', fix: 'Recruiters notice your number-of-companies-applied. Apply to 5 to 8 per day with tailored headline.' },
  { m: 'Using LinkedIn Easy Apply as the primary channel', fix: 'Easy Apply has the worst conversion rate (about 1 to 2 percent). Use company career site + referral via LinkedIn network instead.' },
  { m: 'Ignoring Instahyre because of the exp requirement', fix: 'If you have 1+ year full-time, create the profile even if you are not actively hunting. Passive offers come in for months.' },
  { m: 'Leaving salary blank on Instahyre', fix: 'Blank salary expectations push your profile below candidates who filled it in.' },
];

const TOC = [
  { id: 'intro', label: 'Which platform for which candidate' },
  { id: 'compare', label: 'Side by side: 8 dimensions compared' },
  { id: 'who', label: 'Who should use which platform' },
  { id: 'naukri', label: 'Naukri: 5 tactics that move the needle' },
  { id: 'linkedin', label: 'LinkedIn India: 5 tactics that get callbacks' },
  { id: 'insta', label: 'Instahyre: 5 tactics for the curated feed' },
  { id: 'mistakes', label: '5 mistakes across all 3 platforms' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Naukri Resume Tips', slug: 'naukri-resume-tips', excerpt: 'Resume Highlighter, Key Skills, and recency tricks.', read: 10 },
  { title: 'LinkedIn URL on Resume', slug: 'linkedin-url-on-resume', excerpt: 'How to format it + custom URL setup.', read: 7 },
  { title: 'TCS NQT Resume Guide', slug: 'tcs-nqt-resume-guide', excerpt: 'Exact format that gets NQT shortlists.', read: 12 },
  { title: 'Infosys InfyTQ Guide', slug: 'infosys-infytq-guide', excerpt: 'Resume, test, and interview playbook.', read: 11 },
  { title: 'Wipro Elite NTH Guide', slug: 'wipro-elite-nth-guide', excerpt: 'Resume and prep for the Elite NTH drive.', read: 10 },
];

export default function NaukriVsLinkedinIndiaPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="Naukri vs LinkedIn vs Instahyre"
      title="Naukri vs LinkedIn vs Instahyre: Indian Job Boards Compared (2026)"
      subtitle="Three platforms, three very different games. Where each one wins, who should use which, and the platform-specific tactics that actually raise callback rate. Built for Indian candidates in 2026."
      dateModified="2026-07-19"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The one-line version</p>
          <p className="text-gray-700">
            Naukri is volume and breadth. LinkedIn is narrative and network. Instahyre is curation and salary transparency. You do not have to pick one; you should pick one primary and one secondary based on where you are in your career. Applying on all three with the same profile is the most common mistake, and it costs callbacks on all three.
          </p>
        </div>
        <p>
          In 2026 the Indian job search is still fragmented across platforms. Each of the three major ones serves a different slice of the market, and each rewards different behaviour. A fresher from a tier-2 college doing a services-company job hunt on LinkedIn alone will see very thin results. A Staff engineer at a unicorn running a Naukri-only search will hear mostly from 3-year-old job descriptions. Picking the right platform for your stage is the single biggest lever. Tailoring your profile to that platform is the second.
        </p>
      </section>

      <section id="compare" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Side by side: 8 dimensions compared</h2>
        <div className="space-y-3">
          {COMPARE.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{c.aspect}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold text-indigo-700">Naukri:</span> {c.naukri}</p>
              <p className="text-sm text-gray-700 mt-1"><span className="font-semibold text-blue-700">LinkedIn:</span> {c.linkedin}</p>
              <p className="text-sm text-gray-700 mt-1"><span className="font-semibold text-emerald-700">Instahyre:</span> {c.insta}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">Volumes are rough 2026 estimates based on public platform stats and listing counts. They shift month to month.</p>
      </section>

      <section id="who" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Who should use which platform</h2>
        <div className="space-y-3">
          {WHO.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{w.profile}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Pick:</span> {w.pick}</p>
              <p className="text-xs text-gray-600 mt-1">{w.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="naukri" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Naukri: 5 tactics that move the needle</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {NAUKRI_TIPS.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section id="linkedin" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">LinkedIn India: 5 tactics that get callbacks</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {LINKEDIN_TIPS.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section id="insta" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instahyre: 5 tactics for the curated feed</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {INSTAHYRE_TIPS.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 mistakes across all 3 platforms</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.naukri.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Naukri.com</a></li>
          <li><a href="https://www.linkedin.com/help/linkedin/answer/a507664" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn: Open to Work guide</a></li>
          <li><a href="https://www.instahyre.com/about/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Instahyre about page and hiring model</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Which is better for freshers in India: Naukri or LinkedIn?', a: 'Naukri for volume (more fresher listings, especially IT services), LinkedIn for networking and future-proofing. Use both, with Naukri as primary.' },
            { q: 'Is Instahyre only for tech?', a: 'Mostly. Product, data, design, and tech roles dominate. Sales, marketing, and ops listings exist but are thin compared to Naukri or LinkedIn.' },
            { q: 'Do I need LinkedIn Premium in India?', a: 'Not year-round. A 1-month Premium trial during an active job hunt pays for itself through InMail and applicant insights. Otherwise free is fine.' },
            { q: 'Should I hide my current company on Naukri?', a: 'Yes, if your current employer uses Naukri for internal recruiting. Use Hide Company from Current Employer; you still stay searchable.' },
            { q: 'Is it bad to show Open to Work on LinkedIn?', a: 'Use the recruiter-only setting, not the public green ring. The green ring reduces callbacks from some hiring managers who read it as desperate.' },
            { q: 'How many jobs should I apply to per week?', a: 'Quality over volume. 20 to 30 tailored applications per week outperforms 200 spray applications. Track callback rate, not application count.' },
            { q: 'Are referral-based applications really better?', a: 'Yes. Referred candidates have 4 to 5x higher interview rates in Indian tech hiring. Use LinkedIn to find the referrer before you apply on the career site.' },
            { q: 'Is Monster India or Shine still worth using?', a: 'Thin in 2026. Both exist but recruiter activity and listing quality are well below the big three. Skip unless your industry still uses them (some PSU and traditional manufacturing roles).' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">One resume, three board-ready exports</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz exports Naukri-friendly DOCX, LinkedIn-ready PDF, and an Instahyre-style summary block from the same master profile. Build yours free.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
