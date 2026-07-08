import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getMembers(spaceId: string) {
  return supabase
    .from("space_members")
    .select("*")
    .eq("space_id", spaceId);
}

export async function inviteMember(
  spaceId: string,
  email: string,
  invitedBy: string
) {
  return supabase
    .from("space_invitations")
    .insert({
      space_id: spaceId,
      email,
      invited_by: invitedBy,
    })
    .select()
    .single();
}

export async function getInvitations(spaceId: string) {
  return supabase
    .from("space_invitations")
    .select("*")
    .eq("space_id", spaceId)
    .order("created_at", { ascending: false });
}