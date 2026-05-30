// src/app/(site)/terms/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Términos de Uso — Álvarez Digital" };
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-display text-4xl text-foreground mb-3">Términos de Uso</h1>
      <p className="text-muted-foreground text-sm mb-10">Última actualización: enero 2025</p>
      <div className="article-content space-y-6">
        <p>Al acceder y usar <strong>Álvarez Digital</strong>, aceptas estos términos de uso. Si no estás de acuerdo, por favor no uses el sitio.</p>
        <h2>1. Uso del contenido</h2>
        <p>El contenido de este sitio es propiedad de Álvarez Digital y está protegido por derechos de autor. Puedes compartir artículos con atribución, pero no reproducir el contenido completo sin permiso.</p>
        <h2>2. Contenido informativo</h2>
        <p>La información publicada tiene fines educativos e informativos. No constituye asesoramiento legal, financiero o empresarial profesional. Siempre consulta con un experto calificado para decisiones importantes.</p>
        <h2>3. Limitación de responsabilidad</h2>
        <p>Álvarez Digital no se responsabiliza por pérdidas o daños derivados del uso de la información publicada en este sitio.</p>
        <h2>4. Cambios en los términos</h2>
        <p>Podemos actualizar estos términos en cualquier momento. Te notificaremos sobre cambios importantes.</p>
        <h2>5. Contacto</h2>
        <p>Preguntas: <strong>hola@alvarezdigital.com</strong></p>
      </div>
    </div>
  );
}
