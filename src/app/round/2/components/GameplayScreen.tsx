'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { MysteryCard } from './MysteryCard';
import { QuestionGrid } from './QuestionGrid';
import { QuestionHistory } from './QuestionHistory';
import { FinalGuessCard } from './FinalGuessCard';
import { AIThinkingModal } from './AIThinkingModal';
import { HelpCircle, Award, Target, Flame } from 'lucide-react';
import { ROUND_CONFIG } from '../data/config';

export const GameplayScreen: React.FC = () => {
  const { gameState } = useGame();
  const { questionHistory, maxQuestions } = gameState;

  const questionsRemaining = Math.max(0, maxQuestions - questionHistory.length);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-fade-in">
      
      {/* AI Thinking / Response Overlay Modal */}
      <AIThinkingModal />

      {/* 1. MYSTERY ENTITY CARD */}
      <section aria-label="Mystery Entity Section">
        <MysteryCard />
      </section>

      {/* 2. MAIN BATTLE ARENA GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left / Main Section (8 cols on lg): Questions & Final Guess */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Question Inquiries */}
          <section className="p-6 sm:p-7 rounded-3xl border border-cyan-500/20 bg-slate-900/60 backdrop-blur-xl shadow-xl">
            <QuestionGrid />
          </section>

          {/* Final Guess Card */}
          <section>
            <FinalGuessCard />
          </section>

        </div>

        {/* Right Sidebar Section (4 cols on lg): Deduction Log & Guide */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Deduction History */}
          <QuestionHistory />

          {/* Quick Round 2 Tactical Guide */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono-code text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>ROUND 2 SCORING MATRIX</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300 font-medium">1 Question Used:</span>
                <span className="font-mono-code font-bold text-cyan-300">+950 PTS</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300 font-medium">2 Questions Used:</span>
                <span className="font-mono-code font-bold text-cyan-300">+880 PTS</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300 font-medium">3 Questions Used:</span>
                <span className="font-mono-code font-bold text-cyan-300">+780 PTS</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300 font-medium">4 Questions Used:</span>
                <span className="font-mono-code font-bold text-cyan-300">+650 PTS</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300 font-medium">5 Questions Used:</span>
                <span className="font-mono-code font-bold text-cyan-300">+500 PTS</span>
              </li>
            </ul>

            <p className="text-[11px] text-slate-500 italic">
              * Extra time bonuses applied for each second remaining when submitted correctly.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
};
