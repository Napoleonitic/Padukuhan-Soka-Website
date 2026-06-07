import { AdminNav } from "@/components/AdminNav";

export function AdminShell({ user, admin, logoutAction, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin">
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            <strong>Admin Soka</strong>
            <small>Kelola portal warga</small>
          </span>
        </a>

        <AdminNav />

        <div className="admin-user-box">
          <strong>{admin?.display_name || "Admin Soka"}</strong>
          <span>{user.email}</span>
          <form action={logoutAction}>
            <button className="button button-outline button-block" type="submit">
              Keluar
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
