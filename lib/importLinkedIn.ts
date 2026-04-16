// LinkedIn JSON → ResumeData importer.
//
// Accepts three shapes (auto-detected):
//
//   A) LinkedIn Data Export JSON (if user uses a browser extension like
//      "LinkedIn Profile to JSON" or the LinkedIn Recruiter API shape).
//
//   B) LinkedIn "copy-all" profile CSV columns glued into a JSON object
//      (Profile.csv, Positions.csv, Education.csv, Skills.csv combined).
//
//   C) Generic resume JSON matching the JSON Resume spec (jsonresume.org)
//      which many LinkedIn-to-JSON tools output.
//
// All shapes map cleanly to ResumeData. Unknown fields are dropped.

import type { ResumeData, Experience, Education, Skill, Certification, Language, Project } from '@/types/resume';
import { defaultResumeData } from '@/types/resume';

function id(prefix: string, i: number): string { return `${prefix}-${i + 1}`; }

function toYearMonth(input: unknown): string {
  if (!input) return '';
  if (typeof input === 'string') return input.slice(0, 7);
  if (typeof input === 'object' && input !== null) {
    const o = input as Record<string, unknown>;
    const y = o.year ?? o.Year;
    const m = o.month ?? o.Month;
    if (y && m) return `${y}-${String(m).padStart(2, '0')}`;
    if (y) return `${y}-01`;
  }
  return '';
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function firstArray(obj: Record<string, unknown>, keys: string[]): unknown[] {
  for (const k of keys) {
    const v = obj[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

interface RawPosition {
  [k: string]: unknown;
}

function mapExperience(raw: RawPosition[]): Experience[] {
  return raw.map((r, i): Experience => {
    const highlights = Array.isArray(r.highlights) ? r.highlights.map(str).filter(Boolean) : [];
    const desc = str(r.description ?? r.summary ?? r.Description ?? r.Summary);
    // If description is multi-line, split into bullets.
    const extraBullets = highlights.length > 0 ? [] : desc.split('\n').map((l) => l.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
    return {
      id: id('exp', i),
      company: str(r.company ?? r.companyName ?? r.Company ?? r['Company Name']),
      position: str(r.position ?? r.title ?? r.Title ?? r['Position']),
      location: str(r.location ?? r.Location),
      startDate: toYearMonth(r.startDate ?? r.startDateTime ?? r['Started On']),
      endDate: toYearMonth(r.endDate ?? r.endDateTime ?? r['Finished On']),
      current: !r.endDate && !r.endDateTime && !r['Finished On'],
      description: extraBullets.length > 0 ? '' : desc,
      highlights: highlights.length > 0 ? highlights : extraBullets.length > 1 ? extraBullets : (desc ? [desc] : []),
    };
  });
}

interface RawEducation {
  [k: string]: unknown;
}

function mapEducation(raw: RawEducation[]): Education[] {
  return raw.map((r, i): Education => ({
    id: id('edu', i),
    institution: str(r.institution ?? r.schoolName ?? r.school ?? r['School Name']),
    degree: str(r.degree ?? r.degreeName ?? r['Degree Name']),
    field: str(r.field ?? r.fieldOfStudy ?? r['Field Of Study']),
    location: str(r.location),
    startDate: toYearMonth(r.startDate ?? r['Start Date']),
    endDate: toYearMonth(r.endDate ?? r['End Date']),
    gpa: str(r.gpa ?? r.grade ?? r.GPA),
    highlights: Array.isArray(r.highlights) ? r.highlights.map(str).filter(Boolean) : [],
  }));
}

interface RawSkill {
  name?: unknown;
  Name?: unknown;
  skill?: unknown;
}

function mapSkills(raw: (string | RawSkill)[]): Skill[] {
  const items = raw
    .map((r) => (typeof r === 'string' ? r : str(r.name ?? r.Name ?? r.skill)))
    .filter(Boolean);
  if (items.length === 0) return [];
  return [{ id: 'skill-1', category: 'Skills', items }];
}

interface RawCert {
  [k: string]: unknown;
}

function mapCerts(raw: RawCert[]): Certification[] {
  return raw.map((r, i): Certification => ({
    id: id('cert', i),
    name: str(r.name ?? r.Name ?? r.certification),
    issuer: str(r.authority ?? r.issuer ?? r.Authority ?? r.Issuer ?? r['Issuing Organization']),
    date: toYearMonth(r.startDate ?? r.issueDate ?? r['Started On']),
    expiryDate: toYearMonth(r.endDate ?? r.expirationDate ?? r['Finished On']),
    credentialId: str(r.licenseNumber ?? r.credentialId ?? r['License Number']),
    url: str(r.url ?? r.Url ?? r.credentialUrl),
  }));
}

interface RawLang {
  [k: string]: unknown;
}

function mapLangs(raw: RawLang[]): Language[] {
  const PROF_MAP: Record<string, Language['proficiency']> = {
    native: 'Native',
    native_or_bilingual: 'Native',
    professional_working: 'Advanced',
    full_professional: 'Fluent',
    limited_working: 'Intermediate',
    elementary: 'Basic',
  };
  return raw.map((r, i): Language => {
    const raw = String(r.proficiency ?? r.Proficiency ?? '').toLowerCase().replace(/\s+/g, '_');
    return {
      id: id('lang', i),
      name: str(r.name ?? r.Name ?? r.language),
      proficiency: PROF_MAP[raw] ?? (raw as Language['proficiency']) ?? '',
    };
  });
}

interface RawProject {
  [k: string]: unknown;
}

function mapProjects(raw: RawProject[]): Project[] {
  return raw.map((r, i): Project => ({
    id: id('proj', i),
    name: str(r.name ?? r.title ?? r.Title),
    description: str(r.description ?? r.Description),
    technologies: Array.isArray(r.technologies) ? r.technologies.map(str).filter(Boolean) : [],
    link: str(r.url ?? r.Url ?? r.link),
    startDate: toYearMonth(r.startDate),
    endDate: toYearMonth(r.endDate),
    highlights: Array.isArray(r.highlights) ? r.highlights.map(str).filter(Boolean) : [],
  }));
}

export interface LinkedInImportResult {
  success: boolean;
  data?: ResumeData;
  error?: string;
}

export function parseLinkedInJson(input: string): LinkedInImportResult {
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(input) as Record<string, unknown>;
  } catch {
    return { success: false, error: 'Not valid JSON. Paste the raw JSON contents only.' };
  }

  if (!parsed || typeof parsed !== 'object') {
    return { success: false, error: 'JSON must be an object.' };
  }

  // Some exports nest the profile under .profile or .basics
  const profile = (parsed.profile ?? parsed.basics ?? parsed) as Record<string, unknown>;
  const personalInfo = {
    fullName: str(profile.fullName ?? profile.name ?? (profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : '')),
    jobTitle: str(profile.headline ?? profile.title ?? profile.label ?? profile.occupation),
    email: str(profile.email ?? profile.emailAddress),
    phone: str(profile.phone ?? profile.phoneNumber),
    location: str(profile.location ?? profile.locationName ?? profile.address),
    linkedin: str(profile.publicProfileUrl ?? profile.url ?? profile.profileUrl ?? profile.linkedin),
    website: str(profile.website ?? profile.websites),
    github: str(profile.github ?? ''),
    photo: '', // Never import remote photos — security fix in place.
  };

  const experience = mapExperience(firstArray(parsed, ['positions', 'experience', 'work', 'Experience']) as RawPosition[]);
  const education = mapEducation(firstArray(parsed, ['educations', 'education', 'schools', 'Education']) as RawEducation[]);
  const skills = mapSkills(firstArray(parsed, ['skills', 'Skills']) as (string | RawSkill)[]);
  const certifications = mapCerts(firstArray(parsed, ['certifications', 'licenses', 'Licenses']) as RawCert[]);
  const languages = mapLangs(firstArray(parsed, ['languages', 'Languages']) as RawLang[]);
  const projects = mapProjects(firstArray(parsed, ['projects', 'Projects']) as RawProject[]);
  const summary = str(profile.summary ?? profile.about ?? profile.Summary);

  // Require at least a name or one position for the import to be meaningful.
  if (!personalInfo.fullName && experience.length === 0) {
    return { success: false, error: 'No name or positions found. Check the JSON shape.' };
  }

  const data: ResumeData = {
    ...defaultResumeData,
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
  };

  return { success: true, data };
}
