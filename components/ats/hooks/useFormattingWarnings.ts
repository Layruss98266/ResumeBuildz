import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export interface FormattingWarning {
  type: 'ats-breaking' | 'bullet-consistency' | 'empty-highlight';
  message: string;
  details: string;
}

const ATS_BREAKING_CHARS: { pattern: RegExp; name: string; replacement: string }[] = [
  { pattern: /[\u2018\u2019]/g, name: 'smart single quotes', replacement: "'" },
  { pattern: /[\u201C\u201D]/g, name: 'smart double quotes', replacement: '"' },
  { pattern: /\u2014/g, name: 'em dashes', replacement: '--' },
  { pattern: /\u2013/g, name: 'en dashes', replacement: '-' },
  { pattern: /\u00A0/g, name: 'non-breaking spaces', replacement: ' ' },
  { pattern: /\u2026/g, name: 'ellipsis characters', replacement: '...' },
  { pattern: /[\u2022\u2023\u25E6\u2043\u2219]/g, name: 'special bullet characters', replacement: '-' },
];

export function useFormattingWarnings(): FormattingWarning[] {
  const { resumeData } = useResumeStore();

  return useMemo(() => {
    const warnings: FormattingWarning[] = [];

    // Collect all text content for ATS-breaking character check
    const allText = [
      resumeData.summary,
      ...resumeData.experience.flatMap((e) => [e.description, ...e.highlights]),
      ...resumeData.education.flatMap((e) => e.highlights),
      ...resumeData.projects.flatMap((p) => [p.description, ...p.highlights]),
    ].join(' ');

    // Check for ATS-breaking characters
    for (const { pattern, name, replacement } of ATS_BREAKING_CHARS) {
      const matches = allText.match(pattern);
      if (matches) {
        warnings.push({
          type: 'ats-breaking',
          message: `Found ${matches.length} ${name} that may confuse ATS parsers`,
          details: `Replace with standard characters (${replacement}). ATS systems may misread or strip special characters.`,
        });
      }
    }

    // Check bullet/highlight consistency across all experience entries
    const allHighlights = resumeData.experience.flatMap((e) => e.highlights);

    if (allHighlights.length > 1) {
      // Check if all start with a capital letter
      const nonEmpty = allHighlights.filter((h) => h.trim().length > 0);
      const startsWithCapital = nonEmpty.filter((h) => /^[A-Z]/.test(h.trim()));
      if (startsWithCapital.length > 0 && startsWithCapital.length < nonEmpty.length) {
        const lowercaseCount = nonEmpty.length - startsWithCapital.length;
        warnings.push({
          type: 'bullet-consistency',
          message: `${lowercaseCount} bullet point(s) do not start with a capital letter`,
          details: 'Start all bullet points with a capital letter for consistency and professionalism.',
        });
      }

      // Check period consistency: either all end with period or none do
      const endsWithPeriod = nonEmpty.filter((h) => h.trim().endsWith('.'));
      if (endsWithPeriod.length > 0 && endsWithPeriod.length < nonEmpty.length) {
        warnings.push({
          type: 'bullet-consistency',
          message: 'Inconsistent use of periods at the end of bullet points',
          details: `${endsWithPeriod.length} of ${nonEmpty.length} bullets end with a period. Either add periods to all bullets or remove them from all for consistency.`,
        });
      }
    }

    // Check for empty highlights in experience
    for (const exp of resumeData.experience) {
      const emptyCount = exp.highlights.filter((h) => h.trim().length === 0).length;
      if (emptyCount > 0) {
        warnings.push({
          type: 'empty-highlight',
          message: `${emptyCount} empty bullet point(s) in "${exp.position}" at ${exp.company}`,
          details: 'Remove empty bullet points or add content. Empty highlights waste space and may confuse ATS parsers.',
        });
      }
    }

    // Also check project highlights for empty entries
    for (const project of resumeData.projects) {
      const emptyCount = project.highlights.filter((h) => h.trim().length === 0).length;
      if (emptyCount > 0) {
        warnings.push({
          type: 'empty-highlight',
          message: `${emptyCount} empty bullet point(s) in project "${project.name}"`,
          details: 'Remove empty bullet points or add content.',
        });
      }
    }

    return warnings;
  }, [resumeData]);
}
