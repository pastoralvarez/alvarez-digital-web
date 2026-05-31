import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { getCategories } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar artículo — Admin" };

export default async function EditarArticuloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">
        Editar artículo
      </h1>
      <ArticleEditor categories={categories} initialData={article} />
    </div>
  );
}