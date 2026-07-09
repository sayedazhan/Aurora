"use client";

import { useEffect, useState } from "react";
import {
  getSpaceActivity,
  type SpaceActivity,
} from "@/services/activity.service";

type ActivityTimelineProps = {
  spaceId: string;
};

function getActivityIcon(type: string) {
  if (type === "member_invited") return "👤";
  if (type === "member_removed") return "❌";
  if (type === "member_role_changed") return "🛡️";

  return "📌";
}

export default function ActivityTimeline({
  spaceId,
}: ActivityTimelineProps) {
  const [activity, setActivity] = useState<SpaceActivity[]>([]);

  useEffect(() => {
    async function loadActivity() {
      const { data, error } = await getSpaceActivity(spaceId);

      if (error) {
        console.error("Load activity error:", error);
        return;
      }

      setActivity(data ?? []);
    }

    loadActivity();
  }, [spaceId]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold tracking-tight">
        Activity Timeline
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Recent changes in this space.
      </p>

      <div className="mt-6 space-y-4">
        {activity.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="text-3xl">📜</div>

            <h3 className="mt-3 font-semibold text-slate-900">
              No activity yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Everything that happens in this space will appear here.
            </p>
          </div>
        ) : (
          activity.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="text-xl">{getActivityIcon(item.type)}</div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {item.message}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}