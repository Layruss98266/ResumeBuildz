import { ResumeData } from '@/types/resume';

export const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall',
  'should', 'may', 'might', 'must', 'can', 'could', 'of', 'in', 'to', 'for', 'with',
  'on', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'about',
  'also', 'well', 'up', 'you', 'your', 'we', 'our', 'they', 'their', 'this',
  'that', 'these', 'those', 'it', 'its', 'i', 'me', 'my', 'myself', 'he', 'him',
  'his', 'she', 'her', 'who', 'whom', 'which', 'what', 'if', 'while', 'etc',
  'ability', 'experience', 'work', 'working', 'role', 'team', 'years', 'year',
  'including', 'strong', 'looking', 'seeking', 'join', 'apply', 'position',
  'company', 'required', 'preferred', 'qualifications', 'requirements',
  'responsibilities', 'benefits', 'salary', 'equal', 'opportunity', 'employer',
]);

export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s\-+#.]/g, ' ').split(/\s+/);
  const keywords = new Set<string>();

  for (const word of words) {
    const clean = word.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');
    if (clean.length >= 2 && !STOP_WORDS.has(clean)) {
      keywords.add(clean);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`.replace(/[^a-z0-9\s\-+#.]/g, '').trim();
    if (bigram.length >= 5 && /[a-z]/.test(bigram)) {
      keywords.add(bigram);
    }
  }

  return Array.from(keywords);
}

export function getResumeText(resumeData: ResumeData): string {
  const parts: string[] = [
    resumeData.personalInfo.fullName,
    resumeData.personalInfo.jobTitle,
    resumeData.summary,
    ...resumeData.experience.flatMap((e) => [e.position, e.company, e.description, ...e.highlights]),
    ...resumeData.education.flatMap((e) => [e.institution, e.degree, e.field, ...e.highlights]),
    ...resumeData.skills.flatMap((s) => [s.category, ...s.items]),
    ...resumeData.projects.flatMap((p) => [p.name, p.description, ...p.technologies, ...p.highlights]),
    ...resumeData.certifications.map((c) => `${c.name} ${c.issuer}`),
    ...resumeData.languages.map((l) => l.name),
  ];
  return parts.join(' ').toLowerCase();
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
