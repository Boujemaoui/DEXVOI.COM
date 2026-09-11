import React, { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { LegalTab } from './LegalModal';
import { useLanguage } from '../i18n/LanguageContext';

interface ConsentBannerProps {
  onOpenLegalModal: (tab: LegalTab) => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onOpenLegalModal }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if previously accepted or configured
    const consent = localStorage.getItem('dexvoi_legal_consent_v1');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dexvoi_legal_consent_v1', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      type: 'all',
      analytics: true,
      security: true,
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('dexvoi_legal_consent_v1', JSON.stringify({
      acceptedAt: new Date().toISOString(),
      type: 'necessary_only',
      analytics: false,
      security: true,
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Consentimiento de Cookies y Privacidad"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto bg-[#0D1326]/95 backdrop-blur-xl border-2 border-[#0066FF]/60 rounded-2xl p-4 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto transition-all animate-fadeIn">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          
          {/* Icon & Message */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#131B33] border border-[#0066FF] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Shield className="w-5 h-5 text-[#38BDF8]" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-white font-mono text-sm font-bold flex items-center gap-1.5">
                  <span>
                    {language === 'fr'
                      ? 'Confidentialité, Cookies & Conditions Légales'
                      : language === 'en'
                      ? 'Privacy, Cookies & Terms of Service'
                      : 'Privacidad, Cookies & Condiciones Legales'}
                  </span>
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  RGPD / GDPR
                </span>
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {language === 'fr' ? (
                  <>
                    Chez <strong>DEXVOI</strong>, nous protégeons vos données et utilisons des cookies techniques et de sécurité pour sécuriser vos connexions et délivrer des audits fiables. En naviguant sur ce site ou en utilisant nos passerelles, vous acceptez notre{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('privacy');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Politique de Confidentialité
                    </a>{' '}
                    et nos{' '}
                    <a
                      href="/condiciones"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('terms');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Conditions Générales
                    </a>.
                  </>
                ) : language === 'en' ? (
                  <>
                    At <strong>DEXVOI</strong>, we safeguard your data and use essential technical security cookies to harden connections and deliver reliable business audits. By browsing this website or using our checkout, you agree to our{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('privacy');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a
                      href="/condiciones"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('terms');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Terms of Service
                    </a>.
                  </>
                ) : (
                  <>
                    En <strong>DEXVOI</strong> protegemos tus datos y empleamos cookies técnicas y de seguridad para blindar tus conexiones y ofrecerte diagnósticos fiables. Al navegar o utilizar nuestro asistente y pasarela de pago, aceptas nuestra{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('privacy');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Política de Privacidad
                    </a>{' '}
                    y los{' '}
                    <a
                      href="/condiciones"
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                          onOpenLegalModal('terms');
                        }
                      }}
                      className="text-[#38BDF8] underline hover:text-white font-semibold transition-colors"
                    >
                      Términos y Condiciones
                    </a>.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
            <a
              href="/cookies"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey) {
                  e.preventDefault();
                  onOpenLegalModal('cookies');
                }
              }}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-white hover:bg-[#1E293B] border border-gray-700/80 transition-all text-center cursor-pointer"
            >
              {language === 'fr' ? 'Configurer' : language === 'en' ? 'Settings' : 'Configurar'}
            </a>

            <button
              onClick={handleAcceptNecessary}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-white bg-[#131B33] hover:bg-[#1C2746] border border-[#0066FF]/30 transition-all text-center cursor-pointer"
            >
              {language === 'fr' ? 'Nécessaires' : language === 'en' ? 'Essential Only' : 'Solo Necesarias'}
            </button>

            <button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-[#0066FF] hover:bg-[#0052cc] shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Tout Accepter' : language === 'en' ? 'Accept All' : 'Aceptar y Continuar'}</span>
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};

