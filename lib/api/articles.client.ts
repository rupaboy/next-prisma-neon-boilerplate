
import type { Article } from "@prisma/client"

export async function getArticles() {
  const res = await fetch("/api/press/articles", {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Error obteniendo artículos")
  }
  return res.json() as Promise<Article[]>
}

export async function getArticle(id: number) {
  const res = await fetch(`/api/press/articles/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Artículo no encontrado")
  }
  return res.json() as Promise<Article>
}

export async function createArticle(data: {
  summary: string
  excerpt?: string | null
  title: string
  subtitle?: string | null
  content: string
  highlight?: string | null
  coverImage?: string | null
  tags?: string[]
  sectionId: number
  authorId: number
  layoutId?: number
  status?: "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
}) {
  const res = await fetch("/api/press/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Error creando artículo")
  }

  return res.json()
}
export async function updateArticle(id: number, data: Partial<Article>) {
  const res = await fetch(`/api/press/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error actualizando artículo")
  return res.json() as Promise<Article>
}

export async function deleteArticle(id: number) {
  const res = await fetch(`/api/press/articles/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Error eliminando artículo")
  return true
}
