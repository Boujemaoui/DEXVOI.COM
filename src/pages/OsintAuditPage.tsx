import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Lock, 
  Zap, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { OsintSecurityAuditor } from '../components/OsintSecurityAuditor';
import { OsintSecurityAuditResult } from '../types';
import { navigateTo } from '../utils/navigation';

interface OsintAuditPageProps {
  onNavigateHome: () => void;
  onOpenPurchaseModal: (result: OsintSecurityAuditResult, target: string) => void;
}

export const OsintAuditPage: React.FC<OsintAuditPageProps> = ({
  onNavigateHome,
  onOpenPurchaseModal
}) => {
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0F1F]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131B33] hover:bg-[#1E293B] border border-gray-700/70 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">Auditoría OSINT</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/servicios')}
              className="hidden sm:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => navigateTo('/precios')}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/20 cursor-pointer"
            >
              Ver Planes
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>DIAGNÓSTICO PERIMETRAL PASIVO EN TIEMPO REAL</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono mb-4">
          Escáner OSINT & Verificación de Cabeceras
        </h1>

        <p className="text-base sm:text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Verifique instantáneamente si su servidor web o el de su competencia filtra versiones de software, carece de protección contra clickjacking o tiene expuestos registros de correo sin blindaje.
        </p>
      </section>

      {/* Auditor Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OsintSecurityAuditor onOpenPurchaseModal={onOpenPurchaseModal} />
      </div>

      {/* Methodology & Ethical Protocols */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
        <div className="p-8 rounded-2xl bg-[#0D1326] border border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#F5A623]" />
            <h3 className="text-lg font-bold text-white font-mono">
              Protocolo de Reconocimiento Pasivo No Lesivo
            </h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            Nuestras herramientas de diagnóstico operan bajo las normativas internacionales de <strong>Ethical Hacking y estándares OWASP</strong>. El escaneo no envía cargas maliciosas ni realiza intentos de intrusión; analiza exclusivamente los metadatos y cabeceras que el servidor web emite en sus respuestas públicas HTTP/HTTPS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-gray-400">
            <div className="p-3 rounded-lg bg-[#131B33] border border-gray-800">
              <span className="text-emerald-400 font-bold block mb-1">0% Impacto</span>
              <span>Sin degradación del rendimiento de su servidor o web.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#131B33] border border-gray-800">
              <span className="text-[#38BDF8] font-bold block mb-1">Confidencial</span>
              <span>Tratamiento de resultados bajo estricto secreto profesional.</span>
            </div>
            <div className="p-3 rounded-lg bg-[#131B33] border border-gray-800">
              <span className="text-[#F5A623] font-bold block mb-1">Remediación</span>
              <span>Recomendaciones de código directas listas para implementar.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Return home link */}
      <div className="text-center pt-12">
        <button
          onClick={onNavigateHome}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la página principal</span>
        </button>
      </div>

    </div>
  );
};
