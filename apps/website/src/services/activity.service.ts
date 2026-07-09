import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type SpaceActivity = {
  id: string;
  space_id: string;
  actor_id: string | null;
  type: string;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export async function getSpaceActivity(spaceId: string) {
  return supabase
    .from("space_activity")
    .select("*")
    .eq("space_id", spaceId)
    .order("created_at", { ascending: false });
}

export async function createSpaceActivity({
  spaceId,
  actorId,
  type,
  message,
  metadata = {},
}: {
  spaceId: string;
  actorId: string;
  type: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  return supabase.from("space_activity").insert({
    space_id: spaceId,
    actor_id: actorId,
    type,
    message,
    metadata,
  });
}