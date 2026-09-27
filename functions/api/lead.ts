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
 * Dispatches leads via Brevo or Resend, with full error reporting.
 */
export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  try {
    const data: any = await request.json();
    const { fullName, email, phone, businessType, websiteUrl, primaryConcern, message, type, ticketId, selectedSlot, selectedService } = data || {};

    if (!email && !phone && !fullName) {
      return new Response(JSON.stringify({ error: 'Faltan datos de contacto del cliente.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formType = type || 'Formulario de Contacto';
    const leadTicket = ticketId || `DEXVOI-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const destinationEmail = (env?.NOTIFICATION_EMAIL || PRIMARY_DESTINATION).trim();
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
          ${selectedService ? `<p><strong>🎯 Servicio Seleccionado:</strong> ${selectedService}</p>` : ''}
          ${selectedSlot ? `<p><strong>📅 Horario Reservado:</strong> ${selectedSlot}</p>` : ''}
          ${primaryConcern || message ? `<p><strong>💬 Consulta / Detalles:</strong> ${primaryConcern || message}</p>` : ''}
        </div>
        <p style="font-size: 12px; color: #64748B; margin-top: 20px;">Enviado a ${destinationEmail}</p>
      </div>
    `;

    let emailSent = false;
    let provider = 'none';
    let lastError: string | null = null;

    const recipients = [{ email: destinationEmail, name: 'Dexvoi' }];
    if (destinationEmail !== PRIMARY_DESTINATION) {
      recipients.push({ email: PRIMARY_DESTINATION, name: 'Dexvoi Backup' });
    }

    // 1. Envío principal mediante Brevo
    const brevoKey = env?.BREVO_API_KEY;
    if (brevoKey) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': brevoKey.trim(),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: { 
              name: env?.BREVO_SENDER_NAME || 'Dexvoi', 
              email: env?.BREVO_SENDER_EMAIL || 'info@dexvoi.com' 
            },
            to: recipients,
            subject,
            htmlContent: adminHtml,
          }),
        });

        if (brevoRes.ok) {
          emailSent = true;
          provider = 'brevo';
        } else {
          const errText = await brevoRes.text();
          lastError = `Brevo HTTP ${brevoRes.status}: ${errText}`;
          console.warn('[Brevo Error]:', lastError);
        }
      } catch (e: any) {
        lastError = `Brevo exception: ${e?.message}`;
        console.warn('Brevo edge dispatch failed:', e);
      }
    } else {
      lastError = 'BREVO_API_KEY no configurada en las variables de entorno de Cloudflare';
    }

    // 2. Respaldo secundario mediante Resend si Brevo no tuvo éxito
    if (!emailSent && env?.RESEND_API_KEY) {
      try {
        const toEmails = [destinationEmail];
        if (destinationEmail !== PRIMARY_DESTINATION) toEmails.push(PRIMARY_DESTINATION);

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Leads <onboarding@resend.dev>',
            to: toEmails,
            subject,
            html: adminHtml,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          provider = 'resend';
          lastError = null;
        } else {
          const resendErr = await resendRes.text();
          lastError = (lastError ? `${lastError} | ` : '') + `Resend HTTP ${resendRes.status}: ${resendErr}`;
          console.warn('[Resend Error]:', resendErr);
        }
      } catch (e: any) {
        lastError = (lastError ? `${lastError} | ` : '') + `Resend exception: ${e?.message}`;
        console.warn('Resend edge dispatch failed:', e);
      }
    }

    // 3. Confirmación automática al cliente si el envío fue exitoso y el cliente facilitó email
    if (emailSent && email && email.includes('@')) {
      const confirmationSubject = 'Confirmación de solicitud · Dexvoi';
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; background: #0A0F1F; color: #FFFFFF; padding: 24px; border-radius: 10px; max-width: 580px;">
          <h2 style="color: #0066FF; margin-top: 0;">Dexvoi · Arquitectura Digital</h2>
          <p style="color: #F5A623;"><strong>Expediente:</strong> ${leadTicket}</p>
          <p>Hola <strong>${fullName || 'Estimado/a cliente'}</strong>,</p>
          <p>Hemos recibido tu solicitud correspondiente a <strong>${formType}</strong>.</p>
          <p>Nuestro equipo de ingeniería revisará tu expediente y te contactará en menos de 24 horas laborables.</p>
          <div style="background: #131B33; padding: 14px; border-radius: 8px; margin: 16px 0; font-size: 13px;">
            ${websiteUrl ? `<p><strong>Web:</strong> ${websiteUrl}</p>` : ''}
            ${selectedSlot ? `<p><strong>Horario:</strong> ${selectedSlot}</p>` : ''}
            <p><strong>Canal prioritario:</strong> info@dexvoi.com</p>
          </div>
          <p style="font-size: 12px; color: #64748B;">Dexvoi · Madrid · Casablanca · Londres</p>
        </div>
      `;

      if (provider === 'brevo' && env?.BREVO_API_KEY) {
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': env.BREVO_API_KEY.trim(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { 
              name: env?.BREVO_SENDER_NAME || 'Dexvoi', 
              email: env?.BREVO_SENDER_EMAIL || 'info@dexvoi.com' 
            },
            to: [{ email: email.trim(), name: fullName || 'Cliente' }],
            subject: confirmationSubject,
            htmlContent: clientHtml,
          }),
        }).catch((err) => console.warn('Client confirmation via Brevo failed:', err));
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        ticketId: leadTicket,
        emailSent,
        provider,
        destinationEmail,
        errorDetails: emailSent ? undefined : lastError,
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
