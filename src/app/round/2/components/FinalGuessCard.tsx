'use client'

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Target, Send, AlertCircle, Sparkles, Award } from 'lucide-react';

export const FinalGuessCard: React.FC = () => {
  const { gameState, submitFinalGuess } = useGame();
  const { questionHistory, maxQuestions, timeRemainingSec } = gameState;
  const [guessInput, setGuessInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const questionsRemaining = Math.max(0, maxQuestions - questionHistory.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) {
      setErrorMsg('Please enter your mystery entity guess before submitting.');
      return;
    }

    setErrorMsg('');
    submitFinalGuess(guessInput.trim());
  };

  return (
    <div
      id="final-guess-section"
      className="rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-b from-slate-900/95 via-[#0b1528]/90 to-[#070e1c]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 box-glow-cyan"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code font-bold uppercase tracking-wider mb-1">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            FINAL DECISION POINT
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
            MAKE YOUR FINAL GUESS
          </h2>
          <p className="font-sans font-medium text-slate-300 text-sm sm:text-base">
            Who is the secret mystery entity?
          </p>
        </div>

        {/* Scoring Incentive Badge */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Fewer questions used = Higher competition score!</span>
          </div>
          <span className="font-mono-code text-xs text-slate-400 hidden sm:inline">
            {questionsRemaining} Questions unused
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              id="final-guess-input"
              type="text"
              value={guessInput}
              onChange={(e) => {
                setGuessInput(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="e.g. Iron Man, Shah Rukh Khan, Sundar Pichai..."
              className="w-full py-4 px-5 sm:px-6 rounded-2xl bg-slate-950/90 border-2 border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-lg sm:text-xl font-sans font-semibold placeholder:text-slate-600 shadow-inner transition-all"
              autoComplete="off"
            />
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="flex items-center gap-2 text-rose-400 text-xs sm:text-sm font-medium animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            id="submit-final-guess-btn"
            type="submit"
            className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-display font-black text-lg sm:text-xl text-white tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 hover:scale-[1.01] transition-all cursor-pointer border border-cyan-300/40"
          >
            <Sparkles className="w-6 h-6 text-cyan-200" />
            <span>SUBMIT FINAL GUESS</span>
            <Send className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 font-mono-code">
          Submitting final guess stops the clock and locks in your Round 2 ranking.
        </p>

      </div>
    </div>
  );
};
