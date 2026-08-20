'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, CheckCircle2, XCircle, ArrowRight, Award, Sparkles, Binary, Cpu, ShieldAlert, Loader2 } from 'lucide-react';
import { RAPID_FIRE_CHALLENGES, RapidChallenge } from '../data/rapidFireData';
import { PlayerScoreData, calculateSpeedBonus } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Subgame4RapidFireProps {
  onComplete: (scoreData: PlayerScoreData) => void;
  onReturnToHub: () => void;
}

export const Subgame4RapidFire: React.FC<Subgame4RapidFireProps> = ({
  onComplete,
  onReturnToHub,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<unknown>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reflex Rush tracking state (for challenge 3)
  const [reflexTaps, setReflexTaps] = useState<('CYAN' | 'MAGENTA' | 'LIME' | 'AMBER')[]>([]);

  // Scores
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalSpeedBonus, setTotalSpeedBonus] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [challenges, setChallenges] = useState<RapidChallenge[]>([]);

  // Timing
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const challengeStartTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Pick 10 random rapid fire challenges out of 200 questions bank
    const shuffled = [...RAPID_FIRE_CHALLENGES].sort(() => 0.5 - Math.random());
    setChallenges(shuffled.slice(0, 10));
  }, []);

  const currentChallenge: RapidChallenge = challenges[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (challenges.length === 0 || isFinished || isAnswerLocked) return;

    challengeStartTimeRef.current = Date.now();
    setTimeLeft(currentChallenge.timeLimit);
    setReflexTaps([]);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeExpire();
          return 0;
        }
        if (prev <= 3) {
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
  }, [currentIndex, isAnswerLocked, isFinished, challenges]);

  const handleTimeExpire = () => {
    if (isAnswerLocked) return;
    soundFx.playWrong();
    setIsAnswerLocked(true);
    setIsCorrect(false);
    setSelectedAnswer(null);
    setWrongCount((prev) => prev + 1);
  };

  const handleAnswer = (ans: unknown, correct: boolean) => {
    if (isAnswerLocked) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswerLocked(true);
    setSelectedAnswer(ans);
    setIsCorrect(correct);

    const timeTaken = (Date.now() - challengeStartTimeRef.current) / 1000;

    if (correct) {
      soundFx.playCorrect();
      const basePoints = currentChallenge.points;
      const speedBonus = calculateSpeedBonus(currentChallenge.timeLimit, timeTaken, 12);
      setCorrectCount((prev) => prev + 1);
      setTotalScore((prev) => prev + basePoints);
      setTotalSpeedBonus((prev) => prev + speedBonus);
    } else {
      soundFx.playWrong();
      setWrongCount((prev) => prev + 1);
    }
  };

  const handleReflexTap = (color: 'CYAN' | 'MAGENTA' | 'LIME' | 'AMBER') => {
    if (isAnswerLocked || currentChallenge.type !== 'reflex' || !currentChallenge.reflexData) return;
    soundFx.playKeypress();

    const expectedColor = currentChallenge.reflexData.targetSequence[reflexTaps.length];
    if (color !== expectedColor) {
      handleAnswer(color, false);
      return;
    }

    const nextTaps = [...reflexTaps, color];
    setReflexTaps(nextTaps);

    if (nextTaps.length === currentChallenge.reflexData.targetSequence.length) {
      handleAnswer(nextTaps, true);
    }
  };

  const handleNext = () => {
    soundFx.playKeypress();
    if (currentIndex + 1 < challenges.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerLocked(false);
      setIsCorrect(null);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    soundFx.playSuccessFanfare();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFB800', '#00F0FF', '#39FF14', '#FF007F'],
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

  const renderLogoSvg = (key: string) => {
    if (key === 'openai') {
      return (
        <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M22.28 9.25a5.55 5.55 0 0 0-.47-4.48 5.6 5.6 0 0 0-4.66-2.73c-.56 0-1.12.08-1.65.23A5.55 5.55 0 0 0 11 1a5.6 5.6 0 0 0-5.26 3.73 5.54 5.54 0 0 0-3.32 2.37 5.6 5.6 0 0 0-.6 4.98 5.55 5.55 0 0 0 .47 4.48 5.6 5.6 0 0 0 4.66 2.73c.56 0 1.12-.08 1.65-.23A5.55 5.55 0 0 0 13 23a5.6 5.6 0 0 0 5.26-3.73 5.54 5.54 0 0 0 3.32-2.37 5.6 5.6 0 0 0 .7-7.65z" />
          </svg>
        </div>
      );
    }
    if (key === 'anthropic') {
      return (
        <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#FFB800]/40 flex items-center justify-center text-[#FFB800] font-black text-xl">
          A\
        </div>
      );
    }
    if (key === 'nvidia') {
      return (
        <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14]">
          <Cpu className="w-7 h-7" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF]">
        <Binary className="w-7 h-7" />
      </div>
    );
  };

  if (challenges.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center border-2 border-[#00F0FF] bg-[#0B0F19] rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.2)] p-6">
        <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin animate-pulse" />
        <span className="text-[10px] font-mono-ui uppercase tracking-[.25em] text-[#00F0FF]/60 mt-4">
          Initiating high-velocity challenges...
        </span>
      </div>
    );
  }

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
                RAPID FIRE BRAIN CHALLENGE
              </h2>
              <p className="text-[10px] uppercase opacity-70 italic text-[#00F0FF]">
                Simulation Layer 4: High-Velocity Reflex Rush // Player 4 (Final)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#FF007F]/20 border border-[#FF007F] px-4 py-2 rounded text-[#FF007F] font-bold text-base sm:text-lg tabular-nums shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                00:{timeLeft.toString().padStart(2, '0')}.0
              </div>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-6">
              {/* Challenge Subheader */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#FFB800] text-[#0B0F19] px-2 py-0.5">
                    {currentChallenge.title}
                  </span>
                  <span className="text-slate-400">
                    RUSH {currentIndex + 1} OF {challenges.length}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-100 p-3 rounded bg-[#00F0FF]/5 border border-[#00F0FF]/20">
                  {currentChallenge.subtitle}
                </p>
              </div>

              {/* MECHANIC 1: Sequence */}
              {currentChallenge.type === 'sequence' && currentChallenge.sequenceData! && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center items-center gap-2 sm:gap-4 font-display font-black text-2xl sm:text-3xl text-[#00F0FF]">
                    {currentChallenge.sequenceData!.sequence.map((item, i) => (
                      <div
                        key={i}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded border flex items-center justify-center ${
                          item === '?'
                            ? 'bg-[#FFB800]/20 border-[#FFB800] text-[#FFB800] animate-pulse'
                            : 'bg-[#0B0F19] border-[#00F0FF]/40 text-slate-100'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {currentChallenge.sequenceData!.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(opt, opt === currentChallenge.sequenceData!?.correctAnswer)}
                        className={`py-3 rounded border font-mono font-bold text-base transition-all cursor-pointer ${
                          isAnswerLocked
                            ? opt === currentChallenge.sequenceData!.correctAnswer
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19] font-black'
                              : selectedAnswer === opt
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                            : 'bg-transparent border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 2: Logo ID */}
              {currentChallenge.type === 'logo' && currentChallenge.logoData! && (
                <div className="space-y-4">
                  <div className="text-center font-bold text-xs text-[#00F0FF]">
                    {currentChallenge.logoData!.prompt}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {currentChallenge.logoData!.logos.map((logo) => (
                      <button
                        key={logo.id}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(logo.id, logo.id === currentChallenge.logoData!?.correctId)}
                        className={`p-4 rounded border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                          isAnswerLocked
                            ? logo.id === currentChallenge.logoData!.correctId
                              ? 'bg-[#39FF14]/20 border-2 border-[#39FF14] text-[#39FF14] shadow-[0_0_15px_#39FF14]'
                              : selectedAnswer === logo.id
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-[#00F0FF]/5 border-[#00F0FF]/30 hover:border-[#FF007F]'
                        }`}
                      >
                        {renderLogoSvg(logo.svgKey)}
                        <span className="text-xs font-bold text-slate-200">{logo.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 3: Reflex Rush */}
              {currentChallenge.type === 'reflex' && currentChallenge.reflexData && (
                <div className="space-y-6 text-center">
                  <div className="p-3 rounded bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#FFB800] text-xs font-bold tracking-wider">
                    {currentChallenge.reflexData.instructions}
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <span className="text-xs text-slate-400">Sequence:</span>
                    {currentChallenge.reflexData.targetSequence.map((c, idx) => {
                      const isTapped = idx < reflexTaps.length;
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            isTapped ? 'bg-[#39FF14] text-[#0B0F19]' : 'bg-slate-900 text-slate-600 border border-slate-800'
                          }`}
                        >
                          {c}
                        </span>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['CYAN', 'MAGENTA', 'LIME', 'AMBER'] as const).map((color) => {
                      let colorStyle = 'border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]';
                      if (color === 'MAGENTA') colorStyle = 'border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-white';
                      if (color === 'LIME') colorStyle = 'border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-[#0B0F19]';
                      if (color === 'AMBER') colorStyle = 'border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-[#0B0F19]';

                      return (
                        <button
                          key={color}
                          disabled={isAnswerLocked}
                          onClick={() => handleReflexTap(color)}
                          className={`py-4 rounded border-2 font-mono font-black text-sm uppercase transition-all cursor-pointer ${colorStyle}`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MECHANIC 4: Matching */}
              {currentChallenge.type === 'matching' && currentChallenge.matchingData! && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded bg-[#0B0F19] border border-[#00F0FF]/40 text-sm font-bold text-slate-200">
                    <span className="text-[#FFB800] block text-xs mb-1 uppercase tracking-widest">{currentChallenge.matchingData!.pioneer}</span>
                    {currentChallenge.matchingData!.roleDesc}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentChallenge.matchingData!.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(opt, opt === currentChallenge.matchingData!?.correctOption)}
                        className={`py-3 rounded border font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isAnswerLocked
                            ? opt === currentChallenge.matchingData!.correctOption
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19] font-black'
                              : selectedAnswer === opt
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-transparent border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 5: Logic Gate */}
              {currentChallenge.type === 'logic' && currentChallenge.logicData! && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded bg-[#0B0F19] border border-[#FF007F]/40 text-lg font-bold text-slate-100">
                    Input A = <span className="text-[#00F0FF]">{currentChallenge.logicData!.inputA}</span> &nbsp;|&nbsp; 
                    Gate: <span className="text-[#FF007F] font-black">{currentChallenge.logicData!.gate}</span> &nbsp;|&nbsp; 
                    Input B = <span className="text-[#00F0FF]">{currentChallenge.logicData!.inputB}</span>
                  </div>

                  <div className="flex justify-center gap-4">
                    {currentChallenge.logicData!.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(opt, opt === currentChallenge.logicData!?.correctAnswer)}
                        className={`w-28 py-3 rounded border font-mono font-black text-xl transition-all cursor-pointer ${
                          isAnswerLocked
                            ? opt === currentChallenge.logicData!.correctAnswer
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19]'
                              : selectedAnswer === opt
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-transparent border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-white'
                        }`}
                      >
                        Output: {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 6: Math */}
              {currentChallenge.type === 'math' && currentChallenge.mathData! && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded bg-[#0B0F19] border border-[#00F0FF]/40 text-xl font-bold text-slate-100">
                    {currentChallenge.mathData!.question}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentChallenge.mathData!.options.map((opt, idx) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(idx, idx === currentChallenge.mathData!?.correctIndex)}
                        className={`py-3 rounded border font-mono font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isAnswerLocked
                            ? idx === currentChallenge.mathData!.correctIndex
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19] font-black'
                              : selectedAnswer === idx
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-transparent border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 7: Boolean */}
              {currentChallenge.type === 'boolean' && currentChallenge.booleanData! && (
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded bg-[#0B0F19] border border-[#FF007F]/40 text-lg font-bold text-magenta-300">
                    <code>{currentChallenge.booleanData!.expression}</code>
                  </div>

                  <div className="flex justify-center gap-4">
                    {currentChallenge.booleanData!.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(opt, opt === currentChallenge.booleanData!?.correctAnswer)}
                        className={`w-32 py-3 rounded border font-mono font-bold text-base transition-all cursor-pointer ${
                          isAnswerLocked
                            ? opt === currentChallenge.booleanData!.correctAnswer
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19] font-black'
                              : selectedAnswer === opt
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-transparent border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MECHANIC 8: Acronym */}
              {currentChallenge.type === 'acronym' && currentChallenge.acronymData! && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#FFB800] tracking-widest">
                      {currentChallenge.acronymData!.acronym}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentChallenge.acronymData!.prompt}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentChallenge.acronymData!.options.map((opt, idx) => (
                      <button
                        key={opt}
                        disabled={isAnswerLocked}
                        onClick={() => handleAnswer(idx, idx === currentChallenge.acronymData!?.correctIndex)}
                        className={`p-3.5 rounded border font-mono text-xs sm:text-sm text-left transition-all cursor-pointer ${
                          isAnswerLocked
                            ? idx === currentChallenge.acronymData!.correctIndex
                              ? 'bg-[#39FF14] border-[#39FF14] text-[#0B0F19] font-black'
                              : selectedAnswer === idx
                              ? 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 opacity-40'
                            : 'bg-transparent border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-[#0B0F19]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback & Next Step */}
              {isAnswerLocked && (
                <div className="pt-4 border-t border-[#00F0FF]/20 flex items-center justify-between animate-fadeIn">
                  <div className="text-xs">
                    {isCorrect ? (
                      <span className="text-[#39FF14] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        RUSH CLEARED! +{currentChallenge.points} PTS + Speed Bonus!
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        RUSH MISSED! 0 PTS
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    className="bg-[#00F0FF] text-[#0B0F19] px-6 py-2 text-xs font-black shadow-[0_0_15px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>{currentIndex + 1 < challenges.length ? 'NEXT MICRO-RUSH' : 'FINISH ROUND 1'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Summary View */
            <div className="py-8 text-center space-y-6 animate-fadeIn font-mono">
              <div className="w-16 h-16 rounded-2xl bg-amber-950 border border-amber-400 flex items-center justify-center mx-auto text-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 uppercase">
                  ⚡ PLAYER 4 RAPID RUSH COMPLETED!
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#00F0FF]">
                  All 8 high-velocity micro-challenges resolved. Final Round 1 calculation complete!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">CLEARED</span>
                  <span className="text-lg font-bold text-[#39FF14]">{correctCount} / {challenges.length}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">BASE PTS</span>
                  <span className="text-lg font-bold text-slate-100">+{totalScore}</span>
                </div>
                <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">SPEED BONUS</span>
                  <span className="text-lg font-bold text-[#00F0FF]">+{totalSpeedBonus}</span>
                </div>
                <div className="bg-[#0B0F19] border border-amber-500/50 p-3 rounded-lg shadow-[0_0_10px_rgba(255,184,0,0.15)]">
                  <span className="text-[10px] text-amber-400 block">P4 TOTAL</span>
                  <span className="text-lg font-bold text-[#FFB800]">+{totalScore + totalSpeedBonus}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleClaimUnlock}
                  className="bg-[#00F0FF] text-[#0B0F19] px-8 py-3 text-xs font-black shadow-[0_0_20px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  VIEW ROUND 1 FINAL LEADERBOARD & CERTIFICATE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
