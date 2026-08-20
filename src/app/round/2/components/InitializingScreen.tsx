'use client'

import React, { useEffect, useState } from 'react';
import { Cpu, Binary, ShieldAlert, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const InitializingScreen: React.FC = () => {
  const { gameState } = useGame();
  const { team } = gameState;
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 600);
    const timer2 = setTimeout(() => setStep(3), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-fade-in">
      
      {/* Spinning Cyber Engine */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 border-b-blue-500 animate-spin" style={{ animationDuration: '1.2s' }} />
        <div className="w-20 h-20 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center shadow-xl shadow-cyan-500/30">
          <Cpu className="w-10 h-10 text-cyan-300 animate-pulse" />
        </div>
      </div>

      {/* Futuristic Steps */}
      <div className="space-y-4 max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono-code text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          TEAM: {team.name}
        </div>

        <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider uppercase text-glow-cyan">
          INITIALIZING ROUND 2
        </h2>

        {/* Step-by-step terminal log */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-left font-mono-code text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400">
            <span>[OK]</span>
            <span>CONNECTING NEURAL ENGINE...</span>
          </div>

          <div className={`flex items-center gap-2 transition-opacity ${step >= 2 ? 'text-cyan-300 opacity-100' : 'text-slate-600 opacity-40'}`}>
            <span>{step >= 2 ? '[OK]' : '[..]'}</span>
            <span>SELECTING MYSTERY ENTITY...</span>
          </div>

          <div className={`flex items-center gap-2 transition-opacity ${step >= 3 ? 'text-emerald-400 opacity-100' : 'text-slate-600 opacity-40'}`}>
            <span>{step >= 3 ? '[OK]' : '[..]'}</span>
            <span>PREPARING QUESTIONS & MATRIX...</span>
          </div>
        </div>

        <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>

    </div>
  );
};
