import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SpaceCardProps = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  status: string;
};

export default function SpaceCard({
  id,
  emoji,
  name,
  description,
  status,
}: SpaceCardProps) {
  return (
    <Link
      href={`/dashboard/spaces/${id}`}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{emoji}</div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight">{name}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
        Open Space <ArrowRight size={14} />
      </p>
    </Link>
  );
}