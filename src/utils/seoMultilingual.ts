import { Language } from '../i18n/translations';
import { AppRoute } from './navigation';
import { getPostSlugForLanguage } from './blogLocalization';

export interface RouteLocalization {
  route: AppRoute;
  paths: Record<Language, string>;
  titles: Record<Language, string>;
  descriptions: Record<Language, string>;
}

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'fr', 'en'];
export const DEFAULT_LANGUAGE: Language = 'es';
export const SITE_DOMAIN = 'https://dexvoi.com';

/**
 * Clean localized URL paths per language and route.
 * Each route has a unique dedicated URL per language as recommended by Google:
 * e.g., /es/servicios, /fr/services, /en/services
 */
export const LOCALIZED_ROUTES: Record<AppRoute, RouteLocalization> = {
  home: {
    route: 'home',
    paths: {
      es: '/es',
      fr: '/fr',
      en: '/en',
    },
    titles: {
      es: 'Dexvoi - Arquitectura Web, SEO y Blindaje Digital',
      fr: 'Dexvoi - Architecture Web, SEO Local & Sécurité Numérique',
      en: 'Dexvoi - Web Architecture, Local SEO & Digital Defense',
    },
    descriptions: {
      es: 'Estudio de ingeniería y arquitectura digital especializado en desarrollo web de alto rendimiento, SEO local en Google Maps y ciberseguridad para clínicas y restaurantes.',
      fr: 'Studio d’ingénierie et d’architecture digitale spécialisé en développement web haute performance, référencement Google Maps et cybersécurité pour cliniques et restaurants.',
      en: 'Digital engineering and architecture practice specializing in high-performance web systems, Google Maps local SEO, and perimeter cybersecurity for clinics and restaurants.',
    },
  },
  services: {
    route: 'services',
    paths: {
      es: '/es/servicios',
      fr: '/fr/services',
      en: '/en/services',
    },
    titles: {
      es: 'Servicios de Arquitectura Web & Ciberseguridad | DEXVOI',
      fr: 'Services d\'Architecture Web & Cybersécurité | DEXVOI',
      en: 'Web Architecture & Cybersecurity Services | DEXVOI',
    },
    descriptions: {
      es: 'Descubre nuestros servicios de arquitectura web ultrarrápida, SEO local en Google Maps, blindaje perimetral y sistemas de reservas para clínicas y restaurantes.',
      fr: 'Découvrez nos services d\'architecture web ultra-rapide, SEO Google Maps, blindage périmétrique et systèmes de réservation pour cliniques et restaurants.',
      en: 'Explore our high-performance web architecture, Google Maps local SEO, perimeter security, and commission-free booking engines.',
    },
  },
  security: {
    route: 'security',
    paths: {
      es: '/es/auditoria-seguridad',
      fr: '/fr/audit-securite',
      en: '/en/security-audit',
    },
    titles: {
      es: 'Auditoría OSINT & Protocolos Éticos de Ciberseguridad | DEXVOI',
      fr: 'Audit OSINT & Protocoles Éthiques de Cybersécurité | DEXVOI',
      en: 'OSINT Security Audit & Ethical Cyber Defense Protocols | DEXVOI',
    },
    descriptions: {
      es: 'Escaneo perimetral pasivo no invasivo, verificación de cabeceras HTTP, blindaje DNS y estándares OWASP en tiempo real.',
      fr: 'Scan passif non-intrusif, vérification des en-têtes HTTP, sécurisation DNS et conformité OWASP en temps réel.',
      en: 'Non-invasive passive perimeter scanning, HTTP security headers verification, DNS armor, and real-time OWASP compliance.',
    },
  },
  pricing: {
    route: 'pricing',
    paths: {
      es: '/es/precios',
      fr: '/fr/tarifs',
      en: '/en/pricing',
    },
    titles: {
      es: 'Planes y Precios de Auditoría Técnica | DEXVOI',
      fr: 'Tarifs et Forfaits d\'Audit Technique | DEXVOI',
      en: 'Plans & Technical Audit Pricing | DEXVOI',
    },
    descriptions: {
      es: 'Tarifas transparentes de pago único para informes forenses y blindaje perimetral: Starter 19€, Comprehensive 49€, Premium 99€.',
      fr: 'Tarifs transparents à paiement unique pour rapports forensiques et blindage : Starter 19€, Comprehensive 49€, Premium 99€.',
      en: 'Transparent one-off pricing for forensic reports and perimeter security: Starter 19€, Comprehensive 49€, Premium 99€.',
    },
  },
  contact: {
    route: 'contact',
    paths: {
      es: '/es/contacto',
      fr: '/fr/contact',
      en: '/en/contact',
    },
    titles: {
      es: 'Contacto Directo & Diagnóstico Técnico | DEXVOI',
      fr: 'Contact Direct & Diagnostic Technique | DEXVOI',
      en: 'Direct Contact & Technical Diagnosis | DEXVOI',
    },
    descriptions: {
      es: 'Contacta con el equipo de arquitectos digitales de DEXVOI para solicitar tu diagnóstico perimetral prioritario.',
      fr: 'Contactez l\'équipe d\'architectes digitaux DEXVOI pour demander votre diagnostic périmétrique prioritaire.',
      en: 'Contact the DEXVOI digital architecture team to request your priority perimeter diagnosis.',
    },
  },
  blog: {
    route: 'blog',
    paths: {
      es: '/es/blog',
      fr: '/fr/blog',
      en: '/en/blog',
    },
    titles: {
      es: 'Blog & Recursos Técnicos de Ciberseguridad y SEO | DEXVOI',
      fr: 'Blog & Ressources Techniques Cybersécurité et SEO | DEXVOI',
      en: 'Blog & Technical Cybersecurity and SEO Resources | DEXVOI',
    },
    descriptions: {
      es: 'Artículos de vanguardia sobre arquitectura web Jamstack, auditorías OSINT, blindaje perimetral y SEO local en Google Maps.',
      fr: 'Articles de référence sur l\'architecture web Jamstack, audits OSINT, cybersécurité et référencement Google Maps.',
      en: 'Cutting-edge articles on Jamstack web architecture, OSINT audits, perimeter defense, and local Google Maps SEO.',
    },
  },
  'blog-post': {
    route: 'blog-post',
    paths: {
      es: '/es/blog',
      fr: '/fr/blog',
      en: '/en/blog',
    },
    titles: {
      es: 'Artículo de Inteligencia Técnica | DEXVOI',
      fr: 'Article d\'Intelligence Technique | DEXVOI',
      en: 'Technical Intelligence Article | DEXVOI',
    },
    descriptions: {
      es: 'Guía técnica especializada y análisis de ciberseguridad por el equipo de ingeniería de Dexvoi.',
      fr: 'Guide technique spécialisé et analyses de sécurité par l\'équipe d\'ingénierie Dexvoi.',
      en: 'Specialized technical guide and cybersecurity analysis by the Dexvoi engineering team.',
    },
  },
  privacy: {
    route: 'privacy',
    paths: {
      es: '/es/privacidad',
      fr: '/fr/confidentialite',
      en: '/en/privacy',
    },
    titles: {
      es: 'Política de Privacidad y Cumplimiento RGPD | DEXVOI',
      fr: 'Politique de Confidentialité & RGPD | DEXVOI',
      en: 'Privacy Policy & GDPR Compliance | DEXVOI',
    },
    descriptions: {
      es: 'Política de privacidad de DEXVOI. Tratamiento de datos confidenciales con estricto apego al RGPD (UE 2016/679).',
      fr: 'Politique de confidentialité de DEXVOI. Traitement des données conforme aux exigences du RGPD (UE 2016/679).',
      en: 'DEXVOI Privacy Policy. Strict confidential data handling compliant with EU GDPR (2016/679).',
    },
  },
  terms: {
    route: 'terms',
    paths: {
      es: '/es/condiciones',
      fr: '/fr/conditions',
      en: '/en/terms',
    },
    titles: {
      es: 'Términos y Condiciones de Servicio | DEXVOI',
      fr: 'Conditions Générales de Service | DEXVOI',
      en: 'Terms & Conditions of Service | DEXVOI',
    },
    descriptions: {
      es: 'Términos y condiciones de contratación y uso de los servicios de ingeniería digital y blindaje de DEXVOI.',
      fr: 'Conditions générales de prestation des services d\'ingénierie digitale et de sécurité de DEXVOI.',
      en: 'Terms and conditions for contracting digital engineering and cyber defense services from DEXVOI.',
    },
  },
  cookies: {
    route: 'cookies',
    paths: {
      es: '/es/cookies',
      fr: '/fr/cookies',
      en: '/en/cookies',
    },
    titles: {
      es: 'Política de Cookies y Almacenamiento Local | DEXVOI',
      fr: 'Politique de Cookies & Stockage Local | DEXVOI',
      en: 'Cookie Policy & Local Storage | DEXVOI',
    },
    descriptions: {
      es: 'Información transparente sobre cookies técnicas y analíticas utilizadas en DEXVOI.',
      fr: 'Informations transparentes sur les cookies techniques et analytiques utilisés par DEXVOI.',
      en: 'Transparent information about technical and analytical cookies utilized on DEXVOI.',
    },
  },
  legal: {
    route: 'legal',
    paths: {
      es: '/es/aviso-legal',
      fr: '/fr/mentions-legales',
      en: '/en/legal-notice',
    },
    titles: {
      es: 'Aviso Legal e Información Societaria | DEXVOI',
      fr: 'Mentions Légales & Informations Juridiques | DEXVOI',
      en: 'Legal Notice & Company Information | DEXVOI',
    },
    descriptions: {
      es: 'Aviso legal, datos identificativos y propiedad intelectual de DEXVOI.',
      fr: 'Mentions légales, identification de l\'éditeur et propriété intellectuelle de DEXVOI.',
      en: 'Legal notice, company identification, and intellectual property of DEXVOI.',
    },
  },
  '404': {
    route: '404',
    paths: {
      es: '/es/404',
      fr: '/fr/404',
      en: '/en/404',
    },
    titles: {
      es: '404 - Perímetro No Localizado | DEXVOI',
      fr: '404 - Périmètre Non Localisé | DEXVOI',
      en: '404 - Perimeter Not Found | DEXVOI',
    },
    descriptions: {
      es: 'El recurso solicitado no existe o ha sido reubicado.',
      fr: 'La ressource demandée n\'existe pas ou a été déplacée.',
      en: 'The requested resource does not exist or has been relocated.',
    },
  },
};

/**
 * Returns the localized path for a given route and language.
 * Handles blog-post slugs properly, translating slugs per language:
 * e.g. /es/blog/inteligencia-de-datos..., /fr/blog/intelligence-des-donnees..., /en/blog/data-intelligence...
 */
export function getLocalizedPath(route: AppRoute, lang: Language, blogSlug?: string): string {
  if (route === 'blog-post' && blogSlug) {
    const localizedSlug = getPostSlugForLanguage(blogSlug, lang);
    return `/${lang}/blog/${localizedSlug}`;
  }
  const config = LOCALIZED_ROUTES[route];
  if (!config) return `/${lang}`;
  return config.paths[lang] || `/${lang}`;
}

export interface HreflangTag {
  lang: string;
  url: string;
}

/**
 * Generates the full set of hreflang tags for any given route & blog post.
 * Includes es, fr, en, and x-default.
 */
export function generateHreflangTags(route: AppRoute, blogSlug?: string): HreflangTag[] {
  const origin = typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
    ? window.location.origin
    : SITE_DOMAIN;

  const tags: HreflangTag[] = [
    { lang: 'es', url: `${origin}${getLocalizedPath(route, 'es', blogSlug)}` },
    { lang: 'fr', url: `${origin}${getLocalizedPath(route, 'fr', blogSlug)}` },
    { lang: 'en', url: `${origin}${getLocalizedPath(route, 'en', blogSlug)}` },
    // Google recommendation: x-default points to default fallback (or language selector / root)
    { lang: 'x-default', url: `${origin}${getLocalizedPath(route, 'es', blogSlug)}` },
  ];

  return tags;
}

/**
 * Injects or updates <link rel="alternate" hreflang="..." href="..."> tags in <head>.
 */
export function updateHreflangTagsInHead(route: AppRoute, blogSlug?: string) {
  if (typeof document === 'undefined') return;

  // Remove existing hreflang link tags to avoid duplicates
  const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingLinks.forEach((el) => el.remove());

  const tags = generateHreflangTags(route, blogSlug);
  tags.forEach(({ lang, url }) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    link.setAttribute('href', url);
    document.head.appendChild(link);
  });
}
