import { ConfirmForm } from "@/components/ConfirmForm";
import { FlashMessage } from "@/components/FlashMessage";
import { deleteActivity, getAdminActivities } from "@/lib/admin-content";
import { formatDate, limitText } from "@/lib/format";
import { getSearchParam } from "@/lib/search-params";

export default async function AdminActivitiesPage({ searchParams }) {
  const { activities } = await getAdminActivities();
  const success = getSearchParam(searchParams, "success");
  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel Admin</p>
          <h1>Kegiatan</h1>
        </div>
        <p className="admin-header-copy">
          Atur kegiatan warga sekaligus tambah atau ganti foto yang tampil di
          halaman utama.
        </p>
      </header>

      <FlashMessage success={success} error={error} />

      <section className="table-card">
        <div className="table-actions">
          <div>
            <p className="eyebrow">Agenda Warga</p>
            <h2>Daftar kegiatan</h2>
          </div>
          <a className="button button-primary" href="/admin/activities/new">
            Tambah kegiatan
          </a>
        </div>

        {activities.length ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kegiatan</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <strong>{activity.title}</strong>
                      <span>{limitText(activity.description, 90)}</span>
                    </td>
                    <td>{activity.category || "Kegiatan warga"}</td>
                    <td>{formatDate(activity.event_date) || "-"}</td>
                    <td className="action-row">
                      <a
                        className="button button-outline"
                        href={`/admin/activities/${activity.id}/edit`}
                      >
                        Edit / Ganti Foto
                      </a>
                      <ConfirmForm
                        action={deleteActivity.bind(null, activity.id)}
                        confirmMessage="Yakin ingin menghapus kegiatan ini? Tindakan ini tidak bisa dibatalkan."
                      >
                        <button className="button button-danger" type="submit">
                          Hapus
                        </button>
                      </ConfirmForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Belum ada kegiatan</h3>
            <p>Tambahkan aktivitas warga agar halaman publik lebih hidup.</p>
          </div>
        )}
      </section>
    </>
  );
}
