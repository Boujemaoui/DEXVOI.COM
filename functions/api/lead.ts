import {
  normalizeFormCategory,
  getFormCategoryConfig,
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildUserConfirmationHtml,
  buildUserConfirmationText,
} from './_emailTemplates.ts';

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
 * Dispatches leads via Brevo or Resend, with dynamic tailored templates.
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

    // Helper to sanitize and validate email strings from env (strips quotes, whitespace)
    const cleanEmail = (raw?: string, fallback = PRIMARY_DESTINATION): string => {
      if (!raw) return fallback;
      const stripped = raw.replace(/['"]/g, '').trim().toLowerCase();
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stripped) ? stripped : fallback;
    };

    const cleanBrevoKey = (env?.BREVO_API_KEY || (env as any)?.SIB_API_KEY || '').replace(/['"]/g, '').trim();
    const cleanSenderEmail = cleanEmail(env?.BREVO_SENDER_EMAIL, PRIMARY_DESTINATION);
    const cleanSenderName = (env?.BREVO_SENDER_NAME || 'Dexvoi').replace(/['"]/g, '').trim() || 'Dexvoi';
    const cleanDestinationEmail = cleanEmail(env?.NOTIFICATION_EMAIL, PRIMARY_DESTINATION);

    // Obtener configuración dinámica y plantillas según el tipo de servicio
    const category = normalizeFormCategory(formType, data);
    const config = getFormCategoryConfig(category, data, leadTicket);

    const adminSubject = config.adminSubject;
    const adminHtml = buildAdminNotificationHtml(data, leadTicket, cleanDestinationEmail);
    const adminText = buildAdminNotificationText(data, leadTicket, cleanDestinationEmail);

    const userSubject = config.userSubject;
    const userHtml = buildUserConfirmationHtml(data, leadTicket);
    const userText = buildUserConfirmationText(data, leadTicket);

    let emailSent = false;
    let provider = 'none';
    let lastError: string | null = null;

    const recipients = [{ email: cleanDestinationEmail, name: 'Dexvoi' }];
    if (cleanDestinationEmail !== PRIMARY_DESTINATION) {
      recipients.push({ email: PRIMARY_DESTINATION, name: 'Dexvoi Backup' });
    }

    // 1. Envío principal mediante Brevo
    if (cleanBrevoKey) {
      try {
        let brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': cleanBrevoKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: { 
              name: cleanSenderName, 
              email: cleanSenderEmail 
            },
            to: recipients,
            subject: adminSubject,
            htmlContent: adminHtml,
            textContent: adminText,
          }),
        });

        if (brevoRes.ok) {
          emailSent = true;
          provider = 'brevo';
        } else {
          const firstErrText = await brevoRes.text();
          console.warn('[Brevo Initial Attempt Failed]:', firstErrText);

          // Reintento con remitente base garantizado info@dexvoi.com
          const retryRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': cleanBrevoKey,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              sender: { name: 'Dexvoi', email: 'info@dexvoi.com' },
              to: [{ email: PRIMARY_DESTINATION, name: 'Dexvoi' }],
              subject: adminSubject,
              htmlContent: adminHtml,
              textContent: adminText,
            }),
          });

          if (retryRes.ok) {
            emailSent = true;
            provider = 'brevo';
            lastError = null;
          } else {
            const retryErr = await retryRes.text();
            lastError = `Brevo HTTP ${retryRes.status}: ${retryErr}`;
            console.warn('[Brevo Retry Failed]:', lastError);
          }
        }
      } catch (e: any) {
        lastError = `Brevo exception: ${e?.message}`;
        console.warn('Brevo edge dispatch failed:', e);
      }
    } else {
      lastError = 'BREVO_API_KEY no configurada en las variables de entorno de Cloudflare';
    }

    // 2. Respaldo secundario mediante Resend si Brevo no tuvo éxito
    const cleanResendKey = (env?.RESEND_API_KEY || '').replace(/['"]/g, '').trim();
    if (!emailSent && cleanResendKey) {
      try {
        const toEmails = [cleanDestinationEmail];
        if (cleanDestinationEmail !== PRIMARY_DESTINATION) toEmails.push(PRIMARY_DESTINATION);

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanResendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Leads <onboarding@resend.dev>',
            to: toEmails,
            subject: adminSubject,
            html: adminHtml,
            text: adminText,
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

    // 3. Confirmación automática al cliente con la plantilla dinámica si el envío fue exitoso y el cliente facilitó email
    if (emailSent && email && email.includes('@')) {
      if (provider === 'brevo' && cleanBrevoKey) {
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': cleanBrevoKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { 
              name: 'Dexvoi', 
              email: 'info@dexvoi.com' 
            },
            to: [{ email: email.trim(), name: fullName || 'Cliente' }],
            subject: userSubject,
            htmlContent: userHtml,
            textContent: userText,
          }),
        }).catch((err) => console.warn('Client confirmation via Brevo failed:', err));
      } else if (provider === 'resend' && cleanResendKey) {
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanResendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi <onboarding@resend.dev>',
            to: [email.trim()],
            subject: userSubject,
            html: userHtml,
            text: userText,
          }),
        }).catch((err) => console.warn('Client confirmation via Resend failed:', err));
      }
    }

    return new Response(
      JSON.stringify({
        success: emailSent,
        ticketId: leadTicket,
        emailSent,
        provider,
        destinationEmail: cleanDestinationEmail,
        errorDetails: emailSent ? undefined : lastError,
      }),
      { status: emailSent ? 200 : 502, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error procesando solicitud.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
