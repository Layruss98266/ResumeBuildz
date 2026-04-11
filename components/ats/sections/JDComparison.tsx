'use client';

import { useState, useMemo } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface JDComparisonProps {
  resumeText: string;
  jobDescription: string;
  keywordMatches: { keyword: string; found: boolean }[] | null;
}

export default function JDComparison({ resumeText, jobDescription, keywordMatches }: JDComparisonProps) {
  const [showComparison, setShowComparison] = useState(false);

  const highlightedText = useMemo(() => {
    if (!keywordMatches || !showComparison) return null;

    const foundKeywords = keywordMatches
      .filter((m) => m.found)
      .map((m) => m.keyword)
      .sort((a, b) => b.length - a.length); // Longest first to avoid partial matches

    if (foundKeywords.length === 0) return resumeText;

    // Build a regex that matches any found keyword (case-insensitive)
    const escapedKeywords = foundKeywords.map((kw) =>
      kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const pattern = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');

    const parts = resumeText.split(pattern);

    return parts.map((part, i) => {
      const isMatch = foundKeywords.some(
        (kw) => kw.toLowerCase() === part.toLowerCase()
      );
      if (isMatch) {
        return (
          <span
            key={i}
            className="bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-200 px-0.5 rounded"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }, [resumeText, keywordMatches, showComparison]);

  if (!jobDescription.trim()) {
    return null;
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {showComparison ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
        {showComparison ? 'Hide Comparison' : 'Show Comparison'}
      </button>

      {showComparison && (
        <div className="max-h-[200px] overflow-y-auto rounded-md border border-muted bg-muted/20 p-2 text-xs leading-relaxed scrollbar-thin">
          {highlightedText || (
            <span className="text-muted-foreground">No resume text to display.</span>
          )}
        </div>
      )}
    </div>
  );
}
