// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  icon: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  article_count?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: object | null; // Tiptap JSON
  content_html: string | null;
  featured_image: string | null;
  status: "draft" | "published" | "scheduled";
  published_at: string | null;
  scheduled_at: string | null;
  author_id: string | null;
  category_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  schema_faq: FAQItem[] | null;
  reading_time: number | null;
  views: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleWithRelations extends Article {
  category: Category;
  tags: Tag[];
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: Category;
  published_at: string | null;
  reading_time: number | null;
}

export interface Settings {
  id: string;
  site_name: string;
  site_description: string;
  site_url: string;
  adsense_client: string | null;
  adsense_enabled: boolean;
  analytics_id: string | null;
  social_twitter: string | null;
  social_instagram: string | null;
  social_tiktok: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  footer_text: string | null;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
