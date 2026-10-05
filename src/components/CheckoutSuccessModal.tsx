import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, FileText, RefreshCw, Mail } from 'lucide-react';
import { downloadOfficialAuditPdf } from '../services/clientPdfReport';
import { useLanguage } from '../i18n/LanguageContext';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  tier?: string;
  customerEmail?: string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  tier = 'pdf_5usd',
  customerEmail = 'cliente@dexvoi.com',
}) => {
  const { language } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const cleanTarget = targetUrl ? targetUrl.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim() : 'dexvoi.com';

  const tierMeta = {
    pdf_5usd: {
      price: '$5 USD',
      pages: '5 páginas',
      name: language === 'fr' ? 'Rapport Technique ($5 USD)' : language === 'en' ? 'Technical Report ($5 USD)' : 'Informe Técnico ($5 USD)',
      desc: '5 páginas completas con diagnóstico perimetral y Core Web Vitals.',
    },
    pdf_5eur: {
      price: '$5 USD',
      pages: '5 páginas',
      name: language === 'fr' ? 'Rapport Technique ($5 USD)' : language === 'en' ? 'Technical Report ($5 USD)' : 'Informe Técnico ($5 USD)',
      desc: '5 páginas completas con diagnóstico perimetral y Core Web Vitals.',
    },
    basic: {
      price: '$19 USD (19€)',
      pages: '5 páginas',
      name: language === 'fr' ? 'Plan Starter ($19 USD)' : language === 'en' ? 'Starter Plan ($19 USD)' : 'Plan Básico ($19 USD)',
      desc: '5 páginas completas: Core Web Vitals, SSL/TLS, cabeceras HTTP y hoja de ruta guiada.',
    },
    complete: {
      price: '$49 USD (49€)',
      pages: '20+ páginas',
      name: language === 'fr' ? 'Audit Complet Forensique ($49 USD)' : language === 'en' ? 'Comprehensive Forensic Audit ($49 USD)' : 'Auditoría Forense Completa ($49 USD)',
      desc: 'Más de 20 páginas forenses: OWASP Top 10, OSINT, latencia TTFB y scripts de blindaje Nginx/Apache.',
    },
    premium: {
      price: '$99 USD (99€)',
      pages: '25+ páginas + Sesión 1-a-1',
      name: language === 'fr' ? 'Audit Premium VIP ($99 USD)' : language === 'en' ? 'Premium VIP Audit ($99 USD)' : 'Plan Premium VIP ($99 USD)',
      desc: 'Informe forense completo de más de 20 páginas más sesión estratégica 1-a-1 de 45 min con el Arquitecto Principal.',
    }
  };

  const currentTierInfo = tierMeta[(tier as keyof typeof tierMeta)] || tierMeta.pdf_5usd;

  const triggerDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const success = await downloadOfficialAuditPdf({
        target: cleanTarget,
        tier: (tier as any) || 'pdf_5usd',
        customerEmail,
      });

      if (success) {
        setHasDownloaded(true);
      } else {
        setDownloadError(
          language === 'fr'
            ? 'Impossible de générer le fichier PDF. Veuillez cliquer sur le bouton ci-dessous.'
            : language === 'en'
            ? 'Could not generate the PDF file automatically. Please click the button below.'
            : 'No se pudo generar el archivo automáticamente. Haz clic en el botón inferior para reintentarlo.'
        );
      }
    } catch (err: any) {
      setDownloadError(err?.message || 'Error al descargar el PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !hasDownloaded) {
      const timer = setTimeout(() => {
        triggerDownload();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0D1326] border border-[#10B981]/50 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] font-mono text-xs uppercase tracking-wider font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {language === 'fr' ? `PAIEMENT CONFIRMÉ VIA STRIPE (${currentTierInfo.price})` : language === 'en' ? `PAYMENT CONFIRMED VIA STRIPE (${currentTierInfo.price})` : `PAGO CONFIRMADO VÍA STRIPE (${currentTierInfo.price})`}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
            {language === 'fr' ? 'Votre Rapport Officiel PDF est prêt' : language === 'en' ? 'Your Official PDF Report is Ready' : 'Tu Informe Oficial en PDF está listo'}
          </h3>

          <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed font-sans">
            {language === 'fr'
              ? `Nous avons compilé le diagnostic forensique (${currentTierInfo.pages}) pour le domaine :`
              : language === 'en'
              ? `We have compiled the forensic technical diagnostic (${currentTierInfo.pages}) for:`
              : `Hemos compilado el diagnóstico forense (${currentTierInfo.pages}) para el dominio:`}{' '}
            <strong className="text-[#F5A623] font-mono break-all">{cleanTarget}</strong>
          </p>

          <div className="p-4 rounded-xl bg-[#131B33] border border-[#1E293B] text-left space-y-2.5 text-xs text-gray-300 font-sans">
            <div className="flex items-center gap-2 text-white font-bold font-mono text-xs border-b border-gray-800 pb-1.5">
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Contenido del {currentTierInfo.name}:</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{currentTierInfo.desc}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Scripts de configuración defensiva para Nginx, Apache y Cloudflare.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
              <span>Copia respaldada y archivada en los servidores seguros de Dexvoi.</span>
            </div>
          </div>

          {downloadError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              {downloadError}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={triggerDownload}
              disabled={isDownloading}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#F5A623] hover:bg-[#FFAE33] active:bg-[#E09015] text-[#0A0F1F] font-sans font-bold text-sm flex items-center justify-center gap-2 border border-[#FFD074] shadow-[0_4px_15px_rgba(245,166,35,0.3)] transition-colors cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0A0F1F]" />
                  <span>Generando archivo PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#0A0F1F]" strokeWidth={2.4} />
                  <span>
                    {hasDownloaded ? `Volver a Descargar PDF (${currentTierInfo.price})` : `Descargar Informe PDF (${currentTierInfo.price})`}
                  </span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="py-3.5 px-5 rounded-xl bg-[#1E293B] hover:bg-[#2A3A52] border border-gray-700 text-gray-300 hover:text-white font-sans font-semibold text-sm transition-colors cursor-pointer"
            >
              <span>{language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : 'Cerrar'}</span>
            </button>
          </div>

          <p className="text-[11px] font-mono text-gray-400">
            {hasDownloaded
              ? '✓ Archivo PDF guardado en la carpeta de descargas de tu navegador.'
              : 'La descarga comenzará automáticamente en unos segundos.'}
          </p>
        </div>
      </div>
    </div>
  );
};
