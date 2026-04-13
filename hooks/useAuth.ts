'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  plan: 'free' | 'starter' | 'pro' | 'team' | 'lifetime';
  ai_rewrites_used: number;
  ai_rewrites_reset_date: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (data) setProfile(data);
    },
    [supabase]
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchProfile(user.id);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, supabase]);

  const isPro = () =>
    profile?.plan === 'starter' ||
    profile?.plan === 'pro' ||
    profile?.plan === 'team' ||
    profile?.plan === 'lifetime';

  const canUseAI = () => {
    if (isPro()) return true;
    if (!profile) return false;
    const today = new Date().toISOString().split('T')[0];
    if (profile.ai_rewrites_reset_date !== today) return true;
    return profile.ai_rewrites_used < 3;
  };

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

  const signInWithEmail = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signUpWithEmail = (email: string, password: string, name: string) =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return {
    user,
    profile,
    loading,
    isPro,
    canUseAI,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
}
