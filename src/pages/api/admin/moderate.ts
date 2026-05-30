export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';
import { requireAdmin } from '../../../lib/auth';

const BREVO_API = 'https://api.brevo.com/v3/smtp/email';
const FROM_EMAIL = 'contato@jovemapan.com.br';
const SITE_URL = 'https://jovemapan.com.br';

export const POST: APIRoute = async ({ request, cookies }) => {
  const admin = await requireAdmin(cookies);
  if (!admin) return json({ ok: false, error: 'Não autorizado' }, 401);

  let body: any;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'JSON inválido' }, 400); }

  const { id, action } = body ?? {};
  if (!id) return json({ ok: false, error: 'ID obrigatório' }, 400);

  if (action === 'delete') {
    const { error } = await supabaseAdmin.from('comments').delete().eq('id', id);
    if (error) return json({ ok: false, error: 'Erro ao excluir' }, 500);
    return json({ ok: true });
  }

  if (action === 'approve' || action === 'reject') {
    const status = action === 'approve' ? 'approved' : 'rejected';
    const update: any = { status };
    if (status === 'approved') update.approved_at = new Date().toISOString();
    const { error } = await supabaseAdmin.from('comments').update(update).eq('id', id);
    if (error) return json({ ok: false, error: 'Erro ao moderar' }, 500);
    return json({ ok: true });
  }

  if (action === 'reply') {
    const reply = String(body.reply ?? '').trim();
    const author = String(body.author ?? '').trim() || 'Equipe Jovem Apan';
    if (reply.length < 2 || reply.length > 4000) {
      return json({ ok: false, error: 'Resposta com tamanho inválido' }, 400);
    }

    const { data: comment, error: getErr } = await supabaseAdmin
      .from('comments')
      .select('id, author_name, author_email, page_slug, content')
      .eq('id', id)
      .single();
    if (getErr || !comment) return json({ ok: false, error: 'Comentário não encontrado' }, 404);

    const { error: updErr } = await supabaseAdmin
      .from('comments')
      .update({
        admin_reply: reply.slice(0, 4000),
        admin_reply_author: author.slice(0, 120),
        admin_reply_at: new Date().toISOString()
      })
      .eq('id', id);
    if (updErr) return json({ ok: false, error: 'Erro ao salvar resposta' }, 500);

    // Tenta enviar e-mail pro autor do comentário (best-effort)
    const apiKey = import.meta.env.BREVO_API_KEY;
    if (apiKey && comment.author_email) {
      const safeReply = escapeHtml(reply).replace(/\n/g, '<br>');
      const safeAuthor = escapeHtml(author);
      const safeComment = escapeHtml(comment.content).replace(/\n/g, '<br>');
      const pageUrl = SITE_URL + comment.page_slug;
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#212121;">
          <h2 style="color:#E31E24;border-bottom:2px solid #E31E24;padding-bottom:8px;">Você recebeu uma resposta!</h2>
          <p>Olá <strong>${escapeHtml(comment.author_name)}</strong>,</p>
          <p>Sua mensagem em <a href="${pageUrl}">${pageUrl}</a> recebeu uma resposta:</p>

          <div style="background:#f4f4f4;padding:12px 16px;border-radius:6px;margin:16px 0;color:#555;font-style:italic;">
            "${safeComment}"
          </div>

          <div style="background:#fff4f4;border-left:4px solid #E31E24;padding:16px;margin:16px 0;">
            <strong style="color:#E31E24;">${safeAuthor} respondeu:</strong><br><br>
            ${safeReply}
          </div>

          <p><a href="${pageUrl}#comentarios" style="background:#E31E24;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;display:inline-block;margin-top:12px;">Ver no site</a></p>

          <p style="color:#888;font-size:12px;margin-top:32px;">Você está recebendo este e-mail porque comentou em jovemapan.com.br.</p>
        </div>
      `;
      try {
        await fetch(BREVO_API, {
          method: 'POST',
          headers: { 'accept': 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
          body: JSON.stringify({
            sender: { name: 'Jovem Apan', email: FROM_EMAIL },
            to: [{ email: comment.author_email, name: comment.author_name }],
            subject: `Nova resposta ao seu comentário em Jovem Apan`,
            htmlContent: html
          })
        });
      } catch (e) {
        console.error('Brevo reply email error:', e);
      }
    }

    return json({ ok: true });
  }

  if (action === 'delete-reply') {
    const { error } = await supabaseAdmin
      .from('comments')
      .update({ admin_reply: null, admin_reply_author: null, admin_reply_at: null })
      .eq('id', id);
    if (error) return json({ ok: false, error: 'Erro ao excluir resposta' }, 500);
    return json({ ok: true });
  }

  return json({ ok: false, error: 'Ação inválida' }, 400);
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string));
}
