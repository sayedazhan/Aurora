"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Plus, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getSpaces, type Space } from "@/services/space.service";

export default function SpacesPage() {
  const { user, loading } = useAuth();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);

  useEffect(() => {
    async function loadSpaces() {
      if (!user?.id) return;

      const { data, error } = await getSpaces(user.id);

      if (error) {
        console.error(error);
      }

      if (data) {
        setSpaces(data);
      }

      setIsLoadingSpaces(false);
    }

    loadSpaces();
  }, [user]);

  if (loading || isLoadingSpaces) {
    return <div className="p-6">Loading spaces...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-slate-500">Aurora Spaces</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Your financial spaces
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Organise money around the people, places and projects that matter.
          </p>
        </div>

        <Link
          href="/dashboard/spaces/new"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus size={16} />
          Create Space
        </Link>
      </div>

      {spaces.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Create your first Space
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Spaces help you organise shared money for homes, trips, families,
            clubs and projects.
          </p>

          <Link
            href="/dashboard/spaces/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            Create Space
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {spaces.map((space) => (
            <Link
              key={space.id}
              href={`/dashboard/spaces/${space.id}`}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="text-4xl">{space.emoji || "💼"}</div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Active
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                {space.name}
              </h2>

              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
                {space.description || "No description yet."}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div>
                  <p className="text-sm text-slate-500">Currency</p>
                  <p className="text-xl font-semibold">{space.currency}</p>
                </div>

                <div className="text-right">
                  <p className="flex items-center gap-1 text-sm text-slate-500">
                    <Users size={14} />1 member
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    Open <ArrowRight size={14} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}