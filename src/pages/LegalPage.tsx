import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Scale, 
  Cookie, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  CheckCircle, 
  Globe, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { LegalTab, LegalLang } from '../components/LegalModal';
import { navigateTo } from '../utils/navigation';

interface LegalPageProps {
  initialTab?: LegalTab;
  onNavigateHome: () => void;
}

const TAB_TO_PATH: Record<LegalTab, string> = {
  privacy: '/privacidad',
  terms: '/condiciones',
  cookies: '/cookies',
  legal: '/aviso-legal',
  security: '/auditoria-seguridad'
};

export const LegalPage: React.FC<LegalPageProps> = ({ 
  initialTab = 'privacy',
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [legalLang, setLegalLang] = useState<LegalLang>('es');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    const path = TAB_TO_PATH[tab];
    navigateTo(path, { replace: false, scroll: false });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getPageTitle = () => {
    if (legalLang === 'es') {
      switch (activeTab) {
        case 'privacy': return 'Política de Privacidad y Protección de Datos';
        case 'terms': return 'Términos y Condiciones de Servicio';
        case 'cookies': return 'Política de Cookies y Almacenamiento Local';
        case 'legal': return 'Aviso Legal e Información Corporativa';
        case 'security': return 'Protocolos Éticos de Ciberseguridad & OSINT';
      }
    } else {
      switch (activeTab) {
        case 'privacy': return 'Privacy Policy & GDPR Compliance';
        case 'terms': return 'Terms and Conditions of Service';
        case 'cookies': return 'Cookie Policy & Local Storage';
        case 'legal': return 'Legal Notice & Company Disclosures';
        case 'security': return 'Ethical Hacking & OSINT Protocols';
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans pb-20">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0F1F]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131B33] hover:bg-[#1E293B] border border-gray-700/70 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{legalLang === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-gray-400">Legal</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="inline-flex items-center bg-[#131B33] border border-gray-700/80 rounded-lg p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLegalLang('es')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  legalLang === 'es'
                    ? 'bg-[#0066FF] text-white font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Ver en Español"
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLegalLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  legalLang === 'en'
                    ? 'bg-[#0066FF] text-white font-bold shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="View in English"
              >
                EN
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131B33] hover:bg-[#1E293B] border border-gray-700/70 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
              title={legalLang === 'es' ? 'Imprimir documento' : 'Print document'}
            >
              <Printer className="w-3.5 h-3.5 text-gray-400" />
              <span>{legalLang === 'es' ? 'Imprimir' : 'Print'}</span>
            </button>

            {/* Copy Link button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#131B33] hover:bg-[#1E293B] border border-gray-700/70 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
              title={legalLang === 'es' ? 'Copiar enlace oficial' : 'Copy official link'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{legalLang === 'es' ? 'Copiado' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span className="hidden sm:inline">{legalLang === 'es' ? 'Copiar Enlace' : 'Copy Link'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              {legalLang === 'es' ? 'Inicio' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-gray-400">Legal</span>
            <span>/</span>
            <span className="text-[#38BDF8] font-bold">
              {getPageTitle()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight flex items-center gap-3 flex-wrap">
            <span>{getPageTitle()}</span>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              RGPD / GDPR · LOPDGDD
            </span>
          </h1>

          <p className="mt-2 text-sm text-gray-400 font-sans max-w-3xl">
            {legalLang === 'es'
              ? 'DEXVOI · Arquitectura Digital, Ciberseguridad & Protección Rigurosa de Datos Confidenciales.'
              : 'DEXVOI · Digital Architecture, Defensive Cybersecurity & Strict Protection of Confidential Data.'}
          </p>
        </div>

        {/* Tab Navigation Navigation Links */}
        <nav 
          aria-label="Pestañas legales"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 border-b border-gray-800 text-xs font-mono scrollbar-none"
        >
          <a
            href="/privacidad"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabChange('privacy');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#0066FF] text-white font-bold shadow-lg shadow-[#0066FF]/20'
                : 'bg-[#131B33]/60 text-gray-400 hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{legalLang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</span>
          </a>

          <a
            href="/condiciones"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabChange('terms');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-[#0066FF] text-white font-bold shadow-lg shadow-[#0066FF]/20'
                : 'bg-[#131B33]/60 text-gray-400 hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{legalLang === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}</span>
          </a>

          <a
            href="/cookies"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabChange('cookies');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'bg-[#0066FF] text-white font-bold shadow-lg shadow-[#0066FF]/20'
                : 'bg-[#131B33]/60 text-gray-400 hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>{legalLang === 'es' ? 'Política de Cookies' : 'Cookie Policy'}</span>
          </a>

          <a
            href="/aviso-legal"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabChange('legal');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'legal'
                ? 'bg-[#0066FF] text-white font-bold shadow-lg shadow-[#0066FF]/20'
                : 'bg-[#131B33]/60 text-gray-400 hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{legalLang === 'es' ? 'Aviso Legal' : 'Legal Notice'}</span>
          </a>

          <a
            href="/auditoria-seguridad"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleTabChange('security');
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-[#0066FF] text-white font-bold shadow-lg shadow-[#0066FF]/20'
                : 'bg-[#131B33]/60 text-gray-400 hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{legalLang === 'es' ? 'Protocolos Éticos & OSINT' : 'Ethical OSINT Protocols'}</span>
          </a>
        </nav>

        {/* Content Box */}
        <div className="bg-[#0D1326] border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 font-sans text-sm text-gray-300 leading-relaxed">
          
          {/* TAB 1: POLÍTICA DE PRIVACIDAD / PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            legalLang === 'es' ? (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[#38BDF8] font-bold">RESPONSABLE DEL TRATAMIENTO:</span> DEXVOI DIGITAL ARCHITECTS
                    <span className="block text-gray-400">Delegado de Protección de Datos (DPO): info@dexvoi.com</span>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] self-start sm:self-auto">
                    VIGENTE Y AUDITADO 2026
                  </div>
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    1. Principios de Protección de Datos (RGPD)
                  </h2>
                  <p>
                    En <strong>DEXVOI</strong> tratamos la información que nos facilita con el fin de prestarle el servicio solicitado de auditoría técnica perimetral, consultoría de arquitectura web, emisión de informes forenses y facturación mercantil. Los datos se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales tributarias.
                  </p>
                  <p>
                    Cumplimos rigurosamente con el <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la <strong>Ley Orgánica 3/2018 (LOPDGDD)</strong> relativa a la protección de las personas físicas en lo que respecta al tratamiento de sus datos personales.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    2. ¿Qué datos recopilamos y para qué?
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Datos de contacto (Nombre, Email, Teléfono):</strong> Para responder a sus consultas, enviarle los informes en PDF contratados y notificarle el estado de sus auditorías.</li>
                    <li><strong>URL o dominio web del negocio:</strong> Exclusivamente para realizar el análisis técnico pasivo no intrusivo y la auditoría solicitada por el titular o responsable.</li>
                    <li><strong>Datos de facturación y pago:</strong> Gestionados de forma 100% segura y tokenizada mediante <strong>Stripe Inc.</strong> (PCI-DSS Nivel 1). DEXVOI nunca almacena los números completos de su tarjeta de crédito o débito.</li>
                    <li><strong>Interacciones en el Asistente Virtual:</strong> Para brindar soporte guiado automatizado y procesar solicitudes prioritarias en tiempo real.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    3. Destinatarios y Encargados de Tratamiento
                  </h2>
                  <p>
                    Los datos no se cederán a terceros ajenos a la prestación del servicio salvo obligación legal o mandato judicial. Para garantizar la máxima fiabilidad utilizamos proveedores de primer nivel bajo acuerdos de procesamiento de datos:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Stripe Payments Europe:</span> Procesamiento seguro de cobros y facturación.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Resend / AWS Infrastructure:</span> Envío seguro de correos transaccionales e informes.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Cloudflare Global Network:</span> Protección perimetral, firewall WAF y mitigación DDoS.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Google Cloud Platform:</span> Alojamiento de modelos de asistencia y cómputo cifrado.
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    4. Ejercicio de Derechos (ARCO+)
                  </h2>
                  <p>
                    Usted tiene derecho a obtener confirmación sobre si en DEXVOI estamos tratando sus datos personales. Por tanto, tiene derecho a ejercer sus derechos de:
                  </p>
                  <p className="text-xs font-mono text-emerald-400 bg-[#080D1A] p-3 rounded-lg border border-gray-800">
                    [ Acceso ] · [ Rectificación ] · [ Supresión / Olvido ] · [ Limitación ] · [ Portabilidad ] · [ Oposición ]
                  </p>
                  <p>
                    Para ejercerlos, simplemente remita un correo electrónico con su solicitud a <strong>info@dexvoi.com</strong> acreditando su identidad.
                  </p>
                </section>
              </article>
            ) : (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[#38BDF8] font-bold">DATA CONTROLLER:</span> DEXVOI DIGITAL ARCHITECTS
                    <span className="block text-gray-400">DPO Contact / Privacy Inquiries: info@dexvoi.com</span>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] self-start sm:self-auto">
                    AUDITED EFFECTIVE 2026
                  </div>
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    1. Data Protection Principles (GDPR Compliance)
                  </h2>
                  <p>
                    At <strong>DEXVOI</strong>, we process the information you provide in order to deliver the requested technical web audits, perimeter diagnostic assessments, forensic cybersecurity reports, and invoicing. We strictly comply with <strong>Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR)</strong> and applicable international data privacy standards.
                  </p>
                  <p>
                    Personal data is retained only for as long as necessary to maintain the contractual relationship or to comply with statutory legal and tax obligations.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    2. Data We Collect and Processing Purposes
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Contact Information (Name, Email, Phone number):</strong> Used strictly to respond to inquiries, deliver purchased audit reports, and provide technical consultations.</li>
                    <li><strong>Target Domain / Website URL:</strong> Exclusively to perform passive, non-intrusive DNS and HTTP security header inspections requested by the website owner or representative.</li>
                    <li><strong>Payment & Invoicing Information:</strong> Securely tokenized and processed through <strong>Stripe Inc.</strong> (PCI-DSS Level 1 certified). DEXVOI never accesses or stores complete credit card numbers.</li>
                    <li><strong>Virtual Assistant Logs:</strong> Processed to provide automated multilingual customer support and lead assistance in real time.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    3. Data Recipients and Sub-processors
                  </h2>
                  <p>
                    We do not sell, rent, or transfer personal data to third parties. We engage trusted, enterprise-grade cloud providers operating under strict Data Processing Agreements (DPAs) and Standard Contractual Clauses (SCCs):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Stripe Payments Europe:</span> Certified secure payment gateway and billing infrastructure.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Resend / AWS SES:</span> Transactional email delivery and forensic report dispatching.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Cloudflare Global Network:</span> Edge security, WAF protection, and DDoS mitigation.
                    </div>
                    <div className="p-3 rounded-lg bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold">Google Cloud Platform:</span> High-performance encrypted computing infrastructure.
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                    4. Your Rights Under the GDPR
                  </h2>
                  <p>
                    Under Chapter III of the GDPR, you have the right to access, rectify, restrict, or request erasure of your personal data at any time:
                  </p>
                  <p className="text-xs font-mono text-emerald-400 bg-[#080D1A] p-3 rounded-lg border border-gray-800">
                    [ Right of Access ] · [ Rectification ] · [ Erasure / To Be Forgotten ] · [ Restriction ] · [ Portability ] · [ Objection ]
                  </p>
                  <p>
                    To exercise any of these statutory rights, send a written request along with proof of identity to <strong>info@dexvoi.com</strong>.
                  </p>
                </section>
              </article>
            )
          )}

          {/* TAB 2: TÉRMINOS Y CONDICIONES / TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            legalLang === 'es' ? (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#F5A623] font-bold">CONDICIONES DE CONTRATACIÓN Y SERVICIO:</span> Al solicitar auditorías gratuitas, adquirir informes en PDF (19€, 49€, 99€) o contratar desarrollos de blindaje con DEXVOI, usted acepta las presentes condiciones.
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    1. Objeto del Servicio
                  </h2>
                  <p>
                    DEXVOI presta servicios de ingeniería de software, arquitectura digital de alta conversión, posicionamiento en buscadores, auditoría preventiva de ciberseguridad e inteligencia de fuentes abiertas (OSINT) para empresas y profesionales.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    2. Planes de Auditoría Técnica y Pagos
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>Modalidad de pago:</strong> Los informes de auditoría (Starter 19€, Comprehensive 49€ y Premium 99€) son servicios profesionales de <strong>pago único</strong>. No conllevan suscripción ni cuotas recurrentes inadvertidas.</li>
                    <li><strong>Plataforma de cobro:</strong> Los pagos se procesan directamente en la infraestructura oficial de Stripe Checkout con cifrado TLS 1.3 de 256 bits.</li>
                    <li><strong>Entrega del producto digital:</strong> Los informes ejecutivos en PDF se generan y entregan de forma digital al correo electrónico facilitado en un plazo habitual de 1 a 24 horas hábiles.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    3. Derecho de Desistimiento en Contenidos Digitales
                  </h2>
                  <p>
                    Conforme a la normativa europea de consumidores y usuarios (Directiva 2011/83/UE, artículo 16; Real Decreto Legislativo 1/2007, de 16 de noviembre, artículo 103), el derecho de desistimiento no es aplicable al suministro de contenido digital personalizado o informes técnicos forenses una vez que la ejecución o análisis ha comenzado con el consentimiento previo expreso del consumidor.
                  </p>
                  <p>
                    No obstante, en DEXVOI garantizamos la máxima rigurosidad técnica en cada informe y ofrecemos soporte prioritario ante cualquier duda de implementación.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    4. Limitación de Responsabilidad
                  </h2>
                  <p>
                    Los diagnósticos técnicos y auditorías reflejan el estado perimetral observado en el momento del escaneo. DEXVOI no se hace responsable de fallos sobrevenidos por modificaciones del proveedor de hosting del cliente, ataques de terceros o configuraciones deficientes no gestionadas directamente por nuestro equipo.
                  </p>
                </section>
              </article>
            ) : (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#F5A623] font-bold">TERMS OF SERVICE & ENGAGEMENT:</span> By requesting technical audits, ordering digital forensic PDF reports (€19, €49, €99), or commissioning digital architecture from DEXVOI, you agree to these terms.
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    1. Scope of Services
                  </h2>
                  <p>
                    DEXVOI provides high-performance web engineering, digital architecture, search engine optimization, perimeter cybersecurity diagnostic auditing, and open-source intelligence (OSINT) consulting for enterprises and professionals.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    2. Forensic Audit Packages & One-Time Payment Model
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li><strong>One-Time Pricing:</strong> Audit reports (Starter €19, Comprehensive €49, and Premium €99) are professional standalone services with <strong>one-time payment</strong>. There are no hidden fees, recurring subscriptions, or surprise recurring charges.</li>
                    <li><strong>Payment Gateway:</strong> All financial transactions are securely routed through Stripe Checkout with industry-standard 256-bit TLS 1.3 encryption.</li>
                    <li><strong>Digital Delivery:</strong> Executive PDF reports are compiled and delivered directly to the provided email address typically within 1 to 24 business hours.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    3. Right of Withdrawal on Tailored Digital Content
                  </h2>
                  <p>
                    In accordance with European Consumer Rights legislation (Directive 2011/83/EU, Article 16(m)), the 14-day statutory right of withdrawal does not apply to custom technical deliverables or forensic audits once automated scanning and execution have commenced with the client's express prior consent.
                  </p>
                  <p>
                    Nonetheless, DEXVOI upholds the highest technical rigor for every deliverable and provides priority support for remediation questions.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#0066FF]" />
                    4. Limitation of Liability
                  </h2>
                  <p>
                    Technical diagnostic scans evaluate perimeter security posture as observed at the exact time of execution. DEXVOI shall not be held liable for third-party hosting failures, upstream DNS outages, or cyber incidents arising from systems outside our direct management.
                  </p>
                </section>
              </article>
            )
          )}

          {/* TAB 3: POLÍTICA DE COOKIES / COOKIE POLICY */}
          {activeTab === 'cookies' && (
            legalLang === 'es' ? (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#38BDF8] font-bold">POLÍTICA DE COOKIES Y ALMACENAMIENTO LOCAL:</span> Cumplimiento del artículo 22.2 de la LSSI-CE y directrices de la Agencia Española de Protección de Datos (AEPD).
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    1. ¿Qué son las Cookies?
                  </h2>
                  <p>
                    Una cookie es un pequeño fichero que se descarga en su terminal para almacenar datos que podrán ser actualizados y recuperados por la entidad responsable de su instalación.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    2. Tipos de Cookies y Tecnologías Empleadas en DEXVOI
                  </h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-emerald-400 font-bold font-mono block mb-1">✓ Cookies Técnicas y Estrictamente Necesarias (Obligatorias)</span>
                      <p className="text-gray-300">
                        Permiten la navegación fluida, la seguridad de la conexión, el mantenimiento de sesiones en el asistente virtual y el almacenamiento de sus preferencias de privacidad (`dexvoi_consent`). No recopilan datos para fines comerciales.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold font-mono block mb-1">✓ Cookies de Seguridad y Prevención de Fraude (Stripe & Cloudflare)</span>
                      <p className="text-gray-300">
                        Garantizan la detección de robots maliciosos, protección DDoS en Cloudflare y verificación biométrica/antifraude al momento de pagar en Stripe.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-[#F5A623] font-bold font-mono block mb-1">✓ Cookies Analíticas Anónimas (Bajo Consentimiento)</span>
                      <p className="text-gray-300">
                        Miden de forma totalmente disociada y agregada la latencia de las páginas y la efectividad de las herramientas para mejorar la velocidad del sitio.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    3. Cómo Desactivar o Gestionar las Cookies
                  </h2>
                  <p>
                    Usted puede revocar en cualquier momento su consentimiento o configurar las opciones de privacidad de su navegador web (Chrome, Safari, Firefox, Edge).
                  </p>
                </section>
              </article>
            ) : (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#38BDF8] font-bold">COOKIE POLICY & LOCAL STORAGE:</span> Fully compliant with the EU ePrivacy Directive and GDPR transparency standards.
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    1. What are Cookies?
                  </h2>
                  <p>
                    A cookie is a small text file downloaded to your device to store browsing state, security tokens, and user preferences.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    2. Cookie Categories Used by DEXVOI
                  </h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-emerald-400 font-bold font-mono block mb-1">✓ Strictly Necessary & Technical Cookies (Mandatory)</span>
                      <p className="text-gray-300">
                        Required for secure navigation, preserving session continuity in the assistant, and remembering your privacy choices (`dexvoi_consent`). Never used for advertising.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-[#38BDF8] font-bold font-mono block mb-1">✓ Security & Fraud Prevention (Stripe & Cloudflare)</span>
                      <p className="text-gray-300">
                        Protects against automated bot attacks, DDoS floods, and validates anti-fraud tokenization during Stripe Checkout payments.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#080D1A] border border-gray-800">
                      <span className="text-[#F5A623] font-bold font-mono block mb-1">✓ Anonymous Analytics (Consent-Based)</span>
                      <p className="text-gray-300">
                        Measures aggregate performance metrics and page latency without tracking individual user identities.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#0066FF]" />
                    3. How to Manage or Revoke Consent
                  </h2>
                  <p>
                    You can adjust or revoke your cookie preferences at any time by updating your browser settings (Chrome, Safari, Firefox, Edge).
                  </p>
                </section>
              </article>
            )
          )}

          {/* TAB 4: AVISO LEGAL / LEGAL NOTICE */}
          {activeTab === 'legal' && (
            legalLang === 'es' ? (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#38BDF8] font-bold">INFORMACIÓN GENERAL (LSSI-CE):</span> Cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico.
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    1. Datos Identificativos del Titular
                  </h2>
                  <div className="p-4 rounded-xl bg-[#080D1A] border border-gray-800 space-y-2 text-xs font-mono">
                    <p><strong className="text-white">Denominación Comercial:</strong> DEXVOI Business & Digital Architecture</p>
                    <p><strong className="text-white">Email de Contacto Oficial:</strong> info@dexvoi.com</p>
                    <p><strong className="text-white">Sitio Web:</strong> https://dexvoi.com</p>
                    <p><strong className="text-white">Actividad:</strong> Consultoría de ingeniería informática, ciberseguridad preventiva, auditoría técnica web y arquitectura de software.</p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    2. Propiedad Intelectual e Industrial
                  </h2>
                  <p>
                    Todos los derechos de propiedad intelectual del sitio web dexvoi.com, su código fuente, diseño gráfico, logotipos, marcas comerciales, algoritmos de auditoría perimetral e informes técnicos pertenecen a DEXVOI o a sus respectivos licenciantes. Queda prohibida su reproducción o distribución sin autorización expresa.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    3. Legislación Aplicable y Jurisdicción
                  </h2>
                  <p>
                    Para la resolución de cualquier controversia derivada del presente sitio web o de los servicios en él desarrollados, será de aplicación la legislación española y europea, sometiéndose las partes a los Juzgados y Tribunales competentes.
                  </p>
                </section>
              </article>
            ) : (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#0066FF]/30 text-xs font-mono text-gray-300">
                  <span className="text-[#38BDF8] font-bold">COMPANY IMPRINT & LEGAL NOTICE:</span> Mandatory disclosures pursuant to European Union information society service directives.
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    1. Identifying Company Information
                  </h2>
                  <div className="p-4 rounded-xl bg-[#080D1A] border border-gray-800 space-y-2 text-xs font-mono">
                    <p><strong className="text-white">Trade Name:</strong> DEXVOI Business & Digital Architecture</p>
                    <p><strong className="text-white">Official Contact Email:</strong> info@dexvoi.com</p>
                    <p><strong className="text-white">Official Website:</strong> https://dexvoi.com</p>
                    <p><strong className="text-white">Business Activity:</strong> Computer engineering consultancy, defensive cybersecurity, technical website auditing, and digital architecture.</p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    2. Intellectual & Industrial Property
                  </h2>
                  <p>
                    All intellectual property rights associated with dexvoi.com, its source code, interface designs, trademarks, algorithmic diagnostic utilities, and generated technical reports are the exclusive property of DEXVOI or its licensors. Unauthorized reproduction or redistribution is strictly prohibited.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0066FF]" />
                    3. Governing Law and Jurisdiction
                  </h2>
                  <p>
                    Any legal claims or controversies arising in connection with this website or services shall be governed by European and Spanish law, subject to the jurisdiction of the competent courts.
                  </p>
                </section>
              </article>
            )
          )}

          {/* TAB 5: PROTOCOLOS ÉTICOS & OSINT / ETHICAL OSINT PROTOCOLS */}
          {activeTab === 'security' && (
            legalLang === 'es' ? (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#F5A623]/40 text-xs font-mono text-gray-300 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#F5A623] shrink-0" />
                  <div>
                    <span className="text-[#F5A623] font-bold">MANIFIESTO DE ETHICAL HACKING & OSINT:</span> Protocolo de diagnóstico pasivo no lesivo, confidencialidad estricta y divulgación responsable.
                  </div>
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    1. Diagnóstico No Intrusivo (Passive Reconnaissance)
                  </h2>
                  <p>
                    Las herramientas de diagnóstico de DEXVOI operan bajo metodología estrictamente <strong>pasiva y no intrusiva</strong>. Solo recopilan metadatos emitidos públicamente por los servidores web (como cabeceras HTTP, certificados SSL, latencias de respuesta DNS y registros SPF/DMARC) sin alterar bases de datos, sin inyectar payloads perjudiciales y sin degradar la disponibilidad del servicio auditado.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    2. Estricta Confidencialidad Comercial
                  </h2>
                  <p>
                    Cualquier vulnerabilidad, fuga de cabeceras o punto débil detectado durante una auditoría se trata bajo secreto profesional y solo se comparte con el titular del dominio o el solicitante autorizado en su informe privado en PDF. DEXVOI jamás publica debilidades técnicas de sus clientes a terceros.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    3. Divulgación Responsable
                  </h2>
                  <p>
                    Promovemos activamente las mejores prácticas del estándar <strong>OWASP Top 10</strong> y la comunidad de ciberseguridad internacional, orientadas a blindar a pequeñas y medianas empresas contra ataques masivos de ransomware y filtración de datos.
                  </p>
                </section>
              </article>
            ) : (
              <article className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-xl bg-[#131B33] border border-[#F5A623]/40 text-xs font-mono text-gray-300 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#F5A623] shrink-0" />
                  <div>
                    <span className="text-[#F5A623] font-bold">ETHICAL HACKING & OSINT MANIFESTO:</span> Non-intrusive passive reconnaissance protocol, strict confidentiality, and responsible disclosure.
                  </div>
                </div>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    1. Non-Intrusive Passive Reconnaissance
                  </h2>
                  <p>
                    DEXVOI security diagnostic tools operate strictly under <strong>passive, non-intrusive methodologies</strong>. We solely analyze publicly broadcasted metadata (HTTP response headers, public DNS records, TLS certificates, SPF and DMARC policies) without modifying databases, without injecting harmful payloads, and without degrading target service availability.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    2. Strict Commercial Confidentiality
                  </h2>
                  <p>
                    All observed perimeter vulnerabilities, header misconfigurations, and weaknesses are handled under strict professional confidentiality. Findings are only disclosed to the verified client in their private PDF deliverable. DEXVOI never discloses client vulnerabilities to third parties.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#F5A623]" />
                    3. Responsible Disclosure & OWASP Best Practices
                  </h2>
                  <p>
                    We strictly uphold <strong>OWASP Top 10</strong> defensive security standards, empowering businesses and clinics to harden their perimeter against automated credential harvesting and ransomware attacks.
                  </p>
                </section>
              </article>
            )
          )}

        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-800 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>
              {legalLang === 'es' ? 'Auditoría Legal DEXVOI · Septiembre 2026' : 'DEXVOI Legal Compliance Audit · September 2026'}
            </span>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold transition-all cursor-pointer shadow-lg shadow-[#0066FF]/20"
          >
            {legalLang === 'es' ? '← Volver a la Página Principal' : '← Return to Main Page'}
          </button>
        </div>
      </div>
    </div>
  );
};
