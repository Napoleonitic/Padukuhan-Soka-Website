import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const adminEmail = process.env.SUPABASE_ADMIN_EMAIL || "admin@soka.id";
const adminPassword = process.env.SUPABASE_ADMIN_PASSWORD || "SokaAdmin2026!";
const adminName = process.env.SUPABASE_ADMIN_NAME || "Admin Soka";

if (!supabaseUrl || !publishableKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY wajib diisi.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, publishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function main() {
  const { data, error } = await supabase.auth.signUp({
    email: adminEmail,
    password: adminPassword,
    options: {
      data: {
        name: adminName,
      },
    },
  });

  if (error) {
    throw error;
  }

  console.log(`Email admin: ${adminEmail}`);
  console.log(`Password admin: ${adminPassword}`);

  if (data.session) {
    console.log("Akun admin berhasil dibuat dan bisa langsung login.");
    return;
  }

  console.log(
    "Akun admin berhasil didaftarkan. Jika belum bisa login, kemungkinan Confirm email masih aktif di Supabase dan email perlu dikonfirmasi dulu.",
  );
}

main().catch((error) => {
  console.error("Gagal mendaftarkan admin:", error.message || error);
  process.exit(1);
});
