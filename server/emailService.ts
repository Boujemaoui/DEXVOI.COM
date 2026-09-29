import { Resend } from 'resend';
import { saveLeadToStorage, updateLeadDeliveryStatus, StoredLead } from './leadStorage.ts';
import {
  normalizeFormCategory,
  getFormCategoryConfig,
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildUserConfirmationHtml,
  buildUserConfirmationText,
  EmailTemplatePayload,
} from './emailTemplates.ts';

export interface LeadNotificationPayload extends EmailTemplatePayload {
  formType: string;
}

export interface EmailDispatchResult {
  success: boolean;
  leadId: string;
  ticketId: string;
  adminNotified: boolean;
  userConfirmed: boolean;
  provider: 'brevo' | 'resend' | 'local_fallback';
  adminEmail: string;
  error?: string;
}

// Destinatario oficial de todos los leads, consultas y solicitudes
const PRIMARY_DESTINATION = 'info@dexvoi.com';

/**
 * Dispatch email via Brevo REST API v3
 * Configured with:
 * - BREVO_API_KEY
 * - BREVO_SENDER_EMAIL (defaults to info@dexvoi.com)
 * - BREVO_SENDER_NAME (defaults to Dexvoi)
 */
async function sendViaBrevo(
  apiKey: string,
  to: Array<{ email: string; name?: string }>,
  subject: string,
  html: string,
  text: string,
  replyTo?: { email: string; name?: string }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const senderEmail = (process.env.BREVO_SENDER_EMAIL || 'info@dexvoi.com').replace(/['"]/g, '').trim() || 'info@dexvoi.com';
    const senderName = (process.env.BREVO_SENDER_NAME || 'Dexvoi').replace(/['"]/g, '').trim() || 'Dexvoi';

    const payload: any = {
      sender: { name: senderName, email: senderEmail },
      to,
      subject,
      htmlContent: html,
      textContent: text,
    };

    if (replyTo && replyTo.email) {
      payload.replyTo = replyTo;
    }

    const cleanKey = apiKey.replace(/['"]/g, '').trim();

    let response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': cleanKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Reintento automático con remitente por defecto si falló
    if (!response.ok && senderEmail !== 'info@dexvoi.com') {
      console.warn(`[Brevo] Falló con ${senderEmail}, reintentando con info@dexvoi.com...`);
      payload.sender = { name: 'Dexvoi', email: 'info@dexvoi.com' };
      response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': cleanKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }

    const resJson: any = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errMsg = resJson?.message || `Brevo API HTTP ${response.status}`;
      return { success: false, error: errMsg };
    }

    return { success: true, messageId: resJson.messageId || 'brevo-sent' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error de conexión con Brevo' };
  }
}

/**
 * Fallback to Resend if Brevo key is not yet set or encountered a transient error
 */
async function sendViaResend(
  apiKey: string,
  to: string[],
  subject: string,
  html: string,
  fromEmail: string = 'info@dexvoi.com',
  replyTo?: string
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const resend = new Resend(apiKey.trim());

    let res = await resend.emails.send({
      from: `Dexvoi <${fromEmail}>`,
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
    });

    if (res.error && (res.error.message?.includes('domain') || res.error.message?.includes('verify') || res.error.message?.includes('from'))) {
      console.warn(`[Resend] Fallback from ${fromEmail} to onboarding@resend.dev due to:`, res.error.message);
      res = await resend.emails.send({
        from: 'Dexvoi Leads <onboarding@resend.dev>',
        to,
        subject,
        html,
        replyTo: replyTo || undefined,
      });
    }

    if (res.error) {
      return { success: false, error: res.error.message };
    }

    return { success: true, id: res.data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error con Resend' };
  }
}

/**
 * Master Lead Handler:
 * 1. Generates unique Ticket ID
 * 2. Saves lead persistently to disk (data/leads.json and data/leads.log) so no lead is lost
 * 3. Sends notification to info@dexvoi.com via Brevo (Sendinblue)
 * 4. Sends automated confirmation email to the user if email provided
 * 
 * Note: Cloudflare Email Workers integration remains on hold until the paid plan is contracted.
 */
export async function processLeadSubmission(payload: LeadNotificationPayload): Promise<EmailDispatchResult> {
  const ticketId = payload.ticketId || `DEXVOI-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  
  // 1. Persist lead immediately to disk so it's NEVER lost
  const storedLead: StoredLead = saveLeadToStorage({
    ticketId,
    formType: payload.formType,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    websiteUrl: payload.websiteUrl,
    businessType: payload.businessType,
    primaryConcern: payload.primaryConcern,
    message: payload.message,
    technicalDetails: payload.technicalDetails,
    clientIp: payload.clientIp,
    userAgent: payload.userAgent,
    emailStatus: {
      dispatchedToAdmin: false,
      adminEmail: PRIMARY_DESTINATION,
    },
    confirmationStatus: payload.email ? {
      sentToUser: false,
      userEmail: payload.email,
    } : undefined,
  });

  const category = normalizeFormCategory(payload.formType, payload);
  const config = getFormCategoryConfig(category, payload, ticketId);

  const adminSubject = config.adminSubject;
  const adminHtml = buildAdminNotificationHtml(payload, ticketId, PRIMARY_DESTINATION);
  const adminText = buildAdminNotificationText(payload, ticketId, PRIMARY_DESTINATION);

  const userSubject = config.userSubject;
  const userHtml = buildUserConfirmationHtml(payload, ticketId);
  const userText = buildUserConfirmationText(payload, ticketId);

  let adminDispatched = false;
  let userConfirmed = false;
  let providerUsed: EmailDispatchResult['provider'] = 'local_fallback';
  let lastError: string | undefined;

  const brevoKey = process.env.BREVO_API_KEY || process.env.SIB_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  // Destinatarios: siempre incluye info@dexvoi.com
  const adminRecipients: string[] = [PRIMARY_DESTINATION];
  if (process.env.NOTIFICATION_EMAIL && process.env.NOTIFICATION_EMAIL.toLowerCase() !== PRIMARY_DESTINATION.toLowerCase()) {
    adminRecipients.push(process.env.NOTIFICATION_EMAIL.trim());
  }

  // --- Sistema Exclusivo Principal: Brevo ---
  if (brevoKey) {
    console.log(`📨 [EmailService] Enviando lead a ${adminRecipients.join(', ')} a través de Brevo...`);
    const brevoResult = await sendViaBrevo(
      brevoKey,
      adminRecipients.map((em) => ({ email: em, name: 'Dexvoi' })),
      adminSubject,
      adminHtml,
      adminText,
      payload.email ? { email: payload.email, name: payload.fullName || 'Lead Dexvoi' } : undefined
    );

    if (brevoResult.success) {
      adminDispatched = true;
      providerUsed = 'brevo';
      console.log(`✅ [EmailService] Notificación entregada a ${adminRecipients.join(', ')} vía Brevo!`);

      // Enviar confirmación automática adaptada al usuario si proporcionó su email
      if (payload.email) {
        const userConfirmResult = await sendViaBrevo(
          brevoKey,
          [{ email: payload.email, name: payload.fullName || 'Cliente' }],
          userSubject,
          userHtml,
          userText
        );
        userConfirmed = userConfirmResult.success;
        if (userConfirmed) {
          console.log(`🎉 [EmailService] Confirmación dinámica entregada a ${payload.email} vía Brevo!`);
        }
      }
    } else {
      console.warn(`⚠️ [EmailService] Brevo reportó error: ${brevoResult.error}.`);
      lastError = brevoResult.error;
    }
  }

  // --- Respaldo secundario si Brevo no está configurado aún en variables de entorno ---
  if (!adminDispatched && resendKey) {
    console.log(`📨 [EmailService] Usando Resend como respaldo secundario...`);
    const resendResult = await sendViaResend(
      resendKey,
      adminRecipients,
      adminSubject,
      adminHtml,
      'info@dexvoi.com',
      payload.email
    );

    if (resendResult.success) {
      adminDispatched = true;
      providerUsed = 'resend';
      console.log(`✅ [EmailService] Notificación entregada a ${adminRecipients.join(', ')} vía Resend!`);

      if (payload.email) {
        const userRes = await sendViaResend(
          resendKey,
          [payload.email],
          userSubject,
          userHtml,
          'info@dexvoi.com'
        );
        userConfirmed = userRes.success;
      }
    } else {
      lastError = resendResult.error;
    }
  }

  // Si ningún proveedor remoto está configurado:
  if (!adminDispatched) {
    console.log(`📋 [EmailService] Lead guardado de forma segura en disco en data/leads.json.`);
    console.log(`   Expediente: ${ticketId}`);
    console.log(`   Destinatario configurado: ${PRIMARY_DESTINATION}`);
    console.log(`   Datos capturados:`, {
      formType: payload.formType,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      websiteUrl: payload.websiteUrl,
    });
  }

  // Actualizar estado en almacenamiento persistente
  updateLeadDeliveryStatus(storedLead.id, {
    emailStatus: {
      dispatchedToAdmin: adminDispatched,
      provider: providerUsed,
      adminEmail: PRIMARY_DESTINATION,
      dispatchedAt: adminDispatched ? new Date().toISOString() : undefined,
      error: lastError,
    },
    confirmationStatus: payload.email ? {
      sentToUser: userConfirmed,
      userEmail: payload.email,
      dispatchedAt: userConfirmed ? new Date().toISOString() : undefined,
    } : undefined,
  });

  return {
    success: true,
    leadId: storedLead.id,
    ticketId,
    adminNotified: adminDispatched,
    userConfirmed,
    provider: providerUsed,
    adminEmail: PRIMARY_DESTINATION,
    error: lastError,
  };
}
