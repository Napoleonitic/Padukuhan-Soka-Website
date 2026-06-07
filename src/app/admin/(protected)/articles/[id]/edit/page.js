import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/ArticleForm";
import { FlashMessage } from "@/components/FlashMessage";
import { getAdminArticle, updateArticle } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default async function EditArticlePage({ params, searchParams }) {
  const { article } = await getAdminArticle(Number(params.id));
  const error = getSearchParam(searchParams, "error");

  if (!article) {
    notFound();
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Edit Berita</h1>
        </div>
        <p className="admin-header-copy">
          Perbarui isi berita, status publikasi, atau ganti cover yang tampil.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <ArticleForm
          article={article}
          action={updateArticle.bind(null, article.id)}
          submitLabel="Simpan Perubahan"
        />
      </section>
    </>
  );
}
