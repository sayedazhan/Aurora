import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Space = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  currency: string | null;
  created_at: string;
  updated_at: string;
};

export async function getSpaces(ownerId: string) {
  return supabase
    .from("spaces")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });
}

export async function createSpace(space: {
  name: string;
  description: string;
  emoji: string;
  currency: string;
  owner_id: string;
}) {
  return supabase.from("spaces").insert(space).select().single();
}

export async function getSpace(id: string) {
  return supabase
    .from("spaces")
    .select("*")
    .eq("id", id)
    .single();
}
export async function getLatestSpace(ownerId: string) {
  return supabase
    .from("spaces")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
}