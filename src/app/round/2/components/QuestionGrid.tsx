'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { QuestionCard } from './QuestionCard';
import { Sparkles, ArrowRight, HelpCircle, Zap } from 'lucide-react';

export const QuestionGrid: React.FC = () => {
  const { gameState } = useGame();
  const { 
    availableQuestions, 
    timeRemainingSec
  } = gameState;

  const elapsed = 120 - timeRemainingSec;
  const revealedCount = Math.min(5, Math.floor(elapsed / 20) + 1);

  return (
    <div className="space-y-6">
      
      {/* Header bar for Clue Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
            MYSTERY CLUES & HINTS
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code font-bold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-cyan-500/20 text-cyan-300">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>CLUES UNLOCKED:</span>
          <span className="text-white text-sm bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-500/40 font-mono-code">
            {revealedCount} / 5
          </span>
        </div>
      </div>

      {/* Clues Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {availableQuestions.map((q) => {
          const match = q.id.match(/q-(\d+)/);
          const qIndex = match ? parseInt(match[1]) : 0;
          const isRevealed = elapsed >= qIndex * 20;

          if (!isRevealed) {
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20 flex flex-col justify-center items-center text-center space-y-1 h-[90px] opacity-40 select-none animate-pulse"
              >
                <span className="text-[10px] font-mono tracking-widest text-purple-500/70 uppercase">
                  [ CLUE {qIndex + 1} LOCKED ]
                </span>
                <span className="text-[9px] font-mono text-zinc-600">
                  Unlocks in {Math.max(0, qIndex * 20 - elapsed)}s
                </span>
              </div>
            );
          }

          return (
            <QuestionCard
              key={q.id}
              question={q}
              index={qIndex}
            />
          );
        })}
      </div>

    </div>
  );
};
