// src/components/admin/ArticleEditor.tsx
"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import {
  Bold, Italic, Strikethrough, Code, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, Undo, Redo,
  Image as ImageIcon, Link as LinkIcon, AlignLeft, AlignCenter,
  AlignRight, Save, Eye, Calendar, Loader2, Table as TableIcon,
  Underline as UnderlineIcon
} from "lucide-react";
import type { Category } from "@/types";

interface ArticleEditorProps {
  categories: Category[];
  initialData?: any;
}

export function ArticleEditor({ categories, initialData }: ArticleEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    featured_image: initialData?.featured_image ?? "",
    category_id: initialData?.category_id ?? "",
    status: initialData?.status ?? "draft",
    meta_title: initialData?.meta_title ?? "",
    meta_description: initialData?.meta_description ?? "",
    keywords: initialData?.keywords?.join(", ") ?? "",
    og_title: initialData?.og_title ?? "",
    og_description: initialData?.og_description ?? "",
    og_image: initialData?.og_image ?? "",
    reading_time: initialData?.reading_time ?? 5,
    schema_faq: initialData?.schema_faq ?? [],
  });

  const [faqItems, setFaqItems] = useState<{ question: string; answer: string }[]>(
    initialData?.schema_faq ?? []
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Escribe el contenido del artículo aquí..." }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: initialData?.content ?? "",
    editorProps: {
      attributes: { class: "article-content focus:outline-none min-h-[400px] px-1" },
    },
  });

  const handleTitleChange = (value: string) => {
    setForm((f) => ({
      ...f,
      title: value,
      slug: initialData ? f.slug : slugify(value),
      meta_title: f.meta_title || value,
    }));
  };

  const addImage = () => {
    const url = window.prompt("URL de la imagen:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("URL del enlace:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };

  const handleSave = useCallback(async (status = form.status) => {
    if (!form.title || !form.slug) {
      alert("El título y el slug son obligatorios.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const content = editor?.getJSON() ?? null;
    const content_html = editor?.getHTML() ?? "";

    const payload = {
      ...form,
      status,
      content,
      content_html,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      schema_faq: faqItems,
      published_at: status === "published" ? (initialData?.published_at ?? new Date().toISOString()) : null,
    };

    const { error } = initialData?.id
      ? await supabase.from("articles").update(payload).eq("id", initialData.id)
      : await supabase.from("articles").insert(payload);

    setSaving(false);
    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      router.push("/admin/articulos");
      router.refresh();
    }
  }, [form, editor, faqItems, initialData, router]);

  const ToolbarButton = ({ onClick, active, title, children }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Main editor */}
      <div className="xl:col-span-8 space-y-4">
        {/* Title */}
        <div className="rounded-xl border border-border bg-card p-5">
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título del artículo..."
            className="w-full font-display text-2xl bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/40"
          />
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span>slug:</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="flex-1 bg-transparent outline-none text-primary font-mono"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="rounded-xl border border-border bg-card p-2 flex flex-wrap items-center gap-0.5">
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Negrita">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Itálica">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Subrayado">
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")} title="Tachado">
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-border mx-1" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="H2">
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} title="H3">
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-border mx-1" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Lista">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Lista numerada">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} title="Cita">
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive("code")} title="Código inline">
            <Code className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Separador">
            <Minus className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-border mx-1" />
          <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("left").run()} active={editor?.isActive({ textAlign: "left" })} title="Alinear izquierda">
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("center").run()} active={editor?.isActive({ textAlign: "center" })} title="Centrar">
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().setTextAlign("right").run()} active={editor?.isActive({ textAlign: "right" })} title="Alinear derecha">
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-border mx-1" />
          <ToolbarButton onClick={addImage} title="Insertar imagen">
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={addLink} active={editor?.isActive("link")} title="Insertar enlace">
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Insertar tabla">
            <TableIcon className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-5 bg-border mx-1" />
          <ToolbarButton onClick={() => editor?.chain().focus().undo().run()} title="Deshacer">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor?.chain().focus().redo().run()} title="Rehacer">
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <div className="rounded-xl border border-border bg-card p-6 min-h-[500px]">
          <EditorContent editor={editor} />
        </div>

        {/* Excerpt */}
        <div className="rounded-xl border border-border bg-card p-5">
          <label className="block text-sm font-medium text-foreground mb-2">Extracto / Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            placeholder="Resumen corto del artículo (usado en tarjetas y SEO)..."
            rows={3}
            className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">{form.excerpt.length}/160 caracteres recomendados</p>
        </div>

        {/* FAQ Builder */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-foreground">FAQs (Schema)</h3>
            <button
              type="button"
              onClick={() => setFaqItems((f) => [...f, { question: "", answer: "" }])}
              className="text-xs text-primary hover:text-primary/80"
            >+ Agregar FAQ</button>
          </div>
          {faqItems.map((faq, i) => (
            <div key={i} className="space-y-2 mb-4 p-3 rounded-lg bg-muted/30 border border-border">
              <input
                type="text"
                value={faq.question}
                onChange={(e) => {
                  const updated = [...faqItems];
                  updated[i].question = e.target.value;
                  setFaqItems(updated);
                }}
                placeholder="Pregunta..."
                className="w-full text-sm bg-background border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => {
                  const updated = [...faqItems];
                  updated[i].answer = e.target.value;
                  setFaqItems(updated);
                }}
                placeholder="Respuesta..."
                rows={2}
                className="w-full text-sm bg-background border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <button
                type="button"
                onClick={() => setFaqItems((f) => f.filter((_, idx) => idx !== i))}
                className="text-xs text-destructive hover:text-destructive/80"
              >Eliminar</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar settings */}
      <div className="xl:col-span-4 space-y-4">
        {/* Actions */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-2.5">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Guardar borrador
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
            Publicar
          </button>
        </div>

        {/* Category & settings */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground">Configuración</h3>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Categoría</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Sin categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Imagen destacada (URL)</label>
            <input
              type="url"
              value={form.featured_image}
              onChange={(e) => setForm((f) => ({ ...f, featured_image: e.target.value }))}
              placeholder="https://..."
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {form.featured_image && (
              <img src={form.featured_image} alt="preview" className="mt-2 rounded-lg w-full h-24 object-cover" />
            )}
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Tiempo de lectura (min)</label>
            <input
              type="number"
              value={form.reading_time}
              onChange={(e) => setForm((f) => ({ ...f, reading_time: parseInt(e.target.value) }))}
              min={1}
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <h3 className="text-sm font-medium text-foreground">SEO</h3>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Meta título</label>
            <input
              type="text"
              value={form.meta_title}
              onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
              placeholder="Título para Google (60 chars recomendado)"
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">{form.meta_title.length}/60</p>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Meta descripción</label>
            <textarea
              value={form.meta_description}
              onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
              placeholder="Descripción para Google (160 chars recomendado)"
              rows={3}
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">{form.meta_description.length}/160</p>
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Keywords (separadas por coma)</label>
            <input
              type="text"
              value={form.keywords}
              onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
              placeholder="ia negocios, chatgpt emprendedores..."
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">OG Image URL</label>
            <input
              type="url"
              value={form.og_image}
              onChange={(e) => setForm((f) => ({ ...f, og_image: e.target.value }))}
              placeholder="https://... (1200x630px recomendado)"
              className="w-full text-sm bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
