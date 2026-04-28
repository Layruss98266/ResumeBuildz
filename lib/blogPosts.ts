// Blog post registry. Each entry points to an existing page URL. The blog
// hub is an index layer, not a URL move, so no SEO redirects are needed.
// Company pages live at /blog/company-guides/[company] and are surfaced
// here via a "company-guides" category that links to the /blog/company-guides hub.

export interface BlogPost {
  slug: string; // canonical URL slug (matches the actual page path after /)
  title: string;
  excerpt: string; // 1-2 sentence description for cards and SEO
  category: string; // BlogCategory slug
  tags: string[];
  author: string;
  datePublished: string; // ISO yyyy-mm-dd
  dateModified: string; // ISO yyyy-mm-dd
  readingTime: number; // minutes
  featured?: boolean; // show in hero carousel
  /**
   * Optional scheduled-publish timestamp. If set AND in the future, the
   * post is hidden from /blog hub, sitemap, RSS, and related-post arrays,
   * and its route returns 404 until the date passes. Absent = published
   * immediately on deploy (current behaviour for every post committed
   * before scheduling shipped).
   *
   * Format: ISO 8601 UTC, e.g. '2026-04-21T04:47:00Z' (10:17 IST).
   * Keep scheduled posts in the 09:00-12:00 IST publishing window.
   */
  publishAt?: string;
}

/**
 * Returns true when a post is publicly visible — either no schedule
 * was set, or the scheduled time has passed. Used as the single source
 * of truth for visibility across hub, sitemap, RSS, and per-route
 * 404 guards.
 */
export function isPublished(post: { publishAt?: string }, now: Date = new Date()): boolean {
  if (!post.publishAt) return true;
  const target = new Date(post.publishAt);
  if (Number.isNaN(target.getTime())) return true; // malformed -> treat as published (fail open)
  return target.getTime() <= now.getTime();
}

export const BLOG_POSTS: BlogPost[] = [
  // ─────────── Resume Writing ───────────
  {
    slug: 'fresher-resume',
    title: 'Fresher Resume Format 2026',
    excerpt:
      'The exact 7-section format that beats Indian and global ATS for freshers. Built for campus placements, off-campus drives, and NQT/InfyTQ/NTH applications.',
    category: 'resume-writing',
    tags: ['fresher', 'format', 'template', 'campus'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 11,
    featured: true,
  },
  {
    slug: 'resume-tips',
    title: 'Resume Writing Tips That Actually Work',
    excerpt:
      'The practical tips recruiters wish more candidates followed — from quantified bullets and action verbs to the one-page rule and file naming.',
    category: 'resume-writing',
    tags: ['tips', 'bullets', 'action-verbs'],
    author: 'Surya L',
    datePublished: '2026-03-20',
    dateModified: '2026-04-15',
    readingTime: 9,
  },
  {
    slug: 'resume-action-verbs',
    title: '200+ Resume Action Verbs by Category (with Examples)',
    excerpt:
      '210 powerful verbs grouped by role (leadership, technical, sales, analysis, more). Includes the weak-to-strong swap table and 10 real bullet examples.',
    category: 'resume-writing',
    tags: ['action-verbs', 'bullets', 'writing'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 9,
  },
  {
    slug: 'resume-length',
    title: 'Resume Length in 2026: 1 Page vs 2 Pages',
    excerpt:
      'How long should a resume be in 2026? 1 page under 5 years, 2 above. Full framework with career stage, industry, and cutting/expanding tactics.',
    category: 'resume-writing',
    tags: ['length', 'formatting', 'one-page', 'two-page'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 8,
  },
  {
    slug: 'resume-summary-examples',
    title: '25 Resume Summary Examples That Get Interviews (2026)',
    excerpt:
      '15 summary examples by career stage + 10 by industry. Before/after versions, the 4-part formula, common mistakes, and how to use AI without generic phrasing.',
    category: 'resume-writing',
    tags: ['summary', 'examples', 'formula'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 14,
    featured: true,
  },
  {
    slug: 'resume-format-guide',
    title: 'Best Resume Format 2026: Chronological vs Functional vs Hybrid',
    excerpt:
      'The 3 formats compared. Which beats ATS, which recruiters actually read, and the decision tree for picking the right one for your situation.',
    category: 'resume-writing',
    tags: ['format', 'chronological', 'hybrid', 'functional', 'ATS'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 10,
  },
  {
    slug: 'quantify-resume-achievements',
    title: 'How to Quantify Resume Achievements (50+ Examples by Role)',
    excerpt:
      'Turn vague bullets into metric-driven proof. The XYZ formula, where to find numbers, and 50+ examples across 8 roles.',
    category: 'resume-writing',
    tags: ['metrics', 'bullets', 'XYZ-formula', 'quantification'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 12,
    featured: true,
  },

  // ─────────── ATS & Keywords ───────────
  {
    slug: 'ats-guide',
    title: 'How to Beat ATS: The Complete Guide',
    excerpt:
      '75% of resumes never reach a human recruiter. Here is how ATS works, why your resume might be filtered, and exactly how to fix it.',
    category: 'ats-keywords',
    tags: ['ATS', 'keywords', 'parsing'],
    author: 'Surya L',
    datePublished: '2026-02-15',
    dateModified: '2026-04-15',
    readingTime: 12,
    featured: true,
  },
  {
    slug: 'pass-ats-resume-scanning',
    title: 'How to Pass ATS Resume Scanning in 2026',
    excerpt:
      '98% of Fortune 500 use an ATS. 75% of resumes never reach a human. The practical 2026 playbook: 7 killers, 10 tactics, PDF vs DOCX truth, and the top 5 systems explained.',
    category: 'ats-keywords',
    tags: ['ATS', 'keywords', 'parsing', 'workday', 'greenhouse'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 11,
    featured: true,
  },

  // ─────────── Career Transitions ───────────
  {
    slug: 'resume-after-layoff',
    title: 'Resume After a Layoff: A 5-Step Guide for 2026',
    excerpt:
      '250,000+ tech workers were laid off in 2024 and another 100,000+ in early 2025. Here is exactly how to write a resume that gets interviews, with no apologetic tone and no awkward gaps.',
    category: 'career-transitions',
    tags: ['layoff', 'recovery', 'email-templates'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 12,
    featured: true,
  },
  {
    slug: 'resume-after-career-gap',
    title: 'How to Write a Resume After a Career Gap',
    excerpt:
      'A career gap is not a deal-breaker. 62% of professionals have non-linear career paths. Here is how to address the gap honestly and still get interviews.',
    category: 'career-transitions',
    tags: ['career-gap', 'returnship', 'caregiving'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 10,
  },
  {
    slug: 'resume-for-career-change',
    title: 'Resume for Career Change: The 5-Step Pivot Guide',
    excerpt:
      'Transferable-skills rewriting, hybrid format, 6 common pivot examples, realistic 12-month timeline, and an informational interview email template.',
    category: 'career-transitions',
    tags: ['career-change', 'pivot', 'transferable-skills'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 11,
  },

  // ─────────── Interviews & Cover Letters ───────────
  {
    slug: 'cover-letter',
    title: 'Cover Letter Guide & Templates',
    excerpt:
      'How to write a cover letter that pairs with a strong resume — 4-part structure, 6 industry templates, and the do/don\'t list every recruiter wishes more candidates followed.',
    category: 'interviews-cover-letters',
    tags: ['cover-letter', 'templates', 'STAR', 'job-search'],
    author: 'Surya L',
    datePublished: '2026-03-15',
    dateModified: '2026-04-15',
    readingTime: 8,
    featured: true,
  },
  {
    slug: 'cover-letter-vs-resume',
    title: 'Cover Letter vs Resume: Do You Need Both in 2026?',
    excerpt:
      'Honest answer with data. When to write a cover letter, when to skip, and the hidden cost of going without.',
    category: 'interviews-cover-letters',
    tags: ['cover-letter', 'strategy'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 8,
  },
  {
    slug: 'tailor-resume',
    title: 'How to Tailor Your Resume in 10 Minutes',
    excerpt:
      'Tailored resumes get 3x more callbacks. The minute-by-minute process without starting from scratch, plus the AI-assisted workflow.',
    category: 'ats-keywords',
    tags: ['tailoring', 'keywords', 'JD-matching'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 10,
  },
  {
    slug: 'best-free-resume-builder',
    title: 'Free vs Paid Resume Builders 2026: Brutally Honest Comparison',
    excerpt:
      '8 builders compared: pricing, privacy, ATS, AI features. Which "free" builders paywall the download, which are open-source.',
    category: 'ai-resume',
    tags: ['comparison', 'free', 'paid', 'privacy'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 13,
    featured: true,
  },
  {
    slug: 'ai-resume-builders-tested',
    title: 'AI Resume Builders 2026: We Tested 8',
    excerpt:
      'Which AI tools hallucinate, which preserve voice, and the 5 rules for using AI without generic output. Strengths, weaknesses, pricing, privacy for each.',
    category: 'ai-resume',
    tags: ['AI', 'ChatGPT', 'Claude', 'Rezi', 'review'],
    author: 'Surya L',
    datePublished: '2026-04-19',
    dateModified: '2026-04-19',
    readingTime: 13,
    featured: true,
  },

  {
    slug: 'why-should-we-hire-you',
    title: 'How to Answer "Why Should We Hire You" (8 Examples)',
    excerpt:
      '3-pillar formula (Problem, Proof, Compounding), 8 worked examples from fresher to executive, and the 6 mistakes that kill this answer.',
    category: 'interviews-cover-letters',
    tags: ['interview', 'closing-question', 'pitch', 'why-hire-you'],
    author: 'Surya L',
    datePublished: '2026-05-12',
    dateModified: '2026-05-12',
    readingTime: 12,
    publishAt: '2026-05-12T04:43:00Z',
  },
  {
    slug: 'resume-margins-spacing',
    title: 'Resume Margins & Spacing: The Ideal Setup (2026)',
    excerpt:
      'Exact margin, line-height, and section-spacing values for a resume that parses on ATS and reads clean. 8-point spec plus common layout fixes.',
    category: 'resume-writing',
    tags: ['margins', 'spacing', 'formatting', 'layout'],
    author: 'Surya L',
    datePublished: '2026-05-14',
    dateModified: '2026-05-14',
    readingTime: 10,
    publishAt: '2026-05-14T05:59:00Z',
  },
  {
    slug: 'workday-resume-tips',
    title: 'Workday Resume Tips That Actually Pass (2026)',
    excerpt:
      'How Workday parses your resume, 8 tactical tips to raise match score, and the Profile Sync gotcha that catches most candidates.',
    category: 'ats-keywords',
    tags: ['Workday', 'ATS', 'resume-parsing', 'match-score'],
    author: 'Surya L',
    datePublished: '2026-05-17',
    dateModified: '2026-05-17',
    readingTime: 11,
    publishAt: '2026-05-17T05:11:00Z',
  },
  {
    slug: 'star-method-examples',
    title: 'STAR Method for Behavioural Interviews: 8 Full Examples',
    excerpt:
      'The 90-second STAR formula with 8 full worked examples across Tech, Product, Design, Finance, Marketing, Management, and HR, plus the 6 STAR mistakes that tank answers.',
    category: 'interviews-cover-letters',
    tags: ['STAR', 'behavioural', 'interview', 'framework', 'examples'],
    author: 'Surya L',
    datePublished: '2026-05-05',
    dateModified: '2026-05-05',
    readingTime: 15,
    featured: true,
    publishAt: '2026-05-05T04:41:00Z',
  },
  {
    slug: 'best-resume-fonts',
    title: 'Best Resume Fonts 2026 (Tested Against 4 ATS)',
    excerpt:
      '10 fonts tested on Workday, Greenhouse, Lever, and Taleo. Safe picks, fonts to avoid, size rules, PDF embedding, and heading-vs-body setup.',
    category: 'resume-writing',
    tags: ['fonts', 'typography', 'ATS', 'formatting'],
    author: 'Surya L',
    datePublished: '2026-05-07',
    dateModified: '2026-05-07',
    readingTime: 12,
    publishAt: '2026-05-07T06:07:00Z',
  },
  {
    slug: 'wipro-elite-nth-guide',
    title: 'Wipro Elite NTH 2026: Syllabus, Process & Resume Tips',
    excerpt:
      'Complete Wipro NTH 2026 guide: 3-round process, full syllabus, Elite Hire vs Turbo Hire packages, resume placement, and the 45-day prep plan.',
    category: 'india-hiring',
    tags: ['Wipro', 'NTH', 'Elite', 'fresher', 'campus', 'India'],
    author: 'Surya L',
    datePublished: '2026-05-10',
    dateModified: '2026-05-10',
    readingTime: 13,
    publishAt: '2026-05-10T05:18:00Z',
  },
  {
    slug: 'tell-me-about-yourself',
    title: 'How to Answer "Tell Me About Yourself" (10 Examples)',
    excerpt:
      'The 3-part present-past-future formula, 10 worked examples by career stage, and the 6 mistakes that tank this first-interview question.',
    category: 'interviews-cover-letters',
    tags: ['interview', 'tell-me-about-yourself', 'elevator-pitch', 'prep'],
    author: 'Surya L',
    datePublished: '2026-04-28',
    dateModified: '2026-04-28',
    readingTime: 13,
    publishAt: '2026-04-28T05:38:00Z',
  },
  {
    slug: 'linkedin-url-on-resume',
    title: 'Should You Put a LinkedIn URL on Your Resume?',
    excerpt:
      'Yes, if your profile passes the 8-point check. 4 reasons to include, 4 cases where you should not, and correct URL formatting.',
    category: 'resume-writing',
    tags: ['linkedin', 'resume-header', 'contact', 'social'],
    author: 'Surya L',
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
    readingTime: 10,
    publishAt: '2026-04-30T05:23:00Z',
  },
  {
    slug: 'infosys-infytq-guide',
    title: 'Infosys InfyTQ Certification: Full 2026 Guide',
    excerpt:
      '5-phase process, Foundation + Advanced syllabus, Systems Engineer to Specialist Programmer roles, HackWithInfy accelerator, and resume placement.',
    category: 'india-hiring',
    tags: ['Infosys', 'InfyTQ', 'certification', 'fresher', 'HackWithInfy'],
    author: 'Surya L',
    datePublished: '2026-04-30',
    dateModified: '2026-04-30',
    readingTime: 15,
    publishAt: '2026-05-03T05:54:00Z',
  },
  {
    slug: 'interview-questions-and-answers',
    title: '100 Common Interview Questions & How to Answer Them (2026)',
    excerpt:
      'The 100 questions hiring managers actually ask in 2026. Behavioural, situational, technical, leadership, culture, tricky, and closing. STAR method + 48-hour prep plan.',
    category: 'interviews-cover-letters',
    tags: ['interview', 'STAR', 'behavioural', 'prep', 'questions'],
    author: 'Surya L',
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    readingTime: 16,
    featured: true,
  },
  {
    slug: 'resume-skills-list',
    title: 'How to List Skills on a Resume (by Skill Type) in 2026',
    excerpt:
      'Hard skills, soft skills, languages, certifications, tools — each lands differently with recruiters and ATS. The exact grouping, order, and formatting.',
    category: 'resume-writing',
    tags: ['skills', 'hard-skills', 'soft-skills', 'certifications', 'ATS'],
    author: 'Surya L',
    datePublished: '2026-04-23',
    dateModified: '2026-04-23',
    readingTime: 11,
    publishAt: '2026-04-23T06:12:00Z',
  },

  // ─────────── India Hiring ───────────
  {
    slug: 'tcs-nqt-resume-guide',
    title: 'TCS NQT 2026: Resume & Process Playbook for Freshers',
    excerpt:
      'Complete TCS NQT 2026 guide: 5-round process, TCS iON-safe resume format, 25 keywords, 3 project templates, timeline, bond, and interview prep.',
    category: 'india-hiring',
    tags: ['TCS', 'NQT', 'fresher', 'campus', 'India', 'iON'],
    author: 'Surya L',
    datePublished: '2026-04-26',
    dateModified: '2026-04-26',
    readingTime: 14,
    featured: true,
    publishAt: '2026-04-26T05:05:00Z',
  },
  {
    slug: 'campus-placement-resume',
    title: 'Campus Placement Resume 2026',
    excerpt:
      'The exact 10-point checklist + 5-round process walkthrough for Indian campus placements. Built around TCS NQT, Infosys InfyTQ, and Wipro Elite NTH.',
    category: 'india-hiring',
    tags: ['campus', 'TCS', 'Infosys', 'Wipro', 'NQT'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 10,
    featured: true,
  },
  {
    slug: 'naukri-resume-tips',
    title: '8 Naukri.com Resume Tips That 3x Recruiter Views',
    excerpt:
      'Naukri\'s 90M candidates and 350k recruiters work off filters, not browsing. Here is how to rank higher in the search results that matter.',
    category: 'india-hiring',
    tags: ['Naukri', 'profile', 'recruiter', 'LinkedIn-vs-Naukri'],
    author: 'Surya L',
    datePublished: '2026-04-14',
    dateModified: '2026-04-15',
    readingTime: 9,
  },
  {
    slug: 'technical-interview-prep',
    title: 'Technical Interview Prep: The 90-Day Plan (2026)',
    excerpt: 'A realistic 12-week plan from shaky on arrays to offer-ready at FAANG. Problem counts per week, mock schedule, systems design framework, resource stack.',
    category: 'technical-interview',
    tags: ['interview-prep', 'leetcode', 'FAANG', 'system-design'],
    author: 'Surya L',
    datePublished: '2026-05-26',
    dateModified: '2026-05-26',
    readingTime: 15,
    featured: true,
    publishAt: '2026-05-26T04:38:00Z',
  },
  {
    slug: 'linkedin-easy-apply',
    title: 'LinkedIn Easy Apply: Skip or Use? (2026)',
    excerpt: 'Data-driven answer from a 1000-application study. Easy Apply vs direct apply callback rates, when to use, when to skip, and the 6-point ready check.',
    category: 'job-search-strategy',
    tags: ['linkedin', 'job-search', 'easy-apply', 'application-strategy'],
    author: 'Surya L',
    datePublished: '2026-05-28',
    dateModified: '2026-05-28',
    readingTime: 10,
    publishAt: '2026-05-28T06:04:00Z',
  },
  {
    slug: 'resume-after-parental-leave',
    title: 'Resume After Maternity or Paternity Leave (2026)',
    excerpt: 'How to address a parental career break honestly. Framing that works, a stayed-sharp list, 4 summary examples, returnship programmes, the flex conversation.',
    category: 'career-transitions',
    tags: ['parental-leave', 'career-break', 'returnship', 'return-to-work'],
    author: 'Surya L',
    datePublished: '2026-05-31',
    dateModified: '2026-05-31',
    readingTime: 11,
    publishAt: '2026-05-31T05:16:00Z',
  },
  {
    slug: 'questions-to-ask-interviewer',
    title: '40 Questions to Ask the Interviewer (and 5 to Avoid)',
    excerpt: '40 field-tested questions across role, team, growth, company, culture, and red flags, plus 5 to avoid and what to do when the interviewer is out of time.',
    category: 'interviews-cover-letters',
    tags: ['interview', 'questions', 'closing', 'hiring-manager'],
    author: 'Surya L',
    datePublished: '2026-06-02',
    dateModified: '2026-06-02',
    readingTime: 11,
    publishAt: '2026-06-02T04:49:00Z',
  },
  {
    slug: 'resume-keywords-by-industry',
    title: 'Resume Keywords by Industry: 12 Industries Covered (2026)',
    excerpt: '20 to 30 ATS keywords per industry across 12 industries, plus a 3-minute method to extract role-specific keywords from any JD.',
    category: 'ats-keywords',
    tags: ['ats', 'keywords', 'industry', 'jd-match'],
    author: 'Surya L',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    readingTime: 14,
    publishAt: '2026-06-04T05:51:00Z',
  },
  {
    slug: 'resume-over-50',
    title: 'Resume for Over 50: How to Beat Age Bias (2026)',
    excerpt: '7 tactics that neutralise age signals on a resume, 4 worked summaries (weak vs strong), and data on how age bias shows up in callback rates.',
    category: 'career-transitions',
    tags: ['career-transitions', 'older-workers', 'age-bias', 'senior'],
    author: 'Surya L',
    datePublished: '2026-06-07',
    dateModified: '2026-06-07',
    readingTime: 12,
    publishAt: '2026-06-07T05:07:00Z',
  },
  {
    slug: 'cover-letter-software-engineer',
    title: 'Cover Letter Examples for Software Engineers (2026)',
    excerpt: '5 worked cover letter examples across fresher, FAANG, startup, stack-switch, and backend-to-fullstack scenarios. 4-part structure, adaptation rules, mistakes.',
    category: 'interviews-cover-letters',
    tags: ['cover-letter', 'software-engineer', 'examples', 'faang', 'startup'],
    author: 'Surya L',
    datePublished: '2026-05-19',
    dateModified: '2026-05-19',
    readingTime: 13,
    publishAt: '2026-05-19T04:56:00Z',
  },
  {
    slug: 'greenhouse-ats-tips',
    title: 'Greenhouse ATS: How to Stand Out in Startup Hiring (2026)',
    excerpt: 'Greenhouse powers hiring at Airbnb, Stripe, Figma, Notion, and most YC-backed startups. 8 tactical tips, Greenhouse vs Workday, scorecard flow, pipeline sync.',
    category: 'ats-keywords',
    tags: ['greenhouse', 'ats', 'startup', 'scorecard', 'hiring'],
    author: 'Surya L',
    datePublished: '2026-05-21',
    dateModified: '2026-05-21',
    readingTime: 11,
    publishAt: '2026-05-21T05:42:00Z',
  },
  {
    slug: 'resume-for-promotion',
    title: 'Resume for a Promotion: Internal Transfer Playbook (2026)',
    excerpt: 'Internal promotions ride on a Promotion Case Doc, not a resume. Full framework, 5 worked examples across IC, Staff, Manager, lateral, cross-functional.',
    category: 'career-growth',
    tags: ['promotion', 'internal-transfer', 'career-growth', 'case-doc', 'playbook'],
    author: 'Surya L',
    datePublished: '2026-05-24',
    dateModified: '2026-05-24',
    readingTime: 12,
    publishAt: '2026-05-24T05:23:00Z',
  },
  {
    slug: 'salary-negotiation-scripts',
    title: 'Salary Negotiation Scripts for Software Engineers (India + US)',
    excerpt: 'Verbatim scripts for 6 negotiation scenarios across India and US, recruiter counter-moves, and a copy-paste email template.',
    category: 'salary-negotiation',
    tags: ['salary', 'negotiation', 'offer', 'compensation'],
    author: 'Surya L',
    datePublished: '2026-06-09',
    dateModified: '2026-06-09',
    readingTime: 13,
    publishAt: '2026-06-09T05:33:00Z',
  },
  {
    slug: 'resume-not-getting-callbacks',
    title: 'Why Your Resume Is Not Getting Callbacks: 15 Reasons (2026)',
    excerpt: 'Callback funnel math, 15 specific reasons (content, format, fit, targeting, timing), and a 5-minute self-audit that fixes most.',
    category: 'ats-keywords',
    tags: ['ats', 'callbacks', 'rejection', 'audit'],
    author: 'Surya L',
    datePublished: '2026-06-11',
    dateModified: '2026-06-11',
    readingTime: 11,
    publishAt: '2026-06-11T04:47:00Z',
  },
  {
    slug: 'military-civilian-resume',
    title: 'Military to Civilian Resume: India + US Guide (2026)',
    excerpt: 'Translate MOS, rank, and deployments into civilian language. Skills matrix, 6 certifications, 3 worked summaries, veteran hiring programs.',
    category: 'career-transitions',
    tags: ['veteran', 'military', 'transition', 'career-change'],
    author: 'Surya L',
    datePublished: '2026-06-14',
    dateModified: '2026-06-14',
    readingTime: 12,
    publishAt: '2026-06-14T06:01:00Z',
  },
  {
    slug: 'chatgpt-prompts-resume',
    title: '50 ChatGPT Prompts for Resume Writing (2026)',
    excerpt: '50 copy-paste prompts grouped by task: summary, bullet rewrites, skills, cover letter, tailoring, JD matching. Plus 5 tips to get better output.',
    category: 'ai-resume',
    tags: ['chatgpt', 'ai', 'prompts', 'resume-writing'],
    author: 'Surya L',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    readingTime: 14,
    publishAt: '2026-06-16T04:52:00Z',
  },
  {
    slug: 'gpa-on-resume',
    title: 'Should You Put GPA on a Resume? (2026 Guide)',
    excerpt: 'When GPA helps, when it hurts, and how to format it for US, UK, and Indian resumes. Plus what to do if your GPA is below the cutoff.',
    category: 'resume-writing',
    tags: ['gpa', 'cgpa', 'education', 'fresher'],
    author: 'Surya L',
    datePublished: '2026-06-18',
    dateModified: '2026-06-18',
    readingTime: 9,
    publishAt: '2026-06-18T05:48:00Z',
  },
  {
    slug: 'freelance-resume',
    title: 'Freelance Resume: How to Sell Self-Employment (2026)',
    excerpt: 'Frame freelance and contract work so it reads like a career, not a gap. Portfolio-as-Proof pattern, NDA workarounds, 4 worked summaries.',
    category: 'freelance-contract',
    tags: ['freelance', 'contract', 'self-employed', 'portfolio'],
    author: 'Surya L',
    datePublished: '2026-06-21',
    dateModified: '2026-06-21',
    readingTime: 12,
    publishAt: '2026-06-21T05:19:00Z',
  },
  {
    slug: 'claude-prompts-job-search',
    title: '30 Claude Prompts for Job Search (2026)',
    excerpt: '30 ready-to-paste Claude prompts across resume, cover letter, interview, negotiation, LinkedIn, outreach. Context-passing tips, Claude vs ChatGPT.',
    category: 'ai-resume',
    tags: ['claude', 'ai', 'prompts', 'job-search'],
    author: 'Surya L',
    datePublished: '2026-06-23',
    dateModified: '2026-06-23',
    readingTime: 12,
    publishAt: '2026-06-23T05:06:00Z',
  },
  {
    slug: 'resume-headline',
    title: 'How to Write a Resume Headline That Gets Clicks (2026)',
    excerpt: '4-part formula (Role + Specialty + Domain + Metric), 15 examples by role, LinkedIn vs resume differences, and the 6 mistakes that kill a headline.',
    category: 'resume-writing',
    tags: ['headline', 'resume-title', 'positioning', 'first-impression'],
    author: 'Surya L',
    datePublished: '2026-06-25',
    dateModified: '2026-06-25',
    readingTime: 9,
    publishAt: '2026-06-25T05:58:00Z',
  },
  {
    slug: 'phd-to-industry-resume',
    title: 'PhD to Industry Resume: The Conversion Guide (2026)',
    excerpt: 'The 3-page-CV to 1-page-resume compression, translating publications and teaching into industry impact, plus 3 worked summaries across career stages.',
    category: 'career-transitions',
    tags: ['phd', 'academia', 'career-transition', 'post-doc'],
    author: 'Surya L',
    datePublished: '2026-06-28',
    dateModified: '2026-06-28',
    readingTime: 13,
    publishAt: '2026-06-28T04:44:00Z',
  },
  {
    slug: 'ai-rewrite-bullets',
    title: 'How to Rewrite Resume Bullets with AI (Before / After Library)',
    excerpt: 'The exact rewrite prompt, 20 before / after pairs across 6 roles, and the 6 hallucination patterns to catch before you hit submit.',
    category: 'ai-resume',
    tags: ['ai', 'bullets', 'rewrite', 'prompt'],
    author: 'Surya L',
    datePublished: '2026-06-30',
    dateModified: '2026-06-30',
    readingTime: 13,
    publishAt: '2026-06-30T05:27:00Z',
  },
  {
    slug: 'leadership-on-resume',
    title: 'How to Describe Leadership on a Resume Without a Title (2026)',
    excerpt: '10 phrases, 8 worked bullets, and the mentorship plus cross-functional framing that show you can step up.',
    category: 'resume-writing',
    tags: ['leadership', 'ic-to-manager', 'mentorship', 'promotion'],
    author: 'Surya L',
    datePublished: '2026-07-02',
    dateModified: '2026-07-02',
    readingTime: 11,
    publishAt: '2026-07-02T04:41:00Z',
  },
  {
    slug: 'resume-international-jobs',
    title: 'Resume for International Jobs: H1B, UK, Canada (2026)',
    excerpt: 'Regional conventions across 6 markets, exactly how to state visa context, and the timezone note that makes remote applications credible.',
    category: 'remote-global',
    tags: ['international', 'h1b', 'uk-visa', 'canada-pr', 'remote'],
    author: 'Surya L',
    datePublished: '2026-07-05',
    dateModified: '2026-07-05',
    readingTime: 14,
    publishAt: '2026-07-05T06:02:00Z',
  },
  {
    slug: 'grammarly-resume-review',
    title: 'Grammarly for Resumes: Does It Actually Help? (2026)',
    excerpt: 'What Grammarly catches, what it misses, 5 situations where it hurts, and whether Premium is worth it for resumes.',
    category: 'ai-resume',
    tags: ['grammarly', 'proofreading', 'ai-tools', 'editing'],
    author: 'Surya L',
    datePublished: '2026-07-07',
    dateModified: '2026-07-07',
    readingTime: 10,
    publishAt: '2026-07-07T05:39:00Z',
  },
  {
    slug: 'certifications-on-resume',
    title: 'How to List Certifications on a Resume by Field (2026)',
    excerpt: '6 format fields, top 5 certs for 8 fields (Tech, Cloud, PM, Finance, HR, Marketing, Healthcare, Sales), and expired-cert strategy.',
    category: 'resume-writing',
    tags: ['certifications', 'credentials', 'formatting', 'ats'],
    author: 'Surya L',
    datePublished: '2026-07-09',
    dateModified: '2026-07-09',
    readingTime: 11,
    publishAt: '2026-07-09T04:48:00Z',
  },
  {
    slug: 'board-advisor-resume',
    title: 'Resume for a Board Seat or Advisor Role (2026)',
    excerpt: 'How board CVs differ from executive resumes, the 3-section bio structure, governance framing, and 3 worked summaries.',
    category: 'career-growth',
    tags: ['board', 'advisor', 'director', 'governance'],
    author: 'Surya L',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    readingTime: 12,
    publishAt: '2026-07-12T05:52:00Z',
  },
  {
    slug: 'icims-taleo-resume',
    title: 'iCIMS and Taleo: Legacy ATS Rules That Still Apply (2026)',
    excerpt: 'iCIMS and Taleo still power hiring at hundreds of Fortune 500 companies. 8 rules, platform differences, mistakes that drop your match score.',
    category: 'ats-keywords',
    tags: ['iCIMS', 'Taleo', 'legacy-ATS', 'resume-parsing'],
    author: 'Surya L',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
    readingTime: 11,
    publishAt: '2026-07-14T04:53:00Z',
  },
  {
    slug: 'side-projects-on-resume',
    title: 'How to Show Side Projects on Your Resume (2026)',
    excerpt: 'Which side projects belong on a resume, where to place them by career stage, how to write the bullet, and the 6 mistakes that turn projects into filler.',
    category: 'resume-writing',
    tags: ['projects', 'GitHub', 'freshers', 'portfolio'],
    author: 'Surya L',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
    readingTime: 11,
    publishAt: '2026-07-16T05:41:00Z',
  },
  {
    slug: 'naukri-vs-linkedin-india',
    title: 'Naukri vs LinkedIn vs Instahyre: Indian Job Boards Compared (2026)',
    excerpt: 'Naukri is volume. LinkedIn is narrative. Instahyre is curation. Which platform fits your stage.',
    category: 'india-hiring',
    tags: ['Naukri', 'LinkedIn', 'Instahyre', 'India', 'job-boards'],
    author: 'Surya L',
    datePublished: '2026-07-19',
    dateModified: '2026-07-19',
    readingTime: 12,
    publishAt: '2026-07-19T05:17:00Z',
  },
  {
    slug: 'resume-objective-vs-summary',
    title: 'Resume Objective vs Summary: When to Use Each (2026)',
    excerpt: 'Objective or summary? Use summary above 2 years, objective for freshers, changers, returnships. 8 weak-vs-strong examples.',
    category: 'resume-writing',
    tags: ['objective', 'summary', 'fresher', 'career-change'],
    author: 'Surya L',
    datePublished: '2026-07-21',
    dateModified: '2026-07-21',
    readingTime: 9,
    publishAt: '2026-07-21T04:45:00Z',
  },
  {
    slug: 'hobbies-on-resume',
    title: 'Resume Hobbies and Interests: When They Actually Help (2026)',
    excerpt: 'Hobbies help in 5 situations and hurt in 5 others. 30 high-signal hobbies, the ones to skip, the 3-line format.',
    category: 'resume-writing',
    tags: ['hobbies', 'interests', 'fresher', 'formatting'],
    author: 'Surya L',
    datePublished: '2026-07-23',
    dateModified: '2026-07-23',
    readingTime: 9,
    publishAt: '2026-07-23T05:56:00Z',
  },
  {
    slug: 'resume-indian-govt-jobs',
    title: 'Resume for Indian Government Jobs: UPSC, SSC, Railways (2026)',
    excerpt: 'Government resume playbook for UPSC DAF, SSC, RRB, PSU, Banking, Defence. 10 mandatory sections, format rules, 8 rejection-causing mistakes.',
    category: 'india-hiring',
    tags: ['upsc', 'ssc', 'railways', 'psu', 'government', 'india'],
    author: 'Surya L',
    datePublished: '2026-07-26',
    dateModified: '2026-07-26',
    readingTime: 12,
    publishAt: '2026-07-26T05:22:00Z',
  },
  {
    slug: 'one-column-vs-two-column-resume',
    title: '1-Column vs 2-Column Resume: Which Is Better for ATS? (2026)',
    excerpt: 'Direct answer based on actual ATS parsing across Workday, Taleo, Greenhouse, Lever, iCIMS, SAP SuccessFactors.',
    category: 'resume-writing',
    tags: ['ats', 'formatting', 'columns', 'layout'],
    author: 'Surya L',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    readingTime: 10,
    publishAt: '2026-07-28T04:51:00Z',
  },
  {
    slug: 'iit-placement-resume',
    title: 'IIT / NIT Placement Resume Template (2026)',
    excerpt: 'SPO-compliant one-page template with section order, 5 pillars, CSE and Mechanical example bullets, and 7 mistakes that drop you in the stack.',
    category: 'india-hiring',
    tags: ['iit', 'nit', 'placements', 'campus', 'fresher'],
    author: 'Surya L',
    datePublished: '2026-07-30',
    dateModified: '2026-07-30',
    readingTime: 13,
    publishAt: '2026-07-30T05:44:00Z',
  },
  {
    slug: 'jobscan-alternatives',
    title: 'Jobscan Alternatives: What Actually Works in 2026',
    excerpt: '6 alternatives compared on price, keyword depth, ATS simulation, and suggestion quality. Plus red flags that make scores meaningless.',
    category: 'ai-resume',
    tags: ['ats', 'jobscan', 'resume-checker', 'tools'],
    author: 'Surya L',
    datePublished: '2026-08-02',
    dateModified: '2026-08-02',
    readingTime: 11,
    publishAt: '2026-08-02T05:14:00Z',
  },
  {
    slug: 'job-hopping-resume',
    title: 'How to Explain Job Hopping on a Resume (2026)',
    excerpt: 'Short stints are routine in 2026 if you frame them. Line edits, summary hooks, interview scripts that quiet the red flag.',
    category: 'resume-writing',
    tags: ['job-hopping', 'short-stints', 'tenure', 'framing'],
    author: 'Surya L',
    datePublished: '2026-08-04',
    dateModified: '2026-08-04',
    readingTime: 10,
    publishAt: '2026-08-04T04:58:00Z',
  },
  {
    slug: 'indian-unicorn-interview',
    title: 'Razorpay, PhonePe, Swiggy Interview Prep (2026)',
    excerpt: 'Round-by-round breakdown of interview loops at India 3 most active hiring unicorns, with pay bands and resume tactics.',
    category: 'india-hiring',
    tags: ['razorpay', 'phonepe', 'swiggy', 'unicorn', 'india'],
    author: 'Surya L',
    datePublished: '2026-08-06',
    dateModified: '2026-08-06',
    readingTime: 14,
    publishAt: '2026-08-06T05:37:00Z',
  },
  {
    slug: 'notion-resume-template',
    title: 'Notion Resume Template: Free Portfolio Setup (2026)',
    excerpt: 'The 8 blocks every Notion resume needs, a 7-step setup, and why you still need a PDF for every formal application.',
    category: 'ai-resume',
    tags: ['notion', 'portfolio', 'template', 'online-resume'],
    author: 'Surya L',
    datePublished: '2026-08-09',
    dateModified: '2026-08-09',
    readingTime: 11,
    publishAt: '2026-08-09T05:09:00Z',
  },
  {
    slug: 'salary-hike-india',
    title: 'How to Ask for a Salary Hike in India (2026): Data + Scripts',
    excerpt: 'Market data for 7 industry bands, a 5-step formula to compute your ask, 6 word-for-word appraisal scripts, and 7 mistakes.',
    category: 'salary-negotiation',
    tags: ['salary', 'hike', 'negotiation', 'appraisal', 'india'],
    author: 'Surya L',
    datePublished: '2026-08-11',
    dateModified: '2026-08-11',
    readingTime: 12,
    publishAt: '2026-08-11T04:36:00Z',
  },
  {
    slug: 'latex-resume-templates',
    title: 'LaTeX Resume Templates for Engineers on Overleaf (2026)',
    excerpt: '7 Overleaf LaTeX templates ranked by use case, a copy-paste starter file, a 5-minute setup, and 6 layout pitfalls.',
    category: 'ai-resume',
    tags: ['latex', 'overleaf', 'engineering', 'resume-template', 'ats'],
    author: 'Surya L',
    datePublished: '2026-08-13',
    dateModified: '2026-08-13',
    readingTime: 11,
    publishAt: '2026-08-13T05:48:00Z',
  },
  {
    slug: 'linkedin-about-section',
    title: 'LinkedIn About Section: The Full Template (2026)',
    excerpt: 'A 5-beat formula (Hook, Proof, Angle, Looking for, CTA), 6 worked examples from fresher to executive, and the 7 mistakes.',
    category: 'linkedin-brand',
    tags: ['linkedin', 'personal-brand', 'about-section', 'profile'],
    author: 'Surya L',
    datePublished: '2026-08-16',
    dateModified: '2026-08-16',
    readingTime: 12,
    publishAt: '2026-08-16T05:24:00Z',
  },
];

/**
 * "Virtual" posts. Entries that represent the /blog/company-guides hub
 * as a single card in the blog index. Clicking goes to the hub, not a real post.
 */
export interface VirtualPost {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: string;
  badge: string;
}

export const VIRTUAL_POSTS: VirtualPost[] = [
  {
    slug: 'company-guides-hub',
    href: '/blog/company-guides',
    title: '22 Company-Specific Resume Guides',
    excerpt:
      'Full resume guides for Google, Amazon, Microsoft, Meta, Apple, McKinsey, Goldman Sachs, TCS, Infosys, Flipkart, PhonePe, Razorpay, and 10 more. Each includes 15 ATS keywords, 5 insider tips, interview questions, salary benchmarks, and a cover letter template.',
    category: 'company-guides',
    badge: 'Hub',
  },
];

// ─── Helpers ───
//
// Every public getter filters out scheduled-future posts via isPublished().
// Callers that need the full registry (admin, migrations, debugging) should
// import BLOG_POSTS directly. Never do that from a public page; ship hidden
// posts out to Google by mistake.

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return undefined;
  return isPublished(post) ? post : undefined; // future posts appear "missing" to callers
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === categorySlug && isPublished(p));
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured && isPublished(p));
}

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => isPublished(p)).sort((a, b) => b.dateModified.localeCompare(a.dateModified));
}

export function getPostCountByCategory(categorySlug: string): number {
  return BLOG_POSTS.filter((p) => p.category === categorySlug && isPublished(p)).length +
    VIRTUAL_POSTS.filter((p) => p.category === categorySlug).length;
}
