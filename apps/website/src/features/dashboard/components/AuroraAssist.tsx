import { Sparkles } from "lucide-react";

export default function AuroraAssist() {
  return (
    <section className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <Sparkles className="text-indigo-300" size={20} />
        <p className="font-medium">Aurora Assist</p>
      </div>

      <h2 className="mt-6 text-2xl font-semibold leading-tight">
        Sarah still owes you $124 from Japan Trip.
      </h2>

      <p className="mt-4 text-white/70">
        I can send a reminder or wait until the trip ends.
      </p>

      <button className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
        Send Reminder
      </button>
    </section>
  );
}