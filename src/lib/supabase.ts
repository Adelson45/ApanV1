import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.SUPABASE_URL;
const anonKey = import.meta.env.SUPABASE_ANON_KEY;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error('SUPABASE_URL não definido');

export const supabaseAnon = createClient(url, anonKey ?? '', {
  auth: { persistSession: false }
});

export const supabaseAdmin = createClient(url, serviceKey ?? '', {
  auth: { persistSession: false }
});

export type CommentRow = {
  id: number;
  page_slug: string;
  author_name: string;
  author_email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved_at: string | null;
};

export type SubscriberRow = {
  id: number;
  email: string;
  confirmed: boolean;
  source: string | null;
  created_at: string;
};
