'use client'

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Sparkles, 
  HelpCircle, 
  Clock, 
  Award, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  BrainCircuit,
  Trophy
} from 'lucide-react';
import { ROUND_CONFIG } from '../data/config';

export const IntroScreen: React.FC = () => {
  const { gameState, teamsList, selectTeam, startRound, navigateToScreen } = useGame();
  const { team } = gameState;
  const [showTeamSelector, setShowTeamSelector] = useState<boolean>(false);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl space-y-8 text-center">
        
        {/* Top Badges & Subtitle */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono-code font-bold tracking-widest uppercase shadow-lg shadow-cyan-950/60">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AIGNITE AI ARCADE • STAGE 2</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            ROUND 2 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-500 text-glow-cyan">AI WHO AM I?</span>
          </h1>

          <p className="font-display text-xl sm:text-2xl text-cyan-300 font-semibold italic tracking-wide">
            "{ROUND_CONFIG.tagline}"
          </p>
        </div>

        {/* Narrative & Rules Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-slate-900/90 via-[#0a1426]/90 to-[#070e1c]/90 backdrop-blur-xl shadow-2xl space-y-6 text-left">
          
          <div className="border-b border-slate-800 pb-4 text-center sm:text-left">
            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide flex items-center justify-center sm:justify-start gap-2">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
              YOUR MYSTERY IS HIDDEN
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1 font-medium">
              "Ask the right questions. Don't waste them."
            </p>
          </div>

          {/* Key Rule Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="font-display font-bold text-slate-100 text-base">5 Questions Max</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 questions available per stage. Inquire wisely to isolate the secret identity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-display font-bold text-slate-100 text-base">Efficiency Multiplier</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fewer questions used = Highest score. Unused questions grant major bonuses!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-display font-bold text-slate-100 text-base">2-Minute Clock</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Live countdown. Swift deductions earn extra time-bonus points.
              </p>
            </div>

          </div>

          {/* Active Team & Config Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-display font-black text-xl">
                {team.name.charAt(0)}
              </div>
              <div>
                <span className="block text-[11px] font-mono-code font-bold uppercase text-slate-400 tracking-wider">
                  ACTIVE COMPETITION TEAM
                </span>
                <span className="block font-display font-extrabold text-lg sm:text-xl text-white">
                  {team.name}
                </span>
                {team.college && (
                  <span className="block text-xs text-slate-400">{team.college}</span>
                )}
              </div>
            </div>

            {/* Switch Team Button */}
            <div className="flex items-center gap-2">
              <button
                id="toggle-team-selector-btn"
                type="button"
                onClick={() => setShowTeamSelector(!showTeamSelector)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 inline mr-1 text-cyan-400" />
                Change Team
              </button>

              <button
                id="view-leaderboard-intro-btn"
                type="button"
                onClick={() => navigateToScreen('LEADERBOARD')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-all cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                Leaderboard
              </button>
            </div>
          </div>

          {/* Team Switcher Drawer */}
          {showTeamSelector && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in">
              <div className="text-xs font-bold font-mono-code uppercase text-slate-400">
                SELECT PARTICIPATING SQUAD:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {teamsList.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      selectTeam(t);
                      setShowTeamSelector(false);
                    }}
                    className={`
                      p-3 rounded-xl border text-left transition-all cursor-pointer
                      ${
                        t.id === team.id
                          ? 'bg-cyan-950 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }
                    `}
                  >
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{t.college}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sleek Compact Start Button */}
        <div className="space-y-3 pt-2">
          <button
            id="start-round-btn"
            type="button"
            onClick={startRound}
            className="w-full max-w-xs mx-auto h-12 rounded-xl bg-[#d9ff52] text-[#0d1117] font-mono-ui font-black text-xs sm:text-sm tracking-widest uppercase hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#ff6f91] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 fill-current text-[#0d1117]" />
            <span>START ROUND 02</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono-ui text-[10px] uppercase tracking-wider">
            <span>QUESTIONS: <strong className="text-white">5 / 5</strong></span>
            <span>•</span>
            <span>TIMER: <strong className="text-white">02:00</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
