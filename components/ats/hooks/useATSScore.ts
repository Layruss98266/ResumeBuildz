import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ACTION_VERBS } from '../utils/textAnalysis';

export interface ATSCheck {
  label: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  // Section id the user should edit to resolve this check. Keys match the
  // BASE_SECTIONS table in app/builder/page.tsx so the "Fix" button can
  // jump directly to the offending form.
  section?:
    | 'personalInfo'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'projects'
    | 'certifications'
    | 'languages';
}

export interface SectionScore {
  label: string;
  earned: number;
  max: number;
}

export function useATSScore() {
  const { resumeData } = useResumeStore();

  return useMemo(() => {
    const checks: ATSCheck[] = [];
    const sectionScores: SectionScore[] = [];
    let score = 0;
    const maxScore = 100;

    // Weights sum to 100. Contact & experience carry the most weight because
    // ATS parsers reject resumes that are missing either field entirely.
    // Contact 15 | Summary 10 | Experience 25 | Education 15 | Skills 20 | Action Verbs 10 | Quantified 5

    // Contact info completeness (15 pts)
    const { personalInfo } = resumeData;
    const contactFields = [personalInfo.fullName, personalInfo.email, personalInfo.phone, personalInfo.location];
    const contactFilled = contactFields.filter(Boolean).length;
    let contactEarned = 0;
    if (contactFilled === 4) {
      checks.push({ section: 'personalInfo', label: 'Contact Information', status: 'pass', message: 'All essential contact details provided' });
      contactEarned = 15;
    } else if (contactFilled >= 2) {
      checks.push({ section: 'personalInfo', label: 'Contact Information', status: 'warn', message: `Missing ${4 - contactFilled} contact field(s). Add name, email, phone, and location.` });
      contactEarned = 8;
    } else {
      checks.push({ section: 'personalInfo', label: 'Contact Information', status: 'fail', message: 'Missing essential contact information' });
    }
    score += contactEarned;
    sectionScores.push({ label: 'Contact Information', earned: contactEarned, max: 15 });

    // Professional summary (10 pts)
    let summaryEarned = 0;
    if (resumeData.summary.length > 50) {
      checks.push({ section: 'summary', label: 'Professional Summary', status: 'pass', message: 'Good summary length for ATS parsing' });
      summaryEarned = 10;
    } else if (resumeData.summary.length > 0) {
      checks.push({ section: 'summary', label: 'Professional Summary', status: 'warn', message: 'Summary is too short. Aim for 2-4 sentences.' });
      summaryEarned = 5;
    } else {
      checks.push({ section: 'summary', label: 'Professional Summary', status: 'fail', message: 'Add a professional summary to improve ATS matching' });
    }
    score += summaryEarned;
    sectionScores.push({ label: 'Professional Summary', earned: summaryEarned, max: 10 });

    // Work experience (25 pts)
    let experienceEarned = 0;
    if (resumeData.experience.length > 0) {
      const hasDescriptions = resumeData.experience.every((e) => e.highlights.length > 0);
      const hasDates = resumeData.experience.every((e) => e.startDate);
      if (hasDescriptions && hasDates) {
        checks.push({ section: 'experience', label: 'Work Experience', status: 'pass', message: `${resumeData.experience.length} position(s) with descriptions and dates` });
        experienceEarned = 25;
      } else {
        checks.push({ section: 'experience', label: 'Work Experience', status: 'warn', message: 'Add bullet points and dates to all positions' });
        experienceEarned = 15;
      }
    } else {
      checks.push({ section: 'experience', label: 'Work Experience', status: 'fail', message: 'Add at least one work experience entry' });
    }
    score += experienceEarned;
    sectionScores.push({ label: 'Work Experience', earned: experienceEarned, max: 25 });

    // Education (15 pts)
    let educationEarned = 0;
    if (resumeData.education.length > 0) {
      checks.push({ section: 'education', label: 'Education', status: 'pass', message: 'Education section present' });
      educationEarned = 15;
    } else {
      checks.push({ section: 'education', label: 'Education', status: 'warn', message: 'Consider adding education' });
      educationEarned = 5;
    }
    score += educationEarned;
    sectionScores.push({ label: 'Education', earned: educationEarned, max: 15 });

    // Skills (20 pts)
    let skillsEarned = 0;
    if (resumeData.skills.length > 0) {
      const totalSkills = resumeData.skills.reduce((acc, s) => acc + s.items.length, 0);
      if (totalSkills >= 5) {
        checks.push({ section: 'skills', label: 'Skills', status: 'pass', message: `${totalSkills} skills across ${resumeData.skills.length} categories` });
        skillsEarned = 20;
      } else {
        checks.push({ section: 'skills', label: 'Skills', status: 'warn', message: 'Add more skills. ATS systems match keywords from job descriptions.' });
        skillsEarned = 10;
      }
    } else {
      checks.push({ section: 'skills', label: 'Skills', status: 'fail', message: 'Skills section is critical for ATS keyword matching' });
    }
    score += skillsEarned;
    sectionScores.push({ label: 'Skills', earned: skillsEarned, max: 20 });

    // Bullet points with action verbs (10 pts)
    let actionVerbsEarned = 0;
    const allHighlights = resumeData.experience.flatMap((e) => e.highlights);
    const hasActionVerbs = allHighlights.some((h) => ACTION_VERBS.some((v) => h.toLowerCase().includes(v)));
    if (allHighlights.length > 0 && hasActionVerbs) {
      checks.push({ section: 'experience', label: 'Action Verbs', status: 'pass', message: 'Bullet points use strong action verbs' });
      actionVerbsEarned = 10;
    } else if (allHighlights.length > 0) {
      checks.push({ section: 'experience', label: 'Action Verbs', status: 'warn', message: 'Start bullet points with action verbs (Led, Developed, Managed, etc.)' });
      actionVerbsEarned = 5;
    }
    score += actionVerbsEarned;
    sectionScores.push({ label: 'Action Verbs', earned: actionVerbsEarned, max: 10 });

    // Quantified achievements (5 pts)
    let quantifiedEarned = 0;
    // Matches: percentage (50%), dollar amount ($1M), count with plus (10+).
    const hasNumbers = allHighlights.some((h) => /\d+%|\$\d+|\d+\+/.test(h));
    if (hasNumbers) {
      checks.push({ section: 'experience', label: 'Quantified Results', status: 'pass', message: 'Achievements include measurable results' });
      quantifiedEarned = 5;
    } else if (allHighlights.length > 0) {
      checks.push({ section: 'experience', label: 'Quantified Results', status: 'warn', message: 'Add numbers/metrics (e.g., "Increased sales by 25%")' });
    }
    score += quantifiedEarned;
    sectionScores.push({ label: 'Quantified Results', earned: quantifiedEarned, max: 5 });

    return { score: Math.min(score, maxScore), maxScore, checks, sectionScores };
  }, [resumeData]);
}
