'use client'

import { SCORING_CONFIG } from '../data/config';

export interface ScoreBreakdown {
  baseScore: number;
  questionBonus: number;
  timeBonus: number;
  totalScore: number;
  questionsUsed: number;
  timeRemainingSec: number;
  isCorrect: boolean;
}

/**
 * Calculates the complete competition score according to the official Round 2 rules.
 * Fewer questions used = higher score.
 * Faster completion = time bonus.
 */
export function calculateRoundScore(
  isCorrect: boolean,
  questionsUsed: number,
  timeRemainingSec: number
): ScoreBreakdown {
  if (!isCorrect) {
    return {
      baseScore: 0,
      questionBonus: 0,
      timeBonus: 0,
      totalScore: 0,
      questionsUsed,
      timeRemainingSec,
      isCorrect: false,
    };
  }

  const baseScore = SCORING_CONFIG.baseCorrectScore;
  
  // Safe lookup of question bonus (capped between 1 and 5 questions)
  const safeQCount = Math.max(1, Math.min(5, questionsUsed));
  const questionBonus = SCORING_CONFIG.bonusPerUnusedQuestion[safeQCount] ?? 0;
  
  // Time bonus (e.g. 2 points per second remaining)
  const safeTimeRemaining = Math.max(0, timeRemainingSec);
  const timeBonus = Math.floor(safeTimeRemaining * SCORING_CONFIG.timeBonusFactor);

  const rawTotal = baseScore + questionBonus + timeBonus;
  const totalScore = Math.min(SCORING_CONFIG.maxPossibleScore, rawTotal);

  return {
    baseScore,
    questionBonus,
    timeBonus,
    totalScore,
    questionsUsed,
    timeRemainingSec: safeTimeRemaining,
    isCorrect: true,
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(Math.max(0, seconds) / 60);
  const secs = Math.floor(Math.max(0, seconds) % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
