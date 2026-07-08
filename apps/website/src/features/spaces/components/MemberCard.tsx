import MemberActionsMenu from "./MemberActionsMenu";

type MemberCardProps = {
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  onRemove?: () => void;
  onChangeRole?: (role: string) => void;
};

export default function MemberCard({
  firstName,
  lastName,
  role,
  status,
  onRemove,
  onChangeRole,
}: MemberCardProps) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`;
  const isPending = status === "Pending";

  const roleStyles = {
    Owner: "bg-violet-100 text-violet-700",
    Admin: "bg-blue-100 text-blue-700",
    Member: "bg-slate-100 text-slate-700",
  } as const;

  const roleClass =
    roleStyles[role as keyof typeof roleStyles] ??
    "bg-slate-100 text-slate-700";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full font-semibold ${
              isPending
                ? "bg-amber-100 text-amber-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {firstName} {lastName}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${roleClass}`}
              >
                {role}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isPending
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        <MemberActionsMenu
          status={status}
          currentRole={role}
          onRemove={onRemove}
          onChangeRole={onChangeRole}
        />
      </div>
    </div>
  );
}