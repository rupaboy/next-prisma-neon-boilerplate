import { getArticleById } from "@/lib/articles"
import LayoutOne from "../_layouts.tsx/LayoutOne"
import LayoutTwo from "../_layouts.tsx/LayoutTwo"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const articleId = Number(id)

  if (Number.isNaN(articleId)) {
    return <div>ID inválido</div>
  }

  const article = await getArticleById(articleId)
  if (!article) return <div>No encontrado</div>

  switch (article.layoutId) {
    case 2:
      return <LayoutTwo article={article} />
    default:
      return <LayoutOne article={article} />
  }
}
