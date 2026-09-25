export interface CloudflareEnv {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

const PRIMARY_DESTINATION = 'info@dexvoi.com';

/**
 * Cloudflare Pages Function: POST /api/lead
 * Uses Brevo as the primary email delivery provider.
 * Note: Cloudflare Email Workers integration remains on hold until the paid plan is contracted.
 */
export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  try {
    const data: any = await request.json();
    const { fullName, email, phone, businessType, websiteUrl, primaryConcern, message, type, ticketId } = data || {};

    if (!email && !phone && !fullName) {
      return new Response(JSON.stringify({ error: 'Faltan datos de contacto del cliente.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formType = type || 'Formulario de Contacto';
    const leadTicket = ticketId || `DEXVOI-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const subject = `🔔 Nuevo lead desde Dexvoi - ${formType}`;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background: #0A0F1F; color: #FFFFFF; padding: 24px; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #0066FF; margin-top: 0;">🔔 Nuevo Lead Dexvoi - ${formType}</h2>
        <p style="color: #F5A623;"><strong>Expediente:</strong> ${leadTicket}</p>
        <div style="background: #131B33; padding: 16px; border-radius: 8px; line-height: 1.6;">
          <p><strong>👤 Nombre:</strong> ${fullName || 'No indicado'}</p>
          <p><strong>📧 Email:</strong> ${email ? `<a href="mailto:${email}" style="color: #38BDF8;">${email}</a>` : 'No indicado'}</p>
          <p><strong>📱 Teléfono:</strong> ${phone ? `<a href="tel:${phone}" style="color: #10B981;">${phone}</a>` : 'No indicado'}</p>
          <p><strong>🌐 Web / Dominio:</strong> ${websiteUrl || 'No indicado'}</p>
          <p><strong>🏢 Sector:</strong> ${businessType || 'No especificado'}</p>
          ${primaryConcern || message ? `<p><strong>💬 Consulta:</strong> ${primaryConcern || message}</p>` : ''}
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

    // Respaldo secundario mediante Resend si Brevo no estuviese configurado
    if (!emailSent && env?.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Leads <onboarding@resend.dev>',
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
        ticketId: leadTicket,
        emailSent,
        provider,
        destinationEmail: PRIMARY_DESTINATION,
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
