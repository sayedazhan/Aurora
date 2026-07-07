import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white">
        <Sparkles size={18} />
      </div>
      <span className="text-xl font-semibold tracking-tight">Aurora</span>
    </Link>
  );
}