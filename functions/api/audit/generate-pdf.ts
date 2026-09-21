import { generateAuditPdf } from '../../../server/reportGenerator';
import { executeRealSecurityAudit } from '../security-audit';

export interface CloudflareEnv {
  PAGESPEED_API_KEY?: string;
  GOOGLE_API_KEY?: string;
}

/**
 * Cloudflare Pages Function: POST /api/audit/generate-pdf
 * Generates verified official branded audit PDF on Cloudflare Edge.
 */
export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const body = (await request.json().catch(() => ({}))) as any;
    const target = body?.target || body?.websiteUrl || 'dexvoi.com';
    const tier = body?.tier || 'free';
    const email = body?.email || body?.customerEmail || 'info@dexvoi.com';

    let auditResult = body?.auditResult;
    if (!auditResult || auditResult.score === undefined) {
      const apiKey = env.PAGESPEED_API_KEY || env.GOOGLE_API_KEY || '';
      auditResult = await executeRealSecurityAudit({ target, apiKey });
    }

    const pdfBuffer = generateAuditPdf({
      auditResult,
      tier,
      customerEmail: email,
      websiteUrl: target,
    });

    const cleanTarget = target.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
    const filename = `DEXVOI-Auditoria-Oficial-${cleanTarget}.pdf`;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error al generar el reporte PDF.' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
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
