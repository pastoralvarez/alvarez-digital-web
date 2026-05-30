// src/app/(site)/contact/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contacto — Álvarez Digital",
  description: "Contáctanos para colaboraciones, preguntas o sugerencias.",
};
export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-display text-4xl text-foreground mb-3">Contacto</h1>
      <p className="text-muted-foreground mb-10">¿Tienes una pregunta, idea de colaboración o simplemente quieres escribirnos? Estamos aquí.</p>
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
          <input type="text" placeholder="Tu nombre" className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input type="email" placeholder="tu@correo.com" className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Asunto</label>
          <select className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Consulta general</option>
            <option>Colaboración</option>
            <option>Sugerencia de artículo</option>
            <option>Reporte de error</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Mensaje</label>
          <textarea rows={5} placeholder="Cuéntanos..." className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>
        <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
          Enviar mensaje
        </button>
        <p className="text-xs text-center text-muted-foreground">
          También puedes escribirnos directamente a <strong>hola@alvarezdigital.com</strong>
        </p>
      </div>
    </div>
  );
}
