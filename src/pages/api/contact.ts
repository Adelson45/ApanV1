import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message, privacy } = data;
    
    // Validação
    if (!name || !email || !subject || !message || !privacy) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: {
            message: 'Todos os campos obrigatórios devem ser preenchidos',
            code: 'VALIDATION_ERROR'
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: {
            message: 'E-mail inválido',
            code: 'INVALID_EMAIL'
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // TODO: Integrar com serviço de email (Resend, SendGrid, etc.)
    // Por enquanto, apenas simula o envio
    console.log('Form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });
    
    // Resposta de sucesso
    return new Response(
      JSON.stringify({
        ok: true,
        data: {
          message: 'Mensagem recebida com sucesso',
          id: crypto.randomUUID()
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({
        ok: false,
        error: {
          message: 'Erro interno ao processar a mensagem',
          code: 'INTERNAL_ERROR'
        }
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Configuração CORS
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
