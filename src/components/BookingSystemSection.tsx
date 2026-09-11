import React, { useState } from 'react';
import {
  Calendar,
  CalendarCheck,
  Clock,
  BellRing,
  RefreshCw,
  MapPin,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scissors,
  Stethoscope,
  Utensils,
  Dumbbell,
  GraduationCap,
  Building2,
  Briefcase,
  X,
  MessageSquare,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BookingSystemSectionProps {
  onOpenAuditModal: () => void;
  onContactClick?: () => void;
}

export const BookingSystemSection: React.FC<BookingSystemSectionProps> = ({
  onOpenAuditModal,
  onContactClick,
}) => {
  const { t, language } = useLanguage();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDemoIndustry, setSelectedDemoIndustry] = useState<string>('clinica');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30');

  // Business verticals with dedicated demo data
  const industries = language === 'fr' ? [
    {
      id: 'peluqueria',
      label: 'Salons & Coiffure',
      icon: Scissors,
      serviceName: 'Coupe Styliste + Soin Capillaire',
      duration: '45 min',
      provider: 'Styliste Senior Elena',
      price: '42€',
      tagline: 'Planning complet sans interruptions téléphoniques pendant vos prestations.',
    },
    {
      id: 'clinica',
      label: 'Cliniques & Médecins',
      icon: Stethoscope,
      serviceName: 'Consultation Diagnostic & Bilan Facial',
      duration: '30 min',
      provider: 'Dr. Méndez (Dermatologie)',
      price: '75€',
      tagline: 'Conformité stricte RGPD données de santé et zéro rendez-vous manqué.',
    },
    {
      id: 'restaurante',
      label: 'Restaurants',
      icon: Utensils,
      serviceName: 'Table Terrasse Gourmet (4 Personnes)',
      duration: 'Service 14:00 - 16:00',
      provider: 'Maître d’Hôtel - Salle Principale',
      price: 'Réservation Validée',
      tagline: 'Gestion automatique des services, couverts et liste d’attente intelligente.',
    },
    {
      id: 'gimnasio',
      label: 'Fitness & Salles de sport',
      icon: Dumbbell,
      serviceName: 'Séance Entraînement Privé HIIT',
      duration: '50 min',
      provider: 'Coach Marcos - Espace Fonctionnel',
      price: '35€',
      tagline: 'Capacités maîtrisées, abonnements récurrents et contrôle d’accès QR.',
    },
    {
      id: 'academia',
      label: 'Centres de Formation & Cours',
      icon: GraduationCap,
      serviceName: 'Masterclass One-to-One d’Anglais',
      duration: '60 min',
      provider: 'Prof. Davis - Salle Virtuelle / Présentiel',
      price: '28€',
      tagline: 'Paiement à la réservation et lien de visioconférence instantané.',
    },
    {
      id: 'hotel',
      label: 'Hôtels & Hébergements',
      icon: Building2,
      serviceName: 'Suite Panoramique avec Vue',
      duration: 'Check-in 15:00',
      provider: 'Réception Centrale 24/7',
      price: '160€ / nuit',
      tagline: 'Moteur de réservation direct pour éviter les commissions intermédiaires.',
    },
  ] : language === 'en' ? [
    {
      id: 'peluqueria',
      label: 'Salons & Hairdressers',
      icon: Scissors,
      serviceName: 'Signature Cut + Hair Care Protocol',
      duration: '45 min',
      provider: 'Senior Stylist Elena',
      price: '42€',
      tagline: 'Full calendar without telephone interruptions while serving clients.',
    },
    {
      id: 'clinica',
      label: 'Clinics & Healthcare',
      icon: Stethoscope,
      serviceName: 'Diagnostic Consultation & Skin Assessment',
      duration: '30 min',
      provider: 'Dr. Méndez (Dermatology)',
      price: '75€',
      tagline: 'Strict HIPAA/GDPR health data compliance and zero no-shows.',
    },
    {
      id: 'restaurante',
      label: 'Restaurants',
      icon: Utensils,
      serviceName: 'Gourmet Terrace Table (4 Guests)',
      duration: 'Shift 14:00 - 16:00',
      provider: 'Head Sommelier - Main Dining',
      price: 'Confirmed Booking',
      tagline: 'Automated shift management, covers, and smart waitlists.',
    },
    {
      id: 'gimnasio',
      label: 'Gyms & Personal Fitness',
      icon: Dumbbell,
      serviceName: 'Personal HIIT Training Session',
      duration: '50 min',
      provider: 'Coach Marcos - Functional Arena',
      price: '35€',
      tagline: 'Controlled capacity, recurring class bookings, and QR access.',
    },
    {
      id: 'academia',
      label: 'Academies & Tutoring',
      icon: GraduationCap,
      serviceName: 'One-to-One Intensive English Session',
      duration: '60 min',
      provider: 'Prof. Davis - Virtual / On-site Classroom',
      price: '28€',
      tagline: 'Automated upfront payments with instant meeting link delivery.',
    },
    {
      id: 'hotel',
      label: 'Hotels & Boutique Stays',
      icon: Building2,
      serviceName: 'Panoramic Rooftop Suite',
      duration: 'Check-in 15:00',
      provider: 'Front Desk 24/7',
      price: '160€ / night',
      tagline: 'Direct booking engine to bypass unfair 20%+ OTA commissions.',
    },
  ] : [
    {
      id: 'peluqueria',
      label: 'Peluquerías & Salones',
      icon: Scissors,
      serviceName: 'Corte de Autor + Tratamiento Capilar',
      duration: '45 min',
      provider: 'Stylist Senior Elena',
      price: '42€',
      tagline: 'Agenda llena sin interrupciones telefónicas mientras atiendes a tus clientes.',
    },
    {
      id: 'clinica',
      label: 'Clínicas & Médicos',
      icon: Stethoscope,
      serviceName: 'Consulta de Diagnóstico & Valoración Facial',
      duration: '30 min',
      provider: 'Dra. Méndez (Dermatología)',
      price: '75€',
      tagline: 'Cumplimiento estricto RGPD de datos sanitarios y cero no-shows.',
    },
    {
      id: 'restaurante',
      label: 'Restaurantes',
      icon: Utensils,
      serviceName: 'Mesa Terraza Gourmet (4 Comensales)',
      duration: 'Turno 14:00 - 16:00',
      provider: 'Jefe de Sala - Salón Principal',
      price: 'Reserva Confirmada',
      tagline: 'Gestión automática de turnos, comensales y lista de espera inteligente.',
    },
    {
      id: 'gimnasio',
      label: 'Gimnasios & Fitness',
      icon: Dumbbell,
      serviceName: 'Sesión Entrenamiento Personalizado HIIT',
      duration: '50 min',
      provider: 'Coach Marcos - Área Funcional',
      price: '35€',
      tagline: 'Aforos controlados, reservas recurrentes y control de asistencia QR.',
    },
    {
      id: 'academia',
      label: 'Academias & Cursos',
      icon: GraduationCap,
      serviceName: 'Clase Magistral One-to-One de Inglés',
      duration: '60 min',
      provider: 'Prof. Davis - Aula Virtual / Presencial',
      price: '28€',
      tagline: 'Cobro automatizado en la reserva y enlace de sesión generado al instante.',
    },
    {
      id: 'hotel',
      label: 'Hoteles & Alojamientos',
      icon: Building2,
      serviceName: 'Suite Panorámica con Vistas',
      duration: 'Check-in 15:00',
      provider: 'Recepción Central 24/7',
      price: '160€ / noche',
      tagline: 'Motor de reserva directo para evitar comisiones abusivas de intermediarios.',
    },
  ];

  const currentIndustry = industries.find((i) => i.id === selectedDemoIndustry) || industries[1];

  const benefits = [
    {
      icon: Clock,
      title: t.booking.feature1Title,
      description: t.booking.feature1Desc,
      highlight: language === 'fr' ? 'Disponible 24h/24, 365j' : language === 'en' ? 'Available 24/7, 365 days' : 'Disponible 24 horas, 365 días',
    },
    {
      icon: BellRing,
      title: t.booking.feature2Title,
      description: t.booking.feature2Desc,
      highlight: language === 'fr' ? '-68% d\'annulations' : language === 'en' ? '-68% last-minute no-shows' : '-68% de cancelaciones de última hora',
    },
    {
      icon: RefreshCw,
      title: t.booking.feature3Title,
      description: t.booking.feature3Desc,
      highlight: language === 'fr' ? '0% risque de doublons' : language === 'en' ? '0% overlap risk' : '0% riesgo de solapamientos',
    },
    {
      icon: MapPin,
      title: t.booking.feature4Title,
      description: t.booking.feature4Desc,
      highlight: language === 'fr' ? '+140% de conversion Maps' : language === 'en' ? '+140% local search bookings' : '+140% reservas desde búsquedas locales',
    },
    {
      icon: LayoutDashboard,
      title: language === 'fr' ? 'Tableau de bord unifié' : language === 'en' ? 'Intuitive Control Dashboard' : 'Panel de control intuitivo',
      description: language === 'fr'
        ? 'Gérez vos réservations, vos équipes, vos annulations et vos encaissements depuis une interface unique et fluide.'
        : language === 'en'
        ? 'Control team schedules, cancellations, client history and deposits from a single clear mobile & desktop view.'
        : 'Gestiona todas tus reservas, empleados, horarios, cancelaciones, historiales de clientes y cobros desde un solo lugar fácil de usar en cualquier pantalla.',
      highlight: language === 'fr' ? 'Contrôle complet en 1 écran' : language === 'en' ? 'Total control on 1 screen' : 'Control total de tu negocio en 1 pantalla',
    },
  ];

  const idealForCategories = [
    { name: language === 'fr' ? 'Coiffure & Salons' : language === 'en' ? 'Salons' : 'Peluquerías', icon: Scissors },
    { name: language === 'fr' ? 'Cliniques & Santé' : language === 'en' ? 'Clinics' : 'Clínicas', icon: Stethoscope },
    { name: language === 'fr' ? 'Restaurants' : language === 'en' ? 'Restaurants' : 'Restaurantes', icon: Utensils },
    { name: language === 'fr' ? 'Fitness & Gym' : language === 'en' ? 'Gyms' : 'Gimnasios', icon: Dumbbell },
    { name: language === 'fr' ? 'Académies & Cours' : language === 'en' ? 'Academies' : 'Academias', icon: GraduationCap },
    { name: language === 'fr' ? 'Hôtels & Séjours' : language === 'en' ? 'Hotels' : 'Hoteles', icon: Building2 },
    { name: language === 'fr' ? 'Toute activité avec rendez-vous' : language === 'en' ? 'Any appointment-based business' : 'Cualquier negocio que gestione citas o reservas', icon: Briefcase },
  ];

  const availableHours = ['09:30', '10:15', '11:30', '13:00', '16:30', '18:00'];

  return (
    <section
      id="sistemas-reservas"
      className="py-24 bg-[#0A0E1A] relative border-t border-b border-gray-800/80 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{t.booking.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.booking.title} <span className="text-[#0066FF]">{t.booking.titleHighlight}</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Core Grid: Left 5 Pillars / Right Interactive Booking Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: The 5 Benefits */}
          <div className="lg:col-span-7 space-y-4">
            {benefits.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-[#0B1224]/80 border border-gray-800 hover:border-[#0066FF]/50 transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center shrink-0 group-hover:bg-[#0066FF]/20 transition-colors">
                      <IconComp className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                          <span>{item.title}</span>
                        </h3>
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {item.highlight}
                        </span>
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Booking Experience Mockup */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-2xl border border-[#0066FF]/40 bg-[#0E1528] shadow-2xl relative">
              
              {/* Terminal / Live Preview Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {language === 'fr' ? 'Simulateur Direct · Moteur Dexvoi' : language === 'en' ? 'Live Simulator · Dexvoi Engine' : 'Simulador en Vivo · Dexvoi Booking Engine'}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
                  {language === 'fr' ? 'SANS COMMISSION' : language === 'en' ? '0% COMMISSION' : 'SIN COMISIONES'}
                </span>
              </div>

              {/* Business Selector Chips */}
              <div className="space-y-2 mb-5">
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                  {language === 'fr' ? '1. Choisissez votre activité :' : language === 'en' ? '1. Select business sector:' : '1. Selecciona tu tipo de negocio:'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {industries.map((ind) => {
                    const IndIcon = ind.icon;
                    const isSelected = selectedDemoIndustry === ind.id;
                    return (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setSelectedDemoIndustry(ind.id)}
                        className={`p-2 rounded-xl text-left font-mono text-[11px] transition-all flex flex-col items-start gap-1 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#0066FF]/20 border-[#0066FF] text-white font-bold shadow-[0_0_12px_rgba(0,102,255,0.25)]'
                            : 'bg-[#131B33]/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                        }`}
                      >
                        <IndIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F5A623]' : 'text-gray-400'}`} />
                        <span className="truncate w-full">{ind.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Service Card */}
              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 mb-5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#F5A623] uppercase tracking-wider font-semibold">
                      {language === 'fr' ? 'Prestation Sélectionnée :' : language === 'en' ? 'Selected Service:' : 'Servicio Seleccionado:'}
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                      {currentIndustry.serviceName}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30 shrink-0">
                    {currentIndustry.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 pt-1 border-t border-gray-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    {currentIndustry.duration}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    {currentIndustry.provider}
                  </span>
                </div>
              </div>

              {/* Step 2: Time Slots Real-time Selector */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400 uppercase tracking-wider">
                    {language === 'fr' ? '2. Créneaux disponibles aujourd’hui :' : language === 'en' ? '2. Available slots today:' : '2. Horas disponibles hoy:'}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {language === 'fr' ? 'Mise à jour en direct' : language === 'en' ? 'Live availability' : 'Actualizado en tiempo real'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {availableHours.map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => setSelectedSlot(hour)}
                      className={`py-2 px-2 rounded-lg font-mono text-xs text-center transition-all cursor-pointer border ${
                        selectedSlot === hour
                          ? 'bg-[#F5A623] text-[#0A0F1F] font-bold border-[#F5A623] shadow-[0_0_10px_rgba(245,166,35,0.4)]'
                          : 'bg-[#131B33] border-gray-800 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Automated Notification Preview */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 mb-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Automatisation WhatsApp & Google Maps' : language === 'en' ? 'WhatsApp & Google Maps Automation' : 'Automatización WhatsApp & Google Maps'}</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                  {language === 'fr'
                    ? 'Confirmation immédiate par WhatsApp avec localisation GPS Maps et rappel 2h avant le rendez-vous.'
                    : language === 'en'
                    ? 'Instant WhatsApp confirmation delivered with precise Google Maps GPS directions and automated 2-hour pre-visit reminders.'
                    : 'Confirmación instantánea enviada al cliente con ubicación GPS en Google Maps y recordatorio 2 horas antes de la cita.'}
                </p>
              </div>

              {/* Interactive Booking Trigger inside Card */}
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(true)}
                className="w-full metallic-btn py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>{language === 'fr' ? 'Tester le Processus Complet' : language === 'en' ? 'Test Complete Booking Flow' : 'Probar Flujo de Reserva Completo'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* "Ideal para" Section Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1528] border border-gray-800 shadow-xl mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono text-[#F5A623] uppercase tracking-wider font-bold">
                {language === 'fr' ? 'ADAPTABILITÉ MULTI-SECTEURS' : language === 'en' ? 'INDUSTRY ADAPTABILITY' : 'ADAPTABILIDAD SECTORIAL'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {language === 'fr' ? 'Conçu pour toute entreprise gérant des réservations ou rendez-vous :' : language === 'en' ? 'Engineered for any appointment or reservation business:' : 'Ideal para cualquier negocio que gestione citas o reservas:'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 max-w-2xl">
              {idealForCategories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131B33] border border-gray-700 text-gray-200 text-xs font-mono font-medium hover:border-[#0066FF] hover:text-white transition-colors"
                  >
                    <CatIcon className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{cat.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button
            type="button"
            id="btn-descubre-mas-reservas"
            onClick={() => setIsDetailModalOpen(true)}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#004ECC] hover:from-[#0055DD] hover:to-[#003EA8] text-white font-mono text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all duration-300 group cursor-pointer"
          >
            <span>🔗 {t.booking.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* "Descubre Más" Comprehensive Booking Systems Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0E1528] border border-[#0066FF]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#0066FF] font-mono text-[11px] font-bold">
                  <CalendarCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>DEXVOI BOOKING SYSTEM</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {t.booking.title} {t.booking.titleHighlight}
                </h3>
                <p className="text-xs text-gray-400">
                  {t.booking.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-depth 4 Pillars of the Booking Platform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <Clock className="w-4 h-4 text-[#0066FF]" />
                  <span>{t.booking.feature1Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t.booking.feature1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <BellRing className="w-4 h-4 text-[#F5A623]" />
                  <span>{t.booking.feature2Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t.booking.feature2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{t.booking.feature4Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t.booking.feature4Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>{language === 'fr' ? 'Sans Commissions par Réservation' : language === 'en' ? 'Zero Commission per Reservation' : 'Sin Comisiones por Reserva'}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'fr'
                    ? 'Évitez les commissions sur chaque client. La plateforme et les données clients vous appartiennent à 100%.'
                    : language === 'en'
                    ? 'No per-booking fees or third-party commissions. Your platform, revenue, and customer data remain 100% yours.'
                    : 'Olvídate de pagar comisiones abusivas por cada comensal o cita. La plataforma y la base de datos de clientes son 100% tuyas.'}
                </p>
              </div>

            </div>

            {/* Checklist of Included Capabilities */}
            <div className="p-4 rounded-xl bg-[#131B33]/60 border border-gray-800 space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                {language === 'fr' ? 'Inclus dans le déploiement Dexvoi :' : language === 'en' ? 'Included with every Dexvoi deployment:' : 'Todo lo que incluye la implantación con Dexvoi:'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Intégration sur site existant ou nouveau' : language === 'en' ? 'Integration with new or existing site' : 'Integración en tu web existente o nueva'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Passerelle de paiement sécurisé (Stripe/TPE)' : language === 'en' ? 'Secured payment gateway (Stripe/POS)' : 'Pasarela de cobro o señal (Stripe/TPV)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Synchronisation agendas des collaborateurs' : language === 'en' ? 'Team schedule 2-way sync' : 'Sincronización calendarios de empleados'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Notifications WhatsApp & email instantanées' : language === 'en' ? 'Instant WhatsApp & Email automated alerts' : 'Notificaciones automáticas sin retraso'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Conception mobile ultra-rapide (<1s)' : language === 'en' ? 'Sub-second mobile experience (<1s)' : 'Diseño móvil ultra-rápido (<1s)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? 'Conformité RGPD & consentement client' : language === 'en' ? 'Full GDPR compliance & audit logs' : 'Cumplimiento RGPD & Consentimiento'}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
              <div className="text-xs font-mono text-gray-400 text-center sm:text-left">
                {language === 'fr' ? 'Besoin d’une démonstration pour votre établissement ?' : language === 'en' ? 'Want to see a personalized live walkthrough?' : '¿Quieres ver una demo personalizada para tu negocio?'}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    if (onContactClick) onContactClick();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  {t.nav.contact}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    onOpenAuditModal();
                  }}
                  className="w-full sm:w-auto metallic-btn px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{t.pricing.freeAuditBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

