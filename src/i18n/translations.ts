export type Language = 'es' | 'fr' | 'en';

export interface Translations {
  // Navigation
  nav: {
    brandTagline: string;
    diagnosis: string;
    services: string;
    booking: string;
    aiAgents: string;
    osint: string;
    osintBadge: string;
    pricing: string;
    pricingBadge: string;
    contact: string;
    freeAudit: string;
    nodesOnline: string;
    mobileTitle: string;
    mobileSubtitle: string;
  };

  // Hero
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleHighlight: string;
    subtitle: string;
    ctaAudit: string;
    ctaScanner: string;
    statSpeed: string;
    statSpeedDesc: string;
    statDefense: string;
    statDefenseDesc: string;
    statConversion: string;
    statConversionDesc: string;
    secureNotice: string;
  };

  // The Problem (3 Leaks)
  problem: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    leak1Title: string;
    leak1Desc: string;
    leak1Impact: string;
    leak2Title: string;
    leak2Desc: string;
    leak2Impact: string;
    leak3Title: string;
    leak3Desc: string;
    leak3Impact: string;
    ctaAudit: string;
  };

  // Services (The 3 Pillars)
  services: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    filterAll: string;
    pillar1Title: string;
    pillar1Tagline: string;
    pillar1Desc: string;
    pillar1Badge: string;
    pillar1Benefit1: string;
    pillar1Benefit2: string;
    pillar1Benefit3: string;
    pillar1Spec1Label: string;
    pillar1Spec1Val: string;
    pillar1Spec2Label: string;
    pillar1Spec2Val: string;
    pillar1Spec3Label: string;
    pillar1Spec3Val: string;
    pillar1Audience: string;

    pillar2Title: string;
    pillar2Tagline: string;
    pillar2Desc: string;
    pillar2Badge: string;
    pillar2Benefit1: string;
    pillar2Benefit2: string;
    pillar2Benefit3: string;
    pillar2Spec1Label: string;
    pillar2Spec1Val: string;
    pillar2Spec2Label: string;
    pillar2Spec2Val: string;
    pillar2Spec3Label: string;
    pillar2Spec3Val: string;
    pillar2Audience: string;

    pillar3Title: string;
    pillar3Tagline: string;
    pillar3Desc: string;
    pillar3Badge: string;
    pillar3Benefit1: string;
    pillar3Benefit2: string;
    pillar3Benefit3: string;
    pillar3Spec1Label: string;
    pillar3Spec1Val: string;
    pillar3Spec2Label: string;
    pillar3Spec2Val: string;
    pillar3Spec3Label: string;
    pillar3Spec3Val: string;
    pillar3Audience: string;

    ctaPillar: string;
  };

  // Booking System
  booking: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    beforeLabel: string;
    beforeText: string;
    afterLabel: string;
    afterText: string;
    cta: string;
  };

  // AI Agents
  aiAgents: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    statLabel: string;
    statValue: string;
    statDesc: string;
    cta: string;
  };

  // Methodology
  methodology: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step4Num: string;
    step4Title: string;
    step4Desc: string;
    cta: string;
  };

  // Testimonials
  testimonials: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };

  // Fast Scanner
  scanner: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    inputPlaceholder: string;
    btnScan: string;
    btnScanning: string;
    simulatedDisclaimer: string;
    scoreOverall: string;
    scoreSpeed: string;
    scoreSecurity: string;
    scoreSeo: string;
    ctaApplyAudit: string;
  };

  // OSINT & Security Auditor
  osint: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    inputPlaceholder: string;
    btnAnalyze: string;
    analyzing: string;
    reportPrice: string;
    btnGetReport: string;
    scoreLabel: string;
    gradeLabel: string;
    passedHeaders: string;
    warningHeaders: string;
    failedHeaders: string;
    detectedTech: string;
    spoofingProtection: string;
    nginxFix: string;
    apacheFix: string;
  };

  // Pricing
  pricing: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    popularBadge: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
    tierBasicTitle: string;
    tierBasicSubtitle: string;
    tierBasicPrice: string;
    tierBasicPages: string;
    tierBasicBtn: string;
    tierCompleteTitle: string;
    tierCompleteSubtitle: string;
    tierCompletePrice: string;
    tierCompletePages: string;
    tierCompleteBtn: string;
    tierPremiumTitle: string;
    tierPremiumSubtitle: string;
    tierPremiumPrice: string;
    tierPremiumPages: string;
    tierPremiumBtn: string;
    freeAuditPrompt: string;
    freeAuditBtn: string;
    vatNotice: string;
  };

  // Contact
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    businessTypeLabel: string;
    urlLabel: string;
    urlPlaceholder: string;
    concernLabel: string;
    concernPlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    directContactTitle: string;
    directContactDesc: string;
    whatsappLabel: string;
  };

  // Footer
  footer: {
    desc: string;
    description: string;
    columns: {
      services: string;
      security: string;
      company: string;
      legal: string;
    };
    servicesCol: string;
    sectorsCol: string;
    sectorClinics: string;
    sectorAesthetic: string;
    sectorRestaurants: string;
    sectorHospitality: string;
    contactArchitect: string;
    badgeTitle: string;
    badgeSubtitle: string;
    badgeText: string;
    rights: string;
    architectureDisclaimer: string;
    privacy: string;
    terms: string;
    cookies: string;
    legalNotice: string;
    legal: string;
    ethicalAudit: string;
  };

  // Modals & Banner
  modals: {
    close: string;
    freeAuditTitle: string;
    freeAuditSubtitle: string;
    pdfModalTitle: string;
    pdfModalDesc: string;
    osintModalTitle: string;
    osintModalDesc: string;
    consentText: string;
    consentAccept: string;
    consentConfigure: string;
    legalTabPrivacy: string;
    legalTabTerms: string;
    legalTabCookies: string;
    legalTabLegal: string;
  };

  // Mobile Nav
  mobileNav: {
    home: string;
    services: string;
    security: string;
    pricing: string;
    contact: string;
  };

  // Language selector labels
  langSelector: {
    current: string;
    switchLang: string;
    spanish: string;
    french: string;
    english: string;
    autoDetected: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      brandTagline: 'Architectural Defense & Growth',
      diagnosis: 'Diagnóstico',
      services: 'Servicios',
      booking: 'Reservas',
      aiAgents: 'Agentes IA',
      osint: 'OSINT',
      osintBadge: '29€',
      pricing: 'Planes de Pago',
      pricingBadge: '19€ / 49€ / 99€',
      contact: 'Contacto',
      freeAudit: 'Auditoría Gratuita',
      nodesOnline: 'NODES ONLINE',
      mobileTitle: 'SISTEMAS OPERATIVOS',
      mobileSubtitle: 'v3.4.8 SECURE'
    },
    hero: {
      badge: 'INGENIERÍA & DEFENSA DIGITAL DE ÉLITE',
      titleLine1: 'Arquitectura Web Inmune,',
      titleLine2: 'Tráfico Dominante &',
      titleHighlight: 'Sistemas de Conversión.',
      subtitle: 'Diseñamos infraestructuras web militares, blindamos clínicas y restaurantes contra vulnerabilidades y automatizamos tus reservas con IA y SEO local.',
      ctaAudit: 'Auditoría Forense de 5 Puntos',
      ctaScanner: 'Escanear mi Web Ahora',
      statSpeed: '< 1.2s',
      statSpeedDesc: 'Velocidad de carga Core Web Vitals',
      statDefense: '100%',
      statDefenseDesc: 'Blindaje perimetral y cabeceras HTTPS',
      statConversion: '+180%',
      statConversionDesc: 'Incremento promedio en reservas online',
      secureNotice: 'Protocolo de cifrado TLS 1.3 activo y seguro'
    },
    problem: {
      badge: 'VULNERABILIDADES CRÍTICAS',
      title: 'Las 3 Fugas Digitales que',
      titleHighlight: 'Destruyen tu Facturación',
      subtitle: 'El 92% de las webs de clínicas y restaurantes sufren de problemas invisibles que ahuyentan clientes y dejan expuesta información confidencial.',
      leak1Title: 'Lentitud de Carga Extrema',
      leak1Desc: 'Más de 3 segundos en móvil provoca que el 53% de tus potenciales comensales o pacientes abandonen antes de ver tu oferta.',
      leak1Impact: 'Impacto directo en tasa de rebote y penalización de Google.',
      leak2Title: 'Vulnerabilidades y Brechas de Seguridad',
      leak2Desc: 'Falta de cabeceras HSTS, CSP y datos no cifrados que exponen a tu negocio a sanciones RGPD y ataques de malware.',
      leak2Impact: 'Riesgo legal, multas administrativas y pérdida total de reputación.',
      leak3Title: 'Invisibilidad en Google Maps',
      leak3Desc: 'Sin optimización geo-localizada, tus competidores más cercanos capturan todas las reservas que deberían ser tuyas.',
      leak3Impact: 'Pérdida de cientos de reservas y pacientes calificados cada mes.',
      ctaAudit: 'Diagnosticar mi Web Sin Costo'
    },
    services: {
      badge: 'PILARES ESTRATÉGICOS',
      title: 'Nuestros 3 Pilares de',
      titleHighlight: 'Ingeniería Digital',
      subtitle: 'Un enfoque holístico que combina rendimiento extremo, dominación de mercado local y ciberdefensa sin fisuras.',
      filterAll: 'Ver Todos los Pilares',
      pillar1Title: 'Arquitectura Web & Sistemas',
      pillar1Tagline: 'ESTRUCTURAS DIGITALES DE ALTO RENDIMIENTO',
      pillar1Desc: 'Estructuras digitales robustas y de carga instantánea diseñadas para brindar una experiencia de usuario impecable.',
      pillar1Badge: 'VELOCIDAD & CONVERSIÓN',
      pillar1Benefit1: 'Plataformas a medida con sistemas de reservas online y gestión de citas automatizadas 24/7.',
      pillar1Benefit2: 'Optimización de velocidad militar (tiempos de carga menores a 1.5s) para maximizar conversiones.',
      pillar1Benefit3: 'Experiencia móvil ultrafluida para comensales exigentes y pacientes de alto valor.',
      pillar1Spec1Label: 'Tiempo de Carga',
      pillar1Spec1Val: '< 1.2 Segundos',
      pillar1Spec2Label: 'Disponibilidad',
      pillar1Spec2Val: '99.99% Uptime',
      pillar1Spec3Label: 'Automatización Citas',
      pillar1Spec3Val: 'Integración WhatsApp/Email',
      pillar1Audience: 'Clínicas médicas, centros estéticos y restaurantes que requieren agenda automatizada.',

      pillar2Title: 'Posicionamiento Avanzado (SEO Local & Ads)',
      pillar2Tagline: 'DOMINACIÓN DE TRÁFICO GEO-LOCALIZADO',
      pillar2Desc: 'Estrategias de visibilidad dominante para colocar tu clínica o restaurante frente a clientes listos para comprar.',
      pillar2Badge: 'GOOGLE MAPS #1 & ADS',
      pillar2Benefit1: 'Dominio en Google Maps y búsquedas geo-localizadas ("cerca de mí") en tu ciudad.',
      pillar2Benefit2: 'Campañas de publicidad digital hipersegmentadas con retorno de inversión medible desde el primer mes.',
      pillar2Benefit3: 'Auditoría de competencia y sistemas de captura estratégica de reseñas 5 estrellas.',
      pillar2Spec1Label: 'Visibilidad Local',
      pillar2Spec1Val: 'Top 3 Google Maps',
      pillar2Spec2Label: 'Costo por Adquisición',
      pillar2Spec2Val: 'Optimizado por IA',
      pillar2Spec3Label: 'Generador Reseñas',
      pillar2Spec3Val: 'Automatizado post-visita',
      pillar2Audience: 'Negocios con sede física que buscan acaparar las búsquedas de su zona urbana.',

      pillar3Title: 'Ethical Hacking & Blindaje Digital',
      pillar3Tagline: 'DEFENSA PERIMETRAL Y AUDITORÍA OFENSIVA',
      pillar3Desc: 'Protección perimetral y auditorías de seguridad continua para que operes con total tranquilidad financiera y legal.',
      pillar3Badge: 'SEGURIDAD & PROTECCIÓN DE DATOS',
      pillar3Benefit1: 'Auditoría web profunda y hacking ético para detectar y cerrar brechas antes de que sean explotadas.',
      pillar3Benefit2: 'Cumplimiento estricto en protección de datos, cifrado SSL avanzado y escudos antimalware.',
      pillar3Benefit3: 'Monitoreo preventivo contra caídas de servidor, inyecciones maliciosas y robo de datos de clientes.',
      pillar3Spec1Label: 'Nivel de Blindaje',
      pillar3Spec1Val: 'Grado A+ SSL Labs',
      pillar3Spec2Label: 'Cumplimiento Legal',
      pillar3Spec2Val: '100% RGPD / LOPD',
      pillar3Spec3Label: 'Frecuencia de Test',
      pillar3Spec3Val: 'Monitoreo Continuo 24/7',
      pillar3Audience: 'Empresas que gestionan datos sensibles de pacientes, historiales o pagos con tarjeta.',

      ctaPillar: 'Solicitar Auditoría de este Pilar'
    },
    booking: {
      badge: 'CONVERSIÓN 24/7',
      title: 'Sistemas de Gestión de',
      titleHighlight: 'Reservas Avanzadas',
      subtitle: 'Olvídate de perder citas por teléfono no contestado o formularios lentos. Conectamos tu web directamente con la agenda de tus especialistas.',
      feature1Title: 'Sincronización en Tiempo Real',
      feature1Desc: 'Integración bidireccional con Google Calendar, Outlook y sistemas hospitalarios o TPV de hostelería.',
      feature2Title: 'Recordatorios Automáticos por WhatsApp',
      feature2Desc: 'Reduce las ausencias no notificadas (no-shows) hasta en un 85% con recordatorios automáticos vía WhatsApp y SMS.',
      feature3Title: 'Cobro de Fianzas o Anticipos',
      feature3Desc: 'Cobro seguro previo integrado con Stripe para garantizar la asistencia de pacientes o comensales en horas punta.',
      feature4Title: 'Optimización de Turnos y Mesas',
      feature4Desc: 'Algoritmos de asignación inteligente para maximizar la ocupación de mesas o sillones de tratamiento.',
      beforeLabel: 'Antes de Dexvoi',
      beforeText: 'Llamadas perdidas, agendas de papel, no-shows del 25% y clientes insatisfechos esperando confirmación manual.',
      afterLabel: 'Con Dexvoi',
      afterText: 'Reservas instantáneas 24/7, recordatorios por WhatsApp, 98% de asistencia confirmada y control total desde el móvil.',
      cta: 'Implementar Sistema en mi Negocio'
    },
    aiAgents: {
      badge: 'INTELIGENCIA ARTIFICIAL APLICADA',
      title: 'Agentes Virtuales Avanzados',
      titleHighlight: 'Entrenados para tu Sector',
      subtitle: 'No son chatbots genéricos con respuestas en bucle. Son agentes inteligentes diseñados con modelos neuronales que resuelven dudas clínicas o gastronómicas en segundos.',
      feature1Title: 'Atención 24/7 en Múltiples Idiomas',
      feature1Desc: 'Responde preguntas frecuentes sobre tratamientos, menús, alérgenos y precios en español, francés e inglés.',
      feature2Title: 'Triaje Clínico & Pre-calificación',
      feature2Desc: 'Filtra pacientes según la urgencia de su caso y los redirige al especialista adecuado automáticamente.',
      feature3Title: 'Cierre de Reservas Autónomo',
      feature3Desc: 'El agente asiste al usuario durante todo el flujo de reserva sin requerir la intervención de tu recepcionista.',
      statLabel: 'Tiempo de respuesta',
      statValue: '< 3 Segundos',
      statDesc: 'Respuesta instantánea las 24 horas del día, los 365 días del año.',
      cta: 'Probar Agente IA en mi Web'
    },
    methodology: {
      badge: 'EL ARQUITECTO DIGITAL',
      title: 'Nuestra Metodología de',
      titleHighlight: 'Ingeniería en 4 Fases',
      subtitle: 'Un proceso estructurado, predecible y orientado exclusivamente a métricas de rendimiento y facturación.',
      step1Num: '01',
      step1Title: 'Auditoría Forense & Diagnóstico',
      step1Desc: 'Escaneamos más de 80 puntos técnicos: tiempos de carga, cabeceras de seguridad, estado de SSL, indexación en Google y brechas perimetrales.',
      step2Num: '02',
      step2Title: 'Blueprint de Arquitectura',
      step2Desc: 'Diseñamos la solución exacta a medida: arquitectura de velocidad extrema, sistema de reservas o plan de blindaje perimetral.',
      step3Num: '03',
      step3Title: 'Ejecución & Blindaje Militar',
      step3Desc: 'Desarrollamos e implementamos el código limpio, optimizamos los servidores y configuramos los sistemas de seguridad y conversión.',
      step4Num: '04',
      step4Title: 'Monitoreo & Crecimiento Continuo',
      step4Desc: 'Supervisamos el rendimiento en tiempo real, garantizamos el 99.99% de uptime y escalamos tu visibilidad local mes a mes.',
      cta: 'Iniciar la Fase 1 Ahora'
    },
    testimonials: {
      badge: 'RESULTADOS COMPROBADOS',
      title: 'Casos de Éxito de',
      titleHighlight: 'Clínicas y Restaurantes',
      subtitle: 'Descubre cómo hemos transformado la presencia digital de negocios que ahora lideran sus respectivas ciudades.'
    },
    scanner: {
      badge: 'DIAGNÓSTICO EN TIEMPO REAL',
      title: 'Escáner Ultrarrápido de',
      titleHighlight: 'Salud Digital',
      subtitle: 'Introduce la URL de tu negocio y obtén una evaluación preliminar de velocidad, seguridad y SEO local en 10 segundos.',
      inputPlaceholder: 'ejemplo: www.miclinica.com o mirestaurante.es',
      btnScan: 'Escanear Gratis',
      btnScanning: 'Analizando Nodos...',
      simulatedDisclaimer: 'Auditoría técnica simulada mediante heurísticas en tiempo real.',
      scoreOverall: 'Puntuación Global',
      scoreSpeed: 'Velocidad',
      scoreSecurity: 'Seguridad',
      scoreSeo: 'SEO Local',
      ctaApplyAudit: 'Solicitar Solución para estos Fallos'
    },
    osint: {
      badge: 'HERRAMIENTA OSINT EN VIVO',
      title: 'Escáner Pasivo de Seguridad &',
      titleHighlight: 'Cabeceras HTTP',
      subtitle: 'Analiza en tiempo real las defensas perimetrales de cualquier dominio: HSTS, CSP, X-Frame-Options, certificados SSL y registros anti-spoofing.',
      inputPlaceholder: 'tudominio.com',
      btnAnalyze: 'Ejecutar Auditoría OSINT',
      analyzing: 'Escaneando Cabeceras...',
      reportPrice: '29€ Pago Único',
      btnGetReport: 'Descargar Informe OSINT Forense (29€)',
      scoreLabel: 'Puntuación Perimetral',
      gradeLabel: 'Calificación de Seguridad',
      passedHeaders: 'Cabeceras Correctas',
      warningHeaders: 'Advertencias',
      failedHeaders: 'Cabeceras Críticas Faltantes',
      detectedTech: 'Tecnologías Detectadas',
      spoofingProtection: 'Protección Anti-Spoofing (SPF/DMARC)',
      nginxFix: 'Script de Remediación Nginx',
      apacheFix: 'Script de Remediación Apache'
    },
    pricing: {
      badge: 'TARIFAS TRANSPARENTES',
      title: 'Planes Oficiales de',
      titleHighlight: 'Auditoría Forense',
      subtitle: 'Sin sorpresas, sin cuotas ocultas. Informes ejecutivos completos y sesiones estratégicas con nuestros Arquitectos Digitales.',
      popularBadge: 'MÁS POPULAR',
      guaranteeTitle: 'Garantía Dexvoi de Satisfacción',
      guaranteeDesc: 'Todos nuestros pagos están procesados mediante la infraestructura oficial segura de Stripe con cifrado bancario de 256 bits.',
      tierBasicTitle: 'Informe Básico',
      tierBasicSubtitle: 'Diagnóstico rápido de salud web',
      tierBasicPrice: '19€',
      tierBasicPages: '5 Páginas en PDF',
      tierBasicBtn: 'Adquirir Informe Básico (19€)',
      tierCompleteTitle: 'Informe Completo',
      tierCompleteSubtitle: 'Auditoría forense 360° en profundidad',
      tierCompletePrice: '49€',
      tierCompletePages: '20+ Páginas en PDF',
      tierCompleteBtn: 'Adquirir Informe Completo (49€)',
      tierPremiumTitle: 'Auditoría Premium + 1 a 1',
      tierPremiumSubtitle: 'Informe forense completo con sesión técnica privada',
      tierPremiumPrice: '99€',
      tierPremiumPages: '20+ Páginas + Consultoría 45 min',
      tierPremiumBtn: 'Adquirir Auditoría Premium (99€)',
      freeAuditPrompt: '¿Prefieres comenzar con nuestra evaluación gratuita?',
      freeAuditBtn: 'Solicitar Auditoría de 5 Puntos (Gratis)',
      vatNotice: 'Impuestos aplicables calculados según tu país en el checkout seguro de Stripe.'
    },
    contact: {
      badge: 'CONTACTO DIRECTO',
      title: 'Habla con un',
      titleHighlight: 'Arquitecto Digital',
      subtitle: 'Sin comerciales intermediarios. Evalúa tu proyecto directamente con ingenieros especializados en conversión y ciberseguridad.',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Dr. Alejandro Méndez o Carlos Ruiz',
      emailLabel: 'Correo Corporativo',
      emailPlaceholder: 'contacto@miclinica.com',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+34 600 000 000',
      businessTypeLabel: 'Tipo de Negocio',
      urlLabel: 'Dirección Web (Opcional)',
      urlPlaceholder: 'www.tunegocio.com',
      concernLabel: 'Principal Desafío o Preocupación',
      concernPlaceholder: 'Ej: Pérdida de pacientes en la web, tiempos de carga lentos o dudas sobre ciberseguridad...',
      submitBtn: 'Enviar Solicitud al Arquitecto',
      submitting: 'Transmitiendo Datos...',
      successTitle: '¡Solicitud Recibida!',
      successDesc: 'Un Arquitecto Digital analizará tus datos y se pondrá en contacto contigo en menos de 2 horas laborables.',
      directContactTitle: 'Atención Telefónica & WhatsApp',
      directContactDesc: 'Si prefieres una consulta inmediata, nuestro canal de WhatsApp está activo para emergencias o diagnósticos exprés.',
      whatsappLabel: 'Hablar por WhatsApp'
    },
    footer: {
      desc: 'Infraestructuras web de alto rendimiento, blindaje perimetral y sistemas avanzados de captación para clínicas y gastronomía de alto nivel.',
      description: 'Infraestructuras web de alto rendimiento, blindaje perimetral y sistemas avanzados de captación para clínicas y gastronomía de alto nivel.',
      columns: {
        services: 'SERVICIOS',
        security: 'SEGURIDAD & OSINT',
        company: 'DEXVOI',
        legal: 'LEGAL & COMPLIANCE'
      },
      servicesCol: 'SERVICIOS CLAVE',
      sectorsCol: 'SECTORES ESPECIALIZADOS',
      sectorClinics: 'Clínicas Médicas & Odontología',
      sectorAesthetic: 'Medicina Estética & Dermatología',
      sectorRestaurants: 'Restaurantes de Autor & Alta Cocina',
      sectorHospitality: 'Hostelería & Experiencias de Élite',
      contactArchitect: 'Hablar con Arquitecto Digital',
      badgeTitle: 'GARANTÍA DE BLINDAJE',
      badgeSubtitle: 'Core Web Vitals 95+ & WAF A+',
      badgeText: 'Arquitecturas verificadas contra intrusiones y diseñadas para máxima conversión de pacientes y comensales.',
      rights: 'Todos los derechos reservados.',
      architectureDisclaimer: 'Diseñado bajo estándares de ingeniería digital de alta disponibilidad y cifrado perimetral.',
      privacy: 'Política de Privacidad',
      terms: 'Términos y Condiciones',
      cookies: 'Política de Cookies',
      legalNotice: 'Aviso Legal',
      legal: 'Aviso Legal',
      ethicalAudit: 'Auditoría Ética OSINT'
    },
    modals: {
      close: 'Cerrar',
      freeAuditTitle: 'Solicitar Auditoría Forense Gratuita de 5 Puntos',
      freeAuditSubtitle: 'Nuestros ingenieros analizarán tu web y te entregarán un diagnóstico claro sin coste ni compromiso.',
      pdfModalTitle: 'Informe Oficial en PDF Dexvoi',
      pdfModalDesc: 'Descarga instantánea respaldada por pago seguro con Stripe.',
      osintModalTitle: 'Adquisición de Informe OSINT Forense (29€)',
      osintModalDesc: 'Análisis perimetral exhaustivo con scripts de remediación para Apache y Nginx.',
      consentText: 'Utilizamos cookies técnicas y analíticas de rendimiento para garantizar la seguridad perimetral y la mejor experiencia de navegación conforme al RGPD.',
      consentAccept: 'Aceptar Todas',
      consentConfigure: 'Configurar',
      legalTabPrivacy: 'Privacidad (RGPD)',
      legalTabTerms: 'Términos y Condiciones',
      legalTabCookies: 'Cookies',
      legalTabLegal: 'Aviso Legal'
    },
    mobileNav: {
      home: 'Inicio',
      services: 'Servicios',
      security: 'Seguridad',
      pricing: 'Precios',
      contact: 'Contacto'
    },
    langSelector: {
      current: 'Idioma',
      switchLang: 'Cambiar idioma',
      spanish: 'Español',
      french: 'Français',
      english: 'English',
      autoDetected: 'Detectado automáticamente'
    }
  },

  fr: {
    nav: {
      brandTagline: 'Architectural Defense & Growth',
      diagnosis: 'Diagnostic',
      services: 'Services',
      booking: 'Réservations',
      aiAgents: 'Agents IA',
      osint: 'OSINT',
      osintBadge: '29€',
      pricing: 'Tarifs & Plans',
      pricingBadge: '19€ / 49€ / 99€',
      contact: 'Contact',
      freeAudit: 'Audit Gratuit',
      nodesOnline: 'NODES EN LIGNE',
      mobileTitle: 'SYSTÈMES OPÉRATIONNELS',
      mobileSubtitle: 'v3.4.8 SECURE'
    },
    hero: {
      badge: 'INGÉNIERIE & DÉFENSE DIGITALE D’ÉLITE',
      titleLine1: 'Architecture Web Robuste,',
      titleLine2: 'Visibilité Dominante &',
      titleHighlight: 'Systèmes de Conversion.',
      subtitle: 'Nous concevons des infrastructures web ultra-rapides, blindons cliniques et restaurants contre les failles de sécurité et automatisons vos réservations avec l’IA et le SEO local.',
      ctaAudit: 'Audit Stratégique de 5 Points',
      ctaScanner: 'Scanner mon Site Maintenant',
      statSpeed: '< 1.2s',
      statSpeedDesc: 'Vitesse de chargement Core Web Vitals',
      statDefense: '100%',
      statDefenseDesc: 'Blindage périmétrique et en-têtes HTTPS',
      statConversion: '+180%',
      statConversionDesc: 'Hausse moyenne des réservations directes',
      secureNotice: 'Protocole de chiffrement TLS 1.3 actif et sécurisé'
    },
    problem: {
      badge: 'VULNÉRABILITÉS CRITIQUES',
      title: 'Les 3 Fuites Digitales qui',
      titleHighlight: 'Détruisent votre Chiffre d’Affaires',
      subtitle: '92% des sites web de cliniques et restaurants souffrent de failles invisibles qui font fuir les clients et exposent des données sensibles.',
      leak1Title: 'Lenteur de Chargement Excessive',
      leak1Desc: 'Plus de 3 secondes sur mobile entraîne l’abandon immédiat de 53% de vos futurs patients ou convives avant même de découvrir votre offre.',
      leak1Impact: 'Taux de rebond élevé et lourde pénalité algorithmique Google.',
      leak2Title: 'Failles et Vulnérabilités de Sécurité',
      leak2Desc: 'Absence d’en-têtes HSTS/CSP et absence de chiffrement rigoureux exposant l’entreprise aux sanctions RGPD et aux injections malveillantes.',
      leak2Impact: 'Risque juridique majeur, amendes administratives et atteinte durable à la réputation.',
      leak3Title: 'Invisibilité Totale sur Google Maps',
      leak3Desc: 'Faute de référencement local géociblé, vos concurrents directs captent chaque jour les réservations qui vous reviennent de droit.',
      leak3Impact: 'Perte de dizaines de patients et clients qualifiés chaque semaine.',
      ctaAudit: 'Diagnostiquer mon Site Gratuitement'
    },
    services: {
      badge: 'PILIERS STRATÉGIQUES',
      title: 'Nos 3 Piliers',
      titleHighlight: 'd’Ingénierie Digitale',
      subtitle: 'Une approche intégrée conjuguant vitesse fulgurante, suprématie sur le marché local et cyberdéfense impénétrable.',
      filterAll: 'Voir Tous les Piliers',
      pillar1Title: 'Architecture Web & Systèmes',
      pillar1Tagline: 'STRUCTURES DIGITALES HAUTE PERFORMANCE',
      pillar1Desc: 'Des architectures robustes à chargement instantané conçues pour garantir une expérience utilisateur fluide et irréprochable.',
      pillar1Badge: 'VITESSE & CONVERSION',
      pillar1Benefit1: 'Plateformes sur mesure avec prise de rendez-vous et réservation en ligne 24/7.',
      pillar1Benefit2: 'Optimisation de niveau militaire (chargement < 1.5s) pour démultiplier vos taux de conversion.',
      pillar1Benefit3: 'Expérience mobile d’une fluidité absolue pour patients et convives exigeants.',
      pillar1Spec1Label: 'Temps de Chargement',
      pillar1Spec1Val: '< 1.2 Seconde',
      pillar1Spec2Label: 'Disponibilité',
      pillar1Spec2Val: '99.99% Uptime',
      pillar1Spec3Label: 'Automatisation',
      pillar1Spec3Val: 'Intégration WhatsApp & Email',
      pillar1Audience: 'Cliniques médicales, cabinets esthétiques et restaurants haut de gamme nécessitant un agenda automatisé.',

      pillar2Title: 'Positionnement Avancé (SEO Local & Ads)',
      pillar2Tagline: 'DOMINATION DU TRAFIC GÉO-LOCALISÉ',
      pillar2Desc: 'Stratégies de visibilité dominante pour placer votre établissement devant les prospects prêts à réserver immédiatement.',
      pillar2Badge: 'GOOGLE MAPS #1 & ADS',
      pillar2Benefit1: 'Suprématie sur Google Maps et requêtes géolocalisées (« autour de moi ») dans votre ville.',
      pillar2Benefit2: 'Campagnes publicitaires ultra-ciblées avec retour sur investissement tangible dès le premier mois.',
      pillar2Benefit3: 'Audit concurrentiel et stratégie d’acquisition automatisée d’avis 5 étoiles.',
      pillar2Spec1Label: 'Visibilité Locale',
      pillar2Spec1Val: 'Top 3 Google Maps',
      pillar2Spec2Label: 'Coût par Acquisition',
      pillar2Spec2Val: 'Optimisé par IA',
      pillar2Spec3Label: 'Avis Clients',
      pillar2Spec3Val: 'Système post-visite automatisé',
      pillar2Audience: 'Établissements physiques souhaitant capter l’ensemble des recherches locales de leur agglomération.',

      pillar3Title: 'Ethical Hacking & Blindage Digital',
      pillar3Tagline: 'DÉFENSE PÉRIMÉTRIQUE & AUDIT OFFENSIF',
      pillar3Desc: 'Protection périmétrique et audits continus pour vous garantir une sérénité juridique, financière et réputationnelle totale.',
      pillar3Badge: 'SÉCURITÉ & CONFORMITÉ RGPD',
      pillar3Benefit1: 'Audit approfondi et hacking éthique pour colmater les failles avant qu’elles ne soient exploitées.',
      pillar3Benefit2: 'Conformité stricte RGPD, chiffrement SSL avancé et boucliers de protection applicative.',
      pillar3Benefit3: 'Surveillance proactive contre les pannes de serveur, injections SQL et fuites de données confidentielles.',
      pillar3Spec1Label: 'Niveau de Blindage',
      pillar3Spec1Val: 'Grade A+ SSL Labs',
      pillar3Spec2Label: 'Conformité Légale',
      pillar3Spec2Val: '100% RGPD / ePrivacy',
      pillar3Spec3Label: 'Fréquence d’Audit',
      pillar3Spec3Val: 'Surveillance Continue 24/7',
      pillar3Audience: 'Structures manipulant des dossiers médicaux, des données bancaires ou des fiches patients confidentielles.',

      ctaPillar: 'Demander un Audit pour ce Pilier'
    },
    booking: {
      badge: 'CONVERSION 24/7',
      title: 'Systèmes Avancés de',
      titleHighlight: 'Gestion des Réservations',
      subtitle: 'Ne perdez plus aucun client en raison d’un standard saturé ou d’un formulaire complexe. Connectez votre vitrine directement aux agendas de vos praticiens.',
      feature1Title: 'Synchronisation en Temps Réel',
      feature1Desc: 'Liaison bidirectionnelle avec Google Calendar, Outlook, Doctolib et logiciels métiers spécialisés.',
      feature2Title: 'Rappels Automatisés via WhatsApp',
      feature2Desc: 'Réduisez le taux d’absence injustifiée (no-show) jusqu’à 85% grâce à des notifications automatiques WhatsApp et SMS.',
      feature3Title: 'Acomptes & Prépaiements Sécurisés',
      feature3Desc: 'Encaissement préalable transparent via Stripe pour sécuriser les créneaux critiques et les tables prisées.',
      feature4Title: 'Optimisation des Créneaux & Tables',
      feature4Desc: 'Algorithmes d’allocation intelligente pour maximiser le taux d’occupation sans surcharger vos équipes.',
      beforeLabel: 'Avant Dexvoi',
      beforeText: 'Appels manqués en heure de pointe, cahiers papier, 25% de no-shows et clients frustrés par l’attente.',
      afterLabel: 'Avec Dexvoi',
      afterText: 'Prise de rendez-vous fluide 24h/24, rappels WhatsApp, 98% de présence confirmée et pilotage depuis mobile.',
      cta: 'Déployer ce Système sur mon Établissement'
    },
    aiAgents: {
      badge: 'INTELLIGENCE ARTIFICIELLE APPLIQUÉE',
      title: 'Agents Virtuels Autonomes',
      titleHighlight: 'Dédiés à votre Métier',
      subtitle: 'Oubliez les chatbots rigides aux réponses préenregistrées. Nos agents IA spécialisés résolvent les interrogations médicales ou gastronomiques avec précision.',
      feature1Title: 'Support Trilingue Instantané 24/7',
      feature1Desc: 'Répond instantanément sur vos soins, cartes, allergènes et tarifs en français, anglais et espagnol.',
      feature2Title: 'Triage Clinique & Qualification',
      feature2Desc: 'Qualifie la demande du patient selon l’urgence et l’oriente automatiquement vers le bon spécialiste.',
      feature3Title: 'Prise de Réservation Complète',
      feature3Desc: 'Guide le client de A à Z jusqu’à la confirmation de son créneau sans aucune intervention de votre secrétariat.',
      statLabel: 'Temps de réponse',
      statValue: '< 3 Secondes',
      statDesc: 'Réponse instantanée 24 heures sur 24, 365 jours par an.',
      cta: 'Tester un Agent IA sur mon Site'
    },
    methodology: {
      badge: 'L’ARCHITECTE DIGITAL',
      title: 'Notre Méthodologie',
      titleHighlight: 'd’Ingénierie en 4 Étapes',
      subtitle: 'Un protocole rigoureux, prévisible et entièrement dédié à vos indicateurs de rentabilité et de croissance.',
      step1Num: '01',
      step1Title: 'Audit Forensique & Diagnostic',
      step1Desc: 'Nous scannons plus de 80 points techniques : temps de chargement, en-têtes HTTP, conformité SSL, indexation Google Maps et vulnérabilités de surface.',
      step2Num: '02',
      step2Title: 'Schéma Directeur d’Architecture',
      step2Desc: 'Conception sur mesure : refonte pour vitesse fulgurante, intégration d’un module de réservation ou blindage périmétrique.',
      step3Num: '03',
      step3Title: 'Exécution & Blindage de Niveau Militaire',
      step3Desc: 'Développement minutieux, optimisation des serveurs, durcissement des en-têtes de sécurité et configuration des tunnels de conversion.',
      step4Num: '04',
      step4Title: 'Supervision & Croissance Continue',
      step4Desc: 'Suivi proactif des performances, maintien d’un uptime de 99.99% et expansion constante de votre autorité locale.',
      cta: 'Lancer l’Étape 1 dès Aujourd’hui'
    },
    testimonials: {
      badge: 'RÉSULTATS PROUVÉS',
      title: 'Études de Cas & Retours',
      titleHighlight: 'de Cliniques & Restaurants',
      subtitle: 'Découvrez comment nous avons transformé la visibilité et la rentabilité d’établissements devenus leaders de leur agglomération.'
    },
    scanner: {
      badge: 'DIAGNOSTIC EN TEMPS RÉEL',
      title: 'Scanner Express de',
      titleHighlight: 'Santé Digitale',
      subtitle: 'Saisissez l’adresse web de votre établissement et obtenez un bilan instantané de vitesse, sécurité et visibilité locale en 10 secondes.',
      inputPlaceholder: 'exemple : www.maclinique.fr ou monrestaurant.com',
      btnScan: 'Scanner Gratuitement',
      btnScanning: 'Analyse des Nœuds en cours...',
      simulatedDisclaimer: 'Audit technique préliminaire simulé en temps réel via nos algorithmes heuristiques.',
      scoreOverall: 'Score Global',
      scoreSpeed: 'Vitesse',
      scoreSecurity: 'Sécurité',
      scoreSeo: 'SEO Local',
      ctaApplyAudit: 'Demander un Plan d’Action Technique'
    },
    osint: {
      badge: 'OUTIL OSINT EN DIRECT',
      title: 'Scanner Passif de Sécurité &',
      titleHighlight: 'En-têtes HTTP',
      subtitle: 'Auditez en direct la robustesse périmétrique de n’importe quel domaine : HSTS, CSP, X-Frame-Options, certificats SSL et protocoles anti-spoofing.',
      inputPlaceholder: 'votredomaine.fr',
      btnAnalyze: 'Lancer l’Audit OSINT',
      analyzing: 'Scan des En-têtes...',
      reportPrice: '29€ Paiement Unique',
      btnGetReport: 'Obtenir le Rapport OSINT Complet (29€)',
      scoreLabel: 'Score Périmétrique',
      gradeLabel: 'Note de Sécurité',
      passedHeaders: 'En-têtes Conformes',
      warningHeaders: 'Avertissements',
      failedHeaders: 'En-têtes Critiques Manquants',
      detectedTech: 'Technologies Identifiées',
      spoofingProtection: 'Protection Anti-Usurpation (SPF/DMARC)',
      nginxFix: 'Script de Remédiation Nginx',
      apacheFix: 'Script de Remédiation Apache'
    },
    pricing: {
      badge: 'GRILLE TARIFAIRE TRANSPARENTE',
      title: 'Rapports Officiels',
      titleHighlight: 'd’Audit Forensique',
      subtitle: 'Aucun abonnement forcé, aucune surprise. Des livrables exécutifs détaillés et des séances de travail stratégiques avec nos Architectes Digitaux.',
      popularBadge: 'RECOMMANDÉ',
      guaranteeTitle: 'Garantie d’Excellence Dexvoi',
      guaranteeDesc: 'Tous les paiements sont orchestrés via la passerelle officielle sécurisée Stripe avec chiffrement bancaire 256 bits.',
      tierBasicTitle: 'Rapport Basique',
      tierBasicSubtitle: 'Diagnostic synthétique de santé web',
      tierBasicPrice: '19€',
      tierBasicPages: '5 Pages en PDF',
      tierBasicBtn: 'Commander le Rapport Basique (19€)',
      tierCompleteTitle: 'Rapport Complet',
      tierCompleteSubtitle: 'Audit forensique 360° ultra-détaillé',
      tierCompletePrice: '49€',
      tierCompletePages: '20+ Pages en PDF',
      tierCompleteBtn: 'Commander le Rapport Complet (49€)',
      tierPremiumTitle: 'Audit Premium + Session 1-à-1',
      tierPremiumSubtitle: 'Rapport complet avec séance de consultation technique privée',
      tierPremiumPrice: '99€',
      tierPremiumPages: '20+ Pages + 45 min de Consultation',
      tierPremiumBtn: 'Commander l’Audit Premium (99€)',
      freeAuditPrompt: 'Vous préférez débuter par un bilan préliminaire sans engagement ?',
      freeAuditBtn: 'Demander l’Audit Gratuit de 5 Points',
      vatNotice: 'TVA applicable ajustée automatiquement selon votre pays lors du paiement sécurisé Stripe.'
    },
    contact: {
      badge: 'ÉCHANGE DIRECT',
      title: 'Consulter un',
      titleHighlight: 'Architecte Digital',
      subtitle: 'Aucun intermédiaire commercial. Exposez directement vos enjeux à nos ingénieurs experts en conversion et sécurité web.',
      nameLabel: 'Nom & Prénom',
      namePlaceholder: 'Dr. Martin Dupont ou Thomas Bernard',
      emailLabel: 'Adresse Email Professionnelle',
      emailPlaceholder: 'contact@maclinique.fr',
      phoneLabel: 'Téléphone / WhatsApp',
      phonePlaceholder: '+33 6 00 00 00 00',
      businessTypeLabel: 'Secteur d’Activité',
      urlLabel: 'Site Internet (Optionnel)',
      urlPlaceholder: 'www.votre-site.com',
      concernLabel: 'Principal Défi ou Préoccupation',
      concernPlaceholder: 'Ex : Manque de réservations en ligne, lenteur mobile ou inquiétudes liées à la cybersécurité...',
      submitBtn: 'Transmettre la Demande à l’Architecte',
      submitting: 'Transmission des Données...',
      successTitle: 'Demande Reçue avec Succès !',
      successDesc: 'Un Architecte Digital examine vos données et vous répond sous un délai maximum de 2 heures ouvrées.',
      directContactTitle: 'Ligne Directe & WhatsApp',
      directContactDesc: 'Pour une prise en charge immédiate, notre canal WhatsApp professionnel est disponible pour les urgences techniques et diagnostics express.',
      whatsappLabel: 'Échanger via WhatsApp'
    },
    footer: {
      desc: 'Infrastructures web à très haute vitesse, blindage périmétrique et systèmes automatisés de réservation pour cliniques et restauration d’exception.',
      description: 'Infrastructures web à très haute vitesse, blindage périmétrique et systèmes automatisés de réservation pour cliniques et restauration d’exception.',
      columns: {
        services: 'SERVICES',
        security: 'SÉCURITÉ & OSINT',
        company: 'DEXVOI',
        legal: 'LÉGAL & CONFORMITÉ'
      },
      servicesCol: 'SERVICES CLÉS',
      sectorsCol: 'SECTEURS SPÉCIALISÉS',
      sectorClinics: 'Cliniques Médicales & Dentaires',
      sectorAesthetic: 'Médecine Esthétique & Dermatologie',
      sectorRestaurants: 'Restaurants Gastronomiques & Haute Cuisine',
      sectorHospitality: 'Hôtellerie & Expériences d’Élite',
      contactArchitect: 'Consulter un Architecte Digital',
      badgeTitle: 'GARANTIE DE BLINDAGE',
      badgeSubtitle: 'Core Web Vitals 95+ & WAF A+',
      badgeText: 'Architectures protégées contre les cyberattaques et optimisées pour la prise de rendez-vous qualifiés.',
      rights: 'Tous droits réservés.',
      architectureDisclaimer: 'Conçu selon les standards d’ingénierie logicielle de haute disponibilité et de chiffrement de bout en bout.',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions Générales',
      cookies: 'Politique des Cookies',
      legalNotice: 'Mentions Légales',
      legal: 'Mentions Légales',
      ethicalAudit: 'Audit Éthique OSINT'
    },
    modals: {
      close: 'Fermer',
      freeAuditTitle: 'Demander votre Audit Forensique Gratuit de 5 Points',
      freeAuditSubtitle: 'Nos ingénieurs analysent votre site et vous transmettent un rapport clair sans frais ni engagement.',
      pdfModalTitle: 'Rapport Officiel Dexvoi au format PDF',
      pdfModalDesc: 'Téléchargement immédiat sécurisé par Stripe.',
      osintModalTitle: 'Commande du Rapport OSINT Forensique (29€)',
      osintModalDesc: 'Analyse exhaustive avec scripts correctifs prêts à l’emploi pour Nginx et Apache.',
      consentText: 'Nous utilisons des cookies techniques et de performance afin de garantir le blindage de la plateforme et une navigation conforme au RGPD.',
      consentAccept: 'Accepter Tout',
      consentConfigure: 'Personnaliser',
      legalTabPrivacy: 'Confidentialité (RGPD)',
      legalTabTerms: 'Conditions Générales',
      legalTabCookies: 'Cookies',
      legalTabLegal: 'Mentions Légales'
    },
    mobileNav: {
      home: 'Accueil',
      services: 'Services',
      security: 'Sécurité',
      pricing: 'Tarifs',
      contact: 'Contact'
    },
    langSelector: {
      current: 'Langue',
      switchLang: 'Changer de langue',
      spanish: 'Español',
      french: 'Français',
      english: 'English',
      autoDetected: 'Détecté automatiquement'
    }
  },

  en: {
    nav: {
      brandTagline: 'Architectural Defense & Growth',
      diagnosis: 'Diagnosis',
      services: 'Services',
      booking: 'Bookings',
      aiAgents: 'AI Agents',
      osint: 'OSINT',
      osintBadge: '29€',
      pricing: 'Pricing Plans',
      pricingBadge: '19€ / 49€ / 99€',
      contact: 'Contact',
      freeAudit: 'Free Audit',
      nodesOnline: 'NODES ONLINE',
      mobileTitle: 'SYSTEM STATUS',
      mobileSubtitle: 'v3.4.8 SECURE'
    },
    hero: {
      badge: 'ELITE DIGITAL DEFENSE & ENGINEERING',
      titleLine1: 'Resilient Web Architecture,',
      titleLine2: 'Market Dominance &',
      titleHighlight: 'Conversion Systems.',
      subtitle: 'We engineer lightning-fast web systems, shield clinics and restaurants from vulnerabilities, and automate high-value reservations with AI and local SEO.',
      ctaAudit: '5-Point Forensic Audit',
      ctaScanner: 'Scan My Website Now',
      statSpeed: '< 1.2s',
      statSpeedDesc: 'Core Web Vitals load latency',
      statDefense: '100%',
      statDefenseDesc: 'Perimeter hardening & HTTPS headers',
      statConversion: '+180%',
      statConversionDesc: 'Average lift in direct online bookings',
      secureNotice: 'Active and verified TLS 1.3 encryption protocol'
    },
    problem: {
      badge: 'CRITICAL VULNERABILITIES',
      title: 'The 3 Digital Leaks',
      titleHighlight: 'Draining Your Revenue',
      subtitle: '92% of clinic and restaurant websites suffer from silent structural flaws that scare off clients and leave confidential records vulnerable.',
      leak1Title: 'Excessive Mobile Load Latency',
      leak1Desc: 'Taking longer than 3 seconds on mobile causes 53% of prospects to bounce before ever seeing your menu or doctors.',
      leak1Impact: 'Severe bounce rate spike and punitive Google ranking penalties.',
      leak2Title: 'Security Exploits and Compliance Breaches',
      leak2Desc: 'Missing HSTS and CSP headers alongside unencrypted payloads expose your business to steep GDPR fines and malware injections.',
      leak2Impact: 'Major legal liability, financial penalties, and catastrophic brand erosion.',
      leak3Title: 'Invisibility on Google Maps',
      leak3Desc: 'Without geo-targeted local optimization, nearby rivals capture the appointments and tables that should be yours.',
      leak3Impact: 'Losing dozens of qualified high-ticket clients every single week.',
      ctaAudit: 'Audit My Website at Zero Cost'
    },
    services: {
      badge: 'STRATEGIC PILLARS',
      title: 'Our 3 Pillars of',
      titleHighlight: 'Digital Engineering',
      subtitle: 'A holistic framework merging breakneck speed, local market supremacy, and military-grade cyber defense.',
      filterAll: 'View All Pillars',
      pillar1Title: 'Web Architecture & Systems',
      pillar1Tagline: 'HIGH-PERFORMANCE DIGITAL FOUNDATIONS',
      pillar1Desc: 'Hardened, instantaneous web systems engineered to provide flawless user journeys and immediate customer trust.',
      pillar1Badge: 'SPEED & CONVERSION',
      pillar1Benefit1: 'Bespoke booking engines and automated 24/7 calendar coordination.',
      pillar1Benefit2: 'Military-grade performance tuning (load times under 1.5s) to maximize booking conversions.',
      pillar1Benefit3: 'Silky smooth mobile responsiveness built for discerning patients and diners.',
      pillar1Spec1Label: 'Load Latency',
      pillar1Spec1Val: '< 1.2 Seconds',
      pillar1Spec2Label: 'High Availability',
      pillar1Spec2Val: '99.99% Uptime',
      pillar1Spec3Label: 'Automation',
      pillar1Spec3Val: 'WhatsApp & Email Integration',
      pillar1Audience: 'Medical clinics, cosmetic practices, and premier dining spots requiring automated reservations.',

      pillar2Title: 'Advanced Positioning (Local SEO & Ads)',
      pillar2Tagline: 'DOMINATION OF GEO-TARGETED TRAFFIC',
      pillar2Desc: 'Dominant visibility strategies positioning your practice right in front of high-intent local clients.',
      pillar2Badge: 'GOOGLE MAPS #1 & ADS',
      pillar2Benefit1: 'Command Google Maps and local geo-queries ("near me") in your metropolitan area.',
      pillar2Benefit2: 'Hyper-targeted ad campaigns delivering transparent, measurable ROI from month one.',
      pillar2Benefit3: 'Competitor footprint analysis and automated 5-star review acquisition pipelines.',
      pillar2Spec1Label: 'Local Authority',
      pillar2Spec1Val: 'Top 3 Google Maps',
      pillar2Spec2Label: 'Acquisition Cost',
      pillar2Spec2Val: 'AI-Optimized Efficiency',
      pillar2Spec3Label: 'Review Engine',
      pillar2Spec3Val: 'Automated Post-Visit Flow',
      pillar2Audience: 'Physical locations looking to dominate high-intent searches in their immediate area.',

      pillar3Title: 'Ethical Hacking & Digital Hardening',
      pillar3Tagline: 'PERIMETER DEFENSE & OFFENSIVE AUDITING',
      pillar3Desc: 'Comprehensive perimeter shielding and continuous security monitoring for absolute regulatory and financial peace of mind.',
      pillar3Badge: 'SECURITY & GDPR COMPLIANCE',
      pillar3Benefit1: 'Deep forensic scanning and ethical penetration testing to remediate vulnerabilities before bad actors strike.',
      pillar3Benefit2: 'Strict GDPR data privacy compliance, advanced TLS ciphers, and Web Application Firewalls.',
      pillar3Benefit3: 'Continuous uptime telemetry guarding against server crashes, malicious scripts, and data leaks.',
      pillar3Spec1Label: 'Hardening Standard',
      pillar3Spec1Val: 'Grade A+ SSL Labs',
      pillar3Spec2Label: 'Regulatory Standing',
      pillar3Spec2Val: '100% GDPR / ePrivacy',
      pillar3Spec3Label: 'Audit Cadence',
      pillar3Spec3Val: '24/7 Continuous Telemetry',
      pillar3Audience: 'Organizations handling patient charts, cardholder data, or confidential client records.',

      ctaPillar: 'Request an Audit for this Pillar'
    },
    booking: {
      badge: '24/7 REVENUE ENGINE',
      title: 'Advanced Booking &',
      titleHighlight: 'Reservation Systems',
      subtitle: 'Never lose another patient or dinner reservation to a busy phone line or clunky forms. We connect your storefront directly to your providers’ schedules.',
      feature1Title: 'Real-Time Calendar Sync',
      feature1Desc: 'Two-way synchronization with Google Calendar, Outlook, EHRs, and POS restaurant management platforms.',
      feature2Title: 'Automated WhatsApp Reminders',
      feature2Desc: 'Slashing no-show rates by up to 85% with automated conversational notifications via WhatsApp and SMS.',
      feature3Title: 'Card Holds & Deposit Processing',
      feature3Desc: 'Frictionless, secure pre-authorization powered by Stripe to protect prime consultation slots and peak-hour tables.',
      feature4Title: 'Intelligent Slot & Table Allocation',
      feature4Desc: 'Smart pacing algorithms that maximize seat and chair utilization without overwhelming your clinical staff.',
      beforeLabel: 'Before Dexvoi',
      beforeText: 'Missed calls during rushes, paper diaries, 25% no-shows, and frustrated clients waiting for callbacks.',
      afterLabel: 'With Dexvoi',
      afterText: 'Instant 24/7 bookings, automated WhatsApp pings, 98% attendance confirmation, and real-time mobile management.',
      cta: 'Deploy this System on My Business'
    },
    aiAgents: {
      badge: 'APPLIED ARTIFICIAL INTELLIGENCE',
      title: 'Autonomous Virtual Agents',
      titleHighlight: 'Custom-Tuned for Your Niche',
      subtitle: 'Not generic chatbots repeating frustrating canned answers. Specialized AI models that instantly resolve clinical inquiries and culinary questions.',
      feature1Title: '24/7 Trilingual Support',
      feature1Desc: 'Seamlessly handles treatment queries, dietary requirements, and pricing in English, French, and Spanish.',
      feature2Title: 'Clinical Triage & Patient Qualification',
      feature2Desc: 'Sorts patient inquiries based on urgency and automatically routes them to the appropriate specialist.',
      feature3Title: 'End-to-End Booking Completion',
      feature3Desc: 'Guides users through every step to a confirmed calendar booking without burdening your front desk.',
      statLabel: 'Response Time',
      statValue: '< 3 Seconds',
      statDesc: 'Instantaneous response 24 hours a day, 365 days a year.',
      cta: 'Test an AI Agent on My Website'
    },
    methodology: {
      badge: 'THE DIGITAL ARCHITECT',
      title: 'Our 4-Phase',
      titleHighlight: 'Engineering Methodology',
      subtitle: 'A disciplined, predictable framework engineered strictly around speed, security, and measurable business growth.',
      step1Num: '01',
      step1Title: 'Forensic Audit & Baseline Diagnosis',
      step1Desc: 'We scan over 80 technical indicators: load latency, HTTP security headers, SSL cipher suites, Google Maps presence, and surface vulnerabilities.',
      step2Num: '02',
      step2Title: 'Architecture Blueprint',
      step2Desc: 'We draft the exact technical specification: high-speed static architecture, dedicated reservation systems, or perimeter security shields.',
      step3Num: '03',
      step3Title: 'Execution & Military-Grade Hardening',
      step3Desc: 'Clean modular code development, server performance tuning, header hardening, and conversion funnel optimization.',
      step4Num: '04',
      step4Title: 'Continuous Telemetry & Expansion',
      step4Desc: 'Real-time performance monitoring, 99.99% uptime enforcement, and systematic month-over-month local authority gains.',
      cta: 'Initiate Phase 1 Today'
    },
    testimonials: {
      badge: 'VERIFIED OUTCOMES',
      title: 'Case Studies from',
      titleHighlight: 'Clinics & Restaurants',
      subtitle: 'Explore how we rebuilt the digital infrastructure of establishments that now lead their respective markets.'
    },
    scanner: {
      badge: 'REAL-TIME DIAGNOSTIC',
      title: 'Ultra-Fast Digital',
      titleHighlight: 'Health Scanner',
      subtitle: 'Enter your business URL and receive a preliminary evaluation of your speed, security, and local SEO in under 10 seconds.',
      inputPlaceholder: 'e.g. www.myclinic.com or myrestaurant.co.uk',
      btnScan: 'Scan for Free',
      btnScanning: 'Analyzing Nodes...',
      simulatedDisclaimer: 'Technical baseline simulated in real time using client-side heuristics.',
      scoreOverall: 'Overall Score',
      scoreSpeed: 'Speed',
      scoreSecurity: 'Security',
      scoreSeo: 'Local SEO',
      ctaApplyAudit: 'Request Remediation Plan'
    },
    osint: {
      badge: 'LIVE OSINT TOOLKIT',
      title: 'Passive Security &',
      titleHighlight: 'HTTP Headers Scanner',
      subtitle: 'Analyze the perimeter defenses of any domain in real time: HSTS, CSP, X-Frame-Options, SSL certificates, and anti-spoofing mail records.',
      inputPlaceholder: 'yourdomain.com',
      btnAnalyze: 'Run OSINT Audit',
      analyzing: 'Scanning Headers...',
      reportPrice: '29€ One-Time',
      btnGetReport: 'Get Forensic OSINT Report (29€)',
      scoreLabel: 'Perimeter Score',
      gradeLabel: 'Security Grade',
      passedHeaders: 'Compliant Headers',
      warningHeaders: 'Warnings',
      failedHeaders: 'Missing Critical Headers',
      detectedTech: 'Detected Technologies',
      spoofingProtection: 'Anti-Spoofing Records (SPF/DMARC)',
      nginxFix: 'Nginx Hardening Script',
      apacheFix: 'Apache Hardening Script'
    },
    pricing: {
      badge: 'TRANSPARENT PRICING',
      title: 'Official Forensic',
      titleHighlight: 'Audit Packages',
      subtitle: 'No recurring lock-in, zero hidden fees. Actionable executive deliverables and 1-on-1 strategic consultations with our Digital Architects.',
      popularBadge: 'MOST POPULAR',
      guaranteeTitle: 'Dexvoi Quality Guarantee',
      guaranteeDesc: 'All transactions are securely handled through Stripe’s certified 256-bit bank-grade payment gateway.',
      tierBasicTitle: 'Basic Report',
      tierBasicSubtitle: 'Rapid digital health diagnosis',
      tierBasicPrice: '19€',
      tierBasicPages: '5-Page PDF Report',
      tierBasicBtn: 'Order Basic Report (19€)',
      tierCompleteTitle: 'Complete Report',
      tierCompleteSubtitle: 'Comprehensive 360° forensic audit',
      tierCompletePrice: '49€',
      tierCompletePages: '20+ Page PDF Report',
      tierCompleteBtn: 'Order Complete Report (49€)',
      tierPremiumTitle: 'Premium Audit + 1-on-1',
      tierPremiumSubtitle: 'Full forensic report with 45-min private technical consultation',
      tierPremiumPrice: '99€',
      tierPremiumPages: '20+ Pages + 45-min Consulting Call',
      tierPremiumBtn: 'Order Premium Audit (99€)',
      freeAuditPrompt: 'Prefer to start with our complimentary assessment?',
      freeAuditBtn: 'Request Free 5-Point Audit',
      vatNotice: 'Applicable taxes calculated automatically by country in Stripe’s checkout.'
    },
    contact: {
      badge: 'DIRECT INQUIRY',
      title: 'Speak With a',
      titleHighlight: 'Digital Architect',
      subtitle: 'No sales middlemen. Discuss your project directly with engineers specialized in high-performance web systems and cybersecurity.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Dr. Sarah Jenkins or James Bennett',
      emailLabel: 'Work Email Address',
      emailPlaceholder: 'contact@myclinic.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+44 7000 000000',
      businessTypeLabel: 'Industry Sector',
      urlLabel: 'Website URL (Optional)',
      urlPlaceholder: 'www.yourbusiness.com',
      concernLabel: 'Primary Challenge or Concern',
      concernPlaceholder: 'e.g. Sluggish mobile loading, low online booking conversions, or cybersecurity concerns...',
      submitBtn: 'Submit Request to Architect',
      submitting: 'Transmitting Data...',
      successTitle: 'Inquiry Received Successfully!',
      successDesc: 'A Digital Architect will examine your parameters and respond within 2 business hours.',
      directContactTitle: 'Direct Line & WhatsApp',
      directContactDesc: 'For urgent matters or immediate consultation, our verified WhatsApp business line is active for express diagnostics.',
      whatsappLabel: 'Chat via WhatsApp'
    },
    footer: {
      desc: 'High-speed web systems, perimeter hardening, and automated patient & reservation acquisition for clinics and fine dining.',
      description: 'High-speed web systems, perimeter hardening, and automated patient & reservation acquisition for clinics and fine dining.',
      columns: {
        services: 'SERVICES',
        security: 'SECURITY & OSINT',
        company: 'DEXVOI',
        legal: 'LEGAL & COMPLIANCE'
      },
      servicesCol: 'KEY SERVICES',
      sectorsCol: 'SPECIALIZED SECTORS',
      sectorClinics: 'Medical & Dental Clinics',
      sectorAesthetic: 'Aesthetic Medicine & Dermatology',
      sectorRestaurants: 'Fine Dining & Signature Restaurants',
      sectorHospitality: 'Luxury Hospitality & Elite Services',
      contactArchitect: 'Talk to a Digital Architect',
      badgeTitle: 'SHIELDING GUARANTEE',
      badgeSubtitle: 'Core Web Vitals 95+ & WAF A+',
      badgeText: 'Intrusion-hardened architectures engineered for maximal conversion of patients and discerning diners.',
      rights: 'All rights reserved.',
      architectureDisclaimer: 'Engineered following strict high-availability software practices and cryptographic perimeter protocols.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      legalNotice: 'Legal Notice',
      legal: 'Legal Notice',
      ethicalAudit: 'Ethical OSINT Audit'
    },
    modals: {
      close: 'Close',
      freeAuditTitle: 'Request Free 5-Point Forensic Audit',
      freeAuditSubtitle: 'Our engineers will inspect your digital perimeter and deliver clear findings with zero obligation.',
      pdfModalTitle: 'Official Dexvoi PDF Report',
      pdfModalDesc: 'Instant download secured by Stripe payment infrastructure.',
      osintModalTitle: 'Order Forensic OSINT Report (29€)',
      osintModalDesc: 'Exhaustive perimeter scan with ready-to-deploy configuration scripts for Nginx and Apache.',
      consentText: 'We use technical and performance cookies to maintain strict perimeter security and deliver a GDPR-compliant user experience.',
      consentAccept: 'Accept All',
      consentConfigure: 'Configure',
      legalTabPrivacy: 'Privacy (GDPR)',
      legalTabTerms: 'Terms of Service',
      legalTabCookies: 'Cookie Policy',
      legalTabLegal: 'Legal Notice'
    },
    mobileNav: {
      home: 'Home',
      services: 'Services',
      security: 'Security',
      pricing: 'Pricing',
      contact: 'Contact'
    },
    langSelector: {
      current: 'Language',
      switchLang: 'Switch language',
      spanish: 'Español',
      french: 'Français',
      english: 'English',
      autoDetected: 'Auto-detected'
    }
  }
};
