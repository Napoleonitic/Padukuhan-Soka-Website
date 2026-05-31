<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Article;
use App\Models\GalleryItem;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@soka.test'],
            [
                'name' => 'Admin Soka',
                'email_verified_at' => now(),
                'is_admin' => true,
                'password' => Hash::make('admin12345'),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'warga@soka.test'],
            [
                'name' => 'Warga Soka',
                'email_verified_at' => now(),
                'is_admin' => false,
                'password' => Hash::make('password123'),
            ],
        );

        Article::query()->delete();
        Activity::query()->delete();
        GalleryItem::query()->delete();

        Article::query()->create([
            'title' => 'Musyawarah Warga Menyambut Musim Tanam',
            'slug' => 'musyawarah-warga-menyambut-musim-tanam',
            'excerpt' => 'Warga Padukuhan Soka menyusun agenda gotong royong irigasi dan pembagian jadwal tanam bersama.',
            'content' => 'Pertemuan warga digelar di balai padukuhan untuk menyusun persiapan musim tanam. Fokus utama tahun ini adalah penataan saluran air, jadwal tanam serempak, serta penguatan kerja sama antar-kelompok tani agar hasil panen lebih stabil.',
            'cover_image' => '/images/hero-village.jpg',
            'is_published' => true,
            'published_at' => now()->subDays(8),
        ]);

        Article::query()->create([
            'title' => 'Pelatihan Batik Tulis untuk Remaja Soka',
            'slug' => 'pelatihan-batik-tulis-untuk-remaja-soka',
            'excerpt' => 'Pelatihan ini dirancang untuk menjaga regenerasi perajin dan memperkenalkan motif khas Soka kepada generasi muda.',
            'content' => 'Kelompok pengrajin lokal membuka kelas akhir pekan untuk remaja. Materi meliputi pengenalan motif, teknik dasar mencanting, hingga proses pewarnaan alami yang ramah lingkungan.',
            'cover_image' => '/images/batik.jpg',
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);

        Article::query()->create([
            'title' => 'Camping Panguk Soka Siap Sambut Wisatawan Libur Panjang',
            'slug' => 'camping-panguk-soka-siap-sambut-wisatawan-libur-panjang',
            'excerpt' => 'Warga menyiapkan area camping, kebersihan jalur, dan titik pandang matahari terbit yang lebih nyaman.',
            'content' => 'Menjelang libur panjang, warga bersama karang taruna melakukan pembersihan area camping, pengecekan toilet, dan pemasangan papan penunjuk arah agar pengalaman wisata di Soka semakin aman dan menyenangkan.',
            'cover_image' => '/images/camping.jpg',
            'is_published' => true,
            'published_at' => now()->subDays(2),
        ]);

        Activity::query()->create([
            'title' => 'Pertanian dan Peternakan',
            'category' => 'Ekonomi Warga',
            'description' => 'Padi, palawija, dan ternak kambing menjadi sumber penghidupan utama sekaligus penguat ketahanan pangan keluarga.',
            'image' => '/images/hero-village.jpg',
            'event_date' => now()->subDays(14)->toDateString(),
        ]);

        Activity::query()->create([
            'title' => 'Sambatan dan Kerja Bakti',
            'category' => 'Gotong Royong',
            'description' => 'Tradisi sambatan tetap hidup melalui perbaikan jalan lingkungan, saluran air, dan fasilitas umum secara berkala.',
            'image' => '/images/camping.jpg',
            'event_date' => now()->subDays(10)->toDateString(),
        ]);

        Activity::query()->create([
            'title' => 'Pengajian Rutin Warga',
            'category' => 'Keagamaan',
            'description' => 'Masjid dan mushala menjadi pusat kegiatan keagamaan yang mempererat hubungan antarwarga dari berbagai usia.',
            'image' => '/images/hero-village.jpg',
            'event_date' => now()->subDays(7)->toDateString(),
        ]);

        Activity::query()->create([
            'title' => 'Kelas Kreatif Batik Anak',
            'category' => 'Pendidikan',
            'description' => 'Anak-anak dikenalkan pada budaya batik melalui aktivitas kreatif yang ringan, menyenangkan, dan membangun kebanggaan lokal.',
            'image' => '/images/batik.jpg',
            'event_date' => now()->subDays(3)->toDateString(),
        ]);

        GalleryItem::query()->create([
            'title' => 'Lanskap Soka',
            'caption' => 'Hamparan hijau dan suasana desa yang tenang.',
            'image_url' => '/images/hero-village.jpg',
        ]);

        GalleryItem::query()->create([
            'title' => 'Batik Tulis',
            'caption' => 'Warisan keterampilan yang dijaga lintas generasi.',
            'image_url' => '/images/batik.jpg',
        ]);

        GalleryItem::query()->create([
            'title' => 'Camping Panguk',
            'caption' => 'Ruang wisata alam dengan panorama perbukitan.',
            'image_url' => '/images/camping.jpg',
        ]);

        GalleryItem::query()->create([
            'title' => 'Rembuk Warga',
            'caption' => 'Musyawarah dan gotong royong tetap menjadi napas kampung.',
            'image_url' => '/images/hero-village.jpg',
        ]);

        GalleryItem::query()->create([
            'title' => 'Motif Soka',
            'caption' => 'Inspirasi alam hadir dalam tiap lembar batik.',
            'image_url' => '/images/batik.jpg',
        ]);

        GalleryItem::query()->create([
            'title' => 'Pagi di Bukit',
            'caption' => 'Kabut tipis dan cahaya matahari membuat suasana semakin khas.',
            'image_url' => '/images/camping.jpg',
        ]);
    }
}
