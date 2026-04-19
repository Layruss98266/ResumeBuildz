'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const BLOCKS = [
  { block: 'Cover block (callout)', detail: 'A full-width callout at the top with your name, target role, and one-line positioning statement. Use a single emoji (avoid more, one is tasteful, three is spam).' },
  { block: 'Contact row (3-column)', detail: 'Email, phone, city on one row. Use Notion columns (type /columns) to align cleanly. Add icon prefixes from the Notion icon set or keep plain text.' },
  { block: 'Summary toggle', detail: 'A toggle block labelled "Summary" with 2 to 3 sentences inside. Toggles save space on the live page and keep the overview tidy; recruiters click to expand.' },
  { block: 'Experience database', detail: 'Create an inline database (not a page, a database). Properties: Role (title), Company (text), Start (date), End (date), Tags (multi-select for stack). View: gallery or timeline.' },
  { block: 'Project gallery', detail: 'Second inline database with cover images. Each project page holds the write-up, screenshots, and a live demo link. Gallery view with large cards reads best on desktop.' },
  { block: 'Skills matrix', detail: 'Use a simple 3-column table: language / framework / level. Keep it to 8 to 10 rows, not a laundry list. Frames competence without bloat.' },
  { block: 'Education and certifications', detail: 'A plain list or a small table. Keep to the last 2 entries; do not expand on high school unless you are a fresher.' },
  { block: 'Footer (testimonials)', detail: 'If you have 2 or 3 short quotes from past managers or clients, a clean quote block at the bottom lifts the whole page. Skip if you do not have them; fake testimonials read immediately.' },
];

const PROS = [
  { point: 'Shareable single URL', detail: 'One link covers the resume, portfolio, and long-form case studies. Recruiters clicking through LinkedIn see everything without a download.' },
  { point: 'Rich media (video, GIF, embeds)', detail: 'Embed Figma files, Loom walkthroughs, Codesandbox demos inline. Especially strong for designers, PMs, and devs with shippable UI work.' },
  { point: 'Always up to date', detail: 'One edit propagates everywhere the link lives. No PDF version drift, no "resume_final_v3_reallyfinal.pdf" problem.' },
  { point: 'Sub-page hierarchy for deep dives', detail: 'Each project card opens a full write-up page. Hirers who want depth get it; hirers who only skim stay on the top page. Self-selecting read depth.' },
  { point: 'Custom domain via Super or Fruition', detail: 'Point yourname.com at your Notion page using Super.so or the open-source Fruition proxy. Looks like a static site, content stays in Notion.' },
];

const CONS = [
  { point: 'ATS will not parse it', detail: 'Notion pages are dynamic HTML. Applicant tracking systems expect a PDF or DOCX. You will still need a PDF export for every formal application.' },
  { point: 'No print control', detail: 'Notion\'s PDF export is lossy: margins shift, columns break, fonts substitute. Do not rely on it as your application PDF. Use a proper builder for that.' },
  { point: 'Cannot password-protect on free tier', detail: 'Anyone with the URL can read. If you include sensitive work (client names, salary figures), keep them in a sub-page and share that privately.' },
  { point: 'Search engines index public pages', detail: 'By default, a public Notion page is crawlable. Future employers may find your resume from 2 jobs ago. Toggle search indexing off in Share settings if you want to limit this.' },
  { point: 'Design ceiling', detail: 'Notion is flexible but not infinitely so. If you need tight pixel-level control (design leads, art directors), you will hit the ceiling fast. Treat Notion as a portfolio surface, not a replacement for Figma or Webflow.' },
];

const SETUP = [
  { step: '1. Duplicate a base template', detail: 'Start from a clean duplicate of a community template (search "resume" in Notion\'s template gallery) or start blank. Starting blank wastes 45 minutes reinventing layout.' },
  { step: '2. Set page width to wide and full width off', detail: 'Wide reads best on desktop. Full width stretches too far on 27-inch monitors. Toggle in the top-right menu.' },
  { step: '3. Add cover image and icon', detail: 'Upload a personal cover (1500x600 px) and a 48x48 icon. Avoid stock photography; an abstract gradient or your own photo works better.' },
  { step: '4. Build the experience database', detail: 'Type /database inline and add properties. Switch to gallery view, card size small, and hide properties that are not primary (like internal tags).' },
  { step: '5. Build the project database with cover images', detail: 'Each project gets a cover image, a 1-line description, and an "Open" link to the full sub-page. Card size medium or large for readability.' },
  { step: '6. Share public with link, disable search indexing', detail: 'Share, publish to web, turn off search indexing and allow edits. Copy the URL and bit.ly-shorten it for your LinkedIn and business card.' },
  { step: '7. Export a PDF for formal applications', detail: 'Do not submit the Notion page to job boards. Use ResumeBuildz or a similar tool for the PDF, and link your Notion URL in the summary line as "portfolio at yourname.notion.site".' },
];

const TOC = [
  { id: 'intro', label: 'When a Notion resume actually works' },
  { id: 'blocks', label: '8 blocks every Notion resume needs' },
  { id: 'pros', label: '5 things Notion does better than a PDF' },
  { id: 'cons', label: '5 things Notion does worse than a PDF' },
  { id: 'setup', label: '7-step setup (start to publish)' },
  { id: 'designer-vs-dev', label: 'Designer vs developer layouts' },
  { id: 'pair', label: 'Pair Notion with a real PDF resume' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'AI Resume Builders Tested', slug: 'ai-resume-builders-tested', excerpt: '12 tools benchmarked across 4 criteria.', read: 13 },
  { title: 'Best Free Resume Builder', slug: 'best-free-resume-builder', excerpt: 'Free tools that actually produce ATS-safe output.', read: 10 },
  { title: 'LinkedIn URL on Resume', slug: 'linkedin-url-on-resume', excerpt: 'Format, placement, and common mistakes.', read: 7 },
  { title: 'Best Resume Fonts 2026', slug: 'best-resume-fonts', excerpt: '10 fonts tested across 4 ATS platforms.', read: 12 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
];

export default function NotionResumeTemplatePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="Notion resume template"
      title="Notion Resume Template: Free Portfolio Setup (2026)"
      subtitle="A Notion page is a great public portfolio and a terrible application PDF. This guide covers the 8 blocks that make a Notion resume look professional, the 7-step setup, and why you still need a PDF for every formal submission."
      dateModified="2026-08-09"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The right use case</p>
          <p className="text-gray-700">
            Notion resumes are great as the portfolio link you drop in LinkedIn, a cover letter, or a recruiter DM. They are terrible as the PDF you upload to an ATS. Use both: Notion for the story, PDF for the application form. This guide builds the Notion half.
          </p>
        </div>
        <p className="mb-3">
          A Notion resume is a public page on Notion.so (or a custom domain) that combines a traditional resume layout with portfolio-style project write-ups, embedded demos, and long-form case studies. At its best, it reads like a tiny personal website without the cost or build time. At its worst, it is a disorganised Notion page with 40 emoji and no structure.
        </p>
        <p>
          The pattern that works: keep the top of the page short and resume-like (3-column contact, summary toggle, clean experience list) so a skim reader registers the basics in 10 seconds. Put portfolio depth below the fold as an inline database of projects, each one clickable to a full case-study sub-page. Visitors who want to go deep can; visitors who do not, stay on the top.
        </p>
      </section>

      <section id="blocks" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 blocks every Notion resume needs</h2>
        <div className="space-y-3">
          {BLOCKS.map((b, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{b.block}</p>
              <p className="text-sm text-gray-700">{b.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pros" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 things Notion does better than a PDF</h2>
        <div className="space-y-3">
          {PROS.map((p, i) => (
            <div key={i} className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
              <p className="font-semibold text-emerald-900 mb-1">{p.point}</p>
              <p className="text-sm text-gray-700">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cons" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 things Notion does worse than a PDF</h2>
        <div className="space-y-3">
          {CONS.map((c, i) => (
            <div key={i} className="border border-rose-200 bg-rose-50 rounded-lg p-4">
              <p className="font-semibold text-rose-900 mb-1">{c.point}</p>
              <p className="text-sm text-gray-700">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="setup" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7-step setup (start to publish)</h2>
        <ol className="space-y-3">
          {SETUP.map((s, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.step}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="designer-vs-dev" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Designer vs developer layouts</h2>
        <p className="mb-3">
          <strong>Designers</strong> lean visual: larger cover images, gallery view for projects with card size large, Figma embeds on every project sub-page, one or two case-study walkthroughs at the top. Keep text minimal on the landing page; let the work do the talking.
        </p>
        <p>
          <strong>Developers</strong> lean structural: code-block syntax highlighting on project sub-pages, GitHub embeds, clear stack tags on each project, a skills matrix that names specific frameworks over generic skills. A developer Notion page reads more like a READMEthan a portfolio site, and that is the point.
        </p>
      </section>

      <section id="pair" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pair Notion with a real PDF resume</h2>
        <p className="mb-3">
          The workflow that wins: build both. Use a dedicated resume builder (ResumeBuildz, Teal, Rezi) to produce a 1-page ATS-clean PDF for every formal application. Use Notion for the public portfolio that you link from the top of the PDF and from LinkedIn.
        </p>
        <p>
          A recruiter who wants a 10-second skim gets the PDF. A hiring manager who wants to understand your depth clicks through to Notion. The PDF passes the ATS. The Notion page converts the interest into a call. Each surface does what it is good at.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.notion.so/templates/category/resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Notion official resume template gallery</a></li>
          <li><a href="https://super.so/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Super.so for custom domains on Notion pages</a></li>
          <li><a href="https://fruitionsite.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Fruition open-source Notion proxy</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I submit a Notion resume to an ATS?', a: 'No. ATS systems expect a PDF or DOCX file. A Notion URL will either be rejected or ignored. Build a real PDF for every application; link the Notion URL inside the PDF as "portfolio at yourname.notion.site".' },
            { q: 'Is a Notion resume free?', a: 'The base template and hosting on notion.site is free. A custom domain via Super.so costs around 12 USD per month. Fruition is free but needs a Cloudflare Worker (also free for normal traffic).' },
            { q: 'Does Notion work for non-tech roles?', a: 'Yes for creative and product roles (designers, PMs, marketers, writers). Less so for finance, legal, or traditional corporate roles where recruiters expect a plain PDF. Read the audience first.' },
            { q: 'Can I password-protect my Notion resume?', a: 'Not on the free tier. Notion Business plans support password-protected public pages. As a workaround, keep sensitive work in sub-pages and share those privately via email.' },
            { q: 'How do I customise fonts on a Notion page?', a: 'Notion ships 3 fonts (Default, Serif, Mono) switchable per page. No custom fonts on notion.site. If you need custom typography, use Super.so or Fruition and inject CSS.' },
            { q: 'Will recruiters click a Notion link?', a: 'Yes, most will, especially in tech. A clean Notion URL reads like a personal site. Use a vanity URL like yourname.notion.site rather than the default hex-string URL.' },
            { q: 'How long should my Notion resume be?', a: 'Top of page should read in under 30 seconds: summary, skills, 3 to 4 most recent roles. Below-the-fold projects can be longer because they are opt-in. The landing page fits on 1 desktop scroll.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build the ATS-clean PDF your Notion page links to</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz produces the 1-page PDF that passes ATS, while your Notion page handles the portfolio story. Each tool where it shines.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
