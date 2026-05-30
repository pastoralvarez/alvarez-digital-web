// src/components/layout/Footer.tsx
import Link from "next/link";
import { Zap } from "lucide-react";

const categories = [
  { href: "/categoria/ia", label: "IA para Negocios" },
  { href: "/categoria/negocios", label: "Negocios" },
  { href: "/categoria/marketing", label: "Marketing" },
  { href: "/categoria/automatizacion", label: "Automatización" },
  { href: "/categoria/ecommerce", label: "Ecommerce" },
  { href: "/categoria/whatsapp-business", label: "WhatsApp Business" },
  { href: "/categoria/costos-y-ganancias", label: "Costos y Ganancias" },
  { href: "/categoria/sublimacion", label: "Sublimación" },
  { href: "/categoria/productividad", label: "Productividad" },
];

const legal = [
  { href: "/privacy", label: "Privacidad" },
  { href: "/terms", label: "Términos" },
  { href: "/cookies", label: "Cookies" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-lg">
                Álvarez<span className="text-primary">Digital</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Tecnología, IA y herramientas digitales para emprendedores que quieren construir negocios modernos y rentables.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://tiktok.com/@alvarezdigital" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm">TikTok</a>
              <a href="https://instagram.com/alvarezdigital" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm">Instagram</a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Categorías</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2 mb-8">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="p-4 rounded-xl border border-border bg-card">
              <p className="text-sm font-medium mb-2">Newsletter semanal</p>
              <p className="text-xs text-muted-foreground mb-3">Herramientas y estrategias cada semana.</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 text-xs bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="text-xs px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Álvarez Digital. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho para emprendedores modernos 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
