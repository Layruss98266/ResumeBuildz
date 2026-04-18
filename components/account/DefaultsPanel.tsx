'use client';

import { useState } from 'react';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile } from '@/lib/accountUpdate';
import { defaultsSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

export default function DefaultsPanel() {
  const { user, profile } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({
    default_template: profile?.default_template || '',
    default_font: profile?.default_font || '',
    default_accent: profile?.default_accent || '#4F46E5',
    default_language: (profile?.default_language as 'en' | 'hi') || 'en',
    mask_phone_on_share: !!profile?.mask_phone_on_share,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFieldErrors({});
    const parsed = defaultsSchema.safeParse(form);
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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Builder defaults</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Default template" hint="Template slug, e.g. modern" error={fieldErrors['default_template']}>
          <input type="text" maxLength={40} value={form.default_template} onChange={(e) => setForm({ ...form, default_template: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Default font" hint="Font family, e.g. Inter" error={fieldErrors['default_font']}>
          <input type="text" maxLength={40} value={form.default_font} onChange={(e) => setForm({ ...form, default_font: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Accent colour" hint="Hex like #4F46E5" error={fieldErrors['default_accent']}>
          <div className="flex items-center gap-2">
            <input type="color" value={form.default_accent} onChange={(e) => setForm({ ...form, default_accent: e.target.value })} className="h-10 w-12 rounded border border-gray-300 cursor-pointer" />
            <input type="text" maxLength={7} value={form.default_accent} onChange={(e) => setForm({ ...form, default_accent: e.target.value })} className={`${inputCls} flex-1 font-mono`} />
          </div>
        </Field>
        <Field label="Resume language" error={fieldErrors['default_language']}>
          <select value={form.default_language} onChange={(e) => setForm({ ...form, default_language: e.target.value as 'en' | 'hi' })} className={`${inputCls} bg-white`}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </Field>
      </div>
      <label className="mt-4 inline-flex items-center gap-2 text-sm text-gray-800">
        <input type="checkbox" checked={form.mask_phone_on_share} onChange={(e) => setForm({ ...form, mask_phone_on_share: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        Hide my phone number on public /r share links
      </label>
      <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
    </form>
  );
}
