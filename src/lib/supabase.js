import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when both env vars are present; the RSVP form hides itself otherwise. */
export const supabaseConfigured = Boolean(url && key && !key.startsWith('PASTE_'));

export const supabase = supabaseConfigured
  ? createClient(url, key, { auth: { persistSession: false } })
  : null;
