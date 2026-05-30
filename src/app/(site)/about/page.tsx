// src/app/(site)/about/page.tsx
import type { Metadata } from "next";
import { Zap, TrendingUp, Users, BookOpen } from "lucide-react";
export const metadata: Metadata = {
  title: "Nosotros — Álvarez Digital",
  description: "Conoce qué es Álvarez Digital y por qué creamos este recurso para emprendedores modernos.",
};
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">Sobre nosotros</span>
        <h1 className="font-display text-4xl text-foreground mt-2 mb-4">Tecnología para emprendedores reales</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Álvarez Digital nació de una frustración simple: había demasiado contenido superficial sobre negocios y tecnología, y muy poco que fuera realmente útil para alguien construyendo algo desde cero.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        {[
          { icon: BookOpen, label: "Artículos publicados", value: "40+" },
          { icon: Users, label: "Emprendedores ayudados", value: "1,000+" },
          { icon: TrendingUp, label: "Temas cubiertos", value: "9" },
          { icon: Zap, label: "Herramientas analizadas", value: "50+" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center">
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <div className="font-display text-2xl text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="article-content space-y-6">
        <h2>¿Qué encontrarás aquí?</h2>
        <p>Guías prácticas y directas sobre IA aplicada a negocios, automatización de procesos, marketing digital, ecommerce, WhatsApp Business, costos y ganancias, sublimación, y productividad para emprendedores.</p>
        <p>Todo el contenido está escrito pensando en alguien que tiene un negocio real o está construyendo uno, no en un estudiante universitario o un teórico del management.</p>
        <h2>Nuestra promesa</h2>
        <p>Sin relleno, sin contenido genérico escrito para algoritmos. Cada artículo debe tener algo que puedas aplicar hoy o esta semana en tu negocio.</p>
      </div>
    </div>
  );
}
