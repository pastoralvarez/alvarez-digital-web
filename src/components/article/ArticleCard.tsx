// src/components/article/ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { formatDateShort, getCategoryClass, cn } from "@/lib/utils";
import type { ArticleWithRelations } from "@/types";

interface ArticleCardProps {
  article: ArticleWithRelations;
  variant?: "default" | "featured" | "compact" | "horizontal";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const catClass = getCategoryClass(article.category?.slug ?? "");

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${article.slug}`} className="group flex gap-4 items-start p-4 rounded-xl hover:bg-accent/50 transition-colors">
        {article.featured_image && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {article.category && (
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", catClass)}>
              {article.category.name}
            </span>
          )}
          <h3 className="mt-1.5 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
            {article.reading_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.reading_time} min</span>}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/blog/${article.slug}`} className="group relative block rounded-2xl overflow-hidden aspect-[16/9] bg-card">
        {article.featured_image ? (
          <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 mesh-gradient" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {article.category && (
            <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-3", catClass)}>
              {article.category.name}
            </span>
          )}
          <h2 className="font-display text-xl text-white leading-snug group-hover:text-primary transition-colors mb-2">
            {article.title}
          </h2>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            {article.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDateShort(article.published_at)}</span>}
            {article.reading_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.reading_time} min</span>}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/${article.slug}`} className="group block">
        {article.featured_image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-muted">
            <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        {article.category && (
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", catClass)}>
            {article.category.name}
          </span>
        )}
        <h3 className="mt-2 text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
      </Link>
    );
  }

  // default
  return (
    <Link href={`/blog/${article.slug}`} className="group block rounded-2xl border border-border bg-card hover:border-border/80 hover:bg-card/80 transition-all duration-200 overflow-hidden">
      {article.featured_image && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5">
        {article.category && (
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", catClass)}>
            {article.category.name}
          </span>
        )}
        <h3 className="mt-3 font-display text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
          {article.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDateShort(article.published_at)}</span>}
          {article.reading_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.reading_time} min de lectura</span>}
        </div>
      </div>
    </Link>
  );
}
