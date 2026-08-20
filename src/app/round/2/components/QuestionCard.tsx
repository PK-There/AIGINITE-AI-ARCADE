'use client'

import React from 'react';
import { QuestionDefinition } from '../types';
import { useGame } from '../context/GameContext';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: QuestionDefinition;
  index: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
}) => {
  const { gameState } = useGame();
  const { mysteryEntity } = gameState;
  const numberTag = index + 1;

  const cleanText = question.text
    .replace(/your character/gi, "my character")
    .replace(/your/gi, "my");

  let answer = false;
  if (mysteryEntity) {
    if (question.evaluate) {
      answer = question.evaluate(mysteryEntity);
    } else if (question.attributeKey && mysteryEntity.attributes && question.attributeKey in mysteryEntity.attributes) {
      answer = !!mysteryEntity.attributes[question.attributeKey];
    }
  }

  return (
    <div
      id={`question-card-${question.id}`}
      className="relative w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950 border border-cyan-500/20 text-slate-200 flex items-center justify-between gap-4 shadow-md shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Number Tag */}
        <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-display font-black text-sm sm:text-base flex items-center justify-center bg-slate-800 text-cyan-300 border border-cyan-500/30">
          0{numberTag}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <span className="block text-[9px] uppercase font-mono tracking-widest text-cyan-400/60 mb-0.5">
            SYSTEM CLUE
          </span>
          <div className="font-sans font-semibold text-sm sm:text-base leading-snug text-slate-100">
            {cleanText}
          </div>
        </div>
      </div>

      {/* Answer Status Badge */}
      <div className="flex-shrink-0">
        {answer ? (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono-code text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>YES</span>
          </div>
        ) : (
          <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 font-mono-code text-xs font-black tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
            <X className="w-3.5 h-3.5 stroke-[3]" />
            <span>NO</span>
          </div>
        )}
      </div>
    </div>
  );
};
