'use client';

import { useFormattingWarnings, type FormattingWarning } from '../hooks/useFormattingWarnings';
import { AlertTriangle, XCircle, Info, CheckCircle2 } from 'lucide-react';

function getIcon(type: FormattingWarning['type']) {
  switch (type) {
    case 'ats-breaking':
      return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
    case 'bullet-consistency':
      return <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />;
    case 'empty-highlight':
      return <Info className="h-4 w-4 text-blue-500 shrink-0" />;
  }
}

export default function FormattingWarnings() {
  const warnings = useFormattingWarnings();

  if (warnings.length === 0) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <span className="text-xs text-green-700 dark:text-green-400">No formatting issues found</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {warnings.map((warning, i) => (
        <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
          {getIcon(warning.type)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-tight">{warning.message}</p>
            {warning.details && (
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{warning.details}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
