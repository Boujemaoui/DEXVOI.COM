import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Shield, ArrowRight, Clock, Calendar, 
  Sparkles, Layers, TrendingUp, Cpu, Bot, CheckCircle2, 
  ExternalLink, RefreshCw, AlertCircle
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getPublishedPosts, getScheduledPosts, saveCustomPost } from '../data/blogPosts';
import { BlogPost, BlogCategory } from '../types/blog';
import { navigateTo } from '../utils/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedPost } from '../utils/blogLocalization';
import { getLocalizedPath } from '../utils/seoMultilingual';

interface BlogPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenAuditModal }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'published' | 'queue'>('published');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Exclusively display internal post generator controls within AI Studio or local dev environment
  const isAiStudio = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname.toLowerCase();
    const search = window.location.search;
    return (
      host.includes('run.app') ||
      host.includes('localhost') ||
      host.includes('127.0.0.1') ||
      new URLSearchParams(search).get('studio') === '1'
    );
  }, []);

  // Fetch raw posts and localize them based on current language
  const publishedPosts = useMemo(() => {
    return getPublishedPosts().map(post => getLocalizedPost(post, language));
  }, [isGenerating, language]);

  const scheduledPosts = useMemo(() => {
    return getScheduledPosts().map(post => getLocalizedPost(post, language));
  }, [isGenerating, language]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    const list = activeTab === 'published' ? publishedPosts : scheduledPosts;
    return list.filter(post => {
      const matchCategory = selectedCategory === 'todos' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(t => t.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [publishedPosts, scheduledPosts, activeTab, selectedCategory, searchQuery]);

  // Handler to generate a new post via backend API or fallback
  const handleGenerateAiPost = async () => {
    setIsGenerating(true);
    setGenerationSuccess(null);
    setGenerationError(null);

    try {
      const response = await fetch('/api/admin/generate-blog-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoPublish: true })
      });

      if (response.ok) {
        const data = await response.json();
        setGenerationSuccess(`¡Artículo generado y publicado con éxito! "${data.post?.title || 'Nuevo Post'}"`);
        return;
      }

      // Fallback local generator simulation if server endpoint is offline
      const timestamp = Date.now();
      const fallbackPost: BlogPost = {
        id: `post-local-${timestamp}`,
        slug: `estrategias-ciberseguridad-dexvoi-${timestamp}`,
        title: `Blindaje Digital 2026: Diagnóstico de Seguridad e Infraestructura para Empresas`,
        excerpt: `Análisis exhaustivo de vulnerabilidades perimetrales, cabeceras HTTP y protección contra ataques en entornos de alto tráfico.`,
        category: 'ciberseguridad',
        categoryLabel: 'Ciberseguridad',
        tags: ['Blindaje Digital', 'Cabeceras HTTP', 'Seguridad Web', 'Dexvoi'],
        author: {
          name: 'Dexvoi Intelligence Team',
          role: 'Especialistas en Blindaje & Rendimiento Digital',
          badge: 'Verified Lead'
        },
        publishedAt: new Date().toISOString(),
        readingTimeMinutes: 5,
        featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        metaDescription: `Análisis exhaustivo de vulnerabilidades perimetrales, cabeceras HTTP y protección contra ataques en entornos de alto tráfico.`,
        keywords: ['Ciberseguridad', 'Auditoría OSINT', 'Blindaje Web'],
        targetServiceUrl: '/auditoria-seguridad',
        targetServiceLabel: 'Solicitar Diagnóstico Especializado',
        content: `
## Seguridad Proactiva y Blindaje Perimetral en 2026

En el entorno digital actual, las empresas no pueden permitirse brechas de seguridad ni caídas de servicio. La protección de los datos de clientes e historiales requiere una arquitectura web sólida y encriptación de nivel bancario.

---

### Diagnóstico de la Problemática

Muchos negocios cometen el error de confiar en soluciones genéricas o plantillas desactualizadas. Esto genera:

1. **Fugas de rendimiento:** Páginas pesadas que pierden comensales o pacientes antes de que se complete la carga.
2. **Brechas de seguridad perimetral:** Exposición innecesaria de cabeceras de servidor y configuraciones débiles.
3. **Pérdida de tracción en Google Search:** Falta de datos estructurados que impiden destacar en el Local Pack.

---

### Recomendaciones Técnicas de Dexvoi

- Implementar políticas estrictas de cabeceras HTTP.
- Automatizar la gestión de citas y reservas con agentes de IA propietarios.
- Mantener auditorías periódicas de vulnerabilidades externas.
        `
      };

      saveCustomPost(fallbackPost);
      setGenerationSuccess(`¡Artículo generado y publicado con éxito! "${fallbackPost.title}"`);
    } catch (err) {
      console.error(err);
      setGenerationError('No se pudo conectar con el motor de generación. Inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  // UI Strings according to language
  const ui = useMemo(() => {
    if (language === 'fr') {
      return {
        badge: 'Intelligence Technologique & Cybersécurité',
        titlePart1: 'Architecture Web, SEO Local et',
        titleHighlight: 'Protection de Sécurité',
        subtitle: 'Guides techniques, analyses forensiques et stratégies de haute précision conçues pour directeurs de cliniques privées, restaurants gastronomiques et entreprises d\'élite.',
        tabPublished: 'Publiés',
        tabQueue: 'File d\'attente éditoriale',
        searchPlaceholder: 'Rechercher par mot-clé, sujet ou technologie...',
        allArticles: 'Tous les Articles',
        catCyber: 'Cybersécurité',
        catSeo: 'SEO Local',
        catWeb: 'Architecture Web',
        catAi: 'IA & Réservations',
        noArticlesTitle: 'Aucun article trouvé',
        noArticlesDesc: 'Essayez un autre mot-clé ou sélectionnez une autre catégorie.',
        readMore: 'Lire',
        minRead: 'min de lecture',
        scheduledBadge: 'Programmé',
        dateLocale: 'fr-FR',
        ctaBottomTitle: 'Votre infrastructure respecte-t-elle les standards de sécurité et de SEO 2026 ?',
        ctaBottomDesc: 'Nous réalisons un diagnostic périmétrique en 5 points sans engagement. Vérifiez en-têtes HTTP, vulnérabilités OSINT et positionnement Google Maps.',
        ctaBottomBtn: 'Demander un Diagnostic Gratuit',
        ctaBottomScanner: 'Voir Scanner OSINT Périmétrique'
      };
    }
    if (language === 'en') {
      return {
        badge: 'Technological Intelligence & Cybersecurity',
        titlePart1: 'Web Architecture, Local SEO and',
        titleHighlight: 'Security Hardening',
        subtitle: 'Technical white papers, forensic audits, and high-impact digital roadmaps designed for clinic directors, Michelin-caliber restaurants, and elite enterprises.',
        tabPublished: 'Published',
        tabQueue: 'Editorial Queue',
        searchPlaceholder: 'Search by keyword, topic, or technology...',
        allArticles: 'All Articles',
        catCyber: 'Cybersecurity',
        catSeo: 'Local SEO',
        catWeb: 'Web Architecture',
        catAi: 'AI & Bookings',
        noArticlesTitle: 'No articles found',
        noArticlesDesc: 'Try another search query or select a different category.',
        readMore: 'Read',
        minRead: 'min read',
        scheduledBadge: 'Scheduled',
        dateLocale: 'en-US',
        ctaBottomTitle: 'Does your web platform meet 2026 security & SEO benchmarks?',
        ctaBottomDesc: 'We perform a non-intrusive 5-point perimeter diagnosis. Verify HTTP headers, OSINT vulnerabilities, and Google Maps visibility.',
        ctaBottomBtn: 'Request Free Technical Diagnosis',
        ctaBottomScanner: 'View Perimeter OSINT Scanner'
      };
    }
    return {
      badge: 'Inteligencia Tecnológica & Ciberseguridad',
      titlePart1: 'Arquitectura Web, SEO Local y',
      titleHighlight: 'Blindaje de Seguridad',
      subtitle: 'Guías técnicas, análisis forenses y estrategias de alto impacto diseñadas para directores de clínicas médicas, restaurantes de élite y empresas de servicios premium.',
      tabPublished: 'Publicados',
      tabQueue: 'Cola Editorial',
      searchPlaceholder: 'Buscar por palabra clave, temática o tecnología...',
      allArticles: 'Todos los Artículos',
      catCyber: 'Ciberseguridad',
      catSeo: 'SEO Local',
      catWeb: 'Arquitectura Web',
      catAi: 'IA & Reservas',
      noArticlesTitle: 'No se encontraron artículos',
      noArticlesDesc: 'Intenta con otra búsqueda o selecciona otra categoría temática.',
      readMore: 'Leer',
      minRead: 'min de lectura',
      scheduledBadge: 'Programado',
      dateLocale: 'es-ES',
      ctaBottomTitle: '¿Tu web cumple con los estándares de seguridad y SEO de 2026?',
      ctaBottomDesc: 'Realizamos un diagnóstico perimetral de 5 puntos sin compromiso. Comprueba cabeceras HTTP, vulnerabilidades OSINT y puntuación en Google Maps.',
      ctaBottomBtn: 'Solicitar Diagnóstico Gratuito',
      ctaBottomScanner: 'Ver Scanner OSINT Perimetral'
    };
  }, [language]);

  const categories: { key: BlogCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'todos', label: ui.allArticles, icon: <Layers className="w-4 h-4" /> },
    { key: 'ciberseguridad', label: ui.catCyber, icon: <Shield className="w-4 h-4 text-emerald-400" /> },
    { key: 'seo-local', label: ui.catSeo, icon: <TrendingUp className="w-4 h-4 text-[#F5A623]" /> },
    { key: 'arquitectura-web', label: ui.catWeb, icon: <Cpu className="w-4 h-4 text-[#0066FF]" /> },
    { key: 'ia-reservas', label: ui.catAi, icon: <Bot className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans antialiased selection:bg-[#0066FF] selection:text-white">
      <Navbar onOpenAuditModal={onOpenAuditModal} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#F5A623]" />
            <span>{ui.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {ui.titlePart1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#F5A623]">
              {ui.titleHighlight}
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        {/* Internal AI Studio Admin Generator Panel (Hidden on Public Web) */}
        {isAiStudio && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#131B33]/90 border border-[#0066FF]/40 mb-10 shadow-[0_0_25px_rgba(0,102,255,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22D3EE]"></span>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Panel Exclusivo AI Studio // Motor de Redacción
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Entorno privado de administración. Genera artículos técnicos bajo demanda con la IA de Dexvoi sin exponer controles en la web pública.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                id="btn-ai-studio-generate-post"
                onClick={handleGenerateAiPost}
                disabled={isGenerating}
                className="w-full md:w-auto metallic-btn px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#F5A623]" />
                    <span>Redactando con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>Generar Nuevo Post con IA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Notifications (AI Studio only) */}
        {isAiStudio && generationSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{generationSuccess}</span>
          </div>
        )}
        {isAiStudio && generationError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{generationError}</span>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* View Mode: Published vs Editorial Queue */}
            <div className="flex items-center p-1 rounded-xl bg-[#0D1426] border border-gray-800 self-start">
              <button
                onClick={() => setActiveTab('published')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'published'
                    ? 'bg-[#0066FF] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {ui.tabPublished} ({publishedPosts.length})
              </button>
              <button
                onClick={() => setActiveTab('queue')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'queue'
                    ? 'bg-[#0066FF] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Clock className="w-3 h-3 text-[#F5A623]" />
                <span>{ui.tabQueue}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30">
                  {scheduledPosts.length}
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full bg-[#0D1426] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0066FF] transition-colors"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20 border border-[#0066FF]'
                    : 'bg-[#131B33]/60 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#131B33]/30 border border-gray-800 space-y-3">
            <BookOpen className="w-10 h-10 text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">{ui.noArticlesTitle}</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              {ui.noArticlesDesc}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const postPath = getLocalizedPath('blog-post', language, post.slug);
              return (
                <article
                  key={post.id}
                  onClick={() => navigateTo(postPath)}
                  className="group flex flex-col rounded-2xl bg-[#0D1426] border border-gray-800 hover:border-[#0066FF]/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(0,102,255,0.15)] hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="h-48 w-full relative overflow-hidden bg-gray-900">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1426] via-transparent to-black/30"></div>

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-[#0A0F1F]/80 backdrop-blur-md border border-white/10 text-[#38BDF8]">
                        {post.categoryLabel}
                      </span>
                    </div>

                    {activeTab === 'queue' && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] backdrop-blur-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ui.scheduledBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          {new Date(post.publishedAt).toLocaleDateString(ui.dateLocale, {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-500" />
                          {post.readingTimeMinutes} {ui.minRead}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Tags & Action Link */}
                    <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span className="text-xs font-mono font-bold text-[#0066FF] group-hover:text-white flex items-center gap-1 transition-colors">
                        {ui.readMore} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Strategic Bottom Conversion Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#131B33] via-[#0D1426] to-[#0A0F1F] border border-[#0066FF]/40 text-center max-w-4xl mx-auto space-y-4 shadow-[0_0_35px_rgba(0,102,255,0.15)]">
          <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mx-auto text-[#F5A623]">
            <Shield className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            {ui.ctaBottomTitle}
          </h3>

          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            {ui.ctaBottomDesc}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuditModal}
              className="metallic-btn px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Shield className="w-4 h-4 text-[#F5A623]" />
              <span>{ui.ctaBottomBtn}</span>
            </button>
            <a
              href={getLocalizedPath('security', language)}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(getLocalizedPath('security', language));
              }}
              className="px-6 py-3 rounded-xl border border-gray-700 hover:border-white text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>{ui.ctaBottomScanner}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
