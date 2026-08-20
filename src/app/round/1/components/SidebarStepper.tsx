'use client'

import React from 'react';
import { TeamState, PlayerId, PLAYER_INFO } from '../types';
import { soundFx } from '../utils/audio';

interface SidebarStepperProps {
  teamState: TeamState;
  activeView: 'HUB' | PlayerId | 5;
  onSelectStage: (stage: 'HUB' | PlayerId | 5) => void;
}

export const SidebarStepper: React.FC<SidebarStepperProps> = ({
  teamState,
  activeView,
  onSelectStage,
}) => {
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-4 shrink-0 font-mono">
      {/* Stepper Card */}
      <div className="flex-1 border border-[#00F0FF]/30 bg-[#0B0F19]/90 p-4 rounded-xl relative shadow-[0_0_15px_rgba(0,240,255,0.08)] backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] uppercase mb-5 tracking-widest text-[#FF007F] border-b border-[#FF007F]/30 pb-2">
          <span className="font-bold">PROGRESS STEPPER</span>
          <button
            onClick={() => {
              onSelectStage('HUB');
              soundFx.playKeypress();
            }}
            className={`px-2 py-0.5 rounded text-[9px] transition-colors ${
              activeView === 'HUB'
                ? 'bg-[#00F0FF] text-[#0B0F19] font-bold'
                : 'text-cyan-400 hover:text-cyan-200'
            }`}
          >
            HUB
          </button>
        </div>

        <div className="space-y-6 relative">
          {/* Vertical Connecting line */}
          <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[#00F0FF]/20" />

          {([1, 2, 3, 4] as PlayerId[]).map((pId) => {
            const status = teamState.playerStatus[pId];
            const isCompleted = status === 'COMPLETED';
            const isActive = status === 'ACTIVE';
            const isLocked = status === 'LOCKED';
            const isCurrentViewing = activeView === pId;
            const info = PLAYER_INFO[pId];

            return (
              <div
                key={pId}
                onClick={() => {
                  if (!isLocked) {
                    onSelectStage(pId);
                    soundFx.playKeypress();
                  } else {
                    soundFx.playLock();
                  }
                }}
                className={`flex items-start gap-3 relative group transition-all ${
                  isLocked ? 'grayscale opacity-40 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Node Pill */}
                {isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14] flex items-center justify-center text-[#0B0F19] text-[10px] font-black z-10 shrink-0">
                    ✓
                  </div>
                ) : isActive ? (
                  <div className="w-6 h-6 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] flex items-center justify-center text-[#0B0F19] text-[10px] font-black z-10 animate-pulse shrink-0">
                    0{pId}
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] text-[10px] font-black z-10 shrink-0">
                    0{pId}
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted
                          ? 'text-[#39FF14]'
                          : isCurrentViewing
                          ? 'text-[#00F0FF] underline decoration-[#00F0FF]'
                          : isActive
                          ? 'text-[#00F0FF]'
                          : 'text-slate-400'
                      }`}
                    >
                      PLAYER {pId}
                    </span>
                    {isCompleted && (
                      <span className="text-[9px] text-[#39FF14] font-bold">
                        +{teamState.playerScores[pId].finalSubgameScore}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] opacity-80 uppercase truncate">
                    {info.title}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Victory Summary Link */}
          <div
            onClick={() => {
              onSelectStage(5);
              soundFx.playKeypress();
            }}
            className={`flex items-start gap-3 relative cursor-pointer pt-1 ${
              activeView === 5 ? 'opacity-100' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-10 shrink-0 ${
                teamState.isFinished
                  ? 'bg-[#FFB800] text-[#0B0F19] shadow-[0_0_10px_#FFB800]'
                  : 'bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#FFB800]'
              }`}
            >
              ★
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-[#FFB800]">TOURNAMENT RANK</div>
              <div className="text-[10px] text-amber-300/70 uppercase">Scorecard Dossier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Latency & Telemetry Gauge */}
      <div className="h-32 border border-[#FFB800]/40 bg-[#FFB800]/5 p-3.5 rounded-xl flex flex-col justify-between shadow-[0_0_12px_rgba(255,184,0,0.1)]">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-[#FFB800] font-bold">
            SYSTEM LATENCY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-ping" />
        </div>

        <div className="flex items-end gap-1 h-9 my-1">
          <div className="flex-1 bg-[#FFB800]/20 h-4 rounded-t-sm animate-pulse" />
          <div className="flex-1 bg-[#FFB800]/50 h-7 rounded-t-sm" />
          <div className="flex-1 bg-[#FFB800]/25 h-3 rounded-t-sm" />
          <div className="flex-1 bg-[#FFB800]/80 h-8 rounded-t-sm animate-pulse" />
          <div className="flex-1 bg-[#FFB800]/30 h-5 rounded-t-sm" />
          <div className="flex-1 bg-[#FFB800]/90 h-9 rounded-t-sm shadow-[0_0_8px_#FFB800]" />
          <div className="flex-1 bg-[#FFB800]/40 h-6 rounded-t-sm" />
        </div>

        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#FFB800] font-bold">STABLE — 14ms</span>
          <span className="text-[9px] opacity-70">UPLINK: 99.9%</span>
        </div>
      </div>
    </aside>
  );
};
