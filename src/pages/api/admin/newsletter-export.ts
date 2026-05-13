export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const admin = await requireAdmin(cookies);
  if (!admin) return new Response('Não autorizado', { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('email, source, created_at')
    .order('created_at', { ascending: false });

  if (error) return new Response('Erro', { status: 500 });

  const rows = ['email,source,created_at'];
  for (const r of data ?? []) {
    rows.push([
      escapeCsv(r.email),
      escapeCsv(r.source ?? ''),
      escapeCsv(r.created_at)
    ].join(','));
  }

  return new Response(rows.join('\n'), {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="newsletter-${new Date().toISOString().slice(0,10)}.csv"`
    }
  });
};

function escapeCsv(v: string) {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}
