import { notFound } from "next/navigation";

import { FlashMessage } from "@/components/FlashMessage";
import { GalleryForm } from "@/components/GalleryForm";
import { getAdminGalleryItem, updateGalleryItem } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default async function EditGalleryItemPage({ params, searchParams }) {
  const { galleryItem } = await getAdminGalleryItem(Number(params.id));
  const error = getSearchParam(searchParams, "error");

  if (!galleryItem) {
    notFound();
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Edit Foto</h1>
        </div>
        <p className="admin-header-copy">
          Perbarui judul, caption, atau ganti gambar galeri yang sudah ada.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <GalleryForm
          galleryItem={galleryItem}
          action={updateGalleryItem.bind(null, galleryItem.id)}
          submitLabel="Simpan Perubahan"
        />
      </section>
    </>
  );
}
