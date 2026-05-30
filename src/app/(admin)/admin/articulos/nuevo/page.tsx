// src/app/(admin)/admin/articulos/nuevo/page.tsx
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getCategories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nuevo artículo — Admin" };

export default async function NuevoArticuloPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">Nuevo artículo</h1>
      <ArticleEditor categories={categories} />
    </div>
  );
}
