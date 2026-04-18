'use client';

import { useState } from 'react';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile } from '@/lib/accountUpdate';
import { notificationsSchema } from '@/lib/accountSchema';
import { SaveBar, useSaveState } from './shared';

export default function NotificationsPanel() {
  const { user, profile } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({
    notify_ats_tips: !!profile?.notify_ats_tips,
    notify_product: profile?.notify_product ?? true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const parsed = notificationsSchema.safeParse(form);
    if (!parsed.success) return;
    save.start();
    const { error: upErr } = await updateProfile(user.id, parsed.data);
    save.done(upErr?.message || null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
      <div className="space-y-4">
        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" checked={form.notify_ats_tips} onChange={(e) => setForm({ ...form, notify_ats_tips: e.target.checked })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <span>
            <span className="block text-sm font-medium text-gray-900">Weekly ATS tips</span>
            <span className="block text-xs text-gray-500 mt-0.5">One short email a week with a concrete ATS improvement you can make in 5 minutes.</span>
          </span>
        </label>
        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
          <input type="checkbox" checked={form.notify_product} onChange={(e) => setForm({ ...form, notify_product: e.target.checked })} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <span>
            <span className="block text-sm font-medium text-gray-900">Product updates</span>
            <span className="block text-xs text-gray-500 mt-0.5">New templates, features, and improvements. Roughly once a month.</span>
          </span>
        </label>
      </div>
      <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
    </form>
  );
}
