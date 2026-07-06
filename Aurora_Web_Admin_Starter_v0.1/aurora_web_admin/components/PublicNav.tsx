export function PublicNav() {
  return <nav className="container nav">
    <a className="logo" href="/"><span className="logo-mark">A</span><span>AURORA</span></a>
    <div style={{display:'flex', gap:12, alignItems:'center'}}>
      <a href="#features">Features</a>
      <a href="#merchant">Merchants</a>
      <a className="btn ghost" href="/admin">Admin</a>
    </div>
  </nav>;
}
