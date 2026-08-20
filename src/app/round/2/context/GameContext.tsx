'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, query, orderBy, limit, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { 
  GameState, 
  GameScreen, 
  Team, 
  MysteryEntity, 
  QuestionDefinition, 
  AskedQuestion, 
  LeaderboardEntry 
} from '../types';
import { MYSTERY_ENTITIES } from '../data/entities';
import { QUESTION_BANK, generateQuestionPool } from '../data/questions';
import { ROUND_CONFIG, SAMPLE_TEAMS } from '../data/config';
import { checkGuessMatch } from '../utils/fuzzyMatch';
import { calculateRoundScore } from '../utils/scoring';
import { soundEffects } from '../utils/soundEffects';

interface GameContextType {
  gameState: GameState;
  teamsList: Team[];
  leaderboard: LeaderboardEntry[];
  startRound: () => void;
  selectTeam: (team: Team) => void;
  selectQuestion: (questionId: string) => void;
  askAI: () => void;
  dismissResponseModal: () => void;
  submitFinalGuess: (guess: string) => void;
  navigateToScreen: (screen: GameScreen) => void;
  restartGame: () => void;
  toggleSound: () => void;
  assignedEntityOverride: (entityId: string) => void;
  round2Active: boolean;
  isCaptain: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeam] = useState<Team>(SAMPLE_TEAMS[0]);
  const [userTeamId, setUserTeamId] = useState<string | null>(null);
  const [screen, setScreen] = useState<GameScreen>('INTRO');
  const [roundDurationSec] = useState<number>(ROUND_CONFIG.roundDurationSeconds);
  const [timeRemainingSec, setTimeRemainingSec] = useState<number>(ROUND_CONFIG.roundDurationSeconds);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [mysteryEntity, setMysteryEntity] = useState<MysteryEntity | null>(null);
  const [availableQuestions, setAvailableQuestions] = useState<QuestionDefinition[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [questionHistory, setQuestionHistory] = useState<AskedQuestion[]>([]);
  const [isAIAnalyzing, setIsAIAnalyzing] = useState<boolean>(false);
  const [latestAnswer, setLatestAnswer] = useState<{ questionText: string; answer: boolean } | null>(null);
  const [finalGuess, setFinalGuess] = useState<string>('');
  const [guessCorrect, setGuessCorrect] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [round2Active, setRound2Active] = useState<boolean>(false);
  const [isCaptain, setIsCaptain] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Listen to tournament settings (Round 2 Lock) in real-time
  useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, "settings", "tournament"), (docSnap) => {
      if (docSnap.exists()) {
        setRound2Active(!!docSnap.data().round2Active);
      } else {
        setRound2Active(false);
      }
    });
    return () => unsubSettings();
  }, []);

  // Fetch real user & team info + dynamic leaderboard from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        if (userSnap.exists()) {
          const tId = userSnap.data().teamId;
          if (tId) {
            setUserTeamId(tId);
            const teamSnap = await getDoc(doc(db, 'teams', tId));
            if (teamSnap.exists()) {
              const data = teamSnap.data();
              setTeam({
                id: tId,
                name: data.name || 'My Team',
                college: 'College Competition',
                avatarSeed: tId,
              });
              setIsCaptain(data.captainId === user.uid);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load user team in Round 2:', err);
      }

      // Fetch dynamic leaderboard from Firestore
      try {
        const teamsRef = collection(db, 'teams');
        const q = query(teamsRef, orderBy('teamScore', 'desc'), limit(10));
        const snap = await getDocs(q);

        const list: LeaderboardEntry[] = snap.docs.map((d, idx) => {
          const data = d.data();
          return {
            id: d.id,
            rank: idx + 1,
            teamName: data.name || 'Unnamed',
            score: data.teamScore || 0,
            questionsUsed: 0,
            timeTakenSec: data.totalTime || 0,
            status: 'CORRECT',
            completedAt: 'Live Standings',
            isCurrentTeam: userTeamId === d.id,
          };
        });
        setLeaderboard(list);
      } catch (err) {
        console.error('Failed to fetch Firestore leaderboard in Round 2:', err);
      }
    });

    return () => unsub();
  }, [userTeamId]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    const isMuted = soundEffects.toggleMute();
    setSoundEnabled(!isMuted);
  }, []);

  // Team selection
  const selectTeam = useCallback((selectedTeam: Team) => {
    soundEffects.playClick();
    setTeam(selectedTeam);
  }, []);

  // Admin / debug override for assigning specific entities
  const assignedEntityOverride = useCallback((entityId: string) => {
    const found = MYSTERY_ENTITIES.find(e => e.id === entityId);
    if (found) {
      setMysteryEntity(found);
    }
  }, []);

  // Start the round
  const startRound = useCallback(() => {
    soundEffects.playClick();

    const randomIndex = Math.floor(Math.random() * MYSTERY_ENTITIES.length);
    const chosenEntity = MYSTERY_ENTITIES[randomIndex];
    setMysteryEntity(chosenEntity);

    if (chosenEntity.questions && chosenEntity.questions.length > 0) {
      const customPool: QuestionDefinition[] = chosenEntity.questions.map((q, idx) => ({
        id: `q-${idx}`,
        text: q.text,
        attributeKey: `custom-q-${idx}`,
        evaluate: () => q.answer
      }));
      setAvailableQuestions(customPool);
    } else {
      const initialPool = generateQuestionPool(ROUND_CONFIG.questionOptionCount);
      setAvailableQuestions(initialPool);
    }

    setSelectedQuestionId(null);
    setQuestionHistory([]);
    setLatestAnswer(null);
    setFinalGuess('');
    setGuessCorrect(false);
    setFinalScore(0);
    setTimeRemainingSec(ROUND_CONFIG.roundDurationSeconds);
    setStartTime(Date.now());
    setEndTime(null);

    setScreen('INITIALIZING');
    setTimeout(() => {
      setScreen('GAMEPLAY');
    }, 1800);
  }, []);

  // Live Timer Countdown Effect
  useEffect(() => {
    if (screen === 'GAMEPLAY') {
      timerRef.current = setInterval(() => {
        setTimeRemainingSec((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          if (prev === 31 || prev === 11) {
            soundEffects.playWarningTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [screen]);

  // Handle timeout
  const handleTimeout = useCallback(() => {
    soundEffects.playNo();
    setEndTime(Date.now());
    setFinalGuess('(Time Expired)');
    setGuessCorrect(false);
    setFinalScore(0);

    setScreen('RESULT');
  }, []);

  // Select question
  const selectQuestion = useCallback((questionId: string) => {
    soundEffects.playClick();
    setSelectedQuestionId(questionId);
  }, []);

  // Ask AI
  const askAI = useCallback(() => {
    if (!selectedQuestionId || !mysteryEntity) return;
    if (questionHistory.length >= ROUND_CONFIG.maxQuestions) return;

    const question = availableQuestions.find(q => q.id === selectedQuestionId) || 
                     QUESTION_BANK.find(q => q.id === selectedQuestionId);
    if (!question) return;

    setIsAIAnalyzing(true);

    let answer = false;
    if (question.evaluate) {
      answer = question.evaluate(mysteryEntity);
    } else if (question.attributeKey in mysteryEntity.attributes) {
      answer = !!mysteryEntity.attributes[question.attributeKey];
    }

    setTimeout(() => {
      setIsAIAnalyzing(false);

      if (answer) {
        soundEffects.playYes();
      } else {
        soundEffects.playNo();
      }

      const newHistoryItem: AskedQuestion = {
        questionId: question.id,
        questionText: question.text,
        answer,
        timestamp: Date.now(),
        questionNumber: questionHistory.length + 1,
      };

      setQuestionHistory(prev => [...prev, newHistoryItem]);
      setLatestAnswer({
        questionText: question.text,
        answer,
      });

      setAvailableQuestions(prev => {
        const remaining = prev.filter(q => q.id !== question.id);
        if (mysteryEntity.questions && mysteryEntity.questions.length > 0) {
          return remaining;
        }
        const askedIds = [...questionHistory.map(h => h.questionId), question.id];
        const newPool = generateQuestionPool(ROUND_CONFIG.questionOptionCount, askedIds);
        return newPool.length >= 6 ? newPool : remaining;
      });

      setSelectedQuestionId(null);
    }, 1400);
  }, [selectedQuestionId, mysteryEntity, questionHistory, availableQuestions]);

  const dismissResponseModal = useCallback(() => {
    soundEffects.playClick();
    setLatestAnswer(null);
  }, []);

  // Submit Final Guess
  const submitFinalGuess = useCallback(async (guessText: string) => {
    if (!guessText.trim() || !mysteryEntity) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const now = Date.now();
    setEndTime(now);
    setFinalGuess(guessText.trim());

    const matchResult = checkGuessMatch(guessText, mysteryEntity);
    const isCorrect = matchResult.isCorrect;
    setGuessCorrect(isCorrect);

    const elapsed = 120 - timeRemainingSec;
    const questionsUsed = Math.min(5, Math.floor(elapsed / 20) + 1);
    const scoreResult = calculateRoundScore(isCorrect, questionsUsed, timeRemainingSec);
    setFinalScore(scoreResult.totalScore);

    if (isCorrect) {
      soundEffects.playVictory();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981', '#38bdf8', '#ffffff'],
        });
      } catch {}
    } else {
      soundEffects.playNo();
    }

    const timeTaken = ROUND_CONFIG.roundDurationSeconds - timeRemainingSec;

    // Sync score to Firestore dynamically starting from 0
    if (userTeamId && scoreResult.totalScore > 0) {
      try {
        await updateDoc(doc(db, 'teams', userTeamId), {
          teamScore: increment(scoreResult.totalScore),
          totalTime: increment(timeTaken),
        });
      } catch (err) {
        console.error('Failed to update Firestore team score in Round 2:', err);
      }
    }

    // Dynamic Leaderboard update
    const newEntry: LeaderboardEntry = {
      id: `lb_${Date.now()}`,
      rank: 1,
      teamName: team.name,
      score: scoreResult.totalScore,
      questionsUsed,
      timeTakenSec: timeTaken,
      isCurrentTeam: true,
      status: isCorrect ? 'CORRECT' : 'WRONG',
      completedAt: 'Round 2 - Live',
    };

    setLeaderboard((prev) => {
      const filtered = prev.filter(e => e.teamName !== team.name).map(e => ({ ...e, isCurrentTeam: false }));
      const combined = [...filtered, newEntry];
      return combined.sort((a, b) => b.score - a.score).map((e, idx) => ({ ...e, rank: idx + 1 }));
    });

    setScreen('RESULT');
  }, [mysteryEntity, questionHistory.length, timeRemainingSec, team.name, userTeamId]);

  const navigateToScreen = useCallback((newScreen: GameScreen) => {
    soundEffects.playClick();
    setScreen(newScreen);
  }, []);

  const restartGame = useCallback(() => {
    soundEffects.playClick();
    setScreen('INTRO');
    setSelectedQuestionId(null);
    setQuestionHistory([]);
    setLatestAnswer(null);
    setFinalGuess('');
    setGuessCorrect(false);
    setFinalScore(0);
    setTimeRemainingSec(ROUND_CONFIG.roundDurationSeconds);
  }, []);

  const gameState: GameState = {
    screen,
    team,
    roundNumber: 2,
    roundDurationSec,
    timeRemainingSec,
    startTime,
    endTime,
    mysteryEntity,
    availableQuestions,
    selectedQuestionId,
    questionHistory,
    maxQuestions: ROUND_CONFIG.maxQuestions,
    isAIAnalyzing,
    latestAnswer,
    finalGuess,
    guessCorrect,
    finalScore,
    soundEnabled,
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        teamsList: SAMPLE_TEAMS,
        leaderboard,
        startRound,
        selectTeam,
        selectQuestion,
        askAI,
        dismissResponseModal,
        submitFinalGuess,
        navigateToScreen,
        restartGame,
        toggleSound,
        assignedEntityOverride,
        round2Active,
        isCaptain,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
