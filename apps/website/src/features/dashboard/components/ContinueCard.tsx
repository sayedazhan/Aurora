import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Space } from "@/services/space.service";

type ContinueCardProps = {
  space: Space | null;
};

export default function ContinueCard({ space }: ContinueCardProps) {
  if (!space) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-500">
          Continue where you left off
        </p>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Create your first Space
        </h2>

        <p className="mt-3 text-slate-600">
          Start organising shared money for a home, trip, family, club or project.
        </p>

        <Link
          href="/dashboard/spaces/new"
          className="mt-6 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create Space
          <ArrowRight className="ml-2" size={16} />
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        Continue where you left off
      </p>

      <div className="mt-6 flex items-center gap-5">
        <div className="text-5xl">{space.emoji || "💼"}</div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {space.name}
          </h2>

          <p className="mt-2 text-slate-600">
            {space.description || "No description yet."}
          </p>
        </div>

        <Link
          href={`/dashboard/spaces/${space.id}`}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Open
          <ArrowRight className="ml-2 inline" size={16} />
        </Link>
      </div>
    </section>
  );
}