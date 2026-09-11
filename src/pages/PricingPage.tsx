import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Lock, 
  Zap, 
  FileText, 
  Sparkles, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { navigateTo } from '../utils/navigation';

interface PricingPageProps {
  onNavigateHome: () => void;
  onOpenPdfModal: (tier: 'basic' | 'complete' | 'premium') => void;
  onOpenAuditModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigateHome,
  onOpenPdfModal,
  onOpenAuditModal
}) => {
  const { language } = useLanguage();

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
              <span>
                {language === 'fr' ? "Retour à l'accueil" : language === 'en' ? 'Back to Home' : 'Volver al Inicio'}
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-[#635BFF] font-bold">
                {language === 'fr' ? 'Tarifs & Formules' : language === 'en' ? 'Pricing & Plans' : 'Precios & Planes'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector variant="header" />
            <button
              onClick={() => navigateTo('/servicios')}
              className="hidden sm:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              {language === 'es' ? 'Ver Servicios' : 'Services'}
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>
                {language === 'fr' ? 'Diagnostic Gratuit' : language === 'en' ? 'Free Diagnostic' : 'Diagnóstico Gratuito'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-[#635BFF]/40 text-xs font-mono text-[#A5B4FC] mb-4">
          <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
          <span>
            {language === 'fr' 
              ? 'PAIEMENT UNIQUE · AUCUN ABONNEMENT CACHÉ' 
              : language === 'en' 
              ? 'ONE-TIME PAYMENT · NO HIDDEN SUBSCRIPTIONS' 
              : 'PAGO ÚNICO · SIN SUSCRIPCIONES OCULTAS'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono mb-4">
          {language === 'fr' 
            ? "Tarifs Transparents d'Audit et Sécurisation" 
            : language === 'en' 
            ? 'Transparent Audit & Security Pricing' 
            : 'Tarifas Transparentes de Auditoría y Blindaje'}
        </h1>

        <p className="text-base sm:text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {language === 'fr'
            ? 'Choisissez le niveau de profondeur forensique pour votre entreprise. Tous les rapports sont générés avec livraison prioritaire en PDF et processeur sécurisé Stripe.'
            : language === 'en'
            ? 'Choose the forensic depth level for your business. All reports are generated with priority PDF delivery and official Stripe processor.'
            : 'Elija el nivel de profundidad forense para su negocio. Todos los informes se generan con entrega prioritaria en PDF y procesador oficial Stripe.'}
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Starter */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col justify-between relative hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono text-gray-400 font-bold tracking-widest uppercase">
                {language === 'fr' ? 'RAPPORT STARTER' : language === 'en' ? 'STARTER REPORT' : 'INFORME STARTER'}
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">19€</span>
                <span className="text-xs text-gray-400">
                  {language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time payment' : 'pago único'}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                {language === 'fr' 
                  ? 'Idéal pour cliniques ou commerces locaux souhaitant un contrôle rapide des failles critiques et de la vitesse.'
                  : language === 'en' 
                  ? 'Ideal for clinics or local businesses wanting a quick check of critical flaws and speed performance.'
                  : 'Ideal para clínicas o comercios locales que desean una revisión rápida de fallos críticos y velocidad.'}
              </p>
              <div className="pt-4 border-t border-gray-800 space-y-2.5 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Analyse périmétrique de vitesse Core Web Vitals' 
                      : language === 'en' 
                      ? 'Core Web Vitals speed perimeter analysis' 
                      : 'Análisis perimetral de velocidad Core Web Vitals'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Détection des vulnérabilités de certificat SSL' 
                      : language === 'en' 
                      ? 'SSL certificate vulnerability detection' 
                      : 'Detección de vulnerabilidades en certificado SSL'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Revue basique de la fiche Google Maps' 
                      : language === 'en' 
                      ? 'Basic Google Maps listing audit' 
                      : 'Revisión básica de ficha Google Maps'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Rapport exécutif digital au format PDF' 
                      : language === 'en' 
                      ? 'Digital executive report in PDF' 
                      : 'Informe ejecutivo digital en PDF'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('basic')}
              className="mt-8 w-full py-3 rounded-xl bg-[#1E293B] hover:bg-[#2A374F] text-white text-xs font-mono font-bold transition-all border border-gray-700 cursor-pointer"
            >
              {language === 'fr' 
                ? 'Acheter Rapport Starter (19€)' 
                : language === 'en' 
                ? 'Purchase Starter Report (19€)' 
                : 'Comprar Informe Starter (19€)'}
            </button>
          </div>

          {/* Tier 2: Comprehensive (Featured) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111A38] border-2 border-[#0066FF] flex flex-col justify-between relative shadow-2xl shadow-[#0066FF]/20 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-mono font-bold tracking-wider shadow">
              {language === 'fr' ? 'LE PLUS RECOMMANDÉ' : language === 'en' ? 'MOST RECOMMENDED' : 'MÁS RECOMENDADO'}
            </div>
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#38BDF8] font-bold tracking-widest uppercase">
                {language === 'fr' ? 'AUDIT COMPLET FORENSIQUE' : language === 'en' ? 'COMPREHENSIVE AUDIT' : 'COMPREHENSIVE AUDIT'}
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">49€</span>
                <span className="text-xs text-gray-300">
                  {language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time payment' : 'pago único'}
                </span>
              </div>
              <p className="text-xs text-gray-200 font-sans">
                {language === 'fr'
                  ? 'Audit forensique complet du positionnement local, fuites de prospects et vulnérabilités de cybersécurité.'
                  : language === 'en'
                  ? 'Complete forensic audit of local positioning, lead leaks, and cybersecurity vulnerabilities.'
                  : 'Auditoría forense completa de posicionamiento local, fugas de clientes y fallos de ciberseguridad.'}
              </p>
              <div className="pt-4 border-t border-gray-700/80 space-y-2.5 text-xs font-mono text-gray-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Tout ce qui est inclus dans le rapport Starter' 
                      : language === 'en' 
                      ? 'Everything included in the Starter report' 
                      : 'Todo lo incluido en el informe Starter'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Audit approfondi des en-têtes HTTP de sécurité' 
                      : language === 'en' 
                      ? 'In-depth HTTP security headers audit' 
                      : 'Auditoría profunda de cabeceras HTTP de seguridad'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Diagnostic SEO Local et faiblesses face aux concurrents' 
                      : language === 'en' 
                      ? 'Local SEO diagnostic and competitor gap analysis' 
                      : 'Diagnóstico SEO Local y brechas ante competencia'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Feuille de route prioritaire étape par étape en PDF' 
                      : language === 'en' 
                      ? 'Prioritized step-by-step PDF roadmap' 
                      : 'Hoja de ruta prioritaria paso a paso en PDF'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Support prioritaire par email pour vos questions' 
                      : language === 'en' 
                      ? 'Priority email support for technical questions' 
                      : 'Soporte prioritario por email para dudas'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('complete')}
              className="mt-8 w-full py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/30 cursor-pointer"
            >
              {language === 'fr' 
                ? 'Acheter Audit Complet (49€)' 
                : language === 'en' 
                ? 'Purchase Comprehensive (49€)' 
                : 'Comprar Comprehensive (49€)'}
            </button>
          </div>

          {/* Tier 3: Premium */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col justify-between relative hover:border-gray-700 transition-all">
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#F5A623] font-bold tracking-widest uppercase">
                {language === 'fr' ? 'PREMIUM FORENSIQUE + APPEL' : language === 'en' ? 'PREMIUM FORENSIC + CALL' : 'PREMIUM FORENSIC + CALL'}
              </div>
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-4xl font-extrabold text-white">99€</span>
                <span className="text-xs text-gray-400">
                  {language === 'fr' ? 'paiement unique' : language === 'en' ? 'one-time payment' : 'pago único'}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                {language === 'fr'
                  ? 'Pour les entreprises recherchant une protection périmétrique maximale avec séance technique 1-à-1.'
                  : language === 'en'
                  ? 'For businesses seeking maximum perimeter protection with a 1-on-1 technical consulting session.'
                  : 'Para negocios que buscan el máximo blindaje perimetral con sesión técnica de consultoría 1 a 1.'}
              </p>
              <div className="pt-4 border-t border-gray-800 space-y-2.5 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Tout ce qui est inclus dans le Comprehensive' 
                      : language === 'en' 
                      ? 'Everything included in Comprehensive' 
                      : 'Todo lo incluido en el Comprehensive'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Scan OSINT complet des ports et serveurs DNS' 
                      : language === 'en' 
                      ? 'Full OSINT scan of ports and DNS servers' 
                      : 'Escaneo OSINT completo de puertos y servidores DNS'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Vérification des passerelles de paiement et conformité RGPD' 
                      : language === 'en' 
                      ? 'Payment gateway review and GDPR compliance check' 
                      : 'Revisión de pasarelas de pago y cumplimiento RGPD'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Séance privée de 30 min en visioconférence avec un architecte' 
                      : language === 'en' 
                      ? 'Private 30-min video call session with an architect' 
                      : 'Sesión privada de 30 min por videollamada con arquitecto'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenPdfModal('premium')}
              className="mt-8 w-full py-3 rounded-xl bg-[#F5A623] hover:bg-[#e0961f] text-black text-xs font-mono font-bold transition-all cursor-pointer"
            >
              {language === 'fr' 
                ? 'Acheter Premium + Appel (99€)' 
                : language === 'en' 
                ? 'Purchase Premium + Call (99€)' 
                : 'Comprar Premium + Call (99€)'}
            </button>
          </div>

        </div>
      </section>

      {/* Enterprise / Custom Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono text-[#38BDF8] font-bold uppercase">
              {language === 'fr' ? 'DÉVELOPPEMENT INTÉGRAL' : language === 'en' ? 'FULL-STACK DEVELOPMENT' : 'DESARROLLO INTEGRAL'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {language === 'fr'
                ? 'Souhaitez-vous que notre équipe conçoive votre nouvelle architecture complète ?'
                : language === 'en'
                ? 'Would you like our team to build your complete new architecture?'
                : '¿Desea que nuestro equipo construya su nueva arquitectura completa?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {language === 'fr'
                ? 'Nous développons des projets intégraux : web ultra-rapide, référencement local dominant, système de réservation et agents IA dès 890€.'
                : language === 'en'
                ? 'We develop comprehensive projects: ultra-fast web, dominating local SEO, booking systems, and AI agents starting from 890€.'
                : 'Desarrollamos proyectos integrales de web ultrarrápida, posicionamiento local dominante, sistema de reservas y agentes de IA desde 890€.'}
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer"
          >
            {language === 'fr' ? 'Consulter Projet sur Mesure' : language === 'en' ? 'Consult Custom Project' : 'Consultar Proyecto a Medida'}
          </button>
        </div>
      </section>

      {/* Return home link */}
      <div className="text-center pt-12">
        <button
          onClick={onNavigateHome}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {language === 'fr' 
              ? "Retour à la page d'accueil" 
              : language === 'en' 
              ? 'Back to main page' 
              : 'Volver a la página principal'}
          </span>
        </button>
      </div>

    </div>
  );
};

