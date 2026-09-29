import {
  getFormCategoryConfig,
  buildAdminNotificationHtml,
  buildAdminNotificationText,
  buildUserConfirmationHtml,
  buildUserConfirmationText,
} from './_emailTemplates.ts';

export interface CloudflareEnv {
  GEMINI_API_KEY?: string;
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

const PRIMARY_DESTINATION = 'info@dexvoi.com';

export async function onRequestPost(context: { request: Request; env: CloudflareEnv }): Promise<Response> {
  const { request, env } = context;

  try {
    const body: any = await request.json();
    const { message, history } = body || {};

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'El mensaje es obligatorio.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const trimmed = message.trim();
    const lower = trimmed.toLowerCase();

    // Check if user provided contact details in chat (phone number or email) to notify info@dexvoi.com
    const emailMatch = trimmed.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = trimmed.match(/(?:\+?[0-9]{1,3}[-\s.]?)?\(?[0-9]{2,4}\)?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,5}/);
    const hasContactDetails = Boolean(emailMatch || (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8));

    if (hasContactDetails) {
      const destinationEmail = (env?.NOTIFICATION_EMAIL || PRIMARY_DESTINATION).trim();
      const ticketId = `CHAT-${Math.floor(100000 + Math.random() * 900000)}`;
      const templatePayload = {
        formType: 'Chat Asistente Virtual',
        fullName: 'Visitante Chat Dexvoi',
        email: emailMatch ? emailMatch[0] : undefined,
        phone: phoneMatch ? phoneMatch[0] : undefined,
        message: trimmed,
        primaryConcern: trimmed,
      };

      const config = getFormCategoryConfig('ai_chat', templatePayload, ticketId);
      const adminSubject = config.adminSubject;
      const adminHtml = buildAdminNotificationHtml(templatePayload, ticketId, destinationEmail);
      const adminText = buildAdminNotificationText(templatePayload, ticketId, destinationEmail);

      const userSubject = config.userSubject;
      const userHtml = buildUserConfirmationHtml(templatePayload, ticketId);
      const userText = buildUserConfirmationText(templatePayload, ticketId);

      const cleanBrevoKey = (env?.BREVO_API_KEY || (env as any)?.SIB_API_KEY || '').replace(/['"]/g, '').trim();
      const cleanSender = (env?.BREVO_SENDER_EMAIL || 'info@dexvoi.com').replace(/['"]/g, '').trim() || 'info@dexvoi.com';

      if (cleanBrevoKey) {
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': cleanBrevoKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Dexvoi Chat', email: cleanSender },
            to: [{ email: destinationEmail, name: 'Dexvoi' }],
            subject: adminSubject,
            htmlContent: adminHtml,
            textContent: adminText,
          }),
        }).catch((e) => console.warn('Chat lead Brevo dispatch warning:', e));

        // Enviar confirmación al usuario si facilitó email
        if (emailMatch) {
          fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': cleanBrevoKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: { name: 'Dexvoi', email: 'info@dexvoi.com' },
              to: [{ email: emailMatch[0], name: 'Cliente' }],
              subject: userSubject,
              htmlContent: userHtml,
              textContent: userText,
            }),
          }).catch((e) => console.warn('Chat user confirmation warning:', e));
        }
      } else if (env?.RESEND_API_KEY) {
        const cleanResendKey = env.RESEND_API_KEY.replace(/['"]/g, '').trim();
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cleanResendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Dexvoi Chat <onboarding@resend.dev>',
            to: [destinationEmail],
            subject: adminSubject,
            html: adminHtml,
            text: adminText,
          }),
        }).catch((e) => console.warn('Chat lead Resend dispatch warning:', e));

        if (emailMatch) {
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${cleanResendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Dexvoi <onboarding@resend.dev>',
              to: [emailMatch[0]],
              subject: userSubject,
              html: userHtml,
              text: userText,
            }),
          }).catch((e) => console.warn('Chat user confirmation warning:', e));
        }
      }
    }

    // Try Gemini API if key is present
    if (env?.GEMINI_API_KEY) {
      try {
        const systemPrompt = `Eres el Asistente de IA y Arquitecto Digital de Dexvoi (dexvoi.com).
Dexvoi ayuda a negocios locales (offline) y marcas online a blindar su infraestructura web, acelerar la velocidad a menos de 1 segundo, posicionarse en Google Maps / SEO y automatizar citas y pedidos 24/7.
Responde de forma concisa, profesional y de alta tecnología en el mismo idioma del usuario (francés, español o inglés).
Si el usuario desea una auditoría o propuesta, invítale a dejar su email o teléfono o pulsar en 'Auditoría Gratuita 5 Puntos'.`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nMensaje del usuario: ${trimmed}` }] }
            ],
          }),
        });

        if (geminiRes.ok) {
          const geminiData: any = await geminiRes.json();
          const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return new Response(JSON.stringify({ reply: text }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini chat error in edge worker:', geminiErr);
      }
    }

    // Fallback response with language detection
    const isSpanish = /(\b(hola|buenos|buenas|necesito|ayuda|cl[ií]nica|peluquer[ií]a|restaurante|negocio|madrid|barcelona|gracias|cu[aá]nto|c[oó]mo|qui[eé]n|por favor|s[ií]|informe|precio|auditor[ií]a)\b|[¿¡áéíóúñ])/.test(lower);
    const isEnglish = /(\b(hello|hi|hey|need|help|website|restaurant|clinic|dental|salon|business|london|rank|google|security|fast|pricing|cost|yes|audit|report)\b)/.test(lower);

    let reply = "Bonjour ! Je suis l'Architecte Digital virtuel de Dexvoi. Notre mission est d'optimiser la vitesse (< 1s), la sécurité et le référencement Google Maps pour les entreprises offline et online.\n\nQuel est votre site web ou secteur d'activité ?";
    if (isSpanish) {
      reply = "¡Hola! Soy el Arquitecto Digital virtual de Dexvoi. Blindamos la seguridad de tu web, aceleramos la carga a menos de 1s y automatizamos la captación de clientes en Google Maps y canales digitales.\n\n¿Cuál es la URL de tu negocio o tu sector principal?";
    } else if (isEnglish) {
      reply = "Hello! I am Dexvoi's virtual Digital Architect. We build sub-second web speed, perimeter security shields, and automate bookings & lead generation for offline and online businesses.\n\nWhat is your business website or industry?";
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Error en chat.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
