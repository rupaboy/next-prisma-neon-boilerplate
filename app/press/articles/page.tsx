import Link from "next/link";
import { getArticles } from "@/lib/articles";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <h1>Artículos</h1>
      <Link href="/press/articles/new">
        <button>Nuevo Artículo</button>
      </Link>

      <ul>
        {articles.map((article: any) => (
          <li key={article.id}>
            <Link href={`/press/articles/${article.id}`}>
              {article.title} — {article.author.alias} — {article.section.name}
            </Link>
            <Link href={`/press/articles/${article.id}/edit`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
