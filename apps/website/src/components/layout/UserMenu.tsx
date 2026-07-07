"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export default function UserMenu() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      Logout
    </button>
  );
}