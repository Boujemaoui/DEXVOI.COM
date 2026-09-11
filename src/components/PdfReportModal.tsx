import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Lock, ArrowRight, Download, CreditCard } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: 'basic' | 'complete' | 'premium';
}

interface ReportTier {
  name: string;
  pages: string;
  price: string;
  stripeUrl: string;
  badge?: string;
  features: string[];
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  isOpen,
  onClose,
  defaultTier = 'complete'
}) => {
  const { language } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<'basic' | 'complete' | 'premium'>(defaultTier);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const getTiers = (): Record<'basic' | 'complete' | 'premium', ReportTier> => {
    if (language === 'fr') {
      return {
        basic: {
          name: 'Rapport d’Audit Initial (5 Pages)',
          pages: '5 pages',
          price: '19€',
          stripeUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00',
          features: [
            'Analyse de vitesse Core Web Vitals (mobile & desktop)',
            'Contrôle certificat SSL & en-têtes de sécurité HTTP',
            'Audit de présence locale Google Maps',
            'Checklist d’optimisation technique immédiate'
          ]
        },
        complete: {
          name: 'Audit Technique Exhaustif (20+ Pages)',
          pages: '20+ pages',
          price: '49€',
          badge: 'RECOMMANDÉ',
          stripeUrl: 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01',
          features: [
            'Audit complet de plus de 20 pages d’analyse forensique',
            'Évaluation des vulnérabilités web & blindage défensif',
            'Audit SEO local Google Maps & benchmark concurrentiel',
            'Architecture de réservation 24/7 haute conversion',
            'Livraison immédiate en PDF par email en moins de 5 min'
          ]
        },
        premium: {
          name: 'Audit Premium + Consulting Stratégique 1-to-1',
          pages: '25+ pages + Session 1-to-1',
          price: '99€',
          badge: 'ÉLITE VIP',
          stripeUrl: 'https://buy.stripe.com/14A5kE0DA7rKgmO4MxdAk02',
          features: [
            'Tout le contenu du rapport forensique de 20+ pages',
            'Session stratégique 1-to-1 de 45 min avec un Architecte Digital',
            'Roadmap personnalisée pour doubler vos rendez-vous qualifiés',
            'Support prioritaire via WhatsApp pendant 30 jours'
          ]
        }
      };
    }

    if (language === 'en') {
      return {
        basic: {
          name: 'Starter Audit Report (5 Pages)',
          pages: '5 pages',
          price: '19€',
          stripeUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00',
          features: [
            'Core Web Vitals load speed breakdown (mobile & desktop)',
            'SSL certificate & HTTP security headers assessment',
            'Google Maps local footprint detection',
            'Priority technical remediation checklist'
          ]
        },
        complete: {
          name: 'Comprehensive Technical Audit (20+ Pages)',
          pages: '20+ pages',
          price: '49€',
          badge: 'RECOMMENDED',
          stripeUrl: 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01',
          features: [
            'In-depth 20+ page forensic technical architecture review',
            'Web vulnerability assessment & defensive hardening guide',
            'Local SEO Google Maps audit & competitor benchmarking',
            '24/7 high-converting booking flow architecture',
            'Instant PDF delivery to your inbox in under 5 minutes'
          ]
        },
        premium: {
          name: 'Premium Audit + 1-on-1 Strategic Consulting',
          pages: '25+ pages + 1-on-1 Call',
          price: '99€',
          badge: 'VIP ELITE',
          stripeUrl: 'https://buy.stripe.com/14A5kE0DA7rKgmO4MxdAk02',
          features: [
            'Everything included in the 20+ page full report',
            '45-minute 1-on-1 strategic session with a Digital Architect',
            'Custom blueprint to double qualified booking conversion',
            '30-day priority WhatsApp support with lead engineer'
          ]
        }
      };
    }

    return {
      basic: {
        name: 'Starter Audit Report (5 Pages)',
        pages: '5 páginas',
        price: '19€',
        stripeUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00',
        features: [
          'Análisis de velocidad de carga Core Web Vitals',
          'Verificación de certificado SSL y headers HTTP',
          'Detección de presencia básica en Google Maps',
          'Checklist de optimización técnica prioritaria'
        ]
      },
      complete: {
        name: 'Comprehensive Technical Audit (20+ Pages)',
        pages: '20+ páginas',
        price: '49€',
        badge: 'MÁS POPULAR / RECOMMANDÉ',
        stripeUrl: 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01',
        features: [
          'Auditoría técnica exhaustiva de más de 20 páginas',
          'Análisis de vulnerabilidades web (blindaje & ethical hacking)',
          'Auditoría SEO local Google Maps & competidores',
          'Plan de arquitectura de reservas 24/7 de alta conversión',
          'Entrega inmediata en PDF a tu email en menos de 5 minutos'
        ]
      },
      premium: {
        name: 'Premium Audit + 1-on-1 Strategic Consulting',
        pages: '25+ páginas + Llamada 1-a-1',
        price: '99€',
        badge: 'ÉLITE VIP',
        stripeUrl: 'https://buy.stripe.com/14A5kE0DA7rKgmO4MxdAk02',
        features: [
          'Todo lo del informe completo de 20+ páginas',
          'Sesión estratégica 1-a-1 de 45 minutos con Arquitecto Digital',
          'Roadmap personalizado para duplicar captación de clientes',
          'Soporte prioritario por WhatsApp durante 30 días'
        ]
      }
    };
  };

  const tiers = getTiers();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const currentTier = tiers[selectedTier];

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Cliente Checkout Stripe',
          email,
          phone: '',
          businessType: currentTier.name,
          websiteUrl: website,
          primaryConcern: `Inició pago Stripe: ${currentTier.price}`,
          type: `Stripe Checkout (${currentTier.price})`,
        }),
      });
    } catch {
      // Continue to Stripe even if background notice fails
    }

    let targetStripeUrl = currentTier.stripeUrl;
    if (email) {
      targetStripeUrl += (targetStripeUrl.includes('?') ? '&' : '?') + `prefilled_email=${encodeURIComponent(email)}`;
    }

    window.open(targetStripeUrl, '_blank', 'noopener,noreferrer');

    setIsProcessing(false);
    setIsPaid(true);
  };

  const handleDownloadSample = () => {
    const reportContent = `DEXVOI - ${language === 'fr' ? 'RAPPORT STRATÉGIQUE D’ARCHITECTURE DIGITALE' : language === 'en' ? 'STRATEGIC DIGITAL ARCHITECTURE REPORT' : 'INFORME ESTRATÉGICO DE ARQUITECTURA DIGITAL'}
==================================================================
${language === 'fr' ? 'Type' : language === 'en' ? 'Tier' : 'Tipo'}: ${tiers[selectedTier].name}
${language === 'fr' ? 'Montant' : language === 'en' ? 'Amount' : 'Precio'}: ${tiers[selectedTier].price}
${language === 'fr' ? 'Web analysé' : language === 'en' ? 'Target Web' : 'Web analizada'}: ${website || 'domain.com'}
Email: ${email}
${language === 'fr' ? 'Date' : language === 'en' ? 'Date' : 'Fecha'}: ${new Date().toLocaleDateString()}

1. ${language === 'fr' ? 'SÉCURITÉ & BLINDAGE DIGITALE (85/100)' : language === 'en' ? 'DIGITAL DEFENSIVE SECURITY (85/100)' : 'SEGURIDAD Y BLINDAJE DIGITAL (85/100)'}
- SSL: TLS 1.3
- Headers: HSTS, CSP, X-Frame-Options configured
- Anti-bot / Anti-scraping rate limiting active

2. ${language === 'fr' ? 'PERFORMANCE CORE WEB VITALS (88/100)' : language === 'en' ? 'CORE WEB VITALS SPEED (88/100)' : 'RENDIMIENTO Y VELOCIDAD CORE WEB VITALS (88/100)'}
- First Contentful Paint (FCP): 1.1s
- Largest Contentful Paint (LCP): 1.8s
- Cumulative Layout Shift (CLS): 0.02

3. ${language === 'fr' ? 'RÉFÉRENCEMENT LOCAL GOOGLE MAPS (90/100)' : language === 'en' ? 'LOCAL SEO & GOOGLE MAPS (90/100)' : 'POSICIONAMIENTO SEO LOCAL Y GOOGLE MAPS (90/100)'}
- Google Business Profile optimization
- High-intent local search ranking Top 3
- Automated 24/7 calendar conversion lift: +120%

==================================================================
DEXVOI - Madrid · Casablanca · London
Support: info@dexvoi.com | WhatsApp: +212 600-000000`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DEXVOI-AUDIT-${selectedTier.toUpperCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0D1326] border border-[#0066FF]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {isPaid ? (
          <div className="py-8 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                {language === 'fr' ? 'PAIEMENT CONFIRMÉ VIA STRIPE' : language === 'en' ? 'PAYMENT CONFIRMED VIA STRIPE' : 'PAGO CONFIRMADO VÍA STRIPE'}
              </span>
              <h3 className="text-2xl font-bold text-white font-mono">
                {language === 'fr' ? 'Votre rapport est en cours de génération' : language === 'en' ? 'Your audit report is generating' : 'Tu informe se está generando'}
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                {language === 'fr'
                  ? `Confirmation envoyée à ${email}. Vous recevrez sous 5 minutes votre rapport exhaustif de ${tiers[selectedTier].pages}.`
                  : language === 'en'
                  ? `Confirmation sent to ${email}. You will receive your detailed ${tiers[selectedTier].pages} audit within 5 minutes.`
                  : `Hemos enviado la confirmación a ${email}. En menos de 5 minutos recibirás tu informe completo de ${tiers[selectedTier].pages} con el análisis detallado.`}
              </p>
            </div>

            <div className="bg-[#131B33] border border-gray-800 rounded-xl p-4 max-w-md mx-auto text-left font-mono text-xs text-gray-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'fr' ? 'Offre :' : language === 'en' ? 'Plan:' : 'Paquete:'}</span>
                <span className="text-white font-bold">{tiers[selectedTier].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'fr' ? 'Montant :' : language === 'en' ? 'Amount:' : 'Monto:'}</span>
                <span className="text-[#F5A623] font-bold">{tiers[selectedTier].price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'fr' ? 'Plateforme :' : language === 'en' ? 'Platform:' : 'Plataforma:'}</span>
                <span className="text-emerald-400">Stripe Secure (SSL 256-bit)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadSample}
                className="metallic-btn px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#0A0F1F]" />
                <span>{language === 'fr' ? 'Télécharger la copie immédiate' : language === 'en' ? 'Download Instant Copy' : 'Descargar Copia Inmediata'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-300 hover:text-white font-mono text-xs uppercase cursor-pointer"
              >
                {language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : 'Cerrar'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#F5A623]">
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'ÉTAPE 6 : RAPPORT D’AUDIT DIGITAL EN PDF' : language === 'en' ? 'STEP 6: DIGITAL AUDIT REPORT IN PDF' : 'PASO 6: INFORME AUDITORÍA DIGITAL EN PDF'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {language === 'fr' ? 'Rapport Complet en PDF (20+ pages)' : language === 'en' ? 'Complete PDF Audit Report (20+ pages)' : 'Informe Completo en PDF (20+ páginas)'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {language === 'fr'
                  ? 'Analyse poussée de cybersécurité, vitesse de chargement et visibilité Google Maps pour entreprises locales, cabinets et cliniques.'
                  : language === 'en'
                  ? 'In-depth cybersecurity, page load speed optimization, and Google Maps local SEO review tailored for high-ticket local businesses.'
                  : 'Análisis profundo de ciberseguridad, optimización de velocidad de carga y posicionamiento en Google Maps para clínicas, restaurantes y empresas locales.'}
              </p>
            </div>

            {/* Tiers Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.keys(tiers) as Array<keyof typeof tiers>).map((key) => {
                const t = tiers[key];
                const isSelected = selectedTier === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTier(key)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#131B33] border-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                        : 'bg-[#0A0F1F] border-gray-800 hover:border-gray-700 opacity-80'
                    }`}
                  >
                    {t.badge && (
                      <span className="absolute -top-2 right-2 bg-[#F5A623] text-[#0A0F1F] text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">
                        {t.badge}
                      </span>
                    )}
                    <div>
                      <span className="text-[11px] font-bold text-white block">
                        {key === 'basic'
                          ? (language === 'fr' ? 'Basique (5 p.)' : language === 'en' ? 'Starter (5 p.)' : 'Básico (5 pág)')
                          : key === 'complete'
                          ? (language === 'fr' ? 'Complet (20+ p.)' : language === 'en' ? 'Complete (20+ p.)' : 'Completo (20+ pág)')
                          : (language === 'fr' ? 'Premium + Consulting' : language === 'en' ? 'Premium + Call' : 'Premium + Asesoría')}
                      </span>
                      <span className="text-xl font-mono font-bold text-[#F5A623] mt-1 block">
                        {t.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-2 block">
                      {key === 'complete'
                        ? (language === 'fr' ? 'Recommandé par nos experts' : language === 'en' ? 'Recommended by Architects' : 'Recomendado por Arquitectos')
                        : key === 'premium'
                        ? (language === 'fr' ? 'Inclut session 45 min' : language === 'en' ? 'Includes 45m call' : 'Incluye llamada 45 min')
                        : (language === 'fr' ? 'Analyse initiale' : language === 'en' ? 'Initial breakdown' : 'Análisis inicial')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Features of Selected Tier */}
            <div className="bg-[#131B33] border border-gray-800 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-mono text-gray-400 uppercase">
                {language === 'fr' ? 'Inclus dans ce pack' : language === 'en' ? 'Included in this package' : 'Incluido en este paquete'} ({tiers[selectedTier].price}):
              </span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {tiers[selectedTier].features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    {language === 'fr' ? 'E-mail pour recevoir le PDF *' : language === 'en' ? 'Email to receive PDF *' : 'Email para recibir el PDF *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@domain.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    {language === 'fr' ? 'URL de votre site ou entreprise *' : language === 'en' ? 'Website or business URL *' : 'URL de tu web o negocio *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.yourcompany.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Official Stripe Checkout Information */}
              <div className="p-4 bg-[#0A0F1F] border border-[#635BFF]/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <CreditCard className="w-4 h-4 text-[#635BFF]" />
                    <span>{language === 'fr' ? 'Portail Officiel Stripe Checkout' : language === 'en' ? 'Official Stripe Checkout Gateway' : 'Pasarela Oficial Stripe Checkout'}</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Lock className="w-3 h-3" />
                    <span>{language === 'fr' ? 'Chiffrement SSL 256-bit' : language === 'en' ? 'SSL 256-bit Encryption' : 'Cifrado SSL 256-bit'}</span>
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {language === 'fr'
                    ? 'Vous serez redirigé vers la passerelle sécurisée officielle de Stripe pour régler par carte bancaire, Apple Pay ou Google Pay. Sans frais cachés.'
                    : language === 'en'
                    ? 'You will be redirected to the official secure Stripe gateway to pay via credit card, Apple Pay, or Google Pay with zero hidden fees.'
                    : 'Serás redirigido a la pasarela segura oficial de Stripe para completar el pago con tarjeta, Apple Pay o Google Pay. Sin comisiones ocultas ni suscripciones.'}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-800 text-[10px] font-mono text-gray-400">
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Apple Pay</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Google Pay</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Visa / Mastercard</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">American Express</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#635BFF] hover:bg-[#5349e0] text-white py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-[#635BFF]/25 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <span>{language === 'fr' ? 'Connexion à Stripe...' : language === 'en' ? 'Connecting to Stripe Checkout...' : 'Conectando con Stripe Checkout...'}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>{language === 'fr' ? `Régler ${tiers[selectedTier].price} sur Stripe Officiel` : language === 'en' ? `Pay ${tiers[selectedTier].price} on Official Stripe` : `Pagar ${tiers[selectedTier].price} en Stripe Oficial`}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <a
                  href={tiers[selectedTier].stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#38BDF8] hover:underline inline-flex items-center gap-1"
                >
                  <span>{language === 'fr' ? 'Lien direct Stripe Checkout ↗' : language === 'en' ? 'Direct Stripe Checkout link ↗' : '¿Prefieres abrir el enlace directo de Stripe? Haz clic aquí'}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1 pt-1">
                <span>{language === 'fr' ? 'Garantie DEXVOI' : language === 'en' ? 'DEXVOI Satisfaction Guarantee' : 'Garantía de satisfacción DEXVOI'}</span>
                <span>{language === 'fr' ? 'Livraison instantanée après paiement' : language === 'en' ? 'Instant delivery upon confirmation' : 'Entrega inmediata tras confirmación'}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

