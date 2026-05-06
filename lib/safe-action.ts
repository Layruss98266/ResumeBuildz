import { createSafeActionClient } from 'next-safe-action';
import { createClient as createServerClient } from '@/lib/supabase/server';

/**
 * Base safe-action client.
 * All server actions in lib/actions/ should use this (or actionWithAuth below).
 */
export const action = createSafeActionClient();

/**
 * Auth-gated safe-action client.
 * Middleware verifies the Supabase session before the action runs.
 * The resolved userId is injected into the action context so individual
 * actions don't need to re-fetch auth.
 */
export const actionWithAuth = createSafeActionClient({
  async handleServerError(e) {
    if (e instanceof Error) return e.message;
    return 'An unexpected error occurred.';
  },
}).use(async ({ next }) => {
  // Middleware runs before the action. next({ ctx }) injects userId into the action context
  // so individual actions don't need to re-fetch auth. Throwing here triggers handleServerError.
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Unauthorized');
  return next({ ctx: { userId: user.id, supabase } });
});
