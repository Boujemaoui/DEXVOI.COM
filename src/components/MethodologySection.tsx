import React from 'react';
import { SearchCode, Hammer, Rocket, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MethodologySectionProps {
  onOpenAuditModal: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ onOpenAuditModal }) => {
  const steps = [
    {
      number: '1',
      title: 'Diagnóstico Estructural y Auditoría',
      description: 'Evaluamos tu web, tu competencia, tu seguridad y tu posicionamiento actual sin costo.',
      icon: SearchCode,
      deliverables: ['Test de penetración y SSL', 'Auditoría Google Maps & SEO', 'Análisis de fugas de conversión'],
      duration: '48 - 72 Horas'
    },
    {
      number: '2',
      title: 'Construcción y Blindaje Digital',
      description: 'Edificamos un sistema rápido y seguro con protocolos de protección de datos y reservas online integradas.',
      icon: Hammer,
      deliverables: ['Código militar optimizado (<1.5s)', 'Cifrado de datos y cortafuegos', 'Motor de reservas automáticas'],
      duration: 'Fase 2: Implementación'
    },
    {
      number: '3',
      title: 'Aceleración y Captación Continua',
      description: 'Activamos SEO técnico y campañas dirigidas para posicionarte en primeros lugares y llenar tu agenda comercial.',
      icon: Rocket,
      deliverables: ['Posicionamiento Google Maps #1', 'Campañas Ads de alta conversión', 'Monitorización de seguridad 24/7'],
      duration: 'Escala Recurrente'
    }
  ];

  return (
    <section id="metodologia" className="py-24 bg-[#131315] relative border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] font-mono text-xs uppercase tracking-wider">
            <span>PROCESO DE INGENIERÍA EN 3 FASES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Metodología "El Arquitecto"
          </h2>

          <p className="text-gray-300 text-sm sm:text-base">
            Un flujo de trabajo riguroso, medible y sin sorpresas. Cada paso está diseñado para garantizar que tu inversión genere un retorno financiero tangible y una defensa inquebrantable.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-[#0066FF] transition-all relative flex flex-col justify-between group"
              >
                {/* Step Number Blueprint Watermark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#1E293B] border border-[#0066FF]/40 flex items-center justify-center text-[#F5A623] shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="font-mono text-4xl font-extrabold text-gray-700 group-hover:text-[#0066FF] transition-colors">
                    0{step.number}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-gray-800 space-y-2">
                    <div className="text-[11px] font-mono text-gray-400 uppercase">
                      Entregables Técnicos:
                    </div>
                    {step.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Plazo:</span>
                  <span className="text-[#F5A623] font-bold">{step.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step 1 Quick Start Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131B33] to-[#0D1326] border border-[#0066FF]/40 text-center max-w-3xl mx-auto shadow-xl">
          <h4 className="text-lg font-bold text-white font-mono uppercase mb-2">
            Comienza con el Paso 1: Diagnóstico Sin Costo
          </h4>
          <p className="text-sm text-gray-300 mb-6 max-w-xl mx-auto">
            Antes de gastar un solo euro o dólar, el Arquitecto auditará tu velocidad, brechas de ciberseguridad y visibilidad en Google Maps.
          </p>
          <button
            onClick={onOpenAuditModal}
            className="metallic-btn px-8 py-3.5 rounded font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Solicitar Diagnóstico Estructural de 5 Puntos</span>
          </button>
        </div>

      </div>
    </section>
  );
};
