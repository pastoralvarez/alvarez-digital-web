// src/lib/queries.ts
import { createClient } from "@/lib/supabase/server";
import type { Article, ArticleWithRelations, Category, SearchResult } from "@/types";

export async function getPublishedArticles(limit = 10, offset = 0) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      id, title, slug, excerpt, featured_image, status,
      published_at, reading_time, views,
      category:categories(id, name, slug, color)
    `)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as unknown as ArticleWithRelations[];
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      category:categories(*),
      article_tags(tag:tags(*))
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  
  // Flatten tags
  const article = {
    ...data,
    tags: data.article_tags?.map((at: { tag: unknown }) => at.tag) ?? [],
  };
  delete article.article_tags;
  
  return article as unknown as ArticleWithRelations;
}

export async function getArticlesByCategory(categorySlug: string, limit = 12, offset = 0) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      id, title, slug, excerpt, featured_image, published_at, reading_time,
      category:categories!inner(id, name, slug, color)
    `)
    .eq("categories.slug", categorySlug)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as unknown as ArticleWithRelations[];
}

export async function getRelatedArticles(articleId: string, categoryId: string, limit = 4) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      id, title, slug, excerpt, featured_image, published_at, reading_time,
      category:categories(id, name, slug, color)
    `)
    .eq("category_id", categoryId)
    .eq("status", "published")
    .neq("id", articleId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as unknown as ArticleWithRelations[];
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Category;
}

export async function getFeaturedArticles(limit = 5) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      id, title, slug, excerpt, featured_image, published_at, reading_time,
      category:categories(id, name, slug, color)
    `)
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as unknown as ArticleWithRelations[];
}

export async function getTrendingArticles(limit = 5) {
  return getFeaturedArticles(limit);
}

export async function searchArticles(query: string, limit = 10): Promise<SearchResult[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(`
      id, title, slug, excerpt, featured_image, published_at, reading_time,
      category:categories(id, name, slug, color)
    `)
    .eq("status", "published")
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as unknown as SearchResult[];
}

export async function getAllPublishedSlugs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published");

  if (error) throw error;
  return data ?? [];
}

export async function incrementViews(slug: string) {
  const supabase = await createClient();
  await supabase.rpc("increment_article_views", { article_slug: slug });
}

export async function getSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*").single();
  return data;
}
