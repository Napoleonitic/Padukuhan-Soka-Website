import { resolveMediaUrl } from "@/lib/media";

export function GalleryForm({
  galleryItem,
  action,
  submitLabel,
  cancelHref = "/admin/gallery",
}) {
  const previewUrl = resolveMediaUrl(galleryItem?.image_url);

  return (
    <form action={action} className="stack" encType="multipart/form-data">
      <div className="form-grid">
        <div className="field">
          <label className="field-label" htmlFor="title">
            Judul foto
          </label>
          <input
            className="input"
            id="title"
            name="title"
            type="text"
            defaultValue={galleryItem?.title || ""}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="caption">
            Caption
          </label>
          <input
            className="input"
            id="caption"
            name="caption"
            type="text"
            defaultValue={galleryItem?.caption || ""}
          />
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="image">
          Gambar
        </label>
        <input
          className="input"
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!galleryItem?.id}
        />
        <p className="help-text">
          {galleryItem?.id
            ? "Pilih foto baru jika ingin mengganti gambar yang sekarang."
            : "Unggah foto baru untuk ditampilkan di galeri."}
        </p>
        {previewUrl ? (
          <>
            <p className="help-text">Foto saat ini:</p>
            <img
              className="image-preview"
              src={previewUrl}
              alt={galleryItem?.title || "Galeri Padukuhan Soka"}
            />
          </>
        ) : null}
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>
        <a className="button button-ghost" href={cancelHref}>
          Batal
        </a>
      </div>
    </form>
  );
}
