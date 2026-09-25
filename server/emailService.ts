import { Resend } from 'resend';
import { saveLeadToStorage, updateLeadDeliveryStatus, StoredLead } from './leadStorage.ts';

export interface LeadNotificationPayload {
  formType: string; // e.g. "Escáner OSINT", "Formulario de Contacto", "Auditoría Gratuita 5 Puntos", "Checkout Auditoría OSINT", etc.
  fullName?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  businessType?: string;
  primaryConcern?: string;
  message?: string;
  ticketId?: string;
  technicalDetails?: {
    overallScore?: number | string;
    grade?: string;
    issuesCount?: number;
    responseTimeMs?: number;
    rawDetails?: any;
  };
  clientIp?: string;
  userAgent?: string;
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
 * Format clean, highly readable HTML for admin notification to info@dexvoi.com
 */
function buildAdminNotificationHtml(data: LeadNotificationPayload, ticket: string): string {
  const cleanUrl = data.websiteUrl
    ? (data.websiteUrl.startsWith('http') ? data.websiteUrl : `https://${data.websiteUrl}`)
    : null;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nuevo Lead Dexvoi</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0F1F; color: #FFFFFF; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #0D1326; border: 1px solid #0066FF; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0066FF, #003399); padding: 24px; text-align: left;">
      <div style="display: inline-block; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #F5A623; margin-bottom: 8px;">
        Notificación Comercial Dexvoi
      </div>
      <h1 style="margin: 0; font-size: 22px; color: #FFFFFF; font-weight: 800;">
        🔔 Nuevo Lead Recibido
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 14px; color: #E0E7FF;">
        Tipo: <strong style="color: #FFFFFF;">${data.formType}</strong>
      </p>
    </div>

    <!-- Ticket & Timestamp Badge -->
    <div style="background: #131B33; padding: 12px 24px; border-bottom: 1px solid #1E293B; display: flex; justify-content: space-between; font-size: 13px; color: #94A3B8;">
      <div>Expediente: <strong style="color: #F5A623;">${ticket}</strong></div>
      <div style="text-align: right;">Fecha: <strong style="color: #FFFFFF;">${new Date().toLocaleString('es-ES', { timeZone: 'UTC' })} UTC</strong></div>
    </div>

    <!-- Body Data -->
    <div style="padding: 24px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 15px; color: #38BDF8; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #1E293B; padding-bottom: 8px;">
        📋 Datos Completos del Formulario
      </h3>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; width: 38%; vertical-align: top;"><strong>👤 Nombre:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600;">${data.fullName || '<span style="color: #64748B; font-weight: normal;">No indicado</span>'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;"><strong>📧 Email:</strong></td>
            <td style="padding: 8px 0;">
              ${data.email 
                ? `<a href="mailto:${data.email}" style="color: #38BDF8; font-weight: bold; text-decoration: none;">${data.email}</a>` 
                : '<span style="color: #64748B;">No indicado</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;"><strong>📱 Teléfono / WhatsApp:</strong></td>
            <td style="padding: 8px 0;">
              ${data.phone 
                ? `<a href="tel:${data.phone}" style="color: #10B981; font-weight: bold; text-decoration: none;">${data.phone}</a>` 
                : '<span style="color: #64748B;">No indicado</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;"><strong>🌐 Web o Dominio:</strong></td>
            <td style="padding: 8px 0;">
              ${cleanUrl 
                ? `<a href="${cleanUrl}" target="_blank" style="color: #F5A623; font-weight: bold; text-decoration: none;">${data.websiteUrl}</a>` 
                : '<span style="color: #64748B;">No indicado</span>'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;"><strong>🏢 Sector / Tipo:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF;">${data.businessType || 'General / No especificado'}</td>
          </tr>
          ${(data.message || data.primaryConcern) ? `
          <tr>
            <td style="padding: 8px 0; color: #94A3B8; vertical-align: top;"><strong>💬 Mensaje / Consulta:</strong></td>
            <td style="padding: 8px 0; color: #E2E8F0; background: #0A0F1F; padding: 12px; border-radius: 6px; border: 1px solid #1E293B;">
              ${(data.message || data.primaryConcern || '').replace(/\n/g, '<br/>')}
            </td>
          </tr>
          ` : ''}
        </tbody>
      </table>

      ${data.technicalDetails && (data.technicalDetails.overallScore !== undefined || data.technicalDetails.issuesCount !== undefined) ? `
      <!-- Technical Details Section -->
      <div style="margin-top: 24px; padding: 16px; background: #0A0F1F; border: 1px solid #1E293B; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #F5A623; text-transform: uppercase;">
          ⚙️ Métricas Técnicas Capturadas (Escáner)
        </h4>
        <div style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          ${data.technicalDetails.overallScore !== undefined ? `<div><strong>Puntuación Global:</strong> ${data.technicalDetails.overallScore}/100 (Grado ${data.technicalDetails.grade || 'N/A'})</div>` : ''}
          ${data.technicalDetails.issuesCount !== undefined ? `<div><strong>Vulnerabilidades / Incidencias:</strong> ${data.technicalDetails.issuesCount} detectadas</div>` : ''}
          ${data.technicalDetails.responseTimeMs !== undefined ? `<div><strong>Latencia Servidor (TTFB):</strong> ${data.technicalDetails.responseTimeMs}ms</div>` : ''}
        </div>
      </div>
      ` : ''}

      <!-- Action Buttons -->
      <div style="margin-top: 28px; text-align: center;">
        ${data.email ? `
        <a href="mailto:${data.email}?subject=Respuesta%20Dexvoi%20-%20Expediente%20${ticket}&body=Hola%20${encodeURIComponent(data.fullName || '')}%2C%0A%0AGracias%20por%20contactar%20con%20Dexvoi..." 
           style="display: inline-block; background: #0066FF; color: #FFFFFF; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 4px;">
          ✉️ Responder por Email
        </a>
        ` : ''}
        ${data.phone ? `
        <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(data.fullName || '')}%2C%20te%20escribimos%20desde%20Dexvoi%20respecto%20a%20tu%20solicitud..." 
           style="display: inline-block; background: #10B981; color: #FFFFFF; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 6px; margin: 4px;">
          💬 Abrir WhatsApp
        </a>
        ` : ''}
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #080C19; padding: 16px 24px; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B;">
      Este lead ha sido notificado a <strong>${PRIMARY_DESTINATION}</strong> y archivado de forma segura en la base de datos de Dexvoi.
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Format plain text for email clients that do not support HTML
 */
function buildAdminNotificationText(data: LeadNotificationPayload, ticket: string): string {
  return `
🔔 NUEVO LEAD DESDE DEXVOI - ${data.formType}
==================================================
Expediente: ${ticket}
Fecha: ${new Date().toISOString()}

DATOS DEL CLIENTE:
- Nombre: ${data.fullName || 'No indicado'}
- Email: ${data.email || 'No indicado'}
- Teléfono: ${data.phone || 'No indicado'}
- Web / Dominio: ${data.websiteUrl || 'No indicado'}
- Sector: ${data.businessType || 'No especificado'}
- Mensaje / Preocupación: ${data.message || data.primaryConcern || 'No indicado'}

${data.technicalDetails ? `
MÉTRICAS TÉCNICAS:
- Score: ${data.technicalDetails.overallScore ?? 'N/A'}/100 (Grado ${data.technicalDetails.grade ?? 'N/A'})
- Incidencias: ${data.technicalDetails.issuesCount ?? 0}
- Latencia: ${data.technicalDetails.responseTimeMs ? `${data.technicalDetails.responseTimeMs}ms` : 'N/A'}
` : ''}

Notificación enviada a: ${PRIMARY_DESTINATION}
==================================================
  `.trim();
}

/**
 * Format automated confirmation email for the user
 */
function buildUserConfirmationHtml(data: LeadNotificationPayload, ticket: string): string {
  const userName = data.fullName ? data.fullName.trim() : 'Estimado/a cliente';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmación Dexvoi</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0A0F1F; color: #FFFFFF; margin: 0; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background: #0D1326; border: 1px solid #1E293B; border-radius: 12px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
    <div style="border-bottom: 1px solid #1E293B; padding-bottom: 16px; margin-bottom: 20px;">
      <h2 style="color: #0066FF; margin: 0 0 6px 0; font-size: 22px;">Dexvoi · Arquitectura Digital & Ciberseguridad</h2>
      <p style="color: #94A3B8; font-size: 13px; margin: 0;">Expediente Técnico: <strong style="color: #F5A623;">${ticket}</strong></p>
    </div>

    <p style="font-size: 15px; color: #E2E8F0; line-height: 1.6;">
      Hola <strong>${userName}</strong>,
    </p>

    <p style="font-size: 14px; color: #CBD5E1; line-height: 1.6;">
      Hemos recibido correctamente tu solicitud a través de nuestro <strong>${data.formType}</strong>. Nuestro equipo de ingenieros ya tiene asignado tu expediente para revisión técnica.
    </p>

    <div style="background: #131B33; border: 1px solid #1E293B; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.7; color: #CBD5E1;">
      ${data.websiteUrl ? `<div><strong>Sitio Web / Dominio:</strong> <span style="color: #38BDF8;">${data.websiteUrl}</span></div>` : ''}
      <div><strong>Tipo de Solicitud:</strong> ${data.formType}</div>
      <div><strong>Compromiso de Respuesta:</strong> <span style="color: #10B981; font-weight: bold;">En menos de 24 horas laborables</span></div>
    </div>

    <p style="font-size: 13px; color: #94A3B8; line-height: 1.6;">
      Si necesitas aportar información adicional de forma urgente, puedes responder directamente a este correo (<a href="mailto:info@dexvoi.com" style="color: #38BDF8;">info@dexvoi.com</a>).
    </p>

    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #1E293B; font-size: 12px; color: #64748B;">
      Dexvoi · Madrid · Casablanca · Londres<br/>
      <a href="https://dexvoi.com" style="color: #38BDF8; text-decoration: none;">dexvoi.com</a> · <a href="mailto:info@dexvoi.com" style="color: #38BDF8; text-decoration: none;">info@dexvoi.com</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

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
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'info@dexvoi.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Dexvoi';

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

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey.trim(),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

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

  const subject = `🔔 Nuevo lead desde Dexvoi - ${payload.formType}`;
  const adminHtml = buildAdminNotificationHtml(payload, ticketId);
  const adminText = buildAdminNotificationText(payload, ticketId);

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
      subject,
      adminHtml,
      adminText,
      payload.email ? { email: payload.email, name: payload.fullName || 'Lead Dexvoi' } : undefined
    );

    if (brevoResult.success) {
      adminDispatched = true;
      providerUsed = 'brevo';
      console.log(`✅ [EmailService] Notificación entregada a ${adminRecipients.join(', ')} vía Brevo!`);

      // Enviar confirmación automática al usuario si proporcionó su email
      if (payload.email) {
        const userHtml = buildUserConfirmationHtml(payload, ticketId);
        const userConfirmResult = await sendViaBrevo(
          brevoKey,
          [{ email: payload.email, name: payload.fullName || 'Cliente' }],
          `Confirmación de solicitud en Dexvoi · ${payload.formType}`,
          userHtml,
          `Hola ${payload.fullName || ''}, hemos recibido tu solicitud con expediente ${ticketId}. Te responderemos en menos de 24h.`
        );
        userConfirmed = userConfirmResult.success;
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
      subject,
      adminHtml,
      'info@dexvoi.com',
      payload.email
    );

    if (resendResult.success) {
      adminDispatched = true;
      providerUsed = 'resend';
      console.log(`✅ [EmailService] Notificación entregada a ${adminRecipients.join(', ')} vía Resend!`);

      if (payload.email) {
        const userHtml = buildUserConfirmationHtml(payload, ticketId);
        const userRes = await sendViaResend(
          resendKey,
          [payload.email],
          `Confirmación de solicitud en Dexvoi · ${payload.formType}`,
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
