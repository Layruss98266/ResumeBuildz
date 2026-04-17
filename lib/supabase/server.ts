import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';

type SupabaseServerClient = ReturnType<typeof createServerClient>;

// Guest-mode stub — see lib/supabase/client.ts for rationale.
function guestStub(): SupabaseServerClient {
  const noUser = { data: { user: null }, error: null };
  const stub = {
    auth: {
      getUser: async () => noUser,
      getSession: async () => ({ data: { session: null }, error: null }),
      exchangeCodeForSession: async () => ({ error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }),
    }),
  };
  return stub as unknown as SupabaseServerClient;
}

export async function createClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return guestStub();
  }
  const cookieStore = await cookies();
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
            // setAll called from Server Component — ignore
          }
        },
      },
    }
  );
}
