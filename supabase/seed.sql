delete from public.gallery_items;
delete from public.activities;
delete from public.articles;

insert into public.articles
  (title, slug, excerpt, content, cover_image, is_published, published_at, created_at, updated_at)
values
  (
    'Musyawarah Warga Menyambut Musim Tanam',
    'musyawarah-warga-menyambut-musim-tanam',
    'Warga Padukuhan Soka menyusun agenda gotong royong irigasi dan pembagian jadwal tanam bersama.',
    'Pertemuan warga digelar di balai padukuhan untuk menyusun persiapan musim tanam. Fokus utama tahun ini adalah penataan saluran air, jadwal tanam serempak, serta penguatan kerja sama antar-kelompok tani agar hasil panen lebih stabil.',
    '/images/hero-village.jpg',
    true,
    timezone('utc', now()) - interval '8 days',
    timezone('utc', now()) - interval '8 days',
    timezone('utc', now()) - interval '8 days'
  ),
  (
    'Pelatihan Batik Tulis untuk Remaja Soka',
    'pelatihan-batik-tulis-untuk-remaja-soka',
    'Pelatihan ini dirancang untuk menjaga regenerasi perajin dan memperkenalkan motif khas Soka kepada generasi muda.',
    'Kelompok pengrajin lokal membuka kelas akhir pekan untuk remaja. Materi meliputi pengenalan motif, teknik dasar mencanting, hingga proses pewarnaan alami yang ramah lingkungan.',
    '/images/batik.jpg',
    true,
    timezone('utc', now()) - interval '5 days',
    timezone('utc', now()) - interval '5 days',
    timezone('utc', now()) - interval '5 days'
  ),
  (
    'Camping Panguk Soka Siap Sambut Wisatawan Libur Panjang',
    'camping-panguk-soka-siap-sambut-wisatawan-libur-panjang',
    'Warga menyiapkan area camping, kebersihan jalur, dan titik pandang matahari terbit yang lebih nyaman.',
    'Menjelang libur panjang, warga bersama karang taruna melakukan pembersihan area camping, pengecekan toilet, dan pemasangan papan penunjuk arah agar pengalaman wisata di Soka semakin aman dan menyenangkan.',
    '/images/camping.jpg',
    true,
    timezone('utc', now()) - interval '2 days',
    timezone('utc', now()) - interval '2 days',
    timezone('utc', now()) - interval '2 days'
  );

insert into public.activities
  (title, category, description, image, event_date, created_at, updated_at)
values
  (
    'Pertanian dan Peternakan',
    'Ekonomi Warga',
    'Padi, palawija, dan ternak kambing menjadi sumber penghidupan utama sekaligus penguat ketahanan pangan keluarga.',
    '/images/hero-village.jpg',
    current_date - interval '14 days',
    timezone('utc', now()) - interval '14 days',
    timezone('utc', now()) - interval '14 days'
  ),
  (
    'Sambatan dan Kerja Bakti',
    'Gotong Royong',
    'Tradisi sambatan tetap hidup melalui perbaikan jalan lingkungan, saluran air, dan fasilitas umum secara berkala.',
    '/images/camping.jpg',
    current_date - interval '10 days',
    timezone('utc', now()) - interval '10 days',
    timezone('utc', now()) - interval '10 days'
  ),
  (
    'Pengajian Rutin Warga',
    'Keagamaan',
    'Masjid dan mushala menjadi pusat kegiatan keagamaan yang mempererat hubungan antarwarga dari berbagai usia.',
    '/images/hero-village.jpg',
    current_date - interval '7 days',
    timezone('utc', now()) - interval '7 days',
    timezone('utc', now()) - interval '7 days'
  ),
  (
    'Kelas Kreatif Batik Anak',
    'Pendidikan',
    'Anak-anak dikenalkan pada budaya batik melalui aktivitas kreatif yang ringan, menyenangkan, dan membangun kebanggaan lokal.',
    '/images/batik.jpg',
    current_date - interval '3 days',
    timezone('utc', now()) - interval '3 days',
    timezone('utc', now()) - interval '3 days'
  );

insert into public.gallery_items
  (title, caption, image_url, created_at, updated_at)
values
  ('Lanskap Soka', 'Hamparan hijau dan suasana desa yang tenang.', '/images/hero-village.jpg', timezone('utc', now()) - interval '10 days', timezone('utc', now()) - interval '10 days'),
  ('Batik Tulis', 'Warisan keterampilan yang dijaga lintas generasi.', '/images/batik.jpg', timezone('utc', now()) - interval '8 days', timezone('utc', now()) - interval '8 days'),
  ('Camping Panguk', 'Ruang wisata alam dengan panorama perbukitan.', '/images/camping.jpg', timezone('utc', now()) - interval '7 days', timezone('utc', now()) - interval '7 days'),
  ('Rembuk Warga', 'Musyawarah dan gotong royong tetap menjadi napas kampung.', '/images/hero-village.jpg', timezone('utc', now()) - interval '5 days', timezone('utc', now()) - interval '5 days'),
  ('Motif Soka', 'Inspirasi alam hadir dalam tiap lembar batik.', '/images/batik.jpg', timezone('utc', now()) - interval '4 days', timezone('utc', now()) - interval '4 days'),
  ('Pagi di Bukit', 'Kabut tipis dan cahaya matahari membuat suasana semakin khas.', '/images/camping.jpg', timezone('utc', now()) - interval '2 days', timezone('utc', now()) - interval '2 days');
