'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Cpu, Bot, User, Send, RotateCcw, Award, CheckCircle2, XCircle, Clock, Zap, Sparkles } from 'lucide-react';
import { WORDLE_TARGETS, VALID_GUESSES, evaluateGuess, generateAiGuess, LetterStatus } from '../data/wordleData';
import { PlayerScoreData, calculateSpeedBonus } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Subgame2WordleProps {
  onComplete: (scoreData: PlayerScoreData) => void;
  onReturnToHub: () => void;
}

export const Subgame2Wordle: React.FC<Subgame2WordleProps> = ({
  onComplete,
  onReturnToHub,
}) => {
  // Secret word selected
  const [targetWord] = useState(() => {
    return WORDLE_TARGETS[Math.floor(Math.random() * WORDLE_TARGETS.length)];
  });

  // Human player state
  const [userGuesses, setUserGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [userStatus, setUserStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [invalidWordMsg, setInvalidWordMsg] = useState<string | null>(null);

  // AI Opponent state
  const [aiGuesses, setAiGuesses] = useState<string[]>([]);
  const [aiStatus, setAiStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');
  const [aiNextGuessTime, setAiNextGuessTime] = useState(14);
  const [aiLogMsg, setAiLogMsg] = useState('NEXUS-9 AI initializing semantic word vectors...');

  // Match timing
  const [elapsedTime, setElapsedTime] = useState(0);
  const matchStartTimeRef = useRef<number>(Date.now());
  const [isFinished, setIsFinished] = useState(false);

  // Keyboard letter color cache
  const [letterColors, setLetterColors] = useState<Record<string, LetterStatus>>({});

  // AI Knowledge tracking
  const aiKnownRef = useRef<{
    correct: (string | null)[];
    present: string[];
    absent: string[];
  }>({
    correct: [null, null, null, null, null],
    present: [],
    absent: [],
  });

  // Timer loop for human elapsed time & AI guess cadence
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);

      // AI step countdown
      if (aiStatus === 'PLAYING') {
        setAiNextGuessTime((prev) => {
          if (prev <= 1) {
            triggerAiGuess();
            return 14 + Math.floor(Math.random() * 4);
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [aiGuesses, aiStatus, isFinished]);

  // AI guess generation
  const triggerAiGuess = useCallback(() => {
    if (aiStatus !== 'PLAYING' || isFinished) return;
    const turn = aiGuesses.length;
    if (turn >= 6) {
      setAiStatus('LOST');
      return;
    }

    const logs = [
      'HEURISTIC SCANNING... PATTERN MATCHING...',
      'EVALUATING BAYESIAN LETTER ENTROPY DISTRIBUTIONS...',
      'PRUNING IMPOSSIBLE PHONEME COMBINATIONS...',
      'SYNTHESIZING HIGHEST-LIKELIHOOD LATENT TOKEN...',
    ];
    setAiLogMsg(logs[Math.floor(Math.random() * logs.length)]);

    const newAiGuess = generateAiGuess(turn, targetWord, aiGuesses, aiKnownRef.current);
    const updatedAiGuesses = [...aiGuesses, newAiGuess];
    setAiGuesses(updatedAiGuesses);

    // Update AI's internal constraint knowledge
    const evalRes = evaluateGuess(newAiGuess, targetWord);
    evalRes.forEach((st, i) => {
      const char = newAiGuess[i];
      if (st === 'correct') {
        aiKnownRef.current.correct[i] = char;
      } else if (st === 'present') {
        if (!aiKnownRef.current.present.includes(char)) {
          aiKnownRef.current.present.push(char);
        }
      } else if (st === 'absent') {
        if (!aiKnownRef.current.absent.includes(char)) {
          aiKnownRef.current.absent.push(char);
        }
      }
    });

    if (newAiGuess === targetWord) {
      setAiStatus('WON');
      if (userStatus === 'PLAYING') {
        setTimeout(() => checkGameEnd(userGuesses, userStatus, updatedAiGuesses, 'WON'), 1000);
      }
    } else if (updatedAiGuesses.length >= 6) {
      setAiStatus('LOST');
    }
  }, [aiGuesses, aiStatus, isFinished, targetWord, userGuesses, userStatus]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (userStatus !== 'PLAYING' || isFinished) return;

      if (e.key === 'Enter') {
        handleSubmitGuess();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleLetterInput(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, userGuesses, userStatus, isFinished]);

  const handleLetterInput = (letter: string) => {
    if (currentGuess.length < 5) {
      soundFx.playKeypress();
      setCurrentGuess((prev) => prev + letter);
      setInvalidWordMsg(null);
    }
  };

  const handleBackspace = () => {
    if (currentGuess.length > 0) {
      soundFx.playKeypress();
      setCurrentGuess((prev) => prev.slice(0, -1));
      setInvalidWordMsg(null);
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) {
      soundFx.playWrong();
      setInvalidWordMsg('WORD MUST BE EXACTLY 5 LETTERS');
      return;
    }

    if (!VALID_GUESSES.has(currentGuess.toUpperCase())) {
      soundFx.playWrong();
      setInvalidWordMsg(`"${currentGuess}" NOT IN ARCADE LEXICON`);
      return;
    }

    // Evaluate guess
    const newGuesses = [...userGuesses, currentGuess];
    setUserGuesses(newGuesses);
    const evalResults = evaluateGuess(currentGuess, targetWord);

    // Update keyboard color tracking
    const nextColors = { ...letterColors };
    evalResults.forEach((status, i) => {
      const char = currentGuess[i];
      const prevStatus = nextColors[char];
      if (status === 'correct' || (status === 'present' && prevStatus !== 'correct')) {
        nextColors[char] = status;
      } else if (!prevStatus) {
        nextColors[char] = status;
      }
      if (status !== 'empty') {
        soundFx.playWordleFlip(status);
      }
    });
    setLetterColors(nextColors);
    setCurrentGuess('');

    // Check win/loss
    if (currentGuess === targetWord) {
      setUserStatus('WON');
      soundFx.playCorrect();
      setTimeout(() => checkGameEnd(newGuesses, 'WON', aiGuesses, aiStatus), 800);
    } else if (newGuesses.length >= 6) {
      setUserStatus('LOST');
      soundFx.playWrong();
      setTimeout(() => checkGameEnd(newGuesses, 'LOST', aiGuesses, aiStatus), 800);
    }
  };

  const checkGameEnd = (
    uGuesses: string[],
    uStat: 'PLAYING' | 'WON' | 'LOST',
    aGuesses: string[],
    aStat: 'PLAYING' | 'WON' | 'LOST'
  ) => {
    setIsFinished(true);
    if (uStat === 'WON') {
      soundFx.playSuccessFanfare();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#39FF14', '#FF007F'],
        });
      } catch {}
    } else {
      soundFx.playWrong();
    }
  };

  // Score calculation
  const calculateResultScore = (): PlayerScoreData => {
    const isHumanWin = userStatus === 'WON';
    const guessCount = userGuesses.length;

    let basePoints = 0;
    if (isHumanWin) {
      basePoints = 1500 - (guessCount - 1) * 150;
      if (aiStatus !== 'WON' || userGuesses.length <= aiGuesses.length) {
        basePoints += 300;
      }
    } else {
      basePoints = 300;
    }

    const speedBonus = isHumanWin ? calculateSpeedBonus(120, elapsedTime, 8) : 0;
    const total = basePoints + speedBonus;

    return {
      playerScore: basePoints,
      correctAnswers: isHumanWin ? 1 : 0,
      wrongAnswers: isHumanWin ? 0 : 1,
      completionTime: elapsedTime,
      speedBonus,
      finalSubgameScore: total,
      completedAt: new Date().toISOString(),
    };
  };

  const handleClaimUnlock = () => {
    const result = calculateResultScore();
    onComplete(result);
  };

  // Render a 6-row Wordle grid matching the Immersive UI design mockup
  const renderGrid = (guesses: string[], activeGuess: string, isHuman: boolean) => {
    const rows = [];
    for (let r = 0; r < 6; r++) {
      const isCurrentRow = isHuman && r === guesses.length && userStatus === 'PLAYING';
      const rowWord = guesses[r] || (isCurrentRow ? activeGuess.padEnd(5, ' ') : '     ');
      const evaluated = guesses[r] ? evaluateGuess(guesses[r], targetWord) : null;

      rows.push(
        <div key={r} className="flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, c) => {
            const char = rowWord[c] !== ' ' ? rowWord[c] : '';
            const status = evaluated ? evaluated[c] : null;

            let tileStyle = 'border-2 border-[#00F0FF]/30 bg-transparent text-[#00F0FF]';
            if (status === 'correct') {
              tileStyle = 'border-2 border-[#39FF14] bg-[#39FF14]/20 text-[#39FF14] shadow-[0_0_10px_#39FF14]';
            } else if (status === 'present') {
              tileStyle = 'border-2 border-[#FFB800] bg-[#FFB800]/20 text-[#FFB800] shadow-[0_0_10px_#FFB800]';
            } else if (status === 'absent') {
              tileStyle = 'border-2 border-slate-800 bg-slate-900/60 text-slate-600 opacity-60';
            } else if (isCurrentRow && char) {
              tileStyle = 'border-2 border-[#00F0FF] bg-[#00F0FF]/10 text-2xl font-bold shadow-[0_0_10px_rgba(0,240,255,0.4)] text-[#00F0FF]';
            }

            return (
              <div
                key={c}
                className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-display font-black text-xl sm:text-2xl transition-all duration-200 ${tileStyle}`}
              >
                {char}
              </div>
            );
          })}
        </div>
      );
    }
    return <div className="space-y-2 mb-6">{rows}</div>;
  };

  // Keyboard keys layout
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}.0`;
  };

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
                WORDLE RACE VS AI
              </h2>
              <p className="text-[10px] uppercase opacity-70 italic text-[#00F0FF]">
                Simulation Layer 2: Speed & Logic // Player 2 Arena
              </p>
            </div>

            {/* Neon Pink Countdown Timer */}
            <div className="bg-[#FF007F]/20 border border-[#FF007F] px-4 py-2 rounded text-[#FF007F] font-bold text-base sm:text-lg tabular-nums shadow-[0_0_10px_rgba(255,0,127,0.3)]">
              {formatTimer(elapsedTime)}
            </div>
          </div>

          {!isFinished ? (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
              {/* Left Column: Human Grid */}
              <div className="flex-1 flex flex-col items-center">
                <div className="text-[10px] font-bold uppercase mb-4 tracking-widest bg-[#00F0FF] text-[#0B0F19] px-2 py-0.5 self-center">
                  Human Grid
                </div>

                {renderGrid(userGuesses, currentGuess, true)}

                {invalidWordMsg && (
                  <div className="text-center text-xs font-mono font-bold text-red-400 mb-3 animate-glitch">
                    ⚠️ {invalidWordMsg}
                  </div>
                )}

                {/* Keyboard */}
                <div className="w-full space-y-1 sm:space-y-1.5 mt-auto">
                  {KEYBOARD_ROWS.map((row, rIdx) => (
                    <div key={rIdx} className="flex justify-center gap-1">
                      {row.map((k) => {
                        const status = letterColors[k];
                        const isSpecial = k === 'ENTER' || k === 'DEL';

                        let keyClass = 'bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/40';
                        if (status === 'correct') {
                          keyClass = 'bg-[#39FF14] text-[#0B0F19] font-bold shadow-[0_0_8px_#39FF14]';
                        } else if (status === 'present') {
                          keyClass = 'bg-[#FFB800] text-[#0B0F19] font-bold shadow-[0_0_8px_#FFB800]';
                        } else if (status === 'absent') {
                          keyClass = 'bg-slate-900 border border-slate-800 text-slate-600 opacity-40';
                        }

                        return (
                          <button
                            key={k}
                            onClick={() => {
                              if (k === 'ENTER') handleSubmitGuess();
                              else if (k === 'DEL') handleBackspace();
                              else handleLetterInput(k);
                            }}
                            className={`p-2 sm:p-3.5 text-center text-xs sm:text-base rounded font-mono transition-all uppercase font-black flex items-center justify-center ${
                              isSpecial ? 'px-3.5 sm:px-6 text-[10px] sm:text-xs' : 'w-9 sm:w-14 h-9 sm:h-12'
                            } ${keyClass}`}
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: AI Opponent */}
              <div className="w-full lg:w-80 flex flex-col items-center bg-[#FF007F]/5 border-t lg:border-t-0 lg:border-l border-[#FF007F]/20 pt-6 lg:pt-0 lg:px-6">
                <div className="text-[10px] font-bold uppercase mb-4 tracking-widest bg-[#FF007F] text-white px-2 py-0.5">
                  AI Opponent (NEXUS-9)
                </div>

                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-magenta-300">
                    <span>CALCULATING POSSIBILITIES...</span>
                    <span>{Math.max(10, 100 - aiNextGuessTime * 6)}%</span>
                  </div>

                  {/* AI Progress Bar */}
                  <div className="w-full bg-[#FF007F]/20 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF007F] h-full shadow-[0_0_8px_#FF007F] transition-all duration-1000"
                      style={{ width: `${Math.max(10, 100 - (aiNextGuessTime / 16) * 100)}%` }}
                    />
                  </div>

                  {/* Scaled AI Grid */}
                  <div className="scale-90 origin-top pt-2">
                    {renderGrid(aiGuesses, '', false)}
                  </div>

                  {/* AI Log Terminal Box */}
                  <div className="bg-[#FF007F]/10 border border-[#FF007F]/30 p-3 rounded text-[10px] font-mono leading-relaxed text-magenta-300">
                    &gt; HEURISTIC SCANNING...<br />
                    &gt; {aiLogMsg}<br />
                    &gt; NEXT GUESS IN: {aiNextGuessTime}.0s
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Summary View */
            <div className="py-8 text-center space-y-6 animate-fadeIn font-mono">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-950 to-cyan-950 border border-emerald-400 flex items-center justify-center mx-auto text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 uppercase">
                  {userStatus === 'WON' ? '⚡ HUMAN VICTORY! KEYWORD CRACKED' : 'SYSTEM OVERRIDE: ATTEMPTS EXHAUSTED'}
                </h2>
                <p className="text-xs uppercase tracking-widest text-[#00F0FF]">
                  TARGET KEYWORD WAS: <span className="text-[#39FF14] font-black text-lg bg-[#00F0FF]/10 px-2 py-0.5 border border-cyan-400 rounded">{targetWord}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
                <div className="bg-[#0B0F19] border border-cyan-500/40 p-4 rounded-lg space-y-1">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase">Human Player (You)</div>
                  <div className="text-sm font-bold text-slate-100">
                    {userStatus === 'WON' ? <span className="text-[#39FF14]">SOLVED in {userGuesses.length} guesses</span> : <span className="text-red-400">UNSOLVED</span>}
                  </div>
                  <div className="text-xs text-slate-400">Time: {elapsedTime}s</div>
                </div>

                <div className="bg-[#0B0F19] border border-magenta-500/40 p-4 rounded-lg space-y-1">
                  <div className="text-[10px] text-magenta-400 font-bold uppercase">NEXUS-9 AI Opponent</div>
                  <div className="text-sm font-bold text-slate-100">
                    {aiStatus === 'WON' ? <span className="text-magenta-400">SOLVED in {aiGuesses.length} guesses</span> : <span className="text-slate-400">OUTPACED BY HUMAN</span>}
                  </div>
                  <div className="text-xs text-slate-400">Guesses: {aiGuesses.length}</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleClaimUnlock}
                  className="bg-[#00F0FF] text-[#0B0F19] px-8 py-3 text-xs font-black shadow-[0_0_20px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all"
                >
                  CLAIM SCORE & UNLOCK PLAYER 3
                </button>

                <button
                  onClick={onReturnToHub}
                  className="bg-transparent border border-[#00F0FF] text-[#00F0FF] px-6 py-3 text-xs font-bold hover:bg-[#00F0FF] hover:text-[#0B0F19] transition-all uppercase tracking-widest"
                >
                  Return to Hub
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        {!isFinished && (
          <div className="bg-[#00F0FF]/10 border-t border-[#00F0FF]/30 p-4 flex flex-wrap justify-between items-center gap-3 font-mono">
            <div className="flex gap-3">
              <button
                onClick={handleBackspace}
                className="bg-transparent border border-[#00F0FF] text-[#00F0FF] px-5 sm:px-6 py-2 text-xs font-bold hover:bg-[#00F0FF] hover:text-[#0B0F19] transition-all uppercase tracking-widest cursor-pointer"
              >
                Backspace
              </button>
              <button
                onClick={handleSubmitGuess}
                className="bg-[#00F0FF] text-[#0B0F19] px-6 sm:px-10 py-2 text-xs font-black shadow-[0_0_15px_rgba(0,240,255,0.6)] uppercase tracking-widest hover:scale-105 transition-all cursor-pointer"
              >
                Submit Word
              </button>
            </div>

            <div className="text-[10px] text-right">
              <div className="opacity-60 text-slate-300">TIPS: AI guesses every 12-18s.</div>
              <div className="font-bold text-[#39FF14]">ACCURACY BONUS: 2.5x</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
