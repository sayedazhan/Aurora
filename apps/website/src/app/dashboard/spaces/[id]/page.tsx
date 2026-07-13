"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Plus, Users, Wallet } from "lucide-react";
import { getSpace, type Space } from "@/services/space.service";
import { useAuth } from "@/hooks/useAuth";
import MemberList from "@/features/spaces/components/MemberList";
import ActivityTimeline from "@/features/spaces/components/ActivityTimeline";
import AddExpenseForm from "@/features/expenses/components/AddExpenseForm";
import ExpenseList from "@/features/expenses/components/ExpenseList";
import BalanceSummary from "@/features/settlements/components/BalanceSummary";

export default function SpacePage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [expenseRefreshKey, setExpenseRefreshKey] = useState(0);

  function refreshExpenses() {
    setExpenseRefreshKey((current) => current + 1);
  }

  function scrollToExpenseForm() {
    document
      .getElementById("expense-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToMembers() {
    document
      .getElementById("members-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToBalances() {
    document
      .getElementById("balances-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    async function loadSpace() {
      const { data, error } = await getSpace(id);

      if (error) {
        console.error(error);
      }

      if (data) {
        setSpace(data);
      }

      setLoading(false);
    }

    loadSpace();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading space...</div>;
  }

  if (!space) {
    return <div className="p-6">Space not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="text-6xl">{space.emoji}</div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              {space.name}
            </h1>

            <p className="mt-2 text-slate-600">
              {space.description || "No description yet."}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Wallet size={18} />
            {space.currency || "AUD"}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {new Date(space.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={scrollToExpenseForm}
          className="rounded-2xl bg-slate-950 p-5 text-white transition hover:bg-slate-800"
        >
          <Plus className="mx-auto mb-3" />
          Add Expense
        </button>

        <button
          type="button"
          onClick={scrollToMembers}
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Users className="mx-auto mb-3" />
          Invite Members
        </button>

        <button
          type="button"
          onClick={scrollToBalances}
          className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Wallet className="mx-auto mb-3" />
          Settle Up
        </button>
      </div>

      {user?.id && (
        <div id="expense-form" className="mt-8 scroll-mt-6">
          <AddExpenseForm
            spaceId={space.id}
            paidBy={user.id}
            participantIds={[user.id]}
            currency={space.currency || "AUD"}
            onExpenseCreated={refreshExpenses}
          />
        </div>
      )}

      <div id="balances-section" className="mt-8 scroll-mt-6">
        <BalanceSummary
          spaceId={space.id}
          refreshKey={expenseRefreshKey}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ExpenseList
          spaceId={space.id}
          refreshKey={expenseRefreshKey}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Aurora AI</h2>

          <p className="mt-6 text-slate-500">
            Ready to help organise this space.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ActivityTimeline spaceId={space.id} />
      </div>

      <div id="members-section" className="mt-8 scroll-mt-6">
        {user?.id && (
          <MemberList
            spaceId={space.id}
            currentUserId={user.id}
          />
        )}
      </div>
    </div>
  );
}