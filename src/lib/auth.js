import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function getCurrentAdmin() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      supabase: null,
      user: null,
      admin: null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      user: null,
      admin: null,
    };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id, display_name, created_at")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    supabase,
    user,
    admin: admin || null,
  };
}

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect(
      "/admin/login?error=" +
        encodeURIComponent(
          "Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu.",
        ),
    );
  }

  const session = await getCurrentAdmin();

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.admin) {
    await session.supabase.auth.signOut();

    redirect(
      "/admin/login?error=" +
        encodeURIComponent("Akun ini belum memiliki akses admin."),
    );
  }

  return session;
}
