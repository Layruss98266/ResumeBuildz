import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';

type SupabaseServerClient = ReturnType<typeof createServerClient>;

// Guest-mode stub — same Proxy strategy as lib/supabase/client.ts.
// Any query chain resolves to { data: null, error: null }; auth methods return
// safe "no user" shapes; onAuthStateChange returns a no-op subscription.
function guestStub(): SupabaseServerClient {
  function makeProxy(): unknown {
    return new Proxy(
      function () {} as unknown as object,
      {
        get(_target, prop: string) {
          if (prop === 'getUser') return async () => ({ data: { user: null }, error: null });
          if (prop === 'getSession') return async () => ({ data: { session: null }, error: null });
          if (prop === 'onAuthStateChange') {
            return () => ({ data: { subscription: { unsubscribe: () => {} } } });
          }
          if (prop === 'invoke') {
            return async () => ({ data: null, error: { message: 'Supabase not configured' } });
          }
          return makeProxy();
        },
        apply() {
          return Promise.resolve({ data: null, error: null });
        },
      },
    );
  }
  return makeProxy() as unknown as SupabaseServerClient;
}

export async function createClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return guestStub();
  }
  const cookieStore = await cookies(); // cookies() is async in Next.js 15+ App Router.
  return createServerClient(
    env.SUPABASE_URL,
    env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Next.js Server Components render after headers are sent; cookie writes throw a
            // read-only error that's safe to ignore here.
          }
        },
      },
    }
  );
}
