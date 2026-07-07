"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Signing in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Log in to Aurora
        </h1>

        <p className="mt-2 text-slate-600">
          Continue to your financial workspace.
        </p>

        <div className="mt-8 grid gap-4">
          <input
            className="rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white">
            Log in
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}

        <p className="mt-6 text-sm text-slate-600">
          No account yet?{" "}
          <a className="font-semibold text-indigo-600" href="/register">
            Create one
          </a>
        </p>
      </form>
    </main>
  );
}