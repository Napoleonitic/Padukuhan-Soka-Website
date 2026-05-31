<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin Soka')</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="admin-body">
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <a class="admin-brand" href="{{ route('admin.dashboard') }}">
                <span class="brand-mark">S</span>
                <span class="brand-copy">
                    <strong>Admin Soka</strong>
                    <small>Kelola portal warga</small>
                </span>
            </a>

            <nav class="admin-nav" aria-label="Navigasi admin">
                <a class="{{ request()->routeIs('admin.dashboard') ? 'is-active' : '' }}" href="{{ route('admin.dashboard') }}">Dashboard</a>
                <a class="{{ request()->routeIs('admin.articles.*') ? 'is-active' : '' }}" href="{{ route('admin.articles.index') }}">Berita</a>
                <a class="{{ request()->routeIs('admin.activities.*') ? 'is-active' : '' }}" href="{{ route('admin.activities.index') }}">Kegiatan</a>
                <a class="{{ request()->routeIs('admin.gallery.*') ? 'is-active' : '' }}" href="{{ route('admin.gallery.index') }}">Galeri</a>
                <a href="{{ route('home') }}" target="_blank" rel="noreferrer">Lihat Website</a>
            </nav>

            <div class="admin-user-box">
                <strong>{{ auth()->user()->name }}</strong>
                <span>{{ auth()->user()->email }}</span>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="button button-outline button-block" type="submit">Keluar</button>
                </form>
            </div>
        </aside>

        <div class="admin-main">
            <header class="admin-header">
                <div>
                    <p class="eyebrow">Panel Admin</p>
                    <h1>@yield('heading', 'Dashboard')</h1>
                </div>
                <p class="admin-header-copy">@yield('subheading', 'Kelola konten Padukuhan Soka dengan tema Forest & Moss.')</p>
            </header>

            <div class="admin-content">
                @include('components.flash')
                @yield('content')
            </div>
        </div>
    </div>
</body>
</html>
