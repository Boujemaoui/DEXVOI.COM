import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, Translations, translations } from './translations';
import { extractLanguageFromPath, matchPathToRoute, getBlogSlugFromPath } from '../utils/navigation';
import { getLocalizedPath } from '../utils/seoMultilingual';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language, syncUrl?: boolean) => void;
  t: Translations;
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'dexvoi_language';

/**
 * Detects the user's preferred language.
 * Priority:
 * 1. Explicit URL prefix (/es/..., /fr/..., /en/...) -> highest SEO authority
 * 2. Saved user preference in localStorage
 * 3. Browser navigator.languages / navigator.language
 * 4. Default fallback to 'es'
 */
export function detectInitialLanguage(): { language: Language; isAuto: boolean } {
  // 1. Check URL path prefix first
  if (typeof window !== 'undefined') {
    const { lang: urlLang } = extractLanguageFromPath(window.location.pathname);
    if (urlLang) {
      return { language: urlLang, isAuto: false };
    }
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'fr' || saved === 'en') {
      return { language: saved as Language, isAuto: false };
    }
  } catch (e) {
    // LocalStorage might be disabled in private/sandboxed mode
  }

  // 3. Detect from browser navigator
  const browserLocales: string[] = [];
  if (typeof navigator !== 'undefined') {
    if (Array.isArray(navigator.languages)) {
      browserLocales.push(...navigator.languages);
    }
    if (navigator.language) {
      browserLocales.push(navigator.language);
    }
  }

  for (const loc of browserLocales) {
    const code = loc.toLowerCase();
    if (code.startsWith('fr')) return { language: 'fr', isAuto: true };
    if (code.startsWith('en')) return { language: 'en', isAuto: true };
    if (code.startsWith('es')) return { language: 'es', isAuto: true };
  }

  // Fallback default
  return { language: 'es', isAuto: true };
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [langState, setLangState] = useState<{ language: Language; isAuto: boolean }>(() => {
    return detectInitialLanguage();
  });

  const setLanguage = useCallback((newLang: Language, syncUrl: boolean = true) => {
    setLangState({ language: newLang, isAuto: false });
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (e) {
      console.warn('Unable to persist language preference to localStorage:', e);
    }
    
    // Synchronize HTML lang attribute for SEO and accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }

    // When switching language, seamlessly update URL to the equivalent localized URL
    if (syncUrl && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentRoute = matchPathToRoute(currentPath);
      const blogSlug = getBlogSlugFromPath(currentPath);
      const newTargetUrl = getLocalizedPath(currentRoute, newLang, blogSlug);
      
      if (currentPath !== newTargetUrl) {
        window.history.pushState({}, '', newTargetUrl);
        window.dispatchEvent(new Event('locationchange'));
      }
    }
  }, []);

  // Listen for browser forward/back or navigation changes to update language if URL prefix differs
  useEffect(() => {
    const handleUrlLanguageSync = () => {
      const { lang: urlLang } = extractLanguageFromPath(window.location.pathname);
      if (urlLang && urlLang !== langState.language) {
        setLangState({ language: urlLang, isAuto: false });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = urlLang;
        }
      }
    };

    window.addEventListener('popstate', handleUrlLanguageSync);
    window.addEventListener('locationchange', handleUrlLanguageSync);

    return () => {
      window.removeEventListener('popstate', handleUrlLanguageSync);
      window.removeEventListener('locationchange', handleUrlLanguageSync);
    };
  }, [langState.language]);

  // Keep document lang attribute in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = langState.language;
    }
  }, [langState.language]);

  const value: LanguageContextType = {
    language: langState.language,
    setLanguage,
    t: translations[langState.language] || translations.es,
    isAutoDetected: langState.isAuto,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'es',
      setLanguage: () => {},
      t: translations.es,
      isAutoDetected: false,
    };
  }
  return context;
}
