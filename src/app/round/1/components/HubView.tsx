'use client'

import React, { useState } from 'react';
import {
  Brain, Terminal, Eye, Zap, Cpu,
  Play, Lock, CheckCircle2, ChevronRight, Check, Edit2, ShieldAlert
} from 'lucide-react';
import { TeamState, PlayerId, PLAYER_INFO } from '../types';
import { soundFx } from '../utils/audio';

interface HubViewProps {
  teamState: TeamState;
  setTeamState: React.Dispatch<React.SetStateAction<TeamState>>;
  onLaunchGame: (playerId: PlayerId) => void;
  isCaptain?: boolean;
}

const getPlayerIcon = (iconName: string, color: string) => {
  const props = { className: 'w-5 h-5', style: { color } };
  switch (iconName) {
    case 'Brain':    return <Brain {...props} />;
    case 'Terminal': return <Terminal {...props} />;
    case 'Eye':      return <Eye {...props} />;
    case 'Zap':      return <Zap {...props} />;
    default:         return <Cpu {...props} />;
  }
};

const PLAYER_ACCENT: Record<PlayerId, { color: string; tint: string }> = {
  1: { color: '#5de0ff', tint: 'rgba(93,224,255,.1)' },
  2: { color: '#6ff0bc', tint: 'rgba(111,240,188,.1)' },
  3: { color: '#ff6f91', tint: 'rgba(255,111,145,.1)' },
  4: { color: '#d9ff52', tint: 'rgba(217,255,82,.1)' },
};

export const HubView: React.FC<HubViewProps> = ({
  teamState,
  setTeamState,
  onLaunchGame,
  isCaptain = true,
}) => {
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [tempTeamName, setTempTeamName] = useState(teamState.teamName);

  const saveTeamName = () => {
    if (tempTeamName.trim()) {
      setTeamState(prev => ({ ...prev, teamName: tempTeamName.trim() }));
      setIsEditingTeamName(false);
      soundFx.playCorrect();
    }
  };

  const completedCount = ([1, 2, 3, 4] as PlayerId[]).filter(
    p => teamState.playerStatus[p] === 'COMPLETED'
  ).length;

  return (
    <div className="w-full space-y-5 pb-8">

      {/* Ticker ribbon */}
      <div className="overflow-hidden border-b border-white/5 py-2 font-mono-ui text-[9px] uppercase tracking-[.2em] text-zinc-600">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
          <span>AIGNITE AI ARCADE / ROUND 01</span>
          <span>HUMAN VS MACHINE / 4 OPERATIVE SLOTS</span>
          <span>SEQUENTIAL UNLOCK PROTOCOL</span>
          <span>AIGNITE AI ARCADE / ROUND 01</span>
          <span>HUMAN VS MACHINE / 4 OPERATIVE SLOTS</span>
        </div>
      </div>

      {/* Mission header */}
      <div className="animate-rise space-y-1 px-1">
        {/* Team name editable */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEditingTeamName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempTeamName}
                  onChange={e => setTempTeamName(e.target.value)}
                  className="bg-white/[.06] border border-white/20 text-sm font-bold text-white px-2 py-1 rounded-lg outline-none w-36"
                  autoFocus
                />
                <button onClick={saveTeamName} className="text-[#d9ff52]">
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="font-mono-ui text-[10px] text-zinc-500 uppercase tracking-widest">Team:</span>
                <span className="font-bold text-white text-sm">{teamState.teamName}</span>
                {isCaptain && (
                  <button onClick={() => setIsEditingTeamName(true)} className="text-zinc-600 hover:text-zinc-400">
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {isCaptain ? (
            <span className="font-mono-ui text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#d9ff52]/10 border border-[#d9ff52]/20 text-[#d9ff52]">
              Team Captain
            </span>
          ) : (
            <span className="font-mono-ui text-[9px] uppercase tracking-widest text-zinc-500">
              Teammate
            </span>
          )}
        </div>

        <p className="font-mono-ui text-[10px] uppercase tracking-[.22em] text-[#5de0ff]">
          Round 01 / Mission Briefing
        </p>
        <h1 className="font-display text-[clamp(2.8rem,10vw,5rem)] font-bold uppercase leading-[.85] text-white text-shadow-pop">
          Human<br /><span className="text-[#d9ff52]">vs</span><br />Machine.
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
          Four operative slots. Team Captain controls the round execution. Click your active slot to launch the arena.
        </p>
      </div>

      {!isCaptain && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Only your Team Captain can officially start and manage Round 1. You are in spectate / view mode.</span>
        </div>
      )}

      {/* Stage cards */}
      <div className="space-y-3 animate-rise-2">
        <p className="font-mono-ui text-[9px] uppercase tracking-[.22em] text-zinc-600">
          Operative slots — {completedCount}/4 cleared
        </p>

        {([1, 2, 3, 4] as PlayerId[]).map(pId => {
          const status = teamState.playerStatus[pId];
          const info   = PLAYER_INFO[pId];
          const score  = teamState.playerScores[pId];
          const acc    = PLAYER_ACCENT[pId];
          const isCompleted = status === 'COMPLETED';
          const isActive    = status === 'ACTIVE';
          const isLocked    = status === 'LOCKED';

          return (
            <div
              key={pId}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl p-4 border transition-all ${
                isCompleted ? 'border-[#6ff0bc]/30 bg-[#6ff0bc]/5' :
                isActive    ? 'border-[#d9ff52]/40 bg-white/[.04] shadow-[0_0_20px_rgba(217,255,82,0.08)]' :
                              'border-white/5 bg-white/[.02] opacity-50'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Icon */}
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10"
                  style={{ backgroundColor: acc.tint, borderColor: `${acc.color}30` }}
                >
                  {getPlayerIcon(info.icon, acc.color)}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-mono-ui text-[8px] uppercase tracking-widest text-zinc-500">
                      Slot 0{pId}
                    </p>
                    {isCompleted && (
                      <span className="font-mono-ui text-[8px] text-[#6ff0bc] flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Cleared
                      </span>
                    )}
                    {isActive && (
                      <span className="font-mono-ui text-[8px] text-[#d9ff52] pulse-dot">● Active</span>
                    )}
                    {isLocked && (
                      <span className="font-mono-ui text-[8px] text-zinc-600 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-sm text-white leading-tight mt-0.5">{info.title}</p>
                  <p className="font-mono-ui text-[9px] text-zinc-500 mt-0.5">{info.role}</p>
                  {isCompleted && score && (
                    <p className="font-mono-ui text-[9px] text-[#6ff0bc] mt-0.5 font-bold">
                      +{score.finalSubgameScore.toLocaleString()} pts
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center justify-end">
                {isActive && (
                  <button
                    onClick={() => onLaunchGame(pId)}
                    disabled={!isCaptain}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-5 rounded-lg bg-[#d9ff52] text-[#0d1117] font-mono-ui text-xs font-black uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#ff6f91] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Launch Arena
                  </button>
                )}
                {isCompleted && (
                  <button
                    onClick={() => onLaunchGame(pId)}
                    className="font-mono-ui text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/30 transition-all"
                  >
                    Review <ChevronRight className="w-3 h-3" />
                  </button>
                )}
                {isLocked && (
                  <span className="font-mono-ui text-[9px] text-zinc-600 italic">
                    Requires Slot 0{pId - 1}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
