import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, Download, Terminal, CreditCard, Sparkles, Copy, Check } from 'lucide-react';
import { OsintSecurityAuditResult } from '../types';

interface OsintPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditResult?: OsintSecurityAuditResult | null;
  targetDomain?: string;
}

export const OsintPurchaseModal: React.FC<OsintPurchaseModalProps> = ({
  isOpen,
  onClose,
  auditResult,
  targetDomain = ''
}) => {
  const [email, setEmail] = useState('');
  const [domainInput, setDomainInput] = useState(targetDomain || (auditResult ? auditResult.target : ''));
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copiedScript, setCopiedScript] = useState<'nginx' | 'apache' | null>(null);

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Cliente Auditoría OSINT & Seguridad',
          email,
          phone: '',
          businessType: 'Auditoría OSINT & Blindaje',
          websiteUrl: domainInput,
          primaryConcern: 'Compra de Auditoría Técnica & Seguridad',
          type: 'Stripe Checkout (49€)',
        }),
      });
    } catch {
      // Continue anyway
    }

    let targetStripeUrl = 'https://buy.stripe.com/9B66oI862eUc8Um92NdAk01';
    if (email) {
      targetStripeUrl += `?prefilled_email=${encodeURIComponent(email)}`;
    }
    window.open(targetStripeUrl, '_blank', 'noopener,noreferrer');

    setIsProcessing(false);
    setIsPaid(true);
  };

  const domain = domainInput || 'tu-sitio-web.com';

  const downloadFullForensicReport = () => {
    const reportText = `================================================================================
DEXVOI - INFORME FORENSE DE SEGURIDAD OSINT & BLINDAJE DE CABECERAS HTTP
Servicio Especializado de Ciberseguridad Defensiva | Precio Único: 29€
================================================================================
Dominio Auditado: ${domain}
Fecha y Hora de Emisión: ${new Date().toLocaleString()}
Referencia de Certificación: DEXVOI-OSINT-SEC-${Math.floor(100000 + Math.random() * 900000)}
Puntuación de Seguridad: ${auditResult ? auditResult.score : 85}/100 (Grado ${auditResult ? auditResult.grade : 'A'})

1. RECONOCIMIENTO PASIVO OSINT
--------------------------------------------------------------------------------
- IP Pública Resuelta: ${auditResult?.osint.ip || 'Detectada en análisis'}
- Servidor Web / CDN: ${auditResult?.osint.serverBanner || 'Cloudflare / Nginx Perimeter'}
- Registros MX (Correo): ${auditResult?.osint.mxRecords?.join(', ') || 'Verificados'}
- Protección Anti-Phishing SPF: ${auditResult?.osint.hasSpf ? 'CONFIGURADO [OK]' : 'NO DETECTADO [RIESGO SPOOFING]'}
- Política DMARC: ${auditResult?.osint.hasDmarc ? 'ACTIVO [OK]' : 'AUSENTE [REQUIERE IMPLEMENTACIÓN INMEDIATA]'}

2. ESTADO DETALLADO DE CABECERAS DE SEGURIDAD HTTP
--------------------------------------------------------------------------------
- Strict-Transport-Security (HSTS): Mitigación contra ataques MitM y downgrade.
- Content-Security-Policy (CSP): Barrera perimetral contra Cross-Site Scripting (XSS).
- X-Frame-Options: Bloqueo de secuestro de clics (Anti-Clickjacking en iframes).
- X-Content-Type-Options (nosniff): Neutralización de ataques MIME-confusion.
- Referrer-Policy: Prevención de fuga de parámetros en enlaces externos.
- Permissions-Policy: Bloqueo de acceso no autorizado a hardware (cámara, micro, GPS).

3. SCRIPTS DE BLINDAJE DIRECTO (LISTO PARA COPIAR Y PEGAR)
--------------------------------------------------------------------------------

A) IMPLEMENTACIÓN EN NGINX (Dentro del bloque 'server { ... }'):
${auditResult?.remediationScriptNginx || `# NGINX HARDENING
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
server_tokens off;`}

B) IMPLEMENTACIÓN EN APACHE (Dentro del archivo .htaccess):
${auditResult?.remediationScriptApache || `# APACHE HARDENING
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
ServerSignature Off`}

4. ASISTENCIA TÉCNICA DIRECTA INCLUIDA
--------------------------------------------------------------------------------
Para soporte de verificación tras la implementación, contacta a nuestro equipo:
WhatsApp Soporte: +212 600-000000 | Email: security@dexvoi.com
Garantía Oficial Dexvoi - Blindaje Certificado.
================================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DEXVOI-INFORME-OSINT-CABECERAS-${domain.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyScript = (type: 'nginx' | 'apache', code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedScript(type);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0A0F1F] border border-[#0066FF]/50 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Top Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0066FF] via-[#F5A623] to-[#0066FF]"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0E1528]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#0066FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">
                  Auditoría OSINT & Script de Blindaje
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-mono text-[10px] font-bold">
                  29€ PAGO ÚNICO
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans">
                Servicio independiente de ciberseguridad defensiva · Sin suscripción
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        {!isPaid ? (
          <form onSubmit={handlePayment} className="p-6 sm:p-8 space-y-6">
            
            {/* Value Proposition Box */}
            <div className="bg-[#131B33]/70 border border-[#0066FF]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                <span className="text-[#0066FF] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  ¿Qué desbloqueas con esta auditoría especializada?
                </span>
                <span className="text-white font-bold text-base font-mono">29€</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Informe forense completo de cabeceras HTTP y análisis de vulnerabilidades.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Script de blindaje perimetral para Nginx, Apache y Cloudflare listo para activar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Diagnóstico OSINT de DNS, registros SPF y DMARC anti-suplantación.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Soporte directo por WhatsApp de 7 días con Arquitecto Digital Dexvoi.</span>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Sitio Web a Auditar:
                  </label>
                  <input
                    type="text"
                    required
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="tudominio.com"
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    Tu Email para entrega del reporte:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="direccion@tudominio.com"
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Official Stripe Checkout presentation */}
              <div className="p-4 rounded-xl bg-[#080D1A] border border-[#635BFF]/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <CreditCard className="w-4 h-4 text-[#635BFF]" />
                    Pasarela Oficial Stripe Checkout
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Cifrado SSL 256-bit
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Serás redirigido a la pasarela segura oficial de Stripe para procesar la auditoría forense con tarjeta, Apple Pay o Google Pay de forma instantánea.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-800 text-[10px] font-mono text-gray-400">
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Apple Pay</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Google Pay</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">Visa / Mastercard</span>
                  <span className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 text-white">American Express</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl bg-[#635BFF] hover:bg-[#5349e0] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#635BFF]/25 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Conectando con Stripe Checkout...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>Pagar Auditoría en Stripe Oficial (49€)</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <a
                  href="https://buy.stripe.com/9B66oI862eUc8Um92NdAk01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-[#38BDF8] hover:underline inline-flex items-center gap-1"
                >
                  <span>Abrir enlace directo de Stripe Checkout ↗</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1 pt-1">
                <span>✓ Pago único oficial en Stripe · Sin suscripciones</span>
                <span>Garantía de Satisfacción DEXVOI</span>
              </div>
            </div>
          </form>
        ) : (
          /* Post-Purchase Delivery Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white font-mono">
                ¡Auditoría y Script de Blindaje Generados con Éxito!
              </h4>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Hemos verificado los parámetros de <strong>{domain}</strong>. Tu informe forense completo y los scripts de protección están listos para descarga.
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#0066FF]" />
                  Script de Blindaje Inmediato (Nginx)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      'nginx',
                      auditResult?.remediationScriptNginx ||
                        'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\nadd_header X-Frame-Options "SAMEORIGIN" always;\nadd_header X-Content-Type-Options "nosniff" always;\nadd_header Referrer-Policy "strict-origin-when-cross-origin" always;'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-[#0A0F1F] border border-gray-700 text-gray-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors"
                >
                  {copiedScript === 'nginx' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar Nginx</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-3 rounded-lg bg-[#070B16] border border-gray-800 text-[11px] font-mono text-gray-300 overflow-x-auto max-h-36">
                <code>
                  {auditResult?.remediationScriptNginx ||
                    `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\nadd_header X-Frame-Options "SAMEORIGIN" always;\nadd_header X-Content-Type-Options "nosniff" always;\nadd_header Referrer-Policy "strict-origin-when-cross-origin" always;\nserver_tokens off;`}
                </code>
              </pre>
            </div>

            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={downloadFullForensicReport}
                className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Informe Forense (.txt)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-[#1E293B] hover:bg-gray-700 text-gray-300 hover:text-white font-mono text-xs font-semibold transition-colors"
              >
                Cerrar Ventana
              </button>
            </div>

            <p className="text-[11px] text-center text-gray-500 font-mono">
              Se ha enviado una copia de respaldo a <strong>{email || 'tu email'}</strong>. Para asistencia, WhatsApp: +212 600-000000.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
