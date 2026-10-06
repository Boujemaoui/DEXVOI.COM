import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowRight, Lock, CreditCard, BookOpen } from 'lucide-react';
import { navigateTo } from '../utils/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { getLocalizedPath } from '../utils/seoMultilingual';

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const { language, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const currentPath = window.location.pathname;
    const homePaths = ['/', '/es', '/fr', '/en'];
    if (!homePaths.includes(currentPath)) {
      const homeLocalized = getLocalizedPath('home', language);
      navigateTo(`${homeLocalized}#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandClick = () => {
    const homeLocalized = getLocalizedPath('home', language);
    if (window.location.pathname !== homeLocalized && window.location.pathname !== '/') {
      navigateTo(homeLocalized);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const servicesPath = getLocalizedPath('services', language);
  const securityPath = getLocalizedPath('security', language);
  const pricingPath = getLocalizedPath('pricing', language);
  const contactPath = getLocalizedPath('contact', language);
  const blogPath = getLocalizedPath('blog', language);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0F1F]/95 backdrop-blur-md border-b border-[#1E293B]/80 shadow-xl py-2.5'
          : 'bg-[#0A0F1F]/75 backdrop-blur-sm border-b border-white/5 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={handleBrandClick}>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0F172A] border border-[#0066FF]/40 flex items-center justify-center relative overflow-hidden group shadow-[0_0_12px_rgba(0,102,255,0.2)] p-0.5">
            <img 
              src="/favicon.png" 
              alt="Dexvoi Shield" 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_6px_rgba(0,102,255,0.5)] group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-[#0066FF] to-[#F5A623]"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-mono font-bold text-white text-base tracking-wider">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/25 font-semibold">
                PRO
              </span>
            </div>
            <p className="text-[9px] text-gray-400 font-mono tracking-tight hidden sm:block mt-0.5">
              {t.nav.brandTagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links - Refined, spacious & elegant */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs lg:text-sm font-medium text-gray-300">
          <a
            href={servicesPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(servicesPath);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.nav.services}
          </a>

          <a
            href={securityPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(securityPath);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-amber-300/90 hover:text-amber-200 hover:bg-amber-400/10 transition-all flex items-center gap-1.5 font-medium border border-amber-500/25"
          >
            <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{t.nav.osint}</span>
          </a>

          <a
            href={pricingPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(pricingPath);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.nav.pricing.replace(' de Pago', '').replace(' & Plans', '').replace(' Plans', '')}
          </a>

          <a
            href={blogPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(blogPath);
              }
            }}
            className="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Blog
          </a>

          <button
            onClick={() => scrollToSection('contacto')}
            className="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.nav.contact}
          </button>

        </nav>

        {/* CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LanguageSelector variant="header" />

          <button
            id="nav-cta-btn"
            onClick={onOpenAuditModal}
            className="metallic-btn px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer font-bold whitespace-nowrap"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.nav.freeAudit}</span>
          </button>
        </div>

        {/* Mobile menu trigger + Language selector */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector variant="header" />
          <button
            onClick={onOpenAuditModal}
            className="metallic-btn px-2.5 py-1.5 rounded font-mono text-[10px] uppercase font-bold"
          >
            {t.nav.freeAudit.split(' ')[0]}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1E293B] border border-gray-800 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Alternar Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1326] border-b border-[#1E293B] px-5 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          {/* Language Selector in Mobile Drawer */}
          <div className="pb-3 border-b border-gray-800/80">
            <LanguageSelector variant="mobile" />
          </div>

          <div className="flex flex-col space-y-1 font-mono text-xs">
            <a
              href={servicesPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(servicesPath);
              }}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
            >
              <span>{t.nav.services}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <a
              href={securityPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(securityPath);
              }}
              className="text-left py-2.5 px-3 rounded-lg text-[#F5A623] bg-[#F5A623]/5 hover:bg-[#F5A623]/15 font-medium flex items-center justify-between border border-[#F5A623]/25 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>{t.nav.osint}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]/70" />
            </a>

            <button
              onClick={() => scrollToSection('sistemas-reservas')}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{t.nav.booking}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </button>

            <button
              onClick={() => scrollToSection('agentes-ia')}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{t.nav.aiAgents}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </button>

            <a
              href={pricingPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(pricingPath);
              }}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
                <span>{t.nav.pricing}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <a
              href={blogPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(blogPath);
              }}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                <span>Blog & Recursos</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <button
              onClick={() => scrollToSection('contacto')}
              className="text-left py-2.5 px-3 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{t.nav.contact}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full metallic-btn py-3 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Lock className="w-4 h-4" />
              <span>{t.nav.freeAudit}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
