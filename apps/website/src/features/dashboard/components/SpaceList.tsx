import SpaceCard from "./SpaceCard";
import type { Space } from "@/services/space.service";

export default function SpaceList({ spaces }: { spaces: Space[] }) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Recent Spaces</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Pick up where you left off
          </h2>
        </div>
      </div>

      {spaces.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="text-xl font-semibold">No spaces yet</h3>
          <p className="mt-2 text-slate-600">
            Create your first Space to start organising shared money.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              id={space.id}
              emoji={space.emoji || "💼"}
              name={space.name}
              description={space.description || "No description yet."}
              status="Active"
            />
          ))}
        </div>
      )}
    </section>
  );
}