import React, { useState, useEffect } from 'react';
import { Zap, ShieldAlert, ShieldCheck, Globe, Search, ArrowRight, RefreshCw, Terminal, CheckCircle, AlertTriangle, Lock, Gauge } from 'lucide-react';
import { ScanResult } from '../types';

interface ScannerSectionProps {
  onSelectAuditWithUrl: (url: string, findings: string[]) => void;
}

export const ScannerSection: React.FC<ScannerSectionProps> = ({ onSelectAuditWithUrl }) => {
  const [urlInput, setUrlInput] = useState('');
  const [businessType, setBusinessType] = useState<'clinica' | 'restaurante' | 'otro'>('clinica');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [result, setResult] = useState<ScanResult | null>(null);

  const scanSteps = [
    'Conectando a nodos perimetrales y resolviendo DNS...',
    'Midiendo First Contentful Paint (FCP) y carga en dispositivos móviles...',
    'Auditando suite de cifrado SSL/TLS y cabeceras HTTP de seguridad...',
    'Comprobando indexación local en Google Maps y esquema de negocio...',
    'Evaluando formularios de captura y políticas de protección de datos...',
    'Generando diagnóstico ejecutivo de arquitectura...'
  ];

  const handleRunScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setIsScanning(true);
    setResult(null);
    setScanStep(0);
    setScanLog([]);

    // Step 0
    setScanLog([`[INICIO] Conectando a ${urlInput.trim()}...`]);

    let stepCounter = 0;
    const interval = setInterval(() => {
      stepCounter++;
      if (stepCounter < scanSteps.length) {
        setScanStep(stepCounter);
        setScanLog((prev) => [...prev, `[OK] ${scanSteps[stepCounter - 1]}`]);
      } else {
        clearInterval(interval);
        generateMockResults();
        setIsScanning(false);
      }
    }, 900);
  };

  const generateMockResults = () => {
    const cleanUrl = urlInput.trim().replace(/^https?:\/\//, '');
    const isMed = businessType === 'clinica';

    const findings = [
      'Tiempo de carga superior a 3.4 segundos en redes 4G (riesgo de fuga de visitas).',
      'Ausencia de cabeceras de seguridad estrictas (HSTS y CSP desconfigurados).',
      isMed
        ? 'El formulario de citas no cifra los datos de contacto según estándares de privacidad médica.'
        : 'Falta de marcado de menú enriquecido y sincronización débil con Google Maps.',
      'Oportunidad de superar a la competencia local optimizando el perfil de Google Business.'
    ];

    setResult({
      url: cleanUrl,
      businessType,
      timestamp: new Date().toLocaleTimeString(),
      overallScore: 58,
      speed: {
        score: 54,
        loadTimeSeconds: 3.6,
        fcp: 2400,
        mobileOptimized: false,
        recommendation: 'Optimizar compresión de imágenes, eliminar JavaScript innecesario y activar CDN perimetral.'
      },
      security: {
        score: 62,
        sslGrade: 'B',
        dataProtectionCompliant: false,
        vulnerabilitiesDetected: 3,
        headersConfigured: false,
        recommendation: 'Reforzar cabeceras de seguridad, activar firewall perimetral y blindar base de datos de pacientes/clientes.'
      },
      seoLocal: {
        score: 58,
        googleMapsIndexed: true,
        localRankEstimate: 'Posición #7 en tu zona (Fuera del Top 3 visible)',
        schemaMarkupDetected: false,
        recommendation: 'Implementar Schema LocalBusiness e integrar automatización de reseñas de 5 estrellas.'
      },
      keyFindings: findings
    });
  };

  const setSampleUrl = (url: string, type: 'clinica' | 'restaurante') => {
    setUrlInput(url);
    setBusinessType(type);
  };

  return (
    <section id="scanner" className="py-24 bg-[#131315] relative border-t border-b border-gray-800">
      {/* Visual background effect */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (Matching Copywriting from Prompt) */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] font-mono text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>HERRAMIENTA DE DIAGNÓSTICO EN VIVO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Audita la Seguridad y Velocidad de tu Web en 60 Segundos
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Ingresa el enlace de tu clínica o restaurante. Nuestro escáner de arquitectura digital analizará tu tiempo de carga, vulnerabilidades críticas y estado en Google Maps de forma confidencial.
          </p>
        </div>

        {/* Input Box Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#0066FF]/40 shadow-2xl bg-[#0A0F1F]/90">
          <form onSubmit={handleRunScan} className="space-y-6">
            
            {/* Sector Selector */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-2">
                1. Selecciona el Tipo de Negocio:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBusinessType('clinica')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all ${
                    businessType === 'clinica'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Clínica Médica / Estética
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('restaurante')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all ${
                    businessType === 'restaurante'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Restaurante / Hostelería
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('otro')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all ${
                    businessType === 'otro'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Servicio Premium
                </button>
              </div>
            </div>

            {/* URL Input and Scan Button */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-2">
                2. Enlace de tu Sitio Web:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-mono text-sm">
                    https://
                  </div>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="tuclinicaorestaurante.com"
                    required
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg pl-24 pr-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning || !urlInput.trim()}
                  className="metallic-btn px-8 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shadow-lg disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Auditando...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Escanear Mi Web Ahora</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample demo URLs for quick testing */}
              <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                <span>O prueba un ejemplo:</span>
                <button
                  type="button"
                  onClick={() => setSampleUrl('clinicadermastetic.com', 'clinica')}
                  className="text-[#0066FF] hover:underline"
                >
                  clinicadermastetic.com
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSampleUrl('restaurante-aurum.es', 'restaurante')}
                  className="text-[#F5A623] hover:underline"
                >
                  restaurante-aurum.es
                </button>
              </div>
            </div>
          </form>

          {/* Scanning Progress Terminal Screen */}
          {isScanning && (
            <div className="mt-8 bg-[#070B16] rounded-xl p-5 border border-[#0066FF]/40 font-mono text-xs text-gray-300 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800 text-[#0066FF]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>EJECUTANDO PROTOCOLO DE ANÁLISIS DE ARQUITECTURA...</span>
                </div>
                <span className="text-[10px] text-gray-500">PAQUETE v4.12</span>
              </div>

              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0066FF] to-[#F5A623] h-full transition-all duration-500"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-1.5 pt-2 max-h-36 overflow-y-auto">
                {scanLog.map((log, lIdx) => (
                  <div key={lIdx} className="text-gray-300 flex items-center gap-2">
                    <span className="text-[#0066FF]">›</span> {log}
                  </div>
                ))}
                <div className="text-[#F5A623] animate-pulse flex items-center gap-2">
                  <span className="text-[#F5A623]">›</span> {scanSteps[scanStep]}
                </div>
              </div>
            </div>
          )}

          {/* Scan Results Card */}
          {result && !isScanning && (
            <div className="mt-8 pt-8 border-t border-gray-800 space-y-6 animate-in fade-in slide-in-from-bottom duration-300">
              {/* Header with Global Score */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#131B33] border border-[#0066FF]/40">
                <div>
                  <div className="text-xs font-mono text-[#0066FF] uppercase">
                    DIAGNÓSTICO EJECUTIVO COMPLETADO · {result.url}
                  </div>
                  <h3 className="text-xl font-bold text-white font-mono mt-1">
                    Puntuación de Arquitectura: {result.overallScore} / 100
                  </h3>
                  <p className="text-xs text-amber-400 font-mono mt-1">
                    ⚠ Se detectaron 3 fugas críticas de conversión y seguridad.
                  </p>
                </div>

                <div className="p-3 bg-[#0A0F1F] rounded-lg border border-amber-500/40 text-center font-mono">
                  <div className="text-[10px] text-gray-400">ESTADO GLOBAL</div>
                  <div className="text-sm font-bold text-[#F5A623]">VULNERABLE A FUGAS</div>
                </div>
              </div>

              {/* 3 Metrics Breakdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Speed */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-red-400" /> Velocidad
                    </span>
                    <span className="text-red-400 font-bold">{result.speed.loadTimeSeconds}s</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {result.speed.score} / 100
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.speed.recommendation}
                  </p>
                </div>

                {/* Security */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-400" /> Seguridad SSL
                    </span>
                    <span className="text-amber-400 font-bold">Grado {result.security.sslGrade}</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {result.security.score} / 100
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.security.recommendation}
                  </p>
                </div>

                {/* Local SEO */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#0066FF]" /> Google Maps
                    </span>
                    <span className="text-yellow-400 font-bold">Fuera de Top 3</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {result.seoLocal.score} / 100
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.seoLocal.recommendation}
                  </p>
                </div>
              </div>

              {/* Action Strip: Contact to solve with Digital Architect */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#1E293B] to-[#131B33] border border-[#F5A623]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-200 font-mono">
                  <strong className="text-white block font-sans font-bold text-sm mb-0.5">
                    ¿Quieres blindar y acelerar {result.url}?
                  </strong>
                  El Arquitecto Digital puede reparar estas vulnerabilidades y duplicar tus reservas.
                </div>

                <button
                  onClick={() => onSelectAuditWithUrl(result.url, result.keyFindings)}
                  className="metallic-btn px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2"
                >
                  <span>Solicitar Plan de Solución con el Arquitecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
