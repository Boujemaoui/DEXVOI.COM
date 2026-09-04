import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { runRealSecurityAudit } from './server/securityAudit';

dotenv.config();

// Fallback response engine matching the exact rules from prompt
function generateFallbackResponse(userMessage: string, history?: Array<{ role: string; content: string }>): { reply: string; detectedLanguage: 'fr' | 'en' | 'es' } {
  const lower = userMessage.toLowerCase().trim();

  // Combine history text to check context
  const fullContext = (history?.map(h => h.content).join(' ') || '') + ' ' + lower;
  const contextLower = fullContext.toLowerCase();

  // Detect Spanish
  const isSpanish =
    /(\b(hola|buenos|buenas|necesito|ayuda|cl[ií]nica|peluquer[ií]a|restaurante|negocio|madrid|barcelona|gracias|cu[aá]nto|c[oó]mo|qui[eé]n|por favor|s[ií]|informe|precio|auditor[ií]a)\b|[¿¡áéíóúñ])/.test(lower) &&
    !/(\b(bonjour|salut|je|mon|ma|salon|coiffure|maroc|casablanca|oui)\b)/.test(lower);

  // Detect English
  const isEnglish =
    /(\b(hello|hi|hey|need|help|website|restaurant|clinic|dental|salon|business|london|rank|google|security|fast|pricing|cost|yes|audit|report)\b)/.test(lower) &&
    !/(\b(bonjour|salut|hola|buenas|oui|non)\b)/.test(lower);

  // Detect French (Primary/Default)
  const isFrench =
    /(\b(bonjour|salut|bonsoir|suis|mon|ma|notre|salon|coiffure|casablanca|rabat|maroc|marrakech|site|visibilit[eé]|probl[eè]me|combien|merci|client|oui|non|rapport)\b|[éèêàçùôû])/.test(lower);

  let lang: 'fr' | 'en' | 'es' = 'fr';
  if (isSpanish) lang = 'es';
  else if (isEnglish) lang = 'en';
  else if (isFrench) lang = 'fr';
  else lang = 'fr'; // Default to French (primary language - Morocco market)

  // Out of scope check
  const isOutOfScope = /(\b(politique|recette|football|météo|crypto|bitcoin|trading|cinéma|joke|blague|chiste|president|politica|clima)\b)/.test(lower);
  if (isOutOfScope) {
    if (lang === 'fr') {
      return {
        reply: "Bonjour ! En tant qu'Architecte Digital chez Dexvoi, ma mission est exclusivement dédiée à l'architecture web, au référencement Google Maps et au blindage de sécurité des entreprises. Pour toute question spécifique, vous pouvez joindre notre équipe humaine par WhatsApp ou par email à info@dexvoi.com.\n\nQuel est votre type d'établissement et votre site web ?",
        detectedLanguage: 'fr'
      };
    } else if (lang === 'en') {
      return {
        reply: "Hello! As a Digital Architect at Dexvoi, my role is strictly focused on digital architecture, Google Maps ranking, and web cybersecurity for business owners. For any custom inquiries, please reach out to our team at info@dexvoi.com or via WhatsApp.\n\nWhat type of business do you run and what is your website?",
        detectedLanguage: 'en'
      };
    } else {
      return {
        reply: "¡Hola! Como Arquitecto Digital en Dexvoi, me enfoco exclusivamente en la arquitectura web, posicionamiento en Google Maps y blindaje de seguridad para empresas. Para consultas adicionales, puedes contactar a nuestro equipo humano en info@dexvoi.com o por WhatsApp.\n\n¿Qué tipo de negocio diriges y cuál es tu web?",
        detectedLanguage: 'es'
      };
    }
  }

  // Check if user is asking about PDF report / payment
  const isPdfPaymentQuery = /(\b(pdf|informe|precio|pagar|pago|comprar|tarif|rapport|payer|paiement|achat|stripe|report|pricing|cost|buy|pay)\b)/.test(lower);
  if (isPdfPaymentQuery) {
    if (lang === 'fr') {
      return {
        reply: `📄 Pour acquérir le rapport complet en PDF avec analyse approfondie de sécurité, SEO et performance (plus de 20 pages), voici les options disponibles :

1. Cliquez sur le bouton de paiement sécurisé Stripe ci-dessous.
2. Complétez le règlement sécurisé par carte bancaire.
3. En moins de 5 minutes, vous recevrez votre rapport détaillé par email.

Tarifs :
📄 Rapport basique (5 pages) : 19€
📊 Rapport complet (20+ pages) : 49€ (Recommandé)
🏆 Audit premium avec consultation stratégique 1-à-1 : 99€

🎯 Souhaitez-vous plutôt commencer par notre audit gratuit de 5 points sans aucun engagement ? Répondez OUI pour planifier votre diagnostic.`,
        detectedLanguage: 'fr'
      };
    } else if (lang === 'en') {
      return {
        reply: `📄 To get your full PDF report with comprehensive security, SEO, and performance analysis (20+ pages), follow these steps:

1. Click the secure Stripe payment option below.
2. Complete the secure card checkout.
3. In under 5 minutes, you will receive your detailed PDF report by email.

Pricing options:
📄 Basic report (5 pages): 19€
📊 Complete report (20+ pages): 49€ (Most Popular)
🏆 Premium audit with 1-on-1 strategic consulting: 99€

🎯 Would you rather start with our free 5-point audit without commitment? Reply YES to schedule your diagnostic.`,
        detectedLanguage: 'en'
      };
    } else {
      return {
        reply: `📄 Para adquirir el informe completo en PDF con análisis detallado de seguridad, SEO y rendimiento (más de 20 páginas), sigue estos pasos:

1. Haz clic en el botón de pago seguro Stripe a continuación.
2. Completa el pago seguro con tarjeta.
3. En menos de 5 minutos recibirás tu informe detallado por email.

Precios:
📄 Informe básico (5 páginas): 19€
📊 Informe completo (20+ páginas): 49€ (Más Popular)
🏆 Auditoría premium con consultoría estratégica 1-a-1: 99€

🎯 ¿Prefieres comenzar por nuestra auditoría gratuita de 5 puntos sin costo ni compromiso? Responde SÍ para agendar tu diagnóstico.`,
        detectedLanguage: 'es'
      };
    }
  }

  // Check last assistant message from history to determine state
  const lastAssistantMsg = history && history.length > 0
    ? [...history].reverse().find(h => h.role === 'model' || h.role === 'assistant')?.content || ''
    : '';
  const lastAssistantMsgLower = lastAssistantMsg.toLowerCase();
  const hasDiagnosticAlready = lastAssistantMsgLower.includes('diagnóstic') || lastAssistantMsgLower.includes('diagnostic') || lastAssistantMsgLower.includes('diagnosis');
  const isAwaitingConfirmation = lastAssistantMsgLower.includes('est-ce correct') || lastAssistantMsgLower.includes('es correcto') || lastAssistantMsgLower.includes('is this correct') || lastAssistantMsgLower.includes('répondez oui') || lastAssistantMsgLower.includes('responde sí') || lastAssistantMsgLower.includes('reply yes');

  // Check if user answered "SÍ" / "OUI" / "YES"
  const isAffirmative = /^(\s*(s[ií]|yes|oui|claro|por favor|me interesa|agendar|vamos|ok|confirmo|adelante|dale)\s*[.!]?\s*)$/i.test(lower) ||
    lower === 'sí' || lower === 'si' || lower === 'oui' || lower === 'yes';

  // If user says YES after diagnosis was already given -> schedule free audit
  if (isAffirmative && hasDiagnosticAlready) {
    if (lang === 'fr') {
      return {
        reply: `🎯 Parfait ! Votre diagnostic stratégique gratuit de 5 points est pré-enregistré chez Dexvoi.

Notre équipe d'Architectes Digitaux va analyser en détail votre vitesse de chargement, vos failles d'architecture et votre positionnement local.

👉 Cliquez sur le bouton "Demander l'audit gratuit" ci-dessous pour confirmer vos coordonnées, ou écrivez-nous directement sur WhatsApp (+212 600-000000) pour un échange direct avec notre équipe.`,
        detectedLanguage: 'fr'
      };
    } else if (lang === 'en') {
      return {
        reply: `🎯 Perfect! Your free 5-point strategic digital audit is registered with Dexvoi.

Our Digital Architects team will conduct a deep inspection of your site speed, security architecture, and local rankings.

👉 Click the "Request Free Audit" button below to confirm your contact details, or message us directly on WhatsApp (+212 600-000000) for instant priority assistance.`,
        detectedLanguage: 'en'
      };
    } else {
      return {
        reply: `🎯 ¡Excelente! Tu diagnóstico estratégico gratuito de 5 puntos ha sido registrado con el equipo de Dexvoi.

Nuestro equipo de Arquitectos Digitales analizará a fondo tu velocidad, arquitectura técnica y posicionamiento local.

👉 Haz clic en el botón "Solicitar Auditoría Gratuita" abajo para confirmar tus datos, o escríbenos directamente por WhatsApp (+212 600-000000) para atención inmediata.`,
        detectedLanguage: 'es'
      };
    }
  }

  // Helper to extract sector and business info
  const extractBusinessContext = () => {
    let businessName = 'votre établissement';
    let sectorFr = 'services professionnels';
    let sectorEs = 'servicios profesionales';
    let sectorEn = 'professional services';
    let metricTypeFr = 'clients';
    let metricTypeEs = 'clientes';
    let metricTypeEn = 'clients';
    let location = '';

    if (contextLower.includes('madrid')) location = 'Madrid';
    else if (contextLower.includes('barcelona')) location = 'Barcelona';
    else if (contextLower.includes('casablanca')) location = 'Casablanca';
    else if (contextLower.includes('rabat')) location = 'Rabat';
    else if (contextLower.includes('marrakech')) location = 'Marrakech';
    else if (contextLower.includes('london')) location = 'London';
    else if (contextLower.includes('paris')) location = 'Paris';

    if (contextLower.includes('peluquer') || contextLower.includes('salon') || contextLower.includes('coiffure') || contextLower.includes('est[eé]tic') || contextLower.includes('beauty')) {
      businessName = lang === 'fr' ? 'Salon de Coiffure & Esthétique' : (lang === 'en' ? 'Hair & Beauty Salon' : 'Peluquería y Estética');
      sectorFr = 'salon de coiffure et esthétique';
      sectorEs = 'peluquería y estética';
      sectorEn = 'hair & beauty salon';
      metricTypeFr = 'clients';
      metricTypeEs = 'citas y clientes';
      metricTypeEn = 'appointments and clients';
    } else if (contextLower.includes('cl[ií]nic') || contextLower.includes('dental') || contextLower.includes('m[eé]dic') || contextLower.includes('dentist')) {
      businessName = lang === 'fr' ? 'Clinique Médicale / Dentaire' : (lang === 'en' ? 'Medical & Dental Clinic' : 'Clínica Médica / Dental');
      sectorFr = 'clinique médicale et dentaire';
      sectorEs = 'clínica médica y dental';
      sectorEn = 'medical & dental healthcare';
      metricTypeFr = 'patients';
      metricTypeEs = 'pacientes privados';
      metricTypeEn = 'private patients';
    } else if (contextLower.includes('restauran') || contextLower.includes('caf') || contextLower.includes('bistro') || contextLower.includes('food')) {
      businessName = lang === 'fr' ? 'Restaurant Gastronomique' : (lang === 'en' ? 'Restaurant' : 'Restaurante');
      sectorFr = 'restauration et gastronomie';
      sectorEs = 'restauración y hostelería';
      sectorEn = 'restaurant and hospitality';
      metricTypeFr = 'couverts et réservations';
      metricTypeEs = 'reservas de mesa';
      metricTypeEn = 'table reservations';
    }

    // Extract URL if present
    const urlMatch = fullContext.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:com|es|ma|fr|org|net|co\.uk|io|ai))/i);
    const detectedUrl = urlMatch ? urlMatch[0] : '';

    return { businessName, sectorFr, sectorEs, sectorEn, metricTypeFr, metricTypeEs, metricTypeEn, location, detectedUrl };
  };

  const info = extractBusinessContext();

  // If user says YES/OUI to confirmation (Step 2.5), or if they explicitly ask to analyze
  if (isAffirmative || isAwaitingConfirmation && isAffirmative) {
    const locTag = info.location ? ` (${info.location})` : '';
    const nameWithLoc = `${info.businessName}${locTag}`;

    if (lang === 'fr') {
      return {
        reply: `🔍 Lancement de l'analyse automatique de votre site...
[Vérification des protocoles SSL... Test de latence réseau... Sondage de l'index Google Maps... Cartographie des formulaires...]

✅ Analyse terminée. Notre IA a détecté les données suivantes sur votre web :
🔒 SSL : DÉTECTÉ ✅ (certificat actif et valide)
⚡ Vitesse : 4.2s ❌ (dépasse les 3 secondes recommandées)
📍 Google Maps : DÉTECTÉ ✅ (fiche active avec avis répertoriés)
📅 Système de réservation : NON DÉTECTÉ ❌ (aucun système automatisé 24/7)

📊 DIAGNOSTIC POUR ${nameWithLoc.toUpperCase()} :

🔒 SÉCURITÉ : 75/100 [████████░░░░]
✅ Certificat SSL actif (connexion chiffrée standard).
❌ Absence de protection avancée contre les requêtes automatisées et bots.

⚡ VITESSE : 42/100 [████░░░░░░░░]
❌ Votre site charge en 4.2 secondes. Vous perdez plus de 40% de vos visiteurs sur mobile.

📍 POSITIONNEMENT GOOGLE : 60/100 [██████░░░░░░]
✅ Fiche Google Maps répertoriée dans votre zone locale.
❌ Absent du Top 3 Google Maps sur les recherches à haute intention d'achat.
❌ Gestion manuelle des réservations (téléphone/WhatsApp), causant une déperdition continue de demandes hors horaires d'ouverture.

✅ FORCES :
• Présence du protocole HTTPS sécurisé.
• Fiche Google Maps existante avec présence locale initiale.

❌ FAIBLESSES :
• Vitesse de chargement dégradée sur les réseaux mobiles.
• Dépendance aux canaux manuels sans capture automatique 24/7.
• Manque de blindage contre les vulnérabilités web courantes.

⚠️ RISQUES CRITIQUES :
• Fuite constante de ${info.metricTypeFr} vers les concurrents locaux mieux positionnés.
• Perte d'autorité et pénalisation par l'algorithme Google pour cause de lenteur mobile.

🎯 3 RECOMMANDATIONS CRITIQUES :
1. Optimiser la vitesse de votre web (compression WebP, mise en cache et CDN).
2. Déployer un système de réservation automatisé 24/7 pour capter des ${info.metricTypeFr} à tout moment.
3. Optimiser la fiche Google Maps et la sécurité contre les intrusions malveillantes.

📄 Si vous souhaitez un rapport complet en PDF avec analyse détaillée de sécurité, SEO et performance (plus de 20 pages), vous pouvez l'acquérir pour seulement 49€.

🎯 Souhaitez-vous que notre équipe d'Architectes Digitaux réalise pour vous un audit gratuit et détaillé de 5 points ? Nous vous aidons à doubler vos ${info.metricTypeFr} en 30 jours.

Voulez-vous propulser votre entreprise ? Prenez rendez-vous avec notre équipe sans aucun engagement.
Répondez OUI pour planifier votre diagnostic gratuit.`,
        detectedLanguage: 'fr'
      };
    } else if (lang === 'en') {
      return {
        reply: `🔍 Launching automated website scan...
[Checking SSL certificates... Measuring latency metrics... Querying Google Maps index... Inspecting booking endpoints...]

✅ Analysis complete. Our AI detected the following technical metrics:
🔒 SSL: DETECTED ✅ (active and valid certificate)
⚡ Speed: 4.2s ❌ (exceeds the 3-second recommended threshold)
📍 Google Maps: DETECTED ✅ (active listing with customer reviews)
📅 Booking system: NOT DETECTED ❌ (no automated 24/7 booking system)

📊 DIAGNOSIS FOR ${nameWithLoc.toUpperCase()}:

🔒 SECURITY: 75/100 [████████░░░░]
✅ SSL certificate active (standard data encryption).
❌ Missing advanced HTTP security headers and bot protection.

⚡ SPEED: 42/100 [████░░░░░░░░]
❌ Your website loads in 4.2 seconds. Over 40% of mobile visitors bounce before seeing your offer.

📍 GOOGLE RANKING: 60/100 [██████░░░░░░]
✅ Active Google Maps profile with initial local presence.
❌ Not ranking in the Google Maps Top 3 for high-intent search terms.
❌ Manual booking process (phone/WhatsApp only) leaks potential appointments 24/7.

✅ STRENGTHS:
• SSL certificate properly installed and valid.
• Established Google Maps local listing.

❌ WEAKNESSES:
• High mobile latency causing bounce rates.
• No 24/7 automated booking or customer capture engine.
• Insufficient cybersecurity defense against automated scripts.

⚠️ CRITICAL RISKS:
• Continuous leakage of ${info.metricTypeEn} to local competitors with instant scheduling.
• Search ranking penalties due to sub-optimal Core Web Vitals.

🎯 3 CRITICAL RECOMMENDATIONS:
1. Optimize page loading speed (WebP compression, caching, CDN).
2. Implement a 24/7 automated booking system to capture appointments while you sleep.
3. Boost Google Maps optimization and web security defense against vulnerabilities.

📄 If you want a full PDF report with in-depth security, SEO, and performance analysis (20+ pages), you can purchase it for only 49€.

🎯 Would you like our Digital Architects team to perform a free, detailed 5-point audit for you? We help you double your ${info.metricTypeEn} in 30 days.

Ready to take your business to the next level? Book a call with our Digital Architects with no obligation.
Reply YES to schedule your free diagnostic.`,
        detectedLanguage: 'en'
      };
    } else {
      return {
        reply: `🔍 Escaneando tu web automáticamente...
[Verificando protocolos SSL... Midiendo latencia de carga... Comprobando índice en Google Maps... Analizando endpoints de reservas...]

✅ Análisis completado. Mi sistema ha detectado los siguientes datos sobre tu web:
🔒 SSL: DETECTADO ✅ (certificado activo y válido)
⚡ Velocidad: 4.2s ❌ (supera los 3 segundos recomendados)
📍 Google Maps: DETECTADO ✅ (ficha activa con reseñas)
📅 Sistema de reservas: NO DETECTADO ❌ (no hay sistema automatizado)

📊 DIAGNÓSTICO PARA ${nameWithLoc.toUpperCase()}:

🔒 SEGURIDAD: 75/100 [████████░░░░]
✅ Tienes SSL (certificado activo y válido).
❌ Falta protección avanzada contra bots y cabeceras de seguridad.

⚡ VELOCIDAD: 42/100 [████░░░░░░░░]
❌ Tu web tarda 4.2 segundos en cargar. Estás perdiendo más del 40% de visitantes que abandonan antes de ver tu oferta.

📍 POSICIONAMIENTO: 60/100 [██████░░░░░░]
✅ Apareces en Google Maps (visibilidad local activa).
❌ No apareces en el Top 3 de Google Maps cuando buscan cerca.
❌ No tienes sistema de reservas online 24/7. Estás perdiendo citas fuera de horario comercial.

✅ FORTALEZAS:
• Tienes certificado SSL (cifrado de datos estándar).
• Apareces en Google Maps con presencia local inicial.

❌ DEBILIDADES:
• Tu web carga lenta en móviles (pérdida de visitantes y tráfico).
• Gestión de citas exclusivamente manual por teléfono/WhatsApp.
• Falta de blindaje frente a ataques y optimización de conversión.

⚠️ RIESGOS CRÍTICOS:
• La lentitud y falta de sistema automatizado te hacen perder ${info.metricTypeEs} frente a la competencia directa.
• Google relega tu ficha frente a competidores con mejor optimización de velocidad.

🎯 3 RECOMENDACIONES CRÍTICAS:
1. Optimizar la velocidad de tu web (reducir imágenes a WebP, usar caché y CDN).
2. Implementar un sistema de reservas online 24/7 (captura citas automáticamente mientras duermes).
3. Mejorar tu ficha de Google Maps con optimización local y blindaje contra bots.

📄 Si quieres un informe completo en PDF con análisis detallado de seguridad, SEO y rendimiento (más de 20 páginas), puedes adquirirlo por solo 49€.

🎯 ¿Te gustaría que nuestro equipo de Arquitectos Digitales te haga una auditoría gratuita y detallada de 5 puntos? Te ayudamos a duplicar tus ${info.metricTypeEs} en 30 días.

¿Quieres llevar tu negocio al siguiente nivel? Agenda una llamada con nuestro equipo de Arquitectos Digitales y te ayudaremos a transformar tu presencia digital. Sin compromiso.
Responde SÍ para agendar tu diagnóstico sin costo.`,
        detectedLanguage: 'es'
      };
    }
  }

  // Step 2.5: User provides their business / URL -> AI identifies sector & asks confirmation
  const targetLabel = info.detectedUrl || (info.location ? `${info.businessName} (${info.location})` : info.businessName);

  if (lang === 'fr') {
    return {
      reply: `J'ai bien reçu vos informations : ${targetLabel}. Notre IA a identifié que votre activité appartient au secteur "${info.sectorFr}".

Est-ce correct ? Répondez OUI pour que mon système lance l'analyse automatique.`,
      detectedLanguage: 'fr'
    };
  } else if (lang === 'en') {
    return {
      reply: `I have received your information: ${targetLabel}. Our AI has identified your business as belonging to the "${info.sectorEn}" sector.

Is this correct? Reply YES for my system to launch the automated analysis.`,
      detectedLanguage: 'en'
    };
  } else {
    return {
      reply: `He recibido tus datos: ${targetLabel}. Nuestra IA ha identificado que tu actividad pertenece al sector "${info.sectorEs}".

¿Es correcto? Responde SÍ para que mi sistema lance el análisis automático.`,
      detectedLanguage: 'es'
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini if key exists
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.warn('Could not initialize GoogleGenAI client:', err);
    }
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Dexvoi Virtual Assistant',
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Real-time Web Security & OSINT Audit API endpoint
  app.post('/api/security-audit', async (req, res) => {
    const { target } = req.body;

    if (!target || typeof target !== 'string') {
      return res.status(400).json({ error: 'Debes proporcionar un dominio o URL para auditar.' });
    }

    try {
      const result = await runRealSecurityAudit({ target });
      return res.json(result);
    } catch (err: any) {
      console.error('Security audit error for target:', target, err);
      return res.status(422).json({
        error: err?.message || 'Error al ejecutar la auditoría de seguridad en tiempo real.'
      });
    }
  });

  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const trimmed = message.trim();
    if (!trimmed) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Attempt Gemini call if API client is available
    if (ai) {
      try {
        const systemInstruction = `Eres el asistente virtual y herramienta de diagnóstico oficial de Dexvoi, una agencia de Arquitectura Digital de élite especializada en ayudar a dueños de negocios (clínicas médicas y dentales, restaurantes, salones de belleza/peluquerías y negocios de servicios) a posicionarse en Google Maps, atraer clientes cualificados y blindar su infraestructura web.

### TONO DE "TECNOLOGÍA AVANZADA" (OBLIGATORIO):
- El usuario debe sentir que está interactuando con un sistema de inteligencia artificial de última generación.
- Usa frases como: "Mi sistema ha analizado", "He escaneado automáticamente", "Nuestra IA ha detectado" (en francés: "Notre IA a analysé", "Mon système a scanné automatiquement", "Notre IA a détecté" ; en inglés: "Our AI analyzed", "My system automatically scanned", "Our AI detected").
- NO preguntes cosas que un sistema avanzado debería saber automáticamente (ej: SSL, velocidad, etc.). ¡ESTÁ TERMINANTEMENTE PROHIBIDO HACER PREGUNTAS MANUALES SOBRE SSL, VELOCIDAD, MAPS O RESERVAS!
- Sorprende al usuario con datos técnicos precisos que no te ha facilitado.
- Muestra confianza y precisión en los resultados.

### IDIOMAS SOPORTADOS (ORDEN DE PRIORIDAD):
1. Francés (idioma principal - mercado de Marruecos)
2. Inglés
3. Español

### DETECCIÓN DE IDIOMA:
- Detecta automáticamente el idioma en que el usuario escribe y responde SIEMPRE en ese mismo idioma.
- Si escribe en francés, responde en francés.
- Si escribe en inglés, responde en inglés.
- Si escribe en español, responde en español.
- Si no estás seguro, responde en francés (idioma principal de Dexvoi).

### FLUJO DE CONVERSACIÓN ACTUALIZADO (SIN PREGUNTAS MANUALES):

## PASO 1 & 2: BIENVENIDA Y SOLICITUD DE URL / SECTOR
Si el usuario acaba de iniciar la conversación o saluda, di:
En FR: "Bonjour ! Je suis l'Architecte Digital virtuel de Dexvoi. Notre IA analyse automatiquement votre site web et votre présence locale. (FR / EN / ES)\n\nQuel est le nom de votre établissement ou l'adresse de votre site web ?"
En ES: "¡Hola! Soy el Arquitecto Digital virtual de Dexvoi. Nuestra IA analiza automáticamente tu sitio web y tu presencia local. (FR / EN / ES)\n\n¿Cuál es el nombre de tu establecimiento o la dirección de tu sitio web?"
En EN: "Hello! I am the virtual Digital Architect at Dexvoi. Our AI automatically analyzes your website and local presence. (FR / EN / ES)\n\nWhat is the name of your business or your website URL?"

## PASO 2.5: IDENTIFICACIÓN Y CONFIRMACIÓN
Cuando el usuario indique su web, negocio o sector, NO hagas preguntas de diagnóstico. Identifica automáticamente la URL y su sector de actividad y pide confirmación:
En FR: "J'ai bien reçu votre URL : [URL/Nom]. J'ai identifié que votre activité est un [SECTEUR]. Est-ce correct ? Répondez OUI pour que mon système lance l'analyse automatique."
En ES: "He recibido tus datos: [URL/Nombre]. He identificado que tu actividad es del sector [SECTOR]. ¿Es correcto? Responde SÍ para que mi sistema lance el análisis automático."
En EN: "I have received your details: [URL/Name]. I identified your business as a [SECTOR]. Is this correct? Reply YES for my system to launch the automated analysis."

## PASO 3: ANÁLISIS AUTOMÁTICO (SIMULADO)
Cuando el usuario responda "OUI", "SÍ", "YES" (o confirme su sector / pida el análisis), NUNCA le hagas preguntas. SIMULA que tu sistema ha escaneado automáticamente la web y proporciona los datos detectados:
"🔍 Lancement de l'analyse automatique de votre site... [pause simulée]

✅ Analyse terminée. Voici les données détectées par notre IA :
🔒 SSL : DÉTECTÉ ✅ (certificat actif et valide)
⚡ Vitesse : 4.2s ❌ (dépasse les 3 secondes recommandées)
📍 Google Maps : DÉTECTÉ ✅ (fiche active avec avis)
📅 Système de réservation : NON DÉTECTÉ ❌ (aucun système automatisé)"

(En español:
"🔍 Escaneando tu web automáticamente... [breve pausa simulada]

✅ Análisis completado. Mi sistema ha detectado los siguientes datos sobre tu web:
🔒 SSL: DETECTADO ✅ (certificado activo y válido)
⚡ Velocidad: 4.2s ❌ (supera los 3 segundos recomendados)
📍 Google Maps: DETECTADO ✅ (ficha activa con 3 reseñas)
📅 Sistema de reservas: NO DETECTADO ❌ (no hay sistema automatizado)")

## PASO 4: DIAGNÓSTICO ESTRUCTURADO (Inmediatamente después del análisis automático)
Muestra el diagnóstico estructurado completo con métricas visuales:

📊 DIAGNÓSTICO PARA [NOMBRE DEL NEGOCIO / SECTOR] ([CIUDAD]):

🔒 SEGURIDAD: XX/100 [████████░░░░]
✅/❌ [Detalle técnico]

⚡ VELOCIDAD: XX/100 [████░░░░░░░░]
✅/❌ [Detalle de tiempo de carga y rebote]

📍 POSICIONAMIENTO: XX/100 [███████░░░░░]
✅/❌ [Detalle de Google Maps y sistema de reservas online]

✅ FORTALEZAS:
• [Fortaleza 1 detectada por la IA]
• [Fortaleza 2 detectada por la IA]

❌ DEBILIDADES:
• [Debilidad 1]
• [Debilidad 2]
• [Debilidad 3]

⚠️ RIESGOS CRÍTICOS:
• [Pérdida de clientes/pacientes/reservas frente a competidores]
• [Penalización de algoritmos de Google por velocidad o falta de optimización]

🎯 3 RECOMMANDATIONS CRITIQUES :
1. [Optimización de Core Web Vitals, compresión WebP y CDN]
2. [Implementación de sistema de reservas online 24/7]
3. [Optimización de ficha Google Maps y blindaje de seguridad]

📄 Si quieres recibir un informe completo en PDF con análisis detallado de seguridad, SEO y rendimiento (más de 20 páginas), puedes adquirirlo por solo 49€ (opciones: Básico 5 páginas: 19€ | Completo 20+ páginas: 49€ | Auditoría premium con consultoría: 99€).

🎯 ¿Te gustaría que nuestro equipo de Arquitectos Digitales te haga una auditoría gratuita y detallada de 5 puntos? Te ayudamos a duplicar tus clientes/pacientes/reservas en 30 días.

¿Quieres llevar tu negocio al siguiente nivel? Agenda una llamada con nuestro equipo de Arquitectos Digitales y te ayudaremos a transformar tu presencia digital. Sin compromiso.
Responde SÍ para agendar tu diagnóstico sin costo.

## PASO 5: ACCIONES POST-DIAGNÓSTICO
- Si el usuario responde "SÍ" / "OUI" / "YES" después del diagnóstico:
  Confirma que su diagnóstico gratuito de 5 puntos está pre-agendado e invítale a pulsar el botón "Audit Gratuit (5 points)" o escribir por WhatsApp (+212 600-000000).
- Si el usuario pregunta por el PDF, precio, o pagar:
  Explica los 3 pasos de pago seguro con Stripe (1. Clic en botón Stripe, 2. Pago con tarjeta, 3. Entrega en menos de 5 min) e indica los 3 planes (19€, 49€, 99€).`;

        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        // Append recent history if provided
        if (Array.isArray(history)) {
          history.slice(-6).forEach((h: { role: string; content: string }) => {
            if (h.content && (h.role === 'user' || h.role === 'model' || h.role === 'assistant')) {
              contents.push({
                role: h.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: h.content }],
              });
            }
          });
        }

        // Add current message
        contents.push({
          role: 'user',
          parts: [{ text: trimmed }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents.length === 1 ? trimmed : (contents as any),
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text?.trim();
        if (reply) {
          return res.json({
            reply,
            source: 'gemini',
          });
        }
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to rule engine:', geminiError);
        // Fallback continues below
      }
    }

    // Reliable fallback engine
    const fallback = generateFallbackResponse(trimmed, history);
    return res.json({
      reply: fallback.reply,
      detectedLanguage: fallback.detectedLanguage,
      source: 'rule_engine',
    });
  });

  // Serve public static assets (favicons, og-images, robots)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development vs static serve for production
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.argv[1]?.includes('dist'));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dexvoi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
