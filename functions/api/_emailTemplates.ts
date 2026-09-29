/**
 * DEXVOI · Sistema de Plantillas de Email Dinámicas y Multiformulario
 * 
 * Genera emails con la identidad visual corporativa de Dexvoi:
 * - Plantilla Interna (a info@dexvoi.com) con asunto adaptado, campos exclusivos y botones directos Email / WhatsApp.
 * - Plantilla de Confirmación al Usuario con expediente, promesa de respuesta < 24h y mensaje a medida por servicio.
 */

export type FormCategory = 
  | 'osint_scanner'
  | 'general_contact'
  | 'free_audit'
  | 'web_architecture'
  | 'seo_ads'
  | 'ethical_hacking'
  | 'appointment'
  | 'ai_chat';

export interface EmailTemplatePayload {
  formType?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  businessType?: string;
  primaryConcern?: string;
  message?: string;
  ticketId?: string;
  selectedService?: string;
  selectedSlot?: string;
  projectType?: string;
  keywords?: string;
  auditType?: string;
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

export interface FormCategoryConfig {
  category: FormCategory;
  name: string;
  badgeLabel: string;
  badgeColor: string; // hex
  badgeBorder: string; // hex
  adminSubject: string;
  userSubject: string;
  userIntroTitle: string;
  userIntroParagraph: string;
  userValuePropositionTitle: string;
  userValuePoints: string[];
  userNextStepNote: string;
}

/**
 * Normaliza y clasifica cualquier tipo de formulario o mensaje recibido en una de las 8 categorías oficiales
 */
export function normalizeFormCategory(rawType = '', payload: EmailTemplatePayload = {}): FormCategory {
  const combined = [
    rawType,
    payload.formType || '',
    payload.businessType || '',
    payload.selectedService || '',
    payload.primaryConcern || '',
    payload.message || '',
    payload.auditType || ''
  ].join(' ').toLowerCase();

  // 1. Escáner OSINT
  if (
    combined.includes('escáner') || 
    combined.includes('escaner') || 
    combined.includes('scanner') || 
    combined.includes('osint') ||
    payload.technicalDetails?.overallScore !== undefined
  ) {
    return 'osint_scanner';
  }

  // 2. Reserva de cita
  if (
    combined.includes('reserva') || 
    combined.includes('cita') || 
    combined.includes('agenda') || 
    combined.includes('appointment') ||
    payload.selectedSlot
  ) {
    return 'appointment';
  }

  // 3. Chat Asistente Virtual
  if (
    combined.includes('chat') || 
    combined.includes('asistente') || 
    combined.includes('virtual')
  ) {
    return 'ai_chat';
  }

  // 4. Auditoría gratuita 5 puntos
  if (
    combined.includes('auditoría gratuita') || 
    combined.includes('auditoria gratuita') || 
    combined.includes('5 puntos') || 
    combined.includes('diagnóstico rápido') ||
    combined.includes('diagnostico rapido') ||
    combined.includes('free audit')
  ) {
    return 'free_audit';
  }

  // 5. Ethical Hacking & Blindaje Digital
  if (
    combined.includes('ethical') || 
    combined.includes('hacking') || 
    combined.includes('blindaje') || 
    combined.includes('pentest') || 
    combined.includes('ciberseguridad') ||
    combined.includes('vulnerabilidad')
  ) {
    return 'ethical_hacking';
  }

  // 6. Posicionamiento Avanzado - SEO & Ads
  if (
    combined.includes('seo') || 
    combined.includes('ads') || 
    combined.includes('posicionamiento') || 
    combined.includes('google maps') || 
    combined.includes('local pack') ||
    payload.keywords
  ) {
    return 'seo_ads';
  }

  // 7. Arquitectura Web & Sistemas
  if (
    combined.includes('arquitectura') || 
    combined.includes('sistemas') || 
    combined.includes('desarrollo') || 
    combined.includes('jamstack') ||
    payload.projectType
  ) {
    return 'web_architecture';
  }

  // 8. Contacto General (por defecto)
  return 'general_contact';
}

/**
 * Obtiene la configuración de textos, asuntos y datos según la categoría
 */
export function getFormCategoryConfig(
  category: FormCategory, 
  payload: EmailTemplatePayload, 
  ticket: string
): FormCategoryConfig {
  const name = (payload.fullName || '').trim() || 'Cliente';
  const target = (payload.websiteUrl || '').replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim() || 'sitio web';
  const score = payload.technicalDetails?.overallScore ?? 'N/A';
  const grade = payload.technicalDetails?.grade ?? 'N/A';
  const slot = payload.selectedSlot || 'Franja pendiente de asignación';
  const service = payload.selectedService || 'Consultoría Estratégica';
  const sector = payload.businessType || 'General';

  switch (category) {
    case 'osint_scanner':
      return {
        category,
        name: 'Escáner OSINT',
        badgeLabel: '🛡️ ESCÁNER PERIMETRAL OSINT',
        badgeColor: '#0066FF',
        badgeBorder: '#38BDF8',
        adminSubject: `🛡️ [Escáner OSINT] Diagnóstico generado: ${target} (${score}/100 - Grado ${grade})`,
        userSubject: `🛡️ Diagnóstico de Seguridad OSINT (${target}) · Dexvoi [${ticket}]`,
        userIntroTitle: 'Tu informe técnico perimetral ha sido generado',
        userIntroParagraph: `Hemos completado el reconocimiento pasivo y el análisis de superficie de ataque para <strong>${target}</strong> con número de expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Resumen del Análisis Preliminar:',
        userValuePoints: [
          `Puntuación perimetral obtenida: ${score}/100 (Grado ${grade}).`,
          `Vulnerabilidades e incidencias detectadas: ${payload.technicalDetails?.issuesCount ?? 0}.`,
          'Inspección de cabeceras HTTP de protección (HSTS, Content-Security-Policy, X-Frame-Options).',
          'Verificación de cifrado SSL/TLS 1.3 y tiempo de latencia TTFB del servidor.'
        ],
        userNextStepNote: 'Uno de nuestros ingenieros perimetrales revisará los vectores de riesgo detectados y te contactará en menos de 24 horas si identificamos vulnerabilidades de alto impacto para tu negocio.'
      };

    case 'free_audit':
      return {
        category,
        name: 'Auditoría Gratuita 5 Puntos',
        badgeLabel: '⚡ AUDITORÍA TÉCNICA 5 PUNTOS',
        badgeColor: '#F5A623',
        badgeBorder: '#F5A623',
        adminSubject: `⚡ [Auditoría 5 Puntos] Solicitud prioritaria para ${target} (${name})`,
        userSubject: `⚡ Tu Auditoría Técnica de 5 Puntos está en cola · Dexvoi [${ticket}]`,
        userIntroTitle: 'Solicitud de diagnóstico técnico en marcha',
        userIntroParagraph: `Hola <strong>${name}</strong>, tu solicitud de auditoría técnica perimetral para <strong>${target}</strong> ha entrado en la cola prioritaria de análisis bajo el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Los 5 vectores que nuestro equipo está analizando:',
        userValuePoints: [
          '1. Cifrado y robustez de certificados SSL/TLS y suites criptográficas.',
          '2. Rendimiento Core Web Vitals (LCP, INP, CLS) en dispositivos móviles y de escritorio.',
          '3. Posicionamiento local e indexación en el Local 3-Pack de Google Maps.',
          '4. Cabeceras HTTP defensivas contra ataques XSS, clickjacking y spoofing.',
          '5. Tiempo de respuesta inicial del servidor (TTFB) y cuellos de botella.'
        ],
        userNextStepNote: 'Nuestro equipo de ingeniería compilará los resultados y te entregará el diagnóstico detallado con soluciones viables en menos de 24 horas laborables.'
      };

    case 'web_architecture':
      return {
        category,
        name: 'Arquitectura Web & Sistemas',
        badgeLabel: '🚀 ARQUITECTURA WEB & SISTEMAS',
        badgeColor: '#0066FF',
        badgeBorder: '#0066FF',
        adminSubject: `🚀 [Arquitectura Web] Proyecto de desarrollo/sistemas: ${name} (${sector})`,
        userSubject: `🚀 Proyecto de Arquitectura Web recibido · Dexvoi [${ticket}]`,
        userIntroTitle: 'Propuesta de arquitectura digital en proceso',
        userIntroParagraph: `Hola <strong>${name}</strong>, hemos recibido los requerimientos de tu proyecto de infraestructura web o desarrollo de sistemas con el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Pilares de la ingeniería Dexvoi aplicada a tu proyecto:',
        userValuePoints: [
          'Arquitectura desacoplada Jamstack ultrarrápida con tiempos de carga bajo 300ms.',
          'Despliegue perimetral en Edge Global con tolerancia a caídas y cero saturación.',
          'Motores de reservas o conversión directos con 0% de comisiones a terceros.',
          'Propiedad íntegra del código fuente y de la base de datos sin ataduras.'
        ],
        userNextStepNote: 'Un arquitecto de software senior analizará la viabilidad y alcance técnico de tu proyecto y te responderá en menos de 24 horas laborables.'
      };

    case 'seo_ads':
      return {
        category,
        name: 'Posicionamiento Avanzado - SEO & Ads',
        badgeLabel: '📈 POSICIONAMIENTO AVANZADO (SEO LOCAL & ADS)',
        badgeColor: '#10B981',
        badgeBorder: '#10B981',
        adminSubject: `📈 [SEO & Ads] Estrategia de posicionamiento para ${target} (${name})`,
        userSubject: `📈 Solicitud de Posicionamiento Local & Ads recibida · Dexvoi [${ticket}]`,
        userIntroTitle: 'Estrategia de captación y dominancia local',
        userIntroParagraph: `Hola <strong>${name}</strong>, hemos recibido tu solicitud para escalar la captación de clientes cualificados para <strong>${target}</strong> con el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Enfoque técnico de captación Dexvoi:',
        userValuePoints: [
          'Auditoría de visibilidad en el Local 3-Pack de Google Maps frente a competidores directos.',
          'Análisis de canibalización de palabras clave y señales geolocalizadas.',
          'Estructura de arquitectura de conversión para multiplicar llamadas y reservas.',
          'Diseño de pauta publicitaria ultra-segmentada de alto retorno sobre la inversión (ROAS).'
        ],
        userNextStepNote: 'Prepararemos una evaluación preliminar de tus oportunidades de posicionamiento y te contactaremos en menos de 24 horas.'
      };

    case 'ethical_hacking':
      return {
        category,
        name: 'Ethical Hacking & Blindaje Digital',
        badgeLabel: '🔒 ETHICAL HACKING & BLINDAJE DIGITAL',
        badgeColor: '#EF4444',
        badgeBorder: '#EF4444',
        adminSubject: `🔒 [Ethical Hacking] Solicitud de blindaje perimetral para ${target} (${name})`,
        userSubject: `🔒 Expediente Confidencial de Blindaje Digital · Dexvoi [${ticket}]`,
        userIntroTitle: 'Expediente de seguridad perimetral registrado (Confidencial)',
        userIntroParagraph: `Hola <strong>${name}</strong>, tu solicitud de auditoría de ciberseguridad para <strong>${target}</strong> ha sido registrada bajo estricto protocolo de confidencialidad con el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Protocolo de inspección defensiva:',
        userValuePoints: [
          'Evaluación de superficie expuesta bajo estándares internacionales OWASP Top 10.',
          'Detección de fugas en registros DNS corporativos (SPF, DKIM, DMARC) y spoofing.',
          'Análisis de puertos perimetrales abiertos y versiones de software vulnerables.',
          'Hoja de ruta con parches preventivos y remediación técnica inmediata.'
        ],
        userNextStepNote: 'Un especialista en Ethical Hacking examinará tus vectores perimetrales y se comunicará contigo de forma segura en menos de 24 horas.'
      };

    case 'appointment':
      return {
        category,
        name: 'Reserva de Cita en Agenda',
        badgeLabel: '📅 RESERVA DE CITA EN AGENDA',
        badgeColor: '#38BDF8',
        badgeBorder: '#0066FF',
        adminSubject: `📅 [Cita en Agenda] ${service} con ${name} · ${slot}`,
        userSubject: `📅 Cita Confirmada: ${service} (${slot}) · Dexvoi [${ticket}]`,
        userIntroTitle: 'Tu sesión estratégica ha sido programada',
        userIntroParagraph: `Hola <strong>${name}</strong>, tu reunión con el equipo de Dexvoi ha quedado reservada con el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Detalles de la sesión reservada:',
        userValuePoints: [
          `Servicio seleccionado: ${service}.`,
          `Horario agendado: ${slot}.`,
          `Negocio / Dominio: ${target}.`,
          'La sesión será 100% práctica, técnica y enfocada en resolver tus prioridades.'
        ],
        userNextStepNote: 'Antes de la reunión, revisaremos previamente tu presencia digital para que la sesión aporte valor desde el minuto uno. Te enviaremos el enlace de acceso directo (Google Meet) antes de la cita.'
      };

    case 'ai_chat':
      return {
        category,
        name: 'Chat Asistente Virtual',
        badgeLabel: '🤖 ASISTENTE VIRTUAL · LEAD EN TIEMPO REAL',
        badgeColor: '#A855F7',
        badgeBorder: '#A855F7',
        adminSubject: `🤖 [Chat IA] Nuevo lead capturado: ${name}`,
        userSubject: `🤖 Continuación de tu consulta en Dexvoi · Expediente [${ticket}]`,
        userIntroTitle: 'Transferencia directa a nuestro equipo técnico',
        userIntroParagraph: `Hola <strong>${name}</strong>, hemos recibido la consulta que iniciaste en el asistente virtual de dexvoi.com bajo el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Estado de tu consulta:',
        userValuePoints: [
          'La transcripción y requerimientos de tu chat han sido transferidos a un ingeniero.',
          'Analizaremos los detalles expuestos para darte una respuesta técnica concreta.',
          'Sin respuestas automáticas genéricas: un especialista te orientará personalmente.'
        ],
        userNextStepNote: 'Revisaremos tu consulta y nos pondremos en contacto contigo en menos de 24 horas laborables para continuar la conversación.'
      };

    case 'general_contact':
    default:
      return {
        category: 'general_contact',
        name: 'Contacto General',
        badgeLabel: '📩 CONTACTO COMERCIAL & CONSULTA DIRECTA',
        badgeColor: '#0066FF',
        badgeBorder: '#0066FF',
        adminSubject: `📩 [Contacto General] Nueva consulta de ${name} - ${sector}`,
        userSubject: `📩 Mensaje recibido · Equipo de Arquitectos Dexvoi [${ticket}]`,
        userIntroTitle: 'Hemos recibido tu consulta técnica',
        userIntroParagraph: `Hola <strong>${name}</strong>, hemos recibido tu mensaje a través de nuestro formulario oficial con el expediente <strong>${ticket}</strong>.`,
        userValuePropositionTitle: 'Compromiso de atención Dexvoi:',
        userValuePoints: [
          'Trato directo con ingenieros de software y consultores de conversión.',
          'Cero comerciales agresivos ni tácticas de venta invasivas.',
          'Análisis objetivo de tus requerimientos para ofrecerte la solución adecuada.',
          'Respuesta garantizada en menos de 24 horas laborables.'
        ],
        userNextStepNote: 'Un especialista técnico revisará tu consulta y te responderá en menos de 24 horas laborables para orientarte en lo que necesites.'
      };
  }
}

/**
 * Genera el HTML de la Notificación Interna para info@dexvoi.com
 * Muestra ÚNICAMENTE los campos relevantes del formulario seleccionado
 * e incluye botones de acción rápida para responder por Email y por WhatsApp.
 */
export function buildAdminNotificationHtml(
  payload: EmailTemplatePayload, 
  ticket: string,
  destinationEmail = 'info@dexvoi.com'
): string {
  const category = normalizeFormCategory(payload.formType, payload);
  const config = getFormCategoryConfig(category, payload, ticket);

  const cleanPhone = payload.phone ? payload.phone.replace(/[^0-9]/g, '') : '';
  const cleanUrl = payload.websiteUrl
    ? (payload.websiteUrl.startsWith('http') ? payload.websiteUrl : `https://${payload.websiteUrl}`)
    : null;
  const userName = (payload.fullName || '').trim() || 'Cliente';

  // Construcción de filas de tabla dinámicas según la categoría
  const rows: Array<{ label: string; value: string; color?: string }> = [];

  if (payload.fullName) {
    rows.push({ label: '👤 Nombre del Contacto:', value: payload.fullName, color: '#FFFFFF' });
  }

  if (payload.email) {
    rows.push({ 
      label: '📧 Correo Electrónico:', 
      value: `<a href="mailto:${payload.email}" style="color: #38BDF8; font-weight: bold; text-decoration: none;">${payload.email}</a>` 
    });
  }

  if (payload.phone) {
    rows.push({ 
      label: '📱 Teléfono / WhatsApp:', 
      value: `<a href="tel:${payload.phone}" style="color: #10B981; font-weight: bold; text-decoration: none;">${payload.phone}</a>` 
    });
  }

  if (payload.websiteUrl) {
    rows.push({ 
      label: '🌐 Web / Dominio Objetivo:', 
      value: cleanUrl 
        ? `<a href="${cleanUrl}" target="_blank" style="color: #F5A623; font-weight: bold; text-decoration: underline;">${payload.websiteUrl}</a>` 
        : payload.websiteUrl 
    });
  }

  // Campos específicos según categoría
  if (category === 'appointment') {
    if (payload.selectedService) {
      rows.push({ label: '🎯 Servicio Reservado:', value: `<strong style="color: #F5A623;">${payload.selectedService}</strong>` });
    }
    if (payload.selectedSlot) {
      rows.push({ label: '📅 Horario de la Cita:', value: `<strong style="color: #38BDF8;">${payload.selectedSlot}</strong>` });
    }
  }

  if (payload.businessType && category !== 'ai_chat') {
    rows.push({ label: '🏢 Sector de Actividad:', value: payload.businessType });
  }

  if (payload.projectType) {
    rows.push({ label: '🚀 Tipo de Proyecto:', value: payload.projectType });
  }

  if (payload.keywords) {
    rows.push({ label: '🔍 Palabras Clave / Enfoque:', value: payload.keywords });
  }

  if (payload.auditType) {
    rows.push({ label: '🔒 Alcance de Auditoría:', value: payload.auditType });
  }

  const messageText = payload.message || payload.primaryConcern;
  if (messageText) {
    rows.push({ 
      label: category === 'ai_chat' ? '🤖 Conversación Chat:' : '💬 Consulta / Requerimientos:', 
      value: `<div style="background: #0A0F1F; border: 1px solid #1E293B; border-radius: 6px; padding: 12px; margin-top: 4px; color: #E2E8F0; font-family: monospace; font-size: 13px; line-height: 1.5; white-space: pre-wrap;">${messageText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>` 
    });
  }

  // Métricas del escáner si aplican
  const hasTechnicalDetails = payload.technicalDetails && (
    payload.technicalDetails.overallScore !== undefined || 
    payload.technicalDetails.issuesCount !== undefined
  );

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.adminSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0F1F; color: #FFFFFF; margin: 0; padding: 24px; line-height: 1.6;">
  
  <div style="max-width: 600px; margin: 0 auto; background: #0D1326; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="background: #080C19; border-bottom: 2px solid #0066FF; padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF;">
          DEX<span style="color: #F5A623;">VOI</span>
        </span>
        <span style="display: inline-block; background: #131B33; border: 1px solid ${config.badgeBorder}; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; color: #FFFFFF;">
          ${config.badgeLabel}
        </span>
      </div>
      <p style="margin: 0; font-size: 12px; font-family: monospace; color: #94A3B8;">
        Expediente: <strong style="color: #F5A623;">${ticket}</strong> | Recibido: ${new Date().toLocaleString('es-ES', { timeZone: 'UTC' })} UTC
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 24px;">
      
      <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #FFFFFF; font-weight: 700; border-bottom: 1px solid #1E293B; padding-bottom: 10px;">
        📋 Ficha de Datos del Cliente
      </h3>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>
          ${rows.map(r => `
            <tr>
              <td style="padding: 8px 0; color: #94A3B8; width: 40%; vertical-align: top; font-size: 13px;">
                <strong>${r.label}</strong>
              </td>
              <td style="padding: 8px 0; color: ${r.color || '#E2E8F0'}; vertical-align: top; font-size: 14px;">
                ${r.value}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      ${hasTechnicalDetails ? `
        <!-- Métricas Técnicas del Escáner -->
        <div style="margin-top: 20px; padding: 16px; background: #131B33; border: 1px solid #0066FF; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 13px; color: #F5A623; text-transform: uppercase; font-family: monospace;">
            ⚙️ Diagnóstico Perimetral Automatizado
          </h4>
          <div style="font-size: 13px; color: #CBD5E1; line-height: 1.7;">
            <div><strong>Puntuación Perimetral:</strong> <span style="color: #10B981; font-weight: bold; font-size: 15px;">${payload.technicalDetails?.overallScore}/100</span> (Grado ${payload.technicalDetails?.grade || 'N/A'})</div>
            <div><strong>Vulnerabilidades / Alertas:</strong> <span style="color: #EF4444; font-weight: bold;">${payload.technicalDetails?.issuesCount ?? 0} detectadas</span></div>
            ${payload.technicalDetails?.responseTimeMs ? `<div><strong>Latencia Servidor TTFB:</strong> ${payload.technicalDetails.responseTimeMs}ms</div>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- Botones de Acción Directa -->
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1E293B; text-align: center;">
        <p style="margin: 0 0 12px 0; font-size: 12px; font-family: monospace; color: #94A3B8; text-transform: uppercase;">
          Acciones Rápidas de Respuesta Inmediata
        </p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            ${payload.email ? `
            <td style="padding: 0 6px;">
              <a href="mailto:${payload.email}?subject=Respuesta%20Dexvoi%20-%20Expediente%20${ticket}&body=Hola%20${encodeURIComponent(userName)}%2C%0A%0AGracias%20por%20contactar%20con%20Dexvoi%20respecto%20a%20tu%20solicitud%20(${ticket})..." 
                 style="display: inline-block; background-color: #0066FF; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 20px; border-radius: 8px; border: 1px solid #0066FF;">
                ✉️ Responder por Email
              </a>
            </td>
            ` : ''}
            ${cleanPhone ? `
            <td style="padding: 0 6px;">
              <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(userName)}%2C%20te%20escribimos%20desde%20Dexvoi%20respecto%20a%20tu%20solicitud%20(${ticket})..." 
                 style="display: inline-block; background-color: #10B981; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 20px; border-radius: 8px; border: 1px solid #10B981;">
                💬 Abrir WhatsApp
              </a>
            </td>
            ` : ''}
          </tr>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #080C19; padding: 16px 24px; border-top: 1px solid #1E293B; text-align: center; font-size: 11px; color: #64748B;">
      Notificación enviada a <strong>${destinationEmail}</strong> · Dexvoi Lead Dispatcher v2.0
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Genera la Notificación Interna en texto plano
 */
export function buildAdminNotificationText(
  payload: EmailTemplatePayload, 
  ticket: string,
  destinationEmail = 'info@dexvoi.com'
): string {
  const category = normalizeFormCategory(payload.formType, payload);
  const config = getFormCategoryConfig(category, payload, ticket);
  const cleanPhone = payload.phone ? payload.phone.replace(/[^0-9]/g, '') : '';

  return `
${config.adminSubject}
==================================================
Expediente: ${ticket}
Categoría: ${config.badgeLabel}
Fecha UTC: ${new Date().toISOString()}

DATOS DEL CLIENTE:
- Nombre: ${payload.fullName || 'No indicado'}
- Email: ${payload.email || 'No indicado'}
- Teléfono: ${payload.phone || 'No indicado'}
- Web / Dominio: ${payload.websiteUrl || 'No indicado'}
- Sector: ${payload.businessType || 'No especificado'}
${payload.selectedService ? `- Servicio: ${payload.selectedService}\n` : ''}${payload.selectedSlot ? `- Horario Cita: ${payload.selectedSlot}\n` : ''}${payload.projectType ? `- Tipo Proyecto: ${payload.projectType}\n` : ''}${payload.keywords ? `- Palabras Clave: ${payload.keywords}\n` : ''}${payload.auditType ? `- Tipo Auditoría: ${payload.auditType}\n` : ''}- Consulta / Mensaje: ${payload.message || payload.primaryConcern || 'No indicado'}

${payload.technicalDetails ? `
MÉTRICAS TÉCNICAS:
- Score: ${payload.technicalDetails.overallScore ?? 'N/A'}/100 (Grado ${payload.technicalDetails.grade ?? 'N/A'})
- Vulnerabilidades: ${payload.technicalDetails.issuesCount ?? 0}
- TTFB: ${payload.technicalDetails.responseTimeMs ? `${payload.technicalDetails.responseTimeMs}ms` : 'N/A'}
` : ''}
ENLACES RÁPIDOS:
${payload.email ? `- Email directo: mailto:${payload.email}?subject=Expediente%20${ticket}\n` : ''}${cleanPhone ? `- WhatsApp directo: https://wa.me/${cleanPhone}\n` : ''}
Enviado a: ${destinationEmail}
==================================================
  `.trim();
}

/**
 * Genera el HTML de Confirmación Automatizada para el Cliente
 * Adaptado dinámicamente según el servicio y formulario seleccionado
 * con diseño oficial Dexvoi, número de expediente y compromiso de respuesta < 24h.
 */
export function buildUserConfirmationHtml(
  payload: EmailTemplatePayload, 
  ticket: string
): string {
  const category = normalizeFormCategory(payload.formType, payload);
  const config = getFormCategoryConfig(category, payload, ticket);
  const userName = (payload.fullName || '').trim() || 'Estimado/a cliente';
  const target = (payload.websiteUrl || '').replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.userSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0F1F; color: #FFFFFF; margin: 0; padding: 24px; line-height: 1.6;">
  
  <div style="max-width: 600px; margin: 0 auto; background: #0D1326; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Top Header -->
    <div style="background: #080C19; border-bottom: 2px solid #0066FF; padding: 26px 28px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <span style="font-family: 'Courier New', Courier, monospace; font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF;">
          DEX<span style="color: #F5A623;">VOI</span>
        </span>
        <span style="display: inline-block; background: #131B33; border: 1px solid ${config.badgeBorder}; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; letter-spacing: 0.5px; color: #FFFFFF;">
          ${config.badgeLabel}
        </span>
      </div>
      <p style="margin: 0; font-size: 11px; font-family: 'Courier New', Courier, monospace; letter-spacing: 1.5px; color: #64748B; text-transform: uppercase;">
        Arquitectura Digital · Ciberseguridad · Conversión
      </p>
    </div>

    <!-- Main Body -->
    <div style="padding: 28px;">
      
      <!-- Docket Box -->
      <div style="background: #131B33; border: 1px solid #1E293B; border-left: 4px solid #F5A623; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
        <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #94A3B8; letter-spacing: 1px;">
          Número de Expediente Asignado:
        </div>
        <div style="font-size: 18px; font-family: monospace; font-weight: bold; color: #F5A623; margin-top: 4px;">
          ${ticket}
        </div>
      </div>

      <!-- Greeting & Intro -->
      <h2 style="font-size: 18px; color: #FFFFFF; font-weight: 700; margin: 0 0 12px 0;">
        ${config.userIntroTitle}
      </h2>
      
      <p style="font-size: 14px; color: #CBD5E1; line-height: 1.6; margin: 0 0 20px 0;">
        ${config.userIntroParagraph}
      </p>

      <!-- Key Points / What we do -->
      <div style="background: #10172A; border: 1px solid #1E293B; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 13px; color: #F5A623; text-transform: uppercase; font-family: monospace;">
          ${config.userValuePropositionTitle}
        </h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #CBD5E1; line-height: 1.7;">
          ${config.userValuePoints.map(p => `<li style="margin-bottom: 6px;">${p}</li>`).join('')}
        </ul>
      </div>

      <!-- SLA & Next Steps -->
      <div style="background: #131B33; border: 1px solid #0066FF; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="color: #10B981; font-size: 16px;">⚡</span>
          <span style="font-size: 13px; font-weight: bold; color: #10B981; text-transform: uppercase; font-family: monospace;">
            Compromiso de Respuesta Técnica: En menos de 24 horas
          </span>
        </div>
        <p style="margin: 0; font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          ${config.userNextStepNote}
        </p>
      </div>

      <!-- Trust & Direct contact note -->
      <p style="font-size: 12px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px 0; border-top: 1px solid #1E293B; padding-top: 16px;">
        <strong>Nota de transparencia:</strong> En Dexvoi no trabajamos con comerciales agresivos. Tu expediente es gestionado directamente por arquitectos de software e ingenieros perimetrales. Si deseas aportar información adicional antes de que te contactemos, responde directamente a este correo (<a href="mailto:info@dexvoi.com" style="color: #38BDF8; text-decoration: none;">info@dexvoi.com</a>).
      </p>

      <!-- Button -->
      <div style="text-align: center;">
        <a href="https://dexvoi.com" target="_blank" 
           style="display: inline-block; background-color: #0066FF; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 8px; border: 1px solid #0066FF;">
          Visitar Dexvoi Oficial
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: #080C19; padding: 20px 28px; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B; line-height: 1.6;">
      <strong>DEXVOI · Arquitectura Digital & Ciberseguridad</strong><br/>
      Madrid · Casablanca · Londres<br/>
      <a href="https://dexvoi.com" style="color: #38BDF8; text-decoration: none;">dexvoi.com</a> · 
      <a href="mailto:info@dexvoi.com" style="color: #38BDF8; text-decoration: none;">info@dexvoi.com</a>
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Genera la Confirmación al Usuario en texto plano
 */
export function buildUserConfirmationText(
  payload: EmailTemplatePayload, 
  ticket: string
): string {
  const category = normalizeFormCategory(payload.formType, payload);
  const config = getFormCategoryConfig(category, payload, ticket);
  const userName = (payload.fullName || '').trim() || 'Estimado/a cliente';

  return `
${config.userSubject}
==================================================
DEXVOI · ARQUITECTURA DIGITAL & CIBERSEGURIDAD
Expediente: ${ticket}

Hola ${userName},

${config.userIntroParagraph.replace(/<[^>]+>/g, '')}

${config.userValuePropositionTitle}
${config.userValuePoints.map(p => `- ${p.replace(/<[^>]+>/g, '')}`).join('\n')}

COMPROMISO DE RESPUESTA:
En menos de 24 horas laborables.

${config.userNextStepNote.replace(/<[^>]+>/g, '')}

Si necesitas aportar información urgente, responde directamente a este correo (info@dexvoi.com).

Dexvoi · Madrid · Casablanca · Londres
https://dexvoi.com
==================================================
  `.trim();
}
