@extends('layouts.admin')

@section('title', 'Tambah Foto Galeri | Admin Soka')
@section('heading', 'Tambah Foto')
@section('subheading', 'Unggah gambar baru untuk memperkaya galeri website.')

@section('content')
    <section class="form-card">
        @include('admin.gallery._form', [
            'action' => route('admin.gallery.store'),
            'method' => 'POST',
            'submitLabel' => 'Simpan foto',
        ])
    </section>
@endsection
