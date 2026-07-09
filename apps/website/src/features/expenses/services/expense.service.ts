import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type ExpenseStatus = "settled" | "unsettled" | "partial";

export type Expense = {
  id: string;
  space_id: string;
  title: string;
  description: string | null;
  amount: number;
  paid_by: string;
  currency: string | null;
  created_at: string;
};

export type ExpenseWithPayer = Expense & {
  paidByName: string;
  status: ExpenseStatus;
};

export type ExpenseSplit = {
  id: string;
  expense_id: string;
  user_id: string;
  amount: number;
  status: string | null;
  created_at: string;
};

function calculateExpenseStatus(splits: ExpenseSplit[]): ExpenseStatus {
  if (splits.length === 0) {
    return "unsettled";
  }

  const settledCount = splits.filter(
    (split) => split.status === "paid" || split.status === "settled"
  ).length;

  if (settledCount === 0) {
    return "unsettled";
  }

  if (settledCount === splits.length) {
    return "settled";
  }

  return "partial";
}

export async function getExpenses(spaceId: string) {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("space_id", spaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error };
  }

  const payerIds = [
    ...new Set((expenses ?? []).map((expense) => expense.paid_by)),
  ];

  const expenseIds = [
    ...new Set((expenses ?? []).map((expense) => expense.id)),
  ];

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name")
    .in("id", payerIds);

  if (profilesError) {
    return { data: null, error: profilesError };
  }

  const { data: splits, error: splitsError } = await supabase
    .from("expense_splits")
    .select("*")
    .in("expense_id", expenseIds);

  if (splitsError) {
    return { data: null, error: splitsError };
  }

  const profileMap = new Map(
    (profiles ?? []).map((profile) => [
      profile.id,
      `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim(),
    ])
  );

  const splitsByExpenseId = new Map<string, ExpenseSplit[]>();

  for (const split of splits ?? []) {
    const existing = splitsByExpenseId.get(split.expense_id) ?? [];
    splitsByExpenseId.set(split.expense_id, [...existing, split]);
  }

  const expensesWithPayers: ExpenseWithPayer[] = (expenses ?? []).map(
    (expense) => {
      const expenseSplits = splitsByExpenseId.get(expense.id) ?? [];

      return {
        ...expense,
        paidByName: profileMap.get(expense.paid_by) || "Unknown member",
        status: calculateExpenseStatus(expenseSplits),
      };
    }
  );

  return { data: expensesWithPayers, error: null };
}

export async function createExpense(expense: {
  space_id: string;
  title: string;
  description?: string;
  amount: number;
  paid_by: string;
  currency?: string;
}) {
  return supabase
    .from("expenses")
    .insert({
      space_id: expense.space_id,
      title: expense.title,
      description: expense.description ?? null,
      amount: expense.amount,
      paid_by: expense.paid_by,
      currency: expense.currency ?? "AUD",
    })
    .select()
    .single();
}

export async function createExpenseSplit(split: {
  expense_id: string;
  user_id: string;
  amount: number;
  status?: string;
}) {
  return supabase
    .from("expense_splits")
    .insert({
      expense_id: split.expense_id,
      user_id: split.user_id,
      amount: split.amount,
      status: split.status ?? "pending",
    })
    .select()
    .single();
}