@extends('layouts.admin')

@section('title', 'Kelola Galeri | Admin Soka')
@section('heading', 'Galeri')
@section('subheading', 'Tambah foto baru atau ganti foto yang sudah ada untuk galeri website.')

@section('content')
    <section class="table-card">
        <div class="table-actions">
            <div>
                <p class="eyebrow">Dokumentasi Foto</p>
                <h2>Galeri desa</h2>
            </div>
            <a class="button button-primary" href="{{ route('admin.gallery.create') }}">Tambah foto</a>
        </div>

        @if ($galleryItems->isEmpty())
            <div class="empty-state">
                <h3>Belum ada foto</h3>
                <p>Unggah dokumentasi agar halaman galeri langsung terisi.</p>
            </div>
        @else
            <div class="gallery-admin-grid">
                @foreach ($galleryItems as $galleryItem)
                    <article class="gallery-admin-card">
                        <img src="{{ $galleryItem->image_url }}" alt="{{ $galleryItem->title ?: 'Galeri Padukuhan Soka' }}">
                        <div class="gallery-admin-copy">
                            <strong>{{ $galleryItem->title ?: 'Tanpa judul' }}</strong>
                            <p>{{ $galleryItem->caption ?: 'Tanpa caption.' }}</p>
                            <div class="action-row">
                                <a class="button button-outline" href="{{ route('admin.gallery.edit', ['gallery' => $galleryItem]) }}">Edit / Ganti Foto</a>
                                <form method="POST" action="{{ route('admin.gallery.destroy', ['gallery' => $galleryItem]) }}">
                                    @csrf
                                    @method('DELETE')
                                    <button class="button button-danger" type="submit" onclick="return confirm('Hapus foto ini?')">Hapus</button>
                                </form>
                            </div>
                        </div>
                    </article>
                @endforeach
            </div>
        @endif
    </section>
@endsection
