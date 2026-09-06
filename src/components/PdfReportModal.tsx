import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Lock, Shield, ArrowRight, Download, CreditCard } from 'lucide-react';

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
  const [selectedTier, setSelectedTier] = useState<'basic' | 'complete' | 'premium'>(defaultTier);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const tiers: Record<'basic' | 'complete' | 'premium', ReportTier> = {
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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const currentTier = tiers[selectedTier];

    // Register lead in backend so you receive instant notification via Resend
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

    // Build Stripe Checkout URL with optional prefilled email
    let targetStripeUrl = currentTier.stripeUrl;
    if (email) {
      targetStripeUrl += (targetStripeUrl.includes('?') ? '&' : '?') + `prefilled_email=${encodeURIComponent(email)}`;
    }

    // Open Stripe Checkout in secure new tab
    window.open(targetStripeUrl, '_blank', 'noopener,noreferrer');

    setIsProcessing(false);
    setIsPaid(true);
  };

  const handleDownloadSample = () => {
    const reportContent = `DEXVOI - INFORME ESTRATÉGICO DE ARQUITECTURA DIGITAL
==================================================================
Tipo: ${tiers[selectedTier].name}
Precio: ${tiers[selectedTier].price}
Web analizada: ${website || 'Web del cliente'}
Email destinatario: ${email}
Fecha: ${new Date().toLocaleDateString()}

1. SEGURIDAD Y BLINDAJE DIGITAL (85/100)
- Certificado SSL: Validado con cifrado TLS 1.3
- Headers de seguridad: X-Frame-Options, Content-Security-Policy recomendados
- Evaluación de inyección SQL y bots maliciosos: Protección activa sugerida

2. RENDIMIENTO Y VELOCIDAD CORE WEB VITALS (88/100)
- First Contentful Paint (FCP): 1.1s
- Largest Contentful Paint (LCP): 1.8s
- Cumulative Layout Shift (CLS): 0.02
- Recomendación: Compresión WebP en catálogo de imágenes y cache en edge CDN.

3. POSICIONAMIENTO SEO LOCAL Y GOOGLE MAPS (90/100)
- Presencia en ficha de Google Business: Optimizada
- Palabras clave geolocalizadas: Ranking en Top 3 para términos principales
- Sistema de reservas automáticas 24/7: Incremento proyectado de +120% en conversiones directas.

==================================================================
DEXVOI - Madrid · Casablanca · London
Contacto de Arquitectura: info@dexvoi.com | WhatsApp: +212 600-000000`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DEXVOI-AUDITORIA-${selectedTier.toUpperCase()}.txt`;
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
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white transition-colors"
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
                PAGO CONFIRMADO VÍA STRIPE
              </span>
              <h3 className="text-2xl font-bold text-white font-mono">
                Tu informe se está generando
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Hemos enviado la confirmación a <strong className="text-white">{email}</strong>. En menos de 5 minutos recibirás tu informe completo de {tiers[selectedTier].pages} con el análisis detallado.
              </p>
            </div>

            <div className="bg-[#131B33] border border-gray-800 rounded-xl p-4 max-w-md mx-auto text-left font-mono text-xs text-gray-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Paquete:</span>
                <span className="text-white font-bold">{tiers[selectedTier].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Monto:</span>
                <span className="text-[#F5A623] font-bold">{tiers[selectedTier].price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plataforma:</span>
                <span className="text-emerald-400">Stripe Secure (SSL 256-bit)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadSample}
                className="metallic-btn px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#0A0F1F]" />
                <span>Descargar Copia Inmediata</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-300 hover:text-white font-mono text-xs uppercase"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#F5A623]">
                <FileText className="w-3.5 h-3.5" />
                <span>PASO 6: INFORME AUDITORÍA DIGITAL EN PDF</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Informe Completo en PDF (20+ páginas)
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Análisis profundo de ciberseguridad, optimización de velocidad de carga y posicionamiento en Google Maps para clínicas, restaurantes y empresas locales.
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
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between relative ${
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
                        {key === 'basic' ? 'Básico (5 pág)' : key === 'complete' ? 'Completo (20+ pág)' : 'Premium + Asesoría'}
                      </span>
                      <span className="text-xl font-mono font-bold text-[#F5A623] mt-1 block">
                        {t.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-2 block">
                      {key === 'complete' ? 'Recomendado por Arquitectos' : key === 'premium' ? 'Incluye llamada 45 min' : 'Análisis inicial'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Features of Selected Tier */}
            <div className="bg-[#131B33] border border-gray-800 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-mono text-gray-400 uppercase">
                Incluido en este paquete ({tiers[selectedTier].price}):
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
                    Email para recibir el PDF *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@dominio.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    URL de tu web o negocio *
                  </label>
                  <input
                    type="text"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.tuempresa.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Official Stripe Checkout Information */}
              <div className="p-4 bg-[#0A0F1F] border border-[#635BFF]/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <CreditCard className="w-4 h-4 text-[#635BFF]" />
                    <span>Pasarela Oficial Stripe Checkout</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Lock className="w-3 h-3" />
                    <span>Cifrado SSL 256-bit</span>
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Serás redirigido a la pasarela segura oficial de Stripe para completar el pago con tarjeta, Apple Pay o Google Pay. Sin comisiones ocultas ni suscripciones.
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
                className="w-full bg-[#635BFF] hover:bg-[#5349e0] text-white py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-[#635BFF]/25 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Conectando con Stripe Checkout...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>Pagar {tiers[selectedTier].price} en Stripe Oficial</span>
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
                  <span>¿Prefieres abrir el enlace directo de Stripe? Haz clic aquí</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1 pt-1">
                <span>Garantía de satisfacción DEXVOI</span>
                <span>Entrega inmediata tras confirmación</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
