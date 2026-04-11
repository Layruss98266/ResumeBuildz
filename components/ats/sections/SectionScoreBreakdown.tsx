'use client';

interface SectionScore {
  label: string;
  earned: number;
  max: number;
}

interface SectionScoreBreakdownProps {
  sectionScores: SectionScore[];
}

function getBarColor(ratio: number): string {
  if (ratio >= 0.8) return 'bg-green-500';
  if (ratio >= 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default function SectionScoreBreakdown({ sectionScores }: SectionScoreBreakdownProps) {
  return (
    <div className="space-y-2">
      {sectionScores.map((s) => {
        const ratio = s.max > 0 ? s.earned / s.max : 0;
        const percentage = Math.round(ratio * 100);
        return (
          <div key={s.label} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-24 truncate" title={s.label}>
              {s.label}
            </span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getBarColor(ratio)}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground w-10 text-right">
              {s.earned}/{s.max}
            </span>
          </div>
        );
      })}
    </div>
  );
}
