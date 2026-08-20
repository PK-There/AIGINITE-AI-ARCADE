'use client'

import React from 'react';
import { useGame } from '../context/GameContext';
import { QuestionCard } from './QuestionCard';
import { Sparkles, ArrowRight, HelpCircle, Zap } from 'lucide-react';

export const QuestionGrid: React.FC = () => {
  const { gameState, selectQuestion, askAI } = useGame();
  const { 
    availableQuestions, 
    selectedQuestionId, 
    questionHistory, 
    maxQuestions, 
    isAIAnalyzing,
    timeRemainingSec
  } = gameState;

  const questionsRemaining = Math.max(0, maxQuestions - questionHistory.length);
  const usedQuestionIds = questionHistory.map(q => q.questionId);
  const isOutOfQuestions = questionsRemaining === 0;

  return (
    <div className="space-y-6">
      
      {/* Header bar for Question Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
            CHOOSE YOUR QUESTION
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-code font-bold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-cyan-500/20 text-cyan-300">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>QUESTIONS REMAINING:</span>
          <span className="text-white text-sm bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-500/40">
            {questionsRemaining} / {maxQuestions}
          </span>
        </div>
      </div>

      {/* 6 Questions Grid Layout */}
      {isOutOfQuestions ? (
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-amber-500/30 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 font-bold">
            0/5
          </div>
          <h3 className="font-display font-bold text-lg text-amber-300">
            All 5 Questions Consumed!
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            You have used the maximum allotted questions. Make your deduction count in the final guess section below.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {availableQuestions.map((q) => {
            const match = q.id.match(/q-(\d+)/);
            const qIndex = match ? parseInt(match[1]) : 0;
            const elapsed = 120 - timeRemainingSec;
            const isRevealed = elapsed >= qIndex * 10;

            if (!isRevealed) {
              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20 flex flex-col justify-center items-center text-center space-y-1 h-[90px] opacity-40 select-none animate-pulse"
                >
                  <span className="text-[10px] font-mono tracking-widest text-purple-500/70 uppercase">
                    [ CLUE {qIndex + 1} LOCKED ]
                  </span>
                  <span className="text-[9px] font-mono text-zinc-600">
                    Unlocks in {Math.max(0, qIndex * 10 - elapsed)}s
                  </span>
                </div>
              );
            }

            return (
              <QuestionCard
                key={q.id}
                question={q}
                index={qIndex}
                isSelected={selectedQuestionId === q.id}
                isUsed={usedQuestionIds.includes(q.id)}
                onSelect={selectQuestion}
                disabled={isAIAnalyzing || isOutOfQuestions}
              />
            );
          })}
        </div>
      )}

      {/* Centralized Action: [ ASK AI ] Button */}
      {!isOutOfQuestions && (
        <div className="pt-2 flex flex-col items-center justify-center space-y-3">
          <button
            id="ask-ai-button"
            type="button"
            onClick={askAI}
            disabled={!selectedQuestionId || isAIAnalyzing}
            className={`
              w-full max-w-md py-4 sm:py-5 px-8 rounded-2xl font-display font-black text-lg sm:text-xl tracking-wider uppercase
              flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer
              ${
                selectedQuestionId && !isAIAnalyzing
                  ? 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/30 hover:scale-[1.02] hover:shadow-cyan-400/50 border border-cyan-200'
                  : 'bg-slate-800/80 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
              }
            `}
          >
            <Sparkles className={`w-6 h-6 ${selectedQuestionId ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>ASK AI</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-slate-400 font-mono-code text-center">
            {selectedQuestionId
              ? '⚡ Question locked. Click ASK AI to run real-time neural verification.'
              : 'Select one question from the pool above to unlock ASK AI.'}
          </p>
        </div>
      )}

    </div>
  );
};
