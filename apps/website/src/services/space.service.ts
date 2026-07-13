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

type CreateSpaceInput = {
  name: string;
  description: string;
  emoji: string;
  currency: string;
  owner_id: string;
};

export async function getSpaces(ownerId: string) {
  return supabase
    .from("spaces")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });
}

export async function createSpace(space: CreateSpaceInput) {
  const { data: createdSpace, error: spaceError } = await supabase
    .from("spaces")
    .insert({
      name: space.name,
      description: space.description || null,
      emoji: space.emoji,
      currency: space.currency || "AUD",
      owner_id: space.owner_id,
    })
    .select()
    .single();

  if (spaceError || !createdSpace) {
    return {
      data: null,
      error: spaceError,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name")
    .eq("id", space.owner_id)
    .single();

  if (profileError) {
    await supabase.from("spaces").delete().eq("id", createdSpace.id);

    return {
      data: null,
      error: profileError,
    };
  }

  const { data: authData } = await supabase.auth.getUser();
  const ownerEmail = authData.user?.email ?? null;

  const { error: memberError } = await supabase
    .from("space_members")
    .insert({
      space_id: createdSpace.id,
      user_id: space.owner_id,
      role: "owner",
      status: "active",
      email: ownerEmail,
      first_name: profile.first_name,
      last_name: profile.last_name,
      invited_by: space.owner_id,
    });

  if (memberError) {
    await supabase.from("spaces").delete().eq("id", createdSpace.id);

    return {
      data: null,
      error: memberError,
    };
  }

  return {
    data: createdSpace as Space,
    error: null,
  };
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