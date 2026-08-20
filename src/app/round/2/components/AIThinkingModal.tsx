'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, Cpu, HelpCircle } from 'lucide-react';

export const AIThinkingModal: React.FC = () => {
  const { gameState, dismissResponseModal } = useGame();
  const { isAIAnalyzing, latestAnswer, questionHistory, maxQuestions } = gameState;

  if (!isAIAnalyzing && !latestAnswer) {
    return null;
  }

  const questionsRemaining = Math.max(0, maxQuestions - questionHistory.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-[#070e1e]/95 p-6 sm:p-8 text-center shadow-2xl shadow-cyan-950 box-glow-cyan">
        
        {/* Background ambient glow */}
        <div className="absolute inset-0 arcade-grid-bg opacity-20 pointer-events-none" />

        {/* 1. THINKING STATE */}
        {isAIAnalyzing && (
          <div className="relative z-10 py-8 space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-300">
                <Cpu className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-display font-black tracking-widest text-2xl sm:text-3xl text-cyan-300 animate-pulse uppercase">
                ANALYZING...
              </div>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 font-mono-code text-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                <span>EVALUATING SECRET ENTITY ATTRIBUTES</span>
              </div>
            </div>

            <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* 2. REVEALED ANSWER STATE (YES / NO) */}
        {!isAIAnalyzing && latestAnswer && (
          <div className="relative z-10 py-4 space-y-6">
            
            {/* Answer Badge */}
            {latestAnswer.answer ? (
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 box-glow-emerald animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-emerald-400 tracking-wider text-glow-cyan uppercase">
                  YES ✓
                </div>
                <p className="text-emerald-300/90 text-sm font-medium">
                  Affirmative! This attribute matches the mystery entity.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/30 box-glow-rose">
                  <XCircle className="w-10 h-10 text-rose-400" />
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-rose-400 tracking-wider uppercase">
                  NO ✕
                </div>
                <p className="text-rose-300/90 text-sm font-medium">
                  Negative! This attribute does NOT match the mystery entity.
                </p>
              </div>
            )}

            {/* Question Details Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2 shadow-inner">
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-slate-400">
                QUESTION INQUIRED
              </span>
              <p className="font-sans font-semibold text-base sm:text-lg text-slate-100">
                "{latestAnswer.questionText}"
              </p>
            </div>

            {/* Questions Remaining Meter */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs sm:text-sm">
              <span className="text-slate-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Questions Remaining:
              </span>
              <span className="font-mono-code font-bold text-cyan-300 text-base">
                {questionsRemaining} <span className="text-slate-500 font-normal">/ {maxQuestions}</span>
              </span>
            </div>

            {/* Continue Button */}
            <button
              id="dismiss-answer-modal-btn"
              type="button"
              onClick={dismissResponseModal}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-display font-bold text-base sm:text-lg text-slate-950 tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <span>CONTINUE DEDUCTION</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
