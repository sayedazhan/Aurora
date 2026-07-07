import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getMyProfile(userId: string) {
  return supabase
    .from("profiles")
    .select("id, first_name, last_name, phone, role, status")
    .eq("id", userId)
    .single();
}