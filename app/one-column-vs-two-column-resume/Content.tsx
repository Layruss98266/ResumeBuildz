'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const ATS_TEST = [
  { ats: 'Workday', oneCol: 'Parses cleanly. Section headings, dates, and bullets map correctly.', twoCol: 'Scrambles right column into left. Job titles often get attached to the wrong company.' },
  { ats: 'Taleo (Oracle)', oneCol: 'Clean parse. Keyword extraction works as expected.', twoCol: 'Treats the two columns as a single wrapped paragraph. Dates land inside bullets.' },
  { ats: 'Greenhouse', oneCol: 'Good. Modern parser handles well.', twoCol: 'Usable on simple 2-col layouts. Still flags text-box columns as unreadable.' },
  { ats: 'Lever', oneCol: 'Clean.', twoCol: 'Inconsistent. Sometimes fine, sometimes merges Skills column into Experience bullets.' },
  { ats: 'iCIMS', oneCol: 'Parses structure correctly.', twoCol: 'Known issues with sidebar templates from Canva and Word.' },
  { ats: 'SAP SuccessFactors', oneCol: 'Reliable parse.', twoCol: 'Drops the left sidebar content entirely on some templates.' },
];

const WHEN_2COL = [
  { case: 'You hand the resume directly to a recruiter or hiring manager (no ATS in the middle).', verdict: 'Fine. Go 2-col if it helps density.' },
  { case: 'Creative role where layout itself is part of the portfolio (design, art direction).', verdict: 'Fine, but keep a 1-col ATS copy ready for any online application.' },
  { case: 'Executive search where applications are curated by a human, not a system.', verdict: 'Fine. Visual differentiation helps.' },
  { case: 'Campus placement drive using a company portal like SuccessFactors or Workday.', verdict: 'Avoid 2-col. Use single column.' },
  { case: 'Applying on LinkedIn Easy Apply, Naukri, Indeed, or any jobs board.', verdict: 'Avoid 2-col. These funnel into ATS.' },
  { case: 'Applying to FAANG, product companies, or any tech role online.', verdict: 'Avoid 2-col. Use single column.' },
];

const MYTHS = [
  { myth: '2-column resumes look more modern and get noticed.', truth: 'Recruiters do not score on aesthetic novelty. They scan for role, company, dates, numbers. 1-col delivers those faster.' },
  { myth: 'ATS platforms in 2026 all handle 2-column resumes fine.', truth: 'Workday, Taleo, and iCIMS still scramble multi-column layouts. These cover roughly 60 percent of enterprise applications in India and the US.' },
  { myth: 'A 2-column resume fits more content on one page.', truth: 'True, but the content you pack in gets parsed wrong. A clean 1-col page with 11 pt font holds the same word count.' },
  { myth: 'If I save as PDF, ATS reads both columns correctly.', truth: 'PDF export preserves the visual layout, not the reading order metadata. Most ATS read text by x-coordinate, not by column.' },
];

const TOC = [
  { id: 'intro', label: 'The short answer (and why)' },
  { id: 'how-ats-reads', label: 'How ATS actually reads a resume' },
  { id: 'ats-test', label: 'ATS platform results: 1-col vs 2-col' },
  { id: 'when-2col', label: 'When 2-column is actually OK' },
  { id: 'myths', label: '4 myths about 2-column resumes' },
  { id: 'best-1col', label: 'The 1-column format that works' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Resume Margins & Spacing 2026', slug: 'resume-margins-spacing', excerpt: '8-point spec plus layout fixes.', read: 10 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Workday Resume Tips', slug: 'workday-resume-tips', excerpt: 'How Workday parses, 8 tactical tips.', read: 9 },
  { title: 'ATS Guide 2026', slug: 'ats-guide', excerpt: 'What ATS does, what it does not, and what to do about it.', read: 12 },
];

export default function OneVsTwoColumnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="1-column vs 2-column resume"
      title="1-Column vs 2-Column Resume: Which Is Better for ATS? (2026)"
      subtitle="A direct answer based on actual ATS parsing behaviour across Workday, Taleo, Greenhouse, Lever, iCIMS, and SAP SuccessFactors. Plus the cases where 2-column is OK and the 4 myths to ignore."
      dateModified="2026-07-28"
      readingTime={10}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The short answer</p>
          <p className="text-gray-700">
            Single column for any resume that will be screened by ATS. That covers about 95 percent of online applications in 2026. Two column is fine when a human reads the resume directly (executive search, creative roles, networking hand-offs) but useless the moment the file goes into Workday, Taleo, or iCIMS.
          </p>
        </div>
        <p>
          The 2-column resume template looks good on Canva. Sidebar for skills and contact, main column for experience. It feels efficient. It also scrambles in more than half the enterprise ATS platforms still running in 2026. The tradeoff is not aesthetics versus ATS. The tradeoff is aesthetics versus whether the recruiter ever sees the file.
        </p>
        <p>
          This guide gives the direct answer, shows how ATS reads a resume, lists the real parse results per platform, and covers the narrow cases where 2-column is actually fine.
        </p>
      </section>

      <section id="how-ats-reads" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How ATS actually reads a resume</h2>
        <p className="mb-3">
          ATS platforms do not see your resume the way you do. They run a text-extraction pass on the PDF or DOCX, then hand the extracted text to a parser that looks for sections (Experience, Education, Skills), dates, companies, and job titles. The extraction pass is where 2-column resumes break.
        </p>
        <p className="mb-3">
          Most extractors read left to right, top to bottom, by y-coordinate. On a 1-column resume that reading order matches what you meant. On a 2-column resume, a line at y=100 in the left column and a line at y=100 in the right column get treated as the same line. The parser then sees:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3 text-sm font-mono">
          <p className="text-gray-800">Line 1: Skills Software Engineer, Google</p>
          <p className="text-gray-800">Line 2: Python Led a team of 4 on the search ranking project</p>
          <p className="text-gray-800">Line 3: JavaScript Shipped 12 features in 18 months</p>
        </div>
        <p>
          The content is there. The structure is gone. Keyword scoring still works (Python, JavaScript, Google all exist as tokens) but role matching collapses. When a recruiter searches for candidates with Software Engineer at Google, the parser returns your name, but the context under each job is garbled.
        </p>
      </section>

      <section id="ats-test" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">ATS platform results: 1-col vs 2-col</h2>
        <p className="mb-4">Based on public documentation from each vendor and reports from candidates who ran the same resume in both layouts, here is what you get per platform.</p>
        <div className="space-y-3">
          {ATS_TEST.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{t.ats}</p>
              <p className="text-sm text-gray-700 mb-1"><strong className="text-green-700">1-column:</strong> {t.oneCol}</p>
              <p className="text-sm text-gray-700"><strong className="text-red-700">2-column:</strong> {t.twoCol}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">Greenhouse and Lever are the friendliest modern parsers. Workday, Taleo, iCIMS, and SAP SuccessFactors still struggle. If you are applying to a Fortune 500 or an Indian IT services major, assume Workday or Taleo.</p>
      </section>

      <section id="when-2col" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">When 2-column is actually OK</h2>
        <div className="space-y-3">
          {WHEN_2COL.map((w, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-800 mb-1">{w.case}</p>
              <p className="text-sm font-semibold text-indigo-700">{w.verdict}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">The pattern: 2-column is fine when a human is guaranteed to read the file first. The moment the pipeline starts with a portal, default to 1-column. If you need both, keep two versions of the same resume, named clearly.</p>
      </section>

      <section id="myths" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 myths about 2-column resumes</h2>
        <div className="space-y-3">
          {MYTHS.map((m, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">Myth: {m.myth}</p>
              <p className="text-sm text-gray-700">Truth: {m.truth}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="best-1col" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 1-column format that works</h2>
        <p className="mb-3">A 1-column resume is not a boring resume. It just keeps the structural hierarchy where the parser expects it. The target:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-3">
          <li>Header with name, phone, email, LinkedIn, location on 1 or 2 lines.</li>
          <li>Summary (2 to 3 lines) below the header, full width.</li>
          <li>Experience as the largest section, role and company on one line, dates on the right, 3 to 5 bullets each.</li>
          <li>Education with degree, institute, year. Fresher resumes move this above Experience.</li>
          <li>Skills as a single horizontal list or a 3-row grid grouped by type. Not a sidebar.</li>
          <li>Projects, Certifications, Awards as small sections at the bottom.</li>
        </ul>
        <p>Total width used by every section: the full 7.5 inches between 0.5 inch margins. No sidebars, no text boxes, no tables for layout. The only table on the resume, if any, is inside Skills for 3 columns of comma-separated lists, and even that is optional.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.workday.com/en-us/products/talent-management/recruiting.html" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Workday Recruiting overview</a></li>
          <li><a href="https://www.jobscan.co/blog/ats-resume-format/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Jobscan on ATS-friendly resume format</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/how-to-format-a-resume-in-word" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indeed Career Guide on resume formatting</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Does ATS read 2 column resumes in 2026?', a: 'Some do, some do not. Greenhouse and Lever parse 2-column reasonably. Workday, Taleo, iCIMS, SAP SuccessFactors still scramble. That is about 60 percent of enterprise hiring in India and the US. Default to 1-column.' },
            { q: 'Is 2 column resume good for freshers?', a: 'No. Campus placement drives run on Workday or SuccessFactors. Keep it 1-column. A clean 1-column resume from a fresher scans in 7 seconds, which is the actual test.' },
            { q: 'Can I use 2 columns on a 2-page resume?', a: 'Same answer. ATS does not care about page count, it cares about reading order. A 2-page 2-column resume has twice the parse risk of a 1-page one.' },
            { q: 'What about Canva 2-column templates?', a: 'Most Canva templates use text boxes for the sidebar. Text boxes are invisible to many ATS extractors. If the template has a coloured sidebar with skills and contact info, assume the ATS sees nothing in that sidebar.' },
            { q: 'Can I have a narrow sidebar for just the contact info?', a: 'Risky. The sidebar often gets treated as a separate column and dropped. Put contact on the top horizontal header instead.' },
            { q: 'Should my LaTeX resume be 1 or 2 columns?', a: '1-column. The moderncv and awesome-cv templates both default to 2-column for aesthetics; override to 1-column if you are applying through portals.' },
            { q: 'Does ResumeBuildz default to 1-column?', a: 'Yes. All templates in the builder are single-column with horizontal headers. The free templates pass Workday, Taleo, and Greenhouse parse tests.' },
            { q: 'Is 1-column too plain visually?', a: 'Only if you treat the layout as the story. A 1-column resume with clear hierarchy, bold section headings, strong bullets, and numbers in every role reads as professional, not boring.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a 1-column resume that actually parses</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Every template in ResumeBuildz is single column, ATS-tested on Workday and Taleo, and exports to PDF with preserved reading order.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
