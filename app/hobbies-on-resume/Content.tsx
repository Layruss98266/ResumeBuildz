'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const WHEN_HELP = [
  { scenario: 'Fresher with thin work history', reason: 'Hobbies fill the page and surface traits (persistence, curiosity) that the Experience section cannot yet show. Code open-source projects, competitive programming ranks, and team sports signal exactly what hiring managers want to see from a new graduate.' },
  { scenario: 'Culture-heavy roles (design, content, brand, UX)', reason: 'The portfolio is the hard skill; hobbies signal cultural taste and range. A designer who writes a zine or a brand manager who runs a monthly supper club is a safer hire than one whose identity ends at the day job.' },
  { scenario: 'Small startups or founder-led teams', reason: 'Sub-50 person companies hire for long shifts in small rooms. Interests that show you are interesting to spend 10 hours a day with carry real weight when the CEO reads the resume.' },
  { scenario: 'Roles that mirror the hobby', reason: 'Applying to a running app and you run marathons. Applying to a gaming studio and you stream. Applying to a travel company and you have visited 34 countries. Direct role-to-hobby overlap is the strongest possible use case.' },
  { scenario: 'Building a non-work signal (leadership, creativity, resilience)', reason: 'Captain of a state-level hockey team, volunteer teacher for 3 years, ultra-marathoner. These are proofs that do not fit in the Experience block but absolutely shape hiring decisions.' },
];

const WHEN_SKIP = [
  { scenario: 'Senior roles at large corporates', reason: 'Director-and-above at Fortune 500 or MBB. The Experience section does the work. Hobbies read as filler and eat into the single page you already need to compress further.' },
  { scenario: 'Resumes already at the length limit', reason: 'If cutting the Hobbies section saves the last line that lets your resume fit 1 page, cut it. A tight page beats a cute hobbies row every time.' },
  { scenario: 'Ultra-conservative industries (law, banking, government)', reason: 'These sectors still treat the resume as a formal document. Hobbies beyond a 1-line footer can read as unprofessional, especially in India and Japan.' },
  { scenario: 'When your hobbies are the same as everyone else', reason: 'Reading, travelling, music, movies. Zero signal. The recruiter has seen 400 identical lists this week.' },
  { scenario: 'Polarising or risky hobbies', reason: 'Political activism, religion-specific activities, hunting, extreme sports injuries. Even when honest, they widen the chance of a biased screen-out.' },
];

const GOOD_HOBBIES = [
  { category: 'Technical hobbies (software, data, hardware roles)', examples: 'Contributing to open-source (name the repo). Competitive programming (Codeforces 1900+, LeetCode top 5 percent). Hardware tinkering (built a home NAS, ran Raspberry Pi home automation). Side projects with usage numbers (Chrome extension with 3k weekly users). Hackathon wins (top 3 at X, 2 years in a row).' },
  { category: 'Creative hobbies (design, content, marketing roles)', examples: 'Published a zine or newsletter (name it, add Substack URL). Photography with a body of work (link Instagram or portfolio). Pottery, screen-printing, handwork crafts. Amateur filmmaking (link a YouTube short). Long-form writing (Medium with 2k followers). Music production (tracks on SoundCloud).' },
  { category: 'Physical and team hobbies (culture fit, resilience signals)', examples: 'Long-distance running (sub-4 marathon, FM time). Cycling (Brevets, RAAM-style distances). Team sports at state or college level. Martial arts (belt level). Trekking with named high-altitude peaks (Stok Kangri, EBC, Kilimanjaro). Chess tournaments (FIDE rating).' },
  { category: 'Community hobbies (leadership and people signals)', examples: 'Volunteer teaching (name the NGO, years, hours per week). Tech community organising (local chapter lead for Python Pune, Django Girls). Language tutor. Book club organiser (3+ years). Animal rescue volunteer. Blood donor (8+ donations).' },
  { category: 'Intellectual hobbies (analyst, research, strategy roles)', examples: 'Competitive quizzing (regular-finalist at corporate quizzes). Reading with a tracked system (50 books per year plus Goodreads link). Chess. Go. Poker (tournament wins, not casual home games). Language learning (B2 French via DELF).' },
];

const BAD_HOBBIES = [
  { h: 'Reading, Music, Movies (listed alone)', why: 'Everyone writes these. They carry zero signal and make the section look like a filler.' },
  { h: 'Travelling (listed alone)', why: 'Only a signal if you can attach a number (34 countries) or a story. Vague travel claims read as self-indulgent.' },
  { h: 'Socialising / spending time with family', why: 'Not a hobby. Reads as a fill-the-line move.' },
  { h: 'Internet browsing / watching YouTube', why: 'Signals you did not know what to write.' },
  { h: 'Anything political, religious, or polarising', why: 'Even when honest, it widens bias-driven screen-outs. Keep it off unless the role specifically invites it.' },
  { h: 'Extreme sports without context', why: 'Skydiving is cool until the recruiter worries about insurance risk. If you list it, add that you are certified and current.' },
];

const TOC = [
  { id: 'intro', label: 'Do hobbies still belong on a 2026 resume?' },
  { id: 'when-help', label: 'When hobbies actually help (5 situations)' },
  { id: 'when-skip', label: 'When to skip the section (5 situations)' },
  { id: 'good', label: 'Hobbies that carry signal (by category)' },
  { id: 'bad', label: 'Hobbies to skip (and why)' },
  { id: 'format', label: 'How to format the section' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: 'The 7-section format that beats Indian and global ATS.', read: 11 },
  { title: 'Campus Placement Resume', slug: 'campus-placement-resume', excerpt: 'The exact format Tier-1 and Tier-2 placement cells expect.', read: 10 },
  { title: '25 Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by stage and industry.', read: 14 },
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
  { title: 'How to Tailor a Resume', slug: 'tailor-resume', excerpt: 'The 4-pass method that swaps 10 to 15 words per JD.', read: 9 },
];

export default function HobbiesOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Hobbies on resume"
      title="Resume Hobbies and Interests: When They Actually Help (2026)"
      subtitle="Hobbies help in 5 clear situations, hurt in 5 others, and mostly do nothing. This guide gives the full decision rule, 30 high-signal hobbies, the ones to never list, and the 3-line format that fits any resume."
      dateModified="2026-07-23"
      readingTime={9}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The short version</p>
          <p className="text-gray-700">
            Hobbies are optional. They help when your Experience block is thin, the role has culture weight, or the hobby mirrors the role. They hurt when the list is generic, polarising, or when the resume is already fighting for space. Default for freshers: include. Default for 5+ year professionals at large companies: skip.
          </p>
        </div>
        <p>
          Every year, the same debate comes back. Should I keep hobbies on my resume? Is it unprofessional? Will the recruiter care? The honest answer is that it depends, but not in the mealy-mouthed way that phrase usually suggests. There is an actual decision rule. Hobbies are a tool, and like any tool, they work brilliantly in some situations and backfire in others.
        </p>
        <p className="mt-3">
          The wrong question is should I add hobbies to my resume. The right question is does a hobbies section earn the 3 to 5 lines it will cost me. If yes, pick hobbies that carry signal, not filler. If no, use those lines for something else (a second project, an extra bullet on your best role, a certification).
        </p>
      </section>

      <section id="when-help" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">When hobbies actually help</h2>
        <div className="space-y-3">
          {WHEN_HELP.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{w.scenario}</p>
              <p className="text-sm text-gray-700">{w.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="when-skip" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">When to skip the section</h2>
        <div className="space-y-3">
          {WHEN_SKIP.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{w.scenario}</p>
              <p className="text-sm text-gray-700">{w.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="good" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Hobbies that carry signal</h2>
        <p className="mb-4">Strong hobbies share three traits. They are specific (not reading, a book club you have run for 3 years). They are verifiable (not travel, a link to 34 countries visited). And they map loosely to the role or to a trait the role rewards.</p>
        <div className="space-y-4">
          {GOOD_HOBBIES.map((g, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2">{g.category}</p>
              <p className="text-sm text-gray-700">{g.examples}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bad" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Hobbies to skip (and why)</h2>
        <ul className="space-y-3">
          {BAD_HOBBIES.map((b, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{b.h}</p>
              <p className="text-sm text-gray-700">{b.why}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to format the section</h2>
        <p className="mb-3">Keep it tight. 3 to 5 hobbies, one line each, with a small parenthetical detail that makes the claim verifiable. Place it at the bottom of the resume, below Projects or Certifications, never above Experience. Section heading: Interests or Beyond Work. Avoid Hobbies as a label for senior resumes; Interests reads more polished.</p>
        <p className="mb-3 font-semibold text-gray-900">Example (single line format):</p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 font-mono">
          Interests: Open-source (contributed to Prisma, 12 merged PRs). Long-distance running (Ladakh marathon 2025 finisher, 4h 38m). Competitive quizzing (regular finalist, BCQC). Teaching (Teach For India fellow, 2 years).
        </div>
        <p className="mt-4 mb-3 font-semibold text-gray-900">Example (bullet format for freshers):</p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800">
          <p>INTERESTS</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Competitive programming (Codeforces 1812, LeetCode top 4 percent)</li>
            <li>Open-source (maintainer of a 900-star CLI tool on GitHub)</li>
            <li>Badminton (college team, 2 inter-college medals)</li>
          </ul>
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2020/03/how-to-write-resume-hobbies" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">HBR on resume interests and hobbies</a></li>
          <li><a href="https://www.shrm.org/topics-tools/news/talent-acquisition/hobbies-resume-what-recruiters-think" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">SHRM survey on what recruiters think of hobbies</a></li>
          <li><a href="https://www.themuse.com/advice/what-to-put-on-your-resume-when-you-have-no-experience" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on fresher resumes and interests</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Will recruiters actually read the hobbies section?', a: 'Yes, but only if they have already decided to read you in full. Hobbies rarely make an application. They can seal a decision when the recruiter is choosing between two similar candidates.' },
            { q: 'Should I list hobbies on a software engineer resume?', a: 'If the hobby is technical (open-source, competitive programming, hackathons, homelabs), yes. If it is generic (reading, travelling), skip the section on a senior SWE resume.' },
            { q: 'How many hobbies should I list?', a: '3 to 5. Fewer than 3 looks accidental; more than 5 reads as filler. Quality of each entry (with numbers and links) matters more than count.' },
            { q: 'Can I list social media management as a hobby?', a: 'Only if you have real reach (15k+ followers with a clear niche). Otherwise it reads as a claim rather than a credential.' },
            { q: 'Should hobbies come before or after Projects?', a: 'After. Projects are hard proof of skills; hobbies are soft signal. The resume reads top-down by weight of evidence.' },
            { q: 'Can hobbies hurt me?', a: 'Yes. Polarising hobbies (political activism, religion-specific roles, risky sports) can trigger bias-driven screen-outs. When in doubt, leave them off.' },
            { q: 'Do Indian recruiters care about hobbies?', a: 'Campus recruiters at Tier-1 Indian campuses still glance at the section on fresher resumes. Lateral recruiters above 5 years of experience rarely do.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that decides for you</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz auto-suggests whether a Hobbies section adds value based on your stage, target role, and remaining page space. No more guesswork.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
