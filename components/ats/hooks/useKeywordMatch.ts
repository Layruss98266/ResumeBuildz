import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { extractKeywords, getResumeText } from '../utils/textAnalysis';

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  occurrences: number;
}

export interface KeywordMatchResult {
  matches: KeywordMatch[];
  foundCount: number;
  totalCount: number;
  matchPercentage: number;
}

export function useKeywordMatch(jobDescription: string): KeywordMatchResult | null {
  const { resumeData } = useResumeStore();

  return useMemo(() => {
    if (!jobDescription.trim()) return null;

    const jdKeywords = extractKeywords(jobDescription);
    const resumeText = getResumeText(resumeData);

    const matches: KeywordMatch[] = jdKeywords
      .filter((kw) => kw.length >= 3)
      .map((keyword) => {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
        const occurrenceMatches = resumeText.match(regex);
        const occurrences = occurrenceMatches ? occurrenceMatches.length : 0;

        return {
          keyword,
          found: occurrences > 0,
          occurrences,
        };
      })
      // Sort: missing first, then found; within found sort by occurrences descending
      .sort((a, b) => {
        if (a.found !== b.found) return a.found ? 1 : -1;
        return b.occurrences - a.occurrences;
      });

    const foundCount = matches.filter((m) => m.found).length;
    const matchPercentage = matches.length > 0 ? Math.round((foundCount / matches.length) * 100) : 0;

    return { matches, foundCount, totalCount: matches.length, matchPercentage };
  }, [jobDescription, resumeData]);
}
