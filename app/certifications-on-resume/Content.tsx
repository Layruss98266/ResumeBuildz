'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const COUNTS = [
  { item: 'Issued by a recognised body', detail: 'AWS, Google, PMI, CFA Institute, SHRM, ISC2, HubSpot Academy, Coursera (from a named university partner). Random LinkedIn course certificates do not count.' },
  { item: 'Required an exam or graded assessment', detail: 'A watched-video completion badge is not a certification. If there was no proctored test or graded project, leave it in the Courses section, not Certifications.' },
  { item: 'Relevant to the role you are applying for', detail: 'A Scrum cert on a data engineer resume adds noise. A Scrum cert on a PM resume adds signal. Tailor per application.' },
  { item: 'Still valid (or recently expired)', detail: 'Active certs are strongest. Expired within 12 months can stay. Expired 3 years ago almost always comes off, unless the cert is marquee (CFA, CPA, bar admission).' },
];

const FORMAT = [
  { field: 'Credential name', rule: 'Full official name, no casual shortening. AWS Certified Solutions Architect Associate, not AWS SAA. Exception: PMP is the official short form.' },
  { field: 'Issuing body', rule: 'Amazon Web Services, Project Management Institute, Google, CFA Institute. One line below or next to the cert name.' },
  { field: 'Year earned', rule: 'Year only, not month. For recent certs (under 2 years) you can add month. No year looks fishy, like you are hiding an old date.' },
  { field: 'Expiry', rule: 'If valid through: add (Valid through 2028). If expired but relevant: (Earned 2023). Transparency beats ambiguity.' },
  { field: 'Credential ID or URL', rule: 'Optional but strong. Recruiters verify more often than you think. Include ID for PMP, CFA, AWS, Google Cloud. Full verification URL is cleaner as a clickable link in PDF.' },
  { field: 'Order', rule: 'Most recent first, then by relevance to the target role. 3 to 6 certs max unless the field demands otherwise (Cloud, Compliance, Finance).' },
];

const FIELDS = [
  {
    field: 'Software Engineering',
    top: [
      'AWS Certified Solutions Architect (Associate or Professional)',
      'Google Cloud Professional Cloud Architect',
      'Certified Kubernetes Administrator (CKA)',
      'Microsoft Azure Fundamentals (AZ-900) or Associate (AZ-104)',
      'HashiCorp Certified: Terraform Associate',
    ],
    note: 'Stack depth wins. 2 deep cloud certs beat 6 scattered ones. Skip language-specific certs (Oracle Java, OCA) unless the JD names them.',
  },
  {
    field: 'Cloud / DevOps / SRE',
    top: [
      'AWS Certified DevOps Engineer Professional',
      'Google Cloud Professional DevOps Engineer',
      'Certified Kubernetes Administrator (CKA) and CKS',
      'HashiCorp Certified: Terraform Associate',
      'Red Hat Certified Engineer (RHCE)',
    ],
    note: 'Cloud certs expire every 2 to 3 years. List (Valid through YYYY) to show you are current. Stacked AWS Associate + Professional tells a clear story.',
  },
  {
    field: 'Product / Project Management',
    top: [
      'PMP (Project Management Professional)',
      'Certified Scrum Master (CSM) or PSM I',
      'SAFe Agilist or SAFe Product Owner',
      'Google Project Management Professional Certificate',
      'Prince2 Practitioner (UK / EU roles especially)',
    ],
    note: 'PMP is the heaviest lift (35 contact hrs + 3 to 5 yrs experience). CSM is the common entry cert. Stack PMP + CSM + SAFe if you want full coverage.',
  },
  {
    field: 'Finance / Accounting',
    top: [
      'CFA (Chartered Financial Analyst) Level I / II / III',
      'CPA (Certified Public Accountant)',
      'FRM (Financial Risk Manager)',
      'ACCA (Association of Chartered Certified Accountants)',
      'Chartered Accountant (CA) for India, ICAI',
    ],
    note: 'CFA progression counts: CFA Level II Candidate, exam scheduled Aug 2026 is a valid listing. Do not hide partial progress. CPA and CA are terminal, list as achieved.',
  },
  {
    field: 'HR / People Operations',
    top: [
      'SHRM-CP or SHRM-SCP',
      'HRCI: PHR, SPHR, or aPHR',
      'CIPD Level 5 / 7 (UK)',
      'LinkedIn Talent Solutions Certified (recruiter roles)',
      'AIHR: People Analytics Certificate',
    ],
    note: 'SHRM-CP is the US baseline. CIPD is the UK equivalent. People analytics certs are rising fast; list them prominently if you are targeting data-driven HR teams.',
  },
  {
    field: 'Marketing / Growth',
    top: [
      'Google Ads Certifications (Search, Display, Video, Shopping)',
      'Google Analytics (GA4) Certification',
      'HubSpot Inbound / Content / Marketing Hub',
      'Meta Blueprint (Media Buying or Media Planning)',
      'SEMrush or Ahrefs Certifications',
    ],
    note: 'Platform certs are free and expire yearly. Keep the top 3 only. Outdated Google Ads (Individual Qualification) signals you stopped updating.',
  },
  {
    field: 'Healthcare / Clinical',
    top: [
      'BLS / ACLS / PALS (American Heart Association)',
      'NCLEX-RN or equivalent licensure',
      'CCRN or specialty board certifications',
      'Epic or Cerner EHR Certified User',
      'HIPAA Compliance Certificate',
    ],
    note: 'Licensure is non-negotiable and goes near the top, not in a Certifications block at the bottom. EHR certs matter heavily for hospital admin and informatics roles.',
  },
  {
    field: 'Sales / Customer Success',
    top: [
      'Salesforce Certified Administrator or Sales Cloud Consultant',
      'HubSpot Sales Software / Inbound Sales',
      'Gong Certified (Revenue Intelligence)',
      'MEDDIC / MEDDPICC (various providers)',
      'Challenger Certified or SPIN Selling Certified',
    ],
    note: 'Salesforce Admin is the near-universal ask. Stack with methodology cert (MEDDIC, Challenger) to show both tool and framework fluency.',
  },
];

const TOC = [
  { id: 'intro', label: 'Why the Certifications section matters' },
  { id: 'counts', label: 'What actually counts as a certification' },
  { id: 'format', label: 'Format rules (6 fields)' },
  { id: 'fields', label: 'Top 5 certs by field (8 fields)' },
  { id: 'expired', label: 'Expired certs: keep or drop' },
  { id: 'placement', label: 'Where on the resume to put certifications' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, certifications, tools.', read: 11 },
  { title: 'Best Resume Format 2026', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'How to Pass ATS Scanning', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Tailor Resume to Job Description', slug: 'tailor-resume', excerpt: 'Keyword alignment without stuffing.', read: 9 },
  { title: 'Fresher Resume Guide', slug: 'fresher-resume', excerpt: 'Build a strong resume with little experience.', read: 12 },
];

export default function CertificationsOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Certifications on resume"
      title="How to List Certifications on a Resume by Field (2026)"
      subtitle="What counts as a certification, the 6 format fields every listing needs, top 5 certs each for 8 fields (Tech, Cloud, PM, Finance, HR, Marketing, Healthcare, Sales), and how to handle expired credentials."
      dateModified="2026-07-09"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">The fast take</p>
          <p className="text-gray-700">
            Certifications are keyword fuel for ATS and proof of current skill for humans. They pull their weight when they are recognised, relevant, and formatted consistently. They hurt when you list every 45-minute online course you ever started, or leave out the year so it looks like you are hiding something. This guide fixes both.
          </p>
        </div>
        <p>
          A strong Certifications section does 3 things at once: it surfaces exact-match keywords (PMP, AWS, SHRM-CP) that ATS platforms are hunting for; it signals you invest in staying current; and it credentials a skill claim that would otherwise read as self-assessed. A weak Certifications section dilutes all three by mixing marquee credentials with watched-video badges and expired courses from 2017.
        </p>
        <p className="mt-3">
          The test is simple. For every line you put in this section, ask: would I be comfortable if the interviewer asked me to verify this credential on screen right now. If yes, list it. If not, cut it.
        </p>
      </section>

      <section id="counts" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">What actually counts as a certification</h2>
        <p className="mb-4">Four filters separate certifications that matter from the ones that make a resume look padded.</p>
        <div className="space-y-3">
          {COUNTS.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{c.item}</p>
              <p className="text-sm text-gray-700">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="format" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Format rules (6 fields)</h2>
        <p className="mb-4">Every line in your Certifications section should contain these 6 fields, in this order, for consistency.</p>
        <div className="space-y-3">
          {FORMAT.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{f.field}</p>
              <p className="text-sm text-gray-700">{f.rule}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 font-semibold text-gray-900 mb-2">Example line</p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-800">
          AWS Certified Solutions Architect Associate, Amazon Web Services, 2025 (Valid through 2028) | Credential ID: SAA-C03-1xxxx
        </div>
      </section>

      <section id="fields" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Top 5 certs by field</h2>
        <p className="mb-6">8 common fields. The top 5 recognised credentials for each, plus a note on strategy.</p>
        <div className="space-y-5">
          {FIELDS.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-bold text-gray-900 text-lg mb-2">{f.field}</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 mb-3">
                {f.top.map((t, j) => (<li key={j}>{t}</li>))}
              </ol>
              <p className="text-xs text-gray-600 italic">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="expired" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Expired certs: keep or drop</h2>
        <p className="mb-3">Expiry is the field most candidates fumble. Here is the rule set.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Active and current.</strong> List normally with (Valid through YYYY). This is the strongest case.</li>
          <li><strong>Expired within the last 12 months.</strong> Keep on resume with (Earned YYYY, expired YYYY). If you are recertifying, add Recertification in progress. Shows continuity.</li>
          <li><strong>Expired 1 to 3 years ago, credential is a benchmark (PMP, CFA, CPA, bar admission).</strong> Keep. Marquee certs do not fully lose value even expired. List as (Earned YYYY, expired YYYY).</li>
          <li><strong>Expired 1 to 3 years ago, platform cert (Google Ads, HubSpot, cloud Associate).</strong> Drop. These certs signal you stay current; an expired one signals the opposite. Retake or remove.</li>
          <li><strong>Expired over 3 years.</strong> Drop unless it is a terminal credential (CPA, CA, bar) that does not expire by design.</li>
          <li><strong>In progress.</strong> Valid to list. Format: CFA Level II Candidate, scheduled Aug 2026. Do not list In progress for anything you have not paid for and registered for.</li>
        </ul>
      </section>

      <section id="placement" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Where on the resume to put certifications</h2>
        <p className="mb-3">Placement depends on how central the cert is to the role.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>Role-critical certs go near the top.</strong> If the JD lists the cert as a requirement (PMP for a PM role, RN licensure for nursing, CFA for an analyst), put it right after your summary or as a line in a small Core Credentials strip below your name.</li>
          <li><strong>Role-relevant certs sit in their own section.</strong> After Experience and before Education, or immediately after Skills. Use a clean Certifications heading.</li>
          <li><strong>Role-adjacent or filler certs go last or get cut.</strong> If you have 2 strong certs and 4 weak ones, list 2 and drop 4. Strength beats quantity.</li>
          <li><strong>On a 1-page resume.</strong> Merge into the Skills section as a Certifications subline if you cannot afford a full block.</li>
          <li><strong>On LinkedIn.</strong> Use the Licenses and Certifications section with verification URL. LinkedIn also pulls from Credly badges; link those if you have them.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://aws.amazon.com/certification/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">AWS Certification official catalogue and expiry rules</a></li>
          <li><a href="https://www.pmi.org/certifications" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">PMI certifications (PMP and family)</a></li>
          <li><a href="https://www.credly.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Credly for digital badge verification</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I list an AWS certification on a resume?', a: 'Full name (AWS Certified Solutions Architect Associate), issuer (Amazon Web Services), year, validity window, credential ID. Example: AWS Certified Solutions Architect Associate, AWS, 2025 (Valid through 2028), ID: SAA-C03-1xxxx.' },
            { q: 'How do I list a PMP on a resume?', a: 'PMP, Project Management Institute, year earned, and your credential ID. PMP is one of the few certs where the acronym is the official listed name. PMP, PMI, 2024, ID: 3456789.' },
            { q: 'Should I list expired certifications?', a: 'Only if recent (under 12 months) or marquee (CFA, CPA, bar). Label the expiry honestly. Expired platform certs from 3 years ago signal you stopped keeping current; cut them.' },
            { q: 'How many certifications is too many?', a: '3 to 6 is the sweet spot for most fields. Cloud, compliance, and finance roles can justify 7 to 10. More than 10 starts to look like padding unless the field demands a broad stack.' },
            { q: 'Do online course completions count as certifications?', a: 'Not unless there was a proctored exam or graded final. Coursera course completion with no test goes under Courses, not Certifications. University-partner specialisations with graded capstones do count.' },
            { q: 'What if my certification is in a language other than English?', a: 'List the local name first, then English equivalent in parentheses. Example: Chartered Accountant (CA), ICAI, 2023. Recruiters outside India may not recognise ICAI on sight.' },
            { q: 'Should I include training certificates from my employer?', a: 'Internal training (Company X Leadership Program) belongs in Experience or a Professional Development subsection, not Certifications. The Certifications block is for third-party credentials.' },
            { q: 'Do certifications matter more than degrees?', a: 'Depends on the field. In cloud, SaaS, and certain regulated domains (finance, healthcare) a current cert can outweigh a 10-year-old unrelated degree. For most roles both carry weight in different ways; list both.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">A Certifications section that formats itself</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz gives you a dedicated Certifications block with structured fields for issuer, year, expiry, and credential ID. Consistent formatting, zero fiddling.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
