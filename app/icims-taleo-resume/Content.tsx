'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const RULES = [
  { rule: 'Stick to .docx as the primary format', detail: 'Both iCIMS and Taleo have parsed .docx reliably for over a decade. Taleo in particular has historically mangled PDFs (especially older exports from InDesign or LaTeX). If a job posting accepts either format and the ATS is confirmed to be Taleo or iCIMS, upload the .docx. Keep a PDF as the secondary upload only.' },
  { rule: 'No tables, no text boxes, no columns', detail: 'Legacy parsers read the document as a flat stream. A 2-column layout gets stitched together wrong (headline from the right column glued to a bullet on the left). Tables become linear text with pipes vanishing. Text boxes are sometimes ignored entirely. Use plain paragraphs and bullet points only.' },
  { rule: 'Headers and footers are invisible to Taleo', detail: 'Taleo 15 and older versions strip header and footer content during parse. If your phone number or email lives in the header, the candidate record will be created with no contact info. Put contact details in the first body paragraph of the document.' },
  { rule: 'Use exact section headings the parser expects', detail: 'Legacy ATS parsers match on literal words. Use Work Experience, Education, Skills, Certifications. Do not use My Journey, What I Bring, or Career Story. Clever headings break the section detection and the resume parses as one giant blob of text.' },
  { rule: 'Dates in MM/YYYY format', detail: 'iCIMS and Taleo both handle MM/YYYY (06/2023) and Month YYYY (June 2023). They struggle with abbreviated forms (Jun 23 or 6-23) and international formats (2023-06 or 23/06/2023). Stick to MM/YYYY or Month YYYY across the entire document.' },
  { rule: 'Spell out acronyms on first use', detail: 'Parsers index both the acronym and the full form for keyword match, but only if they appear together. Write Search Engine Optimisation (SEO) the first time, then SEO afterwards. This is the cheapest match-score boost available.' },
  { rule: 'One font family, one size for body', detail: 'Arial, Calibri, Helvetica, or Times New Roman at 10 to 11 pt for body. Two fonts (display font for headings + body font) is fine in modern ATS but legacy parsers sometimes drop styled runs and lose content. Safest default is one family across the whole document.' },
  { rule: 'No images, icons, or emoji', detail: 'Legacy parsers skip non-text elements. Skills rendered as progress bars become blank. Icons next to section headings become invisible. Any content inside an image asset is lost. Keep everything as live text.' },
];

const COMPANIES_ICIMS = [
  'Lowe\'s', 'Target', 'General Motors', 'BMW', 'Capital One', 'Southwest Airlines', 'Humana', 'Whirlpool', 'Wendy\'s', 'PulteGroup',
];

const COMPANIES_TALEO = [
  'Nestle', 'Accenture', 'Cognizant', 'HSBC', 'Pfizer', 'Oracle (internal)', 'Johnson & Johnson', 'Kellogg\'s', 'Unilever', 'Marriott',
];

const DIFF = [
  { aspect: 'Parser engine', icims: 'Sovren (third-party, regularly updated)', taleo: 'Oracle native (infrequently updated since the Oracle acquisition)' },
  { aspect: 'PDF handling', icims: 'Acceptable on selectable-text PDFs; fails on scanned images', taleo: 'Historically poor; .docx strongly preferred' },
  { aspect: 'Field mapping', icims: 'Strong auto-fill from parsed resume into candidate profile', taleo: 'Partial auto-fill; expect to re-type 30 to 50 percent of fields' },
  { aspect: 'Keyword match logic', icims: 'Stemmed match (manage, managed, managing all count)', taleo: 'Literal match in older versions; stemmed in Taleo 17+' },
  { aspect: 'Profile upload flow', icims: 'Upload once, LinkedIn or resume prefill most fields', taleo: 'Often requires filling out a long form after upload, even if the resume had the data' },
  { aspect: 'Mobile upload', icims: 'Modern mobile-friendly flow on most instances', taleo: 'Desktop-first; mobile uploads sometimes lose formatting' },
];

const MISTAKES = [
  { m: 'Using a fancy template with sidebars and icons', fix: 'Switch to a single-column, plain-text resume for any Taleo or iCIMS application. Keep the fancy one for emailed referrals.' },
  { m: 'Tailoring keywords but not the exact phrasing from the JD', fix: 'Literal match matters on legacy ATS. If the JD says Project Management Professional, write that; do not only write PMP.' },
  { m: 'Uploading the same resume without retyping the form', fix: 'Taleo forms ask for data the parser already extracted. Fill every field; blank fields drop your match score.' },
  { m: 'Skipping the LinkedIn URL', fix: 'Both platforms have a LinkedIn URL field. An empty URL flags the profile as low-engagement for some recruiters.' },
  { m: 'Leaving gaps with no context', fix: 'Taleo flags unexplained gaps above 6 months. Add a 1-line entry for career breaks, freelance work, or upskilling.' },
];

const TOC = [
  { id: 'intro', label: 'Why legacy ATS still matters in 2026' },
  { id: 'rules', label: 'The 8 rules that make resumes parse clean' },
  { id: 'icims-vs-taleo', label: 'iCIMS vs Taleo: where they differ' },
  { id: 'companies', label: 'Companies that use iCIMS and Taleo' },
  { id: 'mistakes', label: '5 mistakes that tank your match score' },
  { id: 'profile', label: 'Filling the profile form after upload' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'How to Pass ATS Resume Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Workday Resume Tips That Pass', slug: 'workday-resume-tips', excerpt: 'Parse quirks, match score, Profile Sync gotchas.', read: 10 },
  { title: 'Complete ATS Guide', slug: 'ats-guide', excerpt: 'Platforms, parsing, keywords, and scoring explained.', read: 12 },
  { title: 'Tailor Your Resume to the JD', slug: 'tailor-resume', excerpt: 'How to match keywords without keyword-stuffing.', read: 9 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
];

export default function IcimsTaleoResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="ATS & Keywords"
      breadcrumbCurrent="iCIMS and Taleo legacy ATS"
      title="iCIMS and Taleo: Legacy ATS Rules That Still Apply (2026)"
      subtitle="iCIMS and Taleo power hiring at hundreds of Fortune 500 companies. Their parsers are older, stricter, and less forgiving than Workday or Greenhouse. 8 rules, platform differences, and the mistakes that drop your match score."
      dateModified="2026-07-14"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why legacy ATS still matters</p>
          <p className="text-gray-700">
            Every year someone declares legacy ATS dead. Every year, Taleo and iCIMS process tens of millions of applications at companies like Accenture, Cognizant, Target, Lowe{"'"}s, and HSBC. If you apply to large enterprises in 2026, you will still meet these systems. Their parsers are older than Workday or Greenhouse, which means the margin for error on formatting is thinner. Get the basics right and you move to the top of the keyword-match queue.
          </p>
        </div>
        <p>
          Modern resume advice often assumes the ATS on the other side is Workday, Greenhouse, or Lever. Those parsers are tolerant. They handle PDFs, infer section headings from context, and recover from the odd layout glitch. iCIMS and Taleo are a generation behind. They require you to write for the parser, not past it. The good news is the rules are short, stable, and have barely changed since 2018. Get them right once and you keep the advantage for every enterprise application.
        </p>
      </section>

      <section id="rules" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 8 rules that make resumes parse clean</h2>
        <div className="space-y-3">
          {RULES.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1"><span className="text-indigo-600 mr-2">{i + 1}.</span>{r.rule}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="icims-vs-taleo" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">iCIMS vs Taleo: where they differ</h2>
        <p className="mb-4">Both are legacy by modern standards, but they are not interchangeable. iCIMS has been updated more aggressively and uses a third-party parsing engine (Sovren). Taleo was acquired by Oracle in 2012 and its parser has seen fewer upgrades. If you know which ATS the company uses, tune your file choice accordingly.</p>
        <div className="space-y-3">
          {DIFF.map((d, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{d.aspect}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold text-indigo-700">iCIMS:</span> {d.icims}</p>
              <p className="text-sm text-gray-700 mt-1"><span className="font-semibold text-emerald-700">Taleo:</span> {d.taleo}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="companies" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies that use iCIMS and Taleo</h2>
        <p className="mb-4 text-sm text-gray-700">Partial list based on public ATS adoption data. The URL of the careers page is the fastest tell: iCIMS instances usually contain jobs.icims.com; Taleo instances commonly include taleo.net or a subdomain like careers.nestle.taleo.net.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">iCIMS users (examples)</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {COMPANIES_ICIMS.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">Taleo users (examples)</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {COMPANIES_TALEO.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">Lists shift over time as companies migrate. Check the careers-page URL before you apply.</p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 mistakes that tank your match score</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="profile" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Filling the profile form after upload</h2>
        <p className="mb-3">On Taleo especially, the parse is only step 1. You then fill a long candidate profile, and the recruiter search runs against that profile, not against the uploaded document. If you skip fields because the parser already has them, you lose match score.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Fill every employment entry with start date, end date, job title, company, and a 2 to 3 line description. Yes, even if your resume already has it.</li>
          <li>In the Skills field, enter each skill as a separate row if the interface allows. Taleo does exact match on skill rows; free-text fields get lower weight.</li>
          <li>Use the JD phrasing for skills. If the JD says AWS Lambda, write AWS Lambda, not Lambda (AWS serverless compute).</li>
          <li>Enter education in reverse-chronological order with GPA only if above 3.5 / 4.0 (or 7.5 / 10). Lower scores can count against you.</li>
          <li>Attach a cover letter even when marked optional. Recruiters filtering by cover-letter-present see about 15 percent fewer applicants, so your application rises in the queue.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.icims.com/platform/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">iCIMS platform overview</a></li>
          <li><a href="https://www.oracle.com/human-capital-management/taleo/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Oracle Taleo product page</a></li>
          <li><a href="https://www.shrm.org/topics-tools/news/talent-acquisition/applicant-tracking-systems-ats-changing-recruiting" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">SHRM on how ATS adoption shapes recruiting</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I upload PDF or DOCX for Taleo?', a: 'DOCX. Taleo has historically mis-parsed PDFs, especially exports from InDesign, LaTeX, or design tools. Upload DOCX as the primary and keep a PDF only if the system rejects Word files.' },
            { q: 'Does iCIMS read graphics and icons?', a: 'No. All non-text elements are dropped. Any skill rendered as a progress bar or any heading rendered as an icon is lost. Use live text only.' },
            { q: 'How do I tell if a company uses iCIMS or Taleo?', a: 'Check the careers-page URL. URLs with jobs.icims.com indicate iCIMS. URLs with taleo.net or company-name.taleo.net indicate Taleo.' },
            { q: 'Do these systems accept LinkedIn profile import?', a: 'Both do, with caveats. iCIMS has a cleaner LinkedIn prefill flow. Taleo imports but often asks you to fill each employment entry again manually afterwards.' },
            { q: 'Is the keyword match literal or stemmed?', a: 'iCIMS uses stemmed match (manage, managed, managing are equivalent). Taleo 17+ uses stemmed match; earlier Taleo versions still used in some instances are literal-match.' },
            { q: 'Can I reuse one resume across iCIMS and Taleo?', a: 'Yes, as long as it follows the 8 rules above. The same plain, single-column, DOCX resume parses well on both.' },
            { q: 'Do these legacy systems score my application?', a: 'Yes. Both produce a match score the recruiter sees, based on keyword overlap with the JD. Scores above 70 percent typically surface in the first recruiter screen.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that parses clean on iCIMS and Taleo</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz exports a single-column DOCX with exact section headings, plain text, and MM/YYYY dates. Zero parser-hostile flourishes. Free to start.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
