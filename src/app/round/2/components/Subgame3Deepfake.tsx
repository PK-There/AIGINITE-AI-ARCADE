'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Eye, ZoomIn, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Award, Sparkles, AlertTriangle, Scan, Layers, FileText } from 'lucide-react';
import { DEEPFAKE_SCENARIOS, DeepfakeItem } from '../data/deepfakeData';
import { PlayerScoreData, calculateSpeedBonus } from '../types-r1';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Subgame3DeepfakeProps {
  onComplete: (scoreData: PlayerScoreData) => void;
  onReturnToHub: () => void;
}

export const Subgame3Deepfake: React.FC<Subgame3DeepfakeProps> = ({
  onComplete,
  onReturnToHub,
}) => {
  const [scenarios, setScenarios] = useState<DeepfakeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | string | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [showForensicOverlay, setShowForensicOverlay] = useState(false);

  // Score & metrics
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalSpeedBonus, setTotalSpeedBonus] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Timing
  const questionStartTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(Date.now());

  // Pick 10 random scenarios on mount
  useEffect(() => {
    const shuffled = [...DEEPFAKE_SCENARIOS].sort(() => 0.5 - Math.random());
    setScenarios(shuffled.slice(0, 10));
  }, []);

  if (scenarios.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] p-6">
        <span className="text-[10px] font-mono-ui uppercase tracking-[.25em] text-[#00F0FF]/60 animate-pulse">
          Loading Forensic Scenarios...
        </span>
      </div>
    );
  }

  const currentItem = scenarios[currentIndex];

  const handleSelectAnswer = (ans: boolean | string) => {
    if (isAnswerLocked) return;
    setIsAnswerLocked(true);
    setSelectedAnswer(ans);

    const timeTaken = (Date.now() - questionStartTimeRef.current) / 1000;
    const isCorrect = ans === currentItem.correctAnswer;

    if (isCorrect) {
      soundFx.playCorrect();
      const basePoints = 200;
      const speedBonus = calculateSpeedBonus(25, timeTaken, 8);
      setCorrectCount((prev) => prev + 1);
      setTotalScore((prev) => prev + basePoints);
      setTotalSpeedBonus((prev) => prev + speedBonus);
    } else {
      soundFx.playWrong();
      setWrongCount((prev) => prev + 1);
    }
  };

  const handleNextScenario = () => {
    soundFx.playKeypress();
    if (currentIndex + 1 < scenarios.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setShowForensicOverlay(false);
      questionStartTimeRef.current = Date.now();
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    soundFx.playSuccessFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FF007F', '#00F0FF', '#39FF14'],
      });
    } catch {}
  };

  const handleClaimUnlock = () => {
    const totalDurationSeconds = Math.round((Date.now() - gameStartTimeRef.current) / 1000);
    const finalScore = totalScore + totalSpeedBonus;

    const result: PlayerScoreData = {
      playerScore: totalScore,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      completionTime: totalDurationSeconds,
      speedBonus: totalSpeedBonus,
      finalSubgameScore: finalScore,
      completedAt: new Date().toISOString(),
    };

    onComplete(result);
  };

  return (
    <div className="w-full space-y-6">
      {/* Immersive UI Arena Box */}
      <div className="border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl relative flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)] font-mono">
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />

        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#00F0FF] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] font-display uppercase">
                DEEPFAKE DETECTIVE
              </h2>
              <p className="text-[10px] uppercase opacity-70 italic text-[#00F0FF]">
                Simulation Layer 3: Forensic & Synthetic Inspection // Player 3 Arena
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#FF007F]/20 border border-[#FF007F] px-4 py-2 rounded text-[#FF007F] font-bold text-xs sm:text-sm tabular-nums">
                CASE {currentIndex + 1} / {scenarios.length}
              </div>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-6">
              {/* Inspection Context Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00F0FF]/20 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#00F0FF] text-[#0B0F19] px-2 py-0.5 inline-block mb-1">
                    INSPECTION: {currentItem.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-100">
                    {currentItem.title}
                  </h3>
                </div>

                {isAnswerLocked && (
                  <button
                    onClick={() => setShowForensicOverlay(!showForensicOverlay)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] text-xs font-bold hover:bg-[#FF007F] hover:text-white transition-all cursor-pointer"
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>{showForensicOverlay ? 'HIDE FORENSIC HIGHLIGHT' : 'REVEAL FORENSIC HIGHLIGHT'}</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {currentItem.promptOrContext}
              </p>

              {/* Binary Mode Image/Video/Audio/Text & Buttons */}
              {currentItem.type === 'binary' && (
                <div className="space-y-4">
                  {currentItem.singleImage ? (() => {
                    const mediaUrl = currentItem.singleImage.url;
                    const isVideo = mediaUrl && (mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm') || mediaUrl.toLowerCase().endsWith('.mov'));
                    const isAudio = mediaUrl && (mediaUrl.toLowerCase().endsWith('.mp3') || mediaUrl.toLowerCase().endsWith('.wav') || mediaUrl.toLowerCase().endsWith('.ogg'));

                    return (
                      <div className="relative max-w-2xl mx-auto rounded-lg overflow-hidden border border-[#00F0FF]/40 bg-black group">
                        {isVideo ? (
                          <video
                            src={mediaUrl}
                            controls
                            autoPlay
                            loop
                            className="w-full h-[260px] sm:h-[360px] object-contain"
                          />
                        ) : isAudio ? (
                          <div className="w-full h-[180px] sm:h-[220px] flex flex-col items-center justify-center p-6 bg-[#070b13] border-b border-[#00F0FF]/20">
                            <Layers className="w-10 h-10 text-[#FF007F] animate-pulse mb-3" />
                            <span className="text-xs text-slate-400 mb-4 font-mono">NEURAL VOICE SYNTHESIS VERIFICATION</span>
                            <audio src={mediaUrl} controls className="w-full max-w-md mx-auto" />
                          </div>
                        ) : (
                          <img
                            src={mediaUrl}
                            alt="Inspection Target"
                            className="w-full h-[260px] sm:h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        {/* Forensic Tell Zoom Ring */}
                        {showForensicOverlay && currentItem.zoomCoordinates && !isVideo && !isAudio && (
                          <div
                            className="absolute border-2 border-[#FF007F] bg-[#FF007F]/20 rounded-full w-24 h-24 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-glow flex items-center justify-center shadow-[0_0_20px_#FF007F]"
                            style={{
                              left: `${currentItem.zoomCoordinates.x}%`,
                              top: `${currentItem.zoomCoordinates.y}%`,
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-[#FF007F]" />
                          </div>
                        )}
                      </div>
                    );
                  })() : (
                    /* Text-only layout */
                    <div className="relative max-w-2xl mx-auto rounded-lg border border-[#00F0FF]/30 bg-[#070b13] p-6 text-left shadow-inner">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                        <FileText className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <span>TEXT EVIDENCE ANALYSIS</span>
                      </div>
                      <div className="p-4 rounded border border-slate-800 bg-slate-950/60 font-sans text-sm text-slate-300 leading-relaxed max-h-[220px] overflow-y-auto">
                        {currentItem.promptOrContext}
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-2 font-mono">
                        // System instruction: review narrative structure, claims logic, and phrasing markers.
                      </p>
                    </div>
                  )}

                  {/* Real vs AI Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                    <button
                      disabled={isAnswerLocked}
                      onClick={() => handleSelectAnswer(false)}
                      className={`py-3 px-4 rounded border font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isAnswerLocked
                          ? currentItem.correctAnswer === false
                            ? 'bg-[#39FF14] text-[#0B0F19] font-black border-[#39FF14] shadow-[0_0_15px_#39FF14]'
                            : selectedAnswer === false
                            ? 'bg-red-950 border-red-500 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                          : 'bg-transparent border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      GENUINE REAL
                    </button>

                    <button
                      disabled={isAnswerLocked}
                      onClick={() => handleSelectAnswer(true)}
                      className={`py-3 px-4 rounded border font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isAnswerLocked
                          ? currentItem.correctAnswer === true
                            ? 'bg-[#FF007F] text-white font-black border-[#FF007F] shadow-[0_0_15px_#FF007F]'
                            : selectedAnswer === true
                            ? 'bg-red-950 border-red-500 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                          : 'bg-transparent border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-white'
                      }`}
                    >
                      <ShieldAlert className="w-4 h-4" />
                      AI SYNTHETIC
                    </button>
                  </div>
                </div>
              )}

              {/* Multi-choice Mode */}
              {currentItem.type === 'multichoice' && currentItem.options && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {currentItem.options.map((opt) => {
                      const isSelected = selectedAnswer === opt.id;
                      const isCorrectAI = opt.id === currentItem.correctAnswer;
                      const showCorrect = isAnswerLocked && isCorrectAI;
                      const showWrong = isAnswerLocked && isSelected && !isCorrectAI;

                      let cardClass = 'border-[#00F0FF]/30 bg-[#00F0FF]/5 hover:border-[#FF007F]';
                      if (showCorrect) {
                        cardClass = 'border-2 border-[#39FF14] bg-[#39FF14]/20 shadow-[0_0_15px_#39FF14]';
                      } else if (showWrong) {
                        cardClass = 'border-2 border-red-500 bg-red-950/80 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
                      } else if (isAnswerLocked) {
                        cardClass = 'border-slate-800 bg-slate-950 opacity-40';
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => !isAnswerLocked && handleSelectAnswer(opt.id)}
                          className={`rounded-lg border overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${cardClass}`}
                        >
                          <div className="relative h-40 bg-black overflow-hidden">
                            <img
                              src={opt.url}
                              alt={opt.label}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B0F19]/90 text-[10px] font-mono text-[#00F0FF] border border-[#00F0FF]/40">
                              {opt.id}
                            </div>
                          </div>

                          <div className="p-3 bg-[#0B0F19]/90 border-t border-[#00F0FF]/20 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-200">{opt.label}</span>
                            {showCorrect && <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />}
                            {showWrong && <XCircle className="w-4 h-4 text-red-400" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Feedback Breakdown */}
              {isAnswerLocked && (
                <div className="pt-4 border-t border-[#00F0FF]/20 space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>FORENSIC ARTIFACT ANALYSIS:</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {currentItem.detailedExplanation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono">
                      {selectedAnswer === currentItem.correctAnswer ? (
                        <span className="text-[#39FF14] font-bold">
                          ✓ FORENSIC MATCH CONFIRMED! +200 PTS + Speed Bonus!
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold">
                          ✗ FORENSIC IDENTIFICATION MISSED!
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleNextScenario}
                      className="bg-[#00F0FF] text-[#0B0F19] px-6 py-2 text-xs font-black shadow-[0_0_15px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <span>{currentIndex + 1 < DEEPFAKE_SCENARIOS.length ? 'NEXT CASE' : 'VIEW FORENSIC REPORT'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Summary View */
            <div className="py-8 text-center space-y-6 animate-fadeIn font-mono">
              <div className="w-16 h-16 rounded-2xl bg-magenta-950 border border-magenta-400 flex items-center justify-center mx-auto text-[#FF007F] shadow-[0_0_20px_rgba(255,0,127,0.4)]">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 uppercase">
                  PLAYER 3 FORENSIC CLEARANCE COMPLETE!
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#00F0FF]">
                  Deepfake detective scenarios inspected successfully.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">DETECTED</span>
                  <span className="text-lg font-bold text-[#39FF14]">{correctCount} / {scenarios.length}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">BASE PTS</span>
                  <span className="text-lg font-bold text-slate-100">+{totalScore}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">SPEED BONUS</span>
                  <span className="text-lg font-bold text-[#00F0FF]">+{totalSpeedBonus}</span>
                </div>
                <div className="bg-[#0B0F19] border border-magenta-500/50 p-3 rounded-lg shadow-[0_0_10px_rgba(255,0,127,0.15)]">
                  <span className="text-[10px] text-magenta-400 block">P3 TOTAL</span>
                  <span className="text-lg font-bold text-[#FF007F]">+{totalScore + totalSpeedBonus}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleClaimUnlock}
                  className="bg-[#00F0FF] text-[#0B0F19] px-8 py-3 text-xs font-black shadow-[0_0_20px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  CONFIRM & UNLOCK PLAYER 4 (FINAL)
                </button>

                <button
                  onClick={onReturnToHub}
                  className="bg-transparent border border-[#00F0FF] text-[#00F0FF] px-6 py-3 text-xs font-bold hover:bg-[#00F0FF] hover:text-[#0B0F19] transition-all uppercase tracking-widest"
                >
                  Back to Hub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
