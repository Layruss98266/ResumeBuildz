// Deepest tier of company content: cover letter templates, interview
// questions, red flags, salary benchmarks. Kept separate from the base and
// extended data files to limit individual file size and make edits tractable.
//
// All compensation numbers are public market estimates (Levels.fyi, Glassdoor,
// AmbitionBox, Indeed averages for 2024-2025). Use them as rough ranges only.

export interface InterviewQuestion {
  q: string;
  hint: string;
}

export interface SalaryRow {
  role: string;
  junior: string; // Entry / L3 / SDE-1 equivalent
  mid: string; // Mid / L4 / SDE-2
  senior: string; // Senior / L5 / SDE-3
}

export interface CompanyDeep {
  coverLetterTemplate: string[]; // 3 paragraphs
  interviewQuestions: InterviewQuestion[]; // 5-6 common questions with 1-line hints
  redFlags: string[]; // 4-5 auto-reject items
  salaryBenchmark: SalaryRow[]; // 3 roles
  referralStrategy: string; // 2-3 sentence paragraph
}

export const COMPANY_DEEP: Record<string, CompanyDeep> = {
  // ───────────── GLOBAL ─────────────
  google: {
    coverLetterTemplate: [
      'I am applying for the [Role] position on the [Team] team. After [N] years building [specific thing relevant to the team] at [Current Company], I am looking for the kind of planet-scale impact that only Google can offer — the chance to ship a product to billions of users and measure outcomes in percentage points of global web traffic.',
      'At [Current Company] I [one sentence that leads with a metric — e.g. "cut build times 42% by rewriting the CI pipeline in Go"]. That work taught me [one specific skill the role demands]. I also shipped [second metric-led outcome], and I believe both experiences map directly to the [specific team responsibility from the JD].',
      'I would love to bring that mindset to Google. I am specifically drawn to [name a recent Google launch, paper, or open-source project from the target team] because [one concrete reason]. I am available for a conversation at your convenience and can be reached at [email] or [phone].',
    ],
    interviewQuestions: [
      { q: 'Design YouTube\'s video recommendation system.', hint: 'Focus on data pipelines, feature engineering, and scale (1B+ daily users).' },
      { q: 'Given a stream of numbers, return the median at any point.', hint: 'Two heaps approach; O(log n) insertion, O(1) query.' },
      { q: 'Tell me about a time you disagreed with a senior engineer.', hint: 'STAR format, show you advocated for your position with data, accepted the decision, and moved forward.' },
      { q: 'Why Google, and why this team specifically?', hint: 'Name a recent launch or paper from the team; tie it to a skill of yours.' },
      { q: 'How would you measure the success of Google Search?', hint: 'Start with mission (organize world\'s information), then propose input/output/guardrail metrics.' },
    ],
    redFlags: [
      'Unquantified bullets. A resume full of "Responsible for..." and "Helped with..." gets downgraded in calibration.',
      'Listing 15+ programming languages. Signals shallow breadth over deep competence.',
      'Typos or formatting inconsistencies. Google\'s bar on polish is high; obvious errors are weighted heavily.',
      'No open-source, side projects, or public work for L3/L4 candidates. Google expects evidence of genuine curiosity.',
      'Hiding gap years. Google asks about them in the behavioral round; unexplained gaps raise trust flags.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '$165k-$210k (L3)', mid: '$240k-$340k (L4)', senior: '$380k-$520k (L5)' },
      { role: 'Product Manager', junior: '$175k-$225k (APM)', mid: '$260k-$360k (PM)', senior: '$400k-$560k (Senior PM)' },
      { role: 'Data Scientist', junior: '$160k-$205k (L3)', mid: '$230k-$320k (L4)', senior: '$360k-$490k (L5)' },
    ],
    referralStrategy:
      'Google referrals carry real weight — a referred candidate is ~3x more likely to make it past the resume screen than a cold applicant. Find a Googler in your target team on LinkedIn, send a short (60-word) message mentioning one specific thing they have shipped that you admire, and ask if you can send them your resume for internal referral. Never ask for an interview, only for the referral.',
  },

  amazon: {
    coverLetterTemplate: [
      'I am applying for [Role] at Amazon. Over the last [N] years at [Company], I have owned outcomes that map directly to Amazon\'s Leadership Principles, particularly Customer Obsession and Dive Deep — and I would love to bring that ownership mindset to [Team].',
      'The outcome I am proudest of is [one STAR-formatted story with numbers — e.g. "owning the end-to-end redesign of our checkout funnel, which lifted conversion 1.8pp and added $14M to annual run-rate"]. Getting there required [one specific Leadership Principle in action]. I made the call to [specific decision] after [specific data point], and I learned [one concrete lesson that applies to Amazon].',
      'Amazon is the obvious next step for me because [one specific reason — a product you use, a principle that matches your working style, a team you are excited about]. I am ready for the on-site, would love to start the conversation, and can be reached at [email].',
    ],
    interviewQuestions: [
      { q: 'Tell me about a time you had to make a decision with incomplete data. (Bias for Action)', hint: 'Pick a real story with ~60-70% confidence, commit to the decision, explain what you would do differently now.' },
      { q: 'Design the AWS S3 storage service.', hint: 'Consistency model, sharding, replication, eventual vs. strong consistency, read-your-writes guarantees.' },
      { q: 'Describe a time you disagreed with your manager. (Have Backbone)', hint: 'Disagreed → committed → moved on. Never "I was right, they were wrong."' },
      { q: 'Why Amazon and not another cloud provider?', hint: 'Name 2-3 specific AWS services you\'ve used, tie to the team you\'re applying to.' },
      { q: 'How would you reduce the cost of a service by 30%? (Frugality)', hint: 'Top-down: identify biggest cost drivers, propose 3-4 levers, pick the one with best ROI.' },
    ],
    redFlags: [
      'Using "we" in every bullet. Amazon explicitly screens for individual ownership; "we built X" raises the "passenger" flag.',
      'No STAR-format stories for at least 5 Leadership Principles. The Bar Raiser will ask and expect polished answers.',
      'Bullets without numerical outcomes. Amazon\'s written scorecard has a "quantified impact" field and unquantified work scores 0 there.',
      'Generic reasons for "Why Amazon." Recruiters have read thousands of these; specificity signals genuine interest.',
      'A resume longer than two pages for any role below Principal. Amazon expects concision.',
    ],
    salaryBenchmark: [
      { role: 'SDE (Software Engineer)', junior: '$150k-$190k (SDE I)', mid: '$210k-$310k (SDE II)', senior: '$330k-$490k (SDE III)' },
      { role: 'Product Manager (PM-T)', junior: '$165k-$215k (L5)', mid: '$245k-$345k (L6)', senior: '$380k-$540k (L7)' },
      { role: 'Applied Scientist', junior: '$160k-$205k (L4)', mid: '$225k-$310k (L5)', senior: '$350k-$490k (L6)' },
    ],
    referralStrategy:
      'Amazon referrals go through the internal Connections portal and give you a direct link to a recruiter. The best approach: find a current Amazonian in your target org (use LinkedIn with "Amazon" + team keyword), send a brief message referencing their team\'s recent work, and ask for a 15-minute call to learn more. If the conversation goes well, ask for the referral at the end.',
  },

  microsoft: {
    coverLetterTemplate: [
      'I am writing to express interest in the [Role] position on the [Team] team at Microsoft. I have followed Microsoft\'s transformation under Satya Nadella — the shift to a growth mindset, the investments in Azure and AI, the return to developer-first thinking with GitHub and VS Code — and I would love to contribute to the next chapter.',
      'At [Company] I [quantified bullet that shows collaboration + technical depth]. My work required [one or two skills the role calls for], and I learned to [one specific learning that matches Microsoft\'s growth-mindset framing]. I also [one bullet about mentoring or enabling others], which is why I am particularly drawn to Microsoft\'s culture of team uplift.',
      'I am excited about [specific Microsoft product or initiative — Copilot, Azure Arc, Fabric, M365 Copilot, etc.] and believe I can contribute to [specific team responsibility]. I am available for a conversation at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design a URL shortener like Bitly.', hint: 'Database choice (SQL vs KV), short-code generation strategy, read-heavy vs. write-heavy tradeoffs, custom aliases.' },
      { q: 'Tell me about a time you helped a teammate grow. (Growth Mindset)', hint: 'Show your mentorship style, concrete outcome for the teammate, what you learned.' },
      { q: 'How would you design Teams for 100k concurrent users on one call?', hint: 'Selective Forwarding Unit, simulcast, bandwidth adaptation, regional POPs.' },
      { q: 'Walk me through a project you failed at and what you learned.', hint: 'Microsoft explicitly rewards the "learn from failure" arc; show it.' },
      { q: 'Why Microsoft, and why this team?', hint: 'Name the team\'s recent ship list; tie to your experience.' },
    ],
    redFlags: [
      'Self-promotional tone without team context. Microsoft screens for collaborative language.',
      'Missing Azure certifications for cloud roles. Every Azure role filters on at least AZ-104 or AZ-204.',
      'Outdated tech (.NET Framework only, Silverlight, VB.NET) without recent modernization work. Signals stagnation.',
      'Overuse of "I led" without naming the team size or stakeholder breadth.',
      'No mention of accessibility, privacy, or responsible AI in the resume for product/engineering roles. Microsoft publicly prioritizes all three.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '$150k-$195k (L59)', mid: '$205k-$295k (L61-62)', senior: '$320k-$460k (L63-64)' },
      { role: 'Product Manager', junior: '$165k-$210k (L60)', mid: '$230k-$325k (L62)', senior: '$360k-$500k (L64)' },
      { role: 'Cloud Solution Architect', junior: '$145k-$185k', mid: '$200k-$285k', senior: '$310k-$440k' },
    ],
    referralStrategy:
      'Microsoft has a generous internal referral program. Employees get paid bonuses for successful referrals, so they are usually happy to refer good candidates. Use the "Alumni" filter on LinkedIn to find people who worked at your company and now work at Microsoft — they are far more likely to respond. Mention a specific Microsoft product you use and what you would improve about it.',
  },

  meta: {
    coverLetterTemplate: [
      'I am applying for [Role] at Meta. I am drawn to the pace Meta operates at — shipping real features to billions of users, running thousands of experiments in parallel, and measuring outcomes in single-digit basis points — and I believe my experience at [Company] has prepared me for that tempo.',
      'My proudest outcome: [STAR-formatted story with a user-impact number]. The work required [React/GraphQL/PyTorch/system design — something Meta\'s stack prioritizes], and I shipped the full flow in [timeframe] by [specific velocity technique — parallelization, rapid prototyping, aggressive scope cuts].',
      'I am specifically interested in [Team] because [a recent launch from that team]. I can bring [one specific skill] from day one and would love to contribute to [specific team goal]. Thank you for your consideration.',
    ],
    interviewQuestions: [
      { q: 'Design Instagram\'s news feed.', hint: 'Fan-out on write vs read, ranking model, cold start, personalization signals, cache hierarchy.' },
      { q: 'Find the longest palindromic substring in a string.', hint: 'Expand-around-center O(n²); mention Manacher\'s O(n) if senior.' },
      { q: 'Tell me about a time you moved fast and broke something.', hint: 'Meta rewards velocity; show you learned from it without being reckless.' },
      { q: 'Why Meta and not Google or TikTok?', hint: 'Name Meta-specific work (React, PyTorch, Reality Labs) you\'ve built on or admired.' },
      { q: 'How would you measure the success of a new Reels feature?', hint: 'Start with mission, pick a North Star, propose guardrail metrics, discuss experiment design.' },
    ],
    redFlags: [
      'No mention of scale. Meta thinks in billions; if your biggest bullet is "served 10k users," that\'s a signal you haven\'t operated at Meta\'s scale.',
      'Missing ship velocity. Meta rewards "shipped 14 features in 6 months" over "worked on 3 big projects."',
      'Experience heavy on maintenance, light on launches. Meta wants builders.',
      'No experimentation vocabulary. If you\'ve never said "lift," "holdout," "p-value," or "A/B test," the resume signals unfamiliarity with Meta\'s operating model.',
      'Walking a reader through every project. Meta recruiters skim; dense bullets win.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '$185k-$235k (E3)', mid: '$280k-$380k (E4)', senior: '$420k-$580k (E5)' },
      { role: 'Product Manager', junior: '$195k-$245k (IC3)', mid: '$290k-$395k (IC4)', senior: '$440k-$610k (IC5)' },
      { role: 'ML Engineer', junior: '$195k-$245k (E3)', mid: '$295k-$395k (E4)', senior: '$450k-$630k (E5)' },
    ],
    referralStrategy:
      'Meta referrals matter but the bar is still high — a referral gets your resume read, not an automatic interview. Find a current Meta employee in your target org (E4 or above works best — they have referral quota), send a specific, short message mentioning their recent work, and offer to buy them a virtual coffee. Mention the role URL explicitly so they can refer you directly.',
  },

  apple: {
    coverLetterTemplate: [
      'I am applying for [Role] on [Team]. I have spent the last [N] years building [specific thing] at [Company], and I want to bring that craft-first approach to Apple — a company that still treats the 1% details as what defines the other 99%.',
      'At [Company] I [quantified outcome that reflects care, polish, or craft]. Getting there meant [specific quality-obsessed decision you made]. I am particularly proud of [one subtle thing that only experts notice — a kerning fix, a launch time improvement, a memory footprint reduction].',
      'Apple\'s [specific product or platform] is something I use every day. I would love to contribute to [specific team]. I am available to discuss the role at your convenience and can be reached at [email].',
    ],
    interviewQuestions: [
      { q: 'Design Apple Pay\'s offline transaction flow.', hint: 'Secure enclave, tokenization, offline limits, reconciliation when back online.' },
      { q: 'Reverse a linked list in place, iterative and recursive.', hint: 'Both in 10 lines each; O(n) time, O(1) and O(n) space.' },
      { q: 'Tell me about a time you said no to a feature.', hint: 'Apple rewards taste; show you killed something for the right reason.' },
      { q: 'How would you improve [Apple product you use every day]?', hint: 'Name the product, identify one real pain, propose a minimal fix consistent with Apple design values.' },
      { q: 'Walk me through your favorite project down to the smallest detail.', hint: 'Apple rewards depth. Go narrow, not wide.' },
    ],
    redFlags: [
      'Typos, spacing issues, or alignment errors. Apple\'s public culture is craft — a sloppy resume is an instant trust hit.',
      'Name-dropping confidential projects from prior jobs. Apple takes NDAs seriously and assumes you will treat theirs the same way.',
      'Flashy template with gradients, graphics, or photos. Apple prefers minimalist type-focused resumes.',
      'Claiming "full-stack" without depth in either half. Apple hires specialists.',
      'Android-only mobile experience for an iOS role.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '$155k-$195k (ICT2)', mid: '$215k-$305k (ICT3)', senior: '$330k-$475k (ICT4)' },
      { role: 'Hardware Engineer', junior: '$150k-$190k', mid: '$210k-$295k', senior: '$320k-$460k' },
      { role: 'Product Designer', junior: '$170k-$215k', mid: '$235k-$325k', senior: '$355k-$490k' },
    ],
    referralStrategy:
      'Apple referrals are harder to cold-ask for because of the culture of discretion. Warm intros (former colleagues now at Apple) work best. Avoid LinkedIn messaging to strangers — Apple employees are famously cautious and many do not respond. Instead, attend Apple-adjacent conferences (WWDC viewing parties, Swift meetups) and meet people in person.',
  },

  deloitte: {
    coverLetterTemplate: [
      'I am applying for [Role] in Deloitte\'s [Service Line]. My background in [domain] at [Company] has given me the client-facing, analytical, and executive-communication skills that Big Four consulting demands, and I am ready for the next level of scale and complexity.',
      'At [Company] I led [quantified client or project outcome — $X saved, Y hours reduced, Z stakeholders aligned]. The engagement required [2-3 Deloitte-relevant skills]. I also [a leadership moment — mentored juniors, led a workstream, presented to the C-suite].',
      'I am particularly drawn to Deloitte because [one specific practice area or recent industry report from Deloitte that resonates]. I hold [relevant certifications — CA, CFA, CPA, PMP, etc.] and am ready for immediate travel and client-site work.',
    ],
    interviewQuestions: [
      { q: 'Walk me through a recent project you led for a client.', hint: 'STAR format: scope, outcome, stakeholders, dollar impact.' },
      { q: 'Market sizing: how many barbershops are in New York City?', hint: 'Top-down and bottom-up; show the structure, not the answer.' },
      { q: 'Tell me about a time you managed a difficult stakeholder.', hint: 'Clarify expectations, over-communicate, find common ground.' },
      { q: 'What is your consulting superpower?', hint: 'Pick one real strength; back it with a specific example.' },
      { q: 'Why Deloitte over McKinsey or BCG?', hint: 'Scale of engagements, breadth of service lines, specific practice you want to join.' },
    ],
    redFlags: [
      'GPA below the implicit floor (roughly 3.3/4.0 or second class upper in Indian grading) with no explanation.',
      'No client-impact quantification. "Worked on projects" without dollars or hours saved is a weak signal for consulting.',
      'Missing certifications (CPA, CA, CFA, PMP). For most Deloitte roles, these are filterable keywords.',
      'Flashy creative resume layouts. Deloitte prefers clean, structured, conservative formats.',
      'Listing generic teamwork bullets without naming the stakeholders or the outcome.',
    ],
    salaryBenchmark: [
      { role: 'Consultant', junior: '$85k-$110k (Analyst)', mid: '$115k-$155k (Consultant)', senior: '$165k-$215k (Senior)' },
      { role: 'Audit / Tax', junior: '$65k-$85k', mid: '$95k-$135k', senior: '$145k-$195k (Manager)' },
      { role: 'Technology Consultant', junior: '$90k-$120k', mid: '$125k-$170k', senior: '$180k-$235k' },
    ],
    referralStrategy:
      'Deloitte\'s internal referral program is strong across all service lines. Find a current Deloitte consultant or senior at your target office on LinkedIn, mention a specific Deloitte publication or recent engagement you found interesting, and ask for a 15-minute coffee chat. Most consultants are happy to help since referrals come with bonus compensation.',
  },

  mckinsey: {
    coverLetterTemplate: [
      'I am applying to McKinsey\'s [Business Analyst / Associate] program. My track record at [School/Company] has been built around three things McKinsey explicitly screens for — distinctive achievement, leadership beyond work, and analytical ability — and I want to apply those strengths at the world\'s most selective problem-solving firm.',
      'My most distinctive achievement to date: [one specific bullet with a number — graduated top 3% of class, won national championship, grew a student club from 12 to 280 members, led a team of N, published in a peer-reviewed journal]. I also [second distinctive achievement] and [third]. Each required me to [specific analytical or leadership skill].',
      'I am drawn to McKinsey because [one specific reason — a recent McKinsey Insights article, a practice area, a partner whose work I admire]. I am ready for the Problem Solving Game and PEI rounds, and I look forward to discussing how I can contribute.',
    ],
    interviewQuestions: [
      { q: 'Case: a retail bank\'s deposits have dropped 12% YoY. Diagnose the cause.', hint: 'Structure: macro (interest rates, economy), competitive (new digital entrants), internal (product, pricing, marketing).' },
      { q: 'Personal Experience Interview: tell me about a time you led a team through conflict.', hint: 'Real story, specific tension, your action, quantified outcome, reflection.' },
      { q: 'Estimate the market for electric vehicle charging stations in India.', hint: 'Top-down: EV adoption rate × station-per-EV ratio × geographic clusters.' },
      { q: 'Why McKinsey and not BCG or Bain?', hint: 'Research specific: practice areas, training, McKinsey Insights, alumni network.' },
      { q: 'Walk me through your resume in 90 seconds.', hint: 'Lead with distinctive achievement, arc to why consulting, end at why McKinsey.' },
    ],
    redFlags: [
      'Two-page resume for a non-MBA candidate. McKinsey explicitly requires one page.',
      'GPA omitted when below 3.7 (undergraduate). Leaving it off is worse than showing 3.5 with context.',
      'Responsibilities-without-outcomes bullets. "Managed a team of 5" without impact gets rejected.',
      'No extracurricular leadership. Pure academic + work history signals narrowness.',
      'Listing every club you ever joined. McKinsey wants 2-3 clubs you genuinely led.',
    ],
    salaryBenchmark: [
      { role: 'Business Analyst (undergraduate)', junior: '$112k base + $17k bonus', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Associate (MBA/advanced degree)', junior: '$190k base + $40k bonus', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Engagement Manager (post-Associate)', junior: 'Not applicable', mid: '$240k-$300k + bonus', senior: '$330k+ (Partner track)' },
    ],
    referralStrategy:
      'McKinsey referrals matter most for non-target school candidates. Find alumni from your school now at McKinsey (use the LinkedIn alumni filter), send a concise (80-word) message referencing one specific thing they have published or posted, and ask for a 20-minute coffee chat. Do NOT ask directly for a referral on first contact — let the conversation earn it.',
  },

  'goldman-sachs': {
    coverLetterTemplate: [
      'I am applying to Goldman Sachs for the [Role] position within [Division]. My academic record, finance coursework, and internship at [Company] have prepared me for the pace and rigor of the GS franchise, and I am excited to bring my analytical skills and work ethic to the firm.',
      'My most relevant experience: [one quantified bullet — "built a 3-statement DCF for a $500M LBO case competition, placed 2nd of 40 teams"]. I also hold [CFA Level I / Series 7 / FRM] and have completed [finance coursework with grades]. I am comfortable with [specific technical skill the role requires — LBO modeling, Bloomberg, Python for finance, etc.].',
      'I am particularly drawn to Goldman because of [specific GS deal, IPO, or research report]. I would welcome the opportunity to interview and can be reached at [email] or [phone].',
    ],
    interviewQuestions: [
      { q: 'Walk me through a DCF valuation.', hint: '5-6 line structure: project FCF, calculate WACC, discount, sum, add TV, sensitivity.' },
      { q: 'Why investment banking and not consulting or PE?', hint: 'Specific reasons: deal execution, financial modeling depth, fast feedback loops.' },
      { q: 'Pitch me a stock.', hint: 'Thesis in 30 seconds: company, catalyst, price target, risks. Be ready to defend.' },
      { q: 'A company earns $10M. It buys back 10% of its stock. What happens to EPS?', hint: 'EPS goes up; think carefully about interest expense on debt if buyback was debt-financed.' },
      { q: 'Tell me about a time you worked under pressure.', hint: 'Real deadline, your action, outcome, lesson. Banking interviewers calibrate on this.' },
    ],
    redFlags: [
      'GPA omitted. For banking roles, GPA is mandatory regardless of value.',
      'No finance coursework or certifications. Signals lack of genuine interest.',
      'Creative resume layouts. Banking prefers conservative, single-column, serif or clean sans-serif.',
      'No modeling skills. "Proficient in Excel" is not enough — specify DCF, LBO, comps, precedent transactions.',
      'A second page. Goldman expects one page for all campus and early-lateral candidates.',
    ],
    salaryBenchmark: [
      { role: 'Investment Banking Analyst', junior: '$115k base + $50k-$110k bonus', mid: '$150k base + $120k-$250k bonus (Associate)', senior: '$250k base + $400k-$700k (VP)' },
      { role: 'Sales & Trading', junior: '$115k base + $60k-$130k bonus', mid: '$160k base + $150k-$300k bonus', senior: '$300k base + $500k-$900k (MD track)' },
      { role: 'Asset Management', junior: '$110k base + $40k-$80k bonus', mid: '$160k base + $100k-$220k', senior: '$275k base + $350k-$650k' },
    ],
    referralStrategy:
      'Goldman hires heavily through campus recruiting and alumni networks. If you are at a target school, attend every GS info session and follow up with recruiters the same day. For non-target candidates, the most reliable path is a warm intro from a current analyst or associate — cold LinkedIn messages rarely work given the volume bankers receive.',
  },

  'jp-morgan': {
    coverLetterTemplate: [
      'I am applying for the [Role] at JP Morgan Chase within [Division]. My background at [Company] has given me the mix of [technical skills + business judgment] that JPM\'s scale demands, and I am excited to bring that to [Team].',
      'My most relevant work: [one quantified bullet — e.g. "built a Java-Spring microservice for real-time KYC validation serving 120k transactions per day, reducing false positives 34%"]. I have strong skills in [Java / Python / finance domain / regulatory reporting] and am comfortable operating in a regulated environment.',
      'I am drawn to JPM because [specific reason — the scale of the tech org, the regulatory depth, a specific product or initiative]. I look forward to discussing how I can contribute and am available at [email].',
    ],
    interviewQuestions: [
      { q: 'Design a high-throughput trade reconciliation system.', hint: 'Event-driven architecture, Kafka, idempotent consumers, reconciliation windows, alerting on breaks.' },
      { q: 'Explain how OAuth 2.0 differs from OpenID Connect.', hint: 'OAuth = authorization; OIDC = authentication layer on top of OAuth.' },
      { q: 'Why financial services tech over a pure product company?', hint: 'Scale, regulatory complexity, depth of domain, long-term impact on a critical industry.' },
      { q: 'Tell me about a production outage you caused and what you did.', hint: 'Be honest, show ownership, emphasize post-mortem and prevention.' },
      { q: 'How would you secure a banking API?', hint: 'Auth (OAuth + mTLS), rate limiting, WAF, PII encryption at rest and in transit, audit logging, threat modeling.' },
    ],
    redFlags: [
      'Missing Java for tech roles. JPM is one of the largest Java shops in the world; Java absence is a direct ATS filter.',
      'For business roles: no finance certifications (CFA, FRM, Series 7, MBA). These are filterable keywords.',
      'No regulatory vocabulary (KYC, AML, Basel III, Dodd-Frank, MiFID II) for compliance-adjacent roles.',
      'Generic "cloud experience" without naming specific AWS/Azure services and deployment patterns.',
      'Flashy design. JPM prefers traditional, conservative formatting.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '$110k-$140k (Analyst)', mid: '$145k-$200k (Associate)', senior: '$215k-$310k (VP)' },
      { role: 'Investment Banking Analyst', junior: '$115k base + $50k-$100k bonus', mid: '$150k-$175k + bonus (Associate)', senior: '$225k-$300k + bonus (VP)' },
      { role: 'Risk / Compliance', junior: '$90k-$120k', mid: '$130k-$180k', senior: '$190k-$270k' },
    ],
    referralStrategy:
      'JPM\'s tech org has active engineering communities on LinkedIn and GitHub. Join JPM open-source repositories, engage with their public tech blog, and use that as a conversation starter when reaching out to engineers. Non-tech roles: alumni network and campus recruiting remain the strongest path.',
  },

  accenture: {
    coverLetterTemplate: [
      'I am applying to Accenture for the [Role] position within [Practice]. My background at [Company] has given me deep expertise in [specific platform — SAP / Salesforce / ServiceNow / AWS / Workday], and I am ready to apply that expertise to Accenture\'s Fortune 500 client engagements.',
      'My most relevant experience: [quantified platform implementation — e.g. "led SAP S/4HANA finance implementation for a Fortune 500 retailer across 14 countries, 28-person team, completed 6 weeks ahead of schedule"]. I hold [specific certifications — AWS, Azure, Salesforce, SAP, ServiceNow, Workday].',
      'I am drawn to Accenture because [specific reason — the breadth of industry verticals, a recent Accenture strategy & consulting acquisition, a published case study]. I am ready for immediate client-site work and am available at [email].',
    ],
    interviewQuestions: [
      { q: 'Walk me through a platform implementation you led end-to-end.', hint: 'Scope, stakeholders, change management, go-live, post-launch support. Numbers at every stage.' },
      { q: 'How do you handle scope creep with a difficult client?', hint: 'Clarify, document, escalate to steering committee if needed, never absorb without approval.' },
      { q: 'Describe a time a project was going to miss its deadline. What did you do?', hint: 'Root cause, risk mitigation, stakeholder communication, replanning.' },
      { q: 'Why Accenture over a Big Four consulting firm?', hint: 'Platform depth, global delivery, tech partnerships (SAP, Salesforce, ServiceNow, AWS).' },
      { q: 'Tell me about your strongest client presentation.', hint: 'Audience, stakes, structure, outcome. Accenture values executive communication.' },
    ],
    redFlags: [
      'Missing vendor certifications (AWS, Azure, Salesforce, SAP, ServiceNow, Workday). These are the #1 ATS filter at Accenture.',
      'Generic "consulting experience" without naming specific platforms and modules.',
      'No engagement scale numbers. Accenture works with the world\'s biggest clients; vague claims don\'t land.',
      'Creative resume layouts. Accenture\'s Workday ATS aggressively filters on formatting failures.',
      'No mention of change management, stakeholder alignment, or delivery — these are the vocabulary of the role.',
    ],
    salaryBenchmark: [
      { role: 'Technology Consultant', junior: '$80k-$105k (Analyst)', mid: '$110k-$155k (Consultant)', senior: '$165k-$220k (Manager)' },
      { role: 'Strategy Consultant', junior: '$95k-$125k', mid: '$130k-$180k', senior: '$195k-$275k' },
      { role: 'SAP / Salesforce Specialist', junior: '$85k-$115k', mid: '$125k-$175k', senior: '$185k-$250k' },
    ],
    referralStrategy:
      'Accenture has a well-structured internal referral program with bonuses for successful hires. Find a consultant in your target practice via LinkedIn, mention a specific certification you share or a platform you both work on, and ask for a 15-minute conversation. Most consultants are happy to refer candidates with matching certifications because the screening work is already done.',
  },

  // ───────────── INDIA ─────────────
  tcs: {
    coverLetterTemplate: [
      'I am writing to apply for the [Role] position at TCS. I have completed my [B.Tech / BE / M.Tech] from [College] with [CGPA] and have strong foundations in [Java / Python / Angular / React] along with a TCS NQT score of [score if applicable].',
      'During my [degree / previous role], I worked on [one specific project — e.g. "a full-stack inventory management system using Spring Boot and Angular deployed to 15 college club users"]. I have also completed [relevant certification — NPTEL, Coursera, Udemy] and am familiar with [specific TCS-relevant technology].',
      'I am excited about TCS\'s [specific practice or service line — BFSI, Digital, Life Sciences, iON] and am ready to relocate to any TCS delivery center. I am available for the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Write a program to reverse a string without using built-in functions.', hint: 'Two-pointer approach; watch for immutability of strings in Java.' },
      { q: 'Explain the difference between abstract class and interface in Java.', hint: 'Concrete methods, state, multiple inheritance, when to use each.' },
      { q: 'What is a deadlock and how do you prevent it?', hint: 'Four conditions (mutex, hold-wait, no-preempt, circular wait); prevent by breaking any one.' },
      { q: 'Tell me about your final-year project.', hint: 'Technology choices, your specific contribution, challenges, what you would do differently.' },
      { q: 'Are you willing to work on any technology TCS assigns you?', hint: 'Yes — be genuine. TCS hires for learning agility more than specialization for freshers.' },
    ],
    redFlags: [
      'Missing 10th / 12th / graduation percentages. TCS HR treats these as mandatory filter fields.',
      'Active backlogs without "cleared" status. TCS rejects candidates with unresolved backlogs.',
      'Creative two-column resume. TCS\'s internal ATS often fails on non-standard layouts.',
      'No project experience. Even one working project with a GitHub link beats no projects.',
      'NQT score absent for fresher applications. The score determines whether you route to Ninja or Digital track.',
    ],
    salaryBenchmark: [
      { role: 'Assistant System Engineer (Ninja track)', junior: '₹3.4 LPA CTC', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Assistant System Engineer (Digital track)', junior: '₹7.1 LPA CTC', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Mid-level Developer (lateral)', junior: '₹5-8 LPA', mid: '₹10-16 LPA', senior: '₹20-32 LPA (Manager)' },
    ],
    referralStrategy:
      'TCS has a formal Employee Referral Program (ERP) which gives existing employees a clear process and payout for successful referrals. Find a TCS employee on LinkedIn (preferably one in your target practice), send a concise message with your resume, NQT score, and target role. Many employees are willing to refer capable candidates because payouts are meaningful and the process is low-effort.',
  },

  infosys: {
    coverLetterTemplate: [
      'I am writing to apply for the [Role] position at Infosys. I have completed [my degree] from [College] with [CGPA] and have earned the Infosys Certified [Foundation / Associate / Professional] certification via InfyTQ.',
      'During my studies I built [specific project — e.g. "a React + Spring Boot e-learning platform with user authentication and course progress tracking"]. I participated in HackWithInfy [year] and [rank if applicable]. I am strong in [specific technology stack matching the role].',
      'I am excited about Infosys Digital [or specific practice] and am looking forward to the Mysore training program. I am available for the hiring process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Write a program to check if a number is prime.', hint: 'Trial division up to sqrt(n); explain why sqrt(n) is sufficient.' },
      { q: 'Explain REST API design principles.', hint: 'Statelessness, resource URIs, HTTP verbs, status codes, HATEOAS, versioning.' },
      { q: 'Difference between SQL and NoSQL.', hint: 'Schema, consistency, horizontal scaling, use cases. Mention specific examples (Postgres, MongoDB).' },
      { q: 'Tell me about your InfyTQ journey.', hint: 'Certification level, what you learned, specific projects built through the program.' },
      { q: 'How would you explain polymorphism to a non-technical person?', hint: 'Analogy first (same word means different things), then code example.' },
    ],
    redFlags: [
      'Missing InfyTQ certification level. Infosys fast-tracks certified candidates; omitting it is a lost opportunity.',
      '10th/12th/graduation percentages absent. Infosys HR filters on academic consistency.',
      'No full-stack experience. Infosys prefers candidates comfortable on both ends of the stack.',
      'Unexplained gaps in education. Infosys Mysore training requires academic continuity.',
      'Generic hobbies section in place of real projects.',
    ],
    salaryBenchmark: [
      { role: 'Systems Engineer (freshers)', junior: '₹3.6 LPA (System Engineer)', mid: '₹6.5 LPA (Digital Specialist Engineer)', senior: '₹9.5 LPA (Power Programmer)' },
      { role: 'Senior Systems Engineer (lateral)', junior: '₹5-9 LPA', mid: '₹12-20 LPA', senior: '₹24-38 LPA (Technology Analyst)' },
      { role: 'Consultant', junior: '₹8-12 LPA', mid: '₹18-28 LPA', senior: '₹35-55 LPA (Principal)' },
    ],
    referralStrategy:
      'Infosys employees can refer candidates through the internal Accolade portal. Search LinkedIn for Infoscions (that is the internal term) in your target practice, send a brief message referencing your InfyTQ certification and target role, and ask if they would refer you. Mention a specific Infosys project or publication you admire to stand out from generic requests.',
  },

  wipro: {
    coverLetterTemplate: [
      'I am writing to apply for the [Role] position at Wipro. I have completed [my degree] from [College] with [CGPA] and have cleared the Wipro [Elite NTH / WILP] assessment with [score if applicable].',
      'My final-year project was [specific project — tech stack, your role, outcome]. I have also completed [relevant certifications — AWS, Azure, SAP, Salesforce]. I am proficient in [specific technologies matching the role].',
      'I am excited about joining Wipro\'s [specific practice] and am ready to undergo the training at the Wipro development center. I look forward to the opportunity to contribute.',
    ],
    interviewQuestions: [
      { q: 'Write a program to find duplicates in an array.', hint: 'HashSet approach in O(n); Floyd\'s cycle detection for constant space.' },
      { q: 'Explain the difference between process and thread.', hint: 'Memory sharing, overhead, creation cost, communication mechanisms.' },
      { q: 'How does a TCP three-way handshake work?', hint: 'SYN, SYN-ACK, ACK; mention state transitions and why it exists.' },
      { q: 'Walk me through your final year project.', hint: 'Tech stack, your specific contribution, challenges, what you learned.' },
      { q: 'Where do you see yourself in 5 years?', hint: 'Be honest about wanting to grow at Wipro; mention specific learning goals.' },
    ],
    redFlags: [
      'Missing Wipro NTH score for fresher applications.',
      'Any academic gap without explanation. Wipro is strict on consistency.',
      'Active backlogs. Unresolved backlogs block most Wipro offers.',
      'No specific practice mentioned in application. Wipro recruiters prefer candidates who know which area they want.',
      'Creative layouts. Wipro ATS fails on complex formatting.',
    ],
    salaryBenchmark: [
      { role: 'Project Engineer (Elite NTH)', junior: '₹3.5 LPA', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Project Engineer (WILP track)', junior: '₹6.5 LPA', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Senior Developer (lateral)', junior: '₹5-8 LPA', mid: '₹11-18 LPA', senior: '₹22-35 LPA' },
    ],
    referralStrategy:
      'Wipro has an Employee Referral Scheme with payouts for successful hires. Use LinkedIn to find Wipro employees in your target practice, share your resume and NTH score (if available), and ask for a referral. Wipro employees are generally receptive to referrals that match clear practice needs.',
  },

  flipkart: {
    coverLetterTemplate: [
      'I am applying for [Role] at Flipkart. My background in [specific domain] at [Company] has prepared me to operate at India consumer scale, and I am excited to bring that to Flipkart\'s mission of enabling commerce for a billion Indians.',
      'My proudest outcome: [one quantified bullet that shows India-scale thinking — e.g. "built a cart service handling 80k orders/min during Big Billion Days, P99 latency under 280ms"]. I have strong [Java / system design / growth / category management / supply chain] skills and have consistently [delivery theme].',
      'I am specifically drawn to [Flipkart team or initiative] because [a specific recent ship from that team]. I would love to contribute and am available to start the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design Flipkart\'s inventory management system across 5 warehouses.', hint: 'Consistency (eventual vs strong), partitioning by region/SKU, oversell prevention, reconciliation.' },
      { q: 'Given N tasks with dependencies, find the order to execute them.', hint: 'Topological sort using DFS or Kahn\'s algorithm.' },
      { q: 'How would you improve Flipkart\'s Plus membership program?', hint: 'Identify user segments, propose 3-4 levers, pick one with clear impact metric.' },
      { q: 'Tell me about a time you dealt with high production load.', hint: 'Root cause, immediate mitigation, long-term fix, what you learned.' },
      { q: 'Why Flipkart over Amazon India?', hint: 'India-scale problem solving, faster decision cycles, deeper local context.' },
    ],
    redFlags: [
      'Weak DSA profile for engineering roles. Flipkart tests hard on data structures and algorithms.',
      'Missing scale context. "Built a REST API" without user numbers or TPS is weak signal.',
      'Generic "product management" claims for PM roles without GMV or conversion numbers.',
      'No system design experience for senior engineering candidates.',
      'Walls of text. Flipkart recruiters scan fast; dense bullets win.',
    ],
    salaryBenchmark: [
      { role: 'SDE (Software Engineer)', junior: '₹18-26 LPA (SDE-1)', mid: '₹32-50 LPA (SDE-2)', senior: '₹58-95 LPA (SDE-3)' },
      { role: 'Product Manager', junior: '₹24-32 LPA (APM)', mid: '₹40-60 LPA (PM)', senior: '₹75-120 LPA (Senior PM)' },
      { role: 'Category Manager', junior: '₹14-22 LPA', mid: '₹28-45 LPA', senior: '₹55-85 LPA' },
    ],
    referralStrategy:
      'Flipkart uses an internal referral system called Hiring Hub. Employees refer candidates directly through the portal and get visibility on progress. Reach out to Flipkart engineers or PMs on LinkedIn, mention specific products you use and what you\'d improve, and ask for a referral. Flipkart culture rewards initiative; direct asks work better than polite small talk.',
  },

  zomato: {
    coverLetterTemplate: [
      'I am applying for [Role] at Zomato. The pace and ownership culture at Zomato is what I want in my next role, and my experience at [Company] has built the instincts I need to operate in that environment.',
      'My proudest outcome: [one quantified bullet that shows ownership — e.g. "owned the Tier-2 city expansion, launching 14 cities in 4 months, growing catalog 3.4x and driving ₹22 Cr monthly GMV at 2.1x contribution margin"]. I have strong fluency in [unit economics / system design / growth / supply ops].',
      'I am specifically drawn to [Zomato/Blinkit/Instamart team] because [recent launch or initiative]. I can start contributing from day one and am available at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design the Zomato order tracking system.', hint: 'Event-driven pipeline, WebSocket or polling, state machine for order status, driver location updates.' },
      { q: 'LeetCode medium: find the longest substring without repeating characters.', hint: 'Sliding window with hash map; O(n) time, O(k) space.' },
      { q: 'Walk me through the unit economics of a single food delivery order.', hint: 'AOV, commission, delivery fee, driver cost, packaging, discount, contribution margin.' },
      { q: 'Tell me about a time you made a decision that went against the team.', hint: 'Show you had ownership, explain your reasoning, name the outcome honestly.' },
      { q: 'Why Zomato over Swiggy?', hint: 'Specific: ownership culture, founder-led energy, Blinkit expansion, IPO-era discipline.' },
    ],
    redFlags: [
      'Contribution language ("I contributed to," "I helped with"). Zomato screens for ownership.',
      'Weak unit economics fluency for product/ops roles. AOV, CM, CAC, LTV are baseline vocabulary.',
      'No scale numbers. Zomato operates at 15M+ MAU; small-scale claims underperform.',
      'Generic engineering resumes. Zomato engineering loops probe distributed systems heavily.',
      'Overly corporate tone. Zomato culture is fast and informal; stiff resumes feel out of place.',
    ],
    salaryBenchmark: [
      { role: 'SDE', junior: '₹18-28 LPA (SDE-1)', mid: '₹32-52 LPA (SDE-2)', senior: '₹60-95 LPA (SDE-3)' },
      { role: 'Product Manager', junior: '₹22-32 LPA', mid: '₹38-60 LPA', senior: '₹70-120 LPA' },
      { role: 'City / Supply Ops Manager', junior: '₹8-14 LPA', mid: '₹18-30 LPA', senior: '₹38-65 LPA' },
    ],
    referralStrategy:
      'Zomato\'s culture rewards direct, informal outreach. Finding a Zomato employee on LinkedIn and sending a short, specific message about why you want to work there gets far better response rates than polished recruiter-style notes. Mention a product you use daily and one concrete thing you\'d improve.',
  },

  swiggy: {
    coverLetterTemplate: [
      'I am applying for [Role] at Swiggy. The breadth of problems Swiggy is solving — food delivery, Instamart, Dineout, Genie — is exactly the kind of multi-product scale I want next, and my experience at [Company] has prepared me for it.',
      'My most relevant work: [one quantified bullet — e.g. "rebuilt the order-allocation engine from monolith to event-driven Kafka microservices, P99 latency 1.8s → 340ms, supporting 42k orders/min peak"]. I have strong skills in [Go / Java / distributed systems / supply ops / growth].',
      'I am specifically drawn to [Swiggy team] because [specific reason]. I am ready to start the interview process and can be reached at [email].',
    ],
    interviewQuestions: [
      { q: 'Design Swiggy\'s surge pricing system.', hint: 'Demand vs supply signals, rate-limit per area, fairness, merchant visibility, user transparency.' },
      { q: 'Given a list of restaurants and delivery time, find the shortest time to deliver 3 specific orders.', hint: 'Graph problem; Dijkstra or BFS depending on constraints.' },
      { q: 'How would you measure the success of Instamart vs food delivery?', hint: 'Different unit economics; propose separate North Stars and guardrails.' },
      { q: 'Tell me about a production outage you managed.', hint: 'Structured: detection, triage, mitigation, root cause, follow-up.' },
      { q: 'Why Swiggy and not Zomato?', hint: 'Name specific Swiggy ventures (Instamart, Dineout, Genie); tie to your skillset.' },
    ],
    redFlags: [
      'Missing distributed systems experience for senior engineering. Swiggy runs multi-region Kafka infrastructure.',
      'Vague metrics in growth/ops roles. Swiggy wants CAC, retention, contribution margin numbers.',
      'No India-scale context. "Handled 1k orders/day" loses to "handled peak 42k orders/min."',
      'Over-promise on velocity without examples. Swiggy moves fast but demands rigor.',
      'Generic startup resumes without Swiggy-specific detail.',
    ],
    salaryBenchmark: [
      { role: 'SDE', junior: '₹18-28 LPA (SDE-1)', mid: '₹32-52 LPA (SDE-2)', senior: '₹58-95 LPA (SDE-3)' },
      { role: 'Product Manager', junior: '₹24-34 LPA', mid: '₹40-62 LPA', senior: '₹75-120 LPA' },
      { role: 'Supply / Instamart Ops', junior: '₹10-16 LPA', mid: '₹22-38 LPA', senior: '₹45-75 LPA' },
    ],
    referralStrategy:
      'Swiggy has a formal internal referral program. The best approach is to find engineers, PMs, or supply leads in your target pod (ride-hailing, food delivery, Instamart, Genie) on LinkedIn, share your resume and a specific reason you want to join that pod. Swiggy culture rewards directness over politeness.',
  },

  zoho: {
    coverLetterTemplate: [
      'I am applying for [Role] at Zoho. My approach to engineering aligns with Zoho\'s bootstrapped, substance-over-pedigree culture, and I believe I can contribute meaningfully to [product or team].',
      'My most relevant project: [one specific bullet — e.g. "built a custom full-text search engine in C++ over 3 months using inverted indexes and BM25 ranking, 4x faster than Lucene on our test corpus"]. I have strong depth in [C++ / Java / systems programming]. My work is public on GitHub at [link].',
      'I am drawn to Zoho because of the engineering culture, the long-tenure employees, and the commitment to self-hosted infrastructure. I am available for the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Implement a hash table from scratch.', hint: 'Separate chaining or open addressing; walk through collision handling and resize.' },
      { q: 'How does TCP congestion control work?', hint: 'Slow start, congestion avoidance, fast retransmit, fast recovery. Name the algorithms (Reno, Cubic, BBR).' },
      { q: 'Tell me about a project where you went deep into a problem.', hint: 'Zoho rewards depth; show genuine curiosity and the technical stretch.' },
      { q: 'Why Zoho over a Bangalore product company?', hint: 'Engineering-first, long tenure, profitability, control over tech stack, depth over breadth.' },
      { q: 'What programming language would you pick for a new project and why?', hint: 'Real tradeoff reasoning: team familiarity, ecosystem, performance, developer experience.' },
    ],
    redFlags: [
      'Over-polished resumes with marketing language. Zoho rewards substance.',
      'No GitHub or side projects. Zoho explicitly looks for self-initiated work.',
      'Pedigree-first resumes. Zoho cares about depth, not school rank.',
      'Breadth without depth. Listing 15 languages scores worse than naming 3 with real mastery.',
      'Generic career-objective section. Zoho recruiters skip it.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer (freshers)', junior: '₹5-7 LPA (standard)', mid: '₹9-15 LPA (2-3 yr)', senior: '₹18-32 LPA (5+ yr)' },
      { role: 'Zoho Schools Graduate', junior: '₹4-6 LPA (trainee)', mid: 'Not applicable', senior: 'Not applicable' },
      { role: 'Product Specialist', junior: '₹6-10 LPA', mid: '₹12-22 LPA', senior: '₹26-45 LPA' },
    ],
    referralStrategy:
      'Zoho hires primarily through direct application and Zoho Schools. Referrals exist but are less structured than at other Indian tech companies. The best path is to submit through the careers portal with a strong project portfolio on GitHub, then follow up with a Zoho engineer on LinkedIn with a specific technical question about their work.',
  },

  byju: {
    coverLetterTemplate: [
      'I am applying for [Role] at BYJU\'S. My background in [sales / content / tech] at [Company] has built the skills the role demands, and I am ready to apply them at India\'s largest edtech company.',
      'My most relevant outcome: [one quantified bullet — for sales: "Closed ₹1.42 Cr in revenue at 34% lead-to-close conversion over 6 months"; for tech: "Built a React Native course progress module serving 2M students"; for content: "Designed a physics curriculum module with 85% student completion rate"].',
      'I am excited about [specific BYJU\'S product or initiative — Aakash, Exam Prep, Toppr, WhiteHat Jr, BYJU\'S Future School]. I am available for the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Role-play: sell me this pen (for sales roles).', hint: 'Discover needs, tie features to benefits, handle objections, close.' },
      { q: 'How would you measure success of a BYJU\'S course module?', hint: 'Engagement, completion, quiz scores, retention, parent satisfaction.' },
      { q: 'Tell me about your worst month in sales and what you learned.', hint: 'Resilience is tested; show you iterated and recovered.' },
      { q: 'Walk me through a product feature you\'d build for BYJU\'S.', hint: 'User pain, solution, metric, rollout plan. Showing product thinking wins.' },
      { q: 'Why BYJU\'S over a pure product company?', hint: 'Mission alignment with Indian education, scale of impact, rapid iteration.' },
    ],
    redFlags: [
      'For sales: no revenue numbers. Qualitative sales claims fail at BYJU\'S.',
      'Missing target attainment percentages. Sales interviews drill on exact numbers.',
      'For tech: no mobile experience. BYJU\'S is mobile-dominant.',
      'For content: missing subject expertise or teaching context.',
      'Generic corporate resume. BYJU\'S sales culture rewards aggressive individual performers.',
    ],
    salaryBenchmark: [
      { role: 'Inside Sales Executive', junior: '₹4-6 LPA base + ₹2-5 LPA incentives', mid: '₹7-11 LPA + ₹4-8 LPA incentives', senior: '₹12-20 LPA + team incentives' },
      { role: 'Software Engineer', junior: '₹8-14 LPA', mid: '₹18-30 LPA', senior: '₹35-55 LPA' },
      { role: 'Content Developer', junior: '₹5-9 LPA', mid: '₹12-20 LPA', senior: '₹24-40 LPA' },
    ],
    referralStrategy:
      'BYJU\'S high-volume hiring means referrals are less formal than at product companies. The most effective path is the LinkedIn inside sales community — many BYJU\'S employees post openly about openings. For tech roles, the engineering team runs targeted hackathons and meetups; attending these creates direct access.',
  },

  phonepe: {
    coverLetterTemplate: [
      'I am applying for [Role] at PhonePe. Running a fintech at 500M+ user scale is exactly the kind of problem I want to work on, and my background in [specific domain] at [Company] has prepared me for it.',
      'My proudest outcome: [one quantified bullet with TPS, latency, or availability — e.g. "built a retry service for failed UPI transactions, cut failure rate from 2.1% to 0.6% on 200M monthly transactions, adding ₹180 Cr annual GMV"]. I have strong [Java / Go / distributed systems / payments domain] experience.',
      'I am specifically drawn to [PhonePe line of business — UPI, Insurance, Lending, RazorpayX]. I am available for interview at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design UPI\'s payment settlement pipeline.', hint: 'Transaction idempotency, double-spend prevention, NPCI integration, reconciliation, circuit breakers.' },
      { q: 'Implement a rate limiter for 1M RPS.', hint: 'Token bucket or sliding window; distributed state via Redis; shard by user ID.' },
      { q: 'How do you debug a production latency spike?', hint: 'Metrics first (which service), logs second (which requests), traces third (where in the stack).' },
      { q: 'Tell me about a time you improved system reliability.', hint: 'Before/after SLO numbers, the specific change, how you validated the improvement.' },
      { q: 'Why fintech over a pure product company?', hint: 'Regulatory complexity, scale, societal impact, depth of domain.' },
    ],
    redFlags: [
      'No distributed systems experience for senior roles. PhonePe operates at TPS scales few companies match.',
      'Missing reliability vocabulary (SLO, SLA, error budget, on-call, incident response).',
      'Vague payments claims. "Worked on payments" loses to specific systems (settlement, retry, reconciliation).',
      'No regulatory context (RBI, NPCI, PCI DSS). Fintech domain knowledge is a differentiator.',
      'Weak system design for anything above SDE-1.',
    ],
    salaryBenchmark: [
      { role: 'SDE', junior: '₹22-32 LPA (SDE-1)', mid: '₹38-58 LPA (SDE-2)', senior: '₹65-100 LPA (SDE-3)' },
      { role: 'Product Manager', junior: '₹28-40 LPA', mid: '₹45-70 LPA', senior: '₹80-130 LPA' },
      { role: 'Site Reliability Engineer', junior: '₹20-30 LPA', mid: '₹38-58 LPA', senior: '₹65-100 LPA' },
    ],
    referralStrategy:
      'PhonePe has a strong internal referral culture with formal payouts. Find engineers in your target team (UPI, Insurance, Lending, Merchant) on LinkedIn, send a message referencing a specific PhonePe product or initiative, and ask for a referral. PhonePe engineers frequently write tech blog posts on their infrastructure — referencing one creates an easy conversation starter.',
  },

  razorpay: {
    coverLetterTemplate: [
      'I am applying for [Role] at Razorpay. Building developer-focused fintech infrastructure is what I want to work on, and my experience at [Company] has given me the depth in [Go / Java / API design / payments] that Razorpay engineering demands.',
      'My most relevant work: [one quantified bullet — e.g. "designed and shipped Razorpay-style payment links API for internal use, 12k merchants onboarded in 4 months, ₹92 Cr monthly recurring GMV"]. I am comfortable with [API design / distributed systems / fintech domain].',
      'I am drawn to [Razorpay product — PGs, RazorpayX, Capital, Payroll]. I am available to start the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design the Razorpay payment gateway.', hint: 'Authorization, capture, refund, webhook delivery, idempotency, merchant-facing API contract.' },
      { q: 'Given a list of transactions, detect duplicate charges.', hint: 'Hash-based dedup with TTL; handle edge cases (same amount, different times).' },
      { q: 'How do you handle webhook retries and ordering?', hint: 'Exponential backoff, dead letter queue, sequence numbers, idempotent consumers.' },
      { q: 'Tell me about an API you designed.', hint: 'Versioning, backwards compatibility, error responses, documentation, usage metrics.' },
      { q: 'Why Razorpay over PhonePe or Paytm?', hint: 'Developer-first, API design culture, broader product surface (RazorpayX, Capital).' },
    ],
    redFlags: [
      'Weak API design experience. Razorpay is fundamentally an API company.',
      'No Go experience for backend engineering roles. Razorpay is a Go-first shop.',
      'Missing fintech domain (KYC, PCI DSS, settlement, reconciliation).',
      'Generic product claims. Razorpay PM roles require merchant-impact numbers.',
      'Poor API documentation habits. The interviewers will check.',
    ],
    salaryBenchmark: [
      { role: 'SDE', junior: '₹22-32 LPA (SDE-1)', mid: '₹38-60 LPA (SDE-2)', senior: '₹65-100 LPA (SDE-3)' },
      { role: 'Product Manager', junior: '₹28-40 LPA', mid: '₹45-72 LPA', senior: '₹82-130 LPA' },
      { role: 'DevOps / SRE', junior: '₹20-30 LPA', mid: '₹38-58 LPA', senior: '₹65-95 LPA' },
    ],
    referralStrategy:
      'Razorpay\'s engineering culture is developer-community-forward. Engage with Razorpay engineers on Twitter/X and LinkedIn — many are active and respond to technical questions. Contributing to Razorpay\'s public SDK repos or writing a blog post about a Razorpay integration is one of the most effective ways to get noticed by the hiring team.',
  },

  freshworks: {
    coverLetterTemplate: [
      'I am applying for [Role] at Freshworks. My experience at [Company] has given me strong SaaS fundamentals and global market awareness, and I am excited to contribute to Freshworks\' continued growth as a public SaaS company.',
      'My proudest outcome: [one quantified bullet relevant to the role — for engineering: "shipped a Rails-based ticketing workflow serving 8k customers"; for sales: "$4.2M ARR over 8 quarters, 118% average quota attainment"]. I have strong [Ruby on Rails / Java / React / SaaS sales / customer success] skills.',
      'I am drawn to Freshworks because [specific reason — the product, the global customer base, the NASDAQ-listed discipline]. I am available for the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design a multi-tenant SaaS architecture for Freshdesk.', hint: 'Tenancy isolation, shared vs. dedicated DB, tenant-aware routing, fair-use enforcement.' },
      { q: 'For sales: walk me through your biggest deal.', hint: 'Complexity, stakeholders, competitive situation, close strategy, final ACV.' },
      { q: 'How do you handle churn in a SaaS product?', hint: 'Cohort analysis, leading indicators, proactive CS outreach, product-led retention.' },
      { q: 'Tell me about a time you disagreed with a product decision.', hint: 'Frame respectfully, show data, accept the final call.' },
      { q: 'Why Freshworks over Zoho or Indian product companies?', hint: 'Global customer base, public company discipline, NASDAQ listing, product breadth.' },
    ],
    redFlags: [
      'Missing Ruby on Rails experience for engineering roles (unless applying to Freshworks\' newer React/Node teams).',
      'For sales: no SaaS metric fluency (ARR, NRR, CAC, payback, ARPU).',
      'Generic customer success language. Freshworks CS roles are data-driven.',
      'No global market context for senior sales. Freshworks sells in 60+ countries.',
      'Startup-style resumes without the polish expected of a public company.',
    ],
    salaryBenchmark: [
      { role: 'Software Engineer', junior: '₹10-16 LPA', mid: '₹20-32 LPA', senior: '₹40-70 LPA (Staff)' },
      { role: 'Inside Sales / Account Executive', junior: '₹8-12 LPA + commissions', mid: '₹15-25 LPA + commissions', senior: '₹30-55 LPA + commissions' },
      { role: 'Customer Success Manager', junior: '₹7-12 LPA', mid: '₹15-25 LPA', senior: '₹30-50 LPA' },
    ],
    referralStrategy:
      'Freshworks has a formal employee referral program with clear payouts. Find Freshworks employees on LinkedIn — the Chennai engineering community is particularly active — and send a targeted message referencing a specific Freshworks product you admire. For sales roles, mention the specific geo and vertical you want to work in.',
  },

  ola: {
    coverLetterTemplate: [
      'I am applying for [Role] at Ola. The breadth of what Ola is building — ride-hailing, Ola Electric, Krutrim AI — is exactly the kind of multi-domain problem space I want to work on next.',
      'My most relevant outcome: [one quantified bullet appropriate to the role — for Krutrim: "fine-tuned a 7B LLM on Indic corpus, 82% accuracy on Hindi-English code-switched benchmarks"; for Ola Electric: "led BMS firmware for a 3kWh battery pack, 6% range improvement"; for ride-hailing: "rebuilt driver allocation, reducing unassigned rides 42% in Bangalore"].',
      'I am specifically drawn to [Ola business unit] because [specific reason]. I am available for the interview process at your convenience.',
    ],
    interviewQuestions: [
      { q: 'Design Ola\'s real-time driver matching system.', hint: 'Geohashing, spatial indexing, matching algorithm, SLA on allocation time.' },
      { q: 'For Krutrim: explain how transformer attention works.', hint: 'Query-key-value, softmax, parallelism, multi-head attention, residual connections.' },
      { q: 'Tell me about a production bug you fixed under deadline pressure.', hint: 'Root cause, triage, rollback, fix, post-mortem.' },
      { q: 'Why Ola over Swiggy or Uber India?', hint: 'Multi-product ambition (Ola Electric, Krutrim), India-first DNA, ownership culture.' },
      { q: 'How would you measure the success of Ola Electric?', hint: 'Sales volume, charging network density, customer satisfaction, RoCE on manufacturing, brand consideration.' },
    ],
    redFlags: [
      'Generic "mobility" claims. Ola has three distinct businesses; specify which.',
      'For Krutrim: missing transformer or LLM experience. Generic ML is not enough.',
      'For Ola Electric: missing EV-specific vocabulary (BMS, powertrain, motor control, thermal management).',
      'For ride-hailing: no two-sided marketplace fluency.',
      'Resume formatting without India-scale context.',
    ],
    salaryBenchmark: [
      { role: 'SDE (ride-hailing)', junior: '₹18-28 LPA', mid: '₹32-52 LPA', senior: '₹58-95 LPA' },
      { role: 'Krutrim AI Engineer', junior: '₹25-40 LPA', mid: '₹45-80 LPA', senior: '₹95-160 LPA (research)' },
      { role: 'Ola Electric Hardware Engineer', junior: '₹12-20 LPA', mid: '₹25-40 LPA', senior: '₹50-85 LPA' },
    ],
    referralStrategy:
      'Ola has multiple hiring pipelines across its business units. For Krutrim, engage with the team on LinkedIn or at AI research meetups — the team is small and active. For Ola Electric, find hardware engineers through EV-specific networking events. For ride-hailing, the standard LinkedIn + referral path works well.',
  },
};

export function getCompanyDeep(slug: string): CompanyDeep | undefined {
  return COMPANY_DEEP[slug];
}
