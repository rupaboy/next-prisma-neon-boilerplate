import { prisma } from "@/lib/prisma"
import { ArticleStatus } from "@prisma/client"

// ---------
// Interfaces
// ---------

export interface User {
  id: number
  name: string
  alias: string
  email: string
  role: string
}

export interface Section {
  id: number
  name: string
  slug: string
  description: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface ArticleLayout {
  id: number
  name: string
  description: string
  template: number
}

export interface Article {
  id: number
  title: string
  subtitle?: string | null
  excerpt?: string | null
  summary: string
  content: string
  highlight?: string | null
  coverImage?: string | null

  status: ArticleStatus
  createdAt: Date

  sectionId: number
  authorId: number
  layoutId: number

  section: Section
  author: User
  layout: ArticleLayout
  tags: Tag[]
}

// -------------------
// Server-side helpers
// -------------------

export async function getArticleById(id: number) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      section: true,
      author: true,
      layout: true,
      tags: true,
    },
  })
}

export async function getArticles() {
  return prisma.article.findMany({
    include: {
      section: true,
      author: true,
      layout: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
  })
}