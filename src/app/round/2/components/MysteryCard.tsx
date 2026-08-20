'use client'

import React from 'react';
import { Lock, ShieldAlert, Cpu, Sparkles, Binary } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const MysteryCard: React.FC = () => {
  const { gameState } = useGame();
  const { questionHistory, maxQuestions } = gameState;

  return (
    <div 
      id="mystery-entity-card"
      className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#0b1324]/90 p-6 md:p-8 text-center backdrop-blur-xl shadow-2xl shadow-cyan-950/50 box-glow-cyan"
    >
      {/* Background cyber grid & scanlines */}
      <div className="absolute inset-0 arcade-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto space-y-4">
        
        {/* Lock / Security Badge */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-inner">
            <Lock className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono-code font-bold tracking-wider text-xs uppercase">
              MYSTERY ENTITY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/85 border border-purple-500/40 text-purple-300 shadow-inner font-mono-code text-xs font-bold uppercase tracking-wider">
            <span>CHARACTER {gameState.currentEntityIndex + 1} / 3</span>
          </div>
        </div>

        {/* Big Classified Header Display */}
        <div className="space-y-1">
          <div className="font-display font-black tracking-widest text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-300 text-glow-cyan uppercase">
            IDENTITY CLASSIFIED
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 font-mono-code text-xs md:text-sm tracking-widest">
            <Binary className="w-3.5 h-3.5 text-cyan-500" />
            <span>[ ENCRYPTED TARGET • LEVEL 2 PROTOCOL ]</span>
          </div>
        </div>

        {/* Simulated redaction bar with pulsing dots */}
        <div className="w-full max-w-md py-3 px-6 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between shadow-inner">
          <span className="font-mono-code text-xs text-slate-500">SECRET_HASH:</span>
          <span className="font-mono-code text-cyan-400/80 font-bold tracking-widest text-xs sm:text-sm">
            ████ • ████ • ████
          </span>
          <Cpu className="w-4 h-4 text-cyan-400/60 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Progress & Deduction Status */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className="text-slate-400">Questions Inquired:</span>
            <span className="font-bold text-cyan-400 font-mono-code">{questionHistory.length} / {maxQuestions}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className="text-slate-400">Status:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Active Deduction
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
