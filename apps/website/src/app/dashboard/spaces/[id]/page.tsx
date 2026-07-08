"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Plus, Users, Wallet } from "lucide-react";
import { getSpace, type Space } from "@/services/space.service";
import { useAuth } from "@/hooks/useAuth";
import MemberList from "@/features/spaces/components/MemberList";

export default function SpacePage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpace() {
      const { data, error } = await getSpace(id);

      if (error) console.error(error);
      if (data) setSpace(data);

      setLoading(false);
    }

    loadSpace();
  }, [id]);

  if (loading) return <div className="p-6">Loading Space...</div>;
  if (!space) return <div className="p-6">Space not found.</div>;

  return (
    <div className="p-6">
      {/* Space Header */}
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
            {space.currency}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} />
            {new Date(space.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <button className="rounded-2xl bg-slate-950 p-5 text-white">
          <Plus className="mx-auto mb-3" />
          Add Expense
        </button>

        <button className="rounded-2xl border border-slate-200 bg-white p-5">
          <Users className="mx-auto mb-3" />
          Invite Members
        </button>

        <button className="rounded-2xl border border-slate-200 bg-white p-5">
          Settle Up
        </button>
      </div>

      {/* Members */}
      {user?.id && (
        <div className="mt-8">
          <MemberList
            spaceId={space.id}
            currentUserId={user.id}
          />
        </div>
      )}

      {/* Bottom Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <p className="mt-6 text-slate-500">
            No expenses yet.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Aurora AI</h2>
          <p className="mt-6 text-slate-500">
            Ready to help organise this space.
          </p>
        </div>
      </div>
    </div>
  );
}