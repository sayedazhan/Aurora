import Link from "next/link";
import { Plus, Users, Wallet } from "lucide-react";

const actions = [
  {
    label: "Create Space",
    href: "/dashboard/spaces/new",
    icon: Plus,
  },
  {
    label: "Invite",
    href: "/dashboard/spaces",
    icon: Users,
  },
  {
    label: "Settle",
    href: "/dashboard/spaces",
    icon: Wallet,
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Icon size={22} />
            </div>

            <p className="mt-5 font-semibold">{action.label}</p>
            <p className="mt-1 text-sm text-slate-500">Quick action</p>
          </Link>
        );
      })}
    </div>
  );
}