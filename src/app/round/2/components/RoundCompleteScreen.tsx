'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/scoring';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  HelpCircle, 
  Clock, 
  Zap, 
  RotateCcw
} from 'lucide-react';
import { ROUND_CONFIG } from '../data/config';

export const RoundCompleteScreen: React.FC = () => {
  const { gameState, navigateToScreen, restartGame } = useGame();
  const { 
    team, 
    questionHistory, 
    guessCorrect, 
    finalScore, 
    timeRemainingSec 
  } = gameState;

  const questionsUsed = Math.max(1, questionHistory.length);
  const timeTakenSec = ROUND_CONFIG.roundDurationSeconds - timeRemainingSec;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-2xl space-y-8 text-center">
        
        {/* Stage Completion Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>STAGE FINALIZED</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
            ROUND 2 COMPLETE
          </h1>

          <p className="font-display text-lg sm:text-xl text-cyan-300 font-semibold">
            Official deduction record logged for the leaderboard
          </p>
        </div>

        {/* Performance Scorecard Card */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-b from-slate-900/95 via-[#0a1426]/90 to-[#070e1c]/95 backdrop-blur-xl shadow-2xl space-y-6 text-left box-glow-cyan">
          
          {/* Team Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 font-display font-black text-xl">
                {team.name.charAt(0)}
              </div>
              <div>
                <span className="block text-[10px] font-mono-code font-bold text-slate-400 uppercase tracking-widest">
                  PARTICIPATING SQUAD
                </span>
                <h3 className="font-display font-black text-xl text-white">
                  {team.name}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="block text-[10px] font-mono-code font-bold text-slate-400 uppercase tracking-widest">
                VERDICT
              </span>
              {guessCorrect ? (
                <span className="inline-flex items-center gap-1 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> CORRECT ✓
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-bold text-rose-400 text-sm">
                  <XCircle className="w-4 h-4" /> WRONG ✕
                </span>
              )}
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                Questions Inquired
              </span>
              <div className="font-mono-code font-bold text-lg sm:text-xl text-slate-100">
                {questionsUsed} / {ROUND_CONFIG.maxQuestions}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Total Time Elapsed
              </span>
              <div className="font-mono-code font-bold text-lg sm:text-xl text-slate-100">
                {formatTime(timeTakenSec)}
              </div>
            </div>
          </div>

          {/* Big Score Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-blue-950/60 border-2 border-cyan-500/40 text-center space-y-2">
            <span className="font-mono-code text-xs uppercase tracking-widest text-cyan-300 font-bold">
              OFFICIAL ROUND 2 SCORE
            </span>
            <div className="font-display font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-300 text-glow-cyan">
              {finalScore} <span className="text-2xl text-cyan-400 font-sans font-bold">PTS</span>
            </div>
            <p className="text-xs text-slate-400">
              {guessCorrect
                ? 'High efficiency bonus awarded for rapid mystery identification!'
                : 'Zero points recorded for incorrect guess.'}
            </p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="view-leaderboard-complete-btn"
            type="button"
            onClick={() => navigateToScreen('LEADERBOARD')}
            className="w-full sm:w-auto flex-1 py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-black text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 transition-all cursor-pointer"
          >
            <Trophy className="w-6 h-6 text-slate-950" />
            <span>VIEW LEADERBOARD</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="restart-round-btn"
            type="button"
            onClick={restartGame}
            className="w-full sm:w-auto py-4 sm:py-5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-display font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>PLAY AGAIN</span>
          </button>
        </div>

      </div>
    </div>
  );
};
