"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Clock, Zap, CheckCircle2, XCircle, ArrowRight, Award, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { PlayerScoreData, calculateSpeedBonus } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Subgame1QuizProps {
  onComplete: (scoreData: PlayerScoreData) => void;
  onReturnToHub: () => void;
}

export const Subgame1Quiz: React.FC<Subgame1QuizProps> = ({
  onComplete,
  onReturnToHub,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalSpeedBonus, setTotalSpeedBonus] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Timing refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Fisher-Yates shuffle for truly uniform randomization across the full question bank
    const pool = [...QUIZ_QUESTIONS];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setQuestions(pool.slice(0, 10));
  }, []);

  const currentQ: QuizQuestion = questions[currentIndex];

  // Timer loop
  useEffect(() => {
    if (questions.length === 0 || isFinished || isAnswerLocked) return;

    questionStartTimeRef.current = Date.now();
    setTimeLeft(currentQ.timeLimit);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeExpire();
          return 0;
        }
        if (prev <= 4) {
          soundFx.playCountdownUrgent();
        } else {
          soundFx.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswerLocked, isFinished, questions]);

  const handleTimeExpire = () => {
    if (isAnswerLocked) return;
    soundFx.playWrong();
    setIsAnswerLocked(true);
    setSelectedOption(-1);
    setWrongCount((prev) => prev + 1);
    setStreak(0);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerLocked) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswerLocked(true);
    setSelectedOption(idx);

    const timeTaken = Math.min(currentQ.timeLimit, (Date.now() - questionStartTimeRef.current) / 1000);
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      soundFx.playCorrect();
      const basePoints = 150;
      const speedBonus = calculateSpeedBonus(currentQ.timeLimit, timeTaken, 10);
      const streakBonus = streak * 25;

      setCorrectCount((prev) => prev + 1);
      setTotalScore((prev) => prev + basePoints + streakBonus);
      setTotalSpeedBonus((prev) => prev + speedBonus);
      setStreak((prev) => prev + 1);
    } else {
      soundFx.playWrong();
      setWrongCount((prev) => prev + 1);
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playKeypress();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
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
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FF007F', '#39FF14', '#FFB800'],
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

  const timerPercent = currentQ ? (timeLeft / currentQ.timeLimit) * 100 : 100;

  if (questions.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] p-6">
        <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin animate-pulse" />
        <span className="text-[10px] font-mono-ui uppercase tracking-[.25em] text-[#00F0FF]/60 mt-4">
          Shuffling Neural Matrix trivia...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Immersive UI Arena Box */}
      <div className="border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl relative flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF]" />

        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#00F0FF] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] font-display uppercase">
                POP CULTURE & TECH QUIZ
              </h2>
              <p className="text-[10px] uppercase opacity-70 italic text-[#00F0FF]">
                Simulation Layer 1: Neural Trivia & Lore // Player 1 Arena
              </p>
            </div>

            <div className="flex items-center gap-3">
              {streak > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF007F]/20 border border-[#FF007F] text-[#FF007F] font-mono text-xs font-bold animate-pulse">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{streak}X STREAK!</span>
                </div>
              )}

              {/* Neon Pink Countdown Timer */}
              <div className="bg-[#FF007F]/20 border border-[#FF007F] px-4 py-2 rounded text-[#FF007F] font-bold text-base sm:text-lg tabular-nums shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                00:{timeLeft.toString().padStart(2, '0')}.0
              </div>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-6">
              {/* Question Banner & Category */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#00F0FF] text-[#0B0F19] px-2 py-0.5">
                    CATEGORY: {currentQ.category}
                  </span>
                  <span className="text-slate-400">
                    QUESTION {currentIndex + 1} OF {questions.length}
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-100 leading-snug p-4 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/20">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Arcade Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === currentQ.correctIndex;
                  const showSuccess = isAnswerLocked && isCorrectAnswer;
                  const showWrong = isAnswerLocked && isSelected && !isCorrectAnswer;

                  let cardStyle = 'bg-[#00F0FF]/5 border border-[#00F0FF]/30 hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 text-slate-200';
                  if (showSuccess) {
                    cardStyle = 'bg-[#39FF14]/20 border-2 border-[#39FF14] text-[#39FF14] shadow-[0_0_15px_#39FF14]';
                  } else if (showWrong) {
                    cardStyle = 'bg-red-950/80 border-2 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
                  } else if (isAnswerLocked && !isCorrectAnswer) {
                    cardStyle = 'bg-slate-950 border border-slate-800 text-slate-600 opacity-40';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerLocked}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-lg text-left font-mono font-semibold text-xs sm:text-sm flex items-start gap-3 transition-all duration-200 cursor-pointer disabled:cursor-default ${cardStyle}`}
                    >
                      <span className="w-6 h-6 rounded bg-[#0B0F19] border border-current flex items-center justify-center shrink-0 text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                      {showSuccess && <CheckCircle2 className="w-5 h-5 text-[#39FF14] shrink-0" />}
                      {showWrong && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Box */}
              {isAnswerLocked && (
                <div className="pt-4 border-t border-[#00F0FF]/20 space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/30 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>NEURAL INSIGHT & TRIVIA FACT:</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono">
                      {selectedOption === currentQ.correctIndex ? (
                        <span className="text-[#39FF14] font-bold">
                          ✓ CORRECT! +150 PTS + Speed Bonus!
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold">
                          ✗ INCORRECT CHOICE!
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="bg-[#00F0FF] text-[#0B0F19] px-6 py-2 text-xs font-black shadow-[0_0_15px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <span>{currentIndex + 1 < questions.length ? 'NEXT QUESTION' : 'VIEW STAGE SUMMARY'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Summary View */
            <div className="py-8 text-center space-y-6 animate-fadeIn font-mono">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center mx-auto text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 uppercase">
                  PLAYER 1 MISSION COMPLETED!
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#00F0FF]">
                  Pop Culture & Tech Quiz calibrated successfully.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">CORRECT</span>
                  <span className="text-lg font-bold text-[#39FF14]">{correctCount} / {questions.length}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">BASE PTS</span>
                  <span className="text-lg font-bold text-slate-100">+{totalScore}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">SPEED BONUS</span>
                  <span className="text-lg font-bold text-[#00F0FF]">+{totalSpeedBonus}</span>
                </div>
                <div className="bg-[#0B0F19] border border-[#FFB800]/50 p-3 rounded-lg shadow-[0_0_10px_rgba(255,184,0,0.15)]">
                  <span className="text-[10px] text-amber-400 block">P1 TOTAL</span>
                  <span className="text-lg font-bold text-[#FFB800]">+{totalScore + totalSpeedBonus}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleClaimUnlock}
                  className="bg-[#00F0FF] text-[#0B0F19] px-8 py-3 text-xs font-black shadow-[0_0_20px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  CONFIRM & UNLOCK PLAYER 2
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
