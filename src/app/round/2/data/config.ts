'use client'

import { Team, LeaderboardEntry, ScoringConfig } from '../types';

export const ROUND_CONFIG = {
  roundName: 'ROUND 2',
  roundTitle: 'AI WHO AM I?',
  tagline: 'Ask smart. Think smarter.',
  roundDurationSeconds: 120, // 2 minutes
  maxQuestions: 5,
  questionOptionCount: 6,
  warningTimeThresholdSeconds: 30,
};

export const SCORING_CONFIG: ScoringConfig = {
  baseCorrectScore: 125,
  bonusPerUnusedQuestion: {
    1: 100, // 1 clue unlocked: total 225 base
    2: 80,  // 2 clues unlocked: total 205 base
    3: 60,  // 3 clues unlocked: total 185 base
    4: 35,  // 4 clues unlocked: total 160 base
    5: 0,   // 5 clues unlocked: total 125 base
  },
  timeBonusFactor: 0.5, // 0.5 points per second saved
  wrongGuessPenalty: 0,
  maxPossibleScore: 250,
};

export const SAMPLE_TEAMS: Team[] = [
  {
    id: 'team_neural_ninjas',
    name: 'NEURAL NINJAS',
    college: 'Dept. of Computer Science & AI',
    avatarSeed: 'ninja',
  },
  {
    id: 'team_ai_avengers',
    name: 'AI AVENGERS',
    college: 'Robotics & Automation Society',
    avatarSeed: 'avengers',
  },
  {
    id: 'team_code_titans',
    name: 'CODE TITANS',
    college: 'Dept. of Information Technology',
    avatarSeed: 'titans',
  },
  {
    id: 'team_byte_force',
    name: 'BYTE FORCE',
    college: 'ACM Student Chapter',
    avatarSeed: 'force',
  },
  {
    id: 'team_tech_warriors',
    name: 'TECH WARRIORS',
    college: 'IEEE Student Branch',
    avatarSeed: 'warriors',
  },
  {
    id: 'team_quantum_pulse',
    name: 'QUANTUM PULSE',
    college: 'Center for Data Intelligence',
    avatarSeed: 'quantum',
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb_1',
    rank: 1,
    teamName: 'AI AVENGERS',
    score: 890,
    questionsUsed: 2,
    timeTakenSec: 45,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat A',
  },
  {
    id: 'lb_2',
    rank: 2,
    teamName: 'CODE TITANS',
    score: 810,
    questionsUsed: 3,
    timeTakenSec: 62,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat A',
  },
  {
    id: 'lb_3',
    rank: 3,
    teamName: 'BYTE FORCE',
    score: 760,
    questionsUsed: 3,
    timeTakenSec: 88,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat B',
  },
  {
    id: 'lb_4',
    rank: 4,
    teamName: 'TECH WARRIORS',
    score: 720,
    questionsUsed: 4,
    timeTakenSec: 74,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat B',
  },
  {
    id: 'lb_5',
    rank: 5,
    teamName: 'QUANTUM PULSE',
    score: 560,
    questionsUsed: 5,
    timeTakenSec: 104,
    status: 'CORRECT',
    completedAt: 'Round 2 - Heat C',
  },
];
