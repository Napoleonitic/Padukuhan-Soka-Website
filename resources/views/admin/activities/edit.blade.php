@extends('layouts.admin')

@section('title', 'Edit Kegiatan | Admin Soka')
@section('heading', 'Edit Kegiatan')
@section('subheading', 'Perbarui kategori, tanggal, deskripsi, dan foto kegiatan.')

@section('content')
    <section class="form-card">
        @include('admin.activities._form', [
            'action' => route('admin.activities.update', $activity),
            'method' => 'PUT',
            'submitLabel' => 'Perbarui kegiatan',
        ])
    </section>
@endsection
