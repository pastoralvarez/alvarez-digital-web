-- ============================================================
-- ÁLVAREZ DIGITAL — Seed de 40 artículos
-- Ejecutar DESPUÉS del schema.sql
-- Los slugs, metas y FAQs están listos para SEO
-- El contenido HTML debe completarse en el editor admin
-- ============================================================

-- Helper: obtener IDs de categorías
-- Para usar este seed, primero ejecuta schema.sql

do $$
declare
  cat_ia uuid;
  cat_negocios uuid;
  cat_marketing uuid;
  cat_auto uuid;
  cat_ecom uuid;
  cat_wa uuid;
  cat_costos uuid;
  cat_subli uuid;
  cat_prod uuid;
begin
  select id into cat_ia from categories where slug = 'ia';
  select id into cat_negocios from categories where slug = 'negocios';
  select id into cat_marketing from categories where slug = 'marketing';
  select id into cat_auto from categories where slug = 'automatizacion';
  select id into cat_ecom from categories where slug = 'ecommerce';
  select id into cat_wa from categories where slug = 'whatsapp-business';
  select id into cat_costos from categories where slug = 'costos-y-ganancias';
  select id into cat_subli from categories where slug = 'sublimacion';
  select id into cat_prod from categories where slug = 'productividad';

  -- ========== NEGOCIOS ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo empezar un negocio desde casa en 2025: guía paso a paso',
    'como-empezar-negocio-desde-casa',
    'Empezar un negocio desde casa es más accesible que nunca. En esta guía encontrarás los pasos concretos para lanzar tu primer negocio con poco dinero y mucho criterio.',
    'published', now() - interval '1 day', cat_negocios, 8,
    'Cómo empezar un negocio desde casa en 2025 — Álvarez Digital',
    'Guía completa para empezar un negocio desde casa en 2025. Pasos, ideas rentables y herramientas que necesitas para arrancar.',
    ARRAY['negocio desde casa', 'emprender desde casa', 'negocios rentables 2025', 'emprendimiento'],
    '[{"question":"¿Cuánto dinero necesito para empezar un negocio desde casa?","answer":"Depende del tipo de negocio, pero muchos negocios digitales pueden iniciarse con menos de $200. Lo más importante es validar la idea antes de invertir dinero."},{"question":"¿Cuál es el negocio más fácil de empezar desde casa?","answer":"Los servicios digitales como diseño, redacción, gestión de redes sociales o consultoría son de los más fáciles porque requieren poco capital inicial y pueden iniciarse con las habilidades que ya tienes."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Negocios rentables para 2026: ideas con alta demanda y bajo costo inicial',
    'negocios-rentables-2026',
    'Las tendencias de mercado para 2026 apuntan hacia servicios digitales, productos personalizados y negocios basados en IA. Aquí las oportunidades más reales.',
    'published', now() - interval '2 days', cat_negocios, 9,
    'Negocios rentables para 2026 — Ideas con alta demanda | Álvarez Digital',
    'Descubre los negocios más rentables para 2026. Ideas con alta demanda, bajo costo inicial y cómo empezar cada una paso a paso.',
    ARRAY['negocios rentables 2026', 'ideas de negocio', 'negocios con poco dinero'],
    '[{"question":"¿Cuál es el negocio más rentable en 2026?","answer":"Los negocios de servicios digitales, IA aplicada, y productos personalizados lideran la rentabilidad porque tienen márgenes altos y bajo costo de entrada."},{"question":"¿Qué negocio puedo empezar con $100?","answer":"Con $100 puedes empezar: venta de servicios freelance, sublimación básica, dropshipping de productos digitales o gestión de redes sociales para pequeños negocios."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo validar una idea de negocio antes de invertir (método práctico)',
    'como-validar-idea-negocio',
    'Antes de gastar tiempo y dinero, necesitas saber si tu idea tiene demanda real. Este método te permite validar en días, no meses.',
    'published', now() - interval '3 days', cat_negocios, 7,
    'Cómo validar una idea de negocio — Método práctico | Álvarez Digital',
    'Aprende a validar tu idea de negocio antes de invertir. Métodos rápidos y gratuitos para saber si hay demanda real.',
    ARRAY['validar idea negocio', 'validacion de negocios', 'antes de emprender'],
    '[{"question":"¿Cuánto tiempo toma validar una idea de negocio?","answer":"Con el método correcto, puedes tener señales claras de validación en 7 a 14 días sin necesidad de crear un producto terminado."},{"question":"¿Cómo sé si mi idea de negocio tiene demanda?","answer":"Las formas más directas: buscar en Google Trends, investigar grupos de Facebook y TikTok donde está tu público, y hablar con 10 personas del perfil de tu cliente ideal."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo calcular las ganancias reales de un negocio (sin engañarte)',
    'como-calcular-ganancias-negocio',
    'Muchos emprendedores confunden ingresos con ganancias. Esta guía explica exactamente cómo calcular lo que realmente te está quedando.',
    'published', now() - interval '4 days', cat_negocios, 7,
    'Cómo calcular ganancias de un negocio — Guía práctica | Álvarez Digital',
    'Aprende a calcular las ganancias reales de tu negocio. Fórmulas simples, ejemplos reales y errores comunes a evitar.',
    ARRAY['calcular ganancias negocio', 'margen de ganancia', 'finanzas emprendedores'],
    '[{"question":"¿Cuál es la diferencia entre ingreso y ganancia?","answer":"El ingreso es todo lo que entra. La ganancia es lo que queda después de restar TODOS los costos: materiales, mano de obra, gastos fijos, impuestos y tu propio salario."},{"question":"¿Qué porcentaje de ganancia es bueno para un negocio?","answer":"Depende del sector. Para productos físicos, márgenes de 30-50% son saludables. Para servicios digitales, lo normal está entre 60-80%. Por debajo del 20% es señal de problemas."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Los 7 errores que hacen quebrar negocios pequeños (y cómo evitarlos)',
    'errores-que-hacen-quebrar-negocios',
    'La mayoría de los negocios pequeños no quiebran por falta de dinero, sino por errores evitables. Estos son los más comunes y cómo protegerte.',
    'published', now() - interval '5 days', cat_negocios, 8,
    'Errores que hacen quebrar negocios pequeños — Álvarez Digital',
    'Conoce los 7 errores más comunes que destruyen negocios pequeños y cómo evitarlos antes de que sea tarde.',
    ARRAY['errores negocios pequeños', 'por que quiebran los negocios', 'fracaso emprendedores'],
    '[{"question":"¿Cuál es la causa número 1 de fracaso en negocios pequeños?","answer":"La falta de control del flujo de caja. Muchos negocios con buenas ventas quiebran porque gastan más de lo que entra o no tienen reserva para los meses malos."},{"question":"¿Cuánto tiempo tarda en fracasar un negocio pequeño?","answer":"El 20% cierra en el primer año, el 45% antes del 5to año. La mayoría falla en los primeros 18 meses por no validar la demanda o quedarse sin capital de trabajo."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== IA ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo usar ChatGPT para negocios: 15 aplicaciones reales que ahorran tiempo',
    'como-usar-chatgpt-para-negocios',
    'ChatGPT no es solo para escribir textos. Estos son los usos concretos que están usando emprendedores para ahorrar horas cada semana.',
    'published', now() - interval '6 days', cat_ia, 9,
    'Cómo usar ChatGPT para negocios — 15 casos reales | Álvarez Digital',
    'Aprende a usar ChatGPT para hacer crecer tu negocio. 15 aplicaciones prácticas para ahorrar tiempo y generar más ventas.',
    ARRAY['chatgpt negocios', 'como usar chatgpt', 'ia para emprendedores', 'chatgpt en español'],
    '[{"question":"¿ChatGPT puede reemplazar a un empleado?","answer":"No completamente, pero puede multiplicar tu productividad. Tareas de redacción, análisis básico, respuestas a clientes y organización de ideas son áreas donde ChatGPT actúa como un asistente muy capaz."},{"question":"¿Es gratis usar ChatGPT para negocios?","answer":"La versión gratuita de ChatGPT tiene capacidades útiles. Para uso intensivo en negocios, ChatGPT Plus ($20/mes) o la API son más convenientes y confiables."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Las mejores herramientas de IA para emprendedores en 2025',
    'mejores-herramientas-ia-emprendedores',
    'No todas las herramientas de IA valen lo mismo. Aquí están las que realmente usan los emprendedores más productivos y por qué.',
    'published', now() - interval '7 days', cat_ia, 10,
    'Mejores herramientas IA para emprendedores 2025 — Álvarez Digital',
    'Las mejores herramientas de inteligencia artificial para emprendedores en 2025. Analizadas, comparadas y con casos de uso reales.',
    ARRAY['herramientas ia 2025', 'mejores herramientas ia', 'ia para negocios', 'software ia emprendedores'],
    '[{"question":"¿Cuál es la mejor herramienta de IA para emprendedores?","answer":"Depende del uso. Para escribir y crear contenido: ChatGPT o Claude. Para imágenes: Midjourney o DALL-E. Para automatización: Zapier con IA. Para video: Descript o HeyGen. Lo ideal es combinar 2-3 herramientas."},{"question":"¿Cuánto cuesta usar herramientas de IA para un negocio?","answer":"Puedes empezar con menos de $50 al mes usando las versiones básicas de ChatGPT Plus y una herramienta de diseño como Canva con IA. A medida que escales, el costo aumenta pero también el valor generado."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Prompts de IA para vender más: plantillas que funcionan',
    'prompts-ia-para-vender-mas',
    'Los prompts correctos convierten a ChatGPT en un vendedor, copywriter y estratega de marketing. Aquí las plantillas probadas.',
    'published', now() - interval '8 days', cat_ia, 8,
    'Prompts para vender más con IA — Plantillas probadas | Álvarez Digital',
    'Prompts de ChatGPT y Claude para aumentar ventas. Plantillas para copywriting, propuestas, respuestas a clientes y estrategias de marketing.',
    ARRAY['prompts chatgpt ventas', 'prompts ia marketing', 'prompts para negocios', 'chatgpt copywriting'],
    '[{"question":"¿Qué es un buen prompt de ventas para IA?","answer":"Un buen prompt define el contexto (tu negocio, producto, cliente), el objetivo (qué quieres lograr) y el formato de salida. Cuanto más específico, mejor el resultado."},{"question":"¿Los prompts de IA pueden reemplazar a un copywriter?","answer":"Para textos básicos y de volumen, sí. Para textos complejos de marca o campañas importantes, la IA es un asistente muy poderoso pero la supervisión humana sigue siendo importante."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo automatizar tareas con IA y trabajar menos horas',
    'automatizar-tareas-con-ia',
    'Combinar IA con herramientas de automatización puede darte de vuelta 10-15 horas por semana. Aquí los flujos más prácticos.',
    'published', now() - interval '9 days', cat_ia, 9,
    'Cómo automatizar tareas con IA — Álvarez Digital',
    'Aprende a automatizar tareas repetitivas usando IA. Flujos prácticos con ChatGPT, Zapier, Make y más.',
    ARRAY['automatizar con ia', 'zapier ia', 'automatizacion negocios', 'ia productividad'],
    '[{"question":"¿Qué tareas puedo automatizar con IA hoy?","answer":"Respuestas a emails, publicaciones en redes sociales, análisis de datos básicos, generación de reportes, atención al cliente por chat, creación de contenido recurrente y clasificación de leads."},{"question":"¿Necesito saber programar para automatizar con IA?","answer":"No. Herramientas como Zapier, Make (Integromat) y n8n permiten crear automatizaciones visuales sin código. Con ChatGPT puedes generar código si lo necesitas."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo usar IA para crear contenido que genere tráfico y ventas',
    'usar-ia-para-crear-contenido',
    'La IA puede acelerar drásticamente la creación de contenido, pero hay una forma correcta de usarla para que el resultado sea auténtico y efectivo.',
    'published', now() - interval '10 days', cat_ia, 8,
    'Cómo usar IA para crear contenido — Guía práctica | Álvarez Digital',
    'Aprende a crear contenido de calidad usando IA. Estrategias para blogs, redes sociales y marketing que generan tráfico real.',
    ARRAY['ia crear contenido', 'chatgpt contenido marketing', 'ia blog', 'contenido con ia'],
    '[{"question":"¿Google penaliza el contenido creado con IA?","answer":"Google no penaliza el contenido por ser creado con IA; lo que penaliza es el contenido de baja calidad, sin valor y duplicado. El contenido útil y original tiene oportunidad de rankear."},{"question":"¿Cuánto tiempo ahorra la IA en la creación de contenido?","answer":"Dependiendo del proceso, entre 40% y 70% del tiempo. La IA es más útil para el primer borrador, ideas y estructura. La edición y personalización humana sigue siendo importante."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== WHATSAPP ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo vender por WhatsApp: estrategia completa para cerrar más ventas',
    'como-vender-por-whatsapp',
    'WhatsApp es el canal de ventas más subestimado para pequeños negocios. Con la estrategia correcta, puede convertirse en tu principal fuente de ingresos.',
    'published', now() - interval '11 days', cat_wa, 9,
    'Cómo vender por WhatsApp — Estrategia completa | Álvarez Digital',
    'Aprende a vender por WhatsApp de forma efectiva. Mensajes, estrategias y errores a evitar para cerrar más ventas.',
    ARRAY['vender por whatsapp', 'ventas whatsapp', 'whatsapp business ventas', 'como cerrar ventas whatsapp'],
    '[{"question":"¿Es legal vender por WhatsApp?","answer":"Sí, completamente legal. WhatsApp Business está diseñado específicamente para esto. Solo debes cumplir con las políticas de WhatsApp y las regulaciones de tu país."},{"question":"¿Cuántas ventas se pueden hacer por WhatsApp al día?","answer":"Depende de tu capacidad de respuesta y el volumen de leads. Con WhatsApp Business y catálogo, un vendedor puede gestionar 30-50 conversaciones activas por día."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Automatización de WhatsApp Business para negocios: herramientas y flujos',
    'automatizacion-whatsapp-business',
    'Responder mensajes manualmente 24/7 no es sostenible. Estos son los sistemas de automatización que usan los negocios que escalan.',
    'published', now() - interval '12 days', cat_wa, 8,
    'Automatización de WhatsApp Business — Guía completa | Álvarez Digital',
    'Aprende a automatizar WhatsApp Business. Herramientas, flujos y mensajes automáticos para atender clientes sin estar disponible siempre.',
    ARRAY['automatizar whatsapp business', 'whatsapp business automatico', 'chatbot whatsapp', 'automatizacion whatsapp'],
    '[{"question":"¿Qué herramienta uso para automatizar WhatsApp Business?","answer":"Las opciones más populares son: Respond.io, Tidio, ManyChat (con integración WhatsApp), y las herramientas nativas de WhatsApp Business API para volúmenes altos."},{"question":"¿Cuánto cuesta automatizar WhatsApp Business?","answer":"Con la app básica de WhatsApp Business (gratis) puedes automatizar respuestas simples. Para automatización avanzada, las herramientas cuestan entre $30 y $150/mes dependiendo del volumen."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo responder clientes automáticamente en WhatsApp (sin perder ventas)',
    'responder-clientes-automaticamente-whatsapp',
    'Un cliente que no recibe respuesta en 5 minutos se va a la competencia. Aprende a configurar respuestas automáticas que no suenen a robot.',
    'published', now() - interval '13 days', cat_wa, 7,
    'Respuestas automáticas WhatsApp Business — Álvarez Digital',
    'Configura respuestas automáticas en WhatsApp Business que atiendan a tus clientes 24/7 sin perder ventas.',
    ARRAY['respuestas automaticas whatsapp', 'whatsapp business mensajes automaticos', 'autoresponder whatsapp'],
    '[{"question":"¿Cómo configuro un mensaje de bienvenida en WhatsApp Business?","answer":"En WhatsApp Business ve a Configuración > Herramientas para la empresa > Mensaje de bienvenida. Activa la opción y escribe tu mensaje personalizado."},{"question":"¿Puedo responder automáticamente con información de precios en WhatsApp?","answer":"Sí, puedes configurar mensajes rápidos con información de precios, catálogos y horarios. Para respuestas más inteligentes necesitas herramientas de terceros como ManyChat."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo usar los catálogos de WhatsApp Business para vender más',
    'catalogos-whatsapp-business',
    'El catálogo de WhatsApp Business es la tienda online más subestimada. Así se configura correctamente para convertir.',
    'published', now() - interval '14 days', cat_wa, 6,
    'Catálogos WhatsApp Business — Guía completa | Álvarez Digital',
    'Aprende a crear y optimizar el catálogo de WhatsApp Business para mostrar tus productos y cerrar más ventas.',
    ARRAY['catalogo whatsapp business', 'whatsapp business productos', 'tienda whatsapp'],
    '[{"question":"¿Cuántos productos puedo agregar al catálogo de WhatsApp Business?","answer":"Puedes agregar hasta 500 productos o servicios en el catálogo de WhatsApp Business de forma gratuita."},{"question":"¿El catálogo de WhatsApp Business es gratis?","answer":"Sí, el catálogo está incluido en la app gratuita de WhatsApp Business. Solo necesitas fotos, descripción y precio de cada producto."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo conseguir clientes desde WhatsApp: estrategias que funcionan',
    'conseguir-clientes-desde-whatsapp',
    'Tener WhatsApp Business no sirve de nada si nadie te escribe. Estas estrategias activan el canal y generan contactos calificados.',
    'published', now() - interval '15 days', cat_wa, 8,
    'Cómo conseguir clientes por WhatsApp — Álvarez Digital',
    'Estrategias probadas para conseguir clientes por WhatsApp Business. Desde redes sociales, publicidad y referidos.',
    ARRAY['conseguir clientes whatsapp', 'leads whatsapp business', 'marketing whatsapp'],
    '[{"question":"¿Cómo hago que la gente me escriba por WhatsApp?","answer":"Las formas más efectivas: enlace de WhatsApp en todas tus redes sociales y bio, botón de WhatsApp en tu web, anuncios de clic a WhatsApp en Meta Ads, y un CTA claro en tu contenido de TikTok/Instagram."},{"question":"¿Qué es un enlace de clic a WhatsApp?","answer":"Es una URL que al hacer clic abre directamente una conversación en WhatsApp con tu número. Puedes generarlo en wa.me/tu-numero y personalizarlo con un mensaje predefinido."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== MARKETING ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo conseguir clientes desde TikTok para tu negocio (sin ser famoso)',
    'conseguir-clientes-desde-tiktok',
    'TikTok no requiere millones de seguidores para generar ventas. La clave está en la estrategia de contenido, no en la fama.',
    'published', now() - interval '16 days', cat_marketing, 9,
    'Cómo conseguir clientes desde TikTok — Guía práctica | Álvarez Digital',
    'Aprende a conseguir clientes reales desde TikTok para tu negocio. Estrategias de contenido, hashtags y conversión.',
    ARRAY['tiktok negocios', 'conseguir clientes tiktok', 'tiktok marketing', 'ventas tiktok'],
    '[{"question":"¿Cuántos seguidores necesito en TikTok para conseguir clientes?","answer":"Ninguno en particular. Los videos en TikTok tienen alcance orgánico independiente de los seguidores. Con 100 seguidores puedes tener un video con 50,000 vistas si el contenido es relevante."},{"question":"¿Qué tipo de contenido vende mejor en TikTok?","answer":"Contenido educativo que muestre el proceso o resultado de tu producto/servicio, videos de antes y después, testimonios reales y contenido que resuelva problemas específicos de tu cliente ideal."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo crear una landing page que convierta: guía completa',
    'crear-landing-page-que-convierta',
    'Una landing page mal hecha desperdicia todo el tráfico que generas. Estos son los elementos que separan las páginas que venden de las que no.',
    'published', now() - interval '17 days', cat_marketing, 9,
    'Cómo crear una landing page que convierta — Álvarez Digital',
    'Guía completa para crear landing pages de alta conversión. Estructura, copywriting, diseño y errores comunes.',
    ARRAY['landing page conversion', 'crear landing page', 'pagina de ventas', 'landing page negocios'],
    '[{"question":"¿Cuánto debe costar una landing page?","answer":"Puedes crear una landing page funcional y profesional gratis con herramientas como Carrd, Webflow (plan gratuito) o incluso Notion. Una landing de calidad puede hacerse en menos de $50/año."},{"question":"¿Qué tasa de conversión es buena para una landing page?","answer":"Depende del tipo de negocio y oferta. Para lead magnets (captura de emails) el promedio es 20-40%. Para ventas directas, 1-3% es bueno. Por encima del 5% es excelente."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo vender por Instagram en 2025: estrategia para pequeños negocios',
    'como-vender-por-instagram',
    'Instagram sigue siendo poderoso para ventas directas, pero las reglas del juego cambiaron. Esto es lo que funciona ahora.',
    'published', now() - interval '18 days', cat_marketing, 8,
    'Cómo vender por Instagram en 2025 — Álvarez Digital',
    'Estrategias actualizadas para vender por Instagram. Reels, historias, shopping y cómo convertir seguidores en clientes.',
    ARRAY['vender por instagram', 'instagram ventas 2025', 'instagram business', 'ventas redes sociales'],
    '[{"question":"¿Cuántos seguidores necesito para vender en Instagram?","answer":"No hay un mínimo. Con 500 seguidores muy comprometidos puedes vender más que con 50,000 desenganchados. Lo que importa es la calidad de la comunidad y qué tan bien conoces a tu audiencia."},{"question":"¿Instagram Shopping funciona para pequeños negocios?","answer":"Sí, especialmente para productos físicos. Instagram Shopping permite etiquetar productos directamente en fotos y Reels, facilitando la compra sin salir de la app."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo crear contenido que vende: el sistema que usan los mejores negocios',
    'crear-contenido-que-vende',
    'El contenido que más vende no es el más elaborado ni el que tiene mejor producción. Es el que entiende exactamente qué quiere escuchar tu cliente.',
    'published', now() - interval '19 days', cat_marketing, 8,
    'Cómo crear contenido que vende — Sistema probado | Álvarez Digital',
    'Aprende a crear contenido que convierte y genera ventas. El sistema de los negocios más exitosos en redes sociales.',
    ARRAY['contenido que vende', 'marketing de contenidos', 'crear contenido negocios', 'content marketing'],
    '[{"question":"¿Con qué frecuencia debo publicar contenido para vender?","answer":"La consistencia supera a la frecuencia. Publicar 3 veces por semana de forma constante es mejor que publicar 7 veces una semana y desaparecer un mes."},{"question":"¿Qué tipo de contenido genera más ventas?","answer":"Educativo + entretenido + testimonios + escasez/urgencia. El contenido que explica cómo tu producto/servicio resuelve un problema específico, combinado con prueba social real, convierte muy bien."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo usar Meta Ads para pequeños negocios con presupuesto limitado',
    'meta-ads-pequenos-negocios',
    'Meta Ads puede ser rentable con $5 al día si sabes exactamente qué hacer. Este es el sistema para negocios pequeños con presupuesto ajustado.',
    'published', now() - interval '20 days', cat_marketing, 10,
    'Meta Ads para pequeños negocios — Guía con presupuesto bajo | Álvarez Digital',
    'Aprende a usar Meta Ads (Facebook e Instagram Ads) con poco presupuesto. Configuración, audiencias y campañas que funcionan.',
    ARRAY['meta ads pequeños negocios', 'facebook ads bajo presupuesto', 'publicidad facebook pequenos negocios', 'instagram ads'],
    '[{"question":"¿Cuánto dinero necesito para empezar con Meta Ads?","answer":"Puedes empezar con $5-10 por día para pruebas. Para resultados consistentes y datos útiles, $300-500 al mes es un presupuesto mínimo razonable para un pequeño negocio."},{"question":"¿Meta Ads funciona para negocios locales?","answer":"Sí, especialmente bien. La segmentación por radio geográfico de Meta es muy precisa. Puedes mostrar anuncios solo a personas en un radio de 5 km de tu local."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== ECOMMERCE ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo crear una tienda online desde cero: guía completa 2025',
    'crear-tienda-online-desde-cero',
    'Crear una tienda online ya no requiere meses ni miles de dólares. Aquí el proceso más directo para lanzar en menos de una semana.',
    'published', now() - interval '21 days', cat_ecom, 10,
    'Cómo crear una tienda online en 2025 — Guía paso a paso | Álvarez Digital',
    'Guía completa para crear tu tienda online desde cero en 2025. Plataformas, configuración, pagos y estrategia de ventas.',
    ARRAY['crear tienda online', 'como hacer tienda online', 'ecommerce 2025', 'vender online'],
    '[{"question":"¿Cuánto cuesta crear una tienda online?","answer":"Con Shopify puedes empezar desde $29/mes. Con WooCommerce solo pagas el hosting (~$10/mes). Tiendanube tiene planes desde $0. El costo real está en el inventario y marketing, no tanto en la plataforma."},{"question":"¿Cuánto tiempo tarda en lanzarse una tienda online?","answer":"Con una plataforma como Tiendanube o Shopify, puedes tener una tienda funcional en 1-3 días. Una tienda bien configurada con buen diseño tarda 1-2 semanas."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Mejores plataformas de ecommerce para emprendedores en 2025',
    'mejores-plataformas-ecommerce-2025',
    'Shopify, WooCommerce, Tiendanube, Wix: no todas son iguales ni sirven para lo mismo. Aquí la comparación honesta.',
    'published', now() - interval '22 days', cat_ecom, 9,
    'Mejores plataformas ecommerce 2025 — Comparativa | Álvarez Digital',
    'Comparativa de las mejores plataformas de ecommerce para emprendedores en 2025. Pros, contras y cuál elegir.',
    ARRAY['mejores plataformas ecommerce', 'shopify vs woocommerce', 'tiendanube', 'plataforma ecommerce'],
    '[{"question":"¿Shopify o WooCommerce para empezar?","answer":"Shopify si quieres arrancar rápido y no te interesa la parte técnica. WooCommerce si tienes algo de experiencia técnica y quieres más control y menores costos a largo plazo."},{"question":"¿Tiendanube es buena plataforma de ecommerce?","answer":"Sí, especialmente para América Latina. Tiene buenas integraciones con medios de pago locales, soporte en español y planes muy accesibles para emprender."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo vender ropa online: guía para empezar tu negocio de moda digital',
    'como-vender-ropa-online',
    'Vender ropa online tiene sus propias reglas. Desde fotografía hasta tallas y devoluciones, esto es lo que nadie te cuenta al principio.',
    'published', now() - interval '23 days', cat_ecom, 9,
    'Cómo vender ropa online — Guía completa para empezar | Álvarez Digital',
    'Aprende a vender ropa online con éxito. Plataformas, fotografía, estrategia y los errores más comunes a evitar.',
    ARRAY['vender ropa online', 'negocio ropa online', 'tienda ropa ecommerce', 'como vender ropa'],
    '[{"question":"¿Cuánto dinero necesito para empezar a vender ropa online?","answer":"Puedes empezar con $200-500 para tu primer lote de inventario, más las fotos y la plataforma. Con dropshipping de ropa, puedes empezar sin inventario."},{"question":"¿Qué fotos necesito para vender ropa online?","answer":"Fotos limpias sobre fondo blanco + fotos en modelo si es posible. La calidad de las fotos es el factor #1 que afecta la conversión en tiendas de ropa online."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo empezar dropshipping correctamente sin caer en los errores más comunes',
    'como-empezar-dropshipping',
    'El dropshipping no es el negocio milagro que venden en YouTube, pero sí puede ser rentable si se hace bien. Aquí la versión sin mentiras.',
    'published', now() - interval '24 days', cat_ecom, 10,
    'Cómo empezar dropshipping — Guía sin mitos | Álvarez Digital',
    'Guía honesta para empezar dropshipping. Proveedores, nichos, marketing y cómo evitar los errores que hacen quebrar la mayoría.',
    ARRAY['como empezar dropshipping', 'dropshipping 2025', 'dropshipping desde cero', 'negocio dropshipping'],
    '[{"question":"¿El dropshipping sigue siendo rentable en 2025?","answer":"Sí, pero más competitivo que antes. La clave es el nicho, el marketing y la diferenciación. Los productos genéricos de AliExpress ya no funcionan; hay que encontrar productos con demanda y poca competencia."},{"question":"¿Cuánto se gana con dropshipping?","answer":"Márgenes típicos entre 20-40%. Con $1,000 de ventas al mes, podrías ganar $200-400 netos después de costos de publicidad y plataforma. Escalar requiere tiempo e inversión en marketing."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo crear una marca digital desde cero: identidad, posicionamiento y presencia',
    'crear-marca-digital-desde-cero',
    'Una marca fuerte hace que los clientes te elijan sobre la competencia aunque seas más caro. Aquí cómo construirla sin ser diseñador ni tener presupuesto grande.',
    'published', now() - interval '25 days', cat_ecom, 9,
    'Cómo crear una marca digital — Guía completa | Álvarez Digital',
    'Aprende a crear una marca digital sólida desde cero. Identidad visual, naming, posicionamiento y presencia online.',
    ARRAY['crear marca digital', 'brand identity', 'como crear marca', 'branding emprendedores'],
    '[{"question":"¿Cuánto cuesta crear una marca profesional?","answer":"Con herramientas como Canva, Looka o Brandmark puedes crear una identidad visual básica pero profesional por menos de $50. Un diseñador freelance puede hacer una identidad completa desde $200-500."},{"question":"¿Qué es lo más importante al crear una marca?","answer":"La claridad sobre a quién va dirigida y qué promesa cumple. El diseño bonito viene después. Una marca que no tiene un posicionamiento claro no funciona por más que sea visualmente perfecta."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== SUBLIMACION ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo empezar un negocio de sublimación desde casa: guía completa',
    'como-empezar-negocio-sublimacion',
    'La sublimación es uno de los negocios más accesibles para empezar desde casa. Con $500-800 de inversión inicial ya puedes empezar a vender.',
    'published', now() - interval '26 days', cat_subli, 10,
    'Cómo empezar negocio de sublimación — Guía completa | Álvarez Digital',
    'Guía completa para empezar un negocio de sublimación desde casa. Máquinas, materiales, precios y cómo conseguir clientes.',
    ARRAY['negocio sublimacion', 'como empezar sublimacion', 'sublimacion desde casa', 'sublimacion rentable'],
    '[{"question":"¿Cuánto dinero necesito para empezar un negocio de sublimación?","answer":"Para empezar básico necesitas: plancha de sublimación ($150-300), impresora para sublimación ($200-400), tintas y papel ($50-100), y materiales sublimables ($100-200). En total, entre $500 y $1,000 para arrancar."},{"question":"¿Es rentable el negocio de sublimación?","answer":"Sí, con márgenes de 50-70% en productos como camisetas y tazas. La clave es la personalización y la calidad del diseño. Los pedidos corporativos y eventos son los segmentos más rentables."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Qué máquinas necesitas para sublimar: guía de equipos para principiantes',
    'maquinas-para-sublimacion',
    'Comprar la máquina equivocada puede costar caro. Aquí la guía honesta sobre qué equipos realmente necesitas según tu nivel y volumen.',
    'published', now() - interval '27 days', cat_subli, 8,
    'Máquinas para sublimación — Guía completa | Álvarez Digital',
    'Qué máquinas necesitas para empezar un negocio de sublimación. Comparativa de planchas, impresoras y equipos recomendados.',
    ARRAY['maquinas sublimacion', 'plancha sublimacion', 'impresora sublimacion', 'equipos sublimacion'],
    '[{"question":"¿Qué plancha de sublimación comprar para empezar?","answer":"Para empezar, una plancha tipo sartén básica de marca Aries, Vevor o similar ($150-250) es suficiente. Evita las más baratas de $50-80 porque la temperatura no es uniforme."},{"question":"¿Necesito una impresora especial para sublimación?","answer":"Sí. Necesitas una impresora compatible con tintas de sublimación, como las Epson EcoTank (ET-2800, ET-4850) o la Sawgrass SG500. No puedes usar tintas de sublimación en cualquier impresora."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo poner precio a tus camisetas sublimadas (sin quedarte corto)',
    'como-poner-precio-camisetas-sublimadas',
    'El error más común en sublimación es cobrar muy barato. Esta guía te enseña a calcular el precio correcto que incluye todos tus costos y te da ganancia real.',
    'published', now() - interval '28 days', cat_subli, 7,
    'Cómo poner precio a camisetas sublimadas — Álvarez Digital',
    'Aprende a calcular el precio justo para tus camisetas sublimadas. Fórmula completa incluyendo todos los costos.',
    ARRAY['precio camisetas sublimadas', 'cuanto cobrar por sublimacion', 'precios sublimacion', 'calcular precio camiseta'],
    '[{"question":"¿Cuánto debo cobrar por una camiseta sublimada?","answer":"El precio mínimo recomendado es 3-4x el costo total de producción. Si una camiseta te cuesta $8 (camiseta + tinta + papel + energía + tiempo), el precio de venta debería ser $24-32 mínimo."},{"question":"¿Cómo compito con quienes venden más barato?","answer":"No compites por precio, compites por calidad, diseño y servicio. Los clientes que solo buscan lo más barato no son los clientes que hacen crecer tu negocio."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Las mejores telas para hoodies premium: guía completa para sublimación y serigrafia',
    'mejores-telas-hoodies-premium',
    'No todos los hoodies son iguales. La tela es el factor que más afecta la percepción de calidad y la satisfacción del cliente.',
    'published', now() - interval '29 days', cat_subli, 7,
    'Mejores telas para hoodies premium — Guía completa | Álvarez Digital',
    'Guía completa sobre las mejores telas para hoodies premium. Algodón, fleece, French Terry y mezclas para sublimación.',
    ARRAY['telas hoodies premium', 'mejor tela para hoodie', 'sublimacion hoodies', 'hoodie calidad'],
    '[{"question":"¿Qué tela es mejor para sublimación en hoodies?","answer":"Para sublimación necesitas telas con al menos 65-70% de poliéster. Las mezclas 65/35 poliéster/algodón o 100% poliéster con textura tipo algodón dan los mejores resultados."},{"question":"¿Cuál es la diferencia entre French Terry y fleece?","answer":"French Terry es más ligero, con bucles suaves en el interior, ideal para clima templado. El fleece tiene interior afelpado, es más abrigador y pesado. El French Terry seca más rápido y tiene mejor caída."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo crear diseños para ropa sin ser diseñador gráfico',
    'como-crear-disenos-para-ropa',
    'No necesitas estudiar diseño para crear estampados que vendan. Con las herramientas correctas y un proceso simple, puedes crear diseños profesionales.',
    'published', now() - interval '30 days', cat_subli, 8,
    'Cómo crear diseños para ropa sin ser diseñador — Álvarez Digital',
    'Aprende a crear diseños para ropa y sublimación sin ser diseñador gráfico. Herramientas, recursos y proceso paso a paso.',
    ARRAY['diseños para ropa', 'crear estampados', 'disenos sublimacion', 'diseño camisetas sin ser diseñador'],
    '[{"question":"¿Qué programa uso para crear diseños de ropa?","answer":"Las opciones más accesibles son: Canva (gratis/pago), Adobe Express (gratis con limitaciones), Kittl (ideal para ropa), y Procreate si tienes iPad. Para vectores profesionales: Illustrator o Inkscape (gratis)."},{"question":"¿Puedo usar imágenes de internet para mis diseños?","answer":"Solo si tienen licencia que permita uso comercial (Creative Commons CC0 o similar). Usar imágenes sin permiso puede resultar en problemas legales. Alternativas: bancos como Freepik (con atribución) o comprar licencias en Envato Elements."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== COSTOS Y GANANCIAS ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo calcular el margen de ganancia de un producto: fórmulas y ejemplos',
    'calcular-margen-ganancia-producto',
    'Margen bruto, margen neto, markup: la confusión entre estos conceptos hace que muchos emprendedores vendan sin saber si están ganando o perdiendo.',
    'published', now() - interval '31 days', cat_costos, 7,
    'Cómo calcular margen de ganancia — Fórmulas y ejemplos | Álvarez Digital',
    'Aprende a calcular el margen de ganancia de tus productos con fórmulas simples y ejemplos reales.',
    ARRAY['calcular margen ganancia', 'margen de ganancia formula', 'markup precio', 'finanzas negocios'],
    '[{"question":"¿Cuál es la diferencia entre margen y markup?","answer":"El margen se calcula sobre el precio de venta: (precio-costo)/precio x 100. El markup se calcula sobre el costo: (precio-costo)/costo x 100. Un markup de 100% equivale a un margen del 50%."},{"question":"¿Qué margen de ganancia es bueno para un negocio de productos físicos?","answer":"Para productos físicos, márgenes del 40-60% son saludables. Por debajo del 30% es difícil cubrir gastos operativos. Para servicios digitales, el 60-80% es el estándar del mercado."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo poner precio a tus productos: la guía definitiva para no quebrar',
    'como-poner-precio-a-productos',
    'El precio malo es la causa silenciosa de muchos fracasos. Cobrar muy barato es tan peligroso como cobrar demasiado.',
    'published', now() - interval '32 days', cat_costos, 8,
    'Cómo poner precio a productos — Guía definitiva | Álvarez Digital',
    'Aprende a poner el precio correcto a tus productos. Estrategias de pricing, fórmulas y ejemplos para no quedarte corto.',
    ARRAY['como poner precio productos', 'estrategia precios', 'pricing negocios', 'calcular precio venta'],
    '[{"question":"¿Cómo calculo el precio de venta de un producto?","answer":"Fórmula básica: Costo total x (1 + margen deseado). Si tu producto cuesta $10 y quieres 50% de margen, el precio mínimo es $20. Luego compara con la competencia y ajusta según el valor percibido."},{"question":"¿Debo igualar el precio de la competencia?","answer":"No necesariamente. Si tu producto tiene mejor calidad, presentación o servicio, puedes cobrar más. Si compites solo por precio, estás en una guerra que no puedes ganar a largo plazo."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo calcular el ROI de tu publicidad para saber si vale la pena',
    'calcular-roi-publicidad',
    'Gastar en publicidad sin medir el ROI es como conducir con los ojos cerrados. Esta guía te enseña a medir exactamente lo que te está dando cada peso invertido.',
    'published', now() - interval '33 days', cat_costos, 7,
    'Cómo calcular el ROI de publicidad — Álvarez Digital',
    'Aprende a calcular el retorno de inversión de tu publicidad en Meta Ads, TikTok Ads y Google. Fórmulas y ejemplos reales.',
    ARRAY['roi publicidad', 'calcular roi ads', 'retorno inversion publicidad', 'facebook ads roi'],
    '[{"question":"¿Cuál es un buen ROI para publicidad digital?","answer":"Un ROAS (retorno sobre inversión publicitaria) de 3:1 se considera bueno, es decir, $3 de ventas por cada $1 invertido. Para ecommerce con márgenes bajos, necesitas al menos 4:1 para ser rentable."},{"question":"¿Cómo calculo el ROI de mis anuncios de Facebook?","answer":"ROI = (Ingresos generados - Inversión en anuncios) / Inversión en anuncios x 100. Si invertiste $100 y generaste $400 en ventas, tu ROI es 300%."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo controlar los gastos de tu negocio sin complicarte la vida',
    'controlar-gastos-negocio',
    'Sin control de gastos, el negocio más próspero puede quedarse sin dinero. Este sistema simple funciona incluso si odias los números.',
    'published', now() - interval '34 days', cat_costos, 7,
    'Cómo controlar gastos de tu negocio — Sistema simple | Álvarez Digital',
    'Sistema simple para controlar los gastos de tu negocio. Categorías, herramientas y hábitos para no quedarte sin dinero.',
    ARRAY['controlar gastos negocio', 'control financiero emprendedores', 'administrar dinero negocio', 'presupuesto negocio'],
    '[{"question":"¿Qué herramienta uso para controlar gastos de mi negocio?","answer":"Para empezar, una hoja de cálculo en Google Sheets es suficiente. Apps como Wave (gratis), QuickBooks Simple Start o Contabilidad.mx ofrecen más funciones sin complejidad excesiva."},{"question":"¿Con qué frecuencia debo revisar los gastos de mi negocio?","answer":"Semanalmente para gastos operativos del día a día, mensualmente para un análisis completo de rentabilidad, y trimestralmente para proyecciones y ajustes estratégicos."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo saber si tu negocio es realmente rentable (más allá de las ventas)',
    'como-saber-si-negocio-es-rentable',
    'Muchos emprendedores tienen ventas pero no ganancias. Este diagnóstico honesto te ayuda a saber exactamente en qué punto está tu negocio.',
    'published', now() - interval '35 days', cat_costos, 8,
    'Cómo saber si tu negocio es rentable — Diagnóstico real | Álvarez Digital',
    'Aprende a evaluar la rentabilidad real de tu negocio. Indicadores clave, señales de alerta y cómo mejorar los números.',
    ARRAY['rentabilidad negocio', 'como saber si negocio es rentable', 'indicadores negocio', 'punto de equilibrio'],
    '[{"question":"¿Cómo sé si mi negocio está en el punto de equilibrio?","answer":"El punto de equilibrio es cuando los ingresos igualan a todos los costos fijos + variables. Si vendes por encima de ese punto, tienes ganancia. La fórmula: Costos fijos / (1 - costos variables/ventas)."},{"question":"¿Cuándo es el momento de cerrar un negocio?","answer":"Cuando después de 12-18 meses de operación todavía no alcanzas el punto de equilibrio, la demanda del mercado no existe o no puedes diferenciarte de la competencia, es momento de pivotar o cerrar."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  -- ========== PRODUCTIVIDAD ==========
  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Las mejores herramientas digitales para emprendedores en 2025',
    'herramientas-digitales-emprendedores-2025',
    'No hay tiempo para probar 50 herramientas. Esta es la lista curada de las que realmente usan los emprendedores más productivos.',
    'published', now() - interval '36 days', cat_prod, 10,
    'Mejores herramientas digitales para emprendedores 2025 — Álvarez Digital',
    'Las mejores herramientas digitales para emprendedores en 2025. Gestión, diseño, marketing y productividad.',
    ARRAY['herramientas digitales emprendedores', 'apps para emprendedores', 'software negocios 2025'],
    '[{"question":"¿Cuáles son las herramientas digitales más importantes para un emprendedor?","answer":"Las básicas que todo emprendedor necesita: comunicación (WhatsApp Business, Slack), diseño (Canva), gestión (Notion o Trello), finanzas (Wave o Google Sheets), y presencia online (sitio web básico + redes sociales)."},{"question":"¿Cuánto debo gastar en herramientas digitales para mi negocio?","answer":"Al inicio, lo mínimo posible. Muchas herramientas tienen planes gratuitos muy completos. Un stack básico puede funcionar con $0-50/mes. No gastes en herramientas avanzadas hasta tener ingresos consistentes."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Las mejores apps para organizar tu negocio desde el celular',
    'apps-para-organizar-negocio',
    'El celular puede ser tu oficina completa si usas las apps correctas. Estas son las que más usan los emprendedores modernos para gestionar todo.',
    'published', now() - interval '37 days', cat_prod, 8,
    'Mejores apps para organizar tu negocio — Álvarez Digital',
    'Las mejores aplicaciones para organizar y gestionar tu negocio desde el teléfono. Gratuitas y de pago.',
    ARRAY['apps para emprendedores', 'organizar negocio celular', 'aplicaciones negocios', 'productividad movil'],
    '[{"question":"¿Cuál es la mejor app para gestionar un pequeño negocio?","answer":"Para la mayoría de pequeños negocios, la combinación de WhatsApp Business + Notion (o Trello) + Google Workspace cubre el 80% de las necesidades operativas sin costo."},{"question":"¿Puede Notion reemplazar a otros software de gestión?","answer":"Para muchos casos sí. Notion puede funcionar como CRM básico, gestor de proyectos, base de conocimiento y wiki del negocio. La curva de aprendizaje inicial es su mayor barrera."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo ahorrar 10 horas por semana usando automatización en tu negocio',
    'ahorrar-tiempo-automatizacion-negocio',
    '10 horas por semana son 520 horas al año. Eso es 13 semanas de trabajo. Con los sistemas correctos, puedes recuperarlas.',
    'published', now() - interval '38 days', cat_prod, 9,
    'Cómo ahorrar tiempo con automatización — Álvarez Digital',
    'Aprende a automatizar tu negocio y ahorrar 10 horas por semana. Herramientas y flujos de trabajo prácticos.',
    ARRAY['automatizar negocio', 'ahorrar tiempo emprendedor', 'productividad automatizacion', 'zapier negocios'],
    '[{"question":"¿Qué tarea debo automatizar primero en mi negocio?","answer":"Identifica la tarea que más se repite y que no requiere tu criterio personal. Usualmente son: respuesta de emails informativos, publicación en redes sociales, seguimiento de pedidos o recordatorios de cobro."},{"question":"¿Zapier es fácil de usar sin saber programar?","answer":"Sí, Zapier fue diseñado para no-técnicos. La interfaz visual permite conectar apps arrastrando bloques. El plan gratuito permite 5 automatizaciones (Zaps) con 100 tareas al mes."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Cómo trabajar más rápido usando IA: técnicas para emprendedores',
    'trabajar-mas-rapido-usando-ia',
    'La IA no hace tu trabajo por ti, pero puede hacer que hagas el doble en el mismo tiempo si sabes cómo usarla correctamente.',
    'published', now() - interval '39 days', cat_prod, 8,
    'Cómo trabajar más rápido con IA — Técnicas para emprendedores | Álvarez Digital',
    'Técnicas prácticas para trabajar más rápido usando inteligencia artificial. Productividad real para emprendedores.',
    ARRAY['productividad ia', 'trabajar rapido ia', 'ia productividad emprendedores', 'chatgpt productividad'],
    '[{"question":"¿Cuánto más rápido puedo trabajar con IA?","answer":"Depende de las tareas, pero estudios indican incrementos del 30-80% en productividad para tareas de escritura, análisis y código. En tareas de redacción, la IA puede generar borradores en segundos que tomarían horas manualmente."},{"question":"¿Qué tareas de emprendedor se aceleran más con IA?","answer":"Redacción de emails y propuestas, creación de contenido para redes, análisis de métricas, respuesta a preguntas frecuentes, creación de presentaciones y resúmenes de información."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

  insert into articles (title, slug, excerpt, status, published_at, category_id, reading_time,
    meta_title, meta_description, keywords, schema_faq, content_html)
  values (
    'Sistemas simples para organizar tus clientes sin CRM complicado',
    'sistemas-simples-organizar-clientes',
    'No necesitas un CRM de $200/mes para tener organizados a tus clientes. Estos sistemas simples funcionan para negocios de hasta 500 clientes activos.',
    'published', now() - interval '40 days', cat_prod, 7,
    'Sistemas simples para organizar clientes — Álvarez Digital',
    'Cómo organizar y gestionar tus clientes sin CRM complicado. Sistemas simples con Google Sheets, Notion y WhatsApp.',
    ARRAY['organizar clientes negocio', 'crm simple gratis', 'gestionar clientes pequeno negocio', 'seguimiento clientes'],
    '[{"question":"¿Necesito un CRM para mi pequeño negocio?","answer":"Con menos de 200 clientes activos, una hoja de Google Sheets bien estructurada o Notion pueden funcionar perfectamente sin costo adicional. Un CRM formal tiene sentido cuando tienes un equipo de ventas o más de 500 leads activos."},{"question":"¿Cómo organizo mis clientes en WhatsApp Business?","answer":"WhatsApp Business permite etiquetar contactos (nuevo cliente, pedido pendiente, cliente frecuente, etc.) y crear listas de difusión por segmento. Es un CRM básico que tienes en el bolsillo."}]',
    '<p>Contenido completo — editar desde el panel admin.</p>'
  );

end $$;
