export function PublicSiteShell({ children, isAdminAuthenticated = false }) {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="nav-shell" data-reveal="down" data-lustre="">
            <a className="brand" href="/">
              <span className="brand-mark">S</span>
              <span className="brand-copy">
                <strong>Padukuhan Soka</strong>
                <small>Mertelu, Gedangsari</small>
              </span>
            </a>

            <nav className="site-nav" aria-label="Navigasi utama">
              <a className="nav-link" href="/#profil">
                Profil
              </a>
              <a className="nav-link" href="/#kegiatan">
                Kegiatan
              </a>
              <a className="nav-link" href="/#berita">
                Berita
              </a>
              <a className="nav-link" href="/#galeri">
                Galeri
              </a>
              <a className="nav-link" href="/#kontak">
                Kontak
              </a>
            </nav>

            <div className="nav-actions">
              <a className="button button-ghost" href="/#kontak">
                Hubungi
              </a>
              {isAdminAuthenticated ? (
                <a className="button button-primary" href="/admin">
                  Dashboard
                </a>
              ) : (
                <a className="button button-primary" href="/admin/login">
                  Admin Login
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

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
