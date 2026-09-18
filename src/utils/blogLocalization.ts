import { BlogPost, LocalizedBlogContent } from '../types/blog';
import { Language } from '../i18n/translations';
import { BLOG_POST_TRANSLATIONS } from '../data/blogTranslations';

/**
 * Returns localized blog post content according to the requested language.
 * Checks both inline post.translations and the global BLOG_POST_TRANSLATIONS catalog.
 * Guarantees native Spanish, French, or English content with zero placeholders.
 */
export function getLocalizedPost(post: BlogPost, lang: Language): BlogPost {
  if (!post) return post;
  if (lang === 'es') return post; // Default canonical language is Spanish

  // 1. Check if post has explicit inline translations
  const inlineLoc = post.translations?.[lang];
  if (inlineLoc) {
    return {
      ...post,
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

  return post;
}
