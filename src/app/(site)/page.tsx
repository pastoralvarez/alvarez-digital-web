// src/app/(site)/page.tsx
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, Zap } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  getPublishedArticles,
  getFeaturedArticles,
  getCategories,
  getTrendingArticles,
} from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Álvarez Digital — Tecnología y herramientas para emprendedores",
  description: "Aprende a usar IA, automatización y herramientas digitales para hacer crecer tu negocio. Guías prácticas y recursos para emprendedores modernos.",
};

export const revalidate = 3600;

const categoryIcons: Record<string, string> = {
  ia: "🤖", negocios: "💼", marketing: "📣",
  automatizacion: "⚡", ecommerce: "🛒", "whatsapp-business": "💬",
  "costos-y-ganancias": "💰", sublimacion: "👕", productividad: "🚀",
};

export default async function HomePage() {
  const [featured, recent, categories, trending] = await Promise.all([
    getFeaturedArticles(1),
    getPublishedArticles(8),
    getCategories(),
    getTrendingArticles(4),
  ]);

  const heroArticle = featured[0];
  const gridArticles = recent.slice(0, 6);
  const sidebarArticles = recent.slice(0, 5);

  return (
    <div className="mesh-gradient">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hero article */}
          <div className="lg:col-span-7">
            {heroArticle ? (
              <ArticleCard article={heroArticle} variant="featured" />
            ) : (
              <div className="rounded-2xl aspect-[16/9] bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">Próximamente contenido</p>
                </div>
              </div>
            )}
          </div>

          {/* Side: headline + trending */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-medium">Para emprendedores modernos</span>
              </div>
              <h1 className="font-display text-3xl lg:text-4xl text-foreground leading-tight tracking-tight">
                Tecnología que hace crecer tu negocio
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                IA, automatización, marketing y herramientas digitales explicadas de forma práctica y directa.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Ver todos los artículos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trending */}
            {trending.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">Más leídos</h2>
                </div>
                <div className="space-y-1">
                  {trending.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AD — leaderboard */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <AdSlot slot="1234567890" format="leaderboard" className="h-[90px]" />
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-foreground">Explora por tema</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className={cn(
                "group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card",
                "hover:border-primary/30 hover:bg-accent transition-all duration-200"
              )}
            >
              <span className="text-2xl">{categoryIcons[cat.slug] ?? "📌"}</span>
              <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-foreground">Artículos recientes</h2>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridArticles.length > 0 ? (
            gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-3 text-center py-20 text-muted-foreground">
              Los artículos aparecerán aquí una vez publicados desde el admin.
            </div>
          )}
        </div>
      </section>

      {/* AD — rectangle */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <AdSlot slot="0987654321" format="rectangle" className="min-h-[250px]" />
      </div>

      {/* NEWSLETTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden border border-border bg-card p-8 md:p-12 text-center">
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Newsletter semanal</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Herramientas y estrategias<br />directo a tu correo
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Cada semana: una herramienta útil, una estrategia probada y un recurso para hacer crecer tu negocio.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@correo.com"
                className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Suscribirse gratis
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">Sin spam. Puedes cancelar cuando quieras.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
