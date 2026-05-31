@extends('layouts.site')

@section('title', 'Login Admin | Padukuhan Soka')
@section('description', 'Masuk ke panel admin Laravel Padukuhan Soka untuk mengelola berita, kegiatan, dan galeri.')

@section('content')
    <section class="page-hero auth-shell">
        <div class="container auth-grid">
            <div>
                <p class="eyebrow">Admin Access</p>
                <h1 class="section-title">Masuk ke panel kelola Padukuhan Soka.</h1>
                <p class="section-copy">
                    Gunakan akun admin untuk menambah berita, memperbarui kegiatan warga, dan mengelola galeri foto.
                </p>
            </div>

            <div class="auth-card">
                @include('components.flash')

                <form method="POST" action="{{ route('login.store') }}" class="stack">
                    @csrf
                    <div class="field">
                        <label class="field-label" for="email">Email</label>
                        <input class="input" id="email" name="email" type="email" value="{{ old('email') }}" required autofocus>
                    </div>

                    <div class="field">
                        <label class="field-label" for="password">Kata sandi</label>
                        <input class="input" id="password" name="password" type="password" required>
                    </div>

                    <label class="checkbox-row">
                        <input type="checkbox" name="remember" value="1">
                        <span>Ingat saya di perangkat ini</span>
                    </label>

                    <button class="button button-primary button-block" type="submit">Masuk ke Dashboard</button>
                </form>
            </div>
        </div>
    </section>
@endsection
