// src/app/(site)/search/page.tsx
import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Buscar — Álvarez Digital",
  description: "Busca artículos sobre IA, negocios, marketing y herramientas para emprendedores.",
};

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-display text-3xl text-foreground mb-8">Buscar</h1>
      <SearchClient />
    </div>
  );
}
