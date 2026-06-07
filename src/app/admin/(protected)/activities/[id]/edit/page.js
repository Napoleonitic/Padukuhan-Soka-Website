import { notFound } from "next/navigation";

import { ActivityForm } from "@/components/ActivityForm";
import { FlashMessage } from "@/components/FlashMessage";
import { getAdminActivity, updateActivity } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default async function EditActivityPage({ params, searchParams }) {
  const { activity } = await getAdminActivity(Number(params.id));
  const error = getSearchParam(searchParams, "error");

  if (!activity) {
    notFound();
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Edit Kegiatan</h1>
        </div>
        <p className="admin-header-copy">
          Perbarui deskripsi kegiatan, kategori, tanggal, dan gambar pendukung.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <ActivityForm
          activity={activity}
          action={updateActivity.bind(null, activity.id)}
          submitLabel="Simpan Perubahan"
        />
      </section>
    </>
  );
}
