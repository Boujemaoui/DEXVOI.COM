import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Mail, 
  Clock, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  Lock,
  MessageSquare
} from 'lucide-react';
import { ContactCTASection } from '../components/ContactCTASection';
import { navigateTo } from '../utils/navigation';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onOpenAuditModal
}) => {
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0F1F]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131B33] hover:bg-[#1E293B] border border-gray-700/70 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-[#F5A623] font-bold">Contacto Directo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/servicios')}
              className="hidden sm:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Ver Servicios
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Diagnóstico Rápido</span>
            </button>
          </div>
        </div>
      </header>

      {/* Info Cards */}
      <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-[#0066FF]/40 text-xs font-mono text-[#38BDF8]">
            <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>RESPUESTA TÉCNICA PRIORITARIA &lt; 2 HORAS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
            Contacte con el Equipo de Arquitectos
          </h1>

          <p className="text-base text-gray-400 font-sans leading-relaxed">
            Sin intermediarios ni comerciales agresivos. Hablará directamente con ingenieros de software y especialistas en ciberseguridad y conversión.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 text-xs font-mono">
          <div className="p-5 rounded-2xl bg-[#0D1326] border border-gray-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#131B33] border border-[#0066FF]/40 flex items-center justify-center text-[#38BDF8]">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-white font-bold">Email Oficial</div>
            <a href="mailto:info@dexvoi.com" className="text-[#38BDF8] hover:underline block text-xs">
              info@dexvoi.com
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1326] border border-gray-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#131B33] border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-white font-bold">Horario de Consultoría</div>
            <div className="text-gray-400 text-xs">Lunes a Viernes: 09:00 - 20:00 CET</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1326] border border-gray-800 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#131B33] border border-[#F5A623]/40 flex items-center justify-center text-[#F5A623]">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-white font-bold">Confidencialidad</div>
            <div className="text-gray-400 text-xs">Acuerdo NDA y secreto profesional estricto</div>
          </div>
        </div>
      </section>

      {/* Embedded Form Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactCTASection />
      </div>

      {/* Return home link */}
      <div className="text-center pt-12">
        <button
          onClick={onNavigateHome}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la página principal</span>
        </button>
      </div>

    </div>
  );
};
