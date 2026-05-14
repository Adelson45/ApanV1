export const prerender = false;
import type { APIRoute } from 'astro';
import { getClientIp, checkRateLimit } from '../../lib/ratelimit';

const BREVO_API = 'https://api.brevo.com/v3/smtp/email';
const FROM_EMAIL = 'contato@jovemapan.com.br';
const FROM_NAME = 'Jovem Apan - Formulário de Contato';
const TO_EMAIL = 'contato@jovemapan.com.br';
const TO_NAME = 'Jovem Apan';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message, privacy, website } = data;

    if (website && String(website).length > 0) {
      return json({ ok: true, data: { message: 'Recebido' } });
    }

    if (!name || !email || !subject || !message || !privacy) {
      return json({ ok: false, error: { message: 'Todos os campos obrigatórios devem ser preenchidos', code: 'VALIDATION_ERROR' } }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return json({ ok: false, error: { message: 'E-mail inválido', code: 'INVALID_EMAIL' } }, 400);
    }
    if (String(message).length < 5 || String(message).length > 5000) {
      return json({ ok: false, error: { message: 'Mensagem com tamanho inválido', code: 'INVALID_MESSAGE' } }, 400);
    }

    const ip = getClientIp(request);
    const allowed = await checkRateLimit(ip, 'contact', 5);
    if (!allowed) {
      return json({ ok: false, error: { message: 'Muitas tentativas. Tente novamente em alguns minutos.', code: 'RATE_LIMIT' } }, 429);
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY não configurada');
      return json({ ok: false, error: { message: 'Serviço indisponível', code: 'CONFIG_ERROR' } }, 500);
    }

    const safeName = escapeHtml(String(name).slice(0, 200));
    const safeEmail = escapeHtml(String(email).slice(0, 200));
    const safeSubject = escapeHtml(String(subject).slice(0, 300));
    const safeMessage = escapeHtml(String(message).slice(0, 5000)).replace(/\n/g, '<br>');
    const safeIp = escapeHtml(ip);
    const submittedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E31E24; border-bottom: 2px solid #E31E24; padding-bottom: 8px;">Nova mensagem do site</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; background: #f4f4f4; font-weight: bold; width: 130px;">Nome</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeName}</td></tr>
          <tr><td style="padding: 8px; background: #f4f4f4; font-weight: bold;">E-mail</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding: 8px; background: #f4f4f4; font-weight: bold;">Assunto</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeSubject}</td></tr>
          <tr><td style="padding: 8px; background: #f4f4f4; font-weight: bold;">Enviado em</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${submittedAt}</td></tr>
          <tr><td style="padding: 8px; background: #f4f4f4; font-weight: bold;">IP</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; font-size: 12px;">${safeIp}</td></tr>
        </table>
        <div style="background: #fafafa; padding: 16px; border-left: 4px solid #E31E24; margin: 16px 0;">
          <strong>Mensagem:</strong><br><br>
          ${safeMessage}
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">Responda diretamente para <strong>${safeEmail}</strong> para falar com o remetente.</p>
      </div>
    `;

    const payload = {
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: TO_EMAIL, name: TO_NAME }],
      replyTo: { email: String(email), name: String(name) },
      subject: `[Site] ${String(subject).slice(0, 200)}`,
      htmlContent
    };

    const res = await fetch(BREVO_API, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Brevo error:', res.status, errText);
      return json({ ok: false, error: { message: 'Erro ao enviar e-mail', code: 'EMAIL_ERROR' } }, 500);
    }

    return json({ ok: true, data: { message: 'Mensagem enviada com sucesso' } });
  } catch (error) {
    console.error('Contact form error:', error);
    return json({ ok: false, error: { message: 'Erro interno ao processar a mensagem', code: 'INTERNAL_ERROR' } }, 500);
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string));
}
