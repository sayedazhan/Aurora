import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const features = [
  ["Send & request", "Move money with friends, family and groups in seconds."],
  ["Split bills", "Track who owes what without spreadsheets or awkward reminders."],
  ["AI insights", "Understand spending, subscriptions, goals and cash flow."],
  ["Merchant QR", "Simple QR payments and digital receipts for small businesses."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Hero />

      <section id="features" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Product
          </p>
          <h2 className="text-4xl font-bold md:text-6xl">
            One place for everyday money.
          </h2>
          <p className="mt-6 text-lg text-white/65">
            Aurora brings payments, shared expenses, merchant tools and AI-powered
            financial insights into one simple experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map(([title, body]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-indigo-950/20"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-indigo-500/20" />
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-4 text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ai" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              AI Coach
            </p>
            <h2 className="text-4xl font-bold md:text-6xl">
              Finance that explains itself.
            </h2>
            <p className="mt-6 text-lg text-white/65">
              Ask Aurora questions like “Can I afford this trip?”, “Who still owes
              me money?” or “Where did my money go this month?”
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <div className="rounded-3xl bg-[#0F172A] p-6">
              <p className="text-white/50">Aurora AI</p>
              <h3 className="mt-4 text-2xl font-semibold">
                You spent $247 less this week.
              </h3>
              <p className="mt-4 text-white/60">
                Coffee is down 18%, dining is down 12%, and your holiday fund is
                now 72% complete.
              </p>
              <button className="mt-6 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-[#050816]">
                View insight
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="business" className="mx-auto max-w-7xl px-6 py-28">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 p-10 md:p-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
            Business
          </p>
          <h2 className="max-w-3xl text-4xl font-bold md:text-6xl">
            Payments and insights for Australian merchants.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Accept QR payments, track sales, issue digital receipts and understand
            customers from a simple merchant dashboard.
          </p>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Security
          </p>
          <h2 className="text-4xl font-bold md:text-6xl">
            Built for trust from day one.
          </h2>
          <p className="mt-6 text-lg text-white/65">
            Aurora is designed around secure authentication, audit logging,
            encryption, fraud monitoring and privacy-first financial data handling.
          </p>
        </div>
      </section>

      <section id="waitlist" className="px-6 py-28">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.05] p-10 text-center md:p-16">
          <h2 className="text-4xl font-bold md:text-6xl">
            Join the Aurora waitlist.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/65">
            Be first to try Australia’s AI-powered financial collaboration platform.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-white/40"
              placeholder="Enter your email"
            />
            <button className="rounded-full bg-white px-6 py-4 font-semibold text-[#050816]">
              Join waitlist
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-white/50 md:flex-row">
          <p>© 2026 Aurora. Internal codename.</p>
          <div className="flex gap-6">
            <a href="#features">Product</a>
            <a href="#business">Business</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </footer>
    </main>
  );
}