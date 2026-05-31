@extends('layouts.admin')

@section('title', 'Kelola Berita | Admin Soka')
@section('heading', 'Berita')
@section('subheading', 'Tambah, ubah, dan atur status berita, termasuk cover foto jika diperlukan.')

@section('content')
    <section class="table-card">
        <div class="table-actions">
            <div>
                <p class="eyebrow">Daftar Konten</p>
                <h2>Semua berita</h2>
            </div>
            <a class="button button-primary" href="{{ route('admin.articles.create') }}">Tambah berita</a>
        </div>

        @if ($articles->isEmpty())
            <div class="empty-state">
                <h3>Belum ada berita</h3>
                <p>Mulai isi portal dengan artikel atau pengumuman baru.</p>
            </div>
        @else
            <div class="table-scroll">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($articles as $article)
                            <tr>
                                <td>
                                    <strong>{{ $article->title }}</strong>
                                    <span>{{ $article->excerpt ? \Illuminate\Support\Str::limit($article->excerpt, 80) : 'Tanpa ringkasan.' }}</span>
                                </td>
                                <td>
                                    <span class="status-pill {{ $article->is_published ? 'status-live' : 'status-draft' }}">
                                        {{ $article->is_published ? 'Published' : 'Draft' }}
                                    </span>
                                </td>
                                <td>{{ optional($article->published_at)->format('d M Y') ?? $article->created_at->format('d M Y') }}</td>
                                <td class="action-row">
                                    <a class="button button-outline" href="{{ route('admin.articles.edit', $article) }}">Edit / Ganti Cover</a>
                                    <form method="POST" action="{{ route('admin.articles.destroy', $article) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button class="button button-danger" type="submit" onclick="return confirm('Hapus berita ini?')">Hapus</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </section>
@endsection
