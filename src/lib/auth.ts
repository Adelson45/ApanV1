import type { AstroCookies } from 'astro';
import type { Session, User } from '@supabase/supabase-js';
import { supabaseAnon } from './supabase';

const COOKIE_NAME = 'sb-admin-session';
const REFRESH_COOKIE_NAME = 'sb-admin-refresh';
const MAX_AGE = 60 * 60 * 24 * 7;

// Só os e-mails listados em ADMIN_EMAILS (separados por vírgula) acessam o painel.
// Sem a variável, ninguém entra — evita que qualquer conta do Supabase vire admin.
const ADMIN_EMAILS = String(import.meta.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

function isAllowed(user: User | null | undefined): user is User {
  const email = user?.email?.toLowerCase();
  return !!email && ADMIN_EMAILS.includes(email);
}

function setSession(cookies: AstroCookies, session: Session) {
  const opts = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/', maxAge: MAX_AGE };
  cookies.set(COOKIE_NAME, session.access_token, opts);
  cookies.set(REFRESH_COOKIE_NAME, session.refresh_token, opts);
}

export async function login(email: string, password: string, cookies: AstroCookies) {
  const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return { ok: false as const, error: error?.message ?? 'Falha no login' };
  }
  if (!isAllowed(data.user)) {
    return { ok: false as const, error: 'Usuário sem permissão de acesso ao painel' };
  }
  setSession(cookies, data.session);
  return { ok: true as const };
}

export function logout(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
  cookies.delete(REFRESH_COOKIE_NAME, { path: '/' });
}

export async function requireAdmin(cookies: AstroCookies) {
  const token = cookies.get(COOKIE_NAME)?.value;
  if (token) {
    const { data, error } = await supabaseAnon.auth.getUser(token);
    if (!error && data.user) return isAllowed(data.user) ? data.user : null;
  }

  // Access token expira em ~1h; renova com o refresh token em vez de deslogar.
  const refreshToken = cookies.get(REFRESH_COOKIE_NAME)?.value;
  if (!refreshToken) return null;
  const { data, error } = await supabaseAnon.auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session || !isAllowed(data.user)) {
    logout(cookies);
    return null;
  }
  setSession(cookies, data.session);
  return data.user;
}
