import { ArticleForm } from "@/components/ArticleForm";
import { FlashMessage } from "@/components/FlashMessage";
import { createArticle } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default function NewArticlePage({ searchParams }) {
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Tambah Berita</h1>
        </div>
        <p className="admin-header-copy">
          Tulis pengumuman atau berita baru yang akan tampil di halaman publik.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <ArticleForm
          article={{ is_published: true }}
          action={createArticle}
          submitLabel="Simpan Berita"
          confirmMessage="Yakin ingin menambahkan berita ini?"
        />
      </section>
    </>
  );
}
