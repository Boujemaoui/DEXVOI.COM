import React from 'react';
import { 
  Shield, 
  ArrowLeft, 
  Zap, 
  Search, 
  Lock, 
  Calendar, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Smartphone, 
  Server, 
  FileCode, 
  Users, 
  Award,
  Sparkles
} from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { navigateTo } from '../utils/navigation';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigateHome,
  onOpenAuditModal
}) => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Header / Nav */}
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
              <span className="text-xs font-mono text-[#38BDF8] font-bold">
                {language === 'es' ? 'Servicios' : 'Services'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector variant="header" />
            <button
              onClick={() => navigateTo('/precios')}
              className="hidden sm:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Voir Tarifs' : language === 'en' ? 'View Pricing' : 'Ver Tarifas'}
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>
                {language === 'fr' ? 'Demander un Audit' : language === 'en' ? 'Request Audit' : 'Solicitar Auditoría'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-[#0066FF]/40 text-xs font-mono text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>
              {language === 'fr' 
                ? "ARCHITECTURE DIGITALE D'ÉLITE" 
                : language === 'en' 
                ? 'ELITE DIGITAL ARCHITECTURE' 
                : 'ARQUITECTURA DIGITAL DE ÉLITE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
            {language === 'fr' 
              ? 'Services de Sécurisation, Vitesse & Conversion' 
              : language === 'en' 
              ? 'Shielding, Speed & Conversion Services' 
              : 'Servicios de Blindaje, Velocidad & Conversión'}
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            {language === 'fr'
              ? 'Nous éliminons la fragilité technique des modèles génériques. Nous construisons des infrastructures ultra-rapides, blindées contre les cyberattaques et optimisées pour dominer sur Google Maps et convertir des clients à haute valeur.'
              : language === 'en'
              ? 'We eliminate the technical fragility of generic templates. We build ultra-fast infrastructures, fortified against attacks and engineered to dominate Google Maps and capture high-value clients.'
              : 'Eliminamos la fragilidad técnica de las plantillas genéricas. Construimos infraestructuras ultrarrápidas, blindadas contra ataques y diseñadas para dominar en Google Maps y captar pacientes o clientes de alto valor.'}
          </p>
        </div>
      </section>

      {/* The 5 Pillars in Detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Pillar 1: Web Architecture */}
        <div id="arquitectura" className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#0066FF]/50 flex items-center justify-center text-[#38BDF8]">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#0066FF] font-bold tracking-widest uppercase">
                    {language === 'fr' ? 'PILIER 01' : language === 'en' ? 'PILLAR 01' : 'PILAR 01'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {language === 'fr' 
                      ? 'Architecture Web & Performance Extrême' 
                      : language === 'en' 
                      ? 'Web Architecture & Extreme Performance' 
                      : 'Arquitectura Web & Rendimiento Extremo'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {language === 'fr'
                  ? '53% des utilisateurs mobiles quittent un site qui met plus de 3 secondes à charger. Nous concevons avec React, Vite et des architectures statiques déployées sur des CDN mondiaux qui chargent en moins de 0,8 seconde sur n\'importe quel appareil.'
                  : language === 'en'
                  ? '53% of mobile users abandon a site taking over 3 seconds to load. We develop using React, Vite, and static architectures on global CDNs loading in under 0.8 seconds on any device.'
                  : 'El 53% de los usuarios móviles abandonan una web que tarda más de 3 segundos en cargar. Desarrollamos con React, Vite y arquitecturas estáticas servidas en CDN globales que cargan en menos de 0.8 segundos en cualquier dispositivo.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Core Web Vitals 95+ garantis' 
                      : language === 'en' 
                      ? 'Guaranteed 95+ Core Web Vitals' 
                      : 'Core Web Vitals 95+ garantizados'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Chargement sub-seconde en réseaux mobiles 4G/5G' 
                      : language === 'en' 
                      ? 'Sub-second load on 4G/5G mobile networks' 
                      : 'Carga subsegundo en redes móviles 4G/5G'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Zéro dépendance aux extensions lentes' 
                      : language === 'en' 
                      ? 'Zero dependency on slow plugins' 
                      : 'Cero dependencia de plugins lentos'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Design optimisé pour une conversion maximale' 
                      : language === 'en' 
                      ? 'Optimized layout for maximum conversion' 
                      : 'Diseño optimizado para máxima conversión'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-emerald-400">&lt; 0.8s</div>
              <p className="text-xs text-gray-400 font-mono">
                {language === 'fr' 
                  ? 'Temps de chargement moyen vérifié sur GTmetrix et PageSpeed.' 
                  : language === 'en' 
                  ? 'Average load time verified on GTmetrix and PageSpeed.' 
                  : 'Tiempo de carga promedio verificado en GTmetrix y PageSpeed.'}
              </p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Auditer Ma Vitesse' : language === 'en' ? 'Audit My Speed' : 'Auditar Mi Velocidad'}
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 2: Local SEO & Google Maps */}
        <div id="seo-local" className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#F5A623]/50 flex items-center justify-center text-[#F5A623]">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#F5A623] font-bold tracking-widest uppercase">
                    {language === 'fr' ? 'PILIER 02' : language === 'en' ? 'PILLAR 02' : 'PILAR 02'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {language === 'fr' 
                      ? 'Positionnement Local Dominant (Google Maps)' 
                      : language === 'en' 
                      ? 'Dominant Local SEO (Google Maps)' 
                      : 'Posicionamiento Local Dominante (Google Maps)'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {language === 'fr'
                  ? 'Pour une clinique ou un commerce, 80% des clients proviennent de recherches géolocalisées ("près de chez moi"). Nous optimisons votre profil Google Business, intégrons le balisage Schema.org et bâtissons votre autorité locale vers le prestigieux "Local 3-Pack".'
                  : language === 'en'
                  ? 'For a clinic or business, 80% of customers come from proximity queries ("near me"). We optimize your Google Business profile, implement Schema.org structured data, and build local relevance to reach the coveted "Local 3-Pack".'
                  : 'Para una clínica dental o un restaurante, el 80% de los clientes provienen de búsquedas de proximidad ("cerca de mí"). Optimizamos su perfil de Google Business, implementamos marcado estructurado Schema.org y construimos relevancia local para alcanzar el codiciado "Local 3-Pack".'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Audit et optimisation Google Business Profile' 
                      : language === 'en' 
                      ? 'Google Business Profile audit & optimization' 
                      : 'Auditoría y optimización Google Business Profile'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Balisage Schema MedicalClinic / Restaurant' 
                      : language === 'en' 
                      ? 'MedicalClinic / Restaurant Schema structure' 
                      : 'Estructura Schema MedicalClinic / Restaurant'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Citations et cohérence NAP locale' 
                      : language === 'en' 
                      ? 'Citations and local NAP consistency' 
                      : 'Citaciones y consistencia NAP local'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? "Stratégie de collecte d'avis sécurisée" 
                      : language === 'en' 
                      ? 'Fortified review capture strategy' 
                      : 'Estrategia de captación de reseñas blindada'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-[#F5A623]">Top 3 Pack</div>
              <p className="text-xs text-gray-400 font-mono">
                {language === 'fr' 
                  ? 'Visibilité prioritaire sur la carte locale où se déclenchent appels et réservations.' 
                  : language === 'en' 
                  ? 'Priority presence on the local map where calls and reservations happen.' 
                  : 'Presencia prioritaria en el mapa local donde se deciden las llamadas y reservas.'}
              </p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#e0961f] text-black text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Auditer la Fiche Maps' : language === 'en' ? 'Audit Maps Listing' : 'Auditar Ficha en Maps'}
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 3: Defensive Cybersecurity & OSINT */}
        <div id="ciberseguridad" className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">
                    {language === 'fr' ? 'PILIER 03' : language === 'en' ? 'PILLAR 03' : 'PILAR 03'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {language === 'fr' 
                      ? 'Hacking Éthique & Protection Périmétrique' 
                      : language === 'en' 
                      ? 'Ethical Hacking & Perimeter Shielding' 
                      : 'Ethical Hacking & Blindaje Perimetral'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {language === 'fr'
                  ? 'Les sites professionnels sont souvent victimes d\'injections de spams, d\'usurpations d\'identité et de fuites d\'e-mails professionnels. Nous auditons les en-têtes HTTP critiques (HSTS, CSP, X-Frame-Options), sécurisons les e-mails (SPF, DKIM, DMARC) et blindons le serveur.'
                  : language === 'en'
                  ? 'Professional websites frequently suffer spam injection, impersonation, and corporate email leaks. We audit critical HTTP headers (HSTS, CSP, X-Frame-Options), verify email security (SPF, DKIM, DMARC), and fortify the server.'
                  : 'Las webs médicas y de hostelería son víctimas frecuentes de inyección de enlaces spam, suplantación de identidad y fugas de correos corporativos. Auditamos cabeceras HTTP críticas (HSTS, CSP, X-Frame-Options), verificamos la seguridad del correo (SPF, DKIM, DMARC) y blindamos el servidor.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Configuration stricte HSTS et Content-Security-Policy' 
                      : language === 'en' 
                      ? 'Strict HSTS and Content-Security-Policy configuration' 
                      : 'Configuración estricta HSTS y Content-Security-Policy'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Protection anti-usurpation DMARC / SPF' 
                      : language === 'en' 
                      ? 'Anti-phishing DMARC / SPF protection' 
                      : 'Protección anti-phishing DMARC / SPF'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Audit des ports ouverts et métadonnées exposées' 
                      : language === 'en' 
                      ? 'Open ports and exposed metadata audit' 
                      : 'Auditoría de puertos abiertos y metadatos expuestos'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Conformité RGPD formulaires et cookies' 
                      : language === 'en' 
                      ? 'GDPR compliance in forms and cookies' 
                      : 'Cumplimiento RGPD en formularios y cookies'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-emerald-400">A+ Security</div>
              <p className="text-xs text-gray-400 font-mono">
                {language === 'fr' 
                  ? 'Note maximale sur Mozilla Observatory et SSL Labs.' 
                  : language === 'en' 
                  ? 'Top grade on Mozilla Observatory and SSL Labs.' 
                  : 'Calificación máxima en Mozilla Observatory y SSL Labs.'}
              </p>
              <button
                onClick={() => navigateTo('/auditoria-seguridad')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Tester le Scanner OSINT' : language === 'en' ? 'Try OSINT Scanner' : 'Probar Escáner OSINT'}
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 4: Booking Systems */}
        <div id="reservas" className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
                    {language === 'fr' ? 'PILIER 04' : language === 'en' ? 'PILLAR 04' : 'PILAR 04'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {language === 'fr' 
                      ? 'Systèmes de Réservation Avancés & Sans Commission' 
                      : language === 'en' 
                      ? 'Advanced Booking Systems & Zero Commissions' 
                      : 'Sistemas de Reservas Avanzados & Sin Comisiones'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {language === 'fr'
                  ? 'Cessez de céder jusqu\'à 15% ou 3€ par patient ou client à des plateformes intermédiaires. Nous intégrons votre propre système synchronisé avec Google Calendar, confirmation automatique par SMS/WhatsApp et gestion des no-shows avec empreinte bancaire.'
                  : language === 'en'
                  ? 'Stop giving away up to 15% or €3 per patient or guest to intermediary platforms. We integrate proprietary booking systems synced with Google Calendar, automatic SMS/WhatsApp confirmation, and guaranteed no-show protection.'
                  : 'Deje de regalar hasta el 15% o 3€ por comensal o paciente a plataformas intermediarias como TheFork o Doctoralia. Integramos sistemas propios sincronizados con Google Calendar, confirmación automática por SMS/WhatsApp y política de no-shows con fianza o tarjeta en garantía.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Zéro commission récurrente par réservation' 
                      : language === 'en' 
                      ? 'Zero recurring commissions per booking' 
                      : 'Cero comisiones recurrentes por reserva'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Synchronisation bidirectionnelle en temps réel' 
                      : language === 'en' 
                      ? 'Real-time two-way synchronization' 
                      : 'Sincronización bidireccional en tiempo real'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Rappels automatiques pour réduire les annulations' 
                      : language === 'en' 
                      ? 'Automated reminders to prevent cancellations' 
                      : 'Recordatorios automáticos para reducir cancelaciones'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Encaissement d\'acomptes sécurisé via Stripe' 
                      : language === 'en' 
                      ? 'Tokenized deposit collection via Stripe' 
                      : 'Cobro de depósitos tokenizado con Stripe'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {language === 'fr' ? '0% Commission' : language === 'en' ? '0% Commission' : '0% Comisión'}
              </div>
              <p className="text-xs text-gray-400 font-mono">
                {language === 'fr' 
                  ? '100% de la marge reste dans votre entreprise. Fichier clients propriétaire.' 
                  : language === 'en' 
                  ? '100% of the margin stays in your business. Proprietary customer database.' 
                  : 'El 100% del margen se queda en su negocio. Base de datos de clientes propia.'}
              </p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Demander une Démonstration' : language === 'en' ? 'Request Demo' : 'Solicitar Demostración'}
              </button>
            </div>
          </div>
        </div>

        {/* Pillar 5: AI Agents */}
        <div id="agentes-ia" className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-purple-500/50 flex items-center justify-center text-purple-400">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-purple-400 font-bold tracking-widest uppercase">
                    {language === 'fr' ? 'PILIER 05' : language === 'en' ? 'PILLAR 05' : 'PILAR 05'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {language === 'fr' 
                      ? "Agents d'Intelligence Artificielle 24/7" 
                      : language === 'en' 
                      ? '24/7 Artificial Intelligence Agents' 
                      : 'Agentes de Inteligencia Artificial 24/7'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {language === 'fr'
                  ? '40% des clients cherchent un rendez-vous ou une table en dehors des heures d\'ouverture. Nos assistants IA qualifient l\'utilisateur, répondent aux questions fréquentes en plusieurs langues (FR, EN, ES) et planifient les rendez-vous sans intervention humaine.'
                  : language === 'en'
                  ? '40% of clients look for appointments or tables outside of business hours. Our AI assistants qualify leads, answer FAQs in multiple languages (FR, EN, ES), and schedule directly without human intervention.'
                  : 'El 40% de los pacientes y comensales buscan cita o mesa fuera del horario laboral. Nuestros asistentes virtuales cualifican al usuario, resuelven dudas clínicas o de cartas/alérgenos en múltiples idiomas (Español, Francés, Inglés) y agendan directamente sin intervención humana.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Disponibilité continue 24h/24 et 7j/7' 
                      : language === 'en' 
                      ? 'Uninterrupted 24/7 customer assistance' 
                      : 'Atención ininterrumpida las 24 horas del día'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Qualification instantanée des prospects qualifiés' 
                      : language === 'en' 
                      ? 'Instant qualification of high-value leads' 
                      : 'Cualificación instantánea de leads cualificados'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Multilingue natif (FR / EN / ES)' 
                      : language === 'en' 
                      ? 'Native multilingual (FR / EN / ES)' 
                      : 'Multilingüe nativo (FR / EN / ES)'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {language === 'fr' 
                      ? 'Intégration CRM et alertes instantanées par email' 
                      : language === 'en' 
                      ? 'CRM integration and instant email alerts' 
                      : 'Integración con CRM y alertas por email'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-purple-400">24/7 Leads</div>
              <p className="text-xs text-gray-400 font-mono">
                {language === 'fr' 
                  ? 'Ne manquez plus jamais un prospect pendant la nuit ou les jours fériés.' 
                  : language === 'en' 
                  ? 'Never lose another prospective client by missing after-hours queries.' 
                  : 'Nunca más pierda un cliente potencial por no responder de noche o en festivo.'}
              </p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                {language === 'fr' ? 'Configurer Mon Agent' : language === 'en' ? 'Configure My Agent' : 'Configurar Mi Agente'}
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0D1326] border border-gray-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {language === 'fr' 
                ? 'Pourquoi DEXVOI surpasse les agences conventionnelles ?' 
                : language === 'en' 
                ? 'Why DEXVOI outperforms conventional agencies' 
                : '¿Por qué DEXVOI supera a las agencias convencionales?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mt-2">
              {language === 'fr' 
                ? 'Ingénierie sur mesure face aux modèles préfabriqués.' 
                : language === 'en' 
                ? 'Custom engineered architecture versus pre-built templates.' 
                : 'Arquitectura de ingeniería a medida frente a plantillas prefabricadas.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-gray-300">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-3 px-4">
                    {language === 'fr' ? 'Facteur Technique' : language === 'en' ? 'Technical Factor' : 'Factor Técnico'}
                  </th>
                  <th className="py-3 px-4 text-[#38BDF8] font-bold">DEXVOI Architecture</th>
                  <th className="py-3 px-4">
                    {language === 'fr' ? 'Agences WordPress Traditionnelles' : language === 'en' ? 'Traditional WordPress Agencies' : 'Agencias WordPress Tradicionales'}
                  </th>
                  <th className="py-3 px-4">Wix / Squarespace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {language === 'fr' ? 'Vitesse de Chargement' : language === 'en' ? 'Loading Speed' : 'Velocidad de Carga'}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {language === 'fr' ? '< 0.8s (Ultra-rapide)' : language === 'en' ? '< 0.8s (Ultra-fast)' : '< 0.8s (Ultra-rápido)'}
                  </td>
                  <td className="py-3.5 px-4 text-amber-400">
                    {language === 'fr' ? '3.5s - 6.0s (Surchargé)' : language === 'en' ? '3.5s - 6.0s (Overloaded)' : '3.5s - 6.0s (Sobrecargado)'}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    {language === 'fr' ? '4.0s - 8.0s (Lent)' : language === 'en' ? '4.0s - 8.0s (Slow)' : '4.0s - 8.0s (Lento)'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {language === 'fr' ? 'Sécurité Périmétrique' : language === 'en' ? 'Perimeter Security' : 'Seguridad Perimetral'}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {language === 'fr' ? 'Audit OSINT + WAF A+' : language === 'en' ? 'OSINT Audit + WAF A+' : 'Auditoría OSINT + WAF A+'}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    {language === 'fr' ? 'Vulnérable aux extensions obsolètes' : language === 'en' ? 'Vulnerable to outdated plugins' : 'Vulnerable a plugins obsoletos'}
                  </td>
                  <td className="py-3.5 px-4 text-amber-400">
                    {language === 'fr' ? 'Basique et fermée' : language === 'en' ? 'Basic and closed' : 'Básica y cerrada'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {language === 'fr' ? 'Commissions de Réservation' : language === 'en' ? 'Booking Commissions' : 'Comisiones de Reservas'}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {language === 'fr' ? '0% commissions directes' : language === 'en' ? '0% direct commissions' : '0% comisiones directas'}
                  </td>
                  <td className="py-3.5 px-4 text-amber-400">
                    {language === 'fr' ? 'Variable selon plugin' : language === 'en' ? 'Varies by plugin' : 'Varía según plugin'}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    {language === 'fr' ? 'Abonnement mensuel élevé' : language === 'en' ? 'High monthly subscription' : 'Suscripción mensual alta'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {language === 'fr' ? 'Positionnement Maps' : language === 'en' ? 'Maps Positioning' : 'Posicionamiento Maps'}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {language === 'fr' ? 'Stratégie technique Local 3-Pack' : language === 'en' ? 'Technical Local 3-Pack Strategy' : 'Estrategia técnica Local 3-Pack'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {language === 'fr' ? 'Basique superficiel' : language === 'en' ? 'Basic superficial' : 'Básico superficial'}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    {language === 'fr' ? 'Inexistant ou générique' : language === 'en' ? 'Inexistent or generic' : 'Inexistente o genérico'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {language === 'fr' ? 'Propriété du Code' : language === 'en' ? 'Code Ownership' : 'Propiedad del Código'}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">
                    {language === 'fr' ? '100% à vous sans engagement' : language === 'en' ? '100% yours without lock-in' : '100% suyo sin ataduras'}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {language === 'fr' ? 'Partielle' : language === 'en' ? 'Partial' : 'Parcial'}
                  </td>
                  <td className="py-3.5 px-4 text-rose-400">
                    {language === 'fr' ? '0% (Propriété de la plateforme)' : language === 'en' ? '0% (Platform owned)' : '0% (Propiedad de la plataforma)'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#0066FF]/20 via-[#131B33] to-[#0A0F1F] border border-[#0066FF]/50 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {language === 'fr' 
              ? 'Prêt à sécuriser et accélérer votre présence digitale ?' 
              : language === 'en' 
              ? 'Ready to shield and accelerate your digital presence?' 
              : '¿Listo para blindar y acelerar su presencia digital?'}
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            {language === 'fr'
              ? 'Demandez votre diagnostic technique gratuit et découvrez exactement combien de clients ou patients vous perdez face à la concurrence.'
              : language === 'en'
              ? 'Request your free technical diagnostic and discover exactly how many clients or patients you are losing to local competitors.'
              : 'Solicite su diagnóstico técnico gratuito y descubra exactamente cuántos clientes o pacientes está perdiendo ante su competencia local.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuditModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-sm font-mono transition-all shadow-xl shadow-[#0066FF]/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {language === 'fr' 
                  ? 'Demander un Diagnostic Gratuit' 
                  : language === 'en' 
                  ? 'Request Free Diagnostic' 
                  : 'Solicitar Diagnóstico Gratuito'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/precios')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#131B33] hover:bg-[#1E293B] border border-gray-700 text-gray-200 text-sm font-mono font-bold transition-all cursor-pointer"
            >
              {language === 'fr' ? "Voir les Plans d'Audit" : language === 'en' ? 'View Audit Plans' : 'Ver Planes de Auditoría'}
            </button>
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

