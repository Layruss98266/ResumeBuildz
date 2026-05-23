import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db';
import { user, session, account, verification, profiles } from '@/lib/db/schema';
import { sendEmail, escapeHtml } from '@/lib/email';
import { SITE_URL } from '@/lib/siteConfig';

const isProd = process.env.NODE_ENV === 'production';

function createAuth() {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: { user, session, account, verification },
    }),

    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://resumebuildz.tech',

    trustedOrigins: [
      'https://resumebuildz.tech',
      'https://www.resumebuildz.tech',
      // Dev only: allow any localhost port so the dev server works regardless
      // of which port Next picks (3000, 3847, etc.). Never widened in prod.
      ...(isProd ? [] : ['http://localhost:*']),
    ],

    emailAndPassword: {
      enabled: true,
      async sendResetPassword({ user, url }) {
        // No-ops when RESEND_API_KEY is unset; never throws.
        await sendEmail({
          to: user.email,
          subject: 'Reset your ResumeBuildz password',
          html: `<p>Click <a href="${escapeHtml(url)}">here</a> to reset your password. This link expires in 1 hour.</p>`,
        });
      },
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },

    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    databaseHooks: {
      user: {
        create: {
          after: async (newUser) => {
            await db.insert(profiles).values({ id: newUser.id }).onConflictDoNothing();
            // Branded welcome email. No-ops without RESEND_API_KEY and never
            // throws, so a slow/failed Resend call can't break signup.
            await sendEmail({
              to: newUser.email,
              subject: 'Welcome to ResumeBuildz',
              html: welcomeHtml(newUser.name || ''),
            });
          },
        },
      },
    },
  });
}

function welcomeHtml(name: string): string {
  const greeting = name ? `Hi ${escapeHtml(name.split(' ')[0])},` : 'Hi there,';
  const builderUrl = `${SITE_URL}/builder`;
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f9;padding:32px 0;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:36px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <tr><td>
            <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">Welcome to ResumeBuildz</h1>
            <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#374151;">${greeting}</p>
            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151;">
              Thanks for signing up. You're all set to build an ATS-ready resume in minutes &mdash;
              pick a template, drop in your experience, and let the AI tighten your bullet points.
            </p>
            <a href="${escapeHtml(builderUrl)}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:8px;font-size:15px;">Open the builder</a>
            <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#6b7280;">
              Need a hand? Just reply to this email and we'll help you out.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

// Lazy singleton — defers initialization until first use so the module
// can be imported during CI builds without DATABASE_URL / auth secrets.
// The `has` trap is required: toNextJsHandler() does `"handler" in auth`
// to decide whether `auth` is the instance or the raw handler. Without it,
// `in` hits the empty target, returns false, and the handler is invoked as
// a function — throwing "auth is not a function".
let _auth: ReturnType<typeof createAuth> | undefined;
function getAuth() {
  if (!_auth) _auth = createAuth();
  return _auth;
}
export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_target, prop, receiver) {
    return Reflect.get(getAuth(), prop, receiver);
  },
  has(_target, prop) {
    return Reflect.has(getAuth(), prop);
  },
});
