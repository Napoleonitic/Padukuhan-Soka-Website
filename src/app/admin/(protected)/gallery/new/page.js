import { FlashMessage } from "@/components/FlashMessage";
import { GalleryForm } from "@/components/GalleryForm";
import { createGalleryItem } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default function NewGalleryItemPage({ searchParams }) {
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Tambah Foto</h1>
        </div>
        <p className="admin-header-copy">
          Unggah dokumentasi baru agar cerita visual Padukuhan Soka terus
          terbarui.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <GalleryForm
          galleryItem={{}}
          action={createGalleryItem}
          submitLabel="Simpan Foto"
          confirmMessage="Yakin ingin menambahkan foto ini ke galeri?"
        />
      </section>
    </>
  );
}
