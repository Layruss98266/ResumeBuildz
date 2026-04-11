'use client';

import { useActiveVoice } from '../hooks/useActiveVoice';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const MAX_SHOWN = 10;

export default function ActiveVoiceDetector() {
  const flags = useActiveVoice();

  if (flags.length === 0) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <span className="text-xs text-green-700 dark:text-green-400">All bullet points use active voice</span>
      </div>
    );
  }

  const displayed = flags.slice(0, MAX_SHOWN);
  const remaining = flags.length - MAX_SHOWN;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{flags.length}</span> passive voice instance{flags.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="space-y-1.5">
        {displayed.map((flag, i) => (
          <div key={i} className="p-2 rounded-lg bg-muted/30 border border-muted space-y-1">
            <p className="text-xs leading-tight">
              {highlightPassive(flag.text, flag.match)}
            </p>
            <p className="text-xs text-muted-foreground leading-tight italic">
              {flag.suggestion}
            </p>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <p className="text-xs text-muted-foreground">+{remaining} more instance{remaining !== 1 ? 's' : ''}</p>
      )}
    </div>
  );
}

function highlightPassive(text: string, match: string): React.ReactNode {
  const idx = text.toLowerCase().indexOf(match.toLowerCase());
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const highlighted = text.slice(idx, idx + match.length);
  const after = text.slice(idx + match.length);

  return (
    <>
      {before}
      <span className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-200 px-0.5 rounded font-medium">
        {highlighted}
      </span>
      {after}
    </>
  );
}
