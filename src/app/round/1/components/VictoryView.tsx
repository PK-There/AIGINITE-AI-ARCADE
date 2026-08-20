'use client'

import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ArrowRight, 
  Lock, 
  Share2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Medal,
  Users,
  Copy,
  Check
} from 'lucide-react';
import { TeamState, PLAYER_INFO, PlayerId } from '../types';
import { TOURNAMENT_RIVALS, calculateTournamentRank, RivalTeam } from '../data/rivalsData';
import { soundFx } from '../utils/audio';

interface VictoryViewProps {
  teamState: TeamState;
  onReturnToHub: () => void;
  onResetRun: () => void;
}

export const VictoryView: React.FC<VictoryViewProps> = ({
  teamState,
  onReturnToHub,
  onResetRun,
}) => {
  const [showRound2Modal, setShowRound2Modal] = useState(false);
  const [copied, setCopied] = useState(false);

  const rankInfo = calculateTournamentRank(teamState.teamScore, teamState.totalTime);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const userTeamRow: RivalTeam = {
    rank: rankInfo.rank,
    teamName: teamState.teamName,
    teamId: teamState.teamId,
    p1Score: teamState.playerScores[1].finalSubgameScore,
    p2Score: teamState.playerScores[2].finalSubgameScore,
    p3Score: teamState.playerScores[3].finalSubgameScore,
    p4Score: teamState.playerScores[4].finalSubgameScore,
    totalScore: teamState.teamScore,
    durationSeconds: teamState.totalTime,
    status: 'ROUND 1 COMPLETED',
    avatarColor: '#00F0FF',
  };

  const leaderboardList = [...TOURNAMENT_RIVALS, userTeamRow].sort((a, b) => b.totalScore - a.totalScore);

  const handleCopyScoreCard = () => {
    soundFx.playKeypress();
    const summaryText = `🏆 AIGNITE AI ARCADE - ROUND 1: HUMAN VS MACHINE
Squad: ${teamState.teamName} [${teamState.teamId}]
Final Rank: #${rankInfo.rank} / ${rankInfo.totalTeams} Teams (Top ${100 - rankInfo.percentile}%)
Total Score: ${teamState.teamScore.toLocaleString()} PTS | Duration: ${formatDuration(teamState.totalTime)}
---------------------------------------------
P1 (Pop Culture Quiz): +${teamState.playerScores[1].finalSubgameScore} PTS (${teamState.playerScores[1].completionTime}s)
P2 (Wordle Race vs AI): +${teamState.playerScores[2].finalSubgameScore} PTS (${teamState.playerScores[2].completionTime}s)
P3 (Deepfake Detective): +${teamState.playerScores[3].finalSubgameScore} PTS (${teamState.playerScores[3].completionTime}s)
P4 (Rapid Fire Brain): +${teamState.playerScores[4].finalSubgameScore} PTS (${teamState.playerScores[4].completionTime}s)
Verified on AIgnite Tournament Arena.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full space-y-6 font-mono">
      {/* Immersive Victory Box */}
      <div className="border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl relative flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />

        <div className="p-6 sm:p-8 flex flex-col space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFB800]/20 border border-[#FFB800] text-[#FFB800] text-xs font-bold self-center shadow-[0_0_10px_rgba(255,184,0,0.3)]">
            <Trophy className="w-4 h-4" />
            <span>ROUND 1: HUMAN VS MACHINE COMPLETE</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#00F0FF] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] font-display uppercase">
              TOURNAMENT QUALIFICATION DOSSIER
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-300">
              Squad <span className="text-[#39FF14] font-bold">{teamState.teamName}</span> [{teamState.teamId}] cleared all 4 simulation layers!
            </p>
          </div>

          {/* Big Score & Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-[#0B0F19] border border-[#FFB800] p-3.5 rounded shadow-[0_0_10px_rgba(255,184,0,0.2)]">
              <span className="text-[10px] text-[#FFB800] font-bold block uppercase">TOTAL SCORE</span>
              <span className="text-xl sm:text-2xl font-black text-[#FFB800]">
                {teamState.teamScore.toLocaleString()}
              </span>
            </div>

            <div className="bg-[#0B0F19] border border-[#00F0FF] p-3.5 rounded shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <span className="text-[10px] text-[#00F0FF] font-bold block uppercase">RANKING</span>
              <span className="text-xl sm:text-2xl font-black text-[#00F0FF]">
                #{rankInfo.rank.toString().padStart(2, '0')} <span className="text-xs text-slate-400">/ 64</span>
              </span>
            </div>

            <div className="bg-[#0B0F19] border border-[#39FF14] p-3.5 rounded shadow-[0_0_10px_rgba(57,255,20,0.2)]">
              <span className="text-[10px] text-[#39FF14] font-bold block uppercase">PERCENTILE</span>
              <span className="text-xl sm:text-2xl font-black text-[#39FF14]">
                TOP {100 - rankInfo.percentile}%
              </span>
            </div>

            <div className="bg-[#0B0F19] border border-[#FF007F] p-3.5 rounded shadow-[0_0_10px_rgba(255,0,127,0.2)]">
              <span className="text-[10px] text-[#FF007F] font-bold block uppercase">DURATION</span>
              <span className="text-xl sm:text-2xl font-black text-[#FF007F]">
                {formatDuration(teamState.totalTime)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="/round/2"
              onClick={() => {
                soundFx.playCorrect();
              }}
              className="bg-[#00F0FF] text-[#0B0F19] px-6 py-3 text-xs font-black shadow-[0_0_20px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 stroke-[3]" />
              [ PROCEED TO ROUND 2 ]
            </a>

            <button
              onClick={handleCopyScoreCard}
              className="bg-transparent border border-[#00F0FF] text-[#00F0FF] px-5 py-3 text-xs font-bold hover:bg-[#00F0FF] hover:text-[#0B0F19] transition-all uppercase tracking-widest flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4 text-[#00F0FF]" />}
              <span>{copied ? 'CERTIFICATE COPIED!' : 'COPY SCORECARD'}</span>
            </button>

            <button
              onClick={onReturnToHub}
              className="bg-transparent border border-slate-700 text-slate-300 px-5 py-3 text-xs font-bold hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all uppercase tracking-widest cursor-pointer"
            >
              Team Hub
            </button>
          </div>

          {/* Granular Breakdown Table */}
          <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/30 rounded-lg p-4 sm:p-5 space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-2">
              <span className="text-xs font-bold text-[#00F0FF] uppercase">
                OPERATIVE PERFORMANCE BREAKDOWN
              </span>
              <span className="text-[10px] text-slate-400">4 / 4 CLEARED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#00F0FF]/20 text-slate-400 text-[10px]">
                    <th className="py-2 px-2">SLOT</th>
                    <th className="py-2 px-2">CHALLENGE</th>
                    <th className="py-2 px-2 text-center">ACCURACY</th>
                    <th className="py-2 px-2 text-center">TIME</th>
                    <th className="py-2 px-2 text-center">SPEED BONUS</th>
                    <th className="py-2 px-2 text-right">FINAL SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#00F0FF]/10">
                  {([1, 2, 3, 4] as PlayerId[]).map((pId) => {
                    const info = PLAYER_INFO[pId];
                    const score = teamState.playerScores[pId];

                    return (
                      <tr key={pId} className="hover:bg-[#00F0FF]/5">
                        <td className="py-2.5 px-2 font-bold text-slate-200">
                          Slot 0{pId}
                        </td>
                        <td className="py-2.5 px-2 text-slate-300">
                          {info.title}
                        </td>
                        <td className="py-2.5 px-2 text-center text-[#39FF14] font-bold">
                          {pId === 2
                            ? score.correctAnswers > 0 ? 'SOLVED' : 'FAILED'
                            : `${score.correctAnswers} Correct`}
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-300">
                          {score.completionTime}s
                        </td>
                        <td className="py-2.5 px-2 text-center text-[#00F0FF]">
                          +{score.speedBonus}
                        </td>
                        <td className="py-2.5 px-2 text-right font-black" style={{ color: info.color }}>
                          +{score.finalSubgameScore.toLocaleString()} PTS
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tournament Leaderboard Preview */}
          <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/30 rounded-lg p-4 sm:p-5 space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-[#00F0FF]/20 pb-2">
              <span className="text-xs font-bold text-[#FFB800] uppercase">
                TOURNAMENT LEADERBOARD // TOP SQUADS
              </span>
              <span className="text-[10px] text-slate-400">RANKED BY TOTAL SCORE</span>
            </div>

            <div className="space-y-1.5">
              {leaderboardList.slice(0, 5).map((team, idx) => {
                const isCurrent = team.teamId === teamState.teamId;

                return (
                  <div
                    key={team.teamId}
                    className={`p-2.5 rounded border flex items-center justify-between gap-3 text-xs ${
                      isCurrent
                        ? 'bg-[#00F0FF]/20 border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'bg-[#0B0F19] border-[#00F0FF]/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-black/50 flex items-center justify-center font-bold text-[10px]">
                        #{idx + 1}
                      </span>
                      <span className="font-bold text-slate-100">{team.teamName}</span>
                      {isCurrent && (
                        <span className="px-1 py-0.2 rounded bg-[#00F0FF] text-[#0B0F19] text-[9px] font-black">
                          YOU
                        </span>
                      )}
                    </div>

                    <span className="font-black text-[#FFB800]">
                      {team.totalScore.toLocaleString()} PTS
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Round 2 Lock Modal */}
      {showRound2Modal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-xl bg-[#0B0F19] border-2 border-[#FFB800] p-6 space-y-4 shadow-[0_0_30px_rgba(255,184,0,0.3)] text-center animate-scaleUp">
            <div className="w-12 h-12 rounded-lg bg-[#FFB800]/20 border border-[#FFB800] flex items-center justify-center mx-auto text-[#FFB800]">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-100 uppercase">
                ROUND 2 IS CURRENTLY LOCKED
              </h3>
              <p className="text-xs text-[#FFB800] leading-relaxed">
                "Round 2 will unlock when the tournament organizer officially starts it."
              </p>
            </div>

            <p className="text-[11px] text-slate-400 bg-black/40 p-2.5 rounded border border-slate-800">
              Round 1 Score <strong className="text-[#39FF14]">{teamState.teamScore.toLocaleString()} PTS</strong> stored in tournament memory.
            </p>

            <button
              onClick={() => setShowRound2Modal(false)}
              className="w-full py-2.5 bg-[#00F0FF] text-[#0B0F19] font-black text-xs uppercase tracking-widest cursor-pointer"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
