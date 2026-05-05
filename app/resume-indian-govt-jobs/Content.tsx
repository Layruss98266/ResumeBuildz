'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const SECTIONS = [
  { name: '1. Personal Details (mandatory block)', detail: 'Full name as on Aadhaar. Father or guardian name (UPSC, SSC still ask for this). Date of birth (dd/mm/yyyy). Category: General / OBC (NCL) / SC / ST / EWS / PwBD. Nationality. Permanent and correspondence address with PIN. Phone (with country code) and email. Aadhaar and PAN (last 4 digits only on shared docs).' },
  { name: '2. Educational Qualifications (chronological, table format)', detail: 'Class X, Class XII, Graduation, Post-Graduation. Columns: Exam, Board / University, Year of Passing, Marks or CGPA (with percentage conversion), Division, Subjects. UPSC and SSC favour a table. Include every qualification attempted; gaps raise flags during verification.' },
  { name: '3. Work Experience (if any)', detail: 'For PSU and lateral positions. Employer name, designation, date range (dd/mm/yyyy format, not Mar 2023), nature of work (2 to 3 lines), reporting officer name and contact (for verification). Regular employment, contract, and apprenticeships all listed separately.' },
  { name: '4. Competitive Exam Record', detail: 'Exam name, year, roll number, rank or marks, whether cleared. UPSC Prelims / Mains attempts, SSC CGL / CHSL attempts, IBPS, NDA, CDS. Panel members look for persistence and a learning curve across attempts.' },
  { name: '5. Technical Skills and Certifications', detail: 'For technical PSU posts (ISRO, DRDO, BARC, ONGC, NTPC). Programming languages, CAD tools, lab instruments, GATE score with year, engineering subjects of specialisation. Short and factual, not adjective-heavy.' },
  { name: '6. Languages Known', detail: 'Mother tongue plus others. Columns: Language, Read, Write, Speak. UPSC interview board checks language claims, so be honest. A B2 in French is more respected than a casual fluent.' },
  { name: '7. Extra-Curricular and Achievements', detail: 'NCC rank (B / C certificate), NSS hours, Scout / Guide level, sports at state / national level, debating, quizzing, civil services coaching institute finalist rounds. One line each, dates attached.' },
  { name: '8. Publications and Research (if any)', detail: 'For PSU R and D, IES, DRDO. Title, journal, year, DOI. UGC-CARE journals carry weight. Unpublished thesis is acceptable if the guide is named.' },
  { name: '9. References', detail: 'Two referees with full name, designation, department, office address, phone, email. At least one must be your HOD or current employer. Do not list family or friends; panels reject such references outright.' },
  { name: '10. Declaration and Signature', detail: 'I hereby declare that the information furnished above is true, complete, and correct to the best of my knowledge. Place, date, signature. Mandatory. No declaration equals rejection at document verification.' },
];

const EXAM_DIFF = [
  { exam: 'UPSC Civil Services (IAS, IPS, IFS)', resume: 'Called Detailed Application Form (DAF). Sections fixed by UPSC. Answer each section fully; blanks are read as hiding information. Every claim cross-checked at DV. Hobbies and optional subject choices set up the interview.' },
  { exam: 'SSC (CGL, CHSL, MTS, CPO, JE)', resume: 'Resume used only at DV and during interview for JE / AAO posts. 2-page format, chronological, category and percentile clearly stated. Format is less prescribed than UPSC but conservative.' },
  { exam: 'Indian Railways (RRB NTPC, ALP, Group D, JE)', resume: 'Used at DV and medical. Emphasise technical trade certificate (ITI, diploma), NCVT / SCVT registration number, apprenticeship records. Plain font, no tables beyond education.' },
  { exam: 'Banking (IBPS PO, SBI PO, RBI Grade B)', resume: 'Needed at interview stage. Highlight finance certifications (JAIIB, CAIIB, NISM), internships at banks, commerce subjects, current affairs grounding. 1 to 2 pages.' },
  { exam: 'PSU via GATE (NTPC, ONGC, BHEL, IOCL, GAIL)', resume: 'Lateral PSU resume. GATE year and score at the top. Engineering branch, internship projects, lab specialisations. 2-page allowed; technical PSU panels read in detail.' },
  { exam: 'Defence (NDA, CDS, AFCAT)', resume: 'Needed at SSB interview. Clean table format. NCC certificates, sports, leadership (head boy, class rep, student union), physical achievements. OLQ framing (Officer Like Qualities).' },
];

const FORMAT_RULES = [
  { rule: 'Page size', detail: 'A4 (210 x 297 mm). Print on one side unless the notification says both. Staple top-left, never bind.' },
  { rule: 'Font', detail: 'Times New Roman 12 pt or Arial 11 pt. No serif-sans mixing. Headings bold, underline sparingly.' },
  { rule: 'Margins', detail: '1 inch all sides. Government document formats assume this default.' },
  { rule: 'Date format', detail: 'dd/mm/yyyy, never Month YYYY. Panels read hundreds of applications; format deviation is flagged.' },
  { rule: 'Length', detail: 'UPSC DAF is as long as needed. PSU 2 pages. SSC interview resume 1 to 2 pages. Railways 1 page.' },
  { rule: 'Photograph', detail: 'Passport-size photograph, white background, 3.5 x 4.5 cm, top-right corner. Signed across the corner onto the page.' },
  { rule: 'Self-attestation', detail: 'Every enclosed document photocopy must carry your signature with the word Self-attested written above it.' },
  { rule: 'File naming (online upload)', detail: 'Use the format: RollNumber_CandidateName.pdf. Under 2 MB. PDF only, never DOCX.' },
];

const MISTAKES = [
  { m: 'Using a private-sector resume template', fix: 'Modern double-column templates (Canva, Overleaf fancy styles) confuse document verification panels. Use a plain single-column format.' },
  { m: 'Writing marketing-style bullets', fix: 'Spearheaded, drove, leveraged are private-sector words. Government panels prefer factual third-person phrasing: Worked as Assistant Engineer in the Civil division, supervised 12 staff.' },
  { m: 'Skipping the category declaration', fix: 'Always state category (GEN / OBC-NCL / SC / ST / EWS / PwBD) and whether you have a valid certificate. Leaving blank is read as concealment.' },
  { m: 'Percentage without conversion', fix: 'If your university uses CGPA, write CGPA and its percentage equivalent based on the university rule. Do not use 10-point assumptions unless your university confirms it.' },
  { m: 'Missing Father name', fix: 'Still a mandatory field in UPSC, SSC, Railways, and most state PSC forms. Leaving blank rejects the form at scrutiny.' },
  { m: 'Unsigned declaration', fix: 'Declaration + place + date + signature at the end. Missing signature equals rejection at DV.' },
  { m: 'Gaps without explanation', fix: 'Any 6+ month gap must be explained in a short footnote (Preparing for Civil Services, Family responsibilities, Medical leave). Panels ask about every gap.' },
  { m: 'References from friends or family', fix: 'Use HOD, professor, current employer, or gazetted officer. Personal references are rejected outright.' },
];

const TOC = [
  { id: 'intro', label: 'Why government resumes are different' },
  { id: 'exam-diff', label: 'Resume by exam: UPSC, SSC, Railways, Banking, PSU, Defence' },
  { id: 'sections', label: 'The 10 mandatory sections' },
  { id: 'format', label: 'Formatting rules (exact spec)' },
  { id: 'mistakes', label: '8 mistakes that get your form rejected' },
  { id: 'interview', label: 'Interview-stage resume (UPSC, IES, SSB, PSU)' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Fresher Resume Format 2026', slug: 'fresher-resume', excerpt: 'The 7-section format that beats Indian and global ATS.', read: 11 },
  { title: 'Campus Placement Resume', slug: 'campus-placement-resume', excerpt: 'Tier-1 and Tier-2 placement-cell format.', read: 10 },
  { title: 'TCS NQT Resume Guide', slug: 'tcs-nqt-resume-guide', excerpt: 'Exact NQT resume format and rules.', read: 9 },
  { title: 'Naukri Resume Tips', slug: 'naukri-resume-tips', excerpt: 'Profile, headline, keywords for the Indian job market.', read: 8 },
  { title: 'Resume Margins & Spacing', slug: 'resume-margins-spacing', excerpt: 'The ideal layout spec (8 values).', read: 10 },
];

export default function ResumeIndianGovtJobsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="Resume for Indian government jobs"
      title="Resume for Indian Government Jobs: UPSC, SSC, Railways (2026)"
      subtitle="Government resumes follow a different playbook than private-sector CVs. This guide covers the exact 10-section format, what changes for UPSC / SSC / Railways / Banking / PSU / Defence, and the 8 mistakes that get applications rejected at document verification."
      dateModified="2026-07-26"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            The private-sector resume is a marketing document; the government resume is a legal document. Every claim is cross-checked at document verification. Miss a field, skip a signature, or phrase a bullet in branding language and the panel quietly sets your file aside. This guide follows the actual 2026 DAF and PSU application conventions used by UPSC, SSC, RRB, IBPS, and the major central PSUs.
          </p>
        </div>
        <p>
          A good UPSC DAF, SSC interview resume, or PSU application reads like a service record. It is factual, chronological, in third-person-neutral tone, and leaves nothing to interpretation. Panels read 200 to 500 files a day; they reward clarity and penalise creativity. The best Indian civil-services and PSU resumes are sometimes called boring by private-sector friends, and that is precisely the compliment the document should draw.
        </p>
        <p className="mt-3">
          This guide splits into two halves. First, how the resume changes by exam (UPSC is not the same document as a Railways ALP DV resume). Second, the 10 mandatory sections that are common across almost every Indian government recruitment, with the format rules that decide whether your file clears the scrutiny round.
        </p>
      </section>

      <section id="exam-diff" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Resume by exam: what changes</h2>
        <div className="space-y-3">
          {EXAM_DIFF.map((e, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{e.exam}</p>
              <p className="text-sm text-gray-700">{e.resume}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sections" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 10 mandatory sections</h2>
        <p className="mb-4">Across UPSC DAF, PSU lateral application, and Railways / SSC interview resume, the required fields converge on these 10 blocks. Present them in this order unless the notification specifies otherwise.</p>
        <div className="space-y-3">
          {SECTIONS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.name}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Formatting rules (exact spec)</h2>
        <div className="space-y-3">
          {FORMAT_RULES.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.rule}</p>
              <p className="text-sm text-gray-700">{r.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 mistakes that get your form rejected</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="interview" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview-stage resume (UPSC, IES, SSB, PSU)</h2>
        <p className="mb-3">The interview resume (sometimes called the personality test form) is read line by line by the panel. Every phrase is a potential question. This means two things. First, write only what you can defend for 3 minutes under questioning. Claiming Read Vedas because it sounded impressive is a UPSC cliche, and boards now probe the weakest claim first. Second, frame every hobby, optional subject, and achievement as a launchpad for a richer answer, not as a closed statement.</p>
        <p className="mb-3">UPSC DAF (Mains and Interview):</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Hobbies: Pick 2 to 3. Specific over general (not reading, but reading non-fiction on Indian economic history). Be ready to talk for 4 minutes on each.</li>
          <li>Optional subject: Name it precisely. Board probes overlap with current affairs.</li>
          <li>Home state and district: Prepare 10 minutes of current affairs on your home state (CM, schemes, disputes, economy, geography).</li>
          <li>Achievements: Dates and numbers. Do not round. Panels verify specifics.</li>
        </ul>
        <p className="mt-3 mb-3">SSB (Defence):</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Prepare a 2-minute self-intro from the resume.</li>
          <li>Every sports and leadership claim needs a when, where, who story.</li>
          <li>Gaps are probed harder in SSB than in civil services. Fill them with learning or service activities.</li>
        </ul>
        <p className="mt-3 mb-3">PSU (GATE-based, lateral, R and D):</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li>Technical depth is the main axis. Expect 20 minutes on your final-year project.</li>
          <li>List your 5 strongest undergraduate subjects; the panel picks from that list.</li>
          <li>GATE rank and cut-off details should match the publicly released GOAPS record.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.upsc.gov.in/examinations" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">UPSC official examinations portal</a> for DAF formats and notifications.</li>
          <li><a href="https://ssc.gov.in/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">SSC official site</a> for CGL, CHSL, JE interview document-verification rules.</li>
          <li><a href="https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,7,1281" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Indian Railways recruitment board</a> for RRB formats and trade-certificate requirements.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I use a private-sector Canva template for a government application?', a: 'No. Panels and DV officers penalise non-standard layouts. Use a plain single-column format with conservative fonts.' },
            { q: 'Is a 2-page resume acceptable for UPSC DAF?', a: 'DAF is as long as it needs to be; it is not capped at 2 pages. Other resumes (PSU, SSC interview) should stay 1 to 2 pages.' },
            { q: 'Do I need to attach a photograph and signature?', a: 'Yes. Passport-size photo, white background, top-right corner, signed across the bottom. Missing photo equals rejection at scrutiny.' },
            { q: 'Should I mention my coaching institute?', a: 'Only if it directly relates (example: finalist in an all-India test series run by a named institute). Otherwise no; panels do not reward coaching affiliation.' },
            { q: 'How do I handle multiple UPSC or SSC attempts?', a: 'List them honestly. Attempts show persistence, not weakness, as long as your mark trend is upward.' },
            { q: 'Are volunteering or NCC hours important?', a: 'Very. NCC B / C certificate, NSS hours, and Scout rank carry concrete weight and are often probed in SSB and UPSC interviews.' },
            { q: 'How should I list my category certificate?', a: 'State category clearly, add valid until date (for OBC-NCL). Attach a self-attested copy at document verification.' },
            { q: 'Is English-only acceptable for a Hindi-state application?', a: 'Yes for most central recruitments. Some state PSC exams (UP, Bihar, MP) strongly prefer bilingual submission.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a DV-ready government resume</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz ships a government-format template with all 10 mandatory sections, Indian date format, and declaration block preset. Free to export.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
