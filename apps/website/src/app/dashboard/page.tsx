export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Available balance", "$4,280.15"],
          ["Friends owe you", "$84.00"],
          ["Upcoming bills", "$210.00"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Recent activity</h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <p>Sarah paid you $24.00</p>
            <p>Coffee spending down 18%</p>
            <p>Holiday fund reached 72%</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Aurora AI</h2>
          <p className="mt-4 leading-7 text-slate-600">
            You spent $247 less this week. Your holiday goal is still on track,
            and you can safely move $140 into savings.
          </p>
        </div>
      </div>
    </div>
  );
}