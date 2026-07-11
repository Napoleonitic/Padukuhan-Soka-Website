export const siteName = "Padukuhan Soka";
export const siteDescription =
  "Portal resmi Padukuhan Soka berisi profil, kegiatan warga, berita, galeri, dan akses admin berbasis Supabase.";

export const villageLocation = {
  name: "Balai Dusun Soka Mertelu",
  address:
    "5JMH+54J, Soko, Mertelu, Kec. Gedang Sari, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta 55863",
  plusCode: "5JMH+54J",
  latitude: -7.8170375,
  longitude: 110.627765625,
};

export const siteContact = {
  phone: "+62 821-3323-6287",
  phoneHref: "tel:+6282133236287",
  whatsappUrl: "https://wa.me/6282133236287",
  email: "sukece.32@gmail.com",
  emailHref: "mailto:sukece.32@gmail.com",
};

export function getMapLinks() {
  const coordinates = `${villageLocation.latitude},${villageLocation.longitude}`;

  return {
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(coordinates),
    directionUrl:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(coordinates),
    embedUrl:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(coordinates) +
      "&z=18&output=embed",
  };
}
