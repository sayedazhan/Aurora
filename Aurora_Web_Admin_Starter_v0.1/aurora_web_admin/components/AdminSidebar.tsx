export function AdminSidebar() {
  return <aside className="sidebar">
    <a className="logo" href="/admin"><span className="logo-mark">A</span><span>AURORA OPS</span></a>
    <div style={{height:24}} />
    <a href="/admin">Overview</a>
    <a href="/admin?tab=users">Users</a>
    <a href="/admin?tab=transactions">Transactions</a>
    <a href="/admin?tab=merchants">Merchants</a>
    <a href="/admin?tab=risk">Risk Queue</a>
    <a href="/">Public Website</a>
  </aside>;
}
