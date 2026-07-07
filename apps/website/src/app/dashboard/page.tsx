"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getMyProfile } from "@/services/profile";
import {
  getSpaces,
  getLatestSpace,
  type Space,
} from "@/services/space.service";

import WorkspaceHero from "@/features/dashboard/components/WorkspaceHero";
import QuickActions from "@/features/dashboard/components/QuickActions";
import AuroraAssist from "@/features/dashboard/components/AuroraAssist";
import ContinueCard from "@/features/dashboard/components/ContinueCard";
import SpaceList from "@/features/dashboard/components/SpaceList";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: string | null;
  status: string | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [latestSpace, setLatestSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user?.id) return;

    getMyProfile(user.id).then(({ data }) => {
      setProfile(data);
    });

    getSpaces(user.id).then(({ data }) => {
      if (data) setSpaces(data);
    });

    getLatestSpace(user.id).then(({ data }) => {
      if (data) setLatestSpace(data);
    });
  }, [user]);

  if (loading) {
    return <div className="p-6">Loading workspace...</div>;
  }

  if (!user) return null;

  return (
    <div className="p-6">
      <WorkspaceHero
        firstName={profile?.first_name}
        spaceCount={spaces.length}
      />

      <div className="mt-6">
        <QuickActions />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <ContinueCard space={latestSpace} />
        <AuroraAssist />
      </div>

      <div className="mt-6">
        <SpaceList spaces={spaces} />
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold tracking-tight">Recent activity</h2>

        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <p>Workspace created</p>
          <p>Supabase connected</p>
          <p>Spaces enabled</p>
        </div>
      </section>
    </div>
  );
}