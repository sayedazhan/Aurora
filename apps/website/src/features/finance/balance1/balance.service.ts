import { createClient } from "@/lib/supabase/client";
import { calculateBalances } from "./calculateBalances";
import type {
  BalanceExpense,
  BalanceMember,
  MemberBalance,
} from "./types";

const supabase = createClient();

export async function getCalculatedBalances(
  spaceId: string
): Promise<{
  data: MemberBalance[] | null;
  error: Error | null;
}> {
  const { data: members, error: membersError } = await supabase
    .from("space_members")
    .select("id, first_name, last_name, email")
    .eq("space_id", spaceId);

  if (membersError) {
    return {
      data: null,
      error: new Error(membersError.message),
    };
  }

  const { data: expenses, error: expensesError } = await supabase
    .from("expenses")
    .select("id, amount, paid_by")
    .eq("space_id", spaceId);

  if (expensesError) {
    return {
      data: null,
      error: new Error(expensesError.message),
    };
  }

  const expenseIds = (expenses ?? []).map((expense) => expense.id);

  const { data: splits, error: splitsError } =
    expenseIds.length > 0
      ? await supabase
          .from("expense_splits")
          .select("expense_id, user_id, amount")
          .in("expense_id", expenseIds)
      : {
          data: [],
          error: null,
        };

  if (splitsError) {
    return {
      data: null,
      error: new Error(splitsError.message),
    };
  }

  const balanceMembers: BalanceMember[] = (members ?? []).map((member) => {
    const fullName =
      `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim();

    return {
      id: member.id,
      name: fullName || member.email || "Pending member",
    };
  });

 
  const splitsByExpense = new Map<
    string,
    {
      memberId: string;
      amount: number;
    }[]
  >();

  for (const split of splits ?? []) {
    const existing = splitsByExpense.get(split.expense_id) ?? [];

    existing.push({
      memberId: split.user_id,
      amount: Number(split.amount),
    });

    splitsByExpense.set(split.expense_id, existing);
  }

  const { data: payerMembers, error: payerMembersError } = await supabase
    .from("space_members")
    .select("id, user_id")
    .eq("space_id", spaceId);

  if (payerMembersError) {
    return {
      data: null,
      error: new Error(payerMembersError.message),
    };
  }

  const payerMemberMap = new Map(
    (payerMembers ?? [])
      .filter((member) => member.user_id)
      .map((member) => [member.user_id, member.id])
  );

  const balanceExpenses: BalanceExpense[] = (expenses ?? [])
    .map((expense) => {
      const paidByMemberId = payerMemberMap.get(expense.paid_by);

      if (!paidByMemberId) {
        return null;
      }

      return {
        id: expense.id,
        paidByMemberId,
        amount: Number(expense.amount),
        splits: splitsByExpense.get(expense.id) ?? [],
      };
    })
    .filter((expense): expense is BalanceExpense => expense !== null);

  const calculatedBalances = calculateBalances(
    balanceMembers,
    balanceExpenses
  );

  return {
    data: calculatedBalances,
    error: null,
  };
}