"use client";

import { useState } from "react";
import { inviteMember } from "@/features/spaces/services/member.service";

type InviteMemberFormProps = {
  spaceId: string;
  invitedBy: string;
};

export default function InviteMemberForm({
  spaceId,
  invitedBy,
}: InviteMemberFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    setMessage("Sending invitation...");

    const { error } = await inviteMember(spaceId, email, invitedBy);

    if (error) {
      setMessage(error.message);
      return;
    }

    setEmail("");
    setMessage("Invitation created.");
  }

  return (
    <form
      onSubmit={handleInvite}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold tracking-tight">Invite member</h2>
      <p className="mt-2 text-sm text-slate-600">
        Add someone to this Space so you can split expenses together.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          placeholder="member@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Invite
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
    </form>
  );
}