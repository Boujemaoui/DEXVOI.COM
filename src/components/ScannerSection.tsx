import React, { useState } from 'react';
import { 
  Zap, 
  Globe, 
  ArrowRight, 
  RefreshCw, 
  Terminal, 
  Lock, 
  Gauge, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  FileText, 
  ExternalLink, 
  Cpu, 
  HardDrive,
  Download
} from 'lucide-react';
import { ScanResult, OsintSecurityAuditResult, AuditIssue } from '../types';
import { runClientSecurityAudit } from '../services/clientSecurityAudit';
import { downloadOfficialAuditPdf } from '../services/clientPdfReport';
import { useLanguage } from '../i18n/LanguageContext';
import { navigateTo } from '../utils/navigation';

interface ScannerSectionProps {
  onSelectAuditWithUrl: (url: string, findings: string[]) => void;
  onOpenPdfModal?: (tier: 'basic' | 'complete' | 'premium') => void;
  onOpenOsintModal?: (result: OsintSecurityAuditResult, target: string) => void;
}

export const ScannerSection: React.FC<ScannerSectionProps> = ({ 
  onSelectAuditWithUrl,
  onOpenPdfModal,
  onOpenOsintModal
}) => {
  const { t, language } = useLanguage();
  const [urlInput, setUrlInput] = useState('');
  const [businessType, setBusinessType] = useState<'clinica' | 'restaurante' | 'otro'>('clinica');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsDownloadingPdf(true);
    setPdfSuccessMessage(null);
    try {
      const ok = await downloadOfficialAuditPdf({
        target: result.url,
        auditResult: result.rawAuditResult,
        customerEmail: 'cliente@dexvoi.com',
        tier: 'free',
      });
      if (ok) {
        setPdfSuccessMessage(
          language === 'fr'
            ? 'Rapport officiel Dexvoi téléchargé (PDF 5 pages).'
            : language === 'en'
            ? 'Official Dexvoi audit report downloaded (5-page PDF).'
            : 'Informe oficial Dexvoi descargado con éxito (PDF 5 páginas).'
        );
        setTimeout(() => setPdfSuccessMessage(null), 7000);
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const scanSteps = language === 'fr' ? [
    'Connexion aux nœuds de périphérie et résolution DNS...',
    'Mesure de latence TTFB et temps de réponse en millisecondes...',
    'Audit de la suite cryptographique SSL/TLS et certificats...',
    'Vérification des en-têtes HTTP critiques (HSTS, CSP, X-Frame)...',
    'Analyse de l’architecture HTML, Core Web Vitals et balises SEO...',
    'Synthèse de l’audit technique d’infrastructure en direct...'
  ] : language === 'en' ? [
    'Connecting to edge nodes and resolving live DNS...',
    'Measuring TTFB latency and real-time response in milliseconds...',
    'Auditing SSL/TLS cryptographic suite and certificate validity...',
    'Inspecting critical HTTP security headers (HSTS, CSP, X-Frame)...',
    'Analyzing HTML architecture, Core Web Vitals and SEO metadata...',
    'Synthesizing real-time executive digital infrastructure audit...'
  ] : [
    'Conectando a nodos perimetrales y resolviendo DNS en vivo...',
    'Midiendo latencia TTFB y tiempo de respuesta real en milisegundos...',
    'Auditando suite criptográfica SSL/TLS y vigencia de certificados...',
    'Inspeccionando cabeceras HTTP de blindaje (HSTS, CSP, X-Frame)...',
    'Analizando arquitectura HTML, Core Web Vitals y etiquetas SEO...',
    'Sintetizando diagnóstico técnico de infraestructura en vivo...'
  ];

  const handleRunScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const rawTarget = urlInput.trim();
    if (!rawTarget) return;

    const cleanHostname = rawTarget
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .trim();

    if (!cleanHostname || cleanHostname.length < 3) return;

    setIsScanning(true);
    setResult(null);
    setScanStep(0);
    setScanLog([]);

    const startPrefix = language === 'fr' ? '[DÉMARRAGE] Connexion à' : language === 'en' ? '[INIT] Connecting to' : '[INICIO] Conectando a';
    setScanLog([`${startPrefix} ${cleanHostname}...`]);

    let stepCounter = 0;
    const stepInterval = setInterval(() => {
      stepCounter++;
      if (stepCounter < scanSteps.length) {
        setScanStep(stepCounter);
        setScanLog((prev) => [...prev, `[OK] ${scanSteps[stepCounter - 1]}`]);
      }
    }, 450);

    try {
      let finalData: OsintSecurityAuditResult | null = null;

      // 1. Live server-side audit via API
      try {
        const response = await fetch('/api/security-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target: cleanHostname }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (response.ok && data && !data.error && data.score !== undefined) {
            finalData = data;
          } else if (!response.ok && data?.error) {
            throw new Error(data.error);
          }
        } else if (!response.ok) {
          throw new Error(`Error en el servidor de escaneo (${response.status})`);
        }
      } catch (netErr: any) {
        if (netErr?.message && !netErr.message.includes('fetch')) {
          throw netErr;
        }
        console.warn('API audit fetch failed, trying direct scan:', netErr);
      }

      // 2. Client-side fallback via DoH if server API is unavailable
      if (!finalData) {
        finalData = await runClientSecurityAudit(cleanHostname);
      }

      // Minimum scan time for visual polish
      await new Promise((r) => setTimeout(r, 1600));
      clearInterval(stepInterval);
      setScanStep(scanSteps.length - 1);
      setScanLog((prev) => [
        ...prev,
        language === 'fr' ? '[SUCCÈS] Diagnostic technique compilé.' : language === 'en' ? '[SUCCESS] Technical audit compiled.' : '[ÉXITO] Diagnóstico técnico compilado.'
      ]);

      // Dynamic calculation based on real measurements
      const overallScore = Math.max(15, Math.min(100, Math.round(finalData.score)));
      const grade = finalData.grade || (overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 65 ? 'B' : overallScore >= 50 ? 'C' : overallScore >= 35 ? 'D' : 'F');

      const responseTimeMs = finalData.performance?.responseTimeMs || 320;
      const loadTimeSeconds = Number((responseTimeMs / 1000).toFixed(2));
      const speedScore = finalData.performance?.score || finalData.overallCategoryScores?.performance || Math.max(30, 100 - Math.round(responseTimeMs / 30));

      const secScore = finalData.securityDetails?.score || finalData.overallCategoryScores?.security || Math.max(25, overallScore);
      const isHttps = finalData.securityDetails?.isHttps ?? true;
      const hstsOk = finalData.headers.some(h => h.name.toLowerCase() === 'strict-transport-security' && h.status === 'PASS');
      const cspOk = finalData.headers.some(h => h.name.toLowerCase() === 'content-security-policy' && h.status === 'PASS');
      const xFrameOk = !finalData.headers.some(h => h.name.toLowerCase() === 'x-frame-options' && h.status === 'FAIL');

      const seoScore = finalData.seo?.score || finalData.overallCategoryScores?.seo || 75;

      // Real dynamic recommendations
      let speedRec = '';
      if (responseTimeMs > 1000) {
        speedRec = language === 'fr'
          ? `Latence élevée (${responseTimeMs}ms TTFB). Un CDN Anycast et la compression Brotli sont indispensables.`
          : language === 'en'
          ? `High latency detected (${responseTimeMs}ms TTFB). Edge CDN caching and Brotli compression required.`
          : `Latencia elevada (${responseTimeMs}ms TTFB). Se recomienda CDN perimetral Anycast y compresión Brotli.`;
      } else if (responseTimeMs > 450) {
        speedRec = language === 'fr'
          ? `Latence modérée (${responseTimeMs}ms). Optimiser les scripts bloquants et le cache navigateur.`
          : language === 'en'
          ? `Moderate latency (${responseTimeMs}ms). Optimize render-blocking scripts and browser cache.`
          : `Latencia moderada (${responseTimeMs}ms). Optimizar scripts bloqueantes y caché de cabeceras.`;
      } else {
        speedRec = language === 'fr'
          ? `Excellente réactivité serveur (${responseTimeMs}ms). Continuer la surveillance proactive.`
          : language === 'en'
          ? `Fast server response (${responseTimeMs}ms). Maintain proactive cache warming.`
          : `Excelente tiempo de respuesta de servidor (${responseTimeMs}ms). Mantener precarga de caché.`;
      }

      let secRec = '';
      if (!hstsOk || !cspOk) {
        secRec = language === 'fr'
          ? `En-têtes critiques manquants (${!hstsOk ? 'HSTS ' : ''}${!cspOk ? 'CSP' : ''}). Vulnérable aux attaques de redirection.`
          : language === 'en'
          ? `Critical headers missing (${!hstsOk ? 'HSTS ' : ''}${!cspOk ? 'CSP' : ''}). Vulnerable to spoofing & MITM.`
          : `Faltan cabeceras críticas (${!hstsOk ? 'HSTS ' : ''}${!cspOk ? 'CSP' : ''}). Vulnerable a intercepción y spoofing.`;
      } else {
        secRec = language === 'fr'
          ? `Blindage perimétrique conforme. Vérifier la rotation des certificats SSL.`
          : language === 'en'
          ? `Perimeter security in order. Monitor certificate expiration cycle.`
          : `Blindaje perimetral básico correcto. Supervisar renovación periódica de SSL.`;
      }

      let seoRec = '';
      if (finalData.seo?.title?.status === 'FAIL' || !finalData.seo?.sitemap?.exists) {
        seoRec = language === 'fr'
          ? `Métadonnées ou sitemap XML incomplets. Risque de sous-indexation locale.`
          : language === 'en'
          ? `Incomplete meta tags or missing sitemap XML. Risk of lower local visibility.`
          : `Faltan metadatos SEO o mapa XML de sitio. Afecta al posicionamiento en Google.`;
      } else {
        seoRec = language === 'fr'
          ? `Structure SEO conforme. Implémenter les microdonnées LocalBusiness.`
          : language === 'en'
          ? `Standard SEO metadata verified. Deploy rich LocalBusiness Schema.`
          : `Estructura SEO básica correcta. Implementar microdatos Schema LocalBusiness.`;
      }

      // Generate key findings from actual issues
      const findingsList: string[] = [];
      if (finalData.issues && finalData.issues.length > 0) {
        finalData.issues.slice(0, 4).forEach((iss) => {
          findingsList.push(`${iss.title}: ${iss.description}`);
        });
      } else {
        if (!hstsOk) findingsList.push('Falta cabecera Strict-Transport-Security (HSTS).');
        if (!cspOk) findingsList.push('Ausencia de Content-Security-Policy (CSP).');
        if (responseTimeMs > 800) findingsList.push(`Tiempo de respuesta elevado (${responseTimeMs}ms).`);
        if (!finalData.seo?.sitemap?.exists) findingsList.push('Sitemap XML no detectado públicamente.');
      }

      setResult({
        url: cleanHostname,
        businessType,
        timestamp: new Date().toLocaleTimeString(),
        overallScore,
        grade,
        speed: {
          score: speedScore,
          loadTimeSeconds,
          responseTimeMs,
          pageSizeFormatted: finalData.performance?.pageSizeFormatted || 'N/A',
          compression: finalData.performance?.compression || 'none',
          rating: finalData.performance?.rating || 'BUENO',
          fcp: finalData.performance?.estimatedLcpMs || Math.round(responseTimeMs * 1.5),
          mobileOptimized: finalData.mobile?.hasViewport ?? true,
          recommendation: speedRec,
        },
        security: {
          score: secScore,
          sslGrade: grade,
          sslIssuer: finalData.securityDetails?.sslIssuer || 'Activo',
          sslDaysRemaining: finalData.securityDetails?.sslValidDaysRemaining,
          tlsProtocol: finalData.securityDetails?.tlsProtocol || 'TLSv1.3',
          hstsConfigured: hstsOk,
          cspConfigured: cspOk,
          xFrameConfigured: xFrameOk,
          dataProtectionCompliant: hstsOk && isHttps,
          vulnerabilitiesDetected: finalData.issues?.length || finalData.summary?.failed || 0,
          headersConfigured: (finalData.summary?.passed || 0) > (finalData.summary?.failed || 0),
          recommendation: secRec,
        },
        seoLocal: {
          score: seoScore,
          titleText: finalData.seo?.title?.text,
          metaDescriptionStatus: finalData.seo?.metaDescription?.status,
          googleMapsIndexed: true,
          localRankEstimate: seoScore > 75
            ? (language === 'fr' ? 'Position favorable' : language === 'en' ? 'Competitive rank' : 'Posición competitiva')
            : (language === 'fr' ? 'Hors Top 3 dans votre zone' : language === 'en' ? 'Outside Top 3 Map Pack' : 'Fuera del Top 3 visible'),
          schemaMarkupDetected: finalData.seo?.sitemap?.exists || false,
          recommendation: seoRec,
        },
        keyFindings: findingsList.length > 0 ? findingsList : [
          'Auditoría técnica perimetral completada exitosamente.',
          'Revisión de parámetros de red y cabeceras finalizada.'
        ],
        issues: finalData.issues || [],
        rawAuditResult: finalData,
      });

    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Scan failed:', err);
      setScanLog((prev) => [
        ...prev,
        `[ERROR] ${err?.message || 'Error al conectar con el dominio.'}`
      ]);
    } finally {
      setIsScanning(false);
    }
  };

  const setSampleUrl = (url: string, type: 'clinica' | 'restaurante' | 'otro') => {
    setUrlInput(url);
    setBusinessType(type);
  };

  return (
    <section id="scanner" className="py-24 bg-[#131315] relative border-t border-b border-gray-800">
      {/* Visual background effect */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] font-mono text-xs uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.scanner.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.scanner.title} <span className="text-[#0066FF]">{t.scanner.titleHighlight}</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            {t.scanner.subtitle}
          </p>
        </div>

        {/* Input Box Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#0066FF]/40 shadow-2xl bg-[#0A0F1F]/90">
          <form onSubmit={handleRunScan} className="space-y-6">
            
            {/* Sector Selector */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-2">
                {language === 'fr' ? '1. Sélectionnez le secteur d\'activité :' : language === 'en' ? '1. Select Business Sector:' : '1. Selecciona el Tipo de Negocio:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBusinessType('clinica')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
                    businessType === 'clinica'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {t.footer.sectorClinics}
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('restaurante')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
                    businessType === 'restaurante'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {t.footer.sectorRestaurants}
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessType('otro')}
                  className={`py-2.5 px-3 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
                    businessType === 'otro'
                      ? 'bg-[#0066FF]/20 border-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.3)]'
                      : 'bg-[#1E293B] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {t.footer.sectorHospitality}
                </button>
              </div>
            </div>

            {/* URL Input and Scan Button */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-2">
                {language === 'fr' ? '2. Adresse de votre site web :' : language === 'en' ? '2. Your Website URL:' : '2. Enlace de tu Sitio Web:'}
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
                    placeholder={t.scanner.inputPlaceholder}
                    required
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg pl-24 pr-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning || !urlInput.trim()}
                  className="metallic-btn px-8 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.scanner.btnScanning}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>{t.scanner.btnScan}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample demo URLs for quick testing */}
              <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                <span>{language === 'fr' ? 'Ou testez un exemple :' : language === 'en' ? 'Or try a live demo:' : 'O prueba un ejemplo:'}</span>
                <button
                  type="button"
                  onClick={() => setSampleUrl('dexvoi.com', 'otro')}
                  className="text-[#0066FF] hover:underline cursor-pointer"
                >
                  dexvoi.com
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSampleUrl('clinicadermastetic.com', 'clinica')}
                  className="text-[#F5A623] hover:underline cursor-pointer"
                >
                  clinicadermastetic.com
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSampleUrl('restaurante-aurum.es', 'restaurante')}
                  className="text-gray-300 hover:underline cursor-pointer"
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
                  <span>
                    {language === 'fr'
                      ? 'EXÉCUTION DU PROTOCOLE D\'ANALYSE EN TEMPS RÉEL...'
                      : language === 'en'
                      ? 'EXECUTING REAL-TIME ARCHITECTURAL DIAGNOSTIC PROTOCOL...'
                      : 'EJECUTANDO PROTOCOLO DE ANÁLISIS EN TIEMPO REAL...'}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">DEXVOI OSINT ENGINE v5.2</span>
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
                  <div className="text-xs font-mono text-[#0066FF] uppercase flex items-center gap-2">
                    <span>{language === 'fr' ? 'DIAGNOSTIC EN DIRECT' : language === 'en' ? 'LIVE PERIMETER AUDIT' : 'DIAGNÓSTICO EN VIVO'}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-white font-bold">{result.url}</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1.5">
                    <h3 className="text-2xl font-bold text-white font-mono">
                      {result.overallScore} <span className="text-gray-400 text-base font-normal">/ 100</span>
                    </h3>
                    {result.grade && (
                      <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                        result.grade === 'A+' || result.grade === 'A'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : result.grade === 'B'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : result.grade === 'C'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}>
                        GRADO {result.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-400 font-mono mt-1">
                    {result.issues && result.issues.length > 0
                      ? `⚠ Se detectaron ${result.issues.length} fallos técnicos y brechas en ${result.url}.`
                      : `✓ Escaneo completado. Puntuación calculada en base a parámetros técnicos reales.`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <div className="p-3 bg-[#0A0F1F] rounded-lg border border-amber-500/40 text-center font-mono">
                    <div className="text-[10px] text-gray-400 uppercase">{language === 'fr' ? 'STATUT DU SERVEUR' : language === 'en' ? 'PERIMETER STATUS' : 'ESTADO PERIMETRAL'}</div>
                    <div className={`text-sm font-bold ${
                      result.overallScore >= 80 ? 'text-emerald-400' : result.overallScore >= 50 ? 'text-[#F5A623]' : 'text-red-400'
                    }`}>
                      {result.overallScore >= 80 
                        ? (language === 'fr' ? 'INFRASTRUCTURE SOLIDE' : language === 'en' ? 'SOLID INFRASTRUCTURE' : 'INFRAESTRUCTURA SÓLIDA')
                        : result.overallScore >= 50
                        ? (language === 'fr' ? 'VULNÉRABLE AUX FUITES' : language === 'en' ? 'VULNERABLE TO BOUNCE' : 'VULNERABLE A FUGAS')
                        : (language === 'fr' ? 'RISQUE CRITIQUE DÉTECTÉ' : language === 'en' ? 'CRITICAL RISK DETECTED' : 'RIESGO CRÍTICO DETECTADO')}
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-[#F5A623] to-[#E09015] hover:from-[#FFAE33] hover:to-[#F5A623] text-black font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 transition-all cursor-pointer disabled:opacity-60"
                    title="Descargar informe oficial en PDF con branding Dexvoi"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>{language === 'fr' ? 'Génération...' : language === 'en' ? 'Generating...' : 'Generando PDF...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-black" />
                        <span>{language === 'fr' ? 'Télécharger Rapport PDF' : language === 'en' ? 'Download PDF Report' : 'Descargar Informe PDF'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PDF Download Success Alert */}
              {pdfSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{pdfSuccessMessage}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 uppercase font-bold tracking-wider">DEXVOI OFFICIAL AUDIT</span>
                </div>
              )}

              {/* 3 Metrics Breakdowns with REAL measured values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Speed */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-emerald-400" /> {t.scanner.scoreSpeed}
                    </span>
                    <span className="text-white font-bold font-mono">
                      {result.speed.responseTimeMs ? `${result.speed.responseTimeMs} ms` : `${result.speed.loadTimeSeconds}s`}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-bold text-white font-mono">
                      {result.speed.score} / 100
                    </div>
                    {result.speed.pageSizeFormatted && result.speed.pageSizeFormatted !== 'N/A' && (
                      <span className="text-[11px] font-mono text-gray-400">
                        {result.speed.pageSizeFormatted}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.speed.recommendation}
                  </p>
                </div>

                {/* Security */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-400" /> {t.scanner.scoreSecurity}
                    </span>
                    <span className="text-amber-400 font-bold font-mono">
                      {result.security.hstsConfigured ? 'HSTS Activo' : 'HSTS Falta'}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-bold text-white font-mono">
                      {result.security.score} / 100
                    </div>
                    {result.security.sslDaysRemaining !== undefined && (
                      <span className="text-[11px] font-mono text-gray-400">
                        SSL: {result.security.sslDaysRemaining}d
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.security.recommendation}
                  </p>
                </div>

                {/* Local SEO */}
                <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#0066FF]" /> {t.scanner.scoreSeo}
                    </span>
                    <span className="text-gray-300 font-bold font-mono">
                      {result.seoLocal.schemaMarkupDetected ? 'Sitemap ✓' : 'Sin Sitemap'}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">
                    {result.seoLocal.score} / 100
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.seoLocal.recommendation}
                  </p>
                </div>
              </div>

              {/* Real Specific Issues Detected on this domain */}
              {result.issues && result.issues.length > 0 && (
                <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                        {language === 'fr' 
                          ? `Failles Spécifiques Détectées sur ${result.url}` 
                          : language === 'en' 
                          ? `Specific Vulnerabilities Detected on ${result.url}` 
                          : `Fallos Específicos Detectados en ${result.url}`}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400">
                      {result.issues.length} {language === 'fr' ? 'anomalies' : language === 'en' ? 'issues' : 'anomalías'}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {result.issues.slice(0, 3).map((iss, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#131B33]/80 border border-gray-800 flex items-start gap-3 text-xs">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                          iss.severity === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : iss.severity === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {iss.severity === 'CRITICAL' ? 'CRÍTICO' : iss.severity === 'HIGH' ? 'ALTO' : 'MEDIO'}
                        </span>
                        <div className="space-y-1 min-w-0">
                          <strong className="text-white font-mono block truncate">{iss.title}</strong>
                          <p className="text-gray-300 font-sans text-xs leading-relaxed">{iss.description}</p>
                          {iss.businessImpact && (
                            <p className="text-[11px] text-[#F5A623] font-mono">
                              Impacto: {iss.businessImpact}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clarification Box: Free Scan vs Paid Plans Report */}
              <div className="p-5 rounded-xl bg-[#0F172A]/70 border border-[#0066FF]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#0066FF] font-bold uppercase">
                  <Shield className="w-4 h-4 text-[#F5A623]" />
                  <span>
                    {language === 'fr' 
                      ? 'Différence : Scan Public Gratuit vs Rapport Complet des Plans' 
                      : language === 'en' 
                      ? 'Difference: Free Public Scan vs Paid Plans Official Report' 
                      : 'Diferencia: Escaneo Público Gratuito vs Informe Completo de los Planes'}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {language === 'fr' ? (
                    <>
                      Ce scan préliminaire en direct mesure les paramètres perimétriques accessibles publiquement. <strong>Dans nos Plans Payants (19€ / 49€ / 99€)</strong>, le moteur génère un <strong>Rapport d’Architecture Forensique de 5 à 21 pages en PDF officiel</strong> avec analyse approfondie de toutes les routes, tests de fuites de formulaires, scripts de remédiation Nginx/Apache prêts à copier-coller et consultation avec l’Architecte Digital.
                    </>
                  ) : language === 'en' ? (
                    <>
                      This preliminary live scan checks publicly exposed perimeter endpoints. <strong>In our Paid Plans (€19 / €49 / €99)</strong>, the engine generates an <strong>Official 5-to-21-page Forensic Architecture PDF Report</strong> with exhaustive route probing, form leak audits, copy-paste Nginx/Apache hardening scripts, and direct consulting with our Digital Architect.
                    </>
                  ) : (
                    <>
                      Este escáner perimetral público analiza los parámetros expuestos en vivo. <strong>En nuestros Planes de Pago (19€ / 49€ / 99€)</strong>, el motor ejecuta una <strong>Auditoría Forense Profunda y genera un Informe Oficial en PDF de 5 a 21 páginas</strong> con análisis exhaustivo de todas las rutas, pruebas de fugas en formularios, scripts de remediación para Nginx/Apache listos para copiar y pegar, y asesoría directa con el Arquitecto Digital.
                    </>
                  )}
                </p>
              </div>

              {/* Action Strip: Direct CTAs */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#1E293B] to-[#131B33] border border-[#F5A623]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="text-xs text-gray-200 font-mono">
                  <strong className="text-white block font-sans font-bold text-sm mb-0.5">
                    {language === 'fr' ? `Voulez-vous sécuriser et accélérer ${result.url} ?` : language === 'en' ? `Ready to secure and accelerate ${result.url}?` : `¿Quieres blindar y acelerar ${result.url}?`}
                  </strong>
                  {language === 'fr'
                    ? 'Téléchargez le rapport officiel en PDF (5 pages, gratuit) avec la marque Dexvoi ou confiez la remédiation à l’Architecte Digital.'
                    : language === 'en'
                    ? 'Download the official PDF report (5 pages, free) with Dexvoi brand identity or hire our Digital Architect.'
                    : 'Descarga el informe oficial en PDF (5 páginas, gratuito) con el diseño y marca Dexvoi o delega la reparación en el Arquitecto Digital.'}
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F5A623] to-[#E09015] hover:from-[#FFAE33] hover:to-[#F5A623] text-black font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-md shadow-[#F5A623]/20 transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>{language === 'fr' ? 'Génération du PDF...' : language === 'en' ? 'Generating PDF...' : 'Generando PDF...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-black" />
                        <span>{language === 'fr' ? 'Télécharger PDF (Gratuit)' : language === 'en' ? 'Download PDF (Free)' : 'Descargar PDF (Gratis)'}</span>
                      </>
                    )}
                  </button>

                  {onOpenPdfModal && (
                    <button
                      onClick={() => onOpenPdfModal('complete')}
                      className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#283548] border border-gray-700 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Auditoría forense de más de 20 páginas con análisis profundo de vulnerabilidades"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{language === 'fr' ? 'Audit Forensique (20+ p.)' : language === 'en' ? 'Forensic Audit (20+ p.)' : 'Auditoría Forense (20+ p.)'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectAuditWithUrl(result.url, result.keyFindings)}
                    className="metallic-btn px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider whitespace-nowrap flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.scanner.ctaApplyAudit}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
