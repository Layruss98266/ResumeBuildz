// Typed, fail-fast env var accessors.
//
// Each getter accesses `process.env.NEXT_PUBLIC_*` as a LITERAL property so
// Next.js can inline the value into the client bundle at build time. Dynamic
// access via `process.env[name]` is NOT inlined — it returns undefined in the
// browser because browsers have no real `process.env` object. That's why the
// helpers below take the already-read value as a parameter; the literal
// `process.env.X` read stays at the call site.
//
// All accessors are lazy (getter-based). Importing this module never throws —
// only touching a required property does, and only at the moment of use.
// This keeps `next build` passing when the build environment lacks non-build
// secrets (e.g., SUPABASE_SERVICE_ROLE_KEY isn't needed to compile).

/** Returns '' and warns in dev. Used for public vars that degrade gracefully when unset. */
function softValue(name: string, v: string | undefined): string {
  if (!v || v.trim() === '') {
    if (typeof console !== 'undefined' && typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn(`[env] ${name} is not set — auth features will not work until you add it to .env.local`);
    }
    return '';
  }
  return v;
}

/** Returns undefined silently. Used for optional integrations (Stripe, Sentry) that are skipped when not configured. */
function optionalValue(v: string | undefined): string | undefined {
  return v && v.trim() !== '' ? v : undefined;
}

/** Throws at access time. Used for server-only secrets that must be present at runtime. */
function requiredValue(name: string, v: string | undefined): string {
  if (!v || v.trim() === '') {
    throw new Error(
      `Missing required env var: ${name}. Set it in .env.local (dev) or Vercel project settings (prod).`,
    );
  }
  return v;
}

/** Public vars (safe to use on client). Lazy getters — never throw on import. */
export const env = {
  get SUPABASE_URL(): string { return softValue('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL); },
  get SUPABASE_ANON_KEY(): string { return softValue('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); },
  get SITE_URL(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_SITE_URL); },
  get STRIPE_PRICE_STARTER(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER); },
  get STRIPE_PRICE_PRO(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO); },
  get STRIPE_PRICE_TEAM(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM); },
  get STRIPE_PRICE_LIFETIME(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_STRIPE_PRICE_LIFETIME); },
  get SENTRY_DSN(): string | undefined { return optionalValue(process.env.NEXT_PUBLIC_SENTRY_DSN); },
};

/**
 * Server-only env. Call from Route Handlers / Server Components only.
 * Accessing from a Client Component will throw at runtime because Next.js
 * strips non-public env vars from the client bundle (they'll be undefined).
 *
 * The guard below adds an explicit, readable error so accidental client-side
 * imports surface immediately rather than silently returning empty strings.
 */
function assertServerSide(name: string): void {
  if (typeof window !== 'undefined') {
    throw new Error(
      `[env] ${name} was accessed on the client. ` +
      'Move this call to a Route Handler, Server Action, or Server Component.',
    );
  }
}

export const serverEnv = {
  get STRIPE_SECRET_KEY(): string { assertServerSide('STRIPE_SECRET_KEY'); return requiredValue('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY); },
  get STRIPE_WEBHOOK_SECRET(): string { assertServerSide('STRIPE_WEBHOOK_SECRET'); return requiredValue('STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET); },
  get SUPABASE_SERVICE_ROLE_KEY(): string { assertServerSide('SUPABASE_SERVICE_ROLE_KEY'); return requiredValue('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY); },
};
