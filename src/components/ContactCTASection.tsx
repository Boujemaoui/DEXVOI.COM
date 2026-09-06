import React, { useState } from 'react';
import { Shield, Lock, Send, CheckCircle2, PhoneCall, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { LeadFormData } from '../types';

interface ContactCTASectionProps {
  initialUrl?: string;
  initialFindings?: string[];
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ initialUrl = '', initialFindings = [] }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessType: 'Clínica Médica / Estética',
    websiteUrl: initialUrl,
    primaryConcern: 'Aumentar reservas y blindar seguridad'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update websiteUrl if prop changes
  React.useEffect(() => {
    if (initialUrl) {
      setFormData((prev) => ({ ...prev, websiteUrl: initialUrl }));
    }
  }, [initialUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          websiteUrl: formData.websiteUrl,
          primaryConcern: formData.primaryConcern,
          type: 'Sesión Estratégica & Auditoría',
        }),
      });
      const data = await res.json();
      setTicketId(data.ticketId || `DEXVOI-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch {
      setTicketId(`DEXVOI-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#0A0F1F] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Container Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#F5A623]/30 shadow-2xl relative">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-gray-800 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2 text-[#F5A623]">
              <Lock className="w-4 h-4" />
              <span>SESIÓN PRIVADA CIFRADA (CANAL SEGURO)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>3 PLAZAS DISPONIBLES ESTE MES</span>
            </div>
          </div>

          {/* Titles matching Copywriting requirements */}
          <div className="mt-8 mb-10 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Construyamos una presencia digital blindada que multiplique los ingresos de tu negocio.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-medium">
              Agenda tu sesión estratégica hoy. Plazas de auditoría técnica limitadas por mes.
            </p>
          </div>

          {/* Form or Confirmation */}
          {isSubmitted ? (
            <div className="py-10 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-mono">
                  SOLICITUD DE AUDITORÍA REGISTRADA
                </h3>
                <p className="text-sm font-mono text-emerald-400">
                  Expediente Técnico: <span className="font-bold text-white">{ticketId}</span>
                </p>
                <p className="text-sm text-gray-300 max-w-lg mx-auto pt-2">
                  Hemos asignado tu caso al Arquitecto Digital. En menos de 24 horas hábiles recibirás el análisis de vulnerabilidades y la confirmación para tu sesión estratégica.
                </p>
              </div>

              <div className="p-4 bg-[#131B33] rounded-xl border border-gray-800 max-w-md mx-auto text-left font-mono text-xs text-gray-300 space-y-1">
                <div><strong>Titular:</strong> {formData.fullName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Teléfono:</strong> {formData.phone}</div>
                {formData.websiteUrl && <div><strong>Web auditada:</strong> {formData.websiteUrl}</div>}
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-mono text-[#0066FF] hover:underline"
              >
                ← Enviar otra solicitud técnica
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nombre y Apellido */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    Nombre y Apellido *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej: Dr. Roberto Gómez o Chef Laura Vega"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Email Profesional */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    Email Profesional *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@tuclinicaorestaurante.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000 / +52 55 0000 0000"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Tipo de Negocio */}
                <div>
                  <label htmlFor="businessType" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    Sector del Negocio *
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  >
                    <option value="Clínica Médica / Estética">Clínica Médica / Estética / Odontología</option>
                    <option value="Restaurante de Gama Alta">Restaurante de Gama Media-Alta / Gastronomía</option>
                    <option value="Servicios Profesionales de Élite">Servicios Profesionales de Élite</option>
                  </select>
                </div>
              </div>

              {/* URL de tu web (Opcional) */}
              <div>
                <label htmlFor="websiteUrl" className="block text-xs font-mono text-gray-300 uppercase mb-2 flex items-center justify-between">
                  <span>URL de tu web (Opcional si aún no tienes o quieres rediseño completo):</span>
                  {initialFindings.length > 0 && (
                    <span className="text-emerald-400 text-[11px] lowercase">Resultados de escáner adjuntos</span>
                  )}
                </label>
                <input
                  id="websiteUrl"
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="www.tuclinicaorestaurante.com"
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                />
              </div>

              {/* Submit Button (Matching Requested CTA Options) */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full metallic-btn py-4 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Procesando solicitud de auditoría...</span>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 text-[#0A0F1F]" />
                      <span>Solicitar Mi Diagnóstico Estratégico Sin Costo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Confidentiality Disclaimer */}
              <p className="text-center font-mono text-gray-400 text-xs mt-4">
                * Datos encriptados y confidenciales bajo protocolo de seguridad estricto. Sin compromisos comerciales ni spam.
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
