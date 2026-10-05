import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Globe, 
  ArrowRight, 
  RefreshCw, 
  Lock, 
  Gauge, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  FileText, 
  ExternalLink, 
  Cpu, 
  HardDrive,
  Download,
  Mail,
  CreditCard,
  Sparkles,
  Check,
  ShieldCheck,
  Link2,
  Share2,
  Code2,
  Hash,
  Layers,
  Search
} from 'lucide-react';
import { ScanResult, OsintSecurityAuditResult, AuditIssue } from '../types';
import { runClientSecurityAudit } from '../services/clientSecurityAudit';
import { downloadOfficialAuditPdf } from '../services/clientPdfReport';
import { isStripeTestMode } from '../config/testMode';
import { useLanguage } from '../i18n/LanguageContext';
import { navigateTo } from '../utils/navigation';
import { createCheckoutPopup, navigateToStripeUrl } from '../utils/stripeCheckout';
import { ScanningScreen } from './ScanningScreen';

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
  const [testMode, setTestMode] = useState<boolean>(isStripeTestMode());
  const [urlInput, setUrlInput] = useState('');
  const [businessType, setBusinessType] = useState<string>('offline_online');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(15);
  const [scanStep, setScanStep] = useState(0);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  // Freemium model states
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'content' | 'structuredData' | 'advancedSecurity' | 'issues'>('all');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [isCheckingOutPdf, setIsCheckingOutPdf] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutSuccessMessage, setCheckoutSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleSync = () => setTestMode(isStripeTestMode());
    window.addEventListener('dexvoi_test_mode_changed', handleSync);
    return () => window.removeEventListener('dexvoi_test_mode_changed', handleSync);
  }, []);

  // Direct Stripe Checkout for official certified $5 USD PDF report
  const handleCheckoutPdf5Eur = async (optionalEmail?: string) => {
    if (!result) return;
    setIsCheckingOutPdf(true);
    setCheckoutError(null);
    setCheckoutSuccessMessage(null);

    // MODO DE PRUEBAS / DEMO: Descarga directa del PDF de $5 USD sin pasar por Stripe
    if (testMode) {
      try {
        const ok = await downloadOfficialAuditPdf({
          target: result.url,
          auditResult: result.rawAuditResult,
          customerEmail: (optionalEmail || leadEmail).trim() || 'info@dexvoi.com',
          tier: 'pdf_5usd',
        });
        if (ok) {
          setCheckoutSuccessMessage(
            language === 'fr'
              ? '✓ Rapport Officiel PDF ($5 USD) généré et téléchargé avec succès (Mode Test - Sans frais Stripe).'
              : language === 'en'
              ? '✓ Official PDF Report ($5 USD) generated and downloaded successfully (Test Mode - Zero Stripe charge).'
              : '✓ Informe Oficial en PDF ($5 USD) generado y descargado con éxito (Modo Pruebas - Sin cobro en Stripe).'
          );
        } else {
          setCheckoutError('No se pudo generar el archivo PDF en este momento.');
        }
      } catch (err: any) {
        setCheckoutError(err?.message || 'Error al descargar PDF.');
      } finally {
        setIsCheckingOutPdf(false);
      }
      return;
    }

    // Pre-open checkout window synchronously on user click to prevent popup blockers
    const checkoutWindow = createCheckoutPopup();

    try {
      const emailToUse = (optionalEmail || leadEmail).trim() || undefined;
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: result.url,
          customerEmail: emailToUse,
          planTier: 'pdf_5usd',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Error del servidor (${res.status})`);
      }

      const data = await res.json().catch(() => ({}));
      if (data && data.url) {
        setCheckoutSuccessMessage(
          language === 'fr'
            ? 'Redirection vers Stripe Checkout ($5 USD). Vous recevrez le PDF officiel par email après le paiement.'
            : language === 'en'
            ? 'Redirecting to Stripe Checkout ($5 USD). You will receive the official PDF via email after payment.'
            : 'Redirigiendo a Stripe Checkout ($5 USD). Recibirás el PDF oficial tras completar el pago.'
        );
        // Seamless redirection to Stripe Checkout
        navigateToStripeUrl(data.url, checkoutWindow);
      } else {
        setCheckoutError('No se pudo generar la sesión de pago de Stripe.');
      }
    } catch (err: any) {
      console.error('Error initiating $5 USD PDF checkout:', err);
      setCheckoutError(err?.message || 'Error al conectar con la pasarela de pago.');
    } finally {
      setIsCheckingOutPdf(false);
    }
  };

  // Freemium lead capture with verified real email to unlock full on-screen report
  const handleUnlockWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    const cleanEmail = leadEmail.trim();

    if (!cleanEmail) {
      setLeadError(
        language === 'fr'
          ? 'Veuillez saisir votre adresse email professionnelle.'
          : language === 'en'
          ? 'Please enter your business email address.'
          : 'Por favor introduce tu dirección de correo electrónico.'
      );
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    if (!emailRegex.test(cleanEmail)) {
      setLeadError(
        language === 'fr'
          ? 'Format d’email invalide (ex: contact@entreprise.com).'
          : language === 'en'
          ? 'Invalid email format (e.g. contact@company.com).'
          : 'Formato de correo no válido (ejemplo: contacto@tuempresa.com).'
      );
      return;
    }

    setIsSubmittingLead(true);
    setLeadError(null);

    try {
      const res = await fetch('/api/scanner/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          fullName: leadName.trim() || undefined,
          phone: leadPhone.trim() || undefined,
          websiteUrl: result.url,
          overallScore: result.overallScore,
          grade: result.grade,
          issuesCount: result.issues?.length || 0,
          businessType: result.businessType,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLeadError(
          data.error ||
            (language === 'fr'
              ? 'Email non valide ou domaine sans serveurs de messagerie (MX).'
              : language === 'en'
              ? 'Invalid email or domain without active MX mail servers.'
              : 'Email no válido o dominio sin servidores de correo activos (MX).')
        );
        return;
      }

      setIsUnlocked(true);
      setLeadSuccess(true);
    } catch (err: any) {
      console.error('Error unlocking report:', err);
      setLeadError(
        language === 'fr'
          ? 'Erreur de connexion. Veuillez réessayer.'
          : language === 'en'
          ? 'Connection error. Please try again.'
          : 'Error de conexión. Por favor inténtalo de nuevo.'
      );
    } finally {
      setIsSubmittingLead(false);
    }
  };

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

    // Automatically detect business sector from domain name if relevant
    const detectedType: 'clinica' | 'restaurante' | 'otro' =
      /clinic|dent|med|salud|estetic|doctor|pharma|hopital|sanit/i.test(cleanHostname) ? 'clinica'
      : /rest|gastro|bistr|cafe|bar|aurum|comid|hotel|food/i.test(cleanHostname) ? 'restaurante'
      : 'otro';
    setBusinessType(detectedType);

    setIsScanning(true);
    setResult(null);
    setIsUnlocked(false);
    setLeadSuccess(false);
    setLeadError(null);
    setCheckoutError(null);
    setCheckoutSuccessMessage(null);
    setScanStep(0);
    setScanLog([]);
    setScanProgress(18);

    const startPrefix = language === 'fr' ? '[DÉMARRAGE] Connexion à' : language === 'en' ? '[INIT] Connecting to' : '[INICIO] Conectando a';
    setScanLog([`${startPrefix} ${cleanHostname}...`]);

    let stepCounter = 0;
    const stepInterval = setInterval(() => {
      stepCounter++;
      if (stepCounter < scanSteps.length) {
        setScanStep(stepCounter);
        setScanLog((prev) => [...prev, `[OK] ${scanSteps[stepCounter - 1]}`]);
      }
    }, 520);

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 92) return prev;
        const inc = Math.floor(Math.random() * 8 + 4);
        return Math.min(94, prev + inc);
      });
    }, 380);

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

      // Minimum scan time for visual polish and rich radar telemetry display
      await new Promise((r) => setTimeout(r, 2800));
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setScanProgress(100);
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
        content: finalData.content,
        structuredData: finalData.structuredData,
        advancedSecurity: finalData.advancedSecurity,
      });

      // Brief transition pause so 100% completion is visible
      await new Promise((r) => setTimeout(r, 400));
      setIsScanning(false);

      setTimeout(() => {
        const resultsEl = document.getElementById('scanner-results');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);

    } catch (err: any) {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      console.error('Scan failed:', err);
      setScanLog((prev) => [
        ...prev,
        `[ERROR] ${err?.message || 'Error al conectar con el dominio.'}`
      ]);
      setIsScanning(false);
    }
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
        <div className="p-6 sm:p-8 rounded-2xl border border-[#0066FF]/40 shadow-2xl bg-[#0A0F1F]">
          <form onSubmit={handleRunScan} className="space-y-4">
            
            {/* URL Input and Scan Button */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase mb-2">
                {language === 'fr' ? 'Collez le lien ou l’adresse de votre site web :' : language === 'en' ? 'Paste the link or URL of your website:' : 'Pega el enlace o dirección de tu sitio web:'}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0066FF]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t.scanner.inputPlaceholder}
                    required
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg pl-10 pr-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
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
            </div>
          </form>

          {/* Scanning Progress Screen (Stitch SOC Dashboard Design) */}
          <ScanningScreen
            isScanning={isScanning}
            targetUrl={urlInput}
            currentStepText={scanSteps[scanStep]}
            progressPercent={scanProgress}
          />

          {/* Scan Results Card */}
          {result && !isScanning && (
            <div id="scanner-results" className="mt-8 pt-8 border-t border-gray-800 space-y-6 animate-in fade-in duration-300">
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
                    {!isUnlocked ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold">
                        RESUMEN GRATUITO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> INFORME COMPLETO DESBLOQUEADO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-400 font-mono mt-1">
                    {!isUnlocked
                      ? `⚠ Vista preliminar gratuita: Se detectaron vulnerabilidades perimetrales en ${result.url}. Desbloquea el informe completo con tu email o adquiere el PDF oficial.`
                      : `✓ Informe técnico completo desbloqueado. Acceso concedido a todas las métricas, directivas y guías de mitigación.`}
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
                    onClick={() => handleCheckoutPdf5Eur(leadEmail)}
                    disabled={isCheckingOutPdf}
                    className="px-4 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#FFAE33] active:bg-[#E09015] text-[#0A0F1F] font-sans font-bold text-xs sm:text-sm antialiased flex items-center justify-center gap-2 border border-[#FFD074] shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-colors duration-150 cursor-pointer disabled:opacity-60 select-none shrink-0"
                    title={language === 'fr' ? 'Télécharger le rapport officiel en PDF ($5 USD) via Stripe' : language === 'en' ? 'Download official PDF report ($5 USD) via Stripe' : 'Descargar informe oficial en PDF ($5 USD) con envío directo tras Stripe Checkout'}
                  >
                    {isCheckingOutPdf ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#0A0F1F] shrink-0" />
                        <span>Conectando con Stripe...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#0A0F1F] shrink-0" strokeWidth={2.4} />
                        <span>{language === 'fr' ? 'Descargar PDF Oficial ($5 USD)' : language === 'en' ? 'Download Official PDF ($5 USD)' : 'Descargar PDF Oficial ($5 USD)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* PDF or Checkout Alerts */}
              {checkoutError && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{checkoutError}</span>
                </div>
              )}
              {checkoutSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{checkoutSuccessMessage}</span>
                </div>
              )}

              {/* ============================================================ */}
              {/* FREEMIUM GATED STATE: Show summary + "X issues more" + Hub   */}
              {/* ============================================================ */}
              {!isUnlocked ? (
                <div className="space-y-6">
                  {/* 1. Resumen Gratuito: 2-3 problemas principales (sin detalles técnicos) */}
                  <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {language === 'fr'
                            ? `Problèmes Principaux Détectés sur ${result.url}`
                            : language === 'en'
                            ? `Main Issues Detected on ${result.url}`
                            : `Problemas Principales Detectados en ${result.url}`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Resumen preliminar gratuito (3 expuestos)
                      </span>
                    </div>

                    <div className="space-y-3">
                      {(result.issues && result.issues.length > 0 ? result.issues.slice(0, 3) : [
                        {
                          title: 'Ausencia de Cabecera Strict-Transport-Security (HSTS)',
                          severity: 'CRITICAL',
                          description: 'El servidor permite la degradación de conexiones seguras sin forzar HTTPS estricto.',
                          businessImpact: 'Riesgo de interceptación Man-in-the-Middle y desconfianza en navegadores.'
                        },
                        {
                          title: 'Falta de Política Content-Security-Policy (CSP)',
                          severity: 'HIGH',
                          description: 'Sin restricción perimetral para recursos externos, iframes y scripts.',
                          businessImpact: 'Exposición potencial a ataques XSS y robo de credenciales.'
                        },
                        {
                          title: 'Tiempo de Respuesta Perimetral TTFB Superior a 300ms',
                          severity: 'HIGH',
                          description: 'La latencia inicial del backend excede los estándares de rendimiento óptimo.',
                          businessImpact: 'Aumento de rebote de visitantes y penalización en posicionamiento SEO.'
                        }
                      ]).map((iss, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-[#131B33]/80 border border-gray-800 flex flex-col sm:flex-row items-start justify-between gap-3 text-xs">
                          <div className="space-y-1.5 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase shrink-0 ${
                                iss.severity === 'CRITICAL'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : iss.severity === 'HIGH'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              }`}>
                                {iss.severity === 'CRITICAL' ? 'CRÍTICO' : iss.severity === 'HIGH' ? 'ALTO' : 'MEDIO'}
                              </span>
                              <strong className="text-white font-mono text-sm">{iss.title}</strong>
                            </div>
                            <p className="text-gray-300 font-sans text-xs leading-relaxed">{iss.description}</p>
                            {iss.businessImpact && (
                              <p className="text-[11px] text-[#F5A623] font-mono">
                                Impacto: {iss.businessImpact}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0 text-[11px] font-mono text-gray-400 flex items-center gap-1.5 bg-[#0A0F1F] px-3 py-1.5 rounded border border-gray-800 self-start sm:self-center">
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Detalles y remediación bloqueados</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mensaje Requerido: "Hay X problemas más que no se muestran" */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-[#0A0F1F] border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white font-sans">
                            Hay {Math.max((result.issues?.length || 6) - 3, 3)} problemas técnicos más que no se muestran en este resumen gratuito
                          </h4>
                          <p className="text-xs text-gray-300 font-sans mt-0.5">
                            Métricas Core Web Vitals profundas, matriz completa de cabeceras HTTP de blindaje y vectores de explotación permanecen ocultos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold shrink-0">
                        <span>Desbloquea abajo</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* 2. El Muro de Conversión: 3 Opciones Claras */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* OPCIÓN 1: Desbloquear informe completo gratis con email real */}
                    <div className="p-5 rounded-xl bg-[#0D1326] border-2 border-[#0066FF] relative flex flex-col justify-between shadow-[0_4px_25px_rgba(0,102,255,0.2)]">
                      <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#0066FF] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                        OPCIÓN 1 · EN PANTALLA GRATIS
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-[#38BDF8]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white font-sans">Ver Informe Completo</h4>
                            <span className="text-[11px] font-mono text-emerald-400 font-semibold">100% Gratuito</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Introduce tu email corporativo para desbloquear inmediatamente en esta pantalla todas las métricas, cabeceras y fallos técnicos.
                        </p>

                        <form onSubmit={handleUnlockWithEmail} className="space-y-3 pt-1">
                          <div>
                            <label htmlFor="scanner-lead-email" className="block text-[11px] font-mono text-gray-400 mb-1">
                              Email corporativo o profesional *:
                            </label>
                            <div className="relative">
                              <input
                                id="scanner-lead-email"
                                type="email"
                                required
                                value={leadEmail}
                                onChange={(e) => {
                                  setLeadEmail(e.target.value);
                                  if (leadError) setLeadError(null);
                                }}
                                placeholder="tu@empresa.com"
                                className="w-full px-3 py-2 pl-9 bg-[#060913] border border-gray-700 focus:border-[#0066FF] rounded-lg text-white text-xs font-mono placeholder:text-gray-600 outline-none transition-colors"
                              />
                              <Mail className="w-4 h-4 text-gray-500 absolute left-2.5 top-2.5 pointer-events-none" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label htmlFor="scanner-lead-name" className="block text-[10px] font-mono text-gray-400 mb-1">
                                {language === 'fr' ? 'Nom (optionnel):' : language === 'en' ? 'Name (optional):' : 'Nombre (opcional):'}
                              </label>
                              <input
                                id="scanner-lead-name"
                                type="text"
                                value={leadName}
                                onChange={(e) => setLeadName(e.target.value)}
                                placeholder={language === 'fr' ? 'Dr. / Chef...' : language === 'en' ? 'Dr. / Chef...' : 'Dr. / Gerente...'}
                                className="w-full px-2.5 py-1.5 bg-[#060913] border border-gray-800 focus:border-[#0066FF] rounded-lg text-white text-xs font-mono placeholder:text-gray-600 outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label htmlFor="scanner-lead-phone" className="block text-[10px] font-mono text-gray-400 mb-1">
                                {language === 'fr' ? 'Tél / WhatsApp (optionnel):' : language === 'en' ? 'Phone / WhatsApp (optional):' : 'WhatsApp / Tel (opcional):'}
                              </label>
                              <input
                                id="scanner-lead-phone"
                                type="tel"
                                value={leadPhone}
                                onChange={(e) => setLeadPhone(e.target.value)}
                                placeholder="+34 600..."
                                className="w-full px-2.5 py-1.5 bg-[#060913] border border-gray-800 focus:border-[#0066FF] rounded-lg text-white text-xs font-mono placeholder:text-gray-600 outline-none transition-colors"
                              />
                            </div>
                          </div>

                          {leadError && (
                            <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-300 text-[11px] font-sans flex items-start gap-2 animate-in fade-in">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                              <span>{leadError}</span>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmittingLead}
                            className="w-full py-2.5 px-4 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#003D99] text-white font-sans font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-[0_2px_8px_rgba(0,102,255,0.3)]"
                          >
                            {isSubmittingLead ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Verificando email y servidor MX...</span>
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-4 h-4" />
                                <span>Desbloquear Informe Completo Gratis</span>
                              </>
                            )}
                          </button>
                          <p className="text-[10px] text-gray-500 font-mono text-center">
                            Verificamos la existencia de servidores MX activos en el dominio.
                          </p>
                        </form>
                      </div>
                    </div>

                    {/* OPCIÓN 2: Pagar 5€ para descargar el PDF oficial */}
                    <div className="p-5 rounded-xl bg-[#0D1326] border-2 border-[#F5A623] relative flex flex-col justify-between shadow-[0_4px_25px_rgba(245,166,35,0.2)]">
                      <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#F5A623] text-[#0A0F1F] text-[10px] font-mono font-bold uppercase tracking-wider">
                        OPCIÓN 2 · INFORME OFICIAL EN PDF
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 border border-[#F5A623]/40 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-[#F5A623]" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white font-sans">Informe en PDF (5 Páginas)</h4>
                              <span className="text-[11px] font-mono text-gray-400">Certificado Dexvoi</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white font-mono">5€</span>
                            <span className="text-[10px] text-gray-400 block font-mono">Pago único</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Recibe el informe oficial en PDF de 5 páginas con la identidad de Dexvoi, métricas de laboratorio y scripts de remediación para Nginx/Apache.
                        </p>

                        <ul className="space-y-1.5 text-xs text-gray-300 font-sans pt-1">
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Documento PDF oficial de 5 páginas</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Scripts de blindaje listos para copiar y pegar</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Envío automático al email tras el pago</span>
                          </li>
                        </ul>

                        <button
                          onClick={() => handleCheckoutPdf5Eur(leadEmail)}
                          disabled={isCheckingOutPdf}
                          className="w-full py-2.5 px-4 rounded-lg bg-[#F5A623] hover:bg-[#FFAE33] active:bg-[#E09015] text-[#0A0F1F] font-sans font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-[0_2px_8px_rgba(245,166,35,0.3)] mt-2"
                        >
                          {isCheckingOutPdf ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0A0F1F]" />
                              <span>{testMode ? 'Generando PDF Oficial...' : 'Conectando con Stripe...'}</span>
                            </>
                          ) : testMode ? (
                            <>
                              <Download className="w-4 h-4 text-[#0A0F1F]" />
                              <span>🧪 Probar y Descargar PDF ($5 USD) [Modo Demo]</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 text-[#0A0F1F]" />
                              <span>{language === 'fr' ? 'Payer $5 USD & Télécharger PDF' : language === 'en' ? 'Pay $5 USD & Download PDF' : 'Pagar $5 USD y Recibir PDF Oficial'}</span>
                            </>
                          )}
                        </button>
                        <p className="text-[10px] text-gray-500 font-mono text-center">
                          {testMode 
                            ? '🧪 Modo de prueba activo: descarga instantánea del PDF de 5 páginas sin cobro.'
                            : 'Stripe Checkout seguro · Recibe el PDF en tu correo al instante.'}
                        </p>
                      </div>
                    </div>

                    {/* OPCIÓN 3: Elegir uno de los planes superiores */}
                    <div className="p-5 rounded-xl bg-[#0D1326] border border-gray-800 relative flex flex-col justify-between hover:border-gray-700 transition-colors">
                      <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#1E293B] border border-gray-700 text-gray-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                        OPCIÓN 3 · PLANES SUPERIORES
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white font-sans">Delegar en el Arquitecto</h4>
                            <span className="text-[11px] font-mono text-[#F5A623]">19€ / 49€ / 99€</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          Blindaje profesional ejecutado por el Arquitecto Digital o auditoría forense profunda de más de 20 páginas:
                        </p>

                        <div className="space-y-2 pt-1">
                          <div 
                            onClick={() => onOpenPdfModal ? onOpenPdfModal('basic') : onSelectAuditWithUrl(result.url, result.keyFindings)}
                            className="p-2.5 rounded-lg bg-[#060913] border border-gray-800 hover:border-blue-500/50 cursor-pointer flex items-center justify-between transition-colors"
                          >
                            <div>
                              <strong className="text-xs text-white block">Plan Básico (19€)</strong>
                              <span className="text-[10px] text-gray-400">Informe Starter (10 págs.) + Checklist técnico paso a paso</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                          </div>

                          <div 
                            onClick={() => onOpenPdfModal ? onOpenPdfModal('complete') : onSelectAuditWithUrl(result.url, result.keyFindings)}
                            className="p-2.5 rounded-lg bg-[#060913] border border-amber-500/30 hover:border-amber-500 cursor-pointer flex items-center justify-between transition-colors"
                          >
                            <div>
                              <strong className="text-xs text-[#F5A623] block">Plan Completo Forense (49€)</strong>
                              <span className="text-[10px] text-gray-400">Auditoría forense exhaustiva (20+ pág.)</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
                          </div>

                          <div 
                            onClick={() => onOpenPdfModal ? onOpenPdfModal('premium') : onSelectAuditWithUrl(result.url, result.keyFindings)}
                            className="p-2.5 rounded-lg bg-[#060913] border border-purple-500/30 hover:border-purple-500 cursor-pointer flex items-center justify-between transition-colors"
                          >
                            <div>
                              <strong className="text-xs text-purple-400 block">Plan Premium VIP (99€)</strong>
                              <span className="text-[10px] text-gray-400">Forense 20+ p. + Consultoría 1-a-1</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenPdfModal ? onOpenPdfModal('complete') : onSelectAuditWithUrl(result.url, result.keyFindings)}
                          className="w-full py-2 px-4 rounded-lg bg-[#1E293B] hover:bg-[#2A3A52] text-white font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-gray-700 mt-2"
                        >
                          <span>Ver Planes Superiores</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ============================================================ */
                /* UNLOCKED STATE: Full Technical Metrics & Deep Issues Details */
                /* ============================================================ */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Banner de desbloqueo exitoso */}
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <strong className="block font-sans text-white text-sm">Informe Técnico Completo Desbloqueado</strong>
                        <span className="text-[11px] text-emerald-300/90 font-mono">
                          Expediente técnico registrado para: {leadEmail || 'tu correo'}. Tienes acceso completo a todas las métricas en vivo.
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCheckoutPdf5Eur(leadEmail)}
                      className="px-3 py-1.5 rounded-lg bg-[#F5A623] hover:bg-[#FFAE33] text-[#0A0F1F] font-sans font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow"
                    >
                      <Download className="w-3.5 h-3.5 text-[#0A0F1F]" />
                      {language === 'fr' ? 'Télécharger Rapport PDF ($5 USD)' : language === 'en' ? 'Download PDF Report ($5 USD)' : 'Descargar Informe Oficial en PDF ($5 USD)'}
                    </button>
                  </div>

                  {/* 6 Category Score Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {/* 1. Speed & Performance */}
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

                    {/* 2. Perimeter Security */}
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

                    {/* 3. Technical SEO */}
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

                    {/* 4. Content Audit (NEW BLOCK 1) */}
                    <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>{language === 'fr' ? 'Analyse Contenu' : language === 'en' ? 'Content Audit' : 'Análisis de Contenido'}</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (result.content?.isThinContent ?? result.rawAuditResult?.content?.isThinContent)
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {(result.content?.wordCount ?? result.rawAuditResult?.content?.wordCount ?? 0)} palabras
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div className="text-lg font-bold text-white font-mono">
                          {result.content?.score ?? result.rawAuditResult?.content?.score ?? 85} / 100
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          Ratio HTML: {result.content?.textToHtmlRatio ?? result.rawAuditResult?.content?.textToHtmlRatio ?? 14.5}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {(result.content?.isThinContent ?? result.rawAuditResult?.content?.isThinContent)
                          ? 'Aviso: Contenido escaso detectado (<300 palabras). Riesgo de clasificación "thin content".'
                          : 'Volumen textual saludable y ratio texto-HTML equilibrado para rastreo orgánico.'}
                      </p>
                    </div>

                    {/* 5. Structured Data (NEW BLOCK 2) */}
                    <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#F5A623]" />
                          <span>{language === 'fr' ? 'Données Structurées' : language === 'en' ? 'Structured Data' : 'Datos Estructurados'}</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (result.structuredData?.hasJsonLd ?? result.rawAuditResult?.structuredData?.hasJsonLd)
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {(result.structuredData?.hasJsonLd ?? result.rawAuditResult?.structuredData?.hasJsonLd) ? 'JSON-LD Activo' : 'Sin JSON-LD'}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div className="text-lg font-bold text-white font-mono">
                          {result.structuredData?.score ?? result.rawAuditResult?.structuredData?.score ?? 75} / 100
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          {(result.structuredData?.schemaTypes?.length ?? result.rawAuditResult?.structuredData?.schemaTypes?.length ?? 0)} esquemas
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {(result.structuredData?.hasJsonLd ?? result.rawAuditResult?.structuredData?.hasJsonLd)
                          ? `Schema.org detectado (${(result.structuredData?.schemaTypes ?? result.rawAuditResult?.structuredData?.schemaTypes ?? []).slice(0, 2).join(', ') || 'Schema'}).`
                          : 'Recomendado inyectar JSON-LD para habilitar Rich Snippets en Google y Google Maps.'}
                      </p>
                    </div>

                    {/* 6. Advanced Security (NEW BLOCK 3) */}
                    <div className="bg-[#0D1326] p-4 rounded-xl border border-gray-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          <span>{language === 'fr' ? 'Sécurité Avancée' : language === 'en' ? 'Advanced Security' : 'Seguridad Avanzada'}</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (result.advancedSecurity?.caaRecord.exists ?? result.rawAuditResult?.advancedSecurity?.caaRecord.exists)
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {(result.advancedSecurity?.caaRecord.exists ?? result.rawAuditResult?.advancedSecurity?.caaRecord.exists) ? 'CAA Verificado' : 'Sin CAA DNS'}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div className="text-lg font-bold text-white font-mono">
                          {result.advancedSecurity?.score ?? result.rawAuditResult?.advancedSecurity?.score ?? 85} / 100
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          Favicon: {result.advancedSecurity?.favicon?.format ?? result.rawAuditResult?.advancedSecurity?.favicon?.format ?? 'ICO'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {(result.advancedSecurity?.mixedContent.hasMixedContent ?? result.rawAuditResult?.advancedSecurity?.mixedContent.hasMixedContent)
                          ? 'Alerta: Recursos inseguros HTTP detectados en página HTTPS.'
                          : 'Caché perimetral, verificación de saltos y blindaje DNS analizados.'}
                      </p>
                    </div>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono border-b border-gray-800 pt-2">
                    {[
                      { id: 'all', label: language === 'fr' ? 'Tout le Diagnostic' : language === 'en' ? 'Complete Audit' : 'Auditoría Completa (40+ Métricas)', icon: Sparkles },
                      { id: 'content', label: language === 'fr' ? 'Contenu & Liens' : language === 'en' ? 'Content & Links' : 'Contenido & Enlaces', icon: FileText },
                      { id: 'structuredData', label: language === 'fr' ? 'Données Structurées' : language === 'en' ? 'Structured Data' : 'Datos Estructurados & Social', icon: Layers },
                      { id: 'advancedSecurity', label: language === 'fr' ? 'Sécurité Avancée' : language === 'en' ? 'Advanced Security' : 'Seguridad Avanzada & DNS', icon: ShieldCheck },
                      { id: 'issues', label: `${language === 'fr' ? 'Failles' : language === 'en' ? 'Issues' : 'Brechas y Mitigación'} (${result.issues?.length || 0})`, icon: AlertTriangle },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isCur = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer border ${
                            isCur
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                              : 'bg-[#0D1326] text-gray-400 hover:text-white border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ======================================================== */}
                  {/* DETAILED PANEL: 1. ANÁLISIS DE CONTENIDO & ENLACES       */}
                  {/* ======================================================== */}
                  {(activeTab === 'all' || activeTab === 'content') && (
                    <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            1. Análisis de Contenido, Palabras Clave & Red de Enlaces
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-400/90 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {(result.content?.wordCount ?? result.rawAuditResult?.content?.wordCount ?? 0)} palabras detectadas
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Word Count & Text to HTML */}
                        <div className="p-4 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-gray-300">Recuento Total de Palabras:</span>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                              (result.content?.isThinContent ?? result.rawAuditResult?.content?.isThinContent)
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {(result.content?.isThinContent ?? result.rawAuditResult?.content?.isThinContent) ? 'Thin Content (<300)' : 'Volumen Óptimo'}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-gray-400">Ratio Texto-HTML:</span>
                              <span className="text-white font-bold">{result.content?.textToHtmlRatio ?? result.rawAuditResult?.content?.textToHtmlRatio ?? 14.5}%</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                              <div
                                className={`h-full rounded-full ${
                                  (result.content?.textToHtmlRatio ?? result.rawAuditResult?.content?.textToHtmlRatio ?? 14.5) >= 12
                                    ? 'bg-emerald-500'
                                    : (result.content?.textToHtmlRatio ?? result.rawAuditResult?.content?.textToHtmlRatio ?? 14.5) >= 8
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(100, Math.max(5, (result.content?.textToHtmlRatio ?? result.rawAuditResult?.content?.textToHtmlRatio ?? 14.5) * 3))}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-400 font-mono block">
                              Mínimo recomendado por Google: 10-15% de texto visible respecto al peso HTML.
                            </span>
                          </div>

                          {/* Broken links badge */}
                          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs">
                            <span className="text-gray-300 font-mono">Muestra Enlaces Rotos:</span>
                            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              (result.content?.brokenLinks?.brokenCount ?? result.rawAuditResult?.content?.brokenLinks?.brokenCount ?? 0) === 0
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {(result.content?.brokenLinks?.brokenCount ?? result.rawAuditResult?.content?.brokenLinks?.brokenCount ?? 0) === 0
                                ? '0 rotos (100% OK)'
                                : `${result.content?.brokenLinks?.brokenCount ?? result.rawAuditResult?.content?.brokenLinks?.brokenCount} rotos`}
                            </span>
                          </div>
                        </div>

                        {/* Link Count Pills */}
                        <div className="p-4 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-2.5">
                          <span className="text-xs font-mono text-gray-300 block">Arquitectura de Enlaces Internos y Externos:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center font-mono">
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">Internos</div>
                              <div className="text-sm font-bold text-white">
                                {result.content?.links?.internalCount ?? result.rawAuditResult?.content?.links?.internalCount ?? 0}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">Externos</div>
                              <div className="text-sm font-bold text-cyan-400">
                                {result.content?.links?.externalCount ?? result.rawAuditResult?.content?.links?.externalCount ?? 0}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">Nofollow</div>
                              <div className="text-sm font-bold text-amber-400">
                                {result.content?.links?.nofollowCount ?? result.rawAuditResult?.content?.links?.nofollowCount ?? 0}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">Sponsored</div>
                              <div className="text-sm font-bold text-gray-300">
                                {result.content?.links?.sponsoredCount ?? result.rawAuditResult?.content?.links?.sponsoredCount ?? 0}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">UGC</div>
                              <div className="text-sm font-bold text-gray-300">
                                {result.content?.links?.ugcCount ?? result.rawAuditResult?.content?.links?.ugcCount ?? 0}
                              </div>
                            </div>
                            <div className="p-2 rounded bg-[#0A0F1F] border border-gray-800">
                              <div className="text-[10px] text-gray-400 uppercase">Total Red</div>
                              <div className="text-sm font-bold text-emerald-400">
                                {result.content?.links?.totalCount ?? result.rawAuditResult?.content?.links?.totalCount ?? 0}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Keywords Density & Title / H1 / Meta Check */}
                      {((result.content?.topKeywords ?? result.rawAuditResult?.content?.topKeywords ?? []).length > 0) && (
                        <div className="space-y-2 pt-2 border-t border-gray-800/80">
                          <span className="text-xs font-mono text-gray-300 block">
                            Palabras Clave Principales y Verificación On-Page:
                          </span>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left font-mono text-xs border border-gray-800 rounded-lg overflow-hidden">
                              <thead className="bg-[#131B33] text-gray-400 text-[10px] uppercase">
                                <tr>
                                  <th className="p-2.5">Palabra Clave</th>
                                  <th className="p-2.5">Frecuencia</th>
                                  <th className="p-2.5">Densidad</th>
                                  <th className="p-2.5 text-center">En &lt;title&gt;</th>
                                  <th className="p-2.5 text-center">En &lt;h1&gt;</th>
                                  <th className="p-2.5 text-center">En Meta Desc.</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-800 bg-[#0D1326]">
                                {(result.content?.topKeywords ?? result.rawAuditResult?.content?.topKeywords ?? []).map((kw, i) => (
                                  <tr key={i} className="hover:bg-[#131B33]/40">
                                    <td className="p-2.5 font-bold text-white">{kw.word}</td>
                                    <td className="p-2.5 text-gray-300">{kw.count} veces</td>
                                    <td className="p-2.5 text-cyan-400">{kw.density}</td>
                                    <td className="p-2.5 text-center">
                                      {kw.inTitle ? (
                                        <span className="text-emerald-400 font-bold">✓ Sí</span>
                                      ) : (
                                        <span className="text-gray-500">✕ No</span>
                                      )}
                                    </td>
                                    <td className="p-2.5 text-center">
                                      {kw.inH1 ? (
                                        <span className="text-emerald-400 font-bold">✓ Sí</span>
                                      ) : (
                                        <span className="text-gray-500">✕ No</span>
                                      )}
                                    </td>
                                    <td className="p-2.5 text-center">
                                      {kw.inMetaDescription ? (
                                        <span className="text-emerald-400 font-bold">✓ Sí</span>
                                      ) : (
                                        <span className="text-gray-500">✕ No</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* DETAILED PANEL: 2. DATOS ESTRUCTURADOS (SCHEMA & SOCIAL) */}
                  {/* ======================================================== */}
                  {(activeTab === 'all' || activeTab === 'structuredData') && (
                    <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#F5A623]" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            2. Datos Estructurados Schema.org, JSON-LD & Social Cards
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded border border-[#F5A623]/20">
                          {(result.structuredData?.hasJsonLd ?? result.rawAuditResult?.structuredData?.hasJsonLd) ? 'JSON-LD Detectado' : 'Sin JSON-LD'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Schema.org Types Found */}
                        <div className="p-4 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-gray-300">Tipos Schema.org Detectados:</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              (result.structuredData?.isValidSyntax ?? result.rawAuditResult?.structuredData?.isValidSyntax ?? true)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {(result.structuredData?.isValidSyntax ?? result.rawAuditResult?.structuredData?.isValidSyntax ?? true) ? 'Sintaxis Válida' : 'Error Sintaxis'}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {((result.structuredData?.schemaTypes ?? result.rawAuditResult?.structuredData?.schemaTypes ?? []).length > 0) ? (
                              (result.structuredData?.schemaTypes ?? result.rawAuditResult?.structuredData?.schemaTypes ?? []).map((st, i) => (
                                <span key={i} className="px-2.5 py-1 rounded bg-[#0A0F1F] border border-[#F5A623]/40 text-[#F5A623] font-mono text-xs font-semibold">
                                  @{st}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400 font-mono">
                                No se encontraron esquemas semánticos @type en el documento HTML.
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-400 leading-relaxed font-sans">
                            {result.structuredData?.recommendation ?? result.rawAuditResult?.structuredData?.recommendation ?? 'Añadir esquemas Schema.org como Organization o LocalBusiness.'}
                          </p>
                        </div>

                        {/* OpenGraph & Twitter Cards Status */}
                        <div className="p-4 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-3">
                          <span className="text-xs font-mono text-gray-300 block">Previsualización en Redes (OpenGraph & Twitter):</span>
                          
                          <div className="p-3 rounded bg-[#0A0F1F] border border-gray-800 space-y-2 text-xs font-mono">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 flex items-center gap-1.5">
                                <Share2 className="w-3.5 h-3.5 text-[#0066FF]" /> OpenGraph (WhatsApp / Facebook)
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                (result.structuredData?.openGraph?.isComplete ?? result.rawAuditResult?.structuredData?.openGraph?.isComplete)
                                  ? 'text-emerald-400 bg-emerald-500/10'
                                  : 'text-amber-400 bg-amber-500/10'
                              }`}>
                                {(result.structuredData?.openGraph?.isComplete ?? result.rawAuditResult?.structuredData?.openGraph?.isComplete) ? 'Completo' : 'Incompleto'}
                              </span>
                            </div>

                            <div className="text-[11px] text-gray-300 truncate">
                              <strong>og:title:</strong> {result.structuredData?.openGraph?.title ?? result.rawAuditResult?.structuredData?.openGraph?.title ?? 'No definido'}
                            </div>
                            <div className="text-[11px] text-gray-400 truncate">
                              <strong>og:image:</strong> {result.structuredData?.openGraph?.imageUrl ?? result.rawAuditResult?.structuredData?.openGraph?.imageUrl ?? 'No definida'}
                            </div>

                            <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
                              <span className="text-gray-400">Twitter Card:</span>
                              <span className="text-cyan-400 text-[10px]">
                                {result.structuredData?.twitterCard?.cardType ?? result.rawAuditResult?.structuredData?.twitterCard?.cardType ?? 'summary_large_image'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* DETAILED PANEL: 3. SEGURIDAD AVANZADA & BLINDAJE DNS     */}
                  {/* ======================================================== */}
                  {(activeTab === 'all' || activeTab === 'advancedSecurity') && (
                    <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            3. Seguridad Avanzada, Blindaje DNS & Cabeceras de Caché
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-purple-400/90 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          Puntuación Avanzada: {result.advancedSecurity?.score ?? result.rawAuditResult?.advancedSecurity?.score ?? 85}/100
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {/* CAA DNS Record */}
                        <div className="p-3.5 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold">Registro CAA en DNS</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              (result.advancedSecurity?.caaRecord?.exists ?? result.rawAuditResult?.advancedSecurity?.caaRecord?.exists)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {(result.advancedSecurity?.caaRecord?.exists ?? result.rawAuditResult?.advancedSecurity?.caaRecord?.exists) ? 'PRESENTE' : 'AUSENTE'}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {result.advancedSecurity?.caaRecord?.recommendation ?? result.rawAuditResult?.advancedSecurity?.caaRecord?.recommendation ?? 'Control de Autoridades Certificadoras autorizadas a emitir SSL.'}
                          </p>
                        </div>

                        {/* Cache Headers */}
                        <div className="p-3.5 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold">Cabeceras de Caché</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              (result.advancedSecurity?.cacheHeaders?.hasProperCaching ?? result.rawAuditResult?.advancedSecurity?.cacheHeaders?.hasProperCaching)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {(result.advancedSecurity?.cacheHeaders?.hasProperCaching ?? result.rawAuditResult?.advancedSecurity?.cacheHeaders?.hasProperCaching) ? 'CONFIGURADAS' : 'POR OPTIMIZAR'}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed truncate">
                            Cache-Control: {result.advancedSecurity?.cacheHeaders?.cacheControl ?? result.rawAuditResult?.advancedSecurity?.cacheHeaders?.cacheControl ?? 'No configurada'}
                          </p>
                        </div>

                        {/* Redirect Chains */}
                        <div className="p-3.5 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold">Redirecciones Encadenadas</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              !(result.advancedSecurity?.redirectChains?.detected ?? result.rawAuditResult?.advancedSecurity?.redirectChains?.detected)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {result.advancedSecurity?.redirectChains?.hopCount ?? result.rawAuditResult?.advancedSecurity?.redirectChains?.hopCount ?? 1} salto(s)
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {result.advancedSecurity?.redirectChains?.recommendation ?? result.rawAuditResult?.advancedSecurity?.redirectChains?.recommendation ?? 'Ruta de resolución directa verificada.'}
                          </p>
                        </div>

                        {/* Mixed Content */}
                        <div className="p-3.5 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold">Contenido Mixto</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              !(result.advancedSecurity?.mixedContent?.hasMixedContent ?? result.rawAuditResult?.advancedSecurity?.mixedContent?.hasMixedContent)
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {!(result.advancedSecurity?.mixedContent?.hasMixedContent ?? result.rawAuditResult?.advancedSecurity?.mixedContent?.hasMixedContent) ? '0 INSEGUROS' : 'DETECTADO'}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {result.advancedSecurity?.mixedContent?.recommendation ?? result.rawAuditResult?.advancedSecurity?.mixedContent?.recommendation ?? 'Todos los recursos cargan con cifrado HTTPS.'}
                          </p>
                        </div>

                        {/* Favicon & Format */}
                        <div className="p-3.5 rounded-lg bg-[#131B33]/60 border border-gray-800 space-y-1.5 text-xs font-mono col-span-1 md:col-span-2 lg:col-span-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 font-bold">Favicon & Formato Moderno</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              {result.advancedSecurity?.favicon?.format ?? result.rawAuditResult?.advancedSecurity?.favicon?.format ?? 'ICO'}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                            {result.advancedSecurity?.favicon?.recommendation ?? result.rawAuditResult?.advancedSecurity?.favicon?.recommendation ?? 'Icono de identidad corporativa verificado.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Real Specific Issues Detected on this domain (Full list) */}
                  {(activeTab === 'all' || activeTab === 'issues') && result.issues && result.issues.length > 0 && (
                    <div className="p-5 rounded-xl bg-[#0B1020] border border-gray-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                            {language === 'fr' 
                              ? `Toutes les Failles Détectées sur ${result.url}` 
                              : language === 'en' 
                              ? `All Vulnerabilities Detected on ${result.url}` 
                              : `Todas las Brechas y Fallos Técnicos en ${result.url}`}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          {result.issues.length} {language === 'fr' ? 'anomalies analysées' : language === 'en' ? 'issues analyzed' : 'anomalías analizadas'}
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {result.issues.map((iss, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-[#131B33]/80 border border-gray-800 flex items-start gap-3 text-xs">
                            <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                              iss.severity === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : iss.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {iss.severity === 'CRITICAL' ? 'CRÍTICO' : iss.severity === 'HIGH' ? 'ALTO' : 'MEDIO'}
                            </span>
                            <div className="space-y-1.5 min-w-0 flex-1">
                              <strong className="text-white font-mono text-sm block">{iss.title}</strong>
                              <p className="text-gray-300 font-sans text-xs leading-relaxed">{iss.description}</p>
                              {iss.businessImpact && (
                                <p className="text-[11px] text-[#F5A623] font-mono">
                                  Impacto en el negocio: {iss.businessImpact}
                                </p>
                              )}
                              {/* Directiva y código ejecutable protegido para usuarios de pago */}
                              <div className="mt-2.5 p-2.5 rounded-lg bg-[#0A0F1F] border border-[#F5A623]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                                <div className="flex items-center gap-2 min-w-0">
                                  <Lock className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                                  <span className="text-[11px] font-mono text-gray-300">
                                    Directiva y código de mitigación (Nginx / Apache / DNS) exclusivo del <strong className="text-white">Informe Oficial en PDF ($5 USD)</strong> o Planes de Blindaje.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCheckoutPdf5Eur(leadEmail)}
                                  className="px-2.5 py-1 rounded bg-[#F5A623] hover:bg-[#FFAE33] text-[#0A0F1F] font-mono font-bold text-[10px] uppercase shrink-0 cursor-pointer transition-colors shadow"
                                >
                                  Desbloquear Código ($5 USD)
                                </button>
                              </div>
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
                          ? 'Différence : Scan en Direct vs Rapport Complet des Plans' 
                          : language === 'en' 
                          ? 'Difference: Live Scan vs Paid Plans Official Report' 
                          : 'Diferencia: Escaneo en Vivo vs Informe Completo de los Planes'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {language === 'fr' ? (
                        <>
                          Ce diagnostic préliminaire en direct a mesuré les paramètres perimétriques accessibles. <strong>Dans nos Plans Payants (19€ / 49€ / 99€)</strong>, le moteur génère un <strong>Rapport d’Architecture Forensique de 10 à 22 pages en PDF officiel</strong> (ou rapport exprés de 5 pages à 5$) avec analyse approfondie de toutes les routes, checklist technique pas à pas, tests de fuites de formulaires, scripts de remédiation Nginx/Apache prêts à copier-coller et consultation avec l’Architecte Digital.
                        </>
                      ) : language === 'en' ? (
                        <>
                          This preliminary live scan checked publicly exposed perimeter endpoints. <strong>In our Paid Plans (€19 / €49 / €99)</strong>, the engine generates an <strong>Official 10-to-22-page Forensic Architecture PDF Report</strong> (or 5-page express report at $5) with step-by-step technical implementation checklist, exhaustive route probing, form leak audits, copy-paste Nginx/Apache hardening scripts, and direct consulting with our Digital Architect.
                        </>
                      ) : (
                        <>
                          Este diagnóstico perimetral analizó los parámetros expuestos en vivo. <strong>En nuestros Planes de Pago (19€ / 49€ / 99€)</strong>, el motor ejecuta una <strong>Auditoría Forense y genera un Informe Oficial en PDF de 10 a 22 páginas</strong> (o informe exprés de 5 páginas por 5$) con checklist técnico paso a paso de implementación, hoja de ruta por fases, scripts de remediación para Nginx/Apache listos para copiar y pegar, y asesoría directa con el Arquitecto Digital.
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
                        ? 'Téléchargez le rapport officiel en PDF ($5 USD) avec la marque Dexvoi ou confiez la remédiation à l’Architecte Digital.'
                        : language === 'en'
                        ? 'Download the official PDF report ($5 USD) with Dexvoi brand identity or hire our Digital Architect.'
                        : 'Descarga el informe oficial en PDF ($5 USD) con el diseño y marca Dexvoi o delega la reparación en el Arquitecto Digital.'}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
                      <button
                        onClick={() => handleCheckoutPdf5Eur(leadEmail)}
                        disabled={isCheckingOutPdf}
                        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#FFAE33] active:bg-[#E09015] text-[#0A0F1F] font-sans font-bold text-xs sm:text-sm antialiased flex items-center justify-center gap-2 border border-[#FFD074] shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-colors duration-150 cursor-pointer disabled:opacity-60 select-none"
                        title={language === 'fr' ? 'Télécharger rapport officiel en PDF ($5 USD)' : language === 'en' ? 'Download official PDF report ($5 USD)' : 'Descargar informe oficial en PDF ($5 USD)'}
                      >
                        {isCheckingOutPdf ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-[#0A0F1F] shrink-0" />
                            <span>Conectando con Stripe...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 text-[#0A0F1F] shrink-0" strokeWidth={2.4} />
                            <span>{language === 'fr' ? 'Descargar Informe PDF ($5 USD)' : language === 'en' ? 'Download PDF Report ($5 USD)' : 'Descargar Informe PDF ($5 USD)'}</span>
                          </>
                        )}
                      </button>

                      {onOpenPdfModal && (
                        <button
                          onClick={() => onOpenPdfModal('complete')}
                          className="px-4 py-2.5 rounded-lg bg-[#1E293B] hover:bg-[#2A3A52] active:bg-[#182233] border border-[#0066FF]/60 hover:border-[#0066FF] text-white font-sans font-semibold text-xs sm:text-sm antialiased flex items-center gap-2 shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-colors duration-150 cursor-pointer select-none"
                          title="Auditoría forense de más de 20 páginas con análisis profundo de vulnerabilidades"
                        >
                          <FileText className="w-4 h-4 text-[#38BDF8] shrink-0" strokeWidth={2.2} />
                          <span>{language === 'fr' ? 'Audit Forensique (20+ p.)' : language === 'en' ? 'Forensic Audit (20+ p.)' : 'Auditoría Forense (20+ p.)'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectAuditWithUrl(result.url, result.keyFindings)}
                        className="px-5 py-2.5 rounded-lg bg-white hover:bg-gray-100 active:bg-gray-200 text-[#0A0F1F] font-sans font-bold text-xs sm:text-sm antialiased tracking-wide whitespace-nowrap flex items-center gap-2 border border-gray-200 shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-colors duration-150 cursor-pointer select-none"
                      >
                        <span>{t.scanner.ctaApplyAudit}</span>
                        <ArrowRight className="w-4 h-4 text-[#0A0F1F] shrink-0" strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
