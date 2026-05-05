import { createClient } from '@/lib/supabase/client';

export type GatedFeature = 'ai' | 'pdf';

export const FREE_LIMITS: Record<GatedFeature, number> = {
  ai: 1,
  pdf: 3,
};

const STORAGE_KEYS: Record<GatedFeature, string> = {
  ai: 'resumeforge-usage-ai',
  pdf: 'resumeforge-usage-pdf',
};

interface UsageRecord {
  count: number;
  date: string; // YYYY-MM-DD
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function readRecord(feature: GatedFeature): UsageRecord {
  if (typeof window === 'undefined') return { count: 0, date: today() };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[feature]);
    if (!raw) return { count: 0, date: today() };
    const parsed: UsageRecord = JSON.parse(raw);
    if (parsed.date !== today()) return { count: 0, date: today() };
    return parsed;
  } catch {
    return { count: 0, date: today() };
  }
}

function writeRecord(feature: GatedFeature, record: UsageRecord) {
  localStorage.setItem(STORAGE_KEYS[feature], JSON.stringify(record));
}

export function getUsage(feature: GatedFeature) {
  const record = readRecord(feature);
  const limit = FREE_LIMITS[feature];
  return {
    count: record.count,
    limit,
    remaining: Math.max(0, limit - record.count),
  };
}

/** Increment usage. Returns true if the action is allowed, false if limit reached. */
export function incrementUsage(feature: GatedFeature): boolean {
  const record = readRecord(feature);
  const limit = FREE_LIMITS[feature];
  if (record.count >= limit) return false;
  record.count += 1;
  record.date = today();
  writeRecord(feature, record);
  return true;
}

/** Check if the feature can be used. Pro users always bypass limits. */
export function canUse(feature: GatedFeature, isPro = false): boolean {
  if (isPro) return true;
  return getUsage(feature).remaining > 0;
}

/**
 * Server-enforced pre-check (dryRun). For authenticated users this calls the
 * Edge Function so clearing localStorage cannot bypass daily limits.
 * Falls back to localStorage for anonymous users or when Supabase isn't
 * configured.
 */
export async function checkServerUsage(
  feature: GatedFeature,
  isPro = false,
): Promise<{ allowed: boolean; remaining: number }> {
  if (isPro) return { allowed: true, remaining: Infinity };
  if (typeof window === 'undefined') return { allowed: true, remaining: FREE_LIMITS[feature] };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const u = getUsage(feature);
    return { allowed: u.remaining > 0, remaining: u.remaining };
  }

  try {
    const { data, error } = await supabase.functions.invoke('increment-usage', {
      body: { feature, dryRun: true },
    });
    if (error || !data) throw new Error('edge-fn unavailable');
    return { allowed: data.allowed, remaining: data.remaining };
  } catch {
    // Edge Function not deployed yet — fall back gracefully.
    const u = getUsage(feature);
    return { allowed: u.remaining > 0, remaining: u.remaining };
  }
}

/**
 * Server-enforced increment. For authenticated users the Edge Function is the
 * authoritative counter; clearing localStorage no longer resets the limit.
 * Falls back to localStorage for anonymous users or when Supabase isn't
 * configured.
 * Returns { allowed, remaining } after the increment attempt.
 */
export async function incrementServerUsage(
  feature: GatedFeature,
): Promise<{ allowed: boolean; remaining: number }> {
  if (typeof window === 'undefined') return { allowed: false, remaining: 0 };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const allowed = incrementUsage(feature);
    return { allowed, remaining: getUsage(feature).remaining };
  }

  try {
    const { data, error } = await supabase.functions.invoke('increment-usage', {
      body: { feature },
    });
    if (error || !data) throw new Error('edge-fn unavailable');
    // Mirror server count into localStorage so the UI reads consistent values.
    if (data.allowed) {
      const record: UsageRecord = { count: data.used ?? 1, date: today() };
      writeRecord(feature, record);
    }
    return { allowed: data.allowed, remaining: data.remaining };
  } catch {
    const allowed = incrementUsage(feature);
    return { allowed, remaining: getUsage(feature).remaining };
  }
}
