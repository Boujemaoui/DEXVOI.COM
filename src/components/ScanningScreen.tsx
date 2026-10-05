import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Shield
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ScanningScreenProps {
  isScanning: boolean;
  targetUrl: string;
  currentStepText?: string;
  progressPercent?: number;
}

export const ScanningScreen: React.FC<ScanningScreenProps> = ({
  isScanning,
  targetUrl,
  currentStepText,
  progressPercent = 68,
}) => {
  const { language } = useLanguage();
  const [latency, setLatency] = useState(14);
  const [displayProgress, setDisplayProgress] = useState(progressPercent);

  // Keep progress smoothly advancing
  useEffect(() => {
    setDisplayProgress(progressPercent);
  }, [progressPercent]);

  // Live latency and micro-progress animation
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      // Subtle realistic ping jitter (11ms - 17ms)
      setLatency(Math.floor(11 + Math.random() * 7));
    }, 1100);

    return () => clearInterval(interval);
  }, [isScanning]);

  if (!isScanning) return null;

  const normalizedTarget = targetUrl
    ? (targetUrl.startsWith('http') ? targetUrl : `HTTPS://${targetUrl}`).toUpperCase()
    : 'HTTPS://WWW.DEXVOI.COM';

  const defaultStepLabel = language === 'fr'
    ? 'ANALYSE DE VULNERABILITÉS & ARCHITECTURE EN COURS'
    : language === 'en'
    ? 'VULNERABILITY & ARCHITECTURAL SCANNING IN PROGRESS'
    : 'ANÁLISIS DE VULNERABILIDADES & ARQUITECTURA';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto cyber-bg flex items-center justify-center p-3 md:p-6 lg:p-8 backdrop-blur-md animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Escaneo en Proceso"
    >
      {/* SOC DASHBOARD MAIN CONTAINER (1200 x 800 adaptable window) */}
      <div className="w-full max-w-[1200px] min-h-[760px] bg-[#070C18]/95 border border-[#1E293B] rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden backdrop-blur-md my-auto">
        
        {/* Top Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5A623] to-transparent opacity-80 pointer-events-none" />
        
        {/* Ambient Corner Watermarks */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#00F0FF]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#F5A623]/5 blur-3xl pointer-events-none" />

        {/* ========================================== */}
        {/* 1. BARRA SUPERIOR (Terminal Header & Armed) */}
        {/* ========================================== */}
        <header className="px-4 sm:px-5 py-3.5 bg-[#0B1325]/90 border-b border-[#1E293B] flex items-center justify-between z-20 shrink-0">
          
          {/* Izquierda: Tres círculos (rojo, amarillo, verde) & terminal icon */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
              <span className="w-3 h-3 rounded-full bg-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.7)]" />
              <span className="w-3 h-3 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-3 border-l border-[#1E293B]">
              <span className="text-[11px] font-mono text-[#787678] tracking-widest uppercase">NODE: 01_PARIS_CORE</span>
            </div>
          </div>

          {/* Centro: "DEXVOI_CORE_DEFENSE_V4.exe" */}
          <div className="flex items-center gap-2">
            <span className="hidden xs:inline-block px-2 py-0.5 rounded bg-[#101C38] border border-[#1E293B] text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider font-semibold">
              SEC-PROTOCOL
            </span>
            <h1 className="text-xs sm:text-sm md:text-base font-mono font-bold text-white tracking-widest flex items-center gap-1.5">
              <span className="text-white">DEXVOI_CORE</span>
              <span className="text-[#F5A623]">_DEFENSE_V4.exe</span>
            </h1>
          </div>

          {/* Derecha: Badge dorado "SHIELD: ARMED" & Branding Dexvoi */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center text-xs tracking-wider pr-2 font-mono">
              <span className="font-black text-white">DEX</span>
              <span className="font-black text-[#F5A623]">VOI</span>
            </div>
            <div className="px-2.5 sm:px-3 py-1 rounded-md bg-[#F5A623]/10 border border-[#F5A623]/80 shadow-[0_0_12px_rgba(245,166,35,0.25)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#F5A623] tracking-widest whitespace-nowrap">
                SHIELD: ARMED
              </span>
            </div>
          </div>
        </header>

        {/* ========================================== */}
        {/* LIVE TELEMETRY SUB-BAR / SCANNING STATUS   */}
        {/* ========================================== */}
        <div className="px-4 sm:px-5 py-2 bg-[#091020]/80 border-b border-[#1E293B]/70 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#787678] z-10 gap-2 shrink-0">
          <div className="flex items-center gap-3 truncate max-w-full">
            <span className="text-[#00F0FF] flex items-center gap-1 shrink-0">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              DIAGNOSTIC_SUITE: <span className="text-white font-semibold">ACTIVE</span>
            </span>
            <span className="hidden sm:inline text-[#1E293B]">|</span>
            <span className="truncate">
              TARGET: <span className="text-[#FFDE6A] font-semibold">{normalizedTarget}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="animate-blink text-[#F5A623] font-bold tracking-wider">● SCANNING REAL-TIME...</span>
              <span className="text-white font-bold">{Math.round(displayProgress)}%</span>
            </div>
            <span className="text-[#787678] hidden xs:inline">
              LATENCY: <span className="text-[#00F0FF] font-semibold">{latency}ms</span>
            </span>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. CENTRO (El Núcleo del Escaneo)          */}
        {/* ========================================== */}
        <main className="flex-1 flex flex-col items-center justify-center relative p-4 sm:p-6 md:p-8 min-h-[360px] overflow-hidden">

          {/* Scan Beam Background Line Sweep */}
          <div className="absolute inset-x-12 h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/40 to-transparent scan-laser pointer-events-none" />

          {/* RADAR & ORBITAL CONTAINER (Relative Stage) */}
          <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] flex items-center justify-center">

            {/* Outer Circuit Coordinate Ring */}
            <div className="absolute inset-0 rounded-full border border-[#1E293B] opacity-60 pointer-events-none" />

            {/* Rotating Ring 1: Clockwise Outer Amber Dashes with Nodes */}
            <div className="absolute inset-2 sm:inset-4 rounded-full border-2 border-dashed border-[#F5A623]/30 animate-spin-slow pointer-events-none">
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#F5A623] shadow-[0_0_10px_#F5A623]" />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F5A623]" />
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F0FF]" />
            </div>

            {/* Rotating Ring 2: Counter-Clockwise Cyan Technical Arc */}
            <div className="absolute inset-8 sm:inset-12 rounded-full border border-dashed border-[#00F0FF]/40 animate-spin-reverse-slow pointer-events-none">
              <span className="absolute top-4 right-12 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-[#FFDE6A] shadow-[0_0_8px_#FFDE6A]" />
            </div>

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#1E293B] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#1E293B] to-transparent pointer-events-none" />

            {/* Micro Tech Angle Calibration Markers */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#787678] tracking-widest pointer-events-none">
              000° RADIAL
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#787678] tracking-widest pointer-events-none">
              180° PERIMETER
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-mono text-[#787678] tracking-widest pointer-events-none">
              270° INGRESS
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-mono text-[#787678] tracking-widest pointer-events-none">
              090° EGRESS
            </div>

            {/* ============================================== */}
            {/* CORE CENTRAL POD: ESCUDO & BLINDAJE ACTIVO     */}
            {/* ============================================== */}
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-3xl bg-gradient-to-br from-[#0F1B38] via-[#091224] to-[#050A14] border-2 border-[#F5A623]/80 animate-pulse-core flex flex-col items-center justify-center p-3 sm:p-4 text-center z-10 backdrop-blur-xl shadow-2xl">

              {/* Glowing Technical Shield Icon (SVG) */}
              <div className="relative w-12 h-14 sm:w-16 sm:h-18 mb-2 flex items-center justify-center">
                {/* Ambient Glow Behind Shield */}
                <div className="absolute inset-0 bg-[#F5A623]/30 blur-md rounded-full pointer-events-none" />
                
                <svg className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(245,166,35,0.7)]" viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Shield Contour */}
                  <path 
                    d="M32 2L6 14V34C6 54 18 67 32 72C46 67 58 54 58 34V14L32 2Z" 
                    fill="url(#stitchShieldInnerGrad)" 
                    stroke="url(#stitchShieldGoldStroke)" 
                    strokeWidth="3" 
                    strokeLinejoin="round" 
                  />
                  
                  {/* High-Tech Circuit Trace Inside */}
                  <path 
                    d="M32 18V28M24 36H40M32 28L24 36M32 28L40 36M32 46V56" 
                    stroke="#FFDE6A" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                  <circle cx="32" cy="18" r="2.5" fill="#FFDE6A" />
                  <circle cx="24" cy="36" r="2" fill="#00F0FF" />
                  <circle cx="40" cy="36" r="2" fill="#00F0FF" />

                  {/* Padlock Keyhole Accent */}
                  <circle cx="32" cy="45" r="3" fill="#F5A623" />
                  <path d="M30 46L34 46L33 53L31 53Z" fill="#F5A623" />

                  <defs>
                    <linearGradient id="stitchShieldInnerGrad" x1="32" y1="2" x2="32" y2="72" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#14244D" />
                      <stop offset="1" stopColor="#080F21" />
                    </linearGradient>
                    <linearGradient id="stitchShieldGoldStroke" x1="6" y1="2" x2="58" y2="72" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFDE6A" />
                      <stop offset="0.5" stopColor="#F5A623" />
                      <stop offset="1" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Central Core Text Requirements */}
              <div className="space-y-0.5 z-10">
                <h2 className="text-sm sm:text-base font-extrabold tracking-wider text-white font-mono glow-gold-text">
                  BLINDAJE ACTIVO
                </h2>
                <p className="text-[9px] sm:text-[10.5px] font-mono font-semibold tracking-widest text-[#94A3B8]">
                  MONITOREO CONTINUO
                </p>
              </div>

              {/* Interactive Live Pulse Indicator */}
              <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#11203F] border border-[#1E293B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
                <span className="text-[9px] font-mono text-[#00F0FF] uppercase tracking-wider">DEFENSE: 100%</span>
              </div>
            </div>

            {/* ============================================== */}
            {/* BADGES FLOTANTES CON DATOS (Posiciones precisas)*/}
            {/* "SSL A+", "Maps #1", "0.8s", "99.99%"          */}
            {/* ============================================== */}

            {/* 1. BADGE TOP: "SSL A+" */}
            <div className="absolute -top-3 sm:top-2 left-1/2 -translate-x-1/2 float-b1 z-20">
              <div className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#0C162E]/95 border border-[#00F0FF]/70 shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-2 backdrop-blur-md">
                <Lock className="w-3.5 h-3.5 text-[#00F0FF]" />
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-mono text-[#94A3B8] font-bold">PROTOCOL:</span>
                  <span className="text-xs font-mono font-extrabold text-[#00F0FF] tracking-wider">SSL A+</span>
                </div>
              </div>
            </div>

            {/* 2. BADGE LEFT: "Maps #1" */}
            <div className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 float-b2 z-20">
              <div className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#0C162E]/95 border border-[#F5A623]/70 shadow-[0_0_15px_rgba(245,166,35,0.25)] flex items-center gap-2 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-[#94A3B8] uppercase">LOCAL SEO</span>
                  <span className="text-xs font-mono font-extrabold text-[#FFDE6A] tracking-wider">Maps #1</span>
                </div>
              </div>
            </div>

            {/* 3. BADGE RIGHT: "99.99%" (Uptime) */}
            <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 float-b1 z-20">
              <div className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#0C162E]/95 border border-[#10B981]/70 shadow-[0_0_15px_rgba(16,185,129,0.25)] flex items-center gap-2 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono text-[#94A3B8] uppercase">UPTIME SLA</span>
                  <span className="text-xs font-mono font-extrabold text-white tracking-wider">99.99%</span>
                </div>
              </div>
            </div>

            {/* 4. BADGE BOTTOM: "0.8s" (Velocidad de Carga) */}
            <div className="absolute -bottom-3 sm:bottom-2 left-1/2 -translate-x-1/2 float-b2 z-20">
              <div className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#0C162E]/95 border border-[#F5A623]/70 shadow-[0_0_15px_rgba(245,166,35,0.25)] flex items-center gap-2 backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-mono text-[#94A3B8] font-bold">LOAD TIME:</span>
                  <span className="text-xs font-mono font-extrabold text-[#F5A623] tracking-wider">0.8s</span>
                </div>
              </div>
            </div>

          </div>

          {/* Live Dynamic Progress Bar (Gold Filling) */}
          <div className="w-full max-w-md mt-6 px-4 z-10">
            <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
              <span className="text-[#94A3B8] tracking-widest flex items-center gap-1.5 truncate pr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] shrink-0" />
                <span className="truncate">{currentStepText || defaultStepLabel}</span>
              </span>
              <span className="text-[#FFDE6A] font-bold shrink-0">{Math.round(displayProgress)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#101A30] border border-[#1E293B] overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#F5A623] via-[#FFDE6A] to-[#F5A623] gold-progress-bar shadow-[0_0_12px_#F5A623]" 
                style={{ width: `${Math.max(8, Math.min(100, displayProgress))}%` }} 
              />
            </div>
          </div>
        </main>

        {/* ========================================== */}
        {/* 3. ABAJO (Panel de Métricas & Threat Bar)   */}
        {/* ========================================== */}
        <footer className="p-4 sm:p-5 md:p-6 bg-[#070C18] border-t border-[#1E293B] z-10 space-y-3.5 shrink-0">
          
          {/* DOS TARJETAS DE TELEMETRÍA (Alto RendIMIENTO & Conversión) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CARD 1: ALTO RENDIMIENTO */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0C152B] to-[#080E1E] border border-[#1E293B] hover:border-[#F5A623]/50 transition-colors shadow-lg relative overflow-hidden group">
              {/* Left Gold Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5A623]" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#94A3B8] tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                  ALTO RENDIMIENTO
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101F3D] text-[#00F0FF] border border-[#1E293B]">
                  SPEED INDEX: OPTIMAL
                </span>
              </div>

              <div className="flex items-baseline justify-between py-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight glow-gold-text">99</span>
                  <span className="text-lg font-bold text-[#787678]">/ 100</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#787678] block">SERVER RESPOND</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#00F0FF]">TTFB: 140ms</span>
                </div>
              </div>

              {/* Bottom check: Verificado por PageSpeed */}
              <div className="mt-2.5 pt-2 border-t border-[#1E293B]/70 flex items-center gap-1.5 text-xs font-mono text-[#00F0FF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-medium tracking-wide">✓ Verificado por PageSpeed</span>
              </div>
            </div>

            {/* CARD 2: CONVERSIÓN RESERVAS */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0C152B] to-[#080E1E] border border-[#1E293B] hover:border-[#F5A623]/50 transition-colors shadow-lg relative overflow-hidden group">
              {/* Left Cyan/Gold Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F0FF] to-[#F5A623]" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-[#94A3B8] tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  CONVERSIÓN RESERVAS
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162B28] text-[#10B981] border border-[#10B981]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  24/7 Auto
                </span>
              </div>

              <div className="flex items-baseline justify-between py-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#FFDE6A] tracking-tight glow-gold-text">+140%</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#787678] block">ESTRATEGIA DIGITAL</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">Crecimiento Orgánico</span>
                </div>
              </div>

              {/* Bottom check: Media en casos de éxito */}
              <div className="mt-2.5 pt-2 border-t border-[#1E293B]/70 flex items-center gap-1.5 text-xs font-mono text-[#F5A623]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="font-medium tracking-wide">✓ Media en casos de éxito</span>
              </div>
            </div>

          </div>

          {/* BARRA INFERIOR DE PROTOCOLO: Threat Detection Protocol · 100% PROTEGIDO */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#091122] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3 shadow-inner">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0F1E38] border border-[#1E293B] flex items-center justify-center text-[#00F0FF]">
                <Shield className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                    Threat Detection Protocol
                  </span>
                  <span className="text-[10px] font-mono text-[#787678] hidden sm:inline">[AES-256 GCM]</span>
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  Cero brechas detectadas · Protección perimetral de grado militar
                </span>
              </div>
            </div>

            {/* 100% PROTEGIDO Badge */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 sm:px-4 py-1.5 rounded-lg bg-[#10B981]/15 border border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs sm:text-sm font-mono font-black text-white tracking-widest whitespace-nowrap">
                  100% PROTEGIDO
                </span>
              </div>
            </div>

          </div>

          {/* Legal / Terminal Command Footnote */}
          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#4B5563] pt-1 gap-2">
            <span>DEXVOI ARCHITECTURE &amp; CYBERSECURITY SYSTEMS © 2025</span>
            <span className="text-[#787678]">
              COMMAND: <span className="text-[#F5A623]">./dexvoi-scan --continuous --deep-audit</span>
            </span>
          </div>

        </footer>

      </div>
    </div>
  );
};
