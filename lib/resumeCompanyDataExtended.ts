// Extended content for each company page — interview process, pitfalls,
// sample bullet, tailoring steps, and FAQs. Keyed by slug so the primary
// resumeCompanyData.ts stays lean and the extended content can be rendered
// as optional rich sections on each company page.

export interface CompanyExtended {
  interviewProcess: string; // 2-4 sentence paragraph
  commonPitfalls: string[]; // 3-4 items
  sampleBullet: string; // exemplar resume bullet tailored to the company
  howToTailor: string[]; // 3-4 concrete steps
  faqs: Array<{ q: string; a: string }>; // 3-4 FAQs
}

export const COMPANY_EXTENDED: Record<string, CompanyExtended> = {
  // ───────────── GLOBAL ─────────────
  google: {
    interviewProcess:
      'Google\'s typical engineering loop is 1 recruiter screen, 1 technical phone screen (45 min, 1-2 coding problems), then an on-site with 4-5 rounds: 2-3 coding, 1 system design (for L5+), and 1 "Googleyness & leadership" behavioral. Hiring committees (never the interviewer) make the decision from written feedback, so every interviewer writes a 1-2 page review and your resume sits at the top of the packet the committee reads.',
    commonPitfalls: [
      'Claiming "improved performance" without a percentage or before/after number. Google calibrates on numbers; vague claims get downgraded in calibration.',
      'Listing 20 programming languages. Google prefers depth signal over breadth — pick 3-4 you can defend.',
      'Adding a "Career Objective" section. Google recruiters skip these; the real estate is better used on a one-line summary or more bullets.',
      'Resume tables, text boxes, or two-column layouts. Google\'s Workday ATS often parses these incorrectly and your skills get dropped.',
    ],
    sampleBullet:
      'Led migration of ads ranking service from monolith to microservices architecture on GKE, reducing P99 latency from 340ms to 120ms and saving an estimated $2.1M/year in infrastructure costs.',
    howToTailor: [
      'Move the most quantified bullets to the top of each job — Google recruiters rarely read past the first 3 bullets per role.',
      'Echo the target team\'s stack in your skills section (Google Cloud, BigQuery, Borg/Kubernetes, TensorFlow, Go).',
      'If applying to a launch (L5/L6) role, add a 1-line "Leadership" hint in your summary: scope owned, team size, breadth of partners.',
      'Never write "Google" in your summary unless you have already worked there. Recruiters flag overconfidence as a signal.',
    ],
    faqs: [
      {
        q: 'Does Google care about which university I went to?',
        a: 'Less than people think. Google publicly states it considers 300+ universities "target" schools and hires aggressively from online courses, bootcamps, and self-taught engineers with strong signal. What matters is evidence of the work: GitHub, open source, internships, published papers, or measurable impact.',
      },
      {
        q: 'Should my resume be one page or two?',
        a: 'One page if you have under 10 years of experience. Two is acceptable at L6+. Never three. Google recruiters explicitly deprioritize long resumes during screening because the hiring committee will not read them cover to cover.',
      },
      {
        q: 'How important is GPA on a Google resume?',
        a: 'Matters for new grads (under 2 years out of school) at L3/L4 levels. After that, drop it entirely. Google does not filter on GPA for experienced hires and listing a 3.2 on a senior resume signals lack of confidence in your work history.',
      },
    ],
  },

  amazon: {
    interviewProcess:
      'Amazon runs 5-6 rounds structured around its 16 Leadership Principles. Each interviewer is assigned 2-3 specific principles and asks behavioral questions targeting those. A "Bar Raiser" (a trained senior from another org) joins every loop and has veto power. Your resume is used to prep questions, so every bullet that maps cleanly to a principle becomes a question — which means you control the interview.',
    commonPitfalls: [
      'Using "we" instead of "I." Amazon explicitly screens for individual ownership; "we" signals that you are a passenger, not a driver.',
      'Listing responsibilities without results. Amazon\'s Bar Raiser explicitly rejects "I managed X" bullets with no outcome.',
      'Forgetting the S in STAR (Situation). Short bullets without context confuse behavioral interviewers, who cannot map them to a principle.',
      'Resume claims you cannot defend in a 10-minute STAR walkthrough. Bar Raisers will drill.',
    ],
    sampleBullet:
      'Owned the seller onboarding funnel end-to-end: redesigned flow based on friction analysis of 2,400 abandoned sign-ups, cutting time-to-first-listing from 48h to 3h and increasing activated sellers by 34% quarter-over-quarter.',
    howToTailor: [
      'Map each bullet to a specific Leadership Principle in your notes (not on the resume). Bullets that map to "Ownership" and "Dive Deep" perform best in screening.',
      'Put numbers in the first half of the bullet, not buried at the end. Amazon recruiters scan for numbers.',
      'Use action verbs Amazon loves: "Owned," "Drove," "Shipped," "Launched," "Delivered," "Reduced," "Scaled."',
      'For AWS roles, list the specific AWS services you have shipped to production, not generic "cloud experience."',
    ],
    faqs: [
      {
        q: 'Do I need all 16 Leadership Principles on my resume?',
        a: 'No. Pick 4-6 you can demonstrate with strong STAR bullets — typically Customer Obsession, Ownership, Bias for Action, Dive Deep, and Deliver Results. Trying to hit all 16 dilutes the signal.',
      },
      {
        q: 'Does Amazon use an ATS?',
        a: 'Yes, Amazon uses a combination of their internal tools and third-party parsers. They are especially strict on parseable formatting — single-column, standard fonts, no graphics, PDF preferred.',
      },
      {
        q: 'Should I mention AWS certifications?',
        a: 'Yes, for technical roles. AWS Solutions Architect Professional and AWS DevOps Engineer Professional are direct ATS filters for senior SDE and TPM roles. List them at the top.',
      },
    ],
  },

  microsoft: {
    interviewProcess:
      'Microsoft runs 4-5 rounds depending on role: 1 recruiter screen, 1-2 technical (coding + system design), 1 behavioral, and 1 "As Appropriate" round with the hiring manager or skip-level. The cultural bar is growth mindset — interviewers explicitly score for learning agility, collaboration, and customer impact. The resume seeds the behavioral questions, so lead with learning and teamwork.',
    commonPitfalls: [
      'Over-claiming individual heroics. Microsoft explicitly screens for collaboration; "I single-handedly built X" often backfires.',
      'Leaving out the customer. Microsoft\'s interview rubric has "customer focus" as a dimension — if your bullets don\'t mention users or customers, you lose points.',
      'Listing deprecated technologies. Silverlight, WebForms, older .NET Framework without .NET Core/Modern experience signals stagnation.',
      'Skipping Azure certifications. They are direct filters on every cloud-related role.',
    ],
    sampleBullet:
      'Partnered with 3 product teams to ship a shared identity library across Microsoft 365 apps, reducing duplicate auth code by 18,000 lines and cutting sign-in latency 40% for 220M daily users.',
    howToTailor: [
      'Use collaborative language: "Partnered," "Co-led," "Aligned," "Unblocked." Microsoft interviewers scan for it.',
      'List Azure certifications prominently (AZ-104, AZ-204, AZ-305, AZ-400). Microsoft\'s Workday filters on these.',
      'Mention any work with Microsoft products (Teams, Office, GitHub, Azure). Internal product awareness is a plus signal.',
      'Emphasize mentorship or onboarding new hires in your bullets. Growth mindset = teaching others.',
    ],
    faqs: [
      {
        q: 'Does Microsoft hire self-taught engineers?',
        a: 'Yes. Microsoft\'s public hiring philosophy explicitly favors learning agility over credentials. The interview will still be rigorous, but there is no degree filter for most roles.',
      },
      {
        q: 'How does Microsoft compare to Amazon culturally?',
        a: 'Microsoft is noticeably more collaborative and less intense. Amazon rewards ownership and speed; Microsoft rewards team uplift and long-term thinking. Tailor your resume accordingly — "we" language is fine at Microsoft.',
      },
      {
        q: 'Are Microsoft interviews mostly coding?',
        a: 'For SDE roles, expect 2 coding rounds, 1 system design round (for senior), and 1 behavioral. Microsoft emphasizes system design earlier than Google or Meta.',
      },
    ],
  },

  meta: {
    interviewProcess:
      'Meta runs 5-6 rounds for engineering: 2 coding (45 min each, medium-hard problems), 1 system design (for mid-senior), 1 "Jedi" behavioral, and 1 hiring manager round. Meta calibrates hard on shipping velocity and impact at scale. Your resume determines which team you get routed to after the loop — team matching happens AFTER the interviews, so strong resume framing improves team placement.',
    commonPitfalls: [
      'Listing React experience without specifying which version or Concurrent mode. Meta is React\'s maintainer and will ask.',
      'Failing to mention scale. Meta operates at billion-user scale; bullets about 10k users underperform unless the problem was architecturally interesting.',
      'Using the word "we" extensively. Meta screens for individual velocity.',
      'Listing "full-stack" without depth in either half. Meta prefers specialists who also touch the adjacent layer.',
    ],
    sampleBullet:
      'Shipped Instagram Reels autoplay A/B test across 2 rollout waves to 86M users, lifting watch time 11.3% (p<0.001) and driving +2.4pp increase in weekly active users — feature is now default on Android.',
    howToTailor: [
      'Lead with user impact at scale — millions MAU, TPS, latency at P99.',
      'Name specific Meta stacks: React, GraphQL, PyTorch, PHP/Hack, PyTorch Lightning.',
      'Show shipping velocity: "Shipped 14 features in 6 months" outperforms responsibilities lists.',
      'Use experimentation vocabulary: A/B test, lift, significance, holdout, interaction effect.',
    ],
    faqs: [
      {
        q: 'Is Meta still hiring after "Year of Efficiency"?',
        a: 'Yes, but the bar is higher. Meta has continued hiring throughout 2024-2026 in AI, Reality Labs, and Instagram/WhatsApp product, but each hire must clearly justify ROI. Resumes that show measurable business impact win.',
      },
      {
        q: 'Does Meta require a CS degree?',
        a: 'No. Meta is one of the most degree-agnostic large tech companies and hires heavily from bootcamps and self-taught pipelines, especially for product engineering.',
      },
      {
        q: 'How strict is Meta on the "fast ship" culture claim?',
        a: 'Very. During behavioral interviews, you will be asked about times you moved fast, things you shipped in <2 weeks, and times you shipped imperfect features. Your resume should already have 2-3 velocity bullets ready.',
      },
    ],
  },

  apple: {
    interviewProcess:
      'Apple runs team-by-team loops with no single standardized process. Typical loops are 4-6 rounds combining technical, design, and behavioral. Apple is famously secretive, so much of the interview is about whether you can talk about craft and quality without leaking past projects. The resume has to sell your skills without naming projects that are still under NDA.',
    commonPitfalls: [
      'Typos. A single typo on an Apple resume signals lack of craft and is often a fast reject — Apple recruiters have stated this publicly.',
      'Over-decorative templates. Apple culture rewards understatement; flashy templates feel off-brand.',
      'Listing Android-only experience for iOS roles. Apple hires specialists.',
      'Name-dropping confidential projects from prior employers. Apple will notice and consider it a red flag.',
    ],
    sampleBullet:
      'Reduced cold-launch time of a flagship iOS app from 2.8s to 0.9s by refactoring dependency graph, lazy-loading 14 frameworks, and profiling on Instruments — top-reviewed reason for 0.4-star App Store rating improvement.',
    howToTailor: [
      'Edit the resume to perfection. Read it aloud. Print it and check alignment. Apple hiring managers will notice.',
      'Lead with Swift, SwiftUI, UIKit, or the specific Apple framework the role needs.',
      'Mention any accessibility, privacy, or sustainability work — Apple publicly prioritizes all three.',
      'Keep the summary to 2 lines maximum. Apple rewards concision.',
    ],
    faqs: [
      {
        q: 'Does Apple have an ATS?',
        a: 'Yes, Apple uses a combination of internal tooling and third-party parsers. Single-column PDF with standard fonts parses best. Avoid graphics, tables, and headers/footers.',
      },
      {
        q: 'How does Apple interview differ from Google or Meta?',
        a: 'Apple loops are more team-specific and vary more than Google/Meta. The system design questions tend to be more product-oriented (how would you build this feature) vs. infrastructure-oriented.',
      },
      {
        q: 'Should I mention my favorite Apple products in the resume?',
        a: 'No — save that for the cover letter or the interview. The resume should be pure evidence of skill.',
      },
    ],
  },

  deloitte: {
    interviewProcess:
      'Deloitte\'s typical consulting loop has 2-3 rounds: a first-round case interview, a second-round case + behavioral, and a final-round partner interview. For audit/tax/advisory, the process is shorter — usually a 30-minute behavioral + technical on accounting/compliance basics. The resume drives the case prompts you get, so any quantified business outcome you list will likely become a case question.',
    commonPitfalls: [
      'Listing GPA below 3.5 (or second class in Indian grading). Deloitte has an implicit GPA floor for consulting roles and listing below it hurts more than omitting.',
      'Generic "teamwork" bullets without client impact. Deloitte screens explicitly for client value.',
      'Too many bullets per role (more than 5). Partners skim; density hurts.',
      'Missing certifications (CPA, CA, CFA, PMP, ITIL). These are direct ATS filters.',
    ],
    sampleBullet:
      'Led a 6-week operations diagnostic for a $400M retail client, identifying $12.5M in annual savings across 3 business units and presenting findings to the CFO and board.',
    howToTailor: [
      'Use consulting vocabulary: diagnostic, engagement, stakeholder, deliverable, readout, synthesis.',
      'Quantify client impact in dollars, hours saved, or risk reduced — never internal metrics only.',
      'Match the service line keywords (audit, tax, advisory, consulting, risk) to the role you are applying for.',
      'List your certifications (CPA, CA, CFA, PMP, ITIL) at the top of the resume, not buried.',
    ],
    faqs: [
      {
        q: 'Is Deloitte resume different for India vs. US?',
        a: 'Yes. India Deloitte resumes should include 10th, 12th, graduation percentages, and CA/CPA status prominently. US resumes should lead with GPA (if strong), university, and major certifications.',
      },
      {
        q: 'Does Deloitte hire from tier-2 colleges in India?',
        a: 'Yes, especially for audit and tax. The consulting and strategy arms lean heavily toward IIM/ISB and tier-1 engineering schools.',
      },
      {
        q: 'How long should a Deloitte resume be?',
        a: 'One page for <5 years experience. Two pages max for senior hires. Deloitte partners explicitly dock for multi-page junior resumes.',
      },
    ],
  },

  mckinsey: {
    interviewProcess:
      'McKinsey\'s interview is famously structured: first round is typically 2 case interviews (25-30 min each) plus a Personal Experience Interview (PEI). Second round is 2-3 case + PEI interviews, often with partners. The case interviews test structured problem solving under time pressure; the PEI tests leadership, distinctive impact, and drive. Your resume directly feeds the PEI questions, so every bullet needs to have a story behind it you can tell in 2-3 minutes.',
    commonPitfalls: [
      'A two-page resume as an early-career candidate. McKinsey explicitly rejects non-experienced hires with multi-page resumes.',
      'Bullets without quantified outcomes. McKinsey\'s screening rubric explicitly rewards "distinctive achievement" — a % or $ attached to every bullet.',
      'Missing extracurricular leadership. Pure academic or work bullets don\'t demonstrate drive.',
      'No evidence of distinctive standing (top 5%, valedictorian, scholarship, championship, published work). McKinsey hires for outliers.',
    ],
    sampleBullet:
      'As founding member and VP of Operations, grew my university\'s 12-person entrepreneurship club into a 280-member chapter with a $25K annual budget, running 18 events and placing 4 student startups into TechStars and Y Combinator.',
    howToTailor: [
      'One page only. Period. No exceptions for early-career candidates.',
      'Use three clear sections: Education, Experience, Leadership & Distinctions. Do not dilute with "Skills" blocks.',
      'Lead every bullet with an action verb and end with a number.',
      'Show at least 2 instances of "distinctive achievement" (top %, award, published work, championship).',
    ],
    faqs: [
      {
        q: 'Does McKinsey have an ATS?',
        a: 'McKinsey uses a combination of internal tools and human screening for consulting roles. The first pass is always human, not ATS. Formatting still matters, but the content bar is far higher than the parser bar.',
      },
      {
        q: 'Do I need an MBA to join McKinsey?',
        a: 'No. McKinsey recruits aggressively at the undergraduate level (Business Analyst), from PhDs (Associate), and from advanced professional degrees (law, medicine, engineering PhD). The MBA path via Associate is just the most common.',
      },
      {
        q: 'How important is GPA?',
        a: 'Extremely important for early-career. McKinsey\'s implicit floor is around 3.7/4.0 (or first class with distinction in Indian grading) for Business Analyst roles. List it prominently.',
      },
    ],
  },

  'goldman-sachs': {
    interviewProcess:
      'Goldman runs super day interviews for front-office IBD, S&T, and AM: typically 6-8 back-to-back 30-minute interviews in a single day, combining technical finance questions, behavioral, and 1-2 brain teasers. The resume is read by all 6-8 interviewers, so consistency and polish matter enormously. Any unquantified claim will be drilled.',
    commonPitfalls: [
      'Missing GPA. Goldman explicitly filters on GPA for campus hires; leaving it off is worse than showing a 3.4.',
      'Unfamiliar finance vocabulary. "Analyzed financial statements" loses to "Built 3-statement DCF model for a $500M LBO target."',
      'Two-page resume. Goldman explicitly requires one page for all campus and early-lateral hires.',
      'No evidence of finance interest. Stock pitch competitions, investment club leadership, trading simulations, or CFA progress are all positive signals.',
    ],
    sampleBullet:
      'Built a 3-statement DCF and LBO model for a $1.2B consumer retail LBO case competition, projecting 22% IRR and 2.4x MOIC — placed 2nd of 40 teams at the CMU Tepper finance competition.',
    howToTailor: [
      'Use the exact 3-section Goldman-approved format: Education, Experience, Leadership & Interests.',
      'List finance certifications prominently: CFA Level I/II/III, Series 7, Series 63, FRM.',
      'Mention specific financial modeling skills: DCF, LBO, comps, precedent transactions, 3-statement.',
      'Conservative formatting only: single column, serif or clean sans-serif, no color, no graphics.',
    ],
    faqs: [
      {
        q: 'Does Goldman hire from non-target schools?',
        a: 'Yes, but the bar is significantly higher. Non-target candidates usually need a 3.8+ GPA, finance club leadership, and an internship at a feeder bank or boutique.',
      },
      {
        q: 'How important is the CFA for Goldman?',
        a: 'CFA Level I passed is a strong positive signal for S&T, AM, and research roles. Level II+ is mandatory for most senior research roles.',
      },
      {
        q: 'Do I need prior IBD internships to break in?',
        a: 'For full-time IBD analyst roles, yes — the conversion path is almost always via summer internship. For S&T and AM, related experience (trading club, research) can substitute.',
      },
    ],
  },

  'jp-morgan': {
    interviewProcess:
      'JP Morgan\'s interview process varies by division. For IBD: 2 rounds with super day format, heavy on technical finance. For technology: 3-4 rounds with HackerRank assessment + technical interviews + behavioral. JP Morgan\'s tech org is the largest in finance (50,000+ engineers) and screens on Java, Python, and SQL primarily.',
    commonPitfalls: [
      'For tech roles, not mentioning Java. JP Morgan is the largest Java shop in finance and Java is often the #1 ATS filter.',
      'For business roles, missing regulatory vocabulary (KYC, AML, Basel III, Dodd-Frank, MiFID II).',
      'Using flashy startup-style resumes for a bank that still prefers conservative formatting.',
      'Listing experience without naming the specific JPM-adjacent products/platforms (Athena, LOBS, COS, etc. if applicable).',
    ],
    sampleBullet:
      'Built a Java/Spring Boot microservice for real-time KYC validation serving 120k transactions/day across the retail bank, reducing false positives by 34% and saving the compliance team an estimated 400 FTE hours/month.',
    howToTailor: [
      'Lead with Java and Spring Boot for tech roles; lead with CFA/MBA and modeling for business roles.',
      'Quantify in transaction volume, AUM, risk reduction, or compliance savings.',
      'Mention any regulatory or compliance exposure — KYC, AML, PCI DSS, SOC 2, Basel III, Dodd-Frank.',
      'Keep formatting conservative — single column, serif or sans-serif, no graphics.',
    ],
    faqs: [
      {
        q: 'Is JP Morgan tech a good place for new engineers?',
        a: 'Yes, especially for Java and Python developers. JP Morgan runs one of the largest junior engineer training programs in finance and has a clear path from analyst to VP over 6-8 years.',
      },
      {
        q: 'Does JP Morgan hire tier-2 India engineering graduates?',
        a: 'Yes, through campus recruitment and the Force for Good program. The hiring bar is solid on core Java, DSA, and SQL.',
      },
      {
        q: 'How does JPM differ from Goldman for tech roles?',
        a: 'JPM has 10x more engineers and a broader set of tech roles. Goldman\'s tech org is smaller, more elite, and more focused on trading infrastructure. JPM is better for most engineers; Goldman is better for quant-adjacent specialists.',
      },
    ],
  },

  accenture: {
    interviewProcess:
      'Accenture\'s typical loop is 2-3 rounds: a cognitive and behavioral assessment (video or in-person), a technical round (platform-specific for consultants), and a managing director interview. For India campus hires, the process adds aptitude + coding + HR. Accenture volume-hires, so the first pass is heavily automated.',
    commonPitfalls: [
      'Missing certifications. Accenture is certifications-first on hiring — Salesforce, SAP, ServiceNow, AWS, Azure, Workday certifications are direct ATS filters.',
      'Generic "consulting" claims without platform specificity. Accenture hires for platform expertise.',
      'Overselling leadership without quantifying scope. Accenture engagements are big; recruiters expect multi-million project sizes.',
      'Complex formatting. Accenture\'s Workday is aggressive on parsing failures.',
    ],
    sampleBullet:
      'Led SAP S/4HANA finance module implementation for a Fortune 500 retailer across 14 countries, managing a 28-person delivery team and completing the project 6 weeks ahead of the 11-month schedule and $1.8M under budget.',
    howToTailor: [
      'Certifications at the top — AWS, Azure, GCP, SAP, Salesforce, Workday, ServiceNow.',
      'Mention specific platform versions (SAP S/4HANA 2022, Salesforce Health Cloud, ServiceNow Washington).',
      'Quantify engagement size in dollars, team size, duration, and users impacted.',
      'Keep formatting ATS-clean — Workday hates columns, tables, and graphics.',
    ],
    faqs: [
      {
        q: 'Does Accenture hire entry-level?',
        a: 'Yes, aggressively. Accenture is one of the largest campus recruiters in India and also runs the Accenture Boot Camp for career changers.',
      },
      {
        q: 'How important is the aptitude test at Accenture?',
        a: 'Very important for freshers. The online assessment is the first filter and a weak score cannot be compensated by a strong resume.',
      },
      {
        q: 'Is Accenture a good place to specialize in a platform?',
        a: 'Yes. Accenture has dedicated practice areas for SAP, Salesforce, ServiceNow, Workday, and cloud. New hires can request placement into a specific practice based on certifications.',
      },
    ],
  },

  // ───────────── INDIA ─────────────
  tcs: {
    interviewProcess:
      'TCS hires freshers primarily through the TCS National Qualifier Test (NQT), a standardized 90-minute online aptitude + coding assessment. High NQT scores route candidates to the "Ninja" or "Digital" hiring track, with Digital offering substantially higher packages. Lateral hires go through 2-3 rounds of technical + managerial + HR.',
    commonPitfalls: [
      'Not mentioning NQT score for fresher applications. The score is a direct filter inside TCS\'s portal.',
      'Missing 10th, 12th, and graduation percentages. TCS HR treats these as mandatory fields.',
      'Mentioning a backlog without "cleared" status. Active backlogs are a fast reject.',
      'Using a two-column or creative resume. TCS\'s internal ATS often fails on these.',
    ],
    sampleBullet:
      'Built a Spring Boot microservice for customer onboarding at a retail bank client during a 9-month TCS engagement, reducing form-to-account time from 4 days to 11 minutes for 18,000 monthly applications.',
    howToTailor: [
      'Put academic percentages in a single clean line: "B.Tech CSE, 8.4 CGPA | 12th: 92% | 10th: 94%."',
      'Include NQT score if you have taken the test. Digital track cutoff is typically 70+.',
      'For laterals, lead with the domain (BFSI, retail, manufacturing) and the platform (Java, .NET, SAP).',
      'Use a single-column template, standard fonts, no graphics.',
    ],
    faqs: [
      {
        q: 'What is the minimum TCS NQT score for the Ninja track?',
        a: 'The Ninja cutoff is typically around 60% but varies by hiring cycle. The Digital track (higher CTC) usually requires 75%+ and cleared coding section.',
      },
      {
        q: 'Does TCS hire from non-engineering backgrounds?',
        a: 'Yes. TCS hires science, commerce, and arts graduates through the BPS (Business Process Services) track and the TCS iON curriculum program.',
      },
      {
        q: 'How long is the TCS notice period for laterals?',
        a: 'Standard TCS notice period is 3 months, which is a filter on many external searches. Mention "30 days" or "negotiable" in your Naukri profile if possible.',
      },
    ],
  },

  infosys: {
    interviewProcess:
      'Infosys freshers go through online assessment (aptitude + coding) followed by 2-3 rounds of technical + HR. Strong InfyTQ certification levels fast-track candidates. HackWithInfy winners often get pre-placement offers directly. Lateral hiring includes 2-4 rounds depending on level.',
    commonPitfalls: [
      'Not listing InfyTQ certification level. Infosys fast-tracks InfyTQ Pro certified candidates.',
      'Missing the "domain + technology" pairing. Infosys hires by vertical practice.',
      'Not mentioning HackWithInfy rank or participation. It carries weight for early career.',
      'Creative resume formats. Infosys uses Workday + an internal portal that can fail on complex layouts.',
    ],
    sampleBullet:
      'Delivered a full-stack React + Spring Boot application for a global insurance client during a 7-month Infosys Digital engagement, cutting claim processing time from 48h to 2h for 9,500 monthly claims.',
    howToTailor: [
      'For freshers, highlight InfyTQ level (Foundation, Associate, Pro), HackWithInfy rank, and campus project scores.',
      'For laterals, lead with the specific Infosys practice (Digital, Finacle, EdgeVerve, Salesforce, SAP).',
      'Mention full-stack experience explicitly — Infosys prefers full-stack over single-layer specialists.',
      'ATS-clean single-column template only.',
    ],
    faqs: [
      {
        q: 'What is InfyTQ and do I need to take it?',
        a: 'InfyTQ is Infosys\'s free online certification covering Python, DBMS, and software engineering. It is not required to apply but Infosys fast-tracks InfyTQ Pro certified candidates through its Wingspan portal.',
      },
      {
        q: 'How does the Infosys Mysore training work?',
        a: 'Every fresher hired through campus goes through 3-6 months of residential training at the Mysore Development Centre, covering Java, Python, and your assigned track. Passing the final exam is mandatory for confirmation.',
      },
      {
        q: 'Does Infosys hire from tier-3 colleges?',
        a: 'Yes, through both campus recruitment and the off-campus HackWithInfy program. Tier matters less than performance on the hiring assessment and project portfolio.',
      },
    ],
  },

  wipro: {
    interviewProcess:
      'Wipro hires freshers primarily through the Wipro Elite NTH (National Talent Hunt) — an online aptitude + coding + English test — followed by 1-2 rounds of technical and HR. Candidates with strong NTH scores skip some rounds. Laterals go through 2-3 rounds depending on seniority.',
    commonPitfalls: [
      'Missing NTH score. Wipro uses NTH as a primary filter.',
      'Academic gaps without explanation. Wipro is strict on consistency for freshers.',
      'Not specifying your target Wipro practice (Digital, Consulting, BPS, iCORE).',
      'Missing certifications for laterals. AWS, Azure, SAP, Salesforce, ServiceNow are all filters.',
    ],
    sampleBullet:
      'Built a Pega workflow automation for a UK insurance client during a 12-month Wipro Digital engagement, automating 14 underwriting steps and reducing the manual effort from 45 minutes to 3 minutes per policy.',
    howToTailor: [
      'Freshers: NTH score + academic percentages + 1-2 projects + 1 internship.',
      'Laterals: practice + domain + technology + certifications at the top.',
      'Clear single-column format, standard fonts.',
      'Avoid photos — Wipro\'s portal strips them anyway.',
    ],
    faqs: [
      {
        q: 'What is the Wipro NTH cutoff?',
        a: 'NTH has 3 tracks — WILP (higher package), Elite, and BPS. Elite cutoff is around 60%, WILP requires 75%+. Cutoffs vary per hiring cycle.',
      },
      {
        q: 'Does Wipro hire for Work From Home roles?',
        a: 'Yes, especially for laterals in digital practices. Hybrid is common; fully remote is possible for specific client engagements.',
      },
      {
        q: 'How long is Wipro training for freshers?',
        a: 'Typically 3-4 months at the Electronic City or Mysore training center, covering Java/Python + your assigned domain + soft skills.',
      },
    ],
  },

  flipkart: {
    interviewProcess:
      'Flipkart engineering loop is 4-5 rounds: 1 online coding assessment (HackerRank-style), 2 technical (coding + data structures), 1 system design (for 3+ years), and 1 hiring manager round. For non-engineering, the loop is similar but replaces system design with case interviews. Flipkart hires at India consumer scale and tests for it.',
    commonPitfalls: [
      'Weak DSA. Flipkart screens heavily for data structures and algorithms at all levels.',
      'Missing system design for senior roles. Flipkart\'s infra runs millions of QPS and they test for it.',
      'For PM/category roles, missing GMV impact. Revenue or GMV numbers are required.',
      'Listing experience without marketplace or consumer-scale context.',
    ],
    sampleBullet:
      'Owned the checkout experience for Big Billion Days 2024, optimizing the cart-to-order funnel to handle peak load of 26k orders/min and lifting conversion 1.8pp — contributing an estimated ₹840 crore incremental GMV.',
    howToTailor: [
      'For engineering: lead with Java + Spring + Microservices + DSA profiles (LeetCode/Codeforces rating).',
      'For PM: lead with GMV, category growth %, and user-impact numbers.',
      'Show India-scale fluency: peak loads, QPS, transactions per day.',
      'Use modern clean formatting — Flipkart is Bangalore-style.',
    ],
    faqs: [
      {
        q: 'Does Flipkart hire freshers?',
        a: 'Yes, heavily. Flipkart is a major campus recruiter at IITs, NITs, IIMs, and top private universities. The fresher coding bar is high — typically 3-star CodeChef or 1600+ Codeforces.',
      },
      {
        q: 'How does Flipkart compare to Amazon India for engineers?',
        a: 'Flipkart\'s coding bar is similar to Amazon\'s but the culture is more startup-flavored. Amazon pays slightly more at senior levels; Flipkart moves faster on rollouts.',
      },
      {
        q: 'Does Flipkart do system design rounds for 2-year experienced candidates?',
        a: 'Usually not for SDE-1 (0-2 years). For SDE-2 and above, expect at least 1 system design round focused on Indian consumer-scale problems.',
      },
    ],
  },

  zomato: {
    interviewProcess:
      'Zomato runs 3-5 rounds: 1 online coding test, 2 technical (coding + system design), 1 hiring manager, and 1 cross-functional for senior roles. For non-engineering, the loop replaces coding with case interviews heavy on unit economics and two-sided marketplace thinking.',
    commonPitfalls: [
      'Vague "worked on growth" claims. Zomato demands unit economics fluency.',
      'Contribution language ("I contributed to X"). Zomato explicitly screens for ownership.',
      'Missing mobile-first or consumer scale context for product roles.',
      'Generic startup resumes without Zomato-relevant scale numbers.',
    ],
    sampleBullet:
      'Owned the Instamart catalog expansion for Tier-2 cities, launching 14 new dark stores in 4 months, growing catalog breadth 3.4x and driving ₹22 crore incremental monthly GMV at a contribution margin 2.1x the city average.',
    howToTailor: [
      'Lead with ownership verbs: "Owned," "Led," "Launched," "Shipped."',
      'Include unit economics: AOV, CM, CAC, LTV, retention.',
      'For engineering: lead with Go or Python + system design at scale.',
      'Use a clean modern template — Zomato is design-conscious.',
    ],
    faqs: [
      {
        q: 'Does Zomato hire from campus or lateral?',
        a: 'Both, but lateral hiring dominates senior roles. Campus hiring targets IITs, NITs, and top private universities for engineering; IIMs and tier-1 MBA schools for business roles.',
      },
      {
        q: 'Is Instamart a separate hiring pipeline?',
        a: 'Yes. Instamart has its own engineering, product, and ops hiring track given the different unit economics and operational tempo vs. food delivery.',
      },
      {
        q: 'Does Zomato require MBA for product/category roles?',
        a: 'Not required but strongly preferred for senior PM roles. Founder-mindset operators with startup experience can also break in without an MBA.',
      },
    ],
  },

  swiggy: {
    interviewProcess:
      'Swiggy engineering runs 4-5 rounds: online coding assessment, 2 technical, 1 system design, 1 hiring manager. For ops/supply roles, the loop adds case interviews and a "last mile simulation" test for senior ops. Swiggy loops are known for being exhaustive on distributed systems.',
    commonPitfalls: [
      'For engineering, not mentioning event-driven systems or Kafka. Swiggy\'s core stack is Kafka-heavy.',
      'Missing India peak-load context. "Handled 500 orders/min" is weak; Swiggy thinks in tens of thousands.',
      'For ops, missing dark store or last-mile specific KPIs.',
      'Listing "growth" without retention, cohort, or CAC numbers.',
    ],
    sampleBullet:
      'Re-architected the order matching service from monolith to Kafka + Go microservices, reducing P99 allocation latency from 1.8s to 340ms and supporting peak load of 42k orders/min during 2024 IPL finale.',
    howToTailor: [
      'For engineering: Go, Java, Python, Kafka, Cassandra, system design.',
      'For ops/supply: deliveries/hour, throughput, last-mile cost per order.',
      'For growth/marketing: CAC, retention, cohort, blended payback.',
      'Use a modern design-aware template.',
    ],
    faqs: [
      {
        q: 'Does Swiggy prefer Go or Java for engineering?',
        a: 'Both. Swiggy is a Go-first company for new services but has a huge Java codebase for legacy. Go is a stronger positive signal for platform and infra teams.',
      },
      {
        q: 'Is Instamart at Zomato the same as Instamart at Swiggy?',
        a: 'No — Instamart is Swiggy\'s quick commerce brand. Zomato\'s equivalent is Blinkit (which they acquired). The two are direct competitors and skills transfer either way.',
      },
      {
        q: 'Does Swiggy hire fully remote engineers?',
        a: 'Hybrid is the default. Fully remote is possible for specialized roles (ML research, senior infra) but most engineering is Bangalore-hybrid.',
      },
    ],
  },

  zoho: {
    interviewProcess:
      'Zoho\'s hiring process is unique: Zoho Schools of Learning recruits 12th-pass students directly into a 2-year paid training + work program. For traditional hires, the loop is 2-3 rounds focused on coding fundamentals, systems thinking, and product aptitude. Zoho cares more about raw problem-solving than pedigree.',
    commonPitfalls: [
      'Over-polished resumes with jargon. Zoho rewards substance and clarity.',
      'Listing degrees prominently. Zoho is degree-agnostic and flagship hires often have no formal CS degree.',
      'Breadth without depth. Zoho prefers C/C++/Java depth over "worked with 15 languages."',
      'Missing GitHub or project evidence. Zoho explicitly looks for self-initiated work.',
    ],
    sampleBullet:
      'Built a full-text search engine in C++ from scratch over 3 months using inverted indexes and BM25 ranking — 4x faster than Lucene on our test corpus, open-sourced on GitHub with 180 stars.',
    howToTailor: [
      'Lead with projects, not education or pedigree.',
      'List GitHub URL prominently — Zoho reviewers will check it.',
      'Name specific languages and depth: "C++ (4 years, wrote own HTTP server)" beats "C++."',
      'Keep the resume plain and content-focused. No graphics.',
    ],
    faqs: [
      {
        q: 'What is Zoho Schools and who can apply?',
        a: 'Zoho Schools of Learning is a 2-year paid program that recruits 12th-pass students (typically from rural Tamil Nadu) into a combined training + work program. Graduates are placed into Zoho engineering full-time.',
      },
      {
        q: 'Does Zoho pay less than other Indian tech companies?',
        a: 'Entry-level Zoho packages are lower than Flipkart/Swiggy/Razorpay but the long tenure, profitability, and self-ownership culture more than compensate. Senior Zoho engineers can reach L7 equivalent packages.',
      },
      {
        q: 'Is Zoho remote-friendly?',
        a: 'Yes. Zoho pioneered the "rural office" model (40+ offices in small Indian towns) and supports both remote and small-town on-site work.',
      },
    ],
  },

  byju: {
    interviewProcess:
      "BYJU'S interview loops vary wildly by function. For sales/BD: aggressive 3-round loop focused on communication, resilience, and target closure history. For engineering: 3-4 rounds of coding + system design. For content/teaching: subject test + mock class + HR.",
    commonPitfalls: [
      'For sales, missing exact revenue numbers. Qualitative claims fail.',
      'Generic "team player" language. BYJU\'S sales culture rewards aggressive individual performers.',
      "For tech, missing mobile-first context. BYJU'S product is mobile-dominant.",
      'For content, missing subject-specific depth.',
    ],
    sampleBullet:
      "Closed ₹1.42Cr in inside sales revenue during my first 6 months at BYJU'S Exam Prep, averaging 34% lead-to-close conversion and 112% quota attainment across 8 consecutive months.",
    howToTailor: [
      'For sales: revenue, conversion rate, deal size, quota attainment.',
      'For content: subject expertise, teaching experience, curriculum design.',
      'For tech: React Native, Node.js, Python, product analytics.',
      'Use a professional template — not flashy.',
    ],
    faqs: [
      {
        q: "Is BYJU'S still hiring after the restructuring?",
        a: "BYJU'S has significantly reduced its hiring footprint post-2023 but continues to hire for Aakash (test prep), Toppr, and select engineering teams. Volume is down; bar is up.",
      },
      {
        q: 'Do I need teaching experience to join content/curriculum roles?',
        a: 'Preferred but not required. Subject expertise (STEM) + strong communication can substitute for teaching years.',
      },
      {
        q: 'What is the BYJU\'S sales interview like?',
        a: 'Aggressive. Expect role-play with a hostile "customer," questions about your worst month, and drilling on your exact revenue numbers. Resilience under pressure is explicitly tested.',
      },
    ],
  },

  phonepe: {
    interviewProcess:
      'PhonePe engineering loops are 4-5 rounds: online assessment, 2 technical (DSA + coding), 1 system design (mandatory for 2+ years), 1 hiring manager. PhonePe\'s system design bar is among the highest in Indian fintech given the scale (500M+ users, billions of transactions).',
    commonPitfalls: [
      'Missing payments/fintech domain. PhonePe prefers candidates with UPI/NPCI/banking experience.',
      'Weak distributed systems. PhonePe\'s infra is built on event-driven architecture and they test for it.',
      'Not knowing SLO/SLA vocabulary. PhonePe runs 99.99%+ availability and tests for reliability thinking.',
      'Generic resumes without India-scale numbers.',
    ],
    sampleBullet:
      'Built the fallback payment retry service for PhonePe transactions, reducing failed UPI payment rate from 2.1% to 0.6% (200M monthly transactions) and contributing ₹180 Cr annual incremental GMV.',
    howToTailor: [
      'Lead with Java/Spring + Microservices + Kafka/Cassandra + system design.',
      'Quantify in TPS, P99 latency, availability %, error budget.',
      'Mention any payments / UPI / NPCI / fintech regulatory work.',
      'Clean modern template, Bangalore-style.',
    ],
    faqs: [
      {
        q: 'Is PhonePe owned by Walmart?',
        a: 'Yes. PhonePe is majority-owned by Walmart (since the Flipkart acquisition) but operates with full autonomy and was formally separated from Flipkart in 2022.',
      },
      {
        q: 'How does PhonePe engineering compare to Razorpay?',
        a: 'PhonePe is larger by headcount and operates at higher raw transaction scale. Razorpay\'s product surface is broader (PGs, RazorpayX, Capital). Coding bar is comparable; system design bar is slightly higher at PhonePe.',
      },
      {
        q: 'Does PhonePe hire freshers?',
        a: 'Yes, through campus recruitment at top IITs/NITs and through the PhonePe HustleX internship conversion pipeline. Bar is high.',
      },
    ],
  },

  razorpay: {
    interviewProcess:
      'Razorpay runs 4-6 rounds: online assessment, 2-3 technical, 1 system design, 1 hiring manager. For product roles, it runs 5-6 rounds with case interviews and shipping velocity probes. Razorpay is known for one of the highest engineering bars in Indian fintech.',
    commonPitfalls: [
      'For engineering, missing Go. Razorpay is a Go-first shop.',
      'No API design experience. Razorpay sells APIs; API design is a core competency.',
      'Generic fintech claims. Razorpay wants specifics: settlement, reconciliation, dispute, chargeback.',
      'Two-column or graphic-heavy templates.',
    ],
    sampleBullet:
      'Designed and shipped the Razorpay Subscriptions API v2, adding flexible billing cycles and proration — rolled out to 12,000 merchants and processing ₹92 Cr monthly recurring GMV within 4 months.',
    howToTailor: [
      'Lead with Go (or Java) + API design + distributed systems.',
      'Mention PCI DSS, KYC, AML, settlement, reconciliation experience.',
      'For PM: merchant-impact numbers, ship velocity, API usage growth.',
      'Modern professional template.',
    ],
    faqs: [
      {
        q: 'Does Razorpay hire without fintech background?',
        a: 'Yes for engineering, less common for product. Razorpay aggressively upskills new engineers on fintech domain. For PM roles, fintech background is a strong plus.',
      },
      {
        q: 'Is Razorpay remote-friendly?',
        a: 'Hybrid is default (3 days in office in Bangalore). Fully remote is possible for specialized senior roles.',
      },
      {
        q: 'What is the Razorpay coding bar vs. product companies like Flipkart?',
        a: 'Comparable. Razorpay tests slightly less on pure DSA and slightly more on API/system design than Flipkart.',
      },
    ],
  },

  freshworks: {
    interviewProcess:
      'Freshworks runs 4-5 rounds: online assessment, 2 technical, 1 system design (for senior), 1 hiring manager. For sales, the loop replaces technical with role plays and quota walk-throughs. Freshworks is public (NASDAQ: FRSH) so the hiring bar has risen post-IPO.',
    commonPitfalls: [
      'For engineering, not mentioning Ruby on Rails. Freshdesk and Freshsales are Rails-heavy.',
      'For sales, missing global quota context. Freshworks sells worldwide; international experience is a plus.',
      'No SaaS metric fluency (ARR, NRR, CAC, payback period).',
      'Generic customer success language. Freshworks CS team is performance-driven.',
    ],
    sampleBullet:
      'Drove $4.2M in new ARR over 8 quarters as Inside Sales Manager for the Freshsales product line, managing a 6-rep team at 118% average quota attainment and expanding enterprise accounts 2.4x.',
    howToTailor: [
      'For engineering: Ruby on Rails + React + Node.js + PostgreSQL.',
      'For sales/CS: ARR, NRR, CAC, quota attainment, expansion revenue.',
      'Mention any global market experience — Freshworks sells to 60k customers worldwide.',
      'Professional modern template.',
    ],
    faqs: [
      {
        q: 'Is Freshworks primarily engineering in Chennai?',
        a: 'Engineering and product are heavily Chennai-based. Sales is distributed globally, with hubs in Chennai, Bangalore, San Mateo, London, and Sydney.',
      },
      {
        q: 'How does Freshworks compare to Zoho for engineers?',
        a: 'Freshworks is more Western-SaaS in culture (public company, product management heavy, VC roots). Zoho is bootstrapped and more engineering-pure. Compensation is similar at mid-level.',
      },
      {
        q: 'Does Freshworks hire for fully remote roles?',
        a: 'Some, especially for senior ICs and specialized sales roles in key geos. Engineering is predominantly hybrid Chennai.',
      },
    ],
  },

  ola: {
    interviewProcess:
      'Ola\'s interview process varies by business: ride-hailing engineering runs 4-5 rounds (online + technical + system design + HM). Ola Electric runs longer EV-specific loops including hardware + manufacturing rounds. Krutrim (AI) runs ML research-style loops with paper discussions and take-home exercises.',
    commonPitfalls: [
      'Generic "mobility" claims. Specify ride-hailing, Ola Electric, or Krutrim.',
      'For Krutrim, missing transformer/LLM experience. Generic ML is weak.',
      'For Ola Electric, missing EV/BMS/motor control hardware experience.',
      'Weak distributed systems for senior engineering.',
    ],
    sampleBullet:
      'Fine-tuned a 7B parameter LLM on Indic language corpus (12 languages, 480B tokens) for Krutrim\'s conversational assistant, achieving 82% accuracy on Hindi + English code-switched benchmarks vs. Meta\'s Llama-3 baseline of 61%.',
    howToTailor: [
      'For Krutrim: lead with PyTorch, transformer fine-tuning, RLHF, evaluation.',
      'For Ola Electric: powertrain, BMS, motor control, supply chain, manufacturing.',
      'For ride-hailing engineering: distributed systems, matching algorithms, two-sided marketplace.',
      'Modern template.',
    ],
    faqs: [
      {
        q: 'Is Krutrim a separate company from Ola?',
        a: 'Technically yes. Krutrim is Ola founder Bhavish Aggarwal\'s AI venture launched in 2024. It operates separately but shares some infra and hiring with Ola.',
      },
      {
        q: 'Does Ola Electric hire non-EV engineers?',
        a: 'Yes. Software and cloud engineers for fleet management, telematics, and charging infrastructure are hired even without EV background, though hardware engineers need EV-specific experience.',
      },
      {
        q: 'Is Ola ride-hailing still hiring?',
        a: 'Yes but at reduced headcount. Core hiring is in engineering, ML, and supply ops. Customer support has been largely automated.',
      },
    ],
  },
};

export function getCompanyExtended(slug: string): CompanyExtended | undefined {
  return COMPANY_EXTENDED[slug];
}
