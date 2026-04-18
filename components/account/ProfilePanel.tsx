'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2, Upload } from 'lucide-react';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile, uploadAvatar } from '@/lib/accountUpdate';
import { profileSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

export default function ProfilePanel() {
  const { user, profile } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({
    full_name: profile?.full_name || '',
    headline: profile?.headline || '',
    current_role: profile?.current_role || '',
    years_experience: profile?.years_experience != null ? String(profile.years_experience) : '',
    timezone: profile?.timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : ''),
    locale: profile?.locale || 'en-US',
  });
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [avatarErr, setAvatarErr] = useState<string | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !user) return;
    setAvatarErr(null);
    setAvatarBusy(true);
    const { error: upErr, url } = await uploadAvatar(user.id, f);
    if (upErr || !url) {
      setAvatarErr(upErr?.message || 'Upload failed');
      setAvatarBusy(false);
      return;
    }
    const { error: dbErr } = await updateProfile(user.id, { avatar_url: url });
    setAvatarBusy(false);
    if (dbErr) setAvatarErr(dbErr.message);
    else setAvatarUrl(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFieldErrors({});
    const parsed = profileSchema.safeParse({
      full_name: form.full_name,
      headline: form.headline,
      current_role: form.current_role,
      years_experience: form.years_experience === '' ? null : form.years_experience,
      timezone: form.timezone,
      locale: form.locale,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const iss of parsed.error.issues) errs[iss.path.join('.')] = iss.message;
      setFieldErrors(errs);
      return;
    }
    save.start();
    const { error: upErr } = await updateProfile(user.id, parsed.data);
    save.done(upErr?.message || null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile</h2>

      <div className="flex items-center gap-5 mb-6">
        <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Avatar" fill sizes="80px" className="object-cover" unoptimized />
          ) : (
            (form.full_name[0] || user?.email?.[0] || 'U').toUpperCase()
          )}
        </div>
        <div>
          <label className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition">
            {avatarBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {avatarBusy ? 'Uploading...' : 'Upload photo'}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatar} disabled={avatarBusy} />
          </label>
          <p className="text-xs text-gray-500 mt-1.5">JPG, PNG, or WebP. Max 2 MB.</p>
          {avatarErr && <p className="text-xs text-red-600 mt-1">{avatarErr}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" error={fieldErrors['full_name']}>
          <input type="text" maxLength={80} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inputCls} required />
        </Field>
        <Field label="Headline" hint="Shows next to your name. Example: Senior PM, 7y" error={fieldErrors['headline']}>
          <input type="text" maxLength={120} value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Current role" error={fieldErrors['current_role']}>
          <input type="text" maxLength={120} value={form.current_role} onChange={(e) => setForm({ ...form, current_role: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Years of experience" error={fieldErrors['years_experience']}>
          <input type="number" min={0} max={60} value={form.years_experience} onChange={(e) => setForm({ ...form, years_experience: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Timezone" hint="IANA name, e.g. Asia/Kolkata" error={fieldErrors['timezone']}>
          <input type="text" maxLength={64} value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Date locale" hint="BCP47. Example: en-IN for DD-MM-YYYY" error={fieldErrors['locale']}>
          <input type="text" maxLength={16} value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })} className={inputCls} />
        </Field>
      </div>

      <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
    </form>
  );
}
