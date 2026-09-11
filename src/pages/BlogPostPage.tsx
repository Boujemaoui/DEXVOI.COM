import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { 
  ArrowLeft, Calendar, Clock, Shield, Share2, 
  Check, ArrowRight, ExternalLink, BookmarkCheck,
  Twitter, Linkedin, MessageCircle, Link2
} from 'lucide-react';
import { BlogPost } from '../types/blog';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { navigateTo } from '../utils/navigation';

interface BlogPostPageProps {
  slug: string;
  onNavigateHome: () => void;
  onOpenAuditModal: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onOpenAuditModal }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = getPostBySlug(slug);
    setPost(found || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Inject JSON-LD Schema.org for SEO
  useEffect(() => {
    if (!post) return;

    // Update document title and meta
    document.title = `${post.title} | Blog Dexvoi`;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', post.metaDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', post.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.metaDescription);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', post.featuredImage);

    // Schema script
    const schemaId = 'blog-post-json-ld';
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription,
      'image': post.featuredImage,
      'datePublished': post.publishedAt,
      'dateModified': post.publishedAt,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://dexvoi.com/blog/${post.slug}`
      },
      'author': {
        '@type': 'Organization',
        'name': post.author.name,
        'url': 'https://dexvoi.com'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Dexvoi',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://dexvoi.com/favicon.svg'
        }
      },
      'keywords': post.keywords.join(', ')
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3]">
        <Navbar onOpenAuditModal={onOpenAuditModal} />
        <div className="max-w-3xl mx-auto px-4 pt-36 pb-20 text-center space-y-6">
          <h1 className="text-2xl font-bold text-white">Artículo no encontrado</h1>
          <p className="text-gray-400 text-sm">
            El artículo que buscas ha sido reprogramado, modificado o su URL es incorrecta.
          </p>
          <button
            onClick={() => navigateTo('/blog')}
            className="metallic-btn px-6 py-2.5 rounded-xl font-mono text-xs uppercase"
          >
            ← Volver al Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://dexvoi.com/blog/${post.slug}`;

  const handleShare = (platform: 'twitter' | 'linkedin' | 'whatsapp') => {
    const text = encodeURIComponent(`${post.title} - Dexvoi Blog`);
    const url = encodeURIComponent(currentUrl);
    let shareUrl = '';

    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;

    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#e5e2e3] font-sans antialiased selection:bg-[#0066FF] selection:text-white">
      <Navbar onOpenAuditModal={onOpenAuditModal} />

      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
              className="hover:text-white transition-colors"
            >
              Inicio
            </a>
            <span>/</span>
            <a 
              href="/blog" 
              onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
              className="hover:text-white transition-colors"
            >
              Blog
            </a>
            <span>/</span>
            <span className="text-[#38BDF8] truncate max-w-[200px] sm:max-w-xs">{post.categoryLabel}</span>
          </nav>

          {/* Back Button */}
          <button
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a todos los artículos</span>
          </button>

          {/* Category & Metadata */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8]">
                {post.categoryLabel}
              </span>

              <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  {post.readingTimeMinutes} min de lectura
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans border-l-2 border-[#0066FF] pl-4 italic">
              {post.excerpt}
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#0066FF]/40 flex items-center justify-center text-[#F5A623]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{post.author.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0066FF]/20 text-[#38BDF8]">
                      {post.author.badge}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">{post.author.role}</div>
                </div>
              </div>

              {/* Social share mini */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => handleShare('whatsapp')}
                  title="Compartir en WhatsApp"
                  className="p-2 rounded-lg bg-[#131B33] hover:bg-emerald-950/60 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  title="Compartir en LinkedIn"
                  className="p-2 rounded-lg bg-[#131B33] hover:bg-blue-950/60 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  title="Compartir en X / Twitter"
                  className="p-2 rounded-lg bg-[#131B33] hover:bg-sky-950/60 text-gray-400 hover:text-sky-400 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  title="Copiar enlace"
                  className="p-2 rounded-lg bg-[#131B33] hover:bg-[#1E293B] text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-gray-800 shadow-2xl relative bg-gray-900">
            <img
              src={post.featuredImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Markdown Body */}
          <article className="prose prose-invert max-w-none text-gray-300 leading-relaxed font-sans space-y-6">
            <div className="markdown-body space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-gray-800 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#38BDF8] [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-gray-300 [&_blockquote]:border-l-4 [&_blockquote]:border-[#F5A623] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#ffd78a] [&_blockquote]:bg-[#1E293B]/40 [&_blockquote]:p-4 [&_blockquote]:rounded-r-xl [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:bg-[#131B33] [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-mono [&_th]:text-white [&_th]:border [&_th]:border-gray-800 [&_td]:p-3 [&_td]:text-sm [&_td]:border [&_td]:border-gray-800 [&_td]:bg-[#0D1426]/60 [&_code]:font-mono [&_code]:text-xs [&_code]:bg-[#1E293B] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-[#38BDF8] [&_pre]:bg-[#0A0F1F] [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-gray-800 [&_pre]:overflow-x-auto">
              <Markdown>{post.content}</Markdown>
            </div>
          </article>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-gray-500 mr-2">Etiquetas:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-[#131B33] border border-gray-800 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Strategic CTA Conversion Block for Dexvoi Service */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131B33] to-[#0D1426] border border-[#0066FF]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,102,255,0.15)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#F5A623] text-xs font-mono font-bold uppercase tracking-wider">
                <BookmarkCheck className="w-4 h-4" />
                <span>Paso a la acción recomendado por Dexvoi</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ¿Quieres implementar esta solución en tu negocio?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg">
                Nuestros ingenieros analizan tu infraestructura, posicionamiento local y protocolos de blindaje de forma personalizada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenAuditModal}
                className="metallic-btn px-5 py-3 rounded-xl font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span>Diagnóstico Gratuito</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Related Articles Grid */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-800">
              <h3 className="text-xl font-bold text-white mb-6 font-mono">
                Artículos Relacionados
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigateTo(`/blog/${rel.slug}`)}
                    className="p-4 rounded-xl bg-[#0D1426] border border-gray-800 hover:border-[#0066FF]/40 transition-all cursor-pointer group space-y-3"
                  >
                    <div className="h-32 rounded-lg overflow-hidden relative bg-gray-900">
                      <img
                        src={rel.featuredImage}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-[#38BDF8] uppercase font-bold">
                      {rel.categoryLabel}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
