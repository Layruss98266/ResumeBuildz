'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext as useAuth } from '@/components/Providers';
import { updateProfile } from '@/lib/accountUpdate';
import { billingSchema } from '@/lib/accountSchema';
import { Field, SaveBar, inputCls, useSaveState } from './shared';

export default function BillingPanel() {
  const { user, profile, isPro } = useAuth();
  const save = useSaveState();
  const [form, setForm] = useState({ invoice_email: profile?.invoice_email || '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setFieldErrors({});
    const parsed = billingSchema.safeParse(form);
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

  const plan = profile?.plan || 'free';
  const isPaid = isPro();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing</h2>

      <section className="border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Current plan</p>
        <p className="text-lg font-bold text-gray-900 capitalize">{plan}</p>
        {!isPaid && (
          <Link href="/pricing" className="mt-3 inline-block text-sm text-indigo-600 font-medium hover:underline">
            View upgrade options →
          </Link>
        )}
      </section>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Billing history</h3>
        <p className="text-sm text-gray-500">No invoices yet. Once payments are live, every charge will show here with a downloadable PDF receipt.</p>
      </section>

      <form onSubmit={handleSubmit}>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Invoice email</h3>
        <p className="text-xs text-gray-500 mb-3">Receipts are sent here. Leave blank to use your account email.</p>
        <Field label="Invoice email" error={fieldErrors['invoice_email']}>
          <input type="email" maxLength={254} value={form.invoice_email} onChange={(e) => setForm({ ...form, invoice_email: e.target.value })} placeholder={user?.email || ''} className={inputCls} />
        </Field>
        <SaveBar saving={save.saving} saved={save.saved} error={save.error} />
      </form>
    </div>
  );
}
