import { supabaseAdmin } from './supabase';

export function getClientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

export async function checkRateLimit(
  ip: string,
  action: string,
  maxPerHour: number
): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from('rate_limit')
    .select('id', { count: 'exact', head: true })
    .eq('ip_address', ip)
    .eq('action', action)
    .gte('created_at', oneHourAgo);
  if ((count ?? 0) >= maxPerHour) return false;
  await supabaseAdmin.from('rate_limit').insert({ ip_address: ip, action });

  // Limpeza ocasional (~5% das chamadas) dos registros com mais de 1 dia,
  // pra tabela não crescer indefinidamente.
  if (Math.random() < 0.05) {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    await supabaseAdmin.from('rate_limit').delete().lt('created_at', oneDayAgo);
  }
  return true;
}
