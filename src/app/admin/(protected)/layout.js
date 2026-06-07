import { BodyClassName } from "@/components/BodyClassName";
import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/(protected)/actions";

export default async function ProtectedAdminLayout({ children }) {
  const { user, admin } = await requireAdmin();

  return (
    <>
      <BodyClassName className="admin-body" />
      <AdminShell user={user} admin={admin} logoutAction={logoutAction}>
        {children}
      </AdminShell>
    </>
  );
}
