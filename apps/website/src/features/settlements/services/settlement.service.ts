import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type SpaceBalance = {
  id: string;
  space_id: string;
  member_id: string;
  total_paid: number;
  total_owed: number;
  balance: number;
  updated_at: string;
  memberName: string;
};

export async function refreshSpaceBalances(spaceId: string) {
  return supabase.rpc("refresh_space_balances", {
    p_space_id: spaceId,
  });
}

export async function getSpaceBalances(spaceId: string) {
  const { error: refreshError } = await refreshSpaceBalances(spaceId);

  if (refreshError) {
    return {
      data: null,
      error: refreshError,
    };
  }

  const { data: balances, error: balancesError } = await supabase
    .from("space_balances")
    .select("*")
    .eq("space_id", spaceId)
    .order("balance", { ascending: false });

  if (balancesError) {
    return {
      data: null,
      error: balancesError,
    };
  }

  const memberIds = [
    ...new Set((balances ?? []).map((balance) => balance.member_id)),
  ];

  if (memberIds.length === 0) {
    return {
      data: [] as SpaceBalance[],
      error: null,
    };
  }

  const { data: members, error: membersError } = await supabase
    .from("space_members")
    .select("id, first_name, last_name, email")
    .in("id", memberIds);

  if (membersError) {
    return {
      data: null,
      error: membersError,
    };
  }

  const memberMap = new Map(
    (members ?? []).map((member) => {
      const fullName =
        `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim();

      return [
        member.id,
        fullName || member.email || "Pending member",
      ];
    })
  );

  const enrichedBalances: SpaceBalance[] = (balances ?? []).map((balance) => ({
    ...balance,
    total_paid: Number(balance.total_paid),
    total_owed: Number(balance.total_owed),
    balance: Number(balance.balance),
    memberName: memberMap.get(balance.member_id) || "Pending member",
  }));

  return {
    data: enrichedBalances,
    error: null,
  };
}