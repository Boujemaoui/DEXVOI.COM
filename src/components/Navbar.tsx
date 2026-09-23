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

        {/* Desktop Navigation Links - Compact, harmonious & organized */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-medium text-gray-300">
          <button
            onClick={() => scrollToSection('problema')}
            className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span className="text-[#0066FF] font-mono text-[10px] font-bold">01</span>
            <span>{t.nav.diagnosis}</span>
          </button>

          <a
            href={servicesPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(servicesPath);
              }
            }}
            className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span className="text-[#0066FF] font-mono text-[10px] font-bold">02</span>
            <span>{t.nav.services}</span>
          </a>

          <button
            onClick={() => scrollToSection('sistemas-reservas')}
            className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span className="text-[#0066FF] font-mono text-[10px] font-bold">03</span>
            <span>{t.nav.booking}</span>
          </button>

          <button
            onClick={() => scrollToSection('agentes-ia')}
            className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span className="text-[#0066FF] font-mono text-[10px] font-bold">04</span>
            <span>{t.nav.aiAgents}</span>
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer text-gray-300"
          >
            <span>{t.nav.about}</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1 hidden xl:block"></div>

          <a
            href={securityPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(securityPath);
              }
            }}
            className="px-2.5 py-1.5 rounded-md text-[#F5A623] hover:text-[#FFAE33] hover:bg-[#F5A623]/10 transition-all flex items-center gap-1.5 font-medium border border-[#F5A623]/25"
          >
            <Shield className="w-3 h-3 text-[#F5A623]" />
            <span>{t.nav.osint}</span>
            <span className="px-1.5 py-0.2 rounded bg-[#F5A623]/20 text-[#F5A623] text-[9px] font-mono font-bold">
              {t.nav.osintBadge}
            </span>
          </a>

          <a
            href={pricingPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(pricingPath);
              }
            }}
            className="px-2.5 py-1.5 rounded-md text-sky-200 hover:text-white hover:bg-[#635BFF]/15 transition-all flex items-center gap-1.5 font-medium border border-[#635BFF]/30"
          >
            <CreditCard className="w-3 h-3 text-[#635BFF]" />
            <span>{t.nav.pricing}</span>
          </a>

          <a
            href={blogPath}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo(blogPath);
              }
            }}
            className="px-2.5 py-1.5 rounded-md hover:text-white text-gray-400 hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3 h-3 text-gray-400" />
            <span>Blog</span>
          </a>
        </nav>

        {/* CTA & Language Switcher & System Status */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <LanguageSelector variant="header" />

          <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded bg-[#1E293B]/60 border border-[#1E293B] text-[10px] font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-[0_0_6px_#0066FF] animate-pulse"></span>
            <span className="tracking-tight">{t.nav.nodesOnline}</span>
          </div>

          <button
            id="nav-cta-btn"
            onClick={onOpenAuditModal}
            className="metallic-btn px-3.5 py-2 rounded-md font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer font-bold whitespace-nowrap"
          >
            <Lock className="w-3 h-3" />
            <span>{t.nav.freeAudit}</span>
          </button>
        </div>

        {/* Mobile menu trigger + Language selector */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSelector variant="header" />
          <button
            onClick={onOpenAuditModal}
            className="metallic-btn px-2.5 py-1.5 rounded font-mono text-[10px] uppercase font-bold"
          >
            {t.nav.freeAudit.split(' ')[0]}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#1E293B] border border-gray-800 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Alternar Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1326] border-b border-[#1E293B] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          {/* Language Selector in Mobile Drawer */}
          <div className="pb-3 border-b border-gray-800">
            <LanguageSelector variant="mobile" />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2 text-xs font-mono text-[#0066FF]">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping"></span>
              <span>{t.nav.mobileTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">{t.nav.mobileSubtitle}</span>
          </div>

          <div className="flex flex-col space-y-1.5 font-mono text-xs">
            <button
              onClick={() => scrollToSection('problema')}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold text-[10px]">01</span>
                <span>{t.nav.diagnosis}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <a
              href={servicesPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(servicesPath);
              }}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold text-[10px]">02</span>
                <span>{t.nav.services}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </a>
            <button
              onClick={() => scrollToSection('sistemas-reservas')}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold text-[10px]">03</span>
                <span>{t.nav.booking}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => scrollToSection('agentes-ia')}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold text-[10px]">04</span>
                <span>{t.nav.aiAgents}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold text-[10px]">05</span>
                <span>{t.nav.about}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <a
              href={securityPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(securityPath);
              }}
              className="text-left py-2 px-2.5 rounded-md text-[#F5A623] hover:bg-[#F5A623]/10 font-medium flex items-center justify-between border border-[#F5A623]/25"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>{t.nav.osint}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#F5A623]/20 text-[#F5A623] text-[9px] font-bold">
                {t.nav.osintBadge}
              </span>
            </a>
            <a
              href={pricingPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(pricingPath);
              }}
              className="text-left py-2 px-2.5 rounded-md bg-[#635BFF]/15 border border-[#635BFF]/30 text-sky-200 font-medium flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
                <span>{t.nav.pricing}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#635BFF]/40 text-white text-[9px]">
                {t.nav.pricingBadge}
              </span>
            </a>
            <a
              href={contactPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(contactPath);
              }}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-[#38BDF8] hover:bg-white/5 flex items-center justify-between"
            >
              <span>{t.nav.contact}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </a>
            <a
              href={blogPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo(blogPath);
              }}
              className="text-left py-2 px-2.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                <span>Blog & Recursos</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full metallic-btn py-3 rounded font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>{t.nav.freeAudit}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
