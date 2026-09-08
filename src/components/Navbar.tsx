import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Terminal, ArrowRight, Zap, Lock, Calendar, CreditCard } from 'lucide-react';
import { navigateTo } from '../utils/navigation';

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
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
    if (window.location.pathname !== '/') {
      navigateTo(`/#${id}`);
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
    if (window.location.pathname !== '/') {
      navigateTo('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0F1F]/90 backdrop-blur-md border-b border-[#1E293B] shadow-2xl py-3'
          : 'bg-[#0A0F1F]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleBrandClick}>
          <div className="w-10 h-10 rounded bg-[#1E293B] border border-[#0066FF]/40 flex items-center justify-center relative overflow-hidden group shadow-[0_0_15px_rgba(0,102,255,0.2)]">
            <div className="absolute inset-0 bg-[#0066FF]/10 group-hover:bg-[#0066FF]/20 transition-colors"></div>
            <Shield className="w-5 h-5 text-[#F5A623] relative z-10" />
            <div className="absolute bottom-0 w-full h-[2px] bg-[#0066FF]"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wider text-white font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              Architectural Defense & Growth
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button
            onClick={() => scrollToSection('problema')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#0066FF] font-mono text-xs">01.</span> Diagnóstico
          </button>
          <a
            href="/servicios"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo('/servicios');
              }
            }}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#0066FF] font-mono text-xs">02.</span> Servicios
          </a>
          <button
            onClick={() => scrollToSection('sistemas-reservas')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#0066FF] font-mono text-xs">03.</span> Reservas
          </button>
          <button
            onClick={() => scrollToSection('agentes-ia')}
            className="hover:text-white transition-colors flex items-center gap-1.5 py-1 cursor-pointer"
          >
            <span className="text-[#0066FF] font-mono text-xs">04.</span> Agentes IA
          </button>
          <a
            href="/auditoria-seguridad"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo('/auditoria-seguridad');
              }
            }}
            className="text-[#F5A623] hover:text-[#ffd78a] transition-colors flex items-center gap-1.5 py-1 font-mono font-bold text-xs"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>OSINT</span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-[9px] font-extrabold tracking-wider">
              29€
            </span>
          </a>
          <a
            href="/precios"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                navigateTo('/precios');
              }
            }}
            className="text-white hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 py-1 font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#635BFF]/20 border border-[#635BFF]/50"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Planes de Pago</span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-[#635BFF] text-white text-[9px] font-extrabold tracking-wider">
              19€ / 49€ / 99€
            </span>
          </a>
        </nav>

        {/* CTA & System Status */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#1E293B]/70 border border-[#1E293B] text-[11px] font-mono text-gray-300">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF] animate-pulse"></span>
            <span>NODES ONLINE</span>
          </div>

          <button
            id="nav-cta-btn"
            onClick={onOpenAuditModal}
            className="metallic-btn px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Auditoría Gratuita</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAuditModal}
            className="metallic-btn px-3 py-1.5 rounded font-mono text-[10px] uppercase font-bold"
          >
            Auditoría
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
        <div className="lg:hidden bg-[#0D1326] border-b border-[#1E293B] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2 text-xs font-mono text-[#0066FF]">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping"></span>
              <span>SISTEMAS OPERATIVOS</span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">v3.4.8 SECURE</span>
          </div>

          <div className="flex flex-col space-y-3 font-mono text-sm">
            <button
              onClick={() => scrollToSection('problema')}
              className="text-left py-2 text-gray-300 hover:text-white flex items-center justify-between"
            >
              <span>01. Diagnóstico de Problema</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>
            <a
              href="/servicios"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo('/servicios');
              }}
              className="text-left py-2 text-gray-300 hover:text-white flex items-center justify-between"
            >
              <span>02. Servicios Completos</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </a>
            <button
              onClick={() => scrollToSection('sistemas-reservas')}
              className="text-left py-2 text-gray-300 hover:text-white flex items-center justify-between"
            >
              <span>03. Sistemas de Reservas Avanzadas</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scrollToSection('agentes-ia')}
              className="text-left py-2 text-gray-300 hover:text-white flex items-center justify-between"
            >
              <span>04. Agentes Avanzados con IA</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>
            <a
              href="/auditoria-seguridad"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo('/auditoria-seguridad');
              }}
              className="text-left py-2 text-[#F5A623] font-bold flex items-center justify-between"
            >
              <span>05. OSINT & Blindaje Cabeceras</span>
              <span className="px-2 py-0.5 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-[10px]">
                29€ ÚNICO
              </span>
            </a>
            <a
              href="/precios"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo('/precios');
              }}
              className="text-left py-2.5 px-3 rounded-lg bg-[#635BFF]/20 border border-[#635BFF]/50 text-white font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#635BFF]" />
                <span>06. Planes de Pago (Stripe)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#635BFF] text-white text-[10px] font-mono">
                19€ / 49€ / 99€
              </span>
            </a>
            <a
              href="/contacto"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo('/contacto');
              }}
              className="text-left py-2 text-[#38BDF8] flex items-center justify-between"
            >
              <span>07. Contacto Directo</span>
              <ArrowRight className="w-4 h-4 text-gray-600" />
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
              <span>Solicitar Auditoría de 5 Puntos</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
