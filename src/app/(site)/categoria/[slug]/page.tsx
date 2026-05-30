// src/app/(site)/categoria/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/ArticleCard";
import { getCategoryBySlug, getArticlesByCategory, getCategories } from "@/lib/queries";
import { getCategoryClass, cn } from "@/lib/utils";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { createStaticClient } = await import("@/lib/supabase/server");
  const supabase = createStaticClient();
  const { data } = await supabase.from("categories").select("slug");
  return (data ?? []).map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: category.meta_title ?? `${category.name} — Álvarez Digital`,
    description: category.meta_description ?? category.description ?? `Artículos sobre ${category.name} para emprendedores.`,
  };
}

const categoryIcons: Record<string, string> = {
  ia: "🤖", negocios: "💼", marketing: "📣",
  automatizacion: "⚡", ecommerce: "🛒", "whatsapp-business": "💬",
  "costos-y-ganancias": "💰", sublimacion: "👕", productividad: "🚀",
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, articles] = await Promise.all([
    getCategoryBySlug(slug),
    getArticlesByCategory(slug, 24),
  ]);

  if (!category) notFound();

  const catClass = getCategoryClass(slug);
  const icon = categoryIcons[slug] ?? "📌";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border", catClass)}>
          {icon}
        </div>
        <div>
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", catClass)}>Categoría</span>
          <h1 className="font-display text-3xl text-foreground mt-1">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-sm mt-1">{category.description}</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <AdSlot slot="6666666666" format="leaderboard" className="h-[90px]" />
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-muted-foreground">
          Próximamente artículos sobre {category.name}.
        </div>
      )}
    </div>
  );
}