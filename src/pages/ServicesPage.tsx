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
import { navigateTo } from '../utils/navigation';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigateHome,
  onOpenAuditModal
}) => {
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
              <span>Volver al Inicio</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-[#38BDF8] font-bold">Servicios</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/precios')}
              className="hidden sm:inline-flex text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Ver Tarifas
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#0066FF]/20 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Solicitar Auditoría</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131B33] border border-[#0066FF]/40 text-xs font-mono text-[#38BDF8]">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>ARQUITECTURA DIGITAL DE ÉLITE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
            Servicios de Blindaje, Velocidad & Conversión
          </h1>

          <p className="text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
            Eliminamos la fragilidad técnica de las plantillas genéricas. Construimos infraestructuras ultrarrápidas, blindadas contra ataques y diseñadas para dominar en Google Maps y captar pacientes o clientes de alto valor.
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
                  <span className="text-xs font-mono text-[#0066FF] font-bold tracking-widest uppercase">PILAR 01</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Arquitectura Web & Rendimiento Extremo
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                El 53% de los usuarios móviles abandonan una web que tarda más de 3 segundos en cargar. Desarrollamos con React, Vite y arquitecturas estáticas servidas en CDN globales que cargan en menos de 0.8 segundos en cualquier dispositivo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Core Web Vitals 95+ garantizados</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Carga subsegundo en redes móviles 4G/5G</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cero dependencia de plugins lentos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Diseño optimizado para máxima conversión</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-emerald-400">&lt; 0.8s</div>
              <p className="text-xs text-gray-400 font-mono">Tiempo de carga promedio verificado en GTmetrix y PageSpeed.</p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                Auditar Mi Velocidad
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
                  <span className="text-xs font-mono text-[#F5A623] font-bold tracking-widest uppercase">PILAR 02</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Posicionamiento Local Dominante (Google Maps)
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Para una clínica dental o un restaurante, el 80% de los clientes provienen de búsquedas de proximidad (&quot;cerca de mí&quot;). Optimizamos su perfil de Google Business, implementamos marcado estructurado Schema.org y construimos relevancia local para alcanzar el codiciado &quot;Local 3-Pack&quot;.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auditoría y optimización Google Business Profile</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Estructura Schema MedicalClinic / Restaurant</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Citaciones y consistencia NAP local</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Estrategia de captación de reseñas blindada</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-[#F5A623]">Top 3 Pack</div>
              <p className="text-xs text-gray-400 font-mono">Presencia prioritaria en el mapa local donde se deciden las llamadas y reservas.</p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#e0961f] text-black text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                Auditar Ficha en Maps
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
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">PILAR 03</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Ethical Hacking & Blindaje Perimetral
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Las webs médicas y de hostelería son víctimas frecuentes de inyección de enlaces spam, suplantación de identidad y fugas de correos corporativos. Auditamos cabeceras HTTP críticas (HSTS, CSP, X-Frame-Options), verificamos la seguridad del correo (SPF, DKIM, DMARC) y blindamos el servidor.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configuración estricta HSTS y Content-Security-Policy</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Protección anti-phishing DMARC / SPF</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Auditoría de puertos abiertos y metadatos expuestos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cumplimiento RGPD en formularios y cookies</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-emerald-400">A+ Security</div>
              <p className="text-xs text-gray-400 font-mono">Calificación máxima en Mozilla Observatory y SSL Labs.</p>
              <button
                onClick={() => navigateTo('/auditoria-seguridad')}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                Probar Escáner OSINT
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
                  <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">PILAR 04</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Sistemas de Reservas Avanzados & Sin Comisiones
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                Deje de regalar hasta el 15% o 3€ por comensal o paciente a plataformas intermediarias como TheFork o Doctoralia. Integramos sistemas propios sincronizados con Google Calendar, confirmación automática por SMS/WhatsApp y política de no-shows con fianza o tarjeta en garantía.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cero comisiones recurrentes por reserva</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sincronización bidireccional en tiempo real</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Recordatorios automáticos para reducir cancelaciones</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cobro de depósitos tokenizado con Stripe</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-cyan-400">0% Comisión</div>
              <p className="text-xs text-gray-400 font-mono">El 100% del margen se queda en su negocio. Base de datos de clientes propia.</p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                Solicitar Demostración
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
                  <span className="text-xs font-mono text-purple-400 font-bold tracking-widest uppercase">PILAR 05</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    Agentes de Inteligencia Artificial 24/7
                  </h2>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                El 40% de los pacientes y comensales buscan cita o mesa fuera del horario laboral. Nuestros asistentes virtuales cualifican al usuario, resuelven dudas clínicas o de cartas/alérgenos en múltiples idiomas (Español, Francés, Inglés) y agendan directamente sin intervención humana.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Atención ininterrumpida las 24 horas del día</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cualificación instantánea de leads cualificados</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multilingüe nativo (FR / EN / ES)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Integración con CRM y alertas por email</span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-80 p-6 rounded-xl bg-[#131B33] border border-gray-800 text-center space-y-4 shrink-0">
              <div className="text-2xl font-bold font-mono text-purple-400">24/7 Leads</div>
              <p className="text-xs text-gray-400 font-mono">Nunca más pierda un cliente potencial por no responder de noche o en festivo.</p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow"
              >
                Configurar Mi Agente
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
              ¿Por qué DEXVOI supera a las agencias convencionales?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mt-2">
              Arquitectura de ingeniería a medida frente a plantillas prefabricadas.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-gray-300">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-3 px-4">Factor Técnico</th>
                  <th className="py-3 px-4 text-[#38BDF8] font-bold">DEXVOI Architecture</th>
                  <th className="py-3 px-4">Agencias WordPress Tradicionales</th>
                  <th className="py-3 px-4">Wix / Squarespace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Velocidad de Carga</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">&lt; 0.8s (Ultra-rápido)</td>
                  <td className="py-3.5 px-4 text-amber-400">3.5s - 6.0s (Sobrecargado)</td>
                  <td className="py-3.5 px-4 text-rose-400">4.0s - 8.0s (Lento)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Seguridad Perimetral</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Auditoría OSINT + WAF A+</td>
                  <td className="py-3.5 px-4 text-rose-400">Vulnerable a plugins obsoletos</td>
                  <td className="py-3.5 px-4 text-amber-400">Básica y cerrada</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Comisiones de Reservas</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">0% comisiones directas</td>
                  <td className="py-3.5 px-4 text-amber-400">Varía según plugin</td>
                  <td className="py-3.5 px-4 text-rose-400">Suscripción mensual alta</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Posicionamiento Maps</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">Estrategia técnica Local 3-Pack</td>
                  <td className="py-3.5 px-4 text-gray-400">Básico superficial</td>
                  <td className="py-3.5 px-4 text-rose-400">Inexistente o genérico</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-white">Propiedad del Código</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">100% suyo sin ataduras</td>
                  <td className="py-3.5 px-4 text-gray-400">Parcial</td>
                  <td className="py-3.5 px-4 text-rose-400">0% (Propiedad de la plataforma)</td>
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
            ¿Listo para blindar y acelerar su presencia digital?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Solicite su diagnóstico técnico gratuito y descubra exactamente cuántos clientes o pacientes está perdiendo ante su competencia local.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuditModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-sm font-mono transition-all shadow-xl shadow-[#0066FF]/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Solicitar Diagnóstico Gratuito</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/precios')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#131B33] hover:bg-[#1E293B] border border-gray-700 text-gray-200 text-sm font-mono font-bold transition-all cursor-pointer"
            >
              Ver Planes de Auditoría
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
          <span>Volver a la página principal</span>
        </button>
      </div>

    </div>
  );
};
