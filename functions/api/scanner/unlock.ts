import {
  getFormCategoryConfig,
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildUserConfirmationHtml,
  buildUserConfirmationText,
} from '../_emailTemplates.ts';

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
 * Dispatches tailored notifications to info@dexvoi.com and confirmation to the user.
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

    const cleanEmailStr = (raw?: string, fallback = PRIMARY_DESTINATION): string => {
      if (!raw) return fallback;
      const stripped = raw.replace(/['"]/g, '').trim().toLowerCase();
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stripped) ? stripped : fallback;
    };

    const cleanBrevoKey = (env?.BREVO_API_KEY || (env as any)?.SIB_API_KEY || '').replace(/['"]/g, '').trim();
    const cleanSenderEmail = cleanEmailStr(env?.BREVO_SENDER_EMAIL, PRIMARY_DESTINATION);
    const cleanSenderName = (env?.BREVO_SENDER_NAME || 'Dexvoi').replace(/['"]/g, '').trim() || 'Dexvoi';
    const destinationEmail = cleanEmailStr(env?.NOTIFICATION_EMAIL, PRIMARY_DESTINATION);

    const cleanTarget = String(websiteUrl || 'dexvoi.com').replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
    const cleanEmail = email.trim().toLowerCase();
    const ticketId = `SCAN-${Math.floor(100000 + Math.random() * 900000)}`;

    const templatePayload = {
      formType: 'Escáner OSINT',
      fullName,
      email: cleanEmail,
      phone,
      websiteUrl: cleanTarget,
      businessType,
      technicalDetails: {
        overallScore,
        grade,
        issuesCount,
      },
    };

    const config = getFormCategoryConfig('osint_scanner', templatePayload, ticketId);
    const adminSubject = config.adminSubject;
    const adminHtml = buildAdminNotificationHtml(templatePayload, ticketId, destinationEmail);
    const adminText = buildAdminNotificationText(templatePayload, ticketId, destinationEmail);

    const userSubject = config.userSubject;
    const userHtml = buildUserConfirmationHtml(templatePayload, ticketId);
    const userText = buildUserConfirmationText(templatePayload, ticketId);

    let emailSent = false;
    let provider = 'none';
    let lastError: string | null = null;

    const recipients = [{ email: destinationEmail, name: 'Dexvoi' }];
    if (destinationEmail !== PRIMARY_DESTINATION) {
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
          // Reintento con remitente base garantizado
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
            lastError = await retryRes.text();
            console.warn('[Brevo Scanner Unlock Error]:', lastError);
          }
        }
      } catch (e: any) {
        lastError = e?.message;
        console.warn('Brevo edge dispatch failed:', e);
      }
    }

    // 2. Respaldo secundario mediante Resend
    const cleanResendKey = (env?.RESEND_API_KEY || '').replace(/['"]/g, '').trim();
    if (!emailSent && cleanResendKey) {
      try {
        const toEmails = [destinationEmail];
        if (destinationEmail !== PRIMARY_DESTINATION) toEmails.push(PRIMARY_DESTINATION);

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanResendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Scanner <onboarding@resend.dev>',
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
          lastError = await resendRes.text();
        }
      } catch (e: any) {
        lastError = e?.message;
        console.warn('Resend edge dispatch failed:', e);
      }
    }

    // 3. Confirmación al usuario si facilitó email
    if (cleanEmail && cleanEmail.includes('@')) {
      if (provider === 'brevo' && cleanBrevoKey) {
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': cleanBrevoKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Dexvoi', email: 'info@dexvoi.com' },
            to: [{ email: cleanEmail, name: fullName || 'Cliente' }],
            subject: userSubject,
            htmlContent: userHtml,
            textContent: userText,
          }),
        }).catch((err) => console.warn('User confirmation scan unlock failed:', err));
      } else if (provider === 'resend' && cleanResendKey) {
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanResendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi <onboarding@resend.dev>',
            to: [cleanEmail],
            subject: userSubject,
            html: userHtml,
            text: userText,
          }),
        }).catch((err) => console.warn('User confirmation scan unlock failed:', err));
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        unlocked: true,
        ticketId,
        emailSent,
        provider,
        destinationEmail,
        errorDetails: emailSent ? undefined : lastError,
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
