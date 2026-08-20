'use client'

import React from 'react';
import { QuestionDefinition } from '../types';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionDefinition;
  index: number;
  isSelected: boolean;
  isUsed: boolean;
  onSelect: (id: string) => void;
  disabled: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  isUsed,
  onSelect,
  disabled,
}) => {
  const numberTag = index + 1;

  const handleClick = () => {
    if (!disabled && !isUsed) {
      onSelect(question.id);
    }
  };

  return (
    <button
      id={`question-card-${question.id}`}
      type="button"
      onClick={handleClick}
      disabled={disabled || isUsed}
      aria-pressed={isSelected}
      className={`
        relative w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer
        flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        ${
          isSelected
            ? 'bg-cyan-950/90 border-2 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-[1.02] text-white'
            : isUsed
            ? 'bg-slate-900/40 border border-slate-800/80 text-slate-500 opacity-50 cursor-not-allowed'
            : 'bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/20 hover:border-cyan-400/60 text-slate-200 hover:shadow-md hover:shadow-cyan-500/10'
        }
      `}
    >
      {/* Question Number Badge */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-display font-black text-sm sm:text-base flex items-center justify-center transition-all
          ${
            isSelected
              ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/40'
              : isUsed
              ? 'bg-slate-800 text-slate-600 border border-slate-700'
              : 'bg-slate-800 group-hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30'
          }
        `}
      >
        {isUsed ? <CheckCircle2 className="w-5 h-5" /> : `0${numberTag}`}
      </div>

      {/* Question Text */}
      <div className="flex-1 min-w-0">
        {question.categoryHint && (
          <span className="block text-[10px] uppercase font-bold tracking-widest text-cyan-400/80 mb-0.5">
            {question.categoryHint}
          </span>
        )}
        <div
          className={`font-sans font-semibold text-base sm:text-lg leading-snug ${
            isSelected ? 'text-white' : isUsed ? 'text-slate-500 line-through' : 'text-slate-100 group-hover:text-cyan-200'
          }`}
        >
          {question.text}
        </div>
      </div>

      {/* Selected Indicator Pill */}
      {isSelected && (
        <div className="flex-shrink-0 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-300 font-mono-code text-xs font-bold uppercase tracking-wider animate-pulse">
          <span>SELECTED</span>
        </div>
      )}

      {isUsed && (
        <div className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-500 font-mono-code text-[11px] font-bold">
          USED
        </div>
      )}
    </button>
  );
};
