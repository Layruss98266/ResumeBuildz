'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const INDUSTRIES = [
  {
    name: 'Technology / Software',
    keywords: ['Python', 'Java', 'TypeScript', 'React', 'Node.js', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'CI/CD', 'REST API', 'GraphQL', 'microservices', 'distributed systems', 'SQL', 'NoSQL', 'Redis', 'Kafka', 'system design', 'code review', 'unit testing', 'TDD', 'agile', 'Scrum', 'JIRA', 'Git', 'observability', 'SRE'],
  },
  {
    name: 'Finance / Banking',
    keywords: ['financial modelling', 'DCF', 'LBO', 'valuation', 'Bloomberg Terminal', 'Excel', 'VBA', 'Python', 'SQL', 'risk management', 'VaR', 'credit analysis', 'equity research', 'M&A', 'IFRS', 'GAAP', 'reconciliation', 'variance analysis', 'FP&A', 'forecasting', 'hedge accounting', 'derivatives', 'Basel III', 'KYC', 'AML', 'portfolio management'],
  },
  {
    name: 'Healthcare / Clinical',
    keywords: ['EMR', 'EHR', 'Epic', 'Cerner', 'HIPAA', 'ICD-10', 'CPT', 'patient care', 'care coordination', 'triage', 'clinical documentation', 'evidence-based practice', 'infection control', 'medication administration', 'IV therapy', 'phlebotomy', 'vital signs', 'BLS', 'ACLS', 'PALS', 'discharge planning', 'patient education', 'HEDIS', 'Joint Commission', 'quality improvement'],
  },
  {
    name: 'Marketing',
    keywords: ['SEO', 'SEM', 'PPC', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'content marketing', 'email marketing', 'HubSpot', 'Marketo', 'Salesforce', 'Google Analytics 4', 'GA4', 'conversion rate', 'CTR', 'CPA', 'CAC', 'LTV', 'ROAS', 'A/B testing', 'brand strategy', 'positioning', 'demand generation', 'marketing automation', 'attribution', 'CRM', 'copywriting', 'creative brief'],
  },
  {
    name: 'Retail / E-commerce',
    keywords: ['Shopify', 'Magento', 'WooCommerce', 'Amazon Seller Central', 'inventory management', 'SKU management', 'merchandising', 'visual merchandising', 'POS', 'omnichannel', 'loss prevention', 'shrinkage', 'planogram', 'category management', 'buying', 'vendor management', 'customer experience', 'NPS', 'CSAT', 'returns processing', 'fulfilment', 'last-mile logistics', 'conversion rate', 'AOV', 'basket size'],
  },
  {
    name: 'Consulting',
    keywords: ['MECE', 'hypothesis-driven', 'issue tree', 'executive summary', 'storyboarding', 'stakeholder management', 'change management', 'workshop facilitation', 'root-cause analysis', 'process mapping', 'benchmarking', 'market sizing', 'TAM SAM SOM', 'due diligence', 'operating model', 'organisation design', 'cost optimisation', 'revenue growth', 'PMO', 'digital transformation', 'McKinsey 7S', 'Porter 5 Forces', 'PowerPoint', 'Excel modelling'],
  },
  {
    name: 'Legal',
    keywords: ['contract drafting', 'contract review', 'NDA', 'MSA', 'SOW', 'litigation', 'discovery', 'deposition', 'legal research', 'Westlaw', 'LexisNexis', 'compliance', 'GDPR', 'CCPA', 'SOX', 'corporate governance', 'IP', 'trademark', 'patent', 'due diligence', 'regulatory filings', 'matter management', 'e-discovery', 'Bluebook', 'case strategy', 'client advisory'],
  },
  {
    name: 'Education',
    keywords: ['curriculum development', 'lesson planning', 'differentiated instruction', 'classroom management', 'IEP', '504 plan', 'formative assessment', 'summative assessment', 'Bloom taxonomy', 'UDL', 'EdTech', 'LMS', 'Canvas', 'Google Classroom', 'parent-teacher conference', 'student engagement', 'student outcomes', 'NAPLAN', 'SAT prep', 'Common Core', 'STEAM', 'literacy', 'numeracy', 'special education', 'ELL'],
  },
  {
    name: 'Manufacturing / Operations',
    keywords: ['Lean', 'Six Sigma', 'Kaizen', '5S', 'SMED', 'TPM', 'value-stream mapping', 'Kanban', 'MRP', 'ERP', 'SAP', 'Oracle', 'quality control', 'ISO 9001', 'ISO 14001', 'root-cause analysis', 'FMEA', 'SPC', 'yield improvement', 'OEE', 'takt time', 'supplier management', 'supply chain', 'inventory turnover', 'safety stock', 'capex planning'],
  },
  {
    name: 'Hospitality',
    keywords: ['guest experience', 'front desk', 'concierge', 'Opera PMS', 'OTA management', 'revenue management', 'RevPAR', 'ADR', 'occupancy rate', 'banqueting', 'F&B operations', 'POS', 'menu engineering', 'food cost', 'HACCP', 'housekeeping', 'upselling', 'loyalty programme', 'TripAdvisor', 'Booking.com', 'event planning', 'catering', 'staff rostering', 'training SOPs', 'service recovery'],
  },
  {
    name: 'NGO / Non-profit',
    keywords: ['grant writing', 'fundraising', 'donor management', 'Salesforce NPSP', 'Raisers Edge', 'stakeholder engagement', 'programme management', 'theory of change', 'logframe', 'monitoring and evaluation', 'M&E', 'impact measurement', 'budget management', 'volunteer coordination', 'advocacy', 'community outreach', 'capacity building', 'SDG', 'CSR partnerships', 'board reporting', 'annual report', 'compliance reporting', 'FCRA', 'beneficiary management'],
  },
  {
    name: 'Government / Public Sector',
    keywords: ['policy analysis', 'policy drafting', 'stakeholder consultation', 'public administration', 'programme management', 'budget preparation', 'public procurement', 'tender management', 'RFP', 'RFI', 'compliance audit', 'legislative review', 'inter-agency coordination', 'citizen services', 'service delivery', 'grievance redressal', 'RTI', 'parliamentary briefing', 'cabinet note', 'ministerial correspondence', 'e-governance', 'Digital India', 'GeM', 'public-private partnership', 'PPP'],
  },
];

const TOC = [
  { id: 'intro', label: 'Why keyword match matters in 2026' },
  { id: 'how-many', label: 'How many keywords, and where to place them' },
  { id: 'industries', label: '12 industries with keyword lists' },
  { id: 'extract', label: 'How to extract keywords from a JD in 3 minutes' },
  { id: 'mistakes', label: 'Keyword mistakes that backfire' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'How to Pass ATS Resume Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics that clear any ATS.', read: 11 },
  { title: 'Complete ATS Guide 2026', slug: 'ats-guide', excerpt: 'How ATS parses, scores, and ranks resumes.', read: 13 },
  { title: 'How to Tailor a Resume Fast', slug: 'tailor-resume', excerpt: '20-minute JD match workflow.', read: 9 },
  { title: 'How to List Skills on a Resume', slug: 'resume-skills-list', excerpt: 'Hard, soft, languages, certifications, tools.', read: 11 },
  { title: '200+ Resume Action Verbs', slug: 'resume-action-verbs', excerpt: 'Strong verbs grouped by role type.', read: 9 },
];

export default function ResumeKeywordsByIndustryPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="ATS & Keywords"
      breadcrumbCurrent="Resume keywords by industry"
      title="Resume Keywords by Industry: 12 Industries Covered (2026)"
      subtitle="The exact keywords that ATS scoring engines reward in 12 industries, plus a 3-minute method to extract role-specific keywords from any job description."
      dateModified="2026-06-04"
      readingTime={14}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            Modern ATS platforms score resumes on keyword match against the job description before a human ever sees the file. A resume with 40 percent match often ranks below a weaker resume with 75 percent match. Keyword choice is not decoration. It is the first gate.
          </p>
        </div>
        <p>
          In 2026 almost every mid-size and large employer runs inbound resumes through an ATS or a keyword scoring layer built into LinkedIn Recruiter, Workday, Greenhouse, iCIMS, or SuccessFactors. The scoring model is not complicated: extract the hard skills, tools, certifications, and role-specific terms from the JD, then compute how many of those appear in the resume. Above a threshold the resume surfaces to a human recruiter. Below it, the resume might still be searchable but it rarely makes the shortlist.
        </p>
        <p className="mt-3">
          The fix is not to stuff keywords. It is to use the right vocabulary for your industry, in the right density, in the right places. This guide lists 20 to 30 high-signal keywords per industry across 12 of the most common ones, then shows you how to add the role-specific keywords that win the specific job you are applying to.
        </p>
      </section>

      <section id="how-many" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How many keywords, and where to place them</h2>
        <p className="mb-3">
          Target 60 to 80 percent match on the hard skills and tools named in the JD. Below 50 percent the ATS tends to drop you out of the recruiter queue. Above 85 percent you start to look like you copied the JD, which flags in some platforms as keyword-stuffing.
        </p>
        <p className="mb-3">
          Placement matters almost as much as count. Keywords in the Skills section get a lower weight than keywords in the Experience section, which get a lower weight than keywords in the job title or headline. The best resumes weave keywords through bullets in context: &quot;Migrated 40-service monolith to Kubernetes on AWS using Terraform and Helm&quot; beats a Skills-section dump of &quot;Kubernetes, AWS, Terraform, Helm.&quot;
        </p>
        <p>
          Mention each critical keyword 2 to 3 times across the resume. Once in Skills. Once in a bullet. Optionally once in the Summary. Beyond 3 mentions you hit diminishing returns and risk tripping stuffing filters.
        </p>
      </section>

      <section id="industries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">12 industries with keyword lists</h2>
        <div className="space-y-5">
          {INDUSTRIES.map((ind, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2">{i + 1}. {ind.name}</p>
              <p className="text-xs text-gray-500 mb-2">{ind.keywords.length} high-signal keywords</p>
              <p className="text-sm text-gray-700 leading-relaxed">{ind.keywords.join(', ')}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          These lists are the baseline for the industry. They are not a substitute for the specific keywords in the JD you are targeting. Add 6 to 10 role-specific keywords on top of the industry baseline using the 3-minute method below.
        </p>
      </section>

      <section id="extract" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to extract keywords from a JD in 3 minutes</h2>
        <p className="mb-3">The method that works every time, no paid tools required.</p>
        <ol className="list-decimal pl-5 space-y-3 text-gray-700">
          <li>
            <strong>Copy the JD into a plain text editor.</strong> Strip the header, benefits, and EEO boilerplate. You want the Responsibilities, Requirements, and Preferred Qualifications sections only.
          </li>
          <li>
            <strong>Highlight every noun that names a tool, certification, methodology, or domain.</strong> Ignore verbs for now. Python, AWS, SAP, HIPAA, Lean Six Sigma, SEO, IFRS. If a phrase appears 2 or more times, it is almost certainly a scored keyword.
          </li>
          <li>
            <strong>Separate must-haves from nice-to-haves.</strong> The Requirements section is must-have. The Preferred section is bonus. Match all must-haves first; add nice-to-haves only if you honestly have them.
          </li>
          <li>
            <strong>Cross-check against your baseline.</strong> Which of these keywords are already in your resume? Which are not but should be because you have the skill?
          </li>
          <li>
            <strong>Add missing keywords in context.</strong> Rewrite one or two bullets to include them naturally. Do not add a keyword you cannot defend in an interview.
          </li>
          <li>
            <strong>Recheck the match rate.</strong> Free tools like Jobscan, ResyMatch, or a simple word-count comparison get you close enough. Target 70 percent or higher.
          </li>
        </ol>
        <p className="mt-3 text-gray-700">
          3 minutes per JD. Do this for the 5 or 6 roles you are actively targeting and you will see reply rates climb.
        </p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Keyword mistakes that backfire</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>White-text keyword stuffing.</strong> Invisible words hidden behind white text still get parsed. Most ATS now flag this and route the resume to auto-reject.</li>
          <li><strong>Keyword list dumps with no context.</strong> A block of 60 skills at the bottom of the resume does not score as well as the same 20 skills used naturally in bullets.</li>
          <li><strong>Copying the JD verbatim.</strong> Some ATS run duplicate-text checks. More importantly, a human recruiter will see it and discount the rest of the resume.</li>
          <li><strong>Using synonyms without the canonical term.</strong> If the JD says &quot;Kubernetes&quot; and you write &quot;container orchestration platform,&quot; you will miss the keyword. Include both.</li>
          <li><strong>Acronyms only, no expansion.</strong> &quot;PMP&quot; alone might not match &quot;Project Management Professional.&quot; Include both forms the first time it appears.</li>
          <li><strong>Skills you cannot defend.</strong> A keyword that gets you past the ATS but collapses in the phone screen is worse than no keyword at all.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.jobscan.co/blog/ats-resume/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Jobscan on ATS-friendly resume keywords</a></li>
          <li><a href="https://www.onetonline.org/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">O*NET OnLine occupation and skill taxonomies</a></li>
          <li><a href="https://www.linkedin.com/business/talent/blog/talent-strategy/in-demand-skills-list" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn in-demand skills reports</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How many keywords should a resume have?', a: 'Target 60 to 80 percent match with the job description hard skills. In volume that is typically 25 to 40 keywords across the whole resume.' },
            { q: 'Should I keep a Skills section if keywords are in bullets?', a: 'Yes. The Skills section is a fallback for ATS platforms that index by section. Keep it, but weight your best keywords into Experience bullets too.' },
            { q: 'Do keywords need to be exact match?', a: 'For ATS keyword match, yes. "Google Analytics 4" and "GA4" might not resolve to the same keyword on every parser. Use both.' },
            { q: 'What about soft-skill keywords like leadership or communication?', a: 'Low weight on ATS scoring. They matter to human recruiters. Do not spend hard-skill real-estate on soft-skill lists; show them through bullets instead.' },
            { q: 'Is keyword stuffing always bad?', a: 'Yes. Modern ATS run density checks and penalise obvious stuffing. Natural placement always beats density.' },
            { q: 'How do I find keywords if the JD is short?', a: 'Pull the JDs from 3 or 4 similar roles at peer companies. Keywords that appear in all of them are the true industry-wide must-haves.' },
            { q: 'Does LinkedIn use the same keyword match?', a: 'Yes, Recruiter search runs on keyword match against your profile. Mirror your resume keywords in your About section, headline, and current role.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume with the right keywords, first time</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz suggests industry-specific keywords as you write and flags under-matched resumes before you apply.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
