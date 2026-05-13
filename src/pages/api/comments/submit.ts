export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { getClientIp, checkRateLimit } from '../../../lib/ratelimit';

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'JSON inválido' }, 400); }

  const { page_slug, author_name, author_email, content, website } = body ?? {};

  // honeypot — bots costumam preencher tudo
  if (website && String(website).length > 0) {
    return json({ ok: true });
  }

  if (!page_slug || !author_name || !author_email || !content) {
    return json({ ok: false, error: 'Campos obrigatórios faltando' }, 400);
  }
  if (String(content).length < 3 || String(content).length > 4000) {
    return json({ ok: false, error: 'Comentário com tamanho inválido' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(author_email))) {
    return json({ ok: false, error: 'E-mail inválido' }, 400);
  }

  const ip = getClientIp(request);
  const ok = await checkRateLimit(ip, 'comment', 5);
  if (!ok) return json({ ok: false, error: 'Muitos comentários — tente mais tarde' }, 429);

  const { error } = await supabaseAdmin.from('comments').insert({
    page_slug: String(page_slug).slice(0, 300),
    author_name: String(author_name).slice(0, 120),
    author_email: String(author_email).slice(0, 200),
    content: String(content).slice(0, 4000),
    ip_address: ip,
    user_agent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
    status: 'pending'
  });

  if (error) return json({ ok: false, error: 'Erro ao salvar' }, 500);
  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
