export default function LayoutOne({ article }: any) {
    return (
      <article>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div>{article.content}</div>
      </article>
    )
  }
  