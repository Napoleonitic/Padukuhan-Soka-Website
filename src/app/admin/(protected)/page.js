import { FlashMessage } from "@/components/FlashMessage";
import { getAdminDashboardData } from "@/lib/admin-content";
import { formatDate, formatDateTime } from "@/lib/format";
import { getSearchParam } from "@/lib/search-params";

export default async function AdminDashboardPage({ searchParams }) {
  const {
    articleCount,
    publishedCount,
    activityCount,
    galleryCount,
    recentArticles,
    recentActivities,
  } = await getAdminDashboardData();
  const success = getSearchParam(searchParams, "success");
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Dashboard</h1>
        </div>
        <p className="admin-header-copy">
          Ringkasan konten dan akses cepat untuk mengelola portal desa.
        </p>
      </header>

      <FlashMessage success={success} error={error} />

      <div className="metrics-grid">
        <article className="metric-card">
          <span>Total berita</span>
          <strong>{articleCount}</strong>
          <small>{publishedCount} sudah dipublikasikan</small>
        </article>
        <article className="metric-card">
          <span>Kegiatan</span>
          <strong>{activityCount}</strong>
          <small>Aktivitas warga tersimpan</small>
        </article>
        <article className="metric-card">
          <span>Galeri</span>
          <strong>{galleryCount}</strong>
          <small>Foto siap tampil di website</small>
        </article>
        <article className="metric-card">
          <span>Backend</span>
          <strong>Supabase</strong>
          <small>Siap untuk deployment di Vercel</small>
        </article>
      </div>

      <div className="admin-grid">
        <section className="table-card">
          <div className="table-actions">
            <div>
              <p className="eyebrow">Terbaru</p>
              <h2>Berita terkini</h2>
            </div>
            <a className="button button-primary" href="/admin/articles/new">
              Tambah berita
            </a>
          </div>
          <div className="stack compact-stack">
            {recentArticles.length ? (
              recentArticles.map((article) => (
                <div key={article.id} className="list-row">
                  <div>
                    <strong>{article.title}</strong>
                    <span>{formatDateTime(article.created_at)}</span>
                  </div>
                  <span
                    className={`status-pill ${
                      article.is_published ? "status-live" : "status-draft"
                    }`}
                  >
                    {article.is_published ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            ) : (
              <p>Belum ada berita.</p>
            )}
          </div>
        </section>

        <section className="table-card">
          <div className="table-actions">
            <div>
              <p className="eyebrow">Kegiatan</p>
              <h2>Agenda warga</h2>
            </div>
            <a className="button button-primary" href="/admin/activities/new">
              Tambah kegiatan
            </a>
          </div>
          <div className="stack compact-stack">
            {recentActivities.length ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="list-row">
                  <div>
                    <strong>{activity.title}</strong>
                    <span>{formatDate(activity.event_date) || "Tanpa tanggal"}</span>
                  </div>
                  <span className="badge">
                    {activity.category || "Kegiatan warga"}
                  </span>
                </div>
              ))
            ) : (
              <p>Belum ada kegiatan.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
