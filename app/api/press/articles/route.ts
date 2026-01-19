import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createArticleSchema } from "@/lib/schemas/article.schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1️⃣ Validación
    const data = createArticleSchema.parse(body)

    // 2️⃣ Persistencia
    const article = await prisma.article.create({
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        excerpt: data.excerpt,
        subtitle: data.subtitle,
        highlight: data.highlight,
        coverImage: data.coverImage,
        status: data.status ?? "DRAFT",

        section: { connect: { id: data.sectionId } },
        author: { connect: { id: data.authorId } },
        layout: data.layoutId
          ? { connect: { id: data.layoutId } }
          : undefined,

        tags: data.tags
          ? {
              connectOrCreate: data.tags.map(tag => ({
                where: { slug: tag },
                create: { name: tag, slug: tag },
              })),
            }
          : undefined,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    // Error de Zod
    if (err instanceof Error && "issues" in err) {
      return NextResponse.json(
        { error: "Datos inválidos", details: err },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error creating article" },
      { status: 500 }
    )
  }
}
