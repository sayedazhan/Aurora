"use client";

import { useEffect, useState } from "react";
import { ArrowRight, HandCoins } from "lucide-react";
import { getCalculatedBalances } from "@/features/finance/balance1/balance.service";
import { simplifySettlements } from "@/features/finance/settlement/simplifySettlements";
import type { Settlement } from "@/features/finance/settlement/types";

type SettlementSuggestionsProps = {
  spaceId: string;
  refreshKey?: number;
  currency?: string;
};

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
  }).format(value);
}

export default function SettlementSuggestions({
  spaceId,
  refreshKey = 0,
  currency = "AUD",
}: SettlementSuggestionsProps) {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSettlements() {
      setLoading(true);
      setErrorMessage("");

      const { data: balances, error } = await getCalculatedBalances(spaceId);

      if (error) {
        console.error(error);
        setErrorMessage(error.message || "Could not calculate settlements.");
        setLoading(false);
        return;
      }

      setSettlements(simplifySettlements(balances ?? []));
      setLoading(false);
    }

    loadSettlements();
  }, [spaceId, refreshKey]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Settle Up</h2>

        <div className="mt-6 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl bg-slate-50 p-4"
            >
              <div className="h-4 w-40 rounded bg-slate-200" />
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
        <h2 className="text-xl font-semibold">Settle Up</h2>
        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold">Settle Up</h2>
        <p className="mt-1 text-sm text-slate-500">
          Aurora has simplified the payments needed to balance this space.
        </p>
      </div>

      {settlements.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <HandCoins className="mx-auto text-slate-400" size={36} />

          <h3 className="mt-3 font-semibold">Everyone is settled</h3>

          <p className="mt-2 text-sm text-slate-500">
            There are no outstanding payments in this space.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {settlements.map((settlement, index) => (
            <div
              key={`${settlement.fromMemberId}-${settlement.toMemberId}-${index}`}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold">
                      {settlement.fromMemberName}
                    </p>
                    <p className="text-xs text-slate-500">Pays</p>
                  </div>

                  <ArrowRight className="text-slate-400" size={18} />

                  <div>
                    <p className="font-semibold">
                      {settlement.toMemberName}
                    </p>
                    <p className="text-xs text-slate-500">Receives</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-semibold">
                    {formatCurrency(settlement.amount, currency)}
                  </p>

                  <button
                    type="button"
                    disabled
                    className="mt-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-400"
                  >
                    Mark as settled
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}