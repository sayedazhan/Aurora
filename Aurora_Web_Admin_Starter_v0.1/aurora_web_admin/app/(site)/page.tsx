import { PublicNav } from '@/components/PublicNav';

export default function HomePage() {
  return <main>
    <PublicNav />
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="badge">AI-powered Financial OS for Australia</span>
          <h1>Money, together.</h1>
          <p>Aurora helps people send, split, understand, and manage money with friends, families, groups, and small businesses.</p>
          <div style={{display:'flex', gap:14, marginTop:28, flexWrap:'wrap'}}>
            <a className="btn primary" href="#waitlist">Join waitlist</a>
            <a className="btn ghost" href="/admin">View admin dashboard</a>
          </div>
        </div>
        <div className="phone">
          <div className="phone-screen">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <b>Good morning, Azhan 👋</b><span>🔔</span>
            </div>
            <div className="gradient" style={{borderRadius:26, padding:22, color:'white', marginTop:22}}>
              <div style={{opacity:.82}}>Available balance</div>
              <div style={{fontSize:42, fontWeight:900, marginTop:8}}>$4,280.15</div>
              <div style={{opacity:.75}}>Main Wallet •••• 5678</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginTop:18}}>
              {['Send','Request','Split','QR'].map((x) => <div key={x} className="card" style={{padding:12, textAlign:'center', borderRadius:18, fontSize:13}}>{x}</div>)}
            </div>
            <h3>AI Insight</h3>
            <div className="card" style={{padding:18}}>
              <b>You spent $247 less this week.</b>
              <p style={{color:'var(--muted)', marginBottom:0}}>Holiday fund is on track. Coffee spending is down 18%.</p>
            </div>
            <h3>People owe you</h3>
            {[['Sarah','$24.00'],['Jason','$12.50']].map(([name, amt]) => <div key={name} style={{display:'flex', justifyContent:'space-between', padding:'11px 0', borderBottom:'1px solid var(--line)'}}><b>{name}</b><b style={{color:'var(--success)'}}>{amt}</b></div>)}
          </div>
        </div>
      </div>
    </section>
    <section id="features" className="container" style={{padding:'30px 0 80px'}}>
      <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[
          ['Instant payments','Send, request, QR pay, and split bills.'],
          ['Shared finance','Groups for housemates, trips, couples, families, and clubs.'],
          ['AI insights','Understand spending, subscriptions, budgets, and goals.']
        ].map(([title, body]) => <div className="card" key={title} style={{padding:26}}><h3>{title}</h3><p style={{color:'var(--muted)'}}>{body}</p></div>)}
      </div>
    </section>
    <section id="merchant" className="container card" style={{padding:34, marginBottom:80}}>
      <span className="badge">Merchant Pilot</span>
      <h2>QR payments and customer insights for small businesses.</h2>
      <p style={{color:'var(--muted)', maxWidth:780}}>Aurora Merchant gives cafes, markets, freelancers, clubs, and events a simple dashboard for payments, receipts, refunds, loyalty, and analytics.</p>
    </section>
    <section id="waitlist" className="container" style={{paddingBottom:80}}>
      <form action="/api/leads" method="post" className="card" style={{padding:30, display:'grid', gap:12, maxWidth:620}}>
        <h2>Join the Aurora waitlist</h2>
        <input name="name" placeholder="Your name" style={{padding:14, borderRadius:14, border:'1px solid var(--line)'}} />
        <input name="email" type="email" required placeholder="Email address" style={{padding:14, borderRadius:14, border:'1px solid var(--line)'}} />
        <select name="segment" style={{padding:14, borderRadius:14, border:'1px solid var(--line)'}}>
          <option>Consumer</option><option>Merchant</option><option>Investor</option><option>Partner</option>
        </select>
        <button className="btn primary">Request early access</button>
      </form>
    </section>
  </main>;
}
