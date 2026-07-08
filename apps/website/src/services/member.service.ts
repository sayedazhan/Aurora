import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type SpaceMember = {
  id: string;
  space_id: string;
  user_id: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string;
  status: string;
  invited_by: string | null;
  created_at: string;
};

export async function getSpaceMembers(spaceId: string) {
  return supabase
    .from("space_members")
    .select("*")
    .eq("space_id", spaceId)
    .order("created_at", { ascending: true });
}

export async function inviteSpaceMember({
  spaceId,
  email,
  firstName,
  lastName,
  role,
  invitedBy,
}: {
  spaceId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  invitedBy: string;
}) {
  return supabase.from("space_members").insert({
    space_id: spaceId,
    email,
    first_name: firstName,
    last_name: lastName,
    role,
    status: "Pending",
    invited_by: invitedBy,
  });
}