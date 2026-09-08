import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Lock, 
  Zap, 
  FileText, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';

interface PricingPageProps {
  onNavigateHome: () => void;
  onOpenPdfModal: (tier: 'basic' | 'complete' | 'premium') => void;
  onOpenAuditModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigateHome,
  onOpenPdfModal,
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
              <span className="text-xs font-mono text-[#635BFF] font-bold">Precios & Planes</span>
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
              <span>Diagnóstico Gratuito</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-[#635BFF]/40 text-xs font-mono text-[#A5B4FC] mb-4">
          <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
          <span>PAGO ÚNICO · SIN SUSCRIPCIONES OCULTAS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono mb-4">
          Tarifas Transparentes de Auditoría y Blindaje
        </h1>

        <p className="text-base sm:text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Elija el nivel de profundidad forense para su negocio. Todos los informes se generan con entrega prioritaria en PDF y procesador oficial Stripe.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Starter */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col justify-between relative hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono text-gray-400 font-bold tracking-widest uppercase">
                INFORME STARTER
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">19€</span>
                <span className="text-xs text-gray-400">pago único</span>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                Ideal para clínicas o comercios locales que desean una revisión rápida de fallos críticos y velocidad.
              </p>
              <div className="pt-4 border-t border-gray-800 space-y-2.5 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Análisis perimetral de velocidad Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Detección de vulnerabilidades en certificado SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Revisión básica de ficha Google Maps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Informe ejecutivo digital en PDF</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('basic')}
              className="mt-8 w-full py-3 rounded-xl bg-[#1E293B] hover:bg-[#2A374F] text-white text-xs font-mono font-bold transition-all border border-gray-700 cursor-pointer"
            >
              Comprar Informe Starter (19€)
            </button>
          </div>

          {/* Tier 2: Comprehensive (Featured) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111A38] border-2 border-[#0066FF] flex flex-col justify-between relative shadow-2xl shadow-[#0066FF]/20 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-mono font-bold tracking-wider shadow">
              MÁS RECOMENDADO
            </div>
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#38BDF8] font-bold tracking-widest uppercase">
                COMPREHENSIVE AUDIT
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">49€</span>
                <span className="text-xs text-gray-300">pago único</span>
              </div>
              <p className="text-xs text-gray-200 font-sans">
                Auditoría forense completa de posicionamiento local, fugas de clientes y fallos de ciberseguridad.
              </p>
              <div className="pt-4 border-t border-gray-700/80 space-y-2.5 text-xs font-mono text-gray-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Todo lo incluido en el informe Starter</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auditoría profunda de cabeceras HTTP de seguridad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Diagnóstico SEO Local y brechas ante competencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hoja de ruta prioritaria paso a paso en PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Soporte prioritario por email para dudas</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('complete')}
              className="mt-8 w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/30 cursor-pointer"
            >
              Comprar Comprehensive (49€)
            </button>
          </div>

          {/* Tier 3: Premium */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col justify-between relative hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#F5A623] font-bold tracking-widest uppercase">
                PREMIUM FORENSIC + CALL
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">99€</span>
                <span className="text-xs text-gray-400">pago único</span>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                Para negocios que buscan el máximo blindaje perimetral con sesión técnica de consultoría 1 a 1.
              </p>
              <div className="pt-4 border-t border-gray-800 space-y-2.5 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Todo lo incluido en el Comprehensive</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Escaneo OSINT completo de puertos y servidores DNS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Revisión de pasarelas de pago y cumplimiento RGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sesión privada de 30 min por videollamada con arquitecto</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('premium')}
              className="mt-8 w-full py-3 rounded-xl bg-[#F5A623] hover:bg-[#e0961f] text-black text-xs font-mono font-bold transition-all cursor-pointer"
            >
              Comprar Premium + Call (99€)
            </button>
          </div>

        </div>
      </section>

      {/* Enterprise / Custom Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[#38BDF8] font-bold uppercase">DESARROLLO INTEGRAL</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              ¿Desea que nuestro equipo construya su nueva arquitectura completa?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Desarrollamos proyectos integrales de web ultrarrápida, posicionamiento local dominante, sistema de reservas y agentes de IA desde 890€.
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer"
          >
            Consultar Proyecto a Medida
          </button>
        </div>
      </section>

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
