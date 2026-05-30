// src/app/(site)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Share2 } from "lucide-react";
import { getArticleBySlug, getRelatedArticles, getAllPublishedSlugs, incrementViews } from "@/lib/queries";
import { formatDate, getCategoryClass, absoluteUrl, cn } from "@/lib/utils";
import { ArticleCard } from "@/components/article/ArticleCard";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Metadata } from "next";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const { createStaticClient } = await import("@/lib/supabase/server");
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");
  return (data ?? []).map((a: { slug: string }) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "No encontrado" };

  const title = article.meta_title ?? article.title;
  const description = article.meta_description ?? article.excerpt ?? "";
  const image = article.og_image ?? article.featured_image;

  return {
    title,
    description,
    keywords: article.keywords ?? [],
    alternates: { canonical: article.canonical_url ?? absoluteUrl(`/blog/${slug}`) },
    openGraph: {
      title: article.og_title ?? title,
      description: article.og_description ?? description,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.twitter_title ?? title,
      description: article.twitter_description ?? description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.id, article.category_id!, 3);

  // Fire-and-forget view increment
  incrementViews(slug).catch(() => {});

  const catClass = getCategoryClass(article.category?.slug ?? "");
  const articleUrl = absoluteUrl(`/blog/${slug}`);

  // JSON-LD schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: "Álvarez Digital" },
    publisher: { "@type": "Organization", name: "Álvarez Digital", url: absoluteUrl("/") },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: article.category?.name ?? "Blog", item: absoluteUrl(`/categoria/${article.category?.slug ?? "blog"}`) },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  const faqSchema = article.schema_faq?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.schema_faq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          {article.category && (
            <>
              <Link href={`/categoria/${article.category.slug}`} className="hover:text-foreground transition-colors">
                {article.category.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-foreground/60 truncate max-w-[200px]">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Meta */}
            <div className="mb-6">
              {article.category && (
                <span className={cn("text-xs px-3 py-1 rounded-full font-medium", catClass)}>
                  {article.category.name}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mt-4 mb-4 tracking-tight">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed mb-5">{article.excerpt}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4">
                {article.published_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.published_at)}
                  </span>
                )}
                {article.reading_time && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {article.reading_time} min de lectura
                  </span>
                )}
                {/* Share */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xs">Compartir:</span>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                    X/Twitter
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + articleUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Featured image */}
            {article.featured_image && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* Ad between image and content */}
            <div className="mb-8">
              <AdSlot slot="3333333333" format="rectangle" className="min-h-[120px]" />
            </div>

            {/* Article body */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content_html ?? "<p>Contenido próximamente.</p>" }}
            />

            {/* FAQ Section */}
            {article.schema_faq && article.schema_faq.length > 0 && (
              <section className="mt-12 p-6 rounded-2xl border border-border bg-card">
                <h2 className="font-display text-2xl text-foreground mb-6">Preguntas frecuentes</h2>
                <div className="space-y-5">
                  {article.schema_faq.map((faq, i) => (
                    <div key={i} className="border-b border-border pb-5 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {article.tags.map((tag) => (
                  <span key={tag.id} className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom ad */}
            <div className="mt-10">
              <AdSlot slot="4444444444" format="rectangle" className="min-h-[250px]" />
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl text-foreground mb-6">Artículos relacionados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="compact" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sticky ad */}
            <div className="sticky top-24">
              <AdSlot slot="5555555555" format="rectangle" className="min-h-[250px] mb-6" />

              {/* Newsletter CTA */}
              <div className="p-5 rounded-2xl border border-border bg-card">
                <h3 className="font-display text-lg text-foreground mb-2">Newsletter semanal</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Herramientas y estrategias para emprendedores, cada semana en tu correo.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="w-full text-sm py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Suscribirme gratis
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
