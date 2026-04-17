// Typed, fail-fast env var accessors.
//
// Replaces `process.env.FOO!` (non-null assertions). If a required var is
// missing at the moment of access, we throw with the var name instead of
// `TypeError: Cannot read properties of undefined`.
//
// All accessors are lazy (getter-based). Importing this module never throws
// — only touching a required property does, and only at the moment of use.
// This keeps `next build` passing when the build environment lacks non-build
// secrets (e.g., SUPABASE_SERVICE_ROLE_KEY isn't needed to compile).
//
// Client bundles: Next.js statically inlines `process.env.NEXT_PUBLIC_*` at
// build time. Our getter re-reads `process.env.X` on every access, so these
// will still resolve correctly in the browser.

function required(name: string): string {
  const v = typeof process !== 'undefined' ? process.env[name] : undefined;
  if (!v || v.trim() === '') {
    throw new Error(
      `Missing required env var: ${name}. Set it in .env.local (dev) or Vercel project settings (prod).`,
    );
  }
  return v;
}

function optional(name: string): string | undefined {
  const v = typeof process !== 'undefined' ? process.env[name] : undefined;
  return v && v.trim() !== '' ? v : undefined;
}

/**
 * Soft-required: return empty string if missing. The app supports guest mode
 * (no auth) so we don't want a missing Supabase URL to crash the whole
 * client bundle on first render. The actual Supabase calls will surface
 * the auth failure at the point of use instead.
 *
 * In production, always set these in Vercel. A missing value is operator
 * error, not a user problem.
 */
function softRequired(name: string): string {
  const v = typeof process !== 'undefined' ? process.env[name] : undefined;
  if (!v || v.trim() === '') {
    if (typeof console !== 'undefined' && typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn(`[env] ${name} is not set — auth features will not work until you add it to .env.local`);
    }
    return '';
  }
  return v;
}

/** Public vars (safe to use on client). Lazy getters — never throw on import. */
export const env = {
  get SUPABASE_URL(): string { return softRequired('NEXT_PUBLIC_SUPABASE_URL'); },
  get SUPABASE_ANON_KEY(): string { return softRequired('NEXT_PUBLIC_SUPABASE_ANON_KEY'); },
  get SITE_URL(): string | undefined { return optional('NEXT_PUBLIC_SITE_URL'); },
  get STRIPE_PRICE_STARTER(): string | undefined { return optional('NEXT_PUBLIC_STRIPE_PRICE_STARTER'); },
  get STRIPE_PRICE_PRO(): string | undefined { return optional('NEXT_PUBLIC_STRIPE_PRICE_PRO'); },
  get STRIPE_PRICE_TEAM(): string | undefined { return optional('NEXT_PUBLIC_STRIPE_PRICE_TEAM'); },
  get STRIPE_PRICE_LIFETIME(): string | undefined { return optional('NEXT_PUBLIC_STRIPE_PRICE_LIFETIME'); },
};

/**
 * Server-only env. Call from Route Handlers / Server Components only.
 * Accessing from a Client Component will throw because Next.js strips
 * non-public env vars from the client bundle.
 */
export const serverEnv = {
  get STRIPE_SECRET_KEY(): string { return required('STRIPE_SECRET_KEY'); },
  get STRIPE_WEBHOOK_SECRET(): string { return required('STRIPE_WEBHOOK_SECRET'); },
  get SUPABASE_SERVICE_ROLE_KEY(): string { return required('SUPABASE_SERVICE_ROLE_KEY'); },
};
