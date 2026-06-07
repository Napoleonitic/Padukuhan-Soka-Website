# Padukuhan Soka Website

Versi ini sudah dipindahkan ke stack yang lebih cocok untuk deployment di Vercel:

- Next.js App Router untuk frontend dan route admin
- Supabase untuk database, auth, dan storage upload
- Vercel-friendly build pipeline dengan runtime Node

Sisa file Laravel lama yang tidak dipakai sudah dibersihkan, jadi repository ini sekarang fokus ke app Next.js + Supabase.

## Stack aktif

- Next.js 14
- React 18
- `@supabase/supabase-js`
- `@supabase/ssr`

## Menjalankan lokal

1. Install dependency:

   ```bash
   npm install
   ```

2. Siapkan environment:

   ```bash
   copy .env.example .env.local
   ```

3. `.env.local` sudah bisa memakai default Supabase project yang sekarang. Kalau mau override, isi variable berikut:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=soka-media
   SUPABASE_SERVICE_ROLE_KEY=...
   SUPABASE_ADMIN_EMAIL=admin@soka.id
   SUPABASE_ADMIN_PASSWORD=change-me-please
   SUPABASE_ADMIN_NAME=Admin Soka
   ```

4. Di Supabase SQL Editor, jalankan:

   - `supabase/schema.sql`
   - `supabase/admin-bootstrap.sql`
   - `supabase/seed.sql`

5. Buat akun admin awal:

   ```bash
   npm run setup:admin:public
   ```

   Jika kamu nanti punya `SUPABASE_SERVICE_ROLE_KEY`, kamu juga bisa pakai:

   ```bash
   npm run setup:admin
   ```

6. Jalankan app:

   ```bash
   npm run dev
   ```

## Deploy ke Vercel

Untuk build runtime dasar, app sekarang punya fallback URL dan publishable key Supabase di kode. Jadi Vercel tidak wajib diisi env variable production hanya untuk menampilkan site dan login admin.

Jika kamu meng-import folder parent `PADUKUHAN SOKA WEBSITE FINAL`, set `Root Directory` di Vercel ke:

```bash
Padukuhan-Soka-Website
```

`SUPABASE_SERVICE_ROLE_KEY` tetap opsional dan hanya dipakai untuk script bootstrap admin yang berjalan di lokal/server terpisah, bukan runtime frontend/admin biasa.

## Catatan Supabase

- Upload gambar baru masuk ke bucket `soka-media`
- Konten seed awal masih memakai asset lokal di `public/images`
- Auth admin memakai Supabase Auth, lalu akses admin divalidasi melalui tabel `public.admins`
- Middleware refresh session tidak dipakai, karena build Edge Middleware Vercel sempat gagal pada deploy. Validasi akses admin tetap dilakukan di server component dan server action.

## File penting

- `src/app` berisi route publik dan admin Next.js
- `src/lib` berisi auth, query data, upload media, dan helper Supabase
- `supabase/schema.sql` berisi tabel, RLS policy, dan storage policy
- `supabase/admin-bootstrap.sql` menandai `admin@soka.id` sebagai admin otomatis saat user auth dibuat
- `supabase/seed.sql` berisi data awal
- `scripts/register-admin.mjs` mendaftarkan akun admin awal memakai publishable key
- `scripts/bootstrap-admin.mjs` membuat akun admin awal memakai service role key
