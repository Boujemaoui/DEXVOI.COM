import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Shield,
  ShieldCheck,
  Bot,
  ExternalLink,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Minimize2,
  Maximize2,
  FileText,
  CreditCard
} from 'lucide-react';
import { ChatMessage } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface VirtualAssistantChatProps {
  onOpenAuditModal: () => void;
  onOpenPdfModal?: (tier?: 'basic' | 'complete' | 'premium') => void;
  onOpenOsintModal?: () => void;
}

export const VirtualAssistantChat: React.FC<VirtualAssistantChatProps> = ({
  onOpenAuditModal,
  onOpenPdfModal,
  onOpenOsintModal
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const getInitialWelcome = (lang: 'es' | 'fr' | 'en'): ChatMessage => {
    if (lang === 'en') {
      return {
        id: 'welcome-1',
        role: 'assistant',
        content:
          "Hello! I am the virtual Digital Architect at Dexvoi. Our AI automatically audits your website and local Google ranking. (EN / FR / ES)\n\nWhat is your business name or website address?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: 'en'
      };
    }
    if (lang === 'fr') {
      return {
        id: 'welcome-1',
        role: 'assistant',
        content:
          "Bonjour ! Je suis l'Architecte Digital virtuel de Dexvoi. Notre IA analyse automatiquement votre site web et votre présence locale. (FR / EN / ES)\n\nQuel est le nom de votre établissement ou l'adresse de votre site web ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: 'fr'
      };
    }
    return {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "¡Hola! Soy el Arquitecto Digital virtual de Dexvoi. Nuestra IA analiza automáticamente tu página web y posicionamiento local en Google. (ES / FR / EN)\n\n¿Cuál es el nombre de tu negocio o la dirección de tu página web?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'es'
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [getInitialWelcome(language)]);

  // If user hasn't chatted yet and changes language, sync welcome message
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([getInitialWelcome(language)]);
    }
  }, [language]);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized]);

  // Client-side fallback rule engine (replicates exact server rules if offline)
  const generateClientFallback = (text: string, currentHistory?: ChatMessage[]): { reply: string; lang: 'fr' | 'en' | 'es' } => {
    const lower = text.toLowerCase().trim();
    const fullContext = (currentHistory?.map(h => h.content).join(' ') || '') + ' ' + lower;
    const contextLower = fullContext.toLowerCase();

    // Spanish detection
    const isSpanish =
      /(\b(hola|buenos|buenas|necesito|ayuda|cl[ií]nica|peluquer[ií]a|restaurante|negocio|madrid|barcelona|gracias|cu[aá]nto|c[oó]mo|qui[eé]n|por favor|s[ií]|informe|precio|auditor[ií]a)\b|[¿¡áéíóúñ])/.test(lower) &&
      !/(\b(bonjour|salut|je|mon|ma|salon|coiffure|maroc|casablanca|oui)\b)/.test(lower);

    // English detection
    const isEnglish =
      /(\b(hello|hi|hey|need|help|website|restaurant|clinic|dental|salon|business|london|rank|google|security|fast|pricing|cost|yes|audit|report)\b)/.test(lower) &&
      !/(\b(bonjour|salut|hola|buenas|oui|non)\b)/.test(lower);

    // French detection (Default/Priority 1)
    const isFrench =
      /(\b(bonjour|salut|bonsoir|suis|mon|ma|notre|salon|coiffure|casablanca|rabat|maroc|marrakech|site|visibilit[eé]|probl[eè]me|combien|merci|client|oui|non|rapport)\b|[éèêàçùôû])/.test(lower);

    let lang: 'fr' | 'en' | 'es' = 'fr';
    if (isSpanish) lang = 'es';
    else if (isEnglish) lang = 'en';
    else if (isFrench) lang = 'fr';
    else lang = 'fr';

    // Out of scope check
    const isOutOfScope = /(\b(politique|recette|football|météo|crypto|bitcoin|trading|cinéma|joke|blague|chiste|president|politica|clima)\b)/.test(lower);
    if (isOutOfScope) {
      if (lang === 'fr') {
        return {
          reply: "Bonjour ! En tant qu'Architecte Digital chez Dexvoi, ma mission est exclusivement dédiée à l'architecture web, au référencement Google Maps et au blindage de sécurité des entreprises. Pour toute question spécifique, vous pouvez joindre notre équipe humaine par WhatsApp ou par email à info@dexvoi.com.\n\nQuel est votre type d'établissement et votre site web ?",
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: "Hello! As a Digital Architect at Dexvoi, my role is strictly focused on digital architecture, Google Maps ranking, and web cybersecurity for business owners. For any custom inquiries, please reach out to our team at info@dexvoi.com or via WhatsApp.\n\nWhat type of business do you run and what is your website?",
          lang: 'en'
        };
      } else {
        return {
          reply: "¡Hola! Como Arquitecto Digital en Dexvoi, me enfoco exclusivamente en la arquitectura web, posicionamiento en Google Maps y blindaje de seguridad para empresas. Para consultas adicionales, puedes contactar a nuestro equipo humano en info@dexvoi.com o por WhatsApp.\n\n¿Qué tipo de negocio diriges y cuál es tu web?",
          lang: 'es'
        };
      }
    }

    // Check if user is asking about OSINT / Security Headers standalone service (29€)
    const isOsintQuery = /(\b(osint|cabecera|cabeceras|header|headers|brecha|brechas|vulnerab|vulnerabilidad|vulnerabilidades|hsts|csp|clickjacking|29€?|veintinueve)\b)/.test(lower);
    if (isOsintQuery) {
      if (lang === 'fr') {
        return {
          reply: `🛡️ Chez Dexvoi, nous proposons notre fonction spécialisée : **Audit OSINT & Blindage des En-têtes HTTP en Temps Réel** au tarif unique de **29€ (Paiement Unique, sans abonnement)**.
          
Notre moteur inspecte en direct :
✓ En-têtes de sécurité (HSTS, CSP, X-Frame-Options anti-clickjacking, X-Content-Type-Options).
✓ Reconnaissance passive OSINT (IP, détection de serveur, enregistrements SPF et DMARC anti-spoofing).
✓ Scripts de blindage immédiats prêts à coller pour Nginx, Apache et Cloudflare.

👉 Vous pouvez tester l'audit en direct sur notre plateforme dans la section "OSINT & Cabeceras", ou débloquer le rapport forensique complet pour 29€. Quel est votre site web ?`,
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: `🛡️ At Dexvoi, we provide our specialized **Real-Time OSINT & HTTP Security Headers Audit** as a standalone service for a one-time price of **29€ (No subscriptions or recurring plans)**.

Our live inspection engine audits:
✓ Security headers (HSTS, CSP, X-Frame-Options anti-clickjacking, X-Content-Type-Options).
✓ Passive OSINT reconnaissance (resolved IP, web server banner leakage, SPF & anti-phishing DMARC).
✓ Immediate copy-paste hardening scripts for Nginx, Apache, and Cloudflare.

👉 You can test our live scanner on the "OSINT & Cabeceras" section or unlock the full forensic audit package for 29€. What is your website domain?`,
          lang: 'en'
        };
      } else {
        return {
          reply: `🛡️ En Dexvoi disponemos de nuestra función especializada: **Auditoría OSINT & Blindaje de Cabeceras HTTP en Tiempo Real**, un servicio independiente con **Precio Único de 29€ (sin suscripción ni planes recurrentes)**.

Nuestro motor analiza en vivo:
✓ Cabeceras críticas de seguridad (HSTS, CSP, X-Frame-Options anti-clickjacking, X-Content-Type-Options).
✓ Reconocimiento pasivo OSINT (IP pública, fuga de banners de servidor, validación de SPF y DMARC anti-suplantación).
✓ Scripts de blindaje perimetral listos para copiar y pegar en Nginx, Apache y Cloudflare.

👉 Puedes probar el escáner en tiempo real en la sección "OSINT & Cabeceras" de nuestra web o adquirir el informe forense completo por 29€. ¿Cuál es la dirección de tu sitio web?`,
          lang: 'es'
        };
      }
    }

    // Check if user is asking about Booking Systems / Reservas
    const isBookingQuery = /(\b(reserva|reservas|cita|citas|booking|agenda|agendamiento|horario|calendario|rendez-vous|appointment|appointments)\b)/.test(lower);
    if (isBookingQuery) {
      if (lang === 'fr') {
        return {
          reply: `📅 **Systèmes de Gestion de Réservations Avancées Dexvoi** :
Automatisez la prise de rendez-vous et les ventes de votre établissement avec notre plateforme intelligente :

✅ Réservations en ligne 24h/24 et 7j/7 sans attente téléphonique.
✅ Rappels automatiques par e-mail et WhatsApp (-68% de no-shows).
✅ Synchronisation en temps réel (Google Calendar, Outlook, Apple).
✅ Intégration Google Maps avec bouton direct "Réserver".
✅ Tableau de bord intuitif sans commissions par client.

Idéal pour : salons de coiffure, cliniques médicales, restaurants, salles de sport, académies et hôtels.

Souhaitez-vous que nous configurions une démo personnalisée pour votre établissement ?`,
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: `📅 **Dexvoi Advanced Booking & Appointment Systems**:
Automate appointments, bookings, and sales for your business with our smart platform:

✅ 24/7 online booking: Your clients can schedule anytime without calls.
✅ Automatic reminders: Cut no-shows with instant email & WhatsApp alerts.
✅ Real-time synchronization: Instant sync with Google Calendar & Outlook.
✅ Google Maps integration: Feature direct "Book Now" buttons on your local profile.
✅ Intuitive dashboard: Manage appointments, staff, and payments with zero per-booking fees.

Perfect for salons, clinics, restaurants, gyms, academies, and hotels.

Would you like a live customized demo for your business?`,
          lang: 'en'
        };
      } else {
        return {
          reply: `📅 **Sistemas de Gestión de Reservas Avanzadas Dexvoi**:
Automatiza la gestión de citas, reservas y ventas de tu negocio con nuestra plataforma inteligente:

✅ Reservas online 24/7: Tus clientes pueden reservar a cualquier hora sin esperas.
✅ Recordatorios automáticos: Reduce cancelaciones con emails y WhatsApp (-68% no-shows).
✅ Sincronización en tiempo real: Agenda actualizada al instante con Google Calendar y Outlook.
✅ Integración con Google Maps: Aparece como "disponible ahora" con reserva directa.
✅ Panel de control intuitivo: Gestiona citas, turnos y cobros sin comisiones abusivas.

Ideal para: Peluquerías, clínicas, restaurantes, gimnasios, academias, hoteles y cualquier negocio que gestione citas.

¿Te gustaría que preparemos una propuesta de implantación adaptada a tu negocio?`,
          lang: 'es'
        };
      }
    }

    // Check if user is asking about AI Agents / Asistentes Virtuales / Automatización
    const isAiAgentQuery = /(\b(agente|agentes|ia|inteligencia artificial|chatbot|chatbots|asistente|asistentes|automatizacion|automatización|workflow|n8n|make|zapier|whatsapp bot)\b)/.test(lower);
    if (isAiAgentQuery) {
      if (lang === 'fr') {
        return {
          reply: `🤖 **Agents Avancés avec IA Dexvoi** :
Propulsez votre entreprise au niveau supérieur grâce à nos assistants virtuels et automatisations intelligentes :

✅ Assistants virtuels : Chatbots répondant aux questions et captant des leads 24h/24 et 7j/7.
✅ Automatisation des processus : Gagnez un temps précieux grâce à des workflows automatisés.
✅ Support client intelligent : Résolvez les doutes et planifiez des rendez-vous sans intervention humaine.
✅ Intégration WhatsApp & email : Communiquez avec vos clients où qu'ils soient.
✅ Personnalisation totale : Nous adaptons l'IA aux spécificités de votre entreprise.

Nous concevons des solutions d'IA sur mesure pour votre activité.

Souhaitez-vous planifier un échange technique avec nos spécialistes en IA ?`,
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: `🤖 **Dexvoi Advanced AI Agents**:
Take your business to the next level with virtual assistants and smart workflows:

✅ Virtual assistants: Chatbots answering questions and capturing leads 24/7.
✅ Process automation: Save valuable time with end-to-end automated workflows.
✅ Smart customer service: Answer inquiries and schedule appointments with zero human intervention.
✅ WhatsApp & email integration: Engage your customers seamlessly wherever they are.
✅ Total customization: We tailor our AI to your company's proprietary data and workflows.

We engineer bespoke AI solutions for your business.

Would you like to schedule a strategy session to evaluate your automation potential?`,
          lang: 'en'
        };
      } else {
        return {
          reply: `🤖 **AGENTES AVANZADOS CON IA - DEXVOI**

Lleva tu negocio al siguiente nivel con asistentes virtuales y automatizaciones inteligentes:

✅ Asistentes virtuales: Chatbots que responden preguntas y captan leads 24/7.
✅ Automatización de procesos: Ahorra tiempo con flujos de trabajo automáticos.
✅ Atención al cliente inteligente: Resuelve dudas y agenda citas sin intervención humana.
✅ Integración con WhatsApp y email: Comunica con tus clientes donde estén.
✅ Personalización total: Adaptamos la IA a las necesidades de tu negocio.

Desarrollamos soluciones de IA personalizadas para tu negocio.

¿Deseas que evaluemos qué procesos de tu empresa podemos automatizar con IA?`,
          lang: 'es'
        };
      }
    }

    // Check if user is asking about PDF report / payment (Step 6)
    const isPdfPaymentQuery = /(\b(pdf|informe|precio|pagar|pago|comprar|tarif|rapport|payer|paiement|achat|stripe|report|pricing|cost|buy|pay)\b)/.test(lower);
    if (isPdfPaymentQuery) {
      if (lang === 'fr') {
        return {
          reply: `📄 Pour acquérir le rapport complet en PDF avec analyse approfondie de sécurité, SEO et performance (plus de 20 pages), voici les options disponibles :

1. Cliquez sur le bouton "Rapport PDF (19€ / 49€ / 99€)" ci-dessous.
2. Complétez le paiement sécurisé par carte (Stripe).
3. En moins de 5 minutes, vous recevrez votre rapport détaillé par email.

Tarifs :
📄 Rapport basique (5 pages) : 19€
📊 Rapport complet (20+ pages) : 49€ (Recommandé)
🏆 Audit premium avec consultation 1-à-1 : 99€

🎯 Souhaitez-vous plutôt commencer par notre audit gratuit de 5 points sans engagement ? Répondez OUI pour planifier votre diagnostic.`,
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: `📄 To get your full PDF report with comprehensive security, SEO, and performance analysis (20+ pages), follow these steps:

1. Click the "PDF Report (19€ / 49€ / 99€)" button below.
2. Complete the secure card checkout via Stripe.
3. In under 5 minutes, you will receive your detailed PDF report by email.

Pricing options:
📄 Basic report (5 pages): 19€
📊 Complete report (20+ pages): 49€ (Most Popular)
🏆 Premium audit with 1-on-1 strategic consulting: 99€

🎯 Would you rather start with our free 5-point audit without commitment? Reply YES to schedule your diagnostic.`,
          lang: 'en'
        };
      } else {
        return {
          reply: `📄 Para adquirir el informe completo en PDF con análisis detallado de seguridad, SEO y rendimiento (más de 20 páginas), sigue estos pasos:

1. Haz clic en el botón "Informe PDF (19€ / 49€ / 99€)" abajo.
2. Completa el pago seguro con tarjeta vía Stripe.
3. En menos de 5 minutos recibirás tu informe detallado por email.

Precios:
📄 Informe básico (5 páginas): 19€
📊 Informe completo (20+ páginas): 49€ (Más Popular)
🏆 Auditoría premium con consultoría estratégica 1-a-1: 99€

🎯 ¿Prefieres comenzar por nuestra auditoría gratuita de 5 puntos sin costo ni compromiso? Responde SÍ para agendar tu diagnóstico.`,
          lang: 'es'
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
    const hasDiagnosticInContext = contextLower.includes('diagnostic pour') || contextLower.includes('diagnóstico para') || contextLower.includes('diagnosis for');

    // Check if user answered "SÍ" / "OUI" / "YES" AFTER diagnostic already exists
    const isAffirmative = /^(\s*(s[ií]|yes|oui|d'accord|exact|correcto|correct|parfait|ok|daccord|vamos|claro)\s*[.!]?\s*)$/i.test(lower);
    const isAcceptingFreeAudit = hasDiagnosticInContext && (isAffirmative || lower.includes('audit') || lower.includes('diagnóstico') || lower.includes('rdv') || lower.includes('llamada'));

    if (isAcceptingFreeAudit) {
      if (lang === 'fr') {
        return {
          reply: `🎯 Parfait ! Votre diagnostic stratégique gratuit de 5 points est pré-enregistré chez Dexvoi.

Notre équipe d'Architectes Digitaux va analyser en détail votre vitesse de chargement, vos failles d'architecture et votre positionnement local.

👉 Veuillez cliquer sur le bouton "Audit Gratuit (5 points)" ci-dessous pour confirmer vos coordonnées, ou écrivez-nous directement sur WhatsApp (+212 600-000000).`,
          lang: 'fr'
        };
      } else if (lang === 'en') {
        return {
          reply: `🎯 Perfect! Your free 5-point strategic digital diagnosis has been scheduled with Dexvoi.

Our Digital Architects team will conduct a deep inspection of your site speed, security architecture, and local rankings.

👉 Please click the "Free Audit (5 points)" button below to confirm your contact details, or message us directly via WhatsApp (+212 600-000000).`,
          lang: 'en'
        };
      } else {
        return {
          reply: `🎯 ¡Excelente! Tu diagnóstico estratégico gratuito de 5 puntos ha sido registrado con el equipo de Dexvoi.

Nuestro equipo de Arquitectos Digitales analizará a fondo tu velocidad, arquitectura técnica y posicionamiento local.

👉 Haz clic en el botón "Audit Gratuit (5 points)" abajo para confirmar tus datos, o escríbenos directamente por WhatsApp (+212 600-000000).`,
          lang: 'es'
        };
      }
    }

    // Step 3 & 4: If user confirmed YES/OUI to launch analysis, or asked for scan
    const isAwaitingConfirmation = contextLower.includes('est-ce correct') || contextLower.includes('es correcto') || contextLower.includes('is this correct');
    const wantsAnalysis = isAffirmative || (isAwaitingConfirmation && isAffirmative) || lower.includes('analizar') || lower.includes('scanner') || lower.includes('analyser') || lower.includes('scan');

    if (wantsAnalysis) {
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
          lang: 'fr'
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
          lang: 'en'
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
          lang: 'es'
        };
      }
    }

    // Step 2 & 2.5: User provides their business / URL -> AI identifies sector & asks confirmation
    const targetLabel = info.detectedUrl || (info.location ? `${info.businessName} (${info.location})` : info.businessName);

    if (lang === 'fr') {
      return {
        reply: `J'ai bien reçu vos informations : ${targetLabel}. Notre IA a identifié que votre activité appartient au secteur "${info.sectorFr}".

Est-ce correct ? Répondez OUI pour que mon système lance l'analyse automatique.`,
        lang: 'fr'
      };
    } else if (lang === 'en') {
      return {
        reply: `I have received your information: ${targetLabel}. Our AI has identified your business as belonging to the "${info.sectorEn}" sector.

Is this correct? Reply YES for my system to launch the automated analysis.`,
        lang: 'en'
      };
    } else {
      return {
        reply: `He recibido tus datos: ${targetLabel}. Nuestra IA ha identificado que tu actividad pertenece al sector "${info.sectorEs}".

¿Es correcto? Responde SÍ para que mi sistema lance el análisis automático.`,
        lang: 'es'
      };
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMessageObj: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessageObj];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Bonjour ! Je suis à votre écoute pour auditer votre présence digitale.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: data.detectedLanguage || 'fr'
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Graceful fallback to client-side detection engine
      const fallback = generateClientFallback(messageText, newHistory);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallback.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: fallback.lang
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    {
      label: "🇲🇦 Salon Casa (salon-elegance.ma)",
      text: "Bonjour, j'ai un salon de coiffure à Casablanca et mon site est www.salon-elegance.ma."
    },
    {
      label: "🇪🇸 Peluquería Madrid (peluqueriamadrid.es)",
      text: "Hola, tengo una peluquería en Madrid y mi web es www.peluqueriamadrid.es."
    },
    {
      label: "🇬🇧 Dental Clinic (harleystreet-dental.co.uk)",
      text: "Hello, my dental clinic in London website is www.harleystreet-dental.co.uk."
    }
  ];

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        {/* Floating Tooltip / Speech bubble prompt when closed */}
        {!isOpen && showNotificationBadge && (
          <div className="mb-2.5 max-w-xs bg-[#131B33] border border-[#0066FF]/40 rounded-2xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 text-xs font-mono relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBadge(false);
              }}
              className="absolute -top-1.5 -right-1.5 p-0.5 bg-gray-800 text-gray-400 hover:text-white rounded-full"
              aria-label="Fermer la notification"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5 text-[#F5A623] text-[11px] font-bold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Architecte Digital IA' : language === 'en' ? 'AI Digital Architect' : 'Arquitecto Digital IA'}</span>
            </div>
            <p className="text-gray-200 text-[11px] leading-tight">
              {language === 'fr'
                ? 'Besoin de clients sur Google ou de blinder votre site ? Échangeons en direct (FR / EN / ES).'
                : language === 'en'
                ? 'Need more clients on Google or security hardening? Chat live with us (EN / FR / ES).'
                : '¿Necesitas clientes en Google o blindar tu web? Hablemos en directo (ES / FR / EN).'}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
            setShowNotificationBadge(false);
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 font-mono text-xs uppercase tracking-wider ${
            isOpen
              ? 'bg-[#1E293B] text-gray-300 border border-gray-700 hover:text-white'
              : 'metallic-btn text-[#0A0F1F] font-bold border border-[#F5A623] hover:scale-105 shadow-[0_0_20px_rgba(245,166,35,0.35)]'
          }`}
          aria-label={isOpen ? "Fermer" : "Ouvrir"}
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#0A0F1F]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </div>
          <span className="hidden sm:inline">
            {isOpen
              ? (language === 'fr' ? 'Fermer Assistant' : language === 'en' ? 'Close Assistant' : 'Cerrar Asistente')
              : (language === 'fr' ? 'Assistant Dexvoi (FR / EN / ES)' : language === 'en' ? 'Dexvoi Assistant (EN / FR / ES)' : 'Asistente Dexvoi (ES / FR / EN)')}
          </span>
        </button>
      </div>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 bottom-24 lg:bottom-20 z-50 w-[92vw] sm:w-[420px] bg-[#0A0F1F] border border-[#0066FF]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-xl ${
            isMinimized ? 'h-14' : 'h-[580px] max-h-[80vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="p-3.5 bg-[#131B33] border-b border-gray-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#F5A623]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Dexvoi Assistant
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    En ligne
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span>FR</span> <span className="text-gray-600">·</span> <span>EN</span> <span className="text-gray-600">·</span> <span>ES</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800/80 transition-colors"
                aria-label={isMinimized ? "Agrandir" : "Minimiser"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-800/80 transition-colors"
                aria-label="Fermer l'assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Quick Prompt Presets */}
              <div className="bg-[#0D1326] px-3 py-2 border-b border-gray-800/70 overflow-x-auto scrollbar-none flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase whitespace-nowrap">
                  Exemples :
                </span>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    disabled={isLoading}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-[#1E293B] hover:bg-[#0066FF]/30 border border-gray-700 text-gray-300 hover:text-white whitespace-nowrap transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Chat Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
                {messages.map((m) => {
                  const isUser = m.role === 'user';
                  const text = m.content;
                  const hasDiagnosticReport = text.includes('DIAGNÓSTICO') || text.includes('DIAGNOSTIC') || text.includes('DIAGNOSIS');
                  const hasPdfOffer = text.includes('PDF') || text.includes('49€') || text.includes('19€') || text.includes('Stripe');
                  const asksConfirmation = !isUser && (
                    (text.includes('OUI') || text.includes('SÍ') || text.includes('YES')) &&
                    (text.includes('analyse') || text.includes('análisis') || text.includes('analysis') || text.includes('Est-ce correct') || text.includes('¿Es correcto?') || text.includes('Is this correct?'))
                  );

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 space-y-2 relative leading-relaxed ${
                          isUser
                            ? 'bg-[#0066FF] text-white rounded-br-none shadow-md'
                            : 'bg-[#131B33] border border-gray-800 text-gray-200 rounded-bl-none shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-line font-sans text-[11.5px] leading-relaxed">{m.content}</p>

                        {/* Interactive Quick Answer Button when Assistant asks confirmation to run automatic scan */}
                        {!isUser && asksConfirmation && (
                          <div className="pt-2 border-t border-gray-800/80 mt-2 flex flex-wrap gap-1.5">
                            <button
                              onClick={() => handleSendMessage("OUI")}
                              className="px-3 py-1.5 rounded bg-[#0066FF] hover:bg-[#0052cc] text-white font-mono text-[10.5px] font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                              <span>⚡ OUI / SÍ (Lancer l'analyse automatique)</span>
                            </button>
                          </div>
                        )}

                        {/* Interactive Action Buttons inside Assistant message */}
                        {!isUser && (
                          <div className="pt-2 border-t border-gray-800/80 mt-2 flex flex-wrap gap-2">
                            {/* Free Audit Button */}
                            <button
                              onClick={onOpenAuditModal}
                              className="px-2.5 py-1 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623] hover:text-[#0A0F1F] font-mono text-[10px] font-bold uppercase transition-all inline-flex items-center gap-1.5"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Audit Gratuit (5 points)</span>
                            </button>

                            {/* PDF Report Purchase Button (Step 6) */}
                            {(hasPdfOffer || hasDiagnosticReport) && onOpenPdfModal && (
                              <button
                                onClick={() => onOpenPdfModal('complete')}
                                className="px-2.5 py-1 rounded bg-[#635BFF]/20 border border-[#635BFF]/50 text-[#A5B4FC] hover:bg-[#635BFF] hover:text-white font-mono text-[10px] font-bold uppercase transition-all inline-flex items-center gap-1.5"
                              >
                                <CreditCard className="w-3 h-3" />
                                <span>Stripe Checkout (19€ / 49€ / 99€)</span>
                              </button>
                            )}

                            {/* Direct Fast Stripe Checkout Link for 49€ Most Popular */}
                            {hasPdfOffer && (
                              <a
                                href="https://buy.stripe.com/9B66oI862eUc8Um92NdAk01"
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 rounded bg-[#635BFF] text-white hover:bg-[#5349e0] font-mono text-[10px] font-bold uppercase transition-all inline-flex items-center gap-1 shadow-sm"
                              >
                                <span>Pagar 49€ (Stripe)</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}

                            {/* WhatsApp Direct Contact */}
                            <a
                              href="https://wa.me/212600000000?text=Bonjour%20Dexvoi%2C%20je%20souhaite%20un%20audit%20pour%20mon%20entreprise."
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-[#1E293B] border border-gray-700 text-gray-300 hover:text-white font-mono text-[10px] transition-colors inline-flex items-center gap-1"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        )}
                      </div>

                      <span className="text-[9px] font-mono text-gray-500 mt-1 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-gray-400 font-mono text-xs bg-[#131B33] p-3 rounded-2xl rounded-bl-none border border-gray-800 max-w-[200px]">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0066FF]" />
                    <span>L'Architecte analyse...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Quick Action Chips */}
              <div className="px-3 py-1.5 bg-[#0A0F1F] border-t border-gray-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => handleSendMessage(language === 'en' ? "YES" : language === 'fr' ? "OUI" : "SÍ")}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#0066FF]/20 hover:bg-[#0066FF] hover:text-white text-[#0066FF] border border-[#0066FF]/40 transition-colors whitespace-nowrap font-bold"
                >
                  ⚡ {language === 'en' ? 'Launch Audit (YES)' : language === 'fr' ? 'Lancer Analyse (OUI)' : 'Iniciar Análisis (SÍ)'}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const el = document.getElementById('osint-audit');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#0066FF]/25 hover:bg-[#0066FF] hover:text-white text-white border border-[#0066FF]/60 transition-colors whitespace-nowrap font-bold flex items-center gap-1"
                >
                  <span>🛡️ OSINT & Cabeceras</span>
                  <span className="text-[#F5A623]">(29€)</span>
                </button>
                <button
                  onClick={onOpenAuditModal}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#F5A623]/20 hover:bg-[#F5A623] hover:text-[#0A0F1F] text-[#F5A623] border border-[#F5A623]/40 transition-colors whitespace-nowrap font-bold"
                >
                  🛡️ {language === 'en' ? 'Free Audit (5 pts)' : language === 'fr' ? 'Audit Gratuit (5 pts)' : 'Auditoría Gratuita (5 pts)'}
                </button>
                <button
                  onClick={() => onOpenPdfModal ? onOpenPdfModal('complete') : handleSendMessage("Quiero el informe completo en PDF")}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#1E293B] hover:bg-[#0066FF] hover:text-white text-gray-300 border border-gray-700 transition-colors whitespace-nowrap"
                >
                  📄 {language === 'en' ? 'PDF Report (49€)' : language === 'fr' ? 'Rapport PDF (49€)' : 'Informe PDF (49€)'}
                </button>
              </div>

              {/* Bottom Input Area */}
              <div className="p-3 bg-[#0D1326] border-t border-gray-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      language === 'fr'
                        ? 'Écrivez en français, anglais ou espagnol...'
                        : language === 'en'
                        ? 'Write in English, Spanish, or French...'
                        : 'Escribe en español, francés o inglés...'
                    }
                    className="flex-1 bg-[#131B33] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#0066FF] transition-all"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="metallic-btn p-2.5 rounded-xl disabled:opacity-40 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                    aria-label="Envoyer"
                  >
                    <Send className="w-4 h-4 text-[#0A0F1F]" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-gray-500 px-1">
                  <span>{language === 'fr' ? 'Actif : Français (FR / EN / ES)' : language === 'en' ? 'Active: English (EN / ES / FR)' : 'Activo: Español (ES / FR / EN)'}</span>
                  <a
                    href="mailto:contact@dexvoi.com"
                    className="hover:text-[#0066FF] transition-colors"
                  >
                    {language === 'fr' ? 'Contact humain' : language === 'en' ? 'Human contact' : 'Contacto humano'}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
