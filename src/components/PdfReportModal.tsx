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
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('999');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const tiers: Record<'basic' | 'complete' | 'premium', ReportTier> = {
    basic: {
      name: 'Informe Básico / Rapport Basique',
      pages: '5 páginas',
      price: '19€',
      features: [
        'Análisis de velocidad de carga Core Web Vitals',
        'Verificación de certificado SSL y headers HTTP',
        'Detección de presencia básica en Google Maps'
      ]
    },
    complete: {
      name: 'Informe Completo / Rapport Complet',
      pages: '20+ páginas',
      price: '49€',
      badge: 'MÁS POPULAR / RECOMMANDÉ',
      features: [
        'Auditoría técnica exhaustiva de más de 20 páginas',
        'Análisis de vulnerabilidades web (blindaje & ethical hacking)',
        'Auditoría SEO local Google Maps & competidores',
        'Plan de arquitectura de reservas 24/7 de alta conversión',
        'Entrega inmediata en PDF a tu email en menos de 5 minutos'
      ]
    },
    premium: {
      name: 'Auditoría Premium con Consultoría',
      pages: '25+ páginas + Llamada 1-a-1',
      price: '99€',
      badge: 'ÉLITE',
      features: [
        'Todo lo del informe completo de 20+ páginas',
        'Sesión estratégica 1-a-1 de 45 minutos con Arquitecto Digital',
        'Roadmap personalizado para duplicar captación de clientes',
        'Soporte prioritario por WhatsApp durante 30 días'
      ]
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1500);
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

              {/* Simulated Stripe Card Input */}
              <div className="p-3.5 bg-[#0A0F1F] border border-gray-700 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>Pago Seguro con Tarjeta (Stripe Checkout)</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Lock className="w-3 h-3" />
                    <span>SSL 256-bit</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Número de Tarjeta"
                      className="w-full bg-[#131B33] border border-gray-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/AA"
                      className="w-1/2 bg-[#131B33] border border-gray-800 rounded px-1.5 py-1.5 text-xs text-white font-mono text-center"
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-1/2 bg-[#131B33] border border-gray-800 rounded px-1.5 py-1.5 text-xs text-white font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !email || !website}
                className="w-full metallic-btn py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Procesando pago seguro en Stripe...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#0A0F1F]" />
                    <span>Pagar {tiers[selectedTier].price} y Recibir Informe en 5 Min</span>
                    <ArrowRight className="w-4 h-4 text-[#0A0F1F]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1">
                <span>Garantía de satisfacción DEXVOI</span>
                <span>Entrega inmediata por email</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
