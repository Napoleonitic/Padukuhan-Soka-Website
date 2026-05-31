<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Padukuhan Soka')</title>
    <meta name="description" content="@yield('description', 'Portal resmi Padukuhan Soka dengan berita, kegiatan warga, galeri, dan akses admin.')">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script src="{{ asset('js/site.js') }}" defer></script>
</head>
<body class="site-body">
    @php($homeUrl = route('home'))

    <header class="site-header">
        <div class="container">
            <div class="nav-shell" data-reveal="down" data-lustre>
                <a class="brand" href="{{ route('home') }}">
                    <span class="brand-mark">S</span>
                    <span class="brand-copy">
                        <strong>Padukuhan Soka</strong>
                        <small>Mertelu, Gedangsari</small>
                    </span>
                </a>

                <nav class="site-nav" aria-label="Navigasi utama">
                    <a class="nav-link" href="{{ $homeUrl }}#profil">Profil</a>
                    <a class="nav-link" href="{{ $homeUrl }}#kegiatan">Kegiatan</a>
                    <a class="nav-link" href="{{ $homeUrl }}#berita">Berita</a>
                    <a class="nav-link" href="{{ $homeUrl }}#galeri">Galeri</a>
                    <a class="nav-link" href="{{ $homeUrl }}#kontak">Kontak</a>
                </nav>

                <div class="nav-actions">
                    <a class="button button-ghost" href="{{ $homeUrl }}#kontak">Hubungi</a>
                    @auth
                        @if (auth()->user()->is_admin)
                            <a class="button button-primary" href="{{ route('admin.dashboard') }}">Dashboard</a>
                        @endif
                    @else
                        <a class="button button-primary" href="{{ route('login') }}">Admin Login</a>
                    @endauth
                </div>
            </div>
        </div>
    </header>

    <main>
        @yield('content')
    </main>

    <footer id="kontak" class="footer">
        <div class="container footer-grid" data-reveal-group>
            <div data-reveal="left">
                <p class="eyebrow">Padukuhan Soka</p>
                <h2 class="section-title">Menjaga alam, merawat budaya, menyambut tamu.</h2>
            </div>
            <div class="info-panel" data-reveal="up" data-lustre>
                <strong>Alamat</strong>
                <p>Padukuhan Soka, Kalurahan Mertelu, Kapanewon Gedangsari, Gunungkidul, DI Yogyakarta.</p>
            </div>
            <div class="info-panel" data-reveal="up" data-lustre>
                <strong>Kontak</strong>
                <p>Email: soka@mertelu.id</p>
                <p>Telepon: +62 274 000 000</p>
            </div>
        </div>
        <div class="container footer-bottom" data-reveal-group>
            <span>&copy; {{ now()->year }} Padukuhan Soka</span>
            <a href="{{ route('login') }}" data-reveal="fade">Masuk Admin</a>
        </div>
    </footer>
</body>
</html>
