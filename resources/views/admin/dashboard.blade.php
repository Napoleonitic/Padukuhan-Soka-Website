@extends('layouts.admin')

@section('title', 'Dashboard Admin | Padukuhan Soka')
@section('heading', 'Dashboard')
@section('subheading', 'Ringkasan konten dan akses cepat untuk mengelola portal desa.')

@section('content')
    <div class="metrics-grid">
        <article class="metric-card">
            <span>Total berita</span>
            <strong>{{ $articleCount }}</strong>
            <small>{{ $publishedCount }} sudah dipublikasikan</small>
        </article>
        <article class="metric-card">
            <span>Kegiatan</span>
            <strong>{{ $activityCount }}</strong>
            <small>Aktivitas warga tersimpan</small>
        </article>
        <article class="metric-card">
            <span>Galeri</span>
            <strong>{{ $galleryCount }}</strong>
            <small>Foto siap tampil di website</small>
        </article>
        <article class="metric-card">
            <span>Tema</span>
            <strong>Forest & Moss</strong>
            <small>Identitas visual baru website</small>
        </article>
    </div>

    <div class="admin-grid">
        <section class="table-card">
            <div class="table-actions">
                <div>
                    <p class="eyebrow">Terbaru</p>
                    <h2>Berita terkini</h2>
                </div>
                <a class="button button-primary" href="{{ route('admin.articles.create') }}">Tambah berita</a>
            </div>
            <div class="stack compact-stack">
                @forelse ($recentArticles as $article)
                    <div class="list-row">
                        <div>
                            <strong>{{ $article->title }}</strong>
                            <span>{{ $article->created_at->format('d M Y H:i') }}</span>
                        </div>
                        <span class="status-pill {{ $article->is_published ? 'status-live' : 'status-draft' }}">
                            {{ $article->is_published ? 'Published' : 'Draft' }}
                        </span>
                    </div>
                @empty
                    <p>Belum ada berita.</p>
                @endforelse
            </div>
        </section>

        <section class="table-card">
            <div class="table-actions">
                <div>
                    <p class="eyebrow">Kegiatan</p>
                    <h2>Agenda warga</h2>
                </div>
                <a class="button button-primary" href="{{ route('admin.activities.create') }}">Tambah kegiatan</a>
            </div>
            <div class="stack compact-stack">
                @forelse ($recentActivities as $activity)
                    <div class="list-row">
                        <div>
                            <strong>{{ $activity->title }}</strong>
                            <span>{{ $activity->event_date?->format('d M Y') ?? 'Tanpa tanggal' }}</span>
                        </div>
                        <span class="badge">{{ $activity->category ?? 'Kegiatan warga' }}</span>
                    </div>
                @empty
                    <p>Belum ada kegiatan.</p>
                @endforelse
            </div>
        </section>
    </div>
@endsection
