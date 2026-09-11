import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'es', label: 'Español', nativeLabel: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
];

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile' | 'footer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, t, isAutoDetected } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mobile drawer variant: inline segmented pills for fast touch interaction
  if (variant === 'mobile') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>{t.langSelector.current}</span>
          </span>
          {isAutoDetected && (
            <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
              {t.langSelector.autoDetected}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5 bg-[#0A0F1F] p-1 rounded-lg border border-gray-800">
          {LANGUAGES.map((opt) => {
            const isActive = language === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLanguage(opt.code)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-md font-mono text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0066FF] text-white font-bold shadow-md shadow-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-[#1E293B]'
                }`}
                aria-pressed={isActive}
              >
                <span>{opt.flag}</span>
                <span className="uppercase">{opt.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Footer or inline compact variant
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2 font-mono text-xs ${className}`}>
        <Globe className="w-4 h-4 text-gray-400" />
        <div className="flex items-center gap-1 bg-[#1E293B]/60 p-1 rounded border border-gray-800">
          {LANGUAGES.map((opt) => {
            const isActive = language === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLanguage(opt.code)}
                className={`px-2 py-1 rounded text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0066FF] text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="mr-1">{opt.flag}</span>
                <span className="uppercase">{opt.code}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default header dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#1E293B]/80 hover:bg-[#1E293B] border border-gray-800 hover:border-[#0066FF]/50 text-gray-200 hover:text-white font-mono text-xs transition-all cursor-pointer shadow-sm"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={t.langSelector.switchLang}
      >
        <span className="text-sm">{currentOption.flag}</span>
        <span className="uppercase font-bold tracking-wider">{currentOption.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0066FF]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0D1326] border border-gray-800 shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
          <div className="px-3 py-1.5 border-b border-gray-800/80 mb-1">
            <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
              {t.langSelector.switchLang}
            </p>
          </div>
          {LANGUAGES.map((opt) => {
            const isActive = language === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  setLanguage(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#0066FF]/20 text-white font-bold border-l-2 border-[#0066FF]'
                    : 'text-gray-300 hover:text-white hover:bg-[#1E293B]/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{opt.flag}</span>
                  <div>
                    <div className="leading-tight">{opt.nativeLabel}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{opt.code}</div>
                  </div>
                </div>
                {isActive && <Check className="w-4 h-4 text-[#0066FF]" />}
              </button>
            );
          })}
          {isAutoDetected && (
            <div className="px-3 pt-1.5 pb-1 border-t border-gray-800/80 mt-1">
              <span className="text-[9px] text-emerald-400/90 font-mono">
                ✓ {t.langSelector.autoDetected}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
