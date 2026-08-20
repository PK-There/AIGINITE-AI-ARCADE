'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/scoring';
import { Clock, HelpCircle, Volume2, VolumeX, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const { gameState, toggleSound, navigateToScreen } = useGame();
  const { team, timeRemainingSec, questionHistory, maxQuestions, soundEnabled, screen } = gameState;

  const questionsRemaining = Math.max(0, maxQuestions - questionHistory.length);
  const isTimeCritical = timeRemainingSec <= 30;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/8 bg-[#0d1117]/90 backdrop-blur-xl px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Brand & Round */}
        <Link href="/dashboard" className="group inline-flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center bg-[#d9ff52] text-[#0d1117] shadow-[3px_3px_0_#ff6f91] transition-transform group-hover:-translate-y-0.5">
            <Zap size={18} strokeWidth={3} />
          </span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-[.12em] text-white leading-none">
              Aignite<span className="text-[#d9ff52]">.</span>
            </p>
            <p className="font-mono-ui text-[9px] text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Round 02 · AI Who Am I?
            </p>
          </div>
        </Link>

        {/* Center: Live Stats (During Gameplay) */}
        {screen === 'GAMEPLAY' && (
          <div className="flex items-center gap-3 sm:gap-6 bg-white/[.04] border border-white/10 rounded-xl px-4 py-1.5 font-mono-ui">
            {/* Team Info */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/10">
              <span className="grid h-6 w-6 place-items-center rounded bg-[#d9ff52]/10 border border-[#d9ff52]/30 text-[#d9ff52] font-bold text-xs">
                {team.name.charAt(0)}
              </span>
              <span className="text-xs font-bold text-white max-w-[110px] truncate">{team.name}</span>
            </div>

            {/* Questions Left */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/10">
              <HelpCircle className="w-3.5 h-3.5 text-[#5de0ff]" />
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-zinc-500">Qs Left</span>
                <span className="block text-xs font-bold text-[#5de0ff]">
                  {questionsRemaining} <span className="text-zinc-600 font-normal">/ {maxQuestions}</span>
                </span>
              </div>
            </div>

            {/* Live Timer */}
            <div className="flex items-center gap-2">
              <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-[#ff6f91] animate-bounce' : 'text-[#d9ff52]'}`} />
              <div>
                <span className="block text-[8px] uppercase tracking-widest text-zinc-500">Timer</span>
                <span className={`block text-xs font-bold ${isTimeCritical ? 'text-[#ff6f91] animate-pulse' : 'text-white'}`}>
                  {formatTime(timeRemainingSec)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Right: Actions (Sound & Leaderboard navigation) */}
        <div className="flex items-center gap-2">
          {screen !== 'INTRO' && (
            <button
              onClick={() => navigateToScreen('LEADERBOARD')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[.04] text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer font-mono-ui"
            >
              <Trophy className="w-3.5 h-3.5 text-[#d9ff52]" />
              <span className="hidden md:inline">Standings</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg border border-white/10 bg-white/[.04] text-zinc-400 hover:text-white transition-all cursor-pointer"
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
