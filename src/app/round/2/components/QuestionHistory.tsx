'use client'

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CheckCircle2, XCircle, History, ChevronDown, ChevronUp } from 'lucide-react';

export const QuestionHistory: React.FC = () => {
  const { gameState } = useGame();
  const { questionHistory } = gameState;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (questionHistory.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-center">
        <History className="w-6 h-6 text-slate-600 mx-auto mb-2" />
        <h3 className="font-display font-bold text-sm text-slate-400 uppercase tracking-wider">
          DEDUCTION LOG EMPTY
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Inquire questions to compile intelligence and deduce the secret entity.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-lg">
      
      {/* Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-b border-slate-800/80 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-slate-200">
            QUESTIONS ASKED ({questionHistory.length})
          </h3>
        </div>
        <button 
          type="button"
          aria-label={isExpanded ? 'Collapse Question History' : 'Expand Question History'}
          className="text-slate-400 hover:text-white"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* History Items */}
      {isExpanded && (
        <div className="p-3 space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
          {questionHistory.map((item, idx) => (
            <div
              key={idx}
              className={`
                p-3 rounded-xl border flex items-start justify-between gap-3 text-xs
                ${
                  item.answer
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-100'
                    : 'bg-rose-950/30 border-rose-500/30 text-rose-100'
                }
              `}
            >
              <div className="flex items-start gap-2 flex-1">
                <span className="font-mono-code font-bold text-slate-400 mt-0.5">
                  #{item.questionNumber}
                </span>
                <span className="font-medium text-slate-200 leading-tight">
                  {item.questionText}
                </span>
              </div>

              <div className="flex-shrink-0 flex items-center gap-1 font-display font-black text-xs px-2 py-0.5 rounded-md">
                {item.answer ? (
                  <span className="text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> YES
                  </span>
                ) : (
                  <span className="text-rose-400 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> NO
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
