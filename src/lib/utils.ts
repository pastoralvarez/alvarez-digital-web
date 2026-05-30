// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
}

export function formatDateShort(dateString: string): string {
  return format(new Date(dateString), "d MMM yyyy", { locale: es });
}

export function formatRelativeDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: es });
}

export function getReadingTime(contentHtml: string): number {
  const wordsPerMinute = 200;
  const text = contentHtml.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateExcerpt(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export function getCategoryClass(slug: string): string {
  const map: Record<string, string> = {
    ia: "cat-ia",
    negocios: "cat-negocios",
    marketing: "cat-marketing",
    automatizacion: "cat-automatizacion",
    ecommerce: "cat-ecommerce",
    "whatsapp-business": "cat-whatsapp",
    "costos-y-ganancias": "cat-costos",
    sublimacion: "cat-sublimacion",
    productividad: "cat-productividad",
  };
  return map[slug] ?? "cat-ia";
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alvarezdigital.com";
  return `${baseUrl}${path}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
