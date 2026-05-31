@extends('layouts.admin')

@section('title', 'Tambah Kegiatan | Admin Soka')
@section('heading', 'Tambah Kegiatan')
@section('subheading', 'Catat agenda baru untuk warga atau kegiatan unggulan desa.')

@section('content')
    <section class="form-card">
        @include('admin.activities._form', [
            'action' => route('admin.activities.store'),
            'method' => 'POST',
            'submitLabel' => 'Simpan kegiatan',
        ])
    </section>
@endsection
