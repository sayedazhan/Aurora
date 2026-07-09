"use client";

import { useCallback, useEffect, useState } from "react";
import InviteMemberButton from "./InviteMemberButton";
import InviteMemberDialog from "./InviteMemberDialog";
import MemberCard from "./MemberCard";
import { createSpaceActivity } from "@/services/activity.service";
import {
  getSpaceMembers,
  inviteSpaceMember,
  removeSpaceMember,
  updateSpaceMemberRole,
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

  const activeCount = members.filter(
    (member) => member.status === "Active"
  ).length;

  const pendingCount = members.filter(
    (member) => member.status === "Pending"
  ).length;

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

    await createSpaceActivity({
      spaceId,
      actorId: currentUserId,
      type: "member_invited",
      message: `${firstName} ${lastName || ""} was invited as ${role}`.trim(),
      metadata: {
        email,
        role,
      },
    });

    setInviteOpen(false);
    await loadMembers();
  }

  async function handleRemoveMember(memberId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmed) return;

    const { error } = await removeSpaceMember(memberId);

    if (error) {
      console.error("Remove member error:", error);
      alert(error.message);
      return;
    }

    await createSpaceActivity({
      spaceId,
      actorId: currentUserId,
      type: "member_removed",
      message: "A member was removed from the space",
      metadata: {
        memberId,
      },
    });

    await loadMembers();
  }

  async function handleChangeRole(memberId: string, role: string) {
    const { error } = await updateSpaceMemberRole(memberId, role);

    if (error) {
      console.error("Update role error:", error);
      alert(error.message);
      return;
    }

    await createSpaceActivity({
      spaceId,
      actorId: currentUserId,
      type: "member_role_changed",
      message: `A member role was changed to ${role}`,
      metadata: {
        memberId,
        role,
      },
    });

    await loadMembers();
  }

  return (
    <>
      <section
  id="members-section"
  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Members
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage people who can access this space.
            </p>
          </div>

          <InviteMemberButton onClick={() => setInviteOpen(true)} />
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <div className="grid gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Total
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {members.length}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Active
              </p>
              <p className="mt-1 text-2xl font-semibold text-green-600">
                {activeCount}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Pending
              </p>
              <p className="mt-1 text-2xl font-semibold text-amber-600">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-700">
            Space Members
          </p>
        </div>

        <div className="mt-4 space-y-4">
          {members.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <div className="text-3xl">👥</div>

              <h3 className="mt-3 font-semibold text-slate-900">
                No members yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Invite family, friends or teammates to start collaborating.
              </p>

              <div className="mt-4">
                <InviteMemberButton onClick={() => setInviteOpen(true)} />
              </div>
            </div>
          ) : (
            members.map((member) => (
              <MemberCard
                key={member.id}
                firstName={
                  member.first_name ??
                  member.email?.split("@")[0] ??
                  "Member"
                }
                lastName={member.last_name ?? ""}
                role={member.role}
                status={member.status}
                onRemove={() => handleRemoveMember(member.id)}
                onChangeRole={(role) =>
                  handleChangeRole(member.id, role)
                }
              />
            ))
          )}
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