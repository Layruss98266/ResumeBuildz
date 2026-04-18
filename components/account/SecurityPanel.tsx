'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthContext as useAuth } from '@/components/Providers';
import { createClient } from '@/lib/supabase/client';
import { passwordSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

type Factor = { id: string; friendly_name?: string | null; factor_type: string; status: string };

export default function SecurityPanel() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const pwSave = useSaveState();
  const [pw, setPw] = useState({ new_password: '', confirm_password: '' });
  const [pwFieldErrors, setPwFieldErrors] = useState<Record<string, string>>({});

  const connectedGoogle = user?.identities?.some((i) => i.provider === 'google') ?? false;

  const [mfaFactors, setMfaFactors] = useState<Factor[]>([]);
  const [mfaBusy, setMfaBusy] = useState(false);
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [mfaEnroll, setMfaEnroll] = useState<{ factorId: string; qr: string; secret: string } | null>(null);
  const [mfaCode, setMfaCode] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.mfa.listFactors();
      setMfaFactors(data?.all ?? []);
    })();
  }, [supabase]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwFieldErrors({});
    const parsed = passwordSchema.safeParse(pw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const iss of parsed.error.issues) errs[iss.path.join('.')] = iss.message;
      setPwFieldErrors(errs);
      return;
    }
    pwSave.start();
    const { error: upErr } = await supabase.auth.updateUser({ password: parsed.data.new_password });
    pwSave.done(upErr?.message || null);
    if (!upErr) setPw({ new_password: '', confirm_password: '' });
  }

  async function handleSignOutEverywhere() {
    if (!confirm('Sign out from all devices? You will need to log in again on every browser.')) return;
    await supabase.auth.signOut({ scope: 'global' });
    router.replace('/login');
  }

  async function startMfaEnroll() {
    setMfaError(null);
    setMfaBusy(true);
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
    setMfaBusy(false);
    if (error) { setMfaError(error.message); return; }
    if (data) setMfaEnroll({ factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
  }

  async function verifyMfa() {
    if (!mfaEnroll) return;
    setMfaError(null);
    setMfaBusy(true);
    const { data: chal, error: chErr } = await supabase.auth.mfa.challenge({ factorId: mfaEnroll.factorId });
    if (chErr || !chal) { setMfaBusy(false); setMfaError(chErr?.message || 'Challenge failed'); return; }
    const { error: vErr } = await supabase.auth.mfa.verify({ factorId: mfaEnroll.factorId, challengeId: chal.id, code: mfaCode });
    setMfaBusy(false);
    if (vErr) { setMfaError(vErr.message); return; }
    setMfaEnroll(null);
    setMfaCode('');
    const { data } = await supabase.auth.mfa.listFactors();
    setMfaFactors(data?.all ?? []);
  }

  async function removeFactor(id: string) {
    if (!confirm('Remove this 2FA factor?')) return;
    setMfaBusy(true);
    const { error: rmErr } = await supabase.auth.mfa.unenroll({ factorId: id });
    setMfaBusy(false);
    if (rmErr) { setMfaError(rmErr.message); return; }
    const { data } = await supabase.auth.mfa.listFactors();
    setMfaFactors(data?.all ?? []);
  }

  async function connectGoogle() {
    await supabase.auth.linkIdentity({ provider: 'google' });
  }

  const verifiedFactors = mfaFactors.filter((f) => f.status === 'verified');

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>

      <section className="mb-10">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Change password</h3>
        <form onSubmit={handlePasswordChange} className="grid sm:grid-cols-2 gap-4">
          <Field label="New password" hint="Minimum 8 characters" error={pwFieldErrors['new_password']}>
            <input type="password" minLength={8} maxLength={72} value={pw.new_password} onChange={(e) => setPw({ ...pw, new_password: e.target.value })} className={inputCls} autoComplete="new-password" required />
          </Field>
          <Field label="Confirm password" error={pwFieldErrors['confirm_password']}>
            <input type="password" value={pw.confirm_password} onChange={(e) => setPw({ ...pw, confirm_password: e.target.value })} className={inputCls} autoComplete="new-password" required />
          </Field>
          <div className="sm:col-span-2">
            <SaveBar saving={pwSave.saving} saved={pwSave.saved} error={pwSave.error} />
          </div>
        </form>
      </section>

      <section className="mb-10">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Two-factor authentication</h3>
        <p className="text-xs text-gray-500 mb-4">TOTP with any authenticator app (Authy, 1Password, Google Authenticator).</p>
        {verifiedFactors.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {verifiedFactors.map((f) => (
              <li key={f.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-900">{f.friendly_name || 'Authenticator app'} <span className="text-xs text-gray-500 ml-1">({f.factor_type})</span></span>
                <button onClick={() => removeFactor(f.id)} className="text-xs text-red-600 hover:underline" disabled={mfaBusy}>Remove</button>
              </li>
            ))}
          </ul>
        ) : mfaEnroll ? (
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">Scan the QR code with your authenticator app, then enter the 6-digit code.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mfaEnroll.qr} alt="TOTP QR code" className="h-40 w-40 mb-3 border border-gray-200 rounded" />
            <p className="text-xs text-gray-500 mb-3">Or enter this secret manually: <code className="font-mono text-gray-900">{mfaEnroll.secret}</code></p>
            <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={mfaCode} onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32 mr-2" placeholder="123456" />
            <button onClick={verifyMfa} disabled={mfaBusy || mfaCode.length !== 6} className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-sm font-medium px-4 py-2 rounded-lg">
              {mfaBusy ? 'Verifying...' : 'Verify and enable'}
            </button>
          </div>
        ) : (
          <button onClick={startMfaEnroll} disabled={mfaBusy} className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg">
            {mfaBusy ? 'Starting...' : 'Enable 2FA'}
          </button>
        )}
        {mfaError && <p className="text-xs text-red-600 mt-2">{mfaError}</p>}
      </section>

      <section className="mb-10">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Connected accounts</h3>
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <span className="text-sm text-gray-900">Google</span>
          {connectedGoogle ? (
            <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1">
              <Check className="h-3.5 w-3.5" /> Connected
            </span>
          ) : (
            <button onClick={connectGoogle} className="text-xs text-indigo-600 font-medium hover:underline">Connect</button>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Sessions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={async () => { await signOut(); router.replace('/'); }} className="border border-gray-300 hover:border-gray-400 text-sm font-medium px-4 py-2 rounded-lg">
            Sign out this device
          </button>
          <button onClick={handleSignOutEverywhere} className="border border-red-200 hover:border-red-300 text-red-700 text-sm font-medium px-4 py-2 rounded-lg">
            Sign out everywhere
          </button>
        </div>
      </section>
    </div>
  );
}
