"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Testing...");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ error }) => {
      if (error) {
        setStatus(`Supabase error: ${error.message}`);
      } else {
        setStatus("Supabase connected successfully");
      }
    });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Aurora Supabase Test</h1>
        <p className="mt-4 text-slate-600">{status}</p>
      </div>
    </main>
  );
}