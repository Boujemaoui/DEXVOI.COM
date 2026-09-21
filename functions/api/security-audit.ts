import { runRealSecurityAudit } from '../../server/securityAudit';

export interface CloudflareEnv {
  PAGESPEED_API_KEY?: string;
  GOOGLE_API_KEY?: string;
}

/**
 * Cloudflare Pages Function: POST /api/security-audit
 * Runs real HTTP, TLS, DNS, and PageSpeed security analysis on Cloudflare edge.
 */
export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await request.json().catch(() => ({}))) as any;
    const target = body?.target || body?.domain || body?.url;

    if (!target || typeof target !== 'string') {
      return new Response(JSON.stringify({ error: 'Debes proporcionar una URL o dominio a auditar.' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const apiKey = env.PAGESPEED_API_KEY || env.GOOGLE_API_KEY || '';
    const result = await runRealSecurityAudit({ target, apiKey });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error al ejecutar la auditoría de seguridad.' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
