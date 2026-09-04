import React from 'react';
import { Clock, EyeOff, ShieldAlert, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onOpenAuditModal: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAuditModal }) => {
  const problems = [
    {
      id: 'speed',
      badge: 'PÉRDIDA DE PACIENTES & COMENSALES',
      title: 'Web lenta = Clientes perdidos',
      question: '¿Tu web tarda más de 3 segundos en cargar y los usuarios abandonan tu menú o citas antes de reservar?',
      metric: 'Cada segundo de retraso destruye un 7% de tus conversiones.',
      icon: Clock,
      borderColor: 'border-red-500/30',
      badgeBg: 'bg-red-500/10 text-red-400'
    },
    {
      id: 'visibility',
      badge: 'VENTAS ENTREGADAS A TU COMPETENCIA',
      title: 'Invisible en Google Maps',
      question: '¿Tus competidores directos acaparan las primeras 3 posiciones en Google Maps mientras tu negocio no aparece?',
      metric: 'El 82% de las búsquedas locales "cerca de mí" terminan en una llamada o reserva en menos de 24h.',
      icon: EyeOff,
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-400'
    },
    {
      id: 'security',
      badge: 'RIESGO LEGAL & REPUTACIONAL',
      title: 'Vulnerable a ataques y filtraciones',
      question: '¿Manejas historiales médicos, datos de contacto o cobros online sin una auditoría de seguridad perimetral?',
      metric: 'Una filtración de datos destruye la reputación forjada durante años en cuestión de minutos.',
      icon: ShieldAlert,
      borderColor: 'border-blue-500/30',
      badgeBg: 'bg-blue-500/10 text-blue-400'
    }
  ];

  return (
    <section id="problema" className="py-20 bg-[#131315] relative border-t border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>DIAGNÓSTICO CRÍTICO DE NEGOCIO</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            ¿Tu presencia digital está frenando el crecimiento de tu negocio?
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base">
            La mayoría de clínicas y restaurantes pagan por webs que parecen atractivas por fuera, pero están rotas por dentro: lentas, invisibles y expuestas a amenazas.
          </p>
          <div className="w-16 h-1 bg-red-500/50 mx-auto rounded-full mt-4"></div>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.id}
                className={`glass-panel p-6 rounded-xl border ${problem.borderColor} hover:border-[#0066FF] transition-all flex flex-col justify-between group relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${problem.badgeBg}`}>
                      {problem.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-mono uppercase mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {problem.question}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800/80 text-xs font-mono text-gray-400">
                  <span className="text-[#F5A623] font-bold block mb-1">Impacto Financiero:</span>
                  {problem.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Equation Formula Box */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-xl border border-[#0066FF]/40 bg-gradient-to-b from-[#131B33]/80 to-[#0A0F1F] shadow-[0_0_30px_rgba(0,102,255,0.15)] text-center relative overflow-hidden">
          <div className="text-xs font-mono text-[#0066FF] uppercase tracking-widest mb-4">
            LA ECUACIÓN DE CRECIMIENTO DIGITAL SEGURO
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-4 font-mono">
            {/* Component 1: Seguridad */}
            <div className="flex items-center gap-3 bg-[#1E293B] px-5 py-3 rounded-lg border border-[#0066FF]/40">
              <Shield className="w-6 h-6 text-[#0066FF]" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Pilar 01</div>
                <div className="text-sm font-bold text-white uppercase">BLINDAJE & SEGURIDAD</div>
              </div>
            </div>

            <span className="text-2xl font-bold text-[#F5A623]">+</span>

            {/* Component 2: Velocidad & SEO */}
            <div className="flex items-center gap-3 bg-[#1E293B] px-5 py-3 rounded-lg border border-[#0066FF]/40">
              <Zap className="w-6 h-6 text-[#0066FF]" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Pilar 02</div>
                <div className="text-sm font-bold text-white uppercase">VELOCIDAD & SEO LOCAL</div>
              </div>
            </div>

            <span className="text-2xl font-bold text-[#F5A623]">=</span>

            {/* Result: Más Ventas */}
            <div className="flex items-center gap-3 bg-[#F5A623]/10 px-6 py-3 rounded-lg border border-[#F5A623]/60 shadow-[0_0_15px_rgba(245,166,35,0.2)]">
              <TrendingUp className="w-7 h-7 text-[#F5A623]" />
              <div className="text-left">
                <div className="text-xs text-[#F5A623]">Resultado</div>
                <div className="text-base font-extrabold text-[#F5A623] uppercase">MÁS VENTAS & RESERVAS</div>
              </div>
            </div>
          </div>

          {/* Impact Closing Paragraph */}
          <div className="mt-6 pt-6 border-t border-gray-800/80 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              No necesitas otra página web decorativa. Necesitas una <strong className="text-white font-semibold">arquitectura digital sólida</strong> que elimine vulnerabilidades técnicas, inspire confianza absoluta y transforme búsquedas locales en ingresos recurrentes y predecibles.
            </p>

            <button
              onClick={onOpenAuditModal}
              className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-[#F5A623] hover:text-[#ffd78a] uppercase font-bold tracking-wider underline underline-offset-4"
            >
              <span>Solicita un diagnóstico para identificar tus fugas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
