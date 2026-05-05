'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const TEMPLATES = [
  { name: 'Deedy Resume (Two Column)', author: 'Debarghya Das', best: 'Software engineers, CS new grads, campus placement', strengths: '2-column dense layout fits a lot on one page, very popular on the placement circuit, looks instantly familiar to recruiters who hire CS grads.', cautions: 'The 2-column format is not ATS-safe. Use only when you are submitting to a human recruiter or uploading to platforms that accept the PDF verbatim. Avoid for bulk Naukri / LinkedIn Easy Apply flows.' },
  { name: 'Awesome-CV', author: 'Byungjin Park', best: 'Senior engineers, technical managers, researchers', strengths: 'Single-column, elegant serif headers, clean section separators. Built-in cover-letter and coverletter.tex sidecar. ATS-friendly because it is one column with clear text flow.', cautions: 'Heavy on fontspec; requires XeLaTeX or LuaLaTeX, not pdfLaTeX. First compile on Overleaf can take 40 to 60 seconds.' },
  { name: 'ModernCV (banking style)', author: 'Xavier Danaux', best: 'First-job candidates, interns, academic applications', strengths: 'Four built-in styles (classic, casual, banking, oldstyle). Extremely well documented. Compiles fast on pdfLaTeX.' , cautions: 'Looks generic. If everyone in your batch uses ModernCV, your resume blends in. Consider a custom header.' },
  { name: 'Friggeri Resume', author: 'Adrien Friggeri', best: 'Designers, product managers, creative roles', strengths: 'Timeline-style left column with icons, narrative right column. Strong visual hierarchy. Good for portfolios.', cautions: 'Heavy use of fontawesome and custom colours. Icons may not render on some ATS parsers. Use for human-read contexts only.' },
  { name: 'Jake Resume (Jake Gutierrez)', author: 'Jake Gutierrez', best: 'Interns, new grads, ATS-heavy applications', strengths: 'Single column, minimal packages, compiles in 5 seconds on pdfLaTeX. Best ATS parse rate of any template on this list in our test.', cautions: 'Intentionally plain. If you want visual personality, this is not your template.' },
  { name: 'sb2nov Resume', author: 'Sourabh Bajaj', best: 'Software engineers, internships at top tech firms', strengths: 'Ultra-clean, one-column, well-structured sections. Very popular with SDE interns. Good balance of density and whitespace.', cautions: 'Section headers are a bit plain; add a subtle rule below each h2 to improve hierarchy.' },
  { name: 'PhD / Academic CV (Jason Gullifer)', author: 'Jason Gullifer', best: 'PhD candidates, postdocs, faculty applications', strengths: 'Publications section with automatic bibtex inclusion, teaching / service sections, grants table. Scales to a 10-page academic CV cleanly.', cautions: 'Overkill for non-academic roles. Strip to 2 pages and swap publications for projects if you are going to industry.' },
];

const STARTER = `\\documentclass[a4paper,11pt]{article}
\\usepackage[margin=0.7in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage[T1]{fontenc}
\\usepackage{charter}
\\pagenumbering{gobble}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing*{\\section}{0pt}{10pt}{6pt}
\\setlist[itemize]{leftmargin=*,itemsep=2pt,topsep=2pt}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{Your Name}} \\\\[2pt]
Bengaluru, India $\\cdot$ you@example.com $\\cdot$ +91 98xxx xxxxx $\\cdot$ linkedin.com/in/you
\\end{center}

\\section*{Summary}
Backend engineer with 3 yrs building payments systems. Shipped 4 production services handling 12k TPS at peak.

\\section*{Experience}
\\textbf{Senior Engineer}, Razorpay \\hfill Jan 2023 -- Present
\\begin{itemize}
  \\item Cut p99 checkout latency 420ms to 140ms through query and cache rewrites.
  \\item Led 3-engineer pod for UPI 2.0 rollout; on-time launch to 8M users.
\\end{itemize}

\\section*{Education}
\\textbf{B.Tech Computer Science}, IIT Madras \\hfill 2019 -- 2023 \\\\
CGPA 8.4 / 10

\\section*{Skills}
Go, Python, Postgres, Redis, Kafka, Kubernetes, AWS.

\\end{document}`;

const PITFALLS = [
  { problem: 'PDF parses as a jumble in Workday / Greenhouse', fix: 'You are probably on a 2-column template. Switch to Jake, sb2nov, or single-column Awesome-CV for ATS-bound applications.' },
  { problem: 'Custom glyphs show as boxes', fix: 'Overleaf uses XeLaTeX or LuaLaTeX to render fontawesome / unicode icons. Switch the Compiler setting, or strip icons for the ATS version.' },
  { problem: 'Dates misaligned on the right', fix: 'Use \\hfill consistently. Replace tabular or flushright hacks with \\hfill in each \\item and each \\textbf role line.' },
  { problem: 'Resume spills to 2 pages unintentionally', fix: 'Three knobs: reduce geometry margin to 0.6in, tighten itemsep in enumitem to 1pt, reduce font size to 10.5pt via scrextend or [11pt] -> [10pt].' },
  { problem: 'Page numbers appear at bottom', fix: 'Add \\pagenumbering{gobble} after \\begin{document}, or use \\thispagestyle{empty} on the first page.' },
  { problem: 'Hyperlinks not clickable', fix: 'Load hyperref and wrap links with \\href{url}{label}. For LinkedIn: \\href{https://linkedin.com/in/you}{linkedin.com/in/you}.' },
];

const TOC = [
  { id: 'intro', label: 'Why LaTeX for a resume' },
  { id: 'when', label: 'When to use LaTeX (and when not to)' },
  { id: 'templates', label: '7 templates ranked by use case' },
  { id: 'overleaf', label: 'Setting up on Overleaf (5 minutes)' },
  { id: 'starter', label: 'Starter file (copy and paste)' },
  { id: 'ats', label: 'Making LaTeX resumes ATS-safe' },
  { id: 'pitfalls', label: '6 common compile / layout pitfalls' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Best Resume Fonts 2026', slug: 'best-resume-fonts', excerpt: '10 fonts tested across 4 ATS platforms.', read: 12 },
  { title: 'Resume Margins & Spacing', slug: 'resume-margins-spacing', excerpt: 'The exact 8-point layout spec.', read: 10 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'AI Resume Builders Tested', slug: 'ai-resume-builders-tested', excerpt: '9 tools benchmarked on ATS parse.', read: 14 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
];

export default function LatexResumeTemplatesPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="AI Resume Tools"
      breadcrumbCurrent="LaTeX resume templates"
      title="LaTeX Resume Templates for Engineers on Overleaf (2026)"
      subtitle="7 battle-tested templates ranked by use case, a copy-paste starter file, the 5-minute Overleaf setup, and 6 layout pitfalls that waste your first compile. Written for engineers who want control over every millimetre."
      dateModified="2026-08-13"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why LaTeX</p>
          <p className="text-gray-700">
            LaTeX gives you pixel-level control over layout, perfect typography, and a resume that looks identical everywhere. No silent font substitutions, no mysterious line-breaks after the recruiter opens it in LibreOffice. The tradeoff is a 30-minute learning curve. If you already think in code, the ROI is strong.
          </p>
        </div>
        <p>
          Engineers pick LaTeX for three reasons: the output is beautiful by default, the version-controlled source file is a single .tex that diffs cleanly in git, and a line-height tweak is one character in the source rather than a click-path in Word. The downsides: first compile can feel slow, debug cycles on package errors eat time, and some ATS platforms mis-parse PDFs generated by older LaTeX engines.
        </p>
        <p className="mt-3">
          This guide ranks 7 popular templates by use case, gives you a minimal starter file you can drop into Overleaf today, and covers the layout pitfalls that trip up most first-timers.
        </p>
      </section>

      <section id="when" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">When to use LaTeX (and when not to)</h2>
        <p className="mb-3"><strong>Use LaTeX when:</strong> you are applying to roles that value technical polish (research labs, core engineering, quant, PhD programs), you already know LaTeX from coursework, or you want one canonical source file with a PDF export per target company.</p>
        <p className="mb-3"><strong>Do not use LaTeX when:</strong> you need to iterate on copy 10 times with a non-technical mentor (use Docs), you are applying through Workday or other ATS platforms known for flaky PDF parse on complex layouts (use a simple .docx), or you need collaborative live editing with a reviewer.</p>
        <p>Most candidates end up with two artifacts: a LaTeX master for personal archives and polished PDF submissions, and a plain .docx for Easy Apply and Naukri uploads. Maintain both. The .docx can be auto-generated from the LaTeX source with pandoc.</p>
      </section>

      <section id="templates" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 templates ranked by use case</h2>
        <div className="space-y-4">
          {TEMPLATES.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">{t.name} by {t.author}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Best for:</strong> {t.best}</p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r text-sm text-gray-800 mb-2">
                <p className="text-xs font-semibold text-emerald-700 mb-1">Strengths</p>
                <p>{t.strengths}</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r text-sm text-gray-800">
                <p className="text-xs font-semibold text-amber-700 mb-1">Cautions</p>
                <p>{t.cautions}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="overleaf" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Setting up on Overleaf (5 minutes)</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>Create a free account at overleaf.com. No install required.</li>
          <li>Click New Project, then Upload Project (zip) or Blank Project.</li>
          <li>For a template: Menu, Compiler. Set to XeLaTeX for Awesome-CV / Friggeri, or pdfLaTeX for Jake / sb2nov / ModernCV.</li>
          <li>Paste the starter file below into main.tex. Click Recompile. Your PDF renders in the right pane in 3 to 8 seconds.</li>
          <li>Version control: Menu, Git integration, enable. Now every save is a git commit. Connect to GitHub for private backups.</li>
          <li>Download PDF: top-right Download button. The file you send to recruiters.</li>
        </ol>
      </section>

      <section id="starter" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Starter file (copy and paste)</h2>
        <p className="mb-3 text-sm text-gray-700">Minimal, ATS-safe, 0.7in margins, 11pt body, one column, compiles in pdfLaTeX in under 5 seconds. Replace content with yours.</p>
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">{STARTER}</pre>
        <p className="mt-3 text-sm text-gray-600">Swap charter for lmodern if you want Latin Modern, or mathpazo for Palatino. All three are safe defaults.</p>
      </section>

      <section id="ats" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Making LaTeX resumes ATS-safe</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>One column only.</strong> 2-column LaTeX templates (Deedy, Friggeri) read as scrambled in Greenhouse and Workday. For ATS-bound submissions, use Jake or sb2nov.</li>
          <li><strong>Avoid tikz graphics for bars and charts.</strong> Most ATS platforms ignore them. Worse, some interpret the surrounding text as corrupt.</li>
          <li><strong>Use real section headings (backslash section), not bold text (backslash textbf) for section titles.</strong> LaTeX section commands export semantic structure to the PDF tree; bold text does not. ATS parsers rely on the tree.</li>
          <li><strong>Export with pdfLaTeX when possible.</strong> XeLaTeX and LuaLaTeX produce beautiful output but some older ATS parsers stumble on their PDF encoding.</li>
          <li><strong>Check the text layer.</strong> After compile, open the PDF and select-all, copy, paste into a plain text editor. If your content reads top to bottom in the right order, ATS will parse it cleanly.</li>
        </ul>
      </section>

      <section id="pitfalls" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 common compile / layout pitfalls</h2>
        <ul className="space-y-3">
          {PITFALLS.map((p, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.problem}</p>
              <p className="text-sm text-gray-700">{p.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.overleaf.com/gallery/tagged/cv" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Overleaf CV gallery</a> for live previews of the templates above.</li>
          <li><a href="https://github.com/posquit0/Awesome-CV" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Awesome-CV on GitHub</a> with source, examples, and the cover-letter companion.</li>
          <li><a href="https://github.com/jakegut/resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Jake Gutierrez resume template on GitHub</a>, the most ATS-friendly option on the list.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is LaTeX worth it for a resume?', a: 'Yes if you already know it or will use it again (theses, papers, reports). For one-off resume writing, a good Word or Docs template is faster. LaTeX pays off over 5+ revisions.' },
            { q: 'Is Deedy still a good template in 2026?', a: 'For human-read contexts and campus placement, yes. For ATS submissions, no: the 2-column layout parses as scrambled in Greenhouse and Workday.' },
            { q: 'pdfLaTeX vs XeLaTeX, which should I use?', a: 'pdfLaTeX is faster and more ATS-friendly. Use XeLaTeX only when your template requires system fonts or advanced unicode (Awesome-CV, Friggeri).' },
            { q: 'How do I keep my LaTeX resume to one page?', a: 'Reduce geometry margin to 0.6in, tighten enumitem itemsep to 1pt, and drop body font to 10.5pt. If still spilling, cut content. One page is a writing discipline, not a packaging trick.' },
            { q: 'Can I use LaTeX for a PhD CV?', a: 'Yes, and Jason Gullifers academic CV template is the best starting point. Include publications (with bibtex), teaching, grants, and service sections.' },
            { q: 'What font should I use in a LaTeX resume?', a: 'Charter, Palatino (mathpazo), or Latin Modern (lmodern). All three render as clean serif text and export with good ATS parseability.' },
            { q: 'Will Overleaf work offline?', a: 'Overleaf requires internet. For offline work, install TeX Live or MiKTeX locally and use VS Code with LaTeX Workshop. Source files are portable.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Prefer point-and-click to \\documentclass?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz produces the same clean, single-column, ATS-safe output as a well-written Jake template, without a compiler. 10 minutes to a polished PDF.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
