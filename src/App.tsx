import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { MethodologySection } from './components/MethodologySection';
import { AboutSection } from './components/AboutSection';
import { BookingSystemSection } from './components/BookingSystemSection';
import { AiAgentsSection } from './components/AiAgentsSection';
import { ScannerSection } from './components/ScannerSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactCTASection } from './components/ContactCTASection';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';
import { PdfReportModal } from './components/PdfReportModal';
import { OsintPurchaseModal } from './components/OsintPurchaseModal';
import { VirtualAssistantChat } from './components/VirtualAssistantChat';
import { LegalModal, LegalTab } from './components/LegalModal';
import { ConsentBanner } from './components/ConsentBanner';
import { OsintSecurityAuditResult } from './types';
import { Home, Grid, Shield, Mail, CreditCard } from 'lucide-react';
import { useAppRoute, navigateTo, updatePageMetadata } from './utils/navigation';
import { useLanguage } from './i18n/LanguageContext';
import { initGA, trackPageView } from './utils/analytics';
import { getLocalizedPath } from './utils/seoMultilingual';
import { LegalPage } from './pages/LegalPage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { OsintAuditPage } from './pages/OsintAuditPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const { language } = useLanguage();
  const { route, blogSlug } = useAppRoute();
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

  // Initialize Google Analytics and track route changes
  useEffect(() => {
    initGA();
  }, []);

  // Synchronize SEO titles, descriptions, canonical and hreflang tags
  useEffect(() => {
    updatePageMetadata(route, language, blogSlug);
    trackPageView(window.location.pathname, document.title);
  }, [route, language, blogSlug]);

  const handleOpenLegalModal = (tab: LegalTab = 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const navigateHomeLocalized = () => {
    navigateTo(getLocalizedPath('home', language));
  };

  const scrollToSection = (id: string, tabName: 'inicio' | 'servicios' | 'scanner' | 'precios' | 'contacto') => {
    setActiveTab(tabName);
    if (route !== 'home') {
      const homePath = getLocalizedPath('home', language);
      navigateTo(`${homePath}#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
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
      {/* Route-based Render */}
      {route === 'services' && (
        <ServicesPage
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'pricing' && (
        <PricingPage
          onNavigateHome={navigateHomeLocalized}
          onOpenPdfModal={(tier) => {
            setPdfModalTier(tier);
            setIsPdfModalOpen(true);
          }}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'contact' && (
        <ContactPage
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'blog' && (
        <BlogPage
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'blog-post' && (
        <BlogPostPage
          slug={blogSlug}
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'security' && (
        <OsintAuditPage
          onNavigateHome={navigateHomeLocalized}
          onOpenPurchaseModal={(result, target) => {
            setOsintAuditResult(result);
            setOsintTargetDomain(target);
            setIsOsintModalOpen(true);
          }}
        />
      )}

      {(route === 'privacy' || route === 'terms' || route === 'cookies' || route === 'legal') && (
        <LegalPage
          initialTab={route as LegalTab}
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === '404' && (
        <NotFoundPage
          onNavigateHome={navigateHomeLocalized}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />
      )}

      {route === 'home' && (
        <>
          {/* Top Navigation */}
          <Navbar onOpenAuditModal={() => setIsAuditModalOpen(true)} />

          {/* Main Content Sections */}
          <main id="main-content">
            {/* Section 00: Hero */}
            <HeroSection 
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onScrollToScanner={() => scrollToSection('scanner', 'scanner')}
            />

            {/* Section 01: Core Diagnostic */}
            <ProblemSection onOpenAuditModal={() => setIsAuditModalOpen(true)} />

            {/* Section 02: Three Pillars Architecture */}
            <ServicesSection onOpenAuditModal={() => setIsAuditModalOpen(true)} />

            {/* Section 03: Fast Direct Booking Systems */}
            <BookingSystemSection 
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onContactClick={() => scrollToSection('contacto', 'contacto')}
            />

            {/* Section 04: AI Conversational & Voice Agents */}
            <AiAgentsSection 
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onContactClick={() => scrollToSection('contacto', 'contacto')}
            />

            {/* Section 05: Methodology */}
            <MethodologySection onOpenAuditModal={() => setIsAuditModalOpen(true)} />

            {/* Section 05.5: Who We Are / The Architect Behind Dexvoi */}
            <AboutSection 
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onContactClick={() => scrollToSection('contacto', 'contacto')}
            />

            {/* Section 06: Live Perimeter OSINT Scanner */}
            <ScannerSection 
              onSelectAuditWithUrl={handleSelectAuditWithUrl}
              onOpenPdfModal={(tier) => {
                setPdfModalTier(tier);
                setIsPdfModalOpen(true);
              }}
              onOpenOsintModal={(result, target) => {
                setOsintAuditResult(result);
                setOsintTargetDomain(target);
                setIsOsintModalOpen(true);
              }}
            />

            {/* Section 07: Transparent Fixed Pricing */}
            <PricingSection 
              onOpenAuditModal={() => setIsAuditModalOpen(true)} 
              onOpenPdfModal={(tier) => {
                setPdfModalTier(tier);
                setIsPdfModalOpen(true);
              }}
            />

            {/* Section 08: Client Testimonials */}
            <TestimonialsSection />

            {/* Section 09: High-Priority Direct Contact */}
            <ContactCTASection 
              initialUrl={selectedUrlForAudit} 
              initialFindings={selectedFindings} 
            />
          </main>

          {/* Footer */}
          <Footer onOpenLegalModal={handleOpenLegalModal} />
        </>
      )}

      {/* Global Interactive Elements */}
      <AuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />

      <PdfReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        defaultTier={pdfModalTier}
      />

      <OsintPurchaseModal
        isOpen={isOsintModalOpen}
        onClose={() => setIsOsintModalOpen(false)}
        auditResult={osintAuditResult}
        targetDomain={osintTargetDomain}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      <ConsentBanner
        onOpenLegalModal={handleOpenLegalModal}
      />

      <VirtualAssistantChat 
        onOpenAuditModal={() => {
          setIsAuditModalOpen(true);
        }}
        onOpenPdfModal={() => {
          setIsPdfModalOpen(true);
        }}
        onOpenOsintModal={() => {
          setIsOsintModalOpen(true);
        }}
      />

      {/* Mobile Bottom Navigation Bar with localized URLs */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0D1326]/95 backdrop-blur-md border-t border-gray-800/80 px-2 py-1.5 flex items-center justify-around font-mono text-[10px]">
        <button
          onClick={() => {
            if (route !== 'home') navigateTo(getLocalizedPath('home', language));
            else scrollToSection('hero', 'inicio');
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            route === 'home' && activeTab === 'inicio' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{language === 'fr' ? 'Accueil' : language === 'en' ? 'Home' : 'Inicio'}</span>
        </button>

        <button
          onClick={() => navigateTo(getLocalizedPath('services', language))}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            route === 'services' ? 'text-[#0066FF] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>{language === 'es' ? 'Servicios' : 'Services'}</span>
        </button>

        <button
          onClick={() => navigateTo(getLocalizedPath('security', language))}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            route === 'security' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Shield className="w-5 h-5 mb-0.5" />
          <span>{language === 'fr' ? 'Sécurité' : language === 'en' ? 'Security' : 'Seguridad'}</span>
        </button>

        <button
          onClick={() => navigateTo(getLocalizedPath('pricing', language))}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            route === 'pricing' ? 'text-[#635BFF] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span>{language === 'fr' ? 'Tarifs' : language === 'en' ? 'Pricing' : 'Precios'}</span>
        </button>

        <button
          onClick={() => navigateTo(getLocalizedPath('contact', language))}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            route === 'contact' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
        </button>
      </nav>
    </div>
  );
}
