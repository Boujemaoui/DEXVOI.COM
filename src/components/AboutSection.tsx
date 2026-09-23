import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Code2, 
  FileCheck2, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutSectionProps {
  onOpenAuditModal: () => void;
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAuditModal,
  onContactClick
}) => {
  const { t, language } = useLanguage();

  const handleContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        onOpenAuditModal();
      }
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden bg-[#0A0F1F] border-t border-gray-800/80">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#F5A623]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] text-xs font-mono font-bold tracking-wider uppercase">
            <UserCheck className="w-3.5 h-3.5" />
            {t.aboutSection.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {t.aboutSection.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-sky-400 to-[#F5A623]">
              {t.aboutSection.titleHighlight}
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {t.aboutSection.subtitle}
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Architect Profile & Core Identity Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#0D1326] border border-[#0066FF]/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#0066FF]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#131B33] border border-[#0066FF]/60 flex items-center justify-center text-white shadow-lg">
                    <Terminal className="w-6 h-6 text-[#F5A623]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                      Dexvoi Labs
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      {t.aboutSection.role}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFICADO</span>
                </div>
              </div>

              {/* Architect Quote */}
              <div className="p-4 rounded-xl bg-[#131B33]/80 border border-gray-800 text-sm text-gray-300 italic leading-relaxed relative">
                <span className="text-2xl text-[#0066FF] font-serif leading-none block mb-1">“</span>
                {t.aboutSection.quote}
              </div>

              {/* Direct Accountability Guarantees */}
              <div className="space-y-3 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-2.5 p-2 rounded bg-black/30 border border-gray-800/80">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Réponse directe en moins de 24h garanties' 
                      : language === 'en' 
                      ? 'Guaranteed direct response within 24 hours' 
                      : 'Respuesta directa en menos de 24h garantizadas'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded bg-black/30 border border-gray-800/80">
                  <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Zéro commercial : dialogue direct avec l’ingénieur'
                      : language === 'en'
                      ? 'Zero sales reps: direct engineering communication'
                      : 'Cero comerciales: diálogo directo con el ingeniero'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded bg-black/30 border border-gray-800/80">
                  <FileCheck2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Audits techniques certifiés et vérifiables'
                      : language === 'en'
                      ? 'Certified and independently verifiable audits'
                      : 'Auditorías técnicas certificadas y verificables'}
                  </span>
                </div>
              </div>
            </div>

            {/* Geographical Footprint */}
            <div className="pt-6 mt-6 border-t border-gray-800 text-xs font-mono text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                {t.aboutSection.locationNotice}
              </span>
            </div>
          </div>

          {/* Right Column: Mission & 3 Non-Negotiable Standards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Story & Context Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0D1326]/90 border border-gray-800 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                {t.aboutSection.storyTitle}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t.aboutSection.storyP1}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t.aboutSection.storyP2}
              </p>
            </div>

            {/* The 3 Non-Negotiable Standards */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">
                {t.aboutSection.principlesTitle}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Standard 1 */}
                <div className="p-4 rounded-xl bg-[#131B33]/60 border border-[#0066FF]/20 hover:border-[#0066FF]/50 transition-all flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.aboutSection.principle1Title}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {t.aboutSection.principle1Desc}
                  </p>
                </div>

                {/* Standard 2 */}
                <div className="p-4 rounded-xl bg-[#131B33]/60 border border-[#0066FF]/20 hover:border-[#0066FF]/50 transition-all flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{t.aboutSection.principle2Title}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {t.aboutSection.principle2Desc}
                  </p>
                </div>

                {/* Standard 3 */}
                <div className="p-4 rounded-xl bg-[#131B33]/60 border border-[#0066FF]/20 hover:border-[#0066FF]/50 transition-all flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                    <span>{t.aboutSection.principle3Title}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {t.aboutSection.principle3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Callout */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0066FF]/15 via-[#131B33] to-[#F5A623]/10 border border-[#0066FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-semibold">
                  {language === 'fr'
                    ? 'Besoin d’un diagnostic d’ingénierie sans engagement ?'
                    : language === 'en'
                    ? 'Need an engineering diagnosis with zero sales pitch?'
                    : '¿Necesitas un diagnóstico técnico sin intermediarios?'}
                </p>
                <p className="text-xs text-gray-400">
                  {language === 'fr'
                    ? 'Nous évaluons vos systèmes et répondons sous 24h.'
                    : language === 'en'
                    ? 'We evaluate your web systems and respond within 24h.'
                    : 'Evaluamos tu infraestructura y respondemos en menos de 24h.'}
                </p>
              </div>

              <button
                onClick={handleContact}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white font-mono text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>{t.aboutSection.ctaBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
