import React, { useState, useEffect } from 'react';
import { Shield, Zap, Lock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onOpenAuditModal: () => void;
  onScrollToScanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuditModal, onScrollToScanner }) => {
  const { t, language } = useLanguage();
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(11 + Math.random() * 7));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#0066FF]/40 shadow-[0_0_15px_rgba(0,102,255,0.2)] max-w-full">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]"></span>
              </span>
              <span className="font-mono text-xs font-bold text-gray-200 tracking-wider uppercase whitespace-nowrap truncate">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2 min-h-[72px] sm:min-h-[84px] md:min-h-[110px] flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                {t.hero.titleLine1}{' '}
                <span className="text-gray-200">{t.hero.titleLine2}</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#ffb955] to-[#ffd78a] drop-shadow-[0_2px_12px_rgba(245,166,35,0.3)]">
                  {t.hero.titleHighlight}
                </span>
              </h1>
            </div>

            {/* Subtitle & Value Proposition */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed border-l-2 border-[#F5A623] pl-4 font-normal">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={onOpenAuditModal}
                className="metallic-btn px-8 py-4 rounded font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-transform cursor-pointer"
              >
                <Shield className="w-5 h-5 text-[#0A0F1F]" />
                <span>{t.hero.ctaAudit}</span>
              </button>

              <button
                id="hero-scanner-btn"
                onClick={onScrollToScanner}
                className="px-6 py-4 rounded bg-[#1E293B]/80 hover:bg-[#1E293B] border border-[#0066FF]/50 text-white font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-[#0066FF] shadow-lg cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#F5A623]" />
                <span>{t.hero.ctaScanner}</span>
              </button>
            </div>

            {/* Target Audience Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">
                  {language === 'fr' ? 'Commerces & Établissements (Offline)' : language === 'en' ? 'Local & Physical Venues (Offline)' : 'Negocios Físicos & Locales (Offline)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">
                  {language === 'fr' ? 'E-Commerce & Projets Web (Online)' : language === 'en' ? 'E-Commerce & Digital Brands (Online)' : 'E-Commerce & Marcas Digitales (Online)'}
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span className="text-xs text-gray-300 font-mono">
                  {language === 'fr' ? 'Haute Conversion & Blindage Actif' : language === 'en' ? 'High Conversion & Active Defense' : 'Alta Conversión & Blindaje Activo'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Digital Command Center (Stitch SOC Radar Design) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0066FF]/30 via-[#F5A623]/20 to-[#0066FF]/30 blur-lg opacity-75 animate-pulse-subtle pointer-events-none"></div>
            
            <div className="relative rounded-2xl bg-[#070C18]/95 border border-[#1E293B] shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Top Glow Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5A623] to-transparent opacity-80 pointer-events-none" />

              {/* 1. Header Bar */}
              <div className="px-4 py-3 bg-[#0B1325]/90 border-b border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308] shadow-[0_0_6px_rgba(234,179,8,0.7)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
                  <span className="ml-1 text-[11px] font-mono text-white font-bold tracking-wider">
                    DEXVOI_CORE<span className="text-[#F5A623]">_DEFENSE_V4.exe</span>
                  </span>
                </div>
                <div className="px-2.5 py-0.5 rounded bg-[#F5A623]/10 border border-[#F5A623]/80 shadow-[0_0_8px_rgba(245,166,35,0.25)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-[#F5A623] tracking-widest">
                    SHIELD: ARMED
                  </span>
                </div>
              </div>

              {/* 2. Live Telemetry Sub-bar */}
              <div className="px-4 py-1.5 bg-[#091020]/80 border-b border-[#1E293B]/70 flex items-center justify-between text-[10px] font-mono text-[#787678]">
                <div className="flex items-center gap-1.5 text-[#00F0FF]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  <span>DIAGNOSTIC_SUITE: <strong className="text-white font-semibold">ACTIVE</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="animate-blink text-[#F5A623] font-bold">● LIVE ACTIVE</span>
                  <span className="text-[#00F0FF]">{latency}ms</span>
                </div>
              </div>

              {/* 3. Central Radar & Orbital Core Visual (Stitch Design) */}
              <div className="py-6 sm:py-8 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Laser Sweep Beam */}
                <div className="absolute inset-x-8 h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent scan-laser pointer-events-none" />

                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
                  
                  {/* Outer Circuit Coordinate Ring */}
                  <div className="absolute inset-0 rounded-full border border-[#1E293B] opacity-60 pointer-events-none" />

                  {/* Rotating Ring 1: Clockwise Outer Amber Dashes with Nodes */}
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#F5A623]/30 animate-spin-slow pointer-events-none">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#F5A623] shadow-[0_0_8px_#F5A623]" />
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                    <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F0FF]" />
                  </div>

                  {/* Rotating Ring 2: Counter-Clockwise Cyan Technical Arc */}
                  <div className="absolute inset-7 sm:inset-9 rounded-full border border-dashed border-[#00F0FF]/40 animate-spin-reverse-slow pointer-events-none">
                    <span className="absolute top-3 right-8 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                    <span className="absolute bottom-3 left-8 w-2 h-2 rounded-full bg-[#FFDE6A] shadow-[0_0_6px_#FFDE6A]" />
                  </div>

                  {/* Radar Crosshairs */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#1E293B] to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#1E293B] to-transparent pointer-events-none" />

                  {/* Coordinates Markers */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#787678] tracking-widest pointer-events-none">000° RADIAL</div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#787678] tracking-widest pointer-events-none">180° PERIMETER</div>
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-mono text-[#787678] tracking-widest pointer-events-none">270° INGRESS</div>
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-mono text-[#787678] tracking-widest pointer-events-none">090° EGRESS</div>

                  {/* Central Core Pod: Escudo y Blindaje */}
                  <div className="relative w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] rounded-2xl bg-gradient-to-br from-[#0F1B38] via-[#091224] to-[#050A14] border-2 border-[#F5A623]/80 animate-pulse-core flex flex-col items-center justify-center p-3 text-center z-10 shadow-2xl backdrop-blur-md">
                    
                    {/* High-Tech Shield Icon SVG */}
                    <div className="relative w-10 h-12 mb-1.5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#F5A623]/30 blur-md rounded-full pointer-events-none" />
                      <svg className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(245,166,35,0.7)]" viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M32 2L6 14V34C6 54 18 67 32 72C46 67 58 54 58 34V14L32 2Z" 
                          fill="url(#heroShieldInnerGrad)" 
                          stroke="url(#heroShieldGoldStroke)" 
                          strokeWidth="3" 
                          strokeLinejoin="round" 
                        />
                        <path 
                          d="M32 18V28M24 36H40M32 28L24 36M32 28L40 36M32 46V56" 
                          stroke="#FFDE6A" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                        />
                        <circle cx="32" cy="18" r="2.5" fill="#FFDE6A" />
                        <circle cx="24" cy="36" r="2" fill="#00F0FF" />
                        <circle cx="40" cy="36" r="2" fill="#00F0FF" />
                        <circle cx="32" cy="45" r="3" fill="#F5A623" />
                        <path d="M30 46L34 46L33 53L31 53Z" fill="#F5A623" />
                        <defs>
                          <linearGradient id="heroShieldInnerGrad" x1="32" y1="2" x2="32" y2="72" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#14244D" />
                            <stop offset="1" stopColor="#080F21" />
                          </linearGradient>
                          <linearGradient id="heroShieldGoldStroke" x1="6" y1="2" x2="58" y2="72" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFDE6A" />
                            <stop offset="0.5" stopColor="#F5A623" />
                            <stop offset="1" stopColor="#D97706" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <span className="text-xs font-mono font-extrabold text-white uppercase tracking-wider glow-gold-text">
                      {language === 'fr' ? 'BLINDAGE ACTIF' : language === 'en' ? 'ACTIVE SHIELD' : 'BLINDAJE ACTIVO'}
                    </span>
                    <span className="text-[8.5px] font-mono font-semibold tracking-wider text-[#94A3B8]">
                      {language === 'fr' ? 'SURVEILLANCE CONTINUE' : language === 'en' ? 'CONTINUOUS MONITORING' : 'MONITOREO CONTINUO'}
                    </span>
                    <div className="mt-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#11203F] border border-[#1E293B]">
                      <span className="w-1 h-1 rounded-full bg-[#00F0FF] animate-ping" />
                      <span className="text-[8px] font-mono text-[#00F0FF] font-semibold">DEFENSE: 100%</span>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  {/* Top: SSL A+ */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 float-b1 z-20">
                    <div className="px-2.5 py-1 rounded-lg bg-[#0C162E]/95 border border-[#00F0FF]/70 shadow-[0_0_12px_rgba(0,240,255,0.25)] flex items-center gap-1.5 backdrop-blur-md">
                      <Lock className="w-3 h-3 text-[#00F0FF]" />
                      <span className="text-[10px] font-mono font-extrabold text-[#00F0FF]">SSL A+</span>
                    </div>
                  </div>

                  {/* Left: Maps #1 */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 float-b2 z-20">
                    <div className="px-2.5 py-1 rounded-lg bg-[#0C162E]/95 border border-[#F5A623]/70 shadow-[0_0_12px_rgba(245,166,35,0.25)] flex items-center gap-1.5 backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-[#F5A623]" />
                      <span className="text-[10px] font-mono font-extrabold text-[#FFDE6A]">Maps #1</span>
                    </div>
                  </div>

                  {/* Right: 99.99% */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 float-b1 z-20">
                    <div className="px-2.5 py-1 rounded-lg bg-[#0C162E]/95 border border-[#10B981]/70 shadow-[0_0_12px_rgba(16,185,129,0.25)] flex items-center gap-1.5 backdrop-blur-md">
                      <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                      <span className="text-[10px] font-mono font-extrabold text-white">99.99%</span>
                    </div>
                  </div>

                  {/* Bottom: 0.8s */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 float-b2 z-20">
                    <div className="px-2.5 py-1 rounded-lg bg-[#0C162E]/95 border border-[#F5A623]/70 shadow-[0_0_12px_rgba(245,166,35,0.25)] flex items-center gap-1.5 backdrop-blur-md">
                      <Zap className="w-3 h-3 text-[#F5A623]" />
                      <span className="text-[10px] font-mono font-extrabold text-[#F5A623]">0.8s</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4. Telemetry Cards (Stitch Design) */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#070C18] border-t border-[#1E293B] font-mono">
                {/* Card 1: Alto Rendimiento */}
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#0C152B] to-[#080E1E] border border-[#1E293B] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5A623]" />
                  <div className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                    {language === 'fr' ? 'HAUTE PERFORMANCE' : language === 'en' ? 'HIGH PERFORMANCE' : 'ALTO RENDIMIENTO'}
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl sm:text-2xl font-black text-white glow-gold-text">99 <span className="text-xs font-normal text-[#787678]">/ 100</span></span>
                    <span className="text-[10px] text-[#00F0FF] font-bold">140ms</span>
                  </div>
                  <div className="mt-1 pt-1 border-t border-[#1E293B]/70 text-[9px] text-[#00F0FF] flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>✓ Verificado PageSpeed</span>
                  </div>
                </div>

                {/* Card 2: Conversión Reservas */}
                <div className="p-3 rounded-xl bg-gradient-to-b from-[#0C152B] to-[#080E1E] border border-[#1E293B] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F0FF] to-[#F5A623]" />
                  <div className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                    {language === 'fr' ? 'CONVERSION DIRECTE' : language === 'en' ? 'BOOKING LIFT' : 'CONVERSIÓN RESERVAS'}
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl sm:text-2xl font-black text-[#FFDE6A] glow-gold-text">+140%</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#162B28] text-[#10B981] border border-[#10B981]/30">24/7</span>
                  </div>
                  <div className="mt-1 pt-1 border-t border-[#1E293B]/70 text-[9px] text-[#F5A623] flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>✓ Casos de éxito</span>
                  </div>
                </div>
              </div>

              {/* 5. Bottom Threat Protocol Bar */}
              <div className="px-4 py-2.5 bg-[#091122] border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <Shield className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                  Threat Detection Protocol
                  <span className="text-[9px] text-[#787678] hidden sm:inline">[AES-256]</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981] text-[#10B981] font-bold text-[10px] tracking-wider">
                  100% PROTEGIDO
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

