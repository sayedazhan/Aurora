import { AdminSidebar } from '@/components/AdminSidebar';
import { MetricCard } from '@/components/MetricCard';
import { prisma } from '@/lib/db';
import { money, shortDate } from '@/lib/format';

export default async function AdminPage({ searchParams }: { searchParams?: Promise<{ tab?: string }> }) {
  const params = await searchParams;
  const tab = params?.tab ?? 'overview';
  const [users, merchants, transactions, riskEvents, volume] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    prisma.merchant.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
    prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 10, include: { sender: true, receiver: true, merchant: true } }),
    prisma.riskEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 8, include: { transaction: true } }),
    prisma.transaction.aggregate({ _sum: { amountCents: true }, where: { status: 'COMPLETED' } })
  ]);

  return <div className="admin-layout">
    <AdminSidebar />
    <main className="admin-main">
      <div className="admin-header">
        <div>
          <h1 style={{margin:0}}>Aurora Admin</h1>
          <p style={{color:'var(--muted)', margin:'6px 0 0'}}>Founder operations dashboard</p>
        </div>
        <span className="badge">MVP Sandbox</span>
      </div>

      <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginBottom:24}}>
        <MetricCard label="Users" value={String(users.length)} hint="latest demo page" />
        <MetricCard label="Merchants" value={String(merchants.length)} hint="onboarding pipeline" />
        <MetricCard label="Volume" value={money(volume._sum.amountCents ?? 0)} hint="completed transactions" />
        <MetricCard label="Open risk" value={String(riskEvents.filter(r => r.status === 'open').length)} hint="review queue" />
      </div>

      {tab === 'overview' && <section className="grid" style={{gridTemplateColumns:'1.1fr .9fr'}}>
        <div className="card" style={{padding:24}}>
          <h2>Recent transactions</h2>
          <TransactionTable transactions={transactions} />
        </div>
        <div className="card" style={{padding:24}}>
          <h2>Risk queue</h2>
          {riskEvents.map((r) => <div key={r.id} style={{padding:'14px 0', borderBottom:'1px solid var(--line)'}}>
            <b>{r.reason}</b><br />
            <span className={r.level === 'HIGH' || r.level === 'CRITICAL' ? 'status red' : r.level === 'MEDIUM' ? 'status orange' : 'status green'}>{r.level}</span>
            <small style={{color:'var(--muted)', marginLeft:8}}>{shortDate(r.createdAt)}</small>
          </div>)}
        </div>
      </section>}

      {tab === 'users' && <div className="card" style={{padding:24}}><h2>Users</h2><UserTable users={users} /></div>}
      {tab === 'merchants' && <div className="card" style={{padding:24}}><h2>Merchants</h2><MerchantTable merchants={merchants} /></div>}
      {tab === 'transactions' && <div className="card" style={{padding:24}}><h2>Transactions</h2><TransactionTable transactions={transactions} /></div>}
      {tab === 'risk' && <div className="card" style={{padding:24}}><h2>Risk Events</h2>{riskEvents.map((r) => <p key={r.id}><b>{r.level}</b> — {r.reason}</p>)}</div>}
    </main>
  </div>;
}

function UserTable({ users }: { users: any[] }) {
  return <table className="table"><thead><tr><th>Name</th><th>Email</th><th>Status</th><th>KYC</th><th>Joined</th></tr></thead><tbody>
    {users.map((u) => <tr key={u.id}><td><b>{u.fullName}</b><br/><small>{u.handle}</small></td><td>{u.email}</td><td><span className="status green">{u.status}</span></td><td><span className="status">{u.kycStatus}</span></td><td>{shortDate(u.createdAt)}</td></tr>)}
  </tbody></table>;
}

function MerchantTable({ merchants }: { merchants: any[] }) {
  return <table className="table"><thead><tr><th>Business</th><th>Category</th><th>Email</th><th>Status</th><th>Created</th></tr></thead><tbody>
    {merchants.map((m) => <tr key={m.id}><td><b>{m.businessName}</b><br/><small>ABN {m.abn ?? 'pending'}</small></td><td>{m.category}</td><td>{m.contactEmail}</td><td><span className={m.status === 'ACTIVE' ? 'status green' : 'status orange'}>{m.status}</span></td><td>{shortDate(m.createdAt)}</td></tr>)}
  </tbody></table>;
}

function TransactionTable({ transactions }: { transactions: any[] }) {
  return <table className="table"><thead><tr><th>Reference</th><th>Type</th><th>Amount</th><th>Status</th><th>Counterparty</th><th>Date</th></tr></thead><tbody>
    {transactions.map((t) => <tr key={t.id}><td><b>{t.reference}</b></td><td>{t.type}</td><td>{money(t.amountCents, t.currency)}</td><td><span className={t.status === 'COMPLETED' ? 'status green' : t.status === 'REVIEW' ? 'status orange' : 'status'}>{t.status}</span></td><td>{t.receiver?.fullName ?? t.merchant?.businessName ?? 'External'}</td><td>{shortDate(t.createdAt)}</td></tr>)}
  </tbody></table>;
}
