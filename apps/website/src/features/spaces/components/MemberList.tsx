"use client";

import { useCallback, useEffect, useState } from "react";
import InviteMemberButton from "./InviteMemberButton";
import InviteMemberDialog from "./InviteMemberDialog";
import MemberCard from "./MemberCard";
import {
  getSpaceMembers,
  inviteSpaceMember,
  type SpaceMember,
} from "@/services/member.service";

type MemberListProps = {
  spaceId: string;
  currentUserId: string;
};

export default function MemberList({
  spaceId,
  currentUserId,
}: MemberListProps) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [members, setMembers] = useState<SpaceMember[]>([]);

  const loadMembers = useCallback(async () => {
    const { data, error } = await getSpaceMembers(spaceId);

    if (error) {
      console.error("Load members error:", error);
      alert(error.message);
      return;
    }

    setMembers(data ?? []);
  }, [spaceId]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  async function handleInviteMember(
    email: string,
    firstName: string,
    lastName: string,
    role: string
  ) {
    const { error } = await inviteSpaceMember({
      spaceId,
      email,
      firstName,
      lastName,
      role,
      invitedBy: currentUserId,
    });

    if (error) {
      console.error("Invite member error:", error);
      alert(error.message);
      return;
    }

    setInviteOpen(false);
    await loadMembers();
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Members</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage people who can access this space.
            </p>
          </div>

          <InviteMemberButton onClick={() => setInviteOpen(true)} />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-medium text-slate-700">
            Space Members
          </span>

          <span className="text-sm text-slate-500">
            {members.length} {members.length === 1 ? "Member" : "Members"}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              firstName={
                member.first_name ?? member.email?.split("@")[0] ?? "Member"
              }
              lastName={member.last_name ?? ""}
              role={member.role}
              status={member.status}
            />
          ))}
        </div>
      </section>

      <InviteMemberDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInviteMember}
      />
    </>
  );
}