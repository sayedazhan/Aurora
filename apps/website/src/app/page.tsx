"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {
  Brain,
  Building2,
  LockKeyhole,
  QrCode,
  Receipt,
  Users,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Shared money",
    body: "Create groups, split bills, track balances and settle up without spreadsheets.",
  },
  {
    icon: Receipt,
    title: "Smart expenses",
    body: "Attach receipts, categorise spending and understand where money goes.",
  },
  {
    icon: Brain,
    title: "AI insights",
    body: "Ask questions, get recommendations and understand your financial life.",
  },
  {
    icon: QrCode,
    title: "QR payments",
    body: "Simple QR payment experiences for people, clubs and small businesses.",
  },
];

const faqs = [
  [
    "Is Aurora a bank?",
    "No. Aurora is currently designed as a financial collaboration layer that works with regulated payment and banking partners.",
  ],
  ["Is this available now?", "Not yet. The first version is being built as a private beta."],
  ["Who is Aurora for?", "Individuals, families, housemates, groups, clubs and small businesses."],
  ["Will Aurora use AI?", "Yes. AI will help explain spending, budgets, subscriptions, goals and shared expenses."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <Navbar />
      <Hero />

      <section id="features" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold text-indigo-600">Product</p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Everything money, finally connected.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Aurora brings payments, shared expenses, merchant tools and AI-powered
            financial insights into one calm, modern experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon size={24} />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="ai" className="bg-white px-6 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold text-cyan-600">AI Coach</p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Ask better questions about your money.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Aurora helps users understand spending, subscriptions, savings goals
              and shared expenses using simple natural-language answers.
            </p>

            <a
              href="#waitlist"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
            >
              Join waitlist <ArrowRight size={16} />
            </a>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-xl">
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Aurora AI</p>

              <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                You spent $247 less this week.
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Dining is down 12%, coffee is down 18%, and your holiday goal is
                still on track.
              </p>

              <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm text-slate-500">
                  <span>Holiday fund</span>
                  <span>72%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-[72%] rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="business" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-slate-950 p-10 text-white lg:col-span-2">
            <Building2 className="mb-8 text-indigo-300" size={36} />

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Built for Australian merchants.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Accept QR payments, issue digital receipts, understand customers and
              manage sales from one simple dashboard.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Today’s sales</p>
            <p className="mt-4 text-5xl font-semibold tracking-tight">$2,845</p>

            <div className="mt-8 space-y-4 text-slate-600">
              <p>86 transactions</p>
              <p>$33 average spend</p>
              <p>12 repeat customers</p>
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="bg-white px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <ShieldCheck className="mb-8 text-emerald-600" size={38} />

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Designed for trust from day one.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Aurora is being designed around secure authentication, encryption,
              audit logging, privacy controls and fraud monitoring.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["Secure login", "Privacy-first data", "Fraud monitoring"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8"
                >
                  <LockKeyhole className="mb-5 text-slate-700" size={24} />
                  <h3 className="text-xl font-semibold">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-28">
        <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
          Frequently asked questions
        </h2>

        <div className="mt-12 divide-y divide-slate-200 rounded-[2rem] border border-slate-200 bg-white">
          {faqs.map(([q, a]) => (
            <div key={q} className="p-8">
              <h3 className="text-lg font-semibold">{q}</h3>
              <p className="mt-3 leading-7 text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="px-6 py-28">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 p-10 text-center text-white md:p-16">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Join the Aurora waitlist.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Be first to try Australia’s AI-powered financial collaboration platform.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-full border border-white/10 bg-white px-5 py-4 text-slate-950 outline-none"
              placeholder="Enter your email"
            />

            <button className="rounded-full bg-indigo-500 px-6 py-4 font-semibold text-white">
              Join waitlist
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Aurora. Internal codename.</p>

          <div className="flex gap-6">
            <a href="#features">Product</a>
            <a href="#ai">AI</a>
            <a href="#business">Business</a>
            <a href="#security">Security</a>
          </div>
        </div>
      </footer>
    </main>
  );
}