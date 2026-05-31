# Padukuhan Soka Website

Portal resmi Padukuhan Soka berbasis Laravel. Proyek ini menyediakan:

- Halaman publik dengan tema `Forest & Moss`
- Login admin native Laravel
- Dashboard admin untuk mengelola berita, kegiatan, dan galeri
- Upload gambar ke storage lokal Laravel

## Stack

- PHP 8.2
- Laravel 12
- SQLite untuk pengembangan lokal
- Blade templates untuk frontend

## Menjalankan Proyek

1. Install dependency:

   ```bash
   composer install
   ```

2. Siapkan environment:

   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

3. Jalankan migrasi, seed, dan storage link:

   ```bash
   php artisan migrate:fresh --seed
   php artisan storage:link
   ```

4. Jalankan server lokal:

   ```bash
   php artisan serve
   ```

## Akun Admin Demo

- Email: `admin@soka.test`
- Password: `admin12345`

## Pengujian

```bash
php artisan test
```

## Struktur Konten

- `app/Http/Controllers/Admin` berisi controller CRUD admin
- `resources/views` berisi tampilan publik dan dashboard admin
- `database/seeders/DatabaseSeeder.php` berisi akun demo dan data awal
- `public/css/app.css` berisi tema visual website
