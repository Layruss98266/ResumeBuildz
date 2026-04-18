// Single source of truth for profile writes. Every /account form routes
// through here so we guarantee:
//  - the request is scoped by auth.uid() (RLS enforces this server-side;
//    we rely on that rather than trusting the client to pass the right id)
//  - the payload is whitelisted — only fields this helper knows about can
//    be sent, so a buggy form cannot smuggle extra columns
//  - timestamps are never taken from user input

import { createClient } from '@/lib/supabase/client';

export type ProfilePatch = Partial<{
  full_name: string;
  avatar_url: string;
  headline: string;
  current_role: string;
  years_experience: number | null;
  timezone: string;
  locale: string;
  target_role: string;
  target_seniority: string | null;
  target_industry: string;
  target_locations: string;
  open_to_work: boolean;
  default_template: string;
  default_font: string;
  default_accent: string;
  default_language: 'en' | 'hi';
  mask_phone_on_share: boolean;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  notify_ats_tips: boolean;
  notify_product: boolean;
  invoice_email: string;
}>;

const ALLOWED_KEYS: ReadonlyArray<keyof ProfilePatch> = [
  'full_name',
  'avatar_url',
  'headline',
  'current_role',
  'years_experience',
  'timezone',
  'locale',
  'target_role',
  'target_seniority',
  'target_industry',
  'target_locations',
  'open_to_work',
  'default_template',
  'default_font',
  'default_accent',
  'default_language',
  'mask_phone_on_share',
  'linkedin_url',
  'github_url',
  'portfolio_url',
  'notify_ats_tips',
  'notify_product',
  'invoice_email',
];

function sanitise(patch: ProfilePatch): ProfilePatch {
  const out: ProfilePatch = {};
  for (const key of ALLOWED_KEYS) {
    if (key in patch) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (out as any)[key] = (patch as any)[key];
    }
  }
  return out;
}

export async function updateProfile(userId: string, patch: ProfilePatch) {
  const supabase = createClient();
  const payload = sanitise(patch);
  if (Object.keys(payload).length === 0) return { error: null };
  const { error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId);
  return { error };
}

export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient();
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
    return { error: new Error('Only JPG, PNG, or WebP allowed'), url: null };
  }
  if (file.size > 2 * 1024 * 1024) {
    return { error: new Error('Max file size is 2 MB'), url: null };
  }
  const path = `${userId}/avatar-${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from('avatars')
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (upErr) return { error: upErr, url: null };
  const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path);
  return { error: null, url: pub.publicUrl };
}
