export const prerender = false;
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabase';

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(JSON.stringify({ ok: false, error: 'slug obrigatório' }), {
      status: 400, headers: { 'content-type': 'application/json' }
    });
  }
  const { data, error } = await supabaseAdmin
    .from('comments')
    .select('id, author_name, content, created_at, approved_at')
    .eq('page_slug', slug)
    .eq('status', 'approved')
    .order('approved_at', { ascending: false })
    .limit(100);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: 'Erro ao listar' }), {
      status: 500, headers: { 'content-type': 'application/json' }
    });
  }
  return new Response(JSON.stringify({ ok: true, comments: data ?? [] }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=30, s-maxage=60'
    }
  });
};
