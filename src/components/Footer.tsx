import React from 'react';
import { Shield, Lock, Award, Terminal, ArrowUp, Cookie } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegalModal?: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-[#080C19] border-t border-gray-800 text-gray-400 font-mono text-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#1E293B] border border-[#0066FF]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#F5A623]" />
              </div>
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
            </div>
            <p className="text-gray-400 font-sans text-xs leading-relaxed">
              Arquitectos Digitales de Negocios. Especialistas en blindaje perimetral, alta conversión y posicionamiento local dominante para clínicas y restaurantes.
            </p>
          </div>

          {/* Pillars Col */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Pilares de Servicio
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#servicios" className="hover:text-[#0066FF] transition-colors">01. Arquitectura Web & Sistemas</a></li>
              <li><a href="#servicios" className="hover:text-[#0066FF] transition-colors">02. Posicionamiento (SEO Local & Ads)</a></li>
              <li><a href="#servicios" className="hover:text-[#0066FF] transition-colors">03. Ethical Hacking & Blindaje</a></li>
              <li><a href="#scanner" className="text-[#F5A623] hover:underline">04. Escáner de Vulnerabilidades</a></li>
            </ul>
          </div>

          {/* Sectors Col */}
          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Sectores Especializados
            </div>
            <ul className="space-y-2 text-xs">
              <li><span className="text-gray-300">Clínicas Médicas & Quirúrgicas</span></li>
              <li><span className="text-gray-300">Centros de Medicina Estética</span></li>
              <li><span className="text-gray-300">Restaurantes de Gama Media-Alta</span></li>
              <li><span className="text-gray-300">Grupos Gastronómicos</span></li>
            </ul>
          </div>

          {/* Trust Badge Col (Matching Section 8 requirement) */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#F5A623]">
                <Award className="w-5 h-5" />
                <span className="font-bold text-xs uppercase tracking-wider text-white">
                  SELLO DE GARANTÍA
                </span>
              </div>
              <div className="text-xs font-bold text-emerald-400">
                Seguridad y Estrategia Digital Certificada
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Cumplimiento estricto en auditoría de penetración, protección de datos confidenciales y tiempos de respuesta militar.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <span>© {new Date().getFullYear()} DEXVOI. SEGURIDAD Y ESTRATEGIA CERTIFICADA.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenLegalModal ? onOpenLegalModal('privacy') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacidad & Protocolos
            </button>
            <button
              onClick={() => onOpenLegalModal ? onOpenLegalModal('terms') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Términos de Servicio
            </button>
            <button
              onClick={() => onOpenLegalModal ? onOpenLegalModal('cookies') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookies
            </button>
            <button
              onClick={() => onOpenLegalModal ? onOpenLegalModal('legal') : null}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Aviso Legal
            </button>
            <button
              onClick={() => onOpenLegalModal ? onOpenLegalModal('security') : null}
              className="hover:text-white transition-colors cursor-pointer text-[#F5A623]"
            >
              Auditoría Ética
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#1E293B] border border-gray-800 text-gray-400 hover:text-white transition-colors ml-2"
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
