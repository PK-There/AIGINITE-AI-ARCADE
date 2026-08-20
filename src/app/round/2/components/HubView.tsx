'use client'

import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Play, 
  Lock, 
  CheckCircle2, 
  Cpu, 
  Terminal, 
  Eye, 
  Zap, 
  Brain, 
  Sparkles, 
  ArrowRight,
  Edit2,
  Check,
  AlertTriangle
} from 'lucide-react';
import { TeamState, PlayerId, PLAYER_CODES, PLAYER_INFO } from '../types-r1';
import { soundFx } from '../utils/audio';

interface HubViewProps {
  teamState: TeamState;
  setTeamState: React.Dispatch<React.SetStateAction<TeamState>>;
  onLaunchGame: (playerId: PlayerId) => void;
}

export const HubView: React.FC<HubViewProps> = ({
  teamState,
  setTeamState,
  onLaunchGame,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [verifiedPlayer, setVerifiedPlayer] = useState<PlayerId | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [tempTeamName, setTempTeamName] = useState(teamState.teamName);

  const getPlayerIcon = (iconName: string, color: string) => {
    const props = { className: 'w-5 h-5', style: { color } };
    switch (iconName) {
      case 'Brain': return <Brain {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'Zap': return <Zap {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  const handleVerifyCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    const cleaned = inputCode.trim().toUpperCase();

    let foundPlayer: PlayerId | null = null;
    for (const [pStr, code] of Object.entries(PLAYER_CODES)) {
      if (code === cleaned) {
        foundPlayer = Number(pStr) as PlayerId;
        break;
      }
    }

    if (!foundPlayer) {
      soundFx.playWrong();
      setErrorMessage('INVALID ACCESS CODE. PLEASE CHECK WITH YOUR TEAMMATE.');
      return;
    }

    const playerStatus = teamState.playerStatus[foundPlayer];
    if (playerStatus === 'LOCKED') {
      soundFx.playLock();
      const prevPlayer = (foundPlayer - 1) as PlayerId;
      setErrorMessage(`ACCESS DENIED: PLAYER ${foundPlayer} IS LOCKED. COMPLETE PLAYER ${prevPlayer} FIRST!`);
      return;
    }

    soundFx.playCorrect();
    setVerifiedPlayer(foundPlayer);
  };

  const handleQuickCodeFill = (pId: PlayerId) => {
    setInputCode(PLAYER_CODES[pId]);
    soundFx.playKeypress();
  };

  const saveTeamName = () => {
    if (tempTeamName.trim()) {
      setTeamState((prev) => ({ ...prev, teamName: tempTeamName.trim() }));
      setIsEditingTeamName(false);
      soundFx.playCorrect();
    }
  };

  return (
    <div className="w-full space-y-6 font-mono">
      {/* Immersive Hub Arena Box */}
      <div className="border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl relative flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />

        <div className="p-4 sm:p-6 flex flex-col space-y-6">
          {/* Header & Mission Objective */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#00F0FF]/20 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#00F0FF] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] font-display uppercase">
                MISSION BRIEFING // ROUND 1: HUMAN VS MACHINE
              </h2>
              <p className="text-[10px] uppercase opacity-70 italic text-[#00F0FF]">
                Four Operative Slots // Synchronized Neural Relay // Sequential Unlock Protocol
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/40 px-3 py-1.5 rounded flex items-center gap-2">
                <span className="text-[10px] text-slate-400">SQUAD:</span>
                {isEditingTeamName ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={tempTeamName}
                      onChange={(e) => setTempTeamName(e.target.value)}
                      className="bg-slate-900 border border-cyan-400 text-xs text-[#00F0FF] px-1.5 py-0.5 rounded w-28 outline-none"
                      autoFocus
                    />
                    <button onClick={saveTeamName} className="text-[#39FF14]">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#00F0FF]">{teamState.teamName}</span>
                    <button 
                      onClick={() => setIsEditingTeamName(true)}
                      className="text-slate-500 hover:text-cyan-400"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-[#FF007F]/20 border border-[#FF007F] px-3 py-1.5 rounded text-[#FF007F] font-bold text-xs">
                ID: {teamState.teamId}
              </div>
            </div>
          </div>

          {/* 4 Operative Stage Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([1, 2, 3, 4] as PlayerId[]).map((pId) => {
              const status = teamState.playerStatus[pId];
              const info = PLAYER_INFO[pId];
              const scoreData = teamState.playerScores[pId];
              const isCompleted = status === 'COMPLETED';
              const isActive = status === 'ACTIVE';

              let cardBg = 'bg-[#0B0F19] border-[#00F0FF]/20 opacity-60';
              if (isCompleted) cardBg = 'bg-[#39FF14]/5 border-[#39FF14]/50 shadow-[0_0_15px_rgba(57,255,20,0.15)] opacity-100';
              if (isActive) cardBg = 'bg-[#00F0FF]/10 border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.25)] opacity-100';

              return (
                <div
                  key={pId}
                  className={`rounded-lg p-4 border transition-all flex flex-col justify-between ${cardBg}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#00F0FF]/20 text-[#00F0FF]">
                        SLOT 0{pId}
                      </span>

                      {isCompleted ? (
                        <span className="text-[10px] font-bold text-[#39FF14] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> CLEARED
                        </span>
                      ) : isActive ? (
                        <span className="text-[10px] font-bold text-[#00F0FF] animate-pulse">
                          ● ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> LOCKED
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-black/40 border border-[#00F0FF]/30">
                        {getPlayerIcon(info.icon, info.color)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-100">{info.title}</h4>
                        <span className="text-[10px] text-slate-400">{info.role}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed mb-3">
                      {info.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#00F0FF]/20 space-y-2">
                    {isCompleted ? (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">SCORE:</span>
                        <span className="font-bold text-[#39FF14]">+{scoreData.finalSubgameScore} PTS</span>
                      </div>
                    ) : isActive ? (
                      <button
                        onClick={() => handleQuickCodeFill(pId)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-200 underline decoration-cyan-500/40 cursor-pointer block"
                      >
                        Passcode: {PLAYER_CODES[pId]}
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic block">
                        Requires Slot {pId - 1} clearance
                      </span>
                    )}

                    {isActive && (
                      <button
                        onClick={() => onLaunchGame(pId)}
                        className="w-full py-2 px-3 bg-[#00F0FF] text-[#0B0F19] font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        LAUNCH ARENA
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        onClick={() => onLaunchGame(pId)}
                        className="w-full py-1.5 px-3 bg-transparent border border-[#00F0FF]/40 text-[#00F0FF] text-[10px] font-bold uppercase hover:bg-[#00F0FF]/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Review Stage
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Access Key Input Card */}
          <div className="max-w-xl mx-auto w-full bg-[#00F0FF]/5 border border-[#00F0FF]/30 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#00F0FF]/20 pb-2">
              <Key className="w-4 h-4 text-[#00F0FF]" />
              <div>
                <h3 className="font-bold text-sm text-[#00F0FF] uppercase">
                  OPERATIVE KEYCODE TERMINAL
                </h3>
                <p className="text-[10px] text-slate-400">
                  ENTER 5-CHARACTER AUTHENTICATION CODE TO ENGAGE
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={5}
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value.toUpperCase());
                    setErrorMessage(null);
                    setVerifiedPlayer(null);
                  }}
                  placeholder="e.g. A7X92"
                  className="flex-1 bg-[#0B0F19] border border-[#00F0FF]/50 focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,0.4)] rounded px-3 py-2 text-lg font-black tracking-[0.25em] text-[#00F0FF] placeholder:text-slate-700 outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-5 bg-transparent border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19] text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  VERIFY
                </button>
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 p-2.5 rounded bg-red-950/80 border border-red-500 text-red-300 text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {verifiedPlayer && (
                <div className="p-3 rounded bg-[#39FF14]/10 border border-[#39FF14] space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#39FF14]">
                      ✓ CLEARANCE GRANTED: PLAYER {verifiedPlayer} ({PLAYER_INFO[verifiedPlayer].title})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onLaunchGame(verifiedPlayer)}
                    className="w-full py-2.5 bg-[#00F0FF] text-[#0B0F19] font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    [ ENTER ARENA NOW ]
                  </button>
                </div>
              )}
            </form>

            {/* Quick passcode cheats for testing/fast play */}
            <div className="pt-2 flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-slate-400">QUICK FILL:</span>
              {([1, 2, 3, 4] as PlayerId[]).map((pId) => (
                <button
                  key={pId}
                  type="button"
                  onClick={() => handleQuickCodeFill(pId)}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#0B0F19] border border-[#00F0FF]/30 text-[#00F0FF] hover:border-[#00F0FF] cursor-pointer"
                >
                  P{pId}: {PLAYER_CODES[pId]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
