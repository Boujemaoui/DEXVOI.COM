import { useState, useEffect } from 'react';

export type AppRoute = 
  | 'home'
  | 'services'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'legal'
  | 'security'
  | 'pricing'
  | 'contact';

export interface RouteInfo {
  route: AppRoute;
  path: string;
  title: string;
  description: string;
}

export const ROUTE_MAP: Record<AppRoute, { path: string; aliases: string[]; title: string; description: string }> = {
  home: {
    path: '/',
    aliases: ['/home', '/index.html'],
    title: 'Dexvoi - Arquitectura Web, SEO y Blindaje Digital',
    description: 'Dexvoi - Agencia digital de élite especializada en arquitectura web, SEO local y blindaje digital / ethical hacking para clínicas y restaurantes.'
  },
  services: {
    path: '/servicios',
    aliases: ['/services'],
    title: 'Servicios de Arquitectura Web & Ciberseguridad | DEXVOI',
    description: 'Descubre nuestros servicios de arquitectura web ultrarrápida, SEO local en Google Maps, blindaje perimetral y sistemas de reservas para clínicas y restaurantes.'
  },
  terms: {
    path: '/condiciones',
    aliases: ['/terminos', '/terms', '/terms-and-conditions', '/condiciones-de-servicio'],
    title: 'Términos y Condiciones de Servicio | DEXVOI',
    description: 'Términos y condiciones de contratación y uso de los servicios de ingeniería digital, auditoría técnica y blindaje perimetral de DEXVOI.'
  },
  privacy: {
    path: '/privacidad',
    aliases: ['/privacy', '/politica-de-privacidad', '/privacy-policy'],
    title: 'Política de Privacidad y Cumplimiento RGPD | DEXVOI',
    description: 'Política de privacidad de DEXVOI. Tratamiento de datos confidenciales con estricto apego al RGPD (UE 2016/679) y LOPDGDD.'
  },
  cookies: {
    path: '/cookies',
    aliases: ['/politica-de-cookies', '/cookie-policy'],
    title: 'Política de Cookies y Almacenamiento Local | DEXVOI',
    description: 'Información transparente sobre las cookies técnicas, de seguridad y analíticas utilizadas en el portal web de DEXVOI.'
  },
  legal: {
    path: '/aviso-legal',
    aliases: ['/legal', '/imprint', '/aviso-legal-lssi'],
    title: 'Aviso Legal e Información Societaria (LSSI-CE) | DEXVOI',
    description: 'Aviso legal, datos identificativos del titular y derechos de propiedad intelectual del sitio web oficial de DEXVOI.'
  },
  security: {
    path: '/auditoria-seguridad',
    aliases: ['/osint', '/scanner', '/seguridad', '/protocolos-seguridad'],
    title: 'Auditoría OSINT & Protocolos Éticos de Ciberseguridad | DEXVOI',
    description: 'Escaneo perimetral pasivo no invasivo, verificación de cabeceras HTTP, blindaje DNS y estándares OWASP en tiempo real.'
  },
  pricing: {
    path: '/precios',
    aliases: ['/planes', '/pricing', '/tarifas'],
    title: 'Planes y Precios de Auditoría Técnica | DEXVOI',
    description: 'Tarifas transparentes de pago único para informes forenses y blindaje perimetral: Starter 19€, Comprehensive 49€, Premium 99€.'
  },
  contact: {
    path: '/contacto',
    aliases: ['/contact', '/solicitar-auditoria'],
    title: 'Contacto Directo & Diagnóstico Técnico | DEXVOI',
    description: 'Contacta con el equipo de arquitectos digitales de DEXVOI para solicitar tu diagnóstico perimetral prioritario.'
  }
};

export function matchPathToRoute(pathname: string): AppRoute {
  const cleanPath = pathname.replace(/\/$/, '').toLowerCase() || '/';

  for (const [routeKey, routeData] of Object.entries(ROUTE_MAP)) {
    if (routeData.path === cleanPath || routeData.aliases.includes(cleanPath)) {
      return routeKey as AppRoute;
    }
  }

  // Check section hash or partial routes
  if (cleanPath.startsWith('/servicios')) return 'services';
  if (cleanPath.startsWith('/condiciones') || cleanPath.startsWith('/terminos')) return 'terms';
  if (cleanPath.startsWith('/privacidad')) return 'privacy';
  if (cleanPath.startsWith('/cookies')) return 'cookies';
  if (cleanPath.startsWith('/aviso-legal') || cleanPath.startsWith('/legal')) return 'legal';
  if (cleanPath.startsWith('/auditoria') || cleanPath.startsWith('/scanner') || cleanPath.startsWith('/osint')) return 'security';
  if (cleanPath.startsWith('/precios')) return 'pricing';
  if (cleanPath.startsWith('/contacto')) return 'contact';

  return 'home';
}

export function updatePageMetadata(route: AppRoute) {
  const data = ROUTE_MAP[route] || ROUTE_MAP.home;
  document.title = data.title;
  
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', data.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', data.title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', data.description);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://dexvoi.com${data.path === '/' ? '' : data.path}`);
  }

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', `https://dexvoi.com${data.path === '/' ? '' : data.path}`);
}

export function navigateTo(path: string, options: { replace?: boolean; scroll?: boolean } = {}) {
  const { replace = false, scroll = true } = options;

  if (replace) {
    window.history.replaceState({}, '', path);
  } else {
    window.history.pushState({}, '', path);
  }

  const route = matchPathToRoute(path);
  updatePageMetadata(route);

  window.dispatchEvent(new Event('locationchange'));

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useAppRoute(): { route: AppRoute; navigate: (path: string) => void } {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    return matchPathToRoute(window.location.pathname);
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = matchPathToRoute(window.location.pathname);
      setCurrentRoute(nextRoute);
      updatePageMetadata(nextRoute);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('locationchange', handleLocationChange);

    // Initial sync
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, []);

  return {
    route: currentRoute,
    navigate: navigateTo
  };
}
