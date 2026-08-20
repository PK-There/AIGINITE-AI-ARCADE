"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

export type R3Phase = "lobby" | "live" | "ended";

export type ChallengeCard = {
  label: "WHO" | "PROBLEM" | "PRODUCT" | "LIMITATION";
  value: string;
};

export type Product = {
  name: string;
  oneLiner: string;
  audience: string;
  features: string;
};

export type R3Team = {
  id: string;
  name: string;
  short: string;
  color: string;
  tint: string;
  challenge: ChallengeCard[];
  ready: boolean;
  submitted: boolean;
  promptsUsed: number;
  history: { prompt: string; response: string }[];
  product: Product;
  score: number;        // cumulative from R1+R2 (loaded from Firestore)
  r3Score: number;      // scored in this round
};

export type R3State = {
  phase: R3Phase;
  secondsRemaining: number;
  paused: boolean;
  countdown: number | null;
  winnerRevealed: boolean;
  teams: R3Team[];
  myTeamId: string | null;
};

// ── Challenge pool – drawn per team deterministically ────────────────────────
const CHALLENGE_POOL: ChallengeCard[][] = [
  [
    { label: "WHO",        value: "The campus commuter" },
    { label: "PROBLEM",    value: "Loses time between classes" },
    { label: "PRODUCT",    value: "A micro-mobility concierge" },
    { label: "LIMITATION", value: "Must work offline first" },
  ],
  [
    { label: "WHO",        value: "The first-year student" },
    { label: "PROBLEM",    value: "Cannot find their people" },
    { label: "PRODUCT",    value: "A low-pressure connection ritual" },
    { label: "LIMITATION", value: "No profile photos allowed" },
  ],
  [
    { label: "WHO",        value: "The overloaded student leader" },
    { label: "PROBLEM",    value: "Has five responsibilities at once" },
    { label: "PRODUCT",    value: "A calm command center" },
    { label: "LIMITATION", value: "One screen, zero notifications" },
  ],
  [
    { label: "WHO",        value: "The night-shift student worker" },
    { label: "PROBLEM",    value: "Cannot access campus help after dark" },
    { label: "PRODUCT",    value: "A midnight campus safety layer" },
    { label: "LIMITATION", value: "Works with one thumb" },
  ],
  [
    { label: "WHO",        value: "The student with a side hustle" },
    { label: "PROBLEM",    value: "Cannot turn momentum into money" },
    { label: "PRODUCT",    value: "A tiny storefront for campus talent" },
    { label: "LIMITATION", value: "Zero budget to start" },
  ],
  [
    { label: "WHO",        value: "The graduating senior" },
    { label: "PROBLEM",    value: "Feels unready for life after college" },
    { label: "PRODUCT",    value: "A confidence-building launch plan" },
    { label: "LIMITATION", value: "Built in ten tiny steps" },
  ],
];

const TEAM_COLORS = [
  { color: "#d9ff52", tint: "rgba(217,255,82,.12)" },
  { color: "#5de0ff", tint: "rgba(93,224,255,.12)" },
  { color: "#ff6f91", tint: "rgba(255,111,145,.12)" },
  { color: "#ffb84d", tint: "rgba(255,184,77,.12)" },
  { color: "#bc91ff", tint: "rgba(188,145,255,.12)" },
  { color: "#6ff0bc", tint: "rgba(111,240,188,.12)" },
];

const BLANK_PRODUCT: Product = { name: "", oneLiner: "", audience: "", features: "" };

function mockAIReply(team: R3Team, prompt: string): string {
  const limitation = team.challenge.find(c => c.label === "LIMITATION")?.value ?? "the constraint";
  const clean = prompt.trim().replace(/[?!.]+$/, "");
  return `Strong direction: "${clean}" gives ${team.product.name || "your product"} a clear point of view. Make the first moment tangible, then prove it can honour the constraint — ${limitation.toLowerCase()}.`;
}

// ── Context ───────────────────────────────────────────────────────────────────
type R3ContextValue = {
  state: R3State;
  myTeam: R3Team | null;
  setMyTeamId: (id: string) => void;
  setReady: (id: string, ready: boolean) => void;
  startEvent: () => void;
  togglePause: () => void;
  endEvent: () => void;
  revealWinner: () => void;
  sendPrompt: (id: string, prompt: string) => void;
  updateProduct: (id: string, field: keyof Product, value: string) => void;
  submitTeam: (id: string) => void;
  loadFinalists: (finalistTeams: { id: string; name: string; score: number }[]) => void;
};

const R3Context = createContext<R3ContextValue | null>(null);

const initialState: R3State = {
  phase: "lobby",
  secondsRemaining: 600,
  paused: false,
  countdown: null,
  winnerRevealed: false,
  teams: [],
  myTeamId: null,
};

export function R3Provider({ children, isCaptain = false }: { children: ReactNode; isCaptain?: boolean }) {
  const [state, setState] = useState<R3State>(initialState);
  const channel = useRef<BroadcastChannel | null>(null);
  const remoteUpdate = useRef(false);
  const myTeam = state.teams.find(t => t.id === state.myTeamId) ?? null;

  // BroadcastChannel for multi-tab sync (same device)
  useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
    const bc = new BroadcastChannel("aignite-r3-sync");
    channel.current = bc;
    bc.onmessage = (ev: MessageEvent<{ type: string; state: Omit<R3State, "myTeamId"> }>) => {
      if (ev.data?.type !== "STATE_SYNC" || !ev.data.state) return;
      remoteUpdate.current = true;
      setState(cur => ({ ...ev.data.state, myTeamId: cur.myTeamId }));
    };
    return () => { bc.close(); channel.current = null; };
  }, []);

  useEffect(() => {
    if (remoteUpdate.current) { remoteUpdate.current = false; return; }
    channel.current?.postMessage({ type: "STATE_SYNC", state: { ...state, myTeamId: null } });
  }, [state]);

  // Countdown → live
  useEffect(() => {
    if (state.countdown === null) return;
    if (state.countdown === 0) {
      const t = setTimeout(() => setState(s => ({ ...s, countdown: null, phase: "live" })), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setState(s => ({ ...s, countdown: (s.countdown ?? 1) - 1 })), 900);
    return () => clearTimeout(t);
  }, [state.countdown]);

  // Timer tick (runs strictly on captain/host tab to prevent double-tick storm across clients)
  useEffect(() => {
    if (!isCaptain || state.phase !== "live" || state.paused || state.countdown !== null) return;
    const id = setInterval(() =>
      setState(s => s.secondsRemaining > 0
        ? { ...s, secondsRemaining: s.secondsRemaining - 1 }
        : { ...s, phase: "ended", paused: false }
      ), 1000);
    return () => clearInterval(id);
  }, [state.phase, state.paused, state.countdown, isCaptain]);

  const value: R3ContextValue = {
    state,
    myTeam,
    setMyTeamId: (id) => setState(s => ({ ...s, myTeamId: id })),
    setReady: (id, ready) => setState(s => ({
      ...s, teams: s.teams.map(t => t.id === id ? { ...t, ready } : t),
    })),
    startEvent: () => setState(s =>
      s.teams.length > 0 ? { ...s, phase: "live", countdown: null, paused: false } : s
    ),
    togglePause: () => setState(s => ({ ...s, paused: !s.paused })),
    endEvent: () => setState(s => ({ ...s, phase: "ended", paused: false, countdown: null })),
    revealWinner: () => setState(s => ({ ...s, winnerRevealed: true })),
    sendPrompt: (id, prompt) => setState(s => ({
      ...s, teams: s.teams.map(t => {
        if (t.id !== id || t.promptsUsed >= 10 || !prompt.trim()) return t;
        const response = mockAIReply(t, prompt);
        return { ...t, promptsUsed: t.promptsUsed + 1, history: [...t.history, { prompt: prompt.trim(), response }] };
      }),
    })),
    updateProduct: (id, field, value) => setState(s => ({
      ...s, teams: s.teams.map(t => t.id === id ? { ...t, product: { ...t.product, [field]: value } } : t),
    })),
    submitTeam: (id) => setState(s => ({
      ...s, teams: s.teams.map(t => t.id === id ? { ...t, submitted: true, ready: true } : t),
    })),
    // Called once when leaderboard has determined top-6 finalists
    loadFinalists: (finalists) => {
      const teams: R3Team[] = finalists.map((f, idx) => ({
        id: f.id,
        name: f.name,
        short: f.name.slice(0, 2).toUpperCase(),
        color: TEAM_COLORS[idx % TEAM_COLORS.length].color,
        tint: TEAM_COLORS[idx % TEAM_COLORS.length].tint,
        challenge: CHALLENGE_POOL[idx % CHALLENGE_POOL.length],
        ready: false,
        submitted: false,
        promptsUsed: 0,
        history: [],
        product: { ...BLANK_PRODUCT },
        score: f.score,
        r3Score: 0,
      }));
      setState(s => ({ ...s, teams }));
    },
  };

  return <R3Context.Provider value={value}>{children}</R3Context.Provider>;
}

export function useR3() {
  const ctx = useContext(R3Context);
  if (!ctx) throw new Error("useR3 must be inside R3Provider");
  return ctx;
}
