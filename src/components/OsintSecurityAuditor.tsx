import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  RefreshCw,
  Lock,
  Globe2,
  Server,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Zap,
  Sparkles,
  Code2
} from 'lucide-react';
import { OsintSecurityAuditResult } from '../types';
import { runClientSecurityAudit } from '../services/clientSecurityAudit';
import { useLanguage } from '../i18n/LanguageContext';

interface OsintSecurityAuditorProps {
  onOpenPurchaseModal: (result: OsintSecurityAuditResult | null, target: string) => void;
}

export const OsintSecurityAuditor: React.FC<OsintSecurityAuditorProps> = ({
  onOpenPurchaseModal,
}) => {
  const { language } = useLanguage();
  const [targetInput, setTargetInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<OsintSecurityAuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<'headers' | 'osint' | 'breaches'>('headers');

  const handleRunRealAudit = async (e?: React.FormEvent, customDomain?: string) => {
    if (e) e.preventDefault();
    const queryTarget = (customDomain || targetInput).trim();
    if (!queryTarget) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      let finalData: OsintSecurityAuditResult | null = null;

      // 1. Intentar auditoría en servidor si la API está disponible
      try {
        const response = await fetch('/api/security-audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ target: queryTarget }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json();
          if (data && !data.error && data.score !== undefined) {
            finalData = data;
          }
        }
      } catch {
        // En caso de hosting estático (Cloudflare Pages) o timeout, usar motor cliente DoH
      }

      // 2. Si el servidor no devolvió JSON o estamos en hosting estático, ejecutar auditoría en vivo en cliente
      if (!finalData) {
        finalData = await runClientSecurityAudit(queryTarget);
      }

      setAuditData(finalData);
      setTargetInput(queryTarget);
    } catch (err: any) {
      console.error('Audit failed:', err);
      let friendlyMessage = err?.message || (language === 'fr'
        ? 'Erreur de connexion. Veuillez saisir un domaine public et actif.'
        : language === 'en'
        ? 'Connection error. Make sure to enter an active and public domain.'
        : 'Error de conexión. Asegúrate de ingresar un dominio activo y público.');
      if (friendlyMessage.includes('JSON') || friendlyMessage.includes('Unexpected') || friendlyMessage.includes('fetch')) {
        friendlyMessage = language === 'fr'
          ? 'Impossible de se connecter au domaine indiqué. Vérifiez qu’il est actif, public et bien orthographié (ex: votredomaine.com).'
          : language === 'en'
          ? 'Could not connect to specified domain. Verify it is reachable, public, and correctly spelled (e.g., yourdomain.com).'
          : 'No se pudo conectar con el dominio indicado. Verifica que esté activo, público y bien escrito (ej: tudominio.com).';
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const setSample = (domain: string) => {
    setTargetInput(domain);
    handleRunRealAudit(undefined, domain);
  };

  return (
    <section id="osint-audit" className="py-24 bg-[#0A0E1A] relative border-t border-b border-gray-800">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/5 via-transparent to-[#F5A623]/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>
              {language === 'fr'
                ? 'MODULE SPÉCIALISÉ · CYBERSÉCURITÉ EN TEMPS RÉEL'
                : language === 'en'
                ? 'SPECIALIZED MODULE · REAL-TIME CYBERSECURITY'
                : 'MÓDULO ESPECIALIZADO · CIBERSEGURIDAD EN TIEMPO REAL'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {language === 'fr'
              ? 'Audit OSINT & Blindage des En-têtes HTTP'
              : language === 'en'
              ? 'OSINT Audit & HTTP Security Headers Hardening'
              : 'Auditoría OSINT & Blindaje de Cabeceras HTTP'}
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {language === 'fr'
              ? 'Inspectez en direct les en-têtes HTTP, politiques HSTS, protections anti-clickjacking, configurations anti-XSS et l’exposition technologique de n’importe quel site web en temps réel.'
              : language === 'en'
              ? 'Live inspection of HTTP response headers, HSTS policies, anti-clickjacking defense, anti-XSS configuration, and infrastructure exposure of any domain in real time.'
              : 'Inspecciona en vivo las cabeceras de respuesta, políticas HSTS, defensas anti-clickjacking, configuración anti-XSS y exposición tecnológica de cualquier sitio web en tiempo real.'}
          </p>

          {/* Standalone Price Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B]/90 border border-[#F5A623]/40 text-xs font-mono">
            <span className="text-gray-300">
              {language === 'fr' ? 'Service Indépendant :' : language === 'en' ? 'Standalone Service:' : 'Servicio Independiente:'}
            </span>
            <span className="text-[#F5A623] font-bold">
              {language === 'fr' ? '29 € Paiement Unique' : language === 'en' ? '29€ One-time Payment' : '29€ Pago Único'}
            </span>
            <span className="text-gray-400">
              {language === 'fr'
                ? '· Sans abonnement mensuel · Rapport Forensique + Scripts Prêts à Déployer'
                : language === 'en'
                ? '· No subscription · Forensic PDF + Copy-Ready Web Server Configs'
                : '· Sin planes mensuales · Informe Forense + Scripts Listos para Copiar'}
            </span>
          </div>
        </div>

        {/* Auditor Interactive Input Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#0066FF]/40 shadow-2xl bg-[#0B1224]/90 mb-10">
          <form onSubmit={(e) => handleRunRealAudit(e)} className="space-y-4">
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider">
              {language === 'fr'
                ? 'Saisissez le domaine ou l’URL à auditer en direct :'
                : language === 'en'
                ? 'Enter domain or URL to audit in real time:'
                : 'Ingresa el dominio o URL a auditar en vivo:'}
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-mono text-sm">
                  https://
                </div>
                <input
                  type="text"
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  placeholder={language === 'fr' ? 'votresite.com' : language === 'en' ? 'yourdomain.com' : 'ejemplo.com o tuweb.es'}
                  required
                  disabled={isLoading}
                  className="w-full bg-[#131B33] border border-gray-700 rounded-xl pl-22 pr-4 py-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !targetInput.trim()}
                className="metallic-btn px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#F5A623]" />
                    <span>
                      {language === 'fr' ? 'Connexion & Analyse...' : language === 'en' ? 'Connecting & Scanning...' : 'Conectando e Inspeccionando...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#F5A623]" />
                    <span>
                      {language === 'fr' ? 'Auditer en temps réel' : language === 'en' ? 'Audit in Real Time' : 'Auditar en Tiempo Real'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Pre-set Chips */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-400 pt-1">
              <span>{language === 'fr' ? 'Tester des domaines de référence :' : language === 'en' ? 'Try reference domains:' : 'Probar dominios de referencia:'}</span>
              <button
                type="button"
                onClick={() => setSample('dexvoi.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-[#0066FF] hover:text-white transition-colors cursor-pointer"
              >
                dexvoi.com
              </button>
              <button
                type="button"
                onClick={() => setSample('cloudflare.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                cloudflare.com
              </button>
              <button
                type="button"
                onClick={() => setSample('github.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                github.com
              </button>
            </div>
          </form>

          {/* Error notification */}
          {errorMessage && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 font-mono text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Results Screen */}
        {auditData && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Overview Executive Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Score & Grade Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-[#0066FF]/40 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    {language === 'fr' ? 'Score de Sécurité' : language === 'en' ? 'Security Score' : 'Puntuación de Seguridad'}
                  </div>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-4xl font-extrabold text-white font-mono">
                      {auditData.score}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">/ 100</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    {language === 'fr' ? 'Niveau Défensif :' : language === 'en' ? 'Defense Grade:' : 'Grado Defensivo:'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg font-mono text-sm font-bold ${
                      auditData.grade === 'A+' || auditData.grade === 'A'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : auditData.grade === 'B'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {language === 'fr' ? `NIVEAU ${auditData.grade}` : language === 'en' ? `GRADE ${auditData.grade}` : `NIVEL ${auditData.grade}`}
                  </span>
                </div>
              </div>

              {/* Status & Latency Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    {language === 'fr' ? 'Connexion en Direct' : language === 'en' ? 'Live Connection' : 'Conexión en Vivo'}
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    HTTP {auditData.httpStatus}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">
                    {language === 'fr' ? 'Latence Serveur :' : language === 'en' ? 'Server Latency:' : 'Latencia Servidor:'}
                  </span>
                  <span className="text-[#F5A623] font-bold">{auditData.responseTimeMs} ms</span>
                </div>
              </div>

              {/* Protocol & Encryption Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    {language === 'fr' ? 'Chiffrement en Transit' : language === 'en' ? 'Transit Encryption' : 'Cifrado de Tránsito'}
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    <Lock className={`w-5 h-5 ${auditData.isHttps ? 'text-emerald-400' : 'text-red-400'}`} />
                    {auditData.isHttps
                      ? (language === 'fr' ? 'HTTPS ACTIF' : language === 'en' ? 'HTTPS ACTIVE' : 'HTTPS ACTIVO')
                      : (language === 'fr' ? 'HTTP NON SÉCURISÉ' : language === 'en' ? 'INSECURE HTTP' : 'HTTP INSEGURO')}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">
                    {language === 'fr' ? 'Certificat SSL :' : language === 'en' ? 'SSL Certificate:' : 'Certificado SSL:'}
                  </span>
                  <span className={auditData.isHttps ? 'text-emerald-400' : 'text-red-400'}>
                    {auditData.isHttps
                      ? (language === 'fr' ? 'Valide & Chiffré' : language === 'en' ? 'Valid & Encrypted' : 'Válido & Cifrado')
                      : (language === 'fr' ? 'Non Forcé' : language === 'en' ? 'Not Enforced' : 'No Forzado')}
                  </span>
                </div>
              </div>

              {/* Breaches Summary Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    {language === 'fr' ? 'Vulnérabilités Détectées' : language === 'en' ? 'Vulnerabilities Detected' : 'Brechas Detectadas'}
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    {auditData.breaches.length > 0 ? (
                      <span className="text-amber-400">
                        {auditData.breaches.length} {language === 'fr' ? 'Vulnérabilités' : language === 'en' ? 'Vulnerabilities' : 'Vulnerabilidades'}
                      </span>
                    ) : (
                      <span className="text-emerald-400">
                        {language === 'fr' ? '0 Faille Critique' : language === 'en' ? '0 Critical Breaches' : '0 Brechas Críticas'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">
                    {language === 'fr' ? 'En-têtes OK :' : language === 'en' ? 'Headers Passed:' : 'Cabeceras OK:'}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {auditData.summary.passed} / {auditData.summary.total}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-800 gap-2 sm:gap-6 font-mono text-xs overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('headers')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'headers'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>
                  {language === 'fr' ? `En-têtes de Sécurité (${auditData.headers.length})` : language === 'en' ? `Security Headers (${auditData.headers.length})` : `Cabeceras de Seguridad (${auditData.headers.length})`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('osint')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'osint'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>
                  {language === 'fr' ? 'Reconnaissance OSINT & DNS' : language === 'en' ? 'OSINT & DNS Recon' : 'Reconocimiento OSINT & DNS'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('breaches')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'breaches'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-[#F5A623]" />
                <span>
                  {language === 'fr' ? `Vulnérabilités (${auditData.breaches.length})` : language === 'en' ? `Vulnerabilities (${auditData.breaches.length})` : `Vulnerabilidades (${auditData.breaches.length})`}
                </span>
              </button>
            </div>

            {/* Tab 1: Detailed HTTP Headers Inspector */}
            {activeTab === 'headers' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {auditData.headers.map((hdr, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#0C1326] border border-gray-800 hover:border-gray-700 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {hdr.status === 'PASS' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : hdr.status === 'WARN' ? (
                            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )}
                          <span className="font-bold text-white font-mono text-sm">
                            {hdr.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">
                            {hdr.headerKey}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              hdr.status === 'PASS'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : hdr.status === 'WARN'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-red-500/20 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {hdr.status === 'PASS'
                              ? (language === 'fr' ? 'CONFIGURÉ' : language === 'en' ? 'CONFIGURED' : 'CONFIGURADO')
                              : hdr.status === 'WARN'
                              ? (language === 'fr' ? 'ATTENTION' : language === 'en' ? 'WARNING' : 'ATENCIÓN')
                              : (language === 'fr' ? 'NON PROTÉGÉ' : language === 'en' ? 'UNPROTECTED' : 'DESPROTEGIDO')}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            {language === 'fr' ? 'Priorité :' : language === 'en' ? 'Priority:' : 'Prioridad:'} {hdr.importance}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {hdr.description}
                      </p>

                      {/* Header Value from Real Server */}
                      <div className="bg-[#070B16] rounded-lg p-2.5 font-mono text-[11px] text-gray-400 border border-gray-800/80 flex items-center justify-between overflow-x-auto">
                        <span className="text-gray-500 select-none">
                          {language === 'fr' ? 'Valeur reçue :' : language === 'en' ? 'Received value:' : 'Valor recibido:'}
                        </span>
                        <span className={hdr.value ? 'text-[#0066FF]' : 'text-gray-600 italic'}>
                          {hdr.value || (language === 'fr' ? '(En-tête non envoyé par le serveur)' : language === 'en' ? '(Header not returned by server)' : '(Cabecera no enviada por el servidor)')}
                        </span>
                      </div>

                      {hdr.status !== 'PASS' && (
                        <div className="text-[11px] font-mono text-amber-300/90 flex items-start gap-1.5 pt-1">
                          <span className="text-[#F5A623]">
                            {language === 'fr' ? '› Remédier :' : language === 'en' ? '› Remediate:' : '› Remediar:'}
                          </span>
                          <span>{hdr.recommendation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Passive OSINT & DNS Inspector */}
            {activeTab === 'osint' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* DNS & Host Reconnaissance */}
                <div className="p-6 rounded-2xl bg-[#0C1326] border border-gray-800 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white font-mono">
                    <Globe2 className="w-4 h-4 text-[#0066FF]" />
                    <span>
                      {language === 'fr' ? 'Résolution Réseau & Serveur' : language === 'en' ? 'Network & Host Resolution' : 'Resolución de Red & Servidor'}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">
                        {language === 'fr' ? 'Adresse IP Résolue :' : language === 'en' ? 'Resolved IP Address:' : 'Dirección IP Resuelta:'}
                      </span>
                      <span className="text-white font-bold">{auditData.osint.ip || (language === 'fr' ? 'Masquée par CDN' : language === 'en' ? 'Masked behind CDN' : 'Oculta tras CDN')}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">
                        {language === 'fr' ? 'Famille IP :' : language === 'en' ? 'IP Protocol:' : 'Tipo de Protocolo:'}
                      </span>
                      <span className="text-gray-300">{auditData.osint.ipFamily || 'IPv4'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">
                        {language === 'fr' ? 'Bannière Serveur :' : language === 'en' ? 'Server Banner:' : 'Banner de Servidor Web:'}
                      </span>
                      <span className="text-[#F5A623]">{auditData.osint.serverBanner || (language === 'fr' ? 'Non divulguée (Protégée)' : language === 'en' ? 'Hidden (Secured)' : 'No divulgado (Protegido)')}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">
                        {language === 'fr' ? 'Framework Détecté :' : language === 'en' ? 'Detected Framework:' : 'Framework Detectado:'}
                      </span>
                      <span className="text-gray-300">{auditData.osint.poweredBy || (language === 'fr' ? 'Masqué' : language === 'en' ? 'Hidden' : 'Oculto')}</span>
                    </div>
                  </div>

                  {auditData.osint.detectedTech.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-gray-400 block mb-2">
                        {language === 'fr' ? 'Stack Technologique Détectée :' : language === 'en' ? 'Detected Tech Stack:' : 'Stack Tecnológico Detectado:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {auditData.osint.detectedTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded bg-[#131B33] border border-[#0066FF]/30 text-gray-300 font-mono text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Security & Spoofing Defense */}
                <div className="p-6 rounded-2xl bg-[#0C1326] border border-gray-800 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white font-mono">
                    <Mail className="w-4 h-4 text-[#F5A623]" />
                    <span>
                      {language === 'fr' ? 'Sécurité Email & Anti-Spoofing' : language === 'en' ? 'Email Security & Anti-Spoofing' : 'Seguridad de Correo & Anti-Spoofing'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {language === 'fr'
                      ? 'Évaluation des enregistrements DNS pour vérifier si des attaquants peuvent usurper votre nom de domaine pour envoyer des courriels malveillants à vos clients.'
                      : language === 'en'
                      ? 'DNS records analysis to verify whether malicious actors can spoof your domain identity to send fraudulent emails to your patients and clients.'
                      : 'Evaluación de registros DNS para verificar si atacantes pueden suplantar la identidad del dominio para enviar correos maliciosos a tus clientes.'}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#070B16] border border-gray-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {auditData.osint.hasSpf ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-gray-300">
                          {language === 'fr' ? 'Enregistrement SPF :' : language === 'en' ? 'SPF Record (Sender Policy):' : 'Registro SPF (Sender Policy):'}
                        </span>
                      </div>
                      <span className={auditData.osint.hasSpf ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {auditData.osint.hasSpf
                          ? (language === 'fr' ? 'ACTIF' : language === 'en' ? 'ACTIVE' : 'ACTIVO')
                          : (language === 'fr' ? 'NON DÉTECTÉ' : language === 'en' ? 'NOT DETECTED' : 'NO DETECTADO')}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#070B16] border border-gray-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {auditData.osint.hasDmarc ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-gray-300">
                          {language === 'fr' ? 'Politique DMARC Anti-Phishing :' : language === 'en' ? 'DMARC Anti-Phishing Policy:' : 'Política DMARC Anti-Phishing:'}
                        </span>
                      </div>
                      <span className={auditData.osint.hasDmarc ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {auditData.osint.hasDmarc
                          ? (language === 'fr' ? 'ACTIF' : language === 'en' ? 'ACTIVE' : 'ACTIVO')
                          : (language === 'fr' ? 'NON PROTÉGÉ' : language === 'en' ? 'UNPROTECTED' : 'DESPROTEGIDO')}
                      </span>
                    </div>
                  </div>

                  {auditData.osint.mxRecords.length > 0 && (
                    <div className="pt-2 text-[11px] font-mono text-gray-400">
                      <span>{language === 'fr' ? 'Serveurs MX associés :' : language === 'en' ? 'Associated MX Servers:' : 'Servidores MX vinculados:'}</span>
                      <ul className="list-disc list-inside mt-1 text-gray-300 space-y-0.5">
                        {auditData.osint.mxRecords.map((mx, mIdx) => (
                          <li key={mIdx}>{mx}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Breaches & Vulnerabilities List */}
            {activeTab === 'breaches' && (
              <div className="space-y-4">
                {auditData.breaches.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#0C1326] border border-emerald-500/40 text-center space-y-2">
                    <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white font-mono">
                      {language === 'fr' ? 'Excellente Posture Défensive' : language === 'en' ? 'Excellent Defensive Posture' : 'Excelente Postura Defensiva'}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {language === 'fr'
                        ? 'Aucune faille critique ni absence d’en-tête obligatoire n’a été détectée dans la réponse analysée.'
                        : language === 'en'
                        ? 'No critical vulnerabilities or missing mandatory headers detected in inspected responses.'
                        : 'No se detectaron brechas críticas ni falta de cabeceras obligatorias en la respuesta analizada.'}
                    </p>
                  </div>
                ) : (
                  auditData.breaches.map((breach) => (
                    <div
                      key={breach.id}
                      className="p-6 rounded-2xl bg-[#0C1326] border border-gray-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold ${
                              breach.severity === 'CRITICAL'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                : breach.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                            }`}
                          >
                            {language === 'fr' ? `SÉVÉRITÉ ${breach.severity}` : language === 'en' ? `SEVERITY ${breach.severity}` : `SEVERIDAD ${breach.severity}`}
                          </span>
                          <span className="text-xs font-mono text-gray-400">
                            {breach.id} · {breach.category}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white font-mono">
                        {breach.title}
                      </h4>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {breach.description}
                      </p>

                      <div className="p-3 rounded-xl bg-[#070B16] border border-gray-800 text-xs font-mono space-y-1">
                        <div className="text-red-400">
                          <strong>{language === 'fr' ? 'Impact Réel :' : language === 'en' ? 'Real Impact:' : 'Impacto Real:'}</strong> {breach.impact}
                        </div>
                        <div className="text-emerald-400">
                          <strong>{language === 'fr' ? 'Remédiation :' : language === 'en' ? 'Remediation:' : 'Remediación:'}</strong> {breach.remediation}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Standalone Action Banner (Precio Único: 29€) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C1630] via-[#101F42] to-[#0C1630] border border-[#0066FF]/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-mono text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {language === 'fr'
                      ? 'SERVICE INDÉPENDANT · 29 € PAIEMENT UNIQUE'
                      : language === 'en'
                      ? 'STANDALONE SERVICE · 29€ ONE-TIME PAYMENT'
                      : 'SERVICIO INDEPENDIENTE · 29€ PAGO ÚNICO'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {language === 'fr'
                    ? 'Souhaitez-vous Blinder votre Site Web dès Aujourd’hui ?'
                    : language === 'en'
                    ? 'Ready to Shield and Harden Your Website Today?'
                    : '¿Quieres Blindar tu Sitio Web Hoy Mismo?'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                  {language === 'fr'
                    ? <>Obtenez le rapport forensique complet de <strong>{auditData.target}</strong> avec les scripts prêts à copier pour Nginx/Apache et l’assistance directe de Dexvoi.</>
                    : language === 'en'
                    ? <>Get the comprehensive forensic report for <strong>{auditData.target}</strong> with ready-to-paste Nginx/Apache configuration scripts and validation support from Dexvoi.</>
                    : <>Obtén el informe forense completo de <strong>{auditData.target}</strong> con los scripts listos para pegar en Nginx/Apache y soporte de validación directo con Dexvoi.</>}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenPurchaseModal(auditData, auditData.target)}
                className="w-full md:w-auto metallic-btn px-8 py-4 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl whitespace-nowrap cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#F5A623]" />
                <span>
                  {language === 'fr'
                    ? 'Débloquer le Blindage Complet (29 €)'
                    : language === 'en'
                    ? 'Unlock Complete Hardening (29€)'
                    : 'Desbloquear Blindaje Completo (29€)'}
                </span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

