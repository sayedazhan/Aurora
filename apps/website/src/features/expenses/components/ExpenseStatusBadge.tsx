type ExpenseStatus = "settled" | "unsettled" | "partial"

export default function ExpenseStatusBadge({ status }: { status: ExpenseStatus }) {
  const label = {
    settled: "Settled",
    unsettled: "Unsettled",
    partial: "Partially settled",
  }[status]

  const className = {
    settled: "bg-green-50 text-green-700 border-green-200",
    unsettled: "bg-orange-50 text-orange-700 border-orange-200",
    partial: "bg-blue-50 text-blue-700 border-blue-200",
  }[status]

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}