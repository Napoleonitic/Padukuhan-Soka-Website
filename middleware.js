import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
