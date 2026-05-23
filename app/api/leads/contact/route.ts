import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/lib/db/schema';
import { rateLimit, clientId } from '@/lib/rateLimit';
import { sendEmail, escapeHtml } from '@/lib/email';
import { randomUUID } from 'crypto';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Mirror the client-side caps in lib/leads.ts; the API must not trust the body.
const LIMITS = { name: 100, email: 254, subject: 100, message: 5000 } as const;

export async function POST(req: NextRequest) {
  const rl = rateLimit(`contact:${clientId(req)}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many messages. Try again in ${rl.retryAfterSec}s.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const body = (raw ?? {}) as Record<string, unknown>;

  const name = String(body.name ?? '').trim().slice(0, LIMITS.name);
  const email = String(body.email ?? '').trim().toLowerCase().slice(0, LIMITS.email);
  const subjectRaw = String(body.subject ?? '').trim().slice(0, LIMITS.subject);
  const subject = subjectRaw || null;
  const message = String(body.message ?? '').trim().slice(0, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: 'Please provide a few words so we can help.' }, { status: 400 });
  }

  try {
    await db.insert(contactMessages).values({ id: randomUUID(), name, email, subject, message });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'DB error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  // Notify the operator so messages don't sit unseen in the DB. Best-effort:
  // never block or fail the submission on email. Skips when CONTACT_NOTIFY_TO
  // (or RESEND_API_KEY) is unset.
  const notifyTo = process.env.CONTACT_NOTIFY_TO;
  if (notifyTo) {
    await sendEmail({
      to: notifyTo,
      replyTo: email,
      subject: `[ResumeBuildz contact] ${subject || 'New message'}`,
      html: contactNotifyHtml({ name, email, subject, message }),
    });
  }

  return NextResponse.json({ ok: true });
}

function contactNotifyHtml(m: { name: string; email: string; subject: string | null; message: string }): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;font-size:14px;line-height:1.6;">
    <h2 style="margin:0 0 12px;font-size:18px;">New contact form submission</h2>
    <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(m.name)}</p>
    <p style="margin:0 0 4px;"><strong>Email:</strong> ${escapeHtml(m.email)}</p>
    <p style="margin:0 0 12px;"><strong>Subject:</strong> ${escapeHtml(m.subject || '(none)')}</p>
    <p style="margin:0 0 4px;"><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;word-break:break-word;background:#f6f7f9;padding:12px;border-radius:8px;margin:0;font-family:inherit;">${escapeHtml(m.message)}</pre>
  </div>`;
}
