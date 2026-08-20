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
    finalScore, 
    timeRemainingSec,
    mysteryEntitiesList,
    segmentScores,
    segmentTimes
  } = gameState;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="w-full max-w-3xl space-y-8 text-center">
        
        {/* Result Outcome Header */}
        {finalScore > 0 ? (
          <div className="space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 box-glow-emerald">
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-emerald-400 tracking-tight uppercase text-glow-cyan">
              MISSION SUCCESS! 🎉
            </h1>
            <p className="font-sans font-semibold text-lg sm:text-xl text-emerald-200">
              "You successfully identified mystery entities this round!"
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-2xl shadow-rose-500/40 box-glow-rose">
              <XCircle className="w-14 h-14 text-rose-400" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-rose-400 tracking-tight uppercase">
              MISSION FAILURE ✕
            </h1>
            <p className="font-sans font-semibold text-lg sm:text-xl text-rose-200">
              "You couldn't identify the mystery entities this round."
            </p>
          </div>
        )}

        {/* Revealed Mystery Entity Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-[#0c172d]/90 to-[#070e1c]/95 backdrop-blur-xl shadow-2xl space-y-6 text-left box-glow-cyan">
          
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400">
              ROUND Summary: MYSTERY CHARACTERS REVEALED
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase mt-1">
              RESULTS BREAKDOWN
            </h2>
          </div>

          <div className="space-y-4">
            {mysteryEntitiesList && mysteryEntitiesList.length > 0 ? (
              mysteryEntitiesList.map((ent, idx) => {
                const score = segmentScores[idx] || 0;
                const time = segmentTimes[idx] || 0;
                const passed = score > 0;

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/65 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-xs font-bold text-slate-500">#{idx + 1}</span>
                        <h3 className="font-sans font-bold text-base text-slate-100">{ent.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-medium text-cyan-300 font-mono-code">
                          {ent.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-sans italic line-clamp-1">{ent.description}</p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-right">
                        <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono">TIME TAKEN</span>
                        <span className="font-mono-code text-xs text-slate-300 font-semibold">{formatTime(time)}</span>
                      </div>

                      <div className="px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 bg-slate-950/90 border-slate-800 shadow-inner">
                        {passed ? (
                          <div className="flex items-center gap-1 text-emerald-400 font-mono-code text-xs font-black">
                            <span>+{score} PTS</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-rose-400 font-mono-code text-xs font-black">
                            <span>0 PTS</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-slate-400 text-sm">No entities played.</div>
            )}
          </div>

          {/* Match Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TOTAL SCORE AWARDED</span>
              <div className="font-mono-code font-black text-xl sm:text-2xl text-cyan-300">
                {finalScore} <span className="text-xs font-normal">/ 750 PTS</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">COMBINED TIME</span>
              <div className="font-mono-code font-extrabold text-lg sm:text-xl text-slate-100">
                {formatTime(segmentTimes.reduce((sum, t) => sum + t, 0))}
              </div>
            </div>

          </div>

        </div>

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
