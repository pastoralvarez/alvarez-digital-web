// src/app/(admin)/admin/articulos/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Artículos — Admin" };

export default async function ArticulosPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, status, published_at, views, category:categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-foreground">Artículos</h1>
          <p className="text-sm text-muted-foreground mt-1">{articles?.length ?? 0} artículos en total</p>
        </div>
        <Link
          href="/admin/articulos/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Nuevo artículo
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {articles && articles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Título</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium hidden lg:table-cell">Categoría</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Estado</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium hidden lg:table-cell">Publicado</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-medium hidden md:table-cell">Vistas</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a: any) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-foreground line-clamp-1 max-w-xs">{a.title}</span>
                    <span className="text-xs text-muted-foreground">/blog/{a.slug}</span>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">{a.category?.name ?? "—"}</span>
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
                  <td className="px-5 py-3.5 hidden lg:table-cell text-xs text-muted-foreground">
                    {a.published_at ? formatDateShort(a.published_at) : "—"}
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-right text-sm text-muted-foreground">
                    {a.views ?? 0}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/articulos/${a.id}`}
                        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/blog/${a.slug}`}
                        target="_blank"
                        className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs"
                      >
                        ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-3">No hay artículos todavía.</p>
            <Link href="/admin/articulos/nuevo" className="text-sm text-primary">Crear el primero →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
