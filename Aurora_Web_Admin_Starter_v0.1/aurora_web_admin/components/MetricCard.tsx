export function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return <div className="metric">
    <span style={{color:'var(--muted)', fontWeight:700}}>{label}</span>
    <strong>{value}</strong>
    {hint ? <small style={{color:'var(--muted)'}}>{hint}</small> : null}
  </div>;
}
