'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const WORTHY = [
  { test: 'Does it have real users (or real commits)?', detail: '100+ users or 50+ GitHub stars is the rough bar for public traction. For internal or solo projects, a stable commit cadence over 3+ months is a proxy. A repo with 2 commits from a weekend is not worth listing.' },
  { test: 'Did you ship it end to end?', detail: 'A project that is design-only or code-only signals partial effort. Something live (deployed URL, app store listing, published npm package) signals you can finish.' },
  { test: 'Does it show a skill your resume needs?', detail: 'If the JD wants React + Postgres and your project is a React + Postgres app, list it near the top. If the project is unrelated (a 3D printed planter), move it to a personal interests footnote or skip it.' },
  { test: 'Did you solve a problem someone cared about?', detail: 'Hackathons, client work for a campus club, or an OSS PR that fixed a real bug all clear this bar. Tutorial clones do not.' },
  { test: 'Can you explain it in 60 seconds?', detail: 'If you cannot articulate what it does, who it is for, and one tradeoff you made, do not list it. Interviewers will ask.' },
];

const BULLETS = [
  { weak: 'Built a task manager app using React and Node.js.', strong: 'Built and launched Tasknotes, a Kanban + calendar task manager (Next.js 15, Postgres, tRPC). 2.1k signups in 4 months, 340 weekly actives. Handled auth, billing (Stripe), and 99.9% uptime solo.' },
  { weak: 'Open source contributor to various Python libraries.', strong: 'Shipped 11 merged PRs to pandas and numpy in 2025 (doc fixes, 2 bug fixes in DataFrame.groupby, 1 new method in timedelta arithmetic). Listed in pandas 2.3 release notes.' },
  { weak: 'Won a hackathon with a team project.', strong: 'Won DevFolio ETHIndia 2025 (1st of 340 teams). Led backend for a gasless-NFT marketplace: Solidity smart contracts + Node indexer processing 12k txn in the 36-hr event.' },
  { weak: 'Built a chatbot for fun.', strong: 'Shipped Lexa, a WhatsApp bot for local tutors to auto-schedule trial classes. 38 tutors onboarded, 400+ bookings in Q1 2026. Python + FastAPI + Twilio + Postgres. Paying users: 12 at INR 299/mo.' },
];

const PLACEMENT = [
  { stage: 'Fresher / final-year student', where: 'Projects section, above Experience. Make them the star. 4 to 6 projects, each with 2 to 3 bullets.' },
  { stage: '0 to 3 years experience', where: 'Projects section, below Experience. 2 to 3 projects, 1 to 2 bullets each.' },
  { stage: '3 to 7 years experience', where: 'Only if directly relevant to the JD or demonstrates a skill not covered by day-job. 1 to 2 projects, 1 bullet each.' },
  { stage: '7+ years experience', where: 'A one-line Outside Work section if the projects carry real weight (conference talks, popular OSS, published book). Otherwise skip.' },
];

const FORMATS = [
  { label: 'Name, one-line description, tech stack, outcome', detail: 'Tasknotes: Kanban + calendar task manager for solo freelancers. Next.js 15, Postgres, Stripe. 2.1k signups, 340 WAU. github.com/you/tasknotes' },
  { label: 'Hackathon win with team credit', detail: 'ETHIndia 2025 Winner (1st of 340 teams): Co-built a gasless NFT marketplace (Solidity + Node). My scope: smart contracts and backend indexer. Team: 3 engineers.' },
  { label: 'OSS contribution list', detail: 'Open source: 11 merged PRs to pandas and numpy (2025). Notable: fix for DataFrame.groupby edge case, new timedelta helper. Listed in pandas 2.3 release notes.' },
  { label: 'Research / publication', detail: 'Published: A fast BM25 alternative for hybrid search, in-house blog post, 12k reads, 230 HN upvotes. Work reused by 3 teams at previous employer.' },
];

const MISTAKES = [
  { m: 'Listing 8 projects with 1 line each', fix: 'Pick 3 to 4 strong ones and give each the detail space to show outcome and stack.' },
  { m: 'Using adjectives instead of numbers', fix: '2.1k signups beats a popular side project every time.' },
  { m: 'Including a tutorial clone', fix: 'Todo apps and Netflix clones signal you have watched a tutorial, not that you can ship. Skip.' },
  { m: 'Forgetting the live link', fix: 'A working URL or repo link doubles the credibility. Dead links halve it.' },
  { m: 'Claiming team work as solo', fix: 'Always credit collaborators and specify your scope. Interviewers verify.' },
  { m: 'Listing abandoned projects', fix: 'A repo with last commit 18 months ago signals you lose interest. Either revive it or drop it.' },
];

const TOC = [
  { id: 'intro', label: 'When side projects help your resume' },
  { id: 'worthy', label: '5 tests for whether a project is worth listing' },
  { id: 'placement', label: 'Where to place projects by career stage' },
  { id: 'formats', label: '4 formats for the Projects section' },
  { id: 'bullets', label: '4 weak vs strong bullet rewrites' },
  { id: 'github', label: 'GitHub, demo links, and the 10-second check' },
  { id: 'mistakes', label: '6 mistakes that waste the section' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: '7-section format for campus and off-campus.', read: 11 },
  { title: 'Quantify Your Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'How to turn vague work into credible numbers.', read: 10 },
  { title: '200+ Resume Action Verbs', slug: 'resume-action-verbs', excerpt: 'Verbs grouped by role and category.', read: 9 },
  { title: 'Campus Placement Resume', slug: 'campus-placement-resume', excerpt: 'What campus recruiters look for in 7 seconds.', read: 9 },
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, tools, certifications.', read: 11 },
];

export default function SideProjectsOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Side projects on your resume"
      title="How to Show Side Projects on Your Resume (2026)"
      subtitle="Which side projects belong on a resume, where to place them by career stage, how to write the bullet so it signals shipped-not-toyed, and the 6 mistakes that turn a projects section into filler."
      dateModified="2026-07-16"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this section earns interviews</p>
          <p className="text-gray-700">
            For freshers and early-career candidates, a side project often decides the callback. A shipped project with real users beats 3 years of classroom grades. For experienced candidates, one sharp project covering a skill your day-job does not show can open doors your work history cannot. But a cluttered Projects section (8 items, all tutorial clones, no links) actively hurts. The goal of this guide is to make yours count.
          </p>
        </div>
        <p>
          There is a narrow window where side projects move the needle. Too few and the hiring manager wonders what you do outside required work. Too many or too weak and you look like a hobbyist who never finishes. The sweet spot is 2 to 4 projects that are shipped, quantifiable, and technically relevant to the role. Everything else in this guide is about getting you to that sweet spot.
        </p>
      </section>

      <section id="worthy" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 tests for whether a project is worth listing</h2>
        <p className="mb-4">If a project clears at least 3 of these 5 tests, list it. If it clears 2 or fewer, drop it or revive it before the next application.</p>
        <div className="space-y-3">
          {WORTHY.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1"><span className="text-indigo-600 mr-2">{i + 1}.</span>{w.test}</p>
              <p className="text-sm text-gray-700">{w.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="placement" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Where to place projects by career stage</h2>
        <div className="space-y-3">
          {PLACEMENT.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.stage}</p>
              <p className="text-sm text-gray-700">{p.where}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="formats" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 formats for the Projects section</h2>
        <div className="space-y-3">
          {FORMATS.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{f.label}</p>
              <p className="text-sm text-gray-700 italic">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bullets" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 weak vs strong bullet rewrites</h2>
        <div className="space-y-5">
          {BULLETS.map((b, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-2">
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r text-sm text-gray-800"><p className="text-xs font-semibold text-red-700 mb-1">Weak</p><p>{b.weak}</p></div>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r text-sm text-gray-800"><p className="text-xs font-semibold text-emerald-700 mb-1">Strong</p><p>{b.strong}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="github" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">GitHub, demo links, and the 10-second check</h2>
        <p className="mb-3">Every project bullet should end in a link a recruiter can click. The recruiter will spend 10 seconds on the other side of that click. What they see in those 10 seconds decides the callback.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>GitHub:</strong> Pin 3 to 6 repos on your profile. Each should have a README with a screenshot, a 2-paragraph description, and clear run instructions. A repo with no README actively hurts.</li>
          <li><strong>Live demo:</strong> Host on Vercel, Netlify, Railway, or Fly.io. Free tiers handle resume traffic easily. Add basic analytics so you can tell a recruiter {'&quot;'}hit 40 visits this week{'&quot;'} in a follow-up.</li>
          <li><strong>Video demo:</strong> A 60-second Loom or YouTube clip is a strong fallback if your project cannot be live (internal tool, mobile app that needs install). Link it from the README.</li>
          <li><strong>Custom domain:</strong> A custom domain (yourproject.com) signals commitment. A .vercel.app URL is acceptable but less polished.</li>
          <li><strong>Build badges:</strong> A green CI badge and a test-coverage badge take 5 minutes to add and raise perceived quality noticeably.</li>
        </ul>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 mistakes that waste the section</h2>
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
          <li><a href="https://github.blog/developer-skills/github/writing-a-great-readme/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">GitHub on writing a great README</a></li>
          <li><a href="https://opensource.guide/how-to-contribute/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Open Source Guide: how to contribute</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/projects-on-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide: projects on a resume</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many side projects should I list?', a: 'Freshers: 4 to 6. Early-career: 2 to 3. Mid-career: 1 to 2 if relevant. Senior: skip or one line if unusually strong (book, popular OSS, conference talk).' },
            { q: 'Do open source contributions count as side projects?', a: 'Yes, if they are merged and non-trivial. One-line typo fixes do not. Multi-PR work on a well-known library does, and carries weight.' },
            { q: 'Can I list a hackathon project I did not win?', a: 'Yes, if you shipped end to end. Say Built at ETHIndia 2025 and describe the outcome. Skip it if the demo does not run or was never deployed.' },
            { q: 'What if my project has no users yet?', a: 'Show the work: commit count, test coverage, a live demo link, a 60-second video. Traction is ideal but shipped + documented is still a lot better than nothing.' },
            { q: 'Should I include tutorial clones?', a: 'No. Todo apps, Netflix clones, and the standard tutorial projects signal you followed instructions. Build one novel feature on top before listing.' },
            { q: 'Is a blog a side project?', a: 'A technical blog with 20+ in-depth posts and measurable readership (RSS subscribers, Medium claps, HN appearances) is a project. A blog with 3 posts and no traffic is not.' },
            { q: 'Does ATS read the Projects section?', a: 'Yes, if labelled Projects, Personal Projects, or Side Projects. Unusual headings (My Builds, Playground) may not be detected.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Add a Projects section that earns interviews</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz gives the Projects section first-class layout with tech-stack tags, live-link fields, and ATS-safe headings. Build yours in 10 minutes.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
