export interface CloudflareEnv {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

const PRIMARY_DESTINATION = 'info@dexvoi.com';

/**
 * Cloudflare Pages Function: POST /api/scanner/unlock
 * Uses Brevo as the primary email delivery provider.
 * Note: Cloudflare Email Workers integration remains on hold until the paid plan is contracted.
 */
export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  try {
    const data: any = await request.json();
    const { email, fullName, phone, websiteUrl, overallScore, grade, issuesCount = 0, businessType = 'Negocio' } = data || {};

    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ error: 'El correo electrónico es obligatorio.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanTarget = String(websiteUrl || 'dexvoi.com').replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
    const cleanEmail = email.trim().toLowerCase();
    const ticketId = `SCAN-LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
    const subject = `🔔 Nuevo lead desde Dexvoi - Escáner OSINT`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background: #0A0F1F; color: #FFFFFF; padding: 24px; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #0066FF; margin-top: 0;">🔔 Nuevo Lead desde Dexvoi - Escáner OSINT</h2>
        <p style="color: #F5A623;"><strong>Expediente:</strong> ${ticketId}</p>
        <div style="background: #131B33; padding: 16px; border-radius: 8px; line-height: 1.6;">
          <p><strong>🌐 Dominio Auditado:</strong> <a href="https://${cleanTarget}" target="_blank" style="color: #38BDF8;">${cleanTarget}</a></p>
          <p><strong>📧 Email Capturado:</strong> <a href="mailto:${cleanEmail}" style="color: #F5A623;">${cleanEmail}</a></p>
          ${fullName ? `<p><strong>👤 Nombre:</strong> ${fullName}</p>` : ''}
          ${phone ? `<p><strong>📱 Teléfono:</strong> <a href="tel:${phone}" style="color: #10B981;">${phone}</a></p>` : ''}
          <p><strong>📊 Score Global:</strong> ${overallScore ?? 'N/A'}/100 (Grado ${grade ?? 'N/A'})</p>
          <p><strong>⚠️ Incidencias técnicas:</strong> ${issuesCount}</p>
          <p><strong>🏢 Sector:</strong> ${businessType}</p>
        </div>
        <p style="font-size: 12px; color: #64748B; margin-top: 20px;">Enviado automáticamente a ${PRIMARY_DESTINATION}</p>
      </div>
    `;

    let emailSent = false;
    let provider = 'none';

    // Envío principal mediante Brevo
    const brevoKey = env?.BREVO_API_KEY;
    if (brevoKey) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': brevoKey.trim(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { 
              name: env?.BREVO_SENDER_NAME || 'Dexvoi', 
              email: env?.BREVO_SENDER_EMAIL || 'info@dexvoi.com' 
            },
            to: [{ email: PRIMARY_DESTINATION, name: 'Dexvoi' }],
            subject,
            htmlContent: adminHtml,
          }),
        });
        if (brevoRes.ok) {
          emailSent = true;
          provider = 'brevo';
        }
      } catch (e) {
        console.warn('Brevo edge dispatch failed:', e);
      }
    }

    // Respaldo secundario mediante Resend
    if (!emailSent && env?.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Scanner <onboarding@resend.dev>',
            to: [PRIMARY_DESTINATION],
            subject,
            html: adminHtml,
          }),
        });
        if (resendRes.ok) {
          emailSent = true;
          provider = 'resend';
        }
      } catch (e) {
        console.warn('Resend edge dispatch failed:', e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        unlocked: true,
        ticketId,
        emailSent,
        provider,
        destinationEmail: PRIMARY_DESTINATION,
        message: 'Email verificado con éxito. Informe completo desbloqueado.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error procesando solicitud.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
