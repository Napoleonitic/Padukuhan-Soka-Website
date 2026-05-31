@extends('layouts.admin')

@section('title', 'Kelola Kegiatan | Admin Soka')
@section('heading', 'Kegiatan')
@section('subheading', 'Atur kegiatan warga sekaligus tambah atau ganti foto yang tampil di halaman utama.')

@section('content')
    <section class="table-card">
        <div class="table-actions">
            <div>
                <p class="eyebrow">Agenda Warga</p>
                <h2>Daftar kegiatan</h2>
            </div>
            <a class="button button-primary" href="{{ route('admin.activities.create') }}">Tambah kegiatan</a>
        </div>

        @if ($activities->isEmpty())
            <div class="empty-state">
                <h3>Belum ada kegiatan</h3>
                <p>Tambahkan aktivitas warga agar halaman publik lebih hidup.</p>
            </div>
        @else
            <div class="table-scroll">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Kegiatan</th>
                            <th>Kategori</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($activities as $activity)
                            <tr>
                                <td>
                                    <strong>{{ $activity->title }}</strong>
                                    <span>{{ \Illuminate\Support\Str::limit($activity->description, 90) }}</span>
                                </td>
                                <td>{{ $activity->category ?? 'Kegiatan warga' }}</td>
                                <td>{{ $activity->event_date?->format('d M Y') ?? '-' }}</td>
                                <td class="action-row">
                                    <a class="button button-outline" href="{{ route('admin.activities.edit', $activity) }}">Edit / Ganti Foto</a>
                                    <form method="POST" action="{{ route('admin.activities.destroy', $activity) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button class="button button-danger" type="submit" onclick="return confirm('Hapus kegiatan ini?')">Hapus</button>
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
