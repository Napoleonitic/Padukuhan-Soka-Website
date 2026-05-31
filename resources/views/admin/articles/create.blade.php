@extends('layouts.admin')

@section('title', 'Tambah Berita | Admin Soka')
@section('heading', 'Tambah Berita')
@section('subheading', 'Buat artikel baru untuk ditampilkan di portal publik.')

@section('content')
    <section class="form-card">
        @include('admin.articles._form', [
            'action' => route('admin.articles.store'),
            'method' => 'POST',
            'submitLabel' => 'Simpan berita',
        ])
    </section>
@endsection
