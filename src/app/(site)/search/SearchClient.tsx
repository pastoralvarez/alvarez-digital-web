// src/app/(site)/search/SearchClient.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Clock, Loader2 } from "lucide-react";
import { getCategoryClass, formatDateShort, cn } from "@/lib/utils";
import type { SearchResult } from "@/types";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
      setSearched(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artículos, categorías, temas..."
          autoFocus
          className="w-full pl-12 pr-4 py-4 text-base bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
        )}
      </div>

      {searched && results.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No se encontraron resultados para &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            {results.length} resultado{results.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
          </p>
          {results.map((article) => {
            const catClass = getCategoryClass(article.category?.slug ?? "");
            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="block p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-accent transition-all"
              >
                <div className="flex items-start gap-4">
                  {article.featured_image && (
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    {article.category && (
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", catClass)}>
                        {article.category.name}
                      </span>
                    )}
                    <h3 className="mt-1 font-semibold text-foreground text-sm leading-snug">{article.title}</h3>
                    {article.excerpt && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      {article.published_at && <span>{formatDateShort(article.published_at)}</span>}
                      {article.reading_time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{article.reading_time} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
