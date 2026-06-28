"use client";

import { useEffect, useState } from "react";

const primaryLinks = [
  { href: "/#profil", label: "Profil" },
  { href: "/#kegiatan", label: "Kegiatan" },
  { href: "/#berita", label: "Berita" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#kontak", label: "Kontak" },
];

export function SiteHeader({ isAdminAuthenticated = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 821px)");

    const handleChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container">
        <div
          className={`nav-shell${isMenuOpen ? " is-open" : ""}`}
        >
          <a className="brand" href="/" onClick={closeMenu}>
            {isAdminAuthenticated ? <span className="brand-mark">S</span> : null}
            <span className="brand-copy">
              <strong>Padukuhan Soka</strong>
              <small>Mertelu, Gedangsari</small>
            </span>
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <div className="nav-menu" id="site-navigation">
            <nav className="site-nav" aria-label="Navigasi utama">
              {primaryLinks.map((link) => (
                <a
                  key={link.href}
                  className="nav-link"
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <a className="button button-ghost" href="/#kontak" onClick={closeMenu}>
                Hubungi
              </a>
              {isAdminAuthenticated ? (
                <a className="button button-primary" href="/admin" onClick={closeMenu}>
                  Dashboard
                </a>
              ) : (
                <a
                  className="button button-primary"
                  href="/admin/login"
                  onClick={closeMenu}
                >
                  Admin Login
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
