"use client";

import { useEffect } from "react";
import { useR3 } from "../context/R3Context";
import { R3Lobby } from "./R3Lobby";
import { R3Game } from "./R3Game";
import { R3Results } from "./R3Results";
import { R3Header } from "./R3Header";

interface Props {
  finalists: { id: string; name: string; score: number }[];
  myTeamId: string;
  userName: string;
}

export function R3App({ finalists, myTeamId, userName }: Props) {
  const { state, loadFinalists, setMyTeamId } = useR3();

  useEffect(() => {
    if (state.teams.length === 0) {
      loadFinalists(finalists);
    }
    setMyTeamId(myTeamId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset scroll to top whenever the round 3 phase shifts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [state.phase]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Ticker ribbon */}
      <div className="overflow-hidden border-b border-white/5 bg-[#0d1117]/80 py-2 font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-600">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          <span>AIGNITE AI ARCADE / FINAL ROUND</span>
          <span>6 TEAMS / 10 PROMPTS / 10 MINUTES</span>
          <span>IDEAS BUILT UNDER PRESSURE</span>
          <span>AIGNITE AI ARCADE / FINAL ROUND</span>
          <span>6 TEAMS / 10 PROMPTS / 10 MINUTES</span>
        </div>
      </div>

      <R3Header />

      <main className="flex-1">
        {state.phase === "lobby" && <R3Lobby myTeamId={myTeamId} userName={userName} />}
        {state.phase === "live"  && <R3Game myTeamId={myTeamId} />}
        {state.phase === "ended" && <R3Results />}
      </main>
    </div>
  );
}
