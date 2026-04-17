import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { rateLimit, clientId } from '@/lib/rateLimit';
import { classifyAuthError } from '@/lib/authErrors';
import { env } from '@/lib/env';

const ALLOWED_REDIRECTS = ['/builder', '/pricing', '/'];

export async function GET(request: Request) {
  // Rate limit: 30 callback attempts per minute per IP. The OAuth flow only
  // calls this endpoint ONCE per successful sign-in; anything approaching the
  // limit is abuse / brute-force.
  const rl = rateLimit(`callback:${clientId(request)}`, 30, 60_000);
  if (!rl.allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfterSec) },
    });
  }

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawNext = searchParams.get('next') ?? '/builder';
  const next = ALLOWED_REDIRECTS.includes(rawNext) ? rawNext : '/builder';

  if (code) {
    // Without Supabase env vars there's no way to exchange the code — redirect
    // back with a clear error instead of crashing.
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        env.SUPABASE_URL,
        env.SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            },
          },
        }
      );
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        // Never reflect raw 3rd-party error messages in URL params —
        // use a stable, internal error code instead. Login page maps code
        // to a user-friendly string via lib/authErrors.ts.
        const errCode = classifyAuthError(error);
        return NextResponse.redirect(`${origin}/login?error=${errCode}`);
      }
    } catch (err) {
      const errCode = classifyAuthError(err);
      return NextResponse.redirect(`${origin}/login?error=${errCode}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
