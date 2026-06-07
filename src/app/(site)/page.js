import { getHomePageData } from "@/lib/content";
import { formatDate, limitText } from "@/lib/format";

export default async function HomePage() {
  const { articles, activities, galleryItems, location } = await getHomePageData();

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16, 29, 22, 0.28), rgba(16, 29, 22, 0.88)), url('/images/hero-village.jpg')",
        }}
      >
        <div className="hero-mist hero-mist-one" aria-hidden="true" />
        <div className="hero-mist hero-mist-two" aria-hidden="true" />
        <div className="container hero-inner" data-reveal-group="">
          <p className="eyebrow hero-eyebrow" data-reveal="fade">
            Forest &amp; Moss Portal
          </p>
          <h1 className="hero-title" data-reveal="up" data-parallax="0.09">
            Selamat datang di Padukuhan Soka.
          </h1>
          <p className="hero-copy" data-reveal="up" data-parallax="0.06">
            Desa yang memadukan lanskap hijau Gunungkidul, tradisi batik tulis,
            dan kebersamaan warga dalam satu portal yang kini siap dideploy di
            Vercel dengan backend Supabase.
          </p>
          <div className="hero-actions" data-reveal="up">
            <a className="button button-primary" href="#profil">
              Jelajahi Soka
            </a>
            <a className="button button-secondary" href="#galeri">
              Lihat Galeri
            </a>
          </div>
        </div>
      </section>

      <section id="profil" className="section">
        <div className="container">
          <div className="split-head" data-reveal-group="">
            <div data-reveal="left">
              <p className="eyebrow">Profil &amp; Potensi</p>
              <h2 className="section-title" data-parallax="0.05">
                Tanah subur, budaya hidup, dan warga yang saling menguatkan.
              </h2>
            </div>
            <p className="section-copy" data-reveal="right">
              Padukuhan Soka dikenal karena batik tulis, wisata Camping Panguk
              Soka, pertanian warga, serta tradisi gotong royong yang masih
              terasa kuat.
            </p>
          </div>

          <div className="card-grid profile-grid" data-reveal-group="">
            <article
              className="media-card media-card-large"
              data-reveal="zoom"
              data-parallax="0.08"
              data-lustre=""
            >
              <img src="/images/batik.jpg" alt="Batik tulis Padukuhan Soka" />
              <div className="media-copy">
                <span className="badge">Kerajinan Lokal</span>
                <h3>Batik Tulis Soka</h3>
                <p>
                  Motif khas yang lahir dari alam sekitar dan dijaga sebagai
                  identitas budaya warga.
                </p>
              </div>
            </article>

            <article className="feature-card" data-reveal="right" data-lustre="">
              <span className="badge">Wisata Alam</span>
              <h3>Camping Panguk Soka</h3>
              <p>
                Area camping dengan panorama bukit dan udara pagi yang jadi daya
                tarik utama pengunjung.
              </p>
            </article>

            <article className="feature-card" data-reveal="right" data-lustre="">
              <span className="badge">Lokasi</span>
              <h3>Gedangsari, Gunungkidul</h3>
              <p>
                Terletak di Kalurahan Mertelu dengan suasana desa yang tenang
                dan akses yang terus berkembang.
              </p>
            </article>
          </div>

          <div className="stat-grid" data-reveal-group="">
            <article className="stat-card" data-reveal="pop" data-lustre="">
              <strong>200+</strong>
              <span>Kepala keluarga</span>
            </article>
            <article className="stat-card" data-reveal="pop" data-lustre="">
              <strong>12</strong>
              <span>Pengrajin batik aktif</span>
            </article>
            <article className="stat-card" data-reveal="pop" data-lustre="">
              <strong>5 ha</strong>
              <span>Lahan pertanian</span>
            </article>
            <article className="stat-card" data-reveal="pop" data-lustre="">
              <strong>1</strong>
              <span>Wisata unggulan</span>
            </article>
          </div>
        </div>
      </section>

      <section id="kegiatan" className="section section-muted">
        <div className="container">
          <div className="split-head" data-reveal-group="">
            <div data-reveal="left">
              <p className="eyebrow">Kegiatan Warga</p>
              <h2 className="section-title" data-parallax="0.04">
                Denyut harian yang membuat Soka tetap hangat dan hidup.
              </h2>
            </div>
            <p className="section-copy" data-reveal="right">
              Aktivitas warga tersusun dari pertanian, kebersamaan sosial,
              pendidikan, dan agenda keagamaan.
            </p>
          </div>

          <div className="card-grid" data-reveal-group="">
            {activities.length ? (
              activities.map((activity) => (
                <article
                  key={activity.id}
                  className="feature-card"
                  data-reveal="up"
                  data-lustre=""
                >
                  {activity.image ? (
                    <img
                      className="inline-media"
                      src={activity.image}
                      alt={activity.title}
                    />
                  ) : null}
                  <span className="badge">
                    {activity.category || "Kegiatan Warga"}
                  </span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <small className="meta">
                    {formatDate(activity.event_date) || "Agenda warga"}
                  </small>
                </article>
              ))
            ) : (
              <div className="empty-state" data-reveal="fade">
                <h3>Belum ada kegiatan</h3>
                <p>Tambahkan kegiatan dari panel admin agar tampil di halaman ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="berita" className="section">
        <div className="container">
          <div className="split-head" data-reveal-group="">
            <div data-reveal="left">
              <p className="eyebrow">Berita &amp; Pengumuman</p>
              <h2 className="section-title" data-parallax="0.04">
                Kabar terbaru dari Padukuhan Soka.
              </h2>
            </div>
            <p className="section-copy" data-reveal="right">
              Informasi terbaru warga, agenda padukuhan, dan perkembangan
              kegiatan desa dipublikasikan di sini.
            </p>
          </div>

          <div className="article-grid" data-reveal-group="">
            {articles.length ? (
              articles.map((article) => (
                <article key={article.id} className="article-card" data-reveal="up" data-lustre="">
                  {article.cover_image ? (
                    <img className="article-media" src={article.cover_image} alt={article.title} />
                  ) : null}
                  <div className="article-body">
                    <span className="meta">
                      {formatDate(article.published_at || article.created_at)}
                    </span>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt || limitText(article.content, 130)}</p>
                    <a className="text-link" href={`/berita/${article.slug}`}>
                      Baca selengkapnya
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state" data-reveal="fade">
                <h3>Belum ada berita dipublikasikan</h3>
                <p>Berita yang diunggah dari panel admin akan muncul otomatis di sini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="galeri" className="section section-muted">
        <div className="container">
          <div className="split-head" data-reveal-group="">
            <div data-reveal="left">
              <p className="eyebrow">Galeri</p>
              <h2 className="section-title" data-parallax="0.04">
                Dokumentasi kegiatan dan suasana Padukuhan Soka.
              </h2>
            </div>
            <p className="section-copy" data-reveal="right">
              Foto yang tampil di bawah mengikuti gambar, judul, dan caption
              yang diunggah admin dari dashboard.
            </p>
          </div>

          <div className="gallery-grid" data-reveal-group="">
            {galleryItems.length ? (
              galleryItems.map((galleryItem) => (
                <figure
                  key={galleryItem.id}
                  className="gallery-card"
                  data-reveal="zoom"
                  data-lustre=""
                >
                  <img
                    src={galleryItem.image_url}
                    alt={galleryItem.title || "Galeri Padukuhan Soka"}
                  />
                  {galleryItem.title || galleryItem.caption ? (
                    <figcaption className="gallery-caption">
                      {galleryItem.title ? <strong>{galleryItem.title}</strong> : null}
                      {galleryItem.caption ? <span>{galleryItem.caption}</span> : null}
                    </figcaption>
                  ) : null}
                </figure>
              ))
            ) : (
              <div className="empty-state" data-reveal="fade">
                <h3>Galeri masih kosong</h3>
                <p>Unggah foto dari dashboard admin untuk menampilkan cerita visual desa.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="kontak" className="section">
        <div className="container">
          <div className="split-head" data-reveal-group="">
            <div data-reveal="left">
              <p className="eyebrow">Lokasi &amp; Kontak</p>
              <h2 className="section-title" data-parallax="0.04">
                Temukan Padukuhan Soka langsung di peta.
              </h2>
            </div>
            <p className="section-copy" data-reveal="right">
              Titik peta diarahkan ke Balai Dusun Soka Mertelu, sehingga
              pengunjung bisa membuka rute menuju titik yang lebih spesifik
              langsung dari Google Maps.
            </p>
          </div>

          <div className="map-layout" data-reveal-group="">
            <article className="map-copy" data-reveal="left" data-lustre="">
              <span className="badge">Google Maps</span>
              <h3>{location.name}</h3>
              <p>{location.address}.</p>

              <dl className="map-details">
                <div>
                  <dt>Plus code</dt>
                  <dd>{location.plusCode}</dd>
                </div>
                <div>
                  <dt>Akses</dt>
                  <dd>
                    Bisa dibuka langsung di browser, ponsel, atau aplikasi Google
                    Maps.
                  </dd>
                </div>
                <div>
                  <dt>Keterangan</dt>
                  <dd>
                    Cocok untuk memandu tamu, warga, dan pengunjung menuju Balai
                    Dusun Soka Mertelu.
                  </dd>
                </div>
              </dl>

              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buka di Google Maps
                </a>
                <a
                  className="button button-outline"
                  href={location.directionUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Rute ke Lokasi
                </a>
              </div>
            </article>

            <div className="map-card" data-reveal="zoom" data-lustre="">
              <iframe
                className="map-frame"
                title="Peta lokasi Padukuhan Soka"
                src={location.embedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
