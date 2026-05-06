import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

type SupabaseClient = ReturnType<typeof createBrowserClient>;

let client: SupabaseClient | null = null;

// Guest-mode stub. When NEXT_PUBLIC_SUPABASE_* env vars aren't set (e.g. fresh
// clone with no .env.local), we return a Proxy that intercepts any property or
// method access and returns safe async defaults. This covers every query chain
// shape without needing to enumerate them manually (the old hard-coded stub
// would throw on any chain it didn't anticipate, e.g. .select().limit()).
//
// Special cases handled explicitly:
//   - auth.getUser / getSession → "not signed in" shape
//   - auth.onAuthStateChange   → no-op subscription (sync, not async)
//   - functions.invoke         → not-configured error
//   - everything else          → resolves to { data: null, error: null }
function guestStub(): SupabaseClient {
  function makeProxy(): unknown {
    return new Proxy(
      // Use a callable function as the target so the Proxy works both as an
      // object (property access) and as a function (call).
      function () {} as unknown as object,
      {
        get(_target, prop: string) {
          // auth.getUser / auth.getSession return the "no user" shape.
          if (prop === 'getUser') return async () => ({ data: { user: null }, error: null });
          if (prop === 'getSession') return async () => ({ data: { session: null }, error: null });
          // auth.onAuthStateChange must return a sync subscription object.
          if (prop === 'onAuthStateChange') {
            return () => ({ data: { subscription: { unsubscribe: () => {} } } });
          }
          // functions.invoke signals Supabase is not configured.
          if (prop === 'invoke') {
            return async () => ({ data: null, error: { message: 'Supabase not configured' } });
          }
          // Every other property access returns another Proxy so arbitrary
          // chains like .from('x').select('*').eq('id', 1).single() all work.
          return makeProxy();
        },
        // When the proxy itself is called (e.g. the terminal .single() call),
        // resolve to a safe empty result.
        apply() {
          return Promise.resolve({ data: null, error: null });
        },
      },
    );
  }

  return makeProxy() as unknown as SupabaseClient;
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
