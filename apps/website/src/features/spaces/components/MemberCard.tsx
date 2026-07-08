type MemberCardProps = {
  firstName: string;
  lastName: string;
  role: string;
  status: string;
};

export default function MemberCard({
  firstName,
  lastName,
  role,
  status,
}: MemberCardProps) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
          {initials}
        </div>

        <div>
          <p className="font-semibold">
            {firstName} {lastName}
          </p>

          <p className="text-sm text-slate-500">
            {role}
          </p>
        </div>
      </div>

      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        {status}
      </span>
    </div>
  );
}