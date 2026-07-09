"use client";

import { useState } from "react";
import {
  createExpense,
  createExpenseSplit,
} from "@/features/expenses/services/expense.service";
import { splitExpenseEqual } from "@/features/expenses/utils/SplitEngine";

type AddExpenseFormProps = {
  spaceId: string;
  paidBy: string;
  participantIds: string[];
  currency?: string;
  onExpenseCreated?: () => void;
};

export default function AddExpenseForm({
  spaceId,
  paidBy,
  participantIds,
  currency = "AUD",
  onExpenseCreated,
}: AddExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!title.trim()) {
      setMessage("Enter an expense title.");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    if (!paidBy) {
      setMessage("Missing payer.");
      return;
    }

    if (participantIds.length === 0) {
      setMessage("Add at least one participant.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Creating expense...");

    const { data: expense, error } = await createExpense({
      space_id: spaceId,
      title: title.trim(),
      amount: numericAmount,
      paid_by: paidBy,
      currency,
    });

    if (error || !expense) {
      setMessage(error?.message || "Could not create expense.");
      setIsSubmitting(false);
      return;
    }

    const splits = splitExpenseEqual(numericAmount, participantIds);

    for (const split of splits) {
      const { error: splitError } = await createExpenseSplit({
        expense_id: expense.id,
        user_id: split.user_id,
        amount: split.amount,
        status: "pending",
      });

      if (splitError) {
        console.error(splitError);
      }
    }

    setTitle("");
    setAmount("");
    setMessage("Expense created.");
    setIsSubmitting(false);

    onExpenseCreated?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold tracking-tight">Add expense</h2>

      <div className="mt-5 grid gap-4">
        <input
          className="rounded-xl border border-slate-200 px-4 py-3"
          placeholder="Dinner"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="rounded-xl border border-slate-200 px-4 py-3"
          placeholder="Amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          disabled={isSubmitting}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
    </form>
  );
}