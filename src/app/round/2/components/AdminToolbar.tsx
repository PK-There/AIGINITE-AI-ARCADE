'use client'

import React, { useState } from 'react';
import { Wrench, ChevronDown, ChevronUp, RotateCcw, FastForward, CheckCircle, Key, Zap, Volume2, Shield } from 'lucide-react';
import { TeamState, PlayerId, PLAYER_CODES, PLAYER_INFO } from '../types-r1';
import { soundFx } from '../utils/audio';

interface AdminToolbarProps {
  teamState: TeamState;
  setTeamState: React.Dispatch<React.SetStateAction<TeamState>>;
  onJumpStage: (stage: PlayerId | 5) => void;
  onAutoCompleteGame: (playerId: PlayerId) => void;
  onResetAll: () => void;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  teamState,
  setTeamState,
  onJumpStage,
  onAutoCompleteGame,
  onResetAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTestAudio = () => {
    soundFx.playCorrect();
    setTimeout(() => soundFx.playSuccessFanfare(), 300);
  };

  const handleUnlockAll = () => {
    soundFx.playSuccessFanfare();
    setTeamState((prev) => ({
      ...prev,
      playerStatus: {
        1: 'COMPLETED',
        2: 'COMPLETED',
        3: 'COMPLETED',
        4: 'COMPLETED',
      },
      playerScores: {
        1: { playerScore: 1200, correctAnswers: 6, wrongAnswers: 1, completionTime: 45, speedBonus: 250, finalSubgameScore: 1450 },
        2: { playerScore: 1300, correctAnswers: 1, wrongAnswers: 0, completionTime: 38, speedBonus: 320, finalSubgameScore: 1620 },
        3: { playerScore: 1200, correctAnswers: 5, wrongAnswers: 1, completionTime: 52, speedBonus: 280, finalSubgameScore: 1480 },
        4: { playerScore: 1400, correctAnswers: 7, wrongAnswers: 1, completionTime: 34, speedBonus: 380, finalSubgameScore: 1780 },
      },
      teamScore: 6330,
      totalTime: 169,
      currentStage: 5,
      isFinished: true,
    }));
  };

  return (
    <div className="fixed bottom-3 right-3 z-50 font-mono text-xs select-none">
      {/* Toggle Pill */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            soundFx.playKeypress();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border border-cyan-500/50 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:bg-slate-800 transition-all"
        >
          <Wrench className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="font-bold tracking-wider">JUDGE / ADMIN TOOLBAR</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="mt-2 w-80 sm:w-96 p-4 rounded-xl bg-[#090D17]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Shield className="w-4 h-4" />
              <span>JUDGE CONTROL PANEL</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-800">
              BYPASS & DEMO
            </span>
          </div>

          {/* Access Codes Cheatsheet */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-bold tracking-wider">
              PLAYER ACCESS CODES:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {([1, 2, 3, 4] as PlayerId[]).map((pId) => (
                <div
                  key={pId}
                  className="flex items-center justify-between bg-slate-900/80 border border-slate-700/60 px-2 py-1 rounded text-[11px]"
                >
                  <span className="text-slate-300 font-semibold">P{pId}:</span>
                  <span className="text-[#00F0FF] font-bold tracking-widest">{PLAYER_CODES[pId]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stage Fast Jump Buttons */}
          <div>
            <span className="text-[10px] text-slate-400 block mb-1 font-bold tracking-wider">
              DIRECT STAGE WARP:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {([1, 2, 3, 4] as PlayerId[]).map((pId) => (
                <button
                  key={pId}
                  onClick={() => {
                    onJumpStage(pId);
                    soundFx.playKeypress();
                  }}
                  className={`px-2 py-1 rounded border text-[11px] font-bold transition-all ${
                    teamState.currentStage === pId
                      ? 'bg-cyan-500/20 border-cyan-400 text-[#00F0FF]'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500/60'
                  }`}
                >
                  Player {pId}
                </button>
              ))}
              <button
                onClick={() => {
                  onJumpStage(5);
                  soundFx.playKeypress();
                }}
                className={`col-span-2 px-2 py-1 rounded border text-[11px] font-bold transition-all ${
                  teamState.currentStage === 5
                    ? 'bg-amber-500/20 border-amber-400 text-[#FFB800]'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/60'
                }`}
              >
                🏆 View Victory / R1 Summary
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            {teamState.currentStage !== 5 && (
              <button
                onClick={() => {
                  onAutoCompleteGame(teamState.currentStage as PlayerId);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-emerald-950/70 border border-emerald-500/50 text-[#39FF14] hover:bg-emerald-900/60 font-bold transition-all"
              >
                <FastForward className="w-3.5 h-3.5" />
                Auto-Pass Player {teamState.currentStage} Challenge
              </button>
            )}

            <button
              onClick={handleUnlockAll}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-gradient-to-r from-cyan-950 to-magenta-950 border border-cyan-500/50 text-cyan-200 hover:opacity-90 font-bold transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF007F]" />
              Simulate Full 4-Player Run Victory (6,330 PTS)
            </button>
          </div>

          {/* Audio test & Reset */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <button
              onClick={handleTestAudio}
              className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
            >
              <Volume2 className="w-3 h-3" />
              Test Audio Fx
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset all tournament state back to initial stage?')) {
                  onResetAll();
                }
              }}
              className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300"
            >
              <RotateCcw className="w-3 h-3" />
              Reset State
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
