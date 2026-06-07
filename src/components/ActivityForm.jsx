import { ConfirmForm } from "@/components/ConfirmForm";
import { resolveMediaUrl } from "@/lib/media";

export function ActivityForm({
  activity,
  action,
  submitLabel,
  cancelHref = "/admin/activities",
  confirmMessage,
}) {
  const previewUrl = resolveMediaUrl(activity?.image);

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
            Judul kegiatan
          </label>
          <input
            className="input"
            id="title"
            name="title"
            type="text"
            defaultValue={activity?.title || ""}
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="category">
            Kategori
          </label>
          <input
            className="input"
            id="category"
            name="category"
            type="text"
            defaultValue={activity?.category || ""}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="event_date">
            Tanggal
          </label>
          <input
            className="input"
            id="event_date"
            name="event_date"
            type="date"
            defaultValue={activity?.event_date || ""}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="image">
            Foto kegiatan
          </label>
          <input
            className="input"
            id="image"
            name="image"
            type="file"
            accept="image/*"
          />
          <p className="help-text">
            {activity?.id
              ? "Pilih foto baru jika ingin mengganti foto kegiatan yang sekarang."
              : "Tambahkan foto agar kegiatan tampil lebih sesuai di halaman utama."}
          </p>
          {previewUrl ? (
            <>
              <p className="help-text">Foto saat ini:</p>
              <img className="image-preview" src={previewUrl} alt={activity.title} />
            </>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="description">
          Deskripsi
        </label>
        <textarea
          className="textarea"
          id="description"
          name="description"
          rows={8}
          defaultValue={activity?.description || ""}
          required
        />
      </div>

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
