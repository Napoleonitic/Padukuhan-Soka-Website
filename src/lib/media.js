import { storageBucket, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/env";
import { slugify } from "@/lib/slug";

const localMediaPrefixes = ["/images/", "/favicon", "/js/", "/css/"];

export function resolveMediaUrl(value) {
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (!isSupabaseConfigured()) {
    return value;
  }

  return `${getSupabaseUrl()}/storage/v1/object/public/${storageBucket}/${value}`;
}

export function isLocalMedia(value) {
  if (!value) {
    return false;
  }

  return localMediaPrefixes.some((prefix) => value.startsWith(prefix));
}

export async function uploadMediaFile(supabase, file, folder) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return null;
  }

  const extension =
    file.name && file.name.includes(".")
      ? file.name.split(".").pop().toLowerCase()
      : "bin";
  const fileName = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
  const filePath = `${folder}/${fileName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(filePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return filePath;
}

export async function replaceMediaFile(supabase, file, currentValue, folder) {
  if (!file || file.size === 0) {
    return currentValue || null;
  }

  const nextValue = await uploadMediaFile(supabase, file, folder);

  await deleteMediaFile(supabase, currentValue);

  return nextValue;
}

export async function deleteMediaFile(supabase, value) {
  const storagePath = extractStoragePath(value);

  if (!storagePath) {
    return;
  }

  const { error } = await supabase.storage
    .from(storageBucket)
    .remove([storagePath]);

  if (error) {
    throw error;
  }
}

export function extractStoragePath(value) {
  if (!value || isLocalMedia(value)) {
    return null;
  }

  if (!value.startsWith("http://") && !value.startsWith("https://")) {
    return value.replace(/^\/+/, "");
  }

  try {
    const url = new URL(value);
    const marker = `/storage/v1/object/public/${storageBucket}/`;

    if (!url.pathname.includes(marker)) {
      return null;
    }

    return decodeURIComponent(url.pathname.split(marker)[1] || "");
  } catch {
    return null;
  }
}
