export type BlogCategory = 
  | 'todos'
  | 'ciberseguridad'
  | 'seo-local'
  | 'arquitectura-web'
  | 'ia-reservas';

export interface BlogAuthor {
  name: string;
  role: string;
  badge: string;
  avatarUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'ciberseguridad' | 'seo-local' | 'arquitectura-web' | 'ia-reservas';
  categoryLabel: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string; // ISO 8601 string
  scheduledSlot?: 'morning' | 'evening'; // 09:00 or 18:00 CET
  readingTimeMinutes: number;
  featuredImage: string;
  isFeatured?: boolean;
  metaDescription: string;
  keywords: string[];
  targetServiceUrl: string;
  targetServiceLabel: string;
}
