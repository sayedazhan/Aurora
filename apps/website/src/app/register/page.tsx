"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
      });

      if (profileError) {
        setMessage(profileError.message);
        return;
      }
    }

    setMessage("Account created. Please check your email, then log in.");
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your Aurora account
        </h1>
        <p className="mt-2 text-slate-600">
          Start building your financial workspace.
        </p>

        <div className="mt-8 grid gap-4">
          <input
            className="rounded-xl border border-slate-200 px-4 py-3"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="rounded-xl border border-slate-200 px-4 py-3"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

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
            Create account
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <a className="font-semibold text-indigo-600" href="/login">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}