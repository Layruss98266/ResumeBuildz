// Blog topic-cluster definitions.
//
// Structure: 4 parent groups x 7 child categories (Ahrefs-style 2-tier silo).
// Parent groups are navigation-only — they don't have their own route yet
// (pillar pages are a follow-up). Each child category is a real route at
// /blog/category/[slug]. Posts retain their original URLs; the blog hub
// is an index layer, not a URL move.

import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Target,
  Compass,
  MapPin,
  Building2,
  Sparkles,
  MessageSquare,
  Search,
  DollarSign,
  Link2,
  FolderOpen,
  Code2,
  Layers,
  Globe,
  Users,
  Rocket,
  Briefcase,
  GraduationCap,
  Factory,
  TrendingUp,
  Heart,
} from 'lucide-react';

export type ParentGroup = 'resume-ats' | 'job-search' | 'india-hiring' | 'company-guides';

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string; // Tailwind text color class for accents
  bgColor: string; // Tailwind bg color class for accents
  keywords: string[]; // SEO meta keywords for the category page
  parentGroup: ParentGroup;
}

export interface ParentGroupDef {
  slug: ParentGroup;
  name: string;
  tagline: string; // short 1-line description
  color: string; // Tailwind text color
  bgColor: string; // Tailwind bg color
}

export const PARENT_GROUPS: ParentGroupDef[] = [
  {
    slug: 'resume-ats',
    name: 'Resume & ATS',
    tagline: 'Write a resume that gets past the scanners.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    slug: 'job-search',
    name: 'Job Search',
    tagline: 'From application to offer, the job-hunt playbook.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    slug: 'india-hiring',
    name: 'India Hiring',
    tagline: 'Naukri, campus, NQT, and the Indian hiring ecosystem.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    slug: 'company-guides',
    name: 'Company Guides',
    tagline: 'Resume tactics for 22 top global and Indian employers.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  // ───────── RESUME & ATS parent group ─────────
  {
    slug: 'resume-writing',
    name: 'Resume Writing',
    description: 'How to structure, format, and write every section of your resume.',
    longDescription:
      'The foundations of a resume that actually lands interviews — from header format and bullet structure to action verbs, tense consistency, and ATS-friendly layout. Start here if you are writing a resume for the first time or if your current resume is getting zero responses.',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    keywords: ['resume writing', 'resume format', 'how to write a resume', 'resume sections', 'resume bullets'],
    parentGroup: 'resume-ats',
  },
  {
    slug: 'ats-keywords',
    name: 'ATS & Keywords',
    description: 'How Applicant Tracking Systems work and how to write for them.',
    longDescription:
      '98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to screen resumes before a human ever sees them. This cluster covers how ATS parses your resume, which keywords matter, how to score yours against a job description, and the formatting choices that kill parseability.',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    keywords: ['ATS', 'applicant tracking system', 'resume keywords', 'ATS optimization', 'beat ATS'],
    parentGroup: 'resume-ats',
  },
  {
    slug: 'ai-resume',
    name: 'AI Resume Tools',
    description: 'How to use AI to write, improve, and audit your resume.',
    longDescription:
      'AI has transformed resume writing from a 3-hour task to a 30-minute one — if you use it well. This cluster covers prompt patterns for rewriting bullets, how to generate cover letters with Groq/ChatGPT, where AI still makes mistakes, and how to combine AI drafts with your own voice.',
    icon: Sparkles,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    keywords: ['AI resume', 'AI resume writer', 'AI cover letter', 'ChatGPT resume', 'Groq resume'],
    parentGroup: 'resume-ats',
  },

  // ───────── JOB SEARCH parent group ─────────
  {
    slug: 'interviews-cover-letters',
    name: 'Interviews & Cover Letters',
    description: 'Cover letter templates, interview prep, and the outreach that closes the loop.',
    longDescription:
      'Your resume gets you the call; the cover letter and interview close the loop. This cluster covers cover letter structure for 6 industries, interview prep formats (STAR, SOAR, CAR), and the outreach email templates that convert cold applications into conversations.',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    keywords: ['cover letter', 'interview prep', 'STAR format', 'behavioral interview', 'outreach email'],
    parentGroup: 'job-search',
  },
  {
    slug: 'career-transitions',
    name: 'Career Transitions',
    description: 'Resumes for layoffs, gaps, pivots, and re-entry after a break.',
    longDescription:
      'Career transitions require a different resume strategy than standard updates. Whether you are recovering from a layoff, explaining a multi-year gap, pivoting from one field to another, or returning after parental leave — these guides give you the exact framing, wording, and email templates that work.',
    icon: Compass,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    keywords: ['career change', 'layoff recovery', 'career gap', 'career pivot', 'returnship'],
    parentGroup: 'job-search',
  },

  // ───────── INDIA HIRING parent group ─────────
  {
    slug: 'india-hiring',
    name: 'Naukri, Campus & Services',
    description: 'Naukri.com, campus placements, TCS NQT, Infosys InfyTQ, Wipro NTH.',
    longDescription:
      'India has the world\'s largest campus placement system and its own set of hiring rituals: NQT, InfyTQ, NTH, WILP, and Naukri profile optimization. These guides are written specifically for Indian students and early-career professionals navigating IT services, product companies, and campus drives.',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    keywords: ['TCS NQT', 'Infosys InfyTQ', 'Wipro NTH', 'campus placement', 'Naukri resume', 'India hiring'],
    parentGroup: 'india-hiring',
  },

  // ───────── JOB SEARCH parent group (expanded) ─────────
  {
    slug: 'job-search-strategy',
    name: 'Job Search Strategy',
    description: 'Application cadence, outreach, referrals, cold email, follow-ups.',
    longDescription:
      'The mechanics of job hunting that nobody teaches: how many applications per week, how to write cold outreach that actually gets a reply, referral ask templates, follow-up cadence, and the response-rate benchmarks you should be hitting. Built for hunters, not applicants.',
    icon: Search,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    keywords: ['job search strategy', 'job hunting', 'cold email job', 'referral ask', 'application cadence'],
    parentGroup: 'job-search',
  },
  {
    slug: 'salary-negotiation',
    name: 'Salary & Negotiation',
    description: 'Negotiation scripts, hike asks, counter-offers, compensation research.',
    longDescription:
      'Every offer has 10-20 percent of unclaimed upside most candidates leave on the table. These guides cover compensation research tools (Levels, Glassdoor, AmbitionBox), scripted counter-offer lines per scenario, and the exact words that expand your total comp without damaging the relationship.',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    keywords: ['salary negotiation', 'counter offer', 'hike negotiation', 'compensation research', 'negotiation script'],
    parentGroup: 'job-search',
  },
  {
    slug: 'linkedin-brand',
    name: 'LinkedIn & Personal Brand',
    description: 'Profile optimisation, About section, content strategy, connections.',
    longDescription:
      'LinkedIn is the world largest recruiter database. A strong profile makes your resume work 10x harder. These guides cover the 8-point profile readiness check, About section structure that converts recruiter views into InMails, content cadence, and the connection strategies that get you seen.',
    icon: Link2,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    keywords: ['linkedin profile', 'linkedin about section', 'linkedin headline', 'personal brand', 'linkedin content'],
    parentGroup: 'job-search',
  },
  {
    slug: 'portfolio',
    name: 'Portfolio & Online Presence',
    description: 'GitHub, personal site, Behance, Medium, Twitter as portfolio.',
    longDescription:
      'For engineering, design, writing, and content roles, your portfolio is your resume. These guides cover GitHub profile optimisation, portfolio site structure, what to include (and cut), writing case studies that recruiters actually finish, and how to use Twitter or Medium as a builder signal.',
    icon: FolderOpen,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    keywords: ['portfolio website', 'github profile', 'case study resume', 'online portfolio', 'behance portfolio'],
    parentGroup: 'resume-ats',
  },
  {
    slug: 'technical-interview',
    name: 'Technical Interview Prep',
    description: 'DSA, system design, coding rounds, LeetCode patterns.',
    longDescription:
      'Technical interviews have their own discipline. These guides cover DSA pattern libraries (sliding window, two-pointer, DP, graphs), the 10-week LeetCode-to-FAANG plan, system design frameworks for 4 experience levels, and how to handle the coding round without freezing.',
    icon: Code2,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    keywords: ['technical interview', 'system design interview', 'leetcode patterns', 'coding interview prep', 'faang interview'],
    parentGroup: 'job-search',
  },
  {
    slug: 'pm-design-interview',
    name: 'PM & Design Interviews',
    description: 'Product sense, case interviews, design critiques, whiteboard exercises.',
    longDescription:
      'Product and design interviews reward structured thinking under ambiguity. These guides walk through the product-sense frame (CIRCLES, users / needs / solutions), design critique sessions, portfolio presentation structure, and the case-interview patterns used at top PM and design shops.',
    icon: Layers,
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    keywords: ['product manager interview', 'design interview', 'case interview', 'whiteboard design', 'product sense'],
    parentGroup: 'job-search',
  },
  {
    slug: 'remote-global',
    name: 'Remote Work & Global Jobs',
    description: 'Remote-first resumes, timezone, visa paths (H1B, UK, Canada PR).',
    longDescription:
      'Remote and cross-border job hunts need different signals. These guides cover remote-first resume formatting, timezone overlap framing, cover letters for international roles, visa context (H1B, UK Skilled Worker, Canada Express Entry), and the job boards that actually hire globally.',
    icon: Globe,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    keywords: ['remote jobs', 'remote resume', 'h1b visa', 'canada pr', 'uk skilled worker', 'international jobs'],
    parentGroup: 'job-search',
  },
  {
    slug: 'networking',
    name: 'Networking & Referrals',
    description: 'Referral asks, LinkedIn DMs, informational interviews, alumni outreach.',
    longDescription:
      'Referrals convert at 6-10x the rate of cold applications. These guides cover the exact referral ask templates that get responses, informational interview scripts, alumni outreach cadence, and how to build a referral network before you need one.',
    icon: Users,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    keywords: ['referral request', 'linkedin dm template', 'informational interview', 'alumni networking', 'job referral'],
    parentGroup: 'job-search',
  },
  {
    slug: 'onboarding',
    name: 'First 90 Days & Onboarding',
    description: '30-60-90 plans, ramp strategies, first-week playbooks.',
    longDescription:
      'The first 90 days in a new role set the tone for the rest. These guides cover the 30-60-90 day plan template, first-week meeting cadence, relationship-building with cross-functional peers, and how to deliver a visible win by day 60 without burning yourself out.',
    icon: Rocket,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    keywords: ['30 60 90 day plan', 'first 90 days', 'new job ramp', 'onboarding plan', 'first week playbook'],
    parentGroup: 'job-search',
  },
  {
    slug: 'freelance-contract',
    name: 'Freelance & Contract',
    description: 'Proposal writing, freelance resumes, rate setting, client pitches.',
    longDescription:
      'Freelancing and contracting need a different playbook than full-time hunting. These guides cover rate-setting frameworks, proposal writing that closes, freelance resume structure, portfolio-as-proof patterns, and handling 5 to 12 client pipelines without dropping balls.',
    icon: Briefcase,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    keywords: ['freelance resume', 'freelance rate', 'upwork proposal', 'freelance portfolio', 'contractor resume'],
    parentGroup: 'job-search',
  },
  {
    slug: 'student-internship',
    name: 'Student & Internship',
    description: 'Sophomore resumes, first internship, research roles, grad school.',
    longDescription:
      'Student and internship applications get filtered on a different rubric than experienced hires. These guides cover the 5-section student resume, how to write about projects when you have zero work experience, research internship structure, and grad-school application resume differences.',
    icon: GraduationCap,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    keywords: ['student resume', 'internship resume', 'first internship', 'research internship', 'grad school resume'],
    parentGroup: 'job-search',
  },
  {
    slug: 'industry-guides',
    name: 'Industry Deep Dives',
    description: 'Healthcare, legal, finance, hospitality, manufacturing, NGO resumes.',
    longDescription:
      'Each industry has its own conventions, keywords, and unwritten rules. These guides cover per-industry resume patterns across Healthcare, Legal, Finance & Banking, Marketing, Retail, Consulting, Education, Manufacturing, Hospitality, Government / NGO, Nonprofit, and Media.',
    icon: Factory,
    color: 'text-stone-600',
    bgColor: 'bg-stone-50',
    keywords: ['industry resume', 'healthcare resume', 'legal resume', 'finance resume', 'nonprofit resume'],
    parentGroup: 'job-search',
  },
  {
    slug: 'career-growth',
    name: 'Career Growth & Mobility',
    description: 'Promotion case, internal transfers, performance reviews, IC vs manager.',
    longDescription:
      'The biggest salary bumps come from internal moves, not job changes. These guides cover the promotion case doc template, internal transfer playbooks, performance review self-assessments, and the IC-vs-manager decision framework at Staff+ levels.',
    icon: TrendingUp,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    keywords: ['promotion case', 'internal transfer', 'performance review', 'ic vs manager', 'career growth'],
    parentGroup: 'job-search',
  },
  {
    slug: 'wellbeing',
    name: 'Wellbeing & Job Search',
    description: 'Burnout, rejection handling, imposter syndrome, searching while employed.',
    longDescription:
      'A 9-month job search is the norm in 2026. Surviving it without burning out matters as much as any resume tactic. These guides cover pacing strategies, handling rejection, imposter syndrome for career changers, and the ethics of searching while employed.',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    keywords: ['job search burnout', 'handling rejection', 'imposter syndrome', 'searching while employed', 'career wellbeing'],
    parentGroup: 'job-search',
  },

  // ───────── COMPANY GUIDES parent group ─────────
  {
    slug: 'company-guides',
    name: 'Company Deep Dives',
    description: 'Resume guides for Google, Amazon, Microsoft, Flipkart, TCS, and 17 more.',
    longDescription:
      'Every employer has a different screening philosophy. Google cares about measurable scale, Amazon scores on Leadership Principles, McKinsey hunts distinctive achievement, TCS filters on NQT scores. These company-specific guides distill the exact keywords, formatting choices, and tailoring moves that perform best at each employer.',
    icon: Building2,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    keywords: ['Google resume', 'Amazon resume', 'McKinsey resume', 'TCS resume', 'Infosys resume', 'company resume guides'],
    parentGroup: 'company-guides',
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return BLOG_CATEGORIES.map((c) => c.slug);
}

export function getCategoriesByParent(parent: ParentGroup): BlogCategory[] {
  return BLOG_CATEGORIES.filter((c) => c.parentGroup === parent);
}

export function getParentBySlug(slug: ParentGroup): ParentGroupDef | undefined {
  return PARENT_GROUPS.find((p) => p.slug === slug);
}
