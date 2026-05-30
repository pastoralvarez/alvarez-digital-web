// src/app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://alvarezdigital.com"),
  title: {
    default: "Álvarez Digital — Tecnología y herramientas para emprendedores",
    template: "%s | Álvarez Digital",
  },
  description: "Aprende a usar IA, automatización, marketing y herramientas digitales para hacer crecer tu negocio. Guías prácticas para emprendedores modernos.",
  keywords: ["emprendedores", "IA negocios", "automatización", "marketing digital", "ecommerce", "WhatsApp Business"],
  authors: [{ name: "Álvarez Digital" }],
  creator: "Álvarez Digital",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Álvarez Digital",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alvarezdigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
