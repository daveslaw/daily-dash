"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function ReloadButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function handleClick() {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 1000);
  }

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 right-4 z-20 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all backdrop-blur-md"
      aria-label="Refresh dashboard"
    >
      <RefreshCw size={16} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}
