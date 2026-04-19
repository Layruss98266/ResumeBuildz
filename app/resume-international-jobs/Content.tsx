/* eslint-disable react/no-unescaped-entities */
'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const REGIONS = [
  { region: 'United States', page: 'US Letter (8.5 x 11 in)', length: '1 page (under 10 years) or 2 pages (over 10 years)', photo: 'No photo. Including one can trigger an auto-reject under EEOC risk policies at many firms.', personal: 'No date of birth, no marital status, no nationality. Phone with country code, city and state.', conventions: 'Month / Year dates. US English spelling. Metrics front-loaded. ATS-first formatting (single column, standard section headings).' },
  { region: 'United Kingdom', page: 'A4 (210 x 297 mm)', length: '2 pages is the norm; 1 page acceptable for early career', photo: 'No photo. UK equality law makes photos a liability for the employer.', personal: 'No date of birth, no marital status, no nationality. Town plus postcode (partial) is fine.', conventions: 'DD / MM / YYYY or Month YYYY. UK English spelling (organise, colour). Includes a short "Personal statement" at the top, 3 to 4 lines.' },
  { region: 'Canada', page: 'US Letter is most common; A4 accepted', length: '1 to 2 pages', photo: 'No photo. Human Rights Act makes them unnecessary risk.', personal: 'No date of birth, no marital status. City and province only. Language proficiency (English / French) is useful.', conventions: 'Month YYYY dates. Mix of US and UK spelling is fine (follow the employer). Bilingual candidates often note language at the top.' },
  { region: 'Germany', page: 'A4 (210 x 297 mm)', length: '2 pages Lebenslauf plus cover letter is the norm', photo: 'Professional photo is traditional though no longer required. Younger firms skip it; conservative industries still expect one.', personal: 'Date of birth, place of birth, and nationality are still common on older templates. Not required; younger recruiters prefer without.', conventions: 'Reverse chronological, very detailed. Signature and date at the bottom of the Lebenslauf. Include language levels (A1 to C2) and certifications.' },
  { region: 'Australia / New Zealand', page: 'A4', length: '2 to 3 pages is acceptable; longer than US norm', photo: 'No photo. Anti-discrimination laws apply.', personal: 'No date of birth, no marital status. Visa / work rights status is useful (e.g. "Australian citizen" or "457 visa holder").', conventions: 'Detailed role descriptions. Referees listed (or "available on request"). Personal interests section is still common.' },
  { region: 'Middle East (UAE / KSA)', page: 'A4', length: '2 pages', photo: 'Professional photo is often expected.', personal: 'Nationality, marital status, and visa status are still commonly listed; some firms require them.', conventions: 'Arabic language ability is a plus (state level). Driver licence status is relevant for many non-engineering roles.' },
];

const VISA_DO = [
  'Right to work, stated plainly. "Authorised to work in the UK (Skilled Worker visa, expires 2028)" or "US work authorisation: H1B transfer candidate".',
  'Location preference, if you have one. "Open to relocation to NYC or remote within ET hours" removes ambiguity.',
  'Timezone for remote roles. "Based in Bengaluru, available 2pm to 10pm IST (4.30am to 12.30pm ET)" tells a US hiring manager you are serious.',
  'Language proficiency with a standard level. IELTS, CEFR (A1 to C2), or JLPT. "Fluent" is not measurable.',
];

const VISA_DONT = [
  'Do not list your passport number, visa number, or full home address. This is PII leakage, not useful signal.',
  'Do not state ambiguous "Seeking sponsorship". Either "Authorised to work" or "Requires sponsorship (H1B)". Vague costs interviews.',
  'Do not hide visa status if the role requires disclosure. Employers find out at offer stage; hiding costs the offer and the relationship.',
  'Do not list dependents, marital status, or spouse visa as a way to signal "cheaper to relocate". It is not the employer\'s business and weakens the page.',
];

const H1B = [
  'State H1B status clearly. Three acceptable variants: "H1B transfer candidate", "H1B cap-exempt", "H1B with 3 years remaining (I-140 approved)".',
  'I-140 approval is a major plus. If you have it, say so. It means a new employer can extend in 3-year blocks past the 6-year cap.',
  'US address and US phone number. Recruiters are wary of resumes with India-only contact details claiming H1B status; it reads as fraud-adjacent.',
  'Do not over-explain. One line is enough. A paragraph on visa signals desperation.',
];

const UK = [
  'Skilled Worker visa shortage occupations get faster processing and reduced salary thresholds. If your role is on the list (check GOV.UK), note it.',
  'If you hold a Graduate visa (up to 2 years), state it with expiry: "Graduate visa holder (expires April 2027), seeking Skilled Worker sponsorship".',
  'Sponsorship licence check: only sponsor-licensed employers can hire you on Skilled Worker. If you find a role that fits, confirm the employer is on the register before applying.',
  'Global Talent visa holders can skip the sponsorship line entirely. "Global Talent visa holder" is enough and signals a high-tier track.',
];

const CANADA = [
  'Express Entry CRS score (if Permanent Resident track) is not relevant on the resume. Keep it in cover letter or the LinkedIn "About" section.',
  'Work permit type matters: PGWP (Post-Graduation Work Permit), LMIA-exempt (intra-company transfer), or open work permit. State which.',
  'French proficiency is a material plus even outside Quebec for federal or bilingual employers.',
  'Canadian experience is a de facto ask in many postings. If you have any (internship, contract, volunteer), surface it high on the page.',
];

const REMOTE = [
  'Lead with your working hours, not your calendar location. "London-based, covering 9am to 6pm GMT" is what the hiring manager needs to know.',
  'Note the overlap with the employer\'s core hours. "4-hour daily overlap with PT core hours (9am to 1pm PT)" is specific and useful.',
  'If your team is distributed across time zones, say so. Shows you already operate in async modes.',
  'Avoid cute labels ("Digital nomad"). State a country of residence for tax / employment purposes. Most employer-of-record systems need this.',
];

const TOC = [
  { id: 'intro', label: 'Why region matters' },
  { id: 'regions', label: 'Regional conventions (US, UK, Canada, DE, AU, ME)' },
  { id: 'visa', label: 'Visa context: what to include and skip' },
  { id: 'h1b', label: 'H1B on a US resume' },
  { id: 'uk', label: 'UK Skilled Worker visa' },
  { id: 'canada', label: 'Canada PR / work permit' },
  { id: 'remote', label: 'Remote applications and timezone' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Length 2026', slug: 'resume-length', excerpt: '1 page vs 2 pages by career stage.', read: 8 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Resume Margins & Spacing', slug: 'resume-margins-spacing', excerpt: 'A4 vs US Letter, exact margin spec.', read: 10 },
  { title: 'Cover Letter (2026)', slug: 'cover-letter', excerpt: 'Structure, tone, and 4 worked examples.', read: 11 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
];

export default function ResumeInternationalJobsPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Remote Work & Global Jobs"
      breadcrumbCurrent="Resume for international jobs"
      title="Resume for International Jobs: H1B, UK, Canada (2026)"
      subtitle="Regional conventions across 6 markets, exactly how to state visa context (and what to leave out), and the timezone note that makes your remote application look credible."
      dateModified="2026-07-05"
      readingTime={14}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            A good resume in India can look alarming in the US. A US resume can be rejected in Germany for looking too sparse. Every region has a default template in the recruiter head, and violating it costs you the interview before they read a bullet. Get the region right, state visa context cleanly, and you compete on content.
          </p>
        </div>
        <p>
          International applications fail on two axes: regional format mismatch and murky visa disclosure. A US resume should not carry a photo, a German Lebenslauf traditionally does. A UK resume leaves out date of birth entirely, a Saudi resume may require it. This guide takes the 6 markets most Indian and APAC candidates target, gives you the format spec for each, and resolves the single biggest source of friction: how to state visa status so the employer processes the application instead of silently dropping it.
        </p>
      </section>

      <section id="regions" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Regional conventions across 6 markets</h2>
        <div className="space-y-4">
          {REGIONS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-bold text-gray-900 mb-3 text-lg">{r.region}</p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div><dt className="font-semibold text-gray-900 inline">Page size: </dt><dd className="inline text-gray-700">{r.page}</dd></div>
                <div><dt className="font-semibold text-gray-900 inline">Length: </dt><dd className="inline text-gray-700">{r.length}</dd></div>
                <div><dt className="font-semibold text-gray-900 inline">Photo: </dt><dd className="inline text-gray-700">{r.photo}</dd></div>
                <div><dt className="font-semibold text-gray-900 inline">Personal info: </dt><dd className="inline text-gray-700">{r.personal}</dd></div>
                <div className="sm:col-span-2"><dt className="font-semibold text-gray-900 inline">Conventions: </dt><dd className="inline text-gray-700">{r.conventions}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section id="visa" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Visa context: what to include and skip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Do include</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {VISA_DO.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Do not include</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {VISA_DONT.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="h1b" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">H1B on a US resume</h2>
        <p className="mb-4 text-sm text-gray-700">US hiring teams screen H1B explicitly; many ATS tools have a pre-filter for sponsorship need. Be specific.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {H1B.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          Placement: a single line in the contact header, not a separate section. Example: "H1B transfer candidate (I-140 approved) &middot; San Jose, CA &middot; (408) 555 0102".
        </p>
      </section>

      <section id="uk" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">UK Skilled Worker visa</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {UK.map((u, i) => <li key={i}>{u}</li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          Placement: under the header or as the first line of the personal statement. Example: "Skilled Worker visa candidate &middot; Backend engineer (7 years) &middot; Based in Bengaluru, available to relocate to London within 6 weeks of offer."
        </p>
      </section>

      <section id="canada" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Canada PR / work permit</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {CANADA.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          Placement: one line in the header. "PGWP holder (valid until Nov 2027) &middot; Toronto, ON &middot; Express Entry profile created 2025" gives the recruiter everything they need to triage.
        </p>
      </section>

      <section id="remote" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Remote applications and timezone</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {REMOTE.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.gov.uk/skilled-worker-visa" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">GOV.UK: Skilled Worker visa</a></li>
          <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Government of Canada: Express Entry</a></li>
          <li><a href="https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">USCIS: H1B specialty occupations</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I keep two resumes, one for India and one for US?', a: 'Yes. Page size, length, date format, and visa line all change. Maintain two master files; tailor each to the posting.' },
            { q: 'Do I need to translate my resume for Germany?', a: 'English is acceptable at most tech firms in Berlin / Munich. Traditional sectors (automotive, banking) still prefer a German Lebenslauf. Check the job post language.' },
            { q: 'Should I hide my India address when applying to US roles?', a: 'No. Honest location plus a clear sponsorship line does better than faked US addresses. Faked addresses get caught at background check.' },
            { q: 'Is "Willing to relocate" enough?', a: 'Not on its own. Pair with the visa status and a realistic timeline: "Willing to relocate to London within 8 weeks of offer; Skilled Worker visa candidate".' },
            { q: 'Do I need to mention family or dependents?', a: 'No. Not relevant, and in some jurisdictions employers are prohibited from asking. Keep it off the page.' },
            { q: 'Should I list my IELTS / TOEFL score?', a: 'Yes if you are targeting UK, Canada, or Australia skilled migration; employers read it as diligence signal. Skip if you studied in an English-medium country.' },
            { q: 'What about Singapore, Japan, Netherlands?', a: 'Singapore: 2 pages, A4, English, photo optional. Japan: Rirekisho format for domestic firms, Western CV for MNCs. Netherlands: 2 pages, A4, English fine, no photo needed.' },
            { q: 'Do I need a LinkedIn profile to apply internationally?', a: 'Yes. Recruiters verify resumes against LinkedIn in 80 percent of cases. A sparse or missing LinkedIn is a red flag.' },
            { q: 'Should I adjust spelling (colour vs color)?', a: 'Yes. US English for US roles, UK English for UK / EU / Commonwealth. A single spelling mismatch looks careless.' },
            { q: 'How do I handle a gap caused by visa processing?', a: 'Be transparent. A single line: "Nov 2024 to Feb 2025: visa transition, consulted part-time with previous employer" closes the gap without drama.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">One resume, region-aware exports</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz exports US Letter or A4 on a toggle, swaps date formats, and has a visa-line template for H1B, Skilled Worker, and PGWP baked in.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
