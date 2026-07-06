export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-center">
      <div className="max-w-5xl">
        <p className="mb-5 text-indigo-400 font-semibold uppercase tracking-[0.3em]">
          Financial Operating System
        </p>

        <h1 className="text-6xl font-black leading-tight text-white md:text-8xl">
          Money,
          <br />
          Together.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-white/70">
          Australia's next generation platform for payments, shared finances,
          AI budgeting and merchant experiences.
        </p>

        <div className="mt-12 flex justify-center gap-5">
          <button className="rounded-full bg-indigo-500 px-8 py-4 font-semibold text-white">
            Get Started
          </button>

          <button className="rounded-full border border-white/20 px-8 py-4 text-white">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}