import { ConfirmForm } from "@/components/ConfirmForm";
import { resolveMediaUrl } from "@/lib/media";

export function ArticleForm({
  article,
  action,
  submitLabel,
  cancelHref = "/admin/articles",
  confirmMessage,
}) {
  const previewUrl = resolveMediaUrl(article?.cover_image);

  return (
    <ConfirmForm
      action={action}
      className="stack"
      confirmMessage={confirmMessage}
      encType="multipart/form-data"
    >
      <div className="form-grid">
        <div className="field">
          <label className="field-label" htmlFor="title">
            Judul
          </label>
          <input
            className="input"
            id="title"
            name="title"
            type="text"
            defaultValue={article?.title || ""}
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="cover_image">
            Cover
          </label>
          <input
            className="input"
            id="cover_image"
            name="cover_image"
            type="file"
            accept="image/*"
          />
          <p className="help-text">
            {article?.id
              ? "Pilih gambar baru untuk mengganti cover yang sekarang, atau biarkan kosong jika tidak ingin mengubahnya."
              : "Tambahkan cover foto jika berita ingin tampil dengan gambar."}
          </p>
          {previewUrl ? (
            <>
              <p className="help-text">Cover saat ini:</p>
              <img className="image-preview" src={previewUrl} alt={article.title} />
            </>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="excerpt">
          Ringkasan
        </label>
        <textarea
          className="textarea"
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={article?.excerpt || ""}
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="content">
          Konten
        </label>
        <textarea
          className="textarea"
          id="content"
          name="content"
          rows={12}
          defaultValue={article?.content || ""}
          required
        />
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="is_published"
          value="1"
          defaultChecked={Boolean(article?.is_published)}
        />
        <span>Publikasikan berita ini</span>
      </label>

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>
        <a className="button button-ghost" href={cancelHref}>
          Batal
        </a>
      </div>
    </ConfirmForm>
  );
}
