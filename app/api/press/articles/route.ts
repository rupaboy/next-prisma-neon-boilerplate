// app/api/press/articles/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const article = await prisma.article.create({
      data: body,
    })

    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: "Error creating article" },
      { status: 500 }
    )
  }
}
