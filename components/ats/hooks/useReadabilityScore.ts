import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { getResumeTextPreservingSentences, countWords, countSyllables } from '../utils/textAnalysis';

export interface ReadabilityResult {
  score: number;
  level: string;
  description: string;
}

function getReadabilityLevel(score: number): { level: string; description: string } {
  if (score >= 80) {
    return { level: 'Very Easy', description: 'Text is very easy to read. Consider adding more technical depth where appropriate.' };
  }
  if (score >= 70) {
    return { level: 'Easy', description: 'Text is easy to read and accessible to a wide audience.' };
  }
  if (score >= 60) {
    return { level: 'Standard (Ideal)', description: 'Ideal readability for professional resumes. Clear and concise.' };
  }
  if (score >= 50) {
    return { level: 'Complex', description: 'Text may be hard to scan quickly. Consider simplifying sentence structure.' };
  }
  return { level: 'Too Complex', description: 'Text is difficult to read. Use shorter sentences and simpler words.' };
}

export function useReadabilityScore(): ReadabilityResult {
  const { resumeData } = useResumeStore();

  return useMemo(() => {
    const text = getResumeTextPreservingSentences(resumeData);

    if (!text.trim()) {
      return { score: 0, level: 'N/A', description: 'Add content to your resume to calculate readability.' };
    }

    // Count sentences by splitting on sentence-ending punctuation followed by whitespace
    const sentences = text.split(/[.!?]+\s+/).filter((s) => s.trim().length > 0);
    const sentenceCount = Math.max(sentences.length, 1);

    // Count total words
    const wordCount = countWords(text);
    if (wordCount === 0) {
      return { score: 0, level: 'N/A', description: 'Add content to your resume to calculate readability.' };
    }

    // Count total syllables
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    let totalSyllables = 0;
    for (const word of words) {
      totalSyllables += countSyllables(word);
    }

    // Flesch-Kincaid readability formula
    const rawScore = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);

    // Clamp between 0 and 100
    const score = Math.round(Math.max(0, Math.min(100, rawScore)));

    const { level, description } = getReadabilityLevel(score);

    return { score, level, description };
  }, [resumeData]);
}
