import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.SUPABASE_ADMIN_EMAIL;
const adminPassword = process.env.SUPABASE_ADMIN_PASSWORD;
const adminName = process.env.SUPABASE_ADMIN_NAME || "Admin Soka";

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi sebelum menjalankan setup:admin.",
  );
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error(
    "SUPABASE_ADMIN_EMAIL dan SUPABASE_ADMIN_PASSWORD wajib diisi sebelum menjalankan setup:admin.",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function getExistingUserByEmail(email) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 200,
    });

    if (error) {
      throw error;
    }

    const foundUser = data.users.find((user) => user.email === email);

    if (foundUser) {
      return foundUser;
    }

    if (data.users.length < 200) {
      return null;
    }

    page += 1;
  }
}

async function main() {
  let user = await getExistingUserByEmail(adminEmail);

  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
      },
    });

    if (error) {
      throw error;
    }

    user = data.user;
  } else {
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        ...(user.user_metadata || {}),
        name: adminName,
      },
    });

    if (error) {
      throw error;
    }

    user = data.user;
  }

  const { error: adminError } = await supabase.from("admins").upsert({
    user_id: user.id,
    display_name: adminName,
  });

  if (adminError) {
    throw adminError;
  }

  console.log(`Admin siap dipakai: ${adminEmail} (${user.id})`);
}

main().catch((error) => {
  console.error("Gagal bootstrap admin:", error.message || error);
  process.exit(1);
});
