"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";

export async function logoutAction() {
  const { supabase } = await requireAdmin();

  await supabase.auth.signOut();

  redirect("/");
}
