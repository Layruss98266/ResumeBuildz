'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const linkError = params.get('error'); // e.g. INVALID_TOKEN from the email link

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  // The email link redirects here with ?error=INVALID_TOKEN when expired/used,
  // or with no token at all if reached directly.
  const tokenProblem = !!linkError || !token;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password, token }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? 'This reset link is invalid or expired. Request a new one.');
      } else {
        setDone(true);
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  if (done)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm px-4">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Password updated</h2>
          <p className="text-gray-500 text-sm">Redirecting you to sign in…</p>
          <Link href="/login" className="text-blue-600 text-sm mt-4 inline-block hover:underline">
            Go to login
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Set a new password</h1>

        {tokenProblem ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              This reset link is invalid or has expired. Request a fresh one to continue.
            </p>
            <Link
              href="/forgot-password"
              className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold transition"
            >
              Request a new link
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">Choose a new password for your account.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="password"
                placeholder="New password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full border border-gray-200 bg-white text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full border border-gray-200 bg-white text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Updating…' : 'Update password'}
              </button>
            </form>
          </>
        )}

        <Link href="/login" className="text-sm text-gray-400 hover:text-gray-600 mt-6 inline-block">
          &larr; Back to login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  // useSearchParams requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ResetPasswordInner />
    </Suspense>
  );
}
