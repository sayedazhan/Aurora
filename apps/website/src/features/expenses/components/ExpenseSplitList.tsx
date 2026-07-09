"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type ExpenseSplitStats = {
  total: number;
  settled: number;
  pending: number;
  progress: number;
};

type ExpenseSplit = {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  memberName: string;
};

type ExpenseSplitListProps = {
  expenseId: string;
  onStatsChange?: (stats: ExpenseSplitStats) => void;
};

export default function ExpenseSplitList({
  expenseId,
  onStatsChange,
}: ExpenseSplitListProps) {
  const [splits, setSplits] = useState<ExpenseSplit[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function loadSplits() {
      const { data, error } = await supabase
        .from("expense_splits")
        .select("*")
        .eq("expense_id", expenseId);

      if (error) {
        console.error(error);
        return;
      }

      const memberIds = [...new Set((data ?? []).map((split) => split.user_id))];

      const { data: members, error: membersError } = await supabase
        .from("space_members")
        .select("id, first_name, last_name, email")
        .in("id", memberIds);

      if (membersError) {
        console.error(membersError);
        return;
      }

      const memberMap = new Map(
        (members ?? []).map((member) => {
          const fullName = `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim();

          return [member.id, fullName || member.email || "Pending member"];
        })
      );

      const splitsWithNames: ExpenseSplit[] = (data ?? []).map((split) => ({
        ...split,
        memberName: memberMap.get(split.user_id) || "Pending member",
      }));

      const total = splitsWithNames.length;
      const settled = splitsWithNames.filter(
        (split) => split.status === "paid" || split.status === "settled"
      ).length;
      const pending = total - settled;
      const progress = total === 0 ? 0 : Math.round((settled / total) * 100);

      onStatsChange?.({
        total,
        settled,
        pending,
        progress,
      });

      setSplits(splitsWithNames);
    }

    loadSplits();
  }, [expenseId, onStatsChange]);

  return (
    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
      <h3 className="font-semibold">Outstanding Balances</h3>

      {splits.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No balances.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {splits.map((split) => (
            <div
              key={split.id}
              className="flex items-center justify-between rounded-xl bg-white p-3"
            >
              <div>
                <p className="font-medium">{split.memberName}</p>

                <p className="text-xs capitalize text-slate-500">
                  {split.status}
                </p>
              </div>

              <p className="font-semibold">
                AUD ${Number(split.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}