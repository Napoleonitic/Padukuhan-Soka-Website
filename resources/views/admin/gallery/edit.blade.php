@extends('layouts.admin')

@section('title', 'Edit Foto Galeri | Admin Soka')
@section('heading', 'Edit Foto')
@section('subheading', 'Perbarui judul, caption, atau ganti gambar galeri.')

@section('content')
    <section class="form-card">
        @include('admin.gallery._form', [
            'action' => route('admin.gallery.update', $galleryItem),
            'method' => 'PUT',
            'submitLabel' => 'Perbarui foto',
        ])
    </section>
@endsection
