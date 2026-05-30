-- ============================================================
-- ÁLVAREZ DIGITAL — Supabase SQL Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- EXTENSIONS
create extension if not exists "uuid-ossp";

-- ============================================================
-- CATEGORIES
-- ============================================================
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  color text default '#22d3ee',
  icon text,
  meta_title text,
  meta_description text,
  created_at timestamptz default now()
);

-- ============================================================
-- TAGS
-- ============================================================
create table tags (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  created_at timestamptz default now()
);

-- ============================================================
-- ARTICLES
-- ============================================================
create table articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb,                       -- Tiptap JSON
  content_html text,                   -- Rendered HTML
  featured_image text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  scheduled_at timestamptz,
  author_id uuid references auth.users(id) on delete set null,
  category_id uuid references categories(id) on delete set null,
  meta_title text,
  meta_description text,
  canonical_url text,
  keywords text[],
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  schema_faq jsonb,                    -- [{question, answer}]
  reading_time int default 5,
  views int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- ARTICLE_TAGS (pivot)
-- ============================================================
create table article_tags (
  article_id uuid references articles(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

-- ============================================================
-- SETTINGS (single row)
-- ============================================================
create table settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text default 'Álvarez Digital',
  site_description text default 'Tecnología y herramientas para emprendedores',
  site_url text default 'https://alvarezdigital.com',
  adsense_client text,
  adsense_enabled boolean default false,
  analytics_id text,
  social_twitter text,
  social_instagram text,
  social_tiktok text,
  logo_url text,
  favicon_url text,
  footer_text text,
  updated_at timestamptz default now()
);

-- Insert default settings row
insert into settings (id) values (uuid_generate_v4());

-- ============================================================
-- INDEXES (performance)
-- ============================================================
create index idx_articles_slug on articles(slug);
create index idx_articles_status on articles(status);
create index idx_articles_published_at on articles(published_at desc);
create index idx_articles_category_id on articles(category_id);
create index idx_articles_status_published on articles(status, published_at desc)
  where status = 'published';
create index idx_categories_slug on categories(slug);
create index idx_tags_slug on tags(slug);

-- Full-text search index
create index idx_articles_fts on articles
  using gin(to_tsvector('spanish', coalesce(title,'') || ' ' || coalesce(excerpt,'')));

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on articles
  for each row execute function update_updated_at();

-- ============================================================
-- INCREMENT VIEWS FUNCTION
-- ============================================================
create or replace function increment_article_views(article_slug text)
returns void language plpgsql security definer as $$
begin
  update articles
  set views = views + 1
  where slug = article_slug and status = 'published';
end;
$$;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Articles: public read for published, auth write
alter table articles enable row level security;

create policy "Public read published articles"
  on articles for select
  using (status = 'published' and published_at <= now());

create policy "Authenticated full access to articles"
  on articles for all
  using (auth.role() = 'authenticated');

-- Categories: public read, auth write
alter table categories enable row level security;

create policy "Public read categories"
  on categories for select using (true);

create policy "Authenticated manage categories"
  on categories for all
  using (auth.role() = 'authenticated');

-- Tags: public read, auth write
alter table tags enable row level security;

create policy "Public read tags"
  on tags for select using (true);

create policy "Authenticated manage tags"
  on tags for all
  using (auth.role() = 'authenticated');

-- Article tags: public read, auth write
alter table article_tags enable row level security;

create policy "Public read article_tags"
  on article_tags for select using (true);

create policy "Authenticated manage article_tags"
  on article_tags for all
  using (auth.role() = 'authenticated');

-- Settings: public read, auth write
alter table settings enable row level security;

create policy "Public read settings"
  on settings for select using (true);

create policy "Authenticated manage settings"
  on settings for all
  using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — Categories
-- ============================================================
insert into categories (name, slug, description, color, meta_title, meta_description) values
  ('IA', 'ia', 'Inteligencia artificial aplicada a negocios y emprendimiento', '#22d3ee',
   'IA para negocios — Álvarez Digital', 'Aprende a usar herramientas de inteligencia artificial para hacer crecer tu negocio.'),
  ('Negocios', 'negocios', 'Estrategias y recursos para emprendedores', '#eab308',
   'Negocios — Álvarez Digital', 'Ideas de negocios rentables, estrategias y guías para emprendedores.'),
  ('Marketing', 'marketing', 'Marketing digital, contenido y publicidad para pequeños negocios', '#a855f7',
   'Marketing digital — Álvarez Digital', 'Estrategias de marketing digital para emprendedores y pequeños negocios.'),
  ('Automatización', 'automatizacion', 'Herramientas y sistemas para automatizar tareas y procesos', '#38bdf8',
   'Automatización para negocios — Álvarez Digital', 'Aprende a automatizar tu negocio y ahorrar horas de trabajo cada semana.'),
  ('Ecommerce', 'ecommerce', 'Ventas online, tiendas digitales y dropshipping', '#f43f5e',
   'Ecommerce — Álvarez Digital', 'Guías completas para vender online y crear tu tienda digital.'),
  ('WhatsApp Business', 'whatsapp-business', 'Ventas y atención al cliente por WhatsApp', '#22c55e',
   'WhatsApp Business — Álvarez Digital', 'Aprende a vender y gestionar clientes con WhatsApp Business.'),
  ('Costos y Ganancias', 'costos-y-ganancias', 'Cómo calcular precios, márgenes y rentabilidad', '#f97316',
   'Costos y ganancias — Álvarez Digital', 'Aprende a calcular precios, márgenes y controlar las finanzas de tu negocio.'),
  ('Sublimación', 'sublimacion', 'Negocio de sublimación, ropa y productos personalizados', '#ef4444',
   'Negocio de sublimación — Álvarez Digital', 'Guías para empezar y hacer crecer un negocio de sublimación rentable.'),
  ('Productividad', 'productividad', 'Herramientas y sistemas para trabajar mejor y más rápido', '#818cf8',
   'Productividad para emprendedores — Álvarez Digital', 'Apps, herramientas y sistemas para ser más productivo como emprendedor.');

-- ============================================================
-- STORAGE — Create bucket for media uploads
-- ============================================================
-- Run in Supabase Storage settings:
-- Bucket name: media
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
