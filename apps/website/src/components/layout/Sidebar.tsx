"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Users,
  Sparkles,
  Target,
  Bell,
  Settings,
} from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { label: "Workspace", href: "/dashboard", icon: Home },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Groups", href: "/dashboard/groups", icon: Users },
  { label: "AI Coach", href: "/dashboard/ai", icon: Sparkles },
  { label: "Goals", href: "/dashboard/goals", icon: Target },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 md:block">
      <Logo />

      <nav className="mt-10 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}