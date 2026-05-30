// src/app/(site)/cookies/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Política de Cookies — Álvarez Digital" };
export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-display text-4xl text-foreground mb-3">Política de Cookies</h1>
      <p className="text-muted-foreground text-sm mb-10">Última actualización: enero 2025</p>
      <div className="article-content space-y-6">
        <p>Este sitio usa cookies para mejorar tu experiencia de navegación y mostrar contenido relevante.</p>
        <h2>¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos ayudan a recordar tus preferencias y analizar cómo se usa el sitio.</p>
        <h2>Tipos de cookies que usamos</h2>
        <ul>
          <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
          <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo los usuarios interactúan con el sitio (Google Analytics).</li>
          <li><strong>Cookies de publicidad:</strong> Usadas por Google Adsense para mostrar anuncios relevantes.</li>
        </ul>
        <h2>Cómo controlar las cookies</h2>
        <p>Puedes configurar tu navegador para rechazar cookies o eliminlarlas. Ten en cuenta que algunas funciones del sitio pueden no funcionar correctamente sin cookies.</p>
        <h2>Contacto</h2>
        <p>Preguntas sobre cookies: <strong>hola@alvarezdigital.com</strong></p>
      </div>
    </div>
  );
}
