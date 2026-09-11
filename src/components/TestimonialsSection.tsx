import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 'dr-mendez',
      name: 'Dr. Carlos Méndez',
      role: language === 'fr' ? 'Directeur Médical' : language === 'en' ? 'Medical Director' : 'Director Médico',
      company: language === 'fr'
        ? 'Clinique Dermastetic (Médecine Esthétique)'
        : language === 'en'
        ? 'Dermastetic Clinic (Aesthetic Medicine)'
        : 'Clínica Dermastetic (Medicina Estética & Dermatología)',
      category: language === 'fr' ? 'Clinique' : language === 'en' ? 'Clinic' : 'Clínica',
      quote: language === 'fr'
        ? 'Nous craignions des fuites de données de santé et notre ancien site ne générait aucun rendez-vous. Avec Dexvoi, nous avons sécurisé le système et doublé nos réservations en 60 jours.'
        : language === 'en'
        ? 'We were terrified of data breaches and our old website generated zero appointments. Dexvoi hardened our stack and doubled our qualified patient bookings in 60 days.'
        : 'Teníamos miedo de sufrir filtraciones de datos médicos y nuestra web no generaba citas. Con Dexvoi blindamos el sistema y duplicamos las reservas online de nuevos pacientes en 60 días.',
      metrics: [
        { label: language === 'fr' ? 'Nouveaux Patients' : language === 'en' ? 'New Patients' : 'Nuevos Pacientes', value: '+115%' },
        { label: language === 'fr' ? 'Temps de Charge' : language === 'en' ? 'Load Speed' : 'Tiempo de Carga', value: '0.7s' },
        { label: language === 'fr' ? 'Sécurité Données' : language === 'en' ? 'Data Security' : 'Blindaje Datos', value: '100% OK' }
      ],
      verified: true
    },
    {
      id: 'chef-herrera',
      name: 'Chef Andrés Herrera',
      role: language === 'fr' ? 'Chef Propriétaire' : language === 'en' ? 'Owner & Executive Chef' : 'Propietario & Chef Ejecutivo',
      company: language === 'fr'
        ? 'Restaurant Aurum (Haute Gastronomie)'
        : language === 'en'
        ? 'Aurum Restaurant (Fine Dining)'
        : 'Restaurante Aurum (Gastronomía de Autor)',
      category: language === 'fr' ? 'Restaurant' : language === 'en' ? 'Restaurant' : 'Restaurante',
      quote: language === 'fr'
        ? 'Atteindre le Top 1 sur Google Maps a transformé nos services du week-end. Nos tables se remplissent automatiquement et nous opérons avec une tranquillité numérique totale.'
        : language === 'en'
        ? 'Ranking #1 on Google Maps completely changed our weekend capacity. Tables fill automatically with online reservations and zero server downtime.'
        : 'Aparecer en las primeras posiciones de Google Maps transformó nuestras noches de fin de semana. Ahora llenamos mesas con reservas automáticas y operamos con total tranquilidad digital.',
      metrics: [
        { label: 'Google Maps', value: '#1 Local' },
        { label: language === 'fr' ? 'Réservations Auto' : language === 'en' ? 'Auto Bookings' : 'Reservas Automáticas', value: '+140%' },
        { label: language === 'fr' ? 'Pannes Réseau' : language === 'en' ? 'Outages' : 'Averías / Caídas', value: '0' }
      ],
      verified: true
    }
  ];

  return (
    <section id="testimonios" className="py-24 bg-[#0A0F1F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-[#F5A623] fill-[#F5A623]" />
            <span>{t.testimonials.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.testimonials.title} <span className="text-[#0066FF]">{t.testimonials.titleHighlight}</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* 2 Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-[#0066FF]/50 transition-all flex flex-col justify-between relative group"
            >
              <div className="space-y-6">
                {/* Header with verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>{language === 'fr' ? 'CAS VÉRIFIÉ' : language === 'en' ? 'VERIFIED CASE' : 'CASO VERIFICADO'}</span>
                  </span>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-[#0066FF]/20 absolute -top-4 -left-2 pointer-events-none" />
                  <p className="text-gray-200 text-base leading-relaxed italic relative z-10 pl-4 border-l-2 border-[#0066FF]">
                    "{item.quote}"
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-[#131B33] p-2.5 rounded-lg border border-gray-800 text-center font-mono">
                      <div className="text-[10px] text-gray-400 truncate">{m.label}</div>
                      <div className="text-sm font-bold text-[#F5A623] mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-gray-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {item.role} · <span className="text-gray-300">{item.company}</span>
                  </p>
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#1E293B] text-gray-300 border border-gray-700">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

