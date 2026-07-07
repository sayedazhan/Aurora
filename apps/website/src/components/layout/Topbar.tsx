"use client";

import UserMenu from "./UserMenu";

export default function Topbar() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Welcome back</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your financial workspace
          </h1>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}