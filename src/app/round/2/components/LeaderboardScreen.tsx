'use client'

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/scoring';
import { 
  Trophy, 
  Medal, 
  Crown, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

export const LeaderboardScreen: React.FC = () => {
  const { leaderboard, gameState, restartGame, navigateToScreen, selectTeam, teamsList, isCaptain } = useGame();
  const { team: currentTeam } = gameState;
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({});

  // Animate score counter on load
  useEffect(() => {
    const duration = 1000;
    const steps = 25;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newScores: Record<string, number> = {};
      leaderboard.forEach(entry => {
        newScores[entry.id] = Math.floor(entry.score * Math.min(1, progress));
      });
      setAnimatedScores(newScores);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [leaderboard]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-black text-sm shadow-md shadow-amber-500/30">
          <Crown className="w-4 h-4 text-amber-400" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-xl bg-slate-400/20 border border-slate-300 flex items-center justify-center text-slate-200 font-black text-sm">
          <Medal className="w-4 h-4 text-slate-300" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-700/20 border border-amber-600 flex items-center justify-center text-amber-500 font-black text-sm">
          <Medal className="w-4 h-4 text-amber-600" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 font-mono-code font-bold text-xs">
        {rank}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code font-bold tracking-widest uppercase shadow-lg">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>LIVE EVENT STANDINGS</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase text-glow-cyan">
            ROUND 2 LEADERBOARD
          </h1>

          <p className="font-sans text-sm sm:text-base text-slate-300 font-medium">
            Official ranking matrix for the "AI Who Am I?" mystery deduction challenge
          </p>
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="rounded-3xl border-2 border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden box-glow-cyan">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
            <div className="col-span-2 sm:col-span-1 text-center">RANK</div>
            <div className="col-span-6 sm:col-span-5">TEAM NAME</div>
            <div className="hidden sm:block sm:col-span-2 text-center">QUESTIONS</div>
            <div className="hidden sm:block sm:col-span-2 text-center">TIME</div>
            <div className="col-span-4 sm:col-span-2 text-right">SCORE</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-800/60 max-h-[480px] overflow-y-auto">
            {leaderboard.map((entry) => {
              const isCurrent = entry.teamName === currentTeam.name || entry.isCurrentTeam;
              const displayScore = animatedScores[entry.id] ?? entry.score;

              return (
                <div
                  key={entry.id}
                  className={`
                    grid grid-cols-12 gap-2 items-center px-4 sm:px-6 py-4 transition-all
                    ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-l-4 border-cyan-400 font-bold'
                        : 'hover:bg-slate-800/40'
                    }
                  `}
                >
                  {/* Rank */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    {getRankBadge(entry.rank)}
                  </div>

                  {/* Team Name */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-display text-sm sm:text-base ${isCurrent ? 'text-cyan-300 font-extrabold' : 'text-slate-100 font-bold'}`}>
                          {entry.teamName}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 border border-cyan-400 text-cyan-300 text-[10px] font-mono-code uppercase font-bold hidden xs:inline">
                            CURRENT SQUAD
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-code sm:hidden">
                        {entry.questionsUsed} Qs • {formatTime(entry.timeTakenSec)}
                      </div>
                    </div>
                  </div>

                  {/* Questions Used */}
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 font-mono-code text-xs text-slate-300">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{entry.questionsUsed} / 5</span>
                  </div>

                  {/* Time Taken */}
                  <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 font-mono-code text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{formatTime(entry.timeTakenSec)}</span>
                  </div>

                  {/* Score */}
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-mono-code font-black text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white text-glow-cyan">
                      {displayScore}
                    </span>
                    <span className="text-[10px] text-cyan-500 font-bold uppercase ml-1 font-mono-code">
                      PTS
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Controls */}
        {isCaptain && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="back-to-arcade-btn"
              type="button"
              onClick={restartGame}
              className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-display font-bold text-sm sm:text-base text-slate-200 uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO ARCADE</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
