import { SiteHeader } from "@/components/SiteHeader";

export function PublicSiteShell({ children, isAdminAuthenticated = false }) {
  return (
    <>
      <SiteHeader isAdminAuthenticated={isAdminAuthenticated} />

      <main>{children}</main>

      <footer className="footer">
        <div className="container footer-grid" data-reveal-group="">
          <div data-reveal="left">
            <p className="eyebrow">Padukuhan Soka</p>
            <h2 className="section-title">
              Menjaga alam, merawat budaya, menyambut tamu.
            </h2>
          </div>
          <div className="info-panel" data-reveal="up" data-lustre="">
            <strong>Alamat</strong>
            <p>
              Padukuhan Soka, Kalurahan Mertelu, Kapanewon Gedangsari,
              Gunungkidul, DI Yogyakarta.
            </p>
          </div>
          <div className="info-panel" data-reveal="up" data-lustre="">
            <strong>Kontak</strong>
            <p>Email: soka@mertelu.id</p>
            <p>Telepon: +62 274 000 000</p>
          </div>
        </div>
        <div className="container footer-bottom" data-reveal-group="">
          <span>&copy; {new Date().getFullYear()} Padukuhan Soka</span>
          <a href="/admin/login" data-reveal="fade">
            Masuk Admin
          </a>
        </div>
      </footer>
    </>
  );
}
