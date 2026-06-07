import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { formatErrorMessage } from "@/lib/format";
import { deleteMediaFile, replaceMediaFile, uploadMediaFile } from "@/lib/media";
import { slugify } from "@/lib/slug";

async function ensureUniqueSlug(supabase, title, ignoreId = null) {
  const baseSlug = slugify(title);
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug")
    .ilike("slug", `${baseSlug}%`);

  if (error) {
    throw error;
  }

  const usedSlugs = new Set(
    (data || [])
      .filter((item) => (ignoreId ? item.id !== ignoreId : true))
      .map((item) => item.slug),
  );

  if (!usedSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let suffix = 2;

  while (usedSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseSlug}-${suffix}`;
}

function normalizeBoolean(value) {
  return value === "on" || value === "true" || value === "1" || value === 1;
}

export async function getAdminDashboardData() {
  noStore();

  const { supabase, user, admin } = await requireAdmin();

  const [{ count: articleCount }, { count: publishedCount }, { count: activityCount }, { count: galleryCount }, { data: recentArticles }, { data: recentActivities }] =
    await Promise.all([
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true),
      supabase.from("activities").select("*", { count: "exact", head: true }),
      supabase.from("gallery_items").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*").order("created_at", { ascending: false }).limit(4),
      supabase
        .from("activities")
        .select("*")
        .order("event_date", { ascending: false, nullsFirst: false })
        .order("id", { ascending: false })
        .limit(4),
    ]);

  return {
    user,
    admin,
    articleCount: articleCount || 0,
    publishedCount: publishedCount || 0,
    activityCount: activityCount || 0,
    galleryCount: galleryCount || 0,
    recentArticles: recentArticles || [],
    recentActivities: recentActivities || [],
  };
}

export async function getAdminArticles() {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    articles: data || [],
  };
}

export async function getAdminArticle(id) {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    article: data,
  };
}

export async function getAdminActivities() {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("event_date", { ascending: false, nullsFirst: false })
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    activities: data || [],
  };
}

export async function getAdminActivity(id) {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    activity: data,
  };
}

export async function getAdminGalleryItems() {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    galleryItems: data || [],
  };
}

export async function getAdminGalleryItem(id) {
  noStore();

  const { supabase, user, admin } = await requireAdmin();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return {
    user,
    admin,
    galleryItem: data,
  };
}

function redirectWithMessage(path, type, message) {
  const target = new URL(path, "http://localhost");
  target.searchParams.set(type, message);
  return target.pathname + target.search;
}

export async function createArticle(formData) {
  "use server";

  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = normalizeBoolean(formData.get("is_published"));
  const coverFile = formData.get("cover_image");

  if (!title || !content) {
    redirect(
      redirectWithMessage(
        "/admin/articles/new",
        "error",
        "Judul dan konten wajib diisi.",
      ),
    );
  }

  try {
    const slug = await ensureUniqueSlug(supabase, title);
    const coverImage =
      coverFile && coverFile.size > 0
        ? await uploadMediaFile(supabase, coverFile, "articles")
        : null;

    const { error } = await supabase.from("articles").insert({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image: coverImage,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    });

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/articles");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/articles/new",
        "error",
        formatErrorMessage(error, "Berita gagal ditambahkan."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/articles",
      "success",
      "Berita berhasil ditambahkan.",
    ),
  );
}

export async function updateArticle(id, formData) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = normalizeBoolean(formData.get("is_published"));
  const coverFile = formData.get("cover_image");

  if (!title || !content) {
    redirect(
      redirectWithMessage(
        `/admin/articles/${numericId}/edit`,
        "error",
        "Judul dan konten wajib diisi.",
      ),
    );
  }

  try {
    const { data: currentArticle, error: currentError } = await supabase
      .from("articles")
      .select("*")
      .eq("id", numericId)
      .maybeSingle();

    if (currentError || !currentArticle) {
      throw new Error("Berita tidak ditemukan.");
    }

    const nextSlug =
      currentArticle.title === title
        ? currentArticle.slug
        : await ensureUniqueSlug(supabase, title, numericId);

    const coverImage = await replaceMediaFile(
      supabase,
      coverFile,
      currentArticle.cover_image,
      "articles",
    );

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        slug: nextSlug,
        excerpt: excerpt || null,
        content,
        cover_image: coverImage,
        is_published: isPublished,
        published_at: isPublished
          ? currentArticle.published_at || new Date().toISOString()
          : null,
      })
      .eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath(`/berita/${nextSlug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/articles");
  } catch (error) {
    redirect(
      redirectWithMessage(
        `/admin/articles/${numericId}/edit`,
        "error",
        formatErrorMessage(error, "Berita gagal diperbarui."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/articles",
      "success",
      "Berita berhasil diperbarui.",
    ),
  );
}

export async function deleteArticle(id) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();

  try {
    const { data: article, error: articleError } = await supabase
      .from("articles")
      .select("slug, cover_image")
      .eq("id", numericId)
      .maybeSingle();

    if (articleError || !article) {
      throw new Error("Berita tidak ditemukan.");
    }

    await deleteMediaFile(supabase, article.cover_image);

    const { error } = await supabase.from("articles").delete().eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath(`/berita/${article.slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/articles");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/articles",
        "error",
        formatErrorMessage(error, "Berita gagal dihapus."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/articles",
      "success",
      "Berita berhasil dihapus.",
    ),
  );
}

export async function createActivity(formData) {
  "use server";

  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const eventDate = String(formData.get("event_date") || "").trim();
  const imageFile = formData.get("image");

  if (!title || !description) {
    redirect(
      redirectWithMessage(
        "/admin/activities/new",
        "error",
        "Judul kegiatan dan deskripsi wajib diisi.",
      ),
    );
  }

  try {
    const image =
      imageFile && imageFile.size > 0
        ? await uploadMediaFile(supabase, imageFile, "activities")
        : null;

    const { error } = await supabase.from("activities").insert({
      title,
      category: category || null,
      description,
      event_date: eventDate || null,
      image,
    });

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/activities");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/activities/new",
        "error",
        formatErrorMessage(error, "Kegiatan gagal ditambahkan."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/activities",
      "success",
      "Kegiatan berhasil ditambahkan.",
    ),
  );
}

export async function updateActivity(id, formData) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const eventDate = String(formData.get("event_date") || "").trim();
  const imageFile = formData.get("image");

  if (!title || !description) {
    redirect(
      redirectWithMessage(
        `/admin/activities/${numericId}/edit`,
        "error",
        "Judul kegiatan dan deskripsi wajib diisi.",
      ),
    );
  }

  try {
    const { data: currentActivity, error: currentError } = await supabase
      .from("activities")
      .select("*")
      .eq("id", numericId)
      .maybeSingle();

    if (currentError || !currentActivity) {
      throw new Error("Kegiatan tidak ditemukan.");
    }

    const image = await replaceMediaFile(
      supabase,
      imageFile,
      currentActivity.image,
      "activities",
    );

    const { error } = await supabase
      .from("activities")
      .update({
        title,
        category: category || null,
        description,
        event_date: eventDate || null,
        image,
      })
      .eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/activities");
  } catch (error) {
    redirect(
      redirectWithMessage(
        `/admin/activities/${numericId}/edit`,
        "error",
        formatErrorMessage(error, "Kegiatan gagal diperbarui."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/activities",
      "success",
      "Kegiatan berhasil diperbarui.",
    ),
  );
}

export async function deleteActivity(id) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();

  try {
    const { data: activity, error: activityError } = await supabase
      .from("activities")
      .select("image")
      .eq("id", numericId)
      .maybeSingle();

    if (activityError || !activity) {
      throw new Error("Kegiatan tidak ditemukan.");
    }

    await deleteMediaFile(supabase, activity.image);

    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/activities");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/activities",
        "error",
        formatErrorMessage(error, "Kegiatan gagal dihapus."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/activities",
      "success",
      "Kegiatan berhasil dihapus.",
    ),
  );
}

export async function createGalleryItem(formData) {
  "use server";

  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  const imageFile = formData.get("image");

  if (!imageFile || imageFile.size === 0) {
    redirect(
      redirectWithMessage(
        "/admin/gallery/new",
        "error",
        "Gambar wajib diunggah.",
      ),
    );
  }

  try {
    const imagePath = await uploadMediaFile(supabase, imageFile, "gallery");

    const { error } = await supabase.from("gallery_items").insert({
      title: title || null,
      caption: caption || null,
      image_url: imagePath,
    });

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/gallery");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/gallery/new",
        "error",
        formatErrorMessage(error, "Foto galeri gagal ditambahkan."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/gallery",
      "success",
      "Foto galeri berhasil ditambahkan.",
    ),
  );
}

export async function updateGalleryItem(id, formData) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();

  try {
    const { data: currentItem, error: currentError } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("id", numericId)
      .maybeSingle();

    if (currentError || !currentItem) {
      throw new Error("Foto galeri tidak ditemukan.");
    }

    const title = String(formData.get("title") || "").trim();
    const caption = String(formData.get("caption") || "").trim();
    const imageFile = formData.get("image");

    const imageUrl = await replaceMediaFile(
      supabase,
      imageFile,
      currentItem.image_url,
      "gallery",
    );

    const { error } = await supabase
      .from("gallery_items")
      .update({
        title: title || null,
        caption: caption || null,
        image_url: imageUrl,
      })
      .eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/gallery");
  } catch (error) {
    redirect(
      redirectWithMessage(
        `/admin/gallery/${numericId}/edit`,
        "error",
        formatErrorMessage(error, "Foto galeri gagal diperbarui."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/gallery",
      "success",
      "Foto galeri berhasil diperbarui.",
    ),
  );
}

export async function deleteGalleryItem(id) {
  "use server";

  const numericId = Number(id);
  const { supabase } = await requireAdmin();

  try {
    const { data: item, error: itemError } = await supabase
      .from("gallery_items")
      .select("image_url")
      .eq("id", numericId)
      .maybeSingle();

    if (itemError || !item) {
      throw new Error("Foto galeri tidak ditemukan.");
    }

    await deleteMediaFile(supabase, item.image_url);

    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", numericId);

    if (error) {
      throw error;
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/gallery");
  } catch (error) {
    redirect(
      redirectWithMessage(
        "/admin/gallery",
        "error",
        formatErrorMessage(error, "Foto galeri gagal dihapus."),
      ),
    );
  }

  redirect(
    redirectWithMessage(
      "/admin/gallery",
      "success",
      "Foto galeri berhasil dihapus.",
    ),
  );
}
