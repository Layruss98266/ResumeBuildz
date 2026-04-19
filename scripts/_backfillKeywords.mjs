import fs from 'node:fs';

const KW = {
  'pass-ats-resume-scanning': { primary: 'pass ATS resume scanning', secondary: ['applicant tracking system', 'ATS resume tips', 'ATS optimisation'], longTail: ['how to pass ATS resume scanning 2026', 'what keywords ATS looks for', 'does ATS read PDF files', 'top 5 ATS systems used by Fortune 500', 'ATS score check', 'resume parsing errors to fix'] },
  'resume-action-verbs': { primary: 'resume action verbs', secondary: ['strong resume verbs', 'action words for resume', 'power verbs resume', 'resume bullet verbs'], longTail: ['200 resume action verbs list', 'action verbs for leadership resume', 'action verbs for software engineer resume', 'weak to strong verb swap', 'resume verbs by category', 'past tense verbs for resume'] },
  'resume-length': { primary: 'ideal resume length', secondary: ['one page vs two page resume', 'resume pages 2026', 'how long should a resume be'], longTail: ['is a 2 page resume ok', 'resume length for experienced professionals', 'how long should a fresher resume be', 'does ATS care about resume length', 'how to cut resume to one page'] },
  'resume-summary-examples': { primary: 'resume summary examples', secondary: ['professional summary examples', 'resume summary formula', 'resume summary vs objective'], longTail: ['resume summary examples for freshers', 'resume summary examples software engineer', 'resume summary for career change', 'how many words in resume summary', 'resume summary with no experience'] },
  'resume-format-guide': { primary: 'best resume format', secondary: ['chronological resume', 'functional resume', 'hybrid resume format', 'resume format 2026'], longTail: ['chronological vs functional resume', 'which resume format beats ATS', 'best resume format for experienced', 'best resume format for career change', 'resume format for freshers'] },
  'quantify-resume-achievements': { primary: 'quantify resume achievements', secondary: ['resume metrics', 'XYZ formula resume', 'measurable bullets resume'], longTail: ['how to quantify achievements without numbers', 'resume bullets with metrics examples', 'XYZ formula for resume bullets', 'how to add metrics to resume', 'quantified resume examples'] },
  'cover-letter-vs-resume': { primary: 'cover letter vs resume', secondary: ['do you need a cover letter', 'cover letter importance 2026'], longTail: ['is a cover letter necessary in 2026', 'when to skip a cover letter', 'cover letter vs resume differences', 'how long should a cover letter be', 'do recruiters read cover letters'] },
  'tailor-resume': { primary: 'how to tailor a resume', secondary: ['tailored resume', 'resume tailoring', 'JD matching resume'], longTail: ['how to tailor resume in 10 minutes', 'tailor resume for job description', 'AI resume tailoring', 'how much tailoring is too much', 'resume tailoring checklist'] },
  'best-free-resume-builder': { primary: 'best free resume builder', secondary: ['free vs paid resume builder', 'online resume maker', 'ATS resume builder'], longTail: ['free resume builder no paywall', 'best ATS-friendly resume builder', 'open source resume builder', 'resume builder with AI', 'truly free resume builders comparison'] },
  'ai-resume-builders-tested': { primary: 'AI resume builders', secondary: ['AI resume writer', 'ChatGPT resume', 'AI cover letter generator'], longTail: ['best AI resume builder 2026', 'AI resume tools tested', 'does AI resume get rejected', 'can ATS detect AI written resume', 'AI resume hallucinations'] },
  'fresher-resume': { primary: 'fresher resume format', secondary: ['resume for freshers', 'fresher resume template', 'first job resume'], longTail: ['fresher resume format 2026', '7 section fresher resume', 'resume format for BTech freshers', 'fresher resume no experience', 'best resume template for freshers'] },
  'resume-tips': { primary: 'resume writing tips', secondary: ['resume tips', 'resume advice', 'resume mistakes'], longTail: ['resume tips from recruiters', 'how to improve your resume', 'resume writing tips 2026', 'resume tips for freshers', 'resume tips for experienced'] },
  'ats-guide': { primary: 'beat ATS', secondary: ['ATS guide', 'applicant tracking system tips', 'ATS resume optimization'], longTail: ['how to beat applicant tracking system', 'does every company use ATS', 'ATS resume format', 'ATS keyword matching', 'ATS score improvement'] },
  'resume-after-layoff': { primary: 'resume after layoff', secondary: ['layoff resume', 'resume after being laid off', 'resume after tech layoff'], longTail: ['how to explain layoff on resume', 'resume after Meta layoff', 'should I mention layoff on resume', 'resume after company restructuring', 'explaining layoff in cover letter'] },
  'resume-after-career-gap': { primary: 'resume after career gap', secondary: ['resume with gaps', 'career gap resume', 'how to explain gap in resume'], longTail: ['how to explain career gap on resume', 'resume after maternity break', 'resume after 2 year gap', 'career gap resume example', 'hiding career gap on resume'] },
  'resume-for-career-change': { primary: 'resume for career change', secondary: ['career change resume', 'career pivot resume', 'transferable skills resume'], longTail: ['resume for career change examples', 'how to write career change resume', 'transferable skills on resume', 'career change resume template', 'resume for pivoting careers'] },
  'cover-letter': { primary: 'how to write a cover letter', secondary: ['cover letter template', 'cover letter examples', 'cover letter format'], longTail: ['cover letter template 2026', 'cover letter for freshers', 'cover letter vs email', 'how long should a cover letter be', 'cover letter ending examples'] },
  'campus-placement-resume': { primary: 'campus placement resume', secondary: ['campus resume', 'Indian placement resume', 'college placement resume'], longTail: ['campus placement resume 2026', 'resume for TCS NQT', 'resume for InfyTQ', 'resume for Wipro Elite', 'best resume format for placements'] },
  'naukri-resume-tips': { primary: 'Naukri resume tips', secondary: ['Naukri profile', 'Naukri vs LinkedIn India', 'Naukri recruiter views'], longTail: ['how to get more Naukri views', 'Naukri resume keywords', 'optimise Naukri profile 2026', 'Naukri profile headline examples', 'Naukri resume format'] },
  'interview-questions-and-answers': { primary: 'common interview questions', secondary: ['interview questions and answers', 'top interview questions 2026', 'behavioural interview questions'], longTail: ['100 common interview questions with answers', 'behavioural interview questions STAR', 'technical interview questions', 'tricky interview questions', 'interview questions to expect'] },
  'resume-skills-list': { primary: 'how to list skills on resume', secondary: ['resume skills section', 'hard skills resume', 'soft skills resume', 'resume skills by type'], longTail: ['how to list soft skills on resume', 'resume skills section examples', 'list of hard skills for resume', 'how many skills on resume', 'certifications on resume'] },
  'tcs-nqt-resume-guide': { primary: 'TCS NQT resume', secondary: ['TCS NQT 2026', 'TCS NQT syllabus', 'TCS iON resume', 'TCS Ninja resume'], longTail: ['TCS NQT resume format', 'TCS NQT process 2026', 'TCS NQT interview questions', 'TCS Ninja vs Digital', 'TCS NQT cut off'] },
  'tell-me-about-yourself': { primary: 'tell me about yourself', secondary: ['tell me about yourself answer', 'elevator pitch', 'self introduction interview'], longTail: ['tell me about yourself examples', 'tell me about yourself fresher', '60 second pitch interview', 'self introduction in interview', 'tell me about yourself sample answer'] },
  'linkedin-url-on-resume': { primary: 'LinkedIn URL on resume', secondary: ['LinkedIn on resume', 'LinkedIn profile on resume', 'resume contact info'], longTail: ['should I put LinkedIn on resume', 'how to add LinkedIn to resume', 'LinkedIn URL format', 'resume header LinkedIn', 'should resume have GitHub and LinkedIn'] },
  'infosys-infytq-guide': { primary: 'Infosys InfyTQ', secondary: ['InfyTQ certification', 'Infosys Springboard', 'HackWithInfy'], longTail: ['Infosys InfyTQ 2026', 'InfyTQ foundation syllabus', 'InfyTQ advanced certification', 'HackWithInfy rounds', 'Infosys Systems Engineer'] },
};

const p = 'lib/blogSeo.ts';
let s = fs.readFileSync(p, 'utf8');
let n = 0;
for (const slug in KW) {
  const e = KW[slug];
  const esc = slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const re = new RegExp(`(  '${esc}':\\s*\\{[\\s\\S]*?dateModified:\\s*'[^']+',\\n)`);
  const m = s.match(re);
  if (!m) { console.log('NOT FOUND', slug); continue; }
  if (m[0].includes('primaryKeyword')) { console.log('skip (already has)', slug); continue; }
  const ins = `    primaryKeyword: '${e.primary}',\n    secondaryKeywords: ${JSON.stringify(e.secondary)},\n    longTailKeywords: ${JSON.stringify(e.longTail)},\n`;
  s = s.replace(re, m[0] + ins);
  n++;
}
fs.writeFileSync(p, s);
console.log('patched', n, 'entries');
