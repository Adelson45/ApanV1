import type { AstroCookies } from 'astro';
import { supabaseAnon } from './supabase';

const COOKIE_NAME = 'sb-admin-session';

export async function login(email: string, password: string, cookies: AstroCookies) {
  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return { ok: false as const, error: error?.message ?? 'Falha no login' };
  }
  cookies.set(COOKIE_NAME, data.session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  return { ok: true as const };
}

export function logout(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export async function requireAdmin(cookies: AstroCookies) {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
