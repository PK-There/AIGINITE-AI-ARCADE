"use client";

import { useR3 } from "../context/R3Context";
import { Trophy } from "lucide-react";
import Link from "next/link";

export function R3Results() {
  const { state } = useR3();
  const sorted = [...state.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-10">
      <div className="animate-rise text-center space-y-3 mb-10">
        <p className="font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#d9ff52]">
          Final Results / Aignite AI Arcade
        </p>
        <h1 className="font-display text-[clamp(4rem,12vw,8rem)] font-bold uppercase leading-[.82] text-shadow-pop">
          Make some<br /><span className="text-[#d9ff52]">noise.</span>
        </h1>
        <p className="text-sm leading-6 text-zinc-400 max-w-md mx-auto">
          The final round is locked. Every prompt, limitation, and last-second decision is now on the board.
        </p>
      </div>

      {/* Leaderboard */}
      <div className="border border-white/10 overflow-hidden rounded-xl animate-rise-2">
        {sorted.map((team, idx) => (
          <div
            key={team.id}
            className={`flex items-center gap-4 border-b border-white/5 p-5 last:border-0 transition-colors ${
              idx === 0 && state.winnerRevealed
                ? "bg-[#d9ff52] text-[#0d1117]"
                : "bg-white/[.03]"
            }`}
          >
            <span className={`font-display w-8 text-3xl font-bold ${idx === 0 && state.winnerRevealed ? "text-[#0d1117]/50" : "text-zinc-700"}`}>
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span
              className="grid h-10 w-10 shrink-0 place-items-center font-mono-ui text-[10px] font-bold border border-white/10"
              style={{
                color: idx === 0 && state.winnerRevealed ? "#0d1117" : team.color,
                backgroundColor: idx === 0 && state.winnerRevealed ? "rgba(0,0,0,.12)" : team.tint,
              }}
            >
              {team.short}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display text-xl font-bold uppercase text-white truncate" style={{
                color: idx === 0 && state.winnerRevealed ? "#0d1117" : undefined,
              }}>
                {team.name}
              </p>
              <p className={`font-mono-ui text-[9px] uppercase tracking-[.14em] ${idx === 0 && state.winnerRevealed ? "text-[#0d1117]/60" : "text-zinc-500"}`}>
                {team.submitted ? "Final submission" : "Draft board"}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-mono-ui text-xl font-black ${idx === 0 && state.winnerRevealed ? "text-[#0d1117]" : "text-[#d9ff52]"}`}>
                {team.score}
              </p>
              <p className={`font-mono-ui text-[9px] uppercase ${idx === 0 && state.winnerRevealed ? "text-[#0d1117]/60" : "text-zinc-600"}`}>pts</p>
            </div>
            {idx === 0 && state.winnerRevealed && <Trophy size={22} className="text-[#0d1117] shrink-0" />}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/leaderboard"
          className="flex items-center gap-2 h-11 px-6 border border-white/10 text-xs font-bold uppercase tracking-widest font-mono-ui text-zinc-400 hover:text-white hover:border-white/30 rounded-lg transition-colors"
        >
          View Leaderboard
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 h-11 px-6 bg-white/5 border border-white/8 text-xs font-bold uppercase tracking-widest font-mono-ui text-zinc-400 hover:text-white rounded-lg transition-colors"
        >
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
