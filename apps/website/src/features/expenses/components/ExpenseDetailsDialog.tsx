"use client";

import { useCallback, useState } from "react";
import { FileText, Pencil, Trash2, X } from "lucide-react";
import type { ExpenseWithPayer } from "@/features/expenses/services/expense.service";
import ExpenseSplitList, {
  type ExpenseSplitStats,
} from "./ExpenseSplitList";
import ExpenseStatusBadge from "./ExpenseStatusBadge";

type ExpenseDetailsDialogProps = {
  expense: ExpenseWithPayer | null;
  onClose: () => void;
};

export default function ExpenseDetailsDialog({
  expense,
  onClose,
}: ExpenseDetailsDialogProps) {
  const [splitStats, setSplitStats] = useState<ExpenseSplitStats>({
    total: 0,
    settled: 0,
    pending: 0,
    progress: 0,
  });

  const handleStatsChange = useCallback((stats: ExpenseSplitStats) => {
    setSplitStats(stats);
  }, []);

  if (!expense) return null;

  const currency = expense.currency || "AUD";
  const formattedAmount = `${currency} $${Number(expense.amount).toFixed(2)}`;
  const createdDate = new Date(expense.created_at).toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                {expense.title}
              </h2>
              <ExpenseStatusBadge status={expense.status} />
            </div>

            <p className="mt-3 text-3xl font-semibold">{formattedAmount}</p>

            <p className="mt-2 text-sm text-slate-500">
              Paid by {expense.paidByName} · {createdDate}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="font-semibold">Description</h3>
          <p className="mt-2 text-sm text-slate-600">
            {expense.description || "No description added."}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Settlement Progress</h3>
            <span className="text-sm font-medium text-slate-500">
              {splitStats.progress}%
            </span>
          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-slate-950 transition-all"
              style={{ width: `${splitStats.progress}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {splitStats.settled} of {splitStats.total} members settled ·{" "}
            {splitStats.pending} pending
          </p>
        </div>

        <div className="mt-6">
          <ExpenseSplitList
            expenseId={expense.id}
            onStatsChange={handleStatsChange}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 p-4">
          <h3 className="font-semibold">Receipt</h3>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
            <FileText size={18} />
            No receipt uploaded.
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-400"
          >
            <Pencil size={16} />
            Edit Expense
          </button>

          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 rounded-full border border-red-100 px-5 py-3 text-sm font-semibold text-red-300"
          >
            <Trash2 size={16} />
            Delete Expense
          </button>
        </div>
      </div>
    </div>
  );
}