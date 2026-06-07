import { ActivityForm } from "@/components/ActivityForm";
import { FlashMessage } from "@/components/FlashMessage";
import { createActivity } from "@/lib/admin-content";
import { getSearchParam } from "@/lib/search-params";

export default function NewActivityPage({ searchParams }) {
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Tambah Kegiatan</h1>
        </div>
        <p className="admin-header-copy">
          Tambahkan agenda baru agar aktivitas warga langsung muncul di halaman
          utama.
        </p>
      </header>

      <FlashMessage error={error} />

      <section className="table-card">
        <ActivityForm
          activity={{}}
          action={createActivity}
          submitLabel="Simpan Kegiatan"
          confirmMessage="Yakin ingin menambahkan kegiatan ini?"
        />
      </section>
    </>
  );
}
