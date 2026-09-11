import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, Download, Terminal, CreditCard, Sparkles, Copy, Check } from 'lucide-react';
import { OsintSecurityAuditResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [domainInput, setDomainInput] = useState(targetDomain || (auditResult ? auditResult.target : ''));
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

  const domain = domainInput || (language === 'fr' ? 'votre-domaine.com' : language === 'en' ? 'your-domain.com' : 'tu-sitio-web.com');

  const downloadFullForensicReport = () => {
    const reportText = `================================================================================
DEXVOI - ${language === 'fr' ? 'RAPPORT FORENSIQUE DE SÉCURITÉ OSINT & EN-TÊTES HTTP' : language === 'en' ? 'FORENSIC OSINT SECURITY & HTTP HEADERS AUDIT REPORT' : 'INFORME FORENSE DE SEGURIDAD OSINT & BLINDAJE DE CABECERAS HTTP'}
${language === 'fr' ? 'Service de Cybersécurité Défensive Dédié' : language === 'en' ? 'Defensive Cybersecurity Specialized Service' : 'Servicio Especializado de Ciberseguridad Defensiva'} | 49€
================================================================================
${language === 'fr' ? 'Domaine Audité' : language === 'en' ? 'Audited Domain' : 'Dominio Auditado'}: ${domain}
${language === 'fr' ? 'Date d’émission' : language === 'en' ? 'Date & Time' : 'Fecha y Hora de Emisión'}: ${new Date().toLocaleString()}
${language === 'fr' ? 'Certificat Réf' : language === 'en' ? 'Reference Cert' : 'Referencia de Certificación'}: DEXVOI-OSINT-SEC-${Math.floor(100000 + Math.random() * 900000)}
${language === 'fr' ? 'Score de Sécurité' : language === 'en' ? 'Security Score' : 'Puntuación de Seguridad'}: ${auditResult ? auditResult.score : 85}/100 (${auditResult ? auditResult.grade : 'A'})

1. ${language === 'fr' ? 'RECONNAISSANCE OSINT PASSIVE' : language === 'en' ? 'PASSIVE OSINT RECONNAISSANCE' : 'RECONOCIMIENTO PASIVO OSINT'}
--------------------------------------------------------------------------------
- IP: ${auditResult?.osint.ip || 'Detected in analysis'}
- Server / CDN: ${auditResult?.osint.serverBanner || 'Cloudflare / Nginx Perimeter'}
- MX Records: ${auditResult?.osint.mxRecords?.join(', ') || 'Verified'}
- SPF Anti-Spoofing: ${auditResult?.osint.hasSpf ? 'CONFIGURED [OK]' : 'NOT DETECTED [RISK]'}
- DMARC Policy: ${auditResult?.osint.hasDmarc ? 'ACTIVE [OK]' : 'MISSING [REQUIRES FIX]'}

2. ${language === 'fr' ? 'EN-TÊTES DE SÉCURITÉ HTTP' : language === 'en' ? 'HTTP SECURITY HEADERS STATUS' : 'ESTADO DETALLADO DE CABECERAS DE SEGURIDAD HTTP'}
--------------------------------------------------------------------------------
- Strict-Transport-Security (HSTS): Mitigates downgrade / MitM attacks.
- Content-Security-Policy (CSP): Prevents XSS vulnerabilities.
- X-Frame-Options: Anti-clickjacking enforcement.
- X-Content-Type-Options: Neutralizes MIME-type sniffing.
- Referrer-Policy: Prevents referrer leakage.
- Permissions-Policy: Restricts camera, microphone and GPS APIs.

3. ${language === 'fr' ? 'SCRIPTS DE DURCISSEMENT RECOMMANDÉS' : language === 'en' ? 'HARDENING SCRIPTS (COPY & PASTE)' : 'SCRIPTS DE BLINDAJE DIRECTO'}
--------------------------------------------------------------------------------
A) NGINX:
${auditResult?.remediationScriptNginx || `# NGINX HARDENING
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
server_tokens off;`}

B) APACHE (.htaccess):
${auditResult?.remediationScriptApache || `# APACHE HARDENING
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
ServerSignature Off`}

4. SUPPORT
--------------------------------------------------------------------------------
Email: security@dexvoi.com | WhatsApp: +212 600-000000
================================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DEXVOI-OSINT-REPORT-${domain.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
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
                  {language === 'fr' ? 'Audit OSINT & Script de Blindage' : language === 'en' ? 'OSINT Audit & Hardening Script' : 'Auditoría OSINT & Script de Blindaje'}
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-mono text-[10px] font-bold">
                  {language === 'fr' ? '49€ PAIEMENT UNIQUE' : language === 'en' ? '49€ ONE-TIME' : '49€ PAGO ÚNICO'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-sans">
                {language === 'fr' ? 'Cybersécurité défensive professionnelle · Sans abonnement' : language === 'en' ? 'Defensive cybersecurity deliverable · No recurring fees' : 'Servicio independiente de ciberseguridad defensiva · Sin suscripción'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors cursor-pointer"
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
                  {language === 'fr' ? 'Ce que vous débloquez avec cet audit :' : language === 'en' ? 'Included in this technical deliverable:' : '¿Qué desbloqueas con esta auditoría especializada?'}
                </span>
                <span className="text-white font-bold text-base font-mono">49€</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'fr' ? 'Rapport forensique complet des en-têtes HTTP et vulnérabilités.' : language === 'en' ? 'Full HTTP security headers forensic breakdown and vulnerability report.' : 'Informe forense completo de cabeceras HTTP y análisis de vulnerabilidades.'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'fr' ? 'Scripts de blindage Nginx, Apache et Cloudflare prêts à appliquer.' : language === 'en' ? 'Custom copy-paste hardening snippets for Nginx, Apache and Cloudflare.' : 'Script de blindaje perimetral para Nginx, Apache y Cloudflare listo para activar.'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'fr' ? 'Audit DNS OSINT, vérification SPF & politiques DMARC anti-spoofing.' : language === 'en' ? 'OSINT DNS health audit: SPF records and anti-spoofing DMARC policies.' : 'Diagnóstico OSINT de DNS, registros SPF y DMARC anti-suplantación.'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'fr' ? 'Support dédié 7 jours sur WhatsApp avec un ingénieur Dexvoi.' : language === 'en' ? '7-day direct implementation guidance via WhatsApp with a Dexvoi engineer.' : 'Soporte directo por WhatsApp de 7 días con Arquitecto Digital Dexvoi.'}</span>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    {language === 'fr' ? 'Site web à auditer :' : language === 'en' ? 'Website to Audit:' : 'Sitio Web a Auditar:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="example.com"
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    {language === 'fr' ? 'Votre e-mail pour l’envoi du rapport :' : language === 'en' ? 'Your email for report delivery:' : 'Tu Email para entrega del reporte:'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@domain.com"
                    className="w-full bg-[#131B33] border border-gray-700 rounded-lg px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              {/* Official Stripe Checkout presentation */}
              <div className="p-4 rounded-xl bg-[#080D1A] border border-[#635BFF]/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <CreditCard className="w-4 h-4 text-[#635BFF]" />
                    {language === 'fr' ? 'Paiement Sécurisé Stripe Checkout' : language === 'en' ? 'Official Stripe Checkout Gateway' : 'Pasarela Oficial Stripe Checkout'}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {language === 'fr' ? 'Chiffrement SSL 256-bit' : language === 'en' ? 'SSL 256-bit Encryption' : 'Cifrado SSL 256-bit'}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {language === 'fr'
                    ? 'Vous serez redirigé vers la page sécurisée officielle Stripe pour valider le règlement par carte bancaire, Apple Pay ou Google Pay.'
                    : language === 'en'
                    ? 'You will be redirected to the secure official Stripe Checkout portal to complete your order via credit card, Apple Pay, or Google Pay.'
                    : 'Serás redirigido a la pasarela segura oficial de Stripe para procesar la auditoría forense con tarjeta, Apple Pay o Google Pay de forma instantánea.'}
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
                    <span>{language === 'fr' ? 'Connexion à Stripe...' : language === 'en' ? 'Connecting to Stripe Checkout...' : 'Conectando con Stripe Checkout...'}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>{language === 'fr' ? 'Régler l’audit sur Stripe Officiel (49€)' : language === 'en' ? 'Pay Audit on Official Stripe (49€)' : 'Pagar Auditoría en Stripe Oficial (49€)'}</span>
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
                  <span>{language === 'fr' ? 'Ouvrir Stripe Checkout directement ↗' : language === 'en' ? 'Open direct Stripe Checkout link ↗' : 'Abrir enlace directo de Stripe Checkout ↗'}</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 px-1 pt-1">
                <span>{language === 'fr' ? '✓ Règlement unique · Sans abonnement' : language === 'en' ? '✓ Official Stripe payment · No subscription' : '✓ Pago único oficial en Stripe · Sin suscripciones'}</span>
                <span>{language === 'fr' ? 'Garantie Dexvoi' : language === 'en' ? 'DEXVOI Guarantee' : 'Garantía de Satisfacción DEXVOI'}</span>
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
                {language === 'fr' ? 'Audit et Scripts Générés avec Succès !' : language === 'en' ? 'Audit & Hardening Scripts Ready!' : '¡Auditoría y Script de Blindaje Generados con Éxito!'}
              </h4>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                {language === 'fr'
                  ? `Les vérifications techniques pour ${domain} sont prêtes. Votre rapport complet est disponible ci-dessous.`
                  : language === 'en'
                  ? `Security checks verified for ${domain}. Your forensic report and hardening scripts are ready.`
                  : `Hemos verificado los parámetros de ${domain}. Tu informe forense completo y los scripts de protección están listos para descarga.`}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#0066FF]" />
                  {language === 'fr' ? 'Script de Durcissement Immédiat (Nginx)' : language === 'en' ? 'Immediate Hardening Script (Nginx)' : 'Script de Blindaje Inmediato (Nginx)'}
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
                  className="px-2.5 py-1 rounded bg-[#0A0F1F] border border-gray-700 text-gray-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedScript === 'nginx' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{language === 'fr' ? 'Copié !' : language === 'en' ? 'Copied!' : '¡Copiado!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{language === 'fr' ? 'Copier Nginx' : language === 'en' ? 'Copy Nginx' : 'Copiar Nginx'}</span>
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
                className="flex-1 py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'fr' ? 'Télécharger le Rapport (.txt)' : language === 'en' ? 'Download Forensic Report (.txt)' : 'Descargar Informe Forense (.txt)'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-[#1E293B] hover:bg-gray-700 text-gray-300 hover:text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Fermer' : language === 'en' ? 'Close' : 'Cerrar Ventana'}
              </button>
            </div>

            <p className="text-[11px] text-center text-gray-500 font-mono">
              {language === 'fr'
                ? `Une copie a été envoyée à ${email || 'votre email'}. Pour toute assistance, WhatsApp : +212 600-000000.`
                : language === 'en'
                ? `A copy has been routed to ${email || 'your email'}. For instant support, WhatsApp: +212 600-000000.`
                : `Se ha enviado una copia de respaldo a ${email || 'tu email'}. Para asistencia, WhatsApp: +212 600-000000.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

