import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingSystemSection } from './components/BookingSystemSection';
import { AiAgentsSection } from './components/AiAgentsSection';
import { MethodologySection } from './components/MethodologySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ScannerSection } from './components/ScannerSection';
import { OsintSecurityAuditor } from './components/OsintSecurityAuditor';
import { ContactCTASection } from './components/ContactCTASection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';
import { PdfReportModal } from './components/PdfReportModal';
import { OsintPurchaseModal } from './components/OsintPurchaseModal';
import { VirtualAssistantChat } from './components/VirtualAssistantChat';
import { LegalModal, LegalTab } from './components/LegalModal';
import { ConsentBanner } from './components/ConsentBanner';
import { OsintSecurityAuditResult } from './types';
import { Home, Grid, Shield, Mail, Zap, CreditCard } from 'lucide-react';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfModalTier, setPdfModalTier] = useState<'basic' | 'complete' | 'premium'>('complete');
  const [isOsintModalOpen, setIsOsintModalOpen] = useState(false);
  const [osintTargetDomain, setOsintTargetDomain] = useState('');
  const [osintAuditResult, setOsintAuditResult] = useState<OsintSecurityAuditResult | null>(null);
  const [selectedUrlForAudit, setSelectedUrlForAudit] = useState('');
  const [selectedFindings, setSelectedFindings] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'inicio' | 'servicios' | 'scanner' | 'precios' | 'contacto'>('inicio');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('privacy');

  const handleOpenLegalModal = (tab: LegalTab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const scrollToSection = (id: string, tabName: 'inicio' | 'servicios' | 'scanner' | 'precios' | 'contacto') => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAuditWithUrl = (url: string, findings: string[]) => {
    setSelectedUrlForAudit(url);
    setSelectedFindings(findings);
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans antialiased selection:bg-[#0066FF] selection:text-white pb-16 lg:pb-0">
      {/* Top Navigation */}
      <Navbar onOpenAuditModal={() => setIsAuditModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Section 1: Hero */}
        <HeroSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onScrollToScanner={() => scrollToSection('scanner', 'scanner')}
        />

        {/* Section 2: The Problem */}
        <ProblemSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Section 3: Services (The 3 Pillars) */}
        <ServicesSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Section 4: Advanced Booking Systems (Sistemas de Gestión de Reservas Avanzadas) */}
        <BookingSystemSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onContactClick={() => scrollToSection('contacto', 'contacto')}
        />

        {/* Section 5: Advanced AI Agents (Agentes Avanzados con IA) */}
        <AiAgentsSection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onContactClick={() => scrollToSection('contacto', 'contacto')}
        />

        {/* Section 6: Methodology (El Arquitecto) */}
        <MethodologySection
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Section 6: Testimonials & Case Studies */}
        <TestimonialsSection />

        {/* Section 6: Interactive Fast Scanner */}
        <ScannerSection
          onSelectAuditWithUrl={handleSelectAuditWithUrl}
        />

        {/* Section 7: Standalone Real-time OSINT & Security Headers Auditor (29€ Pago Único) */}
        <OsintSecurityAuditor
          onOpenPurchaseModal={(result, target) => {
            setOsintAuditResult(result);
            setOsintTargetDomain(target);
            setIsOsintModalOpen(true);
          }}
        />

        {/* Section 8: Planes de Pago & Auditoría (19€, 49€, 99€ con Stripe Oficial) */}
        <PricingSection
          onOpenPdfModal={(tier) => {
            setPdfModalTier(tier);
            setIsPdfModalOpen(true);
          }}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Section 9: Final CTA & Contact Form */}
        <ContactCTASection
          initialUrl={selectedUrlForAudit}
          initialFindings={selectedFindings}
        />
      </main>

      {/* Section 9: Footer & Trust Badge */}
      <Footer onOpenLegalModal={handleOpenLegalModal} />

      {/* Global Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* PDF Detailed Report & Payment Modal (Step 6: 19€, 49€, 99€) */}
      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        defaultTier={pdfModalTier}
      />

      {/* Standalone OSINT Security Audit Purchase Modal (29€ Pago Único) */}
      <OsintPurchaseModal
        isOpen={isOsintModalOpen}
        onClose={() => setIsOsintModalOpen(false)}
        auditResult={osintAuditResult}
        targetDomain={osintTargetDomain}
      />

      {/* Full Legal Modal (Privacidad, Términos, Cookies, Aviso Legal, OSINT) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* RGPD / LOPDGDD Consent & Terms Acceptance Banner */}
      <ConsentBanner
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Dexvoi Virtual Assistant Chatbot (FR / EN / ES) */}
      <VirtualAssistantChat
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        onOpenPdfModal={(tier) => {
          setPdfModalTier(tier || 'complete');
          setIsPdfModalOpen(true);
        }}
        onOpenOsintModal={() => {
          setIsOsintModalOpen(true);
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0D1326]/95 backdrop-blur-md border-t border-gray-800/80 px-2 py-1.5 flex items-center justify-around font-mono text-[10px]">
        <button
          onClick={() => scrollToSection('hero', 'inicio')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'inicio' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => scrollToSection('servicios', 'servicios')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'servicios' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Servicios</span>
        </button>

        <button
          onClick={() => scrollToSection('scanner', 'scanner')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'scanner' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Zap className="w-5 h-5 mb-0.5 text-[#F5A623]" />
          <span className="text-[#F5A623]">Escáner</span>
        </button>

        <button
          onClick={() => scrollToSection('precios', 'precios')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'precios' ? 'text-[#635BFF] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span>Precios</span>
        </button>

        <button
          onClick={() => scrollToSection('contacto', 'contacto')}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
            activeTab === 'contacto' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span>Contacto</span>
        </button>
      </nav>
    </div>
  );
}
