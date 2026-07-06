export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 pt-36 pb-28 text-slate-950">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.22),transparent_28%),linear-gradient(180deg,#f8fafc,transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="mb-5 text-sm font-semibold text-indigo-600">
            AI-powered financial collaboration
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Financial OS for modern Australia.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Aurora helps people send, split, manage and understand money across
            friends, families, groups and businesses — all in one intelligent platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10"
            >
              Join waitlist
            </a>
            <a
              href="#features"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-slate-200"
            >
              Explore product
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-200 via-cyan-100 to-white blur-2xl" />
          <div className="relative rounded-[2rem] bg-white p-4 shadow-2xl shadow-indigo-200/70 ring-1 ring-slate-200">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Aurora dashboard</p>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Live
                </span>
              </div>

              <p className="mt-6 text-white/55">Available balance</p>
              <p className="mt-2 text-5xl font-semibold tracking-tight">$4,280.15</p>

              <div className="mt-8 grid gap-3">
                {[
                  ["Sarah paid you", "+$24.00"],
                  ["Coffee spending", "↓ 18%"],
                  ["Holiday fund", "72%"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl bg-white/8 p-4"
                  >
                    <span className="text-sm text-white/65">{label}</span>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-indigo-400/15 p-4">
                <p className="text-sm font-medium text-indigo-200">Aurora AI</p>
                <p className="mt-2 text-sm text-white/70">
                  You spent $247 less this week. Your holiday goal is still on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}