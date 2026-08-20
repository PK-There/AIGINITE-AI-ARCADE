"use client";

import { useState } from "react";
import { useR3, type Product, type ChallengeCard } from "../context/R3Context";
import { Bot, LockKeyhole, Pause, Send, Sparkles, WandSparkles, Check } from "lucide-react";

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function ChallengeCards({ challenge, color }: { challenge: ChallengeCard[]; color: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {challenge.map(card => (
        <div
          key={card.label}
          className="min-h-[110px] border border-white/10 bg-white/[.04] p-4 animate-rise"
          style={{ borderTopColor: color, borderTopWidth: 3 }}
        >
          <p className="font-mono-ui text-[9px] font-bold tracking-[.19em]" style={{ color }}>
            {card.label}
          </p>
          <p className="mt-3 text-sm font-bold leading-snug text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

interface Props { myTeamId: string }

export function R3Game({ myTeamId }: Props) {
  const { state, myTeam, sendPrompt, updateProduct, submitTeam } = useR3();
  const [prompt, setPrompt] = useState("");

  if (!myTeam) return null;

  const isLocked = myTeam.submitted || state.phase === "ended";

  const handleSend = () => {
    if (prompt.trim() && myTeam.promptsUsed < 10 && !isLocked) {
      sendPrompt(myTeamId, prompt);
      setPrompt("");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 space-y-6">

      {/* Countdown overlay */}
      {state.countdown !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#0d1117]/95">
          <div className="text-center animate-pop">
            <p className="font-mono-ui text-[11px] uppercase tracking-[.24em] text-[#d9ff52]">The arena opens in</p>
            <p className="font-display text-[10rem] font-bold leading-none text-[#d9ff52]">
              {state.countdown === 0 ? "CREATE!" : state.countdown}
            </p>
          </div>
        </div>
      )}

      {/* Pause banner */}
      {state.paused && (
        <div className="flex items-center justify-center gap-2 border border-[#d9ff52]/30 bg-[#d9ff52]/10 p-3 rounded-lg font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#d9ff52]">
          <Pause size={14} /> Host has paused the round
        </div>
      )}

      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/8 pb-4">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center font-display text-lg font-bold border border-white/10"
            style={{ color: myTeam.color, backgroundColor: myTeam.tint }}
          >
            {myTeam.short}
          </span>
          <div>
            <p className="font-mono-ui text-[9px] uppercase tracking-widest text-zinc-500">{myTeam.name} / private build room</p>
            <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-white">Make the idea real.</h1>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-zinc-500">Time</p>
            <p className={`font-mono-ui text-2xl font-bold ${state.secondsRemaining < 60 ? "text-[#ff6f91]" : "text-white"}`}>
              {formatTime(state.secondsRemaining)}
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-right">
            <p className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-zinc-500">Prompts left</p>
            <p className="font-mono-ui text-2xl font-bold text-[#d9ff52]">
              {10 - myTeam.promptsUsed}<span className="text-zinc-600">/10</span>
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Cards */}
      <div>
        <p className="font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-500 mb-3">
          Sealed brief — only your room can see this
        </p>
        <ChallengeCards challenge={myTeam.challenge} color={myTeam.color} />
      </div>

      {/* Main two-column layout */}
      <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">

        {/* AI Co-pilot */}
        <section className="border border-white/10 bg-white/[.04] rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div className="flex items-center gap-3">
              <Bot size={17} className="text-[#5de0ff]" />
              <div>
                <p className="text-sm font-bold text-white">Aignite Co-pilot</p>
                <p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-zinc-500">Private AI session</p>
              </div>
            </div>
            <span className="rounded-full bg-[#5de0ff]/10 px-3 py-1 font-mono-ui text-[9px] font-bold uppercase tracking-[.14em] text-[#5de0ff]">
              Prompt {myTeam.promptsUsed}/10
            </span>
          </div>

          <div className="flex min-h-[280px] flex-col p-5 flex-1">
            {myTeam.history.length === 0 ? (
              <div className="m-auto max-w-xs text-center">
                <WandSparkles size={28} className="mx-auto text-[#d9ff52]" />
                <p className="mt-4 font-display text-2xl font-bold uppercase text-white">What should we build first?</p>
                <p className="mt-2 text-xs leading-6 text-zinc-500">Ask for a spark, a sharp critique, or a first draft. The AI knows your brief and your limitation.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-64">
                {myTeam.history.map((item, i) => (
                  <div key={i} className="animate-rise">
                    <p className="mb-2 flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#d9ff52]">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d9ff52] text-[8px] text-[#0d1117] font-black">{i + 1}</span>
                      Your prompt
                    </p>
                    <div className="ml-7 border-l border-[#d9ff52]/30 pl-4 text-sm leading-6 text-white">{item.prompt}</div>
                    <div className="ml-7 mt-2 border-l border-[#5de0ff]/30 bg-white/[.03] p-4 rounded-r-lg text-sm leading-6 text-zinc-400">
                      <span className="mb-1 block font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#5de0ff]">AI Response</span>
                      {item.response}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto pt-5">
              <div className="flex gap-2">
                <input
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                  disabled={isLocked || myTeam.promptsUsed >= 10}
                  placeholder={isLocked ? "Submission locked" : "Ask the AI to push the idea…"}
                  className="min-h-11 min-w-0 flex-1 border border-white/10 bg-[#0d1117] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#d9ff52]/50 rounded-lg"
                />
                <button
                  onClick={handleSend}
                  disabled={isLocked || myTeam.promptsUsed >= 10 || !prompt.trim()}
                  className="shrink-0 px-4 bg-[#d9ff52] text-[#0d1117] rounded-lg font-bold disabled:opacity-40 hover:-translate-y-0.5 transition-transform"
                >
                  <Send size={15} />
                </button>
              </div>
              <p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[.1em] text-zinc-600">
                Every prompt is a move. Use them deliberately.
              </p>
            </div>
          </div>
        </section>

        {/* Product Board */}
        <section className="border border-white/10 bg-white/[.04] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div className="flex items-center gap-3">
              <Sparkles size={17} className="text-[#d9ff52]" />
              <div>
                <p className="text-sm font-bold text-white">Product Board</p>
                <p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-zinc-500">Shape the submission</p>
              </div>
            </div>
            {isLocked && (
              <span className="inline-flex items-center gap-1.5 font-mono-ui text-[9px] uppercase tracking-[.13em] text-[#d9ff52]">
                <LockKeyhole size={12} /> Locked
              </span>
            )}
          </div>

          <div className="space-y-4 p-5">
            {(["name", "oneLiner", "audience", "features"] as (keyof Product)[]).map(field => (
              <label key={field} className="block">
                <span className="mb-2 block font-mono-ui text-[9px] font-bold uppercase tracking-[.16em] text-zinc-500">
                  {field === "name" ? "Product Name" : field === "oneLiner" ? "One-line promise" : field === "audience" ? "Made for" : "Three proof points"}
                </span>
                {field === "features" ? (
                  <textarea
                    value={myTeam.product[field]}
                    onChange={e => updateProduct(myTeamId, field, e.target.value)}
                    disabled={isLocked}
                    rows={3}
                    className="w-full resize-none border border-white/10 bg-[#0d1117] px-3 py-3 text-sm leading-6 text-white outline-none focus:border-[#d9ff52]/50 disabled:opacity-50 rounded-lg"
                  />
                ) : (
                  <input
                    value={myTeam.product[field]}
                    onChange={e => updateProduct(myTeamId, field, e.target.value)}
                    disabled={isLocked}
                    className="w-full border border-white/10 bg-[#0d1117] px-3 py-3 text-sm text-white outline-none focus:border-[#d9ff52]/50 disabled:opacity-50 rounded-lg"
                  />
                )}
              </label>
            ))}

            <div className="border-t border-white/8 pt-4">
              <button
                onClick={() => submitTeam(myTeamId)}
                disabled={isLocked || state.phase !== "live"}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-[#d9ff52] text-[#0d1117] font-mono-ui text-xs uppercase tracking-widest font-black disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform hover:shadow-[4px_4px_0_#ff6f91]"
              >
                {myTeam.submitted ? <><Check size={15} /> Submission locked</> : <><LockKeyhole size={15} /> Lock final submission</>}
              </button>
              <p className="mt-3 text-center font-mono-ui text-[9px] text-zinc-600 uppercase tracking-widest">
                Lock only when your board says exactly what you mean.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
