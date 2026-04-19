import fs from 'node:fs';
import path from 'node:path';

// Category -> 3 reference links (nofollow).
const REFS = {
  'resume-writing': [
    { href: 'https://www.indeed.com/career-advice/resumes-cover-letters', text: 'Indeed Career Guide: resumes & cover letters' },
    { href: 'https://www.themuse.com/advice/resumes', text: 'The Muse resume advice library' },
    { href: 'https://hbr.org/topic/subject/resumes', text: 'HBR resume and hiring research' },
  ],
  'ats-keywords': [
    { href: 'https://www.jobscan.co/blog', text: 'Jobscan blog on ATS research' },
    { href: 'https://www.workday.com/en-us/resources.html', text: 'Workday resources for candidates' },
    { href: 'https://www.greenhouse.io/blog', text: 'Greenhouse hiring research blog' },
  ],
  'interviews-cover-letters': [
    { href: 'https://www.amazon.jobs/en/principles', text: 'Amazon Leadership Principles (interview signal reference)' },
    { href: 'https://hbr.org/topic/subject/job-interviews', text: 'HBR on job interviews' },
    { href: 'https://www.themuse.com/advice/interviewing', text: 'The Muse interviewing playbooks' },
  ],
  'career-transitions': [
    { href: 'https://www.linkedin.com/business/talent/blog', text: 'LinkedIn Talent Blog on career moves' },
    { href: 'https://hbr.org/topic/subject/managing-yourself', text: 'HBR Managing Yourself archive' },
    { href: 'https://www.themuse.com/advice/changing-careers', text: 'The Muse on changing careers' },
  ],
  'ai-resume': [
    { href: 'https://openai.com/blog', text: 'OpenAI research blog for current model capabilities' },
    { href: 'https://www.jobscan.co/ai-resume-writer', text: 'Jobscan AI resume overview' },
    { href: 'https://www.anthropic.com/news', text: 'Anthropic updates on Claude reasoning behaviour' },
  ],
  'india-hiring': [
    { href: 'https://www.naukri.com/career-guidance', text: 'Naukri Career Guidance hub' },
    { href: 'https://www.ncs.gov.in', text: 'National Career Service (Govt of India) portal' },
    { href: 'https://www.shine.com/career-advice', text: 'Shine career advice archives' },
  ],
};

// slug -> category slug map (from blogPosts.ts). Keep sync with the registry.
const CAT = {
  'pass-ats-resume-scanning': 'ats-keywords',
  'resume-action-verbs': 'resume-writing',
  'resume-length': 'resume-writing',
  'resume-summary-examples': 'resume-writing',
  'resume-format-guide': 'resume-writing',
  'quantify-resume-achievements': 'resume-writing',
  'cover-letter-vs-resume': 'interviews-cover-letters',
  'tailor-resume': 'ats-keywords',
  'best-free-resume-builder': 'ai-resume',
  'ai-resume-builders-tested': 'ai-resume',
  'fresher-resume': 'resume-writing',
  'resume-tips': 'resume-writing',
  'ats-guide': 'ats-keywords',
  'resume-after-layoff': 'career-transitions',
  'resume-after-career-gap': 'career-transitions',
  'resume-for-career-change': 'career-transitions',
  'cover-letter': 'interviews-cover-letters',
  'campus-placement-resume': 'india-hiring',
  'naukri-resume-tips': 'india-hiring',
  'interview-questions-and-answers': 'interviews-cover-letters',
  'resume-skills-list': 'resume-writing',
  'tcs-nqt-resume-guide': 'india-hiring',
  'tell-me-about-yourself': 'interviews-cover-letters',
  'linkedin-url-on-resume': 'resume-writing',
  'infosys-infytq-guide': 'india-hiring',
};

let n = 0;
for (const slug in CAT) {
  const p = path.join('app', slug, 'Content.tsx');
  if (!fs.existsSync(p)) { console.log('missing', p); continue; }
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('id="refs"') || s.includes("id: 'refs'")) { console.log('skip (already has refs)', slug); continue; }
  const refs = REFS[CAT[slug]];
  if (!refs) { console.log('no refs for category', CAT[slug]); continue; }

  // 1. TOC: insert refs entry before faq entry
  s = s.replace(
    /(\s*)\{ id: 'faq', label: 'FAQ' \},/,
    `$1{ id: 'refs', label: 'External references' },$1{ id: 'faq', label: 'FAQ' },`
  );

  // 2. Section: build JSX
  const refItems = refs.map(r => `            <li><a href="${r.href}" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">${r.text}</a></li>`).join('\n');
  const refsSection = `
      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <p className="mb-3 text-sm text-gray-700">Further reading on this topic from independent sources. All external links open in a new tab.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
${refItems}
        </ul>
      </section>

      <section id="faq"`;

  // Replace the first occurrence of the FAQ section opener
  const before = s;
  s = s.replace(/\n\s*<section id="faq"/, refsSection);
  if (s === before) { console.log('FAQ anchor not found', slug); continue; }

  fs.writeFileSync(p, s);
  n++;
}
console.log('patched', n, 'Content.tsx');
