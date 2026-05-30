// src/app/(site)/blog/page.tsx
import { ArticleCard } from "@/components/article/ArticleCard";
import { getPublishedArticles, getCategories } from "@/lib/queries";
import { AdSlot } from "@/components/ads/AdSlot";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Álvarez Digital",
  description: "Todos los artículos sobre IA, negocios, marketing, automatización y herramientas digitales para emprendedores.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const [articles, categories] = await Promise.all([
    getPublishedArticles(24),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl text-foreground mb-3">Blog</h1>
        <p className="text-muted-foreground">Guías, estrategias y herramientas para emprendedores modernos.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link href="/blog" className="px-4 py-1.5 rounded-full text-sm bg-primary text-primary-foreground font-medium">
          Todos
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categoria/${cat.slug}`}
            className="px-4 py-1.5 rounded-full text-sm border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Ad */}
      <div className="mb-10">
        <AdSlot slot="1111111111" format="leaderboard" className="h-[90px]" />
      </div>

      {/* Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <>
              <ArticleCard key={article.id} article={article} />
              {/* Insert ad every 9 articles */}
              {(i + 1) % 9 === 0 && (
                <div key={`ad-${i}`} className="col-span-full">
                  <AdSlot slot="2222222222" format="leaderboard" className="h-[90px]" />
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg mb-2">Aún no hay artículos publicados</p>
          <p className="text-sm">Publica tu primer artículo desde el <Link href="/admin" className="text-primary">panel admin</Link>.</p>
        </div>
      )}
    </div>
  );
}
