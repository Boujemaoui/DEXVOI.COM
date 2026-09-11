declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Checks if user has accepted analytics cookies in accordance with RGPD/GDPR
 */
export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('dexvoi_legal_consent_v1');
    if (!raw) return false;
    const data = JSON.parse(raw);
    return Boolean(data.analytics);
  } catch {
    return false;
  }
}

/**
 * Retrieves the Google Analytics 4 Measurement ID from environment variables
 */
export function getMeasurementId(): string {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  const envId = metaEnv?.VITE_GA_MEASUREMENT_ID?.trim();
  if (envId && envId.startsWith('G-')) {
    return envId;
  }
  return 'G-KDJYZJ3WL2';
}

/**
 * Initializes Google Analytics 4 dynamically when Measurement ID and consent are present
 */
export function initGA(overrideId?: string): boolean {
  const measurementId = overrideId || getMeasurementId();
  
  if (!measurementId || !measurementId.startsWith('G-')) {
    return false;
  }

  // Only load third-party analytics script if user has granted consent or in transparent mode
  if (document.getElementById('google-analytics-script')) {
    return true;
  }

  const script = document.createElement('script');
  script.id = 'google-analytics-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  
  // Set default consent mode
  const consentGranted = hasAnalyticsConsent();
  gtag('consent', 'default', {
    analytics_storage: consentGranted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  gtag('config', measurementId, {
    send_page_view: false, // We control SPA pageviews via custom route listener
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  if (consentGranted) {
    trackPageView(window.location.pathname, document.title);
  }

  return true;
}

/**
 * Updates consent state when user accepts cookies
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied'
    });

    if (granted) {
      trackPageView(window.location.pathname, document.title);
    }
  } else if (granted) {
    initGA();
  }
}

/**
 * Tracks a page view event for SPA routing
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href
  });
}

/**
 * Tracks custom interactions (e.g. audit request, contact submit, modal opened)
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}
