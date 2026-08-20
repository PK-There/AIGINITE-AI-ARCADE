'use client'

import React from 'react';
import { Volume2, VolumeX, Monitor, Zap } from 'lucide-react';
import { TeamState } from '../types';
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

  return (
    <header className="border-b border-white/8 bg-[#0d1117]/90 backdrop-blur-xl px-4 py-3 select-none">
      <div className="flex items-center justify-between gap-4">

        {/* Logo / Back to Hub */}
        <button
          onClick={onNavigateHub}
          className="group inline-flex items-center gap-2.5 shrink-0"
          title="Return to Hub"
        >
          <span className="grid h-9 w-9 place-items-center bg-[#d9ff52] text-[#0d1117] shadow-[3px_3px_0_#ff6f91] transition-transform group-hover:-translate-y-0.5">
            <Zap size={18} strokeWidth={3} />
          </span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-[.12em] text-white leading-none">
              Aignite<span className="text-[#d9ff52]">.</span>
            </p>
            <p className="font-mono-ui text-[9px] text-zinc-500 uppercase tracking-widest leading-none mt-1">
              R01 · Human vs Machine
            </p>
          </div>
        </button>

        {/* Right: Score + Controls */}
        <div className="flex items-center gap-3">
          {/* Score pill */}
          <div className="bg-white/[.04] border border-white/8 rounded-lg px-3 py-1.5 text-right">
            <p className="font-mono-ui text-[8px] uppercase tracking-widest text-zinc-500 leading-none">Score</p>
            <p className="font-mono-ui text-sm font-bold text-[#d9ff52] leading-tight">
              {teamState.teamScore.toLocaleString()}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isMuted
                  ? 'border-red-500/40 bg-red-950/40 text-red-400'
                  : 'border-white/10 bg-white/[.04] text-zinc-400 hover:text-white'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleCrt}
              className={`p-1.5 rounded-lg border text-xs transition-all ${
                isCrtOn
                  ? 'border-[#39FF14]/50 bg-[#39FF14]/10 text-[#39FF14]'
                  : 'border-white/10 bg-white/[.04] text-zinc-500 hover:text-white'
              }`}
              title="Toggle CRT Scanlines"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
