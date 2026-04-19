import fs from 'node:fs';
import path from 'node:path';

const slugs = [
  'pass-ats-resume-scanning','resume-action-verbs','resume-length','resume-summary-examples',
  'resume-format-guide','quantify-resume-achievements','cover-letter-vs-resume','tailor-resume',
  'best-free-resume-builder','ai-resume-builders-tested','fresher-resume','resume-tips',
  'ats-guide','resume-after-layoff','resume-after-career-gap','resume-for-career-change',
  'cover-letter','campus-placement-resume','naukri-resume-tips',
  'interview-questions-and-answers','resume-skills-list','tcs-nqt-resume-guide',
  'tell-me-about-yourself','linkedin-url-on-resume','infosys-infytq-guide',
];
let n = 0;
for (const slug of slugs) {
  const p = path.join('app', slug, 'page.tsx');
  if (!fs.existsSync(p)) { console.log('missing', p); continue; }
  let s = fs.readFileSync(p, 'utf8');
  if (/keywords:\s*\[/.test(s)) { console.log('skip (has keywords)', slug); continue; }
  s = s.replace(
    /description: seo\.description,\n(\s*)alternates:/,
    `description: seo.description,\n$1keywords: [seo.primaryKeyword, ...(seo.secondaryKeywords ?? []), ...(seo.longTailKeywords ?? [])].filter(Boolean) as string[],\n$1alternates:`
  );
  fs.writeFileSync(p, s);
  n++;
}
console.log('patched', n, 'page.tsx');
