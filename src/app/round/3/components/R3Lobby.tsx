"use client";

import { useR3 } from "../context/R3Context";
import { CheckCircle2, Clock3, Play, Users } from "lucide-react";

interface Props {
  myTeamId: string;
  userName: string;
}

export function R3Lobby({ myTeamId, userName }: Props) {
  const { state, myTeam, setReady, startEvent } = useR3();

  const readyCount = state.teams.filter(t => t.ready).length;
  const totalTeams = state.teams.length;
  const allReady = readyCount === totalTeams && totalTeams > 0;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-10 space-y-10">

      {/* Hero */}
      <div className="animate-rise">
        <p className="font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#d9ff52]">
          Final Round / Finalist Lobby
        </p>
        <h1 className="font-display mt-4 text-[clamp(3.5rem,10vw,7rem)] font-bold uppercase leading-[.85] text-shadow-pop">
          Build<br /><span className="text-[#d9ff52]">under</span><br />pressure.
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">
          Six finalist teams. One shared arena. Ten prompts to turn a sharp problem into a product worth talking about. Wait for all teams to mark ready, then the host starts the clock.
        </p>
      </div>

      {/* My Team Card */}
      {myTeam && (
        <div className="animate-rise-2 border border-white/10 bg-white/[.04] p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-zinc-500">Your team</p>
              <p className="font-display text-3xl font-bold uppercase mt-1" style={{ color: myTeam.color }}>
                {myTeam.name}
              </p>
            </div>
            <div
              className="grid h-12 w-12 place-items-center font-display text-xl font-bold border border-white/10"
              style={{ color: myTeam.color, backgroundColor: myTeam.tint }}
            >
              {myTeam.short}
            </div>
          </div>

          {/* Sealed brief teaser */}
          <div className="bg-[#0d1117]/60 border border-white/5 rounded-lg p-4">
            <p className="font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-600 mb-2">Sealed challenge brief</p>
            <p className="text-sm text-zinc-300 font-semibold">🔒 Your cards unlock when the host starts the round.</p>
          </div>

          {/* Ready toggle */}
          <button
            onClick={() => setReady(myTeamId, !myTeam.ready)}
            disabled={state.phase !== "lobby"}
            className={`w-full flex items-center justify-center gap-2 h-12 rounded-lg font-mono-ui text-xs uppercase tracking-widest font-bold transition-all ${
              myTeam.ready
                ? "bg-[#d9ff52]/15 border border-[#d9ff52]/40 text-[#d9ff52]"
                : "bg-white text-[#0d1117] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#ff6f91]"
            }`}
          >
            {myTeam.ready ? <><CheckCircle2 size={15} /> You&apos;re ready</> : <>I&apos;m ready <CheckCircle2 size={15} /></>}
          </button>
        </div>
      )}

      {/* Teams readiness grid */}
      <div className="animate-rise-3 space-y-3">
        <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-zinc-500">
          Finalist Teams — {readyCount}/{totalTeams} ready
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {state.teams.map(team => (
            <div
              key={team.id}
              className="border border-white/8 bg-white/[.03] rounded-lg p-3 flex items-center gap-2"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center font-mono-ui text-[9px] font-bold border border-white/10"
                style={{ color: team.color, backgroundColor: team.tint }}
              >
                {team.short}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate text-white">{team.name}</p>
                <p className="font-mono-ui text-[9px] text-zinc-500 uppercase tracking-wider">
                  {team.ready ? "Ready ✓" : "Waiting…"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Host start button (visible to captain = current user) */}
      <div className="border border-white/8 bg-white/[.03] rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-[#d9ff52]" />
          <p className="font-mono-ui text-[10px] uppercase tracking-widest text-zinc-400">Captain controls</p>
        </div>
        <div className={`border rounded-md p-3 text-center ${allReady ? "border-[#d9ff52]/40 bg-[#d9ff52]/5" : "border-white/5 bg-[#0d1117]/40"}`}>
          <p className="font-mono-ui text-[10px] font-bold uppercase tracking-widest">
            {allReady ? `All ${totalTeams} teams are ready ✓` : `Waiting for ${totalTeams - readyCount} more team(s)…`}
          </p>
        </div>
        <button
          onClick={startEvent}
          disabled={!allReady || state.phase !== "lobby"}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 h-11 rounded-xl bg-[#d9ff52] text-[#0d1117] font-mono-ui text-xs uppercase tracking-widest font-black disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform hover:shadow-[4px_4px_0_#ff6f91]"
        >
          <Play size={14} /> Start Final Round
        </button>
        <p className="text-center font-mono-ui text-[9px] text-zinc-600 uppercase tracking-widest">
          One countdown broadcasts to all connected rooms
        </p>
      </div>

      {/* Stats footer */}
      <div className="flex flex-wrap items-center gap-6 border-t border-white/5 pt-5 font-mono-ui text-[10px] uppercase tracking-[.16em] text-zinc-600">
        <span className="inline-flex items-center gap-2"><Users size={12} className="text-[#5de0ff]" /> {totalTeams} finalist teams</span>
        <span className="inline-flex items-center gap-2"><Clock3 size={12} className="text-[#d9ff52]" /> 10:00 on the clock</span>
        <span className="inline-flex items-center gap-2"><span className="text-[#ff6f91]">✦</span> 10 prompts max</span>
      </div>
    </div>
  );
}
