'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { formatTime } from '../utils/scoring';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Award, 
  Clock, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { ROUND_CONFIG } from '../data/config';

export const ResultScreen: React.FC = () => {
  const { gameState, navigateToScreen } = useGame();
  const { 
    mysteryEntity, 
    guessCorrect, 
    finalGuess, 
    questionHistory, 
    finalScore, 
    timeRemainingSec 
  } = gameState;

  const questionsUsed = Math.max(1, questionHistory.length);
  const timeTakenSec = ROUND_CONFIG.roundDurationSeconds - timeRemainingSec;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-3xl space-y-8 text-center">
        
        {/* Result Outcome Header */}
        {guessCorrect ? (
          <div className="space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 box-glow-emerald">
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-emerald-400 tracking-tight uppercase text-glow-cyan">
              CORRECT! 🎉
            </h1>
            <p className="font-sans font-semibold text-lg sm:text-xl text-emerald-200">
              "You successfully identified the secret mystery entity!"
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-2xl shadow-rose-500/40 box-glow-rose">
              <XCircle className="w-14 h-14 text-rose-400" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-rose-400 tracking-tight uppercase">
              WRONG GUESS ✕
            </h1>
            <p className="font-sans font-semibold text-lg sm:text-xl text-rose-200">
              "You couldn't identify the mystery entity this round."
            </p>
          </div>
        )}

        {/* Revealed Mystery Entity Showcase */}
        {mysteryEntity && (
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-[#0c172d]/90 to-[#070e1c]/95 backdrop-blur-xl shadow-2xl space-y-6 text-left box-glow-cyan">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400">
                  MYSTERY IDENTITY REVEALED
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wide">
                  {mysteryEntity.name}
                </h2>
              </div>

              <div className="px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm">
                {mysteryEntity.category}
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {mysteryEntity.description}
            </p>

            {/* Entity Tags / Attributes */}
            <div className="flex flex-wrap gap-2 pt-1">
              {mysteryEntity.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300"
                >
                  <Tag className="w-3 h-3 text-cyan-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Match Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
              
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">QUESTIONS USED</span>
                <div className="font-mono-code font-extrabold text-lg sm:text-xl text-cyan-400">
                  {questionsUsed} <span className="text-xs text-slate-500 font-normal">/ {ROUND_CONFIG.maxQuestions}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TIME TAKEN</span>
                <div className="font-mono-code font-extrabold text-lg sm:text-xl text-slate-100">
                  {formatTime(timeTakenSec)}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MY GUESS</span>
                <div className="font-sans font-bold text-sm sm:text-base text-slate-200 truncate">
                  "{finalGuess || 'None'}"
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">SCORE AWARDED</span>
                <div className="font-mono-code font-black text-xl sm:text-2xl text-cyan-300">
                  {finalScore} <span className="text-xs font-normal">PTS</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Action Button to Next Stage */}
        <div>
          <button
            id="view-round-summary-btn"
            type="button"
            onClick={() => navigateToScreen('ROUND_COMPLETE')}
            className="w-full max-w-md mx-auto py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-display font-black text-lg sm:text-xl tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 transition-all cursor-pointer"
          >
            <span>PROCEED TO ROUND 2 SUMMARY</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
