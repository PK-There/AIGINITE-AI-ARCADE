"use client";

import { useR3 } from "../context/R3Context";
import { CircleDot, Zap } from "lucide-react";
import Link from "next/link";

export function R3Header() {
  const { state } = useR3();
  const label =
    state.phase === "lobby" ? "LOBBY OPEN" :
    state.phase === "live"  ? "LIVE NOW" :
    "ROUND COMPLETE";

  return (
    <header className="flex items-center justify-between border-b border-white/8 bg-[#0d1117]/90 px-4 py-3 backdrop-blur-xl sm:px-8">
      <Link href="/dashboard" className="group inline-flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center bg-[#d9ff52] text-[#0d1117] shadow-[3px_3px_0_#ff6f91] transition-transform group-hover:-translate-y-0.5">
          <Zap size={18} strokeWidth={3} />
        </span>
        <span className="font-display text-xl font-bold uppercase tracking-[.12em] text-white">
          Aignite<span className="text-[#d9ff52]">.</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d9ff52]/30 bg-[#d9ff52]/10 px-3 py-1.5 font-mono-ui text-[10px] font-bold tracking-[.16em] text-[#d9ff52]">
          <CircleDot size={11} className="pulse-dot" />
          {label}
        </span>
        <span className="font-mono-ui text-[10px] text-zinc-500 hidden sm:block uppercase tracking-widest">
          FINAL ROUND
        </span>
      </div>
    </header>
  );
}
