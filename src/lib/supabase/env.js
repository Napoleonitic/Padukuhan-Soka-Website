const defaultSupabaseUrl = "https://weqdggpegwbtmabypqiw.supabase.co";
const defaultSupabasePublishableKey =
  "sb_publishable_lang9F0rAwQ84dxGbTS9Bg_bDaG6wwm";
const defaultStorageBucket = "soka-media";

export const storageBucket =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || defaultStorageBucket;

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl;
}

export function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    defaultSupabasePublishableKey
  );
}
