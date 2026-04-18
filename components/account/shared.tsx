'use client';

import { useState } from 'react';
import { AlertTriangle, Check, Loader2 } from 'lucide-react';

export function useSaveState() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reset = () => { setSaved(false); setError(null); };
  const start = () => { setSaving(true); reset(); };
  const done = (err?: string | null) => {
    setSaving(false);
    if (err) setError(err);
    else { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  };
  return { saving, saved, error, start, done, reset };
}

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-900 mb-1">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
    </label>
  );
}

export function SaveBar({
  saving,
  saved,
  error,
}: {
  saving: boolean;
  saved: boolean;
  error: string | null;
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        type="submit"
        disabled={saving}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition inline-flex items-center gap-2"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {saving ? 'Saving...' : 'Save changes'}
      </button>
      {saved && (
        <span className="text-sm text-emerald-600 inline-flex items-center gap-1">
          <Check className="h-4 w-4" /> Saved
        </span>
      )}
      {error && (
        <span role="alert" className="text-sm text-red-600 inline-flex items-center gap-1">
          <AlertTriangle className="h-4 w-4" /> {error}
        </span>
      )}
    </div>
  );
}

export const inputCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none';
