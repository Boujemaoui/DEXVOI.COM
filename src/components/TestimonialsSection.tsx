import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 'marcos-varela',
      name: 'Marcos Varela',
      role: language === 'fr' ? 'Fondateur & Directeur Général' : language === 'en' ? 'Founder & CEO' : 'Fundador & Director General',
      company: language === 'fr'
        ? 'Varela Mobiliario & Espaces (Showrooms physiques)'
        : language === 'en'
        ? 'Varela Living & Renovation (Physical Showrooms)'
        : 'Varela Mobiliario & Reformas (Showrooms Físicos)',
      category: language === 'fr' ? 'Commerce Physique (Offline)' : language === 'en' ? 'Local Business (Offline)' : 'Negocio Local / Físico (Offline)',
      quote: language === 'fr'
        ? 'Nous avons 2 showrooms physiques et nous perdions des clients face aux grandes chaînes parce que notre ancien site mettait 4 secondes à charger et n’apparaissait pas sur Google Maps. Dexvoi a reconstruit notre plateforme : nous sommes désormais Top 1 sur nos zones et les visites en magasin ont bondi de 140%.'
        : language === 'en'
        ? 'We run 2 physical showrooms and were bleeding qualified buyers because our old website took 4 seconds to load and was invisible on Google Maps. Dexvoi engineered a sub-second architecture: we dominate local searches and showroom foot traffic jumped by 140%.'
        : 'Teníamos 2 tiendas físicas y perdíamos clientes porque nuestra web tardaba más de 4 segundos en cargar y no salíamos en Google Maps. Dexvoi reconstruyó nuestra plataforma con velocidad <1s: ahora somos #1 en búsquedas locales y las visitas presenciales a nuestras tiendas aumentaron un 140%.',
      metrics: [
        { label: language === 'fr' ? 'Visites Showroom' : language === 'en' ? 'Store Foot Traffic' : 'Visitas a Tiendas', value: '+140%' },
        { label: 'Google Maps', value: '#1 Local' },
        { label: language === 'fr' ? 'Vitesse de Charge' : language === 'en' ? 'Load Speed' : 'Velocidad Web', value: '0.6s' }
      ],
      verified: true
    },
    {
      id: 'laura-sotomayor',
      name: 'Laura Sotomayor',
      role: language === 'fr' ? 'Directrice E-Commerce' : language === 'en' ? 'Head of E-Commerce' : 'Directora de E-Commerce & Crecimiento',
      company: language === 'fr'
        ? 'Kronos Activewear (Marque D2C & Boutique en ligne)'
        : language === 'en'
        ? 'Kronos Activewear (D2C Online Brand)'
        : 'Kronos Activewear (Marca D2C & Tienda Online)',
      category: language === 'fr' ? 'E-Commerce (Online)' : language === 'en' ? 'E-Commerce (Online)' : 'E-Commerce & Marca Online',
      quote: language === 'fr'
        ? 'À chaque Black Friday, notre boutique en ligne plantait à cause des pics de trafic et la lenteur du panier détruisait les ventes. Avec l’infrastructure Edge et le blindage perimétrique de Dexvoi, nous avons encaissé plus de 12 000 commandes simultanées sans aucun bug et augmenté nos ventes de 82%.'
        : language === 'en'
        ? 'Every Black Friday our online store crashed under traffic spikes and checkout lag crushed conversions. With Dexvoi’s edge infrastructure and security shield, we processed over 12,000 concurrent orders with 0 downtime and grew online sales by 82%.'
        : 'Cada Black Friday nuestra tienda online se caía por picos de tráfico y los tiempos de carga en checkout destruían las ventas. Con la arquitectura ultrarrápida y el blindaje perimetral de Dexvoi procesamos más de 12.000 pedidos simultáneos con cero fallos y aumentamos las ventas online un 82%.',
      metrics: [
        { label: language === 'fr' ? 'Ventes E-Commerce' : language === 'en' ? 'Online Sales' : 'Facturación Online', value: '+82%' },
        { label: 'Uptime Black Friday', value: '100% OK' },
        { label: language === 'fr' ? 'Conversion Mobile' : language === 'en' ? 'Mobile Conv.' : 'Conversión Móvil', value: '+45%' }
      ],
      verified: true
    },
    {
      id: 'javier-benitez',
      name: 'Javier Benítez',
      role: language === 'fr' ? 'Associé Gérant' : language === 'en' ? 'Managing Partner' : 'Socio Director',
      company: language === 'fr'
        ? 'Benítez & Associés (Cabinet Juridique & Conseil B2B)'
        : language === 'en'
        ? 'Benítez & Partners (Legal Firm & B2B Advisory)'
        : 'Benítez & Asociados (Despacho Legal & Consultoría)',
      category: language === 'fr' ? 'Services & B2B' : language === 'en' ? 'Professional Services (B2B)' : 'Servicios Profesionales & B2B',
      quote: language === 'fr'
        ? 'La confidentialité des dossiers de nos clients est sacrée. Dexvoi a blindé nos serveurs avec un chiffrement TLS 1.3, des en-têtes HSTS/CSP stricts et a intégré un agent intelligent qui préqualifie les demandes 24h/24. Nous signons des clients prestigieux sans passer nos journées au téléphone.'
        : language === 'en'
        ? 'Client confidentiality is non-negotiable for our firm. Dexvoi fortified our perimeter with TLS 1.3, strict CSP/HSTS policies, and integrated an AI agent that pre-qualifies corporate inquiries 24/7. We sign high-value retainers without endless phone tags.'
        : 'La confidencialidad de nuestros clientes corporativos es sagrada. Dexvoi blindó nuestros servidores con cifrado TLS 1.3, cabeceras HSTS/CSP e integró un agente inteligente que precalifica consultas 24/7. Cerramos clientes de alto valor sin perder horas al teléfono.',
      metrics: [
        { label: language === 'fr' ? 'Leads Qualifiés' : language === 'en' ? 'Qualified Leads' : 'Leads Cualificados', value: '+125%' },
        { label: language === 'fr' ? 'Blindage Données' : language === 'en' ? 'Security Grade' : 'Blindaje Datos', value: 'Grado A+' },
        { label: language === 'fr' ? 'Temps Réponse' : language === 'en' ? 'Response Time' : 'Tiempo Respuesta', value: '< 2s' }
      ],
      verified: true
    },
    {
      id: 'sofia-alarcon',
      name: 'Sofía Alarcón',
      role: language === 'fr' ? 'Co-fondatrice & COO' : language === 'en' ? 'Co-Founder & COO' : 'Cofundadora & Directora de Operaciones',
      company: language === 'fr'
        ? 'NovaStudio (Studios Physiques & Plateforme en Ligne)'
        : language === 'en'
        ? 'NovaStudio (Boutique Studios & Online Streaming)'
        : 'NovaStudio Fit (Centros Físicos + Plataforma Online)',
      category: language === 'fr' ? 'Modèle Hybride (Offline + Online)' : language === 'en' ? 'Hybrid Business (Offline + Online)' : 'Negocio Híbrido (Offline & Online)',
      quote: language === 'fr'
        ? 'Gérer manuellement les réservations pour nos studios physiques et les abonnements à nos cours en ligne était un casse-tête quotidien. Dexvoi a unifié nos deux canaux dans une plateforme fluide avec rappels WhatsApp automatiques et paiements Stripe : les absences ont chuté de 88%.'
        : language === 'en'
        ? 'Balancing physical studio reservations and digital streaming memberships was operational chaos. Dexvoi unified both revenue streams into a single rapid interface with automated WhatsApp pings and Stripe checkouts, slashing our no-shows by 88%.'
        : 'Gestionar reservas para las salas físicas y a la vez suscripciones para las clases online era un caos manual. Dexvoi unificó ambos mundos en una sola plataforma rápida, con recordatorios por WhatsApp y cobros automáticos con Stripe que redujeron las ausencias un 88%.',
      metrics: [
        { label: language === 'fr' ? 'Baisse No-Shows' : language === 'en' ? 'No-Show Drop' : 'Reducción Ausencias', value: '-88%' },
        { label: language === 'fr' ? 'Abonnés En Ligne' : language === 'en' ? 'Online Members' : 'Suscripciones Online', value: '+210%' },
        { label: 'Automatización', value: '100% OK' }
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

        {/* Testimonials 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

