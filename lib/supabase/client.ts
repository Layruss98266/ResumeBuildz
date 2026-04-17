import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

type SupabaseClient = ReturnType<typeof createBrowserClient>;

let client: SupabaseClient | null = null;

// Guest-mode stub. When NEXT_PUBLIC_SUPABASE_* env vars aren't set (e.g. fresh
// clone with no .env.local), we hand callers an object with the same shape
// that returns "not authenticated" for every operation. Keeps the builder
// usable without credentials; auth UI still renders but sign-in is disabled.
function guestStub(): SupabaseClient {
  const noUser = { data: { user: null }, error: null };
  const noSession = { data: { session: null }, error: null };
  const authError = { error: { message: 'Supabase not configured' } };
  const stub = {
    auth: {
      getUser: async () => noUser,
      getSession: async () => noSession,
      signInWithPassword: async () => authError,
      signUp: async () => authError,
      signInWithOAuth: async () => authError,
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => authError,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          maybeSingle: async () => ({ data: null, error: null }),
        }),
      }),
      insert: async () => ({ data: null, error: null }),
      update: () => ({ eq: async () => ({ error: null }) }),
      upsert: async () => ({ data: null, error: null }),
      delete: () => ({ eq: async () => ({ error: null }) }),
    }),
    functions: {
      invoke: async () => ({ error: { message: 'Supabase not configured' } }),
    },
  };
  return stub as unknown as SupabaseClient;
}

export function createClient() {
  if (!client) {
    if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
      client = guestStub();
    } else {
      client = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
    }
  }
  return client;
}
