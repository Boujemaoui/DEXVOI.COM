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

interface BlogPageProps {
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenAuditModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'published' | 'queue'>('published');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Fetch posts
  const publishedPosts = useMemo(() => getPublishedPosts(), [isGenerating]);
  const scheduledPosts = useMemo(() => getScheduledPosts(), [isGenerating]);

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
      const topics = [
        {
          topic: 'Cabeceras HTTP de Seguridad para Clínicas y Restaurantes: HSTS, CSP y Permissions-Policy',
          category: 'ciberseguridad' as const,
          categoryLabel: 'Ciberseguridad & Compliance',
          tags: ['Cabeceras HTTP', 'HSTS', 'CSP', 'Seguridad Web']
        },
        {
          topic: 'Cómo evitar reseñas falsas y sabotaje de reputación en Google Maps para Alta Gastronomía',
          category: 'seo-local' as const,
          categoryLabel: 'SEO Local & Google Maps',
          tags: ['Reputación Digital', 'Google Maps', 'Reseñas', 'SEO']
        },
        {
          topic: 'Core Web Vitals INP y LCP en 2026: Cómo Dexvoi logra tiempos de carga bajo 300ms',
          category: 'arquitectura-web' as const,
          categoryLabel: 'Arquitectura Web & Rendimiento',
          tags: ['Core Web Vitals', 'INP', 'LCP', 'Jamstack']
        },
        {
          topic: 'Agentes de IA y Chatbots con Cero Latencia: Automatización de Citas sin Intermediarios',
          category: 'ia-reservas' as const,
          categoryLabel: 'IA & Automatización',
          tags: ['IA Conversacional', 'Chatbots', 'Reservas', 'Automatización']
        }
      ];

      // Pick a random topic or ask server
      const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic.topic,
          category: selectedTopic.category
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          saveCustomPost(data.post);
          setGenerationSuccess(`¡Artículo generado y publicado con éxito! "${data.post.title}"`);
          return;
        }
      }

      // Client-side fallback if server offline
      const timestamp = new Date().toISOString();
      const slug = `${selectedTopic.category}-${Date.now()}`;
      const fallbackPost: BlogPost = {
        id: `ai-post-${Date.now()}`,
        slug,
        title: selectedTopic.topic,
        excerpt: `Análisis técnico detallado y recomendaciones prácticas redactadas por la IA de Dexvoi sobre ${selectedTopic.topic.toLowerCase()}.`,
        category: selectedTopic.category,
        categoryLabel: selectedTopic.categoryLabel,
        tags: selectedTopic.tags,
        author: {
          name: 'Dexvoi Intelligence Agent',
          role: 'Motor Autónomo de Análisis & SEO',
          badge: 'AI Autonomous Publisher'
        },
        publishedAt: timestamp,
        readingTimeMinutes: 5,
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        metaDescription: `Descubre todo sobre ${selectedTopic.topic.toLowerCase()} en esta guía técnica de Dexvoi.`,
        keywords: selectedTopic.tags,
        targetServiceUrl: '/auditoria-seguridad',
        targetServiceLabel: 'Solicitar Diagnóstico Técnico Relacionado',
        content: `
## Introducción y Contexto Estratégico

En un mercado digital hipercompetitivo, dominar los aspectos fundamentales de la infraestructura tecnológica ya no es opcional. Las empresas de servicios de alto valor (como clínicas y restaurantes) deben priorizar la excelencia en seguridad, velocidad y posicionamiento orgánico.

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

  const categories: { key: BlogCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'todos', label: 'Todos los Artículos', icon: <Layers className="w-4 h-4" /> },
    { key: 'ciberseguridad', label: 'Ciberseguridad', icon: <Shield className="w-4 h-4 text-emerald-400" /> },
    { key: 'seo-local', label: 'SEO Local', icon: <TrendingUp className="w-4 h-4 text-[#F5A623]" /> },
    { key: 'arquitectura-web', label: 'Arquitectura Web', icon: <Cpu className="w-4 h-4 text-[#0066FF]" /> },
    { key: 'ia-reservas', label: 'IA & Reservas', icon: <Bot className="w-4 h-4 text-purple-400" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans antialiased selection:bg-[#0066FF] selection:text-white">
      <Navbar onOpenAuditModal={onOpenAuditModal} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dexvoi Knowledge Base & Blog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Arquitectura Web, SEO Local y <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#F5A623]">
              Blindaje de Seguridad
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Guías técnicas, análisis forenses y estrategias de alto impacto diseñadas para directores de clínicas médicas, restaurantes de élite y empresas de servicios premium.
          </p>
        </div>

        {/* Automation Status Card */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#131B33]/80 border border-[#0066FF]/30 mb-10 shadow-[0_0_25px_rgba(0,102,255,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]"></span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Sistema de Publicación Automatizada Activo
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Publicaciones programadas: <strong className="text-white">2 artículos diarios</strong> (09:00 y 18:00 CET) optimizados con <span className="text-[#F5A623] font-mono">Schema.org / JSON-LD</span> para posicionamiento orgánico.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
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

        {/* Notifications */}
        {generationSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>{generationSuccess}</span>
          </div>
        )}
        {generationError && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{generationError}</span>
          </div>
        )}

        {/* Tabs: Publicados vs En Cola */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-8">
          <div className="flex items-center gap-4 text-sm font-mono">
            <button
              onClick={() => setActiveTab('published')}
              className={`pb-2 transition-colors relative cursor-pointer ${
                activeTab === 'published' ? 'text-[#0066FF] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Artículos en Vivo ({publishedPosts.length})
              {activeTab === 'published' && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#0066FF]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-2 transition-colors relative cursor-pointer ${
                activeTab === 'queue' ? 'text-[#F5A623] font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cola de Publicación Programada ({scheduledPosts.length})
              {activeTab === 'queue' && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#F5A623]"></div>
              )}
            </button>
          </div>

          <div className="text-xs font-mono text-gray-500 hidden sm:block">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'} encontrados
          </div>
        </div>

        {/* Search & Categories */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave, temática o etiqueta (ej. RGPD, Google Maps, Jamstack)..."
              className="w-full bg-[#131B33]/60 border border-gray-800 focus:border-[#0066FF] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            >
            </input>
          </div>

          {/* Categories Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
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
            <h3 className="text-lg font-bold text-white">No se encontraron artículos</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Intenta con otra búsqueda o selecciona otra categoría temática.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigateTo(`/blog/${post.slug}`)}
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
                        Programado
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {post.readingTimeMinutes} min de lectura
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
                      Leer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Strategic Bottom Conversion Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#131B33] via-[#0D1426] to-[#0A0F1F] border border-[#0066FF]/40 text-center max-w-4xl mx-auto space-y-4 shadow-[0_0_35px_rgba(0,102,255,0.15)]">
          <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center mx-auto text-[#F5A623]">
            <Shield className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            ¿Tu web cumple con los estándares de seguridad y SEO de 2026?
          </h3>

          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Realizamos un diagnóstico perimetral de 5 puntos sin compromiso. Comprueba cabeceras HTTP, vulnerabilidades OSINT y puntuación en Google Maps.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuditModal}
              className="metallic-btn px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Shield className="w-4 h-4 text-[#F5A623]" />
              <span>Solicitar Diagnóstico Gratuito</span>
            </button>
            <a
              href="/auditoria-seguridad"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/auditoria-seguridad');
              }}
              className="px-6 py-3 rounded-xl border border-gray-700 hover:border-white text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>Ver Scanner OSINT Perimetral</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
