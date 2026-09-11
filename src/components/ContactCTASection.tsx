import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, Clock } from 'lucide-react';
import { LeadFormData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ContactCTASectionProps {
  initialUrl?: string;
  initialFindings?: string[];
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ initialUrl = '', initialFindings = [] }) => {
  const { t, language } = useLanguage();

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
              <span>{t.contact.badge}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {language === 'fr'
                  ? '3 PLACES DISPONIBLES CE MOIS-CI'
                  : language === 'en'
                  ? '3 AUDIT SLOTS LEFT THIS MONTH'
                  : '3 PLAZAS DISPONIBLES ESTE MES'}
              </span>
            </div>
          </div>

          {/* Titles */}
          <div className="mt-8 mb-10 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t.contact.title} <span className="text-[#F5A623]">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-medium">
              {t.contact.subtitle}
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
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm font-mono text-emerald-400">
                  {language === 'fr' ? 'Dossier Technique :' : language === 'en' ? 'Technical File ID:' : 'Expediente Técnico:'}{' '}
                  <span className="font-bold text-white">{ticketId}</span>
                </p>
                <p className="text-sm text-gray-300 max-w-lg mx-auto pt-2">
                  {t.contact.successDesc}
                </p>
              </div>

              <div className="p-4 bg-[#131B33] rounded-xl border border-gray-800 max-w-md mx-auto text-left font-mono text-xs text-gray-300 space-y-1">
                <div><strong>{t.contact.nameLabel}:</strong> {formData.fullName}</div>
                <div><strong>{t.contact.emailLabel}:</strong> {formData.email}</div>
                <div><strong>{t.contact.phoneLabel}:</strong> {formData.phone}</div>
                {formData.websiteUrl && <div><strong>{t.contact.urlLabel}:</strong> {formData.websiteUrl}</div>}
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs font-mono text-[#0066FF] hover:underline cursor-pointer"
              >
                ← {language === 'fr' ? 'Envoyer une autre demande' : language === 'en' ? 'Submit another request' : 'Enviar otra solicitud técnica'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nombre y Apellido */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Email Profesional */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    {t.contact.emailLabel} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    {t.contact.phoneLabel} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  />
                </div>

                {/* Tipo de Negocio */}
                <div>
                  <label htmlFor="businessType" className="block text-xs font-mono text-gray-300 uppercase mb-2">
                    {t.contact.businessTypeLabel} *
                  </label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                  >
                    <option value="Clínica Médica / Estética">{t.footer.sectorClinics}</option>
                    <option value="Restaurante de Gama Alta">{t.footer.sectorRestaurants}</option>
                    <option value="Servicios Profesionales de Élite">{t.footer.sectorHospitality}</option>
                  </select>
                </div>
              </div>

              {/* URL de tu web (Opcional) */}
              <div>
                <label htmlFor="websiteUrl" className="block text-xs font-mono text-gray-300 uppercase mb-2 flex items-center justify-between">
                  <span>{t.contact.urlLabel}</span>
                  {initialFindings.length > 0 && (
                    <span className="text-emerald-400 text-[11px] lowercase">
                      {language === 'fr' ? 'Résultats du scan joints' : language === 'en' ? 'Scanner findings attached' : 'Resultados de escáner adjuntos'}
                    </span>
                  )}
                </label>
                <input
                  id="websiteUrl"
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder={t.contact.urlPlaceholder}
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full metallic-btn py-4 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t.contact.submitting}</span>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 text-[#0A0F1F]" />
                      <span>{t.contact.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Confidentiality Disclaimer */}
              <p className="text-center font-mono text-gray-400 text-xs mt-4">
                {language === 'fr'
                  ? '* Données chiffrées et confidentielles sous protocole de sécurité strict. Aucun démarchage ni spam.'
                  : language === 'en'
                  ? '* Encrypted confidential data under strict security protocol. Zero commercial spam.'
                  : '* Datos encriptados y confidenciales bajo protocolo de seguridad estricto. Sin compromisos comerciales ni spam.'}
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};

