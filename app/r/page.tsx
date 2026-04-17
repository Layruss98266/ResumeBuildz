'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, FileText, Printer } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import { decodeResume } from '@/lib/shareLink';
import ResumePreview from '@/components/preview/ResumePreview';
import type { ResumeData } from '@/types/resume';

/**
 * Read-only shared resume view. Data lives entirely in the URL fragment
 * (after `#`), so nothing hits the server. If the fragment is missing or
 * corrupt, we show a clear error + CTA back to the builder.
 */
export default function SharePage() {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const store = useResumeStore();

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (!raw) {
      // Initial decode of URL fragment — unavoidable effect-based state sync.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrorMsg('No resume payload in the URL. Ask the sender to re-share the link.');
      setState('error');
      return;
    }
    decodeResume(raw).then((data: ResumeData | null) => {
      if (!data) {
        setErrorMsg('Link is corrupt or from an incompatible version.');
        setState('error');
        return;
      }
      // Mutate store so the existing ResumePreview + templates pick this up.
      // Because the share page has no editor UI, we don't persist to localStorage.
      useResumeStore.setState({ resumeData: data });
      setState('ready');
    });
  }, []);

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">Loading shared resume...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Cannot open link</h1>
          <p className="text-sm text-gray-400 mb-6">{errorMsg}</p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            <FileText className="h-4 w-4" /> Build your own
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Read-only banner */}
      <div className="bg-blue-600 text-white text-xs text-center py-2 px-4 flex items-center justify-center gap-3 print:hidden">
        <span>Read-only shared resume · {store.resumeData.personalInfo.fullName || 'Unnamed'}</span>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500 hover:bg-blue-400 transition"
        >
          <Printer className="h-3 w-3" /> Print
        </button>
        <Link href="/builder" className="underline hover:text-blue-100">
          Build your own
        </Link>
      </div>

      {/* Resume render */}
      <div className="flex justify-center p-4 print:p-0">
        <div className="bg-white shadow-xl" style={{ width: '210mm' }}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
