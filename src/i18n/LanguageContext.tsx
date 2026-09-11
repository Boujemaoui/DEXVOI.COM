import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isAutoDetected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'dexvoi_language';

/**
 * Detects the user's preferred language from browser settings.
 * Priority:
 * 1. Saved user preference in localStorage
 * 2. Browser navigator.languages / navigator.language
 * 3. Default fallback to 'es'
 */
export function detectInitialLanguage(): { language: Language; isAuto: boolean } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'fr' || saved === 'en') {
      return { language: saved, isAuto: false };
    }
  } catch (e) {
    // LocalStorage might be disabled in private/sandboxed mode
  }

  // Detect from browser navigator
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

  const setLanguage = (newLang: Language) => {
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
  };

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
    // Safe fallback if used outside of LanguageProvider to prevent crashes
    return {
      language: 'es',
      setLanguage: () => {},
      t: translations.es,
      isAutoDetected: false,
    };
  }
  return context;
}
