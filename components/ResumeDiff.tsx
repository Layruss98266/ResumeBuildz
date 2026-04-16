'use client';

import { useMemo } from 'react';
import { diffWords } from '@/lib/diffText';

interface Props {
  before: string;
  after: string;
  /** If true, render side-by-side columns. Otherwise inline diff. */
  sideBySide?: boolean;
  className?: string;
}

export default function ResumeDiff({ before, after, sideBySide = false, className = '' }: Props) {
  const segments = useMemo(() => diffWords(before, after), [before, after]);

  if (sideBySide) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${className}`}>
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-2">Before</p>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {segments.map((s, i) => (
              s.op !== 'add' ? (
                <span
                  key={i}
                  className={s.op === 'remove' ? 'bg-red-200 line-through text-red-900' : ''}
                >
                  {s.text}
                </span>
              ) : null
            ))}
          </p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-2">After</p>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {segments.map((s, i) => (
              s.op !== 'remove' ? (
                <span
                  key={i}
                  className={s.op === 'add' ? 'bg-green-200 text-green-900 font-semibold' : ''}
                >
                  {s.text}
                </span>
              ) : null
            ))}
          </p>
        </div>
      </div>
    );
  }

  // Inline mode: removed with strike-through, added highlighted, unchanged normal.
  return (
    <p className={`text-sm whitespace-pre-wrap leading-relaxed ${className}`}>
      {segments.map((s, i) => {
        if (s.op === 'keep') return <span key={i}>{s.text}</span>;
        if (s.op === 'remove') return <span key={i} className="bg-red-100 text-red-800 line-through">{s.text}</span>;
        return <span key={i} className="bg-green-100 text-green-900 font-semibold">{s.text}</span>;
      })}
    </p>
  );
}
