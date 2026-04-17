'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, RotateCcw } from 'lucide-react';
import { getTrend, recordScore, resetTrend, type TrendPoint } from '@/lib/atsTrend';

interface Props {
  currentScore: number;
}

/**
 * Sparkline-style chart of recent ATS scores.
 * - Records a new datapoint whenever the score changes (debounced in lib).
 * - Reset button clears history.
 * - No dependencies — inline SVG path.
 */
export default function ATSTrend({ currentScore }: Props) {
  const [points, setPoints] = useState<TrendPoint[]>([]);

  useEffect(() => {
    recordScore(currentScore);
    // Re-read trend after recording new point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPoints(getTrend());
  }, [currentScore]);

  if (points.length < 2) {
    return (
      <div className="text-[10px] text-muted-foreground italic">
        Score trend appears after 2+ edits.
      </div>
    );
  }

  const width = 280;
  const height = 60;
  const padding = 4;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;

  const minScore = Math.min(...points.map((p) => p.s), 0);
  const maxScore = Math.max(...points.map((p) => p.s), 100);
  const range = Math.max(1, maxScore - minScore);

  const xs = points.map((_, i) => padding + (i / Math.max(1, points.length - 1)) * innerW);
  const ys = points.map((p) => padding + innerH - ((p.s - minScore) / range) * innerH);

  const linePath = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${xs[xs.length - 1].toFixed(1)} ${height - padding} L ${xs[0].toFixed(1)} ${height - padding} Z`;

  const first = points[0].s;
  const last = points[points.length - 1].s;
  const delta = last - first;

  const deltaColor = delta > 0 ? 'text-green-600' : delta < 0 ? 'text-red-600' : 'text-gray-500';

  const reset = () => {
    resetTrend();
    setPoints([]);
  };

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Score trend ({points.length} points)
        </p>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${deltaColor}`}>
            {delta > 0 ? '+' : ''}{delta} pts
          </span>
          <button onClick={reset} title="Reset trend" className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-14" aria-label="ATS score trend chart">
        <path d={areaPath} fill="currentColor" className="text-primary/10" />
        <path d={linePath} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-primary" />
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r={i === xs.length - 1 ? 2.5 : 1.5} fill="currentColor" className="text-primary" />
        ))}
      </svg>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1">
        <span>{first}</span>
        <span>{last}</span>
      </div>
    </div>
  );
}
