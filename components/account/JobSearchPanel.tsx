'use client';

import { useState } from 'react';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile } from '@/lib/accountUpdate';
import { jobSearchSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

export default function JobSearchPanel() {
  const { user, profile } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({
    target_role: profile?.target_role || '',
    target_seniority: profile?.target_seniority || '',
    target_industry: profile?.target_industry || '',
    target_locations: profile?.target_locations || '',
    open_to_work: !!profile?.open_to_work,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFieldErrors({});
    const parsed = jobSearchSchema.safeParse({
      ...form,
      target_seniority: form.target_seniority || null,
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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Job search</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Target role" error={fieldErrors['target_role']}>
          <input type="text" maxLength={120} value={form.target_role} onChange={(e) => setForm({ ...form, target_role: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Seniority" error={fieldErrors['target_seniority']}>
          <select value={form.target_seniority} onChange={(e) => setForm({ ...form, target_seniority: e.target.value })} className={`${inputCls} bg-white`}>
            <option value="">Not specified</option>
            <option value="intern">Intern</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="staff">Staff</option>
            <option value="principal">Principal</option>
            <option value="director">Director</option>
            <option value="vp">VP</option>
            <option value="c-suite">C-suite</option>
          </select>
        </Field>
        <Field label="Industry" error={fieldErrors['target_industry']}>
          <input type="text" maxLength={120} value={form.target_industry} onChange={(e) => setForm({ ...form, target_industry: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Preferred locations" hint="Comma-separated. E.g. Bangalore, Remote" error={fieldErrors['target_locations']}>
          <input type="text" maxLength={240} value={form.target_locations} onChange={(e) => setForm({ ...form, target_locations: e.target.value })} className={inputCls} />
        </Field>
      </div>
      <label className="mt-4 inline-flex items-center gap-2 text-sm text-gray-800">
        <input type="checkbox" checked={form.open_to_work} onChange={(e) => setForm({ ...form, open_to_work: e.target.checked })} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        I&apos;m open to work
      </label>
      <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
    </form>
  );
}
