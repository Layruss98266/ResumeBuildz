'use server';

import { z } from 'zod';
import { actionWithAuth } from '@/lib/safe-action';

const ProfileSchema = z.object({
  full_name: z.string().max(100).optional(),
  headline: z.string().max(200).optional(),
  current_role: z.string().max(100).optional(),
  target_role: z.string().max(100).optional(),
  target_industry: z.string().max(100).optional(),
  target_locations: z.string().max(200).optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  open_to_work: z.boolean().optional(),
  default_template: z.string().max(50).optional(),
  default_font: z.string().max(50).optional(),
  default_accent: z.string().max(20).optional(),
  mask_phone_on_share: z.boolean().optional(),
  notify_ats_tips: z.boolean().optional(),
  notify_product: z.boolean().optional(),
  years_experience: z.number().int().min(0).max(60).nullable().optional(),
});

/**
 * Type-safe server action for profile updates.
 * Auth is verified by the actionWithAuth middleware — callers don't pass userId.
 * Input is validated by Zod before the DB write.
 */
export const updateProfileAction = actionWithAuth
  .schema(ProfileSchema)
  .action(async ({ parsedInput, ctx: { userId, supabase } }) => {
    const payload = Object.fromEntries(
      Object.entries(parsedInput).filter(([, v]) => v !== undefined),
    );
    if (Object.keys(payload).length === 0) return { updated: false };

    const { error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', userId);

    if (error) throw new Error(error.message);
    return { updated: true };
  });
