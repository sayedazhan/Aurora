const navItems = [
  "Dashboard",
  "Payments",
  "Groups",
  "AI Coach",
  "Profile",
  "Settings",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white p-6 md:block">
          <a href="/" className="text-2xl font-semibold tracking-tight">
            Aurora
          </a>

          <nav className="mt-10 space-y-2 text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block rounded-xl px-4 py-3 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="flex-1">
          <header className="border-b border-slate-200 bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Welcome back</p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Your financial workspace
                </h1>
              </div>

              <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                Logout
              </button>
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}