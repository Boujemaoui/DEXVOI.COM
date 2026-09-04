import React, { useState } from 'react';
import { Shield, Zap, Lock, Activity, CheckCircle2, ArrowRight, Server, Globe2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAuditModal: () => void;
  onScrollToScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuditModal, onScrollToScanner }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlineVariants = [
    {
      titlePart1: "Blindamos tu Negocio,",
      titlePart2: "Multiplicamos tus Ventas",
      tag: "Opción A · Enfoque Integral"
    },
    {
      titlePart1: "Blindamos tu infraestructura digital,",
      titlePart2: "Multiplicamos tus reservas",
      tag: "Opción B · Específico Clínicas & Restaurantes"
    },
    {
      titlePart1: "Seguridad digital de élite que",
      titlePart2: "Convierte visitas en clientes",
      tag: "Opción C · Enfoque Conversión & Protección"
    }
  ];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Architectural Grid and Ambient Glows */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0066FF]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#F5A623]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Copy & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Live Operational Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#0066FF]/40 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]"></span>
              </span>
              <span className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase">
                SISTEMAS ACTIVOS · ARQUITECTURA DEFENSIVA
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {headlineVariants[headlineIndex].titlePart1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#ffb955] to-[#ffd78a] drop-shadow-[0_2px_12px_rgba(245,166,35,0.3)]">
                  {headlineVariants[headlineIndex].titlePart2}
                </span>
              </h1>

              {/* Variant Selector Tabs */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[11px] font-mono text-gray-400">Variantes de Copy:</span>
                {headlineVariants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeadlineIndex(idx)}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                      headlineIndex === idx
                        ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/50 font-bold'
                        : 'text-gray-400 hover:text-gray-200 bg-white/5 border border-transparent'
                    }`}
                  >
                    V{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed border-l-2 border-[#F5A623] pl-4 font-normal">
              No somos solo diseñadores. Somos <strong className="text-white font-semibold">Arquitectos Digitales de Negocios</strong>. Diseñamos webs ultrarrápidas, blindadas contra ataques y posicionadas en Google para clínicas y restaurantes que exigen resultados medibles.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={onOpenAuditModal}
                className="metallic-btn px-8 py-4 rounded font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-transform"
              >
                <Shield className="w-5 h-5 text-[#0A0F1F]" />
                <span>Solicitar Auditoría Gratuita de 5 Puntos</span>
              </button>

              <button
                id="hero-scanner-btn"
                onClick={onScrollToScanner}
                className="px-6 py-4 rounded bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#0066FF]/50 text-white font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-[#0066FF] shadow-lg"
              >
                <Zap className="w-4 h-4 text-[#F5A623]" />
                <span>Escanear Mi Web Ahora (60s)</span>
              </button>
            </div>

            {/* Target Audience Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">Clínicas Médicas / Estéticas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">Restaurantes de Gama Alta</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">Blindaje Legal & Datos</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Digital Command Center Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0066FF]/30 via-[#F5A623]/20 to-[#0066FF]/30 blur-lg opacity-75 animate-pulse-subtle"></div>
            
            <div className="relative rounded-2xl bg-[#0D1326] border border-[#0066FF]/40 p-5 shadow-2xl overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-gray-400">DEXVOI_CORE_DEFENSE_V4.exe</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40">
                  SHIELD: ARMED
                </span>
              </div>

              {/* Central Security Node Visual */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  {/* Rotating / glowing outer ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#0066FF]/40 animate-[spin_25s_linear_infinite]"></div>
                  <div className="absolute inset-3 rounded-full border border-[#F5A623]/30"></div>
                  
                  {/* Central Core */}
                  <div className="w-28 h-28 rounded-xl bg-[#131B33] border-2 border-[#0066FF] shadow-[0_0_30px_rgba(0,102,255,0.4)] flex flex-col items-center justify-center text-center p-2 z-10">
                    <Shield className="w-8 h-8 text-[#F5A623] mb-1" />
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                      BLINDAJE ACTIVO
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">0 BRECHAS</span>
                  </div>

                  {/* Satellite Nodes */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#1E293B] border border-[#0066FF] px-2 py-0.5 rounded text-[9px] font-mono text-white flex items-center gap-1 shadow-md">
                    <Lock className="w-2.5 h-2.5 text-[#0066FF]" /> SSL A+
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1E293B] border border-[#F5A623] px-2 py-0.5 rounded text-[9px] font-mono text-white flex items-center gap-1 shadow-md">
                    <Zap className="w-2.5 h-2.5 text-[#F5A623]" /> 0.8s Carga
                  </div>
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 bg-[#1E293B] border border-emerald-500/50 px-2 py-0.5 rounded text-[9px] font-mono text-white flex items-center gap-1 shadow-md">
                    <Globe2 className="w-2.5 h-2.5 text-emerald-400" /> Maps #1
                  </div>
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-[#1E293B] border border-[#0066FF]/60 px-2 py-0.5 rounded text-[9px] font-mono text-white flex items-center gap-1 shadow-md">
                    <Server className="w-2.5 h-2.5 text-[#0066FF]" /> 99.99%
                  </div>
                </div>
              </div>

              {/* Real-time Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-800 font-mono">
                <div className="bg-[#131B33]/80 p-2.5 rounded border border-gray-800">
                  <div className="text-[10px] text-gray-400">VELOCIDAD MILITAR</div>
                  <div className="text-sm font-bold text-white flex items-center justify-between mt-1">
                    <span>99 / 100</span>
                    <span className="text-[10px] text-emerald-400">TTFB: 140ms</span>
                  </div>
                </div>
                <div className="bg-[#131B33]/80 p-2.5 rounded border border-gray-800">
                  <div className="text-[10px] text-gray-400">CONVERSIÓN RESERVAS</div>
                  <div className="text-sm font-bold text-[#F5A623] flex items-center justify-between mt-1">
                    <span>+140%</span>
                    <span className="text-[10px] text-gray-300">24/7 Auto</span>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="mt-3 py-2 px-3 bg-[#0A0F1F] rounded border border-gray-800 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#0066FF]" />
                  Threat Detection Protocol
                </span>
                <span className="text-emerald-400 font-bold">100% PROTEGIDO</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
