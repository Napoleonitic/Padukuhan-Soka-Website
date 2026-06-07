"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function buildLoginRedirect(error) {
  return `/admin/login?error=${encodeURIComponent(error)}`;
}

function getAuthErrorMessage(error) {
  if (!error) {
    return "Login admin gagal.";
  }

  if (
    error.code === "email_not_confirmed" ||
    error.message === "Email not confirmed"
  ) {
    return "Email admin belum dikonfirmasi di Supabase. Nonaktifkan Confirm Email atau konfirmasi user admin terlebih dahulu.";
  }

  if (error.code === "invalid_credentials") {
    return "Email atau kata sandi tidak cocok.";
  }

  return error.message || "Login admin gagal.";
}

export async function loginAction(formData) {
  if (!isSupabaseConfigured()) {
    redirect(
      buildLoginRedirect(
        "Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu.",
      ),
    );
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const supabase = createSupabaseServerClient();

  if (!email || !password) {
    redirect(buildLoginRedirect("Email dan kata sandi wajib diisi."));
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(buildLoginRedirect(getAuthErrorMessage(error)));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect(buildLoginRedirect("Akun ini belum memiliki akses admin."));
  }

  redirect("/admin");
}
