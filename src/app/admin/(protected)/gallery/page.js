import { ConfirmForm } from "@/components/ConfirmForm";
import { FlashMessage } from "@/components/FlashMessage";
import { deleteGalleryItem, getAdminGalleryItems } from "@/lib/admin-content";
import { resolveMediaUrl } from "@/lib/media";
import { getSearchParam } from "@/lib/search-params";

export default async function AdminGalleryPage({ searchParams }) {
  const { galleryItems } = await getAdminGalleryItems();
  const success = getSearchParam(searchParams, "success");
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Galeri</h1>
        </div>
        <p className="admin-header-copy">
          Tambah foto baru atau ganti foto yang sudah ada untuk galeri website.
        </p>
      </header>

      <FlashMessage success={success} error={error} />

      <section className="table-card">
        <div className="table-actions">
          <div>
            <p className="eyebrow">Dokumentasi Foto</p>
            <h2>Galeri desa</h2>
          </div>
          <a className="button button-primary" href="/admin/gallery/new">
            Tambah foto
          </a>
        </div>

        {galleryItems.length ? (
          <div className="gallery-admin-grid">
            {galleryItems.map((galleryItem) => (
              <article key={galleryItem.id} className="gallery-admin-card">
                <img
                  src={resolveMediaUrl(galleryItem.image_url)}
                  alt={galleryItem.title || "Galeri Padukuhan Soka"}
                />
                <div className="gallery-admin-copy">
                  <strong>{galleryItem.title || "Tanpa judul"}</strong>
                  <p>{galleryItem.caption || "Tanpa deskripsi."}</p>
                  <div className="action-row">
                    <a
                      className="button button-outline"
                      href={`/admin/gallery/${galleryItem.id}/edit`}
                    >
                      Edit / Ganti Foto
                    </a>
                    <ConfirmForm
                      action={deleteGalleryItem.bind(null, galleryItem.id)}
                      confirmMessage="Yakin ingin menghapus foto ini dari galeri? Tindakan ini tidak bisa dibatalkan."
                    >
                      <button className="button button-danger" type="submit">
                        Hapus
                      </button>
                    </ConfirmForm>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Belum ada foto</h3>
            <p>Unggah dokumentasi agar halaman galeri langsung terisi.</p>
          </div>
        )}
      </section>
    </>
  );
}
