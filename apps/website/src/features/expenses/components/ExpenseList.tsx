"use client";

import { useEffect, useState } from "react";
import {
  getExpenses,
  type ExpenseWithPayer,
} from "@/features/expenses/services/expense.service";
import ExpenseSplitList from "./ExpenseSplitList";
import ExpenseStatusBadge from "./ExpenseStatusBadge";
import ExpenseDetailsDialog from "./ExpenseDetailsDialog";

type ExpenseListProps = {
  spaceId: string;
  refreshKey?: number;
};

export default function ExpenseList({
  spaceId,
  refreshKey = 0,
}: ExpenseListProps) {
  const [expenses, setExpenses] = useState<ExpenseWithPayer[]>([]);
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseWithPayer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpenses() {
      setLoading(true);

      const { data, error } = await getExpenses(spaceId);

      if (error) {
        console.error(error);
      }

      if (data) {
        setExpenses(data);
      }

      setLoading(false);
    }

    loadExpenses();
  }, [spaceId, refreshKey]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Expenses</h2>

        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-full">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-24 rounded bg-slate-200" />
                </div>

                <div className="h-4 w-20 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Expenses</h2>

        {expenses.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
            <div className="text-5xl">💸</div>

            <h3 className="mt-4 text-lg font-semibold">No expenses yet</h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Create your first shared expense to start tracking balances and
              settlements in this space.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {expenses.map((expense) => (
              <button
                key={expense.id}
                type="button"
                onClick={() => setSelectedExpense(expense)}
                className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{expense.title}</p>

                    <p className="mt-1 text-sm text-slate-500">
                      Paid by {expense.paidByName}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(expense.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {expense.currency || "AUD"} $
                      {Number(expense.amount).toFixed(2)}
                    </p>

                    <div className="mt-2">
                      <ExpenseStatusBadge status={expense.status} />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <ExpenseSplitList expenseId={expense.id} />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <ExpenseDetailsDialog
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />
    </>
  );
}