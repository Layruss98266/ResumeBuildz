'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const INCLUDE = [
  { when: 'GPA above 3.5 (US) or CGPA 8.0+ (India)', why: 'This is the band where GPA actively helps. Below this, it is at best neutral, at worst a flag. Above, it signals academic rigour and is worth the line.' },
  { when: 'Recent graduate (0 to 2 years since graduation)', why: 'Without work history, GPA is one of the few concrete signals of rigour. Recruiters for fresher roles expect to see it. Omitting it above the threshold looks evasive.' },
  { when: 'Target role is analytical (consulting, investment banking, data, research)', why: 'These industries screen on GPA explicitly. Some (McKinsey, BCG, Goldman) have hard cutoffs. If you clear the bar, include it.' },
  { when: 'Applying to graduate school or a PhD', why: 'Academic applications weight GPA heavily. Always include, even if it is below 3.5, because the admissions committee will see the transcript anyway.' },
  { when: 'Campus placements (India-specific)', why: 'Most campus recruiters filter on CGPA first. Not including it on a campus resume is treated as a red flag (assumes you are hiding it).' },
  { when: 'Scholarship or academic award attached', why: 'If your GPA earned you Deans List, merit scholarship, or summa cum laude, listing the GPA gives the award context. A 3.9 next to Deans List is more credible than the award alone.' },
];

const SKIP = [
  { when: 'GPA below 3.0 (US) or CGPA below 7.0 (India)', why: 'Below this band, GPA is a net negative. Space is better used for projects, internships, or relevant coursework.' },
  { when: '3+ years of work experience', why: 'Once you have real work history, GPA becomes irrelevant. Recruiters care about outcomes at your last two roles, not your grade in Data Structures 5 years ago.' },
  { when: 'Career changer with 5+ years total experience', why: 'Your previous career is the signal. GPA from a degree 8 years ago adds noise.' },
  { when: 'Non-analytical role (creative, sales, operations, trades)', why: 'These roles screen on portfolio, results, and chemistry, not academic metrics. GPA eats a line that could hold something more useful.' },
  { when: 'Your degree is from 10+ years ago', why: 'Even if the GPA was strong, time has diluted the signal. Swap the line for a recent certification or a flagship project.' },
  { when: 'You are optimizing for a 1-page resume and the line costs real estate', why: 'Marginal GPAs (3.3 to 3.5) can be cut without loss if space is tight. Use the space for a quantified bullet.' },
];

const FORMATS = [
  { ex: 'GPA: 3.8/4.0' },
  { ex: 'GPA: 3.8/4.0 (Major GPA: 3.95/4.0)' },
  { ex: 'CGPA: 8.7/10' },
  { ex: 'Percentage: 82% (First Class Distinction)' },
  { ex: 'GPA: 3.9/4.0, Dean\u2019s List (6 of 8 semesters)' },
];

const TOC = [
  { id: 'intro', label: 'The 10-second decision' },
  { id: 'include', label: 'When to include GPA' },
  { id: 'skip', label: 'When to skip GPA' },
  { id: 'format', label: 'How to format GPA correctly' },
  { id: 'india', label: 'CGPA vs percentage (Indian resumes)' },
  { id: 'grad', label: 'Grad school resume vs industry resume' },
  { id: 'low', label: 'What to do if your GPA is low' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Fresher Resume Guide', slug: 'fresher-resume', excerpt: 'Build a first resume when you have no work experience.', read: 10 },
  { title: 'Campus Placement Resume', slug: 'campus-placement-resume', excerpt: 'Resume template for Indian campus drives.', read: 11 },
  { title: 'TCS NQT Resume Guide', slug: 'tcs-nqt-resume-guide', excerpt: 'Exact resume spec for TCS NQT applicants.', read: 9 },
  { title: 'Infosys InfyTQ Guide', slug: 'infosys-infytq-guide', excerpt: 'Resume + InfyTQ prep for Infosys fresher hiring.', read: 10 },
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
];

export default function GPAOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="GPA on resume"
      title="Should You Put GPA on a Resume? (2026 Guide)"
      subtitle="A practical decision rule plus the exact format for US, UK, and Indian resumes. Includes CGPA vs percentage guidance and what to do when your GPA is below the cutoff."
      dateModified="2026-06-18"
      readingTime={9}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The 10-second decision</p>
          <p className="text-gray-700">
            Include GPA if: you are within 2 years of graduation AND your GPA is 3.5+ / CGPA 8.0+ AND the role is analytical or campus-recruited. Otherwise skip it. That covers 90 percent of cases. The rest of this guide handles the other 10 percent.
          </p>
        </div>
        <p>
          GPA on a resume is one of those decisions that feels trivial but gets treated with outsized anxiety. Include too low a number and recruiters filter you out. Omit a strong number and recruiters assume you are hiding something. The honest answer is that GPA is a signal with a short half-life: worth a line when you are fresh out of school, almost invisible five years into a career.
        </p>
        <p className="mt-3">
          The decision framework below is based on recruiter behaviour, not ideal-world theory. Some recruiters explicitly filter GPA. Some ignore it entirely. Your job is to include it when it helps you and cut it when it does not, without overthinking either case.
        </p>
      </section>

      <section id="include" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">When to include GPA</h2>
        <div className="space-y-3">
          {INCLUDE.map((x, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{x.when}</p>
              <p className="text-sm text-gray-700">{x.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skip" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">When to skip GPA</h2>
        <div className="space-y-3">
          {SKIP.map((x, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{x.when}</p>
              <p className="text-sm text-gray-700">{x.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to format GPA correctly</h2>
        <p className="mb-4">Always include the scale. &quot;GPA: 3.8&quot; is ambiguous (is that out of 4 or 5?). The correct form is a value, a slash, and a scale.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {FORMATS.map((f, i) => <li key={i}><code className="bg-gray-100 px-2 py-0.5 rounded">{f.ex}</code></li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">Place GPA on the Education line immediately after the degree and institution. Do not put it under Skills, Awards, or Summary. That dilutes the signal.</p>
        <p className="mt-3 text-sm text-gray-700"><strong>Major GPA trick:</strong> if your overall GPA is mid (say 3.4) but your major GPA is strong (3.8), list both. Major GPA is a legitimate separate metric and the pair reads honestly, not deceptively.</p>
      </section>

      <section id="india" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CGPA vs percentage (Indian resumes)</h2>
        <p className="mb-3">Indian education uses three overlapping metrics: CGPA on a 10-point scale, percentage, and (for some boards) letter grades. The rules by audience:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Campus placements / Indian employers:</strong> CGPA out of 10. Always. Most recruiters filter on CGPA directly.</li>
          <li><strong>Indian engineering + MBA:</strong> CGPA is standard. Only mention percentage if the company explicitly asks (some PSU roles do).</li>
          <li><strong>Applying abroad (US, UK, EU, AU):</strong> Convert to percentage OR mention CGPA with the scale (CGPA: 8.5/10). Do not convert to US GPA on your own; schools and employers there are used to seeing raw CGPA.</li>
          <li><strong>Class 10 / Class 12 percentages:</strong> Include only if you are a fresher, one line each, with board name (CBSE, ICSE, state). Drop these once you have 2+ years of work experience.</li>
        </ul>
        <p className="mt-4 text-sm text-gray-700"><strong>Common cutoffs:</strong> TCS NQT (CGPA 6.0+), Infosys (CGPA 6.0+), many product firms (CGPA 7.5+), elite consulting (CGPA 8.5+ and institute name).</p>
      </section>

      <section id="grad" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Grad school resume vs industry resume</h2>
        <p className="mb-3">The same degree and GPA should be formatted differently depending on audience.</p>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-1">Grad school / PhD applications</p>
            <p className="text-sm text-gray-700">Always include GPA. Include major GPA if different. Include coursework, research projects, thesis title, and advisor. GPA is a primary signal for admissions committees.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-1">Industry resume (0 to 2 years out)</p>
            <p className="text-sm text-gray-700">Include GPA if 3.5+ / CGPA 8.0+. Swap coursework for internships or projects. Thesis stays only if it is directly relevant to the target role.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-1">Industry resume (3+ years out)</p>
            <p className="text-sm text-gray-700">Drop GPA. Keep degree, institution, and year. That is enough. The line now works harder as a credential marker than as an achievement.</p>
          </div>
        </div>
      </section>

      <section id="low" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What to do if your GPA is low</h2>
        <p className="mb-3">Low GPA (below 3.0 US or 7.0 CGPA) is a common panic. The realistic options, in order:</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Omit it.</strong> You are not obligated to list GPA. Omission is not lying. Fill the line with a strong project, internship, or relevant coursework instead.</li>
          <li><strong>Use major GPA if stronger.</strong> If your overall is 2.9 but major is 3.5, list the major GPA with explicit labelling (&quot;Major GPA: 3.5/4.0&quot;). Never swap one for the other silently.</li>
          <li><strong>Use upward trend language.</strong> &quot;Final 2 semesters GPA: 3.7/4.0&quot; is a valid line if your trajectory genuinely improved. Only use this if true; recruiters sometimes ask for transcripts.</li>
          <li><strong>Lean on internships and projects.</strong> A strong internship and 2 shipped projects outweigh GPA for most hiring decisions. Invest the page space there.</li>
          <li><strong>Do not hide with vague phrasing.</strong> &quot;GPA: strong academic record&quot; or &quot;GPA: upon request&quot; triggers skepticism. Omit cleanly or list honestly.</li>
        </ol>
        <p className="mt-4 text-sm text-gray-700">For some gated paths (McKinsey, Goldman, big law, top-20 US PhD) low GPA is a hard filter. For almost everything else, omission + strong portfolio evidence is fine.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2015/06/dont-put-your-gpa-on-your-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on GPA on resumes</a></li>
          <li><a href="https://www.naukri.com/campus/career-guidance/cgpa-on-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Naukri Campus on CGPA for Indian resumes</a></li>
          <li><a href="https://careers.mckinsey.com/how-we-hire" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">McKinsey on how they evaluate candidates</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is it lying to omit GPA?', a: 'No. GPA is optional information. Omission is not deception. Recruiters may ask in interview; answer honestly if they do.' },
            { q: 'Should I round GPA up?', a: 'No. 3.84 stays 3.84 (or optionally 3.8). Rounding 3.47 to 3.5 is dishonest and discoverable if a transcript is requested.' },
            { q: 'What if my GPA is on a non-standard scale (out of 5 or 7)?', a: 'Always include the scale (e.g., 4.5/5). Never convert without showing your math. Recruiters in your country know the local scale.' },
            { q: 'Do US employers understand CGPA?', a: 'Most do, especially at larger firms with global hiring. Include the scale (CGPA: 8.7/10) so there is no ambiguity. Some smaller US firms may ask you to convert; percentage is the safe conversion.' },
            { q: 'Should I include Class 10 and 12 percentages on my Indian resume?', a: 'Yes if you are a fresher (0 to 1 year experience). No once you have 2+ years of work experience. Those lines are replaced by internships and full-time experience.' },
            { q: 'Does omitting GPA hurt my chances at consulting / investment banking?', a: 'For top-tier firms (MBB, bulge-bracket banks) omission raises suspicion. Those firms expect to see the number. If your GPA clears their public cutoff, list it.' },
            { q: 'My GPA improved from 2.8 in year 1 to 3.9 in year 4. How do I show that?', a: 'List final 2 semesters GPA as a separate line (&quot;Final-year GPA: 3.9/4.0&quot;). Honest and captures the trend.' },
            { q: 'Should GPA go on LinkedIn?', a: 'LinkedIn has a Grade field under Education. Only fill it if your GPA would also go on your resume. Same rules apply.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that handles GPA correctly</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz auto-formats GPA with the right scale, suggests when to drop it, and adapts for US, UK, and Indian conventions.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
