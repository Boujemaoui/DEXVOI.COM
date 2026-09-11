import React, { useState } from 'react';
import { X, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [businessType, setBusinessType] = useState('Clínica Médica / Estética');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          businessType,
          websiteUrl: website,
          type: 'Auditoría Gratuita 5 Puntos',
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setIsDone(true);
    }
  };

  const handleResetAndClose = () => {
    setIsDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0D1326] border border-[#0066FF]/40 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-5 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-mono">
              {language === 'fr' ? 'AUDIT 5 POINTS CONFIRMÉ' : language === 'en' ? '5-POINT AUDIT CONFIRMED' : 'AUDITORÍA DE 5 PUNTOS CONFIRMADA'}
            </h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {language === 'fr'
                ? 'L’Architecte Digital a bien reçu vos informations et initie l’évaluation de vitesse, failles et visibilité locale. Nous vous recontacterons sous 24h.'
                : language === 'en'
                ? 'Our Digital Architect has received your details and is initiating the speed, vulnerability, and local presence assessment. We will contact you within 24h.'
                : 'El Arquitecto Digital ha recibido tus datos y comenzará la evaluación de velocidad, brechas de seguridad y presencia en Google Maps. Te contactaremos en menos de 24 horas.'}
            </p>
            <button
              onClick={handleResetAndClose}
              className="metallic-btn px-6 py-2.5 rounded font-mono text-xs uppercase cursor-pointer"
            >
              {language === 'fr' ? 'Compris' : language === 'en' ? 'Understood' : 'Entendido'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#F5A623]">
                <Shield className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'DIAGNOSTIC STRATÉGIQUE GRATUIT' : language === 'en' ? 'NO-COST STRATEGIC DIAGNOSIS' : 'DIAGNÓSTICO ESTRATÉGICO SIN COSTO'}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {language === 'fr' ? 'Audit Gratuit en 5 Points' : language === 'en' ? 'Free 5-Point Technical Audit' : 'Auditoría Gratuita de 5 Puntos'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {language === 'fr'
                  ? 'Analyse de votre infrastructure web, vitesse de chargement, failles de sécurité et visibilité locale pour cabinets et restaurants.'
                  : language === 'en'
                  ? 'We analyze your web architecture, load speed, security perimeter, and local map rankings tailored for clinics and high-end venues.'
                  : 'Analizamos tu infraestructura web, velocidad de carga, brechas de hacking y visibilidad local para clínicas y restaurantes.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                  {language === 'fr' ? 'Nom et Prénom *' : language === 'en' ? 'Full Name *' : 'Nombre y Apellido *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'fr' ? 'Dr. Charles ou Chef Alexandre' : language === 'en' ? 'Dr. Charles or Chef Michael' : 'Dr. Carlos o Chef Andrés'}
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    {language === 'fr' ? 'Email Professionnel *' : language === 'en' ? 'Work Email *' : 'Email Profesional *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@domain.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    {language === 'fr' ? 'WhatsApp / Téléphone *' : language === 'en' ? 'WhatsApp / Phone *' : 'WhatsApp / Teléfono *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34 600..."
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                  {language === 'fr' ? 'Type d’activité' : language === 'en' ? 'Industry / Business Type' : 'Tipo de Negocio'}
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                >
                  <option value="Clínica Médica / Estética">{language === 'fr' ? 'Clinique Médicale / Esthétique' : language === 'en' ? 'Medical / Aesthetic Clinic' : 'Clínica Médica / Estética'}</option>
                  <option value="Restaurante de Gama Media-Alta">{language === 'fr' ? 'Restaurant Gastronomique / Haut de gamme' : language === 'en' ? 'Upscale Restaurant / Hospitality' : 'Restaurante de Gama Media-Alta'}</option>
                  <option value="Otro Negocio Premium">{language === 'fr' ? 'Autre Entreprise de Services' : language === 'en' ? 'Other Professional Service' : 'Otro Negocio de Servicios'}</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                  {language === 'fr' ? 'URL du site (Optionnel)' : language === 'en' ? 'Website URL (Optional)' : 'URL de tu web (Opcional)'}
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.yourcompany.com"
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full metallic-btn py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{language === 'fr' ? 'Traitement en cours...' : language === 'en' ? 'Processing...' : 'Procesando...'}</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#0A0F1F]" />
                      <span>{language === 'fr' ? 'Demander mon diagnostic gratuit' : language === 'en' ? 'Request Free Diagnostic' : 'Solicitar Mi Diagnóstico Gratuito'}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] font-mono text-gray-400 text-center">
                {language === 'fr' ? '* Données protégées sous secret professionnel strict.' : language === 'en' ? '* All information protected under strict professional confidentiality.' : '* Datos protegidos bajo estricto secreto profesional.'}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

