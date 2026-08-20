'use client'

import React from 'react';
import { Volume2, VolumeX, Monitor, ShieldCheck, Trophy, Cpu, Clock, Terminal } from 'lucide-react';
import { TeamState, PlayerId } from '../types-r1';
import { calculateTournamentRank } from '../data/rivalsData';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  teamState: TeamState;
  onNavigateHub: () => void;
  isCrtOn: boolean;
  setIsCrtOn: (val: boolean | ((prev: boolean) => boolean)) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  teamState,
  onNavigateHub,
  isCrtOn,
  setIsCrtOn,
  isMuted,
  setIsMuted,
}) => {
  const toggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      soundFx.isMuted = next;
      if (!next) soundFx.playKeypress();
      return next;
    });
  };

  const toggleCrt = () => {
    setIsCrtOn((prev) => !prev);
    soundFx.playKeypress();
  };

  const rankInfo = calculateTournamentRank(teamState.teamScore, teamState.totalTime);

  return (
    <header className="border-b-2 border-[#00F0FF] bg-[#0B0F19]/95 backdrop-blur-md px-4 sm:px-8 py-3 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)] select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-end gap-4">
        {/* Left: Branding & Session info */}
        <div
          onClick={onNavigateHub}
          className="cursor-pointer group select-none"
          title="Return to Main Hub"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tighter italic text-[#FF007F] drop-shadow-[0_0_8px_#FF007F] group-hover:scale-[1.01] transition-transform font-display">
              AIGNITE AI ARCADE
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] opacity-80 text-[#00F0FF] font-mono mt-0.5">
            Round 1: Human vs Machine // Session ID: {teamState.teamId}
          </p>
        </div>

        {/* Right: Metrics Bar & Terminal Controls */}
        <div className="flex items-end gap-4 sm:gap-8 font-mono text-right flex-wrap">
          {/* Team Name */}
          <div className="hidden sm:block">
            <div className="text-[10px] uppercase opacity-60 text-[#00F0FF]">Team Name</div>
            <div className="text-sm sm:text-lg font-bold text-slate-100 uppercase tracking-wider">
              {teamState.teamName}
            </div>
          </div>

          {/* Aggregate Score */}
          <div>
            <div className="text-[10px] uppercase opacity-60 text-[#00F0FF]">Aggregate Score</div>
            <div className="text-lg sm:text-xl font-bold text-[#39FF14] drop-shadow-lime">
              {teamState.teamScore.toLocaleString().padStart(6, '0')}
            </div>
          </div>

          {/* Global Rank */}
          <div>
            <div className="text-[10px] uppercase opacity-60 text-[#00F0FF]">Global Rank</div>
            <div className="text-lg sm:text-xl font-bold text-[#FFB800] drop-shadow-amber">
              #{rankInfo.rank.toString().padStart(2, '0')} / 64
            </div>
          </div>

          {/* Audio & CRT Shader Controls */}
          <div className="flex items-center gap-1.5 border-l border-[#00F0FF]/30 pl-3">
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded border text-xs transition-all ${
                isMuted
                  ? 'border-red-500/40 bg-red-950/40 text-red-400'
                  : 'border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
              }`}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={toggleCrt}
              className={`p-1.5 rounded border text-xs transition-all ${
                isCrtOn
                  ? 'border-[#39FF14] bg-[#39FF14]/20 text-[#39FF14] shadow-[0_0_8px_#39FF14]'
                  : 'border-[#00F0FF]/30 bg-transparent text-[#00F0FF]/70 hover:border-[#00F0FF] hover:text-[#00F0FF]'
              }`}
              title="Toggle Retro CRT Scanline Shader"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
