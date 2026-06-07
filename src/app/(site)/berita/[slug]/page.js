import { notFound } from "next/navigation";

import { getPublishedArticleBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }) {
  const payload = await getPublishedArticleBySlug(params.slug);

  if (!payload) {
    return {};
  }

  return {
    title: `${payload.article.title} | Padukuhan Soka`,
    description: payload.article.excerpt || payload.article.content.slice(0, 150),
  };
}

export default async function ArticleDetailPage({ params }) {
  const payload = await getPublishedArticleBySlug(params.slug);

  if (!payload) {
    notFound();
  }

  const { article, recentArticles } = payload;

  return (
    <section className="page-hero">
      <div className="container">
        <a className="back-link" href="/#berita" data-reveal="fade">
          &larr; Kembali ke berita
        </a>
        <div className="article-layout" data-reveal-group="">
          <article className="article-content" data-reveal="left" data-lustre="">
            <span className="eyebrow">Berita Padukuhan</span>
            <h1 data-parallax="0.03">{article.title}</h1>
            <p className="meta">{formatDate(article.published_at || article.created_at)}</p>

            {article.cover_image ? (
              <img
                className="article-cover"
                src={article.cover_image}
                alt={article.title}
                data-reveal="zoom"
              />
            ) : null}

            {article.excerpt ? <p className="article-lead">{article.excerpt}</p> : null}

            <div className="rich-copy" style={{ whiteSpace: "pre-line" }}>
              {article.content}
            </div>
          </article>

          <aside className="article-aside">
            <div className="feature-card" data-reveal="right" data-lustre="">
              <span className="badge">Artikel Lainnya</span>
              <h3>Baca juga</h3>
              {recentArticles.length ? (
                recentArticles.map((recentArticle) => (
                  <a
                    key={recentArticle.id}
                    className="aside-link"
                    href={`/berita/${recentArticle.slug}`}
                  >
                    <strong>{recentArticle.title}</strong>
                    <span>
                      {formatDate(
                        recentArticle.published_at || recentArticle.created_at,
                      )}
                    </span>
                  </a>
                ))
              ) : (
                <p>Belum ada artikel lain yang dipublikasikan.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
