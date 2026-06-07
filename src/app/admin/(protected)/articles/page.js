import { ArticleForm } from "@/components/ArticleForm";
import { FlashMessage } from "@/components/FlashMessage";
import { deleteArticle, getAdminArticles } from "@/lib/admin-content";
import { formatDate, limitText } from "@/lib/format";
import { getSearchParam } from "@/lib/search-params";

export default async function AdminArticlesPage({ searchParams }) {
  const { articles } = await getAdminArticles();
  const success = getSearchParam(searchParams, "success");
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Berita</h1>
        </div>
        <p className="admin-header-copy">
          Tambah, ubah, dan atur status berita, termasuk cover foto jika
          diperlukan.
        </p>
      </header>

      <FlashMessage success={success} error={error} />

      <section className="table-card">
        <div className="table-actions">
          <div>
            <p className="eyebrow">Daftar Konten</p>
            <h2>Semua berita</h2>
          </div>
          <a className="button button-primary" href="/admin/articles/new">
            Tambah berita
          </a>
        </div>

        {articles.length ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <strong>{article.title}</strong>
                      <span>{article.excerpt ? limitText(article.excerpt, 80) : "Tanpa ringkasan."}</span>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          article.is_published ? "status-live" : "status-draft"
                        }`}
                      >
                        {article.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>{formatDate(article.published_at || article.created_at)}</td>
                    <td className="action-row">
                      <a
                        className="button button-outline"
                        href={`/admin/articles/${article.id}/edit`}
                      >
                        Edit / Ganti Cover
                      </a>
                      <form action={deleteArticle.bind(null, article.id)}>
                        <button className="button button-danger" type="submit">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Belum ada berita</h3>
            <p>Mulai isi portal dengan artikel atau pengumuman baru.</p>
          </div>
        )}
      </section>
    </>
  );
}
