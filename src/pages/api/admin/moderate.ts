export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const admin = await requireAdmin(cookies);
  if (!admin) return json({ ok: false, error: 'Não autorizado' }, 401);

  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'JSON inválido' }, 400); }

  const { id, action } = body ?? {};
  if (!id || !['approve', 'reject', 'delete'].includes(action)) {
    return json({ ok: false, error: 'Parâmetros inválidos' }, 400);
  }

  if (action === 'delete') {
    const { error } = await supabaseAdmin.from('comments').delete().eq('id', id);
    if (error) return json({ ok: false, error: 'Erro ao excluir' }, 500);
    return json({ ok: true });
  }

  const status = action === 'approve' ? 'approved' : 'rejected';
  const update: any = { status };
  if (status === 'approved') update.approved_at = new Date().toISOString();

  const { error } = await supabaseAdmin.from('comments').update(update).eq('id', id);
  if (error) return json({ ok: false, error: 'Erro ao moderar' }, 500);
  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}
