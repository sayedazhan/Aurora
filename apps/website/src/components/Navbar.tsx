export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="text-2xl font-bold tracking-wide text-white">
          Aurora
        </a>

        <div className="hidden gap-8 text-sm text-white/70 md:flex">
          <a href="#features">Product</a>
          <a href="#ai">AI</a>
          <a href="#business">Business</a>
          <a href="#security">Security</a>
        </div>

        <a
          href="#waitlist"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#050816]"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}