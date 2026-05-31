@extends('layouts.site')

@section('title', 'Padukuhan Soka | Portal Resmi')
@section('description', 'Portal resmi Padukuhan Soka berisi profil, kegiatan warga, berita, galeri, dan akses admin Laravel.')

@section('content')
    <section class="hero" style="background-image: linear-gradient(180deg, rgba(16, 29, 22, 0.28), rgba(16, 29, 22, 0.88)), url('{{ asset('images/hero-village.jpg') }}');">
        <div class="hero-mist hero-mist-one" aria-hidden="true"></div>
        <div class="hero-mist hero-mist-two" aria-hidden="true"></div>
        <div class="container hero-inner" data-reveal-group>
            <p class="eyebrow hero-eyebrow" data-reveal="fade">Forest & Moss Portal</p>
            <h1 class="hero-title" data-reveal="up" data-parallax="0.09">Selamat datang di Padukuhan Soka.</h1>
            <p class="hero-copy" data-reveal="up" data-parallax="0.06">
                Desa yang memadukan lanskap hijau Gunungkidul, tradisi batik tulis, dan kebersamaan warga
                dalam satu portal yang kini dibangun dengan Laravel.
            </p>
            <div class="hero-actions" data-reveal="up">
                <a class="button button-primary" href="#profil">Jelajahi Soka</a>
                <a class="button button-secondary" href="#galeri">Lihat Galeri</a>
            </div>
        </div>
    </section>

    <section id="profil" class="section">
        <div class="container">
            <div class="split-head" data-reveal-group>
                <div data-reveal="left">
                    <p class="eyebrow">Profil & Potensi</p>
                    <h2 class="section-title" data-parallax="0.05">Tanah subur, budaya hidup, dan warga yang saling menguatkan.</h2>
                </div>
                <p class="section-copy" data-reveal="right">
                    Padukuhan Soka dikenal karena batik tulis, wisata Camping Panguk Soka, pertanian warga,
                    serta tradisi gotong royong yang masih terasa kuat.
                </p>
            </div>

            <div class="card-grid profile-grid" data-reveal-group>
                <article class="media-card media-card-large" data-reveal="zoom" data-parallax="0.08" data-lustre>
                    <img src="{{ asset('images/batik.jpg') }}" alt="Batik tulis Padukuhan Soka">
                    <div class="media-copy">
                        <span class="badge">Kerajinan Lokal</span>
                        <h3>Batik Tulis Soka</h3>
                        <p>Motif khas yang lahir dari alam sekitar dan dijaga sebagai identitas budaya warga.</p>
                    </div>
                </article>

                <article class="feature-card" data-reveal="right" data-lustre>
                    <span class="badge">Wisata Alam</span>
                    <h3>Camping Panguk Soka</h3>
                    <p>Area camping dengan panorama bukit dan udara pagi yang jadi daya tarik utama pengunjung.</p>
                </article>

                <article class="feature-card" data-reveal="right" data-lustre>
                    <span class="badge">Lokasi</span>
                    <h3>Gedangsari, Gunungkidul</h3>
                    <p>Terletak di Kalurahan Mertelu dengan suasana desa yang tenang dan akses yang terus berkembang.</p>
                </article>
            </div>

            <div class="stat-grid" data-reveal-group>
                <article class="stat-card" data-reveal="pop" data-lustre>
                    <strong>200+</strong>
                    <span>Kepala keluarga</span>
                </article>
                <article class="stat-card" data-reveal="pop" data-lustre>
                    <strong>12</strong>
                    <span>Pengrajin batik aktif</span>
                </article>
                <article class="stat-card" data-reveal="pop" data-lustre>
                    <strong>5 ha</strong>
                    <span>Lahan pertanian</span>
                </article>
                <article class="stat-card" data-reveal="pop" data-lustre>
                    <strong>1</strong>
                    <span>Wisata unggulan</span>
                </article>
            </div>
        </div>
    </section>

    <section id="kegiatan" class="section section-muted">
        <div class="container">
            <div class="split-head" data-reveal-group>
                <div data-reveal="left">
                    <p class="eyebrow">Kegiatan Warga</p>
                    <h2 class="section-title" data-parallax="0.04">Denyut harian yang membuat Soka tetap hangat dan hidup.</h2>
                </div>
                <p class="section-copy" data-reveal="right">
                    Aktivitas warga tersusun dari pertanian, kebersamaan sosial, pendidikan, dan agenda keagamaan.
                </p>
            </div>

            <div class="card-grid" data-reveal-group>
                @forelse ($activities as $activity)
                    <article class="feature-card" data-reveal="up" data-lustre>
                        @if ($activity->image)
                            <img class="inline-media" src="{{ $activity->image }}" alt="{{ $activity->title }}">
                        @endif
                        <span class="badge">{{ $activity->category ?? 'Kegiatan Warga' }}</span>
                        <h3>{{ $activity->title }}</h3>
                        <p>{{ $activity->description }}</p>
                        <small class="meta">{{ $activity->event_date?->format('d M Y') ?? 'Agenda warga' }}</small>
                    </article>
                @empty
                    <div class="empty-state" data-reveal="fade">
                        <h3>Belum ada kegiatan</h3>
                        <p>Tambahkan kegiatan dari panel admin agar tampil di halaman ini.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <section id="berita" class="section">
        <div class="container">
            <div class="split-head" data-reveal-group>
                <div data-reveal="left">
                    <p class="eyebrow">Berita & Pengumuman</p>
                    <h2 class="section-title" data-parallax="0.04">Kabar terbaru dari Padukuhan Soka.</h2>
                </div>
                <p class="section-copy" data-reveal="right">
                    Informasi terbaru warga, agenda padukuhan, dan perkembangan kegiatan desa dipublikasikan di sini.
                </p>
            </div>

            <div class="article-grid" data-reveal-group>
                @forelse ($articles as $article)
                    <article class="article-card" data-reveal="up" data-lustre>
                        @if ($article->cover_image)
                            <img class="article-media" src="{{ $article->cover_image }}" alt="{{ $article->title }}">
                        @endif
                        <div class="article-body">
                            <span class="meta">{{ optional($article->published_at)->format('d M Y') ?? $article->created_at->format('d M Y') }}</span>
                            <h3>{{ $article->title }}</h3>
                            <p>{{ $article->excerpt ?: \Illuminate\Support\Str::limit(strip_tags($article->content), 130) }}</p>
                            <a class="text-link" href="{{ route('articles.show', $article->slug) }}">Baca selengkapnya</a>
                        </div>
                    </article>
                @empty
                    <div class="empty-state" data-reveal="fade">
                        <h3>Belum ada berita dipublikasikan</h3>
                        <p>Berita yang diunggah dari panel admin akan muncul otomatis di sini.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

    <section id="galeri" class="section section-muted">
        <div class="container">
            <div class="split-head" data-reveal-group>
                <div data-reveal="left">
                    <p class="eyebrow">Galeri</p>
                    <h2 class="section-title" data-parallax="0.04">Wajah Soka dalam palet hijau dan cahaya pagi.</h2>
                </div>
                <p class="section-copy" data-reveal="right">
                    Dokumentasi kegiatan dan suasana kampung disusun dalam grid bergaya editorial agar terasa lebih hidup.
                </p>
            </div>

            <div class="gallery-grid" data-reveal-group>
                @forelse ($galleryItems as $galleryItem)
                    <figure class="gallery-card" data-reveal="zoom" data-lustre>
                        <img src="{{ $galleryItem->image_url }}" alt="{{ $galleryItem->title ?: 'Galeri Padukuhan Soka' }}">
                        @if ($galleryItem->title || $galleryItem->caption)
                            <figcaption class="gallery-caption">
                                @if ($galleryItem->title)
                                    <strong>{{ $galleryItem->title }}</strong>
                                @endif
                                @if ($galleryItem->caption)
                                    <span>{{ $galleryItem->caption }}</span>
                                @endif
                            </figcaption>
                        @endif
                    </figure>
                @empty
                    <div class="empty-state" data-reveal="fade">
                        <h3>Galeri masih kosong</h3>
                        <p>Unggah foto dari dashboard admin untuk menampilkan cerita visual desa.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </section>

@endsection
