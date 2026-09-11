import React from 'react';
import { Clock, EyeOff, ShieldAlert, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ProblemSectionProps {
  onOpenAuditModal: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAuditModal }) => {
  const { t, language } = useLanguage();

  const problems = [
    {
      id: 'speed',
      badge: language === 'fr' ? 'PERTE DE PATIENTS & CLIENTS' : language === 'en' ? 'LOST PATIENTS & GUESTS' : 'PÉRDIDA DE PACIENTES & COMENSALES',
      title: t.problem.leak1Title,
      question: t.problem.leak1Desc,
      metric: t.problem.leak1Impact,
      icon: Clock,
      borderColor: 'border-red-500/30',
      badgeBg: 'bg-red-500/10 text-red-400'
    },
    {
      id: 'visibility',
      badge: language === 'fr' ? 'RÉSERVATIONS OFFERTES AUX CONCURRENTS' : language === 'en' ? 'LEADS HANDED TO COMPETITORS' : 'VENTAS ENTREGADAS A TU COMPETENCIA',
      title: t.problem.leak3Title,
      question: t.problem.leak3Desc,
      metric: t.problem.leak3Impact,
      icon: EyeOff,
      borderColor: 'border-amber-500/30',
      badgeBg: 'bg-amber-500/10 text-amber-400'
    },
    {
      id: 'security',
      badge: language === 'fr' ? 'RISQUE JURIDIQUE & RÉPUTATIONNEL' : language === 'en' ? 'LEGAL & REPUTATIONAL LIABILITY' : 'RIESGO LEGAL & REPUTACIONAL',
      title: t.problem.leak2Title,
      question: t.problem.leak2Desc,
      metric: t.problem.leak2Impact,
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
            <span>{t.problem.badge}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t.problem.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-[#F5A623]">
              {t.problem.titleHighlight}
            </span>
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base">
            {t.problem.subtitle}
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
                  <span className="text-[#F5A623] font-bold block mb-1">
                    {language === 'fr' ? 'Impact Financier :' : language === 'en' ? 'Financial Impact:' : 'Impacto Financiero:'}
                  </span>
                  {problem.metric}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Equation Formula Box */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-xl border border-[#0066FF]/40 bg-gradient-to-b from-[#131B33]/80 to-[#0A0F1F] shadow-[0_0_30px_rgba(0,102,255,0.15)] text-center relative overflow-hidden">
          <div className="text-xs font-mono text-[#0066FF] uppercase tracking-widest mb-4">
            {language === 'fr' ? 'L’ÉQUATION DE CROISSANCE DIGITALE SÉCURISÉE' : language === 'en' ? 'THE SECURE DIGITAL GROWTH EQUATION' : 'LA ECUACIÓN DE CRECIMIENTO DIGITAL SEGURO'}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-4 font-mono">
            {/* Component 1: Seguridad */}
            <div className="flex items-center gap-3 bg-[#1E293B] px-5 py-3 rounded-lg border border-[#0066FF]/40">
              <Shield className="w-6 h-6 text-[#0066FF]" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Pilar 01</div>
                <div className="text-sm font-bold text-white uppercase">
                  {language === 'fr' ? 'BLINDAGE & SÉCURITÉ' : language === 'en' ? 'SECURITY & HARDENING' : 'BLINDAJE & SEGURIDAD'}
                </div>
              </div>
            </div>

            <span className="text-2xl font-bold text-[#F5A623]">+</span>

            {/* Component 2: Velocidad & SEO */}
            <div className="flex items-center gap-3 bg-[#1E293B] px-5 py-3 rounded-lg border border-[#0066FF]/40">
              <Zap className="w-6 h-6 text-[#0066FF]" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Pilar 02</div>
                <div className="text-sm font-bold text-white uppercase">
                  {language === 'fr' ? 'VITESSE & SEO LOCAL' : language === 'en' ? 'SPEED & LOCAL SEO' : 'VELOCIDAD & SEO LOCAL'}
                </div>
              </div>
            </div>

            <span className="text-2xl font-bold text-[#F5A623]">=</span>

            {/* Result: Más Ventas */}
            <div className="flex items-center gap-3 bg-[#F5A623]/10 px-6 py-3 rounded-lg border border-[#F5A623]/60 shadow-[0_0_15px_rgba(245,166,35,0.2)]">
              <TrendingUp className="w-7 h-7 text-[#F5A623]" />
              <div className="text-left">
                <div className="text-xs text-[#F5A623]">
                  {language === 'fr' ? 'Résultat' : language === 'en' ? 'Outcome' : 'Resultado'}
                </div>
                <div className="text-base font-extrabold text-[#F5A623] uppercase">
                  {language === 'fr' ? 'PLUS DE CLIENTS & RÉSERVATIONS' : language === 'en' ? 'MORE REVENUE & BOOKINGS' : 'MÁS VENTAS & RESERVAS'}
                </div>
              </div>
            </div>
          </div>

          {/* Impact Closing Paragraph */}
          <div className="mt-6 pt-6 border-t border-gray-800/80 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              {language === 'fr'
                ? 'Vous n’avez pas besoin d’un énième site web décoratif. Vous avez besoin d’une architecture digitale solide qui élimine les vulnérabilités techniques, inspire une confiance absolue et transforme vos recherches locales en réservations directes.'
                : language === 'en'
                ? 'You do not need another cosmetic brochure website. You need resilient digital architecture that eliminates technical exploits, establishes unshakeable trust, and converts local searches into recurring revenue.'
                : 'No necesitas otra página web decorativa. Necesitas una arquitectura digital sólida que elimine vulnerabilidades técnicas, inspire confianza absoluta y transforme búsquedas locales en ingresos recurrentes y predecibles.'}
            </p>

            <button
              onClick={onOpenAuditModal}
              className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-[#F5A623] hover:text-[#ffd78a] uppercase font-bold tracking-wider underline underline-offset-4 cursor-pointer"
            >
              <span>{t.problem.ctaAudit}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

