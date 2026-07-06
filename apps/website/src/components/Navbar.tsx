export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          Aurora
        </h1>

        <div className="hidden gap-10 text-white/80 md:flex">
          <a href="#">Product</a>
          <a href="#">Business</a>
          <a href="#">AI</a>
          <a href="#">Security</a>
          <a href="#">Contact</a>
        </div>

        <button className="rounded-full bg-indigo-500 px-5 py-2 text-white hover:bg-indigo-600">
          Join Waitlist
        </button>
      </div>
    </nav>
  );
}