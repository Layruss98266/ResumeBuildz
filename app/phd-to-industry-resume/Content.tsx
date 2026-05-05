'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const FAILURES = [
  { item: 'Length', detail: 'Academic CVs are 4 to 12 pages and list every talk, workshop, and committee. Industry resumes are 1 page (freshers / early-career) or 2 pages (senior). A recruiter will not read page 3.' },
  { item: 'Frontloading publications', detail: 'A CV opens with publications. An industry resume opens with a summary and recent role. Publications go at the end, compressed to the strongest 3 to 5.' },
  { item: 'Passive voice', detail: '"A novel algorithm was developed" is academic default. Industry resumes use active verbs: "Developed a novel algorithm that cut inference time 40 percent."' },
  { item: 'Jargon without translation', detail: 'Field-specific terms (ANOVA, HPLC, RNA-seq) are fine, but you also need words a recruiter Googles: Python, statistical analysis, experimental design, stakeholder management.' },
  { item: 'No metrics', detail: 'Grants and citations are numbers, but you rarely use them. Every industry bullet should have a number: dollars, percent, people, throughput.' },
  { item: 'No outcomes', detail: 'Academic bullets describe activity ("Conducted experiments on X"). Industry bullets describe outcome ("Built pipeline that reduced contamination rate by 22 percent across 4 production lines").' },
];

const COMPRESSIONS = [
  { from: 'Publications: 23 peer-reviewed articles including [list of 23]', to: 'Publications: 23 peer-reviewed articles; 3 most-cited include [3 lines max]. Full list on request.' },
  { from: 'Teaching: TA for 6 undergraduate courses, guest lecturer for 4 graduate courses, mentored 8 undergrads and 3 masters students on independent research', to: 'Mentored 11 junior researchers (8 undergrad, 3 MS) on independent projects; 4 went on to PhD programs or industry R&D roles.' },
  { from: 'Grants: Co-authored NIH R01 ($2.1M, 5 years), co-authored NSF CAREER ($500K, 5 years), internal seed grant ($40K)', to: 'Co-secured $2.6M in competitive research funding (NIH R01, NSF CAREER) as co-investigator over 4 years.' },
  { from: 'Dissertation: A Novel Framework for the Analysis of Multi-omic Data in the Context of Neurodegenerative Disease Progression', to: 'PhD thesis: built multi-omic analysis framework for neurodegenerative disease; benchmarked on 3 datasets; 2 papers, 140 citations.' },
];

const TRANSLATIONS = [
  { academic: 'Published in Nature with 240 citations', industry: 'Led research resulting in a Nature publication (240 citations in 3 years); work was cited by industry labs at Google Brain and Meta AI.' },
  { academic: 'Taught Intro to Statistics (300 students, 3 semesters)', industry: 'Taught and curriculum-designed a 300-student statistics course across 3 semesters; managed 4 TAs, held 2 weekly office hours, maintained a 4.6/5 student eval.' },
  { academic: 'Reviewed 18 manuscripts for NeurIPS, ICML, JMLR', industry: 'Peer-reviewed 18 manuscripts at top ML venues (NeurIPS, ICML, JMLR); recognised as top reviewer at NeurIPS 2024.' },
  { academic: 'Collaborated with 3 external labs', industry: 'Managed 3 cross-institutional research partnerships; coordinated data-sharing agreements, joint IRB approvals, and shipped 2 co-authored papers.' },
  { academic: 'Organised lab journal club (weekly)', industry: 'Ran weekly technical seminars for a 12-person lab; curated reading lists, moderated discussion, distilled takeaways into actionable lab experiments.' },
  { academic: 'Wrote dissertation of 230 pages', industry: 'Authored 230-page technical document synthesising 4 years of original research across experiment design, data analysis, and literature review.' },
];

const SUMMARIES = [
  { title: 'Post-doc moving to product data science', summary: 'PhD computational biologist with 4 years of post-doc research in multi-omic analysis. Built ML pipelines on 3 datasets larger than 100GB; 11 papers, 3 as first author. Fluent in Python, R, PyTorch, SQL. Moving to industry to build production ML systems on consumer health data. Open to data science, applied research, and early ML engineering roles.' },
  { title: 'Mid-career academic to R&D director', summary: 'Tenured Associate Professor in Materials Science with 14 years leading a 9-person research group. Principal investigator on $4.2M in federal grants; 47 peer-reviewed papers; 3 patents licensed to Dow and 3M. Built, hired, and managed cross-functional teams across 3 universities and 2 industry partners. Transitioning to industry R&D leadership.' },
  { title: 'R&D lab scientist to product-embedded ML', summary: 'PhD physicist, 6 years at an R&D national lab working on particle detector calibration with custom ML models. Owner of a 40-node GPU training pipeline serving 8 collaborating experiments. Ready to move research into productised ML at a smaller, faster org. Target: applied scientist or ML engineer at a pre-IPO company where the research-to-ship cycle is 6 weeks, not 18 months.' },
];

const TOC = [
  { id: 'intro', label: 'Why academic CVs fail in industry' },
  { id: 'failures', label: '6 reasons CVs fail' },
  { id: 'compression', label: 'The 3-page-CV to 1-page-resume compression' },
  { id: 'translations', label: 'Translating academic work to industry impact' },
  { id: 'teaching', label: 'Teaching as stakeholder management' },
  { id: 'grants', label: 'Grants as project leadership' },
  { id: 'summaries', label: '3 worked summaries' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '20 summaries across roles and career stages.', read: 10 },
  { title: 'How to Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Turn academic wins into numbers recruiters trust.', read: 9 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '150 strong verbs grouped by outcome.', read: 8 },
  { title: 'Resume Length Guide', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
  { title: 'How to Tailor Your Resume', slug: 'tailor-resume', excerpt: 'Job-specific edits in under 20 minutes.', read: 9 },
];

export default function PhdToIndustryPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Transitions"
      breadcrumbCurrent="PhD to industry resume"
      title="PhD to Industry Resume: The Conversion Guide (2026)"
      subtitle="Academic CVs are a bad fit for industry hiring pipelines. This guide covers the 3-page-CV-to-1-page-resume compression, how to translate publications and teaching into industry impact, and 3 worked summaries for post-doc, mid-career academic, and R&D transitions."
      dateModified="2026-06-28"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            A good academic CV is a bad industry resume. The formats share a file extension and not much else. Recruiters filtering 200 applicants in a day will not read 8 pages, and an ATS will not parse them well either. If you are leaving academia, the first document you rewrite is this one, and most people get it wrong in the same 6 ways.
          </p>
        </div>
        <p>
          This guide is for PhD holders, post-docs, and tenured faculty considering industry. The target is a 1-page resume for early-career (post-doc or recent PhD) or 2-page resume for mid-career (5+ years post-defence, or tenured). Either way, you are cutting 70 to 90 percent of your CV. The rest of this guide is about which 70 to 90 percent.
        </p>
      </section>

      <section id="failures" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 reasons academic CVs fail in industry</h2>
        <div className="space-y-3">
          {FAILURES.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{f.item}</p>
              <p className="text-sm text-gray-700">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="compression" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 3-page-CV to 1-page-resume compression</h2>
        <p className="mb-3">You are not editing; you are rebuilding. The CV sections do not map 1-to-1 to resume sections. Think of it this way:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-5">
          <li><strong>Drop entirely:</strong> full publication list, conference attendance list, committee service, extended teaching list, full grant history (move to 1 line).</li>
          <li><strong>Compress hard:</strong> publications to 3 to 5 most-cited or most-relevant, teaching to 2 bullets under &quot;Leadership&quot;, grants to 1 line total dollar value.</li>
          <li><strong>Elevate:</strong> research projects as Experience bullets with metrics; dissertation as a compressed 2-line summary; technical skills section with tools a hiring manager recognises.</li>
        </ul>
        <p className="mb-4 text-sm text-gray-700">Examples of the compression in action:</p>
        <div className="space-y-3">
          {COMPRESSIONS.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">From CV</p>
              <p className="text-sm text-gray-600 mb-2">{c.from}</p>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">To resume</p>
              <p className="text-sm text-gray-800 font-medium">{c.to}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="translations" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Translating academic work to industry impact</h2>
        <p className="mb-4 text-sm text-gray-700">Every line of a resume is a claim of value. Academic achievements have value, but you have to show it. Before-and-after pairs:</p>
        <div className="space-y-3">
          {TRANSLATIONS.map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Academic phrasing</p>
              <p className="text-sm text-gray-600 mb-2">{t.academic}</p>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Industry phrasing</p>
              <p className="text-sm text-gray-800 font-medium">{t.industry}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="teaching" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Teaching experience as stakeholder management</h2>
        <p className="mb-3">
          Teaching is consistently undersold on industry resumes. A classroom is a stakeholder environment: you have 30 to 300 people with different preparation levels, varying motivation, and competing demands on your time. You designed the syllabus (product roadmap), delivered content under a deadline (sprint), handled office hours (customer support), managed TAs (people management), and were graded on retention and satisfaction (KPIs).
        </p>
        <p className="mb-3">Rewrite every teaching bullet to surface the skill transfer:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Curriculum design becomes product planning.</li>
          <li>TA management becomes team leadership (name the headcount).</li>
          <li>Student evaluations become a quantifiable outcome (4.6/5 on 200 reviews).</li>
          <li>Exam and assignment design becomes assessment design with quantified distributions.</li>
          <li>Office hours become customer-facing problem solving with volume numbers.</li>
        </ul>
        <p className="mt-3 text-sm text-gray-700">If you taught for 4+ years, spin out a single Experience entry titled something like &quot;Instructor, [University]&quot; with 3 to 4 bullets. Do not bury it in &quot;Other&quot; or &quot;Service.&quot;</p>
      </section>

      <section id="grants" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Grants as project leadership</h2>
        <p className="mb-3">
          A federal grant is a multi-year, multi-stakeholder project with budget management, reporting requirements, and deliverables. Industry recognises this instantly when you phrase it correctly and completely misses it when you do not.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Total dollars secured.</strong> This is your procurement budget. Name it.</li>
          <li><strong>Team size funded.</strong> Post-docs, grad students, staff. That is headcount you managed.</li>
          <li><strong>Multi-year horizon.</strong> 3, 4, 5 years of planning, milestone reporting, and budget re-baselining. Industry calls this program management.</li>
          <li><strong>Partner institutions.</strong> Cross-institutional grants are cross-functional partnerships. Name the partners.</li>
          <li><strong>Renewal rate.</strong> If you renewed a grant, that is the academic equivalent of retention.</li>
        </ul>
        <p className="mt-3 text-sm text-gray-700">A single strong bullet: &quot;Principal Investigator on $2.1M NIH R01 over 5 years; managed budget, quarterly milestone reporting to NIH program officer, 4-person research team, and a partnership with Stanford Genomics Core.&quot; That sentence walks into a senior R&D or program manager interview.</p>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">3 worked summaries</h2>
        <div className="space-y-4">
          {SUMMARIES.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{s.title}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://cheekyscientist.com/phd-resume-industry/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Cheeky Scientist on PhD to industry transitions</a></li>
          <li><a href="https://www.science.org/content/article/what-s-difference-between-cv-and-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Science magazine: CV vs resume</a></li>
          <li><a href="https://ocs.yale.edu/channels/phd-postdoc-non-academic-careers/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Yale Office of Career Strategy on non-academic careers</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I keep publications on my industry resume?', a: 'Yes, compressed. 3 to 5 most-cited or most-relevant, at the bottom. Full list on request or linked via Google Scholar.' },
            { q: 'Do I list every conference presentation?', a: 'No. Pick 2 or 3 high-profile invited talks if relevant, otherwise drop the section entirely.' },
            { q: 'Is 1 page realistic for a PhD with 10 years of research?', a: 'For R&D and research scientist roles, 2 pages is normal. For non-research industry roles (product, operations, consulting), aim for 1 page and be ruthless.' },
            { q: 'Should I mention I am transitioning?', a: 'In the summary, yes. One line: "Transitioning from academia to industry data science." Recruiters appreciate the clarity; it explains the CV-like shape of your prior experience.' },
            { q: 'How do I handle the "overqualified" concern?', a: 'Anticipate it in the cover letter, not the resume. The resume stays factual. The cover letter addresses motivation: why industry, why this company, why now.' },
            { q: 'Do I include my dissertation title?', a: 'Yes, compressed to one line, and only if it is relevant to the target role. "PhD thesis: [one-sentence plain-English summary with a metric]."' },
            { q: 'What about teaching if I am applying for an engineering role?', a: 'Keep one line under Experience or a dedicated Leadership section. Frame as mentorship and communication. Do not list individual courses.' },
            { q: 'Should I list citation counts?', a: 'For research-heavy roles (applied scientist, R&D), yes. For PM or consulting, no. Citation counts are meaningless outside the research context.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Convert your CV in under an hour</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz templates enforce industry-format defaults (1 or 2 pages, compressed publications, active verbs). Paste your CV and cut 80 percent of the noise.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
