// src/app/(site)/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Álvarez Digital",
  description: "Cómo recopilamos, usamos y protegemos tu información personal en Álvarez Digital.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="font-display text-4xl text-foreground mb-3">Política de Privacidad</h1>
      <p className="text-muted-foreground text-sm mb-10">Última actualización: enero 2025</p>
      <div className="article-content space-y-6">
        <p>En <strong>Álvarez Digital</strong> nos comprometemos a proteger tu privacidad. Esta política explica qué información recopilamos, cómo la usamos y qué derechos tienes sobre ella.</p>
        <h2>1. Información que recopilamos</h2>
        <p>Podemos recopilar información que nos proporcionas directamente (como tu correo al suscribirte al newsletter), información de uso del sitio mediante cookies analíticas, y datos técnicos básicos como tu dirección IP y tipo de navegador.</p>
        <h2>2. Uso de la información</h2>
        <p>Usamos la información para mejorar el contenido del sitio, enviarte el newsletter si te suscribiste (puedes cancelar en cualquier momento), y mostrar publicidad relevante a través de Google Adsense.</p>
        <h2>3. Google Adsense y cookies</h2>
        <p>Este sitio usa Google Adsense para mostrar anuncios. Google puede usar cookies para personalizar los anuncios según tus visitas a este u otros sitios web. Puedes optar por no personalizar anuncios visitando los <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">ajustes de anuncios de Google</a>.</p>
        <h2>4. Tus derechos</h2>
        <p>Tienes derecho a acceder, corregir o eliminar tu información personal. Para hacerlo, contáctanos en <strong>hola@alvarezdigital.com</strong>.</p>
        <h2>5. Contacto</h2>
        <p>Si tienes preguntas sobre esta política, escríbenos a <strong>hola@alvarezdigital.com</strong>.</p>
      </div>
    </div>
  );
}
