import { useState, useEffect } from 'react';
import { Language } from '../i18n/translations';
import { 
  LOCALIZED_ROUTES, 
  getLocalizedPath, 
  updateHreflangTagsInHead, 
  SUPPORTED_LANGUAGES, 
  DEFAULT_LANGUAGE 
} from './seoMultilingual';

export type AppRoute = 
  | 'home'
  | 'services'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'legal'
  | 'security'
  | 'pricing'
  | 'contact'
  | 'blog'
  | 'blog-post'
  | '404';

export interface RouteInfo {
  route: AppRoute;
  path: string;
  title: string;
  description: string;
}

export const ROUTE_MAP: Record<AppRoute, { path: string; aliases: string[]; title: string; description: string }> = {
  home: {
    path: '/',
    aliases: ['/home', '/index.html', '/es', '/fr', '/en'],
    title: 'Dexvoi - Arquitectura Web, SEO y Blindaje Digital',
    description: 'Dexvoi - Agencia digital de élite especializada en arquitectura web, SEO local y blindaje digital / ethical hacking para clínicas y restaurantes.'
  },
  services: {
    path: '/servicios',
    aliases: ['/services', '/es/servicios', '/fr/services', '/en/services'],
    title: 'Servicios de Arquitectura Web & Ciberseguridad | DEXVOI',
    description: 'Descubre nuestros servicios de arquitectura web ultrarrápida, SEO local en Google Maps, blindaje perimetral y sistemas de reservas para clínicas y restaurantes.'
  },
  terms: {
    path: '/condiciones',
    aliases: ['/terminos', '/terms', '/terms-and-conditions', '/condiciones-de-servicio', '/es/condiciones', '/fr/conditions', '/en/terms'],
    title: 'Términos y Condiciones de Servicio | DEXVOI',
    description: 'Términos y condiciones de contratación y uso de los servicios de ingeniería digital, auditoría técnica y blindaje perimetral de DEXVOI.'
  },
  privacy: {
    path: '/privacidad',
    aliases: ['/privacy', '/politica-de-privacidad', '/privacy-policy', '/es/privacidad', '/fr/confidentialite', '/en/privacy'],
    title: 'Política de Privacidad y Cumplimiento RGPD | DEXVOI',
    description: 'Política de privacidad de DEXVOI. Tratamiento de datos confidenciales con estricto apego al RGPD (UE 2016/679) y LOPDGDD.'
  },
  cookies: {
    path: '/cookies',
    aliases: ['/politica-de-cookies', '/cookie-policy', '/es/cookies', '/fr/cookies', '/en/cookies'],
    title: 'Política de Cookies y Almacenamiento Local | DEXVOI',
    description: 'Información transparente sobre las cookies técnicas, de seguridad y analíticas utilizadas en el portal web de DEXVOI.'
  },
  legal: {
    path: '/aviso-legal',
    aliases: ['/legal', '/imprint', '/aviso-legal-lssi', '/es/aviso-legal', '/fr/mentions-legales', '/en/legal-notice'],
    title: 'Aviso Legal e Información Societaria (LSSI-CE) | DEXVOI',
    description: 'Aviso legal, datos identificativos del titular y derechos de propiedad intelectual del sitio web oficial de DEXVOI.'
  },
  security: {
    path: '/auditoria-seguridad',
    aliases: ['/osint', '/scanner', '/seguridad', '/protocolos-seguridad', '/audit-securite', '/security-audit', '/es/auditoria-seguridad', '/fr/audit-securite', '/en/security-audit'],
    title: 'Auditoría OSINT & Protocolos Éticos de Ciberseguridad | DEXVOI',
    description: 'Escaneo perimetral pasivo no invasivo, verificación de cabeceras HTTP, blindaje DNS y estándares OWASP en tiempo real.'
  },
  pricing: {
    path: '/precios',
    aliases: ['/planes', '/pricing', '/tarifas', '/tarifs', '/es/precios', '/fr/tarifs', '/en/pricing'],
    title: 'Planes y Precios de Auditoría Técnica | DEXVOI',
    description: 'Tarifas transparentes de pago único para informes forenses y blindaje perimetral: Starter 19€, Comprehensive 49€, Premium 99€.'
  },
  contact: {
    path: '/contacto',
    aliases: ['/contact', '/solicitar-auditoria', '/es/contacto', '/fr/contact', '/en/contact'],
    title: 'Contacto Directo & Diagnóstico Técnico | DEXVOI',
    description: 'Contacta con el equipo de arquitectos digitales de DEXVOI para solicitar tu diagnóstico perimetral prioritario.'
  },
  blog: {
    path: '/blog',
    aliases: ['/articulos', '/guias', '/noticias', '/es/blog', '/fr/blog', '/en/blog'],
    title: 'Blog & Recursos Técnicos de Ciberseguridad y SEO | DEXVOI',
    description: 'Artículos de vanguardia sobre arquitectura web Jamstack, auditorías OSINT, blindaje perimetral y SEO local en Google Maps para clínicas y restaurantes.'
  },
  'blog-post': {
    path: '/blog',
    aliases: [],
    title: 'Artículo de Inteligencia Técnica | DEXVOI',
    description: 'Guía técnica especializada de Dexvoi.'
  },
  '404': {
    path: '/404',
    aliases: ['/not-found', '/404.html', '/es/404', '/fr/404', '/en/404'],
    title: '404 - Perímetro No Localizado | DEXVOI',
    description: 'El recurso o página solicitada no existe o ha sido reubicada dentro de la infraestructura de Dexvoi.'
  }
};

/**
 * Extracts language code if present in the first URL segment (/es/..., /fr/..., /en/...).
 */
export function extractLanguageFromPath(pathname: string): { lang: Language | null; subPath: string } {
  const match = pathname.match(/^\/(es|fr|en)(\/.*)?$/i);
  if (match) {
    const lang = match[1].toLowerCase() as Language;
    const subPath = match[2] || '/';
    return { lang, subPath };
  }
  return { lang: null, subPath: pathname };
}

export function getBlogSlugFromPath(pathname: string): string {
  // Support both /blog/:slug and /:lang/blog/:slug
  const match = pathname.match(/^(?:\/(?:es|fr|en))?\/blog\/([^/?#]+)/i);
  return match ? match[1] : '';
}

export function matchPathToRoute(pathname: string): AppRoute {
  const cleanPath = pathname.replace(/\/$/, '').toLowerCase() || '/';

  // Extract language prefix if present: e.g. /fr/services -> lang='fr', subPath='/services'
  const { subPath } = extractLanguageFromPath(cleanPath);

  if (cleanPath === '/' || cleanPath === '' || subPath === '/' || subPath === '') {
    return 'home';
  }

  if (cleanPath.includes('/blog/') || subPath.startsWith('/blog/')) {
    return 'blog-post';
  }

  // Exact matching for cleanPath or subPath
  for (const [routeKey, routeData] of Object.entries(ROUTE_MAP)) {
    if (
      routeData.path === cleanPath || 
      routeData.aliases.includes(cleanPath) ||
      routeData.path === subPath ||
      routeData.aliases.includes(subPath)
    ) {
      return routeKey as AppRoute;
    }
  }

  // Check section hash or partial routes
  if (subPath === '/blog' || subPath.startsWith('/articulos') || subPath.startsWith('/guias')) return 'blog';
  if (subPath.startsWith('/servicios') || subPath.startsWith('/services')) return 'services';
  if (subPath.startsWith('/condiciones') || subPath.startsWith('/terminos') || subPath.startsWith('/terms') || subPath.startsWith('/conditions')) return 'terms';
  if (subPath.startsWith('/privacidad') || subPath.startsWith('/confidentialite') || subPath.startsWith('/privacy')) return 'privacy';
  if (subPath.startsWith('/cookies')) return 'cookies';
  if (subPath.startsWith('/aviso-legal') || subPath.startsWith('/mentions-legales') || subPath.startsWith('/legal')) return 'legal';
  if (
    subPath.startsWith('/auditoria') || 
    subPath.startsWith('/audit-securite') || 
    subPath.startsWith('/security-audit') || 
    subPath.startsWith('/scanner') || 
    subPath.startsWith('/osint')
  ) return 'security';
  if (subPath.startsWith('/precios') || subPath.startsWith('/tarifs') || subPath.startsWith('/pricing')) return 'pricing';
  if (subPath.startsWith('/contacto') || subPath.startsWith('/contact')) return 'contact';

  // Unknown path -> 404 Not Found
  return '404';
}

/**
 * Updates page title, meta description, canonical link, and hreflang links in <head>.
 */
export function updatePageMetadata(route: AppRoute, currentLang: Language = DEFAULT_LANGUAGE, blogSlug?: string) {
  const locData = LOCALIZED_ROUTES[route];
  const langKey = SUPPORTED_LANGUAGES.includes(currentLang) ? currentLang : DEFAULT_LANGUAGE;

  const title = locData?.titles[langKey] || ROUTE_MAP[route]?.title || ROUTE_MAP.home.title;
  const description = locData?.descriptions[langKey] || ROUTE_MAP[route]?.description || ROUTE_MAP.home.description;

  document.title = title;
  
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }

  // Canonical URL pointing specifically to the current localized version
  const localizedPath = getLocalizedPath(route, langKey, blogSlug);
  const fullCanonicalUrl = `https://dexvoi.com${localizedPath === '/' ? '' : localizedPath}`;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', fullCanonicalUrl);
  }

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // Sync HTML lang attribute
  if (document.documentElement) {
    document.documentElement.lang = langKey;
  }

  // Inject / update hreflang tags for multilingual SEO
  updateHreflangTagsInHead(route, blogSlug);
}

export function navigateTo(path: string, options: { replace?: boolean; scroll?: boolean } = {}) {
  const { replace = false, scroll = true } = options;

  if (replace) {
    window.history.replaceState({}, '', path);
  } else {
    window.history.pushState({}, '', path);
  }

  const route = matchPathToRoute(path);
  const blogSlug = getBlogSlugFromPath(path);
  const { lang } = extractLanguageFromPath(path);

  // Dispatch custom locationchange event
  window.dispatchEvent(new Event('locationchange'));

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useAppRoute(): { 
  route: AppRoute; 
  blogSlug: string; 
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scroll?: boolean }) => void;
} {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const redirectParam = params.get('p');
        const storedRedirect = sessionStorage.getItem('dexvoi_redirect_path');
        const target = redirectParam || storedRedirect;
        if (target) {
          sessionStorage.removeItem('dexvoi_redirect_path');
          window.history.replaceState({}, '', target);
          return matchPathToRoute(target);
        }
      } catch (e) {}
    }
    return matchPathToRoute(window.location.pathname);
  });

  const [blogSlug, setBlogSlug] = useState<string>(() => {
    return getBlogSlugFromPath(window.location.pathname);
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const nextRoute = matchPathToRoute(path);
      const nextSlug = getBlogSlugFromPath(path);
      setCurrentRoute(nextRoute);
      setBlogSlug(nextSlug);
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('locationchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, []);

  return {
    route: currentRoute,
    blogSlug,
    currentPath,
    navigate: navigateTo
  };
}
