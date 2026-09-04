import React, { useState } from 'react';
import { Layers, Search, ShieldCheck, Check, ArrowRight, Shield, Cpu, Lock, Sparkles } from 'lucide-react';
import { PillarService } from '../types';

interface ServicesSectionProps {
  onOpenAuditModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAuditModal }) => {
  const [activePillar, setActivePillar] = useState<string>('all');

  const pillars: PillarService[] = [
    {
      id: 'arquitectura',
      title: 'Arquitectura Web & Sistemas',
      tagline: 'ESTRUCTURAS DIGITALES DE ALTO RENDIMIENTO',
      shortDesc: 'Estructuras digitales robustas y de carga instantánea diseñadas para brindar una experiencia de usuario impecable.',
      icon: 'Layers',
      badge: 'VELOCIDAD & CONVERSIÓN',
      benefits: [
        'Plataformas a medida con sistemas de reservas online y gestión de citas automatizadas 24/7.',
        'Optimización de velocidad militar (tiempos de carga menores a 1.5s) para maximizar conversiones.',
        'Experiencia móvil ultrafluida para comensales exigentes y pacientes de alto valor.'
      ],
      specs: [
        { label: 'Tiempo de Carga', value: '< 1.2 Segundos' },
        { label: 'Disponibilidad', value: '99.99% Uptime' },
        { label: 'Automatización Citas', value: 'Integración WhatsApp/Email' }
      ],
      targetAudience: 'Clínicas médicas, centros estéticos y restaurantes que requieren agenda automatizada.'
    },
    {
      id: 'seo-ads',
      title: 'Posicionamiento Avanzado (SEO Local & Ads)',
      tagline: 'DOMINACIÓN DE TRÁFICO GEO-LOCALIZADO',
      shortDesc: 'Estrategias de visibilidad dominante para colocar tu clínica o restaurante frente a clientes listos para comprar.',
      icon: 'Search',
      badge: 'GOOGLE MAPS #1 & ADS',
      benefits: [
        'Dominio en Google Maps y búsquedas geo-localizadas ("cerca de mí") en tu ciudad.',
        'Campañas de publicidad digital hipersegmentadas con retorno de inversión medible desde el primer mes.',
        'Auditoría de competencia y sistemas de captura estratégica de reseñas 5 estrellas.'
      ],
      specs: [
        { label: 'Visibilidad Local', value: 'Top 3 Google Maps' },
        { label: 'Costo por Adquisición', value: 'Optimizado por IA' },
        { label: 'Generador Reseñas', value: 'Automatizado post-visita' }
      ],
      targetAudience: 'Negocios con sede física que buscan acaparar las búsquedas de su zona urbana.'
    },
    {
      id: 'hacking-blindaje',
      title: 'Ethical Hacking & Blindaje Digital',
      tagline: 'DEFENSA PERIMETRAL Y AUDITORÍA OFENSIVA',
      shortDesc: 'Protección perimetral y auditorías de seguridad continua para que operes con total tranquilidad financiera y legal.',
      icon: 'ShieldCheck',
      badge: 'SEGURIDAD & PROTECCIÓN DE DATOS',
      benefits: [
        'Auditoría web profunda y hacking ético para detectar y cerrar brechas antes de que sean explotadas.',
        'Cumplimiento estricto en protección de datos, cifrado SSL avanzado y escudos antimalware.',
        'Protocolos de respaldo automatizado y recuperación inmediata ante incidentes o caídas del servidor.'
      ],
      specs: [
        { label: 'Pruebas de Penetración', value: 'Vulnerabilidades OWASP Top 10' },
        { label: 'Cifrado de Datos', value: 'AES-256 / SSL Grado A+' },
        { label: 'Copias de Seguridad', value: 'Snapshot Diario Inmutable' }
      ],
      targetAudience: 'Clínicas con historiales clínicos confidenciales y restaurantes con TPV/pagos online.'
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-[#0A0F1F] relative">
      {/* Background technical styling */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARQUITECTURA DE TRES PILARES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Nuestros Pilares de Arquitectura Digital
          </h2>

          <p className="text-gray-300 text-sm sm:text-base">
            No somos una agencia convencional de marketing. Fusionamos ingeniería de sistemas, analítica de crecimiento y ciberseguridad ofensiva para crear una ventaja competitiva infranqueable.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const isHacking = pillar.id === 'hacking-blindaje';
            return (
              <div
                key={pillar.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isHacking
                    ? 'bg-[#131B33] border-2 border-[#0066FF] shadow-[0_0_25px_rgba(0,102,255,0.2)]'
                    : 'bg-[#131315] border border-[#1E293B] hover:border-[#0066FF]/60 hover:shadow-xl'
                }`}
              >
                {/* Background Blueprint Icon Watermark */}
                <div className="absolute -bottom-6 -right-6 text-white/[0.03] group-hover:text-white/[0.06] transition-colors pointer-events-none">
                  {index === 0 && <Layers className="w-48 h-48" />}
                  {index === 1 && <Search className="w-48 h-48" />}
                  {index === 2 && <ShieldCheck className="w-48 h-48 text-[#0066FF]" />}
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Top Bar with Number and Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-gray-500 group-hover:text-[#F5A623] transition-colors">
                      0{index + 1}.
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${
                      isHacking
                        ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30'
                        : 'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/30'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wide mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
                      {pillar.tagline}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {pillar.shortDesc}
                    </p>
                  </div>

                  {/* 3 Bullet Points with Measurable Benefits */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono text-gray-400 uppercase">
                      Beneficios Concretos:
                    </div>
                    {pillar.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1 rounded bg-[#0066FF]/20 text-[#0066FF] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs text-gray-200 leading-normal">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Specs Readout */}
                  <div className="pt-4 border-t border-gray-800/80 grid grid-cols-1 gap-2 font-mono text-xs">
                    {pillar.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-gray-400 bg-black/30 px-2.5 py-1.5 rounded">
                        <span className="text-[11px]">{spec.label}:</span>
                        <span className="text-white font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-gray-800/80 relative z-10">
                  <button
                    onClick={onOpenAuditModal}
                    className="w-full py-3 rounded bg-[#1E293B] hover:bg-[#0066FF] text-gray-200 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-gray-700 hover:border-transparent font-bold"
                  >
                    <span>Auditar {pillar.id === 'arquitectura' ? 'Velocidad' : pillar.id === 'seo-ads' ? 'SEO Local' : 'Seguridad'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-12 p-6 rounded-xl bg-[#131B33]/60 border border-[#0066FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-gray-300">
            <Shield className="w-5 h-5 text-[#F5A623] shrink-0" />
            <span>Todos los sistemas se entregan bajo contrato de confidencialidad y garantía de rendimiento.</span>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="metallic-btn px-6 py-2.5 rounded uppercase tracking-wider whitespace-nowrap text-[11px]"
          >
            Consultar con el Arquitecto
          </button>
        </div>

      </div>
    </section>
  );
};
