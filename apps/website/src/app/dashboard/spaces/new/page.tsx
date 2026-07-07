"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSpace } from "@/services/space.service";
import { useAuth } from "@/hooks/useAuth";

export default function NewSpacePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🏠");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("AUD");
  const [message, setMessage] = useState("");

  async function handleCreateSpace(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.id) {
      setMessage("You must be logged in.");
      return;
    }

    setMessage("Creating space...");

    const { error } = await createSpace({
      name,
      emoji,
      description,
      currency,
      owner_id: user.id,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard/spaces");
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <p className="text-sm text-slate-500">New Space</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Create a financial space
        </h1>
        <p className="mt-2 text-slate-600">
          Spaces help you organise money around homes, trips, families, clubs,
          and projects.
        </p>

        <form
          onSubmit={handleCreateSpace}
          className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Space name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Japan Trip"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Emoji
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="🇯🇵"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                placeholder="Flights, hotels, food, transport and shared travel spending."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Currency
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="AUD">AUD</option>
                <option value="NZD">NZD</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <button
              type="submit"
              className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Create Space
            </button>
          </div>

          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
        </form>
      </div>
    </div>
  );
}