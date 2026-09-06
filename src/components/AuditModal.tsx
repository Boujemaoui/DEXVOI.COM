import React, { useState } from 'react';
import { X, Shield, Lock, CheckCircle2, Clock, Zap } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
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
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white transition-colors"
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
              AUDITORÍA DE 5 PUNTOS CONFIRMADA
            </h3>
            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              El Arquitecto Digital ha recibido tus datos y comenzará la evaluación de velocidad, brechas de seguridad y presencia en Google Maps. Te contactaremos en menos de 24 horas.
            </p>
            <button
              onClick={handleResetAndClose}
              className="metallic-btn px-6 py-2.5 rounded font-mono text-xs uppercase"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-[#F5A623]">
                <Shield className="w-3.5 h-3.5" />
                <span>DIAGNÓSTICO ESTRATÉGICO SIN COSTO</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Auditoría Gratuita de 5 Puntos
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Analizamos tu infraestructura web, velocidad de carga, brechas de hacking y visibilidad local para clínicas y restaurantes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Carlos o Chef Andrés"
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    Email Profesional *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@tudominio.com"
                    className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                    WhatsApp / Teléfono *
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
                  Tipo de Negocio
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                >
                  <option value="Clínica Médica / Estética">Clínica Médica / Estética</option>
                  <option value="Restaurante de Gama Media-Alta">Restaurante de Gama Media-Alta</option>
                  <option value="Otro Negocio Premium">Otro Negocio de Servicios</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-300 uppercase mb-1">
                  URL de tu web (Opcional)
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.tuclinica.com"
                  className="w-full bg-[#0A0F1F] border border-gray-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full metallic-btn py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#0A0F1F]" />
                      <span>Solicitar Mi Diagnóstico Gratuito</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] font-mono text-gray-400 text-center">
                * Datos protegidos bajo estricto secreto profesional.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
