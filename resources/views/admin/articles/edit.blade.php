@extends('layouts.admin')

@section('title', 'Edit Berita | Admin Soka')
@section('heading', 'Edit Berita')
@section('subheading', 'Perbarui isi, gambar, dan status publikasi berita.')

@section('content')
    <section class="form-card">
        @include('admin.articles._form', [
            'action' => route('admin.articles.update', $article),
            'method' => 'PUT',
            'submitLabel' => 'Perbarui berita',
        ])
    </section>
@endsection
