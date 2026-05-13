export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { getClientIp, checkRateLimit } from '../../../lib/ratelimit';

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'JSON inválido' }, 400); }

  const { email, website, source } = body ?? {};
  if (website && String(website).length > 0) return json({ ok: true });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return json({ ok: false, error: 'E-mail inválido' }, 400);
  }

  const ip = getClientIp(request);
  const ok = await checkRateLimit(ip, 'newsletter', 5);
  if (!ok) return json({ ok: false, error: 'Muitas tentativas — tente mais tarde' }, 429);

  const { error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .upsert(
      {
        email: String(email).toLowerCase().slice(0, 200),
        ip_address: ip,
        source: source ? String(source).slice(0, 100) : null
      },
      { onConflict: 'email', ignoreDuplicates: true }
    );

  if (error) return json({ ok: false, error: 'Erro ao inscrever' }, 500);
  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
