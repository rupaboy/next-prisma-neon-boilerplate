export default function LayoutTwo({ article }: any) {
    return (
      <article>
        <h1>{article.title}</h1>
        <h2>{article.subtitle}</h2>
        <hr />
        <div>{article.content}</div>
      </article>
    )
  }
  