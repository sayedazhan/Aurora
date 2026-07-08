"use client";

import { useState } from "react";

type MemberActionsMenuProps = {
  status: string;
  currentRole: string;
  onChangeRole?: (role: string) => void;
  onRemove?: () => void;
  onResendInvite?: () => void;
};

export default function MemberActionsMenu({
  status,
  currentRole,
  onChangeRole,
  onRemove,
  onResendInvite,
}: MemberActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const isPending = status === "Pending";
  const roles = ["Owner", "Admin", "Member"];

  function handleRoleClick(role: string) {
    onChangeRole?.(role);
    setShowRoles(false);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <button
            type="button"
            onClick={() => setShowRoles((current) => !current)}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            Change role
          </button>

          {showRoles && (
            <div className="my-1 border-y border-slate-100 py-1">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleClick(role)}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100"
                >
                  {role === currentRole ? "✓ " : ""}
                  {role}
                </button>
              ))}
            </div>
          )}

          {isPending && (
            <button
              type="button"
              onClick={onResendInvite}
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
            >
              Resend invite
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Remove member
          </button>
        </div>
      )}
    </div>
  );
}