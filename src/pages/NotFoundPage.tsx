import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Home, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  Mail, 
  Compass,
  Terminal,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';
import { navigateTo } from '../utils/navigation';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onOpenAuditModal
}) => {
  const { language } = useLanguage();
  const [currentPath, setCurrentPath] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname + window.location.search);
    }
  }, []);

  const content = {
    es: {
      badge: 'CÓDIGO_ESTADO // 404_ENDPOINT_NO_LOCALIZADO',
      title: 'Perímetro No Encontrado',
      subtitle: 'La ruta o recurso digital que estás intentando consultar no existe en este servidor, ha sido reorganizada bajo nuevos protocolos o se encuentra fuera del mapa perimetral.',
      diagnosticsTitle: 'Telemetría de Respuesta Perimetral',
      statusOk: 'ACTIVO & ESTABLE',
      statusNotFound: '404 NO ENCONTRADO',
      pathLabel: 'Ruta solicitada:',
      gatewayLabel: 'Puerta de enlace:',
      firewallLabel: 'Blindaje perimetral:',
      recommendationLabel: 'Recomendación:',
      recommendationText: 'Comprueba si la URL contiene errores tipográficos o utiliza los accesos directos verificados a continuación.',
      quickAccessTitle: 'Rutas Verificadas Disponibles',
      btnHome: 'Volver al Inicio',
      btnAudit: 'Auditoría OSINT Gratuita',
      btnServices: 'Servicios de Élite',
      btnBlog: 'Blog & Recursos Técnicos',
      btnContact: 'Contactar Especialista',
      searchPlaceholder: '¿Buscas algo específico? Ej: precios, clínicas, seo...',
      searchAction: 'Buscar',
      cards: [
        {
          title: 'Arquitectura & Servicios',
          desc: 'Soluciones de alto rendimiento, velocidad sub-segundo y blindaje perimetral.',
          icon: Zap,
          path: '/servicios',
          tag: 'Servicios'
        },
        {
          title: 'Escáner Perimetral OSINT',
          desc: 'Analiza tu web en tiempo real: cabeceras HTTP, DNS, SSL y vulnerabilidades OWASP.',
          icon: ShieldCheck,
          path: '/auditoria-seguridad',
          tag: 'Herramienta'
        },
        {
          title: 'Blog & Guías Técnicas',
          desc: 'Artículos de ingeniería sobre ciberseguridad, SEO local y motores de reservas.',
          icon: BookOpen,
          path: '/blog',
          tag: 'Recursos'
        },
        {
          title: 'Planes & Tarifas',
          desc: 'Diagnósticos forenses con tarifas transparentes y sin suscripciones ocultas.',
          icon: Compass,
          path: '/precios',
          tag: 'Precios'
        }
      ]
    },
    en: {
      badge: 'STATUS_CODE // 404_UNMAPPED_ENDPOINT',
      title: 'Perimeter Endpoint Not Found',
      subtitle: 'The digital resource you are attempting to reach does not exist on this infrastructure, has been relocated under updated security protocols, or was typed incorrectly.',
      diagnosticsTitle: 'Perimeter Response Diagnostics',
      statusOk: 'ACTIVE & HEALTHY',
      statusNotFound: '404 NOT FOUND',
      pathLabel: 'Requested Path:',
      gatewayLabel: 'Edge Gateway:',
      firewallLabel: 'Perimeter Armor:',
      recommendationLabel: 'Recommendation:',
      recommendationText: 'Check the URL for typographical discrepancies or navigate to verified zones below.',
      quickAccessTitle: 'Verified Operational Zones',
      btnHome: 'Back to Home',
      btnAudit: 'Free OSINT Audit',
      btnServices: 'Elite Services',
      btnBlog: 'Blog & Technical Guides',
      btnContact: 'Contact Specialist',
      searchPlaceholder: 'Looking for something? E.g., pricing, clinics, seo...',
      searchAction: 'Search',
      cards: [
        {
          title: 'Architecture & Services',
          desc: 'High-performance engineering, sub-second latency, and perimeter cybersecurity.',
          icon: Zap,
          path: '/servicios',
          tag: 'Services'
        },
        {
          title: 'OSINT Perimeter Scanner',
          desc: 'Real-time diagnostic: HTTP headers, DNS records, SSL posture, and OWASP standards.',
          icon: ShieldCheck,
          path: '/auditoria-seguridad',
          tag: 'Security Tool'
        },
        {
          title: 'Blog & Engineering Guides',
          desc: 'Technical articles on healthcare compliance, restaurant local SEO, and AI booking engines.',
          icon: BookOpen,
          path: '/blog',
          tag: 'Resources'
        },
        {
          title: 'Plans & Pricing',
          desc: 'Transparent one-time investment forensic reports without recurring vendor lock-in.',
          icon: Compass,
          path: '/precios',
          tag: 'Pricing'
        }
      ]
    },
    fr: {
      badge: 'CODE_STATUT // 404_POINT_NON_LOCALISÉ',
      title: 'Périmètre Non Trouvé',
      subtitle: 'La ressource numérique que vous essayez de consulter n’existe pas sur cette infrastructure ou a été réorganisée.',
      diagnosticsTitle: 'Télémétrie de Réponse Périmétrique',
      statusOk: 'ACTIF & STABLE',
      statusNotFound: '404 NON TROUVÉ',
      pathLabel: 'Chemin demandé :',
      gatewayLabel: 'Passerelle Edge :',
      firewallLabel: 'Blindage pare-feu :',
      recommendationLabel: 'Recommandation :',
      recommendationText: 'Vérifiez l’URL ou accédez aux sections vérifiées ci-dessous.',
      quickAccessTitle: 'Zones Vérifiées Disponibles',
      btnHome: 'Retour à l’Accueil',
      btnAudit: 'Audit OSINT Gratuit',
      btnServices: 'Nos Services',
      btnBlog: 'Blog & Guides Techniques',
      btnContact: 'Contacter un Spécialiste',
      searchPlaceholder: 'Rechercher un service, audit, prix...',
      searchAction: 'Chercher',
      cards: [
        {
          title: 'Architecture & Services',
          desc: 'Solutions web ultra-rapides, sécurité périmétrique et conformité RGPD.',
          icon: Zap,
          path: '/servicios',
          tag: 'Services'
        },
        {
          title: 'Scanner OSINT Périmétrique',
          desc: 'Analyse en temps réel de votre sécurité : en-têtes HTTP, DNS, SSL et normes OWASP.',
          icon: ShieldCheck,
          path: '/auditoria-seguridad',
          tag: 'Outil de Sécurité'
        },
        {
          title: 'Blog & Veille Technique',
          desc: 'Articles techniques sur la cybersécurité, le SEO local et l’automatisation.',
          icon: BookOpen,
          path: '/blog',
          tag: 'Ressources'
        },
        {
          title: 'Tarifs & Plans',
          desc: 'Rapports d’audit technique sans abonnement dissimulé.',
          icon: Compass,
          path: '/precios',
          tag: 'Tarifs'
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.es;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;

    if (q.includes('precio') || q.includes('plan') || q.includes('tarif') || q.includes('cost')) {
      navigateTo('/precios');
    } else if (q.includes('servic') || q.includes('web') || q.includes('desarrollo') || q.includes('restauran') || q.includes('clinic')) {
      navigateTo('/servicios');
    } else if (q.includes('osint') || q.includes('auditor') || q.includes('segurid') || q.includes('hack') || q.includes('scan')) {
      navigateTo('/auditoria-seguridad');
    } else if (q.includes('blog') || q.includes('articul') || q.includes('guia') || q.includes('post')) {
      navigateTo('/blog');
    } else if (q.includes('contact') || q.includes('email') || q.includes('telefon') || q.includes('mensaje')) {
      navigateTo('/contacto');
    } else {
      navigateTo(`/blog`);
    }
  };

  return (
    <div id="page-404" className="min-h-screen bg-[#070A12] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#070A12]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              id="btn-404-header-home"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.btnHome}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-wider font-mono">
                DEX<span className="text-[#F5A623]">VOI</span>
              </span>
              <span className="text-slate-600 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-rose-400 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                404
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              id="btn-404-header-audit"
              onClick={onOpenAuditModal}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              {t.btnAudit}
            </button>
          </div>
        </div>
      </header>

      {/* Central Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full my-auto">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>{t.badge}</span>
          </div>

          {/* Glitch-style 404 Headline */}
          <div className="relative inline-block">
            <h1 className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_35px_rgba(244,63,94,0.3)]">
              4<span className="text-rose-500">0</span>4
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">
              {t.title}
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Quick Search bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-404-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-all"
              />
            </div>
            <button
              id="btn-404-search-submit"
              type="submit"
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-mono text-white font-medium transition-all cursor-pointer"
            >
              {t.searchAction}
            </button>
          </form>
        </div>

        {/* Technical Diagnostics Box */}
        <div className="mt-8 bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 sm:p-5 font-mono text-xs shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              {t.diagnosticsTitle}
            </span>
            <span className="text-[10px] text-slate-500">EDGE_ROUTER_V2.6</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-300">
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">{t.pathLabel}</span>
              <span className="text-rose-400 font-semibold truncate max-w-[200px]" title={currentPath}>
                {currentPath || '/unknown'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">{t.gatewayLabel}</span>
              <span className="text-emerald-400 font-medium">Cloudflare Anycast [200ms]</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">{t.firewallLabel}</span>
              <span className="text-emerald-400 font-medium">{t.statusOk}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">HTTP Status:</span>
              <span className="text-rose-400 font-bold">{t.statusNotFound}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-start gap-2 text-slate-400 text-[11px]">
            <span className="text-amber-400 font-bold">INFO:</span>
            <span>{t.recommendationText}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            id="btn-404-primary-home"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-950 font-semibold text-xs hover:bg-slate-200 transition-all shadow-lg cursor-pointer"
          >
            <Home className="w-4 h-4 text-blue-600" />
            <span>{t.btnHome}</span>
          </button>
          <button
            id="btn-404-primary-audit"
            onClick={() => navigateTo('/auditoria-seguridad')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-400 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.btnAudit}</span>
          </button>
          <button
            id="btn-404-primary-contact"
            onClick={() => navigateTo('/contacto')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>{t.btnContact}</span>
          </button>
        </div>

        {/* Quick Access Cards */}
        <div className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 text-center">
            {t.quickAccessTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {t.cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={idx}
                  id={`btn-404-card-${idx}`}
                  onClick={() => navigateTo(card.path)}
                  className="text-left p-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:border-cyan-500/50 transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center gap-1 text-[11px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Acceder</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-[#05070D] px-4 py-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} DEXVOI.COM — Protocolos de Ingeniería & Blindaje Digital
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <button onClick={() => navigateTo('/privacidad')} className="hover:text-white transition-colors cursor-pointer">
              Privacidad
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('/condiciones')} className="hover:text-white transition-colors cursor-pointer">
              Condiciones
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('/aviso-legal')} className="hover:text-white transition-colors cursor-pointer">
              Aviso Legal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
