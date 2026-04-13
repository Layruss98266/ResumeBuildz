import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export interface PassiveVoiceFlag {
  text: string;
  match: string;
  suggestion: string;
}

const PASSIVE_PATTERNS = [
  /\b(was|were|been|being|is|are)\s+\w+(ed|en)\b/gi,
];

const PASSIVE_PHRASES: { pattern: RegExp; suggestion: string }[] = [
  { pattern: /\bwas responsible for\b/gi, suggestion: 'Managed / Led / Oversaw' },
  { pattern: /\bwas tasked with\b/gi, suggestion: 'Executed / Handled / Delivered' },
  { pattern: /\bduties included\b/gi, suggestion: 'Led / Managed / Performed' },
  { pattern: /\bwas assigned to\b/gi, suggestion: 'Took ownership of / Drove' },
  { pattern: /\bwas involved in\b/gi, suggestion: 'Contributed to / Participated in / Drove' },
  { pattern: /\bwas given\b/gi, suggestion: 'Received / Earned' },
  { pattern: /\bwas promoted to\b/gi, suggestion: 'Earned promotion to / Advanced to' },
  { pattern: /\bwas selected\b/gi, suggestion: 'Earned selection / Chosen to' },
  { pattern: /\bwere responsible for\b/gi, suggestion: 'Managed / Oversaw' },
  { pattern: /\bhave been\s+\w+(ed|en)\b/gi, suggestion: 'Use active past tense (e.g., "Achieved" instead of "have been achieved")' },
  { pattern: /\bresponsible for\b/gi, suggestion: 'Managed / Led / Drove' },
];

function suggestActiveAlternative(match: string): string {
  const lower = match.toLowerCase();

  // Check known phrases first
  for (const { pattern, suggestion } of PASSIVE_PHRASES) {
    if (pattern.test(lower)) {
      // Reset regex lastIndex since we use the global flag
      pattern.lastIndex = 0;
      return suggestion;
    }
  }

  // Generic passive voice suggestions based on the auxiliary verb
  if (/\bwas\s+\w+ed\b/i.test(match)) {
    return 'Rewrite in active voice: start with an action verb (e.g., "Developed" instead of "was developed")';
  }
  if (/\bwere\s+\w+ed\b/i.test(match)) {
    return 'Rewrite in active voice: start with an action verb (e.g., "Implemented" instead of "were implemented")';
  }
  if (/\bbeen\s+\w+ed\b/i.test(match)) {
    return 'Remove "been" and use past tense directly (e.g., "Completed" instead of "been completed")';
  }
  if (/\bbeing\s+\w+ed\b/i.test(match)) {
    return 'Use active present or past tense instead';
  }

  return 'Rewrite using an active voice construction starting with an action verb';
}

export function useActiveVoice(): PassiveVoiceFlag[] {
  const { resumeData } = useResumeStore();

  return useMemo(() => {
    const flags: PassiveVoiceFlag[] = [];
    const allHighlights = resumeData.experience.flatMap((e) => e.highlights);

    for (const highlight of allHighlights) {
      if (!highlight.trim()) continue;

      // Check known passive phrases first
      for (const { pattern, suggestion } of PASSIVE_PHRASES) {
        const phraseRegex = new RegExp(pattern.source, pattern.flags);
        let phraseMatch: RegExpExecArray | null;
        while ((phraseMatch = phraseRegex.exec(highlight)) !== null) {
          // Avoid duplicate flags for the same match region
          const alreadyFlagged = flags.some(
            (f) => f.text === highlight && f.match === phraseMatch![0]
          );
          if (!alreadyFlagged) {
            flags.push({
              text: highlight,
              match: phraseMatch[0],
              suggestion,
            });
          }
        }
      }

      // Check generic passive voice patterns
      for (const pattern of PASSIVE_PATTERNS) {
        const genericRegex = new RegExp(pattern.source, pattern.flags);
        let regexMatch: RegExpExecArray | null;
        while ((regexMatch = genericRegex.exec(highlight)) !== null) {
          const matchedText = regexMatch[0];
          // Skip if this match overlaps with a phrase already flagged
          const alreadyFlagged = flags.some(
            (f) => f.text === highlight && f.match.toLowerCase().includes(matchedText.toLowerCase())
          );
          if (!alreadyFlagged) {
            flags.push({
              text: highlight,
              match: matchedText,
              suggestion: suggestActiveAlternative(matchedText),
            });
          }
        }
      }
    }

    return flags;
  }, [resumeData]);
}
