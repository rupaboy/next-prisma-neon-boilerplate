"use client"

import { useState } from "react"
import { createArticle } from "@/lib/api/articles.client"

export default function ArticleForm() {
  const [summary, setSummary] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")
  const [highlight, setHighlight] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [layoutId, setLayoutId] = useState<number>(1)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await createArticle({
        summary,
        excerpt,
        title,
        subtitle: subtitle || null,
        content,
        highlight: highlight || null,
        coverImage: coverImage || null,
        tags,
        layoutId,
        sectionId: 1,
        authorId: 1,
        status: "DRAFT",
      })

      alert("Artículo creado")
      // limpiar formulario
      setTitle(""); setSubtitle(""); setSummary(""); setExcerpt(""); setContent("");
      setHighlight(""); setCoverImage(""); setTags([]); setLayoutId(1);
    } catch (err) {
      console.error(err)
      alert("Error al crear artículo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

      <textarea
        placeholder="Resumen"
        value={summary}
        onChange={e => setSummary(e.target.value)}
        required
      />

      <textarea
        placeholder="Bajada"
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
      />

      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <input
        placeholder="Subtítulo"
        value={subtitle}
        onChange={e => setSubtitle(e.target.value)}
      />

      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />

      <input
        placeholder="Highlight"
        value={highlight}
        onChange={e => setHighlight(e.target.value)}
      />

      <input
        placeholder="URL Cover Image"
        value={coverImage}
        onChange={e => setCoverImage(e.target.value)}
      />

      <select
        value={layoutId}
        onChange={e => setLayoutId(Number(e.target.value))}
      >
        <option value={1}>Layout 1</option>
        <option value={2}>Layout 2</option>
      </select>

      <input
        placeholder="Tags (separados por coma)"
        value={tags.join(",")}
        onChange={e =>
          setTags(
            e.target.value
              .split(",")
              .map(t => t.trim())
              .filter(Boolean)
          )
        }
      />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Crear"}
      </button>
    </form>
  )
}
