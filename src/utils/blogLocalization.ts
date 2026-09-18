import { BlogPost, LocalizedBlogContent } from '../types/blog';
import { Language } from '../i18n/translations';
import { BLOG_POST_TRANSLATIONS, BLOG_POST_SLUGS } from '../data/blogTranslations';

/**
 * Returns the localized slug for a blog post or an existing slug string.
 * Supports bidirectional mapping across Spanish, French, and English.
 */
export function getPostSlugForLanguage(postOrSlug: BlogPost | string, lang: Language): string {
  const canonicalSlug = typeof postOrSlug === 'string' ? postOrSlug.trim().toLowerCase() : postOrSlug.slug.trim().toLowerCase();

  // 1. Direct match in BLOG_POST_SLUGS key
  const directMapping = BLOG_POST_SLUGS[canonicalSlug];
  if (directMapping) {
    return directMapping[lang] || directMapping.es;
  }

  // 2. Reverse lookup in BLOG_POST_SLUGS values (in case input is already a translated slug in fr or en)
  for (const mapping of Object.values(BLOG_POST_SLUGS)) {
    if (
      mapping.es.toLowerCase() === canonicalSlug ||
      mapping.fr.toLowerCase() === canonicalSlug ||
      mapping.en.toLowerCase() === canonicalSlug
    ) {
      return mapping[lang] || mapping.es;
    }
  }

  // 3. If a BlogPost object was passed, check inline translations
  if (typeof postOrSlug !== 'string' && postOrSlug.translations) {
    if (lang === 'es' && postOrSlug.translations.es?.slug) {
      return postOrSlug.translations.es.slug;
    }
    const loc = postOrSlug.translations[lang];
    if (loc?.slug) {
      return loc.slug;
    }
  }

  // 4. Check global BLOG_POST_TRANSLATIONS dictionary
  const dict = BLOG_POST_TRANSLATIONS[canonicalSlug];
  if (dict) {
    if (lang === 'fr' && dict.fr?.slug) return dict.fr.slug;
    if (lang === 'en' && dict.en?.slug) return dict.en.slug;
    if (lang === 'es') return canonicalSlug;
  }

  return canonicalSlug;
}

/**
 * Returns localized blog post content according to the requested language.
 * Checks both inline post.translations and the global BLOG_POST_TRANSLATIONS catalog.
 * Guarantees native Spanish, French, or English content with localized slug.
 */
export function getLocalizedPost(post: BlogPost, lang: Language): BlogPost {
  if (!post) return post;

  const localizedSlug = getPostSlugForLanguage(post, lang);

  if (lang === 'es') {
    return {
      ...post,
      slug: localizedSlug
    };
  }

  // 1. Check if post has explicit inline translations
  const inlineLoc = post.translations?.[lang];
  if (inlineLoc) {
    return {
      ...post,
      slug: inlineLoc.slug || localizedSlug,
      title: inlineLoc.title || post.title,
      excerpt: inlineLoc.excerpt || post.excerpt,
      content: inlineLoc.content || post.content,
      metaDescription: inlineLoc.metaDescription || post.metaDescription,
      tags: inlineLoc.tags && inlineLoc.tags.length > 0 ? inlineLoc.tags : post.tags,
      keywords: inlineLoc.keywords && inlineLoc.keywords.length > 0 ? inlineLoc.keywords : post.keywords,
      categoryLabel: inlineLoc.categoryLabel || post.categoryLabel,
      targetServiceLabel: inlineLoc.targetServiceLabel || post.targetServiceLabel,
    };
  }

  // 2. Check global dictionary by slug or id
  const dict = BLOG_POST_TRANSLATIONS[post.slug] || (post.id ? BLOG_POST_TRANSLATIONS[post.id] : undefined);
  if (dict) {
    const loc = dict[lang as 'fr' | 'en'];
    if (loc) {
      return {
        ...post,
        slug: loc.slug || localizedSlug,
        title: loc.title || post.title,
        excerpt: loc.excerpt || post.excerpt,
        content: loc.content || post.content,
        metaDescription: loc.metaDescription || post.metaDescription,
        tags: loc.tags && loc.tags.length > 0 ? loc.tags : post.tags,
        keywords: loc.keywords && loc.keywords.length > 0 ? loc.keywords : post.keywords,
        categoryLabel: loc.categoryLabel || post.categoryLabel,
        targetServiceLabel: loc.targetServiceLabel || post.targetServiceLabel,
      };
    }
  }

  return {
    ...post,
    slug: localizedSlug
  };
}
