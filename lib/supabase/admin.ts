// Server-only Supabase client using the service role key.
// This bypasses Row-Level Security — use ONLY in Route Handlers that have
// already verified the request (e.g. Stripe webhook signature check).
// Never import this in Client Components or Server Components that render
// user-facing content.

import { createClient } from '@supabase/supabase-js';
import { env, serverEnv } from '@/lib/env';

let adminClient: ReturnType<typeof createClient> | null = null;

export function createAdminClient() {
  if (!env.SUPABASE_URL || !serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase admin credentials not configured');
  }
  if (!adminClient) {
    adminClient = createClient(env.SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}
