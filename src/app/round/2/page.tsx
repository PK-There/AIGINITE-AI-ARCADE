'use client';

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { InitializingScreen } from './components/InitializingScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { ResultScreen } from './components/ResultScreen';
import { RoundCompleteScreen } from './components/RoundCompleteScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

const GameContent: React.FC = () => {
  const { gameState } = useGame();
  const { screen } = gameState;

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-white flex flex-col font-mono selection:bg-[#d9ff52]/30 selection:text-[#d9ff52]">
      {/* Ticker ribbon */}
      <div className="overflow-hidden border-b border-white/5 bg-[#0d1117]/80 py-2 font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-600">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          <span>AIGNITE AI ARCADE / ROUND 02</span>
          <span>AI WHO AM I? / MYSTERY DEDUCTION</span>
          <span>ASK SMART. THINK SMARTER.</span>
          <span>AIGNITE AI ARCADE / ROUND 02</span>
          <span>AI WHO AM I? / MYSTERY DEDUCTION</span>
        </div>
      </div>

      {/* Back to Dashboard strip */}
      <div className="relative z-50 flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur">
        <a href="/dashboard" className="flex items-center gap-1.5 font-mono-ui text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
          ← Back to Hub
        </a>
        <span className="font-mono-ui text-[10px] text-zinc-700 ml-auto uppercase tracking-widest">Round 02 · AI Who Am I?</span>
      </div>

      <Header />

      <div className="relative z-10 flex-1 flex flex-col">
        {screen === 'INTRO' && <IntroScreen />}
        {screen === 'INITIALIZING' && <InitializingScreen />}
        {screen === 'GAMEPLAY' && <GameplayScreen />}
        {screen === 'RESULT' && <ResultScreen />}
        {screen === 'ROUND_COMPLETE' && <RoundCompleteScreen />}
        {screen === 'LEADERBOARD' && <LeaderboardScreen />}
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
