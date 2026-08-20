'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { InitializingScreen } from './components/InitializingScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { ResultScreen } from './components/ResultScreen';
import { RoundCompleteScreen } from './components/RoundCompleteScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

import { Lock, ShieldAlert } from 'lucide-react';

function Round2LockedScreen({ reason }: { reason: 'admin' | 'captain' }) {
  const isAdminLock = reason === 'admin';

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col justify-center items-center p-6 font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />
      
      <div className="max-w-md w-full rounded-2xl bg-zinc-950 border-2 border-amber-500/30 p-8 space-y-6 shadow-[0_0_40px_rgba(245,158,11,0.15)] text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Lock className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-100 uppercase tracking-widest">
            {isAdminLock ? "ROUND 2 IS CURRENTLY LOCKED" : "LEADER ACCESS REQUIRED"}
          </h2>
          <p className="text-sm text-amber-500/80 font-medium">
            {isAdminLock 
              ? "\"Round 2 will unlock when the tournament organizer officially starts it.\"" 
              : "Round 2 gameplay is restricted to the Team Captain. Please coordinate and play this round on their device."}
          </p>
        </div>

        <div className="bg-zinc-900/60 p-4 rounded-xl border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-400 justify-center">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>{isAdminLock ? "STANDBY MODE ACTIVE" : "AUTHENTICATION FLAG LOCKED"}</span>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase leading-relaxed">
            {isAdminLock 
              ? "Please wait for the live announcement. The screen will automatically refresh and unlock when the round begins."
              : "Your team progress will be synced instantly. Ask your captain to enter the arena and submit the guess."}
          </p>
        </div>

        <a 
          href="/dashboard"
          className="block w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-xl border border-white/5 transition-all"
        >
          Return to Hub
        </a>
      </div>
    </div>
  );
}

const GameContent: React.FC = () => {
  const router = useRouter();
  const { gameState, round2Active, isCaptain } = useGame();
  const { screen } = gameState;

  // Reset scroll to top whenever Akinator stage shifts
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [screen]);

  // Real-time redirection listener
  React.useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, "settings", "tournament"), (docSnap) => {
      if (docSnap.exists()) {
        const active = docSnap.data().activeRound || 0;
        if (active === 1) {
          router.push("/round/1");
        } else if (active === 3) {
          router.push("/round/3");
        } else if (active === 0) {
          router.push("/dashboard");
        }
      }
    });
    return () => unsubSettings();
  }, [router]);

  if (!round2Active) {
    return <Round2LockedScreen reason="admin" />;
  }

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-white flex flex-col font-mono selection:bg-[#d9ff52]/30 selection:text-[#d9ff52]">


      {/* Back to Dashboard strip */}
      <div className="relative z-50 flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur">
        <a href="/dashboard" className="flex items-center gap-1.5 font-mono-ui text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
          ← Back to Hub
        </a>
        <span className="font-mono-ui text-[10px] text-zinc-700 ml-auto uppercase tracking-widest">Round 02 · AI Who Am I?</span>
      </div>

      <Header />

      <div className="relative z-10 flex-1 flex flex-col">
        {!isCaptain ? (
          <LeaderboardScreen />
        ) : (
          <>
            {screen === 'INTRO' && <IntroScreen />}
            {screen === 'INITIALIZING' && <InitializingScreen />}
            {screen === 'GAMEPLAY' && <GameplayScreen />}
            {screen === 'RESULT' && <ResultScreen />}
            {screen === 'ROUND_COMPLETE' && <RoundCompleteScreen />}
            {screen === 'LEADERBOARD' && <LeaderboardScreen />}
          </>
        )}
      </div>

      <footer className="relative z-10 py-4 px-4 text-center border-t border-white/5 bg-[#0d1117] font-mono-ui text-[10px] uppercase tracking-widest text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>AIGNITE AI ARCADE • COLLEGE COMPETITION PLATFORM</span>
          <span className="text-[#d9ff52]/70">ROUND 02: AI WHO AM I? • SYSTEMS ONLINE</span>
        </div>
      </footer>
    </div>
  );
};

export default function Round2Page() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
