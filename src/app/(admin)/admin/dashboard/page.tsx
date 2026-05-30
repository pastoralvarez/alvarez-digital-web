// src/app/(admin)/admin/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { FileText, Eye, FolderOpen, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — Admin" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: totalArticles }, { count: publishedArticles }, { count: drafts }, { count: totalCategories }] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("categories").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentArticles } = await supabase
    .from("articles")
    .select("id, title, slug, status, published_at, views")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total artículos", value: totalArticles ?? 0, icon: FileText, color: "text-primary" },
    { label: "Publicados", value: publishedArticles ?? 0, icon: TrendingUp, color: "text-green-400" },
    { label: "Borradores", value: drafts ?? 0, icon: Eye, color: "text-yellow-400" },
    { label: "Categorías", value: totalCategories ?? 0, icon: FolderOpen, color: "text-blue-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Bienvenido de vuelta al panel de gestión.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="font-display text-3xl text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent articles */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-sm text-foreground">Artículos recientes</h2>
          <Link href="/admin/articulos" className="text-xs text-primary hover:text-primary/80">Ver todos →</Link>
        </div>
        {recentArticles && recentArticles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Título</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Estado</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-medium">Vistas</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/articulos/${a.id}`} className="text-sm text-foreground hover:text-primary transition-colors line-clamp-1">
                      {a.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.status === "published" ? "bg-green-500/10 text-green-400" :
                      a.status === "draft" ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-blue-500/10 text-blue-400"
                    }`}>
                      {a.status === "published" ? "Publicado" : a.status === "draft" ? "Borrador" : "Programado"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm text-muted-foreground">{a.views ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No hay artículos todavía.{" "}
            <Link href="/admin/articulos/nuevo" className="text-primary">Crear el primero</Link>
          </div>
        )}
      </div>
    </div>
  );
}
