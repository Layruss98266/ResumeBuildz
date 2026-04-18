'use client';

import { useState } from 'react';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile } from '@/lib/accountUpdate';
import { linksSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

export default function LinksPanel() {
  const { user, profile } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({
    linkedin_url: profile?.linkedin_url || '',
    github_url: profile?.github_url || '',
    portfolio_url: profile?.portfolio_url || '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFieldErrors({});
    const parsed = linksSchema.safeParse(form);
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
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Links</h2>
      <p className="text-sm text-gray-600 mb-6">
        These auto-fill into the resume builder so you don&apos;t retype them each time.
      </p>
      <div className="grid gap-4">
        <Field label="LinkedIn URL" hint="https://linkedin.com/in/your-handle" error={fieldErrors['linkedin_url']}>
          <input type="url" maxLength={240} placeholder="https://linkedin.com/in/..." value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className={inputCls} />
        </Field>
        <Field label="GitHub URL" error={fieldErrors['github_url']}>
          <input type="url" maxLength={240} placeholder="https://github.com/..." value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Portfolio URL" error={fieldErrors['portfolio_url']}>
          <input type="url" maxLength={240} placeholder="https://yourdomain.com" value={form.portfolio_url} onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })} className={inputCls} />
        </Field>
      </div>
      <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
    </form>
  );
}
