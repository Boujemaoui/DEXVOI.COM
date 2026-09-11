import React from 'react';
import { Check, Sparkles, Lock, ArrowRight, ExternalLink, CreditCard } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PricingSectionProps {
  onOpenPdfModal?: (tier: 'basic' | 'complete' | 'premium') => void;
  onOpenAuditModal?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenPdfModal,
  onOpenAuditModal,
}) => {
  const { t, language } = useLanguage();

  const plans = [
    {
      id: 'basic',
      tierKey: 'basic' as const,
      name: t.pricing.tierBasicTitle,
      subtitle: t.pricing.tierBasicSubtitle,
      price: '19',
      currency: '€',
      period: language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time fee' : 'pago único',
      pages: t.pricing.tierBasicPages,
      badge: null,
      highlighted: false,
      stripeUrl: 'https://buy.stripe.com/aFa00kaea4fy0nQ6UFdAk00',
      buttonText: t.pricing.tierBasicBtn,
      features: language === 'fr' ? [
        'Analyse de vitesse de chargement Core Web Vitals',
        'Vérification de certificat SSL et en-têtes HTTP',
        'Détection de présence et visibilité Google Maps',
        'Détection basique de ports de serveur exposés',
        'Checklist technique des améliorations prioritaires',
        'Livraison rapide en PDF exécutif par e-mail',
      ] : language === 'en' ? [
        'Core Web Vitals load speed benchmarking',
        'SSL certificate and HTTP security headers check',
        'Google Maps local presence detection',
        'Basic exposed server port scanning',
        'Prioritized technical fix checklist',
        'Executive PDF report delivered via email',
      ] : [
        'Análisis de velocidad de carga Core Web Vitals',
        'Verificación de certificado SSL y headers HTTP',
        'Detección de presencia y visibilidad en Google Maps',
        'Detección básica de puertos de servidor expuestos',
        'Checklist técnico de mejoras prioritarias',
        'Entrega rápida en PDF ejecutivo por email',
      ],
    },
    {
      id: 'complete',
      tierKey: 'complete' as const,
      name: t.pricing.tierCompleteTitle,
      subtitle: t.pricing.tierCompleteSubtitle,
      price: '49',
      currency: '€',
      period: language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time fee' : 'pago único',
      pages: t.pricing.tierCompletePages,
      badge: t.pricing.popularBadge,
      highlighted: true,
      stripeUrl: 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01',
      buttonText: t.pricing.tierCompleteBtn,
      features: language === 'fr' ? [
        'Tout ce qui est inclus dans le rapport Starter',
        'Audit médicolégal approfondi de plus de 20 pages',
        'Reconnaissance passive OSINT et surface d\'exposition',
        'Protection préventive contre les failles OWASP Top 10',
        'Graphiques de latence serveur (TTFB) et goulots d\'étranglement',
        'Feuille de route de durcissement prête à déployer',
        'Livraison prioritaire au format PDF haute résolution',
      ] : language === 'en' ? [
        'Everything included in the Starter report',
        'In-depth 20+ page technical forensic audit',
        'Passive OSINT and digital exposure surface scan',
        'Hardening recommendations against OWASP Top 10',
        'Server TTFB latency graphs & bottleneck identification',
        'Prioritized implementation roadmap for engineers',
        'Priority delivery in high-resolution executive PDF',
      ] : [
        'Todo lo incluido en el informe Starter',
        'Auditoría forense técnica profunda de más de 20 páginas',
        'Reconocimiento OSINT y huella de exposición digital',
        'Blindaje preventivo contra vulnerabilidades OWASP Top 10',
        'Gráficos de latencia de servidor (TTFB) y cuellos de botella',
        'Hoja de ruta con soluciones técnicas listas para aplicar',
        'Entrega prioritaria en formato PDF ejecutivo de alta resolución',
      ],
    },
    {
      id: 'premium',
      tierKey: 'premium' as const,
      name: t.pricing.tierPremiumTitle,
      subtitle: t.pricing.tierPremiumSubtitle,
      price: '99',
      currency: '€',
      period: language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time fee' : 'pago único',
      pages: t.pricing.tierPremiumPages,
      badge: language === 'fr' ? 'ÉLITE VIP' : language === 'en' ? 'VIP ELITE' : 'ÉLITE VIP',
      highlighted: false,
      stripeUrl: 'https://buy.stripe.com/14A5kE0DA7rKgmO4MxdAk02',
      buttonText: t.pricing.tierPremiumBtn,
      features: language === 'fr' ? [
        'Tout ce qui est inclus dans l\'Audit Complet de 20+ pages',
        'Session stratégique 1-à-1 privée de 45 min en visioconférence',
        'Analyse en direct de votre site, réservations et conversion',
        'Stratégie sur-mesure pour doubler les réservations qualifiées',
        'Plan d\'architecture propriétaire à haut retour sur investissement',
        'Support direct prioritaire pour vos questions techniques',
      ] : language === 'en' ? [
        'Everything in the 20+ page Comprehensive Audit',
        'Private 45-minute 1-on-1 strategy video call',
        'Live teardown of your website, bookings, and UX flow',
        'Playbook to double qualified client bookings in 30 days',
        'Bespoke digital architecture blueprint with high ROI',
        'Direct priority support for implementation guidance',
      ] : [
        'Todo lo incluido en la Auditoría Completa de 20+ páginas',
        'Sesión estratégica 1-a-1 privada de 45 minutos por videollamada',
        'Análisis en vivo de tu web, sistema de reservas y procesos',
        'Estrategia para multiplicar conversiones y captación de clientes',
        'Plan de arquitectura a medida con priorización de alto retorno',
        'Soporte directo prioritario para dudas de implantación',
      ],
    },
  ];

  return (
    <section id="precios" className="py-24 bg-[#0A0F1F] relative overflow-hidden border-t border-[#1E293B]">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -top-24 right-10 w-[350px] h-[350px] bg-[#F5A623]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B33] border border-[#0066FF]/40 text-xs font-mono text-[#38BDF8] mb-4 shadow-sm">
            <CreditCard className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>{t.pricing.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
            {t.pricing.subtitle}
            <span className="block mt-1 text-[#F5A623] font-mono text-sm font-semibold">
              {t.pricing.vatNotice}
            </span>
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#131B33] to-[#0A0F1F] border-2 border-[#0066FF] shadow-[0_0_35px_rgba(0,102,255,0.25)] lg:-translate-y-2'
                  : 'bg-[#10172A]/90 border border-[#1E293B] hover:border-gray-700 shadow-xl'
              } p-6 sm:p-8`}
            >
              {/* Top Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#F5A623]" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white font-sans">{plan.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1E293B] text-gray-300 border border-gray-700">
                      {plan.pages}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 min-h-[36px] leading-relaxed">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-6 p-4 rounded-xl bg-[#080D1A] border border-gray-800/80 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-2xl font-bold text-[#F5A623] font-mono">
                      {plan.currency}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-mono uppercase text-emerald-400 font-bold">
                      {plan.period}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {language === 'fr' ? 'Facture disponible' : language === 'en' ? 'Invoice available' : 'Factura disponible'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-bold">
                    {language === 'fr' ? 'Inclus dans ce forfait :' : language === 'en' ? 'Included in this tier:' : 'Incluye en este plan:'}
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-normal">
                        <div className="w-4 h-4 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#38BDF8]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-gray-800/80">
                {/* Direct Stripe Checkout Button */}
                <a
                  href={plan.stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.highlighted
                      ? 'bg-[#635BFF] hover:bg-[#5349e0] text-white shadow-lg shadow-[#635BFF]/30'
                      : 'bg-[#1E293B] hover:bg-[#283548] text-white border border-gray-700'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{plan.buttonText}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                {/* Custom Modal trigger button */}
                {onOpenPdfModal && (
                  <button
                    onClick={() => onOpenPdfModal(plan.tierKey)}
                    className="w-full py-2 text-center text-[11px] font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {language === 'fr' ? 'Ou ouvrir l’assistant de commande guidé →' : language === 'en' ? 'Or open guided order assistant →' : 'O abrir asistente de pedido guiado →'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust and Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-[#10172A] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-[#635BFF]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <span>{t.pricing.guaranteeTitle}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  SSL 256-BIT
                </span>
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                {t.pricing.guaranteeDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenAuditModal && (
              <button
                onClick={onOpenAuditModal}
                className="px-4 py-2.5 rounded-lg bg-[#131B33] hover:bg-[#1A233D] text-[#38BDF8] border border-[#0066FF]/40 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.pricing.freeAuditPrompt}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

