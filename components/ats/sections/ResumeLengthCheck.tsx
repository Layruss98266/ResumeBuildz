'use client';

import { useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { getResumeText, countWords } from '../utils/textAnalysis';

function getZoneColor(wordCount: number): string {
  if (wordCount < 300) return 'text-red-600';
  if (wordCount <= 700) return 'text-green-600';
  return 'text-yellow-600';
}

function getZoneLabel(wordCount: number): string {
  if (wordCount < 300) return 'Too Short';
  if (wordCount <= 700) return 'Ideal Length';
  return 'Potentially Long';
}

export default function ResumeLengthCheck() {
  const { resumeData } = useResumeStore();

  const { wordCount, estimatedPages, markerPosition } = useMemo(() => {
    const text = getResumeText(resumeData);
    const wc = countWords(text);
    const pages = Math.max(1, Math.round((wc / 500) * 10) / 10);
    // Map word count to 0-100% position on bar (max shown: 1000 words)
    const pos = Math.min((wc / 1000) * 100, 100);
    return { wordCount: wc, estimatedPages: pages, markerPosition: pos };
  }, [resumeData]);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div>
          <span className={`text-lg font-bold ${getZoneColor(wordCount)}`}>{wordCount}</span>
          <span className="text-xs text-muted-foreground ml-1">words</span>
        </div>
        <span className="text-xs text-muted-foreground">
          ~{estimatedPages} page{estimatedPages !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Zone bar */}
      <div className="relative">
        <div className="flex h-2.5 rounded-full overflow-hidden">
          {/* Red zone: 0-300 (30%) */}
          <div className="bg-red-400/60 dark:bg-red-500/40" style={{ width: '30%' }} />
          {/* Green zone: 300-700 (40%) */}
          <div className="bg-green-400/60 dark:bg-green-500/40" style={{ width: '40%' }} />
          {/* Yellow zone: 700+ (30%) */}
          <div className="bg-yellow-400/60 dark:bg-yellow-500/40" style={{ width: '30%' }} />
        </div>

        {/* Marker */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${markerPosition}%` }}
        >
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-foreground" />
        </div>
      </div>

      {/* Zone labels */}
      <div className="flex text-[10px] text-muted-foreground">
        <span className="w-[30%]">{'<300'}</span>
        <span className="w-[40%] text-center">300-700</span>
        <span className="w-[30%] text-right">{'700+'}</span>
      </div>

      <p className={`text-xs font-medium ${getZoneColor(wordCount)}`}>
        {getZoneLabel(wordCount)}
      </p>
      <p className="text-xs text-muted-foreground leading-tight">
        {wordCount < 300
          ? 'Your resume needs more content. Aim for 300-700 words for a single-page resume.'
          : wordCount <= 700
          ? 'Great length for a single-page resume. Well within ATS parsing range.'
          : 'Your resume may be too long for a single page. Consider trimming to keep it concise.'}
      </p>
    </div>
  );
}
