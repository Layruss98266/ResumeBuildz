'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const DIFFS = [
  { item: 'Document name', exec: 'Resume or CV. 1 to 2 pages.', board: 'Board bio (1 page narrative) plus a 2-page Director CV. Two documents, not one.' },
  { item: 'Voice', exec: 'First-person-implied. Led a team of 40.', board: 'Third-person. Smita Rao served as CFO of ABC from 2016 to 2022. Reads like an S-1 biography.' },
  { item: 'Emphasis', exec: 'Operating outcomes. Shipped, grew, hired, launched.', board: 'Governance, oversight, fiduciary. Chaired the Audit Committee, oversaw 3 CEO transitions.' },
  { item: 'Numbers', exec: 'Growth KPIs (revenue, DAU, retention).', board: 'Scale markers (market cap, AUM, headcount, ARR) + governance metrics (audit cycles, comp decisions).' },
  { item: 'Networks', exec: 'Rarely listed.', board: 'Named prominently. Alumni of McKinsey, board of 2 SEBI-listed firms, advisor to 3 Sequoia portfolio companies.' },
  { item: 'Independence flag', exec: 'Not applicable.', board: 'Independent / Non-Independent / Executive director status, and why, named explicitly.' },
];

const SECTIONS = [
  { name: 'Bio paragraph', detail: '100 to 150 words, 3rd person. Current role, standout track record, 2 or 3 domain strengths relevant to this board. Should read like the paragraph that would appear in a proxy filing or annual report.' },
  { name: 'Governance experience', detail: 'Each board or advisory role as its own block. Company, dates, committee memberships (Audit, Nomination, Remuneration, Risk), independence status, 2 or 3 governance decisions you shaped or oversaw.' },
  { name: 'Operating track record + credentials', detail: 'Your executive past compressed to 5 to 8 lines. Companies, titles, years. No bullet detail. Education, designations (CA, CFA, bar admission), major awards or recognitions. This is the credentialing block, not a full executive resume.' },
];

const GOVERNANCE = [
  { signal: 'Committee work named', detail: 'Chaired Audit Committee (2019 to 2022), overseeing Big Four external audit, ERM framework, and 2 whistleblower matters. Names the committee, the scope, and the substance.' },
  { signal: 'CEO and CFO transitions', detail: 'Led succession planning that replaced the founding CEO in 2021 with a 9-month runway, no stock drop, and full continuity on the top 20 employees. Rare signal; list it when you have it.' },
  { signal: 'Crisis governance', detail: 'Navigated SEBI enquiry in 2023 with full board cooperation, zero enforcement action, and revised disclosure controls adopted board-wide. Or cyber incident. Or activist shareholder. Crises prove you can board, not just attend.' },
  { signal: 'Audit and risk oversight', detail: 'Evaluated 4 Big Four rotation proposals, led 3 ERM refreshes, approved ICFR framework post-IPO. Numbers over adjectives.' },
  { signal: 'Capital decisions', detail: 'Board-approved 2 buybacks (total INR 540 Cr), 1 secondary offering, and a 150 Cr debenture issuance. Board-level capital decisions are different from operating capital planning; frame them that way.' },
];

const INDEPENDENCE = [
  { item: 'Independent', detail: 'No employment, no material business relationship (customer, vendor, lender), not a relative of an executive, no cross-directorships with other directors. Most sought-after. State it plainly: Independent Non-Executive Director.' },
  { item: 'Non-Independent Non-Executive', detail: 'Board seat but has a material tie (founder, large shareholder, promoter family). Still valuable on closely-held or family-business boards. State the tie honestly.' },
  { item: 'Executive Director', detail: 'You also hold an executive role at the company (CEO, Executive Chair). Rarer for outside candidates; usually internal.' },
  { item: 'Advisor (non-board)', detail: 'Formal advisory agreement, no fiduciary duty, no voting seat. List separately from board roles. Typical for startups and growth-stage founders building their first board.' },
];

const SUMMARIES = [
  {
    who: 'First-time board member (seasoned CFO, corporate India)',
    bio: 'Smita Rao is a finance executive with 24 years in Indian corporate finance, including 8 years as CFO of ABC Consumer Ltd (NSE: ABCCONS, market cap INR 18,400 Cr at exit). At ABC she led 2 rights issues totalling INR 1,100 Cr, a buyback of INR 420 Cr, and the conversion from Ind-AS convergence to full Ind-AS reporting. She is a Chartered Accountant (ICAI, 2001) and holds the FCA designation. She is currently standing for her first independent board seat, with a focus on consumer-facing listed companies and audit committee work.',
    fit: 'Strongest on Audit Committee chair roles for mid-cap listed consumer companies. Not a fit for deep-tech, crypto, or early-stage advisory where governance patterns differ.',
  },
  {
    who: 'Seasoned director (multiple boards, cross-border)',
    bio: 'Aarav Mehta is an independent director with 11 years of board experience across 4 listed companies (Singapore SGX, India NSE, UK AIM) in financial services, industrials, and healthtech. He has chaired Audit at 2 firms and Risk at 1, led the CEO transition at Pinnacle Health in 2022 (9-month runway, zero stock impact), and served on the Remuneration Committee during a contested activist campaign at Standard Industrials in 2024. He is a CFA charterholder (2004) and held operating roles as Group CFO of Jindal Cross-Border (2010 to 2019).',
    fit: 'Best suited to boards navigating complex governance events (succession, activist engagement, cross-listing). Overqualified for early-stage advisory roles.',
  },
  {
    who: 'Founder-to-advisor (operator transitioning to advisory seat)',
    bio: 'Ravi Kulkarni is the co-founder and former CEO of PaySure (Series D fintech, acquired by Visa in 2024 for USD 640 M). He scaled PaySure from 3 to 420 employees, raised USD 118 M across 4 rounds, and built the company to 3.1 M active merchants before the Visa transaction. He is now advising 4 seed to Series B fintech companies in India and Southeast Asia on fundraising strategy, product-market fit, and go-to-market in regulated payments. He holds a B.Tech from IIT Bombay and an MBA from INSEAD.',
    fit: 'Ideal for founder-stage advisory, 2 to 4 engagements at a time. Not yet suited to independent director roles on listed company boards (typical requirement: prior listed-board tenure).',
  },
];

const TOC = [
  { id: 'intro', label: 'Board and advisor CVs are a different document' },
  { id: 'diffs', label: 'How board CVs differ from executive resumes' },
  { id: 'sections', label: 'The 3-section board bio structure' },
  { id: 'governance', label: 'Framing governance experience' },
  { id: 'independence', label: 'Independence criteria and how to state it' },
  { id: 'networks', label: 'Networks and referrals as proof' },
  { id: 'summaries', label: '3 worked summaries' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '25 strong and weak pairs by stage + industry.', read: 14 },
  { title: 'Tailor Resume to Job Description', slug: 'tailor-resume', excerpt: 'Keyword alignment without stuffing.', read: 9 },
  { title: 'LinkedIn URL on Resume', slug: 'linkedin-url-on-resume', excerpt: 'Vanity URL, placement, what recruiters check.', read: 6 },
  { title: 'Resume Action Verbs', slug: 'resume-action-verbs', excerpt: '120 verbs grouped by function with examples.', read: 9 },
  { title: 'How to List Certifications on Resume', slug: 'certifications-on-resume', excerpt: '8 fields, top certs, format rules, expired strategy.', read: 11 },
];

export default function BoardAdvisorResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Growth & Mobility"
      breadcrumbCurrent="Board and advisor resume"
      title="Resume for a Board Seat or Advisor Role (2026)"
      subtitle="How board bios and director CVs differ from executive resumes, the 3-section structure, governance framing, independence criteria, and 3 worked summaries (first-time director, seasoned director, founder-to-advisor)."
      dateModified="2026-07-12"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The core shift</p>
          <p className="text-gray-700">
            An executive resume answers: can you run the business. A board bio answers: can you oversee, challenge, and govern the business being run by someone else. Different question, different document. Candidates who submit a polished CEO resume for an independent director role almost always get filtered at the first pass.
          </p>
        </div>
        <p>
          Board and advisory opportunities rarely come through job boards. They come through nomination committees, search firms (Heidrick, Russell Reynolds, Egon Zehnder, ABP in India), proxy consultants, and a referral network that has watched you work for 10 to 20 years. That means two things for the document. First, the document will be read by people who already know something about you; so credentialing short-hand (CFA, ICAI, Big Four, specific listed boards) carries weight the resume would otherwise need to earn. Second, because it sits inside a formal nomination process, the format is stricter: third-person bio, governance-forward framing, explicit independence status, clean factual CV. Looseness that works on an executive resume reads as unserious on a board submission.
        </p>
        <p className="mt-3">
          This guide covers what to write, what to leave out, and how to tailor the same core material to three common candidacies: first-time board member, seasoned director adding a fourth seat, and operating founder transitioning to advisory work.
        </p>
      </section>

      <section id="diffs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">How board CVs differ from executive resumes</h2>
        <div className="space-y-3">
          {DIFFS.map((d, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{d.item}</p>
              <p className="text-sm text-gray-700"><strong>Executive resume:</strong> {d.exec}</p>
              <p className="text-sm text-gray-700 mt-1"><strong>Board bio / CV:</strong> {d.board}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sections" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 3-section board bio structure</h2>
        <p className="mb-4">Most nomination committees want a 1-page bio plus a 2-page director CV. The bio is the shop-window; the CV is the back-office. Same 3-section logic drives both.</p>
        <div className="space-y-3">
          {SECTIONS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">Section {i + 1}: {s.name}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="governance" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Framing governance experience</h2>
        <p className="mb-4">Governance work is not operating work done from a seat above. It is a distinct practice. These are the signals nomination committees look for, and how to frame them.</p>
        <div className="space-y-3">
          {GOVERNANCE.map((g, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{g.signal}</p>
              <p className="text-sm text-gray-700">{g.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="independence" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Independence criteria and how to state it</h2>
        <p className="mb-4">State your independence status openly on page 1. Listed-company boards have regulated independence tests (SEBI LODR in India, NYSE / Nasdaq rules in the US, UK Corporate Governance Code in the UK). Getting it wrong disqualifies you; getting it ambiguous delays the process.</p>
        <div className="space-y-3">
          {INDEPENDENCE.map((i, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{i.item}</p>
              <p className="text-sm text-gray-700">{i.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="networks" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Networks and referrals as resume proof</h2>
        <p className="mb-3">
          An operating resume almost never names referees; a board bio often does. Why: the nomination committee is already asking your network for back-channel references, so getting ahead of the conversation with 2 or 3 named endorsers (with permission) is expected and appreciated.
        </p>
        <p className="mb-3">
          Endorsers should skew toward other sitting directors, former CEOs or Chairs, and regulated-professional peers (Big Four audit partners, senior partners at named law firms). Do not list customers, vendors, or anyone with a material interest. Format as a References available on request line in the base CV, and a 3-name short-list held separately that you share only when the committee asks.
        </p>
        <p>
          Named cross-directorships can also anchor a bio. If you currently sit on 2 boards with a well-regarded Chair, name them. Directors who have worked with respected Chairs travel well across searches.
        </p>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">3 worked summaries</h2>
        <p className="mb-4">Three common candidacies. Bio, then a line on fit.</p>
        <div className="space-y-5">
          {SUMMARIES.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-bold text-gray-900 mb-2">{s.who}</p>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">{s.bio}</p>
              <p className="text-xs text-gray-600 italic"><strong>Best fit:</strong> {s.fit}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.sebi.gov.in/legal/regulations/aug-2023/securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-last-amended-on-june-14-2023-_75181.html" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">SEBI LODR: independent director criteria (India)</a></li>
          <li><a href="https://www.frc.org.uk/library/standards-codes-policy/corporate-governance/uk-corporate-governance-code/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">UK Corporate Governance Code</a></li>
          <li><a href="https://corpgov.law.harvard.edu/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Law School Forum on Corporate Governance</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How long should a board bio be?', a: 'The narrative bio is 100 to 150 words on a single page. The accompanying director CV runs to 2 pages with governance experience, operating history, and credentials. Anything longer is rarely read in full.' },
            { q: 'Should I use third-person in a board bio?', a: 'Yes. Board bios are written in third-person by convention (she has served, he has chaired). It mirrors proxy-filing style and signals you understand the document category.' },
            { q: 'Do I need a separate document for advisor roles?', a: 'Yes, but lighter. Advisor roles do not require a formal director CV; a 1-page bio plus your regular LinkedIn is usually enough. Startup boards may also ask for a short deck (4 to 6 slides) covering past outcomes and areas you advise on.' },
            { q: 'How many board seats is too many?', a: 'Most listed-company codes flag directors on more than 5 to 7 boards as over-committed. UK code recommends fewer than 4 listed boards if you also hold a full-time executive role. Check the specific regulator and your own capacity.' },
            { q: 'What if I have no prior board experience?', a: 'Frame committee chairmanship from internal company experience (Chaired the Audit Review Committee as CFO), external non-profit governance, and 1 or 2 advisory agreements. It will not replace a director seat on a listed board, but it positions you for smaller or first-time director openings.' },
            { q: 'Should I list compensation on a board CV?', a: 'Never. Compensation is discussed at offer stage, not in the CV. Naming past director fees or ESOPs looks amateur.' },
            { q: 'How do I get the first board seat?', a: 'Build through non-profit boards, industry association boards, or PE / VC portfolio observer seats. Work with 2 search firms early (Heidrick, Russell Reynolds, Egon Zehnder). Ask your network of current directors for nominations. The first seat is the hardest; the second and third arrive faster.' },
            { q: 'Is a LinkedIn profile enough for an advisor role?', a: 'For informal startup advisory, often yes. For a formal nomination process (listed company, large private, PE-backed), always produce a dedicated bio and CV. LinkedIn alone signals you did not take the opportunity seriously.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Turn your executive resume into a board-ready bio</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz has a Board Bio template with third-person voice, governance sections, and independence flags built in. Export the bio and director CV from a single profile.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
