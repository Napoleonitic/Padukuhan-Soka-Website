import Script from "next/script";
import { redirect } from "next/navigation";

import { BodyClassName } from "@/components/BodyClassName";
import { FlashMessage } from "@/components/FlashMessage";
import { PublicSiteShell } from "@/components/PublicSiteShell";
import { getCurrentAdmin } from "@/lib/auth";
import { getSearchParam } from "@/lib/search-params";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { loginAction } from "@/app/admin/login/actions";

export const metadata = {
  title: "Login Admin | Padukuhan Soka",
  description:
    "Masuk ke panel admin Padukuhan Soka untuk mengelola berita, kegiatan, dan galeri.",
};

export default async function AdminLoginPage({ searchParams }) {
  const { admin } = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  const error = getSearchParam(searchParams, "error");

  return (
    <>
      <BodyClassName className="site-body" />
      <PublicSiteShell>
        <section className="page-hero auth-shell">
          <div className="container auth-grid">
            <div>
              <p className="eyebrow">Admin Access</p>
              <h1 className="section-title">Masuk ke panel kelola Padukuhan Soka.</h1>
              <p className="section-copy">
                Gunakan akun admin untuk menambah berita, memperbarui kegiatan
                warga, dan mengelola galeri foto.
              </p>
              {!isSupabaseConfigured() ? (
                <div className="flash flash-error" style={{ marginTop: "1rem" }}>
                  <strong>
                    Supabase belum dikonfigurasi. Isi `.env.local`, jalankan SQL
                    schema Supabase, lalu buat akun admin.
                  </strong>
                </div>
              ) : null}
            </div>

            <div className="auth-card">
              <FlashMessage error={error} />

              <form action={loginAction} className="stack">
                <div className="field">
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input className="input" id="email" name="email" type="email" required autoFocus />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="password">
                    Kata sandi
                  </label>
                  <input className="input" id="password" name="password" type="password" required />
                </div>

                <button className="button button-primary button-block" type="submit">
                  Masuk ke Dashboard
                </button>
              </form>
            </div>
          </div>
        </section>
      </PublicSiteShell>
      <Script src="/js/site.js" strategy="afterInteractive" />
    </>
  );
}
