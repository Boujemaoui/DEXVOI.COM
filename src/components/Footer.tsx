import React from 'react';
import { Shield, Award, ArrowUp } from 'lucide-react';
import { LegalTab } from './LegalModal';
import { navigateTo } from '../utils/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onOpenLegalModal?: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.ctrlKey || e.metaKey) return; // allow new tab
    e.preventDefault();
    navigateTo(path);
  };

  return (
    <footer id="main-footer" className="w-full bg-[#080C19] border-t border-gray-800 text-gray-400 font-mono text-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('/')}>
              <div className="w-8 h-8 rounded bg-[#1E293B] border border-[#0066FF]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#F5A623]" />
              </div>
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
            </div>
            <p className="text-gray-400 font-sans text-xs leading-relaxed">
              {t.footer.description}
            </p>
            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <LanguageSelector variant="footer" />
            </div>
          </div>

          {/* Pillars Col */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              {t.footer.servicesCol}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="/servicios" 
                  onClick={(e) => handleLinkClick(e, '/servicios')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  01. {t.services.pillar1Title}
                </a>
              </li>
              <li>
                <a 
                  href="/servicios" 
                  onClick={(e) => handleLinkClick(e, '/servicios')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  02. {t.services.pillar2Title}
                </a>
              </li>
              <li>
                <a 
                  href="/servicios" 
                  onClick={(e) => handleLinkClick(e, '/servicios')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  03. {t.services.pillar3Title}
                </a>
              </li>
              <li>
                <a 
                  href="/auditoria-seguridad" 
                  onClick={(e) => handleLinkClick(e, '/auditoria-seguridad')}
                  className="text-[#F5A623] hover:underline"
                >
                  04. OSINT Security Audit (29€)
                </a>
              </li>
              <li>
                <a 
                  href="/precios" 
                  onClick={(e) => handleLinkClick(e, '/precios')}
                  className="text-[#635BFF] hover:underline"
                >
                  05. {t.pricing.title}
                </a>
              </li>
              <li>
                <a 
                  href="/blog" 
                  onClick={(e) => handleLinkClick(e, '/blog')}
                  className="text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  06. Blog & Guías Técnicas
                </a>
              </li>
            </ul>
          </div>

          {/* Sectors Col */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              {t.footer.sectorsCol}
            </div>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-300">{t.footer.sectorClinics}</span></li>
              <li><span className="text-gray-300">{t.footer.sectorAesthetic}</span></li>
              <li><span className="text-gray-300">{t.footer.sectorRestaurants}</span></li>
              <li><span className="text-gray-300">{t.footer.sectorHospitality}</span></li>
              <li className="pt-2">
                <a 
                  href="/contacto" 
                  onClick={(e) => handleLinkClick(e, '/contacto')}
                  className="text-[#38BDF8] hover:underline block"
                >
                  → {t.footer.contactArchitect}
                </a>
              </li>
            </ul>
          </div>

          {/* Trust Badge Col */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#F5A623]">
                <Award className="w-5 h-5" />
                <span className="font-bold text-xs uppercase tracking-wider text-white">
                  {t.footer.badgeTitle}
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-400">
                {t.footer.badgeSubtitle}
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                {t.footer.badgeText}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Real Legal URLs */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <span>© {new Date().getFullYear()} DEXVOI. {t.footer.rights}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="/privacidad"
              onClick={(e) => handleLinkClick(e, '/privacidad')}
              className="hover:text-white transition-colors"
            >
              {t.footer.privacy}
            </a>
            <a
              href="/condiciones"
              onClick={(e) => handleLinkClick(e, '/condiciones')}
              className="hover:text-white transition-colors"
            >
              {t.footer.terms}
            </a>
            <a
              href="/cookies"
              onClick={(e) => handleLinkClick(e, '/cookies')}
              className="hover:text-white transition-colors"
            >
              {t.footer.cookies}
            </a>
            <a
              href="/aviso-legal"
              onClick={(e) => handleLinkClick(e, '/aviso-legal')}
              className="hover:text-white transition-colors"
            >
              {t.footer.legal}
            </a>
            <a
              href="/auditoria-seguridad"
              onClick={(e) => handleLinkClick(e, '/auditoria-seguridad')}
              className="hover:text-white transition-colors text-[#F5A623]"
            >
              {t.footer.ethicalAudit}
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#1E293B] border border-gray-800 text-gray-400 hover:text-white transition-colors ml-2 cursor-pointer"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

