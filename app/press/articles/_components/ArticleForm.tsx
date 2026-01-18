"use client"

import { useState } from "react"
import { createArticle } from "@/lib/api/articles.client"

export default function ArticleForm() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await createArticle({
      title,
      summary,
      content,
      sectionId: 1,
      authorId: 1,
    })

    setLoading(false)
    alert("Artículo creado")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Resumen"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Guardando..." : "Crear"}
      </button>
    </form>
  )
}
