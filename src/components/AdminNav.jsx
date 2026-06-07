"use client";

import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard", match: /^\/admin$/ },
  { href: "/admin/articles", label: "Berita", match: /^\/admin\/articles/ },
  { href: "/admin/activities", label: "Kegiatan", match: /^\/admin\/activities/ },
  { href: "/admin/gallery", label: "Galeri", match: /^\/admin\/gallery/ },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Navigasi admin">
      {items.map((item) => (
        <a
          key={item.href}
          className={item.match.test(pathname) ? "is-active" : ""}
          href={item.href}
        >
          {item.label}
        </a>
      ))}
      <a href="/" target="_blank" rel="noreferrer">
        Lihat Website
      </a>
    </nav>
  );
}
