import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Terminal,
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
  ExternalLink,
  ChevronRight,
  Code2
} from 'lucide-react';
import { OsintSecurityAuditResult, SecurityHeaderItem, SecurityBreachItem } from '../types';
import { runClientSecurityAudit } from '../services/clientSecurityAudit';

interface OsintSecurityAuditorProps {
  onOpenPurchaseModal: (result: OsintSecurityAuditResult | null, target: string) => void;
}

export const OsintSecurityAuditor: React.FC<OsintSecurityAuditorProps> = ({
  onOpenPurchaseModal,
}) => {
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
      let friendlyMessage = err?.message || 'Error de conexión. Asegúrate de ingresar un dominio activo y público.';
      if (friendlyMessage.includes('JSON') || friendlyMessage.includes('Unexpected') || friendlyMessage.includes('fetch')) {
        friendlyMessage = 'No se pudo conectar con el dominio indicado. Verifica que esté activo, público y bien escrito (ej: tudominio.com).';
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
            <span>MÓDULO ESPECIALIZADO · CIBERSEGURIDAD EN TIEMPO REAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Auditoría OSINT & Blindaje de Cabeceras HTTP
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Inspecciona en vivo las cabeceras de respuesta, políticas HSTS, defensas anti-clickjacking, configuración anti-XSS y exposición tecnológica de cualquier sitio web en tiempo real.
          </p>

          {/* Standalone Price Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B]/90 border border-[#F5A623]/40 text-xs font-mono">
            <span className="text-gray-300">Servicio Independiente:</span>
            <span className="text-[#F5A623] font-bold">29€ Pago Único</span>
            <span className="text-gray-400">· Sin planes mensuales · Informe Forense + Scripts Listos para Copiar</span>
          </div>
        </div>

        {/* Auditor Interactive Input Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#0066FF]/40 shadow-2xl bg-[#0B1224]/90 mb-10">
          <form onSubmit={(e) => handleRunRealAudit(e)} className="space-y-4">
            <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider">
              Ingresa el dominio o URL a auditar en vivo:
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
                  placeholder="ejemplo.com o tuweb.es"
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
                    <span>Conectando e Inspeccionando...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#F5A623]" />
                    <span>Auditar en Tiempo Real</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Pre-set Chips */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-400 pt-1">
              <span>Probar dominios de referencia:</span>
              <button
                type="button"
                onClick={() => setSample('dexvoi.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-[#0066FF] hover:text-white transition-colors"
              >
                dexvoi.com
              </button>
              <button
                type="button"
                onClick={() => setSample('cloudflare.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-gray-300 hover:text-white transition-colors"
              >
                cloudflare.com
              </button>
              <button
                type="button"
                onClick={() => setSample('github.com')}
                className="px-2 py-0.5 rounded bg-[#131B33] border border-gray-700 hover:border-[#0066FF] text-gray-300 hover:text-white transition-colors"
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
                    Puntuación de Seguridad
                  </div>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-4xl font-extrabold text-white font-mono">
                      {auditData.score}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">/ 100</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">Grado Defensivo:</span>
                  <span
                    className={`px-3 py-1 rounded-lg font-mono text-sm font-bold ${
                      auditData.grade === 'A+' || auditData.grade === 'A'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : auditData.grade === 'B'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    NIVEL {auditData.grade}
                  </span>
                </div>
              </div>

              {/* Status & Latency Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    Conexión en Vivo
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    HTTP {auditData.httpStatus}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Latencia Servidor:</span>
                  <span className="text-[#F5A623] font-bold">{auditData.responseTimeMs} ms</span>
                </div>
              </div>

              {/* Protocol & Encryption Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    Cifrado de Tránsito
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    <Lock className={`w-5 h-5 ${auditData.isHttps ? 'text-emerald-400' : 'text-red-400'}`} />
                    {auditData.isHttps ? 'HTTPS ACTIVO' : 'HTTP INSEGURO'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Certificado SSL:</span>
                  <span className={auditData.isHttps ? 'text-emerald-400' : 'text-red-400'}>
                    {auditData.isHttps ? 'Válido & Cifrado' : 'No Forzado'}
                  </span>
                </div>
              </div>

              {/* Breaches Summary Card */}
              <div className="p-6 rounded-2xl bg-[#0E1528] border border-gray-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gray-400 uppercase">
                    Brechas Detectadas
                  </div>
                  <div className="text-2xl font-bold text-white font-mono mt-2 flex items-center gap-2">
                    {auditData.breaches.length > 0 ? (
                      <span className="text-amber-400">{auditData.breaches.length} Vulnerabilidades</span>
                    ) : (
                      <span className="text-emerald-400">0 Brechas Críticas</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">Cabeceras OK:</span>
                  <span className="text-emerald-400 font-bold">
                    {auditData.summary.passed} / {auditData.summary.total}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-800 gap-2 sm:gap-6 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('headers')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'headers'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Cabeceras de Seguridad ({auditData.headers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('osint')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'osint'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>Reconocimiento OSINT & DNS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('breaches')}
                className={`pb-3 px-2 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'breaches'
                    ? 'border-[#0066FF] text-[#0066FF]'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-[#F5A623]" />
                <span>Vulnerabilidades ({auditData.breaches.length})</span>
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
                            {hdr.status === 'PASS' ? 'CONFIGURADO' : hdr.status === 'WARN' ? 'ATENCIÓN' : 'DESPROTEGIDO'}
                          </span>
                          <span className="text-[10px] font-mono text-gray-500">
                            Prioridad: {hdr.importance}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {hdr.description}
                      </p>

                      {/* Header Value from Real Server */}
                      <div className="bg-[#070B16] rounded-lg p-2.5 font-mono text-[11px] text-gray-400 border border-gray-800/80 flex items-center justify-between overflow-x-auto">
                        <span className="text-gray-500 select-none">Valor recibido:</span>
                        <span className={hdr.value ? 'text-[#0066FF]' : 'text-gray-600 italic'}>
                          {hdr.value || '(Cabecera no enviada por el servidor)'}
                        </span>
                      </div>

                      {hdr.status !== 'PASS' && (
                        <div className="text-[11px] font-mono text-amber-300/90 flex items-start gap-1.5 pt-1">
                          <span className="text-[#F5A623]">› Remediar:</span>
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
                    <span>Resolución de Red & Servidor</span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Dirección IP Resuelta:</span>
                      <span className="text-white font-bold">{auditData.osint.ip || 'Oculta tras CDN'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Tipo de Protocolo:</span>
                      <span className="text-gray-300">{auditData.osint.ipFamily || 'IPv4'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Banner de Servidor Web:</span>
                      <span className="text-[#F5A623]">{auditData.osint.serverBanner || 'No divulgado (Protegido)'}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Framework Detectado:</span>
                      <span className="text-gray-300">{auditData.osint.poweredBy || 'Oculto'}</span>
                    </div>
                  </div>

                  {auditData.osint.detectedTech.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono text-gray-400 block mb-2">
                        Stack Tecnológico Detectado:
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
                    <span>Seguridad de Correo & Anti-Spoofing</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Evaluación de registros DNS para verificar si atacantes pueden suplantar la identidad del dominio para enviar correos maliciosos a tus clientes.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#070B16] border border-gray-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {auditData.osint.hasSpf ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-gray-300">Registro SPF (Sender Policy):</span>
                      </div>
                      <span className={auditData.osint.hasSpf ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {auditData.osint.hasSpf ? 'ACTIVO' : 'NO DETECTADO'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#070B16] border border-gray-800 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {auditData.osint.hasDmarc ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-gray-300">Política DMARC Anti-Phishing:</span>
                      </div>
                      <span className={auditData.osint.hasDmarc ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {auditData.osint.hasDmarc ? 'ACTIVO' : 'DESPROTEGIDO'}
                      </span>
                    </div>
                  </div>

                  {auditData.osint.mxRecords.length > 0 && (
                    <div className="pt-2 text-[11px] font-mono text-gray-400">
                      <span>Servidores MX vinculados:</span>
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
                      Excelente Postura Defensiva
                    </h4>
                    <p className="text-xs text-gray-300">
                      No se detectaron brechas críticas ni falta de cabeceras obligatorias en la respuesta analizada.
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
                            SEVERIDAD {breach.severity}
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
                          <strong>Impacto Real:</strong> {breach.impact}
                        </div>
                        <div className="text-emerald-400">
                          <strong>Remediación:</strong> {breach.remediation}
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
                  <span>SERVICIO INDEPENDIENTE · 29€ PAGO ÚNICO</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  ¿Quieres Blindar tu Sitio Web Hoy Mismo?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                  Obtén el informe forense completo de <strong>{auditData.target}</strong> con los scripts listos para pegar en Nginx/Apache y soporte de validación directo con Dexvoi.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenPurchaseModal(auditData, auditData.target)}
                className="w-full md:w-auto metallic-btn px-8 py-4 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl whitespace-nowrap cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#F5A623]" />
                <span>Desbloquear Blindaje Completo (29€)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
