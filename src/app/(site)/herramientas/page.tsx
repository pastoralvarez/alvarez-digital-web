// src/app/(site)/herramientas/page.tsx
import type { Metadata } from "next";
import { Calculator, Zap, MessageSquare, BarChart2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Herramientas para emprendedores — Álvarez Digital",
  description: "Calculadoras, generadores y recursos gratuitos para emprendedores.",
};

const tools = [
  {
    icon: Calculator,
    title: "Calculadora de márgenes",
    description: "Calcula el margen de ganancia, precio de venta y punto de equilibrio de tus productos.",
    status: "coming",
    href: "#",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Generador de prompts de IA",
    description: "Genera prompts optimizados para ChatGPT, Claude y otras herramientas de IA para tu negocio.",
    status: "coming",
    href: "#",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: MessageSquare,
    title: "Plantillas WhatsApp Business",
    description: "Plantillas de mensajes para automatizar tu comunicación con clientes.",
    status: "coming",
    href: "#",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: BarChart2,
    title: "Calculadora de ROI publicitario",
    description: "Calcula el retorno de tu inversión en Meta Ads, TikTok Ads y Google Ads.",
    status: "coming",
    href: "#",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

export default function HerramientasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl text-foreground mb-3">Herramientas gratuitas</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Calculadoras, generadores y recursos diseñados específicamente para emprendedores.
          Completamente gratis, sin registro.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className="group rounded-2xl border border-border bg-card p-6 flex flex-col gap-4"
          >
            <div className={`w-10 h-10 rounded-xl ${tool.bg} flex items-center justify-center`}>
              <tool.icon className={`w-5 h-5 ${tool.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-foreground text-base">{tool.title}</h2>
                {tool.status === "coming" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Próximamente</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
            </div>
            {tool.status !== "coming" && (
              <Link href={tool.href} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors mt-auto">
                Usar herramienta <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center rounded-2xl border border-border bg-card p-8">
        <h2 className="font-display text-2xl text-foreground mb-2">¿Qué herramienta te sería útil?</h2>
        <p className="text-muted-foreground text-sm mb-4">Cuéntanos y la consideramos para la siguiente actualización.</p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Sugerir una herramienta
        </Link>
      </div>
    </div>
  );
}
