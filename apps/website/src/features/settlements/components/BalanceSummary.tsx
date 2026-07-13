"use client";

import { useEffect, useState } from "react";
import {
  getCalculatedBalances,
} from "@/features/finance/balance1/balance.service";
import type {
  MemberBalance,
} from "@/features/finance/balance1/types";

type BalanceSummaryProps = {
  spaceId: string;
  refreshKey?: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Math.abs(value));
}

export default function BalanceSummary({
  spaceId,
  refreshKey = 0,
}: BalanceSummaryProps) {
  const [balances, setBalances] = useState<MemberBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadBalances() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await getCalculatedBalances(spaceId);

      if (error) {
        console.error(error);
        setErrorMessage(error.message || "Could not load balances.");
        setLoading(false);
        return;
      }

      setBalances(data ?? []);
      setLoading(false);
    }

    loadBalances();
  }, [spaceId, refreshKey]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Balances</h2>

        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl bg-slate-50 p-4"
            >
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-24 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Balances</h2>

        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Balances</h2>

        <p className="mt-1 text-sm text-slate-500">
          See who should receive money and who still owes.
        </p>
      </div>

      {balances.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <div className="text-4xl">⚖️</div>

          <h3 className="mt-3 font-semibold">No balances yet</h3>

          <p className="mt-2 text-sm text-slate-500">
            Add an expense to start calculating member balances.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {balances.map((member) => {
            const isPositive = member.balance > 0;
            const isNegative = member.balance < 0;

            return (
              <div
                key={member.memberId}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{member.memberName}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      Paid {formatCurrency(member.totalPaid)} · Owes{" "}
                      {formatCurrency(member.totalOwed)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        isPositive
                          ? "text-emerald-600"
                          : isNegative
                            ? "text-red-600"
                            : "text-slate-600"
                      }`}
                    >
                      {isPositive ? "+" : isNegative ? "-" : ""}
                      {formatCurrency(member.balance)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {isPositive
                        ? "Should receive"
                        : isNegative
                          ? "Owes"
                          : "Settled"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}