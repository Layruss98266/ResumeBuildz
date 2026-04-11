'use client';

import { useReadabilityScore } from '../hooks/useReadabilityScore';

function getScoreColor(score: number): string {
  if (score >= 60 && score <= 80) return 'text-green-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
}

function getRingColor(score: number): string {
  if (score >= 60 && score <= 80) return 'border-green-500';
  if (score >= 50) return 'border-yellow-500';
  return 'border-red-500';
}

export default function ReadabilityScore() {
  const { score, level, description } = useReadabilityScore();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-14 h-14 rounded-full border-[3px] ${getRingColor(score)} flex flex-col items-center justify-center shrink-0`}
        >
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{level}</p>
          <p className="text-xs text-muted-foreground leading-tight">{description}</p>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-0.5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span>60-80: Ideal for resumes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
          <span>50-59 or 81+: Acceptable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          <span>Below 50: Too complex</span>
        </div>
      </div>
    </div>
  );
}
